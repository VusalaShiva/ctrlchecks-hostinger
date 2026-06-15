/**
 * Wizard ↔ worker contract for post-generation attach flows.
 * Keys align with comprehensive question `nodeId` + `fieldName` (same as field-plane planeKey minus normalization details).
 */

/** Fill mode written by attach-inputs into `node.data.config._fillMode[fieldName]`. */
export type WizardFillMode = 'manual_static' | 'runtime_ai' | 'buildtime_ai_once';

/** Pattern: `mode_<nodeId>_<fieldName>` — must match the node id and registry field name from the wizard row. */
export type WizardAttachModeKey = `mode_${string}_${string}`;

/** Pattern: `unlock_<nodeId>_<fieldName>` for credential fields with `credentialTogglePolicy: unlockable`. */
export type WizardAttachUnlockKey = `unlock_${string}_${string}`;

/** Credential / config row identity used for Credentials step overrides: `nodeId::normalizedFieldName` (see `credentialPlaneKeyFromQuestion`). */
export type WizardCredentialPlaneKey = string;
