/**
 * Single derived model for wizard field ownership + credentials.
 * All rows come from comprehensive questions merged with live node config snapshots.
 */

/** User-visible explanations for locked or non-runtime-AI field ownership rows. */
export const WIZARD_OWNERSHIP_LOCK_COPY: Record<string, string> = {
    structural: 'Fixed schema structure; not switchable here.',
    value: 'This value is controlled by schema or policy; AI runtime may not apply.',
    credential: 'Secret or account field; use the Credentials step or unlock when available.',
    runtime_ai_default: 'Default is AI at runtime for this field.',
    ai_filled: 'Already filled by AI at build time.',
    vault_or_oauth: 'Use the Credentials step to connect accounts or secrets.',
    credential_locked_until_unlock:
        'Secret field: enable “Unlock ownership” below to choose User vs AI Runtime (when supported).',
    manual_only: 'Manual only.',
    no_runtime_ai: 'AI runtime is not supported for this field.',
};

export function explainWizardOwnershipRow(
    question: Record<string, any>,
    opts: { locked: boolean; aiDisabled: boolean }
): string | null {
    const { locked, aiDisabled } = opts;
    const reason = question.ownershipLockReason != null ? String(question.ownershipLockReason) : '';
    if (locked && reason) {
        return WIZARD_OWNERSHIP_LOCK_COPY[reason] || reason;
    }
    if (locked) {
        const oc = String(question.ownershipClass || '');
        if (oc && WIZARD_OWNERSHIP_LOCK_COPY[oc]) return WIZARD_OWNERSHIP_LOCK_COPY[oc];
        if (question.isUnlockableCredential) return WIZARD_OWNERSHIP_LOCK_COPY.vault_or_oauth;
        return WIZARD_OWNERSHIP_LOCK_COPY.manual_only;
    }
    if (aiDisabled && question.supportsRuntimeAI === false) {
        if (question.supportsBuildtimeAI !== false) {
            return "AI at runtime isn't available for this field; use AI (build) or You.";
        }
        return WIZARD_OWNERSHIP_LOCK_COPY.no_runtime_ai;
    }
    return null;
}

export type WizardFieldPlaneRow = {
    /** Full question payload (worker comprehensive question shape). */
    question: Record<string, any>;
    /** Stable key for overrides / debugging */
    planeKey: string;
    valueSnapshot: unknown;
    isEmpty: boolean;
};

function norm(s: unknown): string {
    return String(s ?? '').trim().toLowerCase();
}

/** Read config field from node list (camelCase / snake_case tolerant). */
export function getConfigValueForField(
    nodes: any[] | undefined,
    nodeId: string,
    fieldName: string
): unknown {
    if (!Array.isArray(nodes) || !nodeId || !fieldName) return undefined;
    const node = nodes.find((n) => String(n?.id || '') === String(nodeId));
    const cfg = node?.data?.config;
    if (!cfg || typeof cfg !== 'object') return undefined;
    if (fieldName in cfg) return (cfg as any)[fieldName];
    const snake = fieldName.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (snake in cfg) return (cfg as any)[snake];
    return undefined;
}

export function isConfigValueEmpty(value: unknown): boolean {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') {
        const t = value.trim();
        if (t === '') return true;
        if (t.startsWith('{{') && t.endsWith('}}')) {
            const tl = t.toLowerCase();
            const looksLikeEnvRef =
                tl.includes('env.') || tl.includes('$env') || /\{\{\s*env\./i.test(t);
            if (looksLikeEnvRef && !tl.includes('$json') && !tl.includes('input') && !tl.includes('trigger')) {
                return true;
            }
        }
        const tl = t.toLowerCase();
        if (tl.includes('placeholder') || tl.includes('example') || tl.includes('your_') || tl.includes('enter_')) {
            return true;
        }
        return false;
    }
    if (typeof value === 'boolean' || typeof value === 'number') return false;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value as object).length === 0;
    return false;
}

function isLogOutputLevelRow(q: Record<string, any>): boolean {
    return norm(q.nodeType) === 'log_output' && norm(q.fieldName) === 'level';
}

function isVaultCredentialRow(q: Record<string, any>): boolean {
    // Explicit vault credential flag with credential category/class
    if (
        !!(q as any).isVaultCredential &&
        (q.category === 'credential' || q.ownershipClass === 'credential')
    ) {
        return true;
    }
    // Bug C fix: also exclude questions where type is 'credentialId' or category is 'credentials' (plural)
    // These are credential questions that may not have isVaultCredential set (e.g. from workflow-analyzer)
    if (q.type === 'credentialId' || q.category === 'credentials') {
        return true;
    }
    return false;
}

/**
 * Build one row per comprehensive question with live config snapshot from workflow nodes.
 */
export function buildFieldPlaneRows(questions: any[], nodes: any[] | undefined): WizardFieldPlaneRow[] {
    const list = Array.isArray(questions) ? questions : [];
    const out: WizardFieldPlaneRow[] = [];
    for (const q of list) {
        if (!q || typeof q !== 'object') continue;
        const nodeId = String(q.nodeId || '').trim();
        const fieldName = String(q.fieldName || '').trim();
        if (!nodeId || !fieldName) continue;
        const planeKey = `${nodeId}::${norm(fieldName)}`;
        const valueSnapshot = getConfigValueForField(nodes, nodeId, fieldName);
        const isEmpty = isConfigValueEmpty(valueSnapshot);
        out.push({
            question: q,
            planeKey,
            valueSnapshot,
            isEmpty,
        });
    }
    return out;
}

/** Field Ownership step: every row except vault secrets and log level noise. */
export function selectOwnershipQuestionsFromPlane(rows: WizardFieldPlaneRow[]): any[] {
    return rows
        .filter((r) => !isLogOutputLevelRow(r.question) && !isVaultCredentialRow(r.question))
        .map((r) => r.question);
}

/** Vault credential questions for Credentials step filtering (same set as before). */
export function selectVaultCredentialQuestionsFromPlane(rows: WizardFieldPlaneRow[]): any[] {
    return rows.filter((r) => isVaultCredentialRow(r.question)).map((r) => r.question);
}

export function findPlaneRow(rows: WizardFieldPlaneRow[], nodeId: string, fieldName: string): WizardFieldPlaneRow | undefined {
    const key = `${String(nodeId).trim()}::${norm(fieldName)}`;
    return rows.find((r) => r.planeKey === key);
}
