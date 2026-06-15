# Workflow CRUD Service — Service Contract

**Version:** 0.4 (Phase 4 — templates + load/list canary + retirement gate)  
**Port:** 3007 (127.0.0.1 only — internal to the EC2 host)  
**Auth:** `x-service-key` header (worker→service) + `Authorization: Bearer` (Cognito JWT — Phase 2)

---

## Overview

The workflow CRUD service will own workflow save/load/delete and version history, currently handled inline by worker route handlers. Public-facing URLs remain on the worker permanently — the workflow-crud-service is an internal dispatch target, never exposed directly to the internet.

Migration follows the same incremental pattern as the credential service and notification service: feature-flagged canary with worker fallbacks at every phase.

**Current state (Phase 4):** All CRUD + versioning live. Templates read proxy added — `GET /templates` + `GET /templates/:id` always try the service (no canary; global read). Worker `GET /api/workflows` + `GET /api/workflows/:id` canary-wired. `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=false` gate ready — flip to `true` after 2-week soak at CANARY=100 to complete worker retirement. This is the final code phase; remaining work is ops soaks.

---

## Migration Phases

| Phase | Scope | Canary | Gate |
|-------|-------|--------|------|
| **1** | Scaffold — 501 stubs | 0% | Done |
| **2** | Save/load/delete (`save-workflow.ts`) | 0 → 50 → 100% | 7-day soak at 100% |
| **3** | Version history + rollback (`workflow-versioning.ts`) | 0 → 50 → 100% | 7-day soak at 100% |
| **4** (current) | Templates + load/list canary + LOCAL_WRITES_DISABLED gate | CANARY=100 | 2-week soak then flip gate |

---

## Public URLs (stay on worker — do NOT change)

These URLs are permanent worker routes. The workflow-crud-service is an internal dispatch target reached via worker canary delegation, never directly from the internet.

| Method | URL | Worker file |
|--------|-----|-------------|
| `POST` | `/api/save-workflow` | `worker/src/api/save-workflow.ts` |
| `GET` | `/api/workflows/:id` | `worker/src/api/save-workflow.ts` |
| `GET` | `/api/workflows` | `worker/src/api/save-workflow.ts` |
| `DELETE` | `/api/workflows/:id` | `worker/src/api/save-workflow.ts` |
| `GET` | `/api/workflows/:id/versions` | `worker/src/api/workflow-versioning.ts` |
| `POST` | `/api/workflows/:id/versions/:version/rollback` | `worker/src/api/workflow-versioning.ts` |

---

## Internal Endpoints

### Public (no auth)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health/live` | Liveness probe — process alive |
| `GET` | `/health/ready` | Readiness probe — `{}` checks (DB added Phase 2) |
| `GET` | `/health` | Legacy alias |
| `GET` | `/metrics` | Prometheus text — `workflow_crud_*` counters |

### Protected (x-service-key or Bearer)

| Method | Path | Phase | Status | Description |
|--------|------|-------|--------|-------------|
| `POST` | `/workflows` | 2 | ✅ **Live** | Save (create/update) workflow |
| `GET` | `/workflows` | 2 | ✅ **Live** | List workflows for authenticated user |
| `GET` | `/workflows/:id` | 2 | ✅ **Live** | Load workflow by id |
| `DELETE` | `/workflows/:id` | 2 | ✅ **Live** | Delete workflow by id |
| `GET` | `/workflows/:id/versions` | 3 | ✅ **Live** | List version history (most-recent first; `?limit=N`) |
| `POST` | `/workflows/:id/versions/:version/rollback` | 3 | ✅ **Live** | Rollback to a specific version |
| `GET` | `/templates` | 4 | ✅ **Live** | List active templates (`?category=`, `?search=`) — no user scope |
| `GET` | `/templates/:id` | 4 | ✅ **Live** | Get single active template by id |

---

## Auth model

```
Worker (internal)  →  x-service-key: <WORKFLOW_CRUD_SERVICE_KEY>
Health probes      →  no auth
Browser / public   →  public CRUD URLs stay on worker (never reach workflow-crud-service directly)
```

---

## Worker feature flags

| Env var | Default | Description |
|---------|---------|-------------|
| `WORKFLOW_CRUD_SERVICE_ENABLED` | `false` | Master switch — false = worker handles all CRUD |
| `WORKFLOW_CRUD_SERVICE_URL` | `http://localhost:3007` | Service base URL |
| `WORKFLOW_CRUD_SERVICE_KEY` | `` | Shared secret for x-service-key auth |
| `WORKFLOW_CRUD_SERVICE_CANARY_PERCENT` | `0` | % of userIds routed to the service (0–100) |
| `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` | `false` | Phase 4 gate — `true` blocks local writes for canary users when remote is null |

Canary routing is keyed on **userId** (not workflowId) — CRUD operations are per-user, so fnv1a(userId) % 100 gives deterministic per-user routing. Same userId always maps to the same side of the split.

---

## Worker client

```
worker/src/services/workflow-crud-service-client.ts
```

Key exports:

| Function | Purpose |
|----------|---------|
| `isWorkflowCrudServiceEnabled()` | Feature flag check |
| `shouldUseWorkflowCrudService(userId)` | FNV canary — deterministic per-userId |
| `saveWorkflowRemote(userId, workflow)` | Phase 2 target |
| `getWorkflowRemote(userId, workflowId)` | Phase 2 target |
| `listWorkflowsRemote(userId)` | Phase 2 target |
| `deleteWorkflowRemote(userId, workflowId)` | Phase 2 target |
| `listWorkflowVersionsRemote(userId, workflowId)` | Phase 3 — wired into `GET /api/workflows/:workflowId/versions` |
| `rollbackWorkflowRemote(userId, workflowId, version)` | Phase 3 — wired into `POST /api/workflows/:workflowId/versions/:version/rollback` |
| `listTemplatesRemote(options?)` | Phase 4 — no canary, always proxied from `worker/src/api/templates.ts` |
| `getTemplateRemote(templateId)` | Phase 4 — no canary, always proxied |
| `isWorkflowCrudLocalWritesDisabled()` | Phase 4 gate — reads `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` |

All methods return `null` when the service is disabled or returns a non-200 response, so the worker fallback always activates.

---

## Metrics (Prometheus)

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `workflow_crud_http_requests_total` | counter | `service` | Requests handled by the service |
| `workflow_crud_operations_total` | counter | `operation`, `status`, `service` | CRUD ops by type and outcome |
| `workflow_crud_active_requests` | gauge | `service` | In-flight requests |
| `process_uptime_seconds` | gauge | `service` | Process uptime |
| `ctrlchecks_workflow_crud_delegation_total` | counter | `result` | Worker→service delegation hits/misses/errors |

---

## Rollback

```bash
# Instant rollback — no deploy needed
sed -i 's/^WORKFLOW_CRUD_SERVICE_ENABLED=.*/WORKFLOW_CRUD_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
sleep 5 && curl -fsS http://localhost:3001/health
```

---

## Ops commands

```bash
# Health probes
curl -fsS http://localhost:3007/health/live | jq .
curl -fsS http://localhost:3007/health/ready | jq .

# Metrics
curl -s http://localhost:3007/metrics | head -20

# Logs
sudo journalctl -u ctrlchecks-workflow-crud-service -f
sudo journalctl -u ctrlchecks-workflow-crud-service -n 100 --no-pager

# Service status
sudo systemctl status ctrlchecks-workflow-crud-service --no-pager
```

---

## Phase 2 wiring (complete)

1. Added DB client (`pg.Pool`) — `src/lib/db.ts`
2. `POST /workflows` → upsert into `workflows` table (`src/lib/save-workflow.ts`)
3. `GET /workflows/:id` → SELECT scoped to x-user-id
4. `GET /workflows` → SELECT all scoped to x-user-id
5. `DELETE /workflows/:id` → hard-delete scoped to x-user-id
6. Worker canary: `save-workflow.ts` + `DELETE /api/workflows/:id` in `index.ts`
7. Ramp `WORKFLOW_CRUD_SERVICE_CANARY_PERCENT`: 0 → 5 → 25 → 50 → 100

---

## Phase 4 wiring (complete)

### Templates proxy

`services/workflow-crud-service/src/lib/templates-repo.ts` — read-only templates queries:
- `listTemplates({ category?, search? })` — mirrors worker filters; in-process search
- `getTemplateById(id)` — returns null if not found or inactive

Worker `templates.ts` now tries `listTemplatesRemote` / `getTemplateRemote` before its Supabase fallback. No canary — global read, triggered whenever `WORKFLOW_CRUD_SERVICE_ENABLED=true`.

### Load/list canary

`GET /api/workflows` and `GET /api/workflows/:id` added to worker `index.ts`. Both use `shouldUseWorkflowCrudService(userId)` → `listWorkflowsRemote` / `getWorkflowRemote` → fallback to `queryAsService`.

### LOCAL_WRITES_DISABLED gate

`WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=false` (default). When `true`:
- `save-workflow.ts`: canary user + remote null → `503 WORKFLOW_CRUD_SERVICE_UNAVAILABLE`
- `DELETE /api/workflows/:id`: same
- `POST /api/workflows/:id/versions/:version/rollback`: same

**Set `true` only after 2-week soak at `CANARY=100` with zero regressions.**

---

## Phase 3 wiring (complete)

`services/workflow-crud-service/src/lib/version-repo.ts` — DB operations:

| Function | Description |
|----------|-------------|
| `listVersions(workflowId, userId, limit?)` | SELECT from `workflow_versions` — ownership check first |
| `getVersion(workflowId, userId, versionNumber)` | SELECT specific version — ownership check first |
| `rollbackToVersion(workflowId, userId, versionNumber)` | Restore nodes/edges/settings/graph; insert post-rollback version row |

Worker canary added to:
- `GET /api/workflows/:workflowId/versions` → `listWorkflowVersionsRemote`
- `POST /api/workflows/:workflowId/versions/:version/rollback` → `rollbackWorkflowRemote`

Both routes extract userId via `requireAuthenticatedUser`; if auth fails the canary is skipped and the existing worker handler runs unchanged.

---

## DAG / graph mutation rule

The workflow-crud-service stores and retrieves workflow JSON blobs. It does **not** mutate `workflow.edges` or `workflow.nodes`. Any graph mutations must go through `UnifiedGraphOrchestrator` on the worker before the workflow is passed to this service for persistence.
