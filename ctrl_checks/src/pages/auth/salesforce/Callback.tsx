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

export default function SalesforceAuthCallback() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>('Processing Salesforce authentication...');
  const [error, setError] = useState<string | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    const returnTo = resolveOAuthReturnTo(searchParams, '/workflows');
    const isPopup = window.opener !== null && window.opener !== window;

    const processCallback = async () => {
      try {
        processedRef.current = true;

        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam === 'access_denied') {
          if (isPopup) {
            window.opener?.postMessage({ type: 'oauth-error', message: 'Salesforce authorization was cancelled.' }, window.location.origin);
            setTimeout(() => window.close(), 300);
            return;
          }
          toast({ title: 'Cancelled', description: 'Salesforce authorization was cancelled.' });
          navigate(returnTo);
          return;
        }

        if (errorParam) {
          throw new Error(`Salesforce OAuth error: ${errorParam}`);
        }

        if (!code) {
          throw new Error('No authorization code received from Salesforce');
        }

        const { data: { session }, error: sessionError } = await awsClient.auth.getSession();
        if (sessionError || !session) {
          throw new Error('Not authenticated. Please sign in first.');
        }

        setStatus('Exchanging authorization code for access token...');

        const backendUrl = getBackendUrl();
        const redirectUri = `${window.location.origin}/auth/salesforce/callback`;

        const response = await fetch(`${backendUrl}/api/oauth/salesforce/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code, redirect_uri: redirectUri }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to connect Salesforce');
        }

        setStatus('Salesforce connected!');

        if (isPopup) {
          window.opener?.postMessage({ type: 'oauth-success' }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        invalidateAfterConnectionChange(qc);
        toast({ title: 'Salesforce connected', description: 'Salesforce account connected successfully!' });
        navigate(returnTo);
      } catch (err) {
        console.error('Salesforce callback error:', err);
        const msg = err instanceof Error ? err.message : 'Failed to connect Salesforce';
        setError(msg);

        if (window.opener !== null && window.opener !== window) {
          window.opener?.postMessage({ type: 'oauth-error', message: msg }, window.location.origin);
          setTimeout(() => window.close(), 300);
          return;
        }

        toast({ title: 'Connection Failed', description: msg, variant: 'destructive' });
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
