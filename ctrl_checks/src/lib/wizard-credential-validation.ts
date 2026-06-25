const BACKEND_CREDENTIAL_FIELD_MAX_LEN = 256;

function isNonEmptyTrimmedString(v: unknown): v is string {
    return typeof v === 'string' && v.trim().length > 0;
}

function hasNoDisallowedCredentialChars(s: string, allowNewlines: boolean): boolean {
    if (allowNewlines) {
        // eslint-disable-next-line no-control-regex
        return !/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(s);
    }
    // eslint-disable-next-line no-control-regex
    return !/[\r\n\x00-\x1f]/.test(s);
}

/**
 * Second-pass validation for `discoveredCredentials` rows from the backend.
 * Invalid rows are omitted (no throw); callers should toast `invalidCount` if positive.
 */
export function partitionValidatedDiscoveredCredentials(rows: unknown): { validRows: any[]; invalidCount: number } {
    if (!Array.isArray(rows)) return { validRows: [], invalidCount: 0 };
    const validRows: any[] = [];
    let invalidCount = 0;
    for (const cred of rows) {
        if (!cred || typeof cred !== 'object') {
            invalidCount++;
            continue;
        }
        const c = cred as Record<string, unknown>;
        const hasVk = isNonEmptyTrimmedString(c.vaultKey);
        const hasDn = isNonEmptyTrimmedString(c.displayName);
        if (!hasVk && !hasDn) {
            invalidCount++;
            continue;
        }
        if (hasVk) {
            const t = (c.vaultKey as string).trim();
            if (t.length > BACKEND_CREDENTIAL_FIELD_MAX_LEN || !hasNoDisallowedCredentialChars(t, false)) {
                invalidCount++;
                continue;
            }
        }
        if (hasDn) {
            const t = (c.displayName as string).trim();
            if (t.length > BACKEND_CREDENTIAL_FIELD_MAX_LEN || !hasNoDisallowedCredentialChars(t, true)) {
                invalidCount++;
                continue;
            }
        }
        validRows.push(cred);
    }
    return { validRows, invalidCount };
}

/** Validates `requiredCredentials` string entries from the backend. */
export function partitionValidatedRequiredCredentialStrings(arr: unknown): { strings: string[]; invalidCount: number } {
    if (!Array.isArray(arr)) return { strings: [], invalidCount: 0 };
    const strings: string[] = [];
    let invalidCount = 0;
    for (const item of arr) {
        if (typeof item !== 'string') {
            invalidCount++;
            continue;
        }
        const t = item.trim();
        if (t.length === 0 || t.length > BACKEND_CREDENTIAL_FIELD_MAX_LEN || !hasNoDisallowedCredentialChars(t, false)) {
            invalidCount++;
            continue;
        }
        strings.push(t);
    }
    return { strings, invalidCount };
}
