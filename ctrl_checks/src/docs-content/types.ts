export interface FieldDoc {
  name: string;
  internalKey: string;
  type:
    | 'string' | 'number' | 'boolean' | 'select'
    | 'multiselect' | 'json' | 'date' | 'password'
    | 'url' | 'email' | 'textarea';
  required: boolean;
  description: string;
  helpText?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  example?: string;
  notes?: string;
}

export interface OperationDoc {
  name: string;
  value: string;
  description: string;
  fields: FieldDoc[];
  outputExample: Record<string, unknown>;
  outputDescription: string;
  usageExample: {
    scenario: string;
    inputValues: Record<string, string>;
    expectedOutput: string;
  };
  externalDocsUrl: string;
}

export interface ResourceDoc {
  name: string;
  description: string;
  operations: OperationDoc[];
}

export interface NodeDoc {
  slug: string;
  displayName: string;
  category: string;
  logoUrl: string;
  description: string;
  credentialType: string;
  credentialSetupSteps: string[];
  credentialDocsUrl: string;
  resources: ResourceDoc[];
  commonErrors: {
    error: string;
    cause: string;
    fix: string;
  }[];
  relatedNodes: string[];
}
