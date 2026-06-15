import { describe, expect, it } from 'vitest';
import { validateCapabilitySelections } from '../capability-selection-validation';
import type { CapabilityContainer } from '@/types/capability-selection';

function container(
  containerId: string,
  semanticRole: CapabilityContainer['useCaseUnit']['semanticRole'],
  nodeType: string,
): CapabilityContainer {
  return {
    containerId,
    label: `${semanticRole} step`,
    useCaseUnit: {
      unitId: `${containerId}-unit`,
      label: `${semanticRole} unit`,
      semanticRole,
      description: `${semanticRole} description`,
      orderIndex: semanticRole === 'trigger' ? 0 : 1,
    },
    candidates: [{
      nodeType,
      label: nodeType,
      description: `${nodeType} description`,
      credentialRequirements: [],
      hasCredentials: true,
    }],
  };
}

describe('capability selection validation', () => {
  const containers = [
    container('trigger-container', 'trigger', 'manual_trigger'),
    container('source-container', 'data_source', 'google_sheets'),
    container('summary-container', 'transformation', 'openai'),
    container('email-container', 'communication', 'google_gmail'),
  ];

  it('blocks selections that do not include a trigger container', () => {
    const result = validateCapabilitySelections(containers, {
      'source-container': 'google_sheets',
      'email-container': 'google_gmail',
    });

    expect(result.valid).toBe(false);
    expect(result.code).toBe('MISSING_TRIGGER_SELECTION');
    expect(result.triggerContainers).toHaveLength(1);
  });

  it('allows trigger-only selections and reports missing non-trigger intent steps as guidance', () => {
    const result = validateCapabilitySelections(containers, {
      'trigger-container': 'manual_trigger',
    });

    expect(result.valid).toBe(true);
    expect(result.selectedTriggerContainers).toHaveLength(1);
    expect(result.missingIntentSteps.map((step) => step.containerId)).toEqual([
      'source-container',
      'summary-container',
      'email-container',
    ]);
  });

  it('detects stale or invalid selected node types', () => {
    const result = validateCapabilitySelections(containers, {
      'trigger-container': 'manual_trigger',
      'source-container': 'not_a_candidate',
    });

    expect(result.valid).toBe(true);
    expect(result.invalidSelections.map((step) => step.containerId)).toEqual(['source-container']);
  });
});
