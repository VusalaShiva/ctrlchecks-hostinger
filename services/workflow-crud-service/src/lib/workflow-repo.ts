/**
 * workflow-repo.ts — user-scoped DB operations on the workflows table.
 * All queries are strictly scoped to userId to prevent cross-user data leaks.
 */

import { queryDb } from './db';

export interface WorkflowRow {
  id: string;
  user_id: string;
  name: string;
  nodes: unknown[];
  edges: unknown[];
  settings: Record<string, unknown>;
  graph: Record<string, unknown>;
  metadata: Record<string, unknown>;
  status: string | null;
  phase: string | null;
  schema_version: number;
  setup_completed: boolean;
  setup_stage: string | null;
  setup_completed_at: string | null;
  quota_source: string | null;
  created_at: string;
  updated_at: string;
}

export async function getWorkflowById(
  workflowId: string,
  userId: string,
): Promise<WorkflowRow | null> {
  const rows = await queryDb<WorkflowRow>(
    `SELECT * FROM workflows WHERE id = $1 AND user_id = $2 LIMIT 1`,
    [workflowId, userId],
  );
  return rows[0] ?? null;
}

export async function getWorkflowByIdForOwnerCheck(
  workflowId: string,
): Promise<Pick<WorkflowRow, 'id' | 'user_id'> | null> {
  const rows = await queryDb<Pick<WorkflowRow, 'id' | 'user_id'>>(
    `SELECT id, user_id FROM workflows WHERE id = $1 LIMIT 1`,
    [workflowId],
  );
  return rows[0] ?? null;
}

export async function listWorkflowsByUser(userId: string): Promise<WorkflowRow[]> {
  return queryDb<WorkflowRow>(
    `SELECT * FROM workflows WHERE user_id = $1 ORDER BY updated_at DESC`,
    [userId],
  );
}

export async function countWorkflowsByUser(userId: string): Promise<number> {
  const rows = await queryDb<{ count: string }>(
    `SELECT COUNT(*) AS count FROM workflows WHERE user_id = $1`,
    [userId],
  );
  return parseInt(rows[0]?.count ?? '0', 10);
}

export async function insertWorkflow(data: Record<string, unknown>): Promise<WorkflowRow> {
  const cols = Object.keys(data);
  const vals = Object.values(data);
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
  const colList = cols.map((c) => `"${c}"`).join(', ');

  const rows = await queryDb<WorkflowRow>(
    `INSERT INTO workflows (${colList}) VALUES (${placeholders}) RETURNING *`,
    vals,
  );
  return rows[0];
}

export async function updateWorkflow(
  workflowId: string,
  userId: string,
  data: Record<string, unknown>,
): Promise<WorkflowRow | null> {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;
  const set = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
  const params = [...Object.values(data), workflowId, userId];

  const rows = await queryDb<WorkflowRow>(
    `UPDATE workflows SET ${set} WHERE id = $${keys.length + 1} AND user_id = $${keys.length + 2} RETURNING *`,
    params,
  );
  return rows[0] ?? null;
}

export async function deleteWorkflowById(
  workflowId: string,
  userId: string,
): Promise<boolean> {
  const rows = await queryDb<{ id: string }>(
    `DELETE FROM workflows WHERE id = $1 AND user_id = $2 RETURNING id`,
    [workflowId, userId],
  );
  return rows.length > 0;
}

/** Insert a version snapshot into workflow_versions (non-critical — errors are swallowed). */
export async function insertVersionSnapshot(params: {
  workflowId: string;
  nodes: unknown[];
  edges: unknown[];
  settings: unknown;
  metadata: unknown;
  userId?: string;
  description?: string;
}): Promise<void> {
  try {
    // Get next version number
    const vRows = await queryDb<{ max: string | null }>(
      `SELECT MAX(version) AS max FROM workflow_versions WHERE workflow_id = $1`,
      [params.workflowId],
    );
    const nextVersion = parseInt(vRows[0]?.max ?? '0', 10) + 1;

    const snapshot = {
      nodes: params.nodes,
      edges: params.edges,
      configuration: {
        workflowSettings: params.settings || {},
        metadata: params.metadata || {},
      },
    };

    await queryDb(
      `INSERT INTO workflow_versions
         (workflow_id, version, created_at, created_by, definition_snapshot,
          nodes_snapshot, edges_snapshot, inputs_snapshot, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        params.workflowId,
        nextVersion,
        new Date().toISOString(),
        params.userId ?? null,
        JSON.stringify(snapshot),
        JSON.stringify(params.nodes),
        JSON.stringify(params.edges),
        JSON.stringify(snapshot.configuration),
        JSON.stringify({ description: params.description ?? 'Workflow saved' }),
      ],
    );
  } catch (err) {
    console.warn('[workflow-crud-service] Version snapshot failed (non-critical):', err instanceof Error ? err.message : err);
  }
}

/** Get user's workflow limit from subscriptions table (default 10 for Free). */
export async function getWorkflowLimit(userId: string): Promise<number> {
  try {
    const rows = await queryDb<{ workflow_limit?: number; plan_type?: string }>(
      `SELECT workflow_limit, plan_type FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId],
    );
    const row = rows[0];
    if (!row) return 10;
    if (typeof row.workflow_limit === 'number') return row.workflow_limit;
    // Fallback to plan defaults
    if (row.plan_type === 'pro') return 100;
    if (row.plan_type === 'enterprise') return 1000;
    return 10;
  } catch {
    return 10;
  }
}
