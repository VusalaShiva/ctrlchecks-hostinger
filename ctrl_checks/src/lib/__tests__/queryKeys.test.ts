import { describe, expect, expectTypeOf, it } from 'vitest';
import { QUERY_KEYS } from '../queryKeys';

describe('QUERY_KEYS', () => {
  it('exports the exact supported query key map', () => {
    expect(QUERY_KEYS).toStrictEqual({
      connections: ['connections'],
      credentialTypes: ['credential-types'],
    });
  });

  it('keeps the public query key names stable', () => {
    expect(Object.keys(QUERY_KEYS)).toEqual(['connections', 'credentialTypes']);
  });

  it('keeps each query key as a single-segment tuple', () => {
    for (const queryKey of Object.values(QUERY_KEYS)) {
      expect(Array.isArray(queryKey)).toBe(true);
      expect(queryKey).toHaveLength(1);
    }
  });

  it('does not reuse query key values across entries', () => {
    const serializedValues = Object.values(QUERY_KEYS).map((queryKey) => JSON.stringify(queryKey));

    expect(new Set(serializedValues).size).toBe(serializedValues.length);
  });

  it('exposes readonly const tuple types for React Query keys', () => {
    expectTypeOf(QUERY_KEYS).toEqualTypeOf<{
      readonly connections: readonly ['connections'];
      readonly credentialTypes: readonly ['credential-types'];
    }>();
    expectTypeOf(QUERY_KEYS.connections).toEqualTypeOf<readonly ['connections']>();
    expectTypeOf(QUERY_KEYS.credentialTypes).toEqualTypeOf<readonly ['credential-types']>();
  });
});
