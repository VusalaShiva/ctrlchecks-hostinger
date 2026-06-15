import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  oauthRequirementCandidates,
  filterStillBlockingOAuth,
  oauthRowNeedsGoogleConnect,
} from '../wizard-oauth-credentials';

/**
 * Bug Condition Exploration Test
 *
 * Validates: Requirements 1.1, 1.2
 *
 * The generate-workflow API never returns a credentialStatuses array, so
 * filterStillBlockingOAuth always receives credentialStatuses=undefined and
 * treats every OAuth credential as blocking — even when the user has already
 * connected it in the dashboard.
 *
 * This test documents the bug condition:
 *   filterStillBlockingOAuth([linkedinRow], undefined, false) returns [linkedinRow]
 *   instead of [] — LinkedIn is shown as "Action required" even when connected.
 *
 * EXPECTED OUTCOME ON UNFIXED CODE: PASSES (confirms the bug exists)
 * EXPECTED OUTCOME AFTER FIX (task 3.2): this test will be superseded by the
 *   fix-verification test which asserts the resolved_connected path works end-to-end.
 */
describe('Bug Condition Exploration — credentialStatuses missing from API response', () => {
  const linkedinRow = {
    vaultKey: 'linkedin',
    credentialId: 'linkedin',
    provider: 'linkedin',
    displayName: 'LinkedIn OAuth',
    type: 'oauth',
  };

  it('filterStillBlockingOAuth treats LinkedIn as blocking when credentialStatuses is undefined (bug condition)', () => {
    // The API omits credentialStatuses entirely → undefined is passed through.
    // The function has no status to check, so it falls through to "still blocking".
    // Counterexample: result is [linkedinRow] — LinkedIn shown as "Action required"
    // even for users who have already connected their LinkedIn account.
    const result = filterStillBlockingOAuth([linkedinRow], undefined, false);
    expect(result).toHaveLength(1);
  });
});

describe('oauthRequirementCandidates', () => {
  it('includes unsatisfied oauth from discoveredCredentials', () => {
    const out = oauthRequirementCandidates(
      [
        {
          type: 'oauth',
          provider: 'google',
          vaultKey: 'google',
          satisfied: false,
        },
      ],
      []
    );
    expect(out).toHaveLength(1);
    expect((out[0] as any).vaultKey).toBe('google');
  });

  it('ignores satisfied oauth in discovery', () => {
    const out = oauthRequirementCandidates(
      [{ type: 'oauth', vaultKey: 'google', satisfied: true }],
      []
    );
    expect(out).toHaveLength(0);
  });

  it('adds Google from required_missing status when discovery omits oauth row', () => {
    const out = oauthRequirementCandidates(
      [],
      [{ nodeId: 'n1', credentialId: 'google', status: 'required_missing', displayName: 'Gmail' }]
    );
    expect(out).toHaveLength(1);
    expect((out[0] as any).type).toBe('oauth');
    expect((out[0] as any).credentialId).toBe('google');
  });

  it('dedupes google from both discovery and status', () => {
    const out = oauthRequirementCandidates(
      [{ type: 'oauth', vaultKey: 'google', satisfied: false }],
      [{ nodeId: 'n1', credentialId: 'google', status: 'required_missing' }]
    );
    expect(out).toHaveLength(1);
  });
});

describe('filterStillBlockingOAuth', () => {
  const googleRow = { type: 'oauth', vaultKey: 'google', credentialId: 'google' };

  it('clears google when live token connected', () => {
    const blocking = filterStillBlockingOAuth([googleRow], [], true);
    expect(blocking).toHaveLength(0);
  });

  it('clears when credentialStatuses shows resolved_connected', () => {
    const blocking = filterStillBlockingOAuth(
      [googleRow],
      [{ nodeId: 'n1', credentialId: 'google', status: 'resolved_connected' }],
      false
    );
    expect(blocking).toHaveLength(0);
  });

  it('blocks when no token and no resolved status', () => {
    const blocking = filterStillBlockingOAuth([googleRow], [], false);
    expect(blocking).toHaveLength(1);
  });
});

describe('oauthRowNeedsGoogleConnect', () => {
  it('detects google vault key', () => {
    expect(oauthRowNeedsGoogleConnect({ vaultKey: 'google' })).toBe(true);
  });
  it('detects gmail alias', () => {
    expect(oauthRowNeedsGoogleConnect({ credentialId: 'gmail' })).toBe(true);
  });
});

/**
 * Preservation Property Tests (Task 2)
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5
 *
 * These tests confirm baseline behavior that must be preserved after the fix.
 * All tests PASS on unfixed code — they document what already works correctly
 * in filterStillBlockingOAuth when credentialStatuses IS provided.
 */
describe('Preservation — filterStillBlockingOAuth baseline behavior', () => {
  const linkedinRow = {
    vaultKey: 'linkedin',
    credentialId: 'linkedin',
    provider: 'linkedin',
    displayName: 'LinkedIn OAuth',
    type: 'oauth',
  };

  // Test 1: LinkedIn with resolved_connected returns [] (already works, needs explicit test)
  it('returns [] for LinkedIn when credentialStatuses contains resolved_connected entry', () => {
    // Validates: Requirements 3.1, 3.5
    const result = filterStillBlockingOAuth(
      [linkedinRow],
      [{ nodeId: 'n1', credentialId: 'linkedin', status: 'resolved_connected' }],
      false
    );
    expect(result).toHaveLength(0);
  });

  // Test 2: required_missing entry still blocks
  it('returns the row as blocking when credentialStatuses contains required_missing entry', () => {
    // Validates: Requirements 3.1
    const result = filterStillBlockingOAuth(
      [linkedinRow],
      [{ nodeId: 'n1', credentialId: 'linkedin', status: 'required_missing' }],
      false
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(linkedinRow);
  });

  // Test 3: No-credential workflow returns []
  it('returns [] for no-credential workflow: filterStillBlockingOAuth([], [], false)', () => {
    // Validates: Requirements 3.4
    const result = filterStillBlockingOAuth([], [], false);
    expect(result).toEqual([]);
  });

  // Test 4: Property-based — every candidate with a matching resolved_connected entry → empty result
  it('property: result is empty when every candidate has a matching resolved_connected entry', () => {
    // Validates: Requirements 3.1, 3.5
    // **Validates: Requirements 3.1, 3.5**
    const providerArb = fc.constantFrom('linkedin', 'notion', 'twitter', 'zoho');

    fc.assert(
      fc.property(
        fc.array(providerArb, { minLength: 1, maxLength: 5 }),
        (providers) => {
          // Dedupe providers so each candidate is unique
          const unique = [...new Set(providers)];
          const candidates = unique.map((p) => ({
            vaultKey: p,
            credentialId: p,
            provider: p,
            type: 'oauth',
          }));
          // Build a resolved_connected entry for every candidate
          const statuses = unique.map((p) => ({
            nodeId: 'n1',
            credentialId: p,
            status: 'resolved_connected',
          }));

          const result = filterStillBlockingOAuth(candidates, statuses, false);
          return result.length === 0;
        }
      )
    );
  });
});
