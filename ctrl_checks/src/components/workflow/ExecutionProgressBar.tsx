import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ExecutionProgressBarProps {
  progress: number;
  currentStep: string | null;
  className?: string;
}

export default function ExecutionProgressBar({ progress, currentStep, className }: ExecutionProgressBarProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Progress value={progress} className="h-1.5" />
      {currentStep && (
        <p className="text-xs text-muted-foreground truncate">{currentStep}</p>
      )}
    </div>
  );
}
