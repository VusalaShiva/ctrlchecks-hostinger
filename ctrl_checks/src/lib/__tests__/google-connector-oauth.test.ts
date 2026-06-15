import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/lib/api/getBackendUrl', () => ({ getBackendUrl: vi.fn() }));
vi.mock('@/lib/oauth-return', () => ({
  getCurrentPathWithQuery: vi.fn(),
  rememberOAuthReturnTo: vi.fn(),
}));

import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { getCurrentPathWithQuery, rememberOAuthReturnTo } from '@/lib/oauth-return';
import {
  buildConnectorOAuthStartUrl,
  buildGoogleConnectorOAuthStartUrl,
  startConnectorOAuth,
  startGoogleConnectorOAuth,
} from '@/lib/google-connector-oauth';

const BACKEND = 'http://localhost:3001';
const USER_ID = 'user-abc';
const CURRENT_PATH = '/current-page';

function setLocationHref(): { href: string } {
  const mock = { href: '' };
  Object.defineProperty(window, 'location', {
    value: mock,
    writable: true,
    configurable: true,
  });
  return mock;
}

describe('google-connector-oauth', () => {
  beforeEach(() => {
    vi.mocked(getBackendUrl).mockReturnValue(BACKEND);
    vi.mocked(getCurrentPathWithQuery).mockReturnValue(CURRENT_PATH);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------------
  // buildConnectorOAuthStartUrl
  // ---------------------------------------------------------------------------
  describe('buildConnectorOAuthStartUrl', () => {
    it('throws when userId is empty', () => {
      expect(() =>
        buildConnectorOAuthStartUrl('google', '', '/return', BACKEND)
      ).toThrow('User id is required to connect google.');
    });

    it('includes the provider in the URL path', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '/return', BACKEND);
      expect(url).toContain('/api/oauth/google/start');
    });

    it('sets the user_id query param', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '/return', BACKEND);
      expect(new URL(url).searchParams.get('user_id')).toBe(USER_ID);
    });

    it('uses a safe returnTo as redirect_to', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '/dashboard', BACKEND);
      expect(new URL(url).searchParams.get('redirect_to')).toBe('/dashboard');
    });

    it('falls back to /workflows when returnTo starts with //', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '//evil.com', BACKEND);
      expect(new URL(url).searchParams.get('redirect_to')).toBe('/workflows');
    });

    it('falls back to /workflows when returnTo is an empty string', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '', BACKEND);
      expect(new URL(url).searchParams.get('redirect_to')).toBe('/workflows');
    });

    it('uses the provided backendUrl as the URL origin', () => {
      const url = buildConnectorOAuthStartUrl('google', USER_ID, '/return', 'https://api.example.com');
      expect(new URL(url).origin).toBe('https://api.example.com');
    });

    it('builds a URL for the linkedin provider', () => {
      const url = buildConnectorOAuthStartUrl('linkedin', USER_ID, '/return', BACKEND);
      expect(url).toContain('/api/oauth/linkedin/start');
    });

    it('builds a URL for the github provider', () => {
      const url = buildConnectorOAuthStartUrl('github', USER_ID, '/return', BACKEND);
      expect(url).toContain('/api/oauth/github/start');
    });
  });

  // ---------------------------------------------------------------------------
  // buildGoogleConnectorOAuthStartUrl
  // ---------------------------------------------------------------------------
  describe('buildGoogleConnectorOAuthStartUrl', () => {
    it('uses the google provider in the URL path', () => {
      const url = buildGoogleConnectorOAuthStartUrl(USER_ID, '/return', BACKEND);
      expect(url).toContain('/api/oauth/google/start');
    });

    it('passes userId and returnTo through to the URL params', () => {
      const url = buildGoogleConnectorOAuthStartUrl(USER_ID, '/sheets', BACKEND);
      const params = new URL(url).searchParams;
      expect(params.get('user_id')).toBe(USER_ID);
      expect(params.get('redirect_to')).toBe('/sheets');
    });

    it('defaults returnTo to getCurrentPathWithQuery() when omitted', () => {
      const url = buildGoogleConnectorOAuthStartUrl(USER_ID, undefined, BACKEND);
      expect(new URL(url).searchParams.get('redirect_to')).toBe(CURRENT_PATH);
    });
  });

  // ---------------------------------------------------------------------------
  // startConnectorOAuth
  // ---------------------------------------------------------------------------
  describe('startConnectorOAuth', () => {
    let locationMock: { href: string };

    beforeEach(() => {
      locationMock = setLocationHref();
    });

    it('calls rememberOAuthReturnTo with the safe returnTo', () => {
      startConnectorOAuth('google', USER_ID, '/dashboard');
      expect(vi.mocked(rememberOAuthReturnTo)).toHaveBeenCalledWith('/dashboard');
    });

    it('sets window.location.href to the built start URL', () => {
      startConnectorOAuth('google', USER_ID, '/dashboard');
      expect(locationMock.href).toContain('/api/oauth/google/start');
      expect(locationMock.href).toContain(`user_id=${USER_ID}`);
    });

    it('uses getCurrentPathWithQuery when returnTo starts with //', () => {
      startConnectorOAuth('google', USER_ID, '//evil.com');
      expect(vi.mocked(rememberOAuthReturnTo)).toHaveBeenCalledWith(CURRENT_PATH);
    });

    it('uses getCurrentPathWithQuery when returnTo is absent', () => {
      startConnectorOAuth('google', USER_ID);
      expect(vi.mocked(rememberOAuthReturnTo)).toHaveBeenCalledWith(CURRENT_PATH);
    });
  });

  // ---------------------------------------------------------------------------
  // startGoogleConnectorOAuth
  // ---------------------------------------------------------------------------
  describe('startGoogleConnectorOAuth', () => {
    let locationMock: { href: string };

    beforeEach(() => {
      locationMock = setLocationHref();
    });

    it('navigates to a google OAuth start URL', () => {
      startGoogleConnectorOAuth(USER_ID, '/calendar');
      expect(locationMock.href).toContain('/api/oauth/google/start');
    });

    it('includes userId and returnTo in the navigation URL', () => {
      startGoogleConnectorOAuth(USER_ID, '/drive');
      expect(locationMock.href).toContain(`user_id=${USER_ID}`);
      expect(locationMock.href).toContain('redirect_to=');
    });
  });
});
