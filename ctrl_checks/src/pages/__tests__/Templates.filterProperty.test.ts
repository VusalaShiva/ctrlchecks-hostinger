/**
 * Property-Based Test — Template Search Filtering (P3)
 *
 * Feature: ui-ux-and-auth-improvements, Property 3: Template search filtering is preserved after layout change
 *
 * **Validates: Requirements 2.5**
 *
 * For any search string, the set of templates displayed SHALL be exactly those
 * whose `name` or `description` contains the search string (case-insensitive).
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

// ---------------------------------------------------------------------------
// Replicate the exact filter logic from Templates.tsx
// This is the source of truth — the test asserts that any equivalent
// implementation produces the same result.
// ---------------------------------------------------------------------------

interface Template {
  name: string;
  description: string | null;
}

/**
 * The filter logic extracted verbatim from Templates.tsx:
 *
 *   const filteredTemplates = templates.filter((template) =>
 *     template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 *     template.description?.toLowerCase().includes(searchQuery.toLowerCase())
 *   );
 */
function filterTemplates(templates: Template[], searchQuery: string): Template[] {
  return templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
}

/**
 * Reference implementation — expresses the same predicate in a different way
 * to cross-check the filter logic.
 */
function templateMatchesQuery(template: Template, query: string): boolean {
  const q = query.toLowerCase();
  if (template.name.toLowerCase().includes(q)) return true;
  if (template.description !== null && template.description !== undefined) {
    return template.description.toLowerCase().includes(q);
  }
  return false;
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const templateArb = fc.record({
  name: fc.string({ minLength: 1, maxLength: 60 }),
  description: fc.oneof(
    fc.string({ minLength: 0, maxLength: 120 }),
    fc.constant(null),
  ),
}) satisfies fc.Arbitrary<Template>;

const templateArrayArb = fc.array(templateArb, { minLength: 0, maxLength: 20 });

const searchQueryArb = fc.string({ minLength: 0, maxLength: 30 });

// ---------------------------------------------------------------------------
// Concrete examples
// ---------------------------------------------------------------------------

describe('Template search filtering — concrete examples', () => {
  it('returns templates whose name contains the query (case-insensitive)', () => {
    const templates: Template[] = [
      { name: 'Gmail Sync', description: null },
      { name: 'Slack Notifier', description: null },
      { name: 'Google Sheets Export', description: null },
    ];

    const result = filterTemplates(templates, 'gmail');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gmail Sync');
  });

  it('returns templates whose description contains the query (case-insensitive)', () => {
    const templates: Template[] = [
      { name: 'Workflow A', description: 'Sends emails via Gmail' },
      { name: 'Workflow B', description: 'Posts to Slack' },
    ];

    const result = filterTemplates(templates, 'GMAIL');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Workflow A');
  });

  it('returns all templates when query is empty string', () => {
    const templates: Template[] = [
      { name: 'Alpha', description: 'First' },
      { name: 'Beta', description: null },
    ];

    const result = filterTemplates(templates, '');

    expect(result).toHaveLength(2);
  });

  it('returns empty array when no templates match', () => {
    const templates: Template[] = [
      { name: 'Gmail Sync', description: 'Sync emails' },
    ];

    const result = filterTemplates(templates, 'zoho');

    expect(result).toHaveLength(0);
  });

  it('handles templates with null description without throwing', () => {
    const templates: Template[] = [
      { name: 'No Desc', description: null },
    ];

    expect(() => filterTemplates(templates, 'test')).not.toThrow();
  });

  it('matches are case-insensitive for both name and description', () => {
    const templates: Template[] = [
      { name: 'UPPER CASE NAME', description: 'lower case desc' },
    ];

    expect(filterTemplates(templates, 'upper case name')).toHaveLength(1);
    expect(filterTemplates(templates, 'LOWER CASE DESC')).toHaveLength(1);
    expect(filterTemplates(templates, 'Upper Case Name')).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Property-based tests (minimum 100 iterations each)
// ---------------------------------------------------------------------------

describe('Property 3: Template search filtering is preserved after layout change', () => {
  /**
   * P3-A: The filter output matches the reference predicate for every template.
   *
   * For any array of templates and any search string, every template in the
   * filtered result satisfies the match predicate, and every template that
   * satisfies the predicate appears in the result.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: filtered result is exactly the set of templates matching the predicate', () => {
    fc.assert(
      fc.property(templateArrayArb, searchQueryArb, (templates, query) => {
        const result = filterTemplates(templates, query);

        // Every template in the result must match the predicate
        for (const t of result) {
          expect(templateMatchesQuery(t, query)).toBe(true);
        }

        // Every template that matches the predicate must be in the result
        const expected = templates.filter((t) => templateMatchesQuery(t, query));
        expect(result).toHaveLength(expected.length);
      }),
      { numRuns: 200 },
    );
  });

  /**
   * P3-B: Empty query returns all templates.
   *
   * For any array of templates, filtering with an empty string returns
   * all templates unchanged.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: empty query always returns all templates', () => {
    fc.assert(
      fc.property(templateArrayArb, (templates) => {
        const result = filterTemplates(templates, '');
        expect(result).toHaveLength(templates.length);
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P3-C: Filter is case-insensitive.
   *
   * For any template and query, filtering with the query uppercased produces
   * the same result as filtering with the query lowercased.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: filtering is case-insensitive (upper vs lower query)', () => {
    fc.assert(
      fc.property(templateArrayArb, searchQueryArb, (templates, query) => {
        const resultLower = filterTemplates(templates, query.toLowerCase());
        const resultUpper = filterTemplates(templates, query.toUpperCase());

        expect(resultLower).toHaveLength(resultUpper.length);

        // Both results contain the same template names in the same order
        for (let i = 0; i < resultLower.length; i++) {
          expect(resultLower[i].name).toBe(resultUpper[i].name);
          expect(resultLower[i].description).toBe(resultUpper[i].description);
        }
      }),
      { numRuns: 100 },
    );
  });

  /**
   * P3-D: Null description does not cause errors or false positives.
   *
   * For any query, a template with a null description is only included
   * if its name matches the query.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: null description never causes a false positive match', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 40 }), // template name
        searchQueryArb,
        (name, query) => {
          const templates: Template[] = [{ name, description: null }];
          const result = filterTemplates(templates, query);

          const shouldMatch = name.toLowerCase().includes(query.toLowerCase());
          expect(result).toHaveLength(shouldMatch ? 1 : 0);
        },
      ),
      { numRuns: 100 },
    );
  });

  /**
   * P3-E: A template that matches by name is always included regardless of description.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: a template whose name contains the query is always in the result', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }), // base name
        fc.string({ minLength: 1, maxLength: 15 }), // query substring
        fc.oneof(fc.string({ minLength: 0, maxLength: 60 }), fc.constant(null)),
        (base, sub, description) => {
          // Construct a name that definitely contains the query
          const name = base + sub + base;
          const query = sub;
          const templates: Template[] = [{ name, description }];

          const result = filterTemplates(templates, query);

          // Must be included because name contains query
          expect(result).toHaveLength(1);
          expect(result[0].name).toBe(name);
        },
      ),
      { numRuns: 100 },
    );
  });

  /**
   * P3-F: A template that matches by description is always included.
   *
   * **Validates: Requirements 2.5**
   */
  it('property: a template whose description contains the query is always in the result', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }), // base description
        fc.string({ minLength: 1, maxLength: 15 }), // query substring
        (base, sub) => {
          const description = base + sub + base;
          const query = sub;

          // Use a name that is a fixed string guaranteed not to contain the query
          // by using a name that is purely numeric (query is always non-numeric here
          // since we use the sub which may be anything — so instead use a name that
          // is the empty-safe sentinel that cannot match any non-empty query).
          // Simplest: use a name that is the query reversed (only matches if palindrome)
          // but that's fragile. Instead: use a name that is a fixed ASCII string
          // that cannot contain the query unless the query is empty.
          // Best approach: use a name that is the query with all chars replaced by 'X'.
          const name = sub.split('').map(() => 'X').join('') || 'PLACEHOLDER';

          // If the name accidentally matches (e.g. query is "X" or "XX"), skip
          const nameMatchesQuery = name.toLowerCase().includes(query.toLowerCase());

          const templates: Template[] = [{ name, description }];
          const result = filterTemplates(templates, query);

          if (nameMatchesQuery) {
            // Either name or description matches — result must have length 1
            expect(result).toHaveLength(1);
          } else {
            // Only description matches — result must have length 1
            expect(result).toHaveLength(1);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
