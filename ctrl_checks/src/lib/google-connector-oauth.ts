import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { getCurrentPathWithQuery, rememberOAuthReturnTo } from '@/lib/oauth-return';

type BackendOAuthProvider = 'google' | 'linkedin' | 'github' | 'facebook';

function isSafeInternalPath(path: string | undefined): path is string {
  return Boolean(path && path.startsWith('/') && !path.startsWith('//'));
}

export function buildConnectorOAuthStartUrl(
  provider: BackendOAuthProvider,
  userId: string,
  returnTo = getCurrentPathWithQuery(),
  backendUrl = getBackendUrl(),
): string {
  if (!userId) {
    throw new Error(`User id is required to connect ${provider}.`);
  }

  const url = new URL(`/api/oauth/${provider}/start`, backendUrl);
  url.searchParams.set('user_id', userId);
  url.searchParams.set('redirect_to', isSafeInternalPath(returnTo) ? returnTo : '/workflows');
  return url.toString();
}

export function startConnectorOAuth(provider: BackendOAuthProvider, userId: string, returnTo?: string): void {
  const safeReturnTo = isSafeInternalPath(returnTo) ? returnTo : getCurrentPathWithQuery();
  rememberOAuthReturnTo(safeReturnTo);
  window.location.href = buildConnectorOAuthStartUrl(provider, userId, safeReturnTo);
}

export function buildGoogleConnectorOAuthStartUrl(
  userId: string,
  returnTo = getCurrentPathWithQuery(),
  backendUrl = getBackendUrl(),
): string {
  return buildConnectorOAuthStartUrl('google', userId, returnTo, backendUrl);
}

export function startGoogleConnectorOAuth(userId: string, returnTo?: string): void {
  startConnectorOAuth('google', userId, returnTo);
}
