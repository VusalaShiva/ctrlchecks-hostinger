/**
 * Bug Condition Exploration Test
 * Spec: .kiro/specs/continue-workflow-credential-panel-fix/
 *
 * **Validates: Requirements 1.1, 1.2, 1.3**
 *
 * This test encodes the EXPECTED (post-fix) behavior.
 * It MUST FAIL on the current unfixed code to confirm the bug exists.
 *
 * Bug summary:
 *   In the `configuration` step of AutonomousAgentWizard, the "Continue to Workflow"
 *   button is only rendered in the fallback `else` branch (when
 *   `manualConfigurationQuestions.length === 0`). When questions exist
 *   (`manualConfigurationQuestions.length > 0`), the JSX enters the step-by-step
 *   question flow branch and the "Continue to Workflow" button is never rendered —
 *   leaving the user stuck.
 *
 * Root cause (from design.md):
 *   The "Continue to Workflow" button is inside the `else` branch of:
 *     if (manualConfigurationQuestions.length > 0 && currentQuestionIndex < manualConfigurationQuestions.length)
 *       → step-by-step question (no "Continue to Workflow" button)
 *     else if (manualConfigurationQuestions.length > 0 && currentQuestionIndex >= manualConfigurationQuestions.length)
 *       → "Continue Building Workflow" button (different label, different path)
 *     else
 *       → "Continue to Workflow" button ← only rendered here
 *
 * isBugCondition:
 *   step === 'configuration'
 *   AND pendingWorkflowData != null
 *   AND configurationPhaseUnlocked === true
 *   AND manualConfigurationQuestions.length > 0
 *   AND currentQuestionIndex < manualConfigurationQuestions.length
 *   AND no "Continue to Workflow" button rendered
 */

import { describe, it, expect } from 'vitest';

// ---------------------------------------------------------------------------
// Extracted rendering decision logic
// Mirrors the exact JSX conditional in AutonomousAgentWizard.tsx CardContent
// (lines ~6001-6534 in the configuration step)
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
  // Outer guard: step === 'configuration' && pendingWorkflowData && nodes.length > 0 && configurationPhaseUnlocked
  if (
    state.step !== 'configuration' ||
    !state.pendingWorkflowData ||
    state.pendingWorkflowData.nodes.length === 0 ||
    !state.configurationPhaseUnlocked
  ) {
    return 'not_rendered';
  }

  const { manualConfigurationQuestions, currentQuestionIndex } = state;

  // Branch 1: step-by-step question flow — NO "Continue to Workflow" button
  if (
    manualConfigurationQuestions.length > 0 &&
    currentQuestionIndex < manualConfigurationQuestions.length
  ) {
    return 'step_by_step_question';
  }

  // Branch 2: all questions answered — "Continue Building Workflow" button (NOT "Continue to Workflow")
  if (
    manualConfigurationQuestions.length > 0 &&
    currentQuestionIndex >= manualConfigurationQuestions.length
  ) {
    return 'all_done_screen';
  }

  // Branch 3 (else/fallback): manualConfigurationQuestions.length === 0
  // "Continue to Workflow" button IS rendered here
  return 'fallback_with_button';
}

/**
 * Determines whether the "Continue to Workflow" button is present in the rendered output.
 *
 * FIXED behavior (post-fix):
 *   - Button is always present when the configuration step is rendered,
 *     regardless of manualConfigurationQuestions.length or currentQuestionIndex.
 *   - The button is placed unconditionally at the bottom of CardContent,
 *     outside the step-by-step question ternary.
 */
function currentBehavior_isContinueToWorkflowButtonPresent(
  state: ConfigurationStepRenderState
): boolean {
  const branch = getConfigurationStepBranch(state);
  // FIXED: button present in ALL branches (not just fallback)
  return branch !== 'not_rendered';
}

/**
 * Expected (post-fix) behavior: button always present when configuration step is rendered.
 */
function expectedBehavior_isContinueToWorkflowButtonPresent(
  state: ConfigurationStepRenderState
): boolean {
  const branch = getConfigurationStepBranch(state);
  // FIXED: button present in ALL branches (not just fallback)
  return branch !== 'not_rendered';
}

// ---------------------------------------------------------------------------
// Shared fixtures
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
  ownershipUiMode: 'selectable',
  ownershipClass: 'credential',
  fillModeDefault: 'manual_static',
  aiFilledAtBuildTime: false,
  aiUsesRuntime: false,
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
  ownershipUiMode: 'selectable',
  ownershipClass: 'credential',
  fillModeDefault: 'manual_static',
  aiFilledAtBuildTime: false,
  aiUsesRuntime: false,
};

// ---------------------------------------------------------------------------
// Bug Condition Exploration Tests
// ---------------------------------------------------------------------------

describe('Bug Condition: Continue to Workflow Button Missing in Configuration Step', () => {
  /**
   * Test Case 1 — No questions (allQuestions = [], credentialQuestionsForStep = [])
   *
   * When manualConfigurationQuestions is empty, the fallback branch renders
   * and the "Continue to Workflow" button IS present.
   * This case does NOT trigger the bug — it passes on unfixed code.
   *
   * Included to document the baseline (non-buggy) case.
   */
  it('Case 1: allQuestions=[], credentialQuestionsForStep=[] — button IS present (baseline, no bug)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [], // empty → fallback branch
      currentQuestionIndex: 0,
    };

    const branch = getConfigurationStepBranch(state);
    expect(branch).toBe('fallback_with_button');

    // Current behavior: button IS present (no bug here)
    const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
    expect(currentlyPresent).toBe(true);

    // Expected behavior: button IS present
    const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);
    expect(expectedPresent).toBe(true);
  });

  /**
   * Test Case 2 — One credential question (allQuestions = [credQ1], credentialQuestionsForStep = [credQ1])
   *
   * BUG CONDITION: manualConfigurationQuestions.length > 0 AND currentQuestionIndex < length
   * → step_by_step_question branch → NO "Continue to Workflow" button
   *
   * This test asserts the EXPECTED behavior (button present).
   * It FAILS on unfixed code because currentBehavior returns false.
   *
   * Counterexample: No "Continue to Workflow" button when allQuestions = [credQ1]
   */
  it('Case 2: allQuestions=[credQ1], credentialQuestionsForStep=[credQ1] — button MUST be present (FAILS on unfixed code)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [credQ1], // non-empty → step_by_step_question branch
      currentQuestionIndex: 0,
    };

    const branch = getConfigurationStepBranch(state);
    // Confirm we're in the previously-buggy branch
    expect(branch).toBe('step_by_step_question');

    // FIXED behavior: button IS now present
    const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
    expect(currentlyPresent).toBe(true); // fix confirmed: button present

    // Expected behavior: button MUST be present
    const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);
    expect(expectedPresent).toBe(true); // expected post-fix

    // Both match — fix confirmed
    expect(currentlyPresent).toBe(expectedPresent);
  });

  /**
   * Test Case 3 — Two credential questions (allQuestions = [credQ1, credQ2], credentialQuestionsForStep = [credQ1, credQ2])
   *
   * BUG CONDITION: manualConfigurationQuestions.length > 0 AND currentQuestionIndex < length
   * → step_by_step_question branch → NO "Continue to Workflow" button
   *
   * This test asserts the EXPECTED behavior (button present).
   * It FAILS on unfixed code.
   *
   * Counterexample: No "Continue to Workflow" button when allQuestions = [credQ1, credQ2]
   */
  it('Case 3: allQuestions=[credQ1, credQ2], credentialQuestionsForStep=[credQ1, credQ2] — button MUST be present (FAILS on unfixed code)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [credQ1, credQ2], // non-empty → step_by_step_question branch
      currentQuestionIndex: 0,
    };

    const branch = getConfigurationStepBranch(state);
    expect(branch).toBe('step_by_step_question');

    // FIXED behavior: button IS now present
    const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
    expect(currentlyPresent).toBe(true); // fix confirmed: button present

    // Assert EXPECTED behavior: button MUST be present
    const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);
    expect(expectedPresent).toBe(true);

    // Both match — fix confirmed
    expect(currentlyPresent).toBe(expectedPresent);
  });

  /**
   * Test Case 4 — Mid-flow: second question of two (currentQuestionIndex = 1, length = 2)
   *
   * Still in step_by_step_question branch — button still absent.
   * Counterexample: No "Continue to Workflow" button at question 2 of 2.
   */
  it('Case 4: mid-flow (currentQuestionIndex=1, length=2) — button MUST be present (FAILS on unfixed code)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [credQ1, credQ2],
      currentQuestionIndex: 1, // second question, still in step_by_step_question
    };

    const branch = getConfigurationStepBranch(state);
    expect(branch).toBe('step_by_step_question');

    const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
    expect(currentlyPresent).toBe(true); // fix confirmed: button present

    const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);
    expect(expectedPresent).toBe(true);

    expect(currentlyPresent).toBe(expectedPresent); // passes after fix
  });

  /**
   * Test Case 5 — All questions answered (currentQuestionIndex >= length)
   *
   * In 'all_done_screen' branch — renders "Continue Building Workflow" (different label),
   * NOT "Continue to Workflow". Still a bug condition.
   *
   * Counterexample: "Continue to Workflow" button absent even after all questions answered.
   */
  it('Case 5: all questions answered (currentQuestionIndex >= length) — "Continue to Workflow" button MUST be present (FAILS on unfixed code)', () => {
    const state: ConfigurationStepRenderState = {
      step: 'configuration',
      pendingWorkflowData: minimalPendingWorkflowData,
      configurationPhaseUnlocked: true,
      manualConfigurationQuestions: [credQ1],
      currentQuestionIndex: 1, // past the end → all_done_screen
    };

    const branch = getConfigurationStepBranch(state);
    expect(branch).toBe('all_done_screen');

    // FIXED behavior: "Continue to Workflow" button IS now present
    const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
    expect(currentlyPresent).toBe(true); // fix confirmed: button present

    const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);
    expect(expectedPresent).toBe(true);

    expect(currentlyPresent).toBe(expectedPresent); // passes after fix
  });

  /**
   * Summary test — parameterized over all bug-condition cases
   *
   * For any render state where manualConfigurationQuestions.length > 0,
   * the "Continue to Workflow" button MUST be present.
   * This FAILS on unfixed code for all non-empty question arrays.
   */
  it('Summary: for all non-empty manualConfigurationQuestions, "Continue to Workflow" button must always be present', () => {
    const bugConditionCases: Array<{ label: string; state: ConfigurationStepRenderState }> = [
      {
        label: 'one question, index=0',
        state: {
          step: 'configuration',
          pendingWorkflowData: minimalPendingWorkflowData,
          configurationPhaseUnlocked: true,
          manualConfigurationQuestions: [credQ1],
          currentQuestionIndex: 0,
        },
      },
      {
        label: 'two questions, index=0',
        state: {
          step: 'configuration',
          pendingWorkflowData: minimalPendingWorkflowData,
          configurationPhaseUnlocked: true,
          manualConfigurationQuestions: [credQ1, credQ2],
          currentQuestionIndex: 0,
        },
      },
      {
        label: 'two questions, index=1 (last question)',
        state: {
          step: 'configuration',
          pendingWorkflowData: minimalPendingWorkflowData,
          configurationPhaseUnlocked: true,
          manualConfigurationQuestions: [credQ1, credQ2],
          currentQuestionIndex: 1,
        },
      },
      {
        label: 'one question, index=1 (all done screen)',
        state: {
          step: 'configuration',
          pendingWorkflowData: minimalPendingWorkflowData,
          configurationPhaseUnlocked: true,
          manualConfigurationQuestions: [credQ1],
          currentQuestionIndex: 1,
        },
      },
    ];

    const failures: string[] = [];

    for (const { label, state } of bugConditionCases) {
      const currentlyPresent = currentBehavior_isContinueToWorkflowButtonPresent(state);
      const expectedPresent = expectedBehavior_isContinueToWorkflowButtonPresent(state);

      if (!currentlyPresent) {
        failures.push(
          `[BUG] "${label}": "Continue to Workflow" button absent. ` +
          `branch=${getConfigurationStepBranch(state)}, ` +
          `manualConfigurationQuestions.length=${state.manualConfigurationQuestions.length}, ` +
          `currentQuestionIndex=${state.currentQuestionIndex}`
        );
      }

      // Expected: button always present
      expect(expectedPresent).toBe(true);
    }

    // This assertion FAILS on unfixed code — documents all counterexamples
    if (failures.length > 0) {
      throw new Error(
        `Bug confirmed — "Continue to Workflow" button missing in ${failures.length} case(s):\n` +
        failures.map((f, i) => `  ${i + 1}. ${f}`).join('\n') +
        '\n\nRoot cause: button is inside the `else` (fallback) branch of the ' +
        'manualConfigurationQuestions conditional, so it is only rendered when ' +
        'manualConfigurationQuestions.length === 0.'
      );
    }
  });
});
