import {
  isExpression,
  extractExpressions,
  resolveExpression,
  resolveStringWithExpressions,
  generateExpression,
  validateExpression,
  getValueType,
  detectExpressionType,
  resolveExpressionTyped,
} from '../expressionResolver';

describe('isExpression', () => {
  it('returns true when the string contains {{ }}', () => {
    expect(isExpression('{{$json.foo}}')).toBe(true);
  });

  it('returns true for partial match inside a larger string', () => {
    expect(isExpression('Hello {{$json.name}} world')).toBe(true);
  });

  it('returns false for a plain string', () => {
    expect(isExpression('hello world')).toBe(false);
  });

  it('returns false when braces are incomplete', () => {
    expect(isExpression('{{unclosed')).toBe(false);
  });
});

describe('extractExpressions', () => {
  it('extracts a single expression', () => {
    expect(extractExpressions('Hello {{$json.name}}')).toEqual(['{{$json.name}}']);
  });

  it('extracts multiple expressions', () => {
    expect(extractExpressions('{{$json.a}} and {{$json.b}}')).toEqual([
      '{{$json.a}}',
      '{{$json.b}}',
    ]);
  });

  it('returns empty array when there are no expressions', () => {
    expect(extractExpressions('no expressions here')).toEqual([]);
  });
});

describe('resolveExpression', () => {
  it('resolves a whole-string expression to the raw value (preserves type)', () => {
    expect(resolveExpression('{{$json.name}}', { name: 'Alice' })).toBe('Alice');
  });

  it('resolves a nested path', () => {
    expect(
      resolveExpression('{{$json.user.email}}', { user: { email: 'a@b.com' } })
    ).toBe('a@b.com');
  });

  it('returns undefined for a missing key', () => {
    expect(resolveExpression('{{$json.missing}}', {})).toBeUndefined();
  });

  it('substitutes expression inside a larger string', () => {
    expect(resolveExpression('Hello {{$json.name}}', { name: 'Bob' })).toBe('Hello Bob');
  });

  it('substitutes null value as empty string inside a larger string', () => {
    expect(resolveExpression('Hi {{$json.name}}', { name: null })).toBe('Hi ');
  });

  it('substitutes undefined value as empty string inside a larger string', () => {
    expect(resolveExpression('Hi {{$json.x}}', {})).toBe('Hi ');
  });
});

describe('resolveStringWithExpressions', () => {
  it('returns the original value when no expressions are present', () => {
    expect(resolveStringWithExpressions('plain text', {})).toBe('plain text');
  });

  it('replaces a single expression with its string value', () => {
    expect(resolveStringWithExpressions('{{$json.name}}', { name: 'Carol' })).toBe('Carol');
  });

  it('replaces multiple expressions in one pass', () => {
    const result = resolveStringWithExpressions(
      '{{$json.first}} {{$json.last}}',
      { first: 'John', last: 'Doe' }
    );
    expect(result).toBe('John Doe');
  });

  it('serialises an object value via String() — typeof value bug means JSON.stringify branch never fires', () => {
    // line 77 uses `typeof value` (always 'string') instead of `typeof resolvedValue`,
    // so object results fall through to String() → '[object Object]'
    const result = resolveStringWithExpressions('val: {{$json.obj}}', {
      obj: { key: 'x' },
    });
    expect(result).toBe('val: [object Object]');
  });
});

describe('generateExpression', () => {
  it('wraps a simple path in {{ $json. }}', () => {
    expect(generateExpression('foo')).toBe('{{$json.foo}}');
  });

  it('preserves dot-notation paths', () => {
    expect(generateExpression('user.email')).toBe('{{$json.user.email}}');
  });
});

describe('validateExpression', () => {
  it('accepts a valid $json expression', () => {
    expect(validateExpression('{{$json.foo}}')).toEqual({ valid: true });
  });

  it('accepts an expression starting with $', () => {
    expect(validateExpression('{{$node.output}}')).toEqual({ valid: true });
  });

  it('rejects a string without {{ }}', () => {
    const result = validateExpression('no braces');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/wrapped in/i);
  });

  it('rejects an expression whose body does not start with $', () => {
    const result = validateExpression('{{foo}}');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/\$json/i);
  });
});

describe('getValueType', () => {
  it.each([
    [null, 'null'],
    [undefined, 'undefined'],
    [[], 'array'],
    [{}, 'object'],
    ['str', 'string'],
    [42, 'number'],
    [true, 'boolean'],
  ] as const)('classifies %p as %s', (value, expected) => {
    expect(getValueType(value)).toBe(expected);
  });
});

describe('detectExpressionType', () => {
  it('returns the JS type when a pure expression resolves to a number', () => {
    expect(detectExpressionType('{{$json.count}}', { count: 7 })).toBe('number');
  });

  it('returns "null" when a pure expression resolves to null', () => {
    expect(detectExpressionType('{{$json.val}}', { val: null })).toBe('null');
  });

  it('returns "string" for a mixed string with surrounding text', () => {
    expect(detectExpressionType('Name: {{$json.name}}', { name: 'Dave' })).toBe('string');
  });

  it('returns "string" for a non-string input', () => {
    expect(detectExpressionType(42 as unknown as string, {})).toBe('string');
  });
});

describe('resolveExpressionTyped', () => {
  it('returns value and inferred type for a resolved expression', () => {
    expect(resolveExpressionTyped('{{$json.n}}', { n: 99 })).toEqual({
      value: 99,
      type: 'number',
    });
  });

  it('returns undefined type when the key is missing', () => {
    expect(resolveExpressionTyped('{{$json.missing}}', {})).toEqual({
      value: undefined,
      type: 'undefined',
    });
  });

  it('returns a string result for a non-expression input', () => {
    expect(resolveExpressionTyped('hello', {})).toEqual({
      value: 'hello',
      type: 'string',
    });
  });
});
