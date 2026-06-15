export type GenerateWorkflowUiError = {
  code?: string;
  message: string;
  stage?: string;
  correlationId?: string;
  stageTrace?: Array<{ stage?: string; error?: string; outputSummary?: string }>;
};

export function normalizeGenerateWorkflowUiError(
  payload: any,
  fallbackMessage: string
): GenerateWorkflowUiError {
  const stageTrace = Array.isArray(payload?.stageTrace) ? payload.stageTrace : undefined;
  const stageFromTrace =
    stageTrace?.find((s: any) => typeof s?.error === 'string')?.stage ||
    stageTrace?.[stageTrace.length - 1]?.stage;
  const message =
    (typeof payload?.message === 'string' && payload.message.trim()) ||
    (typeof payload?.error === 'string' && payload.error.trim()) ||
    fallbackMessage;

  return {
    code: typeof payload?.error === 'string' ? payload.error : undefined,
    message,
    stage: typeof payload?.stage === 'string' ? payload.stage : stageFromTrace,
    correlationId:
      typeof payload?.correlationId === 'string'
        ? payload.correlationId
        : typeof payload?.correlation_id === 'string'
          ? payload.correlation_id
          : undefined,
    stageTrace,
  };
}

export function buildGenerateWorkflowUiErrorMessage(err: GenerateWorkflowUiError): string {
  const details: string[] = [err.message];
  if (err.stage) details.push(`stage: ${err.stage}`);
  if (err.correlationId) details.push(`correlation: ${err.correlationId}`);
  return details.join(' | ');
}
