import { normalizeFormTriggerOutput } from '../form-trigger';

describe('normalizeFormTriggerOutput', () => {
  it('returns data sub-object when non-empty (trigger-service shape)', () => {
    const input = { _form: true, nodeId: 'node_1', email: 'x@y.com', data: { email: 'x@y.com' } };
    expect(normalizeFormTriggerOutput(input)).toEqual({ email: 'x@y.com' });
  });

  it('returns data sub-object when non-empty (local form-trigger resume shape)', () => {
    const input = { submitted_at: '2026-06-20T00:00:00Z', form: { id: 'node_1' }, data: { name: 'Alice', age: 30 } };
    expect(normalizeFormTriggerOutput(input)).toEqual({ name: 'Alice', age: 30 });
  });

  it('falls back to top-level keys when data is missing', () => {
    const input = { _form: true, nodeId: 'node_1', email: 'x@y.com', phone: '555' };
    expect(normalizeFormTriggerOutput(input)).toEqual({ email: 'x@y.com', phone: '555' });
  });

  it('excludes meta keys from top-level fallback', () => {
    const input = { _form: true, nodeId: 'node_2', trigger: 'form', files: [], email: 'a@b.com' };
    expect(normalizeFormTriggerOutput(input)).toEqual({ email: 'a@b.com' });
  });

  it('excludes _-prefixed keys from top-level fallback', () => {
    const input = { _form: true, _internal: 'x', name: 'Bob' };
    expect(normalizeFormTriggerOutput(input)).toEqual({ name: 'Bob' });
  });

  it('returns empty object for empty data and no user keys', () => {
    const input = { _form: true, nodeId: 'node_3', data: {} };
    expect(normalizeFormTriggerOutput(input)).toEqual({});
  });

  it('returns empty object for null input', () => {
    expect(normalizeFormTriggerOutput(null)).toEqual({});
  });

  it('returns empty object for non-object input', () => {
    expect(normalizeFormTriggerOutput('string')).toEqual({});
    expect(normalizeFormTriggerOutput(42)).toEqual({});
  });

  it('handles multiple user fields in data sub-object', () => {
    const input = {
      _form: true,
      nodeId: 'node_4',
      email: 'x@y.com',
      name: 'Carol',
      data: { email: 'x@y.com', name: 'Carol', age: 25 },
    };
    expect(normalizeFormTriggerOutput(input)).toEqual({ email: 'x@y.com', name: 'Carol', age: 25 });
  });
});
