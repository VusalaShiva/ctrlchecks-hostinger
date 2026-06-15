export interface PromptInputLayoutState {
  showShortcutHint: boolean;
  disableAnalyzeButton: boolean;
}

export function getPromptInputLayoutState(prompt: string, step: string): PromptInputLayoutState {
  const hasPrompt = typeof prompt === 'string' && prompt.trim().length > 0;
  const isAnalyzing = step === 'analyzing';
  return {
    showShortcutHint: hasPrompt && !isAnalyzing,
    disableAnalyzeButton: !hasPrompt || isAnalyzing,
  };
}

