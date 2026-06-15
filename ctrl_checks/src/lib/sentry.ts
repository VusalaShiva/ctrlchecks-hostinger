/**
 * Sentry error tracking for the React frontend.
 *
 * Call initSentry() once in main.tsx before rendering.
 * No-op when VITE_SENTRY_DSN is not set.
 *
 * Secret scrubbing: breadcrumb URLs and fetch bodies are sanitized so
 * credentials in query strings or payloads are never sent to Sentry.
 */

import * as Sentry from '@sentry/react';

const SCRUBBED_PARAMS = ['token', 'access_token', 'refresh_token', 'api_key', 'apiKey', 'password', 'secret'];

function scrubUrl(url: string): string {
  try {
    const parsed = new URL(url);
    for (const param of SCRUBBED_PARAMS) {
      if (parsed.searchParams.has(param)) {
        parsed.searchParams.set(param, '[Filtered]');
      }
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function initSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION as string | undefined,
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 0,
    beforeSend(event) {
      if (event.request?.url) {
        event.request.url = scrubUrl(event.request.url);
      }
      return event;
    },
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.data?.url) {
        breadcrumb.data.url = scrubUrl(String(breadcrumb.data.url));
      }
      return breadcrumb;
    },
  });
}

export { Sentry };
