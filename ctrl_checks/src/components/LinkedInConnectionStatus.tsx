import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { getCurrentPathWithQuery, rememberOAuthReturnTo } from '@/lib/oauth-return';
import { fetchRuntimeCredentialStatus } from '@/lib/api/credentialStatus';

interface LinkedInConnectionStatusProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  compact?: boolean;
}

export default function LinkedInConnectionStatus({ 
  onConnect, 
  onDisconnect,
  compact = false 
}: LinkedInConnectionStatusProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accountLabel, setAccountLabel] = useState<string | null>(null);

  const checkAuthStatus = useCallback(async () => {
    if (!user) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const status = await fetchRuntimeCredentialStatus('linkedin');
      setIsAuthenticated(Boolean(status.connected));

      // Fetch additional metadata via backend status endpoint (non-fatal)
      try {
        const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
        if (authToken) {
          const resp = await fetch(`${getBackendUrl()}/api/connections/linkedin/status`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          if (resp.ok) {
            const json = await resp.json();
            if (json.connected && json.metadata?.scope) {
              setAccountLabel(`LinkedIn Connected (${json.metadata.scope})`);
            } else if (json.connected) {
              setAccountLabel('LinkedIn Connected');
            } else {
              setAccountLabel(null);
            }
          }
        }
      } catch (metaErr) {
        console.warn('LinkedIn status metadata fetch failed (non-fatal):', metaErr);
      }
    } catch (error) {
      console.error('Error checking LinkedIn auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [user]);

  useEffect(() => {
    checkAuthStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(checkAuthStatus, 30000);
    
    // Refresh when window regains focus (e.g., after OAuth redirect)
    const handleFocus = () => {
      checkAuthStatus();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, checkAuthStatus]);

  const handleLinkedInAuth = async () => {
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
      const returnTo = getCurrentPathWithQuery();
      rememberOAuthReturnTo(returnTo);
      const params = new URLSearchParams({ user_id: user.id, redirect_to: returnTo });

      if (onConnect) {
        onConnect();
      }

      toast({
        title: 'Redirecting to LinkedIn...',
        description: 'Please authorize access to LinkedIn services',
      });
      window.location.href = `${getBackendUrl()}/api/oauth/linkedin/start?${params.toString()}`;
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate LinkedIn authentication',
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
      const response = await fetch(`${getBackendUrl()}/api/connections/linkedin`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Disconnect failed: ${response.status}`);

      setIsAuthenticated(false);
      
      if (onDisconnect) {
        onDisconnect();
      }
      
      toast({
        title: 'Disconnected',
        description: 'LinkedIn account disconnected successfully',
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect LinkedIn account',
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
          <span className="hidden sm:inline">LinkedIn Connected</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLinkedInAuth}
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
              <span className="hidden sm:inline">Connect LinkedIn</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
