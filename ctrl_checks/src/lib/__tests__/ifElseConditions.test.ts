import { describe, it, expect } from 'vitest';
import {
  normalizeIfElseConditions,
  normalizeIfElseConfig,
  type IfElseCondition,
} from '../ifElseConditions';

// ---------------------------------------------------------------------------
// normalizeIfElseConditions
// ---------------------------------------------------------------------------

describe('normalizeIfElseConditions — null / undefined input', () => {
  it('returns [] for null', () => {
    expect(normalizeIfElseConditions(null)).toEqual([]);
  });

  it('returns [] for undefined', () => {
    expect(normalizeIfElseConditions(undefined)).toEqual([]);
  });

  it('returns [] for empty array', () => {
    expect(normalizeIfElseConditions([])).toEqual([]);
  });
});

describe('normalizeIfElseConditions — string expression input', () => {
  it('parses equals operator (==)', () => {
    const result = normalizeIfElseConditions('status == active');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject<IfElseCondition>({
      field: 'status',
      operator: 'equals',
      value: 'active',
    });
  });

  it('parses strict-equals (===)', () => {
    const result = normalizeIfElseConditions('status === active');
    expect(result[0].operator).toBe('equals');
  });

  it('parses not_equals (!=)', () => {
    const result = normalizeIfElseConditions('status != active');
    expect(result[0]).toMatchObject({ operator: 'not_equals', field: 'status' });
  });

  it('documents known bug: !== in string expression is matched as equals (== found inside !==)', () => {
    // BUG: the ===|== pattern runs before !==|!= in parseExpression. For input
    // 'status !== active' the lazy (.+?) matches 'status !' and == matches the
    // remaining '==', so operator comes back as 'equals' with a mangled field.
    const result = normalizeIfElseConditions('status !== active');
    expect(result[0].operator).toBe('equals'); // should be not_equals — this is the bug
  });

  it('parses greater_than (>)', () => {
    const result = normalizeIfElseConditions('score > 10');
    expect(result[0]).toMatchObject({ operator: 'greater_than', value: 10 });
  });

  it('parses less_than (<)', () => {
    const result = normalizeIfElseConditions('score < 5');
    expect(result[0]).toMatchObject({ operator: 'less_than', value: 5 });
  });

  it('parses greater_than_or_equal (>=) — matched before >', () => {
    const result = normalizeIfElseConditions('score >= 5');
    expect(result[0]).toMatchObject({ operator: 'greater_than_or_equal', value: 5 });
  });

  it('parses less_than_or_equal (<=) — matched before <', () => {
    const result = normalizeIfElseConditions('score <= 5');
    expect(result[0]).toMatchObject({ operator: 'less_than_or_equal', value: 5 });
  });

  it('strips {{ }} wrapper from field name', () => {
    const result = normalizeIfElseConditions('{{$json.status}} == active');
    expect(result[0].field).toBe('$json.status');
  });

  it('returns [] when expression cannot be parsed', () => {
    expect(normalizeIfElseConditions('no operator here')).toEqual([]);
  });
});

describe('normalizeIfElseConditions — parseLiteral values', () => {
  it('parses boolean true literal', () => {
    const result = normalizeIfElseConditions('enabled == true');
    expect(result[0].value).toBe(true);
  });

  it('parses boolean false literal', () => {
    const result = normalizeIfElseConditions('enabled == false');
    expect(result[0].value).toBe(false);
  });

  it('parses null literal', () => {
    const result = normalizeIfElseConditions('field == null');
    expect(result[0].value).toBeNull();
  });

  it('parses integer number literal', () => {
    const result = normalizeIfElseConditions('count == 42');
    expect(result[0].value).toBe(42);
  });

  it('parses float number literal', () => {
    const result = normalizeIfElseConditions('ratio == 3.14');
    expect(result[0].value).toBe(3.14);
  });

  it('parses double-quoted string literal — strips quotes', () => {
    const result = normalizeIfElseConditions('status == "active"');
    expect(result[0].value).toBe('active');
  });

  it('parses single-quoted string literal — strips quotes', () => {
    const result = normalizeIfElseConditions("status == 'pending'");
    expect(result[0].value).toBe('pending');
  });

  it('keeps plain unquoted word as string', () => {
    const result = normalizeIfElseConditions('status == running');
    expect(result[0].value).toBe('running');
  });
});

describe('normalizeIfElseConditions — JSON string input', () => {
  it('accepts a JSON-serialized condition object', () => {
    const json = JSON.stringify({ field: 'status', operator: 'equals', value: 'ok' });
    const result = normalizeIfElseConditions(json);
    expect(result[0]).toMatchObject({ field: 'status', operator: 'equals', value: 'ok' });
  });

  it('documents known limit: JSON array string — only first condition returned', () => {
    // BUG: normalizeSingleCondition calls normalizeIfElseConditions(parsedArray)
    // recursively but then returns nested[0] only, discarding subsequent conditions.
    const json = JSON.stringify([
      { field: 'a', operator: 'equals', value: 1 },
      { field: 'b', operator: 'greater_than', value: 2 },
    ]);
    const result = normalizeIfElseConditions(json);
    expect(result).toHaveLength(1); // only first returned — document actual behavior
    expect(result[0].field).toBe('a');
  });
});

describe('normalizeIfElseConditions — record {field, operator, value}', () => {
  it('accepts canonical operator name', () => {
    const result = normalizeIfElseConditions({
      field: 'status',
      operator: 'equals',
      value: 'ok',
    });
    expect(result[0]).toMatchObject({ field: 'status', operator: 'equals', value: 'ok' });
  });

  it('accepts symbol alias operator ==', () => {
    const result = normalizeIfElseConditions({ field: 'x', operator: '==', value: 1 });
    expect(result[0].operator).toBe('equals');
  });

  it('accepts symbol alias operator >=', () => {
    const result = normalizeIfElseConditions({ field: 'x', operator: '>=', value: 1 });
    expect(result[0].operator).toBe('greater_than_or_equal');
  });

  it('filters out records with unknown operator', () => {
    const result = normalizeIfElseConditions({ field: 'x', operator: 'LIKE', value: 1 });
    expect(result).toHaveLength(0);
  });

  it('strips {{ }} from field in record', () => {
    const result = normalizeIfElseConditions({ field: '{{ $json.x }}', operator: 'equals', value: 1 });
    expect(result[0].field).toBe('$json.x');
  });
});

describe('normalizeIfElseConditions — record {leftValue, operation, rightValue}', () => {
  it('maps leftValue → field and rightValue → value', () => {
    const result = normalizeIfElseConditions({
      leftValue: 'score',
      operation: 'greater_than',
      rightValue: 100,
    });
    expect(result[0]).toMatchObject({ field: 'score', operator: 'greater_than', value: 100 });
  });

  it('accepts symbol alias in operation field', () => {
    const result = normalizeIfElseConditions({ leftValue: 'x', operation: '!=', rightValue: 0 });
    expect(result[0].operator).toBe('not_equals');
  });

  it('filters out unknown operation alias', () => {
    const result = normalizeIfElseConditions({ leftValue: 'x', operation: 'UNKNOWN', rightValue: 0 });
    expect(result).toHaveLength(0);
  });
});

describe('normalizeIfElseConditions — record {expression}', () => {
  it('delegates to parseExpression when expression string is provided', () => {
    const result = normalizeIfElseConditions({ expression: 'score > 5' });
    expect(result[0]).toMatchObject({ field: 'score', operator: 'greater_than', value: 5 });
  });

  it('returns [] when expression string cannot be parsed', () => {
    expect(normalizeIfElseConditions({ expression: 'garbage' })).toEqual([]);
  });
});

describe('normalizeIfElseConditions — array of mixed conditions', () => {
  it('normalizes an array with valid and invalid entries — filters invalids', () => {
    const result = normalizeIfElseConditions([
      { field: 'a', operator: 'equals', value: 1 },
      { field: '', operator: 'equals', value: 1 },   // empty field → filtered
      'score > 0',
    ]);
    expect(result).toHaveLength(2);
    expect(result[0].field).toBe('a');
    expect(result[1].field).toBe('score');
  });
});

// ---------------------------------------------------------------------------
// normalizeIfElseConfig
// ---------------------------------------------------------------------------

describe('normalizeIfElseConfig — conditions key', () => {
  it('preserves conditions array and normalizes combineOperation to AND', () => {
    const result = normalizeIfElseConfig({
      conditions: [{ field: 'x', operator: 'equals', value: 1 }],
      combineOperation: 'and',
    });
    expect((result.conditions as IfElseCondition[])[0].field).toBe('x');
    expect(result.combineOperation).toBe('AND');
  });

  it('normalizes combineOperation or → OR', () => {
    const result = normalizeIfElseConfig({
      conditions: [{ field: 'x', operator: 'equals', value: 1 }],
      combineOperation: 'or',
    });
    expect(result.combineOperation).toBe('OR');
  });

  it('defaults missing combineOperation to AND', () => {
    const result = normalizeIfElseConfig({
      conditions: [{ field: 'x', operator: 'equals', value: 1 }],
    });
    expect(result.combineOperation).toBe('AND');
  });
});

describe('normalizeIfElseConfig — condition (singular) key', () => {
  it('falls back to condition key when conditions is absent', () => {
    const result = normalizeIfElseConfig({
      condition: [{ field: 'y', operator: 'greater_than', value: 0 }],
    });
    expect((result.conditions as IfElseCondition[])[0].field).toBe('y');
  });

  it('deletes the singular condition key after normalization', () => {
    const result = normalizeIfElseConfig({
      condition: [{ field: 'y', operator: 'equals', value: 1 }],
    });
    expect('condition' in result).toBe(false);
  });
});

describe('normalizeIfElseConfig — passes extra keys through untouched', () => {
  it('does not strip unrelated config keys', () => {
    const result = normalizeIfElseConfig({
      conditions: [],
      description: 'check status',
      someFlag: true,
    });
    expect(result.description).toBe('check status');
    expect(result.someFlag).toBe(true);
  });
});
