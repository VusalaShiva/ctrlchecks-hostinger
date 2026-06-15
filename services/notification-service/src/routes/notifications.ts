import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { extractUserId } from '../middleware/auth';
import { getFromEmail, sendRaw } from '../lib/ses';
import { renderTemplate, requiresNotificationsFlag, TemplateId } from '../lib/templates';
import * as repo from '../lib/notifications-repo';
import { deliver, validateWebhookUrl } from '../lib/webhook-deliver';

const router = Router();

const EXECUTION_TEMPLATE_IDS = new Set<string>(['execution_completed', 'execution_failed']);

// ── POST /notifications/email ─────────────────────────────────────────────────
// Body: { templateId, data, to }
// Returns: { notificationId, status: 'sent'|'suppressed', channel: 'email' }
router.post('/email', async (req: Request, res: Response) => {
  const { templateId, data, to } = req.body ?? {};

  if (typeof templateId !== 'string' || !EXECUTION_TEMPLATE_IDS.has(templateId) && templateId !== 'welcome') {
    return res.status(400).json({
      error: 'Bad Request',
      code: 'INVALID_TEMPLATE_ID',
      message: 'templateId must be one of: execution_completed, execution_failed, welcome',
      ref: req.requestId,
    });
  }

  if (typeof to !== 'string' || !to.includes('@')) {
    return res.status(400).json({
      error: 'Bad Request',
      code: 'MISSING_TO',
      message: 'to (recipient email address) is required',
      ref: req.requestId,
    });
  }

  // Guard: EXECUTION_EMAIL_NOTIFICATIONS must be true for execution templates
  if (requiresNotificationsFlag(templateId as TemplateId)) {
    if (process.env.EXECUTION_EMAIL_NOTIFICATIONS !== 'true') {
      return res.json({
        notificationId: randomUUID(),
        status: 'suppressed',
        reason: 'notifications_disabled',
        channel: 'email',
      });
    }
  }

  // Guard: SES must be configured
  if (!getFromEmail()) {
    return res.status(503).json({
      error: 'Service Unavailable',
      code: 'SES_NOT_CONFIGURED',
      message: 'SES_FROM_EMAIL is not configured',
      ref: req.requestId,
    });
  }

  const safeData: Record<string, string> = {};
  if (data && typeof data === 'object') {
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'string') safeData[k] = v;
    }
  }

  let template;
  try {
    template = renderTemplate(templateId as TemplateId, safeData);
  } catch {
    return res.status(400).json({
      error: 'Bad Request',
      code: 'TEMPLATE_ERROR',
      message: `Unknown templateId: ${templateId}`,
      ref: req.requestId,
    });
  }

  try {
    await sendRaw(to, template.subject, template.html);
    return res.json({
      notificationId: randomUUID(),
      status: 'sent',
      channel: 'email',
    });
  } catch (err) {
    const rid = req.requestId;
    const userId = extractUserId(req) ?? 'unknown';
    console.error(`[${rid}] [notification-service] SES send failed for user ${userId}:`, err);
    return res.status(502).json({
      error: 'Bad Gateway',
      code: 'SES_SEND_FAILED',
      message: 'Failed to send email via SES',
      ref: rid,
    });
  }
});

// ── POST /notifications/send ──────────────────────────────────────────────────
// Generic dispatch — routes to the correct channel handler.
// Phase 2: supports channel='email' only.
router.post('/send', async (req: Request, res: Response) => {
  const { type, channel, data } = req.body ?? {};

  if (channel === 'email') {
    // Dispatch to email handler: re-use the email logic inline
    const to: unknown = req.body?.to ?? data?.to;
    const templateId: unknown = type ?? req.body?.templateId ?? data?.templateId;

    if (typeof templateId !== 'string' || typeof to !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        code: 'MISSING_FIELDS',
        message: 'send with channel=email requires templateId and to fields',
        ref: req.requestId,
      });
    }

    // Delegate internally: rebuild request-like body and re-invoke email logic
    req.body = { templateId, data: data ?? {}, to };
    // Forward to /email handler by re-invoking the router — cleanest approach is
    // to call the same service logic directly rather than forwarding the request.
    if (requiresNotificationsFlag(templateId as TemplateId)) {
      if (process.env.EXECUTION_EMAIL_NOTIFICATIONS !== 'true') {
        return res.json({ notificationId: randomUUID(), status: 'suppressed', reason: 'notifications_disabled', channel: 'email' });
      }
    }
    if (!getFromEmail()) {
      return res.status(503).json({ error: 'Service Unavailable', code: 'SES_NOT_CONFIGURED', ref: req.requestId });
    }
    const safeData: Record<string, string> = {};
    if (data && typeof data === 'object') {
      for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
        if (typeof v === 'string') safeData[k] = v;
      }
    }
    try {
      const template = renderTemplate(templateId as TemplateId, safeData);
      await sendRaw(to as string, template.subject, template.html);
      return res.json({ notificationId: randomUUID(), status: 'sent', channel: 'email' });
    } catch (err) {
      console.error(`[${req.requestId}] [notification-service] /send SES error:`, err);
      return res.status(502).json({ error: 'Bad Gateway', code: 'SES_SEND_FAILED', ref: req.requestId });
    }
  }

  if (channel === 'in_app') {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized', code: 'MISSING_USER_ID', ref: req.requestId });
    }
    const { data: d } = req.body ?? {};
    const title = req.body?.title ?? d?.title;
    const message = req.body?.message ?? d?.message;
    const notifType = type ?? req.body?.notifType ?? d?.type ?? 'info';
    if (typeof title !== 'string' || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Bad Request', code: 'MISSING_FIELDS',
        message: 'send with channel=in_app requires title and message',
        ref: req.requestId,
      });
    }
    try {
      const row = await repo.insert({ userId, title, message, type: notifType, link: req.body?.link ?? null });
      return res.json({ notificationId: row.id, status: 'sent', channel: 'in_app' });
    } catch (err) {
      console.error(`[${req.requestId}] [notification-service] /send in_app DB error:`, err);
      return res.status(503).json({ error: 'Service Unavailable', code: 'DB_UNAVAILABLE', ref: req.requestId });
    }
  }

  if (channel === 'webhook') {
    const { url, event: evt } = req.body ?? {};
    if (typeof url !== 'string' || typeof evt !== 'string') {
      return res.status(400).json({
        error: 'Bad Request', code: 'MISSING_FIELDS',
        message: 'send with channel=webhook requires url and event fields',
        ref: req.requestId,
      });
    }
    const ssrfErr = validateWebhookUrl(url);
    if (ssrfErr) {
      return res.status(400).json({ error: 'Bad Request', code: 'SSRF_BLOCKED', message: ssrfErr, ref: req.requestId });
    }
    const result = await deliver(url, evt, req.body?.payload ?? data ?? {});
    const notificationId = randomUUID();
    if (result.status === 'sent') {
      return res.json({ notificationId, status: 'sent', channel: 'webhook', attempts: result.attempts, httpStatus: result.httpStatus });
    }
    return res.status(502).json({
      error: 'Bad Gateway', code: 'WEBHOOK_DELIVERY_FAILED',
      message: result.error ?? 'All delivery attempts failed',
      notificationId, attempts: result.attempts, ref: req.requestId,
    });
  }

  return res.status(400).json({
    error: 'Bad Request', code: 'UNKNOWN_CHANNEL',
    message: `channel '${channel ?? '(unset)'}' is not supported`,
    ref: req.requestId,
  });
});

// ── POST /notifications/in-app ────────────────────────────────────────────────
// Body (from worker): { title, message, type?, link? }; userId from x-user-id header
router.post('/in-app', async (req: Request, res: Response) => {
  const userId = extractUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized', code: 'MISSING_USER_ID', ref: req.requestId });
  }

  const { title, message, type = 'info', link = null } = req.body ?? {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      error: 'Bad Request', code: 'MISSING_TITLE',
      message: 'title is required',
      ref: req.requestId,
    });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'Bad Request', code: 'MISSING_MESSAGE',
      message: 'message is required',
      ref: req.requestId,
    });
  }

  try {
    const row = await repo.insert({ userId, title, message, type, link: link ?? null });
    return res.json({ notificationId: row.id, status: 'sent', channel: 'in_app' });
  } catch (err) {
    console.error(`[${req.requestId}] [notification-service] /in-app DB error:`, err);
    return res.status(503).json({
      error: 'Service Unavailable', code: 'DB_UNAVAILABLE',
      message: 'Could not write notification — DATABASE_URL not configured or DB unreachable',
      ref: req.requestId,
    });
  }
});

// ── POST /notifications/webhook ───────────────────────────────────────────────
// Body: { url, event, payload? }; SSRF-guarded; 3× backoff; 256KB limit
router.post('/webhook', async (req: Request, res: Response) => {
  const { url, event, payload } = req.body ?? {};

  if (typeof url !== 'string' || !url) {
    return res.status(400).json({ error: 'Bad Request', code: 'MISSING_URL', message: 'url is required', ref: req.requestId });
  }
  if (typeof event !== 'string' || !event) {
    return res.status(400).json({ error: 'Bad Request', code: 'MISSING_EVENT', message: 'event is required', ref: req.requestId });
  }

  const ssrfErr = validateWebhookUrl(url);
  if (ssrfErr) {
    return res.status(400).json({ error: 'Bad Request', code: 'SSRF_BLOCKED', message: ssrfErr, ref: req.requestId });
  }

  const notificationId = randomUUID();
  const result = await deliver(url, event, payload ?? {});

  if (result.status === 'sent') {
    return res.json({
      notificationId, status: 'sent', channel: 'webhook',
      attempts: result.attempts, httpStatus: result.httpStatus,
    });
  }

  const rid = req.requestId;
  const userId = extractUserId(req) ?? 'unknown';
  console.warn(`[${rid}] [notification-service] webhook delivery failed for user ${userId} → ${url}: ${result.error}`);
  return res.status(502).json({
    error: 'Bad Gateway', code: 'WEBHOOK_DELIVERY_FAILED',
    message: result.error ?? 'All delivery attempts failed',
    notificationId, attempts: result.attempts, ref: rid,
  });
});

// ── GET /notifications ────────────────────────────────────────────────────────
// Query params: ?unread_only=true
router.get('/', async (req: Request, res: Response) => {
  const userId = extractUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized', code: 'MISSING_USER_ID', ref: req.requestId });
  }
  const unreadOnly = req.query.unread_only === 'true';
  try {
    const rows = await repo.listByUser(userId, unreadOnly);
    return res.json({ notifications: rows, count: rows.length });
  } catch (err) {
    console.error(`[${req.requestId}] [notification-service] GET / DB error:`, err);
    return res.status(503).json({ error: 'Service Unavailable', code: 'DB_UNAVAILABLE', ref: req.requestId });
  }
});

// ── PATCH /notifications/:id/read ────────────────────────────────────────────
router.patch('/:id/read', async (req: Request, res: Response) => {
  const userId = extractUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized', code: 'MISSING_USER_ID', ref: req.requestId });
  }
  const { id } = req.params;
  try {
    const updated = await repo.markRead(id, userId);
    if (!updated) {
      return res.status(404).json({ error: 'Not found', code: 'NOTIFICATION_NOT_FOUND', ref: req.requestId });
    }
    return res.json({ id, read: true });
  } catch (err) {
    console.error(`[${req.requestId}] [notification-service] PATCH /:id/read DB error:`, err);
    return res.status(503).json({ error: 'Service Unavailable', code: 'DB_UNAVAILABLE', ref: req.requestId });
  }
});

export default router;
