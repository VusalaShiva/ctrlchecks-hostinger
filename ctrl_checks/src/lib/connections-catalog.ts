import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { awsClient } from '@/integrations/aws/client';

export type CatalogAuthType =
  | 'oauth'
  | 'api_key'
  | 'webhook'
  | 'token'
  | 'basic_auth'
  | 'runtime'
  | 'manual_oauth_token';

export type OAuthFlow = 'backend_redirect' | 'frontend_code_exchange' | 'existing_connection' | 'manual_token';

export type ConnectionCredentialField = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  helpCategory?: string;
  docsUrl?: string;
  exampleValue?: string;
};

export type ConnectionCatalogEntry = {
  provider: string;
  vaultKey: string;
  displayName: string;
  authType: CatalogAuthType;
  credentialFields: ConnectionCredentialField[];
  connectUrl?: string;
  disconnectUrl?: string;
  callbackUrl?: string;
  frontendReturnUrl?: string;
  nodeTypes: string[];
  connectorIds: string[];
  scopes: string[];
  requiredEnv: string[];
  configured: boolean;
  oauthImplemented: boolean;
  flow: OAuthFlow;
  setupHint?: string;
};

export type ConnectionStatus = {
  provider: string;
  vaultKey: string;
  connected: boolean;
  configured: boolean;
  authType: CatalogAuthType;
  flow: OAuthFlow;
  source?: string;
  expiresAt?: string | null;
  updatedAt?: string | null;
  setupStatus: 'ready' | 'missing_env' | string;
  metadata?: Record<string, unknown>;
};

export async function fetchConnectionCatalog(): Promise<ConnectionCatalogEntry[]> {
  const response = await fetch(`${getBackendUrl()}/api/connections/catalog`);
  if (!response.ok) throw new Error('Failed to load connection catalog');
  const data = await response.json();
  return data.connections || [];
}

export async function fetchConnectionStatuses(): Promise<Record<string, ConnectionStatus>> {
  const token = (await awsClient.auth.getSession()).data.session?.access_token;
  if (!token) return {};

  const response = await fetch(`${getBackendUrl()}/api/connections/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to load connection statuses');
  const data = await response.json();
  return data.connections || {};
}

export function buildConnectionStartUrl(entry: ConnectionCatalogEntry, userId: string, returnTo = '/dashboard') {
  if (!entry.connectUrl) return null;

  const url = new URL(entry.connectUrl, getBackendUrl());
  if (entry.flow === 'backend_redirect') {
    url.searchParams.set('user_id', userId);
    url.searchParams.set('redirect_to', returnTo);
  }

  if (entry.flow === 'frontend_code_exchange' && entry.callbackUrl) {
    url.searchParams.set('redirect_uri', entry.callbackUrl);
  }

  return url.toString();
}

export function credentialVaultType(authType: CatalogAuthType) {
  if (authType === 'webhook') return 'webhook_secret';
  if (authType === 'basic_auth') return 'basic_auth';
  if (authType === 'manual_oauth_token') return 'oauth_token';
  if (authType === 'api_key' || authType === 'token') return 'api_key';
  return 'custom';
}

