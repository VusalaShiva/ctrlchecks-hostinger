import { describe, it, expect } from 'vitest';
import {
  normalizeFieldKey,
  titleCase,
  trimHelpText,
  normalizeHelpOptions,
  isGenericHelpText,
} from '../field-help-utils';

// ── normalizeFieldKey ─────────────────────────────────────────────────────────

describe('normalizeFieldKey', () => {
  it('strips underscores', () => {
    expect(normalizeFieldKey('some_field')).toBe('somefield');
  });

  it('strips spaces', () => {
    expect(normalizeFieldKey('some field')).toBe('somefield');
  });

  it('strips hyphens', () => {
    expect(normalizeFieldKey('some-field')).toBe('somefield');
  });

  it('strips mixed separators', () => {
    expect(normalizeFieldKey('some_field-name key')).toBe('somefieldnamekey');
  });

  it('lowercases', () => {
    expect(normalizeFieldKey('SomeField')).toBe('somefield');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeFieldKey('')).toBe('');
  });

  it('returns empty string for null', () => {
    expect(normalizeFieldKey(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(normalizeFieldKey(undefined)).toBe('');
  });
});

// ── titleCase ─────────────────────────────────────────────────────────────────

describe('titleCase', () => {
  it('replaces underscores with spaces and capitalizes', () => {
    expect(titleCase('hello_world')).toBe('Hello World');
  });

  it('splits camelCase at boundaries', () => {
    expect(titleCase('helloWorld')).toBe('Hello World');
  });

  it('handles multiple camelCase boundaries', () => {
    expect(titleCase('helloWorldTest')).toBe('Hello World Test');
  });

  it('capitalizes already-separated words', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  it('collapses extra whitespace', () => {
    expect(titleCase('hello  world')).toBe('Hello World');
  });

  it('returns empty string for empty input', () => {
    expect(titleCase('')).toBe('');
  });

  it('returns empty string for null', () => {
    expect(titleCase(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(titleCase(undefined)).toBe('');
  });
});

// ── trimHelpText ──────────────────────────────────────────────────────────────

describe('trimHelpText', () => {
  it('returns trimmed text for non-empty strings', () => {
    expect(trimHelpText('  hello  ')).toBe('hello');
  });

  it('returns text as-is when no surrounding whitespace', () => {
    expect(trimHelpText('hello')).toBe('hello');
  });

  it('returns null for empty string', () => {
    expect(trimHelpText('')).toBeNull();
  });

  it('returns null for whitespace-only string', () => {
    expect(trimHelpText('   ')).toBeNull();
  });

  it('returns null for null', () => {
    expect(trimHelpText(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(trimHelpText(undefined)).toBeNull();
  });
});

// ── normalizeHelpOptions ──────────────────────────────────────────────────────

describe('normalizeHelpOptions', () => {
  it('returns empty array for undefined', () => {
    expect(normalizeHelpOptions(undefined)).toEqual([]);
  });

  it('returns empty array for empty array', () => {
    expect(normalizeHelpOptions([])).toEqual([]);
  });

  it('converts string items to {label, value} using titleCase for label', () => {
    const result = normalizeHelpOptions(['hello_world']);
    expect(result).toEqual([{ label: 'Hello World', value: 'hello_world' }]);
  });

  it('filters out empty string items', () => {
    const result = normalizeHelpOptions(['valid', '   ', '']);
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe('valid');
  });

  it('uses object label and value as-is', () => {
    const result = normalizeHelpOptions([{ label: 'My Label', value: 'my_value' }]);
    expect(result).toEqual([{ label: 'My Label', value: 'my_value' }]);
  });

  it('falls back to raw value as label when object label is empty', () => {
    const result = normalizeHelpOptions([{ label: '', value: 'my_value' }]);
    expect(result[0].label).toBe('my_value');
    expect(result[0].value).toBe('my_value');
  });

  it('uses label as value when object has no value', () => {
    const result = normalizeHelpOptions([{ label: 'My Label', value: '' }]);
    expect(result[0].value).toBe('My Label');
    expect(result[0].label).toBe('My Label');
  });

  it('filters objects with no label and no value', () => {
    const result = normalizeHelpOptions([{ label: '', value: '' }]);
    expect(result).toHaveLength(0);
  });

  it('handles mixed string and object items', () => {
    const result = normalizeHelpOptions(['create', { label: 'Update', value: 'update' }]);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ label: 'Create', value: 'create' });
    expect(result[1]).toEqual({ label: 'Update', value: 'update' });
  });
});

// ── isGenericHelpText ─────────────────────────────────────────────────────────

describe('isGenericHelpText', () => {
  it('returns true for null', () => {
    expect(isGenericHelpText(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isGenericHelpText(undefined)).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isGenericHelpText('')).toBe(true);
  });

  it('returns true for whitespace-only string', () => {
    expect(isGenericHelpText('   ')).toBe(true);
  });

  it('returns false for plain descriptive text', () => {
    expect(isGenericHelpText('The email address of the recipient.')).toBe(false);
  });

  // generic patterns

  it('returns true when text matches "selected record" pattern', () => {
    expect(isGenericHelpText('The selected record id')).toBe(true);
  });

  it('returns true when text matches "Resource not selected" pattern', () => {
    expect(isGenericHelpText('Resource not selected yet')).toBe(true);
  });

  it('returns true when text matches "runs the X action" pattern', () => {
    expect(isGenericHelpText('Runs the create action')).toBe(true);
  });

  it('returns true when text matches data picker pattern', () => {
    expect(isGenericHelpText('pick the value from the data picker')).toBe(true);
  });

  // operation field + choice field

  it('returns true for any help text on a select-type operation field', () => {
    expect(
      isGenericHelpText('What this operation does', {
        fieldKey: 'operation',
        fieldType: 'select',
      })
    ).toBe(true);
  });

  it('returns false when "what this field is:" guard is present on operation+choice field', () => {
    expect(
      isGenericHelpText('What this field is: pick the operation you want to run', {
        fieldKey: 'operation',
        fieldType: 'select',
      })
    ).toBe(false);
  });

  it('returns true for "how to get operation:" text on operation+choice field', () => {
    expect(
      isGenericHelpText('How to get operation: choose create or update', {
        fieldKey: 'operation',
        fieldType: 'select',
      })
    ).toBe(true);
  });

  it('returns true for operation= style help on operation+choice field', () => {
    expect(
      isGenericHelpText('operation: create=add record', {
        fieldKey: 'operation',
        fieldType: 'select',
      })
    ).toBe(true);
  });

  // resource field + choice field

  it('returns true for resource text containing "resource" on resource+choice field', () => {
    expect(
      isGenericHelpText('Choose the resource type to work with', {
        fieldKey: 'resource',
        fieldType: 'select',
      })
    ).toBe(true);
  });

  it('returns false when "what this field is:" guard is present on resource+choice field', () => {
    expect(
      isGenericHelpText('What this field is: the resource entity', {
        fieldKey: 'resource',
        fieldType: 'select',
      })
    ).toBe(false);
  });

  it('returns true for "how to get resource:" text on resource+choice field', () => {
    expect(
      isGenericHelpText('How to get resource: pick from the list', {
        fieldKey: 'resource',
        fieldType: 'select',
      })
    ).toBe(true);
  });

  // isChoiceField via options

  it('treats field as choice field when options array is provided', () => {
    expect(
      isGenericHelpText('Describe the operation', {
        fieldKey: 'operation',
        options: [{ label: 'Create', value: 'create' }],
      })
    ).toBe(true);
  });

  // non-operation/resource fields are not caught by operation/resource rules

  it('returns false for descriptive text on a non-operation select field', () => {
    expect(
      isGenericHelpText('The email address of the recipient.', {
        fieldKey: 'email',
        fieldType: 'select',
      })
    ).toBe(false);
  });
});
