import { validateEnv, assertEnv } from '../env-validator';

const REQUIRED = [
  'DATABASE_URL',
  'REDIS_URL',
  'COGNITO_USER_POOL_ID',
  'COGNITO_CLIENT_ID',
  'COGNITO_ISSUER',
  'AWS_REGION',
  'GEMINI_API_KEY',
];

function fullEnv(overrides: Record<string, string> = {}): NodeJS.ProcessEnv {
  const base: Record<string, string> = {
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
    REDIS_URL: 'redis://localhost:6379',
    COGNITO_USER_POOL_ID: 'us-east-1_abc123',
    COGNITO_CLIENT_ID: 'client123',
    COGNITO_ISSUER: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_abc123',
    AWS_REGION: 'us-east-1',
    GEMINI_API_KEY: 'AIzaSy_fake_key',
  };
  return { ...base, ...overrides };
}

describe('validateEnv', () => {
  it('returns valid=true when all required vars are set', () => {
    const result = validateEnv(fullEnv());
    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it('reports each missing required var', () => {
    const env = fullEnv();
    delete env['DATABASE_URL'];
    delete env['REDIS_URL'];
    const result = validateEnv(env);
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('DATABASE_URL');
    expect(result.missing).toContain('REDIS_URL');
    expect(result.missing).toHaveLength(2);
  });

  it('treats empty-string vars as missing', () => {
    const env = fullEnv({ GEMINI_API_KEY: '  ' });
    const result = validateEnv(env);
    expect(result.valid).toBe(false);
    expect(result.missing).toContain('GEMINI_API_KEY');
  });

  it('reports recommended vars as warnings but does not fail', () => {
    const env = fullEnv();
    const result = validateEnv(env);
    expect(result.valid).toBe(true);
    expect(result.warnings).toContain('FRONTEND_URL');
    expect(result.warnings).toContain('AI_GENERATOR_URL');
  });

  it('reports no warnings when all recommended vars are set', () => {
    const env = fullEnv({
      COGNITO_DOMAIN: 'auth.example.auth.us-east-1.amazoncognito.com',
      COGNITO_ADMIN_CLIENT_ID: 'admin123',
      COGNITO_CLIENT_SECRET: 'secret',
      FRONTEND_URL: 'https://app.ctrlchecks.ai',
      AI_GENERATOR_URL: 'http://localhost:3002',
      RAZORPAY_KEY_ID: 'rzp_test_key',
      RAZORPAY_KEY_SECRET: 'rzp_secret',
      SENTRY_DSN: 'https://abc@sentry.io/123',
    });
    const result = validateEnv(env);
    expect(result.warnings).toHaveLength(0);
  });

  it.each(REQUIRED)('flags missing %s', (varName) => {
    const env = fullEnv();
    delete env[varName];
    const result = validateEnv(env);
    expect(result.valid).toBe(false);
    expect(result.missing).toContain(varName);
  });
});

describe('assertEnv', () => {
  it('does not exit when NODE_ENV=test', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit called'); });
    expect(() => assertEnv({ NODE_ENV: 'test' })).not.toThrow();
    exitSpy.mockRestore();
  });

  it('calls process.exit(1) when required vars are missing', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((_code) => { throw new Error('process.exit'); });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => assertEnv({ NODE_ENV: 'production', DATABASE_URL: '' })).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('does not call process.exit when all required vars are present', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((_code) => { throw new Error('process.exit'); });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => assertEnv({ ...fullEnv(), NODE_ENV: 'production' })).not.toThrow();
    expect(exitSpy).not.toHaveBeenCalled();
    exitSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
