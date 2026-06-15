import { describe, it, expect, vi } from 'vitest';
import { invalidateAfterConnectionChange } from '../queryInvalidation';
import { QUERY_KEYS } from '../queryKeys';

describe('QUERY_KEYS', () => {
  it('connections key is ["connections"]', () => {
    expect(QUERY_KEYS.connections).toEqual(['connections']);
  });

  it('credentialTypes key is ["credential-types"]', () => {
    expect(QUERY_KEYS.credentialTypes).toEqual(['credential-types']);
  });
});

describe('invalidateAfterConnectionChange', () => {
  it('invalidates connections query', () => {
    const qc = { invalidateQueries: vi.fn() } as any;
    invalidateAfterConnectionChange(qc);
    expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.connections });
  });

  it('invalidates credential-types query', () => {
    const qc = { invalidateQueries: vi.fn() } as any;
    invalidateAfterConnectionChange(qc);
    expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.credentialTypes });
  });

  it('calls invalidateQueries exactly twice', () => {
    const qc = { invalidateQueries: vi.fn() } as any;
    invalidateAfterConnectionChange(qc);
    expect(qc.invalidateQueries).toHaveBeenCalledTimes(2);
  });
});
