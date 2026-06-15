import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { LinkedInCredentials } from '../credentials';

const mocks = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
  mockGetCredentials: vi.fn(),
}));

vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: { getUser: mocks.mockGetUser },
    from: mocks.mockFrom,
  },
}));

vi.mock('../credentials', () => ({
  getCredentials: mocks.mockGetCredentials,
}));

import { updateLinkedInNodes, getNodeCredentials } from '../nodeConfiguration';

function makeChain(
  selectData: unknown,
  selectError: { message: string } | null = null,
  updateError: { message: string } | null = null,
) {
  const mockEqUpdate = vi.fn().mockResolvedValue({ error: updateError });
  const mockUpdate = vi.fn().mockReturnValue({ eq: mockEqUpdate });
  const mockEqSelect = vi.fn().mockResolvedValue({ data: selectData, error: selectError });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockEqSelect });
  mocks.mockFrom.mockReturnValue({ select: mockSelect, update: mockUpdate });
  return { mockUpdate, mockEqUpdate, mockSelect, mockEqSelect };
}

const BASE_CREDS: LinkedInCredentials = {
  accessToken: 'tok-123',
  accountType: 'profile',
};

const ORG_CREDS: LinkedInCredentials = {
  accessToken: 'tok-456',
  accountType: 'organization',
  organizationId: 'org-789',
};

describe('updateLinkedInNodes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when user is not authenticated', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: null } });
    await expect(updateLinkedInNodes(BASE_CREDS)).rejects.toThrow('User not authenticated');
  });

  it('returns early when workflows is an empty array', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([]);
    await updateLinkedInNodes(BASE_CREDS);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('returns early when workflows is null', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain(null);
    await updateLinkedInNodes(BASE_CREDS);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('throws when workflows fetch fails', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    makeChain(null, { message: 'DB error' });
    await expect(updateLinkedInNodes(BASE_CREDS)).rejects.toThrow('Failed to fetch workflows: DB error');
  });

  it('skips workflows with null nodes', async () => {
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: null }]);
    await updateLinkedInNodes(BASE_CREDS);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('updates node when node.data.type is linkedin', async () => {
    const node = { id: 'n1', type: 'other', data: { type: 'linkedin', config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [node] }]);

    await updateLinkedInNodes(BASE_CREDS);

    expect(mockUpdate).toHaveBeenCalledOnce();
    const updatedNodes = mockUpdate.mock.calls[0][0].nodes;
    expect(updatedNodes[0].data.config.accessToken).toBe('tok-123');
    expect(updatedNodes[0].data.config.configured).toBe(true);
  });

  it('updates node when node.type is linkedin', async () => {
    const node = { id: 'n1', type: 'linkedin', data: { config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [node] }]);

    await updateLinkedInNodes(BASE_CREDS);

    expect(mockUpdate).toHaveBeenCalledOnce();
    const updatedNodes = mockUpdate.mock.calls[0][0].nodes;
    expect(updatedNodes[0].data.config.accessToken).toBe('tok-123');
  });

  it('sets organizationId when accountType is organization', async () => {
    const node = { id: 'n1', type: 'linkedin', data: { config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [node] }]);

    await updateLinkedInNodes(ORG_CREDS);

    const updatedNodes = mockUpdate.mock.calls[0][0].nodes;
    expect(updatedNodes[0].data.config.organizationId).toBe('org-789');
    expect(updatedNodes[0].data.config.accountType).toBe('organization');
  });

  it('leaves organizationId undefined when accountType is profile', async () => {
    const node = { id: 'n1', type: 'linkedin', data: { config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [node] }]);

    await updateLinkedInNodes(BASE_CREDS);

    const updatedNodes = mockUpdate.mock.calls[0][0].nodes;
    expect(updatedNodes[0].data.config.organizationId).toBeUndefined();
  });

  it('does not call update when no LinkedIn nodes exist in workflow', async () => {
    const node = { id: 'n1', type: 'slack', data: { type: 'slack', config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [node] }]);

    await updateLinkedInNodes(BASE_CREDS);

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('resolves without throwing when update returns an error', async () => {
    const node = { id: 'n1', type: 'linkedin', data: { config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    makeChain([{ id: 'wf1', nodes: [node] }], null, { message: 'update failed' });

    await expect(updateLinkedInNodes(BASE_CREDS)).resolves.toBeUndefined();
  });

  it('preserves non-LinkedIn nodes unchanged while updating LinkedIn nodes', async () => {
    const slackNode = { id: 'n1', type: 'slack', data: { type: 'slack', config: { token: 'slack-tok' } } };
    const linkedInNode = { id: 'n2', type: 'linkedin', data: { config: {} } };
    mocks.mockGetUser.mockResolvedValue({ data: { user: { id: 'u1' } } });
    const { mockUpdate } = makeChain([{ id: 'wf1', nodes: [slackNode, linkedInNode] }]);

    await updateLinkedInNodes(BASE_CREDS);

    const updatedNodes = mockUpdate.mock.calls[0][0].nodes;
    expect(updatedNodes[0]).toEqual(slackNode);
    expect(updatedNodes[1].data.config.accessToken).toBe('tok-123');
  });
});

describe('getNodeCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('delegates to getCredentials with linkedin type and returns result', async () => {
    mocks.mockGetCredentials.mockResolvedValue({ accessToken: 'tok', accountType: 'profile' });
    const result = await getNodeCredentials('linkedin');
    expect(mocks.mockGetCredentials).toHaveBeenCalledWith('linkedin');
    expect(result).toEqual({ accessToken: 'tok', accountType: 'profile' });
  });

  it('delegates to getCredentials with google type and returns result', async () => {
    mocks.mockGetCredentials.mockResolvedValue({ connected: true, accessToken: 'g-tok' });
    const result = await getNodeCredentials('google');
    expect(mocks.mockGetCredentials).toHaveBeenCalledWith('google');
    expect(result).toEqual({ connected: true, accessToken: 'g-tok' });
  });

  it('returns null when getCredentials returns null', async () => {
    mocks.mockGetCredentials.mockResolvedValue(null);
    const result = await getNodeCredentials('linkedin');
    expect(result).toBeNull();
  });
});
