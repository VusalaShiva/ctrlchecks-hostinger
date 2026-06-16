export type FieldFillMode = 'manual_static' | 'runtime_ai' | 'buildtime_ai_once';

type InputSchemaField = {
  fillMode?: {
    default?: FieldFillMode;
    supportsRuntimeAI?: boolean;
    supportsBuildtimeAI?: boolean;
  };
};

export function resolveEffectiveFieldFillMode(
  fieldName: string,
  inputSchema?: Record<string, InputSchemaField>,
  config?: Record<string, unknown>
): FieldFillMode {
  const explicit = (config?._fillMode as Record<string, FieldFillMode> | undefined)?.[fieldName];
  if (explicit === 'manual_static' || explicit === 'runtime_ai' || explicit === 'buildtime_ai_once') {
    return explicit;
  }

  const schemaDefault = inputSchema?.[fieldName]?.fillMode?.default;
  if (
    schemaDefault === 'manual_static' ||
    schemaDefault === 'runtime_ai' ||
    schemaDefault === 'buildtime_ai_once'
  ) {
    return schemaDefault;
  }

  return 'manual_static';
}

export function supportsRuntimeAI(
  fieldName: string,
  inputSchema?: Record<string, InputSchemaField>
): boolean {
  return !!inputSchema?.[fieldName]?.fillMode?.supportsRuntimeAI;
}

/**
 * Wizard ownership step: resolve effective fill mode when state may omit untouched rows.
 * Mirrors worker `resolveEffectiveFieldFillMode` for explicit override + schema default.
 */
export function resolveWizardFieldFillMode(
  wizardExplicit: string | undefined,
  questionDefault: FieldFillMode | undefined
): FieldFillMode {
  if (
    wizardExplicit === 'manual_static' ||
    wizardExplicit === 'runtime_ai' ||
    wizardExplicit === 'buildtime_ai_once'
  ) {
    return wizardExplicit;
  }
  if (
    questionDefault === 'manual_static' ||
    questionDefault === 'runtime_ai' ||
    questionDefault === 'buildtime_ai_once'
  ) {
    return questionDefault;
  }
  return 'manual_static';
}

/**
 * Wizard policy guard: mirrors worker `coerceFieldFillModeByPolicy`.
 * Only `=== false` disables a mode (undefined means allowed), matching registry metadata.
 */
export function resolveWizardEffectiveFieldFillMode(
  wizardExplicit: string | undefined,
  questionDefault: FieldFillMode | undefined,
  allowRuntimeAI?: boolean,
  allowBuildtimeAI?: boolean
): {
  mode: FieldFillMode;
  coerced: boolean;
  reason?: 'runtime_not_supported' | 'buildtime_not_supported';
} {
  let mode = resolveWizardFieldFillMode(wizardExplicit, questionDefault);

  let coerced = false;
  let reason: 'runtime_not_supported' | 'buildtime_not_supported' | undefined;

  if (mode === 'runtime_ai' && allowRuntimeAI === false) {
    mode =
      questionDefault === 'runtime_ai'
        ? 'manual_static'
        : questionDefault === 'manual_static' || questionDefault === 'buildtime_ai_once'
          ? questionDefault
          : 'manual_static';
    if (mode === 'runtime_ai') mode = 'manual_static';
    coerced = true;
    reason = 'runtime_not_supported';
  }
  if (mode === 'buildtime_ai_once' && allowBuildtimeAI === false) {
    mode =
      questionDefault === 'buildtime_ai_once'
        ? 'manual_static'
        : questionDefault === 'manual_static' || questionDefault === 'runtime_ai'
          ? questionDefault
          : 'manual_static';
    if (mode === 'buildtime_ai_once') mode = 'manual_static';
    coerced = true;
    reason = 'buildtime_not_supported';
  }
  if (mode === 'runtime_ai' && allowRuntimeAI === false) {
    mode = 'manual_static';
    coerced = true;
    reason = 'runtime_not_supported';
  }

  return { mode, coerced, reason };
}

/** Bulk "set to AI": runtime when allowed, else buildtime when allowed, else manual. */
export function wizardBulkAIModeForQuestion(
  allowRuntimeAI?: boolean,
  allowBuildtimeAI?: boolean
): FieldFillMode {
  if (allowRuntimeAI !== false) return 'runtime_ai';
  if (allowBuildtimeAI !== false) return 'buildtime_ai_once';
  return 'manual_static';
}

export function shouldAskWizardManualQuestion(
  effectiveMode: FieldFillMode,
  ownershipUiMode?: string
): boolean {
  if (ownershipUiMode === 'locked') return false;
  return effectiveMode !== 'runtime_ai';
}
