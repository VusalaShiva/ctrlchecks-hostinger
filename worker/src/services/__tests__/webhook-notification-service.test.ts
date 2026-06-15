/**
 * Unit tests for webhook-notification-service.ts
 * notification-service-client is mocked — no real HTTP calls.
 */

const mockSendWebhookRemote = jest.fn().mockResolvedValue(null);
const mockShouldUseNotificationService = jest.fn().mockReturnValue(false);
jest.mock('../notification-service-client', () => ({
  shouldUseNotificationService: (...args: unknown[]) => mockShouldUseNotificationService(...args),
  sendWebhookRemote: (...args: unknown[]) => mockSendWebhookRemote(...args),
}));

import {
  sendWebhookExecutionCompleted,
  sendWebhookExecutionFailed,
} from '../webhook-notification-service';

const WEBHOOK_URL = 'https://example.com/my-hook';

describe('webhook-notification-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShouldUseNotificationService.mockReturnValue(false);
    mockSendWebhookRemote.mockResolvedValue(null);
  });

  describe('sendWebhookExecutionCompleted', () => {
    it('is a no-op when webhookUrl is null', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      await sendWebhookExecutionCompleted('user-1', null, 'WF', 'exec-1');
      expect(mockSendWebhookRemote).not.toHaveBeenCalled();
    });

    it('is a no-op when canary is off', async () => {
      await sendWebhookExecutionCompleted('user-1', WEBHOOK_URL, 'WF', 'exec-1');
      expect(mockSendWebhookRemote).not.toHaveBeenCalled();
    });

    it('delegates to sendWebhookRemote when canary is on and URL is set', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendWebhookRemote.mockResolvedValue({ notificationId: 'wh-1', status: 'sent', channel: 'webhook' });

      await sendWebhookExecutionCompleted('user-1', WEBHOOK_URL, 'My WF', 'exec-abc');

      expect(mockSendWebhookRemote).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({
          url: WEBHOOK_URL,
          event: 'execution.completed',
          payload: expect.objectContaining({ workflowName: 'My WF', executionId: 'exec-abc' }),
        }),
      );
    });

    it('does not throw when remote rejects', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendWebhookRemote.mockRejectedValueOnce(new Error('network'));
      await expect(
        sendWebhookExecutionCompleted('user-1', WEBHOOK_URL, 'WF', 'exec-1'),
      ).resolves.toBeUndefined();
    });
  });

  describe('sendWebhookExecutionFailed', () => {
    it('is a no-op when webhookUrl is undefined', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      await sendWebhookExecutionFailed('user-1', undefined, 'WF', 'Timeout');
      expect(mockSendWebhookRemote).not.toHaveBeenCalled();
    });

    it('truncates error to 500 chars', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendWebhookRemote.mockResolvedValue({ notificationId: 'wh-2', status: 'sent', channel: 'webhook' });

      await sendWebhookExecutionFailed('user-1', WEBHOOK_URL, 'WF', 'x'.repeat(600));

      const call = mockSendWebhookRemote.mock.calls[0][1];
      expect(call.payload.error.length).toBeLessThanOrEqual(500);
    });

    it('does not throw when remote rejects', async () => {
      mockShouldUseNotificationService.mockReturnValue(true);
      mockSendWebhookRemote.mockRejectedValueOnce(new Error('network'));
      await expect(
        sendWebhookExecutionFailed('user-1', WEBHOOK_URL, 'WF', 'err'),
      ).resolves.toBeUndefined();
    });
  });
});
