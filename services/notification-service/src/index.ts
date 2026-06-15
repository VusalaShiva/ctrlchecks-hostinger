// ⚡ Load .env before anything else reads process.env
import './env-loader';
import express, { Request, Response, NextFunction } from 'express';
import { requestIdMiddleware } from './middleware/request-id';
import { requireAuth } from './middleware/auth';
import { getFromEmail } from './lib/ses';
import { checkDb } from './lib/db';
import notificationsRouter from './routes/notifications';
import { metricsHandler } from './lib/metrics';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3005', 10);

// Request ID first — every handler below has req.requestId
app.use(requestIdMiddleware);

// Structured JSON request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    const entry = JSON.stringify({
      level,
      service: 'notification-service',
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs,
      requestId: req.requestId,
    });
    if (res.statusCode >= 500) console.error(entry);
    else if (res.statusCode >= 400) console.warn(entry);
    else console.log(entry);
  });
  next();
});

app.use(express.json({ limit: '10mb' }));

// ── Public probes — no auth required ─────────────────────────────────────────

// Liveness: process is alive
app.get('/health/live', (_req: Request, res: Response) => {
  res.json({ status: 'live', service: 'notification-service', port: PORT });
});

// Readiness: checks SES_FROM_EMAIL and DB connectivity (Phase 3+)
app.get('/health/ready', async (_req: Request, res: Response) => {
  const [dbStatus] = await Promise.all([checkDb()]);
  const checks: Record<string, 'ok' | 'skip' | 'error'> = {
    db: dbStatus,
    ses: getFromEmail() ? 'ok' : 'skip',
  };
  res.json({
    status: 'ready',
    service: 'notification-service',
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Legacy alias — keep for monitoring scripts that hit /health
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'notification-service', port: PORT });
});

// Prometheus metrics — public, no auth
app.get('/metrics', metricsHandler as unknown as (req: Request, res: Response) => void);

// ── Protected routes — service key or Cognito JWT required ───────────────────
app.use(requireAuth);

app.use('/notifications', notificationsRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const rid = req.requestId || '-';
  console.error(`[${rid}] [notification-service] Unhandled error:`, err);
  res.status(500).json({ error: 'Internal server error', ref: rid });
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[notification-service] Listening on 127.0.0.1:${PORT} (internal only)`);
    console.log('[notification-service] Phase 3 — email + in-app notifications active');
    console.log(`[notification-service] SES_FROM_EMAIL: ${getFromEmail() ? 'configured' : 'NOT SET (email sends disabled)'}`);
    console.log(`[notification-service] EXECUTION_EMAIL_NOTIFICATIONS: ${process.env.EXECUTION_EMAIL_NOTIFICATIONS ?? 'false'}`);
    console.log(`[notification-service] DATABASE_URL: ${process.env.DATABASE_URL ? 'configured' : 'NOT SET (in-app disabled)'}`);
    console.log(`[notification-service] REDIS_URL: ${process.env.REDIS_URL ? 'configured' : 'NOT SET (Redis pub disabled)'}`);
  });

  const shutdown = (): void => {
    console.log('[notification-service] Shutting down...');
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export default app;
