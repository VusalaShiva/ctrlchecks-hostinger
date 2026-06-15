/**
 * Tests for POST /notifications/in-app, GET /notifications, PATCH /:id/read (Phase 3).
 * DB and Redis are mocked — no real network calls.
 */

const mockInsert = jest.fn();
const mockListByUser = jest.fn();
const mockMarkRead = jest.fn();
jest.mock('../lib/notifications-repo', () => ({
  insert: (...args: unknown[]) => mockInsert(...args),
  listByUser: (...args: unknown[]) => mockListByUser(...args),
  markRead: (...args: unknown[]) => mockMarkRead(...args),
}));

import request from 'supertest';
import app from '../index';

const SERVICE_KEY = 'test-svc-key';
const USER_ID = 'user-phase3';
const NOTIF_ROW = {
  id: 'ntf-001',
  user_id: USER_ID,
  title: 'WF completed',
  message: 'exec-1 done',
  type: 'execution_completed',
  read: false,
  link: '/executions/exec-1',
  created_at: new Date().toISOString(),
};

function withAuth(req: request.Test): request.Test {
  return req.set('x-service-key', SERVICE_KEY).set('x-user-id', USER_ID);
}

describe('POST /notifications/in-app', () => {
  beforeAll(() => {
    process.env.NOTIFICATION_SERVICE_KEY = SERVICE_KEY;
  });
  afterAll(() => {
    delete process.env.NOTIFICATION_SERVICE_KEY;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockInsert.mockResolvedValue(NOTIF_ROW);
  });

  it('inserts a notification and returns 200 with notificationId', async () => {
    const res = await withAuth(
      request(app).post('/notifications/in-app').send({
        title: 'WF completed',
        message: 'exec-1 done',
        type: 'execution_completed',
        link: '/executions/exec-1',
      }),
    );
    expect(res.status).toBe(200);
    expect(res.body.notificationId).toBe('ntf-001');
    expect(res.body.status).toBe('sent');
    expect(res.body.channel).toBe('in_app');
    expect(mockInsert).toHaveBeenCalledWith({
      userId: USER_ID,
      title: 'WF completed',
      message: 'exec-1 done',
      type: 'execution_completed',
      link: '/executions/exec-1',
    });
  });

  it('defaults type to info when not provided', async () => {
    await withAuth(
      request(app).post('/notifications/in-app').send({ title: 'Hi', message: 'hello' }),
    );
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'info' }),
    );
  });

  it('returns 400 when title is missing', async () => {
    const res = await withAuth(
      request(app).post('/notifications/in-app').send({ message: 'hello' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_TITLE');
  });

  it('returns 400 when message is missing', async () => {
    const res = await withAuth(
      request(app).post('/notifications/in-app').send({ title: 'Hi' }),
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_MESSAGE');
  });

  it('returns 401 when x-user-id header is absent', async () => {
    const res = await request(app)
      .post('/notifications/in-app')
      .set('x-service-key', SERVICE_KEY)
      .send({ title: 'Hi', message: 'hello' });
    expect(res.status).toBe(401);
  });

  it('returns 503 when DB throws', async () => {
    mockInsert.mockRejectedValueOnce(new Error('DB unavailable — DATABASE_URL not configured'));
    const res = await withAuth(
      request(app).post('/notifications/in-app').send({ title: 'Hi', message: 'hello' }),
    );
    expect(res.status).toBe(503);
    expect(res.body.code).toBe('DB_UNAVAILABLE');
  });
});

describe('GET /notifications', () => {
  beforeAll(() => {
    process.env.NOTIFICATION_SERVICE_KEY = SERVICE_KEY;
  });
  afterAll(() => {
    delete process.env.NOTIFICATION_SERVICE_KEY;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockListByUser.mockResolvedValue([NOTIF_ROW]);
  });

  it('lists notifications for the user', async () => {
    const res = await withAuth(request(app).get('/notifications'));
    expect(res.status).toBe(200);
    expect(res.body.notifications).toHaveLength(1);
    expect(res.body.notifications[0].id).toBe('ntf-001');
    expect(res.body.count).toBe(1);
    expect(mockListByUser).toHaveBeenCalledWith(USER_ID, false);
  });

  it('passes unread_only=true to repo', async () => {
    const res = await withAuth(request(app).get('/notifications?unread_only=true'));
    expect(res.status).toBe(200);
    expect(mockListByUser).toHaveBeenCalledWith(USER_ID, true);
  });

  it('returns 401 when x-user-id is absent', async () => {
    const res = await request(app)
      .get('/notifications')
      .set('x-service-key', SERVICE_KEY);
    expect(res.status).toBe(401);
  });

  it('returns 503 when DB throws', async () => {
    mockListByUser.mockRejectedValueOnce(new Error('DB unavailable — DATABASE_URL not configured'));
    const res = await withAuth(request(app).get('/notifications'));
    expect(res.status).toBe(503);
  });
});

describe('PATCH /notifications/:id/read', () => {
  beforeAll(() => {
    process.env.NOTIFICATION_SERVICE_KEY = SERVICE_KEY;
  });
  afterAll(() => {
    delete process.env.NOTIFICATION_SERVICE_KEY;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockMarkRead.mockResolvedValue(true);
  });

  it('marks the notification as read and returns 200', async () => {
    const res = await withAuth(request(app).patch('/notifications/ntf-001/read'));
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('ntf-001');
    expect(res.body.read).toBe(true);
    expect(mockMarkRead).toHaveBeenCalledWith('ntf-001', USER_ID);
  });

  it('returns 404 when notification not found', async () => {
    mockMarkRead.mockResolvedValueOnce(false);
    const res = await withAuth(request(app).patch('/notifications/no-such-id/read'));
    expect(res.status).toBe(404);
    expect(res.body.code).toBe('NOTIFICATION_NOT_FOUND');
  });

  it('returns 401 when x-user-id is absent', async () => {
    const res = await request(app)
      .patch('/notifications/ntf-001/read')
      .set('x-service-key', SERVICE_KEY);
    expect(res.status).toBe(401);
  });

  it('returns 503 when DB throws', async () => {
    mockMarkRead.mockRejectedValueOnce(new Error('DB unavailable — DATABASE_URL not configured'));
    const res = await withAuth(request(app).patch('/notifications/ntf-001/read'));
    expect(res.status).toBe(503);
  });
});
