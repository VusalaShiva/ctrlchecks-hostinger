export type FieldHelpOption = {
  label: string;
  value: string;
};

export type GenericHelpContext = {
  fieldKey?: string;
  fieldLabel?: string;
  fieldType?: string;
  options?: Array<FieldHelpOption | string>;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function words(...parts: string[]): RegExp {
  return new RegExp(parts.map(escapeRegExp).join('\\s+'), 'i');
}

const GENERIC_HELP_PATTERNS = [
  words('selected', 'record'),
  words('Resource', 'not', 'selected'),
  new RegExp(`${escapeRegExp('provider')}['’]s\\s+${escapeRegExp('result')}`, 'i'),
  /runs\s+the\s+.+\s+action/i,
  words('Pick', 'Create', 'to', 'add', 'a', 'new'),
  words('pick', 'the', 'value', 'from', 'the', 'data', 'picker'),
];

export function normalizeFieldKey(value: unknown): string {
  return String(value || '')
    .replace(/[_\s-]+/g, '')
    .toLowerCase()
    .trim();
}

export function titleCase(value: unknown): string {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function trimHelpText(value: unknown): string | null {
  const text = String(value || '').trim();
  return text.length > 0 ? text : null;
}

export function normalizeHelpOptions(options?: Array<FieldHelpOption | string>): FieldHelpOption[] {
  if (!options?.length) return [];
  return options
    .map((option) => {
      if (typeof option === 'string') {
        const text = option.trim();
        return text ? { label: titleCase(text), value: text } : null;
      }
      const value = String(option.value ?? '').trim();
      const label = String(option.label || option.value || '').trim();
      if (!value && !label) return null;
      return { label: label || titleCase(value), value: value || label };
    })
    .filter((option): option is FieldHelpOption => Boolean(option));
}

export function isGenericHelpText(text: unknown, context: GenericHelpContext = {}): boolean {
  const value = trimHelpText(text);
  if (!value) return true;

  if (GENERIC_HELP_PATTERNS.some((pattern) => pattern.test(value))) {
    return true;
  }

  const fieldKey = String(context.fieldKey || '').toLowerCase();
  const label = String(context.fieldLabel || '').toLowerCase();
  const isChoiceField =
    context.fieldType === 'select' ||
    normalizeHelpOptions(context.options).length > 0;
  const isOperationField = fieldKey === 'operation' || label === 'operation';
  const isResourceField = fieldKey === 'resource' || label === 'resource';
  const lower = value.toLowerCase();

  if (isChoiceField && isOperationField && /^how to get\s+operation\s*:/i.test(value)) {
    return true;
  }

  if (isChoiceField && isResourceField && /^how to get\s+resource\s*:/i.test(value)) {
    return true;
  }

  if (
    isChoiceField &&
    (isOperationField || isResourceField) &&
    /pick\s+(create|update|get|delete)/i.test(value) &&
    !/what this field is:/i.test(value)
  ) {
    return true;
  }

  if (
    isChoiceField &&
    (isOperationField || isResourceField) &&
    lower.includes('choose based on what you want to work with')
  ) {
    return true;
  }

  if (
    isChoiceField &&
    (isOperationField || isResourceField) &&
    lower.includes('type the value exactly as it should be sent to the service')
  ) {
    return true;
  }

  if (isChoiceField && isOperationField && lower.includes('operation:') && lower.includes('=')) {
    return true;
  }

  if (isChoiceField && isOperationField && !/what this field is:/i.test(value)) {
    return true;
  }

  if (
    isChoiceField &&
    isResourceField &&
    !/what this field is:/i.test(value) &&
    /resource|type|choose|=/.test(lower)
  ) {
    return true;
  }

  return false;
}
