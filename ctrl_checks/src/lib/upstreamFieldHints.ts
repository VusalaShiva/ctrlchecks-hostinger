/**
 * Build JSON path hints for condition / expression editors from upstream node definitions.
 * Uses cached node schemas (registry-backed API) and node category — no per-integration hardcoding.
 */

import { nodeSchemaService, NodeDefinition } from '@/services/nodeSchemaService';

function addTriggerInputPrefixes(hints: Set<string>): void {
  ['input', 'input.email', 'input.name', 'input.age', 'input.phone'].forEach((p) => hints.add(p));
}

function addHintsFromOutputSchema(hints: Set<string>, def: NodeDefinition): void {
  const os = def.outputSchema as Record<string, unknown> | undefined;
  if (!os || typeof os !== 'object') return;

  for (const [portName, port] of Object.entries(os)) {
    hints.add(`$json.${portName}`);
    const schema = (port as { schema?: { properties?: Record<string, unknown> } })?.schema;
    const props = schema?.properties;
    if (props && typeof props === 'object') {
      for (const prop of Object.keys(props)) {
        hints.add(`$json.${prop}`);
      }
    }
  }
}

/**
 * @param prevNodes Nodes that have an edge into the current node (e.g. If/Else upstream)
 */
export function collectUpstreamFieldHints(prevNodes: { data?: { type?: string } }[]): string[] {
  const hints = new Set<string>(['$json']);
  const cached = nodeSchemaService.getCachedSchemas();
  if (!cached || prevNodes.length === 0) {
    return Array.from(hints).sort();
  }

  for (const n of prevNodes) {
    const t = n.data?.type;
    if (!t) continue;
    const def = cached.find((x) => x.type === t);
    if (!def) continue;

    const cat = (def.category || '').toLowerCase();
    if (cat === 'trigger' || cat === 'triggers') {
      addTriggerInputPrefixes(hints);
    }

    addHintsFromOutputSchema(hints, def);
  }

  return Array.from(hints).sort();
}
