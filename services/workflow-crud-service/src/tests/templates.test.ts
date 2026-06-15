/**
 * templates.test.ts — 14 tests for GET /templates and GET /templates/:id.
 *
 * DB is mocked — no real Postgres connection needed.
 * Auth is bypassed (WORKFLOW_CRUD_SERVICE_KEY unset → dev mode).
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

const T1 = {
  id: 'tpl-1',
  name: 'Send Email Campaign',
  description: 'Automate email campaigns with Gmail',
  category: 'marketing',
  nodes: [],
  edges: [],
  difficulty: 'Beginner',
  estimated_setup_time: 5,
  tags: ['email', 'gmail'],
  is_featured: true,
  is_active: true,
  preview_image: null,
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: null,
};

const T2 = {
  ...T1,
  id: 'tpl-2',
  name: 'Slack Notification Workflow',
  description: 'Post updates to Slack channels',
  category: 'communication',
  is_featured: false,
};

const T3 = {
  ...T1,
  id: 'tpl-3',
  name: 'Data Export',
  description: 'Export data to spreadsheet',
  category: 'marketing',
  is_featured: false,
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

function withKey(req: Test): Test {
  return req.set('x-service-key', 'any') as unknown as Test;
}

// ── GET /templates ────────────────────────────────────────────────────────────

describe('GET /templates', () => {
  it('returns empty list when no templates exist', async () => {
    mockQueryDb.mockResolvedValueOnce([]);
    const res = await withKey(request(app).get('/templates'));
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ templates: [] });
  });

  it('returns list of active templates', async () => {
    mockQueryDb.mockResolvedValueOnce([T1, T2]);
    const res = await withKey(request(app).get('/templates'));
    expect(res.status).toBe(200);
    expect(res.body.templates).toHaveLength(2);
    expect(res.body.templates[0].id).toBe('tpl-1');
  });

  it('filters by category in SQL query', async () => {
    mockQueryDb.mockResolvedValueOnce([T1, T3]);
    const res = await withKey(request(app).get('/templates?category=marketing'));
    expect(res.status).toBe(200);
    const [sql, params] = mockQueryDb.mock.calls[0];
    expect(sql).toMatch(/category/i);
    expect(params).toContain('marketing');
  });

  it('filters by search term in-process (name match)', async () => {
    mockQueryDb.mockResolvedValueOnce([T1, T2]);
    const res = await withKey(request(app).get('/templates?search=email'));
    expect(res.status).toBe(200);
    // T1 matches ("email campaign"), T2 does not
    expect(res.body.templates).toHaveLength(1);
    expect(res.body.templates[0].id).toBe('tpl-1');
  });

  it('filters by search term in-process (description match)', async () => {
    mockQueryDb.mockResolvedValueOnce([T1, T2]);
    const res = await withKey(request(app).get('/templates?search=gmail'));
    expect(res.status).toBe(200);
    expect(res.body.templates[0].id).toBe('tpl-1');
  });

  it('search is case-insensitive', async () => {
    mockQueryDb.mockResolvedValueOnce([T1]);
    const res = await withKey(request(app).get('/templates?search=EMAIL'));
    expect(res.status).toBe(200);
    expect(res.body.templates).toHaveLength(1);
  });

  it('returns 503 on DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('DB timeout'));
    const res = await withKey(request(app).get('/templates'));
    expect(res.status).toBe(503);
  });

  it('returns 401 without credentials in key-enforced mode', async () => {
    process.env.WORKFLOW_CRUD_SERVICE_KEY = 'secret-key';
    const res = await request(app).get('/templates');
    expect(res.status).toBe(401);
    delete process.env.WORKFLOW_CRUD_SERVICE_KEY;
  });
});

// ── GET /templates/:id ────────────────────────────────────────────────────────

describe('GET /templates/:id', () => {
  it('returns 404 when template does not exist', async () => {
    mockQueryDb.mockResolvedValueOnce([]);
    const res = await withKey(request(app).get('/templates/tpl-missing'));
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('returns template when found', async () => {
    mockQueryDb.mockResolvedValueOnce([T1]);
    const res = await withKey(request(app).get('/templates/tpl-1'));
    expect(res.status).toBe(200);
    expect(res.body.template).toMatchObject({ id: 'tpl-1', name: 'Send Email Campaign' });
  });

  it('queries with is_active = true', async () => {
    mockQueryDb.mockResolvedValueOnce([T1]);
    await withKey(request(app).get('/templates/tpl-1'));
    const [sql] = mockQueryDb.mock.calls[0];
    expect(sql).toMatch(/is_active.*true/i);
  });

  it('returns 503 on DB error', async () => {
    mockQueryDb.mockRejectedValueOnce(new Error('connection refused'));
    const res = await withKey(request(app).get('/templates/tpl-1'));
    expect(res.status).toBe(503);
  });

  it('passes id as query parameter (SQL injection safe)', async () => {
    mockQueryDb.mockResolvedValueOnce([]);
    await withKey(request(app).get('/templates/tpl-1'));
    const [, params] = mockQueryDb.mock.calls[0];
    expect(params).toContain('tpl-1');
  });
});
