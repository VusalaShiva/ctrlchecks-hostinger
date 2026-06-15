/**
 * Unit Tests: NODE_TYPES catalog entry for Workday
 * Feature: workday-node-integration
 *
 * Task: 9.4
 * Validates: Requirements 1.1, 1.2
 */

import { describe, it, expect } from 'vitest';
import { NODE_TYPES } from '../components/workflow/nodeTypes';

// ─── Task 9.4 ─────────────────────────────────────────────────────────────────
// Assert NODE_TYPES contains a workday entry with all required configFields
// Validates: Requirements 1.1, 1.2

describe('Task 9.4 — NODE_TYPES catalog entry for workday', () => {
  const workdayEntry = NODE_TYPES.find((n) => n.type === 'workday');

  it('NODE_TYPES contains an entry with type "workday"', () => {
    expect(workdayEntry).toBeDefined();
  });

  it('workday entry has label "Workday"', () => {
    expect(workdayEntry?.label).toBe('Workday');
  });

  it('workday entry has category "http_api"', () => {
    expect(workdayEntry?.category).toBe('http_api');
  });

  it('workday entry has a non-empty description', () => {
    expect(workdayEntry?.description).toBeTruthy();
  });

  const REQUIRED_CONFIG_FIELD_KEYS = [
    'baseUrl',
    'tenant',
    'authType',
    'resource',
    'operation',
    'recordId',
    'payload',
    'limit',
    'offset',
    'rawPath',
  ] as const;

  it('workday entry has configFields array', () => {
    expect(Array.isArray(workdayEntry?.configFields)).toBe(true);
    expect(workdayEntry!.configFields.length).toBeGreaterThan(0);
  });

  for (const key of REQUIRED_CONFIG_FIELD_KEYS) {
    it(`configFields contains key "${key}"`, () => {
      const fieldKeys = workdayEntry?.configFields.map((f) => f.key) ?? [];
      expect(fieldKeys).toContain(key);
    });
  }

  it('workday entry has a defaultConfig object', () => {
    expect(workdayEntry?.defaultConfig).toBeDefined();
    expect(typeof workdayEntry?.defaultConfig).toBe('object');
  });

  it('defaultConfig has authType "oauth2"', () => {
    expect(workdayEntry?.defaultConfig?.authType).toBe('oauth2');
  });

  it('defaultConfig has resource "workers"', () => {
    expect(workdayEntry?.defaultConfig?.resource).toBe('workers');
  });

  it('defaultConfig has operation "get_many"', () => {
    expect(workdayEntry?.defaultConfig?.operation).toBe('get_many');
  });

  it('defaultConfig has limit 50', () => {
    expect(workdayEntry?.defaultConfig?.limit).toBe(50);
  });

  it('defaultConfig has offset 0', () => {
    expect(workdayEntry?.defaultConfig?.offset).toBe(0);
  });
});
