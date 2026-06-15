import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { lookupWorkflow } from '../lib/workflow-lookup';
import { enqueueExecution } from '../lib/execution-enqueue';

const router = Router();

// ── Signature helpers ─────────────────────────────────────────────────────────

function verifyWebhookSig(secret: string, body: unknown, sigHeader: string | undefined): boolean {
  if (!sigHeader || !sigHeader.startsWith('sha256=')) return false;
  const payload = JSON.stringify(body ?? {});
  const expected = `sha256=${crypto.createHmac('sha256', secret).update(payload).digest('hex')}`;
  const actualBuf = Buffer.from(sigHeader, 'utf8');
  const expectedBuf = Buffer.from(expected, 'utf8');
  if (actualBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(actualBuf, expectedBuf);
}

// ── POST /triggers/webhook/:workflowId ────────────────────────────────────────
// Phase 2: receive pre-routed webhook payload, validate workflow, enqueue execution

router.post('/webhook/:workflowId', async (req: Request, res: Response): Promise<void> => {
  const { workflowId } = req.params;
  const { headers, body, method } = req.body as {
    headers?: Record<string, string>;
    body?: unknown;
    method?: string;
  };

  try {
    const workflow = await lookupWorkflow(workflowId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    if (workflow.status !== 'active') {
      res.status(400).json({ error: 'Workflow is not active' });
      return;
    }
    if (!workflow.webhook_url) {
      res.status(403).json({ error: 'Webhook not enabled for this workflow' });
      return;
    }
    if (workflow.webhook_secret) {
      const sigHeader = headers?.['x-webhook-signature'];
      if (!verifyWebhookSig(workflow.webhook_secret, body, sigHeader)) {
        res.status(401).json({ error: 'Invalid webhook signature' });
        return;
      }
    }

    const input: Record<string, unknown> = {
      _webhook: true,
      _method: method ?? 'POST',
      headers: headers ?? {},
      body: body ?? {},
    };

    const result = await enqueueExecution({
      workflowId,
      userId: workflow.user_id,
      trigger: 'webhook',
      input,
    });

    res.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] webhook error [${workflowId}]: ${msg}`);
    res.status(503).json({ error: 'Service unavailable', message: 'Database unavailable' });
  }
});

// ── POST /triggers/form/:workflowId/:nodeId/submit ────────────────────────────
// Phase 2: receive form fields, validate workflow active, enqueue execution

router.post('/form/:workflowId/:nodeId/submit', async (req: Request, res: Response): Promise<void> => {
  const { workflowId, nodeId } = req.params;
  const { fields } = req.body as { fields?: Record<string, unknown> };

  try {
    const workflow = await lookupWorkflow(workflowId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    if (workflow.status !== 'active') {
      res.status(400).json({ error: 'Workflow is not active' });
      return;
    }

    const safeFields = fields ?? {};
    const input: Record<string, unknown> = {
      _form: true,
      nodeId,
      ...safeFields,
      data: safeFields,
    };

    const result = await enqueueExecution({
      workflowId,
      userId: workflow.user_id,
      trigger: 'form',
      input,
    });

    res.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] form error [${workflowId}/${nodeId}]: ${msg}`);
    res.status(503).json({ error: 'Service unavailable', message: 'Database unavailable' });
  }
});

// ── POST /triggers/chat/:workflowId/:nodeId/message ───────────────────────────
// Phase 2: receive chat message, validate workflow active, enqueue execution

router.post('/chat/:workflowId/:nodeId/message', async (req: Request, res: Response): Promise<void> => {
  const { workflowId, nodeId } = req.params;
  const { message, sessionId, metadata } = req.body as {
    message?: unknown;
    sessionId?: string;
    metadata?: Record<string, unknown>;
  };

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({
      error: 'Invalid message',
      message: 'Message is required and must be a non-empty string.',
    });
    return;
  }

  try {
    const workflow = await lookupWorkflow(workflowId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    if (workflow.status !== 'active') {
      res.status(400).json({ error: 'Workflow is not active' });
      return;
    }

    const chatSessionId = sessionId ?? `${workflowId}_${nodeId}`;

    const input: Record<string, unknown> = {
      message: message.trim(),
      trigger: 'chat',
      workflow_id: workflowId,
      node_id: nodeId,
      sessionId: chatSessionId,
      timestamp: new Date().toISOString(),
      _chat: true,
    };
    if (metadata) input.metadata = metadata;

    const result = await enqueueExecution({
      workflowId,
      userId: workflow.user_id,
      trigger: 'chat',
      input,
    });

    res.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] chat error [${workflowId}/${nodeId}]: ${msg}`);
    res.status(503).json({ error: 'Service unavailable', message: 'Database unavailable' });
  }
});

// ── POST /triggers/schedule/:workflowId ──────────────────────────────────────
// Phase 3: receive scheduled trigger, validate workflow active, enqueue execution

router.post('/schedule/:workflowId', async (req: Request, res: Response): Promise<void> => {
  const { workflowId } = req.params;
  const { scheduledAt, cron } = req.body as { scheduledAt?: unknown; cron?: unknown };

  if (!scheduledAt || typeof scheduledAt !== 'string') {
    res.status(400).json({
      error: 'Invalid payload',
      message: 'scheduledAt is required (ISO 8601)',
    });
    return;
  }

  if (Number.isNaN(Date.parse(scheduledAt))) {
    res.status(400).json({
      error: 'Invalid payload',
      message: 'scheduledAt must be a valid ISO 8601 date',
    });
    return;
  }

  try {
    const workflow = await lookupWorkflow(workflowId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found' });
      return;
    }
    if (workflow.status !== 'active') {
      res.status(400).json({ error: 'Workflow is not active' });
      return;
    }

    const input: Record<string, unknown> = {
      trigger: 'schedule',
      scheduled_at: scheduledAt,
    };
    if (cron && typeof cron === 'string') input.cron = cron;

    const result = await enqueueExecution({
      workflowId,
      userId: workflow.user_id,
      trigger: 'schedule',
      input,
    });

    res.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[trigger-service] schedule error [${workflowId}]: ${msg}`);
    res.status(503).json({ error: 'Service unavailable', message: 'Database unavailable' });
  }
});

export default router;
