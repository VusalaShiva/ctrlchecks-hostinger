/**
 * Webhook delivery helper.
 *
 * Features:
 *  - SSRF guard: only HTTPS; blocks all private/loopback/link-local ranges
 *  - 256KB payload limit (serialized JSON)
 *  - 3 attempts with exponential backoff (default: 0ms → 1s → 2s)
 *  - 5s timeout per attempt
 *  - Returns structured result — never throws
 */

const MAX_BODY_BYTES = 256 * 1024;
const TIMEOUT_MS = 5000;

// Overridable for tests via _setBackoffForTest
let _backoffMs: number[] = [0, 1000, 2000];
export function _setBackoffForTest(delays: number[]): void { _backoffMs = delays; }
export function _resetBackoff(): void { _backoffMs = [0, 1000, 2000]; }

export interface WebhookDeliverResult {
  status: 'sent' | 'failed';
  attempts: number;
  httpStatus?: number;
  error?: string;
}

/**
 * Validate the target URL against SSRF risks.
 * Returns an error string if blocked, null if safe.
 */
export function validateWebhookUrl(urlStr: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return 'Invalid URL';
  }

  if (parsed.protocol !== 'https:') {
    return 'Only HTTPS webhook URLs are allowed';
  }

  // Strip IPv6 brackets — Node.js URL may keep them in hostname (e.g. [::1])
  const h = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  // Loopback / localhost
  if (h === 'localhost') return 'SSRF: private address blocked';
  if (/^127\./.test(h)) return 'SSRF: private address blocked';
  if (h === '0.0.0.0') return 'SSRF: private address blocked';

  // Private IPv4 ranges
  if (/^10\./.test(h)) return 'SSRF: private address blocked';
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return 'SSRF: private address blocked';
  if (/^192\.168\./.test(h)) return 'SSRF: private address blocked';

  // Link-local
  if (/^169\.254\./.test(h)) return 'SSRF: private address blocked';

  // IPv6 loopback and private (after bracket-stripping)
  if (h === '::1' || h === '0:0:0:0:0:0:0:1') return 'SSRF: private address blocked';
  if (/^::ffff:127\./i.test(h)) return 'SSRF: private address blocked';  // IPv4-mapped loopback
  if (/^(fc|fd)[0-9a-f]{2}:/i.test(h)) return 'SSRF: private address blocked'; // ULA (fc00::/7)
  if (h === '::') return 'SSRF: private address blocked';

  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deliver a webhook payload to the given URL.
 * Returns a result object; never throws.
 */
export async function deliver(
  url: string,
  event: string,
  payload: unknown,
): Promise<WebhookDeliverResult> {
  const ssrfErr = validateWebhookUrl(url);
  if (ssrfErr) {
    return { status: 'failed', attempts: 0, error: ssrfErr };
  }

  const body = JSON.stringify({ event, payload: payload ?? {}, timestamp: new Date().toISOString() });
  if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
    return { status: 'failed', attempts: 0, error: `Payload exceeds 256KB limit` };
  }

  const backoff = _backoffMs;
  let lastError = 'Unknown error';
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt < backoff.length; attempt++) {
    if (backoff[attempt] > 0) {
      await sleep(backoff[attempt]);
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ctrlchecks-notification-service/1.0',
          'X-CtrlChecks-Event': event,
        },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      lastStatus = res.status;

      if (res.ok) {
        return { status: 'sent', attempts: attempt + 1, httpStatus: res.status };
      }

      // 4xx = permanent failure; do not retry
      if (res.status >= 400 && res.status < 500) {
        return { status: 'failed', attempts: attempt + 1, httpStatus: res.status, error: `HTTP ${res.status}` };
      }

      // 5xx = transient; retry
      lastError = `HTTP ${res.status}`;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  return { status: 'failed', attempts: backoff.length, httpStatus: lastStatus, error: lastError };
}
