/**
 * execution-engine-client.ts
 *
 * Feature-flagged client for the execution-engine microservice.
 *
 * When EXECUTION_ENGINE_ENABLED=false (default), all methods return null immediately
 * so the caller falls back to the monolith executor. No network call is made.
 *
 * Canary rollout path (controlled via EXECUTION_ENGINE_CANARY_PERCENT, default 33):
 *   Phase 1  — flag disabled (stub only)
 *   Phase 2  — ENABLED=true, CANARY_PERCENT=33 (default)
 *   Phase 3  — ENABLED=true, CANARY_PERCENT=33, consumer active
 *   Phase 4  — ENABLED=true, CANARY_PERCENT=66 (set on server, no redeploy)
 *   Phase 5  — CANARY_PERCENT=100 then remove monolith fallback
 *   See: docs/engineering/execution-engine-contract.md
 */

import { incExecutionEngineDelegation } from '../middleware/highScaleMetrics';

export interface ExecuteRequest {
  workflowId: string;
  executionId: string;
  input?: Record<string, unknown>;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface ExecuteResponse {
  queued: true;
  executionId: string;
  jobId?: string;
  statusUrl: string;
}

// FNV-1a 32-bit hash — fast, deterministic, no deps
function fnv1a(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/**
 * @deprecated Phase 5: execute-workflow.ts no longer calls isCanaryTarget() — all traffic
 * routes unconditionally when EXECUTION_ENGINE_ENABLED=true. Kept exported so existing
 * test suites compile without changes. Remove in Phase 6.
 */
export function isCanaryTarget(executionId: string): boolean {
  if (!isEnabled()) return false;
  const pct = getCanaryPercent();
  if (pct <= 0) return false;
  if (pct >= 100) return true;
  return fnv1a(executionId) % 100 < pct;
}

/**
 * @deprecated Phase 5: CANARY_PERCENT is ignored by execute-workflow.ts once deployed.
 * Kept exported for tests. Remove in Phase 6.
 */
export function getCanaryPercent(): number {
  const raw = process.env.EXECUTION_ENGINE_CANARY_PERCENT;
  if (!raw) return 33;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 33;
}

function isEnabled(): boolean {
  return process.env.EXECUTION_ENGINE_ENABLED === 'true';
}

function getBaseUrl(): string {
  return (process.env.EXECUTION_ENGINE_URL ?? 'http://localhost:3003').replace(/\/$/, '');
}

function getServiceKey(): string {
  return process.env.EXECUTION_ENGINE_SERVICE_KEY ?? '';
}

/**
 * Delegate an execution to the execution-engine service.
 *
 * Returns null when:
 *   - EXECUTION_ENGINE_ENABLED is false (feature flag off — use monolith fallback)
 *   - The remote service returns a non-2xx response
 *   - Any network error occurs
 *
 * Caller MUST check for null and fall back to the monolith executor.
 */
export async function delegateExecution(
  req: ExecuteRequest,
): Promise<ExecuteResponse | null> {
  if (!isEnabled()) {
    return null;
  }

  const url = `${getBaseUrl()}/execute`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-service-key': getServiceKey(),
      },
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(
        `[execution-engine-client] Remote returned ${response.status} — falling back to monolith`,
      );
      incExecutionEngineDelegation('miss');
      return null;
    }

    incExecutionEngineDelegation('hit');
    return (await response.json()) as ExecuteResponse;
  } catch (err) {
    console.warn(
      '[execution-engine-client] Request failed — falling back to monolith:',
      (err as Error).message,
    );
    incExecutionEngineDelegation('error');
    return null;
  }
}

/**
 * Probe the execution-engine health endpoint.
 * Returns true if the service is reachable and healthy.
 */
export async function isExecutionEngineHealthy(): Promise<boolean> {
  if (!isEnabled()) return false;
  try {
    const res = await fetch(`${getBaseUrl()}/health/ready`, {
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
