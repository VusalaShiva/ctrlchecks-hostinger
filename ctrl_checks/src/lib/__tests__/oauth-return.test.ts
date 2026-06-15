import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getCurrentPathWithQuery,
  rememberOAuthReturnTo,
  consumeRememberedOAuthReturnTo,
  resolveOAuthReturnTo,
  buildConnectorCallbackUrl,
} from '../oauth-return';

const OAUTH_RETURN_KEY = 'oauth:returnTo';

function setLocation(
  pathname: string,
  search = '',
  hash = '',
  origin = 'http://localhost:5173',
) {
  Object.defineProperty(window, 'location', {
    value: { pathname, search, hash, origin },
    writable: true,
    configurable: true,
  });
}

describe('oauth-return', () => {
  beforeEach(() => {
    sessionStorage.clear();
    setLocation('/current-page');
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // getCurrentPathWithQuery
  // ---------------------------------------------------------------------------
  describe('getCurrentPathWithQuery', () => {
    it('returns pathname for a simple safe path', () => {
      setLocation('/workflows');
      expect(getCurrentPathWithQuery()).toBe('/workflows');
    });

    it('combines pathname + search + hash', () => {
      setLocation('/page', '?q=1', '#section');
      expect(getCurrentPathWithQuery()).toBe('/page?q=1#section');
    });

    it('returns default /workflows when pathname is empty', () => {
      setLocation('');
      expect(getCurrentPathWithQuery()).toBe('/workflows');
    });

    it('returns default /workflows when path has no leading slash', () => {
      setLocation('no-leading-slash');
      expect(getCurrentPathWithQuery()).toBe('/workflows');
    });

    it('returns default /workflows when path starts with //', () => {
      setLocation('//evil.com');
      expect(getCurrentPathWithQuery()).toBe('/workflows');
    });
  });

  // ---------------------------------------------------------------------------
  // rememberOAuthReturnTo
  // ---------------------------------------------------------------------------
  describe('rememberOAuthReturnTo', () => {
    it('stores a provided safe path in sessionStorage', () => {
      rememberOAuthReturnTo('/connections');
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBe('/connections');
    });

    it('stores path with search params', () => {
      rememberOAuthReturnTo('/page?from=email');
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBe('/page?from=email');
    });

    it('falls back to current path when no argument provided', () => {
      setLocation('/my-page');
      rememberOAuthReturnTo();
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBe('/my-page');
    });

    it('falls back to current path when provided path is unsafe (//)', () => {
      setLocation('/current-page');
      rememberOAuthReturnTo('//unsafe');
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBe('/current-page');
    });

    it('falls back to current path when provided path has no leading slash', () => {
      setLocation('/current-page');
      rememberOAuthReturnTo('relative/path');
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBe('/current-page');
    });
  });

  // ---------------------------------------------------------------------------
  // consumeRememberedOAuthReturnTo
  // ---------------------------------------------------------------------------
  describe('consumeRememberedOAuthReturnTo', () => {
    it('returns null when sessionStorage is empty', () => {
      expect(consumeRememberedOAuthReturnTo()).toBeNull();
    });

    it('returns the stored safe value', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored-path');
      expect(consumeRememberedOAuthReturnTo()).toBe('/stored-path');
    });

    it('removes the key from sessionStorage after consuming', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored-path');
      consumeRememberedOAuthReturnTo();
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBeNull();
    });

    it('returns null and clears if stored value has no leading slash', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, 'no-slash');
      expect(consumeRememberedOAuthReturnTo()).toBeNull();
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBeNull();
    });

    it('returns null and clears if stored value starts with //', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '//evil.com');
      expect(consumeRememberedOAuthReturnTo()).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // resolveOAuthReturnTo
  // ---------------------------------------------------------------------------
  describe('resolveOAuthReturnTo', () => {
    it('returns query param returnTo when it is a safe path', () => {
      const params = new URLSearchParams('returnTo=/from-query');
      expect(resolveOAuthReturnTo(params)).toBe('/from-query');
    });

    it('removes sessionStorage entry when query param is used', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored');
      const params = new URLSearchParams('returnTo=/from-query');
      resolveOAuthReturnTo(params);
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBeNull();
    });

    it('ignores unsafe query param and falls back to sessionStorage', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored-path');
      const params = new URLSearchParams('returnTo=//evil.com');
      expect(resolveOAuthReturnTo(params)).toBe('/stored-path');
    });

    it('falls back to default /workflows when no query param and no sessionStorage', () => {
      const params = new URLSearchParams();
      expect(resolveOAuthReturnTo(params)).toBe('/workflows');
    });

    it('uses the custom fallback when no query param and no sessionStorage', () => {
      const params = new URLSearchParams();
      expect(resolveOAuthReturnTo(params, '/dashboard')).toBe('/dashboard');
    });

    it('prefers sessionStorage over the default fallback when no query param', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored');
      const params = new URLSearchParams();
      expect(resolveOAuthReturnTo(params)).toBe('/stored');
    });

    it('removes sessionStorage after consuming it as fallback', () => {
      sessionStorage.setItem(OAUTH_RETURN_KEY, '/stored');
      const params = new URLSearchParams();
      resolveOAuthReturnTo(params);
      expect(sessionStorage.getItem(OAUTH_RETURN_KEY)).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // buildConnectorCallbackUrl
  // ---------------------------------------------------------------------------
  describe('buildConnectorCallbackUrl', () => {
    it('builds a URL with the correct origin and callback path', () => {
      setLocation('/current', '', '', 'http://localhost:5173');
      const url = buildConnectorCallbackUrl('/auth/google/callback');
      expect(url).toContain('http://localhost:5173/auth/google/callback');
    });

    it('sets mode=connector in the query string', () => {
      setLocation('/current', '', '', 'http://localhost:5173');
      const url = buildConnectorCallbackUrl('/auth/callback');
      expect(new URL(url).searchParams.get('mode')).toBe('connector');
    });

    it('sets returnTo to the current pathname', () => {
      setLocation('/workflows', '', '', 'http://localhost:5173');
      const url = buildConnectorCallbackUrl('/auth/callback');
      expect(new URL(url).searchParams.get('returnTo')).toBe('/workflows');
    });

    it('includes search and hash in the returnTo value', () => {
      setLocation('/page', '?tab=2', '#anchor', 'http://localhost:5173');
      const url = buildConnectorCallbackUrl('/auth/callback');
      expect(new URL(url).searchParams.get('returnTo')).toBe('/page?tab=2#anchor');
    });
  });
});
