import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collectUpstreamFieldHints } from '../upstreamFieldHints';

vi.mock('@/services/nodeSchemaService', () => ({
  nodeSchemaService: {
    getCachedSchemas: vi.fn(),
  },
}));

import { nodeSchemaService } from '@/services/nodeSchemaService';

const mockGetCached = nodeSchemaService.getCachedSchemas as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetAllMocks();
});

// ─── helpers ──────────────────────────────────────────────────────────────────

function makeNode(type: string, category: string, outputSchema?: Record<string, unknown>) {
  return {
    type,
    label: type,
    category,
    description: '',
    inputSchema: {},
    outputSchema: outputSchema ?? {},
    requiredInputs: [],
    outgoingPorts: [],
    incomingPorts: [],
    isBranching: false,
    defaultInputs: {},
  };
}

function prevNode(type: string) {
  return { data: { type } };
}

// ─── no cache ─────────────────────────────────────────────────────────────────

describe('collectUpstreamFieldHints — no cache', () => {
  it('returns ["$json"] when getCachedSchemas returns null', () => {
    mockGetCached.mockReturnValue(null);
    expect(collectUpstreamFieldHints([prevNode('google_sheets')])).toEqual(['$json']);
  });

  it('returns ["$json"] when getCachedSchemas returns undefined', () => {
    mockGetCached.mockReturnValue(undefined);
    expect(collectUpstreamFieldHints([prevNode('google_sheets')])).toEqual(['$json']);
  });
});

// ─── empty prevNodes ──────────────────────────────────────────────────────────

describe('collectUpstreamFieldHints — empty prevNodes', () => {
  it('returns ["$json"] for empty array even when cache is populated', () => {
    mockGetCached.mockReturnValue([makeNode('google_sheets', 'action')]);
    expect(collectUpstreamFieldHints([])).toEqual(['$json']);
  });
});

// ─── node type not found in cache ─────────────────────────────────────────────

describe('collectUpstreamFieldHints — unknown node type', () => {
  it('returns ["$json"] when node type is not in cache', () => {
    mockGetCached.mockReturnValue([makeNode('slack', 'action')]);
    expect(collectUpstreamFieldHints([prevNode('unknown_type')])).toEqual(['$json']);
  });
});

// ─── node with no data.type ───────────────────────────────────────────────────

describe('collectUpstreamFieldHints — node with no type', () => {
  it('skips nodes that have no data.type', () => {
    mockGetCached.mockReturnValue([makeNode('slack', 'action')]);
    expect(collectUpstreamFieldHints([{ data: {} }, { data: undefined }, {}])).toEqual(['$json']);
  });
});

// ─── trigger category ─────────────────────────────────────────────────────────

describe('collectUpstreamFieldHints — trigger nodes', () => {
  it('adds trigger input prefixes for category "trigger"', () => {
    mockGetCached.mockReturnValue([makeNode('webhook', 'trigger')]);
    const result = collectUpstreamFieldHints([prevNode('webhook')]);
    expect(result).toContain('input');
    expect(result).toContain('input.email');
    expect(result).toContain('input.name');
    expect(result).toContain('input.age');
    expect(result).toContain('input.phone');
    expect(result).toContain('$json');
  });

  it('adds trigger input prefixes for category "triggers" (plural)', () => {
    mockGetCached.mockReturnValue([makeNode('manual_trigger', 'triggers')]);
    const result = collectUpstreamFieldHints([prevNode('manual_trigger')]);
    expect(result).toContain('input');
    expect(result).toContain('input.email');
    expect(result).toContain('$json');
  });

  it('does NOT add trigger prefixes for category "action"', () => {
    mockGetCached.mockReturnValue([makeNode('slack', 'action')]);
    const result = collectUpstreamFieldHints([prevNode('slack')]);
    expect(result).not.toContain('input');
    expect(result).toEqual(['$json']);
  });
});

// ─── outputSchema port-level hints ────────────────────────────────────────────

describe('collectUpstreamFieldHints — outputSchema port-level hints', () => {
  it('adds $json.<portName> for each port in outputSchema', () => {
    const outputSchema = {
      main: {},
      error: {},
    };
    mockGetCached.mockReturnValue([makeNode('http_request', 'action', outputSchema)]);
    const result = collectUpstreamFieldHints([prevNode('http_request')]);
    expect(result).toContain('$json.main');
    expect(result).toContain('$json.error');
    expect(result).toContain('$json');
  });

  it('adds $json.<prop> for each schema.properties key in a port', () => {
    const outputSchema = {
      main: {
        schema: {
          properties: {
            status: {},
            body: {},
            headers: {},
          },
        },
      },
    };
    mockGetCached.mockReturnValue([makeNode('http_request', 'action', outputSchema)]);
    const result = collectUpstreamFieldHints([prevNode('http_request')]);
    expect(result).toContain('$json.status');
    expect(result).toContain('$json.body');
    expect(result).toContain('$json.headers');
  });

  it('handles port with schema but no properties gracefully', () => {
    const outputSchema = {
      main: { schema: {} },
    };
    mockGetCached.mockReturnValue([makeNode('http_request', 'action', outputSchema)]);
    const result = collectUpstreamFieldHints([prevNode('http_request')]);
    expect(result).toContain('$json.main');
    expect(result).not.toContain('$json.undefined');
  });

  it('handles port where schema value is not an object (non-object schema)', () => {
    const outputSchema = {
      main: null,
    } as unknown as Record<string, unknown>;
    mockGetCached.mockReturnValue([makeNode('http_request', 'action', outputSchema)]);
    const result = collectUpstreamFieldHints([prevNode('http_request')]);
    expect(result).toContain('$json.main');
  });

  it('skips outputSchema entirely when it is not an object', () => {
    const def = makeNode('bad_node', 'action');
    (def as any).outputSchema = 'not-an-object';
    mockGetCached.mockReturnValue([def]);
    const result = collectUpstreamFieldHints([prevNode('bad_node')]);
    expect(result).toEqual(['$json']);
  });
});

// ─── multiple nodes ────────────────────────────────────────────────────────────

describe('collectUpstreamFieldHints — multiple nodes', () => {
  it('merges hints from all upstream nodes', () => {
    mockGetCached.mockReturnValue([
      makeNode('webhook', 'trigger'),
      makeNode('http_request', 'action', { main: { schema: { properties: { responseCode: {} } } } }),
    ]);
    const result = collectUpstreamFieldHints([prevNode('webhook'), prevNode('http_request')]);
    expect(result).toContain('input');
    expect(result).toContain('$json.main');
    expect(result).toContain('$json.responseCode');
  });

  it('deduplicates hints that appear in multiple nodes', () => {
    const outputSchema = { main: {} };
    mockGetCached.mockReturnValue([
      makeNode('node_a', 'action', outputSchema),
      makeNode('node_b', 'action', outputSchema),
    ]);
    const result = collectUpstreamFieldHints([prevNode('node_a'), prevNode('node_b')]);
    const mainCount = result.filter((h) => h === '$json.main').length;
    expect(mainCount).toBe(1);
  });

  it('skips unrecognised nodes and still collects hints from recognised ones', () => {
    mockGetCached.mockReturnValue([makeNode('webhook', 'trigger')]);
    const result = collectUpstreamFieldHints([prevNode('unknown'), prevNode('webhook')]);
    expect(result).toContain('input');
    expect(result).toContain('$json');
  });
});

// ─── sorted output ─────────────────────────────────────────────────────────────

describe('collectUpstreamFieldHints — sorted output', () => {
  it('returns hints in sorted order', () => {
    const outputSchema = {
      zebra: {},
      apple: {},
      mango: {},
    };
    mockGetCached.mockReturnValue([makeNode('some_node', 'action', outputSchema)]);
    const result = collectUpstreamFieldHints([prevNode('some_node')]);
    const sorted = [...result].sort();
    expect(result).toEqual(sorted);
  });

  it('trigger prefixes are included in sorted output', () => {
    mockGetCached.mockReturnValue([makeNode('form', 'trigger')]);
    const result = collectUpstreamFieldHints([prevNode('form')]);
    const sorted = [...result].sort();
    expect(result).toEqual(sorted);
  });
});
