import { normalizeFormFieldIdentity, normalizeFormFieldsIdentity } from '../formFieldIdentity';

describe('normalizeFormFieldIdentity — field type normalization', () => {
  it('preserves direct valid type', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'email' }, new Set());
    expect(f.type).toBe('email');
  });

  it('maps dropdown alias to select', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'dropdown' }, new Set());
    expect(f.type).toBe('select');
  });

  it('maps boolean alias to checkbox', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'boolean' }, new Set());
    expect(f.type).toBe('checkbox');
  });

  it('maps long_text alias to textarea', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'long_text' }, new Set());
    expect(f.type).toBe('textarea');
  });

  it('maps phone alias to tel', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'phone' }, new Set());
    expect(f.type).toBe('tel');
  });

  it('maps integer alias to number', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'integer' }, new Set());
    expect(f.type).toBe('number');
  });

  it('maps unknown type to text', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', type: 'fancy_widget' }, new Set());
    expect(f.type).toBe('text');
  });

  it('defaults to text when type is absent', () => {
    const f = normalizeFormFieldIdentity({ label: 'X' }, new Set());
    expect(f.type).toBe('text');
  });
});

describe('normalizeFormFieldIdentity — key / id preservation', () => {
  it('preserves an existing valid key', () => {
    const used = new Set<string>();
    const f = normalizeFormFieldIdentity({ label: 'My Field', key: 'my_key' }, used);
    expect(f.key).toBe('my_key');
    expect(f.name).toBe('my_key');
  });

  it('preserves an existing id', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', id: 'existing_id_123' }, new Set());
    expect(f.id).toBe('existing_id_123');
  });

  it('generates id from key when id is absent', () => {
    const f = normalizeFormFieldIdentity({ label: 'Name', key: 'full_name' }, new Set());
    expect(f.id).toBe('field_full_name');
  });

  it('regenerates key when existing key is a reserved word', () => {
    const used = new Set<string>();
    const f = normalizeFormFieldIdentity({ label: 'Data Field', key: 'data' }, used);
    expect(f.key).not.toBe('data');
  });

  it('deduplicates key when already in used set', () => {
    const used = new Set(['email']);
    const f = normalizeFormFieldIdentity({ label: 'Email', key: 'email' }, used);
    expect(f.key).not.toBe('email');
  });

  it('adds generated key to the used set', () => {
    const used = new Set<string>();
    normalizeFormFieldIdentity({ label: 'Name' }, used);
    expect(used.size).toBe(1);
  });
});

describe('normalizeFormFieldIdentity — label truncation', () => {
  it('preserves short labels unchanged', () => {
    const f = normalizeFormFieldIdentity({ label: 'Short' }, new Set());
    expect(f.label).toBe('Short');
  });

  it('truncates labels longer than 40 characters with ellipsis', () => {
    const longLabel = 'This Is A Very Long Label That Exceeds The Limit';
    const f = normalizeFormFieldIdentity({ label: longLabel }, new Set());
    expect(f.label.length).toBeLessThanOrEqual(40);
    expect(f.label.endsWith('…')).toBe(true);
  });
});

describe('normalizeFormFieldIdentity — required field', () => {
  it('defaults required to true when not specified', () => {
    const f = normalizeFormFieldIdentity({ label: 'X' }, new Set());
    expect(f.required).toBe(true);
  });

  it('sets required to false when explicitly false', () => {
    const f = normalizeFormFieldIdentity({ label: 'X', required: false }, new Set());
    expect(f.required).toBe(false);
  });
});

describe('normalizeFormFieldIdentity — options normalization', () => {
  it('converts string options to label/value objects', () => {
    const f = normalizeFormFieldIdentity(
      { label: 'Color', options: ['red', 'blue'] },
      new Set()
    );
    expect(f.options).toEqual([
      { label: 'red', value: 'red' },
      { label: 'blue', value: 'blue' },
    ]);
  });

  it('passes through object options with label and value', () => {
    const f = normalizeFormFieldIdentity(
      { label: 'Size', options: [{ label: 'Small', value: 'sm' }] },
      new Set()
    );
    expect(f.options).toEqual([{ label: 'Small', value: 'sm' }]);
  });

  it('sets options to undefined when field has no options', () => {
    const f = normalizeFormFieldIdentity({ label: 'Text field' }, new Set());
    expect(f.options).toBeUndefined();
  });

  it('filters out options where both label and value are empty', () => {
    const f = normalizeFormFieldIdentity(
      { label: 'X', options: [{ label: '', value: '' }, { label: 'Yes', value: 'yes' }] },
      new Set()
    );
    expect(f.options).toEqual([{ label: 'Yes', value: 'yes' }]);
  });
});

describe('normalizeFormFieldsIdentity — key deduplication across fields', () => {
  it('assigns unique keys to fields with the same label', () => {
    const fields = normalizeFormFieldsIdentity([
      { label: 'Name' },
      { label: 'Name' },
    ]);
    expect(fields[0].key).not.toBe(fields[1].key);
  });

  it('returns the correct number of fields', () => {
    const fields = normalizeFormFieldsIdentity([
      { label: 'First', type: 'text' },
      { label: 'Last', type: 'text' },
      { label: 'Email', type: 'email' },
    ]);
    expect(fields).toHaveLength(3);
  });

  it('each field has id, key, name, label, type, required', () => {
    const [f] = normalizeFormFieldsIdentity([{ label: 'Phone', type: 'phone' }]);
    expect(f).toMatchObject({
      id: expect.any(String),
      key: expect.any(String),
      name: expect.any(String),
      label: 'Phone',
      type: 'tel',
      required: true,
    });
  });
});
