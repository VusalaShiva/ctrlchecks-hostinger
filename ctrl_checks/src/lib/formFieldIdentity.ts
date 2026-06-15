export interface CanonicalFormField {
  id: string;
  key: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  defaultValue?: string;
}

const MAX_KEY_LENGTH = 32;
const MAX_LABEL_LENGTH = 40;
const RESERVED_KEYS = new Set(['input', 'json', '$json', 'data', 'meta', 'files', 'submitted_at']);

function toSnakeCase(value: string): string {
  return value
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function simpleHash(value: string): string {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0).toString(16).slice(0, 6);
}

function shortenLabel(input: string): string {
  const normalized = input.replace(/\s+/g, ' ').trim();
  if (normalized.length <= MAX_LABEL_LENGTH) return normalized;
  return `${normalized.slice(0, MAX_LABEL_LENGTH - 1).trimEnd()}…`;
}

function ensureKey(raw: string, used: Set<string>): string {
  let key = toSnakeCase(raw) || 'field';
  if (key.length > MAX_KEY_LENGTH) {
    key = `${key.slice(0, MAX_KEY_LENGTH - 7)}_${simpleHash(key)}`;
  }
  if (RESERVED_KEYS.has(key) || used.has(key)) {
    key = `${key.slice(0, Math.max(1, MAX_KEY_LENGTH - 7))}_${simpleHash(raw)}`;
  }
  while (used.has(key)) {
    key = `${key.slice(0, Math.max(1, MAX_KEY_LENGTH - 7))}_${simpleHash(`${raw}_${key}`)}`;
  }
  used.add(key);
  return key;
}

const VALID_FIELD_TYPES = new Set([
  'text', 'email', 'number', 'textarea', 'select', 'checkbox', 'radio',
  'tel', 'url', 'date', 'file',
]);

/** Normalize AI-generated field type strings to valid FormField types */
function normalizeFieldType(raw: unknown): string {
  if (!raw) return 'text';
  const lower = String(raw).toLowerCase().trim();
  // Direct match
  if (VALID_FIELD_TYPES.has(lower)) return lower;
  // Aliases
  const aliases: Record<string, string> = {
    'dropdown': 'select',
    'multiselect': 'select',
    'multi_select': 'select',
    'multi-select': 'select',
    'long_text': 'textarea',
    'longtext': 'textarea',
    'long-text': 'textarea',
    'paragraph': 'textarea',
    'phone': 'tel',
    'telephone': 'tel',
    'phone_number': 'tel',
    'integer': 'number',
    'float': 'number',
    'decimal': 'number',
    'bool': 'checkbox',
    'boolean': 'checkbox',
    'toggle': 'checkbox',
    'link': 'url',
    'attachment': 'file',
    'upload': 'file',
    'datetime': 'date',
    'date_time': 'date',
  };
  return aliases[lower] || 'text';
}

export function normalizeFormFieldIdentity(
  field: Record<string, unknown>,
  used: Set<string>
): CanonicalFormField {
  const sourceLabel = String(field.label || field.name || field.key || 'Field');
  const sourceKey = String(field.key || field.name || sourceLabel);

  // ✅ Preserve existing key/name if already valid — only regenerate if missing/invalid
  const existingKey = typeof field.key === 'string' && field.key.trim() ? field.key.trim() : null;
  const existingName = typeof field.name === 'string' && field.name.trim() ? field.name.trim() : null;
  const stableKey = existingKey || existingName || null;

  const key = stableKey && !RESERVED_KEYS.has(stableKey) && !used.has(stableKey)
    ? (used.add(stableKey), stableKey)
    : ensureKey(sourceKey, used);

  // ✅ Preserve existing id — only generate if missing
  const existingId = typeof field.id === 'string' && field.id.trim() ? field.id.trim() : null;

  return {
    id: existingId || `field_${key}`,
    key,
    name: key,
    label: shortenLabel(sourceLabel),
    type: normalizeFieldType(field.type),
    required: field.required !== false,
    options: Array.isArray(field.options)
      ? (field.options as any[]).map((opt: any) => {
          if (typeof opt === 'string') return { label: opt, value: opt };
          const label = String(opt.label || opt.name || opt.text || opt.value || '');
          const value = String(opt.value ?? opt.key ?? opt.id ?? label);
          return { label, value };
        }).filter(opt => opt.label || opt.value)
      : undefined,
    placeholder: typeof field.placeholder === 'string' ? field.placeholder : undefined,
    defaultValue: typeof field.defaultValue === 'string' ? field.defaultValue : undefined,
  };
}

export function normalizeFormFieldsIdentity(fields: Array<Record<string, unknown>>): CanonicalFormField[] {
  const used = new Set<string>();
  return fields.map((field) => normalizeFormFieldIdentity(field, used));
}
