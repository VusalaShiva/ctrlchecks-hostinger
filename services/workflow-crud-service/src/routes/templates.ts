import { Router, Request, Response } from 'express';
import { listTemplates, getTemplateById } from '../lib/templates-repo';

const router = Router();

// ── GET /templates ────────────────────────────────────────────────────────────
// List active templates, optionally filtered by category or search term.

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { category, search } = req.query as { category?: string; search?: string };

  try {
    const templates = await listTemplates({ category, search });
    res.json({ templates });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] GET /templates error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

// ── GET /templates/:id ────────────────────────────────────────────────────────
// Fetch a single active template by id.

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await getTemplateById(req.params.id);
    if (!template) {
      res.status(404).json({ error: 'Template not found', ref: req.requestId });
      return;
    }
    res.json({ template });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[${req.requestId}] [workflow-crud-service] GET /templates/:id error:`, msg);
    res.status(503).json({ error: 'Service unavailable', ref: req.requestId });
  }
});

export default router;
