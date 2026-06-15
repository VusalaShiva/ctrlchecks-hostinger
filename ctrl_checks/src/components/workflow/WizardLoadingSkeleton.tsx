import { Skeleton } from '@/components/ui/skeleton';

export function WizardLoadingSkeleton() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center border-b border-border bg-card px-4 gap-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-6 ml-auto" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-72 shrink-0 flex-col gap-3 border-r border-border bg-card p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
