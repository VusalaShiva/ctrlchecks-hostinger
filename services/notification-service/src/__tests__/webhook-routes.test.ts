/**
 * Tests for POST /notifications/webhook and POST /send channel=webhook (Phase 4).
 * webhook-deliver is mocked — no real HTTP calls.
 */

const mockDeliver = jest.fn();
const mockValidateWebhookUrl = jest.fn().mockReturnValue(null);
jest.mock('../lib/webhook-deliver', () => ({
  deliver: (...args: unknown[]) => mockDeliver(...args),
  validateWebhookUrl: (...args: unknown[]) => mockValidateWebhookUrl(...args),
}));

import request from 'supertest';
import app from '../index';

const SERVICE_KEY = 'svc-key-wh';
const USER_ID = 'user-wh-phase4';
const SAFE_URL = 'https://example.com/webhook';

function withAuth(req: request.Test): request.Test {
  return req.set('x-service-key', SERVICE_KEY).set('x-user-id', USER_ID);
}

describe('POST /notifications/webhook', () => {
  beforeAll(() => { process.env.NOTIFICATION_SERVICE_KEY = SERVICE_KEY; });
  afterAll(() => { delete process.env.NOTIFICATION_SERVICE_KEY; });

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateWebhookUrl.mockReturnValue(null);
    mockDeliver.mockResolvedValue({ status: 'sent', attempts: 1, httpStatus: 200 });
  });

  it('delivers webhook and returns 200 with sent status', async () => {
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({
        url: SAFE_URL,
        event: 'execution.completed',
        payload: { workflowName: 'My WF', executionId: 'exec-1' },
      }),
    );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('sent');
    expect(res.body.channel).toBe('webhook');
    expect(res.body.attempts).toBe(1);
    expect(typeof res.body.notificationId).toBe('string');
    expect(mockDeliver).toHaveBeenCalledWith(
      SAFE_URL,
      'execution.completed',
      { workflowName: 'My WF', executionId: 'exec-1' },
    );
  });

  it('returns 400 when url is missing', async () => {
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({ event: 'test' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_URL');
  });

  it('returns 400 when event is missing', async () => {
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({ url: SAFE_URL }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_EVENT');
  });

  it('returns 400 on SSRF URL', async () => {
    mockValidateWebhookUrl.mockReturnValue('SSRF: private address blocked');
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({ url: 'https://127.0.0.1/hook', event: 'test' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('SSRF_BLOCKED');
  });

  it('returns 502 when all delivery attempts fail', async () => {
    mockDeliver.mockResolvedValue({ status: 'failed', attempts: 3, error: 'HTTP 500' });
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({ url: SAFE_URL, event: 'test' }),
    );
    expect(res.status).toBe(502);
    expect(res.body.code).toBe('WEBHOOK_DELIVERY_FAILED');
    expect(res.body.attempts).toBe(3);
  });

  it('returns 502 on SSRF in deliver (double guard)', async () => {
    mockDeliver.mockResolvedValue({ status: 'failed', attempts: 0, error: 'SSRF: private address blocked' });
    const res = await withAuth(
      request(app).post('/notifications/webhook').send({ url: SAFE_URL, event: 'test' }),
    );
    expect(res.status).toBe(502);
  });
});

describe('POST /notifications/send channel=webhook', () => {
  beforeAll(() => { process.env.NOTIFICATION_SERVICE_KEY = SERVICE_KEY; });
  afterAll(() => { delete process.env.NOTIFICATION_SERVICE_KEY; });

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateWebhookUrl.mockReturnValue(null);
    mockDeliver.mockResolvedValue({ status: 'sent', attempts: 1, httpStatus: 200 });
  });

  it('dispatches webhook and returns 200', async () => {
    const res = await withAuth(
      request(app).post('/notifications/send').send({
        channel: 'webhook',
        url: SAFE_URL,
        event: 'execution.completed',
        payload: { workflowName: 'WF' },
      }),
    );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('sent');
    expect(res.body.channel).toBe('webhook');
  });

  it('returns 400 when url or event missing in webhook send', async () => {
    const res = await withAuth(
      request(app).post('/notifications/send').send({ channel: 'webhook' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_FIELDS');
  });

  it('returns 400 for unknown channel', async () => {
    const res = await withAuth(
      request(app).post('/notifications/send').send({ channel: 'carrier_pigeon' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('UNKNOWN_CHANNEL');
  });
});
