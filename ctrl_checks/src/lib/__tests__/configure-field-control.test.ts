import { resolveConfigureFieldType } from '../configure-field-control';

describe('resolveConfigureFieldType', () => {
  it('returns select when schema sends select with options', () => {
    expect(
      resolveConfigureFieldType({
        inputType: 'select',
        options: [{ label: 'A', value: 'a' }],
      })
    ).toBe('select');
  });

  it('returns textarea for json widget', () => {
    expect(
      resolveConfigureFieldType({
        inputType: 'text',
        uiWidget: 'json',
      })
    ).toBe('textarea');
  });

  it('falls back to text when metadata is absent', () => {
    expect(resolveConfigureFieldType({})).toBe('text');
  });
});
