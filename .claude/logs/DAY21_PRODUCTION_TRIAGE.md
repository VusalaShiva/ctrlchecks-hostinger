# Day 21 — Production Issue Triage
**Date:** 2026-06-07  
**Reviewed by:** Claude (automated analysis of deployment output + code)  
**Production server:** `ubuntu@3.7.115.58` / `/opt/ctrlchecks-worker`  
**Status at time of review:** Server rebooted (new kernel 6.17.0-1017-aws), both services enabled for auto-start.

---

## Production Health Snapshot (pre-reboot)

| Component | Status | Notes |
|---|---|---|
| Main worker (`ctrlchecks-worker`) | ✅ healthy | Port 3001, Gemini 2-key pool active, DB healthy, Redis connected |
| Execution worker (`ctrlchecks-execution-worker`) | ✅ running | PID 434817, concurrency 5, polling at 1000ms |
| Gemini key pool | ✅ healthy | keyCount: 2, both keys healthy, 0 cooldowns |
| Redis | ✅ connected | `redis://127.0.0.1:6379`, WsRedisBridge active |
| AWS RDS PostgreSQL | ✅ healthy | pool total:2 idle:2 waiting:0 |
| ENABLE_EXECUTION_QUEUE | ✅ true | Async path enabled |
| Post-reboot verification | ⏳ pending | Services are `enabled` — user must confirm auto-start after reboot |

---

## P0 — Critical (blocks users immediately)

_None confirmed at launch. All health endpoints passed._

---

## P1 — High (significant user impact, fix within Days 22–23)

### P1-001 — Unknown node types in stored workflows (execution failures)
**File:** `worker/src/core/utils/unified-node-type-normalizer.ts`  
**Symptom (from production logs):**
```
[UnifiedNodeTypeNormalizer] Aggregated startup unknown aliases:
  cache node(2), cache data(2), cache value(2),
  slack webhook(2), email notification(2), discord webhook(2),
  age(1), verify(1), eligible(1), vote(1), check(1), validate(1)
```
**Root cause:** AI generator is sometimes outputting workflow nodes with human-readable display names (`"cache node"`, `"slack webhook"`) instead of canonical registry types (`"cache_get"`, `"slack_webhook"`). These workflows are stored in the DB and loaded at startup — they load without error but will **fail silently or crash at execution time** because no registry entry exists.  
**User impact:** Any user who runs a workflow containing these node types will get an execution error.  
**Fix:**
1. Add these aliases to `unified-node-registry.ts` aliasMap: `"cache node" → "cache_get"`, `"cache data" → "cache_get"`, `"cache value" → "cache_get"`, `"slack webhook" → "slack_webhook"`, `"discord webhook" → "discord_webhook"`, `"email notification" → "email"`.
2. Non-mappable types (`age`, `verify`, `eligible`, `vote`, `check`, `validate`) are AI-hallucinated node names — scan stored workflows in DB and replace or remove them.
3. Tighten AI prompt to always use `type` from the node registry, not display names.  
**Owner:** Dev 1 (backend registry fix + DB cleanup)  
**Day:** 22

---

### P1-002 — Async execution queue not smoke-tested end-to-end
**Files:** `worker/src/api/execute-workflow.ts`, `worker/src/services/execution-job-runner.ts`  
**Symptom:** Execution worker shows `totalProcessed: 0` — no workflow has gone through the async path in production yet.  
**Risk:** `ENABLE_EXECUTION_QUEUE=true` is live. Any bug in `runExecutionJob()` (DB state transitions, WS publish, credential injection under async context) will surface only when a real user hits it.  
**Fix:**
1. Run a manual smoke test: POST `/api/execute-workflow` with a simple webhook→http_request workflow and `useQueue: true`. Verify:
   - 202 returned with `executionId` + `jobId`
   - Execution worker picks up the job (check `journalctl -u ctrlchecks-execution-worker -f`)
   - Status transitions: `queued → running → completed`
   - `/api/execution-status/:executionId` returns `completed`
2. If bugs found, fix in `execution-job-runner.ts` before Day 25.  
**Owner:** Dev 1  
**Day:** 22

---

### P1-003 — No execution status tracking in database confirmed
**File:** `worker/src/api/execute-workflow.ts` (line ~18710+), `worker/src/api/` (no `workflow-status.ts` found)  
**Symptom:** `/api/execution-status/:executionId` route is registered in `index.ts` line ~710 but the handler file `workflow-status.ts` was not found in the API directory. Could be inline or missing.  
**Risk:** Frontend relies on polling this endpoint to show execution state. If it's missing or returns stale data, users see stuck "running" spinners.  
**Fix:** Verify `getExecutionStatus` handler exists and returns correct data from Redis/DB. If missing, create it.  
**Owner:** Dev 1  
**Day:** 22

---

## P2 — Medium (noticeable, fix Days 22–25)

### P2-001 — npm audit: 2 critical + 9 high vulnerabilities
**Source:** `npm ci` output during deployment  
**Details:**
- `multer@1.4.5-lts.2` — file upload library with known CVEs, patched in multer 2.x
- 27 moderate + 1 low also present
**Fix:**
1. Run `npm audit` to list exact CVEs.
2. Upgrade multer: `npm install multer@latest` (breaking changes likely — test file upload routes).
3. Run `npm audit fix` for non-breaking fixes.  
**Owner:** Dev 1  
**Day:** 23–24

---

### P2-002 — Frontend build blocked on Windows (CI deployment gap)
**Context:** `ctrl_checks/` Vite build fails on Windows due to Rollup native binary blocked by Application Control Policy.  
**Risk:** Any frontend change cannot be deployed without Linux/CI environment. Frontend is currently undeployed at production URL.  
**Fix:** Set up GitHub Actions CI for frontend build on `push to main` → deploy to Vercel or S3/CloudFront.  
**Owner:** Dev 2 (CI setup)  
**Day:** 25–26

---

### P2-003 — Post-reboot service health not yet confirmed
**Context:** Server rebooted at 08:17:44 UTC for kernel 6.17.0-1017-aws. Both services are `enabled` but user has not run post-reboot check.  
**Fix:** Run these commands to confirm:
```bash
sudo systemctl status ctrlchecks-worker ctrlchecks-execution-worker
curl -fsS https://worker.ctrlchecks.ai/health
```
**Owner:** Dev 1  
**Day:** 21 (immediate)

---

### P2-004 — WsRedisBridge REPLICA_ID fixed at startup (multi-replica risk)
**File:** `worker/src/services/ws-redis-bridge.ts:31`  
```ts
const REPLICA_ID = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
```
**Issue:** Currently single-replica so no problem, but if horizontal scaling is added without setting `REPLICA_ID` via env var, PID-based IDs may collide in containerized environments (PIDs restart at 1).  
**Fix:** Read from `process.env.REPLICA_ID` with PID fallback. Not urgent for single-replica deployment.  
**Owner:** Dev 1  
**Day:** 25

---

## P3 — Low (quality/hygiene, address in Days 24–30)

| ID | Issue | File | Fix |
|---|---|---|---|
| P3-001 | npm 10.x → 11.x upgrade available | `package.json` | `npm install -g npm@11.16.0` on server |
| P3-002 | Ubuntu Pro ESM Apps not enabled | Server | `sudo pro enable esm-apps` for extended security patches |
| P3-003 | 12 node types with unknown aliases logged at every restart | `unified-node-type-normalizer.ts` | Covered by P1-001 fix — aliases reduce this to zero |
| P3-004 | `querystring` deprecated API usage | Any dep | Upgrade dependents using `URLSearchParams` |
| P3-005 | `multer@1.4.5-lts.2` deprecation warning on every `npm ci` | deps | Covered by P2-001 |

---

## Day 21 Actions Checklist

- [ ] **Dev 1:** SSH to server → verify post-reboot service status (`systemctl status` + `/health` curl)  
- [ ] **Dev 1:** Run async execution smoke test (P1-002)  
- [ ] **Dev 1:** Confirm `getExecutionStatus` handler exists and returns real data (P1-003)  
- [ ] **Dev 1:** Begin alias map additions for P1-001 (can be done locally today)

---

## Day 22 Plan (from this triage)

| Priority | Task | Owner |
|---|---|---|
| P1 | Fix 6 missing node aliases in registry (`cache node`, `slack webhook`, etc.) | Dev 1 |
| P1 | Fix/verify `getExecutionStatus` handler | Dev 1 |
| P1 | Smoke test full async execution path with real workflow | Dev 1 |
| P2 | `npm audit fix` + multer upgrade | Dev 1 |
| P2 | Re-test user-facing fixes from browser | Dev 2 |
