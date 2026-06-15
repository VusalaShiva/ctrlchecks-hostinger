import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBackendUrl } from '@/lib/api/getBackendUrl';

function setHostname(hostname: string) {
  Object.defineProperty(window, 'location', {
    value: { hostname },
    writable: true,
    configurable: true,
  });
}

function clearBackendEnv() {
  vi.stubEnv('VITE_API_URL', '');
  vi.stubEnv('VITE_PUBLIC_BASE_URL', '');
}

describe('getBackendUrl', () => {
  beforeEach(() => {
    clearBackendEnv();
    vi.stubEnv('DEV', false);
    vi.stubEnv('MODE', 'production');
    setHostname('app.ctrlchecks.com');
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('prefers VITE_API_URL over other backend URL env values', () => {
    vi.stubEnv('VITE_API_URL', 'https://api.ctrlchecks.test');
    vi.stubEnv('VITE_PUBLIC_BASE_URL', 'https://public.ctrlchecks.test');

    expect(getBackendUrl()).toBe('https://api.ctrlchecks.test');
  });

  it('uses VITE_PUBLIC_BASE_URL when VITE_API_URL is absent', () => {
    vi.stubEnv('VITE_PUBLIC_BASE_URL', 'https://public.ctrlchecks.test');

    expect(getBackendUrl()).toBe('https://public.ctrlchecks.test');
  });

  it('falls back to localhost only for local development on localhost', () => {
    vi.stubEnv('DEV', true);
    setHostname('localhost');

    expect(getBackendUrl()).toBe('http://localhost:3001');
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('VITE_API_URL not set. Using localhost:3001 for local development only.'),
    );
  });

  it('throws in production when no backend URL is configured', () => {
    expect(() => getBackendUrl()).toThrow(
      'VITE_API_URL environment variable is required but not set. Please set it in your .env file.',
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('VITE_API_URL is required but not set! Please set it in your .env file.'),
    );
  });
});
