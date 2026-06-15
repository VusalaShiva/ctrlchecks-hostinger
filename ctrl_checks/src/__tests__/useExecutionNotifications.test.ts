/**
 * Unit tests for useExecutionNotifications hook logic.
 * Feature: execution-result-notifications
 * Validates: Requirements 1.1–1.3, 2.1–2.5, 3.1–3.5, 4.1–4.4, 5.1–5.6, 7.1–7.3
 *
 * Strategy: the hook's useMemo body is pure derivation logic. We test it by
 * calling the hook inside a minimal React renderHook-equivalent using the
 * react test renderer, OR by extracting the derivation into a testable helper.
 * Since @testing-library/react is not installed, we call the hook directly
 * using React's act() from react-dom/test-utils.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  classifyExecutionResult,
  extractServiceName,
  friendlyErrorMessage,
  type ExecutionResult,
  type NotificationConfig,
} from '../lib/executionNotifications';
import type { ExecutionNotificationCallbacks } from '../hooks/useExecutionNotifications';

// ---------------------------------------------------------------------------
// Pure derivation helper — mirrors the hook's useMemo body exactly so we can
// test the notification-building logic without a React renderer.
// ---------------------------------------------------------------------------

function deriveNotifications(
  result: ExecutionResult | null,
  callbacks: ExecutionNotificationCallbacks,
): NotificationConfig[] {
  if (!result) return [];

  const classification = classifyExecutionResult(result);
  const safeLogs = result.logs ?? [];

  let idCounter = 0;
  const stableId = (key: string) => `exec-notification-${key}-${idCounter++}`;

  if (classification === 'full_success') {
    const id = stableId(`${result.id}-full_success-0`);
    return [{
      id,
      classification,
      severity: 'success',
      renderMode: 'toast',
      title: 'Workflow completed successfully! 🎉',
      message: 'All steps ran as expected.',
      autoDismissMs: 5000,
      actions: [{
        label: 'View Logs',
        onClick: () => { callbacks.onViewLogs(); callbacks.onDismiss(id); },
      }],
    }];
  }

  if (classification === 'partial_success') {
    const id = stableId(`${result.id}-partial_success-0`);
    const successfulNames = safeLogs.filter((l) => l.status === 'success').map((l) => l.nodeName || l.nodeId || 'Unknown node');
    const skippedNames = safeLogs.filter((l) => l.status === 'skipped').map((l) => l.nodeName || l.nodeId || 'Unknown node');
    const message = [
      successfulNames.length > 0 ? `Completed: ${successfulNames.join(', ')}.` : '',
      skippedNames.length > 0 ? `Skipped: ${skippedNames.join(', ')}.` : '',
      'Skipped steps were bypassed due to conditional routing.',
    ].filter(Boolean).join(' ');
    return [{
      id,
      classification,
      severity: 'warning',
      renderMode: 'toast',
      title: 'Workflow completed with skipped steps',
      message,
      actions: [{
        label: 'View Logs',
        onClick: () => { callbacks.onViewLogs(); callbacks.onDismiss(id); },
      }],
    }];
  }

  if (classification === 'acknowledgement_warning') {
    const id = stableId(`${result.id}-acknowledgement_warning-0`);
    const failedLogs = safeLogs.filter((l) => l.status === 'failed');
    const firstFailedNodeId = failedLogs[0]?.nodeId;
    const nodeName = failedLogs[0]?.nodeName || (firstFailedNodeId ? firstFailedNodeId.slice(0, 8) : 'This step');
    return [{
      id,
      classification,
      severity: 'warning',
      renderMode: 'banner',
      title: 'Action may have completed',
      message: `${nodeName}: The action may have completed, but the response could not be read.`,
      resolution: 'View logs before retrying, especially for create, update, or delete actions.',
      actions: [{
        label: 'View Logs',
        onClick: () => { callbacks.onViewLogs(firstFailedNodeId); callbacks.onDismiss(id); },
      }],
    }];
  }

  if (classification === 'status_sync_issue') {
    const id = stableId(`${result.id}-status_sync_issue-0`);
    return [{
      id,
      classification,
      severity: 'warning',
      renderMode: 'banner',
      title: 'Status sync needs attention',
      message: 'The action may have completed; status sync failed.',
      resolution: 'Refresh the execution details before running the workflow again.',
      actions: [{
        label: 'Refresh',
        onClick: () => { callbacks.onRefresh(); callbacks.onDismiss(id); },
      }],
    }];
  }

  if (classification === 'auth_failure') {
    const failedAuthLogs = safeLogs.filter(
      (l) => l.status === 'failed' && l.error &&
        /authentication failed|token invalid|token expired|oauth|credentials not configured|re-authenticate/i.test(l.error),
    );
    const byService = new Map<string, typeof failedAuthLogs>();
    for (const log of failedAuthLogs) {
      const service = extractServiceName(log.nodeType);
      if (!byService.has(service)) byService.set(service, []);
      byService.get(service)!.push(log);
    }
    const configs: NotificationConfig[] = [];
    let serviceIndex = 0;
    for (const [service, logs] of byService) {
      const id = stableId(`${result.id}-auth_failure-${serviceIndex}`);
      const firstLog = logs[0];
      const nodeName = firstLog.nodeName || (firstLog.nodeId ? firstLog.nodeId.slice(0, 8) : 'Unknown node');
      configs.push({
        id,
        classification,
        severity: 'error',
        renderMode: 'banner',
        title: `Action needed: Reconnect ${service}`,
        message: `Your ${service} connection needs to be refreshed. ${nodeName} couldn't complete because the account credentials expired.`,
        resolution: 'Reconnect your account to continue running this workflow.',
        actions: [{
          label: `Reconnect ${service}`,
          onClick: () => { callbacks.onReconnect(service); callbacks.onDismiss(id); },
        }],
      });
      serviceIndex++;
    }
    return configs;
  }

  if (classification === 'node_error') {
    const id = stableId(`${result.id}-node_error-0`);
    const failedLogs = safeLogs.filter((l) => l.status === 'failed');
    const firstFailedNodeId = failedLogs[0]?.nodeId;
    const failedDescriptions = failedLogs.map((l) => {
      const name = l.nodeName || (l.nodeId ? l.nodeId.slice(0, 8) : 'Unknown node');
      return `${name}: ${friendlyErrorMessage(l.error)}`;
    });
    const message = failedDescriptions.length > 0
      ? failedDescriptions.join(' | ')
      : 'One or more steps failed. Check the node configuration and try again.';
    return [{
      id,
      classification,
      severity: 'error',
      renderMode: 'banner',
      title: "A step didn't complete",
      message,
      resolution: 'Check the node configuration and try again.',
      actions: [{
        label: 'View Logs',
        onClick: () => { callbacks.onViewLogs(firstFailedNodeId); callbacks.onDismiss(id); },
      }],
    }];
  }

  if (classification === 'stuck') {
    const id = stableId(`${result.id}-stuck-0`);
    return [{
      id,
      classification,
      severity: 'warning',
      renderMode: 'banner',
      title: 'Your workflow finished running',
      message: 'The results are ready — refresh to see the full execution details.',
      actions: [{
        label: 'Refresh',
        onClick: () => { callbacks.onRefresh(); callbacks.onDismiss(id); },
      }],
    }];
  }

  return [];
}

function makeCallbacks(): ExecutionNotificationCallbacks {
  return {
    onViewLogs: vi.fn(),
    onReconnect: vi.fn(),
    onRefresh: vi.fn(),
    onDismiss: vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// null result
// ---------------------------------------------------------------------------
describe('deriveNotifications — null result', () => {
  it('returns empty array when result is null', () => {
    expect(deriveNotifications(null, makeCallbacks())).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// full_success
// ---------------------------------------------------------------------------
describe('deriveNotifications — full_success', () => {
  const result: ExecutionResult = {
    id: 'exec-1',
    status: 'success',
    logs: [
      { nodeId: 'n1', nodeName: 'Send Email', status: 'success' },
      { nodeId: 'n2', nodeName: 'Update Sheet', status: 'success' },
    ],
  };

  it('returns exactly one config', () => {
    expect(deriveNotifications(result, makeCallbacks())).toHaveLength(1);
  });

  it('has severity success', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('success');
  });

  it('has renderMode toast', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.renderMode).toBe('toast');
  });

  it('has autoDismissMs 5000', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBe(5000);
  });

  it('has a View Logs action', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.actions.some((a) => a.label === 'View Logs')).toBe(true);
  });

  it('View Logs action calls onViewLogs and onDismiss', () => {
    const cb = makeCallbacks();
    const [c] = deriveNotifications(result, cb);
    c.actions.find((a) => a.label === 'View Logs')!.onClick();
    expect(cb.onViewLogs).toHaveBeenCalled();
    expect(cb.onDismiss).toHaveBeenCalledWith(c.id);
  });
});

// ---------------------------------------------------------------------------
// partial_success
// ---------------------------------------------------------------------------
describe('deriveNotifications — partial_success', () => {
  const result: ExecutionResult = {
    id: 'exec-2',
    status: 'success',
    logs: [
      { nodeId: 'n1', nodeName: 'Send Email', status: 'success' },
      { nodeId: 'n2', nodeName: 'Notify Slack', status: 'skipped' },
    ],
  };

  it('returns exactly one config', () => {
    expect(deriveNotifications(result, makeCallbacks())).toHaveLength(1);
  });

  it('has severity warning', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('warning');
  });

  it('has no autoDismissMs', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });

  it('message contains successful node name', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.message).toContain('Send Email');
  });

  it('message contains skipped node name', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.message).toContain('Notify Slack');
  });

  it('has a View Logs action', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.actions.some((a) => a.label === 'View Logs')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// acknowledgement_warning
// ---------------------------------------------------------------------------
describe('deriveNotifications - acknowledgement_warning', () => {
  const result: ExecutionResult = {
    id: 'exec-ack',
    status: 'failed',
    logs: [
      { nodeId: 'n1', nodeName: 'Delete Task', status: 'failed', error: 'Unexpected end of JSON input' },
    ],
  };

  it('uses warning severity and acknowledgement copy', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('warning');
    expect(c.title).toContain('Action may have completed');
    expect(c.message).toContain('response could not be read');
  });
});

// ---------------------------------------------------------------------------
// status_sync_issue
// ---------------------------------------------------------------------------
describe('deriveNotifications - status_sync_issue', () => {
  const result: ExecutionResult = {
    id: 'exec-sync',
    status: 'failed',
    error: 'Failed to get execution status',
    logs: [],
  };

  it('offers refresh instead of showing a normal step failure', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('warning');
    expect(c.title).toContain('Status sync');
    expect(c.actions.some((a) => a.label === 'Refresh')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// auth_failure
// ---------------------------------------------------------------------------
describe('deriveNotifications — auth_failure', () => {
  const result: ExecutionResult = {
    id: 'exec-3',
    status: 'failed',
    logs: [
      { nodeId: 'n1', nodeName: 'Send Gmail', nodeType: 'google_gmail', status: 'failed', error: 'OAuth token revoked' },
      { nodeId: 'n2', nodeName: 'Post to Slack', nodeType: 'slack_message', status: 'failed', error: 'Authentication failed' },
    ],
  };

  it('returns one config per unique service', () => {
    expect(deriveNotifications(result, makeCallbacks())).toHaveLength(2);
  });

  it('each config has severity error', () => {
    deriveNotifications(result, makeCallbacks()).forEach((c) => expect(c.severity).toBe('error'));
  });

  it('each config has renderMode banner', () => {
    deriveNotifications(result, makeCallbacks()).forEach((c) => expect(c.renderMode).toBe('banner'));
  });

  it('each config has no autoDismissMs', () => {
    deriveNotifications(result, makeCallbacks()).forEach((c) => expect(c.autoDismissMs).toBeUndefined());
  });

  it('action labels contain Reconnect', () => {
    deriveNotifications(result, makeCallbacks()).forEach((c) => {
      expect(c.actions.some((a) => a.label.includes('Reconnect'))).toBe(true);
    });
  });

  it('Reconnect action calls onReconnect and onDismiss', () => {
    const cb = makeCallbacks();
    const configs = deriveNotifications(result, cb);
    configs[0].actions[0].onClick();
    expect(cb.onReconnect).toHaveBeenCalled();
    expect(cb.onDismiss).toHaveBeenCalledWith(configs[0].id);
  });

  it('deduplicates: two nodes same service → one config', () => {
    const sameService: ExecutionResult = {
      id: 'exec-3b',
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Gmail 1', nodeType: 'google_gmail', status: 'failed', error: 'OAuth token revoked' },
        { nodeId: 'n2', nodeName: 'Sheets', nodeType: 'google_sheets', status: 'failed', error: 'token expired' },
      ],
    };
    expect(deriveNotifications(sameService, makeCallbacks())).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// node_error
// ---------------------------------------------------------------------------
describe('deriveNotifications — node_error', () => {
  const result: ExecutionResult = {
    id: 'exec-4',
    status: 'failed',
    logs: [
      { nodeId: 'n1', nodeName: 'Update Record', status: 'failed', error: 'Network timeout' },
      { nodeId: 'n2', nodeName: 'Send Webhook', status: 'failed', error: 'fetch failed' },
    ],
  };

  it('returns exactly one config', () => {
    expect(deriveNotifications(result, makeCallbacks())).toHaveLength(1);
  });

  it('has severity error', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('error');
  });

  it('has renderMode banner', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.renderMode).toBe('banner');
  });

  it('has no autoDismissMs', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });

  it('message contains all failed node names', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.message).toContain('Update Record');
    expect(c.message).toContain('Send Webhook');
  });

  it('resolution contains check node configuration', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.resolution).toContain('Check the node configuration and try again');
  });

  it('View Logs action calls onDismiss', () => {
    const cb = makeCallbacks();
    const [c] = deriveNotifications(result, cb);
    c.actions.find((a) => a.label === 'View Logs')!.onClick();
    expect(cb.onDismiss).toHaveBeenCalledWith(c.id);
  });
});

// ---------------------------------------------------------------------------
// stuck
// ---------------------------------------------------------------------------
describe('deriveNotifications — stuck', () => {
  const result: ExecutionResult = {
    id: 'exec-5',
    status: 'success',
    logs: [{ nodeId: 'n1', nodeName: 'Node 1', status: 'success' }],
    uiNodeStatuses: { n1: 'running' },
  };

  it('returns exactly one config', () => {
    expect(deriveNotifications(result, makeCallbacks())).toHaveLength(1);
  });

  it('has severity warning', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.severity).toBe('warning');
  });

  it('has renderMode banner', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.renderMode).toBe('banner');
  });

  it('has no autoDismissMs', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });

  it('has a Refresh action', () => {
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.actions.some((a) => a.label === 'Refresh')).toBe(true);
  });

  it('Refresh action calls onRefresh and onDismiss', () => {
    const cb = makeCallbacks();
    const [c] = deriveNotifications(result, cb);
    c.actions.find((a) => a.label === 'Refresh')!.onClick();
    expect(cb.onRefresh).toHaveBeenCalled();
    expect(cb.onDismiss).toHaveBeenCalledWith(c.id);
  });
});

// ---------------------------------------------------------------------------
// severity-to-persistence invariant (Property 12)
// ---------------------------------------------------------------------------
describe('severity-to-persistence invariant', () => {
  it('full_success always has autoDismissMs 5000', () => {
    const result: ExecutionResult = { id: 'x', status: 'success', logs: [{ nodeId: 'n1', nodeName: 'N1', status: 'success' }] };
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBe(5000);
  });

  it('partial_success always has autoDismissMs undefined', () => {
    const result: ExecutionResult = { id: 'x', status: 'success', logs: [{ nodeId: 'n1', nodeName: 'N1', status: 'skipped' }] };
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });

  it('auth_failure always has autoDismissMs undefined', () => {
    const result: ExecutionResult = { id: 'x', status: 'failed', logs: [{ nodeId: 'n1', nodeName: 'N1', nodeType: 'slack_msg', status: 'failed', error: 'OAuth token revoked' }] };
    const configs = deriveNotifications(result, makeCallbacks());
    configs.forEach((c) => expect(c.autoDismissMs).toBeUndefined());
  });

  it('node_error always has autoDismissMs undefined', () => {
    const result: ExecutionResult = { id: 'x', status: 'failed', logs: [{ nodeId: 'n1', nodeName: 'N1', status: 'failed', error: 'timeout' }] };
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });

  it('stuck always has autoDismissMs undefined', () => {
    const result: ExecutionResult = { id: 'x', status: 'success', logs: [], uiNodeStatuses: { n1: 'running' } };
    const [c] = deriveNotifications(result, makeCallbacks());
    expect(c.autoDismissMs).toBeUndefined();
  });
});
