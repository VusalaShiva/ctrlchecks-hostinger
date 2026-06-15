/**
 * Credentials step: show only rows that match backend "missing" credential resolution.
 * Mirrors worker/src/services/ai/unified-readiness.ts preference for credentialStatuses.
 */

export type CredentialStatusRow = {
  nodeId?: string;
  credentialId?: string;
  displayName?: string;
  status?: string;
};

function norm(s: unknown): string {
  return String(s ?? '').trim().toLowerCase();
}

/** Ids on a credential question that can match resolution.credentialId / vaultKey. */
export function credentialIdCandidatesFromQuestion(q: Record<string, unknown>): string[] {
  const c = (q.credential as Record<string, unknown> | undefined) || undefined;
  const out = new Set<string>();
  const add = (x: unknown) => {
    const t = norm(x);
    if (t) out.add(t);
  };
  add(q.fieldName);
  add(c?.vaultKey);
  add(c?.credentialId);
  return [...out];
}

export function buildCompositeKey(nodeId: string, credentialId: string): string {
  return `${String(nodeId || '').trim()}::${norm(credentialId)}`;
}

/** Same key shape as wizard field plane (`nodeId::normalizedFieldName`). */
export function credentialPlaneKeyFromQuestion(q: Record<string, unknown>): string {
  return `${String(q.nodeId || '').trim()}::${norm(q.fieldName)}`;
}

export type WizardCredentialFillMode = 'manual_static' | 'runtime_ai' | 'buildtime_ai_once';

export function isVaultCredentialQuestion(q: Record<string, unknown>): boolean {
  return (
    q.isVaultCredential === true ||
    q.category === 'credential' ||
    q.ownershipClass === 'credential'
  );
}

export type FieldPlaneRowLike = { isEmpty: boolean } | null | undefined;

/**
 * User-only Credentials step: vault rows only when User (manual_static), not runtime/buildtime AI,
 * and not AI-prefilled with a value already in the workflow config.
 */
export function shouldShowCredentialRowOnCredentialsStep(params: {
  question: Record<string, unknown>;
  effectiveMode: WizardCredentialFillMode;
  fieldPlaneRow: FieldPlaneRowLike;
}): boolean {
  const { question, effectiveMode, fieldPlaneRow } = params;
  if (!isVaultCredentialQuestion(question)) {
    return effectiveMode !== 'runtime_ai';
  }
  if (effectiveMode === 'runtime_ai' || effectiveMode === 'buildtime_ai_once') {
    return false;
  }
  const aiFilled = question.aiFilledAtBuildTime === true;
  const hasValueInGraph = fieldPlaneRow ? !fieldPlaneRow.isEmpty : false;
  if (aiFilled && hasValueInGraph) {
    return false;
  }
  return true;
}

/**
 * Required vault row that is still empty under User mode — cannot hide via overrides.
 */
export function credentialRowMustStayVisible(
  q: Record<string, unknown>,
  isCredentialEmpty: boolean,
  effectiveMode?: WizardCredentialFillMode
): boolean {
  const required = q.required !== false;
  const vault = isVaultCredentialQuestion(q);
  if (!required || !vault || !isCredentialEmpty) return false;
  const mode = effectiveMode ?? 'manual_static';
  if (mode === 'runtime_ai' || mode === 'buildtime_ai_once') return false;
  return true;
}

export type ApplyCredentialStepIncludeOverridesParams = {
  strictFiltered: Array<Record<string, unknown>>;
  allVaultCredentialQuestions: Array<Record<string, unknown>>;
  overrides: Record<string, boolean>;
  isQuestionCredentialEmpty: (q: Record<string, unknown>) => boolean;
  /** When set, hide-block and force-include respect User-only credential policy. */
  getEffectiveFillMode?: (q: Record<string, unknown>) => WizardCredentialFillMode;
  getFieldPlaneRow?: (q: Record<string, unknown>) => FieldPlaneRowLike;
};

/**
 * Apply per-field include/hide toggles for the Credentials step.
 * Hiding is blocked for required + vault + empty rows in User mode only.
 */
export function applyCredentialStepIncludeOverrides(
  params: ApplyCredentialStepIncludeOverridesParams
): Array<Record<string, unknown>> {
  const {
    strictFiltered,
    allVaultCredentialQuestions,
    overrides,
    isQuestionCredentialEmpty,
    getEffectiveFillMode,
    getFieldPlaneRow,
  } = params;

  const out = strictFiltered.filter((q) => {
    const k = credentialPlaneKeyFromQuestion(q);
    const empty = isQuestionCredentialEmpty(q);
    const mode = getEffectiveFillMode?.(q) ?? 'manual_static';
    if (credentialRowMustStayVisible(q, empty, mode)) return true;
    if (overrides[k] === false) return false;
    return true;
  });

  const keys = new Set(out.map((q) => credentialPlaneKeyFromQuestion(q)));
  for (const q of allVaultCredentialQuestions) {
    const k = credentialPlaneKeyFromQuestion(q);
    if (overrides[k] !== true || keys.has(k)) continue;
    const mode = getEffectiveFillMode?.(q) ?? 'manual_static';
    const row = getFieldPlaneRow?.(q);
    if (
      getEffectiveFillMode &&
      getFieldPlaneRow &&
      !shouldShowCredentialRowOnCredentialsStep({ question: q, effectiveMode: mode, fieldPlaneRow: row })
    ) {
      continue;
    }
    out.push(q);
    keys.add(k);
  }
  return dedupeQuestions(out);
}

function missingKeysFromStatuses(statuses: CredentialStatusRow[]): Set<string> {
  const keys = new Set<string>();
  for (const s of statuses) {
    if (String(s.status || '') !== 'required_missing') continue;
    const nid = String(s.nodeId || '').trim();
    const cid = norm(s.credentialId);
    if (!nid || !cid || cid === 'none') continue;
    keys.add(buildCompositeKey(nid, cid));
  }
  return keys;
}

function missingKeysFromUnifiedMissing(missing: Array<Record<string, unknown>>): Set<string> {
  const keys = new Set<string>();
  for (const m of missing) {
    const cid = norm(m.credentialId ?? m.vaultKey);
    if (!cid) continue;
    const nodeIds = Array.isArray(m.nodeIds) ? m.nodeIds : [];
    if (nodeIds.length > 0) {
      for (const nid of nodeIds) {
        const n = String(nid || '').trim();
        if (n) keys.add(buildCompositeKey(n, cid));
      }
    } else {
      const n = String(m.nodeId || '').trim();
      if (n) keys.add(buildCompositeKey(n, cid));
    }
  }
  return keys;
}

function isDiscoveryEntryMissing(c: Record<string, unknown>): boolean {
  const status = String(c?.status || '').toLowerCase();
  if (status) return status.includes('missing') || status === 'required';
  if (typeof c.satisfied === 'boolean') return !c.satisfied;
  return true;
}

function missingKeysFromDiscovered(discovered: Array<Record<string, unknown>>): Set<string> {
  const keys = new Set<string>();
  for (const c of discovered) {
    if (!isDiscoveryEntryMissing(c)) continue;
    const cid = norm(c.credentialId ?? c.vaultKey);
    if (!cid) continue;
    const nodeIds = Array.isArray(c.nodeIds) ? c.nodeIds : [];
    if (nodeIds.length > 0) {
      for (const nid of nodeIds) {
        const n = String(nid || '').trim();
        if (n) keys.add(buildCompositeKey(n, cid));
      }
    }
  }
  return keys;
}

function questionMatchesKeySet(q: Record<string, unknown>, keys: Set<string>): boolean {
  const nodeId = String(q.nodeId || '').trim();
  if (!nodeId) return false;
  const candidates = credentialIdCandidatesFromQuestion(q);
  for (const cid of candidates) {
    if (keys.has(buildCompositeKey(nodeId, cid))) return true;
  }
  return false;
}

function questionMatchesByNodeAndNormalizedId(
  q: Record<string, unknown>,
  keys: Set<string>
): boolean {
  const nodeId = String(q.nodeId || '').trim();
  if (!nodeId) return false;
  const nodePrefix = `${nodeId}::`;
  const keyIds = new Set(
    [...keys]
      .filter((k) => k.startsWith(nodePrefix))
      .map((k) => norm(k.slice(nodePrefix.length)))
      .filter(Boolean)
  );
  if (keyIds.size === 0) return false;
  const candidates = credentialIdCandidatesFromQuestion(q).map(norm);
  return candidates.some((cid) => keyIds.has(cid));
}

function dedupeQuestions<T extends Record<string, unknown>>(questions: T[]): T[] {
  const seen = new Map<string, T>();
  for (const q of questions) {
    const c = (q.credential as Record<string, unknown> | undefined) || undefined;
    const key = `cred:${String(q.nodeId || 'global')}:${norm(c?.vaultKey ?? c?.credentialId ?? q.fieldName)}`;
    if (!seen.has(key)) seen.set(key, q);
  }
  return [...seen.values()];
}

export type FilterCredentialQuestionsParams = {
  questions: Array<Record<string, unknown>>;
  credentialStatuses?: CredentialStatusRow[] | null;
  unifiedCredentialsMissing?: Array<Record<string, unknown>> | null;
  discoveredCredentials?: Array<Record<string, unknown>> | null;
};

/**
 * Filters vault credential questions to those the user must still satisfy.
 *
 * - If `credentialStatuses` is non-empty: prefer `required_missing` rows; if none, still
 *   consult `unifiedCredentialsMissing` and `discoveredCredentials` (stale “all resolved” statuses).
 * - If a missing key has no matching question, returns [] for that branch so the wizard can synthesize rows.
 * - If `credentialStatuses` is empty/missing: use `unifiedCredentialsMissing`, then `discoveredCredentials`,
 *   then all `questions`.
 */
export function filterCredentialQuestionsForStep(
  params: FilterCredentialQuestionsParams
): Array<Record<string, unknown>> {
  const { questions, credentialStatuses, unifiedCredentialsMissing, discoveredCredentials } = params;
  const base = Array.isArray(questions) ? questions : [];

  const statuses = Array.isArray(credentialStatuses) ? credentialStatuses : [];
  const statusesHadRows = statuses.length > 0;
  if (statusesHadRows) {
    const keys = missingKeysFromStatuses(statuses);
    if (keys.size > 0) {
      const strictFiltered = base.filter((q) => questionMatchesKeySet(q, keys));
      if (strictFiltered.length > 0) return dedupeQuestions(strictFiltered);
      const normalizedFallback = base.filter((q) => questionMatchesByNodeAndNormalizedId(q, keys));
      if (normalizedFallback.length > 0) return dedupeQuestions(normalizedFallback);
      // required_missing in statuses but no matching question — fall through so discovery / UI synthesis can still apply
    }
    // If every status row is satisfied (no required_missing), still check unified + discovered below.
  }

  const unified = Array.isArray(unifiedCredentialsMissing) ? unifiedCredentialsMissing : [];
  if (unified.length > 0) {
    const keys = missingKeysFromUnifiedMissing(unified);
    if (keys.size > 0) {
      const strictFiltered = base.filter((q) => questionMatchesKeySet(q, keys));
      if (strictFiltered.length > 0) return dedupeQuestions(strictFiltered);
      const normalizedFallback = base.filter((q) => questionMatchesByNodeAndNormalizedId(q, keys));
      if (normalizedFallback.length > 0) return dedupeQuestions(normalizedFallback);
    }
  }

  const discovered = Array.isArray(discoveredCredentials) ? discoveredCredentials : [];
  const discKeys = missingKeysFromDiscovered(discovered);
  if (discKeys.size > 0) {
    const strictFiltered = base.filter((q) => questionMatchesKeySet(q, discKeys));
    if (strictFiltered.length > 0) return dedupeQuestions(strictFiltered);
    const normalizedFallback = base.filter((q) => questionMatchesByNodeAndNormalizedId(q, discKeys));
    if (normalizedFallback.length > 0) return dedupeQuestions(normalizedFallback);
  }

  if (unified.length > 0 && discKeys.size === 0) {
    const unifiedKeysOnly = missingKeysFromUnifiedMissing(unified);
    if (unifiedKeysOnly.size > 0) {
      const matched = base.filter(
        (q) =>
          questionMatchesKeySet(q, unifiedKeysOnly) ||
          questionMatchesByNodeAndNormalizedId(q, unifiedKeysOnly)
      );
      if (matched.length === 0) return [];
    }
  }

  // Statuses present and every source agrees nothing is missing → show nothing (avoid flashing all vault rows).
  if (statusesHadRows) {
    const statusKeys = missingKeysFromStatuses(statuses);
    const unifiedKeys = missingKeysFromUnifiedMissing(unified);
    if (statusKeys.size === 0 && unifiedKeys.size === 0 && discKeys.size === 0) {
      return [];
    }
    // required_missing pointed at ids we have no question for, and no discovery rows — do not widen to unrelated vault fields
    if (statusKeys.size > 0 && unifiedKeys.size === 0 && discKeys.size === 0) {
      const matched = base.filter(
        (q) =>
          questionMatchesKeySet(q, statusKeys) || questionMatchesByNodeAndNormalizedId(q, statusKeys)
      );
      if (matched.length === 0) return [];
    }
  }

  return dedupeQuestions(base);
}
