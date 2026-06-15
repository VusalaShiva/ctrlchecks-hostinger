/**
 * Wizard configuration step — keep select values aligned with schema options only.
 * Prevents bad persisted/config values (e.g. description text) from appearing as the "value".
 */

export function normalizeSelectValue(
  raw: unknown,
  fallbackDefault: unknown,
  options: Array<{ label: string; value: string }> | undefined
): string {
  const optionValues = new Set(
    (options ?? []).map((o) => String(o.value)).filter((v) => v.trim().length > 0)
  );
  if (optionValues.size === 0) {
    if (raw !== undefined && raw !== null && String(raw) !== '') return String(raw);
    if (fallbackDefault !== undefined && fallbackDefault !== null && String(fallbackDefault) !== '') {
      return String(fallbackDefault);
    }
    return '';
  }

  const pick = (v: unknown): string => {
    if (v === undefined || v === null) return '';
    const s = String(v).trim();
    return s !== '' && optionValues.has(s) ? s : '';
  };

  return pick(raw) || pick(fallbackDefault);
}
