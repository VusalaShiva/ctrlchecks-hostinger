/**
 * Unit tests for trigger-service-client.ts (Phase 1).
 * All remote methods return null when service is disabled.
 * fetch is never called in Phase 1.
 */

const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

import {
  isTriggerServiceEnabled,
  getTriggerCanaryPercent,
  shouldUseTriggerService,
  dispatchWebhookRemote,
  dispatchFormRemote,
  dispatchChatRemote,
  dispatchScheduleRemote,
} from '../trigger-service-client';

describe('trigger-service-client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.TRIGGER_SERVICE_ENABLED;
    delete process.env.TRIGGER_SERVICE_CANARY_PERCENT;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('isTriggerServiceEnabled', () => {
    it('returns false when TRIGGER_SERVICE_ENABLED is not set', () => {
      expect(isTriggerServiceEnabled()).toBe(false);
    });

    it('returns false when TRIGGER_SERVICE_ENABLED=false', () => {
      process.env.TRIGGER_SERVICE_ENABLED = 'false';
      expect(isTriggerServiceEnabled()).toBe(false);
    });

    it('returns true when TRIGGER_SERVICE_ENABLED=true', () => {
      process.env.TRIGGER_SERVICE_ENABLED = 'true';
      expect(isTriggerServiceEnabled()).toBe(true);
    });
  });

  describe('getTriggerCanaryPercent', () => {
    it('returns 0 when not set', () => {
      expect(getTriggerCanaryPercent()).toBe(0);
    });

    it('returns the configured value', () => {
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '50';
      expect(getTriggerCanaryPercent()).toBe(50);
    });

    it('clamps to 0–100', () => {
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '200';
      expect(getTriggerCanaryPercent()).toBe(100);
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '-10';
      expect(getTriggerCanaryPercent()).toBe(0);
    });
  });

  describe('shouldUseTriggerService', () => {
    it('returns false when service is disabled (default)', () => {
      expect(shouldUseTriggerService('wf-abc')).toBe(false);
    });

    it('returns false when enabled but canary=0', () => {
      process.env.TRIGGER_SERVICE_ENABLED = 'true';
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '0';
      expect(shouldUseTriggerService('wf-abc')).toBe(false);
    });

    it('returns true for all workflowIds when canary=100', () => {
      process.env.TRIGGER_SERVICE_ENABLED = 'true';
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '100';
      expect(shouldUseTriggerService('wf-abc')).toBe(true);
      expect(shouldUseTriggerService('wf-xyz')).toBe(true);
    });

    it('is deterministic — same workflowId always routes the same way', () => {
      process.env.TRIGGER_SERVICE_ENABLED = 'true';
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '50';
      const id = 'wf-deterministic-test';
      const first = shouldUseTriggerService(id);
      for (let i = 0; i < 10; i++) {
        expect(shouldUseTriggerService(id)).toBe(first);
      }
    });
  });

  describe('remote methods — Phase 1 (service disabled → all return null)', () => {
    it('dispatchWebhookRemote returns null without calling fetch', async () => {
      const result = await dispatchWebhookRemote('wf-abc', { headers: {}, body: {}, method: 'POST' });
      expect(result).toBeNull();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('dispatchFormRemote returns null without calling fetch', async () => {
      const result = await dispatchFormRemote('wf-abc', 'node-1', { fields: { name: 'Alice' } });
      expect(result).toBeNull();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('dispatchChatRemote returns null without calling fetch', async () => {
      const result = await dispatchChatRemote('wf-abc', 'node-1', { message: 'Hello' });
      expect(result).toBeNull();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('dispatchScheduleRemote returns null without calling fetch', async () => {
      const result = await dispatchScheduleRemote('wf-abc', { scheduledAt: new Date().toISOString() });
      expect(result).toBeNull();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('remote methods — service enabled but fetch returns non-ok', () => {
    beforeEach(() => {
      process.env.TRIGGER_SERVICE_ENABLED = 'true';
      process.env.TRIGGER_SERVICE_CANARY_PERCENT = '100';
      process.env.TRIGGER_SERVICE_URL = 'http://localhost:3006';
    });

    it('dispatchWebhookRemote returns null on fetch error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('ECONNREFUSED'));
      const result = await dispatchWebhookRemote('wf-abc', { headers: {}, body: {}, method: 'POST' });
      expect(result).toBeNull();
    });

    it('dispatchWebhookRemote returns null on non-ok response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 501 });
      const result = await dispatchWebhookRemote('wf-abc', { headers: {}, body: {}, method: 'POST' });
      expect(result).toBeNull();
    });

    it('dispatchWebhookRemote returns result on ok response', async () => {
      const mockResult = { executionId: 'exec-1', status: 'queued', workflowId: 'wf-abc' };
      mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => mockResult });
      const result = await dispatchWebhookRemote('wf-abc', { headers: {}, body: {}, method: 'POST' });
      expect(result).toEqual(mockResult);
    });
  });
});
