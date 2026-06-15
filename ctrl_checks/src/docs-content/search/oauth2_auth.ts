import type { DocsSearchIndexItem } from '../search-index';

export const oauth2AuthSearchIndex = [
  {
    "type": "node",
    "title": "OAuth2 Auth",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth",
    "text": "OAuth2 Auth Handles OAuth2 authentication and provides access tokens Use this node when a workflow needs oauth2 auth behavior with schema-driven inputs from the CtrlChecks node registry. Utility"
  },
  {
    "type": "operation",
    "title": "OAuth2 Auth: Configure",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Configure with the OAuth2 Auth node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Provider",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Provider provider OAuth2 provider (google, github, etc.)"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Auth Url",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Auth Url authUrl Authorization URL (for custom provider)"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Token Url",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Token Url tokenUrl Token URL (for custom provider)"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Client Id",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Client Id clientId Client ID"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Client Secret",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Client Secret clientSecret Client Secret"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Scope",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Scope scope OAuth scopes"
  },
  {
    "type": "field",
    "title": "OAuth2 Auth: Action",
    "slug": "oauth2_auth",
    "category": "Utility",
    "href": "/docs/nodes/oauth2_auth#operation-configure",
    "text": "OAuth2 Auth Configuration Configure Action action Action: getToken, refresh, or startFlow"
  }
] satisfies DocsSearchIndexItem[];
