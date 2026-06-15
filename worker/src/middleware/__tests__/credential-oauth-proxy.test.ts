/**
 * Unit tests for credential-oauth-proxy.ts (Phase 3)
 */

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

if (!AbortSignal.timeout) {
  (AbortSignal as any).timeout = (_ms: number) => new AbortController().signal;
}

function makeReq(overrides: Partial<any> = {}): any {
  return {
    method: 'GET',
    path: '/api/oauth/google/start',
    query: { user_id: 'user-abc', redirect_to: '/workflows' },
    headers: {},
    body: {},
    user: { id: 'user-abc' },
    ...overrides,
  };
}

function makeRes(): any {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
}

function fakeResponse(overrides: { status?: number; body?: string; headers?: Record<string, string> } = {}): any {
  // Build a Map-based headers object — do NOT spread raw overrides.headers (plain obj has no .entries())
  const { headers: headersInput, body, status = 200 } = overrides;
  const headersMap = new Map<string, string>(Object.entries(headersInput ?? {}));
  return {
    status,
    headers: {
      get: (k: string) => headersMap.get(k.toLowerCase()) ?? null,
      entries: () => headersMap.entries(),
    },
    text: jest.fn().mockResolvedValue(body ?? '{}'),
  };
}

// ─── Flag disabled ────────────────────────────────────────────────────────────

describe('credential-oauth-proxy — OAUTH_ENABLED=false (default)', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED;
    mockFetch.mockReset();
  });

  it('isOAuthProviderMigrated returns false for any provider', async () => {
    const { isOAuthProviderMigrated } = await import('../credential-oauth-proxy');
    expect(isOAuthProviderMigrated('google')).toBe(false);
    expect(isOAuthProviderMigrated('linkedin')).toBe(false);
  });

  it('proxyToCredentialService calls next() without fetching when disabled', async () => {
    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq();
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// ─── Flag enabled ─────────────────────────────────────────────────────────────

describe('credential-oauth-proxy — OAUTH_ENABLED=true', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED = 'true';
    process.env.CREDENTIAL_SERVICE_URL = 'http://localhost:3004';
    process.env.CREDENTIAL_SERVICE_KEY = 'test-key';
    process.env.CREDENTIAL_SERVICE_OAUTH_PROVIDERS = 'google,github,linkedin,salesforce';
    mockFetch.mockReset();
  });

  afterEach(() => {
    delete process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED;
    delete process.env.CREDENTIAL_SERVICE_URL;
    delete process.env.CREDENTIAL_SERVICE_KEY;
    delete process.env.CREDENTIAL_SERVICE_OAUTH_PROVIDERS;
  });

  it('isOAuthProviderMigrated true for listed provider', async () => {
    const { isOAuthProviderMigrated } = await import('../credential-oauth-proxy');
    expect(isOAuthProviderMigrated('google')).toBe(true);
    expect(isOAuthProviderMigrated('github')).toBe(true);
  });

  it('isOAuthProviderMigrated false for provider not in list', async () => {
    const { isOAuthProviderMigrated } = await import('../credential-oauth-proxy');
    expect(isOAuthProviderMigrated('slack')).toBe(false);
    expect(isOAuthProviderMigrated('hubspot')).toBe(false);
  });

  it('proxy forwards to service and returns JSON response', async () => {
    mockFetch.mockResolvedValue(fakeResponse({
      status: 200,
      body: '{"authorizationUrl":"https://accounts.google.com/o/oauth2/v2/auth?state=abc"}',
      headers: { 'content-type': 'application/json' },
    }));

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq();
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:3004/oauth/google/start'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-service-key': 'test-key',
          'x-user-id': 'user-abc',
        }),
      }),
    );
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('proxy forwards 302 redirect to browser', async () => {
    mockFetch.mockResolvedValue(fakeResponse({
      status: 302,
      headers: {
        'content-type': 'text/html',
        location: 'https://accounts.google.com/o/oauth2/v2/auth?state=xyz',
      },
    }));

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq();
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith(302, 'https://accounts.google.com/o/oauth2/v2/auth?state=xyz');
    expect(next).not.toHaveBeenCalled();
  });

  it('proxy translates /api/oauth/* → /oauth/* on service', async () => {
    mockFetch.mockResolvedValue(fakeResponse({ body: '<html>relay</html>', headers: { 'content-type': 'text/html' } }));

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq({ path: '/api/oauth/linkedin/callback', query: { code: 'c', state: 's' } });
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    const [calledUrl] = mockFetch.mock.calls[0] as [string];
    expect(calledUrl).toContain('/oauth/linkedin/callback');
    expect(calledUrl).not.toContain('/api/');
  });

  it('proxy translates /api/credential-connections/oauth/start (migrated type) → /oauth/generic/start', async () => {
    mockFetch.mockResolvedValue(fakeResponse({ body: '{}' }));

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    // google_oauth2 maps to 'google' which is in the test providers list
    const req = makeReq({
      path: '/api/credential-connections/oauth/start',
      query: { credentialTypeId: 'google_oauth2' },
    });
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    const [calledUrl] = mockFetch.mock.calls[0] as [string];
    expect(calledUrl).toContain('/oauth/generic/start');
  });

  it('generic start with non-migrated type calls next() (no proxy)', async () => {
    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq({
      path: '/api/credential-connections/oauth/start',
      query: { credentialTypeId: 'dropbox_oauth2' },
    });
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('generic callback always calls next() (local handler processes)', async () => {
    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq({ path: '/api/credential-connections/oauth/callback', query: { code: 'c', state: 's' } });
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('proxy calls next() on fetch error (service down)', async () => {
    mockFetch.mockRejectedValue(new Error('ECONNREFUSED'));

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq();
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('proxy calls next() on AbortError (timeout)', async () => {
    const err = new Error('The operation was aborted');
    err.name = 'AbortError';
    mockFetch.mockRejectedValue(err);

    const { proxyToCredentialService } = await import('../credential-oauth-proxy');
    const req = makeReq();
    const res = makeRes();
    const next = jest.fn();

    await proxyToCredentialService(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

// ─── Proxy disabled even when enabled if provider not in list ─────────────────

describe('credential-oauth-proxy — provider not in list always falls back', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED = 'true';
    process.env.CREDENTIAL_SERVICE_OAUTH_PROVIDERS = 'google';
    mockFetch.mockReset();
  });

  afterEach(() => {
    delete process.env.CREDENTIAL_SERVICE_OAUTH_ENABLED;
    delete process.env.CREDENTIAL_SERVICE_OAUTH_PROVIDERS;
  });

  it('isOAuthProviderMigrated false for unlisted provider', async () => {
    const { isOAuthProviderMigrated } = await import('../credential-oauth-proxy');
    expect(isOAuthProviderMigrated('linkedin')).toBe(false);
    expect(isOAuthProviderMigrated('slack')).toBe(false);
  });
});
