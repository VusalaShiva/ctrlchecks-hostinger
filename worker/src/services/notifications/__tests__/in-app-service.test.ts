/**
 * Unit tests for in-app-service.ts
 * notification-service-client is mocked — no real HTTP calls.
 */

const mockSendInAppRemote = jest.fn().mockResolvedValue(null);
const mockShouldUseNotificationService = jest.fn().mockReturnValue(false);
jest.mock('../../notification-service-client', () => ({
  shouldUseNotificationService: (...args: unknown[]) => mockShouldUseNotificationService(...args),
  sendInAppRemote: (...args: unknown[]) => mockSendInAppRemote(...args),
}));

import {
  sendInAppExecutionCompleted,
  sendInAppExecutionFailed,
} from '../../in-app-service';

describe('in-app-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShouldUseNotificationService.mockReturnValue(false);
    mockSendInAppRemote.mockResolvedValue(null);
  });

  describe('sendInAppExecutionCompleted', () => {
    it('is a no-op when canary is off (default)', async () => {
      await sendInAppExecutionCompleted('user-1', 'My WF', 'exec-abc');
      expect(mockSendInAppRemote).not.toHaveBeenCalled();
    });

    it('delegates to notification-service when canary is on', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendInAppRemote.mockResolvedValue({ notificationId: 'ntf-1', status: 'sent', channel: 'in_app' });

      await sendInAppExecutionCompleted('user-1', 'My WF', 'exec-abc');

      expect(mockSendInAppRemote).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({
          title: expect.stringContaining('My WF'),
          message: expect.stringContaining('exec-abc'),
          type: 'execution_completed',
          link: '/executions/exec-abc',
        }),
      );
    });

    it('does not throw when notification-service returns null', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendInAppRemote.mockResolvedValue(null);
      await expect(
        sendInAppExecutionCompleted('user-1', 'WF', 'exec-1'),
      ).resolves.toBeUndefined();
    });

    it('does not throw when notification-service rejects', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendInAppRemote.mockRejectedValueOnce(new Error('network error'));
      await expect(
        sendInAppExecutionCompleted('user-1', 'WF', 'exec-1'),
      ).resolves.toBeUndefined();
    });
  });

  describe('sendInAppExecutionFailed', () => {
    it('is a no-op when canary is off', async () => {
      await sendInAppExecutionFailed('user-1', 'My WF', 'Timeout');
      expect(mockSendInAppRemote).not.toHaveBeenCalled();
    });

    it('delegates with truncated error message when canary is on', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendInAppRemote.mockResolvedValue({ notificationId: 'ntf-2', status: 'sent', channel: 'in_app' });

      const longError = 'x'.repeat(300);
      await sendInAppExecutionFailed('user-1', 'My WF', longError);

      expect(mockSendInAppRemote).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({
          title: expect.stringContaining('My WF'),
          type: 'execution_failed',
        }),
      );
      const call = mockSendInAppRemote.mock.calls[0][1];
      expect(call.message.length).toBeLessThanOrEqual(200);
    });

    it('does not throw when notification-service rejects', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendInAppRemote.mockRejectedValueOnce(new Error('network error'));
      await expect(
        sendInAppExecutionFailed('user-1', 'WF', 'err'),
      ).resolves.toBeUndefined();
    });
  });
});
