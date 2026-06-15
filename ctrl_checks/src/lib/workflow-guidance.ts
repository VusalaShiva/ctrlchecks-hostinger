export type GuidedStatusTone = 'configuration' | 'connection' | 'attention' | 'success';

export interface GuidedStatusContent {
  title: string;
  description: string;
  resolution?: string;
  details?: string;
  missingItems?: string[];
  nextSteps?: string[];
  tone: GuidedStatusTone;
}

type WorkflowIssueInput = unknown;

const VALID_PHASE_CODES = new Set(['PHASE_LOCKED', 'INVALID_PHASE', 'WORKFLOW_INVALID_PHASE']);

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function humanizePhase(phase: string): string {
  if (!phase) return 'workflow setup';
  return phase
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function humanizeKey(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function formatMissingInput(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return humanizeKey(value);
  if (typeof value !== 'object') return null;

  const item = value as Record<string, unknown>;
  const nodeLabel = getString(item.nodeLabel) || getString(item.nodeName) || getString(item.nodeType) || getString(item.nodeId);
  const fieldName = getString(item.fieldName) || getString(item.field) || getString(item.name);
  const description = getString(item.description);
  const fieldLabel = fieldName ? humanizeKey(fieldName) : 'Required field';
  const prefix = nodeLabel ? `${fieldLabel} for ${nodeLabel}` : fieldLabel;

  return description && description.toLowerCase() !== fieldLabel.toLowerCase() && description !== fieldName
    ? `${prefix} — ${description}`
    : prefix;
}

function formatCredential(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return humanizeKey(value);
  if (typeof value !== 'object') return null;

  const item = value as Record<string, unknown>;
  const direct =
    getString(item.displayName) ||
    getString(item.providerName) ||
    getString(item.name) ||
    getString(item.provider) ||
    getString(item.vaultKey) ||
    getString(item.credentialId);

  if (!direct) return null;

  const nodeLabel = getString(item.nodeLabel) || getString(item.nodeName);
  return nodeLabel ? `${humanizeKey(direct)} for ${nodeLabel}` : humanizeKey(direct);
}

function formatValidationIssue(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return null;

  const item = value as Record<string, unknown>;
  const issue = getString(item.issue) || getString(item.message) || getString(item.description) || 'Check this node';
  const nodeLabel = getString(item.nodeLabel) || getString(item.nodeName) || getString(item.nodeType) || getString(item.nodeId);
  const previousNodeLabel =
    getString(item.previousNodeLabel) ||
    getString(item.previousNodeName) ||
    getString(item.previousNodeType) ||
    getString(item.previousNodeId);

  if (previousNodeLabel && nodeLabel) return `${previousNodeLabel} -> ${nodeLabel}: ${issue}`;
  if (nodeLabel) return `${nodeLabel}: ${issue}`;
  return issue;
}

function extractMissingInputs(details: Record<string, unknown>): string[] {
  const raw = Array.isArray(details.missingInputs) ? details.missingInputs : [];
  const items = raw.map(formatMissingInput).filter((item): item is string => Boolean(item));
  if (items.length > 0) return unique(items);

  const count = Number(details.missingInputsCount || 0);
  return count > 0 ? [`${count} required input${count === 1 ? '' : 's'} still need values.`] : [];
}

function extractMissingCredentials(details: Record<string, unknown>): string[] {
  const source =
    Array.isArray(details.missingCredentials) ? details.missingCredentials :
    Array.isArray(details.executionValidationMissingCredentials) ? details.executionValidationMissingCredentials :
    [];
  const items = source.map(formatCredential).filter((item): item is string => Boolean(item));
  if (items.length > 0) return unique(items);

  const count = Number(details.missingCredentialsCount || 0);
  return count > 0 ? [`${count} required connection${count === 1 ? '' : 's'} must be connected.`] : [];
}

function extractExecutionValidationIssues(details: Record<string, unknown>): string[] {
  const structured = Array.isArray(details.executionValidationIssues) ? details.executionValidationIssues : [];
  const structuredItems = structured
    .map(formatValidationIssue)
    .filter((item): item is string => Boolean(item));
  if (structuredItems.length > 0) return unique(structuredItems);

  const errors = Array.isArray(details.executionValidationErrors) ? details.executionValidationErrors : [];
  return unique(errors.map(formatValidationIssue).filter((item): item is string => Boolean(item)));
}

function buildReadinessGuidance(payload: Record<string, unknown>, message: string): GuidedStatusContent {
  const details = toRecord(payload.details);
  const currentPhase = getString(payload.currentPhase) || getString(payload.phase) || getString(details.phase);
  const currentStatus = getString(payload.status) || getString(details.status);
  const missingInputs = extractMissingInputs(details);
  const missingCredentials = extractMissingCredentials(details);
  const validationIssues = extractExecutionValidationIssues(details);
  const missingItems = [
    ...missingInputs.map((item) => `Input: ${item}`),
    ...missingCredentials.map((item) => `Connection: ${item}`),
    ...validationIssues.map((item) => `Workflow: ${item}`),
  ];

  const nextSteps: string[] = [];
  if (missingInputs.length > 0) {
    nextSteps.push('Open the listed node in the setup panel and fill each required field.');
  }
  if (missingCredentials.length > 0) {
    nextSteps.push('Open Connections and connect or reconnect each listed account.');
  }
  if (validationIssues.length > 0) {
    nextSteps.push('Review the listed workflow node or connection.');
  }
  nextSteps.push('Save the workflow, then run it again.');

  return {
    title: 'Finish setup before running',
    description:
      'This workflow is not ready yet. Complete the missing setup items below so the run can start cleanly.',
    resolution:
      missingItems.length > 0
        ? 'Everything missing is listed here. Your current progress is preserved.'
        : 'Review required fields and connected accounts, then save again.',
    missingItems,
    nextSteps,
    details: [
      currentPhase ? `Current stage: ${humanizePhase(currentPhase)}` : '',
      currentStatus ? `Status: ${humanizePhase(currentStatus)}` : '',
      message && missingItems.length === 0 ? message : '',
    ].filter(Boolean).join(' | '),
    tone: missingCredentials.length > 0 ? 'connection' : 'configuration',
  };
}

export function mapWorkflowIssueToGuidance(input: WorkflowIssueInput): GuidedStatusContent {
  if (typeof input === 'string') {
    return {
      title: 'Configuration needs one more step',
      description: input,
      resolution: 'Review required fields and continue setup from the workflow panel.',
      tone: 'configuration',
    };
  }

  const payload = toRecord(input);
  const code = getString(payload.code).toUpperCase();
  const message = getString(payload.message) || getString(payload.error) || 'Configuration update is pending.';
  const currentPhase = getString(payload.currentPhase) || getString(payload.phase);
  const normalizedMessage = message.toLowerCase();

  if (
    code === 'EXECUTION_NOT_READY' ||
    code === 'EXECUTION_MISSING_INPUTS' ||
    code === 'EXECUTION_MISSING_CREDENTIALS' ||
    normalizedMessage.includes('not ready for execution') ||
    normalizedMessage.includes('requires inputs') ||
    normalizedMessage.includes('requires credentials')
  ) {
    return buildReadinessGuidance(payload, message);
  }

  // Safety-net: if details carry concrete missing items, always show readiness guidance
  // regardless of error code — prevents fallback from masking real structured data.
  const safetyDetails = toRecord(payload.details);
  const hasMissingData =
    (Array.isArray(safetyDetails.missingCredentials) && (safetyDetails.missingCredentials as unknown[]).length > 0) ||
    (Array.isArray(safetyDetails.missingInputs) && (safetyDetails.missingInputs as unknown[]).length > 0) ||
    (Array.isArray(safetyDetails.executionValidationIssues) && (safetyDetails.executionValidationIssues as unknown[]).length > 0) ||
    (Array.isArray(safetyDetails.executionValidationErrors) && (safetyDetails.executionValidationErrors as unknown[]).length > 0) ||
    Number(safetyDetails.missingCredentialsCount || 0) > 0 ||
    Number(safetyDetails.missingInputsCount || 0) > 0;
  if (hasMissingData) {
    return buildReadinessGuidance(payload, message);
  }

  if (
    VALID_PHASE_CODES.has(code) ||
    normalizedMessage.includes('valid phase') ||
    normalizedMessage.includes('attach-inputs first') ||
    normalizedMessage.includes('must be "ready_for_ownership"')
  ) {
    return {
      title: 'Configuration step needed',
      description:
        'Your workflow is safe. This field update needs the setup sequence to finish before it can sync.',
      resolution: currentPhase
        ? `Current stage: ${humanizePhase(currentPhase)}. Complete the required setup step, then save again.`
        : 'Complete required inputs and credentials in order, then save again.',
      details: message,
      tone: 'configuration',
    };
  }

  if (
    code === 'UNAUTHORIZED' ||
    code === 'FORBIDDEN' ||
    normalizedMessage.includes('unauthorized') ||
    normalizedMessage.includes('token') ||
    normalizedMessage.includes('session')
  ) {
    return {
      title: 'Connection refresh needed',
      description: 'Please refresh your sign-in session to continue syncing workflow changes.',
      resolution: 'Reconnect your account in this tab and retry.',
      details: message,
      tone: 'connection',
    };
  }

  return {
    title: 'Let us finish this setup smoothly',
    description: 'We could not sync this change yet, but your progress is preserved.',
    resolution: 'Retry after a moment, or continue with manual configuration and save again.',
    details: message,
    tone: 'attention',
  };
}
