import { describe, it, expect } from 'vitest';
import { getFormTriggerNode, buildFormPublicUrl } from '../formPublicUrl';

describe('formPublicUrl', () => {
  it('getFormTriggerNode returns the form node by data.type', () => {
    const nodes = [
      { id: 'a', data: { type: 'if_else' } },
      { id: 'form_1', data: { type: 'form' } },
    ];
    expect(getFormTriggerNode(nodes)?.id).toBe('form_1');
  });

  it('buildFormPublicUrl returns null without window or without form node', () => {
    expect(buildFormPublicUrl('wf-1', [])).toBe(null);
    expect(buildFormPublicUrl('wf-1', [{ id: 'x', data: { type: 'log_output' } }])).toBe(null);
  });
});
