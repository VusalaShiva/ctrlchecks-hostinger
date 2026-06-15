import { useState } from 'react';
import { MoreHorizontal, RefreshCw, Trash2, Pencil, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ConnectionStatusBadge } from './ConnectionStatusBadge';
import { useTestConnection, useDeleteConnection } from '@/hooks/useConnections';
import { useOAuthFlow } from '@/hooks/useOAuthFlow';
import { useCredentialType } from '@/hooks/useCredentialTypes';
import { useToast } from '@/hooks/use-toast';
import type { ConnectionRecord } from '@/lib/api/connections';
import { ProviderLogo } from './ProviderLogo';
import { formatDistanceToNow } from 'date-fns';
import { GuidedStatusCard } from '@/components/ui/guided-status-card';
import { getAIGuidance } from '@/lib/ai-error-guidance';
import type { GuidedStatusContent } from '@/lib/workflow-guidance';

interface Props {
  connection: ConnectionRecord;
  onEdit?: (connection: ConnectionRecord) => void;
}

/** Maps a raw error message from the reconnect/test flow to a user-readable string. */
function humaniseReconnectError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('popup') || lower.includes('blocked')) {
    return 'Please allow popups for this site and try again.';
  }
  if (lower.includes('timed out') || lower.includes('timeout')) {
    return 'Connection timed out. Please try again.';
  }
  if (lower.includes('cancelled') || lower.includes('canceled')) {
    return 'Connection was cancelled.';
  }
  if (lower.includes('declined') || lower.includes('denied') || lower.includes('rejected')) {
    return 'Authentication was declined. Check your account permissions and try again.';
  }
  return msg;
}

/** Maps a test-connection result/error to a specific human-readable message. */
function humaniseTestError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('scope') || lower.includes('permission') || lower.includes('403')) {
    return 'Missing required permissions. Reconnect and grant the necessary scopes.';
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('econnrefused')) {
    return 'Network error — could not reach the service. Check your internet connection.';
  }
  return msg;
}

export function ConnectionCard({ connection, onEdit }: Props) {
  const { toast } = useToast();
  const credType = useCredentialType(connection.credentialTypeId);
  const testMut = useTestConnection();
  const deleteMut = useDeleteConnection();
  const oauthFlow = useOAuthFlow();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [guidance, setGuidance] = useState<GuidedStatusContent | null>(null);

  const lastUsed = connection.lastUsedAt
    ? formatDistanceToNow(new Date(connection.lastUsedAt), { addSuffix: true })
    : null;

  // Each action has its own independent loading state so buttons don't block each other.
  const isTestBusy      = testMut.isPending;
  const isReconnectBusy = oauthFlow.isLoading;
  const isDeleteBusy    = deleteMut.isPending;

  async function handleTest() {
    setGuidance(null);
    try {
      const result = await testMut.mutateAsync(connection.id);
      if (result.ok) {
        toast({ title: 'Connection OK', description: result.message || 'The connection is working correctly.' });
      } else {
        getAIGuidance(
          { code: 'CONNECTION_TEST_FAILED', message: humaniseTestError(result.message || 'Connection test failed') },
          { provider: connection.provider, operation: 'test' }
        ).then(setGuidance);
      }
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Could not test connection';
      getAIGuidance(
        { code: 'CONNECTION_TEST_FAILED', message: humaniseTestError(raw) },
        { provider: connection.provider, operation: 'test' }
      ).then(setGuidance);
    }
  }

  async function handleReconnect() {
    setGuidance(null);
    try {
      await oauthFlow.reconnect(connection.id);
      toast({ title: 'Reconnected successfully' });
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Reconnect failed';
      getAIGuidance(
        { code: 'OAUTH_RECONNECT_FAILED', message: humaniseReconnectError(raw) },
        { provider: connection.provider, operation: 'connect' }
      ).then(setGuidance);
    }
  }

  async function handleDelete() {
    try {
      await deleteMut.mutateAsync(connection.id);
      toast({ title: 'Connection deleted' });
    } catch {
      getAIGuidance(
        { code: 'DELETE_FAILED', message: 'Could not delete the connection' },
        { provider: connection.provider, operation: 'delete' }
      ).then(setGuidance);
    }
    setConfirmDelete(false);
  }

  const isOAuth = connection.authType === 'oauth2';

  return (
    <>
      {guidance && (
        <GuidedStatusCard
          title={guidance.title}
          description={guidance.description}
          resolution={guidance.resolution}
          nextSteps={guidance.nextSteps}
          tone={guidance.tone}
          onDismiss={() => setGuidance(null)}
        />
      )}
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="flex items-center gap-4 p-4">
          <ProviderLogo provider={connection.provider} size={40} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm truncate">{connection.name}</span>
              <ConnectionStatusBadge status={connection.status} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {credType?.displayName ?? connection.credentialTypeId}
              {lastUsed && <span className="ml-2 opacity-60">· used {lastUsed}</span>}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {connection.status === 'error' && (
              <Button size="sm" variant="outline" onClick={handleTest} disabled={isTestBusy}>
                {isTestBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                <span className="ml-1.5">Test</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleTest} disabled={isTestBusy}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Test connection
                </DropdownMenuItem>
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(connection)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {isOAuth && (
                  <DropdownMenuItem onClick={handleReconnect} disabled={isReconnectBusy}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reconnect
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setConfirmDelete(true)}
                  className="text-destructive focus:text-destructive"
                  disabled={isDeleteBusy}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete connection?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{connection.name}</strong> will be permanently deleted. Any workflows using
              this connection will stop working.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleteBusy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
