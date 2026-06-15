import type { NodeDoc } from '@/docs-content/types';

export function CommonErrorsTable({ errors }: { errors: NodeDoc['commonErrors'] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[680px] text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-3 py-2 font-medium">Error</th>
            <th className="px-3 py-2 font-medium">Likely Cause</th>
            <th className="px-3 py-2 font-medium">Fix</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error) => (
            <tr key={error.error} className="border-t border-border align-top">
              <td className="px-3 py-2 font-medium">{error.error}</td>
              <td className="px-3 py-2 text-muted-foreground">{error.cause}</td>
              <td className="px-3 py-2 text-muted-foreground">{error.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
