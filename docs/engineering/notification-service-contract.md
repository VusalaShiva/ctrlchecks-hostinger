# Notification Service — Service Contract

**Version:** 0.4 (Phase 4 — Webhook delivery — COMPLETE)  
**Port:** 3005 (127.0.0.1 only — internal to the EC2 host)  
**Auth:** `x-service-key` header (worker→service) + `Authorization: Bearer` (Cognito JWT — Phase 2)

---

## Overview

The notification service owns all notification delivery (email, in-app, webhook) currently handled inline by `worker/src/services/notifications/email-service.ts`.

Migration follows the same incremental pattern as the credential service: feature-flagged canary with worker fallbacks at every phase.

**Current state (Phase 4 — COMPLETE):** All four notification channels are live. Email (Phase 2) and in-app (Phase 3) remain active. Webhook delivery is now real: `POST /notifications/webhook` delivers HTTP POST with 3× exponential backoff, SSRF guard, and 256KB payload limit. Worker `webhook-notification-service.ts` wraps `sendWebhookRemote()` — wired to execution events when a user-configured URL is present. Slack/Discord workflow nodes stay in the executor and are unaffected.

---

## Endpoints

### Public (no auth)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health/live` | Liveness probe — process alive |
| `GET` | `/health/ready` | Readiness probe (Phase 1: always ready — no DB) |
| `GET` | `/health` | Legacy alias |

### Protected

| Method | Path | Status | Description |
|--------|------|--------|-------------|
| `POST` | `/notifications/email` | `200/400/503` | Email delivery via AWS SES (Phase 2 live) |
| `POST` | `/notifications/send` | `200/400/501/503` | Generic dispatch — channel=email live; others 501 |
| `POST` | `/notifications/in-app` | `200/400/401/503` | In-app notification — writes to DB + publishes Redis (Phase 3 live) |
| `POST` | `/notifications/webhook` | `200/400/502` | Outbound webhook — SSRF guard, 3× backoff, 256KB limit (Phase 4 live) |
| `GET` | `/notifications` | `200/401/503` | List recent notifications for user (Phase 3 live) |
| `PATCH` | `/notifications/:id/read` | `200/401/404/503` | Mark notification as read (Phase 3 live) |

---

## Auth model

```
Worker (internal)  →  x-service-key: <NOTIFICATION_SERVICE_KEY>
Browser (user)     →  Authorization: Bearer <Cognito JWT>
Health probes      →  no auth
```

---

## Feature flags

| Variable | Where | Default | Meaning |
|----------|-------|---------|---------|
| `NOTIFICATION_SERVICE_ENABLED` | worker `.env` | `false` | Activates worker→service delegation |
| `NOTIFICATION_SERVICE_CANARY_PERCENT` | worker `.env` | `0` | % of userIds routed to service (FNV-1a hash) |
| `NOTIFICATION_SERVICE_URL` | worker `.env` | `http://localhost:3005` | Override if service on different host/port |
| `NOTIFICATION_SERVICE_KEY` | both `.env` files | `""` | Shared secret for worker→service auth |
| `COGNITO_AUTH_ENABLED` | notification-service `.env` | `false` | Enables Cognito JWT verification on user routes |
| `DATABASE_URL` | notification-service `.env` | `""` | RDS connection — required for in-app notifications |
| `REDIS_URL` | notification-service `.env` | `""` | Redis — required for pub/sub on in-app insert |
| `NOTIFICATION_REDIS_CHANNEL_PREFIX` | notification-service `.env` | `ntf:` | Prefix for per-user Redis channels |

---

## Migration phases

### Phase 1 — Scaffold (current) ✅

- `services/notification-service/` on port 3005
- All `/notifications/*` return `501 NOTIFICATION_SERVICE_STUB`
- `worker/src/services/notification-service-client.ts` — disabled by default, no wiring
- Deploy artifacts: `deploy-notification-service.sh`, systemd unit, GitHub Actions workflow
- Worker email-service.ts untouched

**Activate:** nothing to activate — scaffold is not wired into any worker call path.

### Phase 2 — Email extraction ✅ (current)

Prerequisites: Phase 1 running for 1+ week with clean health probes.

- `POST /notifications/email` — receives `{templateId, data, to}`, renders template, sends via AWS SES
- `POST /notifications/send` — generic dispatch; `channel=email` live; `channel=in_app/webhook` → 501
- `/health/ready` — reports `ses: 'ok'|'skip'` based on `SES_FROM_EMAIL` env var
- Templates live in `src/lib/templates.ts`: `execution_completed`, `execution_failed`, `welcome`
- Worker `email-service.ts` canary delegation:
  - `sendExecutionCompleted()` + `sendExecutionFailed()` → `sendEmailRemote()` when `shouldUseNotificationService(userId)` → fallback to local SES on null
  - `sendWelcomeEmail()` — always local (no userId for canary routing)
- Worker resolves user email before calling service (Phase 2 — no DB in notification-service yet)
- Guards preserved end-to-end: `EXECUTION_EMAIL_NOTIFICATIONS=true` + `SES_FROM_EMAIL` required
- **Activate:** `NOTIFICATION_SERVICE_ENABLED=true`, `NOTIFICATION_SERVICE_CANARY_PERCENT=50` (staging) → `100` (full)

### Phase 3 — In-app / WebSocket notifications ✅ (current)

Prerequisites: Phase 2 stable for 1 week.

- `POST /notifications/in-app` — validates `title` + `message`; inserts into `notifications` table; publishes row to Redis `ntf:<userId>` channel
- `GET /notifications` — lists by `user_id`; optional `?unread_only=true`
- `PATCH /notifications/:id/read` — marks row read; scoped to `x-user-id` (no cross-user access)
- `/health/ready` — now reports `db: 'ok'|'skip'|'error'` based on DB ping
- DB migration: `worker/prisma/migrations/0007_notifications_table.sql`
- Worker `in-app-service.ts`: `sendInAppExecutionCompleted()` + `sendInAppExecutionFailed()` — same canary as email
- `execution-job-runner.ts` step 6 — fires in-app alongside email; fire-and-forget, never blocks
- `sendInAppRemote()` payload updated: `{ title, message, type, link?, metadata? }`
- **Do NOT** move the WebSocket server itself (stays on worker permanently)
- Redis subscriber (worker→WebSocket bridge) is optional and deferred; pub side is live
- **Activate:** run migration 0007; deploy notification-service with `DATABASE_URL` + `REDIS_URL`; extend canary

### Phase 4 — Webhook delivery ✅ (current — COMPLETE)

Prerequisites: Phase 3 stable for 1 week.

- `POST /notifications/webhook` — delivers HTTP POST to user-configured URL
  - SSRF guard: HTTPS only; blocks all private/loopback/link-local ranges (IPv4 + IPv6)
  - 256KB payload limit (serialized JSON); rejected before any network call
  - 3 attempts with exponential backoff (0ms → 1s → 2s)
  - 5s timeout per attempt; 4xx = permanent failure (no retry); 5xx + network errors = retried
  - Returns `{ notificationId, status, channel, attempts, httpStatus }`; `502` when all attempts fail
- `POST /send channel=webhook` — dispatches inline to webhook logic
- `sendWebhookRemote()` added to worker notification-service-client
- Worker `webhook-notification-service.ts`: `sendWebhookExecutionCompleted()` + `sendWebhookExecutionFailed()`
  - No-ops until per-user webhook URL config is added to the product
  - Caller resolves the URL; service handles SSRF + retry
- Slack/Discord workflow nodes stay in the node executor — NOT affected
- **Activate:** extend canary; when product adds per-user webhook URL config, import from `webhook-notification-service.ts`

---

## Notification payload contract

### POST /notifications/email

```json
{
  "templateId": "execution_completed",
  "data": {
    "workflowName": "My Workflow",
    "executionId": "exec-abc-123"
  },
  "to": "user@example.com"
}
```

`to` is required in Phase 2 — the worker resolves the user email address before calling the service. Phase 3 will move email resolution into the service (DB lookup on `x-user-id`).

**Response:**
```json
{ "notificationId": "<uuid>", "status": "sent" | "suppressed", "channel": "email" }
```

Status `suppressed` is returned (not an error) when `EXECUTION_EMAIL_NOTIFICATIONS=false` for execution templates — the worker treats non-null as success and does not fall back to local SES.

**Template IDs:**
- `execution_completed` — maps to `sendExecutionCompleted()` in worker
- `execution_failed` — maps to `sendExecutionFailed()`
- `welcome` — maps to `sendWelcomeEmail()`

### POST /notifications/in-app (Phase 3)

Called by the worker with `x-user-id` header set to the user's ID.

```json
{
  "title": "Workflow \"My WF\" completed",
  "message": "Execution exec-abc-123 completed successfully.",
  "type": "execution_completed",
  "link": "/executions/exec-abc-123"
}
```

**Response:**
```json
{ "notificationId": "<uuid>", "status": "sent", "channel": "in_app" }
```

Returns `503 DB_UNAVAILABLE` if `DATABASE_URL` is not configured or the DB is unreachable.

### GET /notifications (Phase 3)

Query params: `?unread_only=true` (optional)

**Response:**
```json
{ "notifications": [ /* NotificationRow[] */ ], "count": 1 }
```

### PATCH /notifications/:id/read (Phase 3)

**Response:** `{ "id": "<uuid>", "read": true }` or `404 NOTIFICATION_NOT_FOUND`

### POST /notifications/webhook (Phase 4)

```json
{
  "url": "https://your-server.example.com/webhook",
  "event": "execution.completed",
  "payload": {
    "workflowName": "My Workflow",
    "executionId": "exec-abc-123",
    "status": "success"
  }
}
```

The service sends a `POST` to `url` with body:
```json
{ "event": "execution.completed", "payload": { ... }, "timestamp": "<ISO-8601>" }
```

**Response (success):**
```json
{ "notificationId": "<uuid>", "status": "sent", "channel": "webhook", "attempts": 1, "httpStatus": 200 }
```

**Response (all attempts failed):** `502 WEBHOOK_DELIVERY_FAILED` with `{ attempts, error }`

**SSRF-blocked URLs return:** `400 SSRF_BLOCKED`

### POST /notifications/send (Phase 2 target)

```json
{
  "type": "execution_completed",
  "channel": "email",
  "userId": "u-xyz",
  "data": { "workflowName": "My Workflow", "executionId": "exec-abc-123" }
}
```

---

## Observability

```bash
# Logs
sudo journalctl -u ctrlchecks-notification-service -f

# Health check
curl http://localhost:3005/health/live
curl http://localhost:3005/health/ready
```

---

## First-deploy checklist

```bash
# On the EC2 host (one-time setup)
sudo mkdir -p /opt/ctrlchecks-notification-service
sudo chown -R ubuntu:ubuntu /opt/ctrlchecks-notification-service
sudo cp /tmp/ctrlchecks-notification-service.service \
        /etc/systemd/system/ctrlchecks-notification-service.service
sudo systemctl daemon-reload
sudo systemctl enable ctrlchecks-notification-service
# Create .env from .env.example
# Run: sudo systemctl start ctrlchecks-notification-service
# Verify: curl http://localhost:3005/health/live
```

## Rollback

```bash
# Instant rollback at any phase — no redeploy of notification-service needed
sed -i 's/^NOTIFICATION_SERVICE_ENABLED=.*/NOTIFICATION_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
# All notifications revert to worker email-service.ts immediately
```

---

## Do NOT (permanent constraints)

- Do not move the WebSocket server (`/ws/chat`, `/ws/executions`) — stays on worker permanently
- Do not block execution flow waiting for notification delivery — fire-and-forget only
- Do not move execution-auth or runtime credential injection to notification-service

---

## Related files

- `services/notification-service/src/` — service source
- `services/notification-service/src/lib/db.ts` — pg Pool (Phase 3)
- `services/notification-service/src/lib/notifications-repo.ts` — CRUD + Redis pub (Phase 3)
- `services/notification-service/src/lib/redis-pub.ts` — Redis publisher (Phase 3)
- `worker/src/services/notification-service-client.ts` — worker client
- `worker/src/services/notifications/email-service.ts` — email delegation (Phase 2)
- `worker/src/services/in-app-service.ts` — in-app delegation (Phase 3)
- `worker/prisma/migrations/0007_notifications_table.sql` — notifications table
- `worker/src/services/webhook-notification-service.ts` — webhook delegation (Phase 4)
- `docs/engineering/credential-service-contract.md` — precedent / pattern reference
