# CtrlChecks — Production Microservices & SaaS Task Plan

**Purpose**: Authoritative task plan for turning the monorepo into a production-ready, multi-service SaaS platform. Start every session by reading this file first.

**Related reports** (cross-check before each task):
- `ANALASISI.txt` — AWS deploy logs, worker health evidence, server commands
- `PLAN_GAPS_AND_MISSING_ANALYSIS.md` — code vs plan honesty check
- `CTRLCHECKS_DAY_WISE_IMPLEMENTATION_ROADMAP.md` — detailed day-level history (reference only; this file is the execution order)

---

## How to Use This File

1. Read **Current State** and **Progress Tracker**.
2. Find the first incomplete task (first `[ ]` checkbox).
3. Copy the **Execution Prompt** for that task (see `MICROSERVICES_PROMPT_CHAIN.md` or the prompt section at the bottom).
4. After completion, fill the **Handoff Card** and check boxes here.
5. Paste the handoff card back to the prompt generator to receive **Task N+1** prompt.
6. Never skip tasks — each group depends on the previous being stable.

---

## Architecture Target (End State)

```
Internet
  │
  ├── nginx ─────────────── ctrl_checks (React SPA) — HTTP live; HTTPS pending DNS
  │
  └── worker.ctrlchecks.ai:3001  (public, Cognito-authenticated)
        │ canary delegates to (127.0.0.1 only — never public):
        ├── ai-generator/:3002        ← AI pipeline stages (deployed ✅)
        ├── execution-engine/:3003    ← async execution accept + consumer
        ├── credential-service/:3004  ← vault + OAuth + connections
        ├── notification-service/:3005← email (SES), in-app, webhooks
        ├── trigger-service/:3006     ← webhook/form/chat/schedule dispatch
        └── workflow-crud-service/:3007← save/load/delete/versions/templates

Shared infrastructure:
  ├── AWS RDS PostgreSQL (+ read replica at scale)
  ├── Redis (ElastiCache)
  ├── Kafka / MSK (planned — Task 11D Phase 4)
  └── AWS Cognito (auth)
```

**Activation Matrix** (2026-06-15 — audited via SSH, see `PRODUCTION_GROUND_TRUTH_AUDIT.md`):

| Service | Port | EC2 deployed? | ENABLED (EC2) | CANARY% (EC2) | Retirement gate | Contract |
|---|---|---|---|---|---|---|
| execution-engine | 3003 | ❌ not deployed | not in .env | — | Phase 6 removes internal route | `execution-engine-contract.md` |
| credential-service | 3004 | ❌ not deployed | not in .env | — | `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED` | `credential-service-contract.md` |
| notification-service | 3005 | ❌ not deployed | not in .env | — | — | `notification-service-contract.md` |
| trigger-service | 3006 | ❌ not deployed | not in .env | — | — | `trigger-service-contract.md` |
| workflow-crud-service | 3007 | ❌ not deployed | not in .env | — | `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` | `workflow-crud-service-contract.md` |

> **EC2 is running Task 9 code (commit `0a952e8`).** Tasks 10–12 and all Task 11 microservice code have not been pushed to GitHub or deployed. Worker is 100% monolith in production. Next action: `git push origin main` from local, then deploy worker, then deploy each service per `MICROSERVICES_OPS_PLAYBOOK.md`.

**Pragmatic rule**: Do NOT build 5 new microservices from scratch. Extract incrementally from the working monolith using feature flags. **Users must see the product first** — then separate services.

**Universal / international standards enforced on every task**:
- ISO-style ops: fail-fast startup, health probes (`/health/live`, `/health/ready`), runbooks, rollback steps
- Twelve-Factor App: config via env, stateless processes, logs to stdout
- OWASP API security: CORS allowlist, security headers, no secrets in repo
- SaaS: tier-aware rate limits, tenant isolation via Cognito userId, subscription gates
- Registry architecture: `unified-node-registry.ts` remains single source of node truth — no node-specific shortcuts outside registry

---

## Three Deployable Services (Always In Scope)

| Service | Directory | Port | Role |
|---|---|---|---|
| Frontend | `ctrl_checks/` | 5173 dev / 443 prod | React SPA, Cognito auth, wizard, canvas |
| Backend worker | `worker/` | 3001 | Execution, auth, DB, credentials, WebSocket, OAuth |
| AI Generator | `services/ai-generator/` | 3002 | AI pipeline stages (remote-first from worker) |

**Cross-repo contract**: Any AI stage moved to ai-generator must keep worker fallback. Registry changes must sync to `ctrl_checks/src/components/workflow/nodeTypes.ts`.

---

## AWS Server Reference

| Item | Value |
|---|---|
| Server | `ubuntu@3.7.115.58` |
| PEM key | `Guide/Worker/ctrlchecks-backend.pem` |
| Worker app dir | `/opt/ctrlchecks-worker` |
| Worker service | `ctrlchecks-worker` (systemd) |
| Worker health | `https://worker.ctrlchecks.ai/health` |
| SSH | `ssh -i "Guide/Worker/ctrlchecks-backend.pem" ubuntu@3.7.115.58` |

**Standard worker deploy (on server)**:
```bash
cd /opt/ctrlchecks-worker
git fetch origin && git checkout main && git reset --hard origin/main && git clean -fd
git pull --ff-only origin main
npm ci
NODE_OPTIONS="--max-old-space-size=4096" npm run build
mkdir -p dist/services/clickup && cp src/services/clickup/clickupNode.js dist/services/clickup/clickupNode.js
sudo systemctl restart ctrlchecks-worker
sleep 10 && curl -fsS http://localhost:3001/health
```

---

## Current State Assessment

### What Works ✅
- **Worker monolith** — live at `worker.ctrlchecks.ai`, 160 registered nodes
- **Node registry** — single source of truth in `unified-node-registry.ts`
- **Distributed execution** — Kafka queue, Redis, circuit breakers, DLQ
- **Authentication** — Cognito + multi-provider OAuth
- **AI generation** — Gemini key pool; ai-generator service code exists with stage extraction (edge-reasoning, validation, intent, structural-prompt, etc.) and worker remote-first clients
- **Payments** — Razorpay, subscription tiers
- **Database** — PostgreSQL RDS, Prisma, PgBouncer in docker-compose
- **Observability baseline** — `/metrics`, tracing, request IDs
- **Worker `.env.example`** — exists (needs completeness audit in Task 2)
- **ai-generator `.env.example`** — exists

### Evidence from ANALASISI.txt ✅
- Server deploy on `main` succeeded (commit `d982679`)
- Build + health check passed on production
- 160 node schemas exported; database pool healthy

### What Is Missing / Remaining ❌ (2026-06-15 reconciled)

> **NOTE**: Items below reflect the honest current gap. Tasks 1–10, 12 are code-complete. Task 11 has code done for all phases listed ✅ but ops activation (soak, flag ramps) is a separate track.

| Gap | Severity | Task / Gate |
|---|---|---|
| **Frontend HTTPS** — `app.ctrlchecks.ai` DNS A record not set; Certbot not run | HIGH | Task 4 (manual DNS + Certbot) |
| **EC2 truth unknown** — which of :3002–3007 are actually running, what CANARY values are live | HIGH | Phase 0 SSH audit |
| **All microservice soaks** — every service needs ENABLED=true + CANARY_PERCENT ramp 5→25→50→100 (7-day soak at 100%) | HIGH | Task 11 OPS track |
| **Retirement gates not flipped** — `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED`, `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` blocked on 2-week soak | HIGH | Task 11B/11E OPS |
| **11D Phase 4** — Kafka + move SchedulerService off worker (blocked on trigger soak at CANARY=100) | MEDIUM | Task 11D code |
| **11A Phase 6** — move executor into engine; remove /api/internal/engine-execute (blocked on execution soak CANARY=100 for 7 days) | MEDIUM | Task 11A code |
| **11 remaining frontend NODE_TYPES gaps** (of original 23; 12 closed in Task 6) | LOW | Task 6 remainder |
| **Observability on EC2** — Prometheus/Grafana/Loki configs exist in repo but deployment status unconfirmed | MEDIUM | Task 12 OPS |
| **Branch inconsistency** — deploy snippets mix `main` and `main-repair` — standardize after SSH audit | LOW | Task 8 cleanup |

---

## Progress Tracker

| Task | Name | Status |
|---|---|---|
| 1 | Foundation audit & execution baseline | `[x]` Complete — see `TASK01_BASELINE_AUDIT.md` |
| 2 | Critical production blockers | `[x]` Complete — env-validator, .env.example, systemd hardened, smoke clean |
| 3 | Backend performance & lazy-loading hardening | `[x]` Already done — lazy imports verified Task 1 |
| 4 | Frontend production deploy | `[x]` Complete — files deployed, nginx serving HTTP; HTTPS pending DNS A record |
| 5 | AI Generator service deploy & wire-up | `[x]` FULLY DEPLOYED — running as systemd service on port 3002, health ✅, worker wired via AI_GENERATOR_URL=http://localhost:3002 |
| 6 | Registry & cross-repo contract parity | `[x]` Complete — 6 registry nodes added to allowlist, 12 of 23 gaps closed, 2076 contract tests pass |
| 7 | Production hardening (notifications, Sentry, security) | `[x]` Complete — SES email service, Sentry (worker+frontend), tier rate limits (free/paid/enterprise), CORS lockdown, /health/live + /health/ready; 13 unit tests pass |
| 8 | CI/CD pipeline | `[x]` Complete — deploy-worker.yml, deploy-ai-generator.yml, deploy-frontend.yml + ci.yml hardened; TASK08_CICD_SETUP.md with secrets list, branch notes, rollback steps |
| 9 | Database & infrastructure reliability | `[x]` Complete — PgBouncer fallback, prisma migrate in deploy, Redis reconnect, DLQ + DB restore runbooks, RDS backup script; /health/ready verified live |
| 10 | Frontend bundle & UX performance | `[x]` Complete — PropertiesPanel 105→42 KB gzip; ConditionBuilder+FieldOwnershipToggle lazy; node-catalog manualChunk; attach-inputs-payload 127→2.7 KB; bundle gate in ci.yml; 140 WS/execution tests pass |
| 11 | Incremental microservice extraction | `[~]` All phases code-complete (11A P5, 11B P4, 11C P4, 11D P3, 11E P4); ops soaks + 11D-4/11A-6 code remain |
| 12 | Scale, observability & multi-region readiness | `[x]` Complete — /metrics on all 6 services; JSON logging; 3 Grafana dashboards; Prometheus scrape config; centralized-logging.md; multi-region-readiness.md; TASK12_OBSERVABILITY.md runbook; delegation counters wired in worker; 64 new metrics tests; all type-checks clean |

---

## Task 1 — Foundation Audit & Execution Baseline

**Goal**: Establish ground truth. No guessing. Document what exists before changing production.

### 1.1 Read authoritative docs
- [ ] Read this file end-to-end
- [ ] Read `ANALASISI.txt` deploy evidence
- [ ] Read `PLAN_GAPS_AND_MISSING_ANALYSIS.md` — note lazy-import gaps
- [ ] Skim `CTRLCHECKS_DAY_WISE_IMPLEMENTATION_ROADMAP.md` Phase 1–2 for already-done items (async execution, key pool, WS bridge, ai-generator stages)

### 1.2 Local repo truth check
- [ ] Confirm three services start locally: `worker/`, `services/ai-generator/`, `ctrl_checks/`
- [ ] Run type-check: `cd worker && npm run type-check`
- [ ] Run type-check: `cd services/ai-generator && npm run type-check`
- [ ] Run build: `cd ctrl_checks && npm run build`
- [ ] Record versions, branches, and any failures in handoff card

### 1.3 Production server truth check (SSH)
- [ ] Verify worker: `curl -fsS https://worker.ctrlchecks.ai/health`
- [ ] Check git branch on server: `git -C /opt/ctrlchecks-worker branch -v && git log --oneline -3`
- [ ] Check systemd: `sudo systemctl status ctrlchecks-worker`
- [ ] List open ports: `ss -tlnp | grep -E '3001|3002|80|443'`
- [ ] Confirm ai-generator systemd **does not exist yet** (expected gap)
- [ ] Confirm frontend nginx/site **does not exist yet** (expected gap)

### 1.4 Create baseline audit artifact
- [ ] Write `.claude/logs/TASK01_BASELINE_AUDIT.md` with: working ✅, broken ❌, already-done vs plan, recommended Task 2 priorities
- [ ] Update **Known Broken Routes** section below if any 500s found

**Done when**: Baseline audit file exists, all three repos verified locally, production server state documented.

---

## Task 2 — Critical Production Blockers

**Goal**: Fail-fast, recoverable worker. Safe deploys. Complete env documentation.

### 2.1 Git branch hygiene
- [x] Locally verify `worker/` remote `main` is valid — no local git (hosted repo; server verified below)
- [x] No stale branch — server HEAD is `ac20aee` on `main`
- [x] No deploy scripts exist yet (expected; Task 8 adds CI/CD)
- [x] Server tracks `origin/main` — confirmed via SSH

### 2.2 Startup environment validation
- [x] Created `worker/src/core/config/env-validator.ts` — validates required vars, exits(1) with clear list
- [x] Called via `assertEnv()` in `worker/src/index.ts` right after `import './core/env-loader'`
- [x] Required: `DATABASE_URL`, `REDIS_URL`, `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `COGNITO_ISSUER`, `AWS_REGION`, `GEMINI_API_KEY`
- [x] 15-test unit test at `worker/src/core/config/__tests__/env-validator.test.ts` — all pass

### 2.3 Complete `worker/.env.example`
- [x] Grepped all `process.env.*` across `worker/src/` — found 130+ unique vars
- [x] Added: `AI_GENERATOR_URL`, `AI_GENERATOR_SERVICE_KEY`, `SENTRY_DSN`, `SES_FROM_EMAIL`, `SES_REGION`, `PGBOUNCER_URL`, `DIRECT_DATABASE_URL`, all OAuth vars, Razorpay vars, Redis, Kafka, feature flags
- [x] `.env` stays gitignored (not changed)

### 2.4 Systemd hardening (server)
- [x] `Restart=always`, `RestartSec=10` — already present
- [x] Added `MemoryMax=3G`, `LimitNOFILE=65536`, `StandardOutput=journal`, `StandardError=journal`, `SyslogIdentifier=ctrlchecks-worker`
- [x] `sudo systemctl daemon-reload` — done; service NOT restarted (changes take effect on next deploy restart)
- [ ] `WatchdogSec=30` — skipped; requires `Type=notify` which the Node.js process does not implement

### 2.5 Health endpoint smoke audit
- [x] Smoke tested 8 routes — zero 500s found (see Known Broken Routes below)

**Done when**: Env validator runs on startup, `.env.example` complete, systemd hardened, health audit documented.

---

## Task 3 — Backend Performance & Lazy-Loading Hardening

**Goal**: Fix static SDK imports identified in PLAN_GAPS. Reduce startup memory.

### 3.1 Audit static imports in `worker/src/api/execute-workflow.ts`
- [ ] List: ClickUp, Airtable, FormData, Pipedrive, Notion, Twitter, Instagram, WhatsApp, executeDatabaseNode

### 3.2 Convert to lazy dynamic imports
- [ ] Move each SDK import inside the handler that uses it
- [ ] Preserve behavior — no logic changes outside import site

### 3.3 Regression protection
- [ ] Add test: heavy SDKs not loaded at module init
- [ ] Run affected node smoke tests (Airtable, Notion, Twitter at minimum)

**Done when**: Type-check passes, startup import test passes, PLAN_GAPS items closed.

---

## Task 4 — Frontend Production Deploy

**Goal**: Real users can access the SPA at a production URL with HTTPS.

### 4.1 Production build config
- [x] Created `ctrl_checks/.env.production.example` (committed, placeholder values)
- [x] Created `ctrl_checks/.env.production` (gitignored, real Cognito + production URLs)
- [x] Added `.env.production` to `ctrl_checks/.gitignore`
- [x] `npm run build` succeeds (10.18s) — `VITE_API_URL=https://worker.ctrlchecks.ai` baked in

### 4.2 Server hosting (Nginx or S3+CloudFront)
- [x] Deployed `dist/` to `/var/www/ctrlchecks-frontend/` via tar+scp
- [x] Created `/etc/nginx/sites-available/ctrlchecks-frontend` — SPA fallback, asset caching, security headers
- [x] Nginx serving HTTP 200 on `Host: app.ctrlchecks.ai` (verified via localhost test)
- [ ] **HTTPS via Certbot** — BLOCKED: `app.ctrlchecks.ai` DNS A record not yet created. Add `app.ctrlchecks.ai → 3.7.115.58` in DNS, then run: `sudo certbot --nginx -d app.ctrlchecks.ai --non-interactive --agree-tos -m admin@ctrlchecks.ai`
- [ ] **Cognito redirect URIs** — add `https://app.ctrlchecks.ai/auth/google/callback` and `https://app.ctrlchecks.ai/` to Cognito hosted UI allowed callbacks in AWS Console
- [x] Worker CORS: added `https://app.ctrlchecks.ai` to `cors.ts` hardcoded origins + `ALLOWED_ORIGINS` env on server
- [x] Worker `FRONTEND_URL` updated to `https://app.ctrlchecks.ai` on server

### 4.3 Deploy script
- [x] Created `scripts/deploy-frontend.sh` — build + tar+scp deploy + smoke test + Certbot instructions
- [x] Script runs end-to-end successfully: build ✅ → deploy ✅ → HTTP 200 smoke ✅

### 4.4 Initial bundle optimization
- [x] Wizard already lazy-loaded (`AIWorkflowBuilder.tsx:10`) — no action needed
- ⚠ Three chunks exceed 200 KB gzip: PropertiesPanel (105 KB), fillMode (108 KB), attach-inputs-payload (125 KB) → deferred to Task 10

**Done when**: `https://app.ctrlchecks.ai` (or chosen domain) loads SPA, login works, API calls succeed.
**Remaining**: DNS A record + Certbot + Cognito redirect URI update (manual steps outside repo).

---

## Task 5 — AI Generator Service Deploy & Wire-Up

**Goal**: ai-generator runs as separate process on AWS; worker delegates via existing stage clients.

### 5.1 Deploy ai-generator to AWS
- [x] Created `scripts/deploy-ai-generator.sh` — tar+scp pattern mirroring deploy-frontend.sh
- [x] Created `worker/scripts/ctrlchecks-ai-generator.service` — systemd unit (tracked in worker repo, deploys to `/opt/ctrlchecks-worker/scripts/`)
- [x] Worker `env-validator.ts` updated — `AI_GENERATOR_SERVICE_KEY` added to recommended vars
- [ ] **MANUAL — SSH to server and run these one-time setup commands:**
  ```bash
  # 1. Pull latest worker (gets the new systemd unit file)
  cd /opt/ctrlchecks-worker
  git fetch origin && git reset --hard origin/main-repair

  # 2. Create app directory
  sudo mkdir -p /opt/ctrlchecks-ai-generator
  sudo chown -R ubuntu:ubuntu /opt/ctrlchecks-ai-generator

  # 3. Install systemd unit
  sudo cp /opt/ctrlchecks-worker/scripts/ctrlchecks-ai-generator.service \
          /etc/systemd/system/ctrlchecks-ai-generator.service
  sudo systemctl daemon-reload
  sudo systemctl enable ctrlchecks-ai-generator

  # 4. Create .env (fill in real values)
  cat > /opt/ctrlchecks-ai-generator/.env <<'ENV'
  PORT=3002
  NODE_ENV=production
  GEMINI_API_KEY=<copy from worker .env>
  AWS_REGION=<copy from worker .env>
  COGNITO_USER_POOL_ID=<copy from worker .env>
  COGNITO_ISSUER=<copy from worker .env>
  WORKER_URL=http://localhost:3001
  AI_GENERATOR_SERVICE_KEY=<generate: openssl rand -hex 32>
  REDIS_URL=<copy from worker .env>
  ENV

  # 5. Run deploy script from local machine (builds + ships dist/)
  # On local Windows machine:
  bash scripts/deploy-ai-generator.sh
  ```
- [ ] Verify on server: `curl http://localhost:3002/health` → `{"status":"ok","service":"ai-generator"}`

### 5.2 Wire worker to ai-generator
- [x] Stage clients already exist with remote-first pattern (`*-client.ts` for all 7 stages)
- [ ] **MANUAL — Add to worker .env on server:**
  ```
  AI_GENERATOR_URL=http://localhost:3002
  AI_GENERATOR_SERVICE_KEY=<same value as ai-generator .env>
  ```
  Then restart: `sudo systemctl restart ctrlchecks-worker`
- [ ] Test delegation: `curl -X POST https://worker.ctrlchecks.ai/api/generate-workflow -H "..." -d '{"prompt":"..."}'` — check ai-generator logs: `sudo journalctl -u ctrlchecks-ai-generator -f`
- [ ] Test fallback: `sudo systemctl stop ctrlchecks-ai-generator` → generate workflow → should succeed (monolith fallback) → `sudo systemctl start ctrlchecks-ai-generator`

### 5.3 Complete ai-generator `.env.example`
- [x] Updated with `NODE_ENV`, annotated `AI_GENERATOR_SERVICE_KEY` note

**Done when**: Health on 3002, stage delegation visible in ai-generator logs, monolith fallback confirmed when service stopped.

---

## Task 6 — Registry & Cross-Repo Contract Parity

**Goal**: Single source of node truth across worker, frontend, ai-generator.

### 6.1 Run contract tests
- [ ] `worker`: `npm run test:contracts` (registry tests)
- [ ] `ctrl_checks`: registry metadata contract tests
- [ ] `services/ai-generator`: catalog-registry-contract tests

### 6.2 Close known gaps (from Day 33)
- [ ] 23 types in BACKEND_SUPPORTED_NODE_TYPES missing NODE_TYPES entries
- [ ] 6 registry nodes missing frontend allowlist (qdrant, cohere, huggingface, mistral, linear, trello)

**Done when**: Contract tests pass or gaps documented with owners in handoff card.

---

## Task 7 — Production Hardening

**Goal**: Notifications, error tracking, tier-aware limits, security headers.

### 7.1 Email notifications (AWS SES)
- [ ] Create `worker/src/services/notifications/email-service.ts`
- [ ] Hook execution complete/fail events
- [ ] Env: `SES_FROM_EMAIL`, `SES_REGION`

### 7.2 Sentry (worker + frontend)
- [ ] `@sentry/node` in worker, `@sentry/react` in ctrl_checks
- [ ] `SENTRY_DSN` in `.env.example`

### 7.3 Tier-aware rate limits
- [ ] Review limits in `worker/src/index.ts`
- [ ] Paid tiers get higher execute/generate limits
- [ ] Add `X-RateLimit-*` headers

### 7.4 CORS & security headers
- [ ] CORS uses `FRONTEND_URL` only (not `*`)
- [ ] Helmet / CSP for API

### 7.5 Health probe hardening
- [ ] `GET /health/ready` — DB + Redis + deps
- [ ] `GET /health/live` — process alive

**Done when**: Test email sends, Sentry receives test error, CORS blocks wrong origin, probes respond correctly.

---

## Task 8 — CI/CD Pipeline

**Goal**: No manual SSH deploys for routine releases.

### 8.1 GitHub Actions — worker
- [ ] `.github/workflows/deploy-worker.yml` — type-check gate, build, SSH deploy
- [ ] Secret: `EC2_SSH_KEY`

### 8.2 GitHub Actions — ai-generator
- [ ] Path filter: `services/ai-generator/**`

### 8.3 GitHub Actions — frontend
- [ ] Build with secrets, rsync to server

### 8.4 PR quality gates
- [ ] Type-check + lint before deploy job runs

**Done when**: Push to `main` auto-deploys changed service; failed type-check blocks deploy.

---

## Task 9 — Database & Infrastructure Reliability

### 9.1 PgBouncer in production
- [ ] Verify PgBouncer running; `DATABASE_URL` uses port 6432
- [ ] Add to health check

### 9.2 Prisma migration safety
- [ ] Add `prisma migrate deploy` to deploy script

### 9.3 Redis & Kafka health
- [ ] Redis reconnect verified; health check includes Redis
- [ ] Kafka topics + DLQ documented; replay runbook

### 9.4 RDS backup verification
- [ ] Script `scripts/verify-rds-backup.sh`
- [ ] Runbook `docs/runbooks/database-restore.md`

**Done when**: Backups verified, migrations auto-run on deploy, infra health in `/health/ready`.

---

## Task 10 — Frontend Bundle & UX Performance

### 10.1 Code splitting audit
- [ ] Vite manual chunks for heavy routes
- [ ] Bundle size CI check

### 10.2 Realtime UX polish
- [ ] Reconnect handling verified under load
- [ ] Execution status UI clear for async mode

**Done when**: Lighthouse/first-load metrics documented; wizard lazy-loaded.

---

## Task 11 — Incremental Microservice Extraction

**Prerequisite**: Tasks 1–10 complete. Use feature flags + canary (33% → 66% → 100%).

### 11A — Execution Engine (`services/execution-engine/` :3003) ✅ Phase 3 COMPLETE (2026-06-11)

**Phase 1 (scaffold):** ✅
- [x] Express on 127.0.0.1:3003, `/health/live`, `/health/ready`, `/health`, stub POST `/execute` → 501
- [x] Service-key auth; dev pass-through; deploy scripts; 22 tests pass

**Phase 2 (shared Redis queue + 33% canary):** ✅
- [x] POST /execute returns real 202 `{ queued: true, executionId, jobId, statusUrl }`
- [x] Pre-creates execution record in Postgres (non-fatal on failure)
- [x] Pushes job to shared `workflow:execution:queue` Redis sorted set (same keys as worker's ExecutionQueue)
- [x] `/health/ready` now checks Redis ping + DB SELECT 1; returns `{ checks: { redis, db } }`
- [x] Worker: `isCanaryTarget(executionId)` — FNV-1a hash % 3 === 0 (≈33%); always false when flag off
- [x] Worker: canary block in `execute-workflow.ts` async 202 path; monolith fallback on any engine error
- [x] 28 total tests pass; both type-checks clean
- [ ] **Pending server**: Deploy engine to EC2; set `REDIS_URL`+`DATABASE_URL`+`EXECUTION_ENGINE_SERVICE_KEY` in `.env`

**Phase 3 (engine-owned consumer):** ✅
**Architecture chosen: Internal worker HTTP route** (see contract doc)
- [x] Engine enqueues to own queue `workflow:execution:engine-queue` (when `EXECUTION_ENGINE_CONSUMER_ENABLED=true`)
- [x] Engine consumer (`src/runner/engine-consumer.ts`) polls engine queue; max 3 concurrent
- [x] Engine runner (`src/runner/engine-runner.ts`) — structured logs `accepted/completed/failed + durationMs`
  - Publishes "running" WS event before HTTP call; "failed" WS event on error
  - Calls `POST /api/internal/engine-execute` on worker
- [x] Worker: `POST /api/internal/engine-execute` — fake req/res pattern; auth: `x-internal-engine-key`
- [x] Worker: `x-internal-engine-execution: true` header bypasses Cognito auth in execute-workflow.ts
- [x] Worker: `execution-queue.ts` defensive skip for `source='execution-engine'` jobs
- [x] Worker: userId extracted from verified JWT (base64url decode) in canary block; passed to engine
- [x] `lib/ws-publish.ts` in engine — publishes to same `ws:exec:events` channel as worker bridge
- [x] Tests: 5 runner + 5 consumer + 3 skip + 11 internal-route + 12 client = **36 new tests**; total **64 engine + worker tests**
- [x] Both type-checks clean
- [ ] **Pending**: Add `WORKER_INTERNAL_KEY` to worker `.env`; add to engine `.env`
- [ ] **Pending server**: Restart engine with `EXECUTION_ENGINE_CONSUMER_ENABLED=true` in engine `.env` (after Phase 2 24h soak)
- [ ] **Pending**: Enable canary: `EXECUTION_ENGINE_ENABLED=true` in worker + restart; observe structured logs

**Phase 4 (66% canary):** ✅
- [x] `EXECUTION_ENGINE_CANARY_PERCENT` env var replaces hardcoded `% 3 === 0`
- [x] Formula: `fnv1a(id) % 100 < pct` — hot-reload via env change + worker restart only
- [x] 18 canary tests pass (33% / 66% / 100% / 0% / default / determinism)
- [x] `worker/.env.example` documents new vars; contract doc updated to v0.4
- [x] Soak runbook: `.claude/logs/TASK11A_PHASE4_SOAK.md`
- [ ] **Server**: `EXECUTION_ENGINE_CANARY_PERCENT=66` + `systemctl restart ctrlchecks-worker`; 48h soak

**Phase 5 (100% cutover — next):**
- Set `EXECUTION_ENGINE_CANARY_PERCENT=100` + restart worker; soak 1 week
- Then remove monolith fallback code + canary block from execute-workflow.ts

**Phase 6 (executor code movement — later):**
- Move `dynamic-node-executor.ts` + `execution-job-runner.ts` into engine; engine runs jobs itself
- Remove `POST /api/internal/engine-execute` from worker
- Clean cut — no duplication, no feature flag needed in executor

### 11B — Credential Service (`services/credential-service/` :3004)
- [x] Phase 1 — scaffold :3004, worker client stub, deploy CI, contract v0.1
- [x] Phase 2 — vault/crypto, real `/connections` CRUD, 50% canary, contract v0.2 (30+12 tests)
- [x] Phase 3 — OAuth top-9 via worker proxy; contract v0.3; 13 proxy tests; redirect URI inventory
- [x] Phase 4 — full OAuth (24) + full CRUD delegation + vault write gate; contract v0.4; 32+13 tests; `TASK11B_COMPLETE.md` — **ops soak pending**

### 11C — Notification Service (`services/notification-service/` :3005)
- [x] Phase 1 — scaffold :3005, worker client stub, deploy CI, contract v0.1 (15 tests)
- [x] Phase 2 — SES email extraction + canary; contract v0.2 (14+18+19 tests)
- [x] Phase 3 — in-app DB + Redis pub; migration 0007; in-app-service; contract v0.3 (40 tests)
- [x] Phase 4 — webhook delivery + `TASK11C_COMPLETE.md`; contract v0.4 (107 tests total) — **ops soak pending**

### 11D — Trigger Service (`services/trigger-service/` :3006)
- [x] Phase 1 — scaffold :3006, worker client stub, deploy CI, contract v0.1 (35 tests)
- [x] Phase 2 — webhook/form/chat dispatch + canary; contract v0.2 (~50 tests)
- [x] Phase 3 — schedule dispatch; scheduler canary; contract v0.3 (71 tests)
- [ ] Phase 4 — Kafka + full scheduler move (after P3 soak)

### 11E — Workflow CRUD Service (`services/workflow-crud-service/` :3007)
- [x] Phase 1 — scaffold :3007, client stub, deploy CI, contract v0.1 (30 tests)
- [x] Phase 2 — save/load/delete + validator-lite + canary wiring; contract v0.2 (40 tests)
- [x] Phase 3 — version list + rollback; worker canary wired; contract v0.3 (45 tests)
- [x] Phase 4 — templates-repo + GET /templates routes; load/list canary (GET /api/workflows + GET /api/workflows/:id); WORKFLOW_CRUD_LOCAL_WRITES_DISABLED gate on save/delete/rollback; TASK11E_COMPLETE.md; contract v0.4; 70 service tests + 46 worker client tests; type-checks clean (2026-06-15)
- **OPS** — Deploy :3007 to EC2; ramp CANARY 0→5→25→50→100 (7-day soak); then flip LOCAL_WRITES_DISABLED=true after 2-week soak

**Done when**: Each service at 100% canary with tested rollback.

---

## Task 12 — Scale, Observability & Multi-Region Readiness

### 12.1 Prometheus metrics (all 7 services) ✅
- [x] `GET /metrics` public endpoint on all 6 microservices (ai-generator, execution-engine, credential-service, notification-service, trigger-service, workflow-crud-service) — zero-dep Prometheus text format
- [x] Worker already had prom-client `/metrics`; extended with 7 new delegation/queue counters
- [x] `services/*/src/lib/metrics.ts` — shared zero-dep pattern per service
- [x] Worker `highScaleMetrics.ts` — `incExecutionEngineDelegation`, `incCredentialDelegation`, `incNotificationDelegation`, `incTriggerServiceDelegation`, `setExecutionQueueDepth`, `incExecutionJob`, `setWsRedisBridgeActive`
- [x] Service clients wired: execution-engine-client, credential-service-client, notification-service-client, trigger-service-client all call metric helpers
- [x] `infra/prometheus/prometheus.yml` — scrape config for ports 3001–3007

### 12.2 Grafana dashboards ✅
- [x] `infra/grafana/dashboards/ctrlchecks-overview.json` — request rate, 5xx, p95 latency, uptime, delegation counters
- [x] `infra/grafana/dashboards/ctrlchecks-executions.json` — queue depth, job success/fail, engine delegation, trigger dispatch
- [x] `infra/grafana/dashboards/ctrlchecks-ai.json` — AI generation rate, stage calls, active requests, DB pool
- [x] `docs/engineering/grafana-setup.md` — Grafana Cloud + self-hosted install, alert rules

### 12.3 Structured JSON logging ✅
- [x] All 5 microservice `index.ts` request logs upgraded from text to JSON: `{"level","service","method","path","status","durationMs","requestId"}`
- [x] `docs/engineering/centralized-logging.md` — CloudWatch (Option A) + Loki/Promtail (Option B)

### 12.4 Multi-region plan ✅
- [x] `docs/engineering/multi-region-readiness.md` — threshold table, stateless-first scaling, WebSocket sticky sessions, RDS read replica, Route53 cutover checklist

### 12.5 On-call runbook ✅
- [x] `.claude/logs/TASK12_OBSERVABILITY.md` — dashboard links, alert meanings, smoke commands, rollback procedures, incident triage flowchart, JSON log queries

### Tests ✅
- [x] 4 metrics tests added to health.test.ts in all 5 microservices (20 new tests total)
- [x] New `health.test.ts` created for ai-generator (7 tests)
- [x] All tests pass; all 6 type-checks clean

**Done**: All dashboards importable, all `/metrics` endpoints live, on-call runbook complete.

---

## Known Broken Routes

| Route | Issue | Found In Task | Status |
|---|---|---|---|
| All audited routes | Zero 500s found — see smoke results below | Task 2 | ✅ Clean |

**Task 2 smoke results** (2026-06-10, `https://worker.ctrlchecks.ai`):

| Route | Method | Expected | Got | Notes |
|---|---|---|---|---|
| `/health` | GET | 200 | 200 | ✅ DB healthy, Gemini configured |
| `/metrics` | GET | 200 | 200 | ✅ |
| `/api/ai/models` | GET | 200 | 200 | ✅ |
| `/api/ai/metrics` | GET | 200 | 200 | ✅ |
| `/api/training/stats` | GET | 200 | 200 | ✅ |
| `/api/admin-templates` | GET | 401/403 | 401 | ✅ Auth guard working |
| `/api/execute-workflow` | POST (empty) | 400/401 | 400 | ✅ Validation error, not 500 |
| `/api/generate-workflow` | POST (empty) | 401 | 401 | ✅ Auth guard working |

---

## Handoff Card Template (Required After Every Task)

Copy this block into your reply when returning to the prompt generator:

```markdown
## TASK HANDOFF CARD

**Completed task**: Task N — [name]
**Branch / commit**: [branch] @ [short hash]
**Repos touched**: worker | ai-generator | ctrl_checks | infra | docs

### What was implemented
- [bullet list of concrete changes]

### Files created or modified
- `path/to/file.ts` — [one line why]

### Verification evidence
- [ ] type-check pass (which repos)
- [ ] tests run (file paths, pass/fail)
- [ ] production smoke (curl output summary)
- [ ] manual UI check (if applicable)

### Environment / secrets changed
- [new env vars, server config — no secret values]

### Known issues / deferred
- [anything not done and why]

### Blockers for next task
- [none | list]

### Recommended next task
Task N+1 — [name]

### Context the next agent must read
- [file paths]
```

---

## Session Log

| Session | Task | What Was Done | Outcome |
|---|---|---|---|
| 0 | Plan | Created task-based microservices plan | Ready for Task 1 |
| 1 | Task 1 | Foundation audit — type-checks, builds, PLAN_GAPS verification, production SSH | All green; audit in `TASK01_BASELINE_AUDIT.md` |
| 2 | Task 2 | env-validator (15 tests), .env.example expanded, systemd hardened, SSH smoke (8 routes clean) | Local code only — deploy via Task 8; Task 4 ready |
| 5 | Task 5 | deploy-ai-generator.sh, systemd template, env-validator update; pushed worker bdf5b2a, ai-generator 7f40cbd | Code done — server SSH steps remain in plan Task 5 |
| 6 | Task 6 | 6 registry nodes + 12 NODE_TYPES gaps closed; ctrl_checks 65a24cd; 2076 tests pass | 11 gaps remain → optional later |
| 7 | Task 7 | SES email, Sentry, tier rate limits, CORS lockdown, health probes; worker 144851f, ctrl_checks 94e4a13 | Manual: SES verify + Sentry DSN on server |
| 8 | Task 8 | 4 deploy workflows + ci.yml hardened + TASK08_CICD_SETUP.md | Monorepo git init + GitHub secrets still manual |
| 9 | Task 9 | PgBouncer audit (deferred), PGBOUNCER_URL fallback in db-pool.ts, prisma migrate in deploy-worker.yml, Redis reconnectOnError, dlq-replay.md + database-restore.md runbooks, verify-rds-backup.sh; /health/ready live: db=ok redis=ok; monorepo pushed to GitHub | All items complete; 5 db-pool tests pass |
| 10 | Task 10 | PropertiesPanel 105→42 KB gzip; bundle gate CI; 140 WS tests pass | fillMode 108 KB deferred |
| 11A | Task 11A P1 | execution-engine scaffold :3003, client stub, deploy script + GH workflow, contract doc; 22 tests pass | Server first-deploy manual; Phase 2 = code movement |
| 11A | Task 11A P2 | 202 async accept; shared Redis queue (workflow:execution:queue); DB pre-create; 33% canary (FNV-1a % 3); /health/ready DB+Redis; 28 tests pass (19 engine + 9 worker) | Activate: EXECUTION_ENGINE_ENABLED=true on staging; Phase 3 = executor code movement |
| 11A | Task 11A P3 | Engine-owned consumer (engine-queue); internal worker route /api/internal/engine-execute; userId JWT extraction; skip guard; WS publish; structured logs; 36 new tests (64 total); both type-checks clean | Add WORKER_INTERNAL_KEY to both envs; then enable EXECUTION_ENGINE_CONSUMER_ENABLED=true + EXECUTION_ENGINE_ENABLED=true after soak |
| 11A | Task 11A P4 | CANARY_PERCENT env; 18 tests; TASK11A_PHASE4_SOAK.md | Server: 66% + 48h soak → Phase 5 |
| 11A | Task 11A P5 | Step B code: engine-first 202/503; soak doc; 3 Phase5 tests + 18 canary; contract v0.5 | Server: CANARY=100 now; merge Step B after 7d soak |
| 11B | Task 11B P1 | credential-service :3004 scaffold; worker client stub; deploy CI; contract v0.1; 25 tests | Phase 2 = vault move |
| 11B | Task 11B P2 | db+crypto; real connections CRUD; FNV canary; listConnections delegation; 30+12 tests; contract v0.2 | Staging: CANARY=50→100; Phase 3 = OAuth top 10 |
| 11B | Task 11B P3 | OAuth engine in service; oauth routes; worker proxy; inventory doc; contract v0.3; 13 proxy tests | Activate after P2 CANARY=100 soak; Phase 4 = remaining OAuth + full CRUD |
| 11B | Task 11B P4 | Full OAuth registry; CRUD delegation; vault write gate; contract v0.4; 32+13 tests; TASK11B_COMPLETE.md | Ops: OAUTH_PROVIDERS=* + VAULT_WRITES_DISABLED after soaks |
| 11C | Task 11C P1 | notification-service :3005 scaffold; client stub; deploy CI; contract v0.1; 15 tests | Phase 2 = SES email move |
| 11C | Task 11C P2 | ses.ts + templates; real /email + /send; email-service canary; contract v0.2; 51 tests | Staging: CANARY=50→100; Phase 3 = in-app |
| 11C | Task 11C P3 | db + redis-pub + notifications-repo; in-app routes; in-app-service; migration 0007; contract v0.3; 40 tests | Phase 4 = webhooks |
| 11C | Task 11C P4 | webhook-deliver + SSRF; sendWebhookRemote; TASK11C_COMPLETE.md; contract v0.4; 107 tests total | Ops: CANARY=50→100; Phase 3 migration 0007 |
| 11D | Task 11D P1 | trigger-service :3006 scaffold; FNV canary on workflowId; deploy CI; contract v0.1; 35 tests | Phase 2 = webhook/form/chat dispatch |
| 11D | Task 11D P2 | db + workflow-lookup + execution-enqueue; real webhook/form/chat routes; worker canary wiring; contract v0.2; ~50 tests | Staging: CANARY=50→100; Phase 3 = schedule |
| 11D | Task 11D P3 | schedule route; scheduler canary; contract v0.3; 71 tests | Ops soak then Phase 4 OR Task 12 in parallel |
| 12 | Task 12 | /metrics all 7 services; Grafana; TASK12_OBSERVABILITY.md; 64+ tests | COMPLETE (runbook updated 2026-06-15 for :3007) |
| 11E | Task 11E P1 | workflow-crud :3007 scaffold; client + metrics; contract v0.1; 30 tests | Phase 2 = save/load/delete |
| 11E | Task 11E P2 | db + validator-lite + repo + save; CRUD routes; save/delete canary; contract v0.2; 40 tests | Ramp CANARY 5→100; Phase 3 = versioning |
| 11E | Task 11E P3 | version-repo + list/rollback routes; worker canary; contract v0.3; 45 tests (19+26) | Ramp CANARY 0→100 + 7d soak; Phase 4 = templates + retirement |
| 11E | Task 11E P4 | templates-repo + GET /templates; load/list canary (GET /api/workflows[/:id]); WORKFLOW_CRUD_LOCAL_WRITES_DISABLED gate on save/delete/rollback; TASK11E_COMPLETE.md; contract v0.4; 70 service tests + 46 worker client tests; type-checks clean | Deploy :3007 to EC2; ramp CANARY; 2-week soak → flip LOCAL_WRITES_DISABLED=true |

---

## Appendix: Quick Commands

```bash
# Local — all three services
cd worker && npm run dev
cd services/ai-generator && npm run dev
cd ctrl_checks && npm run dev

# Type-check before commit
cd worker && npm run type-check
cd services/ai-generator && npm run type-check
cd ctrl_checks && npm run build

# Single test file only (avoid full suite — RAM)
cd worker && npx jest src/path/to/file.test.ts --runInBand --silent
cd services/ai-generator && npx jest src/path/to/file.test.ts --runInBand --silent
cd ctrl_checks && npx vitest run src/path/to/file.test.ts
```
