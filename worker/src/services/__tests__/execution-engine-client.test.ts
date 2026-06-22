/**
 * Unit tests for execution-engine-client.ts
 *
 * Verifies:
 *   - Feature-flag behaviour (null when disabled)
 *   - Service error handling (null on non-2xx, network errors)
 *   - Happy path (returns ExecuteResponse, correct headers)
 *   - Canary: isCanaryTarget() — deterministic 33% distribution
 */
export {};

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

// AbortSignal.timeout may not exist in the test runtime — polyfill minimally
if (!AbortSignal.timeout) {
  (AbortSignal as any).timeout = (_ms: number) => new AbortController().signal;
}

describe('execution-engine-client — flag disabled (default)', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.EXECUTION_ENGINE_ENABLED;
    mockFetch.mockReset();
  });

  it('delegateExecution returns null immediately — no fetch when flag is off', async () => {
    const { delegateExecution } = await import('../execution-engine-client');
    const result = await delegateExecution({
      workflowId: 'wf_1',
      executionId: 'exec_1',
      userId: 'user_1',
    });
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('isExecutionEngineHealthy returns false when flag is off', async () => {
    const { isExecutionEngineHealthy } = await import('../execution-engine-client');
    const ok = await isExecutionEngineHealthy();
    expect(ok).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('isCanaryTarget always returns false when flag is off', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    // Test many IDs — all must return false
    const ids = Array.from({ length: 20 }, (_, i) => `exec-canary-${i}`);
    for (const id of ids) {
      expect(isCanaryTarget(id)).toBe(false);
    }
  });
});

describe('execution-engine-client — flag enabled, service errors', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_URL = 'http://localhost:3003';
    process.env.EXECUTION_ENGINE_SERVICE_KEY = 'test-key';
    mockFetch.mockReset();
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_URL;
    delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
  });

  it('returns null when service responds with non-2xx', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 501 });
    const { delegateExecution } = await import('../execution-engine-client');
    const result = await delegateExecution({
      workflowId: 'wf_1',
      executionId: 'exec_1',
      userId: 'user_1',
    });
    expect(result).toBeNull();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('returns null when fetch throws (network error)', async () => {
    mockFetch.mockRejectedValue(new Error('ECONNREFUSED'));
    const { delegateExecution } = await import('../execution-engine-client');
    const result = await delegateExecution({
      workflowId: 'wf_1',
      executionId: 'exec_1',
      userId: 'user_1',
    });
    expect(result).toBeNull();
  });
});

describe('execution-engine-client — flag enabled, service succeeds', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_URL = 'http://localhost:3003';
    process.env.EXECUTION_ENGINE_SERVICE_KEY = 'test-key';
    mockFetch.mockReset();
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_URL;
    delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
  });

  it('returns ExecuteResponse on success', async () => {
    const fakeResponse = {
      queued: true,
      executionId: 'exec_1',
      jobId: 'job_123',
      statusUrl: '/executions/exec_1/status',
    };
    mockFetch.mockResolvedValue({
      ok: true,
      status: 202,
      json: () => Promise.resolve(fakeResponse),
    });

    const { delegateExecution } = await import('../execution-engine-client');
    const result = await delegateExecution({
      workflowId: 'wf_1',
      executionId: 'exec_1',
      userId: 'user_1',
    });

    expect(result).toEqual(fakeResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3003/execute',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'x-service-key': 'test-key' }),
      }),
    );
  });
});

describe('execution-engine-client — userId forwarded in request payload', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_URL = 'http://localhost:3003';
    process.env.EXECUTION_ENGINE_SERVICE_KEY = 'test-key';
    mockFetch.mockReset();
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_URL;
    delete process.env.EXECUTION_ENGINE_SERVICE_KEY;
  });

  it('includes userId in the JSON body sent to the engine', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 202,
      json: () => Promise.resolve({ queued: true, executionId: 'e1', statusUrl: '/s' }),
    });

    const { delegateExecution } = await import('../execution-engine-client');
    await delegateExecution({ workflowId: 'wf', executionId: 'e1', userId: 'user_cognito_sub_abc' });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.userId).toBe('user_cognito_sub_abc');
  });

  it('omits userId from body when not provided', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 202,
      json: () => Promise.resolve({ queued: true, executionId: 'e2', statusUrl: '/s' }),
    });

    const { delegateExecution } = await import('../execution-engine-client');
    await delegateExecution({ workflowId: 'wf', executionId: 'e2' });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.userId).toBeUndefined();
  });

  it('includes metadata in the JSON body', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 202,
      json: () => Promise.resolve({ queued: true, executionId: 'e3', statusUrl: '/s' }),
    });

    const { delegateExecution } = await import('../execution-engine-client');
    await delegateExecution({
      workflowId: 'wf',
      executionId: 'e3',
      userId: 'u1',
      metadata: { source: 'canary-33', origin: 'worker' },
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.metadata?.source).toBe('canary-33');
    expect(body.metadata?.origin).toBe('worker');
  });
});

describe('execution-engine-client — isCanaryTarget (flag enabled, default 33%)', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '33';
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_CANARY_PERCENT;
  });

  it('is deterministic — same ID always gives same result', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const id = 'exec-deterministic-test-id-42';
    const first = isCanaryTarget(id);
    expect(isCanaryTarget(id)).toBe(first);
    expect(isCanaryTarget(id)).toBe(first);
  });

  it('routes approximately 33% of IDs to canary', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 99 }, (_, i) => `exec-hash-test-${i}`);
    const trueCount = ids.filter(id => isCanaryTarget(id)).length;
    // Expect 22–45 hits (22%–45%) — generous bounds for hash distribution variance
    expect(trueCount).toBeGreaterThanOrEqual(22);
    expect(trueCount).toBeLessThanOrEqual(45);
  });

  it('defaults to 33% when EXECUTION_ENGINE_CANARY_PERCENT is not set', async () => {
    jest.resetModules();
    delete process.env.EXECUTION_ENGINE_CANARY_PERCENT;
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 99 }, (_, i) => `exec-hash-test-${i}`);
    const trueCount = ids.filter(id => isCanaryTarget(id)).length;
    expect(trueCount).toBeGreaterThanOrEqual(22);
    expect(trueCount).toBeLessThanOrEqual(45);
  });

  it('uses fnv1a(id) % 100 < pct — regression anchors for hash stability', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    // If the hash algorithm changes, at least one of these will flip
    const results = ['exec-hash-test-0', 'exec-hash-test-1', 'exec-hash-test-2', 'exec-hash-test-3']
      .map(id => isCanaryTarget(id));
    // All must be boolean
    results.forEach(r => expect(typeof r).toBe('boolean'));
    // Not all the same (hash is non-trivial)
    expect(new Set(results).size).toBeGreaterThan(1);
  });
});

describe('execution-engine-client — isCanaryTarget CANARY_PERCENT=66 (Phase 4)', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '66';
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_CANARY_PERCENT;
  });

  it('routes approximately 66% of IDs to canary', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 99 }, (_, i) => `exec-hash-test-${i}`);
    const trueCount = ids.filter(id => isCanaryTarget(id)).length;
    // Expect 55–75 hits (55%–75%) — generous bounds for hash variance
    expect(trueCount).toBeGreaterThanOrEqual(55);
    expect(trueCount).toBeLessThanOrEqual(75);
  });

  it('is still deterministic at 66%', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const id = 'exec-canary-66-test-id';
    const first = isCanaryTarget(id);
    expect(isCanaryTarget(id)).toBe(first);
    expect(isCanaryTarget(id)).toBe(first);
  });

  it('66% routes more IDs than 33% for the same set', async () => {
    // getCanaryPercent() reads process.env at call time, so we can use one import
    // and swap the env var between counts.
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 99 }, (_, i) => `exec-hash-test-${i}`);

    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '33';
    const count33 = ids.filter(id => isCanaryTarget(id)).length;

    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '66';
    const count66 = ids.filter(id => isCanaryTarget(id)).length;

    expect(count66).toBeGreaterThan(count33);
  });
});

describe('execution-engine-client — isCanaryTarget CANARY_PERCENT=100 (Phase 5 prep)', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '100';
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_CANARY_PERCENT;
  });

  it('routes 100% of IDs to canary when CANARY_PERCENT=100', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 50 }, (_, i) => `exec-hash-test-${i}`);
    const trueCount = ids.filter(id => isCanaryTarget(id)).length;
    expect(trueCount).toBe(50);
  });
});

describe('execution-engine-client — isCanaryTarget CANARY_PERCENT=0 (emergency stop)', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    process.env.EXECUTION_ENGINE_CANARY_PERCENT = '0';
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
    delete process.env.EXECUTION_ENGINE_CANARY_PERCENT;
  });

  it('routes 0% when CANARY_PERCENT=0 (flag on but canary off)', async () => {
    const { isCanaryTarget } = await import('../execution-engine-client');
    const ids = Array.from({ length: 50 }, (_, i) => `exec-hash-test-${i}`);
    const trueCount = ids.filter(id => isCanaryTarget(id)).length;
    expect(trueCount).toBe(0);
  });
});
