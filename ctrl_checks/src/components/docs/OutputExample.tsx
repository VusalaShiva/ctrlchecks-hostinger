import type { OperationDoc } from '@/docs-content/types';

export function OutputExample({ operation }: { operation: OperationDoc }) {
  const firstField = Object.keys(operation.outputExample)[0] || 'fieldName';

  return (
    <div className="space-y-3">
      <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">
        <code>{JSON.stringify(operation.outputExample, null, 2)}</code>
      </pre>
      <p className="whitespace-pre-line text-sm text-muted-foreground">{operation.outputDescription}</p>
      <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        Access these fields in the next node using <code>{`{{ $json.${firstField} }}`}</code>.
      </p>
    </div>
  );
}
