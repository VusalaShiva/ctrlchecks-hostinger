/**
 * Phase 2 integration tests for trigger routes.
 *
 * DB is mocked so all workflow lookups throw "Database unavailable", which
 * results in 503. Schedule route is still a Phase 3 stub (501).
 */

jest.mock('../lib/db', () => ({
  checkDb: jest.fn().mockResolvedValue('skip'),
  queryDb: jest.fn().mockRejectedValue(new Error('Database unavailable — DATABASE_URL not configured')),
  getDb: jest.fn().mockResolvedValue(null),
  _resetPool: jest.fn(),
}));

jest.mock('../lib/workflow-lookup', () => ({
  lookupWorkflow: jest.fn().mockRejectedValue(new Error('Database unavailable — DATABASE_URL not configured')),
}));

jest.mock('../lib/execution-enqueue', () => ({
  enqueueExecution: jest.fn(),
}));

import request from 'supertest';
import app from '../index';

describe('Trigger routes — Phase 3 (no DB → 503; all four handlers active)', () => {
  beforeAll(() => {
    delete process.env.TRIGGER_SERVICE_KEY;
  });

  describe('POST /triggers/webhook/:workflowId', () => {
    it('returns 503 when DB is unavailable (Phase 2 real handler)', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-abc-123')
        .send({ headers: {}, body: { event: 'push' }, method: 'POST' });
      expect(res.status).toBe(503);
      expect(res.body.error).toBe('Service unavailable');
    });

    it('does NOT return 501 TRIGGER_SERVICE_STUB', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-abc-123')
        .send({ headers: {}, body: {}, method: 'POST' });
      expect(res.status).not.toBe(501);
    });
  });

  describe('POST /triggers/form/:workflowId/:nodeId/submit', () => {
    it('returns 503 when DB is unavailable (Phase 2 real handler)', async () => {
      const res = await request(app)
        .post('/triggers/form/wf-abc-123/node-1/submit')
        .send({ fields: { name: 'Alice' } });
      expect(res.status).toBe(503);
      expect(res.body.error).toBe('Service unavailable');
    });

    it('does NOT return 501 TRIGGER_SERVICE_STUB', async () => {
      const res = await request(app)
        .post('/triggers/form/wf-abc-123/node-1/submit')
        .send({ fields: { name: 'Alice' } });
      expect(res.status).not.toBe(501);
    });
  });

  describe('POST /triggers/chat/:workflowId/:nodeId/message', () => {
    it('returns 400 when message is missing', async () => {
      const res = await request(app)
        .post('/triggers/chat/wf-abc-123/node-1/message')
        .send({});
      expect(res.status).toBe(400);
    });

    it('returns 503 when DB is unavailable (Phase 2 real handler)', async () => {
      const res = await request(app)
        .post('/triggers/chat/wf-abc-123/node-1/message')
        .send({ message: 'Hello' });
      expect(res.status).toBe(503);
      expect(res.body.error).toBe('Service unavailable');
    });

    it('does NOT return 501 TRIGGER_SERVICE_STUB', async () => {
      const res = await request(app)
        .post('/triggers/chat/wf-abc-123/node-1/message')
        .send({ message: 'Hello' });
      expect(res.status).not.toBe(501);
    });
  });

  describe('POST /triggers/schedule/:workflowId — Phase 3 real handler', () => {
    it('returns 400 when scheduledAt is missing (real handler active)', async () => {
      const res = await request(app)
        .post('/triggers/schedule/wf-abc-123')
        .send({ cron: '0 9 * * 1' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid payload');
    });

    it('returns 503 when scheduledAt is provided but DB is unavailable', async () => {
      const res = await request(app)
        .post('/triggers/schedule/wf-abc-123')
        .send({ scheduledAt: new Date().toISOString(), cron: '0 9 * * 1' });
      expect(res.status).toBe(503);
      expect(res.body.error).toBe('Service unavailable');
    });

    it('does NOT return 501 TRIGGER_SERVICE_STUB', async () => {
      const res = await request(app)
        .post('/triggers/schedule/wf-abc-123')
        .send({ scheduledAt: new Date().toISOString() });
      expect(res.status).not.toBe(501);
    });
  });

  describe('404 for unknown routes', () => {
    it('returns 404 for unknown path', async () => {
      const res = await request(app).get('/triggers/unknown-route');
      expect(res.status).toBe(404);
    });
  });
});
