/**
 * internal-engine-execute.ts
 *
 * Server-to-server route called by the execution-engine service to run a
 * workflow synchronously (useQueue=false).  Auth is via a shared service key
 * (x-internal-engine-key header) — no Cognito JWT required.
 *
 * Returns { success, result, error?, durationMs } — HTTP 200 even when the
 * workflow itself failed, so the caller can read body.success to distinguish.
 */

import { Request, Response } from 'express';

export default async function internalEngineExecuteRoute(req: Request, res: Response): Promise<void> {
  // Read key at request time so tests can inject via process.env after module load
  const workerInternalKey = process.env.WORKER_INTERNAL_KEY ?? '';
  const providedKey = req.headers['x-internal-engine-key'];
  if (workerInternalKey && providedKey !== workerInternalKey) {
    res.status(401).json({ error: 'Unauthorized', code: 'INVALID_ENGINE_KEY' });
    return;
  }

  const { workflowId, executionId, input, userId } = req.body ?? {};
  if (!workflowId || typeof workflowId !== 'string') {
    res.status(400).json({ error: 'Bad Request', code: 'MISSING_WORKFLOW_ID', message: 'workflowId is required' });
    return;
  }

  const startedAt = Date.now();
  const executeWorkflowHandler = (await import('./execute-workflow')).default;

  let executionResult: unknown = null;
  let executionError: string | undefined;
  let responseStatus = 200;

  // Fake req/res — same pattern as execution-job-runner.ts
  const fakeReq = {
    body: {
      workflowId,
      executionId: typeof executionId === 'string' ? executionId : undefined,
      input: input ?? {},
      userId: typeof userId === 'string' ? userId : undefined,
      useQueue: false,
    },
    headers: {
      'x-internal-engine-execution': 'true',
    },
  } as unknown as Request;

  const fakeRes = {
    statusCode: 200,
    status(code: number) { responseStatus = code; return this; },
    json(data: unknown) {
      executionResult = data;
      if (responseStatus >= 400) {
        executionError = (data as any)?.error ?? (data as any)?.message ?? 'Execution failed';
      }
      return this;
    },
    send(data: unknown) {
      executionResult = data;
      if (responseStatus >= 400) {
        executionError = typeof data === 'string' ? data : ((data as any)?.error ?? 'Execution failed');
      }
      return this;
    },
  } as unknown as Response;

  try {
    await executeWorkflowHandler(fakeReq, fakeRes);
  } catch (err: unknown) {
    executionError = (err as Error)?.message ?? String(err);
    responseStatus = 500;
  }

  const durationMs = Date.now() - startedAt;
  const success = !executionError && responseStatus < 400;

  res.status(200).json({ success, result: executionResult, ...(executionError ? { error: executionError } : {}), durationMs });
}
