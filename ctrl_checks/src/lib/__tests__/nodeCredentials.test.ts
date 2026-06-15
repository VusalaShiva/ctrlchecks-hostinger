import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getNodeCredentials, hasNodeCredentials, getLinkedInCredentials } from '../nodeCredentials';

const mockGetCredentials = vi.hoisted(() => vi.fn());

vi.mock('../credentials', () => ({
  getCredentials: mockGetCredentials,
}));

describe('getNodeCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns credentials for linkedin', async () => {
    const creds = { accessToken: 'tok', accountType: 'profile' };
    mockGetCredentials.mockResolvedValue(creds);
    await expect(getNodeCredentials('linkedin')).resolves.toEqual(creds);
    expect(mockGetCredentials).toHaveBeenCalledWith('linkedin');
  });

  it('returns credentials for google', async () => {
    const creds = { connected: true, accessToken: 'goog-tok' };
    mockGetCredentials.mockResolvedValue(creds);
    await expect(getNodeCredentials('google')).resolves.toEqual(creds);
    expect(mockGetCredentials).toHaveBeenCalledWith('google');
  });

  it('returns null and logs error when getCredentials throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockGetCredentials.mockRejectedValue(new Error('DB failure'));
    await expect(getNodeCredentials('linkedin')).resolves.toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('hasNodeCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when credentials exist', async () => {
    mockGetCredentials.mockResolvedValue({ accessToken: 'tok', accountType: 'profile' });
    await expect(hasNodeCredentials('linkedin')).resolves.toBe(true);
  });

  it('returns false when credentials are null', async () => {
    mockGetCredentials.mockResolvedValue(null);
    await expect(hasNodeCredentials('google')).resolves.toBe(false);
  });
});

describe('getLinkedInCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when getNodeCredentials returns null', async () => {
    mockGetCredentials.mockResolvedValue(null);
    await expect(getLinkedInCredentials()).resolves.toBeNull();
  });

  it('returns null when credentials missing accessToken', async () => {
    mockGetCredentials.mockResolvedValue({ accountType: 'profile' });
    await expect(getLinkedInCredentials()).resolves.toBeNull();
  });

  it('returns null when credentials missing accountType', async () => {
    mockGetCredentials.mockResolvedValue({ accessToken: 'tok' });
    await expect(getLinkedInCredentials()).resolves.toBeNull();
  });

  it('returns typed credentials for profile account', async () => {
    const creds = { accessToken: 'tok', accountType: 'profile' };
    mockGetCredentials.mockResolvedValue(creds);
    await expect(getLinkedInCredentials()).resolves.toEqual(creds);
  });

  it('returns typed credentials with organizationId for org account', async () => {
    const creds = { accessToken: 'tok', accountType: 'organization', organizationId: 'org-123' };
    mockGetCredentials.mockResolvedValue(creds);
    await expect(getLinkedInCredentials()).resolves.toEqual(creds);
  });
});
