import { describe, it, expect } from 'vitest';
import {
  GOOGLE_IDENTITY_SCOPES,
  INTEGRATION_SCOPES,
  GOOGLE_CONNECTOR_SCOPES,
} from '../google-scopes';

describe('GOOGLE_IDENTITY_SCOPES', () => {
  it('is a single space-separated string', () => {
    expect(typeof GOOGLE_IDENTITY_SCOPES).toBe('string');
    expect(GOOGLE_IDENTITY_SCOPES).not.toContain(',');
    expect(GOOGLE_IDENTITY_SCOPES).not.toContain('\n');
  });

  it('has exact value "openid email profile"', () => {
    expect(GOOGLE_IDENTITY_SCOPES).toBe('openid email profile');
  });

  it('contains exactly 3 scopes', () => {
    expect(GOOGLE_IDENTITY_SCOPES.split(' ')).toHaveLength(3);
  });

  it('contains openid, email, and profile', () => {
    const scopes = GOOGLE_IDENTITY_SCOPES.split(' ');
    expect(scopes).toContain('openid');
    expect(scopes).toContain('email');
    expect(scopes).toContain('profile');
  });
});

describe('INTEGRATION_SCOPES', () => {
  it('is a single space-separated string', () => {
    expect(typeof INTEGRATION_SCOPES).toBe('string');
    expect(INTEGRATION_SCOPES).not.toContain(',');
    expect(INTEGRATION_SCOPES).not.toContain('\n');
  });

  it('contains exactly 9 scope URLs', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toHaveLength(9);
  });

  it('all scopes start with https://www.googleapis.com/', () => {
    const scopes = INTEGRATION_SCOPES.split(' ');
    for (const scope of scopes) {
      expect(scope).toMatch(/^https:\/\/www\.googleapis\.com\//);
    }
  });

  it('contains spreadsheets scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/spreadsheets'
    );
  });

  it('contains documents scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/documents'
    );
  });

  it('contains drive scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/drive'
    );
  });

  it('contains calendar scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/calendar'
    );
  });

  it('contains gmail.send scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/gmail.send'
    );
  });

  it('contains gmail.readonly scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/gmail.readonly'
    );
  });

  it('contains bigquery scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/bigquery'
    );
  });

  it('contains tasks scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/tasks'
    );
  });

  it('contains contacts scope', () => {
    expect(INTEGRATION_SCOPES.split(' ')).toContain(
      'https://www.googleapis.com/auth/contacts'
    );
  });
});

describe('GOOGLE_CONNECTOR_SCOPES', () => {
  it('equals GOOGLE_IDENTITY_SCOPES + space + INTEGRATION_SCOPES', () => {
    expect(GOOGLE_CONNECTOR_SCOPES).toBe(
      `${GOOGLE_IDENTITY_SCOPES} ${INTEGRATION_SCOPES}`
    );
  });

  it('starts with GOOGLE_IDENTITY_SCOPES', () => {
    expect(GOOGLE_CONNECTOR_SCOPES.startsWith(GOOGLE_IDENTITY_SCOPES)).toBe(true);
  });

  it('ends with INTEGRATION_SCOPES', () => {
    expect(GOOGLE_CONNECTOR_SCOPES.endsWith(INTEGRATION_SCOPES)).toBe(true);
  });

  it('contains exactly 12 scopes (3 identity + 9 integration)', () => {
    expect(GOOGLE_CONNECTOR_SCOPES.split(' ')).toHaveLength(12);
  });

  it('has no duplicate scopes', () => {
    const scopes = GOOGLE_CONNECTOR_SCOPES.split(' ');
    const unique = new Set(scopes);
    expect(unique.size).toBe(scopes.length);
  });

  it('is a single space-separated string with no commas or newlines', () => {
    expect(GOOGLE_CONNECTOR_SCOPES).not.toContain(',');
    expect(GOOGLE_CONNECTOR_SCOPES).not.toContain('\n');
  });
});
