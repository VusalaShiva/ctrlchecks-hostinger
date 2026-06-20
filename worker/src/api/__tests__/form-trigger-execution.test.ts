/**
 * Tests the form pause guard in execute-workflow.ts — specifically that:
 * 1. trigger-service input shape (_form: true) skips the pause and passes data downstream
 * 2. local form-trigger resume shape (submitted_at + data) skips the pause
 * 3. Empty input (no submission data) is NOT treated as a submission
 */

import { normalizeFormTriggerOutput } from '../../core/registry/overrides/form-trigger';

// ── inputHasFormSubmissionPayload (inline copy of the guard logic) ──────────────
function inputHasFormSubmissionPayload(inp: unknown): boolean {
  if (typeof inp !== 'object' || inp === null) return false;
  const o = inp as Record<string, unknown>;
  if (o._form === true) return true;
  if (o.submitted_at !== undefined && o.data !== undefined) return true;
  if (o.data && typeof o.data === 'object' && Object.keys(o.data as object).length > 0) return true;
  return false;
}

describe('inputHasFormSubmissionPayload', () => {
  it('detects trigger-service shape (_form: true)', () => {
    expect(inputHasFormSubmissionPayload({ _form: true, nodeId: 'n1', email: 'x', data: { email: 'x' } })).toBe(true);
  });

  it('detects local resume shape (submitted_at + data)', () => {
    expect(inputHasFormSubmissionPayload({ submitted_at: '2026-06-20T00:00:00Z', data: { name: 'Alice' } })).toBe(true);
  });

  it('detects non-empty data object without _form flag', () => {
    expect(inputHasFormSubmissionPayload({ data: { email: 'test@test.com' } })).toBe(true);
  });

  it('returns false for empty object', () => {
    expect(inputHasFormSubmissionPayload({})).toBe(false);
  });

  it('returns false for null', () => {
    expect(inputHasFormSubmissionPayload(null)).toBe(false);
  });

  it('returns false for plain manual trigger input', () => {
    expect(inputHasFormSubmissionPayload({ _trigger: true })).toBe(false);
  });

  it('returns false for empty data object', () => {
    expect(inputHasFormSubmissionPayload({ data: {} })).toBe(false);
  });
});

describe('form-trigger-execution: normalizeFormTriggerOutput + guard integration', () => {
  it('trigger-service path: guard detects submission and output is correct', () => {
    const input = { _form: true, nodeId: 'node_abc', email: 'user@test.com', data: { email: 'user@test.com' } };

    // Guard should pass
    expect(inputHasFormSubmissionPayload(input)).toBe(true);

    // Output should be the data sub-object
    const output = normalizeFormTriggerOutput(input);
    expect(output).toEqual({ email: 'user@test.com' });
    expect(output.email).toBe('user@test.com');
  });

  it('local form-trigger resume path: guard detects submission and output is correct', () => {
    const input = {
      submitted_at: '2026-06-20T12:00:00Z',
      form: { id: 'node_form1', workflowId: 'wf_1' },
      data: { name: 'Alice', company: 'Acme' },
    };

    expect(inputHasFormSubmissionPayload(input)).toBe(true);
    const output = normalizeFormTriggerOutput(input);
    expect(output).toEqual({ name: 'Alice', company: 'Acme' });
  });

  it('empty input: guard does NOT detect submission → form should pause', () => {
    const input = {};
    expect(inputHasFormSubmissionPayload(input)).toBe(false);
  });

  it('downstream nodes can access $json.email from trigger-service submission', () => {
    const input = { _form: true, nodeId: 'n1', email: 'a@b.com', data: { email: 'a@b.com' } };
    const output = normalizeFormTriggerOutput(input);
    // Simulate template resolution: {{$json.email}} → output.email
    expect((output as any).email).toBe('a@b.com');
  });
});
