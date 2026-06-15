# Production Ground Truth Audit

**Date:** 2026-06-15  
**Audited by:** Claude Code (read-only SSH — no restarts, no writes)  
**Server:** `ubuntu@3.7.115.58`

---

## EC2 State vs. Plan: Summary Table

| Service | Code in repo | Deployed on EC2 | Port responds | ENABLED flag | CANARY% | Soak status |
|---|---|---|---|---|---|---|
| worker | ✅ Task 9 (local: Task 12+) | ✅ running | ✅ :3001 healthy | N/A (always on) | N/A | Live |
| ai-generator | ✅ local latest | ✅ running | ✅ :3002 healthy | not in .env | N/A | Live (no canary check) |
| execution-engine | ✅ Phase 5 code | ❌ NOT deployed | ❌ :3003 FAIL | not in .env | — | Not started |
| credential-service | ✅ Phase 4 code | ❌ NOT deployed | ❌ :3004 FAIL | not in .env | — | Not started |
| notification-service | ✅ Phase 4 code | ❌ NOT deployed | ❌ :3005 FAIL | not in .env | — | Not started |
| trigger-service | ✅ Phase 3 code | ❌ NOT deployed | ❌ :3006 FAIL | not in .env | — | Not started |
| workflow-crud-service | ✅ Phase 4 code | ❌ NOT deployed | ❌ :3007 FAIL | not in .env | — | Not started |

---

## Raw Audit Output

### Git branch + log
```
* main 0a952e8 [ahead 116] Task 9: DB/infra reliability — PgBouncer fallback, health/ready SELECT 1, Redis reconnectOnError
0a952e8  Task 9: DB/infra reliability — PgBouncer fallback, health/ready SELECT 1, Redis reconnectOnError
144851f  Task 7: production hardening — SES email, Sentry, tier rate limits, CORS lockdown, health probes
bdf5b2a  Task 5: add ctrlchecks-ai-generator systemd service unit template
```

**Finding:** Server is running Task 9 code. Tasks 10–12 and all Task 11 microservice code have NOT been deployed. The `[ahead 116]` indicates the local git tracking on the server is against an old origin reference — the actual GitHub remote is well behind the local workspace commits.

### Systemd units (only 3 running)
```
ctrlchecks-ai-generator.service     loaded active running
ctrlchecks-execution-worker.service loaded active running   ← old-style queue worker (not execution-engine)
ctrlchecks-worker.service           loaded active running
```

**Finding:** None of the 5 Task 11 microservices have systemd units installed. `ctrlchecks-execution-worker` is the **legacy** execution queue worker (pre-Task 11A), not the new `execution-engine` service.

### Port health
```
:3001 → {"status":"ready","checks":{"db":"ok","redis":"ok"}}  ✅
:3002 → {"status":"ok","service":"ai-generator","port":3002}  ✅
:3003 → FAIL  (execution-engine not deployed)
:3004 → FAIL  (credential-service not deployed)
:3005 → FAIL  (notification-service not deployed)
:3006 → FAIL  (trigger-service not deployed)
:3007 → FAIL  (workflow-crud-service not deployed)
```

### Feature flags in worker .env
```
(empty — no ENABLED/CANARY/LOCAL_WRITES/VAULT_WRITES vars found)
```

**Finding:** No microservice delegation flags exist in the worker `.env` on the server. All delegation is disabled by default (code defaults to `false`). Worker is running as pure monolith.

### Open ports
```
LISTEN 0.0.0.0:80    (nginx)
LISTEN 0.0.0.0:443   (nginx)
LISTEN 0.0.0.0:3001  node (worker)
LISTEN *:3002        node (ai-generator)
```

### Worker public health (HTTPS)
```
https://worker.ctrlchecks.ai/health → {"status":"healthy"}  ✅
```

### Frontend HTTP
```
http://app.ctrlchecks.ai → no response (DNS or nginx vhost not resolving)
```

---

## Critical Findings

### 1. Server is 116 commits behind local workspace
Tasks 10, 11A–11E, and 12 exist only in the local repo. They have never been pushed to GitHub or deployed to EC2. The worker on EC2 is the Task 9 monolith with no microservice extraction code at all.

**Impact:** All canary routing code, the extraction clients, highScaleMetrics, delegation counters, and the 5 new services are not live. The system is 100% monolith in production.

### 2. Microservices :3003–:3007 not deployed
No systemd units, no processes, no listening ports. Deploy scripts exist locally (`scripts/deploy-*.sh`) but have never been run against EC2.

### 3. Legacy execution-worker still running
`ctrlchecks-execution-worker.service` is the old-style queue consumer from before Task 11A. Once execution-engine is deployed and canary activated, this service may conflict or be redundant. Needs careful coordination.

### 4. No microservice flags in worker .env
The `.env` grep for `ENABLED|CANARY_PERCENT|LOCAL_WRITES|VAULT_WRITES|OAUTH_ENABLED` returned nothing. The worker starts with all feature flags at their code defaults (`false`), which is correct safety behavior — but means no delegation will happen even after deploy until flags are added to `.env`.

### 5. Frontend HTTPS not live
`app.ctrlchecks.ai` does not respond. nginx is running (ports 80/443 listening) but the vhost isn't resolving — DNS A record `app.ctrlchecks.ai → 3.7.115.58` is likely not set.

### 6. ai-generator healthy but worker flag status unknown
`:3002` responds and ai-generator is running. However, since the worker code on EC2 is Task 9 (pre-Task 11 flag wiring), the worker may not have `AI_GENERATOR_URL` in `.env` or may not be delegating to it. The delegation path through `AI_GENERATOR_URL=http://localhost:3002` needs to be verified.

---

## Activation Matrix (Actual vs. Plan)

| Service | Port | Plan says | EC2 truth | Gap |
|---|---|---|---|---|
| execution-engine | 3003 | Code: Phase 5 ✅ | NOT deployed, no systemd unit | Deploy + first flag setup needed |
| credential-service | 3004 | Code: Phase 4 ✅ | NOT deployed | Deploy + first flag setup needed |
| notification-service | 3005 | Code: Phase 4 ✅ | NOT deployed | Deploy + first flag setup needed |
| trigger-service | 3006 | Code: Phase 3 ✅ | NOT deployed | Deploy + first flag setup needed |
| workflow-crud-service | 3007 | Code: Phase 4 ✅ | NOT deployed | Deploy + first flag setup needed |

---

## Next Steps (Priority Order)

### Immediate (unblocks everything)
1. **Push local code to GitHub** — `git push origin main` from local workspace. This is prerequisite for all CI/CD deploys and for the server to pull the latest code.
2. **Deploy worker** — pull latest on EC2 (`git fetch && git reset --hard origin/main`) + `npm ci && npm run build` + `sudo systemctl restart ctrlchecks-worker`. This brings Tasks 10–12 + all delegation clients live.

### After worker is updated
3. **Deploy execution-engine** — `bash scripts/deploy-execution-engine.sh`; install systemd unit; create `.env`; set `EXECUTION_ENGINE_ENABLED=false` initially
4. **Deploy credential-service** — `bash scripts/deploy-credential-service.sh`
5. **Deploy notification-service** — `bash scripts/deploy-notification-service.sh`
6. **Deploy trigger-service** — `bash scripts/deploy-trigger-service.sh`
7. **Deploy workflow-crud-service** — `bash scripts/deploy-workflow-crud-service.sh`
8. **Add feature flags to worker `.env`** — add all `*_ENABLED=false` and `*_CANARY_PERCENT=0` vars; no delegation until intentionally ramped
9. **Address legacy execution-worker** — decide whether to stop/disable `ctrlchecks-execution-worker.service` before activating execution-engine canary

### Ops ramp (after services are deployed and healthy)
- Follow `MICROSERVICES_OPS_PLAYBOOK.md` → Standard Canary Ramp for each service
- Record soak milestones in Soak Decision Log

### Frontend
- Set DNS A record `app.ctrlchecks.ai → 3.7.115.58`
- Run `sudo certbot --nginx -d app.ctrlchecks.ai`
- Add Cognito callback URIs for `https://app.ctrlchecks.ai`
