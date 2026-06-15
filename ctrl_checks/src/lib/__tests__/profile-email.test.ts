import { describe, it, expect } from 'vitest';
import {
  isGeneratedCognitoEmail,
  getAuthEmail,
  resolveProfileEmail,
} from '@/lib/profile-email';
import type { AuthUser } from '@/lib/auth-context';

describe('isGeneratedCognitoEmail', () => {
  it('returns false for undefined', () => {
    expect(isGeneratedCognitoEmail(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isGeneratedCognitoEmail(null)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isGeneratedCognitoEmail('')).toBe(false);
  });

  it('returns false for a real email address', () => {
    expect(isGeneratedCognitoEmail('user@gmail.com')).toBe(false);
  });

  it('returns true for a @cognito.local address', () => {
    expect(isGeneratedCognitoEmail('abc123@cognito.local')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isGeneratedCognitoEmail('ABC@COGNITO.LOCAL')).toBe(true);
  });

  it('trims leading/trailing whitespace before testing', () => {
    expect(isGeneratedCognitoEmail('  user@cognito.local  ')).toBe(true);
  });

  it('returns false when domain contains cognito.local but is not @cognito.local', () => {
    expect(isGeneratedCognitoEmail('user@notcognito.local')).toBe(false);
  });
});

describe('getAuthEmail', () => {
  it('returns empty string for undefined user', () => {
    expect(getAuthEmail(undefined)).toBe('');
  });

  it('returns empty string for null user', () => {
    expect(getAuthEmail(null)).toBe('');
  });

  it('returns user.email when present', () => {
    const user: AuthUser = { id: '1', email: 'direct@example.com' };
    expect(getAuthEmail(user)).toBe('direct@example.com');
  });

  it('trims whitespace from user.email', () => {
    const user: AuthUser = { id: '1', email: '  padded@example.com  ' };
    expect(getAuthEmail(user)).toBe('padded@example.com');
  });

  it('falls back to user_metadata.email when user.email is absent', () => {
    const user: AuthUser = { id: '1', user_metadata: { email: 'meta@example.com' } };
    expect(getAuthEmail(user)).toBe('meta@example.com');
  });

  it('falls back to user_metadata.preferred_username when both email fields are absent', () => {
    const user: AuthUser = { id: '1', user_metadata: { preferred_username: 'handle@example.com' } };
    expect(getAuthEmail(user)).toBe('handle@example.com');
  });

  it('returns empty string when user has no email-like fields', () => {
    const user: AuthUser = { id: '1' };
    expect(getAuthEmail(user)).toBe('');
  });

  it('prefers user.email over user_metadata.email', () => {
    const user: AuthUser = {
      id: '1',
      email: 'primary@example.com',
      user_metadata: { email: 'secondary@example.com' },
    };
    expect(getAuthEmail(user)).toBe('primary@example.com');
  });

  it('prefers user_metadata.email over preferred_username', () => {
    const user: AuthUser = {
      id: '1',
      user_metadata: { email: 'meta@example.com', preferred_username: 'other@example.com' },
    };
    expect(getAuthEmail(user)).toBe('meta@example.com');
  });
});

describe('resolveProfileEmail', () => {
  const realUser: AuthUser = { id: '1', email: 'auth@example.com' };
  const noEmailUser: AuthUser = { id: '1' };

  it('returns authEmail when savedEmail is absent', () => {
    expect(resolveProfileEmail(null, realUser)).toBe('auth@example.com');
  });

  it('returns authEmail when savedEmail is empty string', () => {
    expect(resolveProfileEmail('', realUser)).toBe('auth@example.com');
  });

  it('returns authEmail when savedEmail is a cognito address', () => {
    expect(resolveProfileEmail('old@cognito.local', realUser)).toBe('auth@example.com');
  });

  it('returns savedEmail when it is a real address and authEmail is present', () => {
    expect(resolveProfileEmail('saved@example.com', realUser)).toBe('saved@example.com');
  });

  it('returns savedEmail when authEmail is absent', () => {
    expect(resolveProfileEmail('saved@example.com', noEmailUser)).toBe('saved@example.com');
  });

  it('returns empty string when both savedEmail and authEmail are absent', () => {
    expect(resolveProfileEmail(null, noEmailUser)).toBe('');
  });

  it('returns empty string when savedEmail is empty and authEmail is absent', () => {
    expect(resolveProfileEmail('', noEmailUser)).toBe('');
  });

  it('returns cognito savedEmail when authEmail is absent (no auth to override it)', () => {
    expect(resolveProfileEmail('old@cognito.local', noEmailUser)).toBe('old@cognito.local');
  });

  it('trims whitespace from savedEmail before comparing', () => {
    expect(resolveProfileEmail('  saved@example.com  ', realUser)).toBe('saved@example.com');
  });
});
