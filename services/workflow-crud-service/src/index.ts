// ⚡ Load .env before anything else reads process.env
import './env-loader';
import express, { Request, Response, NextFunction } from 'express';
import { requestIdMiddleware } from './middleware/request-id';
import { requireAuth } from './middleware/auth';
import workflowsRouter from './routes/workflows';
import templatesRouter from './routes/templates';
import { metricsHandler } from './lib/metrics';
import { checkDb, closeDb } from './lib/db';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3007', 10);

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
      service: 'workflow-crud-service',
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

app.get('/health/live', (_req: Request, res: Response) => {
  res.json({ status: 'live', service: 'workflow-crud-service', port: PORT });
});

app.get('/health/ready', async (_req: Request, res: Response) => {
  const db = await checkDb();
  const checks: Record<string, 'ok' | 'skip' | 'error'> = { db };
  res.json({
    status: 'ready',
    service: 'workflow-crud-service',
    checks,
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'workflow-crud-service', port: PORT });
});

// Prometheus metrics — public, no auth
app.get('/metrics', metricsHandler as unknown as (req: Request, res: Response) => void);

// ── Protected routes — service key or Cognito JWT required ───────────────────
app.use(requireAuth);

app.use('/workflows', workflowsRouter);
app.use('/templates', templatesRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const rid = req.requestId || '-';
  console.error(`[${rid}] [workflow-crud-service] Unhandled error:`, err);
  res.status(500).json({ error: 'Internal server error', ref: rid });
});

if (require.main === module) {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[workflow-crud-service] Listening on 127.0.0.1:${PORT} (internal only)`);
    console.log('[workflow-crud-service] Phase 1 — all workflow routes stub 501 (WORKFLOW_CRUD_SERVICE_STUB)');
    console.log('[workflow-crud-service] Public URLs remain on worker — do NOT change them');
  });

  const shutdown = (): void => {
    console.log('[workflow-crud-service] Shutting down...');
    closeDb().finally(() => process.exit(0));
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export default app;
