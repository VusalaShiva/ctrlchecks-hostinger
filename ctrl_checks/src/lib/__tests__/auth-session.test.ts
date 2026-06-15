import { describe, expect, it } from 'vitest';
import {
  getPublicAuthRedirectPath,
  isAlreadySignedInAuthError,
  isValidAuthSession,
  normalizeAuthState,
} from '@/lib/auth-session';
import type { AuthSession } from '@/lib/auth-context';

const validSession: AuthSession = {
  access_token: 'access-token',
  expires_at: 4_102_444_800,
  user: { id: 'user-1', email: 'user@example.com' },
};

describe('auth session helpers', () => {
  it('treats a hydrated Cognito-compatible session as valid', () => {
    expect(isValidAuthSession(validSession, 1_700_000_000)).toBe(true);
    expect(normalizeAuthState(validSession).user?.email).toBe('user@example.com');
  });

  it('treats missing or expired sessions as signed out', () => {
    expect(isValidAuthSession(null)).toBe(false);
    expect(isValidAuthSession({ ...validSession, expires_at: 10 }, 11)).toBe(false);
    expect(normalizeAuthState({ ...validSession, access_token: '' }).session).toBeNull();
  });

  it('redirects public auth pages only after loading completes with a valid session', () => {
    expect(getPublicAuthRedirectPath({ loading: true, session: validSession })).toBeNull();
    expect(getPublicAuthRedirectPath({ loading: false, session: null })).toBeNull();
    expect(getPublicAuthRedirectPath({ loading: false, session: validSession })).toBe('/dashboard');
  });

  it('detects already-signed-in auth errors for defensive dashboard routing', () => {
    expect(isAlreadySignedInAuthError('There is already a signed in user.')).toBe(true);
    expect(isAlreadySignedInAuthError(new Error('Already signed-in'))).toBe(true);
    expect(isAlreadySignedInAuthError('Incorrect username or password.')).toBe(false);
  });
});
