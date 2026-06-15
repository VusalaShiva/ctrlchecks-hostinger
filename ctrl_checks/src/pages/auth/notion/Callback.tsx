import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveOAuthReturnTo } from '@/lib/oauth-return';
import { invalidateAfterConnectionChange } from '@/lib/queryInvalidation';

export default function NotionAuthCallback() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>('Processing authentication...');
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    const returnTo = resolveOAuthReturnTo(searchParams, '/workflows');
    const isPopup = window.opener !== null && window.opener !== window;

    const processCallback = async () => {
      try {
        processedRef.current = true;
        setStatus('Processing Notion authentication...');

        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          throw new Error(`Notion OAuth error: ${errorParam}`);
        }

        if (!code) {
          throw new Error('No authorization code received from Notion');
        }

        const { data: { session }, error: sessionError } = await awsClient.auth.getSession();
        if (sessionError || !session) {
          throw new Error('Not authenticated. Please sign in first.');
        }

        setStatus('Exchanging authorization code for access token...');

        const backendUrl = getBackendUrl();
        const redirectUri = `${window.location.origin}/auth/notion/callback`;

        const response = await fetch(`${backendUrl}/api/oauth/notion/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code, state, redirect_uri: redirectUri }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const tokenData = await response.json();

        if (!tokenData.access_token) {
          throw new Error('No access token received from Notion');
        }

        setStatus('Verifying Notion connection...');

        if (isPopup) {
          window.opener?.postMessage({ type: 'oauth-success' }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        invalidateAfterConnectionChange(qc);
        toast({ title: 'Notion connected', description: 'Notion connected successfully!' });
        navigate(returnTo);
      } catch (err) {
        console.error('Error in Notion callback processing:', err);
        const msg = err instanceof Error ? err.message : 'Failed to save Notion connection';
        setError(msg);

        if (window.opener !== null && window.opener !== window) {
          window.opener?.postMessage({ type: 'oauth-error', message: msg }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        toast({
          title: 'Connection Failed',
          description: msg,
          variant: 'destructive',
        });
        setTimeout(() => navigate(returnTo), 3000);
      }
    };

    processCallback();
  }, [navigate, toast, searchParams, qc]);

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="text-destructive font-semibold">Connection Failed</div>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => navigate(resolveOAuthReturnTo(searchParams, '/workflows'))} variant="outline">
          Return to Workflows
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">{status}</p>
    </div>
  );
}
