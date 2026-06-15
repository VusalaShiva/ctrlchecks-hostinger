import { describe, it, expect } from 'vitest';
import { snapshotConfigFieldToString } from '../wizard-config-snapshot';

describe('snapshotConfigFieldToString', () => {
  describe('null / undefined inputs', () => {
    it('returns undefined for undefined', () => {
      expect(snapshotConfigFieldToString(undefined)).toBeUndefined();
    });

    it('returns undefined for null', () => {
      expect(snapshotConfigFieldToString(null)).toBeUndefined();
    });
  });

  describe('string inputs', () => {
    it('returns a non-empty string as-is', () => {
      expect(snapshotConfigFieldToString('hello world')).toBe('hello world');
    });

    it('returns an empty string as-is (not undefined)', () => {
      expect(snapshotConfigFieldToString('')).toBe('');
    });

    it('returns a string that looks like a number as-is', () => {
      expect(snapshotConfigFieldToString('42')).toBe('42');
    });
  });

  describe('number inputs', () => {
    it('converts a positive integer to string', () => {
      expect(snapshotConfigFieldToString(42)).toBe('42');
    });

    it('converts zero (falsy) to "0"', () => {
      expect(snapshotConfigFieldToString(0)).toBe('0');
    });

    it('converts a float to string', () => {
      expect(snapshotConfigFieldToString(3.14)).toBe('3.14');
    });

    it('converts a negative number to string', () => {
      expect(snapshotConfigFieldToString(-7)).toBe('-7');
    });
  });

  describe('boolean inputs', () => {
    it('converts true to "true"', () => {
      expect(snapshotConfigFieldToString(true)).toBe('true');
    });

    it('converts false (falsy) to "false"', () => {
      expect(snapshotConfigFieldToString(false)).toBe('false');
    });
  });

  describe('object inputs', () => {
    it('pretty-prints a plain object with 2-space indent', () => {
      const obj = { key: 'value', num: 1 };
      expect(snapshotConfigFieldToString(obj)).toBe(JSON.stringify(obj, null, 2));
    });

    it('pretty-prints a nested object', () => {
      const obj = { outer: { inner: true } };
      expect(snapshotConfigFieldToString(obj)).toBe(JSON.stringify(obj, null, 2));
    });

    it('pretty-prints an array', () => {
      const arr = [1, 'two', { three: 3 }];
      expect(snapshotConfigFieldToString(arr)).toBe(JSON.stringify(arr, null, 2));
    });

    it('pretty-prints an empty object', () => {
      expect(snapshotConfigFieldToString({})).toBe('{}');
    });

    it('pretty-prints an empty array', () => {
      expect(snapshotConfigFieldToString([])).toBe('[]');
    });

    it('falls back to String(value) when JSON.stringify throws (circular ref)', () => {
      const obj: Record<string, unknown> = {};
      obj['self'] = obj; // circular reference — JSON.stringify will throw
      const result = snapshotConfigFieldToString(obj);
      // String({...}) => "[object Object]"
      expect(result).toBe('[object Object]');
    });
  });
});
