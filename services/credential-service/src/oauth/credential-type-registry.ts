// OAuth2 provider definitions for credential-service.
// Phase 3 included top-9; Phase 4 extends to all 24 OAuth2 provider types from
// worker/src/credentials-system/credential-type-registry.ts.
// Keep in sync with worker registry when provider config changes.
//
// PUBLIC_WORKER_URL ensures fallback callback URIs point to the worker (public),
// not this service (127.0.0.1). Operators must copy per-provider env vars from
// worker .env so effective redirect URIs are identical in both services.

const providerBase =
  process.env.PUBLIC_WORKER_URL ||
  process.env.PUBLIC_BASE_URL ||
  'http://localhost:3001';

function csvEnv(name: string): string[] {
  return (process.env[name] || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

export interface OAuth2Config {
  provider: string;
  authorizationUrl: string;
  tokenUrl: string;
  clientIdEnv: string;
  clientSecretEnv: string;
  redirectUriEnv?: string;
  defaultScopes: string[];
  scopeSeparator?: string;
  pkce?: boolean;
  accessType?: string;
  prompt?: string;
  tokenAuthMethod?: 'body' | 'basic';
  authParams?: Record<string, string>;
}

export interface CredentialTypeEntry {
  id: string;
  provider: string;
  oauth2: OAuth2Config;
}

const facebookScopes = Array.from(new Set([
  'public_profile',
  'email',
  'pages_show_list',
  ...csvEnv('META_FACEBOOK_EXTRA_SCOPES'),
  ...csvEnv('FACEBOOK_EXTRA_SCOPES'),
]));

export const credentialTypeEntries: CredentialTypeEntry[] = [
  // ── Phase 3 top-9 ────────────────────────────────────────────────────────────
  {
    id: 'google_oauth2',
    provider: 'google',
    oauth2: {
      provider: 'google',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID',
      clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET',
      redirectUriEnv: 'GOOGLE_OAUTH_REDIRECT_URI',
      defaultScopes: [
        'openid', 'email', 'profile',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/tasks',
        'https://www.googleapis.com/auth/bigquery',
      ],
      scopeSeparator: ' ',
      accessType: 'offline',
      prompt: 'consent',
      authParams: { include_granted_scopes: 'true' },
    },
  },
  {
    id: 'github_oauth2',
    provider: 'github',
    oauth2: {
      provider: 'github',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      clientIdEnv: 'GITHUB_CLIENT_ID',
      clientSecretEnv: 'GITHUB_CLIENT_SECRET',
      redirectUriEnv: 'GITHUB_OAUTH_REDIRECT_URI',
      defaultScopes: ['read:user', 'user:email', 'repo'],
      scopeSeparator: ' ',
      pkce: false,
    },
  },
  {
    id: 'linkedin_oauth2',
    provider: 'linkedin',
    oauth2: {
      provider: 'linkedin',
      authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
      clientIdEnv: 'LINKEDIN_CLIENT_ID',
      clientSecretEnv: 'LINKEDIN_CLIENT_SECRET',
      redirectUriEnv: 'LINKEDIN_OAUTH_REDIRECT_URI',
      defaultScopes: ['openid', 'profile', 'email', 'w_member_social'],
      scopeSeparator: ' ',
      pkce: false,
    },
  },
  {
    id: 'notion_oauth2',
    provider: 'notion',
    oauth2: {
      provider: 'notion',
      authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',
      tokenUrl: 'https://api.notion.com/v1/oauth/token',
      clientIdEnv: 'NOTION_OAUTH_CLIENT_ID',
      clientSecretEnv: 'NOTION_OAUTH_CLIENT_SECRET',
      redirectUriEnv: 'NOTION_OAUTH_REDIRECT_URI',
      defaultScopes: [],
      tokenAuthMethod: 'basic',
      pkce: false,
      authParams: { owner: 'user' },
    },
  },
  {
    id: 'twitter_oauth2',
    provider: 'twitter',
    oauth2: {
      provider: 'twitter',
      authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
      tokenUrl: 'https://api.twitter.com/2/oauth2/token',
      clientIdEnv: 'TWITTER_OAUTH_CLIENT_ID',
      clientSecretEnv: 'TWITTER_OAUTH_CLIENT_SECRET',
      redirectUriEnv: 'TWITTER_OAUTH_REDIRECT_URI',
      defaultScopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      scopeSeparator: ' ',
      tokenAuthMethod: 'basic',
    },
  },
  {
    id: 'facebook_oauth2',
    provider: 'facebook',
    oauth2: {
      provider: 'facebook',
      authorizationUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
      clientIdEnv: 'META_APP_ID',
      clientSecretEnv: 'META_APP_SECRET',
      redirectUriEnv: 'FACEBOOK_OAUTH_REDIRECT_URI',
      defaultScopes: facebookScopes,
      scopeSeparator: ',',
      pkce: false,
    },
  },
  {
    id: 'slack_oauth2',
    provider: 'slack',
    oauth2: {
      provider: 'slack',
      authorizationUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      clientIdEnv: 'SLACK_CLIENT_ID',
      clientSecretEnv: 'SLACK_CLIENT_SECRET',
      redirectUriEnv: 'SLACK_OAUTH_REDIRECT_URI',
      defaultScopes: ['chat:write', 'channels:read', 'users:read'],
      scopeSeparator: ',',
      pkce: false,
      tokenAuthMethod: 'basic',
    },
  },
  {
    id: 'hubspot_oauth2',
    provider: 'hubspot',
    oauth2: {
      provider: 'hubspot',
      authorizationUrl: 'https://app.hubspot.com/oauth/authorize',
      tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
      clientIdEnv: 'HUBSPOT_CLIENT_ID',
      clientSecretEnv: 'HUBSPOT_CLIENT_SECRET',
      redirectUriEnv: 'HUBSPOT_OAUTH_REDIRECT_URI',
      defaultScopes: ['contacts', 'content', 'forms'],
      scopeSeparator: ' ',
      pkce: false,
    },
  },
  {
    id: 'salesforce_oauth2',
    provider: 'salesforce',
    oauth2: {
      provider: 'salesforce',
      authorizationUrl: `${process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'}/services/oauth2/authorize`,
      tokenUrl: `${process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'}/services/oauth2/token`,
      clientIdEnv: 'SALESFORCE_CLIENT_ID',
      clientSecretEnv: 'SALESFORCE_CLIENT_SECRET',
      redirectUriEnv: 'SALESFORCE_OAUTH_REDIRECT_URI',
      defaultScopes: ['api', 'refresh_token'],
      scopeSeparator: ' ',
      pkce: false,
    },
  },

  // ── Phase 4: remaining OAuth2 providers ──────────────────────────────────────
  {
    id: 'microsoft_oauth2',
    provider: 'microsoft',
    oauth2: {
      provider: 'microsoft',
      authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      clientIdEnv: 'MICROSOFT_CLIENT_ID',
      clientSecretEnv: 'MICROSOFT_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_MICROSOFT_OAUTH_REDIRECT_URI',
      defaultScopes: [
        'offline_access',
        'https://graph.microsoft.com/User.Read',
        'https://graph.microsoft.com/Mail.ReadWrite',
        'https://graph.microsoft.com/Calendars.ReadWrite',
        'https://graph.microsoft.com/Team.ReadBasic.All',
        'https://graph.microsoft.com/Channel.ReadBasic.All',
      ],
      scopeSeparator: ' ',
      accessType: 'offline',
    },
  },
  {
    id: 'zoom_oauth2',
    provider: 'zoom',
    oauth2: {
      provider: 'zoom',
      authorizationUrl: 'https://zoom.us/oauth/authorize',
      tokenUrl: 'https://zoom.us/oauth/token',
      clientIdEnv: 'ZOOM_CLIENT_ID',
      clientSecretEnv: 'ZOOM_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_ZOOM_OAUTH_REDIRECT_URI',
      defaultScopes: ['meeting:write:meeting', 'meeting:read:meeting', 'meeting:read:list_meetings', 'user:read:user'],
      scopeSeparator: ' ',
      pkce: false,
      tokenAuthMethod: 'basic',
    },
  },
  {
    id: 'gitlab_oauth2',
    provider: 'gitlab',
    oauth2: {
      provider: 'gitlab',
      authorizationUrl: 'https://gitlab.com/oauth/authorize',
      tokenUrl: 'https://gitlab.com/oauth/token',
      clientIdEnv: 'GITLAB_CLIENT_ID',
      clientSecretEnv: 'GITLAB_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_GITLAB_OAUTH_REDIRECT_URI',
      defaultScopes: ['read_user', 'api'],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'asana_oauth2',
    provider: 'asana',
    oauth2: {
      provider: 'asana',
      authorizationUrl: 'https://app.asana.com/-/oauth_authorize',
      tokenUrl: 'https://app.asana.com/-/oauth_token',
      clientIdEnv: 'ASANA_CLIENT_ID',
      clientSecretEnv: 'ASANA_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_ASANA_OAUTH_REDIRECT_URI',
      defaultScopes: ['default'],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'clickup_oauth2',
    provider: 'clickup',
    oauth2: {
      provider: 'clickup',
      authorizationUrl: 'https://app.clickup.com/api',
      tokenUrl: 'https://api.clickup.com/api/v2/oauth/token',
      clientIdEnv: 'CLICKUP_CLIENT_ID',
      clientSecretEnv: 'CLICKUP_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_CLICKUP_OAUTH_REDIRECT_URI',
      defaultScopes: [],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'linear_oauth2',
    provider: 'linear',
    oauth2: {
      provider: 'linear',
      authorizationUrl: 'https://linear.app/oauth/authorize',
      tokenUrl: 'https://api.linear.app/oauth/token',
      clientIdEnv: 'LINEAR_CLIENT_ID',
      clientSecretEnv: 'LINEAR_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_LINEAR_OAUTH_REDIRECT_URI',
      defaultScopes: ['read', 'write'],
      scopeSeparator: ',',
    },
  },
  {
    id: 'zoho_oauth2',
    provider: 'zoho',
    oauth2: {
      provider: 'zoho',
      authorizationUrl: 'https://accounts.zoho.in/oauth/v2/auth',
      tokenUrl: 'https://accounts.zoho.in/oauth/v2/token',
      clientIdEnv: 'ZOHO_CLIENT_ID',
      clientSecretEnv: 'ZOHO_CLIENT_SECRET',
      redirectUriEnv: 'ZOHO_OAUTH_REDIRECT_URI',
      defaultScopes: ['ZohoCRM.modules.ALL', 'ZohoCRM.users.READ'],
      scopeSeparator: ',',
      pkce: false,
    },
  },
  {
    id: 'mailchimp_oauth2',
    provider: 'mailchimp',
    oauth2: {
      provider: 'mailchimp',
      authorizationUrl: 'https://login.mailchimp.com/oauth2/authorize',
      tokenUrl: 'https://login.mailchimp.com/oauth2/token',
      clientIdEnv: 'MAILCHIMP_CLIENT_ID',
      clientSecretEnv: 'MAILCHIMP_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_MAILCHIMP_OAUTH_REDIRECT_URI',
      defaultScopes: [],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'paypal_oauth2',
    provider: 'paypal',
    oauth2: {
      provider: 'paypal',
      authorizationUrl: 'https://www.paypal.com/signin/authorize',
      tokenUrl: 'https://api-m.paypal.com/v1/oauth2/token',
      clientIdEnv: 'PAYPAL_CLIENT_ID',
      clientSecretEnv: 'PAYPAL_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_PAYPAL_OAUTH_REDIRECT_URI',
      defaultScopes: ['openid', 'profile', 'email'],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'quickbooks_oauth2',
    provider: 'quickbooks',
    oauth2: {
      provider: 'quickbooks',
      authorizationUrl: 'https://appcenter.intuit.com/connect/oauth2',
      tokenUrl: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      clientIdEnv: 'QUICKBOOKS_CLIENT_ID',
      clientSecretEnv: 'QUICKBOOKS_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_QUICKBOOKS_OAUTH_REDIRECT_URI',
      defaultScopes: ['com.intuit.quickbooks.accounting'],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'xero_oauth2',
    provider: 'xero',
    oauth2: {
      provider: 'xero',
      authorizationUrl: 'https://login.xero.com/identity/connect/authorize',
      tokenUrl: 'https://identity.xero.com/connect/token',
      clientIdEnv: 'XERO_CLIENT_ID',
      clientSecretEnv: 'XERO_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_XERO_OAUTH_REDIRECT_URI',
      defaultScopes: ['openid', 'profile', 'email', 'accounting.transactions', 'offline_access'],
      scopeSeparator: ' ',
    },
  },
  {
    id: 'shopify_oauth2',
    provider: 'shopify',
    oauth2: {
      provider: 'shopify',
      authorizationUrl: 'https://{{shop}}/admin/oauth/authorize',
      tokenUrl: 'https://{{shop}}/admin/oauth/access_token',
      clientIdEnv: 'SHOPIFY_CLIENT_ID',
      clientSecretEnv: 'SHOPIFY_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_SHOPIFY_OAUTH_REDIRECT_URI',
      defaultScopes: ['read_products', 'write_products', 'read_orders'],
      scopeSeparator: ',',
    },
  },
  {
    id: 'dropbox_oauth2',
    provider: 'dropbox',
    oauth2: {
      provider: 'dropbox',
      authorizationUrl: 'https://www.dropbox.com/oauth2/authorize',
      tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
      clientIdEnv: 'DROPBOX_CLIENT_ID',
      clientSecretEnv: 'DROPBOX_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_DROPBOX_OAUTH_REDIRECT_URI',
      defaultScopes: ['account_info.read', 'files.content.read', 'files.content.write'],
      scopeSeparator: ' ',
      accessType: 'offline',
    },
  },
  {
    id: 'youtube_oauth2',
    provider: 'youtube',
    oauth2: {
      provider: 'youtube',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID',
      clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET',
      redirectUriEnv: 'GENERIC_YOUTUBE_OAUTH_REDIRECT_URI',
      defaultScopes: [
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube.upload',
      ],
      scopeSeparator: ' ',
      accessType: 'offline',
      prompt: 'consent',
    },
  },
  // ── Instagram — dedicated route (Meta OAuth, server-side callback) ─────────────
  {
    id: 'instagram_oauth2',
    provider: 'instagram',
    oauth2: {
      provider: 'instagram',
      authorizationUrl: 'https://api.instagram.com/oauth/authorize',
      tokenUrl: 'https://api.instagram.com/oauth/access_token',
      clientIdEnv: 'META_APP_ID',
      clientSecretEnv: 'META_APP_SECRET',
      redirectUriEnv: 'INSTAGRAM_OAUTH_REDIRECT_URI',
      defaultScopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list', 'pages_read_engagement', 'business_management'],
      scopeSeparator: ',',
      pkce: false,
    },
  },
  // ── WhatsApp — dedicated route (Meta OAuth, server-side callback) ─────────────
  {
    id: 'whatsapp_oauth2',
    provider: 'whatsapp',
    oauth2: {
      provider: 'whatsapp',
      authorizationUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
      clientIdEnv: 'META_APP_ID',
      clientSecretEnv: 'META_APP_SECRET',
      redirectUriEnv: 'WHATSAPP_OAUTH_REDIRECT_URI',
      defaultScopes: ['public_profile', 'business_management', 'whatsapp_business_management', 'whatsapp_business_messaging'],
      scopeSeparator: ',',
      pkce: false,
    },
  },
];

export function getCredentialTypeEntry(id: string): CredentialTypeEntry | undefined {
  return credentialTypeEntries.find((e) => e.id === id);
}

export function getCredentialTypeByProvider(provider: string): CredentialTypeEntry | undefined {
  return credentialTypeEntries.find((e) => e.provider === provider);
}

export function getRedirectUri(entry: CredentialTypeEntry): string {
  const envValue = entry.oauth2.redirectUriEnv ? process.env[entry.oauth2.redirectUriEnv] : undefined;
  return envValue || `${providerBase}/api/credential-connections/oauth/callback`;
}

export function logOAuthRedirectUris(): void {
  console.info('[credential-service OAuth] Effective callback URLs (must match provider app settings):');
  for (const e of credentialTypeEntries) {
    console.info(`  [credential-service OAuth]   ${e.provider} (${e.id}): ${getRedirectUri(e)}`);
  }
}
