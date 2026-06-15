// Mock Redis and DB so /health/ready works in tests without real infrastructure
jest.mock('../lib/redis', () => ({
  getRedis: jest.fn().mockResolvedValue({
    ping: jest.fn().mockResolvedValue('PONG'),
    status: 'ready',
  }),
}));
jest.mock('../lib/db', () => ({
  getDb: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue({ rows: [{ '?column?': 1 }] }),
  }),
}));

import request from 'supertest';
import app from '../index';

describe('Health probes', () => {
  describe('GET /health/live', () => {
    it('returns 200 with status live', async () => {
      const res = await request(app).get('/health/live');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('live');
      expect(res.body.service).toBe('execution-engine');
    });
  });

  describe('GET /health/ready', () => {
    it('returns 200 with status ready when Redis and DB are healthy', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ready');
      expect(res.body.checks).toEqual({ redis: 'ok', db: 'ok' });
      expect(typeof res.body.timestamp).toBe('string');
    });
  });

  describe('GET /health', () => {
    it('returns 200 legacy health alias', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('execution-engine');
    });
  });

  describe('Request ID header', () => {
    it('echoes x-request-id if provided', async () => {
      const res = await request(app)
        .get('/health/live')
        .set('x-request-id', 'test-id-123');
      expect(res.headers['x-request-id']).toBe('test-id-123');
    });

    it('generates a uuid when x-request-id is absent', async () => {
      const res = await request(app).get('/health/live');
      expect(res.headers['x-request-id']).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
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

    it('is accessible without authentication', async () => {
      const orig = process.env.EXECUTION_ENGINE_SERVICE_KEY;
      process.env.EXECUTION_ENGINE_SERVICE_KEY = 'test-key-xyz';
      try {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
      } finally {
        if (orig === undefined) delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
        else process.env.EXECUTION_ENGINE_SERVICE_KEY = orig;
      }
    });
  });
});
