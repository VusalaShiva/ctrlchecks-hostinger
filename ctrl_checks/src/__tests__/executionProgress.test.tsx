/**
 * Execution progress UI tests.
 * Validates: ExecutionProgressBar and ExecutionStatusBanner render correctly
 * for each execution status.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExecutionProgressBar from '@/components/workflow/ExecutionProgressBar';
import ExecutionStatusBanner from '@/components/workflow/ExecutionStatusBanner';
import type { ActiveExecution } from '@/stores/workflowStore';

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock('@/stores/workflowStore', () => ({
  useWorkflowStore: vi.fn(() => ({
    clearActiveExecution: vi.fn(),
  })),
}));

vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: { access_token: 'tok' } } }),
    },
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

// ─── ExecutionProgressBar ─────────────────────────────────────────────────────

describe('ExecutionProgressBar', () => {
  it('renders a progress bar element', () => {
    const { container } = render(
      <ExecutionProgressBar progress={42} currentStep={null} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('shows currentStep text when provided', () => {
    render(
      <ExecutionProgressBar progress={50} currentStep="Fetching Google Sheets data" />,
    );
    expect(screen.getByText('Fetching Google Sheets data')).toBeTruthy();
  });

  it('does not render step text when currentStep is null', () => {
    const { container } = render(
      <ExecutionProgressBar progress={30} currentStep={null} />,
    );
    // Should not have a <p> element for step text
    expect(container.querySelectorAll('p').length).toBe(0);
  });

  it('accepts 0% progress without crashing', () => {
    const { container } = render(
      <ExecutionProgressBar progress={0} currentStep={null} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('accepts 100% progress without crashing', () => {
    const { container } = render(
      <ExecutionProgressBar progress={100} currentStep="Done" />,
    );
    expect(screen.getByText('Done')).toBeTruthy();
  });

  it('applies className prop', () => {
    const { container } = render(
      <ExecutionProgressBar progress={50} currentStep={null} className="my-test-class" />,
    );
    expect(container.firstChild?.toString()).toBeTruthy();
    expect(container.querySelector('.my-test-class')).toBeTruthy();
  });
});

// ─── ExecutionStatusBanner ────────────────────────────────────────────────────

function makeExecution(overrides: Partial<ActiveExecution> = {}): ActiveExecution {
  return {
    executionId: 'exec-test-123',
    status: 'running',
    progress: 0,
    currentStep: null,
    errorMessage: null,
    workflowId: 'wf-abc',
    ...overrides,
  };
}

describe('ExecutionStatusBanner', () => {
  it('renders without crashing for "queued" status', () => {
    const { container } = render(
      <ExecutionStatusBanner execution={makeExecution({ status: 'queued' })} />,
    );
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText('Queued')).toBeTruthy();
  });

  it('renders "Running" label for running status', () => {
    render(<ExecutionStatusBanner execution={makeExecution({ status: 'running' })} />);
    expect(screen.getByText('Running')).toBeTruthy();
  });

  it('renders "Success" label for success status', () => {
    render(<ExecutionStatusBanner execution={makeExecution({ status: 'success', progress: 100 })} />);
    expect(screen.getByText('Success')).toBeTruthy();
  });

  it('renders "Failed" label for failed status', () => {
    render(
      <ExecutionStatusBanner
        execution={makeExecution({ status: 'failed', errorMessage: 'Timeout exceeded' })}
      />,
    );
    expect(screen.getByText('Failed')).toBeTruthy();
  });

  it('shows error message when execution has failed with an error', () => {
    render(
      <ExecutionStatusBanner
        execution={makeExecution({ status: 'failed', errorMessage: 'Node timed out' })}
      />,
    );
    expect(screen.getByText('Node timed out')).toBeTruthy();
  });

  it('shows reconnecting indicator when reconnecting=true', () => {
    render(
      <ExecutionStatusBanner
        execution={makeExecution({ status: 'running' })}
        reconnecting={true}
      />,
    );
    expect(screen.getByText(/reconnecting/i)).toBeTruthy();
  });

  it('shows progress bar for running status', () => {
    render(
      <ExecutionStatusBanner
        execution={makeExecution({ status: 'running', progress: 55, currentStep: 'Sending email' })}
      />,
    );
    expect(screen.getByText('Sending email')).toBeTruthy();
  });

  it('shows Cancel button for active executions (queued/running)', () => {
    render(<ExecutionStatusBanner execution={makeExecution({ status: 'running' })} />);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeTruthy();
  });

  it('does NOT show Cancel button for terminal statuses', () => {
    render(<ExecutionStatusBanner execution={makeExecution({ status: 'success' })} />);
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    render(
      <ExecutionStatusBanner
        execution={makeExecution({ status: 'failed' })}
        onRetry={onRetry}
      />,
    );
    const retryBtn = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
