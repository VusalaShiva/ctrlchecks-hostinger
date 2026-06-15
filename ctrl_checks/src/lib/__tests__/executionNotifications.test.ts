import { describe, it, expect } from 'vitest';
import {
  isAuthError,
  isAcknowledgementIssue,
  isStatusSyncIssue,
  classifyExecutionResult,
  friendlyErrorMessage,
  extractServiceName,
  type ExecutionNodeLog,
  type ExecutionResult,
} from '../executionNotifications';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeLog(
  overrides: Partial<ExecutionNodeLog> = {},
): ExecutionNodeLog {
  return {
    nodeId: 'n1',
    nodeName: 'Node',
    status: 'success',
    error: null,
    ...overrides,
  };
}

function makeResult(overrides: Partial<ExecutionResult> = {}): ExecutionResult {
  return {
    id: 'exec-1',
    status: 'success',
    logs: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// isAuthError
// ---------------------------------------------------------------------------

describe('isAuthError', () => {
  it('returns false for null', () => {
    expect(isAuthError(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isAuthError(undefined)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isAuthError('')).toBe(false);
  });

  it('matches "authentication failed"', () => {
    expect(isAuthError('Authentication Failed: bad token')).toBe(true);
  });

  it('matches "token invalid"', () => {
    expect(isAuthError('Token Invalid')).toBe(true);
  });

  it('matches "token expired"', () => {
    expect(isAuthError('Your token expired')).toBe(true);
  });

  it('matches "oauth"', () => {
    expect(isAuthError('OAuth flow did not complete')).toBe(true);
  });

  it('matches "credentials not configured"', () => {
    expect(isAuthError('Credentials not configured for this node')).toBe(true);
  });

  it('matches "re-authenticate"', () => {
    expect(isAuthError('Please re-authenticate to continue')).toBe(true);
  });

  it('returns false for unrelated error', () => {
    expect(isAuthError('network connection refused')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isAcknowledgementIssue
// ---------------------------------------------------------------------------

describe('isAcknowledgementIssue', () => {
  it('returns true when acknowledgementStatus is parse_failed', () => {
    const log = makeLog({
      status: 'failed',
      metadata: { acknowledgementStatus: 'parse_failed' },
    });
    expect(isAcknowledgementIssue(log)).toBe(true);
  });

  it('returns true when error includes "acknowledgement"', () => {
    expect(isAcknowledgementIssue(makeLog({ error: 'acknowledgement not received' }))).toBe(true);
  });

  it('returns true when error includes "could not be read"', () => {
    expect(isAcknowledgementIssue(makeLog({ error: 'Response could not be read' }))).toBe(true);
  });

  it('returns true when error includes "unexpected end of json input"', () => {
    expect(isAcknowledgementIssue(makeLog({ error: 'Unexpected end of JSON input' }))).toBe(true);
  });

  it('returns false for unrelated error', () => {
    expect(isAcknowledgementIssue(makeLog({ error: 'timeout occurred' }))).toBe(false);
  });

  it('returns false when error is null and no metadata flag', () => {
    expect(isAcknowledgementIssue(makeLog({ error: null }))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isStatusSyncIssue
// ---------------------------------------------------------------------------

describe('isStatusSyncIssue', () => {
  it('returns false for null', () => {
    expect(isStatusSyncIssue(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isStatusSyncIssue(undefined)).toBe(false);
  });

  it('matches "db circuit"', () => {
    expect(isStatusSyncIssue('db circuit breaker open')).toBe(true);
  });

  it('matches "database unreachable"', () => {
    expect(isStatusSyncIssue('Database unreachable')).toBe(true);
  });

  it('matches "failed to get execution status"', () => {
    expect(isStatusSyncIssue('Failed to get execution status from worker')).toBe(true);
  });

  it('matches "status sync"', () => {
    expect(isStatusSyncIssue('status sync timeout')).toBe(true);
  });

  it('matches "execution status"', () => {
    expect(isStatusSyncIssue('execution status update failed')).toBe(true);
  });

  it('returns false for unrelated error', () => {
    expect(isStatusSyncIssue('rate limit exceeded')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// classifyExecutionResult
// ---------------------------------------------------------------------------

describe('classifyExecutionResult', () => {
  it('returns "stuck" when terminal status + UI has a running node', () => {
    const result = makeResult({
      status: 'success',
      logs: [],
      uiNodeStatuses: { n1: 'running', n2: 'success' },
    });
    expect(classifyExecutionResult(result)).toBe('stuck');
  });

  it('does not return "stuck" when no UI node is running', () => {
    const result = makeResult({
      status: 'success',
      uiNodeStatuses: { n1: 'success' },
    });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('does not return "stuck" for non-terminal backend status', () => {
    const result = makeResult({
      status: 'running',
      uiNodeStatuses: { n1: 'running' },
    });
    // status is not terminal so stuck check is skipped
    expect(classifyExecutionResult(result)).not.toBe('stuck');
  });

  it('returns "status_sync_issue" when result.error matches sync pattern', () => {
    const result = makeResult({
      status: 'failed',
      error: 'failed to get execution status',
      logs: [],
    });
    expect(classifyExecutionResult(result)).toBe('status_sync_issue');
  });

  it('returns "auth_failure" when a failed node has an auth error', () => {
    const result = makeResult({
      status: 'failed',
      logs: [makeLog({ status: 'failed', error: 'Token expired' })],
    });
    expect(classifyExecutionResult(result)).toBe('auth_failure');
  });

  it('returns "acknowledgement_warning" when all failed logs are acknowledgement issues', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        makeLog({
          status: 'failed',
          metadata: { acknowledgementStatus: 'parse_failed' },
        }),
        makeLog({
          status: 'failed',
          error: 'unexpected end of JSON input',
        }),
      ],
    });
    expect(classifyExecutionResult(result)).toBe('acknowledgement_warning');
  });

  it('returns "node_error" when mixed failed logs (not all acknowledgement)', () => {
    const result = makeResult({
      status: 'failed',
      logs: [
        makeLog({ status: 'failed', error: 'timeout' }),
        makeLog({ status: 'failed', metadata: { acknowledgementStatus: 'parse_failed' } }),
      ],
    });
    expect(classifyExecutionResult(result)).toBe('node_error');
  });

  it('returns "node_error" when any failed log is present (no auth, no ack)', () => {
    const result = makeResult({
      status: 'failed',
      logs: [makeLog({ status: 'failed', error: 'something generic' })],
    });
    expect(classifyExecutionResult(result)).toBe('node_error');
  });

  it('returns "node_error" when logs are null and backend status is failed', () => {
    const result = makeResult({ status: 'failed', logs: null });
    expect(classifyExecutionResult(result)).toBe('node_error');
  });

  it('does NOT return "node_error" when logs are null but backend status is success', () => {
    const result = makeResult({ status: 'success', logs: null });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('returns "partial_success" when there are skipped logs and no failed', () => {
    const result = makeResult({
      status: 'success',
      logs: [
        makeLog({ status: 'success' }),
        makeLog({ nodeId: 'n2', status: 'skipped' }),
      ],
    });
    expect(classifyExecutionResult(result)).toBe('partial_success');
  });

  it('returns "full_success" when all logs succeed', () => {
    const result = makeResult({
      status: 'success',
      logs: [makeLog({ status: 'success' }), makeLog({ nodeId: 'n2', status: 'success' })],
    });
    expect(classifyExecutionResult(result)).toBe('full_success');
  });

  it('returns "full_success" for empty logs with success status', () => {
    expect(classifyExecutionResult(makeResult({ status: 'success', logs: [] }))).toBe('full_success');
  });

  it('never throws — returns "node_error" on internal error', () => {
    // Pass a result that would cause an exception mid-classification
    const bad = { id: 'x', status: 'success', logs: null, uiNodeStatuses: null as any };
    expect(() => classifyExecutionResult(bad as any)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// friendlyErrorMessage
// ---------------------------------------------------------------------------

describe('friendlyErrorMessage', () => {
  it('returns fallback for null', () => {
    expect(friendlyErrorMessage(null)).toContain('Check the node configuration');
  });

  it('returns fallback for undefined', () => {
    expect(friendlyErrorMessage(undefined)).toContain('Check the node configuration');
  });

  it('matches timeout', () => {
    expect(friendlyErrorMessage('Operation timed out after 30s')).toContain('took too long');
  });

  it('matches timed out variant', () => {
    expect(friendlyErrorMessage('request timed out')).toContain('took too long');
  });

  it('matches rate limit', () => {
    expect(friendlyErrorMessage('rate limit exceeded')).toContain('rate-limited');
  });

  it('matches 429', () => {
    expect(friendlyErrorMessage('HTTP 429 Too Many Requests')).toContain('rate-limited');
  });

  it('matches not found', () => {
    expect(friendlyErrorMessage('Resource not found')).toContain('not found');
  });

  it('matches 404', () => {
    expect(friendlyErrorMessage('Error 404')).toContain('not found');
  });

  it('matches permission', () => {
    expect(friendlyErrorMessage('permission denied')).toContain("doesn't have permission");
  });

  it('matches 403', () => {
    expect(friendlyErrorMessage('403 Forbidden')).toContain("doesn't have permission");
  });

  it('matches forbidden', () => {
    expect(friendlyErrorMessage('Action forbidden')).toContain("doesn't have permission");
  });

  it('matches acknowledgement', () => {
    expect(friendlyErrorMessage('acknowledgement parse failed')).toContain('could not be read');
  });

  it('matches "could not be read"', () => {
    expect(friendlyErrorMessage('response could not be read')).toContain('could not be read');
  });

  it('matches "unexpected end of json input"', () => {
    expect(friendlyErrorMessage('Unexpected end of JSON input')).toContain('could not be read');
  });

  it('matches status sync keyword', () => {
    expect(friendlyErrorMessage('status sync failed')).toContain('status sync failed');
  });

  it('matches network', () => {
    expect(friendlyErrorMessage('network error')).toContain('Check your internet connection');
  });

  it('matches econnrefused', () => {
    expect(friendlyErrorMessage('ECONNREFUSED')).toContain('Check your internet connection');
  });

  it('matches fetch failed', () => {
    expect(friendlyErrorMessage('fetch failed')).toContain('Check your internet connection');
  });

  it('matches invalid', () => {
    expect(friendlyErrorMessage('invalid input provided')).toContain('unexpected data');
  });

  it('returns fallback for unrecognised error', () => {
    expect(friendlyErrorMessage('some internal state corruption')).toContain('Check the node configuration');
  });
});

// ---------------------------------------------------------------------------
// extractServiceName
// ---------------------------------------------------------------------------

describe('extractServiceName', () => {
  it('returns "Unknown" for undefined', () => {
    expect(extractServiceName(undefined)).toBe('Unknown');
  });

  it('matches google_ prefix', () => {
    expect(extractServiceName('google_sheets_read')).toBe('Google');
  });

  it('matches slack_ prefix', () => {
    expect(extractServiceName('slack_send_message')).toBe('Slack');
  });

  it('matches hubspot_ prefix', () => {
    expect(extractServiceName('hubspot_create_contact')).toBe('HubSpot');
  });

  it('matches salesforce_ prefix', () => {
    expect(extractServiceName('salesforce_query')).toBe('Salesforce');
  });

  it('matches notion_ prefix', () => {
    expect(extractServiceName('notion_append_block')).toBe('Notion');
  });

  it('matches github_ prefix', () => {
    expect(extractServiceName('github_create_issue')).toBe('GitHub');
  });

  it('matches linkedin_ prefix', () => {
    expect(extractServiceName('linkedin_post')).toBe('LinkedIn');
  });

  it('matches twitter_ prefix', () => {
    expect(extractServiceName('twitter_tweet')).toBe('Twitter');
  });

  it('matches facebook_ prefix', () => {
    expect(extractServiceName('facebook_post')).toBe('Facebook');
  });

  it('matches instagram_ prefix', () => {
    expect(extractServiceName('instagram_media')).toBe('Instagram');
  });

  it('matches whatsapp_ prefix', () => {
    expect(extractServiceName('whatsapp_send')).toBe('WhatsApp');
  });

  it('matches zoho_ prefix', () => {
    expect(extractServiceName('zoho_crm_lead')).toBe('Zoho');
  });

  it('matches stripe_ prefix', () => {
    expect(extractServiceName('stripe_charge')).toBe('Stripe');
  });

  it('matches airtable_ prefix', () => {
    expect(extractServiceName('airtable_list_records')).toBe('Airtable');
  });

  it('falls back to capitalised first segment for unknown prefix', () => {
    expect(extractServiceName('dropbox_upload')).toBe('Dropbox');
  });

  it('capitalises single-word node type', () => {
    expect(extractServiceName('trigger')).toBe('Trigger');
  });

  it('handles hyphen-delimited node type fallback', () => {
    expect(extractServiceName('custom-action')).toBe('Custom');
  });
});
