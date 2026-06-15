const OAUTH_RETURN_TO_KEY = 'oauth:returnTo';

const DEFAULT_RETURN_TO = '/workflows';

function isSafeInternalPath(path: string | null | undefined): path is string {
  if (!path) return false;
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false;
  return true;
}

export function getCurrentPathWithQuery(): string {
  const path = `${window.location.pathname || ''}${window.location.search || ''}${window.location.hash || ''}`;
  return isSafeInternalPath(path) ? path : DEFAULT_RETURN_TO;
}

export function rememberOAuthReturnTo(path?: string): void {
  const value = isSafeInternalPath(path) ? path : getCurrentPathWithQuery();
  sessionStorage.setItem(OAUTH_RETURN_TO_KEY, value);
}

export function consumeRememberedOAuthReturnTo(): string | null {
  const value = sessionStorage.getItem(OAUTH_RETURN_TO_KEY);
  sessionStorage.removeItem(OAUTH_RETURN_TO_KEY);
  return isSafeInternalPath(value) ? value : null;
}

export function resolveOAuthReturnTo(searchParams: URLSearchParams, fallback = DEFAULT_RETURN_TO): string {
  const fromQuery = searchParams.get('returnTo');
  if (isSafeInternalPath(fromQuery)) {
    sessionStorage.removeItem(OAUTH_RETURN_TO_KEY);
    return fromQuery;
  }
  return consumeRememberedOAuthReturnTo() || fallback;
}

export function buildConnectorCallbackUrl(callbackPath: string): string {
  const callbackUrl = new URL(`${window.location.origin}${callbackPath}`);
  callbackUrl.searchParams.set('mode', 'connector');
  callbackUrl.searchParams.set('returnTo', getCurrentPathWithQuery());
  return callbackUrl.toString();
}
