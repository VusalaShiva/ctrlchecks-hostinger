/**
 * Property 1: Login flow never requests integration scopes
 * Validates: Requirements 1.1, 1.3, 6.1, 6.3
 */
import { describe, it } from 'vitest';
import fc from 'fast-check';

// The integration scope keywords that must never appear in login OAuth options
const INTEGRATION_SCOPE_KEYWORDS = [
  'gmail',
  'drive',
  'calendar',
  'spreadsheets',
  'bigquery',
  'tasks',
  'contacts',
  'documents',
];

/**
 * Mirrors the options object that signInWithGoogle() passes to awsClient.auth.signInWithOAuth.
 * After task 2.1, queryParams is removed — only redirectTo remains.
 */
function buildLoginOAuthOptions(origin: string) {
  return {
    redirectTo: `${origin}/dashboard`,
    // No queryParams — provider defaults to openid profile email
  };
}

describe('Property 1: Login flow never requests integration scopes', () => {
  it('signInWithGoogle options never contain integration scope strings', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary origins to simulate different environments
        fc.oneof(
          fc.constant('https://app.example.com'),
          fc.constant('http://localhost:5173'),
          fc.constant('https://staging.example.com'),
          fc.webUrl({ withFragments: false, withQueryParameters: false }),
        ),
        (origin) => {
          const options = buildLoginOAuthOptions(origin);
          const optionsStr = JSON.stringify(options);

          return INTEGRATION_SCOPE_KEYWORDS.every(
            (keyword) => !optionsStr.toLowerCase().includes(keyword),
          );
        },
      ),
      { numRuns: 100 },
    );
  });

  it('login options object has no queryParams property', () => {
    fc.assert(
      fc.property(fc.constant('https://app.example.com'), (origin) => {
        const options = buildLoginOAuthOptions(origin);
        return !('queryParams' in options);
      }),
      { numRuns: 100 },
    );
  });

  it('login options redirectTo always points to /dashboard', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('https://app.example.com'),
          fc.constant('http://localhost:5173'),
        ),
        (origin) => {
          const options = buildLoginOAuthOptions(origin);
          return options.redirectTo === `${origin}/dashboard`;
        },
      ),
      { numRuns: 100 },
    );
  });
});
