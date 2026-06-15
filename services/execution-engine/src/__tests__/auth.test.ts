// Mock Redis and DB so /health/ready succeeds in auth bypass tests
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

describe('Service-key authentication', () => {
  const VALID_KEY = 'test-service-key-abc123';

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
  });

  it('POST /execute without key returns 401 when key is configured', async () => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_SERVICE_KEY = VALID_KEY;
    const { requireServiceKey } = await import('../middleware/auth');

    const mockReq = { headers: {}, requestId: 'test' } as any;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
    const mockNext = jest.fn();

    requireServiceKey(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'INVALID_SERVICE_KEY' }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('passes through when correct key is provided', async () => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_SERVICE_KEY = VALID_KEY;
    const { requireServiceKey } = await import('../middleware/auth');

    const mockReq = {
      headers: { 'x-service-key': VALID_KEY },
      requestId: 'test',
    } as any;
    const mockRes = { status: jest.fn(), json: jest.fn() } as any;
    const mockNext = jest.fn();

    requireServiceKey(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('passes through when key is not configured (dev mode)', async () => {
    jest.resetModules();
    delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
    const { requireServiceKey } = await import('../middleware/auth');

    const mockReq = { headers: {}, requestId: 'test' } as any;
    const mockRes = { status: jest.fn(), json: jest.fn() } as any;
    const mockNext = jest.fn();

    requireServiceKey(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});

describe('Public probes bypass auth', () => {
  it('GET /health/live is accessible without service key', async () => {
    const app = (await import('../index')).default;
    const res = await request(app).get('/health/live');
    expect(res.status).toBe(200);
  });

  it('GET /health/ready is accessible without service key', async () => {
    const app = (await import('../index')).default;
    const res = await request(app).get('/health/ready');
    expect(res.status).toBe(200);
  });
});
