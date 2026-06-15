/**
 * Tests for SchedulerService.executeScheduledWorkflow canary delegation.
 *
 * When shouldUseTriggerService(workflowId) is true AND dispatchScheduleRemote
 * returns a non-null result, the local fetch path must NOT be called.
 * On null return or error, it falls back to the local fetch.
 */

const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

// Mock node-cron so no real cron jobs are registered during tests
jest.mock('node-cron', () => ({
  schedule: jest.fn().mockReturnValue({ stop: jest.fn() }),
}));

// Mock DB client so the scheduler can be imported without crashing
jest.mock('../../../core/database/aws-db-client', () => ({
  getDbClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      not: jest.fn().mockReturnThis(),
    }),
  }),
}));

// Mock trigger-service-client — canary off by default
jest.mock('../../trigger-service-client', () => ({
  shouldUseTriggerService: jest.fn().mockReturnValue(false),
  dispatchScheduleRemote: jest.fn().mockResolvedValue(null),
}));

import { schedulerService } from '../index';
import {
  shouldUseTriggerService,
  dispatchScheduleRemote,
} from '../../trigger-service-client';
import type { TriggerDispatchResult } from '../../trigger-service-client';

const mockShouldUse = shouldUseTriggerService as jest.MockedFunction<typeof shouldUseTriggerService>;
const mockDispatch = dispatchScheduleRemote as jest.MockedFunction<typeof dispatchScheduleRemote>;

const QUEUED: TriggerDispatchResult = {
  executionId: 'exec-sched-1',
  status: 'queued',
  workflowId: 'wf-sched',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockShouldUse.mockReturnValue(false);
  mockDispatch.mockResolvedValue(null);
  mockFetch.mockResolvedValue({ ok: true, text: async () => '' });
});

describe('SchedulerService.executeScheduledWorkflow — canary delegation', () => {
  it('does NOT call dispatchScheduleRemote when canary is false', async () => {
    mockShouldUse.mockReturnValue(false);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('calls local fetch when canary is false', async () => {
    mockShouldUse.mockReturnValue(false);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/execute-workflow'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('calls dispatchScheduleRemote when canary is true', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(QUEUED);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockDispatch).toHaveBeenCalledWith(
      'wf-sched',
      expect.objectContaining({ scheduledAt: expect.any(String) }),
    );
  });

  it('passes a valid ISO scheduledAt to dispatchScheduleRemote', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(QUEUED);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    const [, payload] = mockDispatch.mock.calls[0]!;
    expect(() => new Date(payload.scheduledAt!)).not.toThrow();
    expect(isNaN(Date.parse(payload.scheduledAt!))).toBe(false);
  });

  it('does NOT call local fetch when remote returns a result', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(QUEUED);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('falls back to local fetch when dispatchScheduleRemote returns null', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(null);
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/execute-workflow'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('falls back to local fetch when dispatchScheduleRemote throws', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    await schedulerService.executeScheduledWorkflow('wf-sched');
    expect(mockFetch).toHaveBeenCalled();
  });

  it('does not throw when local fetch fails (fire-and-forget outer catch)', async () => {
    mockShouldUse.mockReturnValue(false);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(schedulerService.executeScheduledWorkflow('wf-sched')).resolves.toBeUndefined();
  });

  it('does not throw when remote returns null and fetch fails', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(null);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(schedulerService.executeScheduledWorkflow('wf-sched')).resolves.toBeUndefined();
  });

  it('does not throw when remote succeeds (happy path)', async () => {
    mockShouldUse.mockReturnValue(true);
    mockDispatch.mockResolvedValueOnce(QUEUED);
    await expect(schedulerService.executeScheduledWorkflow('wf-sched')).resolves.toBeUndefined();
  });
});
