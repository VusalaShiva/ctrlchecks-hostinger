import request from 'supertest';
import app from '../index';

describe('health probes', () => {
  it('GET /health/live returns 200 with live status', async () => {
    const res = await request(app).get('/health/live');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('live');
    expect(res.body.service).toBe('workflow-crud-service');
  });

  it('GET /health/ready returns 200 with ready status', async () => {
    const res = await request(app).get('/health/ready');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ready');
    expect(res.body.service).toBe('workflow-crud-service');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /health returns 200 legacy alias', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /metrics returns Prometheus text', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.text).toContain('process_uptime_seconds');
  });
});
