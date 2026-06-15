// Mock DB so /health/ready works in tests without real infrastructure
jest.mock('../lib/db', () => ({
  getDb: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue({ rows: [{ '?column?': 1 }] }),
  }),
  queryDb: jest.fn().mockResolvedValue([]),
}));

// Mock crypto so routes don't need CREDENTIAL_ENCRYPTION_KEY
jest.mock('../lib/crypto', () => ({
  encryptJson: jest.fn(() => 'v1:mocked'),
  decryptJson: jest.fn(() => ({})),
  maskSecrets: jest.fn((v: unknown) => v),
}));

import request from 'supertest';
import app from '../index';

describe('Health probes', () => {
  describe('GET /health/live', () => {
    it('returns 200 with status live', async () => {
      const res = await request(app).get('/health/live');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('live');
      expect(res.body.service).toBe('credential-service');
    });
  });

  describe('GET /health/ready', () => {
    it('returns 200 with status ready when DB is healthy', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ready');
      expect(typeof res.body.timestamp).toBe('string');
    });

    it('returns 200 with db:skip when DATABASE_URL is not configured', async () => {
      jest.resetModules();
      const { getDb } = jest.requireMock('../lib/db') as { getDb: jest.Mock };
      getDb.mockResolvedValueOnce(null);
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /health', () => {
    it('returns 200 legacy health alias', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('credential-service');
    });
  });

  describe('Request ID header', () => {
    it('echoes x-request-id if provided', async () => {
      const res = await request(app)
        .get('/health/live')
        .set('x-request-id', 'test-rid-456');
      expect(res.headers['x-request-id']).toBe('test-rid-456');
    });

    it('generates a UUID when x-request-id is absent', async () => {
      const res = await request(app).get('/health/live');
      expect(res.headers['x-request-id']).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    });
  });

  describe('Health probes bypass auth', () => {
    it('GET /health/live is accessible without any credentials', async () => {
      const res = await request(app).get('/health/live');
      expect(res.status).toBe(200);
    });

    it('GET /health/ready is accessible without any credentials', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
    });

    it('GET /health is accessible without any credentials', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
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
      const orig = process.env.CREDENTIAL_SERVICE_KEY;
      process.env.CREDENTIAL_SERVICE_KEY = 'test-key-xyz';
      try {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
      } finally {
        if (orig === undefined) delete process.env.CREDENTIAL_SERVICE_KEY;
        else process.env.CREDENTIAL_SERVICE_KEY = orig;
      }
    });
  });
});
