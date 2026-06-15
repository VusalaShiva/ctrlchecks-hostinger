import { describe, expect, it } from 'vitest';
import { getPromptInputLayoutState } from '../prompt-input-layout';

describe('prompt-input-layout', () => {
  it('shows shortcut hint when prompt exists and not analyzing', () => {
    const state = getPromptInputLayoutState('Build workflow', 'idle');
    expect(state.showShortcutHint).toBe(true);
  });

  it('hides shortcut hint while analyzing', () => {
    const state = getPromptInputLayoutState('Build workflow', 'analyzing');
    expect(state.showShortcutHint).toBe(false);
  });

  it('disables analyze button when prompt is empty', () => {
    const state = getPromptInputLayoutState('', 'idle');
    expect(state.disableAnalyzeButton).toBe(true);
  });

  it('disables analyze button while analyzing even with prompt', () => {
    const state = getPromptInputLayoutState('Build workflow', 'analyzing');
    expect(state.disableAnalyzeButton).toBe(true);
  });

  it('enables analyze button for non-empty prompt outside analyzing step', () => {
    const state = getPromptInputLayoutState('Build workflow', 'questioning');
    expect(state.disableAnalyzeButton).toBe(false);
  });
});

