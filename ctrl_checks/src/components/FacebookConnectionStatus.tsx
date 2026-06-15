import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { getCurrentPathWithQuery, rememberOAuthReturnTo } from '@/lib/oauth-return';

interface FacebookConnectionStatusProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  compact?: boolean;
}

export default function FacebookConnectionStatus({ 
  onConnect, 
  onDisconnect,
  compact = false 
}: FacebookConnectionStatusProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accountLabel, setAccountLabel] = useState<string | null>(null);

  const checkAuthStatus = useCallback(async () => {
    if (!user) {
      setIsAuthenticated(false);
      setAccountLabel(null);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
      if (!authToken) {
        setIsAuthenticated(false);
        setAccountLabel(null);
        return;
      }

      const backendUrl = getBackendUrl();
      const resp = await fetch(`${backendUrl}/api/connections/facebook/status`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!resp.ok) {
        setIsAuthenticated(false);
        setAccountLabel(null);
        return;
      }

      const json = await resp.json();
      const connected = Boolean(json?.connected);
      setIsAuthenticated(connected);

      if (connected && json?.metadata?.name) {
        setAccountLabel(`Facebook: ${json.metadata.name}`);
      } else if (connected) {
        setAccountLabel('Facebook Connected');
      } else {
        setAccountLabel(null);
      }
    } catch (error) {
      console.error('Error checking Facebook auth status:', error);
      setIsAuthenticated(false);
      setAccountLabel(null);
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

  const handleFacebookAuth = async () => {
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
        title: 'Redirecting to Facebook...',
        description: 'Please authorize access to Facebook services',
      });
      window.location.href = `${getBackendUrl()}/api/oauth/facebook/start?${params.toString()}`;
    } catch (error) {
      console.error('Facebook OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Facebook authentication',
        variant: 'destructive',
      });
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    if (!user) return;

    try {
      const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
      if (!authToken) {
        throw new Error('No authentication token');
      }

      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/connections/facebook/disconnect`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to disconnect');
      }

      setIsAuthenticated(false);
      setAccountLabel(null);
      
      if (onDisconnect) {
        onDisconnect();
      }
      
      toast({
        title: 'Disconnected',
        description: 'Facebook account disconnected successfully',
      });
      
      checkAuthStatus();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect Facebook account',
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
          <span className="hidden sm:inline">{accountLabel || 'Facebook Connected'}</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFacebookAuth}
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
              <span className="hidden sm:inline">Connect Facebook</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
