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

export default function InstagramAuthCallback() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Processing Instagram authentication...');
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    const returnTo = resolveOAuthReturnTo(searchParams, '/profile');
    const isPopup = window.opener !== null && window.opener !== window;

    const processCallback = async () => {
      try {
        processedRef.current = true;

        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');
        const errorReason = searchParams.get('error_reason');

        if (errorParam) {
          if (errorReason === 'user_denied') {
            throw new Error('You cancelled the Instagram connection. You can try again anytime.');
          }
          throw new Error(`Instagram OAuth error: ${errorParam}`);
        }
        if (!code) {
          throw new Error('No authorization code received from Instagram');
        }

        const { data: { session }, error: sessionError } = await awsClient.auth.getSession();
        if (sessionError || !session) {
          throw new Error('Not authenticated. Please sign in first.');
        }

        setStatus('Exchanging code for access token...');

        const backendUrl = getBackendUrl();
        const redirectUri = `${window.location.origin}/auth/instagram/callback`;

        const response = await fetch(`${backendUrl}/api/oauth/instagram/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code, redirect_uri: redirectUri }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${response.status}`);
        }

        const tokenData = await response.json();
        if (!tokenData.access_token) {
          throw new Error('No access token received from Instagram');
        }

        if (!tokenData.ig_user_id) {
          // ig_user_id couldn't be resolved from Facebook Pages at connect time.
          // This is OK — it will be auto-resolved at workflow execution time
          // via getInstagramBusinessAccountId() in the token manager.
          console.warn('[InstagramCallback] ig_user_id not resolved at connect time — will auto-resolve at execution');
        }

        setStatus('Verifying Instagram connection...');

        const displayName = tokenData.username
          ? `@${tokenData.username}`
          : tokenData.name ?? 'your account';

        if (isPopup) {
          window.opener?.postMessage({ type: 'oauth-success' }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        invalidateAfterConnectionChange(qc);
        toast({
          title: 'Instagram Connected',
          description: `Connected as ${displayName}`,
        });

        navigate(returnTo);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to connect Instagram';
        setError(msg);

        if (window.opener !== null && window.opener !== window) {
          window.opener?.postMessage({ type: 'oauth-error', message: msg }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        toast({ title: 'Connection Failed', description: msg, variant: 'destructive' });
        setTimeout(() => navigate(returnTo), 5000);
      }
    };

    processCallback();
  }, [navigate, toast, searchParams, qc]);

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="text-destructive font-semibold text-lg">Instagram Connection Failed</div>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <p className="text-xs text-muted-foreground">Redirecting back in 5 seconds...</p>
        <Button onClick={() => navigate(resolveOAuthReturnTo(searchParams, '/profile'))} variant="outline">
          Back to Profile
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
