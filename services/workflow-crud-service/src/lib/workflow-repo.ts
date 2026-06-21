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

export interface WorkflowLimitResult {
  canCreate: boolean;
  currentCount: number;
  limitCount: number;
  planName: string;
}

/**
 * Ensures the user has a Free subscription row if they have none.
 * Calls the `ensure_free_subscription` Postgres function — same as the worker.
 * Non-fatal: logs and continues on error (user may still be allowed to create).
 */
export async function ensureFreeSubscription(userId: string): Promise<void> {
  try {
    await queryDb(`SELECT public.ensure_free_subscription($1::uuid)`, [userId]);
  } catch (err) {
    console.warn('[workflow-crud-service] ensureFreeSubscription failed (non-fatal):', err instanceof Error ? err.message : err);
  }
}

/**
 * Checks whether the user can create another workflow using the
 * `check_workflow_limit` Postgres function — counts actual workflow rows,
 * joins active subscription + plan for the limit. Same logic as the worker.
 */
export async function checkWorkflowLimit(userId: string): Promise<WorkflowLimitResult> {
  try {
    const rows = await queryDb<{
      can_create: boolean;
      current_count: number;
      limit_count: number;
      plan_name: string;
    }>(`SELECT can_create, current_count, limit_count, plan_name FROM public.check_workflow_limit($1::uuid)`, [userId]);

    const row = rows[0];
    if (!row) {
      // Function returned no row — user not found; allow with a high limit
      return { canCreate: true, currentCount: 0, limitCount: 10, planName: 'Free' };
    }
    return {
      canCreate: row.can_create,
      currentCount: row.current_count,
      limitCount: row.limit_count,
      planName: row.plan_name,
    };
  } catch (err) {
    console.warn('[workflow-crud-service] checkWorkflowLimit failed — allowing create:', err instanceof Error ? err.message : err);
    // Fail open: don't block users if quota check itself errors
    return { canCreate: true, currentCount: 0, limitCount: 10, planName: 'Free' };
  }
}

/**
 * Syncs workflow_count on the users row after a successful CREATE.
 * Best-effort — non-fatal on failure.
 */
export async function syncWorkflowCount(userId: string): Promise<void> {
  try {
    await queryDb(`SELECT public.increment_workflow_count($1::uuid)`, [userId]);
  } catch {
    // Non-fatal — check_workflow_limit counts live from workflows table anyway
  }
}
