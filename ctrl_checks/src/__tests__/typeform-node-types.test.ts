/**
 * Unit Tests: NODE_TYPES catalog entry for Typeform
 * Feature: typeform-node-integration
 *
 * Task: 10.2
 * Validates: Requirements 1.1, 1.2
 */

import { describe, it, expect } from 'vitest';
import { NODE_TYPES } from '../components/workflow/nodeTypes';

describe('Task 10.2 — NODE_TYPES catalog entry for typeform', () => {
  const typeformEntry = NODE_TYPES.find((n) => n.type === 'typeform');

  it('NODE_TYPES contains an entry with type "typeform"', () => {
    expect(typeformEntry).toBeDefined();
  });

  it('typeform entry has label "Typeform"', () => {
    expect(typeformEntry?.label).toBe('Typeform');
  });

  it('typeform entry has category "productivity"', () => {
    expect(typeformEntry?.category).toBe('productivity');
  });

  it('typeform entry has icon "FileText"', () => {
    expect(typeformEntry?.icon).toBe('FileText');
  });

  it('typeform entry has a non-empty description', () => {
    expect(typeformEntry?.description).toBeTruthy();
  });

  const REQUIRED_CONFIG_FIELD_KEYS = ['operation', 'apiKey', 'formId', 'title'] as const;

  it('typeform entry has configFields array', () => {
    expect(Array.isArray(typeformEntry?.configFields)).toBe(true);
    expect(typeformEntry!.configFields.length).toBeGreaterThan(0);
  });

  for (const key of REQUIRED_CONFIG_FIELD_KEYS) {
    it(`configFields contains key "${key}"`, () => {
      const fieldKeys = typeformEntry?.configFields.map((f) => f.key) ?? [];
      expect(fieldKeys).toContain(key);
    });
  }

  it('typeform entry has a defaultConfig object', () => {
    expect(typeformEntry?.defaultConfig).toBeDefined();
    expect(typeof typeformEntry?.defaultConfig).toBe('object');
  });

  it('defaultConfig has operation "get_responses"', () => {
    expect(typeformEntry?.defaultConfig?.operation).toBe('get_responses');
  });

  it('typeform entry has a usageGuide object', () => {
    expect(typeformEntry?.usageGuide).toBeDefined();
    expect(typeof typeformEntry?.usageGuide).toBe('object');
  });
});
