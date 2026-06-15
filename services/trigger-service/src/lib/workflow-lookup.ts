import { queryDb } from './db';

export interface WorkflowRow {
  id: string;
  user_id: string;
  status: string;
  webhook_url: string | null;
  webhook_secret: string | null;
  nodes: unknown;
}

/** Returns the workflow row or null if not found. Throws if DB is unavailable. */
export async function lookupWorkflow(workflowId: string): Promise<WorkflowRow | null> {
  const rows = await queryDb(
    `SELECT id, user_id, status, webhook_url, webhook_secret, nodes
     FROM workflows WHERE id = $1 LIMIT 1`,
    [workflowId],
  );
  return (rows[0] as WorkflowRow) ?? null;
}
