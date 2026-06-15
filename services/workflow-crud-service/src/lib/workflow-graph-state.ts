/**
 * Copied from worker/src/api/workflow-graph-state.ts — no external dependencies.
 * Builds the `graph` column payload that keeps nodes/edges/metadata in sync.
 */
export function buildSyncedGraphPayload(nodes: unknown[], edges: unknown[], metadata?: unknown): Record<string, unknown> {
  const payload: Record<string, unknown> = { nodes, edges };
  if (metadata && typeof metadata === 'object') payload.metadata = metadata;
  return payload;
}
