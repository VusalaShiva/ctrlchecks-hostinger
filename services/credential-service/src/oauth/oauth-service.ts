import crypto, { randomUUID } from 'crypto';
import { queryDb } from '../lib/db';
import { encryptJson } from '../lib/crypto';
import { getCredentialTypeEntry, getRedirectUri } from './credential-type-registry';
import type { CredentialTypeEntry } from './credential-type-registry';

function base64Url(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('base64url');
}

function oauthClient(entry: CredentialTypeEntry): {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
} {
  const clientId = process.env[entry.oauth2.clientIdEnv];
  const clientSecret = process.env[entry.oauth2.clientSecretEnv];
  if (!clientId || !clientSecret) {
    throw new Error(
      `OAuth provider ${entry.provider} is missing ${entry.oauth2.clientIdEnv}/${entry.oauth2.clientSecretEnv}`,
    );
  }
  return { clientId, clientSecret, redirectUri: getRedirectUri(entry) };
}

async function exchangeCode(
  entry: CredentialTypeEntry,
  code: string,
  codeVerifier: string,
  redirectUri: string,
): Promise<Record<string, unknown>> {
  const { clientId, clientSecret } = oauthClient(entry);
  const useBasicAuth = entry.oauth2.tokenAuthMethod === 'basic';
  const usePkce = entry.oauth2.pkce !== false && codeVerifier;

  const params = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri });
  if (!useBasicAuth) {
    params.set('client_id', clientId);
    params.set('client_secret', clientSecret);
  }
  if (usePkce) params.set('code_verifier', codeVerifier);

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (useBasicAuth) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  }

  const response = await fetch(entry.oauth2.tokenUrl, { method: 'POST', headers, body: params });
  const data: any = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || `Token exchange failed: ${response.status}`);
  }
  return data;
}

async function upsertConnection(
  userId: string,
  entry: CredentialTypeEntry,
  token: Record<string, unknown>,
  scopes: string[],
  existingConnectionId?: string | null,
): Promise<string> {
  const expiresIn = token.expires_in ? Number(token.expires_in) : null;
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000).toISOString() : null;

  const credentials: Record<string, unknown> = {
    access_token: token.access_token,
    refresh_token: token.refresh_token ?? null,
    token_type: token.token_type ?? 'Bearer',
    scope: scopes.join(' '),
    expires_at: expiresAt,
  };
  if (token.instance_url) credentials.instance_url = token.instance_url;
  if (token.bot_id) credentials.bot_id = token.bot_id;
  if (token.workspace_id) credentials.workspace_id = token.workspace_id;

  const encrypted = encryptJson(credentials);

  if (existingConnectionId) {
    await queryDb(
      `UPDATE connections
       SET encrypted_credentials = $1, status = 'active', expires_at = $2, updated_at = NOW()
       WHERE id = $3 AND user_id = $4`,
      [encrypted, expiresAt, existingConnectionId, userId],
    );
    return existingConnectionId;
  }

  const id = randomUUID();
  await queryDb(
    `INSERT INTO connections (
         id, user_id, name, credential_type_id, provider, auth_type,
         encrypted_credentials, status, metadata, expires_at, created_at, updated_at
       )
       VALUES ($1, $2, $3, $4, $5, 'oauth2', $6, 'active', '{}'::jsonb, $7, NOW(), NOW())`,
    [id, userId, entry.provider, entry.id, entry.provider, encrypted, expiresAt],
  );
  return id;
}

export class OAuthService {
  async start(input: {
    userId: string;
    credentialTypeId: string;
    connectionId?: string | null;
    scopes?: string[];
    returnTo?: string | null;
  }): Promise<{ authorizationUrl: string; state: string }> {
    const entry = getCredentialTypeEntry(input.credentialTypeId);
    if (!entry) throw new Error(`OAuth2 credential type not found: ${input.credentialTypeId}`);

    const { clientId, redirectUri } = oauthClient(entry);
    const state = base64Url(24);
    const usePkce = entry.oauth2.pkce !== false;
    const verifier = usePkce ? base64Url(48) : '';
    const challenge = usePkce
      ? crypto.createHash('sha256').update(verifier).digest('base64url')
      : '';
    const scopes = input.scopes?.length ? input.scopes : entry.oauth2.defaultScopes;

    await queryDb(
      `INSERT INTO oauth_states (
         id, user_id, provider, credential_type_id, connection_id, state_hash, code_verifier,
         redirect_uri, scopes, return_to, expires_at, created_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, NOW() + INTERVAL '10 minutes', NOW())`,
      [
        randomUUID(),
        input.userId,
        entry.provider,
        entry.id,
        input.connectionId ?? null,
        crypto.createHash('sha256').update(state).digest('hex'),
        verifier,
        redirectUri,
        JSON.stringify(scopes),
        input.returnTo ?? null,
      ],
    );

    const url = new URL(entry.oauth2.authorizationUrl);
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    if (scopes.length) url.searchParams.set('scope', scopes.join(entry.oauth2.scopeSeparator || ' '));
    if (usePkce) {
      url.searchParams.set('code_challenge', challenge);
      url.searchParams.set('code_challenge_method', 'S256');
    }
    if (entry.oauth2.accessType) url.searchParams.set('access_type', entry.oauth2.accessType);
    if (entry.oauth2.prompt) url.searchParams.set('prompt', entry.oauth2.prompt);
    for (const [key, value] of Object.entries(entry.oauth2.authParams || {})) {
      url.searchParams.set(key, value);
    }

    return { authorizationUrl: url.toString(), state };
  }

  async callback(input: {
    code: string;
    state: string;
  }): Promise<{ connectionId: string; returnTo?: string | null }> {
    const stateHash = crypto.createHash('sha256').update(input.state).digest('hex');
    const rows = await queryDb(
      `SELECT * FROM oauth_states
       WHERE state_hash = $1 AND consumed_at IS NULL AND expires_at > NOW()
       LIMIT 1`,
      [stateHash],
    );
    const stateRow = rows[0];
    if (!stateRow) throw new Error('Invalid or expired OAuth state');

    const entry = getCredentialTypeEntry(stateRow.credential_type_id);
    if (!entry) throw new Error('OAuth state references an unknown credential type');

    console.info(
      `[credential-service OAuth callback] credTypeId=${stateRow.credential_type_id} provider=${entry.provider} redirect_uri=${stateRow.redirect_uri}`,
    );

    const token = await exchangeCode(entry, input.code, stateRow.code_verifier ?? '', stateRow.redirect_uri);
    await queryDb(`UPDATE oauth_states SET consumed_at = NOW() WHERE id = $1`, [stateRow.id]);

    const stateScopes: string[] = Array.isArray(stateRow.scopes)
      ? stateRow.scopes
      : JSON.parse(stateRow.scopes || '[]');

    const returnedScopes = (() => {
      if (token.scope && typeof token.scope === 'string')
        return token.scope.split(/[,\s]+/).filter(Boolean);
      if (Array.isArray(token.scope)) return token.scope as string[];
      return stateScopes;
    })();

    const connectionId = await upsertConnection(
      stateRow.user_id,
      entry,
      token,
      returnedScopes.length > 0 ? returnedScopes : stateScopes,
      stateRow.connection_id,
    );

    return { connectionId, returnTo: stateRow.return_to };
  }
}

export const oauthService = new OAuthService();
