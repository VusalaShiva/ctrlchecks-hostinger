/**
 * GitHub OAuth Callback
 *
 * LOGIN flow  (?mode=login&session_code=<uuid>&return_to=<path>)
 *   — Exchanges session_code for Cognito tokens, injects into Amplify
 *     localStorage, then navigates to return_to. Amplify picks up the
 *     session on the next render because it reads localStorage on every
 *     fetchAuthSession() call.
 *
 * CONNECT flow (?success=true&login=<github_login>&return_to=<path>)
 *   — Detects popup mode and postMessages success; otherwise invalidates
 *     queries and navigates. No token handling needed (user already has
 *     a Cognito session).
 *
 * ERROR (?error=<message>)
 *   — Shows error toast and navigates back.
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { invalidateAfterConnectionChange } from '@/lib/queryInvalidation';
import { getAIGuidance } from '@/lib/ai-error-guidance';

const API_URL    = import.meta.env.VITE_API_URL    || 'http://localhost:3001';
const CLIENT_ID  = import.meta.env.VITE_COGNITO_CLIENT_ID || '';

function injectAmplifyTokens(
  username:     string,
  accessToken:  string,
  idToken:      string,
  refreshToken: string,
) {
  const prefix = `CognitoIdentityServiceProvider.${CLIENT_ID}`;
  localStorage.setItem(`${prefix}.LastAuthUser`,              username);
  localStorage.setItem(`${prefix}.${username}.accessToken`,  accessToken);
  localStorage.setItem(`${prefix}.${username}.idToken`,      idToken);
  localStorage.setItem(`${prefix}.${username}.refreshToken`, refreshToken);
  localStorage.setItem(`${prefix}.${username}.clockDrift`,   '0');
}

export default function GitHubAuthCallback() {
  const navigate  = useNavigate();
  const qc        = useQueryClient();
  const { toast } = useToast();
  const handled   = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params      = new URLSearchParams(window.location.search);
    const mode        = params.get('mode');
    const sessionCode = params.get('session_code');
    const success     = params.get('success') === 'true';
    const login       = params.get('login');
    const error       = params.get('error');
    const returnTo    = decodeURIComponent(params.get('return_to') || '/dashboard');
    const isPopup     = window.opener !== null && window.opener !== window;

    if (error) {
      const msg = decodeURIComponent(error);
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-error', message: msg }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      getAIGuidance({ code: 'OAUTH_FAILED', message: msg }, { provider: 'github', operation: 'sign_in' });
      setTimeout(() => navigate(returnTo, { replace: true }), 2500);
      return;
    }

    if (mode === 'login' && sessionCode) {
      // Exchange session code for Cognito tokens, inject into Amplify storage.
      // This is a login flow, not a connection flow — no popup handling.
      (async () => {
        try {
          const res = await fetch(`${API_URL}/api/oauth/github/exchange-session`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ session_code: sessionCode }),
          });
          const data = await res.json();

          if (!res.ok || !data.accessToken) {
            throw new Error(data.error || 'Token exchange failed');
          }

          injectAmplifyTokens(data.username, data.accessToken, data.idToken, data.refreshToken);

          toast({
            title:       'Signed in with GitHub!',
            description: login ? `Welcome, @${login}` : 'GitHub sign-in successful.',
          });

          window.location.href = returnTo;
        } catch (err: any) {
          getAIGuidance({ code: 'SIGN_IN_FAILED', message: err.message || 'Could not complete sign-in' }, { provider: 'github', operation: 'sign_in' });
          setTimeout(() => navigate('/auth', { replace: true }), 2500);
        }
      })();
      return;
    }

    // CONNECT flow (success / already-authenticated user linked GitHub)
    if (success) {
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-success' }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      invalidateAfterConnectionChange(qc);
      toast({
        title:       'GitHub connected!',
        description: login ? `Connected as @${login}` : 'GitHub account connected successfully.',
      });
      navigate(returnTo, { replace: true });
    } else {
      if (isPopup) {
        window.opener?.postMessage({ type: 'oauth-error', message: 'GitHub connection failed.' }, window.location.origin);
        setTimeout(() => window.close(), 300);
        return;
      }
      getAIGuidance({ code: 'OAUTH_FAILED', message: 'GitHub connection did not complete' }, { provider: 'github', operation: 'connect' });
      setTimeout(() => navigate(returnTo, { replace: true }), 2500);
    }
  }, [navigate, toast, qc]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Completing GitHub sign-in…</p>
    </div>
  );
}
