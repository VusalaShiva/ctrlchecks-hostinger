# CtrlChecks — Plan Gaps, Missing Items & Honest Assessment
**Document Purpose:** Identify what is incomplete, incorrect, or missing in the 6-month execution plan
**Based on:** Deep code analysis of the actual repository
**Important:** This document only covers what we found so far. There are likely more gaps that will surface as implementation begins.
**Last Updated:** June 2026

---

> ⚠️ **Note to Developer and Mentor**
> This document was created after going into the actual codebase and cross-referencing it against the 6-month execution plan. Everything listed here is backed by evidence from the real code — not assumptions. However, we only analyzed specific files. A full audit will surface more items.

---

## Table of Contents
1. [Critical Finding — Fix 1 Is Not Done](#1-critical-finding--fix-1-is-not-done)
2. [Issues Found Per Phase](#2-issues-found-per-phase)
3. [Missing Things in the Documentation](#3-missing-things-in-the-documentation)
4. [Realistic Time Estimates vs Plan Estimates](#4-realistic-time-estimates-vs-plan-estimates)
5. [What Needs to Be Updated in the Plan](#5-what-needs-to-be-updated-in-the-plan)
6. [Things Still Unverified — Needs Investigation](#6-things-still-unverified--needs-investigation)
7. [What the Plan Gets Right](#7-what-the-plan-gets-right)
8. [Recommended Next Steps Before Day 1](#8-recommended-next-steps-before-day-1)

---

---

## 1. Critical Finding — Fix 1 Is Not Done

### What the Plan Claims
> *"Fix 1 — SDK Lazy Loading — Already Done in Your Codebase. Now Airtable, Twitter, Notion, Pipedrive only load the moment that node type is first executed."*

### What the Code Actually Shows

File checked: `worker/src/api/execute-workflow.ts` (lines 43–53)

```typescript
// THESE ARE STILL STATIC IMPORTS — loading on EVERY startup right now
import { executeClickUpNode } from '../executors/clickup.executor';   // line 43
import Airtable from 'airtable';                                       // line 44
import FormData from 'form-data';                                      // line 45
import { PipedriveApiClient } from '../services/pipedrive/...';        // line 46
import { Client } from '@notionhq/client';                             // line 47
import { getNotionAccessToken } from '../shared/notion-token-manager'; // line 48
import { TwitterApi } from 'twitter-api-v2';                           // line 49
import { getTwitterAccessToken } from '../shared/twitter-token-manager'; // line 50
import { getInstagramAccessToken, ... } from '../shared/instagram...'; // line 51
import { getWhatsAppAccessToken, ... } from '../shared/whatsapp...';   // line 52
import { executeDatabaseNode } from '../services/database/...';        // line 53
```

### What the Plan Mentions vs What Exists

| SDK | Plan Mentions It | Actually Needs Fixing |
|-----|-----------------|----------------------|
| Airtable | ✅ Yes | ✅ Yes — still static |
| Twitter | ✅ Yes | ✅ Yes — still static |
| Notion | ✅ Yes | ✅ Yes — still static |
| Pipedrive | ✅ Yes | ✅ Yes — still static |
| ClickUp executor | ❌ Not mentioned | ✅ Yes — still static |
| FormData | ❌ Not mentioned | ✅ Yes — still static |
| Instagram token manager | ❌ Not mentioned | ✅ Yes — still static |
| WhatsApp token manager | ❌ Not mentioned | ✅ Yes — still static |
| executeDatabaseNode | ❌ Not mentioned | ✅ Yes — still static (chains to ALL DB drivers) |

### What IS Already Correctly Lazy Loaded (Already Fine)

These are already using inline `require()` inside handler functions — no action needed:

```typescript
const { SESClient } = require('@aws-sdk/client-ses');       // ✅ already lazy
const Queue = require('bull');                               // ✅ already lazy
const Redis = require('ioredis');                            // ✅ already lazy
const { VM } = require('vm2');                               // ✅ already lazy
const nodemailer = require('nodemailer');                    // ✅ already lazy
```

### Why `executeDatabaseNode` Is the Most Important One

The `executeDatabaseNode` import on line 53 is a single handler that internally calls ALL database node executors. This means:
- MongoDB driver
- MySQL driver
- Snowflake driver
- SQLite driver
- PostgreSQL driver
- TimescaleDB driver
- Oracle driver
- SQL Server driver

**All of these load on every startup right now** even if the workflow uses zero database nodes.

### Verdict
**Fix 1 is NOT done. It is implementation work, not just verification work.** The plan's Day 1 task of "verify this fix exists" cannot be done because the fix is not there.

---

---

## 2. Issues Found Per Phase

### Phase 1 (Days 1–10) — Fix & Verify

| Issue | Severity | Detail |
|-------|----------|--------|
| Fix 1 described as complete but not implemented | 🔴 Critical | 9 static imports remain. Need to convert each to lazy `require()` inside their handler functions. This is a 20,000-line file. |
| Plan mentions 4 SDKs, file has 9 | 🔴 Critical | Developer will hit 5 unexpected imports while doing the fix |
| No rollback plan per individual fix | 🟠 Medium | If lazy loading conversion breaks something, how do you roll back quickly? Not documented. |
| No dependency order between fixes | 🟠 Medium | Fix 3 (async execution) depends on Fix 4 (WebSocket bridge). Order of implementation matters but is not stated. |
| Load test baseline files not existing yet | 🟡 Low | Plan says "save to `tests/load/baseline-10vu.json`" — this folder and file do not exist yet |
| Test coverage quality unknown | 🟠 Medium | Plan says "run npm test — note which pass and fail" but if coverage is poor, fixes can silently break behaviour |

---

### Phase 2 (Days 11–20) — Launch & Stabilize

| Issue | Severity | Detail |
|-------|----------|--------|
| No staging environment mentioned | 🟠 Medium | All testing happens on local or directly production. No safe middle ground for testing real AWS connections. |
| Launch day assumes zero critical bugs | 🟡 Low | The plan launches on Day 11. If Days 1–10 reveal problems, this date shifts. No contingency stated. |

---

### Phase 3 (Days 21–40) — Extract AI Generator + Execution Engine

| Issue | Severity | Detail |
|-------|----------|--------|
| TypeScript errors during extraction severely underestimated | 🔴 Critical | Copying `execute-workflow.ts` (20,000 lines) to a new folder breaks every internal import path. This generates 50–100+ TypeScript errors. Plan says "fix errors" casually — it is 2–3 days of careful work per service. |
| `unified-node-registry.ts` shared dependency not resolved | 🔴 Critical | Both AI Generator and Execution Engine need this file. Plan's temporary fix is "HTTP call to monolith." But when monolith retires (Day 59), this bridge breaks. No permanent solution is documented. |
| `from-node-library.ts` and `node-library.ts` not accounted for | 🟠 Medium | These files register nodes from a separate library system. How they are handled during service extraction is not addressed anywhere in the plan. |
| No git branching strategy | 🟠 Medium | Extracting 6 services simultaneously without a clear branch strategy creates code conflict risks and broken main branch. |
| Contract tests verify structure not behaviour | 🟡 Low | The plan writes contract tests to verify JSON structure matches. But a service could return the correct shape with wrong values. Behavioural equivalence is not tested. |

---

### Phase 4 (Days 41–65) — Extract Remaining Services + Retire Monolith

| Issue | Severity | Detail |
|-------|----------|--------|
| OAuth redirect URI update work not estimated | 🔴 Critical | When Credential Service moves to its own URL (port 3004), ALL 57 OAuth provider redirect URIs need updating manually in each provider's developer console (Google Console, GitHub Apps, Meta Developers, Twitter Dev Portal, etc.). This is significant manual work — not mentioned anywhere. |
| No plan for in-flight credentials during migration | 🟠 Medium | Users who have existing OAuth tokens stored — how are these migrated to the new Credential Service? Token format, storage location, and migration path not addressed. |
| Service 6 (Workflow CRUD) `db-proxy.ts` security gap | 🟠 Medium | Plan copies `db-proxy.ts` without noting the security requirement: it must use a strict allowlist for table names. If copied as-is and the allowlist is missing, it is an injection vulnerability. |

---

### Phase 5 (Days 66–90) — AWS Migration

| Issue | Severity | Detail |
|-------|----------|--------|
| Aurora migration has no dedicated rollback runbook | 🔴 Critical | Plan describes migration steps but does not say: what exact error triggers rollback, who makes the rollback decision, how fast rollback can be done, or whether rollback has been tested before the real migration. This is the highest-risk operation in the entire plan. |
| ECS Fargate task definition env var errors are silent | 🟠 Medium | When referencing wrong AWS Secrets Manager ARNs in ECS task definitions, the container fails to start with a cryptic error. First-time AWS users spend days on this. No guidance provided. |
| MSK TLS configuration is non-trivial | 🟠 Medium | MSK requires TLS. Adding `ssl: true` to KafkaJS in each service sounds simple but involves certificate handling, broker endpoint format changes, and IAM policy updates. Not explained. |
| No VPC networking setup guide | 🟠 Medium | ElastiCache, MSK, Aurora, and ECS all need to be in the same VPC with the right security group rules. For a first-time AWS user, this alone can take 2–3 days. Not covered. |

---

### Phase 6 (Days 91–110) — Optimize & Monitor

| Issue | Severity | Detail |
|-------|----------|--------|
| Qdrant decision threshold may be wrong | 🟡 Low | Plan says "migrate if `memory_references` exceeds 100,000 rows." But vector similarity search performance depends on more than row count — the embedding dimensions and query patterns also matter. The threshold should be validated against actual query latency, not just row count. |
| Ollama model quality not validated for CtrlChecks use case | 🟠 Medium | Plan deploys `llama3.1:8b` as free-tier fallback. But it does not validate whether this model can reliably generate valid CtrlChecks workflow JSON. A model that generates structurally invalid workflows would silently degrade free-tier user experience. |
| Game day timing not planned | 🟡 Low | Game day simulates 3 production failures. This needs to be scheduled at low-traffic time. No guidance on when to run it or who needs to be available. |

---

### Phase 7 (Days 111–130) — Harden & Prove

| Issue | Severity | Detail |
|-------|----------|--------|
| GDPR account deletion not verified to be complete | 🟠 Medium | `delete-account.ts` must delete ALL user data across all tables in all 6 services. When the monolith was one piece, this was one place. Now with 6 services each having their own DB connection, account deletion may miss data in some services. |
| 2,000 VU test pre-scale cost not warned about | 🟡 Low | Pre-scaling to 40 Execution Engine tasks, 15 AI Generator tasks, and Aurora max 32 ACU for the load test will significantly spike AWS costs temporarily. No warning or estimate given. |

---

---

## 3. Missing Things in the Documentation

These topics are not mentioned anywhere in the 3 PDF planning documents:

### 3.1 — Technical Gaps

| Missing Item | Why It Matters |
|-------------|----------------|
| **Git branching strategy** | 6 simultaneous service extractions without a branch strategy will cause merge conflicts and broken deployments |
| **Staging environment setup** | No safe place to test AWS migrations before hitting production |
| **VPC and security group setup guide** | All AWS managed services must be in the same VPC with correct rules — first-time setup takes 2–3 days |
| **OAuth redirect URI update checklist** | 57 providers × manual update each = significant hidden work in Phase 4 |
| **`unified-node-registry.ts` permanent solution** | The HTTP bridge workaround will break when monolith retires. A permanent solution (shared npm package or dedicated registry service) must be designed before Day 59 |
| **Rollback procedure per individual fix (Phase 1)** | Each of the 5 fixes needs its own rollback steps in case it breaks something |
| **TypeScript error count estimate per service** | Developers need to know to expect 50–100 errors when extracting a service, not be surprised |
| **Account deletion across 6 services** | With data split across 6 services, complete deletion needs a coordinated plan |
| **`from-node-library.ts` handling during extraction** | This file is part of the node registration system and its fate during extraction is unaddressed |

### 3.2 — Operational Gaps

| Missing Item | Why It Matters |
|-------------|----------------|
| **On-call rotation setup timing** | Plan mentions on-call in Week 22 but with 10,000+ users by Month 3, on-call is needed much earlier |
| **Cost alerting** | AWS costs can spike unexpectedly. No CloudWatch billing alarm is mentioned until the end |
| **Database migration testing in staging** | Aurora migration must be rehearsed on a copy of production data before the real cutover |
| **Deployment pipeline (CI/CD)** | GitHub Actions is mentioned once in Phase 5. No detailed setup guide. |
| **Load test script management** | Where do k6 test scripts live? Who maintains them as services change? |

### 3.3 — Product/Business Gaps

| Missing Item | Why It Matters |
|-------------|----------------|
| **AI generation quality monitoring** | No plan for monitoring whether Gemini/Ollama is generating valid workflows vs invalid ones |
| **Free vs Pro tier enforcement** | Ollama routing for free users needs the billing system to correctly identify user tier at AI Generator time |
| **Rate limiting per workflow complexity** | A 50-node workflow uses vastly more resources than a 3-node one. Flat rate limits don't account for this |
| **Node SDK version pinning** | When 100+ SDKs are lazily loaded, version drift can cause silent breaking changes. Not addressed. |

---

---

## 4. Realistic Time Estimates vs Plan Estimates

### Phase-by-Phase Comparison

| Phase | What Plan Calls It | Plan Days | Realistic Days | Main Reason for Gap |
|-------|-------------------|-----------|----------------|---------------------|
| Phase 1 | Fix & Verify + Load Test | 10 days | **18–25 days** | Fix 1 is actual implementation work. Load test debugging takes longer than 1 day. |
| Phase 2 | Launch & Stabilize | 10 days | **12–18 days** | Real user bugs take longer to diagnose. Unexpected OAuth issues post-launch. |
| Phase 3 | AI + Execution extracted | 20 days | **35–50 days** | TypeScript errors, `unified-node-registry` dependency, canary debugging |
| Phase 4 | 4 services + monolith retired | 25 days | **40–55 days** | OAuth redirect URI updates, in-flight credential migration, git conflicts |
| Phase 5 | AWS migration | 25 days | **40–55 days** | VPC setup, MSK TLS, ECS task definition errors, Aurora rollback rehearsal |
| Phase 6 | Optimize + Monitor | 20 days | **30–38 days** | Ollama quality validation, game day scheduling, Qdrant migration if needed |
| Phase 7 | Harden + 1M Prove | 20 days | **28–34 days** | GDPR deletion across 6 services, pre-scale cost surprises |
| **TOTAL** | | **130 days (6 months)** | **203–275 days (9–13 months)** | |

### Single Task Breakdown — Day 1 Only

| Task | Plan Estimate | Realistic Estimate |
|------|--------------|-------------------|
| Fix 1 — Convert 9 static imports to lazy in 20K-line file | Half a day (verify only) | **2–3 days** |
| Fix 2 — PgBouncer setup + credential configuration | 1 day | **1–2 days** |
| Fix 3 — Async execution end-to-end verification | 1 day | **1–2 days** |
| Fix 4 — WebSocket bridge cross-instance testing | 1 day | **1 day** |
| Fix 5 — React.lazy wizard verification | Half a day | **Half to 1 day** |
| Gemini key pool — add 2nd key and verify | Half a day | **Half a day** |
| k6 load test 10 VU → 100 VU + fix failures | 3 days | **3–5 days** |
| Launch checklist + CloudWatch + Sentry + rollback | 2 days | **2–3 days** |
| **Phase 1 Total** | **10 days** | **18–25 days** |

---

---

## 5. What Needs to Be Updated in the Plan

### High Priority — Must Update Before Starting

| Update | Where in Plan | What to Change |
|--------|--------------|----------------|
| Fix 1 description | Phase 1, Day 1 | Change from "verify existing fix" to "implement the fix." List all 9 imports. Add explicit instructions for each. |
| Days 1–10 timeline | Phase 1 | Expand to Days 1–20 minimum |
| Fix order dependency | Phase 1 | Add note: Fix 4 (WebSocket bridge) should be verified before Fix 3 (async execution) is tested end-to-end |
| Fix 1 rollback procedure | Phase 1 | Add: if conversion breaks something, revert by restoring the static import and re-running type-check |
| `executeDatabaseNode` lazy loading | Phase 1 | Add this as a separate bullet — it is more complex than the others because it chains to all DB drivers |

### Medium Priority — Update Before Phase 3

| Update | Where in Plan | What to Change |
|--------|--------------|----------------|
| TypeScript error estimate | Phase 3, Days 27–30 | Add: "expect 50–100 TypeScript import path errors per service. Allocate 2–3 days per service for this work." |
| `unified-node-registry.ts` permanent solution | Phase 3–4 | Add a decision task: before Day 59, team must agree on permanent solution (shared npm package or dedicated service) |
| Git branching strategy | Phase 3 (before Day 21) | Add a section on branch naming and merge strategy for service extractions |
| `from-node-library.ts` handling | Phase 3 | Add a note on how this file is handled when extracting AI Generator |

### Medium Priority — Update Before Phase 4

| Update | Where in Plan | What to Change |
|--------|--------------|----------------|
| OAuth redirect URI updates | Phase 4, Credential Service section | Add a full checklist: for each of the 57 OAuth providers, list the developer console URL and the field to update |
| In-flight token migration | Phase 4 | Add a task for migrating existing user OAuth tokens from monolith storage to Credential Service storage |
| `db-proxy.ts` security note | Phase 4, Day 56 | Add explicit note: verify `db-proxy.ts` uses a strict allowlist before copying, not arbitrary user-supplied table names |

### Medium Priority — Update Before Phase 5

| Update | Where in Plan | What to Change |
|--------|--------------|----------------|
| VPC setup guide | Phase 5 (before Day 66) | Add a pre-requisite section: all AWS managed services must be in the same VPC. Explain security group rules needed. |
| MSK TLS setup detail | Phase 5, Week 15 | Expand KafkaJS TLS configuration to include certificate handling and IAM policy setup |
| Aurora rollback runbook | Phase 5, Week 16 | Add: what error triggers rollback decision, who makes the call, exact commands to revert |
| Staging environment | Phase 5 (before Day 66) | Add a task to create a staging environment before AWS migrations begin |
| Billing alarm | Phase 5 | Add a CloudWatch billing alarm setup step — AWS costs can spike unexpectedly during migration |

### Lower Priority — Update Before Phase 6

| Update | Where in Plan | What to Change |
|--------|--------------|----------------|
| Ollama quality validation | Phase 6, Week 20 | Add a step: test Ollama against 20 real CtrlChecks workflow prompts. Compare output quality to Gemini. Only deploy as free-tier if quality is acceptable. |
| Qdrant threshold validation | Phase 6, Week 21 | Change decision from "100K rows" to "run EXPLAIN ANALYZE first — if similarity search is under 50ms, defer migration" |
| On-call rotation timing | Phase 6 | Move on-call rotation setup from Week 22 to Week 4 — at 10,000+ users you need it much earlier |

---

---

## 6. Things Still Unverified — Needs Investigation

> These are areas we did NOT fully audit. They need manual investigation before work begins on that phase.

| Area | What to Check | Why It Matters |
|------|--------------|----------------|
| **All node definition files in `worker/src/nodes/definitions/`** | Do any of them import heavy SDKs directly (not just `NodeDefinition` type)? | We checked only a few. `mongodb-node.ts` imports `runMongoDBNode` — others may too. |
| **`worker/src/services/nodes/node-library.ts`** | What does this file import at the top level? Is it loading heavy dependencies? | This feeds into `unified-node-registry.ts`. Its startup cost is unknown. |
| **`worker/src/executors/` folder** | How many executor files exist? Do they all have static SDK imports? | ClickUp executor was found as a static import. Others may exist too. |
| **Existing test coverage percentage** | Run `npm test -- --coverage` in `worker/`. What is the actual coverage number? | If below 40%, service extractions will break things silently with no test catching it. |
| **Current memory usage per app instance** | Check actual RAM usage in production or Docker. | The plan claims lazy loading saves 120MB per instance. This needs to be measured before and after to confirm. |
| **PgBouncer configuration exists or not** | Is `infra/docker-compose.yml` already updated with PgBouncer? | Plan says it is. Needs to be visually confirmed. |
| **`ws-redis-bridge.ts` file existence** | Does this file actually exist in `worker/src/`? | Plan says it was created. Needs to be confirmed. |
| **`gemini-key-pool.ts` integration** | Is it already imported and called in `gemini-orchestrator.ts`? | Plan says it is integrated. Needs to be confirmed by reading the file. |
| **`React.lazy` in frontend for wizard** | Is `AutonomousAgentWizard` actually wrapped in `React.lazy()` in the frontend? | Plan says it is. Check `ctrl_checks/src/` for the lazy import. |
| **`EXECUTION_QUEUE_ENABLED` env var behavior** | What happens if this is set to true but the queue is not running? Does it fail silently or throw an error? | Needs investigation before enabling in production. |
| **All 57 OAuth providers current working status** | Which ones actually work end-to-end right now? | The plan says "test top 10." But the baseline of which ones work needs to be established before Phase 4 begins. |
| **Database migration history** | Check `worker/prisma/migrations/` — how many migrations exist? Are they all applied? | If migrations are out of sync, the Aurora migration will carry over the inconsistency. |

---

---

## 7. What the Plan Gets Right

To be fair and balanced — the plan is architecturally sound in many ways.

| What Is Correct | Why It Is Good |
|-----------------|----------------|
| **Launch on Day 11, not after all 6 services are built** | This is the right call. Real user data should drive infrastructure decisions. |
| **Canary deployment pattern (33% → 66% → 100%)** | This is the industry-standard way to safely migrate traffic. Correct approach. |
| **Service extraction order** (AI Generator first, then Execution, then Credentials, etc.) | This is the right order — highest-risk services first while the team is most careful, simpler services last. |
| **AWS managed services migration sequence** | ElastiCache before MSK before Aurora is the correct risk-ordered sequence. |
| **Game day failure simulation** | Most teams skip this. Including it shows operational maturity. |
| **One buffer week at Month 3** | Good to have, though underestimated in size. |
| **Tiered AI (Gemini Pro + Ollama Free)** | Smart product and cost decision. |
| **Progressive load testing** (10 → 100 → 200 → 1,000 → 2,000 VU) | Correct methodology. |
| **Contract tests between services** | Good practice for service extraction safety. |
| **Core execution logic (nodes, DAG, template resolution) unchanged** | The plan correctly does not touch node behaviour — only infrastructure. This is the right call. |

---

---

## 8. Recommended Next Steps Before Day 1

Before starting Day 1 work, the team should do the following:

### Step 1 — Verify Which Fixes Are Actually Done (1–2 days)

Go through each of the 5 fixes and check the actual code:

```
Fix 1: grep for static SDK imports in execute-workflow.ts — are they still static?
Fix 2: check infra/docker-compose.yml — does pgbouncer service exist?
Fix 3: check execute-workflow.ts — does it return HTTP 202 + jobId?
Fix 4: check worker/src/ — does ws-redis-bridge.ts exist?
Fix 5: check ctrl_checks/src/ — is AutonomousAgentWizard wrapped in React.lazy()?
```

This determines whether Day 1 is verification work or implementation work.

### Step 2 — Run Existing Tests Baseline (1 day)

```bash
cd worker && npm test -- --coverage    # check coverage %
cd ctrl_checks && npm run test:vitest  # check frontend test count
```

Document how many tests pass, fail, and what the coverage percentage is. This is the safety net for all future changes.

### Step 3 — Agree on Realistic Timeline (1 meeting)

Based on what Step 1 finds, revise the Phase 1 timeline from 10 days to a realistic number. If Fix 1 is not done, add 3 days minimum. Brief the mentor on the revised timeline.

### Step 4 — Create a Verification Checklist Per Fix

Before touching any code, write down for each fix:
- What does "done" look like exactly?
- What test proves it works?
- What is the rollback if it breaks something?

This 2-hour preparation prevents days of confusion later.

---

---

## Summary

| Category | Count Found |
|----------|-------------|
| Critical issues (stop-work level) | 4 |
| Medium issues (significant impact) | 12 |
| Low issues (minor impact) | 6 |
| Missing documentation sections | 14 |
| Things still unverified in code | 11 |
| Things plan gets right | 10 |

---

> **Final Note:**
> Everything in this document was found through analysis of specific files. It does not represent a complete audit. As implementation begins, new gaps will surface. The purpose of this document is not to say "the plan is bad" — the architecture is sound. The purpose is to ensure the team starts Day 1 with accurate expectations, not optimistic ones.
>
> A plan that takes 9 months and is executed well is better than a plan that was supposed to take 6 months and fails at Month 4 because of unresolved hidden complexity.

---

*Document Version 1.0*
*Created by: Code analysis of actual CtrlChecks repository*
*Status: First pass only — more gaps expected as implementation progresses*
