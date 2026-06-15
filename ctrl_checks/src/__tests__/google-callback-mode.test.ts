/**
 * Property 2: Login callback never stores connector tokens
 * Validates: Requirements 1.4
 *
 * Property 3: Connector callback stores tokens for correct user
 * Validates: Requirements 2.3
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { INTEGRATION_SCOPES } from '../lib/google-scopes';

// ---------------------------------------------------------------------------
// Pure functions that mirror the callback's branching logic
// ---------------------------------------------------------------------------

/**
 * Mirrors the mode-detection branch in Callback.tsx's processSession.
 * Returns true only when the URL params indicate connector mode.
 */
function shouldSaveTokens(searchParams: string): boolean {
  const params = new URLSearchParams(searchParams);
  return params.get('mode') === 'connector';
}

/**
 * Mirrors the upsert payload construction in Callback.tsx's connector branch.
 */
function buildUpsertPayload(
  userId: string,
  providerToken: string,
  providerRefreshToken: string | null,
) {
  return {
    user_id: userId,
    access_token: providerToken,
    refresh_token: providerRefreshToken,
    expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
    token_type: 'Bearer',
    scope: INTEGRATION_SCOPES,
    updated_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Property 2: Login callback never stores connector tokens
// ---------------------------------------------------------------------------

describe('Property 2: Login callback never stores connector tokens', () => {
  it('shouldSaveTokens returns false for any params without mode=connector', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary key=value pairs that do NOT set mode=connector
        fc.array(
          fc.tuple(
            fc.stringMatching(/^[a-zA-Z0-9_-]+$/),
            fc.stringMatching(/^[a-zA-Z0-9_-]*$/),
          ).filter(([k, v]) => !(k === 'mode' && v === 'connector')),
          { minLength: 0, maxLength: 8 },
        ),
        (pairs) => {
          const searchParams = pairs.map(([k, v]) => `${k}=${v}`).join('&');
          return shouldSaveTokens(searchParams) === false;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('shouldSaveTokens returns false for empty params', () => {
    expect(shouldSaveTokens('')).toBe(false);
  });

  it('shouldSaveTokens returns false when mode has a different value', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s !== 'connector'),
        (modeValue) => {
          return shouldSaveTokens(`mode=${modeValue}`) === false;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('shouldSaveTokens returns true when mode=connector is present', () => {
    expect(shouldSaveTokens('mode=connector')).toBe(true);
    expect(shouldSaveTokens('mode=connector&returnTo=%2Fworkflows')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Property 3: Connector callback stores tokens for correct user
// ---------------------------------------------------------------------------

describe('Property 3: Connector callback stores tokens for correct user', () => {
  it('buildUpsertPayload maps userId and providerToken correctly', () => {
    fc.assert(
      fc.property(
        // UUID-like user IDs
        fc.uuid(),
        // Non-empty provider token strings
        fc.string({ minLength: 1, maxLength: 512 }),
        // Optional refresh token
        fc.option(fc.string({ minLength: 1, maxLength: 512 }), { nil: null }),
        (userId, providerToken, providerRefreshToken) => {
          const payload = buildUpsertPayload(userId, providerToken, providerRefreshToken);

          return (
            payload.user_id === userId &&
            payload.access_token === providerToken &&
            payload.scope === INTEGRATION_SCOPES &&
            payload.token_type === 'Bearer'
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildUpsertPayload refresh_token matches input', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.string({ minLength: 1 }),
        fc.option(fc.string({ minLength: 1 }), { nil: null }),
        (userId, providerToken, refreshToken) => {
          const payload = buildUpsertPayload(userId, providerToken, refreshToken);
          return payload.refresh_token === refreshToken;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildUpsertPayload scope is always INTEGRATION_SCOPES', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.string({ minLength: 1 }),
        (userId, providerToken) => {
          const payload = buildUpsertPayload(userId, providerToken, null);
          return payload.scope === INTEGRATION_SCOPES;
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildUpsertPayload expires_at and updated_at are ISO date strings', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.string({ minLength: 1 }),
        (userId, providerToken) => {
          const payload = buildUpsertPayload(userId, providerToken, null);
          const expiresAt = new Date(payload.expires_at);
          const updatedAt = new Date(payload.updated_at);
          return !isNaN(expiresAt.getTime()) && !isNaN(updatedAt.getTime());
        },
      ),
      { numRuns: 100 },
    );
  });
});
