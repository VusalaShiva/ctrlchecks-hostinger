/**
 * Tests for WorkflowGenerationStateManager
 */

import { 
  WorkflowGenerationState, 
  WorkflowGenerationStateManager,
  ALLOWED_TRANSITIONS,
  deriveMonotonicProgress,
  mapBackendPhaseToProgress,
  mapWizardStepToState,
} from '../workflow-generation-state';

describe('WorkflowGenerationStateManager', () => {
  let stateManager: WorkflowGenerationStateManager;

  beforeEach(() => {
    stateManager = new WorkflowGenerationStateManager(true); // Enable debug mode
  });

  describe('New State Transitions', () => {
    it('should transition from STATE_5_WORKFLOW_BUILDING to STATE_6_WORKFLOW_VALIDATION', () => {
      // Setup: Move to building state
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();

      // Test: Set workflow blueprint should move to validation
      const result = stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });
      
      expect(result.success).toBe(true);
      expect(stateManager.getCurrentState()).toBe(WorkflowGenerationState.STATE_6_WORKFLOW_VALIDATION);
    });

    it('should reject markWaitingForConfirmation from validation state', () => {
      // Setup: Move to validation state
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      // Test: Legacy waiting confirmation transition should fail
      const result = stateManager.markWaitingForConfirmation();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_WORKFLOW_BUILT');
    });

    it('should reject confirmWorkflow from validation state', () => {
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      // Test: Legacy confirmation transition should fail
      const result = stateManager.confirmWorkflow();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_WAITING_CONFIRMATION');
    });

    it('should reject rejectWorkflow from validation state', () => {
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      // Test: Legacy rejection transition should fail
      const result = stateManager.rejectWorkflow();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_WAITING_CONFIRMATION');
    });

    it('should reject moveToValidationFromConfirmed when not in confirmed state', () => {
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      // Test: Legacy helper requires confirmed state
      const result = stateManager.moveToValidationFromConfirmed();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_CONFIRMED');
    });
  });

  describe('Invalid Transitions', () => {
    it('should reject transition to confirm workflow unless in waiting state', () => {
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      // Try to confirm directly from validation state (should fail)
      const result = stateManager.confirmWorkflow();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_WAITING_CONFIRMATION');
    });

    it('should reject direct moveToValidationFromConfirmed unless in confirmed state', () => {
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();
      stateManager.setWorkflowBlueprint({ nodes: [], edges: [] });

      const result = stateManager.moveToValidationFromConfirmed();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Must be in STATE_CONFIRMED');
    });
  });

  describe('State Transition Rules', () => {
    it('should have correct allowed transitions for STATE_5_WORKFLOW_BUILDING', () => {
      const allowed = ALLOWED_TRANSITIONS[WorkflowGenerationState.STATE_5_WORKFLOW_BUILDING];
      
      expect(allowed).toContain(WorkflowGenerationState.STATE_6_WORKFLOW_VALIDATION);
      expect(allowed).toContain(WorkflowGenerationState.STATE_ERROR_HANDLING);
      expect(allowed.length).toBe(2);
    });

    it('should have correct allowed transitions for STATE_WORKFLOW_BUILT', () => {
      const allowed = ALLOWED_TRANSITIONS[WorkflowGenerationState.STATE_WORKFLOW_BUILT];
      
      expect(allowed).toContain(WorkflowGenerationState.STATE_ERROR_HANDLING);
      expect(allowed.length).toBe(1);
    });

    it('should have correct allowed transitions for STATE_WAITING_CONFIRMATION', () => {
      const allowed = ALLOWED_TRANSITIONS[WorkflowGenerationState.STATE_WAITING_CONFIRMATION];
      
      expect(allowed).toContain(WorkflowGenerationState.STATE_CONFIRMED);
      expect(allowed).toContain(WorkflowGenerationState.STATE_REJECTED);
      expect(allowed).toContain(WorkflowGenerationState.STATE_ERROR_HANDLING);
      expect(allowed.length).toBe(3);
    });

    it('should have correct allowed transitions for STATE_CONFIRMED', () => {
      const allowed = ALLOWED_TRANSITIONS[WorkflowGenerationState.STATE_CONFIRMED];
      
      expect(allowed).toContain(WorkflowGenerationState.STATE_6_WORKFLOW_VALIDATION);
      expect(allowed).toContain(WorkflowGenerationState.STATE_ERROR_HANDLING);
      expect(allowed.length).toBe(2);
    });

    it('should have STATE_REJECTED as terminal state', () => {
      const allowed = ALLOWED_TRANSITIONS[WorkflowGenerationState.STATE_REJECTED];
      
      expect(allowed.length).toBe(0);
    });
  });

  describe('Complete Flow', () => {
    it('should complete streamlined flow: BUILDING → VALIDATION → READY', () => {
      // Setup
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();

      // Step 1: BUILDING → VALIDATION
      let result = stateManager.setWorkflowBlueprint({ nodes: [{ id: '1' }], edges: [] });
      expect(result.success).toBe(true);
      expect(stateManager.getCurrentState()).toBe(WorkflowGenerationState.STATE_6_WORKFLOW_VALIDATION);

      // Step 2: VALIDATION → READY
      result = stateManager.markWorkflowReady();
      expect(result.success).toBe(true);
      expect(stateManager.getCurrentState()).toBe(WorkflowGenerationState.STATE_7_WORKFLOW_READY);
    });

    it('should handle error flow: BUILDING → ERROR', () => {
      // Setup
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();

      const result = stateManager.handleError('forced failure');
      expect(result.success).toBe(true);
      expect(stateManager.getCurrentState()).toBe(WorkflowGenerationState.STATE_ERROR_HANDLING);
      expect(stateManager.isTerminalState()).toBe(true);
    });
  });

  describe('moveToValidation backward compatibility', () => {
    it('should handle moveToValidation from STATE_5_WORKFLOW_BUILDING', () => {
      // Setup
      stateManager.setUserPrompt('test prompt');
      stateManager.setClarifyingQuestions([]);
      stateManager.confirmUnderstanding('test understanding');
      stateManager.startBuilding();

      // Test: moveToValidation should handle the full flow
      const result = stateManager.moveToValidation({ nodes: [{ id: '1' }], edges: [] });
      
      expect(result.success).toBe(true);
      expect(stateManager.getCurrentState()).toBe(WorkflowGenerationState.STATE_6_WORKFLOW_VALIDATION);
    });
  });
});

describe('workflow-generation progress helpers', () => {
  it('maps backend intent phase to 10%', () => {
    expect(mapBackendPhaseToProgress('intent')).toBe(10);
  });

  it('maps backend node_selection phase to 35%', () => {
    expect(mapBackendPhaseToProgress('node_selection')).toBe(40);
  });

  it('maps backend capability_selection phase to 18%', () => {
    expect(mapBackendPhaseToProgress('capability_selection')).toBe(18);
  });

  it('maps backend credential_discovery phase to 85%', () => {
    expect(mapBackendPhaseToProgress('credential_discovery')).toBe(85);
  });

  it('defaults unknown phases to 10%', () => {
    expect(mapBackendPhaseToProgress('mystery_phase')).toBe(10);
  });

  it('keeps progress monotonic when backend sends lower value', () => {
    expect(deriveMonotonicProgress(65, 40)).toBe(65);
  });

  it('clamps and advances progress safely', () => {
    expect(deriveMonotonicProgress(95, 140)).toBe(100);
    expect(deriveMonotonicProgress(-5, 20)).toBe(20);
  });

  it('maps capability-selection wizard step to pre-confirmation state', () => {
    expect(mapWizardStepToState('capability-selection')).toBe(WorkflowGenerationState.STATE_2_CLARIFICATION_ACTIVE);
  });
});
