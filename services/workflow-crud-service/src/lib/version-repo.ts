/**
 * version-repo.ts — ownership-scoped DB operations on workflow_versions.
 * All queries verify workflows.user_id = userId before touching version rows.
 *
 * Column alignment with insertVersionSnapshot (workflow-repo.ts):
 *   workflow_id, version, created_at, created_by,
 *   definition_snapshot, nodes_snapshot, edges_snapshot, inputs_snapshot, metadata
 */

import { queryDb } from './db';
import { getWorkflowByIdForOwnerCheck } from './workflow-repo';

// ── Internal errors ───────────────────────────────────────────────────────────

export class NotFoundError extends Error {
  readonly code = 'NOT_FOUND';
  constructor(message: string) { super(message); this.name = 'NotFoundError'; }
}

export class ForbiddenError extends Error {
  readonly code = 'FORBIDDEN';
  constructor(message: string) { super(message); this.name = 'ForbiddenError'; }
}

// ── Row shapes ────────────────────────────────────────────────────────────────

export interface VersionRow {
  workflow_id: string;
  version: number;
  created_at: string;
  created_by: string | null;
  definition_snapshot: Record<string, unknown>;
  nodes_snapshot: unknown[];
  edges_snapshot: unknown[];
  inputs_snapshot: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface VersionListItem {
  version: number;
  savedAt: string;
  createdBy: string | null;
  label?: string;
}

export interface RollbackResult {
  id: string;
  version: number;
  rolledBackFrom: number;
}

// ── Ownership guard ───────────────────────────────────────────────────────────

async function assertOwnership(workflowId: string, userId: string): Promise<void> {
  const row = await getWorkflowByIdForOwnerCheck(workflowId);
  if (!row) throw new NotFoundError(`Workflow ${workflowId} not found`);
  if (row.user_id !== userId) throw new ForbiddenError('Access denied to workflow');
}

// ── Public repo methods ───────────────────────────────────────────────────────

/**
 * List version history for a workflow (most-recent first).
 * Throws NotFoundError / ForbiddenError if ownership check fails.
 */
export async function listVersions(
  workflowId: string,
  userId: string,
  limit = 50,
): Promise<VersionListItem[]> {
  await assertOwnership(workflowId, userId);

  const rows = await queryDb<Pick<VersionRow, 'version' | 'created_at' | 'created_by' | 'metadata'>>(
    `SELECT version, created_at, created_by, metadata
       FROM workflow_versions
      WHERE workflow_id = $1
      ORDER BY version DESC
      LIMIT $2`,
    [workflowId, Math.max(1, Math.min(200, limit))],
  );

  return rows.map((r) => ({
    version: r.version,
    savedAt: r.created_at,
    createdBy: r.created_by,
    label: (r.metadata as Record<string, unknown>)?.description as string | undefined,
  }));
}

/**
 * Fetch a specific version row (full snapshot).
 * Returns null if the version does not exist.
 * Throws NotFoundError / ForbiddenError if ownership check fails.
 */
export async function getVersion(
  workflowId: string,
  userId: string,
  versionNumber: number,
): Promise<VersionRow | null> {
  await assertOwnership(workflowId, userId);

  const rows = await queryDb<VersionRow>(
    `SELECT * FROM workflow_versions
      WHERE workflow_id = $1 AND version = $2
      LIMIT 1`,
    [workflowId, versionNumber],
  );
  return rows[0] ?? null;
}

/**
 * Restore a workflow to a prior version snapshot.
 *
 * Steps:
 *  1. Ownership check
 *  2. Load target version snapshot
 *  3. Read current max version (becomes rolledBackFrom)
 *  4. UPDATE workflows.nodes/edges/settings/graph
 *  5. INSERT new version_versions row (nextVersion = rolledBackFrom + 1)
 *
 * Throws NotFoundError if the workflow or version does not exist.
 * Throws ForbiddenError if userId does not own the workflow.
 */
export async function rollbackToVersion(
  workflowId: string,
  userId: string,
  versionNumber: number,
): Promise<RollbackResult> {
  await assertOwnership(workflowId, userId);

  // Load target version
  const vRows = await queryDb<VersionRow>(
    `SELECT * FROM workflow_versions
      WHERE workflow_id = $1 AND version = $2
      LIMIT 1`,
    [workflowId, versionNumber],
  );
  const target = vRows[0];
  if (!target) throw new NotFoundError(`Version ${versionNumber} not found for workflow ${workflowId}`);

  // Current max version (the "from" marker in the result)
  const maxRows = await queryDb<{ max: string | null }>(
    `SELECT MAX(version) AS max FROM workflow_versions WHERE workflow_id = $1`,
    [workflowId],
  );
  const rolledBackFrom = parseInt(maxRows[0]?.max ?? '0', 10);

  // Extract graph fields — prefer dedicated snapshot columns, fall back to definition_snapshot
  const nodes = Array.isArray(target.nodes_snapshot) && target.nodes_snapshot.length > 0
    ? target.nodes_snapshot
    : (target.definition_snapshot as any)?.nodes ?? [];

  const edges = Array.isArray(target.edges_snapshot) && target.edges_snapshot.length >= 0
    ? target.edges_snapshot
    : (target.definition_snapshot as any)?.edges ?? [];

  const settings = (target.inputs_snapshot as any)?.workflowSettings
    ?? (target.definition_snapshot as any)?.settings
    ?? {};

  const graph = (target.inputs_snapshot as any)?.uiLayout
    ?? (target.definition_snapshot as any)?.graph
    ?? {};

  // Restore workflow row
  await queryDb(
    `UPDATE workflows
        SET nodes = $1, edges = $2, settings = $3, graph = $4, updated_at = $5
      WHERE id = $6 AND user_id = $7`,
    [
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(settings),
      JSON.stringify(graph),
      new Date().toISOString(),
      workflowId,
      userId,
    ],
  );

  // Insert post-rollback version row
  const nextVersion = rolledBackFrom + 1;
  await queryDb(
    `INSERT INTO workflow_versions
         (workflow_id, version, created_at, created_by,
          definition_snapshot, nodes_snapshot, edges_snapshot,
          inputs_snapshot, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      workflowId,
      nextVersion,
      new Date().toISOString(),
      userId,
      JSON.stringify(target.definition_snapshot ?? {}),
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(target.inputs_snapshot ?? {}),
      JSON.stringify({ description: `Rollback to version ${versionNumber}` }),
    ],
  );

  return { id: workflowId, version: nextVersion, rolledBackFrom };
}
