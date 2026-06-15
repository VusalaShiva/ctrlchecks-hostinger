import { cn } from '@/lib/utils';
import type { ConnectionStatus } from '@/lib/api/connections';

interface Props {
  status: ConnectionStatus;
  className?: string;
}

const config: Record<ConnectionStatus, { dot: string; label: string; text: string }> = {
  active:  { dot: 'bg-green-500',  label: 'Active',   text: 'text-green-700 dark:text-green-400' },
  error:   { dot: 'bg-red-500',    label: 'Error',    text: 'text-red-700 dark:text-red-400' },
  revoked: { dot: 'bg-gray-400',   label: 'Revoked',  text: 'text-gray-600 dark:text-gray-400' },
};

export function ConnectionStatusBadge({ status, className }: Props) {
  const { dot, label, text } = config[status] ?? config.error;
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', text, className)}>
      <span className={cn('h-2 w-2 rounded-full shrink-0', dot)} />
      {label}
    </span>
  );
}
