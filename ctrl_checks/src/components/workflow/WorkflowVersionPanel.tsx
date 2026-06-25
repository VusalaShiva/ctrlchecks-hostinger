import { useState, useEffect } from 'react';
import { History, X, RotateCcw, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ENDPOINTS } from '@/config/endpoints';
import { awsClient } from '@/integrations/aws/client';
import { toast } from '@/hooks/use-toast';

interface WorkflowVersion {
  id: string;
  versionNumber?: number;
  createdAt: string;
  label?: string;
  description?: string;
  nodesCount?: number;
  edgesCount?: number;
}

interface Props {
  workflowId: string;
  onRestore: (nodes: any[], edges: any[]) => void;
  onClose: () => void;
}

export default function WorkflowVersionPanel({ workflowId, onRestore, onClose }: Props) {
  const [versions, setVersions] = useState<WorkflowVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const session = await awsClient.auth.getSession();
        const token = session?.data?.session?.access_token;
        const res = await fetch(
          `${ENDPOINTS.itemBackend}/api/workflows/${workflowId}/versions`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setVersions(Array.isArray(json.versions) ? json.versions : []);
      } catch {
        if (!cancelled) {
          toast({ title: 'Could not load version history', variant: 'destructive' });
          setVersions([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [workflowId]);

  async function handleRestore(versionId: string) {
    setRestoring(versionId);
    try {
      const session = await awsClient.auth.getSession();
      const token = session?.data?.session?.access_token;
      const res = await fetch(
        `${ENDPOINTS.itemBackend}/api/workflow/version/${versionId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const nodes = json.version?.workflow?.nodes ?? json.nodes ?? [];
      const edges = json.version?.workflow?.edges ?? json.edges ?? [];
      onRestore(nodes, edges);
      toast({ title: 'Version restored', description: 'The canvas has been updated.' });
      onClose();
    } catch {
      toast({ title: 'Restore failed', description: 'Could not load that version.', variant: 'destructive' });
    } finally {
      setRestoring(null);
    }
  }

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat(undefined, {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  return (
    <div className="absolute right-0 top-0 h-full w-[320px] z-50 flex flex-col bg-card border-l border-border shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4 text-muted-foreground" />
          Version History
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        {loading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
        {!loading && versions.length === 0 && (
          <p className="px-4 py-6 text-sm text-muted-foreground text-center">
            No saved versions yet.
          </p>
        )}
        {!loading && versions.length > 0 && (
          <ul className="divide-y divide-border/60">
            {versions.map((v) => (
              <li key={v.id} className="px-4 py-3 hover:bg-muted/40 transition-colors group">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {v.label || (v.versionNumber != null ? `Version ${v.versionNumber}` : 'Snapshot')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatDate(v.createdAt)}</p>
                    {(v.nodesCount != null) && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {v.nodesCount} node{v.nodesCount !== 1 ? 's' : ''}
                        {v.edgesCount != null ? `, ${v.edgesCount} edge${v.edgesCount !== 1 ? 's' : ''}` : ''}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={restoring === v.id}
                    onClick={() => handleRestore(v.id)}
                    className={cn(
                      'flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors shrink-0 mt-0.5',
                      'border-border/60 text-muted-foreground',
                      'hover:border-primary/50 hover:text-foreground',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                    title="Restore this version to the canvas"
                  >
                    {restoring === v.id
                      ? <Loader2 className="h-3 w-3 animate-spin" />
                      : <RotateCcw className="h-3 w-3" />}
                    Restore
                  </button>
                </div>
                {v.description && (
                  <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">{v.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>

      <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground/60">
        Restoring overwrites unsaved canvas changes.
      </div>
    </div>
  );
}
