import { describe, expect, it } from 'vitest';
import { mapBackendPhaseToProgress, mapWizardStepToState, WorkflowGenerationState } from '../workflow-generation-state';

describe('workflow generation capability-stage mapping', () => {
  it('maps capability_selection backend phase to deterministic progress', () => {
    expect(mapBackendPhaseToProgress('capability_selection')).toBe(18);
  });

  it('maps capability-selection wizard step to confirmed-understanding state', () => {
    expect(mapWizardStepToState('capability-selection')).toBe(
      WorkflowGenerationState.STATE_3_UNDERSTANDING_CONFIRMED,
    );
  });
});

