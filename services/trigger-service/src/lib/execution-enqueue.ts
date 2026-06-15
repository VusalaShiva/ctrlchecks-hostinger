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

  // Fire-and-forget: notify worker to execute (no await — never blocks response)
  const workerUrl =
    (process.env.WORKER_INTERNAL_URL ?? 'http://127.0.0.1:3001').replace(/\/$/, '');

  fetch(`${workerUrl}/api/execute-workflow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Trigger-Execution': 'true',
    },
    body: JSON.stringify({ workflowId, executionId, input }),
    signal: AbortSignal.timeout(5000),
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] execute-workflow notify failed: ${msg}`);
  });

  return { executionId, status: 'queued', workflowId };
}
