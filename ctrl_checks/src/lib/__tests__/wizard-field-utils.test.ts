import { normalizeSelectValue } from '../wizard-field-utils';

describe('normalizeSelectValue', () => {
  const opts = [
    { label: 'Manual', value: 'manual_entry' },
    { label: 'Sheet', value: 'extract_from_sheet' },
  ];

  it('returns empty when raw is invalid prose not in options and no valid fallback', () => {
    expect(
      normalizeSelectValue(
        'How recipients are chosen when sending. Manual: type addresses',
        undefined,
        opts
      )
    ).toBe('');
  });

  it('returns valid raw when it matches an option', () => {
    expect(normalizeSelectValue('manual_entry', undefined, opts)).toBe('manual_entry');
  });

  it('falls back to default only when it is a valid option', () => {
    expect(normalizeSelectValue(undefined, 'extract_from_sheet', opts)).toBe('extract_from_sheet');
  });
});
