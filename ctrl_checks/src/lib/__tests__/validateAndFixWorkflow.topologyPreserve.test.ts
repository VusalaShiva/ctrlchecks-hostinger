import { describe, expect, it } from 'vitest';
import { validateAndFixWorkflow } from '../workflowValidation';

describe('validateAndFixWorkflow preserveTopology', () => {
  it('does not drop extra triggers when preserveTopology is true', () => {
    const data = {
      nodes: [
        {
          id: 't1',
          type: 'custom',
          data: {
            label: 'A',
            type: 'chat_trigger',
            category: 'trigger',
            config: {},
          },
        },
        {
          id: 't2',
          type: 'custom',
          data: {
            label: 'B',
            type: 'chat_trigger',
            category: 'trigger',
            config: {},
          },
        },
      ],
      edges: [],
    };

    const without = validateAndFixWorkflow(data);
    const withPreserve = validateAndFixWorkflow(data, { preserveTopology: true });

    expect(without.nodes.length).toBeLessThan(data.nodes.length);
    expect(withPreserve.nodes.length).toBe(data.nodes.length);
  });
});
