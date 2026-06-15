import { describe, expect, it } from 'vitest';
import { deriveMonotonicProgress, mapBackendPhaseToProgress } from '../workflow-generation-state';

describe('workflow progress helpers', () => {
  it('maps understand phase to 20', () => {
    expect(mapBackendPhaseToProgress('understand')).toBe(20);
  });

  it('maps construction phase to 65', () => {
    expect(mapBackendPhaseToProgress('construction')).toBe(65);
  });

  it('maps completed phase to 100', () => {
    expect(mapBackendPhaseToProgress('completed')).toBe(100);
  });

  it('returns fallback progress for unknown phases', () => {
    expect(mapBackendPhaseToProgress('unknown_phase')).toBe(10);
  });

  it('keeps progress monotonic and bounded', () => {
    expect(deriveMonotonicProgress(70, 65)).toBe(70);
    expect(deriveMonotonicProgress(95, 120)).toBe(100);
  });
});

