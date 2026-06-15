import { describe, expect, it } from 'vitest';
import { prepareActionableFieldExample } from '../actionable-field-example';

describe('prepareActionableFieldExample', () => {
  it('formats valid JSON examples for input fields', () => {
    const result = prepareActionableFieldExample(
      { fieldName: 'inputData', type: 'json' },
      {
        value: { cricketTopic: 'IPL final highlights' },
        canApply: true,
        applyMode: 'buildtime_ai_once',
        source: 'ai_field_guidance',
      }
    );

    expect(result?.canApply).toBe(true);
    expect(result?.valueForInput).toContain('"cricketTopic"');
  });

  it('formats object field examples for textarea-backed JSON inputs', () => {
    const result = prepareActionableFieldExample(
      { fieldName: 'inputData', type: 'textarea', fieldType: 'object' },
      {
        value: { cricketTopic: 'IPL Finals' },
        canApply: true,
        applyMode: 'buildtime_ai_once',
        source: 'deterministic_field_guidance',
      }
    );

    expect(result?.canApply).toBe(true);
    expect(result?.valueForInput).toBe('{\n  "cricketTopic": "IPL Finals"\n}');
  });

  it('rejects invalid string JSON for object fields', () => {
    const result = prepareActionableFieldExample(
      { fieldName: 'inputData', type: 'textarea', fieldType: 'object' },
      {
        value: '{not-json',
        displayValue: '{not-json',
        canApply: true,
        applyMode: 'buildtime_ai_once',
        source: 'ai_field_guidance',
      }
    );

    expect(result?.canApply).toBe(false);
    expect(result?.reason.toLowerCase()).toContain('json');
  });

  it('only applies select examples that match available options', () => {
    const result = prepareActionableFieldExample(
      { fieldName: 'visibility', type: 'select', options: [{ label: 'Public', value: 'PUBLIC' }] },
      {
        value: 'PRIVATE',
        displayValue: 'PRIVATE',
        canApply: true,
        applyMode: 'buildtime_ai_once',
        source: 'ai_field_guidance',
      }
    );

    expect(result?.canApply).toBe(false);
  });

  it('blocks credential-shaped fields', () => {
    const result = prepareActionableFieldExample(
      { fieldName: 'apiKey', ownershipClass: 'credential' },
      {
        value: 'sk_test_example',
        displayValue: 'sk_test_example',
        canApply: true,
        applyMode: 'buildtime_ai_once',
        source: 'ai_field_guidance',
      }
    );

    expect(result?.canApply).toBe(false);
    expect(result?.reason.toLowerCase()).toContain('credential');
  });
});
