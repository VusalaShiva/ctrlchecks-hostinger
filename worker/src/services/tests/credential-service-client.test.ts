import {
  isCredentialServiceEnabled,
  getCanaryPercent,
  shouldUseCredentialService,
  isCredentialVaultWritesDisabled,
} from '../credential-service-client';

afterEach(() => {
  delete process.env.CREDENTIAL_SERVICE_ENABLED;
  delete process.env.CREDENTIAL_SERVICE_CANARY_PERCENT;
  delete process.env.CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED;
});

// ── isCredentialServiceEnabled ───────────────────────────────────────────────

describe('isCredentialServiceEnabled()', () => {
  it('returns false when env var is unset', () => {
    expect(isCredentialServiceEnabled()).toBe(false);
  });

  it('returns true when set to "true"', () => {
    process.env.CREDENTIAL_SERVICE_ENABLED = 'true';
    expect(isCredentialServiceEnabled()).toBe(true);
  });

  it('returns false when set to "false"', () => {
    process.env.CREDENTIAL_SERVICE_ENABLED = 'false';
    expect(isCredentialServiceEnabled()).toBe(false);
  });
});

// ── getCanaryPercent ─────────────────────────────────────────────────────────

describe('getCanaryPercent()', () => {
  it('returns 0 when unset', () => {
    expect(getCanaryPercent()).toBe(0);
  });

  it('returns 100 when set to "100"', () => {
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '100';
    expect(getCanaryPercent()).toBe(100);
  });

  it('clamps to 0 for negative values', () => {
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '-5';
    expect(getCanaryPercent()).toBe(0);
  });

  it('clamps to 100 for values over 100', () => {
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '150';
    expect(getCanaryPercent()).toBe(100);
  });

  it('returns 0 for non-numeric values', () => {
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = 'all';
    expect(getCanaryPercent()).toBe(0);
  });
});

// ── shouldUseCredentialService ───────────────────────────────────────────────

describe('shouldUseCredentialService()', () => {
  it('returns false when service is disabled', () => {
    expect(shouldUseCredentialService('user-abc')).toBe(false);
  });

  it('returns false when enabled but canary=0', () => {
    process.env.CREDENTIAL_SERVICE_ENABLED = 'true';
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '0';
    expect(shouldUseCredentialService('user-abc')).toBe(false);
  });

  it('returns true when enabled and canary=100', () => {
    process.env.CREDENTIAL_SERVICE_ENABLED = 'true';
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '100';
    expect(shouldUseCredentialService('user-abc')).toBe(true);
  });

  it('is deterministic for the same userId', () => {
    process.env.CREDENTIAL_SERVICE_ENABLED = 'true';
    process.env.CREDENTIAL_SERVICE_CANARY_PERCENT = '50';
    const uid = 'user-determinism-test';
    const first = shouldUseCredentialService(uid);
    expect(shouldUseCredentialService(uid)).toBe(first);
    expect(shouldUseCredentialService(uid)).toBe(first);
  });
});

// ── isCredentialVaultWritesDisabled ─────────────────────────────────────────

describe('isCredentialVaultWritesDisabled()', () => {
  it('returns false when env var is unset', () => {
    expect(isCredentialVaultWritesDisabled()).toBe(false);
  });

  it('returns false when set to "false"', () => {
    process.env.CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED = 'false';
    expect(isCredentialVaultWritesDisabled()).toBe(false);
  });

  it('returns true when set to "true"', () => {
    process.env.CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED = 'true';
    expect(isCredentialVaultWritesDisabled()).toBe(true);
  });

  it('returns false for any other string', () => {
    process.env.CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED = '1';
    expect(isCredentialVaultWritesDisabled()).toBe(false);
  });
});
