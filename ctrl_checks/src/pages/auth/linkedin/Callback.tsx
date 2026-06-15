import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { resolveOAuthReturnTo } from '@/lib/oauth-return';
import { invalidateAfterConnectionChange } from '@/lib/queryInvalidation';
import { GuidedStatusCard } from '@/components/ui/guided-status-card';
import { getAIGuidance } from '@/lib/ai-error-guidance';
import type { GuidedStatusContent } from '@/lib/workflow-guidance';

function safeReturnTo(params: URLSearchParams) {
  const raw = params.get('return_to');
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      if (decoded.startsWith('/') && !decoded.startsWith('//')) return decoded;
    } catch {
      if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
    }
  }
  return resolveOAuthReturnTo(params, '/workflows');
}

export default function LinkedInAuthCallback() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const handled = useRef(false);
  const params = new URLSearchParams(window.location.search);
  const returnTo = safeReturnTo(params);
  const [error, setError] = useState<string | null>(null);
  const [guidance, setGuidance] = useState<GuidedStatusContent | null>(null);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const success    = params.get('success') === 'true';
    const oauthError = params.get('error_description') || params.get('error');
    const name       = params.get('name');
    const isPopup    = window.opener !== null && window.opener !== window;

    if (oauthError) {
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-error', message: oauthError }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      setError(oauthError);
      getAIGuidance({ code: 'OAUTH_FAILED', message: oauthError }, { provider: 'linkedin', operation: 'connect' }).then(setGuidance);
      setTimeout(() => navigate(returnTo, { replace: true }), 5000);
      return;
    }

    if (success) {
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-success' }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      invalidateAfterConnectionChange(qc);
      toast({
        title: 'LinkedIn connected',
        description: name ? `Connected ${name}` : 'LinkedIn account connected successfully.',
      });
      navigate(returnTo, { replace: true });
      return;
    }

    if (isPopup) {
      window.opener?.postMessage({ type: 'oauth-error', message: 'LinkedIn connection did not complete.' }, window.location.origin);
      setTimeout(() => window.close(), 300);
      return;
    }
    setError('LinkedIn connection did not complete.');
    getAIGuidance({ code: 'OAUTH_INCOMPLETE', message: 'LinkedIn connection did not complete' }, { provider: 'linkedin', operation: 'connect' }).then(setGuidance);
    setTimeout(() => navigate(returnTo, { replace: true }), 5000);
  }, [navigate, params, returnTo, toast, qc]);

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-8 text-center">
        {guidance ? (
          <div className="w-full max-w-md">
            <GuidedStatusCard
              title={guidance.title}
              description={guidance.description}
              resolution={guidance.resolution}
              nextSteps={guidance.nextSteps}
              tone={guidance.tone}
              onDismiss={() => navigate(returnTo, { replace: true })}
            />
          </div>
        ) : (
          <p className="text-muted-foreground">{error}</p>
        )}
        <Button onClick={() => navigate(returnTo, { replace: true })} variant="outline">
          Return to Workflows
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Completing LinkedIn connection...</p>
    </div>
  );
}
