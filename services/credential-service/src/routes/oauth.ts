/**
 * OAuth routes for credential-service (Phase 3).
 *
 * Each dedicated-provider route calls oauthService with the matching credentialTypeId.
 * Generic routes handle registry-driven providers (Slack, HubSpot, etc.).
 *
 * Mounted at /oauth in index.ts (before requireAuth, since callbacks have no JWT).
 *
 * Path map from worker proxy:
 *   /api/oauth/google/start             → /oauth/google/start
 *   /api/oauth/google/callback          → /oauth/google/callback
 *   /api/oauth/github/start             → /oauth/github/start  (connect only)
 *   /api/oauth/github/callback          → /oauth/github/callback
 *   /api/oauth/linkedin/start           → /oauth/linkedin/start
 *   /api/oauth/linkedin/callback        → /oauth/linkedin/callback
 *   /api/oauth/notion/authorize         → /oauth/notion/authorize
 *   /api/oauth/notion/callback          → /oauth/notion/callback (GET)
 *   /api/oauth/twitter/authorize        → /oauth/twitter/authorize
 *   /api/oauth/twitter/callback         → /oauth/twitter/callback (GET)
 *   /api/oauth/facebook/start           → /oauth/facebook/start
 *   /api/oauth/facebook/callback        → /oauth/facebook/callback
 *   /api/oauth/salesforce/authorize     → /oauth/salesforce/authorize
 *   /api/oauth/salesforce/callback      → /oauth/salesforce/callback (GET)
 *   /api/credential-connections/oauth/start    → /oauth/generic/start
 *   /api/credential-connections/oauth/callback → /oauth/generic/callback
 */

import { Router, Request, Response } from 'express';
import { oauthService } from '../oauth/oauth-service';
import { oauthCallbackHtml } from '../lib/oauth-relay';
import { extractUserId } from '../middleware/auth';

const router = Router();

// ── Helpers ───────────────────────────────────────────────────────────────────

function mapOAuthErrorToUserMessage(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes('invalid_grant') || lower.includes('invalid authorization code')) {
    return 'The authorization code was rejected by the provider. This can happen if the connection window was open too long, or if the redirect URI is not registered in your app settings. Please try connecting again.';
  }
  if (lower.includes('invalid_client') || lower.includes('client authentication failed')) {
    return 'The app credentials were rejected. Check that your OAuth Client ID and Secret are correctly configured.';
  }
  if (lower.includes('redirect_uri_mismatch') || lower.includes('redirect uri')) {
    return 'The redirect URI does not match. Ensure the callback URL registered in your provider app settings matches the backend exactly.';
  }
  if (lower.includes('invalid or expired oauth state')) {
    return 'The connection session expired. Please start the connection flow again.';
  }
  if (lower.includes('access_denied') || lower.includes('user denied')) {
    return 'Access was denied. Please approve the requested permissions in the provider login window.';
  }
  return 'The connection could not be completed. Please try again.';
}

function requireUserId(req: Request, res: Response): string | null {
  const uid = extractUserId(req);
  if (!uid) {
    res.status(401).json({
      error: 'Unauthorized',
      code: 'USER_ID_REQUIRED',
      message: 'Provide x-user-id header or Authorization: Bearer <Cognito JWT>',
      ref: req.requestId,
    });
    return null;
  }
  return uid;
}

function safeReturnTo(value: unknown): string {
  const path = typeof value === 'string' ? value : '/workflows';
  return path.startsWith('/') && !path.startsWith('//') ? path : '/workflows';
}

// ── Start handler — shared by all dedicated providers ─────────────────────────

async function handleStart(
  credentialTypeId: string,
  req: Request,
  res: Response,
): Promise<void> {
  const uid = requireUserId(req, res);
  if (!uid) return;

  const returnTo = safeReturnTo(req.query.return_to ?? req.query.redirect_to ?? req.body?.returnTo);

  try {
    const { authorizationUrl } = await oauthService.start({
      userId: uid,
      credentialTypeId,
      connectionId: (req.query.connectionId as string | undefined) ?? req.body?.connectionId ?? null,
      scopes: typeof req.query.scopes === 'string' ? req.query.scopes.split(',') : req.body?.scopes,
      returnTo,
    });
    res.redirect(authorizationUrl);
  } catch (err: any) {
    console.error(`[${req.requestId}] [oauth/start] ${credentialTypeId}:`, err?.message);
    res.status(500).json({ error: err?.message || 'Failed to start OAuth flow', code: 'OAUTH_START_ERROR', ref: req.requestId });
  }
}

// ── Callback handler — shared by all providers (GET) ─────────────────────────

async function handleCallback(req: Request, res: Response): Promise<void> {
  const code = String(req.query.code ?? req.body?.code ?? '');
  const state = String(req.query.state ?? req.body?.state ?? '');
  const oauthError = req.query.error as string | undefined;

  if (oauthError) {
    const message = mapOAuthErrorToUserMessage(oauthError);
    return void res.status(200).send(oauthCallbackHtml({ type: 'oauth-error', message }));
  }

  try {
    const { connectionId, returnTo } = await oauthService.callback({ code, state });
    return void res.status(200).send(oauthCallbackHtml({ type: 'oauth-success', connectionId, returnTo }));
  } catch (err: any) {
    console.error(`[${req.requestId}] [oauth/callback]:`, err?.message);
    const message = mapOAuthErrorToUserMessage(err?.message || '');
    return void res.status(200).send(oauthCallbackHtml({ type: 'oauth-error', message }));
  }
}

// ── Dedicated provider routes ─────────────────────────────────────────────────

router.get('/google/start', (req, res) => handleStart('google_oauth2', req, res));
router.get('/google/callback', handleCallback);

// GitHub connect flow only — start-login stays on worker
router.get('/github/start', (req, res) => handleStart('github_oauth2', req, res));
router.get('/github/callback', handleCallback);

router.get('/linkedin/start', (req, res) => handleStart('linkedin_oauth2', req, res));
router.get('/linkedin/callback', handleCallback);

// Notion and Twitter use /authorize path (provider convention)
router.get('/notion/authorize', (req, res) => handleStart('notion_oauth2', req, res));
router.get('/notion/callback', handleCallback);

router.get('/twitter/authorize', (req, res) => handleStart('twitter_oauth2', req, res));
router.get('/twitter/callback', handleCallback);

router.get('/facebook/start', (req, res) => handleStart('facebook_oauth2', req, res));
router.get('/facebook/callback', handleCallback);

router.get('/salesforce/authorize', (req, res) => handleStart('salesforce_oauth2', req, res));
router.get('/salesforce/callback', handleCallback);

// Phase 4 dedicated routes ────────────────────────────────────────────────────

// Instagram — Meta Graph API OAuth (dedicated route, server-side callback)
router.get('/instagram/authorize', (req, res) => handleStart('instagram_oauth2', req, res));
router.get('/instagram/callback', handleCallback);

// WhatsApp — Meta Graph API OAuth (dedicated route, server-side callback)
router.get('/whatsapp/authorize', (req, res) => handleStart('whatsapp_oauth2', req, res));
router.get('/whatsapp/callback', handleCallback);

// Zoho CRM OAuth
router.get('/zoho/authorize', (req, res) => handleStart('zoho_oauth2', req, res));
router.get('/zoho/callback', handleCallback);

// ── Generic routes (Slack, HubSpot, etc.) ────────────────────────────────────

router.get('/generic/start', async (req, res) => {
  const credentialTypeId = (req.query.credentialTypeId as string | undefined) ?? req.body?.credentialTypeId;
  if (!credentialTypeId) {
    return res.status(400).json({ error: 'credentialTypeId required', code: 'MISSING_CREDENTIAL_TYPE', ref: req.requestId });
  }
  return handleStart(credentialTypeId, req, res);
});

router.post('/generic/start', async (req, res) => {
  const credentialTypeId = req.body?.credentialTypeId;
  if (!credentialTypeId) {
    return res.status(400).json({ error: 'credentialTypeId required', code: 'MISSING_CREDENTIAL_TYPE', ref: req.requestId });
  }
  return handleStart(credentialTypeId, req, res);
});

router.get('/generic/callback', handleCallback);
router.post('/generic/callback', handleCallback);

export default router;
