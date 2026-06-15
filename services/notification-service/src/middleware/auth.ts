import { Request, Response, NextFunction } from 'express';

// Read at call time so tests can inject via process.env without module reload.
function getServiceKey(): string {
  return process.env.NOTIFICATION_SERVICE_KEY ?? '';
}

function isCognitoAuthEnabled(): boolean {
  return process.env.COGNITO_AUTH_ENABLED === 'true';
}

if (!process.env.NOTIFICATION_SERVICE_KEY) {
  console.warn(
    '[notification-service] NOTIFICATION_SERVICE_KEY not set — ' +
    'service-key auth disabled (dev/test mode only)',
  );
}

/**
 * Phase 1 auth: accepts x-service-key (worker → service) OR Authorization Bearer
 * (future Cognito JWT — not yet verified until Phase 2).
 *
 * Phase 2: replace the Bearer pass-through with aws-jwt-verify against
 * COGNITO_USER_POOL_ID / COGNITO_CLIENT_ID / COGNITO_ISSUER.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const serviceKey = getServiceKey();

  // Dev mode — no key configured, allow through
  if (!serviceKey && !isCognitoAuthEnabled()) {
    return next();
  }

  // Service-to-service path: worker → notification-service
  if (serviceKey && req.headers['x-service-key'] === serviceKey) {
    return next();
  }

  // User-facing path: browser → notification-service (Cognito JWT)
  const authHeader = req.headers.authorization as string | undefined;
  if (authHeader?.startsWith('Bearer ')) {
    if (!isCognitoAuthEnabled()) {
      // Phase 1: Cognito verification deferred — pass through (routes return 501 anyway)
      return next();
    }
    // Phase 2: verify JWT here with aws-jwt-verify
    // TODO(11C-2): const verifier = CognitoJwtVerifier.create({ ... }); await verifier.verify(token);
    return next();
  }

  res.status(401).json({
    error: 'Unauthorized',
    code: 'AUTH_REQUIRED',
    message: 'Provide x-service-key header or Authorization: Bearer <token>',
    ref: req.requestId,
  });
}

/**
 * Extract the authenticated user ID from the request.
 *
 * Priority:
 *   1. x-user-id header — set by worker after its own Cognito verification
 *   2. Authorization: Bearer <JWT> sub claim — Cognito user-facing path (Phase 2)
 */
export function extractUserId(req: Request): string | null {
  const headerUserId = req.headers['x-user-id'] as string | undefined;
  if (headerUserId?.trim()) return headerUserId.trim();

  const authHeader = req.headers.authorization as string | undefined;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7).trim();
      const [, payload] = token.split('.');
      if (payload) {
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        const sub = decoded.sub ?? decoded['cognito:username'];
        if (sub) return String(sub);
      }
    } catch { /* non-fatal */ }
  }

  return null;
}
