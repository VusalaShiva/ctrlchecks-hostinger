// Popup relay HTML — redirects the OAuth popup to a same-origin frontend relay page.
// Uses BroadcastChannel (unaffected by COOP) to deliver the result to the opener window.
// This bypasses COOP issues (e.g. marketplace.zoom.us) that permanently sever window.opener.

function frontendOrigin(returnTo?: string | null): string {
  if (returnTo) {
    try {
      return new URL(returnTo).origin;
    } catch {
      // fall through
    }
  }
  return process.env.FRONTEND_URL || 'http://localhost:8080';
}

export function oauthCallbackHtml(input: {
  type: 'oauth-success' | 'oauth-error';
  connectionId?: string;
  message?: string;
  returnTo?: string | null;
}): string {
  const origin = frontendOrigin(input.returnTo);
  const relay = new URL(`${origin}/auth/oauth-relay`);
  relay.searchParams.set('type', input.type);
  if (input.connectionId) relay.searchParams.set('connectionId', input.connectionId);
  if (input.message) relay.searchParams.set('message', input.message);
  if (input.returnTo) relay.searchParams.set('returnTo', input.returnTo);
  const relayHref = relay.toString();

  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${relayHref}"><title>Connecting...</title></head><body><script>window.location.replace(${JSON.stringify(relayHref)})</script><p>Completing connection...</p></body></html>`;
}
