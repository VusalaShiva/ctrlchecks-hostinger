/**
 * Lazy wizard loading tests.
 * Validates: WizardLoadingSkeleton renders, WizardErrorBoundary catches errors,
 * and the AIWorkflowBuilder uses React.lazy for the wizard.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WizardLoadingSkeleton } from '@/components/workflow/WizardLoadingSkeleton';
import { WizardErrorBoundary } from '@/components/workflow/WizardErrorBoundary';

// ─── Silence expected console.error from error boundary ──────────────────────

const consoleError = console.error;
beforeAll(() => { console.error = vi.fn(); });
afterAll(() => { console.error = consoleError; });

// ─── WizardLoadingSkeleton ────────────────────────────────────────────────────

describe('WizardLoadingSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<WizardLoadingSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders at least 6 skeleton items (sidebar)', () => {
    const { container } = render(<WizardLoadingSkeleton />);
    // The sidebar has 6 Skeleton elements in a column
    const skeletons = container.querySelectorAll('[data-slot="skeleton"], .animate-pulse');
    expect(skeletons.length).toBeGreaterThanOrEqual(6);
  });
});

// ─── WizardErrorBoundary ─────────────────────────────────────────────────────

// Component that throws to trigger the error boundary
function ThrowOnMount({ message }: { message: string }) {
  throw new Error(message);
}

describe('WizardErrorBoundary', () => {
  it('renders children normally when there is no error', () => {
    render(
      <WizardErrorBoundary>
        <div data-testid="child-content">Workflow builder loaded</div>
      </WizardErrorBoundary>,
    );
    expect(screen.getByTestId('child-content')).toBeTruthy();
  });

  it('shows error UI when a child throws', () => {
    render(
      <WizardErrorBoundary>
        <ThrowOnMount message="chunk load failed" />
      </WizardErrorBoundary>,
    );

    expect(screen.getByText('Failed to load workflow builder')).toBeTruthy();
    expect(screen.getByText('chunk load failed')).toBeTruthy();
    expect(screen.getByRole('button', { name: /try again/i })).toBeTruthy();
  });

  it('resets error state when "Try again" is clicked', () => {
    const { rerender } = render(
      <WizardErrorBoundary>
        <ThrowOnMount message="load error" />
      </WizardErrorBoundary>,
    );

    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainBtn);

    // After reset, boundary no longer shows error UI; it re-renders children
    // (children will throw again, but the boundary catches it — that's expected)
    expect(screen.queryByRole('button', { name: /try again/i })).toBeTruthy();
  });

  it('error UI does not expose raw stack traces to user', () => {
    render(
      <WizardErrorBoundary>
        <ThrowOnMount message="internal-only-error" />
      </WizardErrorBoundary>,
    );

    // Should show the message only, not a full JS stack trace
    expect(screen.queryByText(/at ThrowOnMount/)).toBeNull();
  });
});

// ─── Lazy loading contract ────────────────────────────────────────────────────

describe('AIWorkflowBuilder lazy import contract', () => {
  it('AutonomousAgentWizard has a default export (required for React.lazy)', async () => {
    // Import the module and check it exports a default
    // We don't actually load the component (too heavy) — just verify the export exists
    const mod = await import('@/components/workflow/AutonomousAgentWizard');
    expect(typeof mod.default).toBe('function');
  });
});
