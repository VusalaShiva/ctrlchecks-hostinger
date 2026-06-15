/**
 * Phase 5 routing tests — execute-workflow.ts
 *
 * Verifies:
 *   1. ENABLED=true + engine success  → 202 (no monolith fallback)
 *   2. ENABLED=true + engine returns null → 503 EXECUTION_ENGINE_UNAVAILABLE
 *   3. ENABLED=false → engine block skipped, monolith queue returns 202
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

// ─── Mock execution-engine-client ─────────────────────────────────────────────

const mockDelegateExecution = jest.fn() as jest.Mock<any>;

jest.mock('../../services/execution-engine-client', () => ({
  delegateExecution: mockDelegateExecution,
  isCanaryTarget: jest.fn(() => false),
  isExecutionEngineHealthy: jest.fn(() => Promise.resolve(false)),
  getCanaryPercent: jest.fn(() => 33),
}));

// ─── Mock execution queue (test 3: ENABLED=false path) ───────────────────────

const mockEnqueue = jest.fn() as jest.Mock<any>;
const mockGetExecutionQueue = jest.fn() as jest.Mock<any>;

jest.mock('../../services/execution-queue', () => ({
  getExecutionQueue: mockGetExecutionQueue,
}));

// ─── Mock DB client ───────────────────────────────────────────────────────────

const mockDbChain = {
  update: (jest.fn() as any).mockReturnThis(),
  insert: (jest.fn() as any).mockResolvedValue({ data: null, error: null }),
  eq: (jest.fn() as any).mockResolvedValue({ data: null, error: null }),
  select: (jest.fn() as any).mockReturnThis(),
  single: (jest.fn() as any).mockResolvedValue({ data: null, error: null }),
};
const mockDbFrom = jest.fn(() => mockDbChain);
const mockAuth = {
  getUser: jest.fn(() => Promise.resolve({ data: { user: { id: 'user-p5' } }, error: null })),
};

jest.mock('../../core/database/aws-db-client', () => ({
  getDbClient: jest.fn(() => ({ from: mockDbFrom, auth: mockAuth })),
  createDbClient: jest.fn(() => ({ from: mockDbFrom, auth: mockAuth })),
}));

jest.mock('../../services/ai/credential-discovery-phase', () => ({
  credentialDiscoveryPhase: {
    discoverCredentials: jest.fn(() =>
      Promise.resolve({ requiredCredentials: [], missingCredentials: [] }),
    ),
  },
}));

jest.mock('../../services/workflow-lifecycle-manager', () => ({
  workflowLifecycleManager: {
    validateExecutionReady: jest.fn(() => Promise.resolve({ ready: true, errors: [] })),
    discoverNodeInputs: jest.fn(() => Promise.resolve({ inputs: [] })),
  },
}));

jest.mock('../../core/utils/workflow-cloner', () => ({
  cloneWorkflowDefinition: jest.fn((w: any) => w),
}));

jest.mock('../../core/validation/workflow-save-validator', () => ({
  normalizeWorkflowForSave: jest.fn((w: any) => w),
}));

// ─── Import after mocks ───────────────────────────────────────────────────────

import executeWorkflowHandler from '../execute-workflow';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeReq(overrides: Record<string, any> = {}) {
  return {
    body: { workflowId: 'wf-p5', input: {}, useQueue: true, ...overrides },
    headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyLXA1In0.sig' },
    method: 'POST',
    path: '/api/execute-workflow',
  } as any;
}

function makeRes() {
  const res: any = {
    _status: 200,
    _body: null,
    status(code: number) { res._status = code; return res; },
    json(data: any) { res._body = data; return res; },
    send(data: any) { res._body = data; return res; },
  };
  return res;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('POST /api/execute-workflow — Phase 5 routing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEnqueue.mockResolvedValue('queue-job-p5');
    mockGetExecutionQueue.mockResolvedValue({ enqueue: mockEnqueue });
    mockDelegateExecution.mockReset();
  });

  afterEach(() => {
    delete process.env.EXECUTION_ENGINE_ENABLED;
  });

  it('ENABLED=true + engine success → 202 queued (no monolith fallback)', async () => {
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    mockDelegateExecution.mockResolvedValue({
      queued: true,
      executionId: 'exec-p5-ok',
      jobId: 'job-p5-ok',
      statusUrl: '/executions/exec-p5-ok/status',
    });

    const req = makeReq();
    const res = makeRes();
    await executeWorkflowHandler(req, res);

    expect(res._status).toBe(202);
    expect(res._body).toMatchObject({
      status: 'queued',
      jobId: 'job-p5-ok',
      executionId: 'exec-p5-ok',
      message: expect.stringContaining('execution-engine'),
    });
    // Monolith queue must NOT have been touched
    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  it('ENABLED=true + engine returns null → 503 EXECUTION_ENGINE_UNAVAILABLE', async () => {
    process.env.EXECUTION_ENGINE_ENABLED = 'true';
    mockDelegateExecution.mockResolvedValue(null);

    const req = makeReq();
    const res = makeRes();
    await executeWorkflowHandler(req, res);

    expect(res._status).toBe(503);
    expect(res._body).toMatchObject({
      error: 'Service Unavailable',
      code: 'EXECUTION_ENGINE_UNAVAILABLE',
    });
    // Monolith queue must NOT have been touched
    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  it('ENABLED=false → engine block skipped, monolith queue returns 202', async () => {
    delete process.env.EXECUTION_ENGINE_ENABLED; // flag off (default)

    const req = makeReq();
    const res = makeRes();
    await executeWorkflowHandler(req, res);

    expect(res._status).toBe(202);
    // Engine must NOT have been called
    expect(mockDelegateExecution).not.toHaveBeenCalled();
    // Monolith queue was used
    expect(mockEnqueue).toHaveBeenCalledTimes(1);
  });
});
