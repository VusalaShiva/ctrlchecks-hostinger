import {
  buildContextualFieldHelp,
  buildOperationHelpFromOptions,
  buildResourceHelpFromOptions,
} from './contextualFieldGuides';
import { generateFieldGuide, FieldGuide } from '../components/workflow/guideGenerator';
import { getNodeGuide, hasNodeGuide } from '../components/workflow/nodeGuides';
import { getNodeDefinition } from '../components/workflow/nodeTypes';
import { getFieldHelpTextFromDoc } from './field-doc-resolver';
import {
  isGenericHelpText,
  normalizeHelpOptions,
  titleCase,
  trimHelpText,
} from './field-help-utils';

export interface ResolveFieldHelpInput {
  nodeType: string;
  fieldName?: string;
  fieldKey?: string;
  fieldLabel: string;
  fieldType?: string;
  placeholder?: string;
  description?: string;
  helpText?: string;
  helpCategory?: string;
  docsUrl?: string;
  exampleValue?: string;
  example?: unknown;
  options?: Array<{ label: string; value: string } | string>;
  nodeLabel?: string;
  config?: Record<string, unknown>;
  operation?: unknown;
  resource?: unknown;
}

export interface FieldHelpContent {
  title: string;
  description: string;
  example?: string;
  source?: 'doc' | 'explicit' | 'option-aware' | 'contextual' | 'node-guide' | 'generated' | 'generic';
}

function guideToContent(guide: FieldGuide, source: FieldHelpContent['source']): FieldHelpContent {
  return {
    title: guide.title,
    description: guide.steps.filter(Boolean).join('\n'),
    example: guide.example,
    source,
  };
}

function helpTitle(fieldLabel: string, fieldType: string): string {
  const label = fieldLabel || 'this field';
  return fieldType === 'select' ? `How to choose ${label}?` : `How to set ${label}?`;
}

function contentFromText(
  text: string,
  input: {
    fieldLabel: string;
    fieldType: string;
    example?: string;
    source: FieldHelpContent['source'];
  },
): FieldHelpContent {
  return {
    title: helpTitle(input.fieldLabel, input.fieldType),
    description: text.trim(),
    example: input.example,
    source: input.source,
  };
}

function fieldKind(fieldName: string, fieldLabel: string): 'operation' | 'resource' | 'other' {
  const key = fieldName.toLowerCase();
  const label = fieldLabel.toLowerCase();
  if (key === 'operation' || label === 'operation') return 'operation';
  if (key === 'resource' || label === 'resource') return 'resource';
  return 'other';
}

function genericFallback(input: {
  nodeType: string;
  nodeLabel: string;
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  placeholder?: string;
  description?: string;
  example?: string;
}): string {
  const nodeName = input.nodeLabel || titleCase(input.nodeType);
  const label = input.fieldLabel || titleCase(input.fieldName);
  const baseDescription = trimHelpText(input.description) || `${label} controls this ${nodeName} step.`;
  const verb = input.fieldType === 'select' ? 'choose' : 'fill it';
  return [
    `What this field is: ${baseDescription}`,
    input.fieldType === 'select'
      ? `How to choose it: Pick the option that matches what this step should do.`
      : `How to ${verb}: Enter the value ${nodeName} needs, or use data from an earlier workflow step.`,
    input.placeholder ? `Example: ${input.placeholder}.` : input.example ? `Example: ${input.example}.` : null,
  ].filter(Boolean).join('\n');
}

export function resolveFieldHelp(input: ResolveFieldHelpInput): FieldHelpContent | null {
  const nodeType = String(input.nodeType || '').trim();
  const fieldName = String(input.fieldName || input.fieldKey || '').trim();
  const fieldLabel = input.fieldLabel || titleCase(fieldName);
  const fieldType = input.fieldType || 'text';
  const config = input.config || {};
  const nodeLabel = input.nodeLabel || nodeType.replace(/_/g, ' ');
  const exampleStr = input.example != null ? String(input.example) : input.exampleValue;
  const nodeDef = nodeType ? getNodeDefinition(nodeType) : undefined;
  const configField = nodeDef?.configFields?.find(
    (field) => field.key === fieldName || field.key.toLowerCase() === fieldName.toLowerCase()
  );
  const options = normalizeHelpOptions(input.options || configField?.options);
  const kind = fieldKind(fieldName, fieldLabel);
  const genericContext = {
    fieldKey: fieldName,
    fieldLabel,
    fieldType,
    options,
  };

  const docHelp = getFieldHelpTextFromDoc({
    nodeType,
    fieldKey: fieldName,
    operation: input.operation,
    resource: input.resource,
    config,
  });
  if (docHelp && !isGenericHelpText(docHelp, genericContext)) {
    return contentFromText(docHelp, { fieldLabel, fieldType, example: exampleStr, source: 'doc' });
  }

  const explicitHelp = trimHelpText(input.helpText) || trimHelpText(configField?.helpText);
  if (explicitHelp && !isGenericHelpText(explicitHelp, genericContext)) {
    return contentFromText(explicitHelp, { fieldLabel, fieldType, example: exampleStr, source: 'explicit' });
  }

  const explicitDescription = trimHelpText(input.description);
  if (
    explicitDescription &&
    kind === 'other' &&
    !isGenericHelpText(explicitDescription, genericContext)
  ) {
    return contentFromText(explicitDescription, { fieldLabel, fieldType, example: exampleStr, source: 'explicit' });
  }

  if (kind === 'operation') {
    const optionHelp = buildOperationHelpFromOptions({
      nodeType,
      nodeLabel,
      fieldKey: fieldName,
      fieldLabel,
      fieldType,
      placeholder: input.placeholder,
      options,
      config,
    });
    if (optionHelp) {
      return contentFromText(optionHelp, { fieldLabel, fieldType, example: exampleStr, source: 'option-aware' });
    }
  }

  if (kind === 'resource') {
    const optionHelp = buildResourceHelpFromOptions({
      nodeType,
      nodeLabel,
      fieldKey: fieldName,
      fieldLabel,
      fieldType,
      placeholder: input.placeholder,
      options,
      config,
    });
    if (optionHelp) {
      return contentFromText(optionHelp, { fieldLabel, fieldType, example: exampleStr, source: 'option-aware' });
    }
  }

  const contextual = buildContextualFieldHelp({
    nodeType,
    nodeLabel,
    fieldKey: fieldName,
    fieldLabel,
    fieldType,
    fieldDescription: input.description || explicitHelp || fieldLabel,
    placeholder: input.placeholder,
    options,
    config,
    fallbackHelpText: explicitHelp || undefined,
  });
  if (contextual && contextual.trim() && !isGenericHelpText(contextual, genericContext)) {
    return contentFromText(contextual, { fieldLabel, fieldType, example: exampleStr, source: 'contextual' });
  }

  if (nodeType && fieldName && hasNodeGuide(nodeType, fieldName)) {
    const nodeGuide = getNodeGuide(nodeType, fieldName);
    if (nodeGuide) return guideToContent({ ...nodeGuide, steps: nodeGuide.steps }, 'node-guide');
  }

  const resolvedHelpCategory = input.helpCategory || configField?.helpCategory;
  const resolvedDocsUrl = input.docsUrl || configField?.docsUrl;
  const resolvedExampleValue = exampleStr ?? configField?.exampleValue;
  const registryMeta = resolvedHelpCategory && resolvedHelpCategory !== 'none'
    ? { helpCategory: resolvedHelpCategory, docsUrl: resolvedDocsUrl, exampleValue: resolvedExampleValue }
    : undefined;

  const guide = generateFieldGuide(
    nodeType,
    fieldName,
    fieldLabel,
    fieldType,
    input.placeholder,
    registryMeta
  );
  if (guide?.steps?.length) {
    return guideToContent({ ...guide, example: guide.example ?? resolvedExampleValue }, 'generated');
  }

  if (kind !== 'other') return null;

  const fallbackText = genericFallback({
    nodeType,
    nodeLabel,
    fieldName,
    fieldLabel,
    fieldType,
    placeholder: input.placeholder,
    description: input.description,
    example: exampleStr,
  });

  return contentFromText(fallbackText, { fieldLabel, fieldType, example: exampleStr, source: 'generic' });
}

export function resolveFieldHelpContent(input: ResolveFieldHelpInput): FieldHelpContent | null {
  return resolveFieldHelp(input);
}
