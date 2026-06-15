import request from 'supertest';
import app from '../index';

describe('Auth middleware', () => {
  describe('when TRIGGER_SERVICE_KEY is set', () => {
    beforeEach(() => {
      process.env.TRIGGER_SERVICE_KEY = 'test-key-xyz';
    });
    afterEach(() => {
      delete process.env.TRIGGER_SERVICE_KEY;
    });

    it('rejects requests without credentials with 401', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-123')
        .send({ data: 'test' });
      expect(res.status).toBe(401);
      expect(res.body.code).toBe('AUTH_REQUIRED');
    });

    it('accepts correct x-service-key and passes auth (reaches route handler)', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-123')
        .set('x-service-key', 'test-key-xyz')
        .send({ headers: {}, body: {}, method: 'POST' });
      // Auth passes → Phase 2 handler runs (503 when no DB, not 401)
      expect(res.status).not.toBe(401);
    });

    it('rejects wrong x-service-key with 401', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-123')
        .set('x-service-key', 'wrong-key')
        .send({});
      expect(res.status).toBe(401);
    });

    it('accepts Bearer token and passes auth (Phase 1 — no Cognito verification)', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-123')
        .set('Authorization', 'Bearer fake-jwt-token')
        .send({ headers: {}, body: {}, method: 'POST' });
      // Cognito verification deferred until Phase 3 → passes → Phase 2 handler (not 401)
      expect(res.status).not.toBe(401);
    });
  });

  describe('when TRIGGER_SERVICE_KEY is not set (dev mode)', () => {
    beforeEach(() => {
      delete process.env.TRIGGER_SERVICE_KEY;
    });

    it('allows all requests through without credentials (dev mode)', async () => {
      const res = await request(app)
        .post('/triggers/webhook/wf-123')
        .send({ headers: {}, body: {}, method: 'POST' });
      // No key required in dev → reaches Phase 2 handler (not 401)
      expect(res.status).not.toBe(401);
    });
  });
});
