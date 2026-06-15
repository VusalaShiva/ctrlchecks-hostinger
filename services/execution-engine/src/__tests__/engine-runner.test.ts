// Mock Redis so publishExecutionEvent doesn't need real infra
jest.mock('../lib/redis', () => ({
  getRedis: jest.fn().mockResolvedValue({
    publish: jest.fn().mockResolvedValue(1),
    status: 'ready',
  }),
}));

import { runEngineJob } from '../runner/engine-runner';
import type { EngineJob } from '../runner/engine-runner';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const baseJob: EngineJob = {
  id: 'job_test_1',
  workflowId: 'wf_abc',
  executionId: 'exec_xyz',
  input: { trigger: 'manual' },
  userId: 'user_123',
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.WORKER_INTERNAL_URL = 'http://127.0.0.1:3001';
  process.env.WORKER_INTERNAL_KEY = 'test-engine-key';
});

describe('engine-runner: runEngineJob', () => {
  it('calls worker internal route with correct payload', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, durationMs: 120 }),
    });

    await runEngineJob(baseJob);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://127.0.0.1:3001/api/internal/engine-execute');
    expect(opts.method).toBe('POST');
    expect(opts.headers['x-internal-engine-key']).toBe('test-engine-key');

    const body = JSON.parse(opts.body);
    expect(body.workflowId).toBe('wf_abc');
    expect(body.executionId).toBe('exec_xyz');
    expect(body.userId).toBe('user_123');
  });

  it('logs "accepted" before call and "completed" on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, durationMs: 50 }),
    });

    const logLines: string[] = [];
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation((data: any) => {
      logLines.push(typeof data === 'string' ? data : data.toString());
      return true;
    });

    await runEngineJob(baseJob);
    spy.mockRestore();

    const parsed = logLines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    expect(parsed.some(p => p.event === 'accepted')).toBe(true);
    expect(parsed.some(p => p.event === 'completed')).toBe(true);
  });

  it('logs "failed" and publishes failed WS event when worker returns success=false', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, error: 'Node timeout', durationMs: 5000 }),
    });

    const logLines: string[] = [];
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation((data: any) => {
      logLines.push(typeof data === 'string' ? data : data.toString());
      return true;
    });

    await runEngineJob(baseJob);
    spy.mockRestore();

    const parsed = logLines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    const failLog = parsed.find(p => p.event === 'failed');
    expect(failLog).toBeTruthy();
    expect(failLog.error).toBe('Node timeout');
    expect(typeof failLog.durationMs).toBe('number');
  });

  it('logs "failed" and publishes failed WS event on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));

    const logLines: string[] = [];
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation((data: any) => {
      logLines.push(typeof data === 'string' ? data : data.toString());
      return true;
    });

    await runEngineJob(baseJob);
    spy.mockRestore();

    const parsed = logLines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    const failLog = parsed.find(p => p.event === 'failed');
    expect(failLog).toBeTruthy();
    expect(failLog.error).toContain('ECONNREFUSED');
  });

  it('sends job without userId when not provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, durationMs: 10 }),
    });

    const jobNoUser: EngineJob = { ...baseJob, userId: undefined };
    await runEngineJob(jobNoUser);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.userId).toBeUndefined();
  });
});
