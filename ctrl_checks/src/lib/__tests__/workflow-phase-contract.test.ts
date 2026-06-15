import { describe, it, expect } from 'vitest';
import { shouldRunAttachCredentialsAfterAttachInputs } from '@/lib/workflow-phase-contract';

describe('workflow-phase-contract', () => {
  it('allows attach-credentials only after inputs_applied or configuring_credentials', () => {
    expect(shouldRunAttachCredentialsAfterAttachInputs('inputs_applied')).toBe(true);
    expect(shouldRunAttachCredentialsAfterAttachInputs('INPUTS_APPLIED')).toBe(true);
    expect(shouldRunAttachCredentialsAfterAttachInputs('configuring_credentials')).toBe(true);
    expect(shouldRunAttachCredentialsAfterAttachInputs('ready_for_execution')).toBe(false);
    expect(shouldRunAttachCredentialsAfterAttachInputs('')).toBe(false);
    expect(shouldRunAttachCredentialsAfterAttachInputs(null)).toBe(false);
    expect(shouldRunAttachCredentialsAfterAttachInputs(undefined)).toBe(false);
  });
});
