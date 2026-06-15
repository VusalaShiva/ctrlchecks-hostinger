import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getFacebookOAuthOptions,
  getFacebookOAuthScopeString,
} from '../facebookSignInOptions';

beforeEach(() => {
  // Baseline: simulate env vars absent (real .env.local may have them set)
  vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', '');
  vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', '');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getFacebookOAuthScopeString', () => {
  it('returns base scope when env var is not set', () => {
    expect(getFacebookOAuthScopeString()).toBe('public_profile');
  });

  it('returns base scope when env var is empty string', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', '');
    expect(getFacebookOAuthScopeString()).toBe('public_profile');
  });

  it('returns base scope when env var is whitespace only', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', '   ');
    expect(getFacebookOAuthScopeString()).toBe('public_profile');
  });

  it('appends extra scope with comma separator', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', 'pages_show_list');
    expect(getFacebookOAuthScopeString()).toBe('public_profile,pages_show_list');
  });

  it('trims leading/trailing whitespace from extra scopes', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', '  pages_show_list  ');
    expect(getFacebookOAuthScopeString()).toBe('public_profile,pages_show_list');
  });

  it('preserves comma-separated multiple extra scopes as-is', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', 'pages_show_list,pages_read_engagement');
    expect(getFacebookOAuthScopeString()).toBe('public_profile,pages_show_list,pages_read_engagement');
  });

  it('always starts with public_profile', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', 'business_management');
    expect(getFacebookOAuthScopeString()).toMatch(/^public_profile/);
  });
});

describe('getFacebookOAuthOptions', () => {
  const REDIRECT = 'https://app.example.com/auth/callback';

  it('always includes redirectTo', () => {
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result.redirectTo).toBe(REDIRECT);
  });

  it('always includes scopes field', () => {
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result).toHaveProperty('scopes');
    expect(typeof result.scopes).toBe('string');
  });

  it('scopes defaults to public_profile when no extra scopes set', () => {
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result.scopes).toBe('public_profile');
  });

  it('scopes includes extra scope when env is set', () => {
    vi.stubEnv('VITE_META_FACEBOOK_EXTRA_SCOPES', 'pages_show_list');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result.scopes).toBe('public_profile,pages_show_list');
  });

  it('omits queryParams when config_id env var is not set', () => {
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result).not.toHaveProperty('queryParams');
  });

  it('omits queryParams when config_id env var is empty string', () => {
    vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', '');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result).not.toHaveProperty('queryParams');
  });

  it('omits queryParams when config_id env var is whitespace only', () => {
    vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', '   ');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result).not.toHaveProperty('queryParams');
  });

  it('includes queryParams.config_id when env var is set', () => {
    vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', 'abc123');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(result).toHaveProperty('queryParams');
    expect((result as any).queryParams).toEqual({ config_id: 'abc123' });
  });

  it('trims whitespace from config_id', () => {
    vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', '  abc123  ');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect((result as any).queryParams).toEqual({ config_id: 'abc123' });
  });

  it('passes redirectUrl exactly to redirectTo', () => {
    const url = 'https://custom.host/callback?foo=bar';
    const result = getFacebookOAuthOptions(url);
    expect(result.redirectTo).toBe(url);
  });

  it('result shape has only redirectTo and scopes when no config_id', () => {
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(Object.keys(result)).toEqual(['redirectTo', 'scopes']);
  });

  it('result shape has redirectTo, scopes, and queryParams when config_id is set', () => {
    vi.stubEnv('VITE_META_FACEBOOK_CONFIG_ID', 'cfg_42');
    const result = getFacebookOAuthOptions(REDIRECT);
    expect(Object.keys(result)).toEqual(['redirectTo', 'scopes', 'queryParams']);
  });
});
