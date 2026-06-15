import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackFieldOwnershipGuideEvent } from '../field-ownership-guide-telemetry';

describe('trackFieldOwnershipGuideEvent', () => {
  let infoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls console.info with [FieldOwnershipGuide] prefix', () => {
    trackFieldOwnershipGuideEvent('panel_opened');
    expect(infoSpy).toHaveBeenCalledOnce();
    expect(infoSpy.mock.calls[0][0]).toBe('[FieldOwnershipGuide]');
  });

  it('body second arg contains event, payload, ts properties', () => {
    trackFieldOwnershipGuideEvent('suggestion_clicked', { field: 'email' });
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body).toHaveProperty('event', 'suggestion_clicked');
    expect(body).toHaveProperty('payload', { field: 'email' });
    expect(body).toHaveProperty('ts');
  });

  it('ts is a number close to Date.now()', () => {
    const before = Date.now();
    trackFieldOwnershipGuideEvent('question_asked');
    const after = Date.now();
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    const ts = body.ts as number;
    expect(typeof ts).toBe('number');
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it('default payload is empty object when not provided', () => {
    trackFieldOwnershipGuideEvent('field_help_viewed');
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.payload).toEqual({});
  });

  it('custom payload passes through unchanged', () => {
    const payload = { nodeId: 'n1', fieldKey: 'apiKey', reason: 'required' };
    trackFieldOwnershipGuideEvent('field_help_viewed', payload);
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.payload).toEqual(payload);
  });

  it('logs panel_opened event type correctly', () => {
    trackFieldOwnershipGuideEvent('panel_opened');
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.event).toBe('panel_opened');
  });

  it('logs suggestion_clicked event type correctly', () => {
    trackFieldOwnershipGuideEvent('suggestion_clicked');
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.event).toBe('suggestion_clicked');
  });

  it('logs question_asked event type correctly', () => {
    trackFieldOwnershipGuideEvent('question_asked');
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.event).toBe('question_asked');
  });

  it('logs field_help_viewed event type correctly', () => {
    trackFieldOwnershipGuideEvent('field_help_viewed');
    const body = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    expect(body.event).toBe('field_help_viewed');
  });

  it('is non-fatal: does not throw when console.info throws', () => {
    infoSpy.mockImplementation(() => { throw new Error('console broken'); });
    expect(() => trackFieldOwnershipGuideEvent('panel_opened')).not.toThrow();
  });

  it('returns undefined', () => {
    const result = trackFieldOwnershipGuideEvent('panel_opened');
    expect(result).toBeUndefined();
  });

  it('multiple calls are independent log entries', () => {
    trackFieldOwnershipGuideEvent('panel_opened', { a: 1 });
    trackFieldOwnershipGuideEvent('question_asked', { b: 2 });
    expect(infoSpy).toHaveBeenCalledTimes(2);
    const body0 = infoSpy.mock.calls[0][1] as Record<string, unknown>;
    const body1 = infoSpy.mock.calls[1][1] as Record<string, unknown>;
    expect(body0.event).toBe('panel_opened');
    expect(body1.event).toBe('question_asked');
    expect((body0.payload as Record<string, unknown>).a).toBe(1);
    expect((body1.payload as Record<string, unknown>).b).toBe(2);
  });
});
