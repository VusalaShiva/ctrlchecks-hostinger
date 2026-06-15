/**
 * Client-side mirror of worker credential wizard mapper (fallback when API omits credentialWizardView).
 */

export type CredentialWizardCredentialKind = 'oauth' | 'api_key' | 'webhook' | 'token' | 'other';

export type CredentialWizardStatus = 'required_missing' | 'resolved_connected' | 'not_required';

export type CredentialWizardOwnershipSummary =
  | 'user'
  | 'ai_runtime'
  | 'locked'
  | 'unlockable_locked'
  | 'selectable';

/** Rows from API may omit displayName on older workers — UI must tolerate undefined. */
export interface CredentialStatusRow {
  nodeId: string;
  nodeType?: string;
  nodeLabel?: string;
  credentialId: string;
  displayName?: string;
  status: CredentialWizardStatus;
}

export interface CredentialWizardRow {
  nodeId: string;
  nodeType: string;
  nodeLabel: string;
  questionId: string;
  fieldName: string;
  displayTitle: string;
  subtitle: string;
  kind: CredentialWizardCredentialKind;
  status: CredentialWizardStatus;
  ownershipSummary: CredentialWizardOwnershipSummary;
  aiPrefilled: boolean;
  requiresInput: boolean;
  askOrder: number;
}

export interface CredentialWizardNodeGroup {
  nodeId: string;
  nodeType: string;
  nodeLabel: string;
  rows: CredentialWizardRow[];
}

/** Shape subset of comprehensive node questions used by the mapper. */
export interface WizardCredentialQuestionLike {
  id: string;
  text?: string;
  description?: string;
  fieldName: string;
  nodeId: string;
  nodeType: string;
  nodeLabel: string;
  category?: string;
  ownershipClass?: string;
  ownershipUiMode?: string;
  ownershipLockReason?: string;
  isUnlockableCredential?: boolean;
  fillModeDefault?: string;
  aiFilledAtBuildTime?: boolean;
  defaultValue?: unknown;
  askOrder?: number;
}

function norm(s: string | undefined | null): string {
  return String(s ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_\s-]+/g, '');
}

function inferKind(q: WizardCredentialQuestionLike): CredentialWizardCredentialKind {
  const fn = norm(q.fieldName);
  const text = norm(q.text || '');
  if (fn === 'authtype' || text.includes('oauth')) return 'oauth';
  if (fn.includes('webhook') || text.includes('webhook')) return 'webhook';
  if (fn.includes('apikey') || fn.includes('api_key') || text.includes('apikey')) return 'api_key';
  if (fn.includes('token') || fn.includes('secret') || text.includes('token')) return 'token';
  return 'other';
}

function ownershipSummaryFromQuestion(q: WizardCredentialQuestionLike): CredentialWizardOwnershipSummary {
  const locked = q.ownershipUiMode === 'locked';
  if (locked && q.isUnlockableCredential) return 'unlockable_locked';
  if (locked) return 'locked';
  if (q.ownershipUiMode === 'selectable' || q.ownershipUiMode === 'user_only') {
    if (q.fillModeDefault === 'runtime_ai') return 'ai_runtime';
    return 'selectable';
  }
  if (q.fillModeDefault === 'runtime_ai') return 'ai_runtime';
  return 'user';
}

function aiPrefilledFromQuestion(q: WizardCredentialQuestionLike): boolean {
  if (q.aiFilledAtBuildTime) return true;
  const dv = String(q.defaultValue ?? '').trim();
  if (!dv) return false;
  return q.fillModeDefault === 'buildtime_ai_once';
}

function isCredentialWizardQuestion(q: WizardCredentialQuestionLike): boolean {
  return q.category === 'credential' || q.ownershipClass === 'credential';
}

export function matchCredentialStatusForQuestion(
  q: WizardCredentialQuestionLike,
  statuses: CredentialStatusRow[]
): CredentialWizardStatus {
  const nodeRows = statuses.filter((s) => s.nodeId === q.nodeId && s.credentialId !== 'none');
  if (nodeRows.length === 0) return 'not_required';

  const fn = norm(q.fieldName);
  const text = norm(q.text || '');

  const scoreRow = (r: CredentialStatusRow): number => {
    const cid = norm(r.credentialId);
    const dn = norm(r.displayName);
    let score = 0;
    if (fn && (cid.includes(fn) || fn.includes(cid))) score += 5;
    if (fn && dn.includes(fn)) score += 4;
    if (text && dn && (text.includes(dn.slice(0, 12)) || dn.includes(text.slice(0, 12)))) score += 2;
    if (q.fieldName === 'authType' && (dn.includes('google') || cid.includes('google'))) score += 1;
    return score;
  };

  let best: CredentialStatusRow | null = null;
  let bestScore = 0;
  for (const r of nodeRows) {
    const sc = scoreRow(r);
    if (sc > bestScore) {
      bestScore = sc;
      best = r;
    }
  }

  if (best && bestScore > 0) return best.status;
  if (nodeRows.length === 1) return nodeRows[0].status;
  if (nodeRows.some((r) => r.status === 'required_missing')) return 'required_missing';
  return nodeRows[0]?.status ?? 'not_required';
}

export function buildCredentialWizardRows(
  questions: WizardCredentialQuestionLike[],
  credentialStatuses: CredentialStatusRow[]
): CredentialWizardRow[] {
  const credQs = questions.filter(isCredentialWizardQuestion);
  const rows: CredentialWizardRow[] = [];

  for (const q of credQs) {
    const status = matchCredentialStatusForQuestion(q, credentialStatuses);
    const displayTitle =
      (q.text && q.text.trim()) ||
      (q.description && String(q.description).trim().split('\n')[0]) ||
      q.fieldName.replace(/([A-Z])/g, ' $1').trim();
    const subtitle =
      (q.description && String(q.description) !== displayTitle ? String(q.description) : '') ||
      `${q.nodeLabel} · ${q.fieldName}`;

    const ownershipSummary = ownershipSummaryFromQuestion(q);
    const aiPrefilled = aiPrefilledFromQuestion(q);
    const requiresInput = status === 'required_missing' && q.category === 'credential';

    rows.push({
      nodeId: q.nodeId,
      nodeType: q.nodeType,
      nodeLabel: q.nodeLabel,
      questionId: q.id,
      fieldName: q.fieldName,
      displayTitle,
      subtitle: subtitle.slice(0, 280),
      kind: inferKind(q),
      status,
      ownershipSummary,
      aiPrefilled,
      requiresInput,
      askOrder: q.askOrder ?? 999,
    });
  }

  rows.sort((a, b) => {
    if (a.nodeLabel !== b.nodeLabel) return a.nodeLabel.localeCompare(b.nodeLabel);
    return a.askOrder - b.askOrder;
  });

  return rows;
}

export function groupCredentialWizardRows(rows: CredentialWizardRow[]): CredentialWizardNodeGroup[] {
  const byNode = new Map<string, CredentialWizardNodeGroup>();
  for (const r of rows) {
    if (!byNode.has(r.nodeId)) {
      byNode.set(r.nodeId, {
        nodeId: r.nodeId,
        nodeType: r.nodeType,
        nodeLabel: r.nodeLabel,
        rows: [],
      });
    }
    byNode.get(r.nodeId)!.rows.push(r);
  }
  return Array.from(byNode.values()).sort((a, b) => a.nodeLabel.localeCompare(b.nodeLabel));
}

/**
 * Normalizes API / cached payloads so buildCredentialWizardView never sees rows
 * missing displayName or with invalid shape (older workers, partial JSON).
 */
export function sanitizeCredentialStatusesForWizardView(
  rows: unknown[] | null | undefined
): CredentialStatusRow[] {
  if (!Array.isArray(rows)) return [];
  const out: CredentialStatusRow[] = [];
  for (const raw of rows) {
    if (!raw || typeof raw !== 'object') continue;
    const r = raw as Record<string, unknown>;
    const nodeId = String(r.nodeId ?? '').trim();
    const credentialId = String(r.credentialId ?? '').trim();
    const st = String(r.status ?? '').trim();
    if (!nodeId || !credentialId) continue;
    if (st !== 'required_missing' && st !== 'resolved_connected' && st !== 'not_required') continue;
    const displayNameRaw = r.displayName;
    const displayName =
      typeof displayNameRaw === 'string' && displayNameRaw.trim()
        ? displayNameRaw.trim()
        : credentialId;
    const row: CredentialStatusRow = {
      nodeId,
      credentialId,
      status: st as CredentialWizardStatus,
      displayName,
    };
    if (typeof r.nodeType === 'string' && r.nodeType.trim()) row.nodeType = r.nodeType.trim();
    if (typeof r.nodeLabel === 'string' && r.nodeLabel.trim()) row.nodeLabel = r.nodeLabel.trim();
    out.push(row);
  }
  return out;
}

export function buildCredentialWizardView(
  questions: WizardCredentialQuestionLike[],
  credentialStatuses: CredentialStatusRow[]
): { rows: CredentialWizardRow[]; groups: CredentialWizardNodeGroup[] } {
  const rows = buildCredentialWizardRows(questions, credentialStatuses);
  return { rows, groups: groupCredentialWizardRows(rows) };
}
