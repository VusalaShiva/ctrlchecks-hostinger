import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  buildConnectionStartUrl,
  credentialVaultType,
  fetchConnectionCatalog,
  fetchConnectionStatuses,
  type ConnectionCatalogEntry,
  type CatalogAuthType,
} from '../connections-catalog';

vi.mock('@/lib/api/getBackendUrl', () => ({
  getBackendUrl: vi.fn(() => 'http://localhost:3001'),
}));

vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

import { awsClient } from '@/integrations/aws/client';

function makeEntry(overrides: Partial<ConnectionCatalogEntry> = {}): ConnectionCatalogEntry {
  return {
    provider: 'test',
    vaultKey: 'test_key',
    displayName: 'Test Provider',
    authType: 'oauth',
    credentialFields: [],
    nodeTypes: [],
    connectorIds: [],
    scopes: [],
    requiredEnv: [],
    configured: true,
    oauthImplemented: true,
    flow: 'backend_redirect',
    connectUrl: '/api/oauth/test/authorize',
    ...overrides,
  };
}

// ── buildConnectionStartUrl ──────────────────────────────────────────────────

describe('buildConnectionStartUrl', () => {
  it('returns null when entry has no connectUrl', () => {
    const entry = makeEntry({ connectUrl: undefined });
    expect(buildConnectionStartUrl(entry, 'user-1')).toBeNull();
  });

  it('backend_redirect: sets user_id and redirect_to params', () => {
    const entry = makeEntry({ flow: 'backend_redirect' });
    const result = buildConnectionStartUrl(entry, 'user-123', '/connections');
    const url = new URL(result!);
    expect(url.searchParams.get('user_id')).toBe('user-123');
    expect(url.searchParams.get('redirect_to')).toBe('/connections');
  });

  it('backend_redirect: defaults returnTo to /dashboard', () => {
    const entry = makeEntry({ flow: 'backend_redirect' });
    const result = buildConnectionStartUrl(entry, 'user-123');
    const url = new URL(result!);
    expect(url.searchParams.get('redirect_to')).toBe('/dashboard');
  });

  it('frontend_code_exchange: sets redirect_uri when callbackUrl present', () => {
    const entry = makeEntry({
      flow: 'frontend_code_exchange',
      callbackUrl: 'http://localhost:5173/auth/test/callback',
    });
    const result = buildConnectionStartUrl(entry, 'user-123');
    const url = new URL(result!);
    expect(url.searchParams.get('redirect_uri')).toBe('http://localhost:5173/auth/test/callback');
  });

  it('frontend_code_exchange: does not set redirect_uri when callbackUrl absent', () => {
    const entry = makeEntry({ flow: 'frontend_code_exchange', callbackUrl: undefined });
    const result = buildConnectionStartUrl(entry, 'user-123');
    const url = new URL(result!);
    expect(url.searchParams.get('redirect_uri')).toBeNull();
  });

  it('existing_connection: adds no extra query params', () => {
    const entry = makeEntry({ flow: 'existing_connection' });
    const result = buildConnectionStartUrl(entry, 'user-123');
    const url = new URL(result!);
    expect(url.searchParams.get('user_id')).toBeNull();
    expect(url.searchParams.get('redirect_to')).toBeNull();
    expect(url.searchParams.get('redirect_uri')).toBeNull();
  });

  it('manual_token: adds no extra query params', () => {
    const entry = makeEntry({ flow: 'manual_token' });
    const result = buildConnectionStartUrl(entry, 'user-123');
    const url = new URL(result!);
    expect(url.searchParams.get('user_id')).toBeNull();
    expect(url.searchParams.get('redirect_uri')).toBeNull();
  });

  it('uses getBackendUrl as the URL base', () => {
    const entry = makeEntry({ flow: 'backend_redirect' });
    const result = buildConnectionStartUrl(entry, 'user-123');
    expect(result).toContain('http://localhost:3001');
  });

  it('resolves relative connectUrl against backend base', () => {
    const entry = makeEntry({ flow: 'existing_connection', connectUrl: '/api/oauth/test/authorize' });
    const result = buildConnectionStartUrl(entry, 'user-1');
    expect(result).toMatch(/^http:\/\/localhost:3001\/api\/oauth\/test\/authorize/);
  });
});

// ── credentialVaultType ──────────────────────────────────────────────────────

describe('credentialVaultType', () => {
  it.each([
    ['webhook', 'webhook_secret'],
    ['basic_auth', 'basic_auth'],
    ['manual_oauth_token', 'oauth_token'],
    ['api_key', 'api_key'],
    ['token', 'api_key'],
    ['oauth', 'custom'],
    ['runtime', 'custom'],
  ] as [CatalogAuthType, string][])('%s → %s', (authType, expected) => {
    expect(credentialVaultType(authType)).toBe(expected);
  });
});

// ── fetchConnectionCatalog ───────────────────────────────────────────────────

describe('fetchConnectionCatalog', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns connections array on success', async () => {
    const mockConnections = [{ provider: 'google', vaultKey: 'google' }];
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ connections: mockConnections }),
    } as Response);

    const result = await fetchConnectionCatalog();
    expect(result).toEqual(mockConnections);
  });

  it('returns empty array when connections key is missing', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await fetchConnectionCatalog();
    expect(result).toEqual([]);
  });

  it('throws when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(fetchConnectionCatalog()).rejects.toThrow('Failed to load connection catalog');
  });

  it('calls the catalog endpoint', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ connections: [] }),
    } as Response);

    await fetchConnectionCatalog();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      'http://localhost:3001/api/connections/catalog',
    );
  });
});

// ── fetchConnectionStatuses ──────────────────────────────────────────────────

describe('fetchConnectionStatuses', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns empty object when session has no token', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: { session: null },
    } as never);

    const result = await fetchConnectionStatuses();
    expect(result).toEqual({});
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it('returns empty object when session is undefined', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: {},
    } as never);

    const result = await fetchConnectionStatuses();
    expect(result).toEqual({});
  });

  it('returns connections map on success', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: { session: { access_token: 'tok-abc' } },
    } as never);
    const mockStatuses = { google: { provider: 'google', connected: true } };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ connections: mockStatuses }),
    } as Response);

    const result = await fetchConnectionStatuses();
    expect(result).toEqual(mockStatuses);
  });

  it('returns empty object when connections key is missing', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: { session: { access_token: 'tok-abc' } },
    } as never);
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await fetchConnectionStatuses();
    expect(result).toEqual({});
  });

  it('throws when response is not ok', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: { session: { access_token: 'tok-abc' } },
    } as never);
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(fetchConnectionStatuses()).rejects.toThrow('Failed to load connection statuses');
  });

  it('sends Authorization header with bearer token', async () => {
    vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
      data: { session: { access_token: 'my-token' } },
    } as never);
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ connections: {} }),
    } as Response);

    await fetchConnectionStatuses();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      'http://localhost:3001/api/connections/status',
      { headers: { Authorization: 'Bearer my-token' } },
    );
  });
});
