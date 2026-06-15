# Trigger Service — Service Contract

**Version:** 0.3 (Phase 3 — Schedule dispatch)  
**Port:** 3006 (127.0.0.1 only — internal to the EC2 host)  
**Auth:** `x-service-key` header (worker→service) + `Authorization: Bearer` (Cognito JWT — Phase 3)

---

## Overview

The trigger service owns inbound trigger handling (webhook, form, chat, schedule) currently handled inline by worker route handlers. Public-facing URLs remain on the worker permanently — the trigger-service is an internal dispatch target, never exposed directly to the internet.

Migration follows the same incremental pattern as the credential service and notification service: feature-flagged canary with worker fallbacks at every phase.

**Current state (Phase 3):** Webhook, form, chat, and schedule handlers are all live. Worker canary delegation is wired for all four trigger types. The cron scheduler itself stays on the worker (Phase 4 moves it). `TRIGGER_SERVICE_ENABLED=false` by default — opt in per-workflowId via `TRIGGER_SERVICE_CANARY_PERCENT`.

---

## Public URLs (stay on worker — do NOT change)

These URLs are permanent worker routes. The trigger-service is an internal dispatch target reached via the worker canary delegation, never directly from the internet.

| Method | URL | Worker file |
|--------|-----|-------------|
| `POST` | `/api/webhook-trigger/:workflowId` | `worker/src/api/webhook-trigger.ts` |
| `GET` | `/api/webhook-trigger/:workflowId` | `worker/src/api/webhook-trigger.ts` |
| `GET` | `/api/form-trigger/:workflowId/:nodeId` | `worker/src/api/form-trigger.ts` |
| `POST` | `/api/form-trigger/:workflowId/:nodeId/submit` | `worker/src/api/form-trigger.ts` |
| `GET` | `/api/chat-trigger/:workflowId/:nodeId` | `worker/src/api/chat-trigger.ts` |
| `POST` | `/api/chat-trigger/:workflowId/:nodeId/message` | `worker/src/api/chat-trigger.ts` |

---

## Internal Endpoints

### Public (no auth)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health/live` | Liveness probe — process alive |
| `GET` | `/health/ready` | Readiness probe — reports `db: 'ok'|'skip'|'error'` |
| `GET` | `/health` | Legacy alias |

### Protected (x-service-key or Bearer)

| Method | Path | Status | Description |
|--------|------|--------|-------------|
| `POST` | `/triggers/webhook/:workflowId` | ✅ **Phase 2** | Webhook dispatch — validate + enqueue |
| `POST` | `/triggers/form/:workflowId/:nodeId/submit` | ✅ **Phase 2** | Form submission dispatch — validate + enqueue |
| `POST` | `/triggers/chat/:workflowId/:nodeId/message` | ✅ **Phase 2** | Chat message dispatch — validate + enqueue |
| `POST` | `/triggers/schedule/:workflowId` | ✅ **Phase 3** | Scheduled trigger dispatch — validate + enqueue |

---

## Auth model

```
Worker (internal)  →  x-service-key: <TRIGGER_SERVICE_KEY>
Health probes      →  no auth
Browser / public   →  public trigger URLs stay on worker (never reach trigger-service directly)
```

---

## Feature flags

| Variable | Where | Default | Meaning |
|----------|-------|---------|---------|
| `TRIGGER_SERVICE_ENABLED` | worker `.env` | `false` | Activates worker→service delegation |
| `TRIGGER_SERVICE_CANARY_PERCENT` | worker `.env` | `0` | % of workflowIds routed to service (FNV-1a hash) |
| `TRIGGER_SERVICE_URL` | worker `.env` | `http://localhost:3006` | Override if service on different host/port |
| `TRIGGER_SERVICE_KEY` | both `.env` files | `""` | Shared secret for worker→service auth |

**Canary key:** `fnv1a(workflowId) % 100 < pct` — deterministic per-workflow (not per-user), so a given workflow always routes to the same path.

---

## Migration phases

### Phase 1 — Scaffold ✅ COMPLETE

- `services/trigger-service/` on port 3006
- All `/triggers/*` returned `501 TRIGGER_SERVICE_STUB`
- `worker/src/services/trigger-service-client.ts` — disabled by default, no wiring
- Deploy artifacts: `deploy-trigger-service.sh`, systemd unit, GitHub Actions workflow
- Worker trigger handlers untouched

**Activated:** nothing to activate — scaffold was not wired into any worker call path.

### Phase 2 — Webhook / Form / Chat dispatch ✅ COMPLETE

Prerequisites: Phase 1 running for 1+ week with clean health probes. ✅

- `POST /triggers/webhook/:workflowId` — validates workflow active + webhook_url + signature, enqueues execution, notifies worker
- `POST /triggers/form/:workflowId/:nodeId/submit` — validates workflow active, spreads fields into input, enqueues execution
- `POST /triggers/chat/:workflowId/:nodeId/message` — validates message + workflow active, enqueues execution with sessionId
- `/health/ready` — reports `db: 'ok'|'skip'|'error'`
- `services/trigger-service/src/lib/db.ts` — pg Pool, `queryDb`, `checkDb`, `_resetPool`
- `services/trigger-service/src/lib/workflow-lookup.ts` — `lookupWorkflow(workflowId)`
- `services/trigger-service/src/lib/execution-enqueue.ts` — inserts row + fire-and-forgets POST to `WORKER_INTERNAL_URL/api/execute-workflow`
- Worker delegation wired:
  - `webhook-trigger.ts` → `dispatchWebhookRemote()` when `shouldUseTriggerService(workflowId)`
  - `form-trigger.ts#submitForm` → `dispatchFormRemote()` when `shouldUseTriggerService(workflowId)`
  - `chat-trigger.ts#submitChatMessage` → `dispatchChatRemote()` when `shouldUseTriggerService(workflowId)`
  - All fall back to local handler on `null` return

**Activate:**
```bash
TRIGGER_SERVICE_ENABLED=true
TRIGGER_SERVICE_CANARY_PERCENT=50   # staging — 50% of workflows
# Monitor health for 1 week, then:
TRIGGER_SERVICE_CANARY_PERCENT=100  # full rollout
```

### Phase 3 — Schedule dispatch ✅ COMPLETE

Prerequisites: Phase 2 stable for 1 week. ✅

- `POST /triggers/schedule/:workflowId` — validates `scheduledAt` (ISO 8601) + workflow active, enqueues execution with `trigger=schedule`; optional `cron` passed through in input
- `SchedulerService.executeScheduledWorkflow()` — made public; canary check: `shouldUseTriggerService(workflowId)` → `dispatchScheduleRemote()` → fallback to local fetch on null/error
- The SchedulerService and `node-cron` job registration remain on the worker (Phase 4 moves them)
- `enqueueExecution` trigger union extended to include `'schedule'`

**Activate:** same flags as Phase 2: `TRIGGER_SERVICE_ENABLED=true`, `TRIGGER_SERVICE_CANARY_PERCENT=50→100`

### Phase 4 — Full scheduler move + Kafka

Prerequisites: Phase 3 stable for 1 week.

- Move `SchedulerService` and `node-cron` job registration into trigger-service (off worker)
- Kafka/MSK integration for reliable execution queuing (replaces direct HTTP enqueue)
- All inbound trigger traffic fully owned by trigger-service; worker becomes pure API proxy

---

## Payload contracts

### POST /triggers/webhook/:workflowId

Request (from worker `dispatchWebhookRemote`):
```json
{
  "headers": { "content-type": "application/json", "x-webhook-signature": "sha256=..." },
  "body": { "event": "push", "repository": { "name": "my-repo" } },
  "method": "POST"
}
```

Signature verification: `HMAC-SHA256(secret, JSON.stringify(body))` — matches worker fallback path.

### POST /triggers/form/:workflowId/:nodeId/submit

Request (from worker `dispatchFormRemote`):
```json
{
  "fields": { "name": "Alice", "email": "alice@example.com" }
}
```

### POST /triggers/chat/:workflowId/:nodeId/message

Request (from worker `dispatchChatRemote`):
```json
{
  "message": "What is the status of my order?",
  "sessionId": "sess-abc-123",
  "metadata": {}
}
```

### POST /triggers/schedule/:workflowId

Request (from worker `SchedulerService.executeScheduledWorkflow`):
```json
{
  "scheduledAt": "2026-06-11T09:00:00.000Z",
  "cron": "0 9 * * 1"
}
```

- `scheduledAt` — required, ISO 8601 datetime
- `cron` — optional, cron expression string for audit/context

**Response (all channels — success):**
```json
{ "executionId": "<uuid>", "status": "queued", "workflowId": "<id>" }
```

**Error responses:**

| Status | Code | Trigger |
|--------|------|---------|
| `400` | `Workflow is not active` | Workflow in draft/paused/inactive state |
| `400` | `Invalid message` | Chat: missing or empty message |
| `401` | `Invalid webhook signature` | Signature mismatch or missing when secret is set |
| `403` | `Webhook not enabled for this workflow` | workflow_url is null |
| `404` | `Workflow not found` | No row with that ID |
| `503` | `Service unavailable` | Database unavailable (DATABASE_URL not set or connection failed) |

---

## Env vars (trigger-service)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3006` | Bind port |
| `NODE_ENV` | No | `development` | Environment |
| `DATABASE_URL` | **Phase 2+** | — | PostgreSQL connection string (same as worker) |
| `WORKER_INTERNAL_URL` | **Phase 2+** | `http://127.0.0.1:3001` | Worker address for execution notify |
| `TRIGGER_SERVICE_KEY` | Yes (prod) | `""` | Shared secret for worker→service auth |
| `COGNITO_AUTH_ENABLED` | No | `false` | Enable Cognito JWT verification (Phase 3) |

---

## Observability

```bash
# Logs
sudo journalctl -u ctrlchecks-trigger-service -f

# Health check
curl http://localhost:3006/health/live
curl http://localhost:3006/health/ready
# Expected Phase 2: {"status":"ready","checks":{"db":"ok"},...}
```

---

## First-deploy checklist

```bash
# On the EC2 host (one-time setup)
sudo mkdir -p /opt/ctrlchecks-trigger-service
sudo chown -R ubuntu:ubuntu /opt/ctrlchecks-trigger-service
sudo cp /tmp/ctrlchecks-trigger-service.service \
        /etc/systemd/system/ctrlchecks-trigger-service.service
sudo systemctl daemon-reload
sudo systemctl enable ctrlchecks-trigger-service
# Create .env from .env.example — fill in DATABASE_URL and WORKER_INTERNAL_URL
# Run: sudo systemctl start ctrlchecks-trigger-service
# Verify: curl http://localhost:3006/health/ready
```

## Rollback

```bash
# Instant rollback at any phase — no redeploy of trigger-service needed
sed -i 's/^TRIGGER_SERVICE_ENABLED=.*/TRIGGER_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
# All trigger handling reverts to worker route handlers immediately
```

---

## Do NOT (permanent constraints)

- Do NOT expose trigger-service directly to the internet — public URLs stay on worker
- Do NOT change `/api/webhook-trigger`, `/api/form-trigger`, `/api/chat-trigger` URLs
- Do NOT move the WebSocket server — stays on worker permanently
- Do NOT add Kafka in Phase 1 or Phase 2 — HTTP stub queue only until Phase 4
- Do NOT block trigger dispatch waiting for execution result — fire-and-forget enqueue

---

## Related files

- `services/trigger-service/src/` — service source
- `services/trigger-service/src/lib/db.ts` — pg Pool (Phase 2)
- `services/trigger-service/src/lib/workflow-lookup.ts` — workflow lookup (Phase 2)
- `services/trigger-service/src/lib/execution-enqueue.ts` — execution insert + notify (Phase 2)
- `worker/src/services/trigger-service-client.ts` — worker client with FNV-1a canary
- `worker/src/api/webhook-trigger.ts` — wired canary delegation (Phase 2)
- `worker/src/api/form-trigger.ts` — wired canary delegation (Phase 2)
- `worker/src/api/chat-trigger.ts` — wired canary delegation (Phase 2)
- `worker/src/services/scheduler/` — source to delegate in Phase 3
- `docs/engineering/notification-service-contract.md` — precedent / pattern reference
