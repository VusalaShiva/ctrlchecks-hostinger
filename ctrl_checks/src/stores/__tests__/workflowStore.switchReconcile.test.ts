import { describe, expect, it } from 'vitest';
import { useWorkflowStore } from '../workflowStore';

describe('workflowStore switch edge reconciliation', () => {
  it('updates stale switch edge handles when switch cases change', () => {
    const store = useWorkflowStore.getState();
    store.resetWorkflow();

    useWorkflowStore.setState({
      nodes: [
        {
          id: 'switch_1',
          type: 'custom',
          position: { x: 0, y: 0 },
          data: {
            type: 'switch',
            label: 'Switch',
            category: 'logic',
            icon: 'GitBranch',
            config: {
              cases: [{ value: 'old_hi' }, { value: 'old_lo' }],
            },
          },
        } as any,
        {
          id: 'mail_hi',
          type: 'custom',
          position: { x: 300, y: 0 },
          data: {
            type: 'google_gmail',
            label: 'High',
            category: 'output',
            icon: 'Mail',
            config: {},
          },
        } as any,
        {
          id: 'mail_lo',
          type: 'custom',
          position: { x: 300, y: 200 },
          data: {
            type: 'google_gmail',
            label: 'Low',
            category: 'output',
            icon: 'Mail',
            config: {},
          },
        } as any,
      ],
      edges: [
        { id: 'e1', source: 'switch_1', target: 'mail_hi', sourceHandle: 'case_1', targetHandle: 'input', type: 'case_1' } as any,
        { id: 'e2', source: 'switch_1', target: 'mail_lo', sourceHandle: 'stale_handle', targetHandle: 'input', type: 'default' } as any,
      ],
    });

    useWorkflowStore.getState().updateNodeConfig('switch_1', {
      cases: [{ value: 'amount_gt_5000' }, { value: 'amount_le_5000' }],
    });

    const updatedEdges = useWorkflowStore.getState().edges.filter((e) => e.source === 'switch_1');
    const handles = updatedEdges.map((e) => String(e.sourceHandle));

    expect(handles).toEqual(['amount_gt_5000', 'amount_le_5000']);
    expect(updatedEdges.map((e) => String(e.type))).toEqual(['amount_gt_5000', 'amount_le_5000']);
  });
});
