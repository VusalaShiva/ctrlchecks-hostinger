import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface WorkflowActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  tooltip?: string;
}

/**
 * Workflow Action Button — renders a standard button with no auth gate.
 */
export function WorkflowActionButton({
  onClick,
  disabled,
  children,
  variant = 'default',
  size = 'default',
  className,
}: WorkflowActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
