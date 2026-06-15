/**
 * Mirror of worker snapshotConfigFieldToString for wizard pre-fill (no worker import in SPA).
 */
export function snapshotConfigFieldToString(value: unknown): string | undefined {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value, null, 2);
        } catch {
            return String(value);
        }
    }
    return String(value);
}
