import request from 'supertest';

// ── Mock lib/redis and lib/db before importing app ────────────────────────────
const mockZadd = jest.fn().mockResolvedValue(1);
const mockSetex = jest.fn().mockResolvedValue('OK');
const mockRedis = { zadd: mockZadd, setex: mockSetex, status: 'ready' };
const mockQuery = jest.fn().mockResolvedValue({ rows: [] });
const mockDb = { query: mockQuery };

jest.mock('../lib/redis', () => ({ getRedis: jest.fn() }));
jest.mock('../lib/db', () => ({ getDb: jest.fn() }));

import { getRedis } from '../lib/redis';
import { getDb } from '../lib/db';
import app from '../index';

const mockGetRedis = getRedis as jest.Mock;
const mockGetDb = getDb as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetRedis.mockResolvedValue(mockRedis);
  mockGetDb.mockResolvedValue(mockDb);
});

describe('POST /execute — Phase 2 (202 async accept)', () => {
  it('returns 202 with queued=true for valid request', async () => {
    const res = await request(app)
      .post('/execute')
      .set('Content-Type', 'application/json')
      .send({ workflowId: 'wf_abc123', userId: 'user_1', input: { foo: 'bar' } });

    expect(res.status).toBe(202);
    expect(res.body.queued).toBe(true);
    expect(typeof res.body.executionId).toBe('string');
    expect(res.body.executionId.length).toBeGreaterThan(0);
    expect(res.body.statusUrl).toMatch(/\/executions\/.+\/status/);
    expect(typeof res.body.jobId).toBe('string');
  });

  it('uses provided executionId when given', async () => {
    const res = await request(app)
      .post('/execute')
      .send({ workflowId: 'wf_abc123', executionId: 'exec-provided-42' });

    expect(res.status).toBe(202);
    expect(res.body.executionId).toBe('exec-provided-42');
    expect(res.body.statusUrl).toBe('/executions/exec-provided-42/status');
  });

  it('pre-creates execution record and enqueues job in Redis', async () => {
    await request(app)
      .post('/execute')
      .send({ workflowId: 'wf_abc123', executionId: 'exec-test-1' });

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO executions'),
      expect.arrayContaining(['exec-test-1', 'wf_abc123']),
    );
    expect(mockSetex).toHaveBeenCalledWith(
      expect.stringContaining('workflow:execution:job:'),
      3600,
      expect.stringContaining('"workflowId":"wf_abc123"'),
    );
    expect(mockZadd).toHaveBeenCalledWith('workflow:execution:queue', 0, expect.any(String));
  });

  it('returns 400 for missing workflowId', async () => {
    const res = await request(app)
      .post('/execute')
      .send({ executionId: 'exec-1', input: {} });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_WORKFLOW_ID');
  });

  it('returns 400 for non-string workflowId', async () => {
    const res = await request(app).post('/execute').send({ workflowId: 123 });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_WORKFLOW_ID');
  });

  it('returns 503 when Redis is unavailable', async () => {
    mockGetRedis.mockResolvedValue(null);

    const res = await request(app).post('/execute').send({ workflowId: 'wf_abc123' });

    expect(res.status).toBe(503);
    expect(res.body.code).toBe('REDIS_UNAVAILABLE');
  });

  it('returns 503 when Redis zadd throws', async () => {
    mockZadd.mockRejectedValueOnce(new Error('ECONNRESET'));

    const res = await request(app).post('/execute').send({ workflowId: 'wf_abc123' });

    expect(res.status).toBe(503);
    expect(res.body.code).toBe('QUEUE_ERROR');
  });

  it('returns 202 even when DB pre-create fails (non-fatal)', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB connection refused'));

    const res = await request(app).post('/execute').send({ workflowId: 'wf_abc123' });

    expect(res.status).toBe(202);
    expect(res.body.queued).toBe(true);
  });

  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
  });
});
