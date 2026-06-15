import { Request, Response, NextFunction } from 'express';

// Only internal service-to-service calls are accepted.
// The execution engine has no user-facing routes — worker is the sole caller.
const SERVICE_KEY = process.env.EXECUTION_ENGINE_SERVICE_KEY ?? '';

if (!SERVICE_KEY) {
  console.warn(
    '[execution-engine] EXECUTION_ENGINE_SERVICE_KEY not set — ' +
    'service-key auth disabled (dev/test mode only)',
  );
}

/**
 * Verifies the caller presents the correct x-service-key header.
 * When EXECUTION_ENGINE_SERVICE_KEY is unset, passes through (dev/test).
 */
export function requireServiceKey(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!SERVICE_KEY) {
    // Key not configured — dev or test environment, allow through.
    return next();
  }
  if (req.headers['x-service-key'] === SERVICE_KEY) {
    return next();
  }
  res.status(401).json({
    error: 'Unauthorized',
    code: 'INVALID_SERVICE_KEY',
    ref: req.requestId,
  });
}
