/**
 * workflows.test.ts — 25+ tests for all workflow routes with mocked DB.
 *
 * DB is mocked at the module level so no real Postgres connection is needed.
 * Auth is bypassed by leaving WORKFLOW_CRUD_SERVICE_KEY unset (dev mode).
 */

import request, { Test } from 'supertest';

// ── Mock DB before importing app ──────────────────────────────────────────────

jest.mock('../lib/db', () => ({
  queryDb: jest.fn(),
  checkDb: jest.fn().mockResolvedValue('ok'),
  closeDb: jest.fn(),
  _resetPool: jest.fn(),
  getDb: jest.fn(),
}));

const mockQueryDb = require('../lib/db').queryDb as jest.MockedFunction<
  (sql: string, params?: unknown[]) => Promise<any[]>
>;

// ── Minimal valid workflow fixture ────────────────────────────────────────────

const VALID_NODES = [
  {
    id: 'trigger-1',
    type: 'manual_trigger',
    data: { label: 'Trigger', type: 'manual_trigger', category: 'triggers', config: {} },
  },
  {
    id: 'action-1',
    type: 'http_request',
    data: { label: 'HTTP', type: 'http_request', category: 'actions', config: {} },
  },
];

const VALID_EDGES = [
  { id: 'e1', source: 'trigger-1', target: 'action-1' },
];

const SAVED_WF_ROW = {
  id: 'wf-abc',
  user_id: 'user-1',
  name: 'Test WF',
  nodes: VALID_NODES,
  edges: VALID_EDGES,
  settings: {},
  graph: {},
  metadata: {},
  status: null,
  phase: null,
  schema_version: 2,
  setup_completed: true,
  setup_stage: 'complete',
  setup_completed_at: new Date().toISOString(),
  quota_source: 'subscription',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// ── App ───────────────────────────────────────────────────────────────────────

let app: import('express').Express;

beforeAll(() => {
  delete process.env.WORKFLOW_CRUD_SERVICE_KEY; // dev mode — auth passes
  app = require('../index').default;
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ── Helper — set x-user-id header ────────────────────────────────────────────

function withUser(req: Test, userId = 'user-1'): Test {
  return req.set('x-user-id', userId) as unknown as Test;
}

// ── POST /workflows ───────────────────────────────────────────────────────────

describe('POST /workflows', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app)
      .post('/workflows')
      .send({ name: 'test', nodes: VALID_NODES, edges: VALID_EDGES });
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTH_REQUIRED');
  });

  it('returns 400 when name is missing', async () => {
    const res = await withUser(request(app).post('/workflows')).send({
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/name/i);
  });

  it('returns 400 when nodes is not an array', async () => {
    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Test',
      nodes: 'not-an-array',
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/nodes/i);
  });

  it('returns 400 when edges is not an array', async () => {
    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Test',
      nodes: VALID_NODES,
      edges: 'not-an-array',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/edges/i);
  });

  it('returns 400 when workflow has no trigger node', async () => {
    const nodesNoTrigger = [
      { id: 'a1', type: 'http', data: { label: 'A', type: 'http_request', category: 'actions', config: {} } },
    ];
    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Test',
      nodes: nodesNoTrigger,
      edges: [],
    });
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_INPUT');
    expect(res.body.details.errors).toEqual(expect.arrayContaining([expect.stringMatching(/trigger/i)]));
  });

  it('returns 400 when workflow has a directed cycle', async () => {
    const cycleNodes = [
      { id: 't1', type: 'manual_trigger', data: { label: 'T', type: 'manual_trigger', category: 'triggers', config: {} } },
      { id: 'a1', type: 'http', data: { label: 'A', type: 'http_request', category: 'actions', config: {} } },
      { id: 'b1', type: 'http', data: { label: 'B', type: 'http_request', category: 'actions', config: {} } },
    ];
    const cycleEdges = [
      { id: 'e1', source: 't1', target: 'a1' },
      { id: 'e2', source: 'a1', target: 'b1' },
      { id: 'e3', source: 'b1', target: 'a1' }, // cycle
    ];
    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Cycle WF',
      nodes: cycleNodes,
      edges: cycleEdges,
    });
    expect(res.status).toBe(400);
    expect(res.body.details.errors).toEqual(expect.arrayContaining([expect.stringMatching(/cycle/i)]));
  });

  it('returns 403 when user quota is exceeded (CREATE)', async () => {
    // count query → 10 workflows (at limit), limit → 10
    mockQueryDb
      .mockResolvedValueOnce([{ count: '10' }])  // countWorkflowsByUser
      .mockResolvedValueOnce([{ workflow_limit: 10 }]); // getWorkflowLimit

    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Over Limit',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(403);
    expect(res.body.code).toBe('WORKFLOW_LIMIT_EXCEEDED');
  });

  it('creates a new workflow successfully (INSERT path)', async () => {
    mockQueryDb
      .mockResolvedValueOnce([{ count: '2' }])   // countWorkflowsByUser
      .mockResolvedValueOnce([{ workflow_limit: 10 }]) // getWorkflowLimit
      .mockResolvedValueOnce([SAVED_WF_ROW])     // insertWorkflow RETURNING *
      .mockResolvedValueOnce([{ max: null }])    // version snapshot max version
      .mockResolvedValueOnce([]);               // version snapshot insert

    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Test WF',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.workflowId).toBe('wf-abc');
    expect(res.body.validation).toMatchObject({ valid: true });
  });

  it('updates an existing workflow (UPDATE path)', async () => {
    mockQueryDb
      .mockResolvedValueOnce([{ id: 'wf-abc', user_id: 'user-1' }]) // owner check
      .mockResolvedValueOnce([SAVED_WF_ROW])                         // getWorkflowById (prev)
      .mockResolvedValueOnce([SAVED_WF_ROW])                         // updateWorkflow RETURNING *
      .mockResolvedValueOnce([{ max: '1' }])                         // version max
      .mockResolvedValueOnce([]);                                    // version insert

    const res = await withUser(request(app).post('/workflows')).send({
      workflowId: 'wf-abc',
      name: 'Updated WF',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.workflowId).toBe('wf-abc');
  });

  it('returns 404 when updating non-existent workflow', async () => {
    mockQueryDb.mockResolvedValueOnce([]); // owner check → not found
    const res = await withUser(request(app).post('/workflows')).send({
      workflowId: 'wf-missing',
      name: 'Ghost WF',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(404);
  });

  it('returns 403 when updating another user\'s workflow', async () => {
    mockQueryDb.mockResolvedValueOnce([{ id: 'wf-abc', user_id: 'user-OTHER' }]); // different owner
    const res = await withUser(request(app).post('/workflows'), 'user-1').send({
      workflowId: 'wf-abc',
      name: 'Steal WF',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(403);
  });

  it('returns 503 on unexpected DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('Connection lost'));
    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Error WF',
      nodes: VALID_NODES,
      edges: VALID_EDGES,
    });
    expect(res.status).toBe(503);
  });

  it('deduplicates duplicate node IDs before saving', async () => {
    const dupNodes = [...VALID_NODES, { ...VALID_NODES[0] }]; // duplicate trigger
    mockQueryDb
      .mockResolvedValueOnce([{ count: '0' }])
      .mockResolvedValueOnce([{ workflow_limit: 10 }])
      .mockResolvedValueOnce([SAVED_WF_ROW])
      .mockResolvedValueOnce([{ max: null }])
      .mockResolvedValueOnce([]);

    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Dup Nodes WF',
      nodes: dupNodes,
      edges: VALID_EDGES,
    });
    // After dedup: still valid (1 trigger), should succeed
    expect(res.status).toBe(200);
    expect(res.body.validation.migrationsApplied).toEqual(
      expect.arrayContaining([expect.stringMatching(/duplicate/i)])
    );
  });

  it('removes dangling edges before saving', async () => {
    const danglingEdges = [
      ...VALID_EDGES,
      { id: 'e-dangling', source: 'trigger-1', target: 'ghost-node' },
    ];
    mockQueryDb
      .mockResolvedValueOnce([{ count: '0' }])
      .mockResolvedValueOnce([{ workflow_limit: 10 }])
      .mockResolvedValueOnce([SAVED_WF_ROW])
      .mockResolvedValueOnce([{ max: null }])
      .mockResolvedValueOnce([]);

    const res = await withUser(request(app).post('/workflows')).send({
      name: 'Dangling WF',
      nodes: VALID_NODES,
      edges: danglingEdges,
    });
    expect(res.status).toBe(200);
    expect(res.body.validation.migrationsApplied).toEqual(
      expect.arrayContaining([expect.stringMatching(/invalid edge/i)])
    );
  });
});

// ── GET /workflows ────────────────────────────────────────────────────────────

describe('GET /workflows', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app).get('/workflows');
    expect(res.status).toBe(401);
  });

  it('returns empty list when user has no workflows', async () => {
    mockQueryDb.mockResolvedValueOnce([]);
    const res = await withUser(request(app).get('/workflows'));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ workflows: [], total: 0 });
  });

  it('returns list of workflows for authenticated user', async () => {
    mockQueryDb.mockResolvedValueOnce([SAVED_WF_ROW, { ...SAVED_WF_ROW, id: 'wf-2' }]);
    const res = await withUser(request(app).get('/workflows'));
    expect(res.status).toBe(200);
    expect(res.body.workflows).toHaveLength(2);
    expect(res.body.total).toBe(2);
  });

  it('returns 503 on DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('DB down'));
    const res = await withUser(request(app).get('/workflows'));
    expect(res.status).toBe(503);
  });
});

// ── GET /workflows/:id ────────────────────────────────────────────────────────

describe('GET /workflows/:id', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app).get('/workflows/wf-abc');
    expect(res.status).toBe(401);
  });

  it('returns 404 when workflow does not exist', async () => {
    mockQueryDb.mockResolvedValueOnce([]);
    const res = await withUser(request(app).get('/workflows/wf-missing'));
    expect(res.status).toBe(404);
  });

  it('returns 404 when workflow belongs to another user (user-scoped query)', async () => {
    // DB returns empty because user_id filter excludes it
    mockQueryDb.mockResolvedValueOnce([]);
    const res = await withUser(request(app).get('/workflows/wf-abc'), 'user-other');
    expect(res.status).toBe(404);
  });

  it('returns workflow when found', async () => {
    mockQueryDb.mockResolvedValueOnce([SAVED_WF_ROW]);
    const res = await withUser(request(app).get('/workflows/wf-abc'));
    expect(res.status).toBe(200);
    expect(res.body.workflow.id).toBe('wf-abc');
  });

  it('returns 503 on DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('DB down'));
    const res = await withUser(request(app).get('/workflows/wf-abc'));
    expect(res.status).toBe(503);
  });
});

// ── DELETE /workflows/:id ─────────────────────────────────────────────────────

describe('DELETE /workflows/:id', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app).delete('/workflows/wf-abc');
    expect(res.status).toBe(401);
  });

  it('returns 404 when workflow does not exist or belongs to another user', async () => {
    mockQueryDb.mockResolvedValueOnce([]); // DELETE RETURNING → 0 rows
    const res = await withUser(request(app).delete('/workflows/wf-missing'));
    expect(res.status).toBe(404);
  });

  it('deletes workflow successfully', async () => {
    mockQueryDb.mockResolvedValueOnce([{ id: 'wf-abc' }]); // DELETE RETURNING id
    const res = await withUser(request(app).delete('/workflows/wf-abc'));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true, id: 'wf-abc' });
  });

  it('passes userId to DB query (user-scoped delete)', async () => {
    mockQueryDb.mockResolvedValueOnce([{ id: 'wf-abc' }]);
    await withUser(request(app).delete('/workflows/wf-abc'), 'user-xyz');
    const [sql, params] = mockQueryDb.mock.calls[0];
    expect(sql).toMatch(/user_id/i);
    expect(params).toContain('user-xyz');
  });

  it('returns 503 on DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('DB down'));
    const res = await withUser(request(app).delete('/workflows/wf-abc'));
    expect(res.status).toBe(503);
  });
});

// ── Health endpoints (no auth) ────────────────────────────────────────────────

describe('health endpoints', () => {
  it('GET /health/live is always 200', async () => {
    const res = await request(app).get('/health/live');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('live');
  });

  it('GET /health/ready returns db check', async () => {
    const res = await request(app).get('/health/ready');
    expect(res.status).toBe(200);
    expect(res.body.checks).toHaveProperty('db');
  });
});
