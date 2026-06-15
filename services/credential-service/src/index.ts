// ⚡ Load .env before anything else reads process.env
import './env-loader';
import express, { Request, Response, NextFunction } from 'express';
import { requestIdMiddleware } from './middleware/request-id';
import { requireAuth } from './middleware/auth';
import { getDb } from './lib/db';
import connectionsRouter from './routes/connections';
import oauthRouter from './routes/oauth';
import { logOAuthRedirectUris } from './oauth/credential-type-registry';
import { metricsHandler } from './lib/metrics';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3004', 10);

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
      service: 'credential-service',
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
  res.json({ status: 'live', service: 'credential-service', port: PORT });
});

// Readiness: DB check (Phase 2+)
app.get('/health/ready', async (_req: Request, res: Response) => {
  const checks: Record<string, 'ok' | 'fail' | 'skip'> = {};

  try {
    const db = await getDb();
    if (db) {
      await db.query('SELECT 1');
      checks.db = 'ok';
    } else {
      checks.db = 'skip'; // DATABASE_URL not configured — scaffold mode
    }
  } catch {
    checks.db = 'fail';
  }

  const allOk = Object.values(checks).every(v => v === 'ok' || v === 'skip');
  res.status(allOk ? 200 : 503).json({
    status: allOk ? 'ready' : 'degraded',
    service: 'credential-service',
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Legacy alias — keep for monitoring scripts that hit /health
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'credential-service', port: PORT });
});

// Prometheus metrics — public, no auth
app.get('/metrics', metricsHandler as unknown as (req: Request, res: Response) => void);

// ── OAuth routes — mounted BEFORE requireAuth (callbacks have no JWT) ─────────
// Callback routes: provider redirects browser here without JWT; state lookup validates identity.
// Start routes: require x-user-id (from worker proxy) or Bearer JWT (direct browser call).
app.use('/oauth', oauthRouter);

// ── Protected routes — service key or Cognito JWT required ───────────────────
app.use(requireAuth);

app.use('/connections', connectionsRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const rid = req.requestId || '-';
  console.error(`[${rid}] [credential-service] Unhandled error:`, err);
  res.status(500).json({ error: 'Internal server error', ref: rid });
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[credential-service] Listening on 127.0.0.1:${PORT} (internal only)`);
    logOAuthRedirectUris();
  });

  const shutdown = (): void => {
    console.log('[credential-service] Shutting down...');
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export default app;
