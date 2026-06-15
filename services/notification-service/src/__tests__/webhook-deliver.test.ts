/**
 * Tests for webhook-deliver.ts — SSRF guard, retry, 256KB limit.
 * Uses zero-delay backoffs and a mocked global fetch.
 */

import {
  deliver,
  validateWebhookUrl,
  _setBackoffForTest,
  _resetBackoff,
} from '../lib/webhook-deliver';

// Zero-delay backoff so tests run instantly
_setBackoffForTest([0, 0, 0]);

const SAFE_URL = 'https://example.com/hook';

describe('validateWebhookUrl', () => {
  it('accepts a valid HTTPS URL', () => {
    expect(validateWebhookUrl(SAFE_URL)).toBeNull();
  });

  it('blocks plain HTTP', () => {
    expect(validateWebhookUrl('http://example.com/hook')).toMatch(/HTTPS/i);
  });

  it('blocks localhost', () => {
    expect(validateWebhookUrl('https://localhost/hook')).toMatch(/SSRF/i);
  });

  it('blocks 127.x.x.x', () => {
    expect(validateWebhookUrl('https://127.0.0.1/hook')).toMatch(/SSRF/i);
  });

  it('blocks 10.x.x.x', () => {
    expect(validateWebhookUrl('https://10.0.0.1/hook')).toMatch(/SSRF/i);
  });

  it('blocks 172.16-31.x.x', () => {
    expect(validateWebhookUrl('https://172.16.0.1/hook')).toMatch(/SSRF/i);
    expect(validateWebhookUrl('https://172.31.255.255/hook')).toMatch(/SSRF/i);
    // 172.32 is public
    expect(validateWebhookUrl('https://172.32.0.1/hook')).toBeNull();
  });

  it('blocks 192.168.x.x', () => {
    expect(validateWebhookUrl('https://192.168.1.100/hook')).toMatch(/SSRF/i);
  });

  it('blocks 169.254.x.x link-local', () => {
    expect(validateWebhookUrl('https://169.254.0.1/hook')).toMatch(/SSRF/i);
  });

  it('blocks IPv6 loopback ::1', () => {
    expect(validateWebhookUrl('https://[::1]/hook')).toMatch(/SSRF/i);
  });

  it('blocks malformed URLs', () => {
    expect(validateWebhookUrl('not-a-url')).not.toBeNull();
    expect(validateWebhookUrl('')).not.toBeNull();
  });
});

describe('deliver', () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    (global as any).fetch = mockFetch;
  });

  afterAll(() => {
    _resetBackoff();
    delete (global as any).fetch;
  });

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('returns sent on 200', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
    const result = await deliver(SAFE_URL, 'test.event', { foo: 'bar' });
    expect(result.status).toBe('sent');
    expect(result.attempts).toBe(1);
    expect(result.httpStatus).toBe(200);
  });

  it('retries on 5xx and returns sent on second attempt', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    const result = await deliver(SAFE_URL, 'test.event', {});
    expect(result.status).toBe('sent');
    expect(result.attempts).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('returns failed after all 3 attempts on persistent 5xx', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    const result = await deliver(SAFE_URL, 'test.event', {});
    expect(result.status).toBe('failed');
    expect(result.attempts).toBe(3);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('does NOT retry on 4xx (permanent failure)', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await deliver(SAFE_URL, 'test.event', {});
    expect(result.status).toBe('failed');
    expect(result.attempts).toBe(1);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('retries on network error', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('ECONNREFUSED'))
      .mockResolvedValueOnce({ ok: true, status: 200 });
    const result = await deliver(SAFE_URL, 'test.event', {});
    expect(result.status).toBe('sent');
    expect(result.attempts).toBe(2);
  });

  it('returns failed without calling fetch on SSRF URL', async () => {
    const result = await deliver('https://127.0.0.1/hook', 'test.event', {});
    expect(result.status).toBe('failed');
    expect(result.attempts).toBe(0);
    expect(result.error).toMatch(/SSRF/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns failed without calling fetch when payload exceeds 256KB', async () => {
    const bigPayload = { data: 'x'.repeat(260 * 1024) };
    const result = await deliver(SAFE_URL, 'test.event', bigPayload);
    expect(result.status).toBe('failed');
    expect(result.attempts).toBe(0);
    expect(result.error).toMatch(/256KB/);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('sends correct headers and body shape', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });
    await deliver(SAFE_URL, 'execution.completed', { workflowName: 'WF1' });
    expect(mockFetch).toHaveBeenCalledWith(
      SAFE_URL,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-CtrlChecks-Event': 'execution.completed',
        }),
        body: expect.stringContaining('"event":"execution.completed"'),
      }),
    );
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.event).toBe('execution.completed');
    expect(body.payload).toEqual({ workflowName: 'WF1' });
    expect(typeof body.timestamp).toBe('string');
  });
});
