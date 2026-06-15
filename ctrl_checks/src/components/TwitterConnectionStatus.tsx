import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { awsClient } from '@/integrations/aws/client';
import { ENDPOINTS } from '@/config/endpoints';
import { Loader2, CheckCircle2, XCircle, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { rememberOAuthReturnTo } from '@/lib/oauth-return';
import { fetchRuntimeCredentialStatus } from '@/lib/api/credentialStatus';

interface TwitterConnectionStatusProps {
  onStatusChange?: (connected: boolean) => void;
}

export default function TwitterConnectionStatus({ onStatusChange }: TwitterConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const { toast } = useToast();

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await awsClient.auth.getSession();
      
      if (!session) {
        setIsConnected(false);
        setIsLoading(false);
        return;
      }

      const status = await fetchRuntimeCredentialStatus('twitter');
      setIsConnected(Boolean(status.connected));
      setUsername(null);
      onStatusChange?.(Boolean(status.connected));
    } catch (error) {
      console.error('Error checking Twitter connection:', error);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      const { data: { session } } = await awsClient.auth.getSession();
      if (!session) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to connect Twitter',
          variant: 'destructive',
        });
        return;
      }

      // Get current origin for redirect URI
      const redirectUri = `${window.location.origin}/auth/twitter/callback`;
      rememberOAuthReturnTo();
      
      // Initiate OAuth flow
      const response = await fetch(
        `${ENDPOINTS.itemBackend}/api/oauth/twitter/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        }
      );

      if (response.redirected) {
        // Redirect to Twitter OAuth
        window.location.href = response.url;
      } else {
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to initiate Twitter OAuth');
        }
      }
    } catch (error) {
      console.error('Error connecting Twitter:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect Twitter account',
        variant: 'destructive',
      });
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const { data: { session } } = await awsClient.auth.getSession();
      if (!session) return;

      const response = await fetch(`${ENDPOINTS.itemBackend}/api/connections/twitter`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!response.ok) throw new Error(`Disconnect failed: ${response.status}`);

      setIsConnected(false);
      setUsername(null);
      
      toast({
        title: 'Disconnected',
        description: 'Twitter account has been disconnected',
      });

      if (onStatusChange) {
        onStatusChange(false);
      }
    } catch (error) {
      console.error('Error disconnecting Twitter:', error);
      toast({
        title: 'Disconnect Failed',
        description: 'Failed to disconnect Twitter account',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Checking connection...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Twitter className="h-5 w-5 text-[#1DA1F2]" />
        <div>
          <div className="font-medium text-sm">Twitter/X</div>
          {isConnected ? (
            <div className="text-xs text-muted-foreground">
              {username ? `Connected as @${username}` : 'Connected'}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">Not connected</div>
          )}
        </div>
        {isConnected ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div>
        {isConnected ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            disabled={isConnecting}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
