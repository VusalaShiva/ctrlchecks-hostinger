import { describe, expect, it } from 'vitest';
import { mergeCapabilityHints, capabilitiesFromAppRole } from '../aiEditorPermissions';
import type { AiEditorCapabilitiesResponse } from '@/types/aiEditor';

describe('aiEditorPermissions', () => {
  it('capabilitiesFromAppRole maps moderator', () => {
    const m = capabilitiesFromAppRole('moderator');
    expect(m.has('ai_editor:suggest')).toBe(true);
    expect(m.has('ai_editor:apply_live')).toBe(false);
  });

  it('mergeCapabilityHints prefers API when successful', () => {
    const api: AiEditorCapabilitiesResponse = {
      success: true,
      role: 'moderator',
      capabilities: ['ai_editor:analyze', 'ai_editor:suggest', 'ai_editor:apply_draft'],
      canApply: false,
      applyBlockedReason: 'live workflow',
    };
    const m = mergeCapabilityHints(api, 'user');
    expect(m.canSuggest).toBe(true);
    expect(m.canApply).toBe(false);
    expect(m.applyBlockedReason).toBe('live workflow');
  });
});
