/**
 * Phase 2 dispatch handler tests — mocked DB and enqueue.
 *
 * All DB interaction goes through lookupWorkflow (→ queryDb) and
 * enqueueExecution. Both are mocked here so no real DB is needed.
 */

jest.mock('../lib/db', () => ({
  checkDb: jest.fn().mockResolvedValue('skip'),
  queryDb: jest.fn(),
  getDb: jest.fn().mockResolvedValue(null),
  _resetPool: jest.fn(),
}));

jest.mock('../lib/workflow-lookup');
jest.mock('../lib/execution-enqueue');

import request from 'supertest';
import app from '../index';
import { lookupWorkflow } from '../lib/workflow-lookup';
import { enqueueExecution } from '../lib/execution-enqueue';
import type { WorkflowRow } from '../lib/workflow-lookup';
import type { EnqueueResult } from '../lib/execution-enqueue';

const mockLookup = lookupWorkflow as jest.MockedFunction<typeof lookupWorkflow>;
const mockEnqueue = enqueueExecution as jest.MockedFunction<typeof enqueueExecution>;

const ACTIVE_WORKFLOW: WorkflowRow = {
  id: 'wf-test-123',
  user_id: 'user-abc',
  status: 'active',
  webhook_url: 'https://example.com/hook',
  webhook_secret: null,
  nodes: [],
};

const ENQUEUE_RESULT: EnqueueResult = {
  executionId: 'exec-uuid-1',
  status: 'queued',
  workflowId: 'wf-test-123',
};

beforeAll(() => {
  delete process.env.TRIGGER_SERVICE_KEY;
});

beforeEach(() => {
  jest.clearAllMocks();
  mockEnqueue.mockResolvedValue(ENQUEUE_RESULT);
});

// ══════════════════════════════════════════════════════════════════════════════
// POST /triggers/webhook/:workflowId
// ══════════════════════════════════════════════════════════════════════════════

describe('POST /triggers/webhook/:workflowId', () => {
  it('returns 404 when workflow not found', async () => {
    mockLookup.mockResolvedValueOnce(null);
    const res = await request(app)
      .post('/triggers/webhook/wf-missing')
      .send({ headers: {}, body: {}, method: 'POST' });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Workflow not found');
  });

  it('returns 400 when workflow is not active', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, status: 'inactive' });
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: {}, method: 'POST' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Workflow is not active');
  });

  it('returns 403 when webhook_url is not set', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, webhook_url: null });
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: {}, method: 'POST' });
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Webhook not enabled for this workflow');
  });

  it('returns 401 when signature is invalid', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, webhook_secret: 'secret123' });
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({
        headers: { 'x-webhook-signature': 'sha256=badhash' },
        body: { event: 'push' },
        method: 'POST',
      });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid webhook signature');
  });

  it('returns 401 when signature header is missing but secret is set', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, webhook_secret: 'secret123' });
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: { event: 'push' }, method: 'POST' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid webhook signature');
  });

  it('returns 200 with executionId when workflow has no secret', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW); // webhook_secret: null
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: { event: 'push' }, method: 'POST' });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
    expect(res.body.status).toBe('queued');
    expect(res.body.workflowId).toBe('wf-test-123');
  });

  it('returns 200 with valid HMAC signature', async () => {
    const secret = 'my-webhook-secret';
    const body = { event: 'push', repo: 'my-repo' };
    const bodyStr = JSON.stringify(body);
    const crypto = require('crypto');
    const sig = `sha256=${crypto.createHmac('sha256', secret).update(bodyStr).digest('hex')}`;

    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, webhook_secret: secret });
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({
        headers: { 'x-webhook-signature': sig },
        body,
        method: 'POST',
      });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
  });

  it('calls enqueueExecution with trigger=webhook', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: { data: 1 }, method: 'GET' });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowId: 'wf-test-123',
        userId: 'user-abc',
        trigger: 'webhook',
        input: expect.objectContaining({ _webhook: true, _method: 'GET' }),
      }),
    );
  });

  it('returns 503 when lookupWorkflow throws', async () => {
    mockLookup.mockRejectedValueOnce(new Error('DB unavailable'));
    const res = await request(app)
      .post('/triggers/webhook/wf-test-123')
      .send({ headers: {}, body: {}, method: 'POST' });
    expect(res.status).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// POST /triggers/form/:workflowId/:nodeId/submit
// ══════════════════════════════════════════════════════════════════════════════

describe('POST /triggers/form/:workflowId/:nodeId/submit', () => {
  it('returns 404 when workflow not found', async () => {
    mockLookup.mockResolvedValueOnce(null);
    const res = await request(app)
      .post('/triggers/form/wf-missing/node-1/submit')
      .send({ fields: { name: 'Alice' } });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Workflow not found');
  });

  it('returns 400 when workflow is not active', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, status: 'draft' });
    const res = await request(app)
      .post('/triggers/form/wf-test-123/node-1/submit')
      .send({ fields: { name: 'Alice' } });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Workflow is not active');
  });

  it('returns 200 with executionId on valid submission', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    const res = await request(app)
      .post('/triggers/form/wf-test-123/node-1/submit')
      .send({ fields: { name: 'Alice', email: 'alice@example.com' } });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
    expect(res.body.status).toBe('queued');
  });

  it('calls enqueueExecution with trigger=form and spreads fields into input', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/form/wf-test-123/node-2/submit')
      .send({ fields: { name: 'Bob', age: 30 } });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowId: 'wf-test-123',
        userId: 'user-abc',
        trigger: 'form',
        input: expect.objectContaining({
          _form: true,
          nodeId: 'node-2',
          name: 'Bob',
          age: 30,
          data: { name: 'Bob', age: 30 },
        }),
      }),
    );
  });

  it('handles missing fields key gracefully (empty fields)', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    const res = await request(app)
      .post('/triggers/form/wf-test-123/node-1/submit')
      .send({});
    expect(res.status).toBe(200);
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({ _form: true, data: {} }),
      }),
    );
  });

  it('returns 503 when lookupWorkflow throws', async () => {
    mockLookup.mockRejectedValueOnce(new Error('DB unavailable'));
    const res = await request(app)
      .post('/triggers/form/wf-test-123/node-1/submit')
      .send({ fields: { name: 'Alice' } });
    expect(res.status).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// POST /triggers/chat/:workflowId/:nodeId/message
// ══════════════════════════════════════════════════════════════════════════════

describe('POST /triggers/chat/:workflowId/:nodeId/message', () => {
  it('returns 400 when message is missing', async () => {
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid message');
  });

  it('returns 400 when message is an empty string', async () => {
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: '   ' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid message');
  });

  it('returns 400 when message is not a string', async () => {
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 42 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid message');
  });

  it('returns 404 when workflow not found', async () => {
    mockLookup.mockResolvedValueOnce(null);
    const res = await request(app)
      .post('/triggers/chat/wf-missing/node-1/message')
      .send({ message: 'Hello' });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Workflow not found');
  });

  it('returns 400 when workflow is not active', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, status: 'paused' });
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'Hello' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Workflow is not active');
  });

  it('returns 200 with executionId on valid message', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'What is the status?' });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
    expect(res.body.status).toBe('queued');
    expect(res.body.workflowId).toBe('wf-test-123');
  });

  it('uses workflowId_nodeId as default sessionId', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'Hello' });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({
          sessionId: 'wf-test-123_node-1',
        }),
      }),
    );
  });

  it('uses provided sessionId when given', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'Hello', sessionId: 'custom-session-abc' });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({
          sessionId: 'custom-session-abc',
        }),
      }),
    );
  });

  it('calls enqueueExecution with trigger=chat and _chat=true', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/chat/wf-test-123/node-chat/message')
      .send({ message: '  Hello world  ' });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowId: 'wf-test-123',
        userId: 'user-abc',
        trigger: 'chat',
        input: expect.objectContaining({
          _chat: true,
          message: 'Hello world', // trimmed
          node_id: 'node-chat',
        }),
      }),
    );
  });

  it('includes metadata in input when provided', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'Hi', metadata: { source: 'mobile' } });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({
          metadata: { source: 'mobile' },
        }),
      }),
    );
  });

  it('returns 503 when lookupWorkflow throws', async () => {
    mockLookup.mockRejectedValueOnce(new Error('DB unavailable'));
    const res = await request(app)
      .post('/triggers/chat/wf-test-123/node-1/message')
      .send({ message: 'Hello' });
    expect(res.status).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// POST /triggers/schedule/:workflowId — Phase 3 real handler
// ══════════════════════════════════════════════════════════════════════════════

describe('POST /triggers/schedule/:workflowId', () => {
  const ISO_NOW = new Date().toISOString();

  it('returns 400 when scheduledAt is missing', async () => {
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid payload');
    expect(res.body.message).toMatch(/scheduledAt/);
  });

  it('returns 400 when scheduledAt is not a string', async () => {
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: 12345 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid payload');
  });

  it('returns 400 when scheduledAt is an invalid date string', async () => {
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: 'not-a-date' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid payload');
    expect(res.body.message).toMatch(/ISO 8601/);
  });

  it('returns 404 when workflow not found', async () => {
    mockLookup.mockResolvedValueOnce(null);
    const res = await request(app)
      .post('/triggers/schedule/wf-missing')
      .send({ scheduledAt: ISO_NOW });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Workflow not found');
  });

  it('returns 400 when workflow is not active', async () => {
    mockLookup.mockResolvedValueOnce({ ...ACTIVE_WORKFLOW, status: 'draft' });
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Workflow is not active');
  });

  it('returns 200 with executionId on valid request (no cron)', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
    expect(res.body.status).toBe('queued');
    expect(res.body.workflowId).toBe('wf-test-123');
  });

  it('returns 200 with executionId when cron is provided', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW, cron: '0 9 * * 1' });
    expect(res.status).toBe(200);
    expect(res.body.executionId).toBe('exec-uuid-1');
  });

  it('calls enqueueExecution with trigger=schedule and scheduled_at', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        workflowId: 'wf-test-123',
        userId: 'user-abc',
        trigger: 'schedule',
        input: expect.objectContaining({
          trigger: 'schedule',
          scheduled_at: ISO_NOW,
        }),
      }),
    );
  });

  it('includes cron in input when provided', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW, cron: '*/5 * * * *' });
    expect(mockEnqueue).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.objectContaining({ cron: '*/5 * * * *' }),
      }),
    );
  });

  it('does NOT include cron in input when not provided', async () => {
    mockLookup.mockResolvedValueOnce(ACTIVE_WORKFLOW);
    await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW });
    const call = mockEnqueue.mock.calls[0]?.[0];
    expect(call?.input).not.toHaveProperty('cron');
  });

  it('returns 503 when lookupWorkflow throws', async () => {
    mockLookup.mockRejectedValueOnce(new Error('DB unavailable'));
    const res = await request(app)
      .post('/triggers/schedule/wf-test-123')
      .send({ scheduledAt: ISO_NOW });
    expect(res.status).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
  });
});
