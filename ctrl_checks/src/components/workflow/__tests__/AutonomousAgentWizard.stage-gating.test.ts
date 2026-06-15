import { describe, expect, it } from 'vitest';

type WizardStep =
  | 'idle'
  | 'analyzing'
  | 'summarize'
  | 'questioning'
  | 'capability-selection'
  | 'refining'
  | 'confirmation'
  | 'workflow-confirmation'
  | 'field-ownership'
  | 'credentials'
  | 'configure'
  | 'configuration'
  | 'building'
  | 'executing'
  | 'complete'
  | 'capability-node-selection'
  | 'capability-review';

function derivePromptComposerVisibility({
  step,
}: { step: WizardStep; hasPostAnalysisContext: boolean }) {
  return step === 'idle' || step === 'analyzing';
}

function deriveIntentContextVisibility({
  step,
  hasContext,
}: {
  step: WizardStep;
  hasContext: boolean;
}) {
  const showPromptComposer = derivePromptComposerVisibility({
    step,
    hasPostAnalysisContext: hasContext,
  });
  return !showPromptComposer && step !== 'building' && step !== 'complete' && hasContext;
}

describe('AutonomousAgentWizard stage gating', () => {
  it('shows prompt composer only for idle/analyzing stages', () => {
    expect(derivePromptComposerVisibility({ step: 'idle', hasPostAnalysisContext: false })).toBe(true);
    expect(derivePromptComposerVisibility({ step: 'analyzing', hasPostAnalysisContext: false })).toBe(true);
    expect(derivePromptComposerVisibility({ step: 'questioning', hasPostAnalysisContext: false })).toBe(false);
    expect(derivePromptComposerVisibility({ step: 'questioning', hasPostAnalysisContext: true })).toBe(false);
    expect(derivePromptComposerVisibility({ step: 'field-ownership', hasPostAnalysisContext: true })).toBe(false);
    expect(derivePromptComposerVisibility({ step: 'configuration', hasPostAnalysisContext: true })).toBe(false);
  });

  it('keeps prompt/chips hidden during ownership and configuration', () => {
    expect(derivePromptComposerVisibility({ step: 'field-ownership', hasPostAnalysisContext: true })).toBe(false);
    expect(derivePromptComposerVisibility({ step: 'configure', hasPostAnalysisContext: true })).toBe(false);
    expect(derivePromptComposerVisibility({ step: 'configuration', hasPostAnalysisContext: true })).toBe(false);
  });

  it('shows compact intent context on later stages when context exists', () => {
    expect(
      deriveIntentContextVisibility({
        step: 'questioning',
        hasContext: true,
      })
    ).toBe(true);
    expect(
      deriveIntentContextVisibility({
        step: 'field-ownership',
        hasContext: true,
      })
    ).toBe(true);
    expect(
      deriveIntentContextVisibility({
        step: 'configuration',
        hasContext: true,
      })
    ).toBe(true);
  });

  it('hides compact intent context when building/complete or without context', () => {
    expect(
      deriveIntentContextVisibility({
        step: 'building',
        hasContext: true,
      })
    ).toBe(false);
    expect(
      deriveIntentContextVisibility({
        step: 'complete',
        hasContext: true,
      })
    ).toBe(false);
    expect(
      deriveIntentContextVisibility({
        step: 'questioning',
        hasContext: false,
      })
    ).toBe(false);
  });
});
