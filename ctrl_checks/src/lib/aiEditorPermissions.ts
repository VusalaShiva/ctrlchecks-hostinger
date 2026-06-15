import type { Database } from '@/integrations/aws/types';
import type { AiEditorCapabilitiesResponse } from '@/types/aiEditor';

type AppRole = Database['public']['Enums']['app_role'];

/** Client-side hint only — server `/api/ai/editor/capabilities` is authoritative */
export function capabilitiesFromAppRole(role: AppRole | null): Set<string> {
  const caps = new Set<string>();
  if (!role || role === 'user') {
    caps.add('ai_editor:analyze');
    return caps;
  }
  if (role === 'moderator') {
    caps.add('ai_editor:analyze');
    caps.add('ai_editor:suggest');
    caps.add('ai_editor:apply_draft');
    return caps;
  }
  if (role === 'admin') {
    caps.add('ai_editor:analyze');
    caps.add('ai_editor:suggest');
    caps.add('ai_editor:apply_draft');
    caps.add('ai_editor:apply_live');
    return caps;
  }
  caps.add('ai_editor:analyze');
  return caps;
}

export function mergeCapabilityHints(
  api: AiEditorCapabilitiesResponse | null,
  role: AppRole | null
): {
  canAnalyze: boolean;
  canSuggest: boolean;
  canApply: boolean;
  applyBlockedReason?: string;
  roleLabel: string;
} {
  if (api?.success && Array.isArray(api.capabilities)) {
    const caps = new Set(api.capabilities);
    return {
      canAnalyze: caps.has('ai_editor:analyze'),
      canSuggest: caps.has('ai_editor:suggest'),
      canApply: !!api.canApply,
      applyBlockedReason: api.applyBlockedReason,
      roleLabel: api.role,
    };
  }
  const fallback = capabilitiesFromAppRole(role);
  return {
    canAnalyze: fallback.has('ai_editor:analyze'),
    canSuggest: fallback.has('ai_editor:suggest'),
    canApply: fallback.has('ai_editor:apply_draft') || fallback.has('ai_editor:apply_live'),
    roleLabel: role || 'user',
  };
}
