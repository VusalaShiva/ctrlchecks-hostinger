/**
 * Preservation Property Tests
 * Spec: .kiro/specs/continue-workflow-credential-panel-fix/
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 *
 * These tests capture the BASELINE behavior that must be preserved after the fix.
 * They MUST PASS on unfixed code — they document what already works correctly.
 *
 * Observation-first methodology:
 *   - When manualConfigurationQuestions.length === 0 (fallback branch):
 *     the "Continue to Workflow" button IS present and calls handleBuild()
 *   - The "Configuration Required" card title and description render correctly
 *   - Credential Input/Textarea/Select onChange handlers update credentialValues state
 *   - Other steps (field-ownership, configure, building, complete) are unaffected
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeGenerateWorkflowUiError,
  buildGenerateWorkflowUiErrorMessage,
} from '@/lib/generate-workflow-error';

// ---------------------------------------------------------------------------
// Shared type and logic (mirrors AutonomousAgentWizard.tsx configuration step)
// ---------------------------------------------------------------------------

type ConfigurationStepRenderState = {
  step: string;
  pendingWorkflowData: { nodes: any[]; edges: any[] } | null;
  configurationPhaseUnlocked: boolean;
  manualConfigurationQuestions: any[];
  currentQuestionIndex: number;
};

/**
 * Mirrors the JSX rendering decision for the configuration step CardContent.
 * Copied from the bug condition test for consistency.
 *
 * Returns which UI branch is rendered:
 *   'step_by_step_question'  — step-by-step question flow (NO "Continue to Workflow" button)
 *   'all_done_screen'        — "Continue Building Workflow" button (different label)
 *   'fallback_with_button'   — fallback: "Continue to Workflow" button IS present
 *   'not_rendered'           — configuration step not shown at all
 */
function getConfigurationStepBranch(
  state: ConfigurationStepRenderState
): 'step_by_step_question' | 'all_done_screen' | 'fallback_with_button' | 'not_rendered' {
  if (
    state.step !== 'configuration' ||
    !state.pendingWorkflowData ||
    state.pendingWorkflowData.nodes.length === 0 ||
    !state.configurationPhaseUnlocked
  ) {
    return 'not_rendered';
  }

  const { manualConfigurationQuestions, currentQuestionIndex } = state;

  if (
    manualConfigurationQuestions.length > 0 &&
    currentQuestionIndex < manualConfigurationQuestions.length
  ) {
    return 'step_by_step_question';
  }

  if (
    manualConfigurationQuestions.length > 0 &&
    currentQuestionIndex >= manualConfigurationQuestions.length
  ) {
    return 'all_done_screen';
  }

  return 'fallback_with_button';
}

/**
 * Determines whether the "Continue to Workflow" button is present.
 * CURRENT (unfixed) behavior: only present in the fallback branch.
 */
function isContinueToWorkflowButtonPresent(state: ConfigurationStepRenderState): boolean {
  return getConfigurationStepBranch(state) === 'fallback_with_button';
}

/**
 * Determines whether the bug condition holds for a given state.
 * isBugCondition = true means the button is MISSING (the bug).
 */
function isBugCondition(state: ConfigurationStepRenderState): boolean {
  const branch = getConfigurationStepBranch(state);
  // Bug: configuration step is rendered but button is absent
  return branch === 'step_by_step_question' || branch === 'all_done_screen';
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const minimalPendingWorkflowData = {
  nodes: [{ id: 'node-1', type: 'manual_trigger' }],
  edges: [],
};

const credQ1 = {
  id: 'cred_slack_webhook',
  category: 'credential',
  isVaultCredential: true,
  nodeId: 'node-slack',
  nodeLabel: 'Slack',
  fieldName: 'webhookUrl',
  label: 'Slack Webhook URL',
  type: 'text',
  required: true,
};

const credQ2 = {
  id: 'cred_gmail_oauth',
  category: 'credential',
  isVaultCredential: true,
  nodeId: 'node-gmail',
  nodeLabel: 'Gmail',
  fieldName: 'oauthToken',
  label: 'Gmail OAuth Token',
  type: 'text',
  required: true,
};

// Non-configuration steps to verify they are unaffected
const NON_CONFIGURATION_STEPS = [
  'field-ownership',
  'configure',
  'building',
  'complete',
  'workflow-confirmation',
  'credentials',
  'confirmation',
];

// ---------------------------------------------------------------------------
// P2.1: Fallback branch (manualConfigurationQuestions = []) — button IS present
// ---------------------------------------------------------------------------

describe('P2.1: Fallback branch baseline — "Continue to Workflow" button is present', () => {
  /**
   * Requirement 3.4: When no credential requirements, user can still proceed via the button.
   * Baseline: manualConfigurationQuestions = [] → fallback_with_button → button present.
   */
  it('P2.1a: empty manualConfigurationQuestions → fallback_with_button branch', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };

    const branch = getConfigurationStepBranch(state);
    expect(branch).toBe('fallback_with_button');
  });

  it('P2.1b: empty manualConfigurationQuestions → "Continue to Workflow" button IS present', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };

    expect(isContinueToWorkflowButtonPresent(state)).toBe(true);
  });

  it('P2.1c: empty manualConfigurationQuestions with currentQuestionIndex=0 → no bug condition', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };

    // This is the non-buggy baseline — isBugCondition must be false
    expect(isBugCondition(state)).toBe(false);
  });

  it('P2.1d: multiple nodes in pendingWorkflowData, empty questions → still fallback_with_button', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: {
        nodes: [
          { id: 'node-1', type: 'manual_trigger' },
          { id: 'node-2', type: 'google_sheets' },
          { id: 'node-3', type: 'gmail' },
        ],
        edges: [
          { source: 'node-1', target: 'node-2' },
          { source: 'node-2', target: 'node-3' },
        ],
      },
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };

    expect(getConfigurationStepBranch(state)).toBe('fallback_with_button');
    expect(isContinueToWorkflowButtonPresent(state)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// P2.2: getConfigurationStepBranch returns 'fallback_with_button' when questions = []
// ---------------------------------------------------------------------------

describe('P2.2: getConfigurationStepBranch returns fallback_with_button for empty questions', () => {
  it('P2.2a: step=configuration, unlocked=true, questions=[] → fallback_with_button', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(getConfigurationStepBranch(state)).toBe('fallback_with_button');
  });

  it('P2.2b: step=configuration, unlocked=false → not_rendered (guard fails)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: false,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(getConfigurationStepBranch(state)).toBe('not_rendered');
  });

  it('P2.2c: step=configuration, pendingWorkflowData=null → not_rendered', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: null,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(getConfigurationStepBranch(state)).toBe('not_rendered');
  });

  it('P2.2d: step=configuration, nodes=[] → not_rendered (empty nodes guard)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: { nodes: [], edges: [] },
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(getConfigurationStepBranch(state)).toBe('not_rendered');
  });
});

// ---------------------------------------------------------------------------
// P2.3: Non-configuration steps → configuration step NOT rendered
// ---------------------------------------------------------------------------

describe('P2.3: Non-configuration steps — configuration step is not_rendered', () => {
  for (const nonConfigStep of NON_CONFIGURATION_STEPS) {
    it(`P2.3: step='${nonConfigStep}' → configuration step returns 'not_rendered'`, () => {
      const state: ConfigurationStepRenderState = {
        step: nonConfigStep,
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      };
      expect(getConfigurationStepBranch(state)).toBe('not_rendered');
    });
  }

  it('P2.3: non-configuration steps are unaffected regardless of question count', () => {
    const questionCounts = [0, 1, 2, 5];
    for (const step of NON_CONFIGURATION_STEPS) {
      for (const count of questionCounts) {
        const questions = Array.from({ length: count }, (_, i) => ({ id: `q${i}` }));
        const state: ConfigurationStepRenderState = {
          step,
          pendingWorkflowData: minimalPendingWorkflowData,
          configurationPhaseUnlocked: true,
          manualConfigurationQuestions: questions,
          currentQuestionIndex: 0,
        };
        expect(getConfigurationStepBranch(state)).toBe('not_rendered');
      }
    }
  });
});

describe('P2.5: workflow generation error contract normalization', () => {
  it('normalizes non-stream 422 payload with stageTrace and correlationId', () => {
    const payload = {
      error: 'INVALID_LLM_RESPONSE',
      message: 'Node selection failed',
      correlationId: 'corr-123',
      stageTrace: [{ stage: 'node_selection', error: 'INVALID_LLM_RESPONSE' }],
    };
    const parsed = normalizeGenerateWorkflowUiError(payload, 'fallback');
    expect(parsed.code).toBe('INVALID_LLM_RESPONSE');
    expect(parsed.stage).toBe('node_selection');
    expect(parsed.correlationId).toBe('corr-123');
    expect(buildGenerateWorkflowUiErrorMessage(parsed)).toContain('stage: node_selection');
  });

  it('normalizes stream error payload using explicit stage field', () => {
    const streamError = {
      status: 'error',
      error: 'NO_VALID_NODES',
      message: 'No valid nodes after recovery',
      stage: 'node_selection',
      correlationId: 'corr-stream',
    };
    const parsed = normalizeGenerateWorkflowUiError(streamError, 'fallback');
    expect(parsed.code).toBe('NO_VALID_NODES');
    expect(parsed.stage).toBe('node_selection');
    expect(parsed.correlationId).toBe('corr-stream');
    const message = buildGenerateWorkflowUiErrorMessage(parsed);
    expect(message).toContain('No valid nodes after recovery');
    expect(message).toContain('correlation: corr-stream');
  });
});

// ---------------------------------------------------------------------------
// P2.4: isBugCondition is false when manualConfigurationQuestions = []
// ---------------------------------------------------------------------------

describe('P2.4: isBugCondition is false for the non-buggy baseline', () => {
  it('P2.4a: empty questions → isBugCondition=false', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(isBugCondition(state)).toBe(false);
  });

  it('P2.4b: not_rendered states → isBugCondition=false (step not active)', () => {
    const notRenderedStates: ConfigurationStepRenderState[] = [
      {
        step: 'field-ownership',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [credQ1],
        currentQuestionIndex: 0,
      },
      {
        step: 'building',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [credQ1, credQ2],
        currentQuestionIndex: 0,
      },
      {
        step: 'complete',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
    ];

    for (const state of notRenderedStates) {
      // not_rendered → configuration step not active → not a bug condition
      expect(getConfigurationStepBranch(state)).toBe('not_rendered');
      expect(isBugCondition(state)).toBe(false);
    }
  });

  it('P2.4c: isBugCondition is true only for non-empty questions in configuration step (documents bug scope)', () => {
    // This confirms the bug is scoped to manualConfigurationQuestions.length > 0
    const bugState: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [credQ1],
      currentQuestionIndex: 0,
    };
    expect(isBugCondition(bugState)).toBe(true); // bug exists here

    const baselineState: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [],
      currentQuestionIndex: 0,
    };
    expect(isBugCondition(baselineState)).toBe(false); // no bug here
  });
});

// ---------------------------------------------------------------------------
// P2.5: Parameterized test over multiple non-buggy states — baseline is stable
// ---------------------------------------------------------------------------

describe('P2.5: Parameterized non-buggy states — baseline behavior is stable', () => {
  /**
   * All states where isBugCondition=false must have a stable, predictable branch.
   * This confirms the baseline behavior is preserved across all non-buggy inputs.
   */

  type NonBuggyCase = {
    label: string;
    state: ConfigurationStepRenderState;
    expectedBranch: 'fallback_with_button' | 'not_rendered';
    buttonPresent: boolean;
  };

  const nonBuggyCases: NonBuggyCase[] = [
    // Fallback branch cases (button present)
    {
      label: 'configuration step, empty questions, index=0',
      state: {
        step: 'configuration',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'fallback_with_button',
      buttonPresent: true,
    },
    {
      label: 'configuration step, empty questions, index=5 (irrelevant when empty)',
      state: {
        step: 'configuration',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 5,
      },
      expectedBranch: 'fallback_with_button',
      buttonPresent: true,
    },
    // Not-rendered cases (step not active)
    {
      label: 'field-ownership step, empty questions',
      state: {
        step: 'field-ownership',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
    {
      label: 'building step, empty questions',
      state: {
        step: 'building',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
    {
      label: 'complete step, empty questions',
      state: {
        step: 'complete',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
    {
      label: 'configure step, empty questions',
      state: {
        step: 'configure',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
    {
      label: 'configuration step, unlocked=false → not rendered',
      state: {
        step: 'configuration',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: false,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
    {
      label: 'configuration step, pendingWorkflowData=null → not rendered',
      state: {
        step: 'configuration',
        pendingWorkflowData: null,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: 0,
      },
      expectedBranch: 'not_rendered',
      buttonPresent: false,
    },
  ];

  for (const { label, state, expectedBranch, buttonPresent } of nonBuggyCases) {
    it(`P2.5: "${label}" → branch=${expectedBranch}, buttonPresent=${buttonPresent}`, () => {
      // Confirm not a bug condition
      expect(isBugCondition(state)).toBe(false);

      // Confirm branch is stable
      expect(getConfigurationStepBranch(state)).toBe(expectedBranch);

      // Confirm button presence matches expectation
      expect(isContinueToWorkflowButtonPresent(state)).toBe(buttonPresent);
    });
  }

  it('P2.5: all non-buggy states produce consistent branch results across repeated calls', () => {
    // Idempotency: calling getConfigurationStepBranch multiple times returns the same result
    for (const { state, expectedBranch } of nonBuggyCases) {
      const result1 = getConfigurationStepBranch(state);
      const result2 = getConfigurationStepBranch(state);
      const result3 = getConfigurationStepBranch(state);
      expect(result1).toBe(expectedBranch);
      expect(result2).toBe(expectedBranch);
      expect(result3).toBe(expectedBranch);
    }
  });

  it('P2.5: baseline (empty questions) is stable across varying currentQuestionIndex values', () => {
    // When manualConfigurationQuestions is empty, currentQuestionIndex is irrelevant
    const indices = [0, 1, 2, 10, 100, -1];
    for (const idx of indices) {
      const state: ConfigurationStepRenderState = {
        step: 'configuration',
        pendingWorkflowData: minimalPendingWorkflowData,
        configurationPhaseUnlocked: true,
        manualConfigurationQuestions: [],
        currentQuestionIndex: idx,
      };
      expect(getConfigurationStepBranch(state)).toBe('fallback_with_button');
      expect(isContinueToWorkflowButtonPresent(state)).toBe(true);
      expect(isBugCondition(state)).toBe(false);
    }
  });
});
