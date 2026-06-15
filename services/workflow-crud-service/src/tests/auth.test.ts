import request from 'supertest';
import type { Express } from 'express';

// Set service key before importing app so the auth middleware sees it
const TEST_KEY = 'test-service-key-auth';

describe('auth middleware', () => {
  let app: Express;

  beforeAll(() => {
    process.env.WORKFLOW_CRUD_SERVICE_KEY = TEST_KEY;
    // Re-require after env is set so the warn branch doesn't fire
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app = require('../index').default;
  });

  afterAll(() => {
    delete process.env.WORKFLOW_CRUD_SERVICE_KEY;
  });

  it('rejects requests without credentials', async () => {
    const res = await request(app).get('/workflows');
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTH_REQUIRED');
  });

  it('accepts requests with valid x-service-key', async () => {
    // Real worker always sends x-user-id alongside x-service-key (see serviceHeaders() in client).
    // No DATABASE_URL in test → route returns 503 DB_UNAVAILABLE, not 401/403.
    const res = await request(app)
      .get('/workflows')
      .set('x-service-key', TEST_KEY)
      .set('x-user-id', 'test-user-1');
    expect(res.status).not.toBe(401);
    expect(res.status).not.toBe(403);
    expect(res.body.code).not.toBe('AUTH_REQUIRED');
    expect(res.body.code).not.toBe('INVALID_SERVICE_KEY');
  });

  it('accepts requests with Bearer token when Cognito auth disabled', async () => {
    // No COGNITO_AUTH_ENABLED=true → bearer passes through; x-user-id provides identity.
    // No DATABASE_URL in test → route returns 503, not 401/403.
    const res = await request(app)
      .get('/workflows')
      .set('Authorization', 'Bearer fake.jwt.token')
      .set('x-user-id', 'test-user-1');
    expect(res.status).not.toBe(401);
    expect(res.status).not.toBe(403);
    expect(res.body.code).not.toBe('AUTH_REQUIRED');
  });

  it('rejects requests with wrong service key', async () => {
    const res = await request(app)
      .get('/workflows')
      .set('x-service-key', 'wrong-key');
    expect(res.status).toBe(401);
  });
});
