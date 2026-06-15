import { describe, expect, it } from 'vitest';
import { normalizeBackendWorkflow } from '../node-type-normalizer';

describe('switch handle canonicalization', () => {
  it('remaps stale and positional switch source handles to semantic case values', () => {
    const input = {
      nodes: [
        {
          id: 'trigger_1',
          type: 'manual_trigger',
          data: { type: 'manual_trigger', category: 'trigger', label: 'Trigger', config: {} },
        },
        {
          id: 'switch_1',
          type: 'custom',
          data: {
            type: 'switch',
            category: 'logic',
            label: 'Switch',
            config: {
              cases: [{ value: 'amount_gt_5000' }, { value: 'amount_le_5000' }],
            },
          },
        },
        {
          id: 'mail_hi',
          type: 'custom',
          data: { type: 'google_gmail', category: 'output', label: 'High', config: {} },
        },
        {
          id: 'mail_lo',
          type: 'custom',
          data: { type: 'google_gmail', category: 'output', label: 'Low', config: {} },
        },
      ],
      edges: [
        { id: 'e0', source: 'trigger_1', target: 'switch_1', sourceHandle: 'output', targetHandle: 'input' },
        { id: 'e1', source: 'switch_1', target: 'mail_hi', sourceHandle: 'stale_old_case', targetHandle: 'input' },
        { id: 'e2', source: 'switch_1', target: 'mail_lo', sourceHandle: 'case_2', targetHandle: 'input' },
      ],
    };

    const normalized = normalizeBackendWorkflow(input as any);
    const switchEdges = normalized.edges.filter((e: any) => e.source === 'switch_1');
    const sourceHandles = switchEdges.map((e: any) => String(e.sourceHandle));

    expect(sourceHandles).toContain('amount_gt_5000');
    expect(sourceHandles).toContain('amount_le_5000');
    expect(sourceHandles).not.toContain('stale_old_case');
    expect(sourceHandles).not.toContain('case_2');
  });
});
