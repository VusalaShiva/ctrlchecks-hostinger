# CODEX PROMPT — CtrlChecks Full Implementation Plan Request

---

## INSTRUCTION TO CODEX

You are a senior software architect and engineering planner.

I am going to give you the complete context of a real software project called **CtrlChecks**. Read everything carefully. After reading, your job is to **generate a complete, week-by-week implementation plan** for the next **9 months** (approximately 39 weeks).

The plan must show:
- What **Developer 1 (Backend / Infrastructure)** does each week
- What **Developer 2 (Frontend / Testing)** does each week
- What files are being changed or created that week
- What the expected output/result is at the end of each week
- What issues might come up and how to handle them
- A clear "Done When" condition for each week

Do not skip weeks. Do not be vague. Every week must be specific enough that a developer can execute it without asking questions.

---

---

## PART 1 — WHAT IS CTRLCHECKS

CtrlChecks is an AI-powered workflow automation platform. Users describe what they want to automate in plain English (example: "send me a Slack message every time I get a Gmail") and the AI builds the workflow automatically. Think Zapier but AI-generated.

**Monorepo with two services:**

| Folder | Role | Port |
|--------|------|------|
| `ctrl_checks/` | React + Vite frontend | 5173 (dev) |
| `worker/` | Node + Express backend (AI engine + execution) | 3001 |

**Full tech stack:**

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Zustand, TanStack Query, @xyflow/react |
| Backend | Node.js, Express, TypeScript, ts-node |
| Auth | AWS Cognito (aws-amplify frontend, aws-jwt-verify backend) |
| Database | AWS RDS PostgreSQL via pg.Pool |
| Cache | Redis (Docker now → AWS ElastiCache later) |
| Message Queue | Apache Kafka (Docker now → AWS MSK later) |
| AI | Google Gemini via gemini-orchestrator.ts |
| Payments | Razorpay |
| Infrastructure | Docker Compose now → AWS ECS Fargate later |

**Key architectural rule that must never be violated:**
> All node behavior (input schema, output schema, credentials, execution logic) is defined ONCE in `worker/src/core/registry/unified-node-registry.ts`. Never add node-specific logic anywhere else. Never bypass this registry.

---

## PART 2 — CURRENT CODEBASE STATE (VERIFIED BY FILE SCAN)

This is what **actually exists** in the code right now. Do not trust the original plan's claims of "already done."

### What the Original Plan Said Was Done — But Is NOT

| Item | Plan Claimed | Real State |
|------|-------------|-----------|
| SDK Lazy Loading | "Already in codebase" | `import Airtable from 'airtable'` is still a static top-level import at line 44 of `execute-workflow.ts`. NOT lazy. |
| PgBouncer | "Already in docker-compose" | `infra/docker-compose.yml` has NO pgbouncer service. Does not exist. |
| WebSocket Redis Bridge | "Already in codebase" | `worker/src/ws-redis-bridge.ts` does NOT exist anywhere. |
| React.lazy Wizard | "Already done" | `AutonomousAgentWizard.tsx` is a normal named export on line 928. NOT wrapped in React.lazy. |
| Gemini Key Pool | "Already in codebase" | `worker/src/services/ai/gemini-key-pool.ts` does NOT exist. `gemini-orchestrator.ts` does not import it. |
| Async Execution (202 response) | "Already done" | Not verified — needs manual check on Day 1 |

### Static Imports That Load on Every App Startup (Problem)
These are inside `worker/src/api/execute-workflow.ts` lines 43–53 as static top-level imports — meaning ALL of these SDKs load every time the app starts, even if nobody uses those nodes:

```
line 43: executeClickUpNode from clickup executor
line 44: Airtable from 'airtable'
line 45: FormData from 'form-data'
line 46: PipedriveApiClient from pipedrive
line 47: @notionhq/client (Notion)
line 48: getNotionAccessToken
line 49: TwitterApi from 'twitter-api-v2'
line 50: getTwitterAccessToken
line 51: getInstagramAccessToken
line 52: getWhatsAppAccessToken
line 53: executeDatabaseNode ← THIS chains to 13 DB drivers (MongoDB, MySQL, Snowflake, SQLite, PostgreSQL, Redis, Supabase, TimescaleDB, Firebase, GCS, OracleDB, SQL Server, Intuit)
```

The lazy loading fix needs to convert ALL of these to inline `require()` calls inside their respective handler functions — not just 4 as the original plan mentioned.

### What Already Works Correctly (Do Not Change)
```
- Redis, Kafka, nginx, app1/app2/app3 exist in docker-compose.yml ✅
- unified-node-registry.ts exists as the single source of truth ✅
- dynamic-node-executor.ts reads from registry correctly ✅
- unified-graph-orchestrator.ts handles all graph mutations ✅
- gemini-orchestrator.ts exists as class-based singleton, imported by 42+ files ✅
- workflow-lifecycle-manager.ts exists with 5-stage lifecycle ✅
- 15 AI pipeline stage files exist in worker/src/services/ai/stages/ ✅
- 32 node definitions registered in worker/src/nodes/definitions/index.ts ✅
- All 57 OAuth handlers exist in worker/src/credentials-system/ ✅
- database-node-handler.ts exists routing to 13 DB executors ✅
- Already lazy via inline require(): AWS SES, Bull queue, Redis ioredis, vm2, nodemailer ✅
```

### Current docker-compose.yml Services
- nginx, app1, app2, app3 (3 Express instances on port 3001)
- request-worker (Kafka consumer, 3 replicas)
- redis (Redis 7-alpine)
- zookeeper + kafka (Confluent 7.6.1)
- NO pgbouncer, NO PostgreSQL (uses AWS RDS externally)

---

## PART 3 — THE ORIGINAL 6-MONTH PLAN SUMMARY

The mentor gave a plan to scale from 80 concurrent users to 1,000,000. Here is what it covers:

### Phase 1 — Weeks 1–2: Fix & Launch
Verify/implement 5 performance fixes. Load test. Go live on Day 11.
Target: 500 concurrent users, +$50/month infra.

### Phase 2 — Weeks 3–4: Stabilize
Monitor real users. Fix post-launch bugs. Start AI Generator service folder.
Target: still 500–1,000 users.

### Phase 3 — Weeks 5–8: Extract AI Generator + Execution Engine
Pull AI generation (port 3002) and workflow execution (port 3003) into separate services.
Target: 2,000–5,000 concurrent users, +$400–600/month.

### Phase 4 — Weeks 9–13: Extract Remaining 4 Services + Retire Monolith
- Credential Service (port 3004) — all 57 OAuth providers
- Notification Service (port 3005) — WebSocket only
- Trigger Service (port 3006) — webhooks, forms, schedule, chat
- Workflow CRUD Service (port 3007) — save/load/templates/payments
- Day 59: Monolith `worker/` permanently retired from production
Target: 10,000 concurrent users, ~$1,000/month.

### Phase 5 — Weeks 14–18: AWS Managed Services Migration
Replace all Docker containers with AWS managed services:
- Docker Redis → AWS ElastiCache (3 nodes, Redis 7.2)
- Docker Kafka → AWS MSK (3 brokers, Kafka 3.6)
- AWS RDS → Aurora PostgreSQL Serverless v2 (0.5–16 ACU)
- EC2 Docker → ECS Fargate with auto-scaling
- Add CloudFront CDN, AWS WAF, Kong API Gateway
Target: 50,000 concurrent users, ~$2,200/month.

### Phase 6 — Weeks 19–22: Optimize + Monitor
Database index tuning, Redis caching for dashboard queries, expand Gemini to 10 keys, add Ollama (llama3.1:8b) as free-tier AI fallback, Qdrant for vector search, full Grafana + OpenTelemetry observability, 1,000 VU load test, game day failure simulation.
Target: 100,000 concurrent users, ~$5,000–8,000/month.

### Phase 7 — Weeks 23–26: Multi-Region + Security + 1M Proof
Aurora Global Database (India + US East), 2,000 VU sustained load test, OWASP security audit, backup restoration test, scale-to-1M playbook written.
Target: 1,000,000+ concurrent users (with 5 scaling commands), ~$8,000–80,000/month.

---

## PART 4 — KNOWN GAPS IN THE ORIGINAL PLAN

These gaps must be incorporated into the new 9-month plan you generate:

### Gap 1 — Phase 1 is implementation, not verification
The plan says "verify fixes." The real work is building them from scratch. This adds 8–15 days to Phase 1.

### Gap 2 — TypeScript errors during service extraction are severe
Copying `execute-workflow.ts` (20,000 lines) to a new service folder breaks every internal import path. Expect 50–100 TypeScript errors per service extraction. Allocate 2–3 days per service just for fixing import paths.

### Gap 3 — unified-node-registry.ts shared dependency not resolved
Both AI Generator (port 3002) and Execution Engine (port 3003) need `unified-node-registry.ts`. The original plan says "use HTTP call to monolith as temporary bridge." But the plan never says what happens when the monolith retires on Day 59. A permanent solution must be designed and documented before Day 59.

### Gap 4 — OAuth redirect URI updates not estimated
When Credential Service moves to its own URL (port 3004), all 57 OAuth provider redirect URIs need manual updating in each provider's developer console (Google Console, GitHub Apps, Meta Developers, Twitter Dev Portal, etc.). This is significant manual work not mentioned in the original plan.

### Gap 5 — Aurora migration has no rollback runbook
The plan describes migration steps but never defines: what exact condition triggers rollback, who makes that decision, how fast rollback can be done, or whether the rollback was tested before the real migration.

### Gap 6 — No staging environment
All testing happens on local or directly on production. No safe staging environment is planned for AWS migrations.

### Gap 7 — No git branching strategy
6 simultaneous service extractions without a branching strategy will cause merge conflicts.

### Gap 8 — Ollama quality not validated
The plan deploys llama3.1:8b as free-tier fallback but never validates whether this model can reliably generate valid CtrlChecks workflow JSON. Poor quality would silently degrade free-tier users.

### Gap 9 — GDPR account deletion across 6 services
When data is split across 6 services each with their own DB connection, account deletion must coordinate deletion across all services. The original plan doesn't address this.

### Gap 10 — On-call rotation too late
The plan sets up on-call rotation in Week 22. With 10,000+ users by Month 3, on-call is needed much earlier.

---

## PART 5 — YOUR TASK

**Generate a complete 9-month (39-week) implementation plan for CtrlChecks.**

### Requirements for the plan you generate:

1. **Cover all 7 phases** from the original plan, corrected with the gaps above incorporated.

2. **Every week must have:**
   - Week number and phase name
   - Target concurrent users at end of week
   - Estimated infrastructure cost at end of week
   - Dev 1 (Backend/Infra) tasks — specific, actionable, file-level
   - Dev 2 (Frontend/Testing) tasks — specific, actionable, file-level
   - "Done When" condition — exact, testable
   - Issues that might come up that week and how to handle them

3. **Include the missing pieces:**
   - Week 1–2 must show that fixes need to be BUILT, not just verified
   - Phase 3 weeks must include TypeScript error fixing time
   - A week must be added for designing the unified-node-registry permanent solution before Day 59
   - A task must be added for OAuth redirect URI updates across all 57 providers
   - A staging environment setup week must be added before Phase 5
   - Git branching strategy must appear before Phase 3
   - On-call rotation must be set up by Month 3, not Month 6
   - Ollama quality validation must be a step in Phase 6
   - Aurora rollback runbook must be a task before the Aurora migration week
   - GDPR deletion coordination task must appear in Phase 4

4. **Realistic time estimates:**
   - Original plan: 6 months (130 days)
   - Realistic estimate: 9–10 months (180–210 days)
   - Account for: debugging time, first-time AWS configuration, TypeScript errors, unexpected blockers
   - Add 1 buffer week for every 4 weeks of implementation

5. **Both developers must have clear, parallel work each week** — they should not be blocked waiting for each other.

6. **Format each week as:**
```
## WEEK [N] — [Phase Name]: [Week Theme]
Target: [X] concurrent users | Cost: [estimate]/month

**Dev 1 — Backend/Infrastructure:**
- [Task with file name if applicable]
- [Task with file name if applicable]
- Done when: [exact condition]

**Dev 2 — Frontend/Testing:**
- [Task with file name if applicable]
- [Task with file name if applicable]
- Done when: [exact condition]

**Possible Issues This Week:**
- [Issue → Fix]
- [Issue → Fix]
```

7. **Add a summary table at the end** showing all 39 weeks, their phase, target users, and cost.

---

## PART 6 — FILES AND COMMANDS REFERENCE

Give this to Codex so it can write accurate file names and commands.

### Key Files
```
worker/src/index.ts                               ← all 73 routes registered here
worker/src/api/execute-workflow.ts                ← 20,000 line execution file
worker/src/services/ai/gemini-orchestrator.ts     ← LLM singleton (42+ dependents)
worker/src/services/ai/workflow-lifecycle-manager.ts ← 5-stage generation
worker/src/services/ai/stages/                    ← 15 pipeline stage files
worker/src/core/registry/unified-node-registry.ts ← NEVER CHANGE LOGIC HERE
worker/src/core/execution/dynamic-node-executor.ts ← runs nodes via registry
worker/src/core/orchestration/unified-graph-orchestrator.ts ← all graph mutations
worker/src/core/credentials/credential-vault.ts   ← OAuth secret storage
worker/src/core/database/aws-db-client.ts         ← pg.Pool → AWS RDS
worker/src/services/database/database-node-handler.ts ← 13 DB executors
worker/src/nodes/definitions/index.ts             ← 32 registered nodes
worker/src/credentials-system/                    ← 57 OAuth handlers
infra/docker-compose.yml                          ← current infra
ctrl_checks/src/components/workflow/AutonomousAgentWizard.tsx ← 8K line wizard
ctrl_checks/src/stores/workflowStore.ts           ← Zustand state
ctrl_checks/src/integrations/aws/client.ts        ← awsClient
```

### Commands
```bash
cd worker && npm run type-check        # must always be 0 errors
cd worker && npm run build
cd worker && npm test
cd ctrl_checks && npm run build
cd ctrl_checks && npm run test:vitest
docker compose -f infra/docker-compose.yml up -d
k6 run tests/load/baseline.js
```

### Environment Variables Needed
```
worker/.env:
  DATABASE_URL, REDIS_URL, KAFKA_BROKERS
  GEMINI_API_KEY, GEMINI_API_KEY_1, GEMINI_API_KEY_2
  AWS_REGION, COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID
  AI_GENERATOR_ENABLED=false (toggle for canary)
  AI_GENERATOR_URL=http://localhost:3002
  EXECUTION_ENGINE_ENABLED=false (toggle for canary)

ctrl_checks/.env.local:
  VITE_API_URL, VITE_AWS_REGION, VITE_COGNITO_USER_POOL_ID
  VITE_COGNITO_CLIENT_ID, VITE_PUBLIC_BASE_URL
```

---

## PART 7 — CONSTRAINTS

- Never modify `unified-node-registry.ts` logic during infrastructure work
- Never add `if (node.type === '...')` outside the registry
- Never mutate `workflow.nodes` or `workflow.edges` directly — use `unified-graph-orchestrator.ts`
- All service extractions must use canary deployment: 33% → 66% → 100%
- All AWS migrations must happen in low-traffic windows (weekend nights)
- Aurora migration must have a full S3 backup before starting
- `gemini-orchestrator.ts` changes must be backward compatible (42+ dependents)
- The `worker/` folder must keep running until all 6 services are stable and verified

---

Now generate the full 9-month week-by-week plan. Start with Week 1 and go all the way to Week 39. Do not summarize or skip any week.
