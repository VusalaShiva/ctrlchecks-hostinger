# Credential Service — Service Contract

**Version:** 0.4 (Phase 4 — Full OAuth + CRUD delegation)  
**Port:** 3004 (127.0.0.1 only — internal to the EC2 host)  
**Auth:** `x-service-key` header (worker→service) + `Authorization: Bearer` (Cognito JWT — Phase 2)

---

## Overview

The credential service owns all user credential storage, retrieval, and OAuth flows that previously lived in the worker. Migration was incremental across four phases to keep worker downtime at zero.

**Current state (Phase 4):** full OAuth (all 24 providers), full CRUD delegation (create/update/delete/test), canary-gated CRUD writes. Worker handlers remain as fallbacks; proxy/canary flags control activation.

---

## Endpoints

### Public (no auth)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health/live` | Liveness probe — process alive |
| `GET` | `/health/ready` | Readiness probe — DB/vault checks |
| `GET` | `/health` | Legacy alias |

### Protected (service-key or Cognito JWT)

| Method | Path | Status | Description |
|--------|------|--------|-------------|
| `GET` | `/connections` | `200` | List all active connections for user |
| `POST` | `/connections` | `201` | Store a new credential (encrypted at rest) |
| `GET` | `/connections/:provider` | `200/404` | Get most recent active connection by provider |
| `DELETE` | `/connections/:idOrProvider` | `204` | Remove connection by UUID or provider name |
| `PATCH` | `/connections/:id` | `200/404` | Update connection by UUID (name, credentials, metadata) |
| `POST` | `/connections/:id/test` | `200/404` | Test connection liveness by UUID |

### OAuth routes — Phase 3 top-9

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/oauth/google/start` | Google OAuth start |
| `GET` | `/oauth/google/callback` | Google callback |
| `GET` | `/oauth/github/start` | GitHub connect flow (start-login stays on worker) |
| `GET` | `/oauth/github/callback` | GitHub callback |
| `GET` | `/oauth/linkedin/start` | LinkedIn start |
| `GET` | `/oauth/linkedin/callback` | LinkedIn callback |
| `GET` | `/oauth/notion/authorize` | Notion start |
| `GET` | `/oauth/notion/callback` | Notion callback |
| `GET` | `/oauth/twitter/authorize` | Twitter/X start |
| `GET` | `/oauth/twitter/callback` | Twitter/X callback |
| `GET` | `/oauth/facebook/start` | Facebook start |
| `GET` | `/oauth/facebook/callback` | Facebook callback |
| `GET` | `/oauth/salesforce/authorize` | Salesforce start |
| `GET` | `/oauth/salesforce/callback` | Salesforce callback |

### OAuth routes — Phase 4 additions

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/oauth/instagram/authorize` | Instagram start (Meta App OAuth) |
| `GET` | `/oauth/instagram/callback` | Instagram callback |
| `GET` | `/oauth/whatsapp/authorize` | WhatsApp start (Meta App OAuth) |
| `GET` | `/oauth/whatsapp/callback` | WhatsApp callback |
| `GET` | `/oauth/zoho/authorize` | Zoho CRM start |
| `GET` | `/oauth/zoho/callback` | Zoho callback |
| `GET\|POST` | `/oauth/generic/start` | Generic start (all other OAuth2 providers) |
| `GET\|POST` | `/oauth/generic/callback` | Generic callback |

**Generic route handles:** Microsoft, Zoom, GitLab, Asana, ClickUp, Linear, Mailchimp, PayPal, QuickBooks, Xero, Shopify, Dropbox, YouTube.

**Stripe:** API key only — no OAuth routes.  
**GitHub login:** `start-login` (Cognito sign-in) stays on worker permanently.

OAuth provider inventory: 24 OAuth2 types. All migrated in Phase 4.  
See `docs/engineering/oauth-redirect-uri-inventory.md` for full redirect URI table.

---

## Auth model

```
Worker (internal)  →  x-service-key: <CREDENTIAL_SERVICE_KEY>
Browser (user)     →  Authorization: Bearer <Cognito JWT>
Health probes      →  no auth
```

---

## Feature flags

| Variable | Where | Default | Meaning |
|----------|-------|---------|---------|
| `CREDENTIAL_SERVICE_ENABLED` | worker `.env` | `false` | Activates worker→service CRUD delegation |
| `CREDENTIAL_SERVICE_CANARY_PERCENT` | worker `.env` | `0` | % of userIds routed to service for CRUD (FNV-1a hash) |
| `CREDENTIAL_ENCRYPTION_KEY` | credential-service `.env` | dev default | Must match worker's key — same value |
| `COGNITO_AUTH_ENABLED` | credential-service `.env` | `false` | Enables Cognito JWT verification |
| `CREDENTIAL_SERVICE_KEY` | both `.env` files | `""` | Shared secret for worker→service auth |
| `CREDENTIAL_SERVICE_OAUTH_ENABLED` | worker `.env` | `false` | Activates OAuth proxy; `false` = all OAuth local |
| `CREDENTIAL_SERVICE_OAUTH_PROVIDERS` | worker `.env` | top-9 | Comma-separated migrated provider names or `*` for all |
| `PUBLIC_WORKER_URL` | credential-service `.env` | `http://localhost:3001` | Fallback base for redirect URI construction |
| `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED` | worker `.env` | `false` | After 2-week CRUD soak, retire worker vault writes |

---

## Migration phases

### Phase 1 — Scaffold ✅

- `services/credential-service/` created on port 3004
- All `/connections` routes returned `501 CREDENTIAL_SERVICE_STUB`
- Deploy artifacts: `deploy-credential-service.sh`, systemd unit, GitHub Actions workflow

### Phase 2 — Real CRUD + 50% canary ✅

- Real `/connections` CRUD: list, create, get-by-provider, delete-by-provider
- `/health/ready` — DB `SELECT 1` check
- Worker `listConnectionsHandler` — canary: remote hit → use service data; null → fall back to local vault
- **Activate:** `CREDENTIAL_SERVICE_CANARY_PERCENT=50` (staging) → `100` (full)

### Phase 3 — OAuth top-9 via worker proxy ✅

- Credential-service handles token exchange + connections upsert for top-9 providers
- Worker proxies start+callback via `credential-oauth-proxy.ts`
- On service down/timeout: proxy falls back to local worker handler automatically
- **Activate:**
  ```bash
  CREDENTIAL_SERVICE_OAUTH_ENABLED=true
  CREDENTIAL_SERVICE_OAUTH_PROVIDERS=google,github,linkedin,notion,twitter,facebook,slack,hubspot,salesforce
  ```

### Phase 4 — Full OAuth + CRUD delegation ✅ (current)

Prerequisites: Phase 3 top-9 stable for 1 week, Phase 2 at CANARY=100 for 1 week.

**OAuth extension (11B-4.1):**
- All 24 OAuth2 providers in credential-service registry
- Instagram, WhatsApp, Zoho: dedicated routes
- All generic providers: via `/oauth/generic/*` routes
- Generic callbacks now proxied when `PROVIDERS=*`
- **Activate:** `CREDENTIAL_SERVICE_OAUTH_PROVIDERS=*`

**CRUD delegation (11B-4.2):**
- Worker `createConnectionHandler`, `updateConnectionHandler`, `deleteConnectionHandler`, `testConnectionHandler` now check `shouldUseCredentialService(userId)` before calling local vault
- Credential-service routes: `PATCH /connections/:id`, `POST /connections/:id/test`, `DELETE /connections/:idOrProvider`
- **Activate:** `CREDENTIAL_SERVICE_CANARY_PERCENT=100`

**Vault write retirement (11B-4.3 — ops):**
- After 2-week soak at `CANARY=100` with zero regressions:
  - Set `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=true`
  - Worker vault write paths become no-ops; fallback path removed
- **Gate:** 2 weeks monitoring at `CANARY=100` before activating

---

## Observability

```bash
# Logs
sudo journalctl -u ctrlchecks-credential-service -f

# Health check
curl http://localhost:3004/health/live
curl http://localhost:3004/health/ready
```

---

## Rollback

```bash
# Instant rollback at any phase — no redeploy of credential-service needed
sed -i 's/^CREDENTIAL_SERVICE_ENABLED=.*/CREDENTIAL_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sed -i 's/^CREDENTIAL_SERVICE_OAUTH_ENABLED=.*/CREDENTIAL_SERVICE_OAUTH_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

---

## Related files

- `services/credential-service/src/` — service source
- `worker/src/services/credential-service-client.ts` — worker client (list + full CRUD)
- `worker/src/middleware/credential-oauth-proxy.ts` — transparent OAuth proxy
- `worker/src/api/credential-connections.ts` — CRUD handlers with canary wiring
- `docs/engineering/oauth-redirect-uri-inventory.md` — full redirect URI table
- `.claude/logs/TASK11B_COMPLETE.md` — task completion record
