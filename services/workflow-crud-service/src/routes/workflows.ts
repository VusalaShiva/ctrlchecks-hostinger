import { Router, Request, Response } from 'express';
import { saveWorkflow } from '../lib/save-workflow';
import { getWorkflowById, listWorkflowsByUser, deleteWorkflowById } from '../lib/workflow-repo';
import { extractUserId } from '../middleware/auth';
import {
  listVersions,
  getVersion,
  rollbackToVersion,
  NotFoundError,
  ForbiddenError,
} from '../lib/version-repo';

const router = Router();

// ── POST /workflows ───────────────────────────────────────────────────────────
// Save (create or update) a workflow.

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  const { workflowId, name, nodes, edges, settings, metadata } = req.body as {
    workflowId?: string;
    name?: string;
    nodes?: unknown[];
    edges?: unknown[];
    settings?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };

  try {
    const result = await saveWorkflow({
      workflowId,
      name: name ?? '',
      nodes: nodes ?? [],
      edges: edges ?? [],
      settings,
      metadata,
      userId,
    });

    if (!result.ok) {
      const { httpStatus, error } = result;
      if (error.type === 'bad_input') {
        res.status(httpStatus).json({ error: 'Invalid input', message: error.message, ref: req.requestId });
        return;
      }
      if (error.type === 'validation_failed') {
        res.status(httpStatus).json({
          error: 'Workflow validation failed',
          code: 'INVALID_INPUT',
          message: `Cannot save workflow: ${error.errors.join('; ')}`,
          details: { errors: error.errors, warnings: error.warnings, migrationsApplied: error.migrationsApplied },
          ref: req.requestId,
        });
        return;
      }
      if (error.type === 'not_found') {
        res.status(404).json({ error: 'Workflow not found', ref: req.requestId });
        return;
      }
      if (error.type === 'forbidden') {
        res.status(403).json({ error: 'Forbidden', ref: req.requestId });
        return;
      }
      if (error.type === 'quota_exceeded') {
        res.status(403).json({
          error: 'Workflow Limit Exceeded',
          code: 'WORKFLOW_LIMIT_EXCEEDED',
          message: error.message,
          details: error.details,
          ref: req.requestId,
        });
        return;
      }
      res.status(httpStatus).json({ error: 'Save failed', ref: req.requestId });
      return;
    }

    res.json(result.data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] POST /workflows error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── GET /workflows ────────────────────────────────────────────────────────────
// List all workflows for the authenticated user.

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  try {
    const workflows = await listWorkflowsByUser(userId);
    res.json({ workflows, total: workflows.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] GET /workflows error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── GET /workflows/:id ────────────────────────────────────────────────────────
// Load a single workflow by id (user-scoped).

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  try {
    const workflow = await getWorkflowById(req.params.id, userId);
    if (!workflow) {
      res.status(404).json({ error: 'Workflow not found', ref: req.requestId });
      return;
    }
    res.json({ workflow });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] GET /workflows/:id error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── DELETE /workflows/:id ─────────────────────────────────────────────────────
// Delete a workflow (user-scoped; subscription decrement is eventual via sync).

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  try {
    const deleted = await deleteWorkflowById(req.params.id, userId);
    if (!deleted) {
      res.status(404).json({ error: 'Workflow not found', ref: req.requestId });
      return;
    }
    res.json({ success: true, id: req.params.id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] DELETE /workflows/:id error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── GET /workflows/:id/versions ───────────────────────────────────────────────
// List version history for a workflow (most-recent first).

router.get('/:id/versions', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  const rawLimit = req.query.limit;
  const limit = rawLimit ? parseInt(rawLimit as string, 10) : 50;
  if (Number.isNaN(limit) || limit < 1) {
    res.status(400).json({ error: 'Invalid limit parameter', ref: req.requestId });
    return;
  }

  try {
    const versions = await listVersions(req.params.id, userId, limit);
    res.json({ workflowId: req.params.id, versions, count: versions.length });
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: 'Workflow not found', ref: req.requestId });
      return;
    }
    if (err instanceof ForbiddenError) {
      res.status(403).json({ error: 'Forbidden', ref: req.requestId });
      return;
    }
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] GET /workflows/:id/versions error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── POST /workflows/:id/versions/:version/rollback ────────────────────────────
// Rollback to a specific version — restores nodes/edges/graph and creates a new version row.

router.post('/:id/versions/:version/rollback', async (req: Request, res: Response): Promise<void> => {
  const userId = extractUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized', code: 'AUTH_REQUIRED', ref: req.requestId });
    return;
  }

  const versionNumber = parseInt(req.params.version, 10);
  if (Number.isNaN(versionNumber) || versionNumber < 1) {
    res.status(400).json({ error: 'Invalid version number', ref: req.requestId });
    return;
  }

  try {
    const result = await rollbackToVersion(req.params.id, userId, versionNumber);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message, ref: req.requestId });
      return;
    }
    if (err instanceof ForbiddenError) {
      res.status(403).json({ error: 'Forbidden', ref: req.requestId });
      return;
    }
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] POST /workflows/:id/versions/:version/rollback error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

export default router;
