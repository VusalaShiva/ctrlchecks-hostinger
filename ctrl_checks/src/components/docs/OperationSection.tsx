import { ExternalLink } from 'lucide-react';
import type { OperationDoc } from '@/docs-content/types';
import { FieldsTable } from './FieldsTable';
import { OutputExample } from './OutputExample';
import { UsageExample } from './UsageExample';

export function OperationSection({
  operation,
  serviceName,
  flat = false,
}: {
  operation: OperationDoc;
  serviceName: string;
  flat?: boolean;
}) {
  return (
    <section id={`operation-${operation.value}`} className="scroll-mt-20 space-y-4">
      {!flat && <h3 className="text-xl font-semibold">{operation.name}</h3>}
      <p className="text-muted-foreground">{operation.description}</p>
      <p className="text-sm">What it does: {operation.description}</p>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold uppercase text-muted-foreground">Input Fields</h4>
        <FieldsTable fields={operation.fields} />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold uppercase text-muted-foreground">Usage Example</h4>
        <UsageExample operation={operation} />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold uppercase text-muted-foreground">Output Example</h4>
        <OutputExample operation={operation} />
      </div>

      <p className="text-sm text-muted-foreground">
        Verify in {serviceName}: run the workflow, then inspect the node output panel and the target service record, message, file, or log when the node calls an external service.
      </p>
      {operation.externalDocsUrl && (
        <a
          href={operation.externalDocsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View API Docs <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </section>
  );
}
