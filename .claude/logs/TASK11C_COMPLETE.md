# Task 11C — Notification Service Migration: COMPLETE

**Completed:** 2026-06-11  
**Branch:** master  
**Service:** `services/notification-service` (port 3005, internal 127.0.0.1 only)  
**Related:** TASK11B_COMPLETE.md

---

## Summary

Full extraction of all notification delivery (email, in-app, webhook) from the worker monolith to `services/notification-service`. Migrated across 4 phases with canary-flagged delegation, zero changes to execution flow, and worker fallbacks at every phase.

---

## Phase completion status

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Scaffold service, stub routes, deploy artifacts | ✅ Complete |
| 2 | SES email extraction + worker canary delegation | ✅ Complete |
| 3 | In-app notifications — DB + Redis pub | ✅ Complete |
| 4 | Webhook delivery — SSRF guard, 3× backoff, 256KB limit | ✅ Code complete — ops gates pending |

---

## Phase 1 changes

**New files:**
- `services/notification-service/` — full Express scaffold on port 3005
- `services/notification-service/src/index.ts` — health probes, auth middleware, stub routes
- `services/notification-service/src/middleware/auth.ts` — `x-service-key` auth
- `services/notification-service/src/middleware/request-id.ts` — UUID request IDs
- `services/notification-service/src/env-loader.ts` — dotenv bootstrap
- `worker/src/services/notification-service-client.ts` — worker client (all return null in Phase 1)
- `scripts/deploy-notification-service.sh` — EC2 deploy script
- `scripts/ctrlchecks-notification-service.service` — systemd unit (MemoryMax=512M)
- `.github/workflows/deploy-notification-service.yml` — GitHub Actions deploy workflow
- `docs/engineering/notification-service-contract.md` v0.1
- `worker/.env.example` — `NOTIFICATION_SERVICE_ENABLED`, `_URL`, `_KEY`, `_CANARY_PERCENT`

---

## Phase 2 changes

**New files:**
- `services/notification-service/src/lib/ses.ts` — lazy SES client; `getFromEmail()`, `sendRaw()`
- `services/notification-service/src/lib/templates.ts` — `execution_completed`, `execution_failed`, `welcome` templates; HTML escaping via `esc()`
- `services/notification-service/src/__tests__/notifications.test.ts` — 14 tests for email routes

**Modified files:**
- `services/notification-service/src/routes/notifications.ts` — real `POST /email` and `POST /send channel=email` handlers
- `services/notification-service/src/index.ts` — `/health/ready` reports `ses: 'ok'|'skip'`
- `worker/src/services/notifications/email-service.ts` — canary delegation for `sendExecutionCompleted` + `sendExecutionFailed` via `sendEmailRemote()`; `sendWelcomeEmail` always local (no userId)
- `worker/src/services/notifications/__tests__/email-service.test.ts` — 6 canary tests added
- Contract v0.2

**Key design:**
- Worker resolves user email before calling service (no DB in Phase 2 service)
- `status: 'suppressed'` returned (200) when `EXECUTION_EMAIL_NOTIFICATIONS=false` — worker treats non-null as success
- `sendWelcomeEmail` takes email address directly — no userId for canary routing → always local

---

## Phase 3 changes

**New files:**
- `services/notification-service/src/lib/db.ts` — pg Pool; `checkDb()` for health probe
- `services/notification-service/src/lib/redis-pub.ts` — ioredis publisher; channel `ntf:<userId>`; fully non-fatal
- `services/notification-service/src/lib/notifications-repo.ts` — `insert()`, `listByUser()`, `markRead()`; Redis publish on insert
- `worker/src/services/in-app-service.ts` — `sendInAppExecutionCompleted()` + `sendInAppExecutionFailed()`; same FNV-1a canary
- `worker/prisma/migrations/0007_notifications_table.sql` — `notifications` table matching frontend schema
- `services/notification-service/src/__tests__/in-app.test.ts` — 14 tests
- `worker/src/services/notifications/__tests__/in-app-service.test.ts` — 7 tests

**Modified files:**
- Routes: `POST /in-app`, `GET /notifications`, `PATCH /:id/read` — real handlers; `POST /send channel=in_app` dispatches inline
- `services/notification-service/src/index.ts` — `/health/ready` async DB ping; startup log for DB+Redis
- `worker/src/services/execution-job-runner.ts` — step 6 fires in-app alongside email (fire-and-forget)
- `worker/src/services/notification-service-client.ts` — `sendInAppRemote` payload updated: `{ title, message, type, link?, metadata? }`
- `services/notification-service/package.json` — `pg`, `ioredis`, `@types/pg` added
- Contract v0.3

**Key design:**
- Frontend `Notifications.tsx` already reads from the `notifications` table via `awsClient` — no frontend changes needed
- Redis pub is fire-and-forget; worker subscriber (WebSocket bridge) is optional/deferred
- WebSocket server stays on worker permanently

---

## Phase 4 changes

**New files:**
- `services/notification-service/src/lib/webhook-deliver.ts` — `deliver()` with SSRF guard, 256KB limit, 3× backoff, 5s timeout per attempt
- `worker/src/services/webhook-notification-service.ts` — `sendWebhookExecutionCompleted()` + `sendWebhookExecutionFailed()`; no-op until per-user URL config exists
- `services/notification-service/src/__tests__/webhook-deliver.test.ts` — 18 tests (SSRF + retry + limit)
- `services/notification-service/src/__tests__/webhook-routes.test.ts` — 9 tests
- `worker/src/services/__tests__/webhook-notification-service.test.ts` — 7 tests

**Modified files:**
- Routes: `POST /webhook` — real handler; `POST /send channel=webhook` dispatches inline; unknown channel → 400
- `worker/src/services/notification-service-client.ts` — `sendWebhookRemote()` added
- Contract v0.4

**Key design:**
- SSRF guard rejects HTTP (only HTTPS allowed), 127.x, 10.x, 172.16-31.x, 192.168.x, 169.254.x, ::1/loopback IPv6, ULA (fc00::/7)
- IPv6 bracket-stripping applied before regex checks (Node.js URL may preserve brackets in `hostname`)
- 4xx from destination = permanent failure (no retry); 5xx + network errors = retry
- Slack/Discord workflow nodes stay in the node executor — NOT moved

---

## Test counts (Phase 4 final)

| Suite | Tests |
|-------|-------|
| notification-service `webhook-deliver.test.ts` | 18 |
| notification-service `webhook-routes.test.ts` | 9 |
| notification-service `in-app.test.ts` | 14 |
| notification-service `notifications.test.ts` | 14 |
| notification-service `health.test.ts` | 19 |
| worker `webhook-notification-service.test.ts` | 7 |
| worker `in-app-service.test.ts` | 7 |
| worker `email-service.test.ts` | 19 |
| **Total (11C)** | **107** |

---

## Permanent constraints (do not remove)

- Do NOT move the WebSocket server (`/ws/chat`, `/ws/executions`) — stays on worker permanently
- Do NOT move Slack/Discord workflow nodes — they run in the node executor
- Do NOT block execution flow waiting for notification delivery — fire-and-forget only
- Do NOT expose DATABASE_URL or AWS credentials to the frontend

---

## Ops activation sequence

### Phase 4 activate (after Phase 3 at CANARY=100 for 1 week)

```bash
# 1. Run notifications table migration (if not already done in Phase 3)
psql $DATABASE_URL -f worker/prisma/migrations/0007_notifications_table.sql

# 2. Deploy notification-service with Phase 4 build
bash scripts/deploy-notification-service.sh

# 3. No canary change needed for webhook — wired when per-user URL config lands

# 4. Verify health
curl http://localhost:3005/health/ready
# Expected: { "checks": { "db": "ok", "ses": "ok" } }
```

### Rollback (any phase — instant)

```bash
sed -i 's/^NOTIFICATION_SERVICE_ENABLED=.*/NOTIFICATION_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
# All notifications revert to worker email-service.ts immediately
```

---

## Next tracks

| Track | Description |
|-------|-------------|
| **11D** | Trigger service :3006 |
| **11A Phase 6** | Executor fully in engine |
| **Task 12** | Observability (structured logging, Sentry, dashboards) |
| **11B ops** | OAuth + vault soaks (parallel) |
