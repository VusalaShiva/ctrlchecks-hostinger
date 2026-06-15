import { nodesBySlug } from '@/docs-content';
import type { FieldDoc, NodeDoc, OperationDoc, ResourceDoc } from '@/docs-content/types';
import { normalizeFieldKey, trimHelpText } from './field-help-utils';

export type FieldDocLookupInput = {
  nodeType?: string;
  fieldKey?: string;
  operation?: unknown;
  resource?: unknown;
  config?: Record<string, unknown>;
};

export type OperationDocSummary = {
  name: string;
  value: string;
  description: string;
  resourceName?: string;
};

type FieldDocMatch = {
  field: FieldDoc;
  operation: OperationDoc;
  resource: ResourceDoc;
};

function getNodeDoc(nodeType?: string): NodeDoc | null {
  const slug = String(nodeType || '').trim();
  if (!slug) return null;
  return nodesBySlug[slug] || null;
}

function uniqueStrings(values: unknown[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  values.forEach((value) => {
    const text = String(value || '').trim();
    if (!text) return;
    const lower = text.toLowerCase();
    if (seen.has(lower)) return;
    seen.add(lower);
    result.push(lower);
  });
  return result;
}

function requestedOperations(input: FieldDocLookupInput): string[] {
  const config = input.config || {};
  return uniqueStrings([
    input.operation,
    config.operation,
    config.action,
    config.method,
    config.operationValue,
  ]);
}

function requestedResources(input: FieldDocLookupInput): string[] {
  const config = input.config || {};
  return uniqueStrings([
    input.resource,
    config.resource,
    config.object,
    config.entity,
    config.objectType,
  ]);
}

function operationMatches(operation: OperationDoc, requested: string[]): boolean {
  if (!requested.length) return true;
  const operationKeys = uniqueStrings([operation.value, operation.name]);
  return requested.some((value) => operationKeys.includes(value));
}

function resourceMatches(resource: ResourceDoc, requested: string[]): boolean {
  if (!requested.length) return true;
  const resourceKeys = uniqueStrings([resource.name, resource.description]);
  return requested.some((value) =>
    resourceKeys.some((key) => key === value || key.includes(value))
  );
}

function fieldMatches(field: FieldDoc, fieldKey: string): boolean {
  const key = normalizeFieldKey(fieldKey);
  if (!key) return false;
  return [field.internalKey, field.name].some((candidate) => normalizeFieldKey(candidate) === key);
}

function collectMatches(doc: NodeDoc, fieldKey: string): FieldDocMatch[] {
  return doc.resources.flatMap((resource) =>
    resource.operations.flatMap((operation) =>
      operation.fields
        .filter((field) => fieldMatches(field, fieldKey))
        .map((field) => ({ field, operation, resource }))
    )
  );
}

export function findFieldDocField(input: FieldDocLookupInput): FieldDoc | null {
  const doc = getNodeDoc(input.nodeType);
  const fieldKey = String(input.fieldKey || '').trim();
  if (!doc || !fieldKey) return null;

  const matches = collectMatches(doc, fieldKey);
  if (!matches.length) return null;

  const operations = requestedOperations(input);
  const resources = requestedResources(input);

  const exactOperation = matches.find((match) => operationMatches(match.operation, operations));
  if (exactOperation) return exactOperation.field;

  const exactResource = matches.find((match) => resourceMatches(match.resource, resources));
  if (exactResource) return exactResource.field;

  return matches[0]?.field || null;
}

export function getFieldHelpTextFromDoc(input: FieldDocLookupInput): string | null {
  const field = findFieldDocField(input);
  return trimHelpText(field?.helpText);
}

export function getNodeOperationDocs(nodeType?: string): OperationDocSummary[] {
  const doc = getNodeDoc(nodeType);
  if (!doc) return [];

  return doc.resources.flatMap((resource) =>
    resource.operations.map((operation) => ({
      name: operation.name,
      value: operation.value,
      description: operation.description,
      resourceName: resource.name,
    }))
  );
}
