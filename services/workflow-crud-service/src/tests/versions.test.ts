/**
 * versions.test.ts — 17 tests for GET /workflows/:id/versions and
 * POST /workflows/:id/versions/:version/rollback.
 *
 * DB is mocked at the module level — no real Postgres connection needed.
 * Auth is in dev-mode (WORKFLOW_CRUD_SERVICE_KEY unset → x-user-id accepted).
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

// ── Fixtures ──────────────────────────────────────────────────────────────────

const WORKFLOW_ID = 'wf-v3-test';
const USER_ID = 'user-phase3';
const OTHER_USER_ID = 'user-other';

const OWNER_ROW = { id: WORKFLOW_ID, user_id: USER_ID };
const OTHER_OWNER_ROW = { id: WORKFLOW_ID, user_id: OTHER_USER_ID };

const VERSION_ROW_1 = {
  workflow_id: WORKFLOW_ID,
  version: 1,
  created_at: '2026-01-01T00:00:00.000Z',
  created_by: USER_ID,
  nodes_snapshot: [{ id: 't1', type: 'manual_trigger' }],
  edges_snapshot: [],
  inputs_snapshot: { workflowSettings: {}, uiLayout: {} },
  definition_snapshot: { nodes: [], edges: [] },
  metadata: { description: 'Initial save' },
};

const VERSION_ROW_2 = {
  ...VERSION_ROW_1,
  version: 2,
  created_at: '2026-01-02T00:00:00.000Z',
  metadata: { description: 'Second save' },
};

// ── App ───────────────────────────────────────────────────────────────────────

let app: import('express').Express;

beforeAll(() => {
  delete process.env.WORKFLOW_CRUD_SERVICE_KEY;
  app = require('../index').default;
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ── Helper ────────────────────────────────────────────────────────────────────

function withUser(req: Test, userId = USER_ID): Test {
  return req.set('x-user-id', userId) as unknown as Test;
}

// ── GET /workflows/:id/versions ───────────────────────────────────────────────

describe('GET /workflows/:id/versions', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app).get(`/workflows/${WORKFLOW_ID}/versions`);
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTH_REQUIRED');
  });

  it('returns 404 when workflow does not exist', async () => {
    mockQueryDb.mockResolvedValueOnce([]); // getWorkflowByIdForOwnerCheck → not found
    const res = await withUser(request(app).get(`/workflows/wf-missing/versions`));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('returns 403 when workflow belongs to another user', async () => {
    mockQueryDb.mockResolvedValueOnce([OTHER_OWNER_ROW]); // owner check → different user
    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions`));
    expect(res.status).toBe(403);
  });

  it('returns empty versions array when no versions exist', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])  // owner check
      .mockResolvedValueOnce([]);           // listVersions query → empty
    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions`));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ workflowId: WORKFLOW_ID, versions: [], count: 0 });
  });

  it('returns version list with correct shape', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockResolvedValueOnce([VERSION_ROW_2, VERSION_ROW_1]);

    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions`));
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.versions[0]).toMatchObject({
      version: 2,
      savedAt: VERSION_ROW_2.created_at,
      createdBy: USER_ID,
      label: 'Second save',
    });
    expect(res.body.versions[1]).toMatchObject({ version: 1, label: 'Initial save' });
  });

  it('version item without metadata description has no label field', async () => {
    const noDescRow = { ...VERSION_ROW_1, metadata: {} };
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockResolvedValueOnce([noDescRow]);

    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions`));
    expect(res.status).toBe(200);
    expect(res.body.versions[0].label).toBeUndefined();
  });

  it('passes limit query param to DB (capped to 200)', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockResolvedValueOnce([VERSION_ROW_1]);

    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions?limit=5`));
    expect(res.status).toBe(200);
    // second call should include limit=5 in params
    const [sql, params] = mockQueryDb.mock.calls[1];
    expect(sql).toMatch(/LIMIT/i);
    expect(params).toContain(5);
  });

  it('returns 400 when limit param is not a valid integer', async () => {
    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions?limit=banana`));
    expect(res.status).toBe(400);
  });

  it('returns 503 on unexpected DB error', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockRejectedValueOnce(new Error('DB connection lost'));

    const res = await withUser(request(app).get(`/workflows/${WORKFLOW_ID}/versions`));
    expect(res.status).toBe(503);
  });
});

// ── POST /workflows/:id/versions/:version/rollback ────────────────────────────

describe('POST /workflows/:id/versions/:version/rollback', () => {
  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`);
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('AUTH_REQUIRED');
  });

  it('returns 404 when workflow does not exist', async () => {
    mockQueryDb.mockResolvedValueOnce([]); // owner check → not found
    const res = await withUser(request(app).post(`/workflows/wf-missing/versions/1/rollback`));
    expect(res.status).toBe(404);
  });

  it('returns 403 when workflow belongs to another user', async () => {
    mockQueryDb.mockResolvedValueOnce([OTHER_OWNER_ROW]);
    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`));
    expect(res.status).toBe(403);
  });

  it('returns 404 when target version does not exist', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])  // owner check
      .mockResolvedValueOnce([]);           // version fetch → not found
    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/99/rollback`));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/version.*not found/i);
  });

  it('returns 400 when version param is not a valid integer', async () => {
    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/abc/rollback`));
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid version/i);
  });

  it('returns 400 for version number 0', async () => {
    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/0/rollback`));
    expect(res.status).toBe(400);
  });

  it('returns rollback result with id, version, rolledBackFrom', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])             // owner check
      .mockResolvedValueOnce([VERSION_ROW_1])         // target version fetch
      .mockResolvedValueOnce([{ max: '2' }])          // MAX(version)
      .mockResolvedValueOnce([])                      // UPDATE workflows
      .mockResolvedValueOnce([]);                     // INSERT new version row

    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: WORKFLOW_ID,
      version: 3,         // rolledBackFrom(2) + 1
      rolledBackFrom: 2,
    });
  });

  it('creates new version row after rollback (correct INSERT call)', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockResolvedValueOnce([VERSION_ROW_1])
      .mockResolvedValueOnce([{ max: '1' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`));

    // 5th call is the INSERT into workflow_versions
    const insertCall = mockQueryDb.mock.calls[4];
    expect(insertCall[0]).toMatch(/INSERT INTO workflow_versions/i);
    const params = insertCall[1] as unknown[];
    // params[1] = nextVersion = 2, params[3] = userId
    expect(params[1]).toBe(2);
    expect(params[3]).toBe(USER_ID);
    // params[8] = metadata JSON should contain rollback description
    expect(JSON.parse(params[8] as string).description).toMatch(/rollback/i);
  });

  it('restores nodes and edges from nodes_snapshot/edges_snapshot', async () => {
    const snapshotRow = {
      ...VERSION_ROW_1,
      nodes_snapshot: [{ id: 'n1', type: 'manual_trigger' }],
      edges_snapshot: [{ id: 'e1', source: 'n1', target: 'n2' }],
    };
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockResolvedValueOnce([snapshotRow])
      .mockResolvedValueOnce([{ max: '1' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`));

    // 4th call is UPDATE workflows — check nodes/edges params
    const updateCall = mockQueryDb.mock.calls[3];
    expect(updateCall[0]).toMatch(/UPDATE workflows/i);
    const params = updateCall[1] as unknown[];
    expect(JSON.parse(params[0] as string)).toEqual(snapshotRow.nodes_snapshot);
    expect(JSON.parse(params[1] as string)).toEqual(snapshotRow.edges_snapshot);
  });

  it('returns 503 on unexpected DB error during rollback', async () => {
    mockQueryDb
      .mockResolvedValueOnce([OWNER_ROW])
      .mockRejectedValueOnce(new Error('transaction aborted'));

    const res = await withUser(request(app).post(`/workflows/${WORKFLOW_ID}/versions/1/rollback`));
    expect(res.status).toBe(503);
  });
});
