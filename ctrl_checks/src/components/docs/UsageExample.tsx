import type { OperationDoc } from '@/docs-content/types';

export function UsageExample({ operation }: { operation: OperationDoc }) {
  const rows = Object.entries(operation.usageExample.inputValues);

  return (
    <div className="space-y-3">
      <blockquote className="border-l-2 border-primary pl-3 text-sm text-muted-foreground">
        Scenario: {operation.usageExample.scenario}
      </blockquote>
      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([field, value]) => (
                <tr key={field} className="border-t first:border-t-0">
                  <td className="w-48 px-3 py-2 font-medium">{field}</td>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-sm text-muted-foreground">{operation.usageExample.expectedOutput}</p>
    </div>
  );
}
