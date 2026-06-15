import { describe, it, expect } from 'vitest';
import {
  ATTACH_INPUTS_PERSISTABLE_META_KEYS,
  extractNodeConfigForAttachInputs,
  buildNestedAttachInputsFromNodes,
  attachInputsPayloadKey,
} from '../attach-inputs-payload';

describe('attach-inputs-payload', () => {
  it('includes _fillMode, _ownershipUnlock, _fieldEnabled and excludes other _ keys', () => {
    const cfg = {
      message: 'hello',
      _fillMode: { message: 'buildtime_ai_once' },
      _ownershipUnlock: { apiKey: true },
      _fieldEnabled: { x: true },
      _internal: 'skip',
    };
    const out = extractNodeConfigForAttachInputs(cfg);
    expect(out.message).toBe('hello');
    expect(out._fillMode).toEqual(cfg._fillMode);
    expect(out._ownershipUnlock).toEqual(cfg._ownershipUnlock);
    expect(out._fieldEnabled).toEqual(cfg._fieldEnabled);
    expect((out as any)._internal).toBeUndefined();
  });

  it('buildNestedAttachInputsFromNodes nests by node id', () => {
    const nodes = [
      { id: 'n1', data: { config: { a: 1, _fillMode: { a: 'manual_static' } } } },
      { id: 'n2', data: { config: {} } },
    ];
    const nested = buildNestedAttachInputsFromNodes(nodes as any);
    expect(Object.keys(nested)).toEqual(['n1']);
    expect(nested.n1.a).toBe(1);
    expect(nested.n1._fillMode).toEqual({ a: 'manual_static' });
  });

  it('documents known meta keys set', () => {
    expect(ATTACH_INPUTS_PERSISTABLE_META_KEYS.has('_fillMode')).toBe(true);
  });

  it('builds the same dedupe key for equivalent payloads with different key order', () => {
    const a = { n1: { b: 2, a: 1 }, n2: { c: 'x' } };
    const b = { n2: { c: 'x' }, n1: { a: 1, b: 2 } };
    expect(attachInputsPayloadKey(a)).toBe(attachInputsPayloadKey(b));
  });
});
