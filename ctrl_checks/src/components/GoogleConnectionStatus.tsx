import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { startGoogleConnectorOAuth } from '@/lib/google-connector-oauth';
import { fetchRuntimeCredentialStatus } from '@/lib/api/credentialStatus';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function GoogleConnectionStatus() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    if (!user) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const status = await fetchRuntimeCredentialStatus('google');
      setIsAuthenticated(Boolean(status.connected));
    } catch (error) {
      console.error('Error checking auth status:', error);
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

  const handleGoogleAuth = async () => {
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
      toast({
        title: 'Redirecting to Google...',
        description: 'Please authorize access to Google services',
      });
      startGoogleConnectorOAuth(user.id);
    } catch (error) {
      console.error('Google OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Google authentication',
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
      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const resp = await fetch(`${apiUrl}/api/connections/google`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error((body as any).error || `HTTP ${resp.status}`);
      }

      setIsAuthenticated(false);
      toast({
        title: 'Disconnected',
        description: 'Google account disconnected successfully',
      });
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect Google account',
        variant: 'destructive',
      });
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Google Connected</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoogleAuth}
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
                    <span className="hidden sm:inline">Connect Google</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isAuthenticated ? (
            <p>Google account is connected. Click to disconnect.</p>
          ) : (
            <p>Google account is not connected. Click to connect.</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

