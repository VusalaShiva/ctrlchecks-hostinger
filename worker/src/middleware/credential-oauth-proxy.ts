/**
 * Credential-service OAuth proxy (Phase 3 / Phase 4).
 *
 * When CREDENTIAL_SERVICE_OAUTH_ENABLED=true and the target provider is in
 * CREDENTIAL_SERVICE_OAUTH_PROVIDERS (or the list is "*"), this middleware
 * forwards the request to the credential-service and returns its response
 * (including 302 redirects) to the browser. On any error or timeout, it
 * calls next() so the local handler runs.
 *
 * Feature flags:
 *   CREDENTIAL_SERVICE_OAUTH_ENABLED       — master switch (default false)
 *   CREDENTIAL_SERVICE_OAUTH_PROVIDERS     — comma-separated provider list or "*"
 *                                            Phase 3 default: top-9 providers
 *                                            Phase 4 default when set to "*": all providers
 * Rollback: set CREDENTIAL_SERVICE_OAUTH_ENABLED=false + restart worker. No redeploy needed.
 */

import { Request, Response, NextFunction } from 'express';

// ── Config readers (read at call time — hot-reload via env) ───────────────────

function isOAuthProxyEnabled(): boolean {
  return process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED === 'true';
}

function getServiceUrl(): string {
  return (process.env.CREDENTIAL_SERVICE_URL || 'http://localhost:3004').replace(/\/$/, '');
}

function getServiceKey(): string {
  return process.env.CREDENTIAL_SERVICE_KEY || '';
}

const DEFAULT_PROVIDERS = [
  'google', 'github', 'linkedin', 'notion', 'twitter',
  'facebook', 'slack', 'hubspot', 'salesforce',
];

function getMigratedProviders(): string[] | '*' {
  const raw = process.env.CREDENTIAL_SERVICE_OAUTH_PROVIDERS;
  if (!raw?.trim()) return DEFAULT_PROVIDERS;
  if (raw.trim() === '*') return '*';
  return raw.split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);
}

export function isOAuthProviderMigrated(provider: string): boolean {
  if (!isOAuthProxyEnabled()) return false;
  const list = getMigratedProviders();
  if (list === '*') return true;
  return list.includes(provider.toLowerCase());
}

// Map from credentialTypeId → provider name used in PROVIDERS list.
// Must include every OAuth2 type from worker credential-type-registry.
export const CRED_TYPE_TO_PROVIDER: Record<string, string> = {
  // Phase 3 top-9
  google_oauth2: 'google',
  github_oauth2: 'github',
  linkedin_oauth2: 'linkedin',
  notion_oauth2: 'notion',
  twitter_oauth2: 'twitter',
  facebook_oauth2: 'facebook',
  slack_oauth2: 'slack',
  hubspot_oauth2: 'hubspot',
  salesforce_oauth2: 'salesforce',
  // Phase 4 additions
  microsoft_oauth2: 'microsoft',
  zoom_oauth2: 'zoom',
  gitlab_oauth2: 'gitlab',
  asana_oauth2: 'asana',
  clickup_oauth2: 'clickup',
  linear_oauth2: 'linear',
  zoho_oauth2: 'zoho',
  mailchimp_oauth2: 'mailchimp',
  paypal_oauth2: 'paypal',
  quickbooks_oauth2: 'quickbooks',
  xero_oauth2: 'xero',
  shopify_oauth2: 'shopify',
  dropbox_oauth2: 'dropbox',
  instagram_oauth2: 'instagram',
  youtube_oauth2: 'youtube',
  whatsapp_oauth2: 'whatsapp',
};

function isGenericOAuthRequestMigrated(req: Request): boolean {
  if (!isOAuthProxyEnabled()) return false;
  const credTypeId =
    (req.query.credentialTypeId as string | undefined) ??
    (req.body?.credentialTypeId as string | undefined);
  if (!credTypeId) return false;
  const provider = CRED_TYPE_TO_PROVIDER[credTypeId];
  return provider ? isOAuthProviderMigrated(provider) : false;
}

// When PROVIDERS=* we proxy generic callbacks unconditionally (Phase 4).
// For partial rollouts, callbacks stay local (we can't inspect provider from state at call time).
function shouldProxyGenericCallbacks(): boolean {
  if (!isOAuthProxyEnabled()) return false;
  return getMigratedProviders() === '*';
}

// ── Path translation ──────────────────────────────────────────────────────────
// Worker public path → credential-service internal path

function toServicePath(reqPath: string): string {
  // Generic credential-connections OAuth:
  // /api/credential-connections/oauth/start    → /oauth/generic/start
  // /api/credential-connections/oauth/callback → /oauth/generic/callback
  if (reqPath.startsWith('/api/credential-connections/oauth/')) {
    return reqPath.replace('/api/credential-connections/oauth/', '/oauth/generic/');
  }
  // Dedicated provider OAuth:
  // /api/oauth/google/start → /oauth/google/start
  return reqPath.replace(/^\/api\//, '/');
}

// ── Proxy middleware ──────────────────────────────────────────────────────────

export async function proxyToCredentialService(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // Master switch
  if (!isOAuthProxyEnabled()) return next();

  const isGenericPath = req.path.includes('/credential-connections/oauth/');
  if (isGenericPath) {
    const isStartRoute = req.path.endsWith('/start');
    const isCallbackRoute = req.path.endsWith('/callback');

    if (isStartRoute) {
      // Only proxy if this credentialTypeId maps to a migrated provider
      if (!isGenericOAuthRequestMigrated(req)) return next();
    } else if (isCallbackRoute) {
      // Phase 4: proxy all callbacks when PROVIDERS=*; otherwise keep local
      if (!shouldProxyGenericCallbacks()) return next();
    } else {
      return next();
    }
  }

  const serviceUrl = getServiceUrl();
  const serviceKey = getServiceKey();

  // Build query string from req.query (already parsed by Express)
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (typeof value === 'string') qs.set(key, value);
  }
  const qsPart = qs.toString() ? `?${qs.toString()}` : '';
  const targetPath = toServicePath(req.path);
  const targetUrl = `${serviceUrl}${targetPath}${qsPart}`;

  // Extract user ID from the request (set by authenticateUser middleware on start routes)
  const userId: string | undefined = (req as any).user?.id;

  // Build headers
  const forwardHeaders: Record<string, string> = {
    'content-type': req.headers['content-type'] || 'application/json',
  };
  if (serviceKey) forwardHeaders['x-service-key'] = serviceKey;
  if (userId) forwardHeaders['x-user-id'] = userId;
  // Forward Authorization header for direct browser calls (future — when Cognito JWT used)
  if (req.headers.authorization) forwardHeaders['authorization'] = req.headers.authorization as string;

  const body =
    req.method !== 'GET' && req.method !== 'HEAD' && req.body
      ? JSON.stringify(req.body)
      : undefined;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
      // Manual redirect so we can pass Location header back to browser as-is
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    });

    // Forward response headers (skip hop-by-hop headers)
    const HOP_BY_HOP = new Set(['transfer-encoding', 'connection', 'keep-alive', 'upgrade', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers']);
    for (const [key, value] of response.headers.entries()) {
      if (!HOP_BY_HOP.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    }

    const status = response.status;

    if (status === 301 || status === 302 || status === 303 || status === 307 || status === 308) {
      const location = response.headers.get('location');
      if (location) {
        return void res.redirect(status, location);
      }
    }

    const bodyText = await response.text();

    // Detect HTML response (relay page)
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      res.status(status).type('html').send(bodyText);
    } else {
      res.status(status).send(bodyText);
    }
  } catch (err: any) {
    console.warn(
      `[credential-oauth-proxy] Service unreachable for ${req.method} ${targetPath} — falling back to local handler. Error: ${err?.message}`,
    );
    next(); // Fall back to local OAuth handler
  }
}
