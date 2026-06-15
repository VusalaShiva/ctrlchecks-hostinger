# Execution Engine — Service Contract

**Version:** 0.5 (Phase 5 — 100% engine routing, no monolith fallback)
**Port:** 3003 (127.0.0.1 only — internal to the EC2 host)
**Auth:** `x-service-key` header; dev pass-through when env var unset

---

## Overview

The execution engine is an internal microservice that owns the full lifecycle for its
33% canary slice. In Phase 3 it:

1. Accepts `POST /execute` from the worker's canary path
2. Enqueues the job into its **own Redis queue** (`workflow:execution:engine-queue`)
3. Returns 202 to the worker immediately
4. Its own consumer (`engine-consumer.ts`) dequeues and calls the worker's internal HTTP route
   (`POST /api/internal/engine-execute`) to run the actual execution
5. The worker publishes WebSocket events as usual — no WS code moved

Executor code (`dynamic-node-executor.ts`) is **not** moved in this phase; that is Phase 4.
The worker routes a **33% canary** slice via `isCanaryTarget(executionId)`.

**Architecture (Phase 3 — engine-owned consumer):**

*Option A (chosen): Internal worker HTTP route*
Engine consumer → POST /api/internal/engine-execute → worker executeWorkflowHandler
  - Worker handles all DB state + WS events (no duplication)
  - Engine logs structured accepted/completed/failed + durationMs
  - Easy rollback: EXECUTION_ENGINE_ENABLED=false restarts with no redeploy

*Option B (rejected): Copy executor*
Move dynamic-node-executor.ts into engine, maintain two copies.
  - Harder to keep in sync; deferred to Phase 4 (clean cut)

```
Client → Worker POST /api/execute-workflow
  Worker canary check (33%):
    isCanaryTarget(executionId) && EXECUTION_ENGINE_ENABLED=true
      YES → POST /execute → Execution Engine (userId extracted from JWT)
              Engine: INSERT executions (queued, non-fatal)
                       SETEX workflow:execution:job:{jobId}
                       ZADD workflow:execution:engine-queue 0 {jobId}
              → 202 { queued, executionId, jobId, statusUrl }
            ← Worker returns 202 to client

  Engine consumer (EXECUTION_ENGINE_CONSUMER_ENABLED=true):
    ZRANGE engine-queue → dequeue → runEngineJob()
      log: { event: "accepted", executionId, jobId }
      publish WS "running" event
      POST /api/internal/engine-execute → worker (x-internal-engine-execution: true)
        Worker: runs executeWorkflowHandler(useQueue=false)
                updates DB (executions table)
                publishes WS events (running → completed/failed)
        Returns: { success, result, error?, durationMs }
      log: { event: "completed" | "failed", durationMs }
      if failed: publish WS "failed" event

      NO (67%) → existing monolith queue path (unchanged)
```

---

## Endpoints

### Public (no auth)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health/live` | Liveness probe — returns 200 when process is up |
| GET | `/health/ready` | Readiness probe — same in scaffold; will check DB/Redis in Phase 2 |
| GET | `/health` | Legacy alias — same as `/health/ready` |

**Liveness response:**
```json
{ "status": "live", "timestamp": "2026-06-10T12:00:00.000Z" }
```

**Readiness response (Phase 1):**
```json
{ "status": "ready", "timestamp": "2026-06-10T12:00:00.000Z" }
```

**Readiness response (Phase 2+):**
```json
{
  "status": "ready",
  "checks": { "db": "ok", "redis": "ok" },
  "timestamp": "2026-06-10T12:00:00.000Z"
}
```

---

### Protected (requires `x-service-key`)

#### POST /execute — Submit a workflow execution

**Request:**
```json
{
  "workflowId": "wf_abc123",
  "executionId": "exec_xyz789",
  "userId": "user_123",
  "input": {},
  "metadata": {}
}
```

**Response — Phase 1 (stub):**
```
HTTP 501 Not Implemented
```
```json
{
  "error": "Not Implemented",
  "code": "EXECUTION_ENGINE_STUB",
  "message": "Execution engine is scaffolded but executor code has not been moved yet. Caller should fall back to monolith."
}
```

**Response — Phase 2+ (async accept):**
```
HTTP 202 Accepted
```
```json
{
  "queued": true,
  "executionId": "exec_xyz789",
  "statusUrl": "/executions/exec_xyz789/status"
}
```

The 202 pattern is intentional: the engine accepts the job and enqueues it; the
caller subscribes to execution status via the existing WebSocket channel
(`/ws/executions`) rather than waiting synchronously.

---

## Feature Flags

All canary controls live in the **worker's** environment:

```bash
# worker/.env
EXECUTION_ENGINE_ENABLED=false          # true = canary active; false = 100% monolith (default)
EXECUTION_ENGINE_URL=http://localhost:3003
EXECUTION_ENGINE_SERVICE_KEY=<secret>   # must match engine's EXECUTION_ENGINE_SERVICE_KEY
EXECUTION_ENGINE_CANARY_PERCENT=33      # % of executions routed to engine (0–100)
                                        #   Phase 2/3: 33 (default)
                                        #   Phase 4:   66  ← set this, restart worker only
                                        #   Phase 5:   100 (before removing monolith fallback)
WORKER_INTERNAL_KEY=<secret>            # must match engine's WORKER_INTERNAL_KEY (Phase 3+)
```

Matching secrets in the engine's env:
```bash
# services/execution-engine/.env
EXECUTION_ENGINE_SERVICE_KEY=<same-secret>
WORKER_INTERNAL_KEY=<same-secret>
```

**Bumping the canary to 66%** requires only an env change + worker restart — no code change, no redeploy:
```bash
# On the server
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=66/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

**Emergency stop** (pause canary without disabling the flag):
```bash
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=0/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

---

## Canary Rollout Plan

### Phase 1 — Scaffold ✅ (complete)
- Flag disabled everywhere: `EXECUTION_ENGINE_ENABLED=false`
- Engine deployed but all requests returned 501
- Health endpoints live on :3003

### Phase 2 — Shared Redis queue + 33% canary ✅ (complete)
- Engine accepted POST /execute → pre-created DB record → pushed to shared Redis queue → 202
- Worker's `isCanaryTarget(executionId)` routes FNV-1a hash % 3 === 0 (≈33%) to engine
- Worker retained monolith fallback for 67% and for any engine error/timeout
- `/health/ready` checks Redis ping + DB SELECT 1

### Phase 3 — Engine-owned consumer ✅ (current)
**Architecture: Internal worker HTTP route** (documented above)
- `EXECUTION_ENGINE_CONSUMER_ENABLED=true` starts consumer on boot
- Engine enqueues to own queue (`workflow:execution:engine-queue`); worker never sees these jobs
- Worker skip guard: if engine-tagged job arrives in worker queue → fail fast (defensive)
- `internalEngineExecuteRoute` added to worker at `POST /api/internal/engine-execute`
  - Auth: `x-internal-engine-key` header (shared service key, env: `WORKER_INTERNAL_KEY`)
  - Bypass: `x-internal-engine-execution: true` header skips Cognito JWT check
- userId extracted from verified JWT (base64url decode) in canary block; passed to engine
- Structured observability logs: `{ event: accepted|completed|failed, executionId, jobId, durationMs }`
- WS "running" event published by engine before HTTP call; WS terminal events by worker
- Activate: set `EXECUTION_ENGINE_CONSUMER_ENABLED=true` in engine env, restart engine
- Phase 2 still activates the canary slice (`EXECUTION_ENGINE_ENABLED=true` in worker)

### Phase 4 — 66% canary ✅
- `EXECUTION_ENGINE_CANARY_PERCENT` replaces hardcoded `% 3 === 0`
- Formula: `fnv1a(id) % 100 < pct` — directly controllable via env, no redeploy needed
- To activate: `EXECUTION_ENGINE_CANARY_PERCENT=66` in worker env + `systemctl restart ctrlchecks-worker`
- Soak target: 48h with ≤0.1% error rate on engine path
- Observe: `journalctl -u ctrlchecks-execution-engine | grep '"event":"failed"'`
- Rollback to 33%: set `EXECUTION_ENGINE_CANARY_PERCENT=33` + restart worker

### Phase 5 — 100% cutover ✅ (current)
- Step A (ops): `EXECUTION_ENGINE_CANARY_PERCENT=100` + restart worker → 7-day soak
- Step B (code, after soak PASS): replaced canary block with unconditional delegation
  - `ENABLED=true` → always `delegateExecution()`, no `isCanaryTarget()` check
  - Engine success → 202; engine failure → 503 `EXECUTION_ENGINE_UNAVAILABLE`
  - No monolith fallback. Rollback: `EXECUTION_ENGINE_ENABLED=false` + restart.
- `isCanaryTarget()` and `getCanaryPercent()` marked `@deprecated` — remove in Phase 6
- Soak doc: `.claude/logs/TASK11A_PHASE5_SOAK.md`

### Phase 6 — Executor code movement
- Move `dynamic-node-executor.ts` + `execution-job-runner.ts` into execution engine
- Engine runs jobs internally; `POST /api/internal/engine-execute` removed
- Clean cut — no feature flag needed, no duplication

### Rollback procedure
At any phase, instant rollback:
```bash
ssh ubuntu@<host>
# In worker's .env:
EXECUTION_ENGINE_ENABLED=false
sudo systemctl restart ctrlchecks-worker
```
No code change or redeploy required.

---

## First-deploy server setup (one-time)

```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58

sudo mkdir -p /opt/ctrlchecks-execution-engine
sudo chown -R ubuntu:ubuntu /opt/ctrlchecks-execution-engine

# Copy .env.example and fill in values
cp /opt/ctrlchecks-execution-engine/... /opt/ctrlchecks-execution-engine/.env
# Required: EXECUTION_ENGINE_SERVICE_KEY=<generate with: openssl rand -hex 32>

sudo cp scripts/ctrlchecks-execution-engine.service \
        /etc/systemd/system/ctrlchecks-execution-engine.service
sudo systemctl daemon-reload
sudo systemctl enable ctrlchecks-execution-engine
```

---

## Environment Variables

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `PORT` | No | 3003 | Binds to 127.0.0.1 only |
| `EXECUTION_ENGINE_SERVICE_KEY` | No (dev) | — | When unset, all requests pass through (dev mode) |
| `REDIS_URL` | Yes (Phase 2+) | — | Must point to the same Redis instance as the worker |
| `DATABASE_URL` | Yes (Phase 2+) | — | Same Postgres as worker (for pre-creating execution records) |
| `EXECUTION_ENGINE_CONSUMER_ENABLED` | No | false | `true` starts the engine consumer on boot (Phase 3) |
| `WORKER_INTERNAL_URL` | Phase 3 | http://127.0.0.1:3001 | Worker base URL for internal execution calls |
| `WORKER_INTERNAL_KEY` | Phase 3 | — | Shared secret for engine→worker calls; must match `WORKER_INTERNAL_KEY` in worker env |
| `EXECUTION_TIMEOUT_MS` | No | 1800000 | Wall-clock timeout per execution (30 min) |
| `WEBSOCKET_REDIS_CHANNEL_PREFIX` | No | ws:exec: | Must match worker's setting |

**Worker env additions (Phase 3):**

| Variable | Notes |
|----------|-------|
| `WORKER_INTERNAL_KEY` | Must match the engine's `WORKER_INTERNAL_KEY` |

---

## Observability

Logs go to journald: `sudo journalctl -u ctrlchecks-execution-engine -f`

Every request is tagged with `x-request-id` (UUID, generated if absent). Error responses
echo the `ref` field matching the request ID for cross-service correlation.

Phase 2 will add structured JSON logs with `level`, `requestId`, `durationMs`.
