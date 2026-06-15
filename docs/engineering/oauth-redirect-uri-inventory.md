# OAuth Redirect URI Inventory

Public redirect URIs **stay on the worker** — no changes to provider app settings required. The worker proxies OAuth start/callback to the credential-service when `CREDENTIAL_SERVICE_OAUTH_ENABLED=true`.

---

## Operator checklist

Before activating Phase 4 (`PROVIDERS=*`):

1. Confirm Phase 3 top-9 has been stable for 1+ week.
2. Confirm `CREDENTIAL_SERVICE_CANARY_PERCENT=100` has been running for 1+ week.
3. Copy all Phase 4 OAuth env vars from worker `.env` to credential-service `.env` (same values, different callback paths).
4. Start credential-service: `./scripts/deploy-credential-service.sh`
5. Verify `/health/ready` → `200` on credential-service.
6. Set `CREDENTIAL_SERVICE_OAUTH_PROVIDERS=*` in worker `.env`; restart worker.
7. Smoke test each provider in the Connections UI — especially Instagram, WhatsApp, Zoho.
8. Monitor `journalctl -u ctrlchecks-credential-service` — confirm "token exchange" lines; no secret leaks.
9. After 2-week soak with zero regressions: set `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=true`.

---

## Redirect URI table

| Provider | credentialTypeId | Worker env var | Effective URL (dev) | CS migrated | Phase |
|----------|-----------------|----------------|---------------------|-------------|-------|
| Google | `google_oauth2` | `GOOGLE_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/google/callback` | ✅ Yes | 3 |
| GitHub (connect) | `github_oauth2` | `GITHUB_OAUTH_REDIRECT_URI` | `http://127.0.0.1:3001/api/oauth/github/callback` | ✅ Yes | 3 |
| GitHub (login) | N/A | N/A | stays on worker | ❌ Stays on worker | — |
| LinkedIn | `linkedin_oauth2` | `LINKEDIN_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/linkedin/callback` | ✅ Yes | 3 |
| Notion | `notion_oauth2` | `NOTION_OAUTH_REDIRECT_URI` | `http://localhost:8080/auth/notion/callback` | ✅ Yes | 3 |
| Twitter/X | `twitter_oauth2` | `TWITTER_OAUTH_REDIRECT_URI` | `http://localhost:8080/auth/twitter/callback` | ✅ Yes | 3 |
| Facebook | `facebook_oauth2` | `FACEBOOK_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/facebook/callback` | ✅ Yes | 3 |
| Slack | `slack_oauth2` | `SLACK_OAUTH_REDIRECT_URI` | (see credential-service .env.example) | ✅ Yes (generic) | 3 |
| HubSpot | `hubspot_oauth2` | `HUBSPOT_OAUTH_REDIRECT_URI` | (see credential-service .env.example) | ✅ Yes (generic) | 3 |
| Salesforce | `salesforce_oauth2` | `SALESFORCE_OAUTH_REDIRECT_URI` | `http://localhost:8080/auth/salesforce/callback` | ✅ Yes | 3 |
| Instagram | `instagram_oauth2` | `INSTAGRAM_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/instagram/callback` | ✅ Yes (dedicated) | 4 |
| WhatsApp | `whatsapp_oauth2` | `WHATSAPP_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/whatsapp/callback` | ✅ Yes (dedicated) | 4 |
| Zoho CRM | `zoho_oauth2` | `ZOHO_OAUTH_REDIRECT_URI` | `http://localhost:3001/api/oauth/zoho/callback` | ✅ Yes (dedicated) | 4 |
| Microsoft | `microsoft_oauth2` | `GENERIC_MICROSOFT_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Zoom | `zoom_oauth2` | `GENERIC_ZOOM_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| GitLab | `gitlab_oauth2` | `GENERIC_GITLAB_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Asana | `asana_oauth2` | `GENERIC_ASANA_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| ClickUp | `clickup_oauth2` | `GENERIC_CLICKUP_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Linear | `linear_oauth2` | `GENERIC_LINEAR_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Mailchimp | `mailchimp_oauth2` | `GENERIC_MAILCHIMP_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| PayPal | `paypal_oauth2` | `GENERIC_PAYPAL_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| QuickBooks | `quickbooks_oauth2` | `GENERIC_QUICKBOOKS_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Xero | `xero_oauth2` | `GENERIC_XERO_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Shopify | `shopify_oauth2` | `GENERIC_SHOPIFY_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Dropbox | `dropbox_oauth2` | `GENERIC_DROPBOX_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| YouTube | `youtube_oauth2` | `GENERIC_YOUTUBE_OAUTH_REDIRECT_URI` | `${workerBase}/api/credential-connections/oauth/callback` | ✅ Yes (generic) | 4 |
| Stripe | N/A | N/A | API key only — no OAuth | ❌ N/A | — |

**Total OAuth2 types migrated:** 25 (24 from worker registry + `whatsapp_oauth2` custom Meta flow)

---

## How proxy routing works (Phase 4)

```
Browser → Worker public URL (no change to provider consoles)
                │
                ├─ CREDENTIAL_SERVICE_OAUTH_ENABLED=false
                │   → Local handler runs (worker)
                │
                └─ CREDENTIAL_SERVICE_OAUTH_ENABLED=true
                    ├─ Dedicated provider (google/linkedin/instagram/zoho/etc.):
                    │   Route-level proxy → credential-service:3004/oauth/<provider>/...
                    │   On service down → next() → local handler (fallback)
                    │
                    ├─ Generic start (slack/hubspot/microsoft/zoom/etc.):
                    │   Handler-level proxy → credential-service:3004/oauth/generic/start
                    │   (only when credentialTypeId is a migrated provider)
                    │   On service down → next() → local oauthService (fallback)
                    │
                    └─ Generic callback:
                        PROVIDERS=* → proxy to credential-service:3004/oauth/generic/callback
                        PROVIDERS=<list> → always runs on worker (provider unknown at callback time)
```

---

## Rollback

```bash
# Instant rollback — no redeploy needed
sed -i 's/^CREDENTIAL_SERVICE_OAUTH_ENABLED=.*/CREDENTIAL_SERVICE_OAUTH_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
# All OAuth reverts to local handlers immediately
```

---

## Phase 4 activation summary

```bash
# worker .env
CREDENTIAL_SERVICE_OAUTH_ENABLED=true
CREDENTIAL_SERVICE_OAUTH_PROVIDERS=*           # all 25 OAuth2 providers
CREDENTIAL_SERVICE_CANARY_PERCENT=100          # full CRUD delegation
CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=false # set true after 2-week soak
```
