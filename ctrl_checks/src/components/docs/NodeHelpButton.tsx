import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  nodeSlug: string;
  nodeDisplayName: string;
  className?: string;
}

export function NodeHelpButton({ nodeSlug, nodeDisplayName, className }: Props) {
  return (
    <button
      type="button"
      title={`View docs for ${nodeDisplayName}`}
      aria-label={`View docs for ${nodeDisplayName}`}
      onClick={() => window.open(`/docs/nodes/${nodeSlug}`, '_blank', 'noopener,noreferrer')}
      className={cn(
        'flex h-6 items-center justify-center gap-1 rounded-sm px-2 text-xs font-medium text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground',
        className
      )}
    >
      <BookOpen className="h-3.5 w-3.5" />
      <span>Docs</span>
    </button>
  );
}
