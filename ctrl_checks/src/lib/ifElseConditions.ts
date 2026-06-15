export type IfElseOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'greater_than_or_equal'
  | 'less_than_or_equal'
  | 'contains'
  | 'not_contains';

export interface IfElseCondition {
  field: string;
  operator: IfElseOperator;
  value: unknown;
}

const OPERATOR_ALIASES: Record<string, IfElseOperator> = {
  equals: 'equals',
  '==': 'equals',
  '===': 'equals',
  not_equals: 'not_equals',
  '!=': 'not_equals',
  '!==': 'not_equals',
  greater_than: 'greater_than',
  '>': 'greater_than',
  less_than: 'less_than',
  '<': 'less_than',
  greater_than_or_equal: 'greater_than_or_equal',
  '>=': 'greater_than_or_equal',
  less_than_or_equal: 'less_than_or_equal',
  '<=': 'less_than_or_equal',
  contains: 'contains',
  not_contains: 'not_contains',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseLiteral(raw: string): unknown {
  const trimmed = raw.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function sanitizeField(field: string): string {
  return field.trim().replace(/^\{\{\s*/, '').replace(/\s*\}\}$/, '');
}

function tryParseJson(raw: string): unknown | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (
    !trimmed.startsWith('{') &&
    !trimmed.startsWith('[') &&
    !(trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return undefined;
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}

function parseExpression(expression: string): IfElseCondition | null {
  const parsedJson = tryParseJson(expression);
  if (parsedJson !== undefined) {
    const nested = normalizeIfElseConditions(parsedJson);
    return nested.length > 0 ? nested[0] : null;
  }

  const patterns: Array<{ regex: RegExp; op: IfElseOperator }> = [
    { regex: /(.+?)\s*(>=)\s*(.+)/, op: 'greater_than_or_equal' },
    { regex: /(.+?)\s*(<=)\s*(.+)/, op: 'less_than_or_equal' },
    { regex: /(.+?)\s*(===|==)\s*(.+)/, op: 'equals' },
    { regex: /(.+?)\s*(!==|!=)\s*(.+)/, op: 'not_equals' },
    { regex: /(.+?)\s*(>)\s*(.+)/, op: 'greater_than' },
    { regex: /(.+?)\s*(<)\s*(.+)/, op: 'less_than' },
  ];

  const normalized = expression.trim();
  for (const pattern of patterns) {
    const match = normalized.match(pattern.regex);
    if (!match) continue;
    return {
      field: sanitizeField(match[1]),
      operator: pattern.op,
      value: parseLiteral(match[3]),
    };
  }
  return null;
}

function normalizeSingleCondition(value: unknown): IfElseCondition | null {
  if (typeof value === 'string') {
    const parsedJson = tryParseJson(value);
    if (parsedJson !== undefined) {
      const nested = normalizeIfElseConditions(parsedJson);
      return nested.length > 0 ? nested[0] : null;
    }
    return parseExpression(value);
  }

  if (!isRecord(value)) return null;

  if (typeof value.field === 'string' && typeof value.operator === 'string') {
    const operator = OPERATOR_ALIASES[value.operator];
    if (!operator) return null;
    return {
      field: sanitizeField(value.field),
      operator,
      value: value.value,
    };
  }

  if (typeof value.leftValue === 'string' && typeof value.operation === 'string') {
    const operator = OPERATOR_ALIASES[value.operation];
    if (!operator) return null;
    return {
      field: sanitizeField(value.leftValue),
      operator,
      value: value.rightValue,
    };
  }

  if (typeof value.expression === 'string') {
    return parseExpression(value.expression);
  }

  return null;
}

export function normalizeIfElseConditions(input: unknown): IfElseCondition[] {
  if (input === undefined || input === null) return [];
  const values = Array.isArray(input) ? input : [input];
  const normalized: IfElseCondition[] = [];
  for (const value of values) {
    const condition = normalizeSingleCondition(value);
    if (condition && condition.field) normalized.push(condition);
  }
  return normalized;
}

export function normalizeIfElseConfig(config: Record<string, unknown>): Record<string, unknown> {
  const normalized = { ...config };
  const source = normalized.conditions ?? normalized.condition;
  normalized.conditions = normalizeIfElseConditions(source);
  delete normalized.condition;
  const combine = typeof normalized.combineOperation === 'string'
    ? normalized.combineOperation.toUpperCase()
    : 'AND';
  normalized.combineOperation = combine === 'OR' ? 'OR' : 'AND';
  return normalized;
}
