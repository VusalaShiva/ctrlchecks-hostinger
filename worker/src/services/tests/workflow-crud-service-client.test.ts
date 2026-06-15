import {
  isWorkflowCrudServiceEnabled,
  getCanaryPercent,
  shouldUseWorkflowCrudService,
  saveWorkflowRemote,
  getWorkflowRemote,
  listWorkflowsRemote,
  deleteWorkflowRemote,
  listWorkflowVersionsRemote,
  rollbackWorkflowRemote,
  listTemplatesRemote,
  getTemplateRemote,
  isWorkflowCrudLocalWritesDisabled,
} from '../workflow-crud-service-client';

// Mock metrics so delegation counters don't emit during tests
jest.mock('../../middleware/highScaleMetrics', () => ({
  incWorkflowCrudDelegation: jest.fn(),
}));

// Global fetch mock — set up per-test in the fetch-dependent suites
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  // Restore env after each test
  process.env = { ...ORIGINAL_ENV };
});

// ── Feature flag ──────────────────────────────────────────────────────────────

describe('isWorkflowCrudServiceEnabled()', () => {
  it('returns false when WORKFLOW_CRUD_SERVICE_ENABLED is unset', () => {
    delete process.env.WORKFLOW_CRUD_SERVICE_ENABLED;
    expect(isWorkflowCrudServiceEnabled()).toBe(false);
  });

  it('returns false when set to "false"', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
    expect(isWorkflowCrudServiceEnabled()).toBe(false);
  });

  it('returns true when set to "true"', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    expect(isWorkflowCrudServiceEnabled()).toBe(true);
  });
});

// ── Canary percent ────────────────────────────────────────────────────────────

describe('getCanaryPercent()', () => {
  it('returns 0 when unset', () => {
    delete process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT;
    expect(getCanaryPercent()).toBe(0);
  });

  it('clamps to 0 for negative values', () => {
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '-10';
    expect(getCanaryPercent()).toBe(0);
  });

  it('clamps to 100 for values above 100', () => {
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '150';
    expect(getCanaryPercent()).toBe(100);
  });

  it('parses valid integer', () => {
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '50';
    expect(getCanaryPercent()).toBe(50);
  });

  it('returns 0 for non-numeric string', () => {
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = 'banana';
    expect(getCanaryPercent()).toBe(0);
  });
});

// ── Canary routing ────────────────────────────────────────────────────────────

describe('shouldUseWorkflowCrudService()', () => {
  it('returns false when service is disabled regardless of percent', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '100';
    expect(shouldUseWorkflowCrudService('user-123')).toBe(false);
  });

  it('returns false when canary percent is 0', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '0';
    expect(shouldUseWorkflowCrudService('user-123')).toBe(false);
  });

  it('returns true for all users when canary percent is 100', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '100';
    expect(shouldUseWorkflowCrudService('user-aaa')).toBe(true);
    expect(shouldUseWorkflowCrudService('user-bbb')).toBe(true);
    expect(shouldUseWorkflowCrudService('user-zzz')).toBe(true);
  });

  it('is deterministic — same userId always maps to same side', () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_CANARY_PERCENT = '50';
    const userId = 'stable-user-42';
    const first = shouldUseWorkflowCrudService(userId);
    const second = shouldUseWorkflowCrudService(userId);
    expect(first).toBe(second);
  });
});

// ── Remote methods return null when disabled ──────────────────────────────────

describe('remote methods return null when service is disabled', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
  });

  it('saveWorkflowRemote returns null', async () => {
    const result = await saveWorkflowRemote('u1', { name: 'wf', nodes: [], edges: [] });
    expect(result).toBeNull();
  });

  it('getWorkflowRemote returns null', async () => {
    const result = await getWorkflowRemote('u1', 'wf-1');
    expect(result).toBeNull();
  });

  it('listWorkflowsRemote returns null', async () => {
    const result = await listWorkflowsRemote('u1');
    expect(result).toBeNull();
  });

  it('deleteWorkflowRemote returns null', async () => {
    const result = await deleteWorkflowRemote('u1', 'wf-1');
    expect(result).toBeNull();
  });

  it('listWorkflowVersionsRemote returns null', async () => {
    const result = await listWorkflowVersionsRemote('u1', 'wf-1');
    expect(result).toBeNull();
  });

  it('rollbackWorkflowRemote returns null', async () => {
    const result = await rollbackWorkflowRemote('u1', 'wf-1', 2);
    expect(result).toBeNull();
  });
});

// ── listWorkflowVersionsRemote — fetch integration ────────────────────────────

describe('listWorkflowVersionsRemote — HTTP behaviour', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    process.env.WORKFLOW_CRUD_SERVICE_KEY = 'test-key';
    jest.clearAllMocks();
  });

  it('calls GET /workflows/:id/versions with correct headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ version: 1, savedAt: '2026-01-01T00:00:00.000Z' }],
    });

    await listWorkflowVersionsRemote('user-1', 'wf-abc');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/workflows/wf-abc/versions');
    expect(opts.method).toBe('GET');
    expect(opts.headers['x-service-key']).toBe('test-key');
    expect(opts.headers['x-user-id']).toBe('user-1');
  });

  it('returns versions array on 200', async () => {
    const versions = [
      { version: 2, savedAt: '2026-01-02T00:00:00.000Z', label: 'Second save' },
      { version: 1, savedAt: '2026-01-01T00:00:00.000Z', label: 'First save' },
    ];
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => versions });

    const result = await listWorkflowVersionsRemote('user-1', 'wf-abc');
    expect(result).toEqual(versions);
  });

  it('returns null on non-200 response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await listWorkflowVersionsRemote('user-1', 'wf-missing');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const result = await listWorkflowVersionsRemote('user-1', 'wf-abc');
    expect(result).toBeNull();
  });
});

// ── rollbackWorkflowRemote — fetch integration ────────────────────────────────

describe('rollbackWorkflowRemote — HTTP behaviour', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    process.env.WORKFLOW_CRUD_SERVICE_KEY = 'test-key';
    jest.clearAllMocks();
  });

  it('calls POST /workflows/:id/versions/:v/rollback with correct headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'wf-abc', version: 3, rolledBackFrom: 2 }),
    });

    await rollbackWorkflowRemote('user-1', 'wf-abc', 2);

    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/workflows/wf-abc/versions/2/rollback');
    expect(opts.method).toBe('POST');
    expect(opts.headers['x-service-key']).toBe('test-key');
    expect(opts.headers['x-user-id']).toBe('user-1');
  });

  it('returns rollback result on 200', async () => {
    const rollbackResult = { id: 'wf-abc', version: 3, rolledBackFrom: 2 };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => rollbackResult });

    const result = await rollbackWorkflowRemote('user-1', 'wf-abc', 2);
    expect(result).toEqual(rollbackResult);
  });

  it('returns null on non-200 response (e.g. 404 version not found)', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await rollbackWorkflowRemote('user-1', 'wf-abc', 99);
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('fetch failed'));
    const result = await rollbackWorkflowRemote('user-1', 'wf-abc', 1);
    expect(result).toBeNull();
  });
});

// ── listWorkflowsRemote — canary + HTTP behaviour ─────────────────────────────

describe('listWorkflowsRemote — canary + HTTP', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    process.env.WORKFLOW_CRUD_SERVICE_KEY = 'test-key';
    jest.clearAllMocks();
  });

  it('returns null when service is disabled', async () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
    const result = await listWorkflowsRemote('u1');
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('calls GET /workflows with x-user-id and x-service-key headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ workflows: [], total: 0 }),
    });
    await listWorkflowsRemote('user-42');
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/workflows');
    expect(opts.headers['x-user-id']).toBe('user-42');
    expect(opts.headers['x-service-key']).toBe('test-key');
  });

  it('returns workflow list on 200', async () => {
    const payload = { workflows: [{ id: 'wf-1' }], total: 1 };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => payload });
    const result = await listWorkflowsRemote('user-42');
    expect(result).toEqual(payload);
  });

  it('returns null on non-200 response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    const result = await listWorkflowsRemote('user-42');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const result = await listWorkflowsRemote('user-42');
    expect(result).toBeNull();
  });
});

// ── getWorkflowRemote — canary + HTTP behaviour ───────────────────────────────

describe('getWorkflowRemote — canary + HTTP', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    process.env.WORKFLOW_CRUD_SERVICE_KEY = 'test-key';
    jest.clearAllMocks();
  });

  it('calls GET /workflows/:id with correct headers', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ workflow: { id: 'wf-abc' } }),
    });
    await getWorkflowRemote('user-42', 'wf-abc');
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/workflows/wf-abc');
    expect(opts.headers['x-user-id']).toBe('user-42');
  });

  it('returns workflow object on 200', async () => {
    const payload = { workflow: { id: 'wf-abc', name: 'My Flow' } };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => payload });
    const result = await getWorkflowRemote('user-42', 'wf-abc');
    expect(result).toEqual(payload);
  });

  it('returns null on 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    const result = await getWorkflowRemote('user-42', 'wf-missing');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('timeout'));
    const result = await getWorkflowRemote('user-42', 'wf-abc');
    expect(result).toBeNull();
  });

  it('returns null when service is disabled', async () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
    const result = await getWorkflowRemote('u1', 'wf-1');
    expect(result).toBeNull();
  });
});

// ── listTemplatesRemote / getTemplateRemote ───────────────────────────────────

describe('listTemplatesRemote', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    jest.clearAllMocks();
  });

  it('returns null when service disabled', async () => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'false';
    expect(await listTemplatesRemote()).toBeNull();
  });

  it('calls GET /templates with no params when none given', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ templates: [] }) });
    await listTemplatesRemote();
    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/templates');
  });

  it('appends category and search as query params', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ templates: [] }) });
    await listTemplatesRemote({ category: 'marketing', search: 'email' });
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('category=marketing');
    expect(url).toContain('search=email');
  });

  it('returns null on failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 503 });
    expect(await listTemplatesRemote()).toBeNull();
  });
});

describe('getTemplateRemote', () => {
  beforeEach(() => {
    process.env.WORKFLOW_CRUD_SERVICE_ENABLED = 'true';
    process.env.WORKFLOW_CRUD_SERVICE_URL = 'http://localhost:3007';
    jest.clearAllMocks();
  });

  it('calls GET /templates/:id', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ template: { id: 'tpl-1' } }) });
    await getTemplateRemote('tpl-1');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3007/templates/tpl-1');
  });

  it('returns null on 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    expect(await getTemplateRemote('tpl-missing')).toBeNull();
  });
});

// ── isWorkflowCrudLocalWritesDisabled ─────────────────────────────────────────

describe('isWorkflowCrudLocalWritesDisabled()', () => {
  it('returns false when env var is unset', () => {
    delete process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED;
    expect(isWorkflowCrudLocalWritesDisabled()).toBe(false);
  });

  it('returns false when set to "false"', () => {
    process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED = 'false';
    expect(isWorkflowCrudLocalWritesDisabled()).toBe(false);
  });

  it('returns true when set to "true"', () => {
    process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED = 'true';
    expect(isWorkflowCrudLocalWritesDisabled()).toBe(true);
  });

  it('returns false for any other string', () => {
    process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED = '1';
    expect(isWorkflowCrudLocalWritesDisabled()).toBe(false);
  });
});
