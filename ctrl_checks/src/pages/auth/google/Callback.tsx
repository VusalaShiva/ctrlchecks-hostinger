/**
 * Google OAuth Callback
 *
 * Handles TWO separate flows that both land at /auth/google/callback:
 *
 * A. AMPLIFY LOGIN REDIRECT (Google or Facebook sign-in via Cognito Hosted UI)
 *    The URL has ?code=... (no "success" or "error" query param).
 *    Amplify exchanges the code for tokens automatically; we just wait for
 *    the Hub "signedIn" event and navigate to /dashboard.
 *
 * B. GOOGLE WORKFLOW CONNECTION (user connects Google Drive/Sheets to a workflow)
 *    The worker redirects here with ?success=true&email=...  or ?error=...
 *    We detect popup mode, postMessage to opener, or invalidate queries and navigate.
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Hub } from 'aws-amplify/utils';
import { resolveOAuthReturnTo } from '@/lib/oauth-return';
import { awsClient } from '@/integrations/aws/client';
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

export default function GoogleAuthCallback() {
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

    const success      = params.get('success') === 'true';
    const oauthError   = params.get('error_description') || params.get('error');
    const email        = params.get('email');
    const hasCode      = params.has('code');   // Amplify OAuth callback
    const hasState     = params.has('state');  // Amplify OAuth callback
    const isPopup      = window.opener !== null && window.opener !== window;

    // ── B: Workflow connection callback ────────────────────────────────────
    if (oauthError && !hasCode) {
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-error', message: oauthError }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      setError(oauthError);
      getAIGuidance({ code: 'OAUTH_FAILED', message: oauthError }, { provider: 'google', operation: 'connect' }).then(setGuidance);
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
        title: 'Google connected',
        description: email ? `Connected ${email}` : 'Google account connected successfully.',
      });
      navigate(returnTo, { replace: true });
      return;
    }

    // ── A: Amplify OAuth login callback (code + state present) ─────────────
    if (hasCode && hasState) {
      let done = false;
      const TIMEOUT_MS = 15_000;

      const finish = (succeeded: boolean, message?: string) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        hubUnsubscribe();

        if (succeeded) {
          toast({ title: 'Signed in', description: 'Welcome back.' });
          navigate('/dashboard', { replace: true });
        } else {
          const msg = message || 'Sign-in did not complete. Please try again.';
          setError(msg);
          getAIGuidance({ code: 'SIGN_IN_FAILED', message: msg }, { provider: 'google', operation: 'sign_in' }).then(setGuidance);
          setTimeout(() => navigate('/signin', { replace: true }), 5000);
        }
      };

      const timer = setTimeout(() => finish(false, 'Sign-in timed out.'), TIMEOUT_MS);

      const hubUnsubscribe = Hub.listen('auth', ({ payload }) => {
        if (payload.event === 'signedIn') {
          finish(true);
        } else if (
          payload.event === 'signInWithRedirect_failure' ||
          payload.event === 'tokenRefresh_failure'
        ) {
          finish(false, 'OAuth sign-in failed.');
        }
      });

      awsClient.auth.getSession().then(({ data }) => {
        if (data?.session) finish(true);
      }).catch(() => {});

      return;
    }

    // ── Fallback: no code, no success → unknown state ─────────────────────
    if (isPopup) {
      window.opener?.postMessage({ type: 'oauth-error', message: 'Google connection did not complete.' }, window.location.origin);
      setTimeout(() => window.close(), 300);
      return;
    }
    setError('Google connection did not complete.');
    getAIGuidance({ code: 'OAUTH_INCOMPLETE', message: 'Google connection did not complete' }, { provider: 'google', operation: 'connect' }).then(setGuidance);
    setTimeout(() => navigate(returnTo, { replace: true }), 5000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              onDismiss={() => navigate('/signin', { replace: true })}
            />
          </div>
        ) : (
          <>
            <div className="font-semibold text-muted-foreground">Connection didn't complete</div>
            <p className="text-muted-foreground">{error}</p>
          </>
        )}
        <Button onClick={() => navigate('/signin', { replace: true })} variant="outline">
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Completing sign-in…</p>
    </div>
  );
}
