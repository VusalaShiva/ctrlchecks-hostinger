# CtrlChecks — Master Development & Analysis Document (MDA)
**Simple explanations + actual project technical context for every task**
**Last Updated: June 2026**

---

## How to Read This Document

Every section has two layers:
- **Plain explanation** — what is happening in everyday language
- **📁 Technical Context** — the actual files, functions, env vars, and code in YOUR project that relate to it

**Difficulty Scale:** 🟢 Easy | 🟡 Medium | 🔴 Hard
**Risk Scale:** 🔵 Low Risk | 🟠 Medium Risk | 🔴 High Risk

---

# PART 0 — UNDERSTANDING THE CURRENT SITUATION

---

## What is CtrlChecks?

CtrlChecks is an AI-powered workflow automation tool. Users describe what they want to automate (example: "send me a Slack message every time I get a Gmail from my boss") and the AI builds the workflow for them automatically.

### 📁 Technical Context — Project Structure
```
ctrlchecks-ai-workflow-os/
│
├── ctrl_checks/          ← React + Vite frontend (runs on port 5173)
│   └── src/
│       ├── components/workflow/WorkflowCanvas.tsx   ← Visual node editor (@xyflow/react)
│       ├── components/wizard/AutonomousAgentWizard.tsx  ← 8,000+ line AI builder wizard
│       ├── stores/workflowStore.ts                  ← Zustand global state
│       ├── lib/api/                                 ← API helper functions
│       ├── pages/ConnectionsPage.tsx                ← Where users manage OAuth
│       └── integrations/aws/client.ts               ← awsClient (Cognito auth + DB proxy)
│
└── worker/               ← Node + Express backend (runs on port 3001)
    └── src/
        ├── index.ts                                 ← Entry point — all 73 routes registered here
        ├── api/                                     ← Route handlers
        ├── core/
        │   ├── registry/unified-node-registry.ts   ← THE most important file — defines all 100+ node types
        │   ├── execution/dynamic-node-executor.ts  ← Runs each node at execution time
        │   ├── orchestration/unified-graph-orchestrator.ts ← All DAG/graph mutations
        │   ├── credentials/credential-vault.ts     ← Stores/retrieves secrets
        │   └── database/
        │       ├── aws-db-client.ts                ← Main DB connection (pg.Pool → AWS RDS)
        │       └── db-client.ts                    ← Entry: getDbClient()
        └── services/
            ├── ai/
            │   ├── gemini-orchestrator.ts          ← Central LLM facade
            │   ├── gemini-key-pool.ts              ← Multi-key rotation
            │   ├── workflow-lifecycle-manager.ts   ← Coordinates generation
            │   ├── model-manager.ts                ← Which AI model to use
            │   ├── stages/                         ← 5 AI pipeline stage files
            │   └── pipeline/workflow-generation-pipeline.ts
            └── workflow-executor/                  ← Execution helpers
```

---

## The Problem Right Now

Imagine a small restaurant where ONE chef does everything — takes orders, cooks, washes dishes, handles billing, and answers the phone. That works fine for 5 customers. When 80 walk in, the chef collapses.

**That is exactly what CtrlChecks is today.**

Everything runs inside the `worker/` folder as one single program. One program handles:
- AI generating workflows
- Running/executing those workflows
- User login and passwords
- Connecting to Google, Slack, Notion, etc.
- Saving and loading data
- Real-time updates on screen
- Billing and payments

**Current breaking points:**
| Problem | What it means | Where in the code |
|---------|---------------|-------------------|
| Breaks at 80 users | Only 80 people can use at once | `worker/src/index.ts` — single Express process |
| Gemini rate limit at 12 | Only 12 simultaneous AI generations | `worker/src/services/ai/gemini-orchestrator.ts` — single key |
| 30-second execution block | Entire server freezes during workflow run | `worker/src/api/execute-workflow.ts` — synchronous handler |
| 5-second mobile load | App too heavy on first page load | `AutonomousAgentWizard.tsx` bundled into every page |
| Single AI key | No failover when key hits rate limit | `GEMINI_API_KEY` — only one in `worker/.env` |
| WebSocket breaks | Live updates stop with 3 servers | No shared pub/sub between instances |

---

## The 6-Month Timeline At a Glance

```
Week 1–2   → Fix the broken parts. Launch. (500 users)
Week 3–4   → Watch real users. Fix real problems.
Week 5–8   → Split AI generation into its own program.
Week 9–13  → Split everything else. Retire the old app.
Week 14–18 → Move to professional AWS cloud services.
Week 19–22 → Make it faster, smarter, cheaper.
Week 23–26 → Prove it handles 1 million users.
```

---

---

# PHASE 1 — WEEKS 1–2 (Days 1–10)
# "Fix the Engine Before the Race"

---

## What is Happening?

Five important fixes are already written in the code but have NOT been turned on or fully verified. This phase checks each fix works, stress-tests the system, and prepares for public launch.

**Analogy:** The mechanic already upgraded the engine, brakes, and fuel system — but nobody has test driven the car yet. This phase is the test drive.

---

## Fix 1 — SDK Lazy Loading

**Simple explanation:**
Every time the app starts, it loads ALL tools — Google tools, Twitter tools, Notion tools, Airtable tools — even if nobody is using them. This wastes startup time and memory.

After this fix: tools only load the first time someone actually needs them.

**What changes:** App starts 800ms faster. Uses 120MB less memory per server.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **File changed** | `worker/src/api/execute-workflow.ts` and `worker/src/core/execution/dynamic-node-executor.ts` |
| **Before (problem)** | `import Airtable from 'airtable'` at the TOP of the file — loads on every startup |
| **After (fix)** | `function getAirtable() { return require('airtable') }` — loads only when first called |
| **Specific getter functions** | `getAirtable()`, `getNotionClient()`, `getTwitterClient()`, `getPipedriveClient()` |
| **How to verify** | Search `execute-workflow.ts` for `new Airtable(` — should find zero remaining direct calls |
| **Dev 1 check (Day 1)** | `npm run type-check` in `worker/` must show 0 errors |

---

## Fix 2 — Database Connection Pool (PgBouncer)

**Simple explanation:**
The database only allows 30 connections at a time. The 3 app servers open connections directly — they quickly run out. A "traffic controller" (PgBouncer) now sits in the middle and routes 400 app connections through just 30 real database connections.

**What changes:** Database no longer crashes under moderate traffic.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **File changed** | `infra/docker-compose.yml` — adds `pgbouncer` as a new Docker service |
| **Config file** | `infra/.env` — fill in `RDS_HOST`, `RDS_USER`, `RDS_PASSWORD` from `worker/.env` |
| **Pool size setting** | `PGBOUNCER_DEFAULT_POOL_SIZE` env var (start at 30, tune based on load test results) |
| **App connects to** | `localhost:5433` (PgBouncer port) instead of direct RDS port 5432 |
| **DB client file** | `worker/src/core/database/aws-db-client.ts` → exported via `db-client.ts` → `getDbClient()` |
| **Verify command** | `psql "postgresql://user:pass@localhost:5433/ctrlchecks" -c "SHOW pools;"` — should show `ctrlchecks` row |
| **Dev 2 check** | Confirm connection string in `worker/.env` points to `localhost:5433` not direct RDS |

---

## Fix 3 — Async Workflow Execution

**Simple explanation:**
When a user clicks "Run Workflow," the app currently freezes for up to 30 seconds waiting for it to finish. All other users wait too.

After this fix: the app immediately says "Got it" (under 200ms), gives a tracking ID, works in the background, and the user sees live updates.

**What changes:** The server never freezes. Every user gets fast responses.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **File changed** | `worker/src/api/execute-workflow.ts` |
| **Before** | Route handler runs the entire execution synchronously, returns result after 30s |
| **After** | Returns HTTP 202 immediately with `{ jobId, executionId }` — execution runs async |
| **Turn on with** | `EXECUTION_QUEUE_ENABLED=true` in `worker/.env` |
| **Frontend polls** | `GET /api/execution-queue/job/:id` every 2 seconds for result |
| **Sync fallback** | `POST /api/execute-workflow?_sync=1` — old behavior kept for testing |
| **Dev 2 verify** | Network tab in browser: `POST /api/execute-workflow` must return 202 with `jobId` field in under 1s |

---

## Fix 4 — WebSocket Bridge (Redis Pub/Sub)

**Simple explanation:**
The app has 3 servers. When one server runs a workflow, only users on THAT server see live updates. Users on the other 2 servers see nothing.

After this fix: all servers share updates through a shared message board (Redis). Everyone sees everything regardless of which server they are connected to.

**What changes:** Live execution updates work correctly for ALL users on ALL servers.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **New file created** | `worker/src/ws-redis-bridge.ts` |
| **Shared channel name** | `ws:execution:events` — all 3 instances subscribe to this Redis channel |
| **How it works** | Instance B runs workflow → publishes to `ws:execution:events` → Instance A reads it → sends to browser |
| **Integrated in** | `worker/src/index.ts` — `wsRedisBridge.initialize()` called on startup |
| **Frontend WebSocket** | `GET /ws/executions` — browser connects here for live updates |
| **Confirm working** | Check logs for `[WsRedisBridge] Initialized` on all 3 instances |
| **Test** | `redis-cli ping` — should return `PONG` confirming Redis connectivity |

---

## Fix 5 — Lazy Load the AI Wizard

**Simple explanation:**
The AI workflow builder is a massive 8,000-line program that currently loads on EVERY page — dashboard, connections, settings — even when users have no intention of building a workflow.

After this fix: the AI wizard only downloads when a user actually clicks to open it.

**What changes:** Dashboard loads instantly. Mobile load time drops from 5s to under 1s.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **File changed** | `ctrl_checks/src/components/wizard/AutonomousAgentWizard.tsx` (8,000+ lines) |
| **How it works** | Vite code-splitting via `React.lazy(() => import('./AutonomousAgentWizard'))` + `<Suspense>` wrapper |
| **Build output** | Wizard appears as a SEPARATE chunk file (e.g. `AutonomousAgentWizard-[hash].js`) NOT inside `index.js` |
| **Dev 2 verify (Day 1)** | `npm run build` in `ctrl_checks/` → confirm wizard is a separate chunk, note its size in KB |
| **Dev 2 verify (Day 2)** | Open DevTools → Network tab → load dashboard → wizard chunk should NOT fire until AI Builder page opens |
| **Verify command** | `npm run build` then check `dist/` folder — wizard chunk should be separate |

---

## Bonus Fix — Multiple AI Keys (Gemini Key Pool)

**Simple explanation:**
Right now there is one AI key. If 12 people generate workflows at the same time, the 13th person gets an error. With multiple keys rotating, capacity multiplies.

**What changes:** Many more people can generate simultaneously without hitting limits.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **New file** | `worker/src/services/ai/gemini-key-pool.ts` |
| **Integrated into** | `worker/src/services/ai/gemini-orchestrator.ts` |
| **Add keys in** | `worker/.env` — add `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, ... |
| **How keys are managed** | Round-robin rotation. Redis tracks usage per key. Auto-skips keys near rate limit. |
| **Redis keys used** | `gemini:ratelimit:*` — one key per Gemini API key for tracking |
| **Confirm working** | Restart worker, check logs for `[GeminiKeyPool] Loaded 2 API key(s)` |
| **Alert feature** | Alerts when ALL keys are near exhaustion simultaneously |

---

## What the Team Does — Day by Day

| Day | Dev 1 (Backend/Infra) | Dev 2 (Frontend/Testing) |
|-----|-----------------------|--------------------------|
| 1 | `npm run type-check` in `worker/` — must be 0 errors. `npm run build`. Check `getAirtable()` getters exist in `execute-workflow.ts` | `npm run build` in `ctrl_checks/`. Confirm wizard is separate chunk. Run `npm run test:vitest` |
| 2 | Fill `infra/.env` with RDS credentials. `docker compose up pgbouncer -d`. Verify `SHOW pools;` returns ctrlchecks row | Navigate to `localhost:5173/workflow/new`. DevTools Network: confirm wizard chunk only loads on AI Builder page |
| 3 | Add `GEMINI_API_KEY_1` + `GEMINI_API_KEY_2` to `worker/.env`. Set `EXECUTION_QUEUE_ENABLED=true`. Restart. Check logs for `[GeminiKeyPool] Loaded 2 API key(s)` | Execute a saved workflow in browser. Confirm response is instant (HTTP 202). Confirm polling delivers result. |
| 4 | Test Redis WebSocket bridge across instances. Check logs for `[WsRedisBridge] Initialized` | Test Google, GitHub, Slack OAuth end-to-end. Confirm token saved. Confirm "Connected" status. |
| 5 | Install k6. Run baseline load test: 10 VU, 5 min. Save results to `tests/load/baseline-10vu.json` | `npm test` in `worker/`. `npm run test:vitest` in `ctrl_checks/`. Save results to `tests/baseline-results.md` |
| 6 | Ramp k6 to 50 VU. Watch `database.waitingCount` in health endpoint. Tune `PGBOUNCER_DEFAULT_POOL_SIZE` | Write `scripts/smoke-test.sh` — generate → save → execute → poll → verify |
| 7 | Ramp k6 to 100 VU, 10 min. Document which service breaks first | Test full new-user journey: signup → connect Google → generate workflow → execute → view history |
| 8 | Fix whatever broke at 100 VU. Most likely: DB pool or Gemini rate limit. Retest. Document final config in `infra/.env.example` | Fix new-user journey issues. Common: missing loading states, OAuth popup not closing |
| 9 | Launch checklist: PgBouncer health, Redis ping, Kafka topics exist, Gemini `keyCount >= 2`, DB idle under 15% | Checklist: Cognito login, JWT verification, Google OAuth, execute returns 202, WebSocket connects |
| 10 | CloudWatch log groups `/ctrlchecks/worker`, `/ctrlchecks/nginx`. Set alarms: error rate > 5%, `database.waitingCount` > 5. Test rollback script takes under 3 min | Write launch announcement. Configure Sentry DSN in `ctrl_checks/.env` and `worker/.env`. Confirm errors appear in Sentry. |

---

## Estimation

| Item | Time |
|------|------|
| Plan says | 10 working days |
| Realistic with debugging | 12–14 working days |
| Buffer recommended | +3 days |

**Difficulty:** 🟡 Medium (fixes already written, just needs verifying)
**Risk:** 🔵 Low (nothing new is being built, just tested)

---

## How You Know Phase 1 Is Done ✓

- [ ] `npm run type-check` in `worker/` returns 0 errors
- [ ] `npm run build` in `ctrl_checks/` shows `AutonomousAgentWizard` as a separate chunk
- [ ] `psql ... -c "SHOW pools;"` returns a row for ctrlchecks (PgBouncer working)
- [ ] `POST /api/execute-workflow` returns HTTP 202 + `jobId` in under 200ms
- [ ] Logs show `[WsRedisBridge] Initialized` on all 3 instances
- [ ] Logs show `[GeminiKeyPool] Loaded 2 API key(s)`
- [ ] 100 VU k6 test: p95 under 5s, error rate under 2%
- [ ] `tests/load/baseline-10vu.json` file saved
- [ ] Sentry captures errors correctly
- [ ] Rollback script tested: under 3 minutes

---

---

# PHASE 2 — WEEKS 3–4 (Days 11–20)
# "Go Live and Listen"

---

## What is Happening?

**Day 11 is the public launch day.** No new features this week — 100% focus on watching what real users do, fixing real problems, and preparing the first service extraction in the background.

**Analogy:** You opened your restaurant. Now you watch real customers eat, see what they complain about, and fix it before the dinner rush.

---

## Week 3 — Launch Day + Monitoring

| Day | What Happens |
|-----|-------------|
| Day 11 | Launch! 8am: smoke test against production URL. 9am: switch DNS. Watch `GET /health` every 5 min. Monitor CloudWatch. |
| Day 12 | Review CloudWatch + Sentry errors from Day 11. Fix top 2 backend errors, top 2 frontend errors. Deploy fixes. |
| Day 13 | Check Gemini key stats: `redis-cli keys "gemini:ratelimit:*"`. Survey first 10 real users. Check `GET /api/execution-queue/stats`. |
| Day 14 | Fix top 3 user-reported issues. Common: OAuth redirect URLs wrong for production domain, CORS errors, mobile layout |
| Day 15 | Create `services/` folder at repo root. Create `services/ai-generator/` with empty `src/`, `package.json`, `tsconfig.json`, `Dockerfile` |

### 📁 Technical Context — Monitoring Setup
| Item | Detail |
|------|--------|
| **CloudWatch log groups** | `/ctrlchecks/worker` and `/ctrlchecks/nginx` |
| **Error rate alarm** | Alert if error rate in `/ctrlchecks/worker` exceeds 5% over 5 minutes |
| **DB alarm** | Alert if `database.waitingCount` from `GET /health` exceeds 5 |
| **Sentry** | Frontend DSN in `ctrl_checks/.env`, Backend DSN in `worker/.env` |
| **Smoke test** | `scripts/smoke-test.sh` — runs: generate workflow → save → execute → poll status → verify result |
| **Gemini key check** | `redis-cli keys "gemini:ratelimit:*"` — shows usage per key |
| **Execution queue check** | `GET /api/execution-queue/stats` — shows pending count |

---

## Week 4 — Post-Launch Stabilization + AI Generator Prep

The live app is untouched. Service structure is being built in the background.

| Day | What Happens |
|-----|-------------|
| Day 16 | **Copy** (NOT move) AI files into `services/ai-generator/src/services/ai/` |
| Day 17 | Copy pipeline files. Write contract tests in `tests/contracts/ai-generation.test.ts` |
| Day 18 | Create `services/ai-generator/src/index.ts`. Fix all TypeScript import path errors. |
| Day 19 | Fix remaining errors. Resolve `unified-node-registry` dependency. Test on mobile. |
| Day 20 | `npm run build` in `services/ai-generator/` succeeds. `npm run start` on port 3002 — health endpoint responds. Write status report. |

### 📁 Technical Context — Files Copied on Days 16–17
```
FROM worker/src/services/ai/          → TO services/ai-generator/src/services/ai/
  gemini-orchestrator.ts              (central LLM facade)
  gemini-key-pool.ts                  (multi-key rotation)
  model-manager.ts                    (which AI model to use)
  metrics-tracker.ts                  (usage tracking)
  performance-monitor.ts              (latency monitoring)
  gemini-models.ts                    (model config)
  stages/                             (all 5 pipeline stage files — entire folder)
  workflow-lifecycle-manager.ts       (coordinates generation flow)
  pipeline/workflow-generation-pipeline.ts

FROM worker/src/api/                  → TO services/ai-generator/src/api/
  generate-workflow.ts                (main generation route handler)
  [3 capability-selection files]      (capability selection routes)
```
| Item | Detail |
|------|--------|
| **Key dependency problem** | `unified-node-registry.ts` is imported by generation pipeline — it lives in `worker/src/core/registry/` |
| **Temporary fix** | Create HTTP client that calls `GET /api/node-definitions` on the monolith to get node schemas |
| **Contract tests file** | `tests/contracts/ai-generation.test.ts` — verifies new service returns same JSON structure as monolith |
| **New service entry point** | `services/ai-generator/src/index.ts` — Express server, 2 routes: `POST /api/generate-workflow` and `POST /api/capability-selection/analyze` |
| **Health check** | `GET http://localhost:3002/health` must respond |
| **Weekly status report** | Tracks: user count, workflow count, execution count, top errors, what changed |

---

## Estimation

| Item | Time |
|------|------|
| Plan says | 10 working days |
| Realistic with debugging | 12–15 working days |

**Difficulty:** 🟡 Medium | **Risk:** 🔵 Low (live app untouched)

---

## How You Know Phase 2 Is Done ✓

- [ ] App live for 2 weeks with no critical outages
- [ ] First 10 real users surveyed — responses documented
- [ ] Top 3 user-reported issues fixed and deployed to production
- [ ] `services/ai-generator/` folder exists with `package.json`, `tsconfig.json`, `Dockerfile`
- [ ] `npm run build` inside `services/ai-generator/` succeeds
- [ ] `GET http://localhost:3002/health` responds
- [ ] Week 1 status report written

---

---

# PHASE 3 — WEEKS 5–8 (Days 21–40)
# "Separate the AI Brain and the Execution Engine"

---

## What is Happening?

The two most resource-heavy parts of the app — AI generation and workflow execution — are pulled out of the main app and given their own dedicated programs.

**Analogy:** Instead of one chef doing everything, you now have a specialist pastry chef (AI Generator) and a specialist line cook (Execution Engine). The restaurant just takes orders. The specialists do the heavy work.

---

## Task A — AI Generator Service (Weeks 5–6, Days 21–30)

**Simple explanation:**
A completely separate program on port 3002. It ONLY handles the AI generation process — taking a user's text prompt and turning it into a workflow. Nothing else.

### 📁 Technical Context — AI Generator Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/ai-generator/` |
| **Port** | 3002 |
| **Entry point** | `services/ai-generator/src/index.ts` |
| **Routes** | `POST /api/generate-workflow`, `POST /api/capability-selection/analyze`, `GET /api/generation-jobs/:jobId` |
| **Toggle switch** | `AI_GENERATOR_ENABLED=true` in `worker/.env` |
| **Proxy in monolith** | `worker/src/index.ts` — when toggle is true, routes `/api/generate-workflow` and `/api/capability-selection/*` to port 3002 |
| **BullMQ queue** | Wraps every Gemini call — prevents burst of simultaneous requests from causing 429 errors |
| **Env file** | `services/ai-generator/.env` — `PORT=3002`, `DATABASE_URL` (through PgBouncer), `REDIS_URL`, `GEMINI_API_KEY_1` through `_4`, `COGNITO_USER_POOL_ID` |
| **Node registry** | Calls `GET /api/node-definitions` on monolith — temporary bridge until monolith retires |
| **Docker** | Added as `ai-generator` service in `infra/docker-compose.yml` |

### AI Generation Pipeline — What Stays the Same
The pipeline stages inside the service are IDENTICAL to the monolith. Nothing changes about HOW generation works, only WHERE it runs:
```
User prompt
  → Intent analysis (Gemini)               ← stages/ folder, same code
  → Capability grouper                     ← same code
  → User selects nodes (CapabilityStage UI)
  → Structural prompt generation            ← same code
  → WorkflowLifecycleManager               ← same code
  → UnifiedGraphOrchestrator (validates DAG) ← same code
  → Workflow JSON returned                 ← same structure
```

### Canary Deployment Steps
```
Day 24: AI_GENERATOR_ENABLED=true on app1 ONLY → 33% of traffic goes to new service
Day 25: Enable on app2 → 66% traffic. If stable 4h → enable app3 → 100% traffic
Day 26: Delete generation code from worker/src/index.ts (monolith no longer handles it)
```
| Code deleted from monolith on Day 26 | Why |
|--------------------------------------|-----|
| `generateWorkflowRoute` import and registration | Now handled by AI Generator |
| `analyzeCapabilitySelection` | Now handled by AI Generator |
| `generateCapabilityWorkflow` | Now handled by AI Generator |
| `confirmCapabilityWorkflow` | Now handled by AI Generator |
| All `smartPlanner*` routes | Now handled by AI Generator |

---

## Task B — Execution Engine Service (Weeks 7–8, Days 31–40)

**Simple explanation:**
A completely separate program on port 3003. It ONLY runs/executes workflows — going through each node, calling Google/Slack/etc., storing results. Uses a Kafka queue so the main server never waits.

### 📁 Technical Context — Execution Engine Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/execution/` |
| **Port** | 3003 |
| **Entry point** | `services/execution/src/index.ts` |
| **Routes** | `POST /api/execute-workflow` (enqueues to Kafka only), `GET /api/execution-status/:id`, `POST /api/executions/:id/cancel` |
| **Toggle switch** | `EXECUTION_ENGINE_ENABLED=true` in `worker/.env` |
| **Proxy in monolith** | `worker/src/index.ts` — routes execute requests to port 3003 when toggle is true |
| **Main execution file copied** | `worker/src/api/execute-workflow.ts` (~20,000 lines) → `services/execution/src/api/` |

### Files Copied into Execution Service
```
FROM worker/src/api/                      → services/execution/src/api/
  execute-workflow.ts                     (THE main file — 20,000 lines)
  cancel-execution.ts
  distributed-execute-workflow.ts

FROM worker/src/services/workflow-executor/  → services/execution/src/services/workflow-executor/
  [entire folder]

FROM worker/src/core/execution/           → services/execution/src/core/execution/
  dynamic-node-executor.ts               (runs each node type)
  [rest of folder]

FROM worker/src/services/               → services/execution/src/services/
  execution-queue.ts
```

### Kafka Execution Flow
```
Browser clicks "Run"
  → POST /api/execute-workflow (Execution Engine HTTP server, port 3003)
  → Publishes message to Kafka topic: execution.queued
  → Returns HTTP 202 + { jobId } immediately (under 200ms)

Kafka Consumer Worker (separate process):
  → Reads from execution.queued
  → Calls the 20,000-line execute-workflow.ts main handler
  → Node 1 runs → output → Node 2 runs → output → ... (unchanged logic)
  → {{$json.field}} template resolution (unchanged)
  → Credentials injected via credential-resolver.ts (unchanged)
  → Publishes result to execution.completed or execution.failed
  → Publishes WebSocket update to Redis channel: ws:execution:events
```

### Kafka Topics Created
| Topic | Purpose | Partitions |
|-------|---------|-----------|
| `execution.queued` | New workflow run requests | 8 |
| `execution.completed` | Finished successfully | 8 |
| `execution.failed` | Failed with error | 8 |
| `execution.node.complete` | Individual node finished | 8 |

### What Does NOT Change in Execution
| Thing | Status | Where |
|-------|--------|-------|
| `{{$json.field}}` template resolution | Unchanged | Inside `execute-workflow.ts` |
| Node-to-node data passing | Unchanged | Inside `execute-workflow.ts` |
| `unifiedNodeRegistry.get(node.type)` | Unchanged | `unified-node-registry.ts` |
| Credential injection before node runs | Unchanged | `credential-resolver.ts` |
| Topological sort (DAG order) | Unchanged | Inside `execute-workflow.ts` |
| `dynamic-node-executor.ts` | Unchanged | Copied as-is |

### Canary Deployment Steps
```
Day 34: EXECUTION_ENGINE_ENABLED=true on app1 ONLY → 33% executions go to new service
Day 35: 24h canary. Watch WebSocket bridge — updates must still reach browsers
Day 36: Enable on app2, wait 4h, enable app3 → 100% execution traffic
Day 37: Delete executeWorkflowRoute from worker/src/index.ts
```

---

## Estimation

| Item | Time |
|------|------|
| Plan says | 20 working days |
| Realistic with debugging | 28–35 working days |
| Buffer recommended | +10 days |

**Difficulty:** 🔴 Hard | **Risk:** 🟠 Medium

---

## How You Know Phase 3 Is Done ✓

- [ ] AI Generator on port 3002 handling 100% of generation traffic
- [ ] `generateWorkflowRoute` and related code deleted from `worker/src/index.ts`
- [ ] `npm run type-check` in `worker/` passes with 0 errors after deletion
- [ ] Execution Engine on port 3003 handling 100% of execution traffic
- [ ] `executeWorkflowRoute` deleted from `worker/src/index.ts`
- [ ] Kafka topics `execution.queued`, `execution.completed`, `execution.failed` exist and working
- [ ] BullMQ queue in AI Generator: `redis-cli keys "bull:*"` shows BullMQ job keys
- [ ] `POST /api/execute-workflow` returns 202 + jobId — total response under 200ms
- [ ] Users: ~2,000–5,000 concurrent capacity | Cost: +$400–600/month

---

---

# PHASE 4 — WEEKS 9–13 (Days 41–65)
# "Separate Everything Else — Retire the Monolith"

---

## What is Happening?

Four more services are extracted. Then on Day 59, the `worker/` application is permanently removed from production. Six independent programs replace the one giant app.

**Analogy:** You now have 6 specialist stations — pastry, grill, prep, expediting, front of house, management. If the grill breaks, everything else keeps running.

---

## Service 3 — Credential Service (Port 3004) — Weeks 9–10

**Simple explanation:**
Handles ALL logins and connections — when users connect Google, GitHub, Slack, Notion. Stores passwords securely, manages the OAuth flow, returns access tokens.

**Why separate it:** OAuth flows compete with workflow execution for the same server process. A burst of login requests can slow down running workflows.

### 📁 Technical Context — Credential Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/credentials/` |
| **Port** | 3004 |
| **Entry point** | `services/credentials/src/index.ts` |
| **Toggle** | `CREDENTIAL_SERVICE_ENABLED=true` in `worker/.env` |
| **Routes proxied** | `/api/credential-connections/*`, `/api/oauth/*`, `/auth/*` |
| **Related frontend pages** | `ctrl_checks/src/pages/ConnectionsPage.tsx`, `ctrl_checks/src/components/connections/` (7 components including `ServicePickerGrid`, `NewConnectionModal`, `OAuthConnectButton`) |

### Files Copied into Credential Service
```
FROM worker/src/credentials-system/    → services/credentials/src/credentials-system/
  [entire folder]                       (credential vault, storage, retrieval)

FROM worker/src/api/                   → services/credentials/src/api/
  credential-connections.ts

FROM worker/src/index.ts (OAuth routes) → services/credentials/src/api/
  oauth-google.ts
  oauth-github.ts
  oauth-facebook.ts
  oauth-twitter.ts
  oauth-notion.ts
  oauth-linkedin.ts
  oauth-meta.ts
  oauth-salesforce.ts
  connections-catalog.ts
  connections-oauth.ts

Shared DB dependency:
  worker/src/core/database/db-pool.ts  → copied into service (own DB connection pool)
  worker/src/core/database/aws-db-client.ts → copied into service
```

| Critical setting | Detail |
|-----------------|--------|
| `FRONTEND_URL` env var | MUST be set correctly — OAuth callbacks redirect back here |
| OAuth redirect URIs | Every provider's app settings must list the NEW credential service URL, not the old monolith URL |
| `credential-vault.ts` | Stores/retrieves secrets keyed by `userId + provider` — logic unchanged |
| `comprehensive-credential-scanner.ts` | Still in AI Generator — scans generated workflow for required credentials |
| `credential-resolver.ts` | Still in Execution Engine — injects secrets just before `nodeDef.execute()` — unchanged |

---

## Service 4 — Notification Service (Port 3005) — Week 10

**Simple explanation:**
ONLY handles live updates on the browser screen. When a workflow runs, this service pushes real-time status updates to all connected browsers. Nothing else.

**Why separate it:** At 1 million users, WebSocket connections use ~50KB each = 50GB RAM just for WebSocket. This cannot share memory with the app servers.

### 📁 Technical Context — Notification Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/notifications/` |
| **Port** | 3005 |
| **Entry point** | `services/notifications/src/index.ts` (plain Node.js HTTP server, no Express needed) |
| **Based on** | `worker/src/ws-redis-bridge.ts` — promoted to a standalone service |
| **WebSocket path** | `/ws/executions` (same path users already connect to) |
| **Redis channel** | `ws:execution:events` — subscribes and forwards messages to connected browsers |
| **nginx config updated** | `infra/nginx.conf` — adds WebSocket proxy to port 3005 with headers: `proxy_http_version 1.1`, `proxy_set_header Upgrade $http_upgrade`, `proxy_set_header Connection "upgrade"` |
| **Removed from monolith** | `worker/src/index.ts` — delete lines calling `visualizationService.initialize(server)` and `chatServer.initialize(server)` |
| **Event types forwarded** | `NODE_UPDATE`, `EXECUTION_SNAPSHOT`, `EXECUTION_COMPLETE`, `EXECUTION_FAILED` |
| **Confirm working** | `[WsRedisBridge] Initialized` in notification service logs |

---

## Service 5 — Trigger Service (Port 3006) — Week 11

**Simple explanation:**
Watches for things that should START a workflow — a webhook call arrives, a form is submitted, a scheduled time hits, or a chat message arrives. When triggered, it puts a job into the execution queue via Kafka.

**Key improvement:** Scheduled workflows now fire EXACTLY ONCE even with 3 trigger servers running (BullMQ distributed locking via Redis).

### 📁 Technical Context — Trigger Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/triggers/` |
| **Port** | 3006 |
| **Entry point** | `services/triggers/src/index.ts` |
| **Kafka topic published** | `workflow.triggered` — Execution Engine subscribes to this |

### Files Copied into Trigger Service
```
FROM worker/src/api/     → services/triggers/src/api/
  webhook-trigger.ts
  form-trigger.ts
  chat-trigger.ts

FROM worker/src/services/  → services/triggers/src/services/
  scheduler.ts              (replaced with BullMQ cron — see below)
```

| Item | Detail |
|------|--------|
| **Scheduler replacement** | `scheduler.ts` logic replaced with `BullMQ repeat` feature — uses Redis-backed distributed locking |
| **Duplicate prevention test** | Start 2 trigger service instances + 1-minute schedule → workflow must fire EXACTLY once |
| **Kafka message format** | Contains: `workflowId`, trigger type, input data |
| **Execution Engine update** | Kafka consumer in Execution Engine also subscribes to `workflow.triggered` topic — fetches workflow definition from DB and starts execution |
| **Full pipeline** | Webhook → Trigger Service (port 3006) → Kafka `workflow.triggered` → Execution Engine → Kafka `execution.completed` → Redis `ws:execution:events` → Notification Service → Browser |
| **Chat trigger** | Also handles `GET /ws/chat` WebSocket (live chat-triggered workflows) |

---

## Service 6 — Workflow CRUD Service (Port 3007) — Week 12

**Simple explanation:**
Handles everything that is just saving and loading data — save a workflow, load it, browse templates, view execution history, manage subscriptions, process payments.

### 📁 Technical Context — Workflow CRUD Service
| Item | Detail |
|------|--------|
| **Service folder** | `services/workflow-crud/` |
| **Port** | 3007 |
| **Entry point** | `services/workflow-crud/src/index.ts` |
| **Auth middleware** | JWT verification copied from monolith — validates AWS Cognito tokens using `aws-jwt-verify` |
| **Read replica** | `DATABASE_URL_READER` env var — all SELECT queries route to Aurora read replica |
| **Test command** | `curl http://localhost:3007/api/db/workflows -H "Authorization: Bearer $TEST_TOKEN"` |

### Files Copied into CRUD Service
```
FROM worker/src/api/     → services/workflow-crud/src/api/
  save-workflow.ts
  admin-templates.ts
  templates.ts
  workflow-versioning.ts
  db-proxy.ts             ← SECURITY NOTE: must use strict allowlist, not arbitrary table names
  copy-template.ts
  delete-account.ts       ← GDPR: must delete ALL user data
  subscriptions.ts
  payments-razorpay.ts

Shared DB dependency (same as other services):
  db-pool.ts + aws-db-client.ts → copied, own connection pool
```

---

## The Monolith Retirement — Day 59

After Day 59, `worker/` no longer runs in production.

```
BEFORE Day 59:           AFTER Day 59:
                         ┌─ AI Generator      (port 3002) ← generation pipeline
                         ├─ Execution Engine  (port 3003) ← execute-workflow.ts
One Giant App  →  gone   ├─ Credential Service(port 3004) ← OAuth + credential vault
(worker/ folder)         ├─ Notification Svc  (port 3005) ← ws-redis-bridge.ts
                         ├─ Trigger Service   (port 3006) ← webhook/form/schedule/chat
                         └─ Workflow CRUD     (port 3007) ← save/load/templates/payments
```

**What happens to `worker/` folder:** It stays in the repository as legacy code but NO LONGER RUNS. The `infra/docker-compose.yml` removes `app1`, `app2`, `app3` entries. nginx routes directly to each service.

---

## Week 13 — Buffer Week (Days 61–65)

**This week is intentionally open for catch-up.** If on schedule, use for:

### 📁 Technical Context — Buffer Week Tasks
| Task | Technical Detail |
|------|-----------------|
| Fix top 3 backend errors | Check CloudWatch `/ctrlchecks/worker` logs by frequency |
| Fix top 3 frontend UX issues | Check Sentry for most frequent frontend errors |
| 200 VU stress test | k6 at 200 VU — watch which service CPU spikes first |
| Set up Kong API Gateway | Replaces `infra/nginx.conf` — all 73 routes configured in Kong |
| Kong rate limiting | Generation: 20 req/min per user. Execution: 40 req/min per user. Redis-backed (ElastiCache) |
| Grafana setup | Add OpenTelemetry `initTracer()` as first line in each service's `index.ts` |
| OpenTelemetry export | To Grafana Tempo or AWS X-Ray |

---

## Estimation

| Item | Time |
|------|------|
| Plan says | 25 working days |
| Realistic with debugging | 35–40 working days |
| Buffer recommended | +10 days beyond Week 13 |

**Difficulty:** 🟡 Medium | **Risk:** 🟠 Medium

---

## How You Know Phase 4 Is Done ✓

- [ ] All 6 services running and healthy on their ports (3002–3007)
- [ ] `worker/` removed from `infra/docker-compose.yml` — monolith not running
- [ ] `npm run type-check` passes in all 6 service folders
- [ ] Full user journey: signup → connect OAuth → generate → execute → view history → manage subscription
- [ ] Kong routing 100% of traffic — nginx removed from docker-compose
- [ ] 200 VU k6 test passes with under 2% errors
- [ ] OpenTelemetry traces visible in Grafana for all 6 services
- [ ] Users: ~10,000 concurrent capacity | Cost: ~$1,000/month

---

---

# PHASE 5 — WEEKS 14–18 (Days 66–90)
# "Move From Homemade to Professional Infrastructure"

---

## What is Happening?

All supporting systems — Redis cache, Kafka messaging, PostgreSQL database, servers — currently run as Docker containers on your own EC2 servers. This phase moves them to Amazon's professionally managed versions with automatic scaling, failover, and monitoring.

**Analogy:** Moving from a homemade kitchen to a professionally built commercial kitchen with automatic temperature control, built-in safety systems, and instant expansion capability.

---

## Migration 1 — Redis → AWS ElastiCache (Week 14)

**Simple explanation:**
Redis is a very fast memory system used for AI key tracking, rate limiting, live update messages, job queues, and session caching. The current Docker Redis has no backup — if it crashes, ALL 6 services are affected simultaneously.

**AWS ElastiCache:** 3 nodes. If one fails, another takes over automatically. Dedicated AWS network for lower latency.

**⚠️ Risk:** ALL 6 services depend on Redis. Plan migration for low-traffic window (weekend night).

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **Provision** | `cache.r7g.large`, 3 nodes, Redis 7.2, multi-AZ, TLS enabled |
| **Endpoint format** | `ctrlchecks-redis.abc123.ng.0001.apse1.cache.amazonaws.com:6379` |
| **Update in** | `REDIS_URL` env var in ALL 6 services' `.env.production` files |
| **TLS connection** | `redis-cli -h [endpoint] -p 6379 --tls ping` must return PONG |
| **Redis keys that must survive** | BullMQ job state (`bull:*`) for in-progress jobs, session tokens |
| **Redis keys that are ephemeral** | `gemini:ratelimit:*`, `rate:*`, `ws:*` — these reset harmlessly on restart |
| **Migration steps** | (1) Maintenance notice (2 min). (2) Update `REDIS_URL` in all services. (3) Rolling restart one service at a time. (4) Verify each after restart. |
| **Verify after** | BullMQ queues drain correctly. WebSocket pub/sub works. Rate limiting returns 429 correctly. |
| **Remove after** | Docker Redis removed from `infra/docker-compose.yml` |
| **CloudWatch alarm** | ElastiCache CPU > 70% or connection count > 5,000 |

---

## Migration 2 — Kafka → AWS MSK (Week 15)

**Simple explanation:**
Kafka carries workflow trigger messages to the execution engine (like a reliable postal service). The current Docker Kafka is a single server — if it goes down, no workflows can be triggered.

**AWS MSK:** 3 broker servers across 3 data centers. Messages route around any single failure.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **Provision** | `kafka.m5.large`, 3 brokers, Kafka 3.6.0, multi-AZ, TLS enabled |
| **All 7 topics to recreate on MSK** | `workflow.triggered`, `execution.queued`, `execution.node.complete`, `execution.completed`, `execution.failed`, `ai.generation.requested`, `request-queue-dlq` |
| **Each topic settings** | 8 partitions, replication-factor 3 |
| **Update in** | `KAFKA_BROKERS` env var in Trigger Service, Execution Engine, AI Generator, Workflow CRUD |
| **TLS required** | Add `ssl: true` to KafkaJS config in each service |
| **Migration timing** | Wait until `kafka-consumer-groups.sh --describe --all-groups` shows lag = 0 on all topics |
| **Migration steps** | (1) Wait for lag=0. (2) Stop Trigger Service briefly. (3) Update KAFKA_BROKERS everywhere. (4) Restart consumers first (Execution Engine), then producers (Trigger Service). (5) Send test webhook. |
| **Remove after** | Docker Kafka removed from `infra/docker-compose.yml` |
| **CloudWatch alarm** | Consumer lag on `execution.queued` > 1,000 messages |

---

## Migration 3 — RDS → Aurora PostgreSQL Serverless v2 (Week 16)

**Simple explanation:**
The database holds ALL user data. Current RDS is a fixed-size server — it does not scale. Aurora Serverless v2 automatically scales from 0.5 to 16 ACU (compute units) based on load. You pay only for what you use.

**⚠️ This is the HIGHEST RISK migration in the entire 6-month plan because it involves real user data.**

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **Aurora settings** | Serverless v2, 0.5–16 ACU, 1 writer + 1 reader (grow to 3 readers later) |
| **AWS DMS** | Creates replication instance, source endpoint (RDS), target endpoint (Aurora). Runs full-load task then switches to CDC (Change Data Capture) — every INSERT/UPDATE/DELETE replicated in under 1 second |
| **RDS Proxy** | Sits between services and Aurora. Manages connection pooling. Credentials via AWS Secrets Manager. |
| **Connection string change** | `DATABASE_URL` in ALL 6 services updated to Aurora via RDS Proxy endpoint |
| **DB client file** | `worker/src/core/database/aws-db-client.ts` → `getDbClient()` — just update the `DATABASE_URL` it reads |
| **Read replica routing** | Workflow CRUD service uses `DATABASE_URL_READER` for all SELECT queries |
| **Pre-migration backup** | `pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql` uploaded to S3 |
| **Cutover steps** | (1) Wait for DMS lag = 0. (2) Set app to read-only (2 min). (3) Update DATABASE_URL all services. (4) Stop DMS. (5) Rolling restart. (6) Smoke test. Total window: under 5 minutes. |
| **High-growth table** | `node_executions` — grows at 50M rows/day at scale. Needs monthly partitioning. |
| **Partitioning** | Range partitions by `created_at`. `pg_partman` extension automates monthly creation. |
| **Old RDS** | Do NOT delete for at least 1 week after migration — emergency rollback |
| **Migrations location** | `worker/prisma/migrations/` — run `npm run prisma:migrate` inside `worker/` after any schema changes |

---

## Migration 4 — EC2 Docker → ECS Fargate (Week 17)

**Simple explanation:**
Moving from "servers you manage" to "containers that manage themselves." Traffic spike at 3am → ECS automatically adds more containers in under 3 minutes. Traffic drops → extra containers shut down, you stop paying.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **ECS cluster** | `ctrlchecks-cluster` with `FARGATE` capacity provider |
| **ECR repositories** | One per service: `ctrlchecks-ai-generator`, `ctrlchecks-execution`, `ctrlchecks-credentials`, `ctrlchecks-notifications`, `ctrlchecks-triggers`, `ctrlchecks-workflow-crud` |
| **CI/CD pipeline** | GitHub Actions: push to main → build Docker image → push to ECR → update ECS service |
| **Task definitions** | CPU/memory allocation, env vars from AWS Secrets Manager (NOT hardcoded), health check command, CloudWatch log group |
| **Auto-scaling settings** | Target tracking: CPU 70%, Memory 80%. Min: 2 tasks. Max: AI Generator=20, Execution Engine=50, others=10 |
| **Deployment order** | Notification Service first (safest) → Workflow CRUD → Credential Service → Trigger Service → AI Generator → Execution Engine (last, most complex) |
| **ALB setup** | Application Load Balancer target group per service. Health check: `GET /health` on each service. |
| **WebSocket ALB** | Notification Service needs sticky sessions or consistent hash for WebSocket connections |
| **Fargate cost vs EC2** | Calculate: Fargate per-task cost × running tasks vs EC2 instance cost. Fargate wins at variable traffic. |
| **EC2 shutdown** | Stop (not terminate) EC2 instances for 1 week — emergency rollback option. |

---

## Migration 5 — CloudFront CDN + Security Hardening (Week 18)

**Simple explanation:**
CloudFront places copies of the frontend app on servers around the world. A user in London gets files from London, not India. Also: WAF blocks common hacking attempts, all secrets move to a secure vault.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **CloudFront for frontend** | Points to Vercel/S3 frontend origin. HTTPS only, HTTP/2, gzip. Static assets: 1-year TTL. `index.html`: no-cache (always fresh). |
| **Frontend build** | `ctrl_checks/` — Vite builds to `dist/` folder. `ctrl_checks/.env.local` points to production `VITE_API_URL` |
| **CloudFront for API** | Second distribution — routes `/api/*` to ALB. No caching (pass-through). |
| **AWS WAF** | Enabled on ALB. Blocks: SQL injection patterns, XSS patterns, IP rate limiting. |
| **AWS Secrets Manager** | Replaces all `.env` file secrets: `GEMINI_API_KEY_*`, `DATABASE_URL`, `REDIS_URL`, `COGNITO_*`, OAuth client secrets. ECS task definitions reference Secrets Manager ARNs. |
| **Security headers via Kong** | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy` — applied to ALL services via Kong plugin |
| **VPC Flow Logs** | Enabled — logs all network traffic for security investigations |
| **Kong rate limiting** | Redis-backed (ElastiCache). Generation: 20 req/min per user. Execute: 40 req/min per user. Replaces Express middleware rate limiting. |
| **Verify headers** | Browser DevTools → Network → Response Headers — must show all security headers |

---

## Estimation — Full Phase 5

| Item | Time |
|------|------|
| Plan says | 25 working days |
| Realistic with debugging | 36–45 working days |
| Biggest single risk | Aurora database migration |
| Buffer for Aurora alone | +5 days |

**Overall Phase Difficulty:** 🔴 Hard | **Overall Phase Risk:** 🟠 Medium

---

## How You Know Phase 5 Is Done ✓

- [ ] All 6 services on ECS Fargate (EC2 instances stopped)
- [ ] `REDIS_URL` points to ElastiCache — Docker Redis removed from docker-compose
- [ ] `KAFKA_BROKERS` points to MSK — Docker Kafka removed from docker-compose
- [ ] `DATABASE_URL` points to Aurora via RDS Proxy — old RDS still exists as backup
- [ ] `npm run prisma:migrate` in `worker/` runs against Aurora successfully
- [ ] CloudFront distribution active — verify TTFBfor static assets from nearest edge
- [ ] WAF enabled — `X-Frame-Options` header visible in browser DevTools
- [ ] All secrets in AWS Secrets Manager — no plaintext secrets in ECS task definitions
- [ ] Auto-scaling verified: 300 VU test makes ECS add new containers automatically
- [ ] 500 VU k6 passes with under 2% errors
- [ ] Users: ~50,000 concurrent capacity | Cost: ~$2,200/month

---

---

# PHASE 6 — WEEKS 19–22 (Days 91–110)
# "Make It Faster, Smarter, and Observable"

---

## What is Happening?

Infrastructure is solid. Now: tune the database for speed, expand AI capacity, add a free-tier AI fallback, and build full monitoring so problems are caught before users notice them.

---

## Task 1 — Database Speed Optimization (Week 19)

**Simple explanation:**
As more data fills the database, certain lookups slow down. An index is like the index at the back of a book — instead of reading every page to find "workflow," you jump directly to it.

### 📁 Technical Context — Database Indexes

**Find slow queries first:**
```sql
SELECT query, calls, total_time/calls as avg_time, rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

**Three indexes being added:**
```sql
-- "Find all executions for a workflow, sorted by date" (used in execution history page)
CREATE INDEX CONCURRENTLY idx_executions_workflow_user
ON executions(workflow_id, user_id, started_at DESC);

-- "Find all node results for an execution in order" (used in execution detail view)
CREATE INDEX CONCURRENTLY idx_node_executions_execution
ON node_executions(execution_id, sequence);

-- "Find all workflows for a user, sorted by recently updated" (used on dashboard)
CREATE INDEX CONCURRENTLY idx_workflows_user
ON workflows(user_id, updated_at DESC);
```

**`CONCURRENTLY`** means the index builds without locking the table — safe on live production.

**Verify each index works:**
```sql
EXPLAIN ANALYZE SELECT * FROM executions WHERE workflow_id=$1 ORDER BY started_at DESC;
-- Should show "Index Scan" not "Seq Scan"
```

### 📁 Technical Context — Redis Caching

| Item | Detail |
|------|--------|
| **What to cache** | `GET /api/db/workflows` (dashboard workflow list) — called on every login. `GET /api/templates` (same for all users). |
| **Where to implement** | Workflow CRUD service — check Redis before hitting Aurora, store result with TTL |
| **Cache key pattern** | `dashboard:user:{userId}` with 60-second TTL. `templates:list` with 5-minute TTL. |
| **Cache invalidation** | On workflow create/delete: clear `dashboard:user:{userId}`. On template update: clear `templates:list`. |
| **Measure hit rate** | `redis-cli INFO stats` → check `keyspace_hits` vs `keyspace_misses`. Target: 80%+ hits. |
| **High-growth table** | `node_executions` — at 10,000 users, hits 5M rows/month. Partitioned by `created_at` monthly. `pg_partman` automates new partition creation. |

---

## Task 2 — Expand AI Keys + Add Free-Tier AI (Week 20)

**Simple explanation:**
Grow from 4 to 10 Gemini keys, and add Ollama as an open-source AI fallback for free-tier users when Gemini is busy.

### 📁 Technical Context — 10 Gemini Keys

| Item | Detail |
|------|--------|
| **Create** | 10 Google Cloud projects, one Gemini API key per project |
| **Add to** | AWS Secrets Manager as `GEMINI_API_KEY_5` through `GEMINI_API_KEY_10` |
| **Update ECS task definition** | AI Generator service references all 10 keys from Secrets Manager |
| **Key pool file** | `worker/src/services/ai/gemini-key-pool.ts` — already handles N keys, just add more |
| **Confirm** | Logs show `[GeminiKeyPool] Loaded 10 API key(s)` on AI Generator startup |
| **Capacity** | 10 keys × 60 req/min = 600 req/min. 100 simultaneous users generating with zero 429 errors. |
| **Check distribution** | `redis-cli keys "gemini:ratelimit:*"` — should see 10 keys, usage spread across all |

### 📁 Technical Context — Ollama Free-Tier AI

| Item | Detail |
|------|--------|
| **Model** | `llama3.1:8b` |
| **Server hardware** | EC2 `c5.4xlarge` (CPU) or `g4dn.xlarge` (GPU — faster) |
| **Install** | `curl -fsSL https://ollama.com/install.sh | sh` then `ollama pull llama3.1:8b` |
| **Test** | `curl http://[ollama-ip]:11434/api/generate -d '{"model":"llama3.1:8b","prompt":"hello"}'` — must respond under 3s |
| **Env var** | `OLLAMA_URL=http://[ollama-alb]:11434` in AI Generator service |
| **Parallel requests** | `OLLAMA_NUM_PARALLEL=4` — handles 4 concurrent generations |
| **2 instances** | Deploy 2 EC2 instances. ALB in front. If one crashes, other keeps serving. |
| **Routing logic** | In `worker/src/services/ai/model-manager.ts` — if user is on free plan AND Gemini keys above 70% utilization → route to Ollama |
| **Pro user** | Always uses Gemini. `model-manager.ts` checks subscription tier from database. |
| **Verify routing** | Check AI Generator logs for which model was used per request |

---

## Task 3 — Vector Database Migration (Week 21)

**Simple explanation:**
The AI system stores "memories" of past workflows as mathematical patterns (embeddings). When you ask for a new workflow, it searches these memories. Currently stored in the main database — as they grow past 100,000, searches slow down.

### 📁 Technical Context — Qdrant Migration

**Decision check first:**
```sql
SELECT COUNT(*) FROM memory_references;
-- If under 100,000: skip Qdrant, just add HNSW index (see below)
-- If over 100,000: proceed with Qdrant migration
```

**If NOT migrating (under 100K rows) — just add HNSW index:**
```sql
CREATE INDEX ON memory_references
USING hnsw (embedding vector_cosine_ops)
WITH (m=16, ef_construction=64);
-- Makes similarity search 10–100x faster without migrating
```

**If migrating to Qdrant:**
| Item | Detail |
|------|--------|
| **Service** | Qdrant Cloud (qdrant.tech) — start with free tier |
| **Collection** | `workflow_memory` |
| **Vector size** | 1536 dimensions (must match current embedding dimensions in `memory_references.embedding`) |
| **Distance metric** | Cosine |
| **Install client** | `cd services/ai-generator && npm install @qdrant/js-client-rest` |
| **Replace in** | AI Generator service — replace SQL similarity query with `client.search("workflow_memory", { vector: queryEmbedding, limit: 10 })` |
| **Export embeddings** | `SELECT id, embedding::text, content, metadata FROM memory_references` |
| **After confirmed working** | `DROP COLUMN embedding FROM memory_references` — frees significant Aurora storage (1536-dim float32 = 6KB/row; 1M rows = 6GB freed) |
| **Run after drop** | `VACUUM ANALYZE memory_references` — reclaims freed storage |

---

## Task 4 — Full Observability (Week 22)

**Simple explanation:**
The ability to see inside your running system in real time. Grafana dashboards show health metrics. Alerts notify you before users report problems. Game day tests whether the system fails gracefully.

### 📁 Technical Context — OpenTelemetry Setup

| Item | Detail |
|------|--------|
| **Add to each service** | `initTracer()` as the FIRST call in each service's `index.ts` — before any imports |
| **NPM packages** | `@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations-node` |
| **Export destination** | Grafana Tempo (via OTLP) or AWS X-Ray |
| **What gets traced** | Every HTTP request, every Kafka message, every DB query, every Gemini API call |

### 📁 Technical Context — Grafana Technical Dashboard (8 panels)

| Panel | What it shows | Data source |
|-------|--------------|-------------|
| Requests/sec per service | Traffic load on each service | OpenTelemetry |
| p50/p95/p99 latency per service | Response time percentiles | OpenTelemetry |
| Error rate per service | % of failed requests | OpenTelemetry |
| ECS task count per service | Shows auto-scaling activity | AWS CloudWatch |
| Aurora ACU usage | Database compute utilization | AWS CloudWatch |
| ElastiCache hit rate | Cache efficiency | `redis-cli INFO stats` / CloudWatch |
| Kafka consumer lag per topic | Queue backlog | MSK CloudWatch metrics |
| Gemini key pool utilization | Usage % per key | `redis-cli keys "gemini:ratelimit:*"` |

### 📁 Technical Context — Grafana Business Dashboard (6 panels)

| Panel | Query source |
|-------|-------------|
| New signups per hour | `SELECT COUNT(*) FROM users WHERE created_at > NOW()-1h` |
| Workflows created per hour | `SELECT COUNT(*) FROM workflows WHERE created_at > NOW()-1h` |
| Executions per hour | `SELECT COUNT(*) FROM executions WHERE started_at > NOW()-1h` |
| Execution success rate | `COUNT(status='completed') / COUNT(*) FROM executions` |
| Avg workflow complexity | `SELECT AVG(node_count) FROM workflows` |
| Most popular node types | `SELECT node_type, COUNT(*) FROM node_executions GROUP BY node_type ORDER BY COUNT DESC` |

### 📁 Technical Context — 5 Critical Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| Service error rate high | Any service > 5% errors for 5+ min | Immediate alert |
| Aurora slow | Read latency > 500ms for 3+ min | Alert |
| Kafka falling behind | `execution.queued` consumer lag > 5,000 messages for 5+ min | Alert |
| Gemini exhausted | All 10 keys above 80% utilization | Alert |
| ECS health check failing | Any service health check failing for 3+ min | Immediate alert |

### 📁 Technical Context — Game Day (3 Simulated Failures)

| Failure | How to simulate | Expected behavior | What to check |
|---------|-----------------|-------------------|---------------|
| Kill Execution Engine Kafka consumer | `docker stop execution-worker` or kill ECS task | BullMQ holds jobs. Users see "processing" not "error". New ECS task starts within 3 min. | `redis-cli keys "bull:*"` — jobs still queued |
| Throttle Aurora to 1 ACU | Reduce Aurora max ACU in AWS Console | Services degrade gracefully. Error messages friendly. No data loss. | Connection retry with exponential backoff in each service |
| Exhaust all Gemini keys | Set all keys to max rate limit in Redis | Free users automatically route to Ollama. Pro users get queued via BullMQ. | AI Generator logs show Ollama being used |

---

## Estimation — Full Phase 6

| Item | Time |
|------|------|
| Plan says | 20 working days |
| Realistic with debugging | 28–32 working days |

**Overall Difficulty:** 🟡 Medium | **Overall Risk:** 🔵 Low

---

## How You Know Phase 6 Is Done ✓

- [ ] `EXPLAIN ANALYZE` on top 3 slow queries shows "Index Scan" not "Seq Scan"
- [ ] All 3 indexes created with `CONCURRENTLY` — no table locks
- [ ] `redis-cli INFO stats` shows keyspace_hits rate above 80% for dashboard queries
- [ ] Cache invalidates correctly on workflow create/delete
- [ ] Logs show `[GeminiKeyPool] Loaded 10 API key(s)` on AI Generator startup
- [ ] 50 simultaneous generations: zero 429 errors in logs
- [ ] Ollama responds in under 3s: `curl http://[ollama-ip]:11434/api/generate`
- [ ] Free user generation routes to Ollama when Gemini is busy (check AI Generator logs)
- [ ] `memory_references` similarity search under 50ms (`EXPLAIN ANALYZE` shows index used)
- [ ] Both Grafana dashboards live with all panels populated
- [ ] All 5 critical alerts configured, each tested and confirmed firing
- [ ] Game day completed — 3 failure scenarios: all handled gracefully, no data loss
- [ ] `initTracer()` present in all 6 services' `index.ts` as first call
- [ ] Users: ~100,000 concurrent capacity | Cost: ~$5,000–8,000/month

---

---

# PHASE 7 — WEEKS 23–26 (Days 111–130)
# "Prove It Can Handle 1 Million Users"

---

## What is Happening?

Not about new features. About proving the system works at scale, hardening it against attacks, and writing the documentation so any engineer can scale to 1 million users.

---

## Task 1 — Multi-Region Database (Week 23)

**Simple explanation:**
The database runs in AWS ap-south-1 (India). US/EU users wait 150ms extra on every database read. Aurora Global Database adds a read-only copy in us-east-1 (USA) — US users read from 20ms away instead of 200ms.

### 📁 Technical Context
| Item | Detail |
|------|--------|
| **How to add** | AWS Console: convert Aurora cluster to Global Database, add us-east-1 as secondary region |
| **Replication lag** | Under 200ms to us-east-1 (typically ~100ms) |
| **Writes still go to** | ap-south-1 (India) — the primary writer |
| **Read routing** | Workflow CRUD service: if CloudFront request from US/EU IP → use `DATABASE_URL_READER_USEAST1`. If from Asia → use `DATABASE_URL_READER` (ap-south-1). |
| **Failover** | If ap-south-1 goes down: promote us-east-1 to primary in ~1 minute. Only users in India experience downtime. |
| **Cost check first** | Analyze Cognito user pool and analytics for user geography. If 90% India users → skip this, save $500/month. |
| **Notification Service** | Also deployed to us-east-1. Route 53 latency routing: US users connect to us-east-1 WebSocket, Asia users connect to ap-south-1. |
| **Cross-region WebSocket test** | India user runs workflow → ap-south-1 Execution Engine publishes to Redis → ElastiCache replication → us-east-1 Notification Service → US user's browser receives update |

---

## Task 2 — 2,000 VU Load Test (Week 24)

**Simple explanation:**
Simulate 2,000 people using the app simultaneously for 1 hour. Find what breaks. Fix it. Prove the architecture can handle it.

### 📁 Technical Context — k6 Test Script

**Test profiles (mix of 3 user types):**
```javascript
// 20% generators — POST /api/generate-workflow
// 50% executors  — POST /api/execute-workflow + poll GET /api/execution-queue/job/:id
// 30% browsers   — GET /api/db/workflows + GET /api/templates + GET /api/credential-connections/connections
```

**Ramp stages:**
```
0 → 500 VU over 5 min
Hold 500 for 10 min
500 → 1,000 VU over 5 min
Hold 1,000 for 10 min
1,000 → 2,000 VU over 10 min
Hold 2,000 for 15 min (look for memory leaks, gradual Kafka lag)
Ramp down
```

**Pre-scale before test:**
| Service | Normal Tasks | Pre-scale to |
|---------|-------------|-------------|
| AI Generator | 3 | 15 |
| Execution Engine | 10 | 40 |
| Credential Service | 2 | 8 |
| Notification Service | 2 | 8 |
| Trigger Service | 2 | 8 |
| Workflow CRUD | 2 | 5 |
| Aurora max ACU | 16 | 32 (temporary) |

**What to watch during test:**
| Metric | Where to check | Threshold to worry |
|--------|---------------|-------------------|
| ECS task count scaling | AWS ECS Console | Should scale up automatically, scale-out under 3 min |
| Aurora ACU | CloudWatch | Should stay under 28 (out of 32) |
| Kafka consumer lag | MSK CloudWatch | Should stay near 0 on `execution.queued` |
| ElastiCache connections | CloudWatch | Should stay under 5,000 |
| Kong request rate | Kong logs | Kong handles 50K+ req/sec on single node — should not bottleneck |
| Memory per service | ECS CloudWatch | Should not grow over 1-hour sustained test (memory leak indicator) |

**Scale back after test:**
```
AI Generator: 15 → 3 tasks
Execution Engine: 40 → 10 tasks
Others: back to 2 tasks minimum
```

---

## Task 3 — Security Audit (Week 25)

**Simple explanation:**
Check the system against known attack patterns. Verify no user can access another user's private data. Confirm JavaScript execution is sandboxed. Test backup restoration actually works.

### 📁 Technical Context — Security Checks

| Check | What to test | Where in code |
|-------|-------------|---------------|
| **Cross-user data isolation** | Logged in as User A: `GET /api/db/workflows?id=[User-B-workflow-id]` — must return 403 or empty | `worker/src/api/db-proxy.ts` — uses allowlist of table names |
| **SQL injection via db-proxy** | `db-proxy.ts` must use strict allowlist for table names — NOT accept arbitrary values from frontend | `worker/src/api/db-proxy.ts` |
| **JavaScript sandbox** | JavaScript node in `execute-workflow.ts` must NOT use raw `eval()` — must run in sandboxed context (vm2 or similar) | `worker/src/core/execution/dynamic-node-executor.ts` |
| **Parameterized queries** | Search all 6 service files for string concatenation with user input in SQL queries — must find ZERO | All service `api/` folders |
| **OAuth callback URLs** | Verify each OAuth provider only lists the Credential Service URL — not old monolith | Each OAuth provider's developer console |
| **OWASP ZAP scan** | Run against production URL during low-traffic window | External tool — records HIGH/MEDIUM findings |
| **AWS Trusted Advisor** | Check: S3 public buckets, security groups open to 0.0.0.0/0, IAM over-permissioned, exposed access keys | AWS Console |
| **Container CVEs** | AWS Inspector on ECS tasks — update base Docker images for any CRITICAL severity CVEs | `FROM node:20-alpine` in each Dockerfile |
| **Backup restoration** | `pg_restore backup-[date].sql` to a test Aurora cluster — verify data matches | Aurora automated backup |
| **PITR test** | Restore Aurora to exactly 30 minutes ago — verify data from that time is present | Aurora point-in-time recovery |
| **Account deletion** | Delete test account — verify ALL data removed: workflows, executions, connections, credentials | `worker/src/api/delete-account.ts` |
| **CloudTrail** | Enable — logs every AWS API call with caller identity | AWS Console |
| **Aurora activity streams** | Enable — logs every SQL query executed against Aurora | AWS Console |

---

## Task 4 — Final Documentation + 1M Readiness (Week 26)

**Simple explanation:**
Write the exact commands to scale to 1 million users. Write the handbook for everyday operations. Confirm everything is green.

### 📁 Technical Context — Scale-to-1M Playbook

The 5 changes needed to go from current state to 1 million users. Each is under 4 hours of total work:

| Change | Command / Action | Cost impact |
|--------|-----------------|-------------|
| **1. Scale Execution Engine** | AWS Console or CLI: update ECS service desired count + auto-scaling max to 100 tasks | +$3,000/month |
| **2. Add Aurora read replicas** | Aurora Console: add 3 more reader instances | +$2,000/month |
| **3. Expand ElastiCache** | Add 6 more nodes (3 → 9 total) | +$1,500/month |
| **4. Expand Gemini pool** | Add 10 more keys (10 → 20), update Secrets Manager | +$40,000/month (Gemini API costs) |
| **5. Add Ollama instances** | Launch 3 more EC2 instances with Ollama, update ALB | +$1,000/month |

### 📁 Technical Context — Operational Handbook Contents

| Task | Key files involved |
|------|-------------------|
| Deploy update to one service | Push to GitHub main → GitHub Actions → ECR push → `aws ecs update-service --force-new-deployment` |
| Add new workflow node type | `worker/src/core/registry/unified-node-registry.ts` (register), `worker/src/nodes/` (executor), `ctrl_checks/src/components/workflow/nodeTypes.ts` (frontend metadata), `nodeLaymanDescriptions.ts` |
| Add new OAuth provider | `services/credentials/src/api/oauth-[provider].ts` (new file), `worker/src/index.ts` (add routes), `ctrl_checks/src/pages/auth/[provider]/` (callback page), `services/credentials/src/index.ts` (register route) |
| Roll back bad deployment | `aws ecs update-service --task-definition [previous-version]` — ECS keeps last 10 task definition revisions |
| Investigate incident | Grafana → find p95 spike → click into OpenTelemetry trace → identify slow span → check service logs in CloudWatch `/ctrlchecks/[service-name]` |
| Add new Gemini key | Create new Google Cloud project → get API key → add to Secrets Manager → update ECS task definition → force new deployment of AI Generator |

---

## Estimation — Full Phase 7

| Item | Time |
|------|------|
| Plan says | 20 working days |
| Realistic | 27–31 working days |

---

## How You Know Phase 7 Is Done ✓

- [ ] 2,000 VU × 1-hour sustained test passes: error rate stable (not growing), no memory leaks
- [ ] `GET /api/db/workflows?id=[other-user-workflow]` returns 403 for unauthorized user
- [ ] `db-proxy.ts` uses strict allowlist — verified by code review
- [ ] JavaScript execution node does NOT use raw `eval()` — verified by code review
- [ ] OWASP ZAP scan: zero HIGH severity findings remaining
- [ ] Aurora backup restored to test cluster successfully — recovery time documented
- [ ] Account deletion: verified ALL user data removed from all tables
- [ ] CloudTrail enabled — test API call appears in logs within 15 minutes
- [ ] Scale-to-1M playbook committed to repository with exact AWS CLI commands
- [ ] Operational handbook reviewed by both team members
- [ ] `initTracer()` confirmed in all 6 services as first call in `index.ts`
- [ ] All Grafana dashboards showing green
- [ ] All 5 alerts active, tested, and confirmed notifying both team members
- [ ] On-call rotation set up in PagerDuty or Grafana On-Call
- [ ] Users: 1,000,000+ capacity (requires 5 scaling commands) | Cost: $8K–80K/month

---

---

# FULL SUMMARY TABLE

| Phase | Weeks | Days | What It Does | Users | Cost/month | Plan Time | Realistic Time |
|-------|-------|------|-------------|-------|-----------|-----------|----------------|
| 1 — Fix & Verify | 1–2 | 1–10 | Verify 5 fixes, load test | 500 | +$50 | 10 days | 12–14 days |
| 2 — Launch & Listen | 3–4 | 11–20 | Go live, fix real issues | 500–1K | +$50 | 10 days | 12–15 days |
| 3 — Split AI + Execution | 5–8 | 21–40 | 2 independent services | 2K–5K | +$400–600 | 20 days | 28–35 days |
| 4 — Split Everything Else | 9–13 | 41–65 | 4 more services, retire monolith | 10K | ~$1,000 | 25 days | 35–40 days |
| 5 — AWS Migration | 14–18 | 66–90 | Managed cloud infrastructure | 50K | ~$2,200 | 25 days | 36–45 days |
| 6 — Optimize & Monitor | 19–22 | 91–110 | Speed, AI tiering, observability | 100K | ~$5–8K | 20 days | 28–32 days |
| 7 — Harden & Prove | 23–26 | 111–130 | 2K VU test, security, 1M readiness | 1M+ | $8K–80K | 20 days | 27–31 days |
| **TOTAL** | **26 weeks** | **130 days** | | | | **130 days** | **178–212 days** |

---

---

# IMPORTANT REALITIES

---

## 1. The Core Application Logic Does NOT Change

This entire plan is about WHERE code runs and HOW infrastructure supports it — not what the code does.

| What stays 100% identical | Where it lives |
|--------------------------|----------------|
| AI pipeline stages (intent → capability → structural → generation) | `worker/src/services/ai/stages/` — copied as-is |
| `{{$json.field}}` template resolution between nodes | Inside `execute-workflow.ts` — copied as-is |
| `unifiedNodeRegistry.get(node.type)` lookup | `unified-node-registry.ts` — not moved |
| Credential injection before `nodeDef.execute()` | `credential-resolver.ts` — copied as-is |
| Topological sort (DAG execution order) | Inside `execute-workflow.ts` — copied as-is |
| `UnifiedGraphOrchestrator` (graph mutations) | `unified-graph-orchestrator.ts` — not moved |
| Zustand state in frontend | `ctrl_checks/src/stores/workflowStore.ts` — untouched |
| Visual node editor | `WorkflowCanvas.tsx` with `@xyflow/react` — untouched |

---

## 2. The Plan Is Optimistic About Debugging Time

Every fix is allocated exactly 1 day. Realistic debugging time for common issues:

| Issue type | Plan allocates | Realistic |
|-----------|---------------|-----------|
| TypeScript import errors during extraction | 1 day | 1–3 days |
| Kafka message format mismatch | 1 day | 2–4 days |
| AWS IAM permission errors for ECS | 1 day | 2–5 days |
| Aurora cutover data consistency issue | 1 day | 3–7 days |
| OAuth redirect URI mismatch in Credential Service | 1 day | 1–2 days |
| Race condition in distributed trigger deduplication | Not planned | 3–7 days |

**Budget 1.5–2× the plan's time estimate for each phase.**

---

## 3. The Aurora Migration Is the Highest-Risk Task

**Never attempt without:**
- Full backup to S3: `pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql`
- DMS replication lag confirmed at 0 before cutover
- Rollback procedure tested: reverting `DATABASE_URL` to old RDS in all services
- Both team members present during the 5-minute cutover window
- Low-traffic window (weekend night, early morning India time)

---

## 4. Testing Resets With Real Users

The load tests are based on simulated traffic. Real user behavior (complex prompts, unexpected node combinations, edge-case OAuth flows) will surface failure modes no test could anticipate. After Day 130, testing evolves continuously with real traffic.

---

## 5. Realistic Timeline: 8–10 Months

For a 2-person team doing their first microservices extraction and AWS migration, this plan realistically completes in 8–10 months, not 6. Plan for 9 months and ship ahead of schedule rather than plan for 6 and feel behind every week.

---

---

# GLOSSARY — KEY TERMS WITH PROJECT CONTEXT

| Term | Simple Explanation | Where in CtrlChecks |
|------|-------------------|---------------------|
| Monolith | One giant single program that does everything | `worker/` folder — `worker/src/index.ts` has all 73 routes |
| Microservice | A small program that does ONE specific job | `services/ai-generator/`, `services/execution/`, etc. |
| Docker | Packages your app into a container so it runs the same everywhere | `infra/docker-compose.yml` — defines all containers |
| ECS Fargate | Amazon's system that auto-scales Docker containers — no servers to manage | Replaces EC2 Docker in Phase 5 |
| Kafka | A reliable message board — services drop messages, others pick them up | Topics: `execution.queued`, `workflow.triggered`, etc. |
| Redis | Very fast temporary memory — like a whiteboard for quick notes | Used for: `gemini:ratelimit:*`, `bull:*`, `ws:execution:events`, rate limiting |
| PgBouncer | A traffic controller that multiplexes database connections | In `infra/docker-compose.yml` — port 5433 |
| Aurora | Amazon's auto-scaling PostgreSQL — grows/shrinks with load | Replaces RDS in Phase 5. Connected via `aws-db-client.ts` → `getDbClient()` |
| ElastiCache | Amazon's managed Redis — 3 nodes, auto-failover | Replaces Docker Redis in Phase 5 |
| MSK | Amazon's managed Kafka — 3 brokers, multi-region | Replaces Docker Kafka in Phase 5 |
| WebSocket | Live connection between browser and server for real-time updates | `GET /ws/executions` — managed by `ws-redis-bridge.ts` → Notification Service |
| Canary Deployment | Route 33% of traffic to new service to test it safely before 100% | Used when enabling `AI_GENERATOR_ENABLED`, `EXECUTION_ENGINE_ENABLED`, etc. |
| BullMQ | A job queue — holds tasks, prevents duplicates, retries failures | Used in AI Generator (Gemini calls), Trigger Service (scheduled workflows) |
| CDN (CloudFront) | Serves your app files from the nearest global location | Wraps `ctrl_checks/` Vite build in Phase 5 |
| WAF | Firewall that blocks SQL injection, XSS, etc. before reaching your services | Enabled on ALB in Phase 5 |
| k6 / VU | k6 is a load testing tool. VU = one simulated user. | Tests saved to `tests/load/` — baseline at 10 VU, target at 2,000 VU |
| p95 Latency | 95% of requests are faster than this. Good target: under 2 seconds. | Measured in k6 output and Grafana dashboards |
| Grafana | Live monitoring dashboards for system health and business metrics | Set up in Phase 6 — reads from OpenTelemetry + CloudWatch + Aurora |
| OpenTelemetry | Traces exactly how long each part of a request takes | `initTracer()` added to each service's `index.ts` in Phase 6 |
| Contract Test | Verifies two services agree on what data they exchange | `tests/contracts/ai-generation.test.ts` — ensures new service matches monolith output |
| unified-node-registry | The most critical file — defines ALL node types, schemas, and execution logic | `worker/src/core/registry/unified-node-registry.ts` — never move or split |
| Qdrant | Specialist database for AI memory/vector similarity searches | Replaces `memory_references.embedding` in Aurora when rows exceed 100K |
| Ollama | Open-source AI on your own server — no per-request cost | Free-tier AI fallback in Phase 6. Model: `llama3.1:8b`. Routing in `model-manager.ts` |
| IAM | Amazon's permission system — what each service is allowed to do | Each ECS task definition references IAM role with minimal permissions |
| DMS | Amazon's database copying tool for zero-downtime migrations | Used for RDS → Aurora migration in Phase 5 |
| RDS Proxy | Connection manager between services and Aurora — prevents connection exhaustion | Deployed alongside Aurora in Phase 5 |
| TanStack Query | Frontend data fetching and caching library | `ctrl_checks/src/lib/api/` — all API calls go through here |
| awsClient | The frontend's auth + DB proxy client | `ctrl_checks/src/integrations/aws/client.ts` — import as `import { awsClient } from '@/integrations/aws/client'` |
| Prisma | Database schema and migration tool | `worker/prisma/migrations/` — run `npm run prisma:migrate` in `worker/` |

---

*Document Version 2.0 — CtrlChecks Master Development & Analysis Plan*
*Covers: 6-Month Scaling Roadmap from 80 to 1,000,000 Concurrent Users*
*Includes: Simple explanations + project-specific technical context for every task*
*Team Size: 2 Engineers (Dev 1: Backend/Infra, Dev 2: Frontend/Testing)*
