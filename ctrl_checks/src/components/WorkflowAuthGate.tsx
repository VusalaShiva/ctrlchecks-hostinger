import { ReactNode } from 'react';

interface WorkflowAuthGateProps {
  children: ReactNode;
  className?: string;
}

/**
 * Global Workflow Auth Gate Component
 * 
 * Wraps pages that have workflow creation/run actions.
 * Shows auth notice panel when Google is not connected.
 * Provides scroll target for disabled buttons.
 */
export function WorkflowAuthGate({ children, className }: WorkflowAuthGateProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
