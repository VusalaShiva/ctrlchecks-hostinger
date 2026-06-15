import { describe, it, expect } from 'vitest';
import {
  convertSchemaToConfigField,
  convertNodeDefinitionToConfigFields,
  validateNodeInputsAgainstSchema,
} from '../schemaConverter';

// Minimal InputFieldSchema stand-in — only fields the implementation reads at runtime.
function makeField(
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'json',
  opts: {
    description?: string;
    required?: boolean;
    default?: any;
    examples?: any[];
    validation?: (v: any) => boolean | string;
    ui?: {
      options?: { label: string; value: string }[];
      widget?: 'text' | 'textarea' | 'json' | 'multi_email' | 'date';
      visibleIf?: any;
      requiredIf?: { field: string; equals?: any };
      contextHints?: any;
    };
    ownership?: 'credential' | 'structural' | 'value';
  } = {}
): any {
  return {
    type,
    description: opts.description ?? `A ${type} field`,
    required: opts.required ?? false,
    default: opts.default,
    examples: opts.examples,
    validation: opts.validation,
    ui: opts.ui,
    ownership: opts.ownership,
  };
}

// Minimal NodeDefinition stand-in.
function makeNodeDef(
  type: string,
  inputSchema: Record<string, any>,
  requiredInputs: string[] = []
): any {
  return { type, label: type, category: 'actions', description: '', inputSchema, outputSchema: {}, requiredInputs, outgoingPorts: [], incomingPorts: [], isBranching: false, defaultInputs: {} };
}

// ─── convertSchemaToConfigField ─────────────────────────────────────────────

describe('convertSchemaToConfigField — scalar type mapping', () => {
  it('maps string → text', () => {
    expect(convertSchemaToConfigField('name', makeField('string'), []).type).toBe('text');
  });

  it('maps string with "cron" in description → cron', () => {
    expect(
      convertSchemaToConfigField('expr', makeField('string', { description: 'cron expression' }), []).type
    ).toBe('cron');
  });

  it('maps string with "schedule" in description → cron', () => {
    expect(
      convertSchemaToConfigField('timing', makeField('string', { description: 'schedule interval' }), []).type
    ).toBe('cron');
  });

  it('maps number → number', () => {
    expect(convertSchemaToConfigField('count', makeField('number'), []).type).toBe('number');
  });

  it('maps boolean → boolean', () => {
    expect(convertSchemaToConfigField('enabled', makeField('boolean'), []).type).toBe('boolean');
  });

  it('maps json → json', () => {
    expect(convertSchemaToConfigField('payload', makeField('json'), []).type).toBe('json');
  });
});

describe('convertSchemaToConfigField — object widget detection', () => {
  it('maps generic object → keyValue', () => {
    expect(convertSchemaToConfigField('headers', makeField('object'), []).type).toBe('keyValue');
  });

  it('maps hubspot properties object → hubspotProperties', () => {
    expect(
      convertSchemaToConfigField('properties', makeField('object'), [], 'hubspot').type
    ).toBe('hubspotProperties');
  });
});

describe('convertSchemaToConfigField — array widget detection', () => {
  it('conditions array → conditionList', () => {
    expect(convertSchemaToConfigField('conditions', makeField('array'), []).type).toBe('conditionList');
  });

  it('rules array → conditionList', () => {
    expect(convertSchemaToConfigField('rules', makeField('array'), []).type).toBe('conditionList');
  });

  it('cases array → caseList', () => {
    expect(convertSchemaToConfigField('cases', makeField('array'), []).type).toBe('caseList');
  });

  it('variables array → variableList', () => {
    expect(convertSchemaToConfigField('variables', makeField('array'), []).type).toBe('variableList');
  });

  it('values array → variableList', () => {
    expect(convertSchemaToConfigField('values', makeField('array'), []).type).toBe('variableList');
  });

  it('fields array (non-form node) → variableList', () => {
    expect(convertSchemaToConfigField('fields', makeField('array'), [], 'slack').type).toBe('variableList');
  });

  it('fields array on form node → formFieldList', () => {
    expect(convertSchemaToConfigField('fields', makeField('array'), [], 'form').type).toBe('formFieldList');
  });

  it('unrecognized array field → json', () => {
    expect(convertSchemaToConfigField('tags', makeField('array'), []).type).toBe('json');
  });
});

describe('convertSchemaToConfigField — select promotion via examples', () => {
  it('dropdown-worthy field with ≥2 valid examples → select with correct option count', () => {
    const result = convertSchemaToConfigField(
      'operation',
      makeField('string', { examples: ['create', 'update', 'delete'] }),
      []
    );
    expect(result.type).toBe('select');
    expect(result.options).toHaveLength(3);
  });

  it('dropdown-worthy field with exactly 1 example → select', () => {
    const result = convertSchemaToConfigField(
      'model',
      makeField('string', { examples: ['gpt-4'] }),
      []
    );
    expect(result.type).toBe('select');
    expect(result.options).toHaveLength(1);
  });

  it('filters out template expression examples ({{ ... }}) — 0 valid → not select', () => {
    const result = convertSchemaToConfigField(
      'operation',
      makeField('string', { examples: ['{{$json.op}}'] }),
      []
    );
    expect(result.type).not.toBe('select');
  });

  it('filters out https:// URL examples — 0 valid → not select', () => {
    const result = convertSchemaToConfigField(
      'operation',
      makeField('string', { examples: ['https://api.example.com/v1'] }),
      []
    );
    expect(result.type).not.toBe('select');
  });

  it('ui.options on any field → select, ignoring examples', () => {
    const result = convertSchemaToConfigField(
      'format',
      makeField('string', {
        ui: { options: [{ label: 'JSON', value: 'json' }, { label: 'CSV', value: 'csv' }] },
      }),
      []
    );
    expect(result.type).toBe('select');
    expect(result.options).toHaveLength(2);
  });
});

describe('convertSchemaToConfigField — isUserProvidedTextField overrides', () => {
  it('URL field stays text even when ui.options are present', () => {
    const result = convertSchemaToConfigField(
      'webhookUrl',
      makeField('string', {
        ui: { options: [{ label: 'A', value: 'a' }] },
      }),
      []
    );
    expect(result.type).toBe('text');
  });

  it('prompt field stays text even when examples would promote dropdown', () => {
    const result = convertSchemaToConfigField(
      'prompt',
      makeField('string', { examples: ['a', 'b', 'c'] }),
      []
    );
    expect(result.type).toBe('text');
  });
});

describe('convertSchemaToConfigField — ui widget overrides', () => {
  it('ui.widget=textarea → textarea', () => {
    expect(
      convertSchemaToConfigField('body', makeField('string', { ui: { widget: 'textarea' } }), []).type
    ).toBe('textarea');
  });

  it('ui.widget=multi_email → textarea', () => {
    expect(
      convertSchemaToConfigField('recipients', makeField('string', { ui: { widget: 'multi_email' } }), []).type
    ).toBe('textarea');
  });

  it('ui.widget=date → date', () => {
    expect(
      convertSchemaToConfigField('dueDate', makeField('string', { ui: { widget: 'date' } }), []).type
    ).toBe('date');
  });
});

describe('convertSchemaToConfigField — required flag', () => {
  it('sets required=true when field is in requiredInputs', () => {
    expect(convertSchemaToConfigField('email', makeField('string'), ['email']).required).toBe(true);
  });

  it('sets required=false when field is not in requiredInputs', () => {
    expect(convertSchemaToConfigField('email', makeField('string'), []).required).toBe(false);
  });
});

describe('convertSchemaToConfigField — label generation', () => {
  it('capitalises first letter and spaces camelCase', () => {
    expect(convertSchemaToConfigField('fromAddress', makeField('string'), []).label).toBe('From Address');
  });

  it('overrides label for google_tasks due field → Due Date', () => {
    expect(convertSchemaToConfigField('due', makeField('string'), [], 'google_tasks').label).toBe('Due Date');
  });

  it('overrides label for google_gmail spreadsheetId field', () => {
    expect(
      convertSchemaToConfigField('spreadsheetId', makeField('string'), [], 'google_gmail').label
    ).toBe('Spreadsheet ID (fallback)');
  });
});

describe('convertSchemaToConfigField — placeholder generation', () => {
  it('select type → "Select <Label>"', () => {
    const result = convertSchemaToConfigField('operation', makeField('string', { examples: ['create', 'update'] }), []);
    expect(result.placeholder).toMatch(/^Select /);
  });

  it('date type without shortPlaceholderMap entry → YYYY-MM-DD', () => {
    const result = convertSchemaToConfigField('startDate', makeField('string', { ui: { widget: 'date' } }), []);
    expect(result.placeholder).toBe('YYYY-MM-DD');
  });

  it('shortPlaceholderMap entry overrides example-based placeholder', () => {
    const result = convertSchemaToConfigField('spreadsheetId', makeField('string', { examples: ['someId'] }), []);
    expect(result.placeholder).toBe('e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');
  });

  it('text field with example → "e.g. <example>"', () => {
    const result = convertSchemaToConfigField('greeting', makeField('string', { examples: ['Hello world'] }), []);
    expect(result.placeholder).toBe('e.g. Hello world');
  });
});

describe('convertSchemaToConfigField — addButtonLabel', () => {
  it('headers keyValue → Add Header', () => {
    expect(convertSchemaToConfigField('headers', makeField('object'), []).addButtonLabel).toBe('Add Header');
  });

  it('queryParams keyValue → Add Param', () => {
    expect(convertSchemaToConfigField('queryParams', makeField('object'), []).addButtonLabel).toBe('Add Param');
  });

  it('requestPayload keyValue → Add Field', () => {
    // 'payload' matches the body/payload branch in addButtonLabel.
    // Uses 'requestPayload' rather than 'bodyData' because 'body' also matches
    // isUserProvidedTextField which would override the type to 'text'.
    expect(convertSchemaToConfigField('requestPayload', makeField('object'), []).addButtonLabel).toBe('Add Field');
  });

  it('generic keyValue → Add Entry', () => {
    expect(convertSchemaToConfigField('metadata', makeField('object'), []).addButtonLabel).toBe('Add Entry');
  });

  it('variableList → Add Variable', () => {
    expect(convertSchemaToConfigField('variables', makeField('array'), []).addButtonLabel).toBe('Add Variable');
  });

  it('caseList → Add Case', () => {
    expect(convertSchemaToConfigField('cases', makeField('array'), []).addButtonLabel).toBe('Add Case');
  });

  it('text field → undefined', () => {
    expect(convertSchemaToConfigField('name', makeField('string'), []).addButtonLabel).toBeUndefined();
  });
});

describe('convertSchemaToConfigField — key preserved', () => {
  it('preserves the fieldKey on the result', () => {
    expect(convertSchemaToConfigField('myField', makeField('string'), []).key).toBe('myField');
  });
});

// ─── convertNodeDefinitionToConfigFields ────────────────────────────────────

describe('convertNodeDefinitionToConfigFields', () => {
  it('skips fields with ownership=credential', () => {
    const nodeDef = makeNodeDef('slack', {
      token: makeField('string', { ownership: 'credential' }),
      channel: makeField('string'),
    });
    const result = convertNodeDefinitionToConfigFields(nodeDef);
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('channel');
  });

  it('includes fields with ownership=value and ownership=structural', () => {
    const nodeDef = makeNodeDef('email', {
      to: makeField('string', { ownership: 'value' }),
      subject: makeField('string', { ownership: 'structural' }),
    });
    expect(convertNodeDefinitionToConfigFields(nodeDef)).toHaveLength(2);
  });

  it('returns empty array when all fields are credential-owned', () => {
    const nodeDef = makeNodeDef('oauth_node', {
      accessToken: makeField('string', { ownership: 'credential' }),
      refreshToken: makeField('string', { ownership: 'credential' }),
    });
    expect(convertNodeDefinitionToConfigFields(nodeDef)).toHaveLength(0);
  });

  it('passes nodeType to convertSchemaToConfigField for label overrides', () => {
    const nodeDef = makeNodeDef('google_tasks', { due: makeField('string') });
    expect(convertNodeDefinitionToConfigFields(nodeDef)[0].label).toBe('Due Date');
  });
});

// ─── validateNodeInputsAgainstSchema ────────────────────────────────────────

describe('validateNodeInputsAgainstSchema — required field validation', () => {
  it('valid=true when required field is present', () => {
    const nodeDef = makeNodeDef('test', { email: makeField('string') }, ['email']);
    expect(validateNodeInputsAgainstSchema(nodeDef, { email: 'alice@example.com' }).valid).toBe(true);
  });

  it('error when required field is absent from inputs', () => {
    const nodeDef = makeNodeDef('test', { email: makeField('string') }, ['email']);
    const result = validateNodeInputsAgainstSchema(nodeDef, {});
    expect(result.valid).toBe(false);
    expect(result.errors[0].field).toBe('email');
  });

  it('error when required field is null', () => {
    const nodeDef = makeNodeDef('test', { count: makeField('number') }, ['count']);
    expect(validateNodeInputsAgainstSchema(nodeDef, { count: null }).valid).toBe(false);
  });

  it('error when required field is empty string', () => {
    const nodeDef = makeNodeDef('test', { name: makeField('string') }, ['name']);
    expect(validateNodeInputsAgainstSchema(nodeDef, { name: '' }).valid).toBe(false);
  });
});

describe('validateNodeInputsAgainstSchema — requiredIf conditional validation', () => {
  it('errors when condition met and dependent field is missing', () => {
    const nodeDef = makeNodeDef('test', {
      resource: makeField('string'),
      orgId: makeField('string', { ui: { requiredIf: { field: 'resource', equals: 'organization' } } }),
    });
    const result = validateNodeInputsAgainstSchema(nodeDef, { resource: 'organization', orgId: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'orgId')).toBe(true);
  });

  it('no error when condition is not met', () => {
    const nodeDef = makeNodeDef('test', {
      resource: makeField('string'),
      orgId: makeField('string', { ui: { requiredIf: { field: 'resource', equals: 'organization' } } }),
    });
    expect(validateNodeInputsAgainstSchema(nodeDef, { resource: 'personal', orgId: '' }).valid).toBe(true);
  });

  it('no error when condition met and field is present', () => {
    const nodeDef = makeNodeDef('test', {
      resource: makeField('string'),
      orgId: makeField('string', { ui: { requiredIf: { field: 'resource', equals: 'organization' } } }),
    });
    expect(validateNodeInputsAgainstSchema(nodeDef, { resource: 'organization', orgId: 'org_abc' }).valid).toBe(true);
  });

  it('supports array in requiredIf.equals', () => {
    const nodeDef = makeNodeDef('test', {
      action: makeField('string'),
      targetId: makeField('string', { ui: { requiredIf: { field: 'action', equals: ['update', 'delete'] } } }),
    });
    expect(validateNodeInputsAgainstSchema(nodeDef, { action: 'update', targetId: '' }).valid).toBe(false);
  });
});

describe('validateNodeInputsAgainstSchema — type validation', () => {
  it('errors when string field receives a number', () => {
    const nodeDef = makeNodeDef('test', { name: makeField('string') });
    const result = validateNodeInputsAgainstSchema(nodeDef, { name: 42 });
    expect(result.valid).toBe(false);
    expect(result.errors[0].field).toBe('name');
  });

  it('errors when number field receives a non-numeric string', () => {
    const nodeDef = makeNodeDef('test', { count: makeField('number') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { count: 'abc' }).valid).toBe(false);
  });

  it('accepts a numeric string for number field', () => {
    const nodeDef = makeNodeDef('test', { count: makeField('number') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { count: '5' }).valid).toBe(true);
  });

  it('errors when boolean field receives a string', () => {
    const nodeDef = makeNodeDef('test', { enabled: makeField('boolean') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { enabled: 'true' }).valid).toBe(false);
  });

  it('errors when array field receives a string', () => {
    const nodeDef = makeNodeDef('test', { items: makeField('array') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { items: 'not-array' }).valid).toBe(false);
  });

  it('accepts valid JSON string for object field', () => {
    const nodeDef = makeNodeDef('test', { config: makeField('object') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { config: '{"key":"value"}' }).valid).toBe(true);
  });

  it('errors on invalid JSON string for object field', () => {
    const nodeDef = makeNodeDef('test', { config: makeField('object') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { config: '{invalid}' }).valid).toBe(false);
  });

  it('errors when object field receives a JSON array value', () => {
    const nodeDef = makeNodeDef('test', { config: makeField('object') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { config: ['a', 'b'] }).valid).toBe(false);
  });

  it('skips type check for empty optional field', () => {
    const nodeDef = makeNodeDef('test', { name: makeField('string') });
    expect(validateNodeInputsAgainstSchema(nodeDef, { name: '' }).valid).toBe(true);
  });

  it('skips type check for undefined optional field', () => {
    const nodeDef = makeNodeDef('test', { name: makeField('string') });
    expect(validateNodeInputsAgainstSchema(nodeDef, {}).valid).toBe(true);
  });
});

describe('validateNodeInputsAgainstSchema — custom validation function', () => {
  it('reports error message from failing validation function', () => {
    const nodeDef = makeNodeDef('test', {
      email: makeField('string', { validation: (v: string) => v.includes('@') || 'Must be a valid email' }),
    });
    const result = validateNodeInputsAgainstSchema(nodeDef, { email: 'not-an-email' });
    expect(result.valid).toBe(false);
    expect(result.errors[0].message).toBe('Must be a valid email');
  });

  it('reports generic error when validation returns false', () => {
    const nodeDef = makeNodeDef('test', {
      code: makeField('string', { validation: (v: string) => v.length === 6 }),
    });
    expect(validateNodeInputsAgainstSchema(nodeDef, { code: 'abc' }).valid).toBe(false);
  });

  it('passes when custom validation returns true', () => {
    const nodeDef = makeNodeDef('test', {
      code: makeField('string', { validation: (v: string) => v.length === 6 }),
    });
    expect(validateNodeInputsAgainstSchema(nodeDef, { code: 'abc123' }).valid).toBe(true);
  });
});
