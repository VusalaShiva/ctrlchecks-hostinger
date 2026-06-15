import { useEffect } from 'react';

export default function OAuthRelayPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      type: params.get('type') ?? 'oauth-error',
      connectionId: params.get('connectionId') ?? undefined,
      message: params.get('message') ?? undefined,
    };

    // BroadcastChannel works even when COOP breaks window.opener (same-origin tabs)
    try {
      const bc = new BroadcastChannel('oauth_callback');
      bc.postMessage(payload);
      bc.close();
    } catch { /* BroadcastChannel not supported */ }

    // Also try postMessage for providers without COOP
    try {
      if (window.opener) {
        window.opener.postMessage(payload, window.location.origin);
      }
    } catch { /* opener inaccessible */ }

    // Give the event loop a tick to dispatch the BC message, then close.
    setTimeout(() => {
      window.close();
      // Fallback: redirect if window.close() is blocked by the browser
      setTimeout(() => {
        const returnTo = params.get('returnTo') ?? '/connections';
        window.location.href = returnTo;
      }, 500);
    }, 50);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-sm text-muted-foreground">Completing connection… you can close this window.</p>
    </div>
  );
}
