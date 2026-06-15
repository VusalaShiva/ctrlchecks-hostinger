/**
 * Preservation Property Tests
 * Spec: .kiro/specs/continue-workflow-save-credential-panel/
 *
 * These tests encode the BASELINE behavior that must be PRESERVED after the fix.
 * They MUST PASS on the current unfixed code.
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 *
 * Property 2: Preservation — Non-Buggy Input Behavior Unchanged
 *   For any input where the bug condition does NOT hold (all credentials satisfied,
 *   save errors, non-button-click interactions), the fixed code SHALL produce exactly
 *   the same behavior as the original code.
 */

import { describe, it, expect } from 'vitest';
import { filterStillBlockingOAuth } from '@/lib/wizard-oauth-credentials';
import { shouldRunAttachCredentialsAfterAttachInputs } from '@/lib/workflow-phase-contract';

// ---------------------------------------------------------------------------
// Extracted decision logic — mirrors the exact logic in handleBuild
// (replicated from the bug test file)
// ---------------------------------------------------------------------------

/**
 * Mirrors the `credentialSecretsReady` useMemo in AutonomousAgentWizard.
 */
function computeCredentialSecretsReady(
  credentialQuestionsForStep: Array<{ credential?: { satisfied?: boolean }; required?: boolean; answer?: string }>,
  blockingOAuthCount: number
): boolean {
  const vaultOk =
    credentialQuestionsForStep.length === 0 ||
    credentialQuestionsForStep.every((q) => {
      if (q?.credential?.satisfied === true) return true;
      if (q?.required === false && !q.answer) return true;
      return (q.answer ?? '').length > 0;
    });
  if (!vaultOk) return false;
  return blockingOAuthCount === 0;
}

/**
 * Mirrors the `shouldAttachCredentialsNow` logic in handleBuild (via workflow-phase-contract).
 */
function computeShouldAttachCredentialsNow(inputPhase: string): boolean {
  return shouldRunAttachCredentialsAfterAttachInputs(inputPhase);
}

/**
 * Mirrors the CURRENT (unfixed) credential branch in handleBuild.
 */
function currentHandleBuildCredentialBranch(params: {
  shouldAttachCredentialsNow: boolean;
  credentialSecretsReady: boolean;
  discoveredCredentials: Array<{ vaultKey: string; satisfied: boolean; required: boolean; nodeId: string; displayName: string }>;
}): 'skip' | 'toast_and_throw' | 'attach_credentials' {
  if (!params.shouldAttachCredentialsNow) return 'skip';
  if (!params.credentialSecretsReady) return 'toast_and_throw';
  return 'attach_credentials';
}

/**
 * Mirrors the FIXED credential branch in handleBuild.
 */
function fixedHandleBuildCredentialBranch(params: {
  shouldAttachCredentialsNow: boolean;
  discoveredCredentials: Array<{ vaultKey: string; satisfied: boolean; required: boolean; nodeId: string; displayName: string }>;
  workflowId: string;
}): { outcome: 'skip' } | { outcome: 'attach_credentials' } | { outcome: 'panel'; credentialPanelData: { workflowId: string; satisfied: unknown[]; missing: unknown[] } } {
  if (!params.shouldAttachCredentialsNow) return { outcome: 'skip' };

  const missing = params.discoveredCredentials.filter((c) => !c.satisfied && c.required);
  const satisfied = params.discoveredCredentials.filter((c) => c.satisfied);

  if (missing.length > 0) {
    return {
      outcome: 'panel',
      credentialPanelData: { workflowId: params.workflowId, satisfied, missing },
    };
  }
  return { outcome: 'attach_credentials' };
}

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const slackRow = {
  vaultKey: 'slack_webhook',
  credentialId: 'slack_webhook',
  type: 'webhook',
  displayName: 'Slack Webhook URL',
  nodeId: 'n1',
  satisfied: false,
  required: true,
};

const googleRow = {
  vaultKey: 'google',
  credentialId: 'google',
  type: 'oauth',
  displayName: 'Google OAuth',
  nodeId: 'node-gmail',
  satisfied: true,
  required: true,
};

// ---------------------------------------------------------------------------
// Preservation tests
// ---------------------------------------------------------------------------

describe('Preservation: Non-Buggy Input Behavior Unchanged', () => {
  /**
   * Test 1 — All credentials satisfied: normal flow proceeds (no panel shown)
   *
   * When all discoveredCredentials have satisfied: true and credentialSecretsReady = true,
   * both the current and fixed branches must return 'attach_credentials' (not 'toast_and_throw',
   * not 'skip', not 'panel').
   */
  it('all credentials satisfied: normal flow proceeds — no panel shown', () => {
    const allSatisfied = [
      { ...googleRow, satisfied: true },
      { ...slackRow, satisfied: true },
    ];

    const blockingOAuth = filterStillBlockingOAuth(
      allSatisfied.map((c) => ({ ...c })),
      [],
      false
    );
    const credentialSecretsReady = computeCredentialSecretsReady([], blockingOAuth.length);
    const shouldAttachCredentialsNow = computeShouldAttachCredentialsNow('configuring_credentials');

    expect(credentialSecretsReady).toBe(true);
    expect(shouldAttachCredentialsNow).toBe(true);

    // Current branch: must return 'attach_credentials' (not 'toast_and_throw', not 'skip')
    const currentOutcome = currentHandleBuildCredentialBranch({
      shouldAttachCredentialsNow,
      credentialSecretsReady,
      discoveredCredentials: allSatisfied,
    });
    expect(currentOutcome).toBe('attach_credentials');
    expect(currentOutcome).not.toBe('toast_and_throw');
    expect(currentOutcome).not.toBe('skip');

    // Fixed branch: must also return 'attach_credentials' (preserved after fix)
    const fixedResult = fixedHandleBuildCredentialBranch({
      shouldAttachCredentialsNow,
      discoveredCredentials: allSatisfied,
      workflowId: 'wf-123',
    });
    expect(fixedResult.outcome).toBe('attach_credentials');
  });

  /**
   * Test 2 — Save error: credential check never attempted
   *
   * When shouldAttachCredentialsNow = false (phase is not 'inputs_applied' or
   * 'configuring_credentials'), both current and fixed branches return 'skip'.
   * This represents the case where the workflow save fails and the phase is not set.
   */
  it('save error / wrong phase: credential check never attempted — both branches return skip', () => {
    const shouldAttachCredentialsNow = computeShouldAttachCredentialsNow('pending');
    expect(shouldAttachCredentialsNow).toBe(false);

    const discoveredCredentials = [
      { ...googleRow, satisfied: true },
      { ...slackRow, satisfied: false },
    ];

    const currentOutcome = currentHandleBuildCredentialBranch({
      shouldAttachCredentialsNow,
      credentialSecretsReady: false,
      discoveredCredentials,
    });
    expect(currentOutcome).toBe('skip');

    const fixedResult = fixedHandleBuildCredentialBranch({
      shouldAttachCredentialsNow,
      discoveredCredentials,
      workflowId: 'wf-456',
    });
    expect(fixedResult.outcome).toBe('skip');
  });

  /**
   * Test 3 — attach-credentials phase gating (worker contract)
   *
   * Verifies the phase-to-shouldAttachCredentialsNow mapping matches attach-credentials:
   * - 'inputs_applied'            → true (primary path after attach-inputs)
   * - 'configuring_credentials' → true (legacy)
   * - 'ready_for_execution'     → false (no attach-credentials POST; worker would 409)
   * - 'pending'                 → false
   * - ''                        → false
   */
  it('attach-credentials phase gating matches worker contract', () => {
    expect(computeShouldAttachCredentialsNow('inputs_applied')).toBe(true);
    expect(computeShouldAttachCredentialsNow('configuring_credentials')).toBe(true);
    expect(computeShouldAttachCredentialsNow('ready_for_execution')).toBe(false);
    expect(computeShouldAttachCredentialsNow('pending')).toBe(false);
    expect(computeShouldAttachCredentialsNow('')).toBe(false);
  });

  /**
   * Test 4 — filterStillBlockingOAuth with required_missing still blocks
   *
   * When a credential has status 'required_missing', filterStillBlockingOAuth
   * must still treat it as blocking (non-empty result). Preserved behavior.
   */
  it('filterStillBlockingOAuth with required_missing still blocks', () => {
    const result = filterStillBlockingOAuth(
      [slackRow],
      [{ nodeId: 'n1', credentialId: 'slack_webhook', status: 'required_missing' }],
      false
    );
    expect(result.length).toBeGreaterThan(0);
  });

  /**
   * Test 5 — filterStillBlockingOAuth with empty candidates returns empty
   *
   * Edge case: no candidates → always returns [].
   */
  it('filterStillBlockingOAuth with empty candidates returns empty', () => {
    expect(filterStillBlockingOAuth([], [], false)).toEqual([]);
    expect(filterStillBlockingOAuth([], undefined, false)).toEqual([]);
  });

  /**
   * Test 6 — Fixed branch: all satisfied → attach_credentials (not panel)
   *
   * When all discoveredCredentials are satisfied, the fixed branch must return
   * 'attach_credentials' — never 'panel'. This is the core preservation guarantee.
   */
  it('fixed branch: all satisfied → attach_credentials, not panel', () => {
    const allSatisfied = [
      { ...googleRow, satisfied: true },
      { ...slackRow, satisfied: true },
    ];

    const result = fixedHandleBuildCredentialBranch({
      shouldAttachCredentialsNow: true,
      discoveredCredentials: allSatisfied,
      workflowId: 'wf-789',
    });

    expect(result.outcome).toBe('attach_credentials');
    expect(result.outcome).not.toBe('panel');
    expect(result.outcome).not.toBe('skip');
  });
});
