# Task 11B — Credential Service Migration: COMPLETE

**Completed:** 2026-06-11  
**Branch:** master  
**Related:** TASK11A_PHASE4_SOAK.md, TASK11A_PHASE5_SOAK.md

---

## Summary

Full migration of credential storage, OAuth flows, and CRUD operations from the worker monolith to `services/credential-service` (port 3004). Migrated incrementally across 4 phases with zero downtime; worker handlers remain as fallbacks controlled by env flags.

---

## Phase completion status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Scaffold service, stub routes, deploy artifacts | ✅ Complete |
| 2 | Real CRUD + 50% canary + listConnections delegation | ✅ Complete |
| 3 | OAuth proxy for top-9 providers | ✅ Complete |
| 4 | Full OAuth (all 24) + full CRUD delegation + vault write retirement gate | ✅ Code complete — ops gates pending |

---

## Phase 4 changes (11B-4.x)

### 11B-4.1 — OAuth extension

**Files changed:**
- `services/credential-service/src/oauth/credential-type-registry.ts` — extended from 9 to 26 entries (24 from worker registry + `whatsapp_oauth2` custom)
- `services/credential-service/src/routes/oauth.ts` — added Instagram, WhatsApp, Zoho dedicated routes

**New providers added to registry:**
`microsoft_oauth2`, `zoom_oauth2`, `gitlab_oauth2`, `asana_oauth2`, `clickup_oauth2`, `linear_oauth2`, `zoho_oauth2`, `mailchimp_oauth2`, `paypal_oauth2`, `quickbooks_oauth2`, `xero_oauth2`, `shopify_oauth2`, `dropbox_oauth2`, `youtube_oauth2`, `instagram_oauth2`, `whatsapp_oauth2`

**New dedicated routes:**
- `GET /oauth/instagram/authorize` + `/oauth/instagram/callback`
- `GET /oauth/whatsapp/authorize` + `/oauth/whatsapp/callback`
- `GET /oauth/zoho/authorize` + `/oauth/zoho/callback`

Generic providers (Microsoft, Zoom, GitLab, Asana, ClickUp, Linear, Mailchimp, PayPal, QuickBooks, Xero, Shopify, Dropbox, YouTube) handled via existing `/oauth/generic/*` routes.

**Worker proxy changes** (`worker/src/middleware/credential-oauth-proxy.ts`):
- `getMigratedProviders()` now returns `string[] | '*'`
- `isOAuthProviderMigrated()` returns `true` for all providers when list is `'*'`
- `shouldProxyGenericCallbacks()` — only when `PROVIDERS=*`
- `CRED_TYPE_TO_PROVIDER` extended to 26 entries
- Generic callback proxy: only proxied when `shouldProxyGenericCallbacks()` is true

**Worker index.ts changes:**
- Instagram proxy block (before existing handler)
- WhatsApp proxy block (before existing handler)
- New Zoho proxy + routes
- Generic callback routes now include `proxyToCredentialService` middleware

### 11B-4.2 — Full CRUD delegation

**Files changed:**
- `services/credential-service/src/routes/connections.ts` — added `PATCH /:id`, `POST /:id/test`, replaced `DELETE /:provider` with `DELETE /:idOrProvider` (UUID regex routing)
- `worker/src/services/credential-service-client.ts` — full rewrite with shared fetch helpers + 6 new exported functions
- `worker/src/api/credential-connections.ts` — all 4 CRUD handlers now check canary and delegate

**New credential-service-client exports:**
```typescript
createConnectionRemote(userId, data)        → ConnectionRecord | null
getConnectionByProviderRemote(userId, prov) → ConnectionRecord | null
updateConnectionRemote(userId, id, data)    → ConnectionRecord | null
deleteConnectionByIdRemote(userId, id)      → boolean  (404 = true, idempotent)
deleteConnectionByProviderRemote(userId, p) → boolean
testConnectionRemote(userId, id)            → {success, connectionId, status, expired, testedAt} | null
```

**Key design decisions:**
- UUID_RE regex in `DELETE /:idOrProvider` — UUID → delete by id; string → delete by provider name
- `serviceDelete` treats 404 as `true` (idempotent delete)
- All CRUD handlers: `remote !== null` → use service; null → log warn + fall through to local
- `createConnectionRemote` / `updateConnectionRemote` / `testConnectionRemote` return null on any non-2xx (fallback to local)

### 11B-4.3 — Env vars + vault write retirement gate

**Files changed:**
- `worker/.env.example` — added `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=false`; updated `OAUTH_PROVIDERS` comment for `"*"`
- `services/credential-service/.env.example` — added Phase 4 section with all new provider credentials + Instagram/WhatsApp/Zoho redirect URIs

**`CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED` flag:**
- Default: `false` — worker vault writes still active as fallback
- Set `true` after 2-week soak at `CANARY=100` with zero regressions
- Workers handlers remain but writes become no-ops

### 11B-4.4 — Tests

**File:** `worker/src/services/__tests__/credential-service-client.test.ts`

Added 22 new tests (34 total) across 4 describe blocks:
- "CRUD methods disabled" — 4 tests (null/false when flag off)
- "CRUD methods ENABLED=true, CANARY=100" — 18+ tests covering all 6 new methods, including 404-idempotency, network error fallback, and ECONNREFUSED

---

## Ops activation sequence

### Step 1 — Activate Phase 4 OAuth (after Phase 3 stable ≥1 week)

```bash
# worker .env
CREDENTIAL_SERVICE_OAUTH_ENABLED=true
CREDENTIAL_SERVICE_OAUTH_PROVIDERS=*
```

### Step 2 — Full CRUD delegation (after CANARY=100 stable ≥1 week)

```bash
# worker .env
CREDENTIAL_SERVICE_CANARY_PERCENT=100
```

### Step 3 — Retire worker vault writes (after Step 2 stable ≥2 weeks)

```bash
# worker .env
CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=true
```

### Instant rollback (any step)

```bash
CREDENTIAL_SERVICE_ENABLED=false
CREDENTIAL_SERVICE_OAUTH_ENABLED=false
sudo systemctl restart ctrlchecks-worker
```

---

## Do NOT

- Remove worker OAuth handlers (they are permanent fallbacks for all phases)
- Change redirect URIs in provider consoles (worker URL stays public; service is internal)
- Move GitHub `start-login` flow (Cognito identity — not credential)
- Move execution-auth / runtime credential injection

---

## Related docs

- `docs/engineering/credential-service-contract.md` — v0.4 full contract
- `docs/engineering/oauth-redirect-uri-inventory.md` — Phase 4 all providers marked
- `.claude/logs/TASK11A_PHASE4_SOAK.md` — execution engine Phase 4 soak (separate)
