import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── module mocks ─────────────────────────────────────────────────────────────

vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: { getSession: vi.fn() },
    from: vi.fn(),
  },
}));

vi.mock('@/config/endpoints', () => ({
  ENDPOINTS: { itemBackend: 'http://test-api' },
}));

import { workflowScheduler } from '../workflowScheduler';
import { awsClient } from '@/integrations/aws/client';

// ── helpers ───────────────────────────────────────────────────────────────────

const flushPromises = async () => {
  for (let i = 0; i < 10; i++) await Promise.resolve();
};

function makeQueryBuilder(lastMethod: 'not' | 'single', result: object) {
  const builder: Record<string, unknown> = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
  };
  builder[lastMethod] = vi.fn().mockResolvedValue(result);
  return builder;
}

// ── setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.useFakeTimers();
  workflowScheduler.stopAll();
  workflowScheduler.resetInitialization();
  (workflowScheduler as any).schedulerHealthy = true;
  vi.mocked(awsClient.auth.getSession).mockResolvedValue({
    data: { session: { access_token: 'tok' } },
  } as any);
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// ── initial state ─────────────────────────────────────────────────────────────

describe('initial state', () => {
  it('isHealthy returns true by default', () => {
    expect(workflowScheduler.isHealthy()).toBe(true);
  });

  it('isExecuting returns false for unknown workflow', () => {
    expect(workflowScheduler.isExecuting('wf1')).toBe(false);
  });

  it('isScheduled returns false for unknown workflow', () => {
    expect(workflowScheduler.isScheduled('wf1')).toBe(false);
  });

  it('getScheduledWorkflow returns undefined for unknown workflow', () => {
    expect(workflowScheduler.getScheduledWorkflow('wf1')).toBeUndefined();
  });

  it('getAllActiveSchedulers returns empty array', () => {
    expect(workflowScheduler.getAllActiveSchedulers()).toEqual([]);
  });
});

// ── interval-based cron parsing ───────────────────────────────────────────────

describe('start() — interval-based cron parsing', () => {
  it('*/15 * * * * → 15 minutes, intervalMs=900000', () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    const info = workflowScheduler.getScheduledWorkflow('wf1')!;
    expect(info.intervalMs).toBe(15 * 60 * 1000);
    expect(info.interval).toBe(15);
    expect(info.unit).toBe('minutes');
  });

  it('* * * * * → 1 minute, intervalMs=60000', () => {
    workflowScheduler.start('wf2', '* * * * *');
    const info = workflowScheduler.getScheduledWorkflow('wf2')!;
    expect(info.intervalMs).toBe(60 * 1000);
    expect(info.interval).toBe(1);
    expect(info.unit).toBe('minutes');
  });

  it('0 */2 * * * → 2 hours, intervalMs=7200000', () => {
    workflowScheduler.start('wf3', '0 */2 * * *');
    const info = workflowScheduler.getScheduledWorkflow('wf3')!;
    expect(info.intervalMs).toBe(2 * 60 * 60 * 1000);
    expect(info.interval).toBe(2);
    expect(info.unit).toBe('hours');
  });

  it('0 * * * * → 1 hour, intervalMs=3600000', () => {
    workflowScheduler.start('wf4', '0 * * * *');
    const info = workflowScheduler.getScheduledWorkflow('wf4')!;
    expect(info.intervalMs).toBe(60 * 60 * 1000);
    expect(info.interval).toBe(1);
    expect(info.unit).toBe('hours');
  });

  it('stores workflowId and cronExpression in scheduled info', () => {
    workflowScheduler.start('wf5', '*/30 * * * *');
    const info = workflowScheduler.getScheduledWorkflow('wf5')!;
    expect(info.workflowId).toBe('wf5');
    expect(info.cronExpression).toBe('*/30 * * * *');
  });

  it('isScheduled returns true after start', () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    expect(workflowScheduler.isScheduled('wf1')).toBe(true);
  });

  it('getAllActiveSchedulers lists all started workflows', () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    workflowScheduler.start('wf2', '*/30 * * * *');
    const active = workflowScheduler.getAllActiveSchedulers();
    expect(active).toHaveLength(2);
    expect(active.map(a => a.workflowId)).toContain('wf1');
    expect(active.map(a => a.workflowId)).toContain('wf2');
  });

  it('fires immediate executeWorkflow (fetch called on first run)', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    workflowScheduler.start('wf1', '*/15 * * * *');
    await flushPromises();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api/api/execute-workflow',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});

// ── time-based daily cron ─────────────────────────────────────────────────────

describe('start() — time-based daily cron', () => {
  it('10 8 * * * → daily schedule: intervalMs=86400000, interval=24, unit=hours', () => {
    workflowScheduler.start('wf6', '10 8 * * *');
    expect(workflowScheduler.isScheduled('wf6')).toBe(true);
    const info = workflowScheduler.getScheduledWorkflow('wf6')!;
    expect(info.intervalMs).toBe(24 * 60 * 60 * 1000);
    expect(info.interval).toBe(24);
    expect(info.unit).toBe('hours');
  });

  it('time-based cron does NOT fire immediate executeWorkflow', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    workflowScheduler.start('wf6', '10 8 * * *');
    await flushPromises();
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// ── invalid cron ──────────────────────────────────────────────────────────────

describe('start() — invalid cron', () => {
  it('non-cron string does not schedule', () => {
    workflowScheduler.start('wf7', 'not-a-cron');
    expect(workflowScheduler.isScheduled('wf7')).toBe(false);
    expect(workflowScheduler.getScheduledWorkflow('wf7')).toBeUndefined();
  });

  it('wrong field count does not schedule', () => {
    workflowScheduler.start('wf8', '* * *');
    expect(workflowScheduler.isScheduled('wf8')).toBe(false);
  });
});

// ── stop / stopAll lifecycle ──────────────────────────────────────────────────

describe('stop()', () => {
  it('clears scheduler after stop', () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    workflowScheduler.stop('wf1');
    expect(workflowScheduler.isScheduled('wf1')).toBe(false);
    expect(workflowScheduler.getScheduledWorkflow('wf1')).toBeUndefined();
  });

  it('stopping unknown workflow does not throw', () => {
    expect(() => workflowScheduler.stop('does-not-exist')).not.toThrow();
  });
});

describe('stopAll()', () => {
  it('clears all active schedulers', () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    workflowScheduler.start('wf2', '*/30 * * * *');
    workflowScheduler.stopAll();
    expect(workflowScheduler.isScheduled('wf1')).toBe(false);
    expect(workflowScheduler.isScheduled('wf2')).toBe(false);
    expect(workflowScheduler.getAllActiveSchedulers()).toEqual([]);
  });

  it('stopAll on empty scheduler does not throw', () => {
    expect(() => workflowScheduler.stopAll()).not.toThrow();
  });
});

// ── isHealthy flag ────────────────────────────────────────────────────────────

describe('isHealthy()', () => {
  it('set to false after non-ok HTTP response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, json: vi.fn().mockResolvedValue({ error: 'fail' }) }),
    );
    workflowScheduler.start('wf1', '*/15 * * * *');
    await flushPromises();
    expect(workflowScheduler.isHealthy()).toBe(false);
  });

  it('set to false after fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
    workflowScheduler.start('wf1', '*/15 * * * *');
    await flushPromises();
    expect(workflowScheduler.isHealthy()).toBe(false);
  });

  it('restored to true after successful execution', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, json: vi.fn().mockResolvedValue({ error: 'fail' }) }),
    );
    workflowScheduler.start('wf1', '*/15 * * * *');
    await flushPromises();
    expect(workflowScheduler.isHealthy()).toBe(false);

    workflowScheduler.stop('wf1');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    workflowScheduler.start('wf2', '*/15 * * * *');
    await flushPromises();
    expect(workflowScheduler.isHealthy()).toBe(true);
  });
});

// ── initializeAll ─────────────────────────────────────────────────────────────

describe('initializeAll()', () => {
  it('prevents double initialization — DB query called only once', async () => {
    const builder = makeQueryBuilder('not', { data: [], error: null });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.initializeAll();
    await workflowScheduler.initializeAll();

    expect(vi.mocked(awsClient.from)).toHaveBeenCalledTimes(1);
  });

  it('handles DB error gracefully and marks initialized', async () => {
    const builder = makeQueryBuilder('not', { data: null, error: new Error('DB down') });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.initializeAll();
    // Second call should be blocked (marks initialized even on error)
    await workflowScheduler.initializeAll();
    expect(vi.mocked(awsClient.from)).toHaveBeenCalledTimes(1);
  });

  it('no workflows returned — no schedulers started', async () => {
    const builder = makeQueryBuilder('not', { data: [], error: null });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.initializeAll();
    expect(workflowScheduler.getAllActiveSchedulers()).toEqual([]);
  });

  it('starts a scheduler for each fetched workflow', async () => {
    const builder = makeQueryBuilder('not', {
      data: [
        { id: 'wf-a', cron_expression: '*/15 * * * *' },
        { id: 'wf-b', cron_expression: '*/30 * * * *' },
      ],
      error: null,
    });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.initializeAll();
    expect(workflowScheduler.isScheduled('wf-a')).toBe(true);
    expect(workflowScheduler.isScheduled('wf-b')).toBe(true);
  });
});

// ── resetInitialization ───────────────────────────────────────────────────────

describe('resetInitialization()', () => {
  it('allows initializeAll to run again after reset', async () => {
    const builder = makeQueryBuilder('not', { data: [], error: null });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.initializeAll();
    workflowScheduler.resetInitialization();
    await workflowScheduler.initializeAll();

    expect(vi.mocked(awsClient.from)).toHaveBeenCalledTimes(2);
  });
});

// ── refreshWorkflow ───────────────────────────────────────────────────────────

describe('refreshWorkflow()', () => {
  it('starts scheduler when DB returns workflow with cron_expression', async () => {
    const builder = makeQueryBuilder('single', {
      data: { id: 'wf1', cron_expression: '*/15 * * * *' },
      error: null,
    });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.refreshWorkflow('wf1');
    expect(workflowScheduler.isScheduled('wf1')).toBe(true);
  });

  it('stops scheduler when workflow has no cron_expression', async () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    const builder = makeQueryBuilder('single', {
      data: { id: 'wf1', cron_expression: null },
      error: null,
    });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.refreshWorkflow('wf1');
    expect(workflowScheduler.isScheduled('wf1')).toBe(false);
  });

  it('stops scheduler when workflow not found (data: null)', async () => {
    workflowScheduler.start('wf1', '*/15 * * * *');
    const builder = makeQueryBuilder('single', { data: null, error: null });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await workflowScheduler.refreshWorkflow('wf1');
    expect(workflowScheduler.isScheduled('wf1')).toBe(false);
  });

  it('returns without throwing on DB error', async () => {
    const builder = makeQueryBuilder('single', { data: null, error: new Error('DB error') });
    vi.mocked(awsClient.from).mockReturnValue(builder as any);

    await expect(workflowScheduler.refreshWorkflow('wf1')).resolves.not.toThrow();
  });
});
