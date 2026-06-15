/**
 * Unit tests for executionNotifications utility functions.
 * Feature: execution-result-notifications
 * Validates: Requirements 1.1, 2.1, 3.1, 4.1, 5.1, 5.2, 7.7
 */

import { describe, it, expect } from 'vitest';
import {
  isAuthError,
  classifyExecutionResult,
  friendlyErrorMessage,
  extractServiceName,
  type ExecutionResult,
  type ExecutionNodeLog,
} from '../lib/executionNotifications';

// ---------------------------------------------------------------------------
// isAuthError
// ---------------------------------------------------------------------------
describe('isAuthError', () => {
  it('returns false for null/undefined', () => {
    expect(isAuthError(null)).toBe(false);
    expect(isAuthError(undefined)).toBe(false);
    expect(isAuthError('')).toBe(false);
  });

  it('detects authentication failed', () => {
    expect(isAuthError('Authentication failed for user')).toBe(true);
  });

  it('detects token invalid', () => {
    expect(isAuthError('Token invalid or expired')).toBe(true);
  });

  it('detects token expired', () => {
    expect(isAuthError('token expired, please re-authenticate')).toBe(true);
  });

  it('detects oauth', () => {
    expect(isAuthError('OAuth token revoked')).toBe(true);
  });

  it('detects credentials not configured', () => {
    expect(isAuthError('credentials not configured for this node')).toBe(true);
  });

  it('detects re-authenticate', () => {
    expect(isAuthError('Please re-authenticate with Google')).toBe(true);
  });

  it('returns false for non-auth errors', () => {
    expect(isAuthError('Network timeout')).toBe(false);
    expect(isAuthError('Not found')).toBe(false);
    expect(isAuthError('Rate limit exceeded')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// classifyExecutionResult
// ---------------------------------------------------------------------------
describe('classifyExecutionResult', () => {
  const makeResult = (overrides: Partial<ExecutionResult>): ExecutionResult => ({
    id: 'exec-1',
    status: 'success',
    logs: [],
    ...overrides,
  });

  it('returns full_success when all logs are success', () => {
    const result = makeResult({
      logs: [
        { nodeId: 'n1', nodeName: 'Node 1', status: 'success' },
        { nodeId: 'n2', nodeName: 'Node 2', status: 'success' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('returns full_success when logs is null and status is success', () => {
    const result = makeResult({ logs: null, status: 'success' });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('returns full_success when logs is empty and status is success', () => {
    const result = makeResult({ logs: [], status: 'success' });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('returns partial_success when some nodes are skipped and none failed', () => {
    const result = makeResult({
      logs: [
        { nodeId: 'n1', nodeName: 'Node 1', status: 'success' },
        { nodeId: 'n2', nodeName: 'Node 2', status: 'skipped' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('partial_success');
  });

  it('returns auth_failure when a failed node has an auth error', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Gmail', status: 'failed', error: 'OAuth token revoked' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('auth_failure');
  });

  it('returns node_error when a failed node has a non-auth error', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Sheets', status: 'failed', error: 'Network timeout' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('node_error');
  });

  it('returns acknowledgement_warning when a failed node only has response acknowledgement failure', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Delete Task', status: 'failed', error: 'Unexpected end of JSON input' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('acknowledgement_warning');
  });

  it('returns status_sync_issue when execution status persistence is unavailable', () => {
    const result = makeResult({
      status: 'failed',
      error: 'DB circuit open - database unreachable, retrying in 30s',
      logs: [],
    });
    expect(classifyExecutionResult(result)).toBe('status_sync_issue');
  });

  it('returns node_error when logs is null and status is failed', () => {
    const result = makeResult({ logs: null, status: 'failed' });
    expect(classifyExecutionResult(result)).toBe('node_error');
  });

  it('returns stuck when backend is terminal but UI shows running', () => {
    const result = makeResult({
      status: 'success',
      logs: [{ nodeId: 'n1', nodeName: 'Node 1', status: 'success' }],
      uiNodeStatuses: { n1: 'running' },
    });
    expect(classifyExecutionResult(result)).toBe('stuck');
  });

  it('auth_failure takes priority over node_error', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Gmail', status: 'failed', error: 'OAuth token revoked' },
        { nodeId: 'n2', nodeName: 'Sheets', status: 'failed', error: 'Network timeout' },
      ],
    });
    expect(classifyExecutionResult(result)).toBe('auth_failure');
  });

  it('stuck takes highest priority', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        { nodeId: 'n1', nodeName: 'Gmail', status: 'failed', error: 'OAuth token revoked' },
      ],
      uiNodeStatuses: { n1: 'running' },
    });
    expect(classifyExecutionResult(result)).toBe('stuck');
  });

  it('does not throw on malformed input', () => {
    expect(() => classifyExecutionResult({} as ExecutionResult)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// friendlyErrorMessage
// ---------------------------------------------------------------------------
describe('friendlyErrorMessage', () => {
  it('returns fallback for null/undefined', () => {
    const msg = friendlyErrorMessage(null);
    expect(msg).toContain('Something went wrong');
  });

  it('handles timeout errors', () => {
    expect(friendlyErrorMessage('Request timeout after 30s')).toContain('too long');
    expect(friendlyErrorMessage('Operation timed out')).toContain('too long');
  });

  it('handles rate limit errors', () => {
    expect(friendlyErrorMessage('Rate limit exceeded')).toContain('rate-limited');
    expect(friendlyErrorMessage('HTTP 429 Too Many Requests')).toContain('rate-limited');
  });

  it('handles not found errors', () => {
    expect(friendlyErrorMessage('Resource not found')).toContain('not found');
    expect(friendlyErrorMessage('HTTP 404')).toContain('not found');
  });

  it('handles permission errors', () => {
    expect(friendlyErrorMessage('Permission denied')).toContain("doesn't have permission");
    expect(friendlyErrorMessage('403 Forbidden')).toContain("doesn't have permission");
    expect(friendlyErrorMessage('Forbidden action')).toContain("doesn't have permission");
  });

  it('handles network errors', () => {
    expect(friendlyErrorMessage('Network error occurred')).toContain('reach the service');
    expect(friendlyErrorMessage('ECONNREFUSED')).toContain('reach the service');
    expect(friendlyErrorMessage('fetch failed')).toContain('reach the service');
  });

  it('handles invalid data errors', () => {
    expect(friendlyErrorMessage('Invalid input data')).toContain('unexpected data');
  });

  it('handles acknowledgement parse failures', () => {
    expect(friendlyErrorMessage('Unexpected end of JSON input')).toContain('response could not be read');
  });

  it('handles status sync failures', () => {
    expect(friendlyErrorMessage('Failed to get execution status')).toContain('status sync failed');
  });

  it('never exposes stack traces', () => {
    const stackTrace = 'Error: something\n    at Object.<anonymous> (/app/src/index.ts:10:5)';
    const msg = friendlyErrorMessage(stackTrace);
    expect(msg).not.toContain('    at ');
    expect(msg).not.toContain('/app/src/');
  });

  it('never exposes UUIDs', () => {
    const withUuid = 'Node 550e8400-e29b-41d4-a716-446655440000 failed';
    const msg = friendlyErrorMessage(withUuid);
    expect(msg).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-/);
  });
});

// ---------------------------------------------------------------------------
// extractServiceName
// ---------------------------------------------------------------------------
describe('extractServiceName', () => {
  it('returns Unknown for undefined', () => {
    expect(extractServiceName(undefined)).toBe('Unknown');
  });

  it('maps google_ prefix to Google', () => {
    expect(extractServiceName('google_gmail')).toBe('Google');
    expect(extractServiceName('google_sheets')).toBe('Google');
    expect(extractServiceName('google_drive')).toBe('Google');
  });

  it('maps slack_ prefix to Slack', () => {
    expect(extractServiceName('slack_message')).toBe('Slack');
  });

  it('maps hubspot_ prefix to HubSpot', () => {
    expect(extractServiceName('hubspot_contact')).toBe('HubSpot');
  });

  it('maps salesforce_ prefix to Salesforce', () => {
    expect(extractServiceName('salesforce_lead')).toBe('Salesforce');
  });

  it('maps notion_ prefix to Notion', () => {
    expect(extractServiceName('notion_page')).toBe('Notion');
  });

  it('maps github_ prefix to GitHub', () => {
    expect(extractServiceName('github_issue')).toBe('GitHub');
  });

  it('maps linkedin_ prefix to LinkedIn', () => {
    expect(extractServiceName('linkedin_post')).toBe('LinkedIn');
  });

  it('maps twitter_ prefix to Twitter', () => {
    expect(extractServiceName('twitter_tweet')).toBe('Twitter');
  });

  it('maps facebook_ prefix to Facebook', () => {
    expect(extractServiceName('facebook_post')).toBe('Facebook');
  });

  it('maps instagram_ prefix to Instagram', () => {
    expect(extractServiceName('instagram_media')).toBe('Instagram');
  });

  it('maps whatsapp_ prefix to WhatsApp', () => {
    expect(extractServiceName('whatsapp_message')).toBe('WhatsApp');
  });

  it('maps zoho_ prefix to Zoho', () => {
    expect(extractServiceName('zoho_crm')).toBe('Zoho');
  });

  it('maps stripe_ prefix to Stripe', () => {
    expect(extractServiceName('stripe_charge')).toBe('Stripe');
  });

  it('maps airtable_ prefix to Airtable', () => {
    expect(extractServiceName('airtable_record')).toBe('Airtable');
  });

  it('capitalizes first segment for unknown types', () => {
    expect(extractServiceName('myservice_action')).toBe('Myservice');
    expect(extractServiceName('custom')).toBe('Custom');
  });
});
