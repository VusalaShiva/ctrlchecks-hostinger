import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { rememberOAuthReturnTo } from '@/lib/oauth-return';
import { fetchRuntimeCredentialStatus } from '@/lib/api/credentialStatus';

interface NotionConnectionStatusProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  compact?: boolean;
}

export default function NotionConnectionStatus({ 
  onConnect, 
  onDisconnect,
  compact = false 
}: NotionConnectionStatusProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);

  const checkAuthStatus = useCallback(async () => {
    if (!user) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const status = await fetchRuntimeCredentialStatus('notion');
      setIsAuthenticated(Boolean(status.connected));
      setWorkspaceName(null);
    } catch (error) {
      console.error('Error checking Notion auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [user]);

  useEffect(() => {
    checkAuthStatus();
    const interval = setInterval(checkAuthStatus, 30000);
    
    const handleFocus = () => {
      checkAuthStatus();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, checkAuthStatus]);

  const handleNotionAuth = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in first',
        variant: 'destructive',
      });
      return;
    }

    setIsAuthenticating(true);

    try {
      // Notion OAuth uses a custom flow - redirect to backend OAuth endpoint
      const backendUrl = getBackendUrl();
      const redirectUrl = `${window.location.origin}/auth/notion/callback`;
      rememberOAuthReturnTo();
      
      // Redirect to backend OAuth initiation endpoint
      window.location.href = `${backendUrl}/api/oauth/notion/authorize?redirect_uri=${encodeURIComponent(redirectUrl)}`;
    } catch (error) {
      console.error('Notion OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Notion authentication',
        variant: 'destructive',
      });
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    if (!user) return;

    try {
      const { data: session } = await awsClient.auth.getSession();
      const token = session?.session?.access_token;
      const response = await fetch(`${getBackendUrl()}/api/connections/notion`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Disconnect failed: ${response.status}`);

      setIsAuthenticated(false);
      setWorkspaceName(null);
      
      if (onDisconnect) {
        onDisconnect();
      }
      
      toast({
        title: 'Disconnected',
        description: 'Notion account disconnected successfully',
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect Notion account',
        variant: 'destructive',
      });
    }
  };

  if (isCheckingAuth && !compact) {
    return (
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisconnect}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="hidden sm:inline">
            {workspaceName ? `Notion Connected (${workspaceName})` : 'Notion Connected'}
          </span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotionAuth}
          disabled={isAuthenticating}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        >
          {isAuthenticating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Connecting...</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Connect Notion</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
