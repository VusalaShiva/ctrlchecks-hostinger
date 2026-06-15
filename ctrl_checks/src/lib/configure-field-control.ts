export type ConfigureFieldType = 'text' | 'textarea' | 'number' | 'select' | 'password';

export interface ConfigureFieldDescriptor {
  inputType?: string;
  options?: Array<{ label: string; value: string }>;
  uiWidget?: string;
}

export function resolveConfigureFieldType(field: ConfigureFieldDescriptor): ConfigureFieldType {
  if ((field.inputType === 'select' || field.inputType === 'boolean') && Array.isArray(field.options) && field.options.length > 0) {
    return 'select';
  }

  if (field.inputType === 'textarea' || field.inputType === 'json' || field.uiWidget === 'textarea' || field.uiWidget === 'json' || field.uiWidget === 'multi_email') {
    return 'textarea';
  }

  if (field.inputType === 'number') {
    return 'number';
  }

  if (field.inputType === 'password') {
    return 'password';
  }

  return 'text';
}
