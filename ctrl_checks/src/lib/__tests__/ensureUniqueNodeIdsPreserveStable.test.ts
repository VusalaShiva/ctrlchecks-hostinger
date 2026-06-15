import { describe, it, expect } from 'vitest';
import { ensureUniqueNodeIdsPreserveStable } from '../workflowValidation';

describe('ensureUniqueNodeIdsPreserveStable', () => {
  it('preserves unique non-empty node ids and keeps edges aligned', () => {
    const nodes = [
      { id: 'node_keep_a', data: { type: 'form' } },
      { id: 'node_keep_b', data: { type: 'log_output' } },
    ];
    const edges = [
      { id: 'edge_1', source: 'node_keep_a', target: 'node_keep_b', sourceHandle: 'output', targetHandle: 'input' },
    ];

    const { nodes: outNodes, edges: outEdges } = ensureUniqueNodeIdsPreserveStable(nodes, edges);

    expect(outNodes.map((n) => n.id)).toEqual(['node_keep_a', 'node_keep_b']);
    expect(outEdges).toHaveLength(1);
    expect(outEdges[0].source).toBe('node_keep_a');
    expect(outEdges[0].target).toBe('node_keep_b');
  });

  it('assigns an id when missing', () => {
    const nodes = [{ data: { type: 'x' } }, { id: 'only_other', data: {} }];
    const edges: any[] = [];

    const { nodes: outNodes } = ensureUniqueNodeIdsPreserveStable(nodes as any[], edges);

    expect(outNodes[0].id).toBeTruthy();
    expect(typeof outNodes[0].id).toBe('string');
    expect(outNodes[0].id.startsWith('node_')).toBe(true);
    expect(outNodes[1].id).toBe('only_other');
  });

  it('remaps duplicate node ids so first occurrence keeps the id', () => {
    const nodes = [
      { id: 'dup', data: { n: 0 } },
      { id: 'dup', data: { n: 1 } },
      { id: 'tail', data: {} },
    ];
    const edges = [{ id: 'e1', source: 'dup', target: 'tail' }];

    const { nodes: outNodes, edges: outEdges } = ensureUniqueNodeIdsPreserveStable(nodes, edges);

    expect(outNodes[0].id).toBe('dup');
    expect(outNodes[1].id).not.toBe('dup');
    expect(outNodes[1].id.startsWith('node_')).toBe(true);
    expect(outNodes[2].id).toBe('tail');

    expect(outEdges).toHaveLength(1);
    expect(outEdges[0].source).toBe('dup');
    expect(outEdges[0].target).toBe('tail');
  });

  it('drops edges whose endpoints cannot be resolved', () => {
    const nodes = [{ id: 'a', data: {} }];
    const edges = [{ id: 'bad', source: 'a', target: 'missing' }];

    const { edges: outEdges } = ensureUniqueNodeIdsPreserveStable(nodes, edges);

    expect(outEdges).toHaveLength(0);
  });
});
