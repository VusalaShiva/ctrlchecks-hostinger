import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FieldOwnershipHelpPanel } from '../FieldOwnershipHelpPanel';

describe('FieldOwnershipHelpPanel', () => {
  const baseCopy = {
    what: 'Controls which sheet tab is read for the summary.',
    setupSummary: 'Controls which sheet tab is read for the summary. It is optional, so set it only when this workflow needs a specific tab. Recommended owner: You. Tab names are stable and should be verified by the user.',
    you: 'Type the exact tab name, such as Sheet1.',
    aiBuild: 'AI can suggest a tab once, then you should verify it.',
    aiRun: 'AI Runtime is not available for this field.',
    example: 'e.g. Sheet1',
    toggleOff: 'If off, the sheet tab is not included in setup.',
    requiredText: 'Use this when the spreadsheet has multiple tabs.',
    dataImpact: 'Changing this changes which tab is summarized.',
    offBehavior: 'If off, Google Sheets does not receive a specific tab name.',
    emptyBehavior: 'If empty, the connector may read the provider default or first available tab.',
    defaultBehaviorLabel: 'Provider default tab',
    recommendedOwner: 'You' as const,
    ownerReason: 'Tab names are stable and should be verified by the user.',
    validationConfidence: 'high' as const,
    warnings: ['Review AI Build values before running.'],
    safeValueSuggestion: 'Sheet1',
  };

  it('renders one field summary with ownership recommendation', () => {
    render(
      <FieldOwnershipHelpPanel
        fieldHelpOpen
        isLoading={false}
        hasAiData
        fieldEnabled={false}
        locked={false}
        selectedMode="manual_static"
        showBuildButton
        showRuntimeButton={false}
        ownershipFooterText={null}
        onModeChange={vi.fn()}
        fieldOwnershipCopy={baseCopy}
      />,
    );

    expect(screen.getByText('Field summary')).toBeTruthy();
    expect(screen.getByText(/set it only when this workflow needs a specific tab/i)).toBeTruthy();
    expect(screen.getByText(/Recommended owner: You/i)).toBeTruthy();
    expect(screen.queryByText('Do you need it?')).toBeNull();
    expect(screen.queryByText('If this is off')).toBeNull();
    expect(screen.queryByText('If this is empty')).toBeNull();
    expect(screen.queryByText('How this changes the data')).toBeNull();
    expect(screen.getByText(/Review AI Build values before running/i)).toBeTruthy();
    expect(screen.queryByText(/configured default behavior/i)).toBeNull();
  });

  it('renders and triggers Use this example for applyable field guidance', () => {
    const onApplyExample = vi.fn();

    render(
      <FieldOwnershipHelpPanel
        fieldHelpOpen
        isLoading={false}
        hasAiData
        fieldEnabled
        locked={false}
        selectedMode="manual_static"
        showBuildButton
        showRuntimeButton={false}
        ownershipFooterText={null}
        onModeChange={vi.fn()}
        onApplyExample={onApplyExample}
        fieldOwnershipCopy={baseCopy}
        actionableExample={{
          displayValue: '{\n  "cricketTopic": "IPL Finals"\n}',
          canApply: true,
          reason: 'This safe example can be applied as AI Build.',
        }}
      />,
    );

    expect(screen.getByText('Use this example')).toBeTruthy();
    fireEvent.click(screen.getByText('Use this example'));
    expect(onApplyExample).toHaveBeenCalledTimes(1);
  });

  it('shows read-only reason instead of apply button for unsafe examples', () => {
    render(
      <FieldOwnershipHelpPanel
        fieldHelpOpen
        isLoading={false}
        hasAiData
        fieldEnabled
        locked={false}
        selectedMode="manual_static"
        showBuildButton
        showRuntimeButton={false}
        ownershipFooterText={null}
        onModeChange={vi.fn()}
        fieldOwnershipCopy={baseCopy}
        actionableExample={{
          displayValue: 'sk_test_example',
          canApply: false,
          reason: 'Credential and secret examples are guidance only.',
        }}
      />,
    );

    expect(screen.queryByText('Use this example')).toBeNull();
    expect(screen.getByText(/credential and secret examples/i)).toBeTruthy();
  });

  it('shows Applied as AI Build after an example has been used', () => {
    render(
      <FieldOwnershipHelpPanel
        fieldHelpOpen
        isLoading={false}
        hasAiData
        fieldEnabled
        locked={false}
        selectedMode="buildtime_ai_once"
        showBuildButton
        showRuntimeButton={false}
        ownershipFooterText={null}
        onModeChange={vi.fn()}
        onApplyExample={vi.fn()}
        fieldOwnershipCopy={baseCopy}
        actionableExample={{
          displayValue: 'PUBLIC',
          canApply: true,
        }}
        exampleApplied
      />,
    );

    expect(screen.getByText('Applied as AI Build')).toBeTruthy();
    expect(screen.getByText('Use again')).toBeTruthy();
  });
});
