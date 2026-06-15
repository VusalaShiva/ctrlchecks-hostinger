// ⚡ Load .env before anything else reads process.env
import './env-loader';
import express, { Request, Response, NextFunction } from 'express';
import { requestIdMiddleware } from './middleware/request-id';
import { requireServiceKey } from './middleware/auth';
import { getRedis } from './lib/redis';
import { getDb } from './lib/db';
import executeRouter from './routes/execute';
import { metricsHandler } from './lib/metrics';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3003', 10);

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
      service: 'execution-engine',
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
  res.json({ status: 'live', service: 'execution-engine', port: PORT });
});

// Readiness: DB + Redis checks (Phase 2)
app.get('/health/ready', async (_req: Request, res: Response) => {
  const checks: Record<string, 'ok' | 'fail'> = {};

  try {
    const redis = await getRedis();
    if (redis) { await redis.ping(); checks.redis = 'ok'; }
    else { checks.redis = 'fail'; }
  } catch { checks.redis = 'fail'; }

  try {
    const db = await getDb();
    if (db) { await db.query('SELECT 1'); checks.db = 'ok'; }
    else { checks.db = 'fail'; }
  } catch { checks.db = 'fail'; }

  const allOk = Object.values(checks).every(v => v === 'ok');
  res.status(allOk ? 200 : 503).json({
    status: allOk ? 'ready' : 'degraded',
    service: 'execution-engine',
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Legacy alias — keep for monitoring scripts that hit /health
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'execution-engine', port: PORT });
});

// Prometheus metrics — public, no auth
app.get('/metrics', metricsHandler as unknown as (req: Request, res: Response) => void);

// ── Protected routes — service key required ───────────────────────────────────
app.use(requireServiceKey);

// Execution endpoint (Phase 1 stub — returns 501)
app.use('/execute', executeRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const rid = req.requestId || '-';
  console.error(`[${rid}] [execution-engine] Unhandled error:`, err);
  res.status(500).json({ error: 'Internal server error', ref: rid });
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[execution-engine] Listening on 127.0.0.1:${PORT} (internal only)`);
    if (process.env.EXECUTION_ENGINE_CONSUMER_ENABLED === 'true') {
      import('./runner/engine-consumer').then(({ startEngineConsumer }) => {
        startEngineConsumer();
      }).catch(err => console.error('[execution-engine] Consumer start failed:', err));
    }
  });

  const shutdown = async (): Promise<void> => {
    console.log('[execution-engine] Shutting down...');
    try {
      const { stopEngineConsumer } = await import('./runner/engine-consumer');
      stopEngineConsumer();
    } catch { /* not started */ }
    const { closeRedis } = await import('./lib/redis');
    await closeRedis();
    process.exit(0);
  };
  process.on('SIGTERM', () => { shutdown().catch(() => process.exit(1)); });
  process.on('SIGINT',  () => { shutdown().catch(() => process.exit(1)); });
}

export default app;
