import request from 'supertest';

describe('requireAuth middleware', () => {
  const VALID_KEY = 'test-cred-service-key-abc';

  afterEach(() => {
    delete process.env.CREDENTIAL_SERVICE_KEY;
    delete process.env.COGNITO_AUTH_ENABLED;
    jest.resetModules();
  });

  it('returns 401 when service key is configured but not provided', async () => {
    jest.resetModules();
    process.env.CREDENTIAL_SERVICE_KEY = VALID_KEY;
    const { requireAuth } = await import('../middleware/auth');

    const mockReq = { headers: {}, requestId: 'test' } as any;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
    const mockNext = jest.fn();

    requireAuth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_REQUIRED' }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('passes through when correct x-service-key is provided', async () => {
    jest.resetModules();
    process.env.CREDENTIAL_SERVICE_KEY = VALID_KEY;
    const { requireAuth } = await import('../middleware/auth');

    const mockReq = {
      headers: { 'x-service-key': VALID_KEY },
      requestId: 'test',
    } as any;
    const mockRes = { status: jest.fn(), json: jest.fn() } as any;
    const mockNext = jest.fn();

    requireAuth(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('passes through when no key configured (dev mode)', async () => {
    jest.resetModules();
    delete process.env.CREDENTIAL_SERVICE_KEY;
    delete process.env.COGNITO_AUTH_ENABLED;
    const { requireAuth } = await import('../middleware/auth');

    const mockReq = { headers: {}, requestId: 'test' } as any;
    const mockRes = { status: jest.fn(), json: jest.fn() } as any;
    const mockNext = jest.fn();

    requireAuth(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('passes through when Bearer token present (Phase 1 — Cognito verification deferred)', async () => {
    jest.resetModules();
    process.env.CREDENTIAL_SERVICE_KEY = VALID_KEY;
    process.env.COGNITO_AUTH_ENABLED = 'false';
    const { requireAuth } = await import('../middleware/auth');

    const mockReq = {
      headers: { authorization: 'Bearer some-jwt-token' },
      requestId: 'test',
    } as any;
    const mockRes = { status: jest.fn(), json: jest.fn() } as any;
    const mockNext = jest.fn();

    requireAuth(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});

describe('requireAuth via HTTP (integration)', () => {
  const VALID_KEY = 'integration-test-key';

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    delete process.env.CREDENTIAL_SERVICE_KEY;
    delete process.env.COGNITO_AUTH_ENABLED;
  });

  it('GET /connections returns 401 without credentials when key is set', async () => {
    process.env.CREDENTIAL_SERVICE_KEY = VALID_KEY;
    const app = (await import('../index')).default;
    const res = await request(app).get('/connections');
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTH_REQUIRED');
  });

  it('GET /connections auth passes with valid service key (route reaches handler)', async () => {
    // Auth passes but no x-user-id → handler returns 401 USER_ID_REQUIRED (not AUTH_REQUIRED)
    // This proves auth middleware accepted the service key and reached the route.
    process.env.CREDENTIAL_SERVICE_KEY = VALID_KEY;
    const app = (await import('../index')).default;
    const res = await request(app)
      .get('/connections')
      .set('x-service-key', VALID_KEY);
    // AUTH_REQUIRED means auth middleware rejected the key — USER_ID_REQUIRED means it passed
    expect(res.body.code).toBe('USER_ID_REQUIRED');
  });
});
