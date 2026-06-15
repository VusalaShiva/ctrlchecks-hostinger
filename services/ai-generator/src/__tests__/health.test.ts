// Mock auth so tests don't need real Cognito JWT
jest.mock('../middleware/auth', () => ({
  requireAuth: (_req: unknown, _res: unknown, next: () => void) => next(),
  AuthenticatedRequest: {},
}));

// Mock catalog warm-up so tests don't trigger HTTP calls on module load
jest.mock('../lib/catalog', () => ({
  warmCatalog: jest.fn().mockResolvedValue(undefined),
}));

import request from 'supertest';
import app from '../index';

describe('Health probe', () => {
  describe('GET /health', () => {
    it('returns 200 with status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('ai-generator');
    });
  });

  describe('GET /metrics — Prometheus endpoint', () => {
    it('returns 200 with Prometheus text content-type', async () => {
      const res = await request(app).get('/metrics');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/text\/plain/);
    });

    it('response body contains # HELP markers', async () => {
      const res = await request(app).get('/metrics');
      expect(res.text).toContain('# HELP');
    });

    it('includes process_uptime_seconds gauge', async () => {
      const res = await request(app).get('/metrics');
      expect(res.text).toContain('process_uptime_seconds');
    });

    it('is accessible without a Cognito token', async () => {
      const res = await request(app).get('/metrics');
      expect(res.status).toBe(200);
    });
  });

  describe('Request ID header', () => {
    it('echoes x-request-id if provided', async () => {
      const res = await request(app)
        .get('/health')
        .set('x-request-id', 'test-rid-789');
      expect(res.headers['x-request-id']).toBe('test-rid-789');
    });

    it('generates a UUID when x-request-id is absent', async () => {
      const res = await request(app).get('/health');
      expect(res.headers['x-request-id']).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    });
  });
});
