export type FieldFillMode = 'manual_static' | 'buildtime_ai_once' | 'runtime_ai';

export type ActionableFieldExample = {
  value: unknown;
  displayValue?: string;
  canApply?: boolean;
  applyMode?: FieldFillMode;
  reason?: string;
  source?: 'ai_field_guidance' | 'deterministic_field_guidance';
};

export type PreparedActionableFieldExample = {
  valueForInput: string;
  displayValue: string;
  canApply: boolean;
  reason: string;
  source: ActionableFieldExample['source'];
};

function displayValue(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function optionValue(option: unknown): string {
  if (typeof option === 'string') return option;
  if (option && typeof option === 'object' && 'value' in option) {
    return String((option as { value?: unknown }).value ?? '');
  }
  return '';
}

export function prepareActionableFieldExample(
  question: Record<string, any>,
  example?: ActionableFieldExample | null
): PreparedActionableFieldExample | null {
  if (!example) return null;

  const rawDisplay = String(example.displayValue || displayValue(example.value)).trim();
  const base: PreparedActionableFieldExample = {
    valueForInput: rawDisplay,
    displayValue: rawDisplay,
    canApply: example.canApply === true,
    reason: String(example.reason || ''),
    source: example.source || 'ai_field_guidance',
  };

  const isCredential =
    question.category === 'credential' ||
    question.ownershipClass === 'credential' ||
    /credential|token|secret|password|api[_\-\s]?key|oauth/i.test(String(question.fieldName || ''));
  if (isCredential) {
    return {
      ...base,
      canApply: false,
      reason: base.reason || 'Credential and secret examples are guidance only.',
    };
  }

  if (!base.canApply || !rawDisplay) return base;

  const isSelect = question.type === 'select' || (Array.isArray(question.options) && question.options.length > 0);
  if (isSelect) {
    const allowed = (question.options || []).map(optionValue).filter(Boolean);
    const candidate = String(example.value ?? rawDisplay);
    if (!allowed.includes(candidate)) {
      return {
        ...base,
        valueForInput: candidate,
        canApply: false,
        reason: base.reason || 'This suggestion does not match an available option.',
      };
    }
    return { ...base, valueForInput: candidate, displayValue: candidate };
  }

  const normalizedType = String(question.type || '').toLowerCase();
  const normalizedFieldType = String(question.fieldType || '').toLowerCase();
  const normalizedWidget = String(question.ui?.widget || question.widget || '').toLowerCase();
  const isJson =
    ['json', 'object', 'array'].includes(normalizedType) ||
    ['json', 'object', 'array'].includes(normalizedFieldType) ||
    normalizedWidget === 'json';
  if (isJson) {
    if (typeof example.value === 'object' && example.value !== null) {
      return { ...base, valueForInput: JSON.stringify(example.value, null, 2), displayValue: JSON.stringify(example.value, null, 2) };
    }
    try {
      const parsed = JSON.parse(rawDisplay);
      return { ...base, valueForInput: JSON.stringify(parsed, null, 2), displayValue: JSON.stringify(parsed, null, 2) };
    } catch {
      return {
        ...base,
        canApply: false,
        reason: base.reason || 'This JSON suggestion needs valid JSON before it can be applied.',
      };
    }
  }

  if (question.type === 'number') {
    const candidate = String(example.value ?? rawDisplay).trim();
    if (Number.isNaN(Number(candidate))) {
      return {
        ...base,
        canApply: false,
        reason: base.reason || 'This suggestion is not a valid number.',
      };
    }
    return { ...base, valueForInput: candidate, displayValue: candidate };
  }

  return base;
}
