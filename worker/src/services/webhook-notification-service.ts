/**
 * Webhook notification helpers for the worker (Phase 4).
 *
 * These functions are called when a user has configured a webhook URL for
 * execution event delivery. The URL must be resolved by the caller before
 * invoking — no per-user URL storage exists in the worker in Phase 4.
 *
 * Wiring into execution-job-runner.ts is deferred until the product adds
 * per-user webhook URL configuration (DB column or credential entry).
 * This file exists so that wiring is a one-line import when that lands.
 *
 * All calls are fire-and-forget — never block execution flow.
 * Slack/Discord workflow nodes stay in the executor and are NOT affected.
 */

import { shouldUseNotificationService, sendWebhookRemote } from './notification-service-client';

/**
 * Send an execution-completed webhook to a user-configured URL.
 *
 * @param userId  - for canary routing
 * @param webhookUrl - caller resolves this from user config; pass null to skip
 * @param workflowName
 * @param executionId
 */
export async function sendWebhookExecutionCompleted(
  userId: string,
  webhookUrl: string | null | undefined,
  workflowName: string,
  executionId: string,
): Promise<void> {
  if (!webhookUrl || !shouldUseNotificationService(userId)) return;
  await sendWebhookRemote(userId, {
    url: webhookUrl,
    event: 'execution.completed',
    payload: { workflowName, executionId, status: 'success' },
  }).catch(() => { /* fire-and-forget */ });
}

/**
 * Send an execution-failed webhook to a user-configured URL.
 *
 * @param userId  - for canary routing
 * @param webhookUrl - caller resolves this from user config; pass null to skip
 * @param workflowName
 * @param error - error message (truncated at 500 chars by the service)
 */
export async function sendWebhookExecutionFailed(
  userId: string,
  webhookUrl: string | null | undefined,
  workflowName: string,
  error: string,
): Promise<void> {
  if (!webhookUrl || !shouldUseNotificationService(userId)) return;
  await sendWebhookRemote(userId, {
    url: webhookUrl,
    event: 'execution.failed',
    payload: { workflowName, error: error.slice(0, 500), status: 'failed' },
  }).catch(() => { /* fire-and-forget */ });
}
