import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

vi.mock('aws-amplify', () => ({
  Amplify: { configure: vi.fn() },
}));

vi.mock('aws-amplify/auth', () => ({
  confirmSignUp: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  signUp: vi.fn(),
  signInWithRedirect: vi.fn(),
  resendSignUpCode: vi.fn(),
  fetchAuthSession: vi.fn(async () => ({
    tokens: {
      accessToken: {
        toString: () => 'access-token',
        payload: { exp: Math.floor(Date.now() / 1000) + 3600 },
      },
      idToken: {
        payload: { email: 'user@example.com', name: 'Test User' },
      },
    },
  })),
  getCurrentUser: vi.fn(async () => ({
    userId: 'user-1',
    signInDetails: { loginId: 'user@example.com' },
  })),
}));

vi.mock('aws-amplify/utils', () => ({
  Hub: { listen: vi.fn(() => vi.fn()) },
}));

describe('aws db-proxy client mutation chains', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: string, _init?: RequestInit) => ({
        ok: true,
        status: 200,
        json: async () => ({ data: { id: 'wf-1', name: 'Workflow' }, error: null }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('keeps insert(...).select().single() as POST', async () => {
    const { awsDb } = await import('../client');

    const { data, error } = await awsDb
      .from('workflows')
      .insert({ name: 'Workflow' })
      .select()
      .single();

    expect(error).toBeNull();
    expect(data?.id).toBe('wf-1');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/db/workflows'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('keeps update(...).eq(...).select().single() as PUT', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('workflows')
      .update({ name: 'Updated' })
      .eq('id', 'wf-1')
      .select()
      .single();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/db/workflows/wf-1'),
      expect.objectContaining({ method: 'PUT' }),
    );
  });

  it('sends filtered update(...).eq(non-id) as a query-filtered PUT instead of /undefined', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('profiles')
      .update({ email: 'user@example.com' })
      .eq('user_id', 'user-1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/db/profiles?filter_user_id=user-1'),
      expect.objectContaining({ method: 'PUT' }),
    );
    expect(String((fetch as any).mock.calls[0][0])).not.toContain('/undefined');
  });

  it('sends filtered delete().eq(non-id) as a query-filtered DELETE instead of /undefined', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('social_tokens')
      .delete()
      .eq('provider', 'github');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/db/social_tokens?filter_provider=github'),
      expect.objectContaining({ method: 'DELETE' }),
    );
    expect(String((fetch as any).mock.calls[0][0])).not.toContain('/undefined');
  });

  it('keeps upsert(...).select().single() as POST to the upsert route', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('profiles')
      .upsert({ user_id: 'user-1', full_name: 'Test User' }, { onConflict: 'user_id' })
      .select()
      .single();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/db/profiles/upsert'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('supports select().in() through the db proxy query contract', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('executions')
      .select('workflow_id, started_at, status')
      .in('workflow_id', ['wf-1', 'wf-2'])
      .order('started_at', { ascending: false });

    const url = new URL(String((fetch as any).mock.calls[0][0]));
    expect(url.pathname).toContain('/api/db/executions');
    expect(url.searchParams.get('in_workflow_id')).toBe(JSON.stringify(['wf-1', 'wf-2']));
    expect(url.searchParams.get('order_col')).toBe('started_at');
  });

  it('supports not(column, is, null) through the db proxy query contract', async () => {
    const { awsDb } = await import('../client');

    await awsDb
      .from('workflows')
      .select('*')
      .not('cron_expression', 'is', null);

    const url = new URL(String((fetch as any).mock.calls[0][0]));
    expect(url.pathname).toContain('/api/db/workflows');
    expect(url.searchParams.get('notnull_cron_expression')).toBe('true');
  });

  it('passes count-only select options through the db proxy query contract', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: [], count: 42, error: null }),
    } as any);
    const { awsDb } = await import('../client');

    const { count, data, error } = await awsDb
      .from('executions')
      .select('id', { count: 'exact' })
      .limit(0) as any;

    const url = new URL(String((fetch as any).mock.calls[0][0]));
    expect(url.pathname).toContain('/api/db/executions');
    expect(url.searchParams.get('count')).toBe('exact');
    expect(url.searchParams.get('limit')).toBe('0');
    expect(error).toBeNull();
    expect(data).toEqual([]);
    expect(count).toBe(42);
  });
});
