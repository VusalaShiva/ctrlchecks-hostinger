import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateAllNodeInputs } from '../workflowNodeInputValidator';

vi.mock('reactflow', () => ({}));

vi.mock('@/services/nodeSchemaService', () => ({
  nodeSchemaService: {
    fetchAllSchemas: vi.fn(),
  },
}));

import { nodeSchemaService } from '@/services/nodeSchemaService';

const mockFetchAllSchemas = nodeSchemaService.fetchAllSchemas as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetAllMocks();
});

// ─── helpers ──────────────────────────────────────────────────────────────────

function makeNode(
  id: string,
  type: string,
  config: Record<string, unknown> = {},
  label?: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  return { id, data: { type, config, label } };
}

function makeSchema(
  type: string,
  requiredInputs: string[] = [],
  inputSchema: Record<string, { default?: unknown; validation?: (v: unknown) => boolean | string }> = {},
) {
  return { type, requiredInputs, inputSchema };
}

// ─── schema fetch failure ─────────────────────────────────────────────────────

describe('validateAllNodeInputs — schema fetch failure', () => {
  it('warns and returns valid:true when fetchAllSchemas throws', async () => {
    mockFetchAllSchemas.mockRejectedValue(new Error('network error'));
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request')]);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toEqual([
      'Could not fetch node schemas from backend - skipping input validation',
    ]);
  });
});

// ─── empty nodes ──────────────────────────────────────────────────────────────

describe('validateAllNodeInputs — empty nodes array', () => {
  it('returns valid:true with no errors or warnings for empty nodes', async () => {
    mockFetchAllSchemas.mockResolvedValue([]);
    const result = await validateAllNodeInputs([]);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });
});

// ─── node type missing ────────────────────────────────────────────────────────

describe('validateAllNodeInputs — node type missing', () => {
  it('adds warning when node has no data.type and skips validation', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request')]);
    const node = { id: 'n1', data: {} } as any;
    const result = await validateAllNodeInputs([node]);
    expect(result.warnings).toContain('Node n1 has no type');
    expect(result.errors).toHaveLength(0);
  });

  it('adds warning when node has no data object and skips validation', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request')]);
    const node = { id: 'n2' } as any;
    const result = await validateAllNodeInputs([node]);
    expect(result.warnings).toContain('Node n2 has no type');
    expect(result.errors).toHaveLength(0);
  });
});

// ─── node type not in schemas ─────────────────────────────────────────────────

describe('validateAllNodeInputs — node type not in schemas', () => {
  it('adds warning when node type is not found in schemas', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('slack')]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request')]);
    expect(result.warnings).toContain('Node n1 (http_request) has no schema definition');
    expect(result.errors).toHaveLength(0);
  });
});

// ─── required field validation ────────────────────────────────────────────────

describe('validateAllNodeInputs — required field validation', () => {
  it('reports MISSING_REQUIRED_INPUT for undefined required field', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['url'])]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', {}, 'HTTP Node')]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('MISSING_REQUIRED_INPUT');
    expect(result.errors[0].nodeId).toBe('n1');
    expect(result.errors[0].field).toBe('url');
    expect(result.errors[0].message).toContain('HTTP Node');
    expect(result.valid).toBe(false);
  });

  it('reports MISSING_REQUIRED_INPUT for null required field', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['url'])]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', { url: null })]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('MISSING_REQUIRED_INPUT');
  });

  it('reports MISSING_REQUIRED_INPUT for empty string required field', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['url'])]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', { url: '' })]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('MISSING_REQUIRED_INPUT');
  });

  it('does NOT report error for empty array required field (outer condition is false for [])', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['tags'])]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', { tags: [] })]);
    expect(result.errors).toHaveLength(0);
  });

  it('no error when required field has a non-empty value', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['url'])]);
    const result = await validateAllNodeInputs([
      makeNode('n1', 'http_request', { url: 'https://example.com' }),
    ]);
    expect(result.errors).toHaveLength(0);
    expect(result.valid).toBe(true);
  });
});

// ─── field validation fn ──────────────────────────────────────────────────────

describe('validateAllNodeInputs — field validation fn', () => {
  it('no error when validation fn returns true', async () => {
    const schema = makeSchema('http_request', [], { url: { validation: () => true } });
    mockFetchAllSchemas.mockResolvedValue([schema]);
    const result = await validateAllNodeInputs([
      makeNode('n1', 'http_request', { url: 'https://example.com' }),
    ]);
    expect(result.errors).toHaveLength(0);
  });

  it('reports INVALID_INPUT_VALUE with custom message when validation fn returns a string', async () => {
    const schema = makeSchema('http_request', [], {
      url: { validation: () => 'must start with https' },
    });
    mockFetchAllSchemas.mockResolvedValue([schema]);
    const result = await validateAllNodeInputs([
      makeNode('n1', 'http_request', { url: 'http://bad.com' }),
    ]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('INVALID_INPUT_VALUE');
    expect(result.errors[0].message).toContain('must start with https');
    expect(result.errors[0].field).toBe('url');
  });

  it('reports INVALID_INPUT_VALUE with "Invalid value" when validation fn returns false', async () => {
    const schema = makeSchema('http_request', [], { url: { validation: () => false } });
    mockFetchAllSchemas.mockResolvedValue([schema]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', { url: 'bad' })]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('INVALID_INPUT_VALUE');
    expect(result.errors[0].message).toContain('Invalid value');
  });

  it('does not call validation fn when value is undefined', async () => {
    const validation = vi.fn(() => true);
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', [], { url: { validation } })]);
    await validateAllNodeInputs([makeNode('n1', 'http_request', {})]);
    expect(validation).not.toHaveBeenCalled();
  });

  it('skips field entirely when field has a default and value is undefined', async () => {
    const validation = vi.fn(() => false);
    const schema = makeSchema('http_request', [], {
      url: { default: 'https://default.com', validation },
    });
    mockFetchAllSchemas.mockResolvedValue([schema]);
    const result = await validateAllNodeInputs([makeNode('n1', 'http_request', {})]);
    expect(validation).not.toHaveBeenCalled();
    expect(result.errors).toHaveLength(0);
  });
});

// ─── multiple nodes ───────────────────────────────────────────────────────────

describe('validateAllNodeInputs — multiple nodes', () => {
  it('collects errors from all nodes in the list', async () => {
    mockFetchAllSchemas.mockResolvedValue([
      makeSchema('http_request', ['url']),
      makeSchema('slack', ['channel']),
    ]);
    const result = await validateAllNodeInputs([
      makeNode('n1', 'http_request', {}),
      makeNode('n2', 'slack', {}),
    ]);
    expect(result.errors).toHaveLength(2);
    expect(result.errors.map((e) => e.nodeId)).toContain('n1');
    expect(result.errors.map((e) => e.nodeId)).toContain('n2');
    expect(result.valid).toBe(false);
  });
});

// ─── label fallback ───────────────────────────────────────────────────────────

describe('validateAllNodeInputs — label fallback', () => {
  it('uses node.id in error message when label is not set', async () => {
    mockFetchAllSchemas.mockResolvedValue([makeSchema('http_request', ['url'])]);
    const result = await validateAllNodeInputs([makeNode('my-node-id', 'http_request', {})]);
    expect(result.errors[0].message).toContain('my-node-id');
  });
});
