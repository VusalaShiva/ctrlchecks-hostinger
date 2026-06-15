import { CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CredentialEntry {
  vaultKey: string;
  displayName: string;
  nodeId: string;
  satisfied: boolean;
  required: boolean;
}

export interface CredentialPanelData {
  workflowId: string;
  satisfied: CredentialEntry[];
  missing: CredentialEntry[];
}

interface CredentialStatusPanelProps {
  data: CredentialPanelData;
  onOpenNodePanel: (nodeId: string) => void;
}

/**
 * Friendly informational panel shown after workflow save when credentials are missing.
 * Not an error — guides the user to fill in missing credentials by clicking each entry.
 */
export function CredentialStatusPanel({ data, onOpenNodePanel }: CredentialStatusPanelProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 space-y-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Credentials needed
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
            Your workflow was saved. Fill in the missing credentials below to enable execution.
          </p>
        </div>
      </div>

      {data.missing.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
            Missing
          </p>
          {data.missing.map((cred) => (
            <button
              key={`${cred.nodeId}-${cred.vaultKey}`}
              type="button"
              onClick={() => onOpenNodePanel(cred.nodeId)}
              className="w-full flex items-center justify-between rounded-md border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-900/20 px-3 py-2 text-sm text-left hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors group"
            >
              <span className="font-medium text-amber-900 dark:text-amber-200">
                {cred.displayName || cred.vaultKey}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-amber-500 group-hover:text-amber-700 dark:group-hover:text-amber-300 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {data.satisfied.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
            Connected
          </p>
          {data.satisfied.map((cred) => (
            <div
              key={`${cred.nodeId}-${cred.vaultKey}`}
              className="flex items-center gap-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-3 py-2 text-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-green-800 dark:text-green-300">
                {cred.displayName || cred.vaultKey}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
