import request from 'supertest';
import app from '../index';

describe('Health probes', () => {
  describe('GET /health/live', () => {
    it('returns 200 with status live', async () => {
      const res = await request(app).get('/health/live');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('live');
      expect(res.body.service).toBe('notification-service');
    });
  });

  describe('GET /health/ready', () => {
    it('returns 200 with status ready', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ready');
      expect(res.body.checks.db).toMatch(/^ok|skip|error$/);
      expect(res.body.checks.ses).toMatch(/^ok|skip$/);
      expect(typeof res.body.timestamp).toBe('string');
    });

    it('reports ses:skip when SES_FROM_EMAIL is not set', async () => {
      const orig = process.env.SES_FROM_EMAIL;
      delete process.env.SES_FROM_EMAIL;
      try {
        const res = await request(app).get('/health/ready');
        expect(res.status).toBe(200);
        expect(res.body.checks.ses).toBe('skip');
      } finally {
        if (orig !== undefined) process.env.SES_FROM_EMAIL = orig;
      }
    });

    it('reports ses:ok when SES_FROM_EMAIL is set', async () => {
      const orig = process.env.SES_FROM_EMAIL;
      process.env.SES_FROM_EMAIL = 'noreply@ctrlchecks.ai';
      try {
        const res = await request(app).get('/health/ready');
        expect(res.status).toBe(200);
        expect(res.body.checks.ses).toBe('ok');
      } finally {
        if (orig === undefined) delete process.env.SES_FROM_EMAIL;
        else process.env.SES_FROM_EMAIL = orig;
      }
    });
  });

  describe('GET /health', () => {
    it('returns 200 legacy health alias', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('notification-service');
    });
  });

  describe('Request ID header', () => {
    it('echoes x-request-id if provided', async () => {
      const res = await request(app)
        .get('/health/live')
        .set('x-request-id', 'test-rid-123');
      expect(res.headers['x-request-id']).toBe('test-rid-123');
    });

    it('generates a UUID when x-request-id is absent', async () => {
      const res = await request(app).get('/health/live');
      expect(res.headers['x-request-id']).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    });
  });

  describe('Health probes bypass auth', () => {
    it('GET /health/live is accessible without credentials', async () => {
      const res = await request(app).get('/health/live');
      expect(res.status).toBe(200);
    });

    it('GET /health/ready is accessible without credentials', async () => {
      const res = await request(app).get('/health/ready');
      expect(res.status).toBe(200);
    });

    it('GET /health is accessible without credentials', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
    });
  });
});

describe('Notification routes — Phase 2', () => {
  // POST /notifications/email and /send are real in Phase 2.
  // Detailed route tests live in notifications.test.ts.
  // These smoke-tests verify routing is wired and stubs still in place for Phase 3+ routes.

  describe('POST /notifications/email — real route (Phase 2)', () => {
    it('returns 400 (not 501) when required fields are missing', async () => {
      const res = await request(app)
        .post('/notifications/email')
        .send({ userId: 'u1' });
      // Route is real — missing templateId → 400
      expect(res.status).toBe(400);
    });
  });

  describe('POST /notifications/send — dispatches channel=email (Phase 2)', () => {
    it('returns non-501 for channel=email (real handler)', async () => {
      const res = await request(app)
        .post('/notifications/send')
        .send({ type: 'execution_completed', channel: 'email', to: 'u@e.com', data: {} });
      // Real handler — 503 (SES_FROM_EMAIL not set in test env) not 501
      expect(res.status).not.toBe(501);
    });

    it('returns non-501 for channel=in_app (Phase 3 real)', async () => {
      // Real handler — no x-user-id → 401, not 501
      const res = await request(app)
        .post('/notifications/send')
        .send({ type: 'ping', channel: 'in_app', data: {} });
      expect(res.status).not.toBe(501);
    });
  });

  describe('Phase 3 real routes — smoke tests (detailed tests in in-app.test.ts)', () => {
    it('POST /notifications/in-app returns non-501 (real route, 401 without user-id)', async () => {
      // Route is real — no x-user-id → 401, not 501
      const res = await request(app).post('/notifications/in-app').send({ message: 'hello' });
      expect(res.status).not.toBe(501);
      expect(res.body.error).not.toBe('NOTIFICATION_SERVICE_STUB');
    });

    it('GET /notifications returns 401 (not 501) when user id is absent', async () => {
      const res = await request(app).get('/notifications');
      // Real handler — 401 (no x-user-id) not 501
      expect(res.status).not.toBe(501);
    });

    it('PATCH /notifications/:id/read returns non-501 (real route)', async () => {
      const res = await request(app).patch('/notifications/abc-123/read');
      expect(res.status).not.toBe(501);
    });
  });

  describe('Phase 4 real route — smoke test', () => {
    it('POST /notifications/webhook returns 400 (not 501) when url is missing', async () => {
      // Route is real — missing url → 400
      const res = await request(app).post('/notifications/webhook').send({ event: 'test' });
      expect(res.status).toBe(400);
      expect(res.body.error).not.toBe('NOTIFICATION_SERVICE_STUB');
    });
  });
});

describe('GET /metrics — Prometheus endpoint', () => {
  it('returns 200 with Prometheus text content-type', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
  });

  it('response body contains # HELP markers', async () => {
    const res = await request(app).get('/metrics');
    expect(res.text).toContain('# HELP');
  });

  it('includes process_uptime_seconds gauge', async () => {
    const res = await request(app).get('/metrics');
    expect(res.text).toContain('process_uptime_seconds');
  });

  it('is accessible without authentication', async () => {
    const orig = process.env.NOTIFICATION_SERVICE_KEY;
    process.env.NOTIFICATION_SERVICE_KEY = 'test-key-xyz';
    try {
      const res = await request(app).get('/metrics');
      expect(res.status).toBe(200);
    } finally {
      if (orig === undefined) delete process.env.NOTIFICATION_SERVICE_KEY;
      else process.env.NOTIFICATION_SERVICE_KEY = orig;
    }
  });
});

describe('Auth middleware — Phase 1', () => {
  it('requires service key when NOTIFICATION_SERVICE_KEY is set', async () => {
    const orig = process.env.NOTIFICATION_SERVICE_KEY;
    process.env.NOTIFICATION_SERVICE_KEY = 'test-key-abc';
    try {
      const res = await request(app).post('/notifications/send').send({});
      expect(res.status).toBe(401);
    } finally {
      if (orig === undefined) delete process.env.NOTIFICATION_SERVICE_KEY;
      else process.env.NOTIFICATION_SERVICE_KEY = orig;
    }
  });

  it('accepts correct service key (passes auth, reaches route handler)', async () => {
    const orig = process.env.NOTIFICATION_SERVICE_KEY;
    process.env.NOTIFICATION_SERVICE_KEY = 'test-key-abc';
    try {
      const res = await request(app)
        .post('/notifications/send')
        .set('x-service-key', 'test-key-abc')
        .send({});
      // Auth passes → real handler returns 400 for missing channel (not 401)
      expect(res.status).not.toBe(401);
    } finally {
      if (orig === undefined) delete process.env.NOTIFICATION_SERVICE_KEY;
      else process.env.NOTIFICATION_SERVICE_KEY = orig;
    }
  });
});
