import { queryDb } from './db';
import { v4 as uuidv4 } from 'uuid';

export interface EnqueueResult {
  executionId: string;
  status: 'queued';
  workflowId: string;
}

/**
 * Inserts an execution row and fire-and-forgets a POST to the worker to run it.
 * Never throws after the DB insert succeeds — worker notify failures are logged only.
 */
export async function enqueueExecution(opts: {
  workflowId: string;
  userId: string;
  trigger: 'webhook' | 'form' | 'chat' | 'schedule';
  input: Record<string, unknown>;
}): Promise<EnqueueResult> {
  const { workflowId, userId, trigger, input } = opts;
  const executionId = uuidv4();
  const startedAt = new Date().toISOString();

  await queryDb(
    `INSERT INTO executions
       (id, workflow_id, user_id, status, trigger, input, logs, started_at)
     VALUES ($1, $2, $3, 'running', $4, $5::jsonb, '[]'::jsonb, $6)`,
    [executionId, workflowId, userId, trigger, JSON.stringify(input), startedAt],
  );

  // Fire-and-forget: notify worker to execute via the internal server-to-server endpoint.
  // /api/internal/engine-execute bypasses Cognito JWT auth (uses x-internal-engine-key).
  // The worker runs the workflow and updates the execution row — even if the fetch times out,
  // the server-side execution continues because fakeReq/fakeRes are connection-independent.
  const workerUrl =
    (process.env.WORKER_INTERNAL_URL ?? process.env.WORKER_URL ?? 'http://127.0.0.1:3001').replace(/\/$/, '');
  const engineKey = process.env.WORKER_INTERNAL_KEY;

  fetch(`${workerUrl}/api/internal/engine-execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(engineKey ? { 'x-internal-engine-key': engineKey } : {}),
    },
    body: JSON.stringify({ workflowId, executionId, userId, input }),
    signal: AbortSignal.timeout(5000),
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] engine-execute notify failed: ${msg}`);
  });

  return { executionId, status: 'queued', workflowId };
}
