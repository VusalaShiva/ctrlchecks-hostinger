import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── module mocks ──────────────────────────────────────────────────────────────

vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: { getUser: vi.fn() },
    from: vi.fn(),
  },
}));

import { awsClient } from '@/integrations/aws/client';
import {
  saveCredentials,
  getCredentials,
  removeCredentials,
  saveWorkflowCredential,
  testLinkedInConnection,
} from '../credentials';

// ── helpers ───────────────────────────────────────────────────────────────────

function mockAuthUser(id = 'user-123') {
  vi.mocked(awsClient.auth.getUser).mockResolvedValue({
    data: { user: { id } },
  } as any);
}

function mockNoAuthUser() {
  vi.mocked(awsClient.auth.getUser).mockResolvedValue({
    data: { user: null },
  } as any);
}

function makeUpsertBuilder(error: any = null) {
  return { upsert: vi.fn().mockResolvedValue({ error }) } as any;
}

function makeSingleBuilder(data: any, error: any = null) {
  const builder = {
    select: vi.fn(),
    eq: vi.fn(),
    single: vi.fn().mockResolvedValue({ data, error }),
  };
  builder.select.mockReturnValue(builder);
  builder.eq.mockReturnValue(builder);
  return builder as any;
}

// delete chain: .delete().eq('user_id', id).eq('service', svc) → Promise<{error}>
function makeDeleteBuilder(error: any = null) {
  const innerEq = vi.fn().mockResolvedValue({ error });
  const outerEq = vi.fn().mockReturnValue({ eq: innerEq });
  return { delete: vi.fn().mockReturnValue({ eq: outerEq }) } as any;
}

// ── setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── saveCredentials ───────────────────────────────────────────────────────────

describe('saveCredentials', () => {
  it('throws when user is not authenticated', async () => {
    mockNoAuthUser();
    await expect(saveCredentials('linkedin', { accessToken: 'tok', accountType: 'profile' }))
      .rejects.toThrow('User not authenticated');
  });

  it('upserts credentials for authenticated user without error', async () => {
    mockAuthUser('u-1');
    const builder = makeUpsertBuilder(null);
    vi.mocked(awsClient.from).mockReturnValue(builder);

    await expect(saveCredentials('linkedin', { accessToken: 'tok', accountType: 'profile' }))
      .resolves.toBeUndefined();

    expect(awsClient.from).toHaveBeenCalledWith('user_credentials');
    expect(builder.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: 'u-1', service: 'linkedin' }),
      { onConflict: 'user_id,service' }
    );
  });

  it('normalizes service name to lowercase', async () => {
    mockAuthUser();
    const builder = makeUpsertBuilder(null);
    vi.mocked(awsClient.from).mockReturnValue(builder);

    await saveCredentials('LinkedIn', { accessToken: 'tok', accountType: 'profile' });

    expect(builder.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'linkedin' }),
      expect.any(Object)
    );
  });

  it('throws on DB upsert error', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from).mockReturnValue(makeUpsertBuilder({ message: 'upsert failed' }));

    await expect(saveCredentials('google', { connected: true }))
      .rejects.toThrow('Failed to save google credentials: upsert failed');
  });
});

// ── getCredentials ────────────────────────────────────────────────────────────

describe('getCredentials', () => {
  it('returns null when user is not authenticated', async () => {
    mockNoAuthUser();
    expect(await getCredentials('linkedin')).toBeNull();
  });

  it('returns credentials data when found', async () => {
    mockAuthUser();
    const creds = { accessToken: 'tok', accountType: 'profile' };
    vi.mocked(awsClient.from).mockReturnValue(
      makeSingleBuilder({ credentials: creds })
    );

    expect(await getCredentials('linkedin')).toEqual(creds);
  });

  it('returns null on PGRST116 (no row found)', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from).mockReturnValue(
      makeSingleBuilder(null, { code: 'PGRST116', message: 'not found' })
    );

    expect(await getCredentials('google')).toBeNull();
  });

  it('returns null on any other DB error', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from).mockReturnValue(
      makeSingleBuilder(null, { code: 'OTHER', message: 'server error' })
    );

    expect(await getCredentials('linkedin')).toBeNull();
  });

  it('queries with correct user_id and service filters', async () => {
    mockAuthUser('u-42');
    const builder = makeSingleBuilder({ credentials: {} });
    vi.mocked(awsClient.from).mockReturnValue(builder);

    await getCredentials('google');

    expect(builder.eq).toHaveBeenCalledWith('user_id', 'u-42');
    expect(builder.eq).toHaveBeenCalledWith('service', 'google');
  });
});

// ── removeCredentials ─────────────────────────────────────────────────────────

describe('removeCredentials', () => {
  it('throws when user is not authenticated', async () => {
    mockNoAuthUser();
    await expect(removeCredentials('linkedin')).rejects.toThrow('User not authenticated');
  });

  it('deletes credentials for authenticated user without error', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from).mockReturnValue(makeDeleteBuilder(null));

    await expect(removeCredentials('linkedin')).resolves.toBeUndefined();
  });

  it('throws on DB delete error', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from).mockReturnValue(makeDeleteBuilder({ message: 'delete failed' }));

    await expect(removeCredentials('google'))
      .rejects.toThrow('Failed to remove google credentials: delete failed');
  });
});

// ── saveWorkflowCredential — service name normalization ───────────────────────

describe('saveWorkflowCredential — service name normalization', () => {
  async function captureService(credentialName: string): Promise<string> {
    mockAuthUser();
    const mockUpsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(awsClient.from)
      .mockReturnValueOnce(makeSingleBuilder(null))
      .mockReturnValueOnce({ upsert: mockUpsert } as any);

    await saveWorkflowCredential(credentialName, 'val');

    const upsertArg = mockUpsert.mock.calls[0][0] as { service: string };
    return upsertArg.service;
  }

  it('SLACK_WEBHOOK_URL → slack (strips _webhook_url)', async () => {
    expect(await captureService('SLACK_WEBHOOK_URL')).toBe('slack');
  });

  it('GITHUB_TOKEN → github (strips _token)', async () => {
    expect(await captureService('GITHUB_TOKEN')).toBe('github');
  });

  it('OPENAI_API_KEY → openai (strips _api_key)', async () => {
    expect(await captureService('OPENAI_API_KEY')).toBe('openai');
  });

  it('DATABASE_URL → database (strips _url)', async () => {
    expect(await captureService('DATABASE_URL')).toBe('database');
  });

  it('SMTP_HOST → smtp (splits on underscore when no suffix matches)', async () => {
    expect(await captureService('SMTP_HOST')).toBe('smtp');
  });

  it('SENDGRID_API_KEY → sendgrid (strips _api_key)', async () => {
    expect(await captureService('SENDGRID_API_KEY')).toBe('sendgrid');
  });
});

// ── saveWorkflowCredential — behavior ─────────────────────────────────────────

describe('saveWorkflowCredential — behavior', () => {
  it('throws when user is not authenticated', async () => {
    mockNoAuthUser();
    await expect(saveWorkflowCredential('SLACK_TOKEN', 'tok'))
      .rejects.toThrow('User not authenticated');
  });

  it('merges new credential with existing credentials', async () => {
    mockAuthUser('u-1');
    const mockUpsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(awsClient.from)
      .mockReturnValueOnce(
        makeSingleBuilder({ credentials: { existing_key: 'existing_val' } })
      )
      .mockReturnValueOnce({ upsert: mockUpsert } as any);

    await saveWorkflowCredential('SLACK_TOKEN', 'new_token');

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: expect.objectContaining({
          existing_key: 'existing_val',
          slack_token: 'new_token',
        }),
      }),
      expect.any(Object)
    );
  });

  it('starts with empty credentials when no existing row', async () => {
    mockAuthUser('u-1');
    const mockUpsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(awsClient.from)
      .mockReturnValueOnce(makeSingleBuilder(null))
      .mockReturnValueOnce({ upsert: mockUpsert } as any);

    await saveWorkflowCredential('GITHUB_TOKEN', 'ghp_tok');

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({ credentials: { github_token: 'ghp_tok' } }),
      expect.any(Object)
    );
  });

  it('throws when upsert returns a DB error', async () => {
    mockAuthUser();
    vi.mocked(awsClient.from)
      .mockReturnValueOnce(makeSingleBuilder(null))
      .mockReturnValueOnce({
        upsert: vi.fn().mockResolvedValue({ error: { message: 'upsert failed' } }),
      } as any);

    await expect(saveWorkflowCredential('SLACK_TOKEN', 'tok'))
      .rejects.toThrow('Failed to save SLACK_TOKEN: upsert failed');
  });
});

// ── testLinkedInConnection ────────────────────────────────────────────────────

describe('testLinkedInConnection', () => {
  it('returns true when LinkedIn API responds with ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    expect(await testLinkedInConnection('valid-token')).toBe(true);
  });

  it('returns false when LinkedIn API responds with not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    expect(await testLinkedInConnection('expired-token')).toBe(false);
  });

  it('returns false when fetch throws a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
    expect(await testLinkedInConnection('any-token')).toBe(false);
  });
});
