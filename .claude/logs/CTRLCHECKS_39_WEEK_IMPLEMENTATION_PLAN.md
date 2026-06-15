# CtrlChecks 39-Week Implementation Plan

Planning assumptions:
- Two developers: Dev 1 owns backend, infrastructure, data, service extraction, and production operations. Dev 2 owns frontend, testing, QA automation, user-facing flows, and release validation.
- The existing `worker/` monolith remains production-capable until every extracted service is canaried at 33%, 66%, and 100% and has rollback documented.
- `worker/src/core/registry/unified-node-registry.ts` remains the single source of node truth. Do not add node-specific branching outside the registry.
- All AWS cutovers happen in low-traffic weekend-night windows, with staging proof and rollback rehearsed first.

## WEEK 1 - Phase 1: Build Async Execution and Lazy SDK Loading
Target: 150 concurrent users | Cost: $50/month
Expected output: monolith startup is lighter, execution can return `202 Accepted` through Kafka when async mode is enabled.

**Dev 1 - Backend/Infrastructure:**
- Verify current sync/async behavior in `worker/src/api/execute-workflow.ts`; if `202 Accepted` is missing, add an async path using `worker/src/queue/execution-request-producer.ts`, `worker/src/workers/execution-request-consumer.ts`, and `worker/src/api/workflow-status.ts`.
- Register the status route and async feature flag in `worker/src/index.ts`; document `EXECUTION_ASYNC_ENABLED`, `KAFKA_BROKERS`, and `REDIS_URL` in `worker/.env.example`.
- Convert all static startup imports in `worker/src/api/execute-workflow.ts` to inline `require()` inside the actual handlers: ClickUp, Airtable, FormData, Pipedrive, Notion, Notion token manager, Twitter, Twitter token manager, Instagram token manager, WhatsApp token manager, and `executeDatabaseNode`.
- Add `worker/src/api/__tests__/execute-workflow.async.test.ts` and `worker/src/api/__tests__/execute-workflow.lazy-imports.test.ts`.
- Done when: `cd worker && npm run type-check && npm run build && npm test` passes, async execution returns `202` with a status id, and startup profiling shows the listed SDKs are not loaded before first use.

**Dev 2 - Frontend/Testing:**
- Create `tests/load/baseline.js` and `tests/load/execute-workflow-async.js` with scenarios for login, workflow creation, async execution, and status polling.
- Add frontend API helpers in `ctrl_checks/src/lib/api/executions.ts` for `POST /execute` and `GET /workflow-status/:id`.
- Add status state to `ctrl_checks/src/stores/workflowStore.ts` without changing graph mutation behavior.
- Add Vitest coverage in `ctrl_checks/src/stores/__tests__/workflowStore.execution-status.test.ts`.
- Done when: `cd ctrl_checks && npm run build && npm run test:vitest` passes and `k6 run tests/load/baseline.js` records a baseline report under `tests/load/results/week-01-baseline.json`.

**Possible Issues This Week:**
- Inline `require()` causes TypeScript typing errors -> add narrow local types or typed helper wrappers; do not reintroduce top-level SDK imports.
- Async execution changes response shape -> keep the old sync response behind `EXECUTION_ASYNC_ENABLED=false` until the frontend has shipped status handling.

## WEEK 2 - Phase 1: Build PgBouncer and Gemini Key Pool
Target: 300 concurrent users | Cost: $80/month
Expected output: database connections are pooled locally and Gemini requests can rotate across multiple keys without breaking existing callers.

**Dev 1 - Backend/Infrastructure:**
- Add PgBouncer to `infra/docker-compose.yml` with config files under `infra/pgbouncer/pgbouncer.ini` and `infra/pgbouncer/userlist.txt`.
- Update `worker/src/core/database/aws-db-client.ts` to prefer `PGBOUNCER_URL` when present and keep `DATABASE_URL` as fallback.
- Create `worker/src/services/ai/gemini-key-pool.ts` with round-robin key selection, cooldown after rate-limit errors, and support for `GEMINI_API_KEY`, `GEMINI_API_KEY_1`, and `GEMINI_API_KEY_2`.
- Update `worker/src/services/ai/gemini-orchestrator.ts` backward-compatibly so existing imports and singleton usage still work.
- Add tests in `worker/src/services/ai/__tests__/gemini-key-pool.test.ts` and `worker/src/core/database/__tests__/aws-db-client.pgbouncer.test.ts`.
- Done when: PgBouncer starts through `docker compose -f infra/docker-compose.yml up -d`, DB health checks pass through PgBouncer, and Gemini retries rotate keys during simulated 429 responses.

**Dev 2 - Frontend/Testing:**
- Convert the wizard entry to lazy loading by creating `ctrl_checks/src/components/workflow/AutonomousAgentWizard.lazy.tsx` and updating imports/routes that currently import `AutonomousAgentWizard.tsx` directly.
- Add a loading boundary in the parent workflow page, using existing design patterns and no new marketing-style UI.
- Add build-size tracking in `ctrl_checks/scripts/check-bundle-size.mjs` and wire it into `ctrl_checks/package.json`.
- Add a regression test in `ctrl_checks/src/components/workflow/__tests__/AutonomousAgentWizard.lazy.test.tsx`.
- Done when: `cd ctrl_checks && npm run build` emits a separate wizard chunk and the initial bundle is smaller than the Week 1 build report.

**Possible Issues This Week:**
- PgBouncer auth mode does not match RDS credentials -> use transaction pooling locally first, then document production auth in `infra/pgbouncer/README.md`.
- Lazy wizard route flashes or loses state -> keep Zustand state outside the lazy boundary and test that wizard progress survives chunk loading.

## WEEK 3 - Phase 1: Build WebSocket Redis Bridge and Launch Readiness
Target: 500 concurrent users | Cost: $100/month
Expected output: all three Express app instances can publish user notifications through Redis, and the launch candidate survives local load testing.

**Dev 1 - Backend/Infrastructure:**
- Create `worker/src/ws-redis-bridge.ts` to subscribe/publish WebSocket events through Redis so `app1`, `app2`, and `app3` share notifications.
- Integrate the bridge in `worker/src/index.ts` without changing existing route registration order.
- Add health metrics in `worker/src/health/ws-health.ts` and expose them through the existing health endpoint.
- Add `worker/src/__tests__/ws-redis-bridge.test.ts` with mocked Redis pub/sub.
- Run `docker compose -f infra/docker-compose.yml up -d` and fix container networking for nginx, app instances, Redis, Kafka, and PgBouncer.
- Done when: two app instances receive a test notification for the same user through Redis pub/sub and `cd worker && npm run type-check && npm run build && npm test` is clean.

**Dev 2 - Frontend/Testing:**
- Update frontend realtime handling in `ctrl_checks/src/lib/realtime/workflowEvents.ts` or the existing WebSocket client file to tolerate reconnects and duplicate events.
- Add execution progress UI states in the workflow run surface, using existing components and compact status indicators.
- Add Playwright or Vitest coverage for reconnect behavior in `ctrl_checks/src/lib/realtime/__tests__/workflowEvents.test.ts`.
- Run `k6 run tests/load/execute-workflow-async.js` against docker compose and save `tests/load/results/week-03-launch-candidate.json`.
- Done when: frontend build/tests pass and the load test reaches 500 concurrent users with p95 API latency under the launch threshold defined in `tests/load/thresholds.json`.

**Possible Issues This Week:**
- Redis duplicate delivery creates repeated UI events -> add event ids and client-side de-dupe in the realtime helper.
- Kafka lag appears under load -> reduce message payload size and add lag logging before changing broker settings.

## WEEK 4 - Phase 1 Buffer: Launch Hardening and Production Cutover
Target: 500 concurrent users | Cost: $120/month
Expected output: the first public launch is complete with rollback, dashboards, and known hot paths documented.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/week-04-launch-runbook.md` with deploy steps, rollback steps, health checks, owner names, and exact abort conditions.
- Add production-safe log fields for async execution, PgBouncer, Redis bridge, and Gemini key selection in `worker/src/middleware/request-logger.ts`.
- Tune nginx and app container limits in `infra/docker-compose.yml` based on Week 3 load-test data.
- Create `tests/load/results/week-04-launch-report.md` summarizing p50, p95, p99, error rate, Kafka lag, Redis memory, and DB connection count.
- Done when: launch runbook is rehearsed locally, production deploy finishes, rollback is documented, and error rate stays below 1% during a 30-minute 500-user smoke test.

**Dev 2 - Frontend/Testing:**
- Build a launch regression checklist in `docs/qa/week-04-launch-checklist.md` covering auth, workflow generation, save/load, execution status, OAuth connection page, and billing visibility.
- Add user-facing error messages for async execution failure states in the existing workflow run component.
- Verify lazy wizard, reconnect behavior, and status polling across Chrome, Edge, and mobile viewport sizes.
- Save screenshots or test evidence under `docs/qa/evidence/week-04/`.
- Done when: checklist is fully green, frontend tests pass, and no critical UI blockers remain for launch.

**Possible Issues This Week:**
- Production-only CORS or WebSocket origin errors -> add exact production origins to backend CORS config and `VITE_PUBLIC_BASE_URL`.
- Load test finds a slow OAuth or DB node -> disable only that node behind a feature flag and keep the registry as the source of node behavior.

## WEEK 5 - Phase 2: Stabilize Real Users and Triage Post-Launch Bugs
Target: 750 concurrent users | Cost: $150/month
Expected output: production issues are visible, prioritized, and fixed without starting risky extraction work too early.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/production-triage.md` with severity levels, response targets, and rollback rules for the monolith.
- Add structured error aggregation fields in `worker/src/middleware/error-handler.ts` and execution failure paths in `worker/src/api/execute-workflow.ts`.
- Fix top backend defects found from Week 4 launch logs, keeping changes scoped to `worker/src/api/`, `worker/src/core/database/`, or `worker/src/services/ai/`.
- Start AI Generator service skeleton under `services/ai-generator/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/health.ts`, and `.env.example`.
- Done when: P0/P1 launch defects are closed or mitigated and `cd services/ai-generator && npm run type-check` works for the empty service shell.

**Dev 2 - Frontend/Testing:**
- Add regression cases for launch bugs in `ctrl_checks/src/**/__tests__/` or `tests/e2e/launch-regression.spec.ts`.
- Improve visible error recovery for workflow generation and execution status in existing workflow components.
- Add a QA issue log in `docs/qa/week-05-production-bugs.md` with reproduction steps and fixed version.
- Update `tests/load/baseline.js` with realistic think times from production behavior.
- Done when: all known frontend P0/P1 launch bugs have tests or documented mitigations and the frontend build remains clean.

**Possible Issues This Week:**
- Production logs lack enough context -> add correlation ids to request and execution logs, then replay one failure path.
- Users hit rate limits in Gemini despite key pool -> temporarily lower AI concurrency and add backlog metrics before adding more keys.

## WEEK 6 - Phase 2: Git Branching Strategy and Extraction Guardrails
Target: 1,000 concurrent users | Cost: $200/month
Expected output: the team has a merge strategy before multi-service extraction begins.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/engineering/branching-strategy.md` defining `main`, `develop`, `feature/service-*`, release branches, PR order, freeze windows, and conflict-resolution ownership.
- Add `.github/pull_request_template.md`, `.github/CODEOWNERS`, and `.github/workflows/ci.yml` if missing; CI must run worker type-check/build/tests and frontend build/tests.
- Add `docs/engineering/service-extraction-contracts.md` with service ownership, ports 3002-3007, env vars, canary steps, and rollback rules.
- Add dependency boundary checks in `scripts/check-service-boundaries.mjs` to prevent node-specific logic from spreading outside registry-owned modules.
- Done when: CI can run locally or in GitHub Actions, branch strategy is documented, and extraction PRs have an agreed merge order.

**Dev 2 - Frontend/Testing:**
- Create `tests/contracts/` with initial API contract fixtures for AI generation, execution, credentials, notifications, triggers, and workflow CRUD.
- Add frontend contract consumers in `ctrl_checks/src/lib/api/__tests__/contract-shapes.test.ts` for current monolith responses.
- Create `docs/qa/extraction-regression-matrix.md` mapping each user workflow to the service that will own it.
- Done when: the regression matrix covers auth, OAuth, AI generation, execution, realtime updates, trigger creation, workflow CRUD, templates, and Razorpay.

**Possible Issues This Week:**
- The repo is not currently a git repository in this workspace -> document the strategy anyway and apply it in the canonical repository before Phase 3 PRs start.
- CI takes too long -> split frontend and backend jobs while keeping all required checks blocking on service-extraction branches.

## WEEK 7 - Phase 2: Permanent Shared Registry Design Before Extraction
Target: 1,200 concurrent users | Cost: $250/month
Expected output: AI Generator and Execution Engine have a permanent registry-sharing design before monolith retirement planning starts.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/architecture/shared-node-registry.md` with the permanent solution: a workspace package `packages/node-registry` that owns the canonical registry code, while `worker/src/core/registry/unified-node-registry.ts` remains a backward-compatible re-export shim.
- Scaffold `packages/node-registry/package.json`, `packages/node-registry/tsconfig.json`, and `packages/node-registry/src/index.ts`; do not move registry logic this week.
- Add `docs/architecture/registry-migration-checklist.md` listing imports that must change in `worker/`, `services/ai-generator/`, and `services/execution-engine/`.
- Add a proof test in `packages/node-registry/src/__tests__/registry-contract.test.ts` that can later assert exported node definitions match the monolith registry.
- Done when: the design is reviewed, no runtime code path depends on HTTP calls to the monolith for registry behavior, and the migration has a clear compatibility path.

**Dev 2 - Frontend/Testing:**
- Add contract fixtures in `tests/contracts/node-registry/` for node input schema, output schema, credential requirements, and UI metadata consumed by the frontend.
- Update frontend node rendering tests around `ctrl_checks/src/components/workflow/` so they fail if registry-derived metadata changes shape unexpectedly.
- Add `docs/qa/registry-contract-test-plan.md` covering how to test node palette, AI-generated workflows, and execution after the registry becomes a package.
- Done when: registry contract fixtures are committed and frontend tests can validate node metadata shape without hardcoding node-specific behavior.

**Possible Issues This Week:**
- Moving the registry looks risky -> keep Week 7 as design and scaffold only; implementation happens during service extraction with compatibility shims.
- Tests accidentally duplicate registry logic -> use snapshots and schema assertions, not hand-written per-node behavior.

## WEEK 8 - Phase 2 Buffer: Stabilization Gate and On-Call Setup
Target: 1,200 concurrent users | Cost: $300/month
Expected output: Phase 3 can start with stable production, first on-call rotation, and frozen extraction contracts.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/on-call-rotation.md` with primary/secondary schedule, escalation rules, incident template, and paging thresholds; start rotation now rather than Month 6.
- Add `docs/ops/incident-template.md` and `docs/ops/postmortem-template.md`.
- Run a production-readiness review against `docs/engineering/service-extraction-contracts.md` and fix missing health endpoints in `worker/src/health/`.
- Freeze Phase 3 API contracts in `tests/contracts/ai-generator/` and `tests/contracts/execution-engine/`.
- Done when: on-call is active, Phase 3 contracts are approved, and production has had seven days without unresolved P0/P1 incidents.

**Dev 2 - Frontend/Testing:**
- Execute the full regression matrix in `docs/qa/extraction-regression-matrix.md` and save evidence under `docs/qa/evidence/week-08/`.
- Add smoke tests for canary toggles in frontend API helpers so the UI works whether monolith or extracted service handles the request.
- Update `tests/load/baseline.js` thresholds based on Weeks 4-7 production data.
- Done when: QA signs off Phase 3 readiness and frontend can tolerate monolith/extracted-service response parity.

**Possible Issues This Week:**
- On-call alerts are noisy -> tune alert thresholds for user-visible failure and sustained saturation, not single transient warnings.
- Contract gaps appear -> delay only the affected endpoint extraction, not the entire Phase 3 scaffold.

## WEEK 9 - Phase 3: Extract AI Generator Service Scaffold and Registry Package
Target: 1,500 concurrent users | Cost: $400/month
Expected output: AI Generator service runs on port 3002 locally and can call the same generation pipeline through a stable package boundary.

**Dev 1 - Backend/Infrastructure:**
- Move registry code into `packages/node-registry/src/unified-node-registry.ts` without changing logic; update `worker/src/core/registry/unified-node-registry.ts` to re-export from the package.
- Update import paths in `worker/src/core/execution/dynamic-node-executor.ts`, `worker/src/nodes/definitions/index.ts`, and service scaffolds to use `@ctrlchecks/node-registry` where appropriate.
- Implement `services/ai-generator/src/index.ts`, `services/ai-generator/src/routes/generate-workflow.ts`, `services/ai-generator/src/services/gemini-orchestrator-adapter.ts`, and `services/ai-generator/src/health.ts`.
- Copy only AI generation dependencies from `worker/src/services/ai/` into service-owned folders or import shared packages; avoid copying unrelated execution code.
- Done when: `cd services/ai-generator && npm run type-check && npm run build` passes with fewer than 25 remaining extraction errors documented in `docs/extraction/week-09-ai-generator-errors.md`.

**Dev 2 - Frontend/Testing:**
- Add `AI_GENERATOR_ENABLED` and `AI_GENERATOR_URL` client-awareness in `ctrl_checks/src/lib/api/aiGenerator.ts`, while keeping `VITE_API_URL` as fallback.
- Create contract tests in `tests/contracts/ai-generator/generate-workflow.contract.test.ts` comparing monolith and service responses.
- Add QA flows in `tests/e2e/ai-generator-canary.spec.ts` for prompt-to-workflow generation through both paths.
- Done when: frontend tests pass against the monolith fallback and contract tests identify any response differences before canary traffic is enabled.

**Possible Issues This Week:**
- Registry package import creates circular dependencies -> keep registry package free of Express, database, and service imports.
- AI service copy produces many path errors -> fix imports in batches by ownership area and document unresolved errors daily.

## WEEK 10 - Phase 3: AI Generator TypeScript Fixes and 33% Canary
Target: 2,000 concurrent users | Cost: $450/month
Expected output: AI Generator handles a controlled 33% canary while monolith fallback remains instant.

**Dev 1 - Backend/Infrastructure:**
- Burn down TypeScript import errors in `services/ai-generator/src/**` caused by extracted `worker/src/services/ai/**` dependencies.
- Add service-to-monolith compatibility only for non-registry dependencies that are not safe to move yet; document each bridge in `docs/extraction/temporary-bridges.md`.
- Add canary routing in `worker/src/api/ai-generator-proxy.ts` and register it in `worker/src/index.ts` behind `AI_GENERATOR_ENABLED=false`.
- Add service health and readiness checks in `services/ai-generator/src/health.ts`.
- Done when: AI Generator has zero TypeScript errors, local canary at 33% passes 200 generated-workflow requests, and disabling `AI_GENERATOR_ENABLED` restores monolith-only behavior immediately.

**Dev 2 - Frontend/Testing:**
- Run `tests/e2e/ai-generator-canary.spec.ts` with 33% service traffic and save evidence under `docs/qa/evidence/week-10/`.
- Add UI error handling for AI Generator timeout fallback in the existing wizard components.
- Compare generated workflow JSON validity against `tests/contracts/node-registry/` fixtures and record failures in `docs/qa/week-10-ai-json-quality.md`.
- Done when: 33% canary has no P0/P1 frontend regressions and invalid generated workflow JSON stays below the agreed threshold.

**Possible Issues This Week:**
- Gemini orchestration differs between monolith and service -> keep `gemini-orchestrator.ts` facade backward-compatible and compare serialized prompts/responses.
- 33% canary increases latency -> reduce AI service concurrency first, then profile prompt stages before scaling containers.

## WEEK 11 - Phase 3: AI Generator 66% to 100% Canary and Fallback Cleanup
Target: 2,500 concurrent users | Cost: $500/month
Expected output: AI generation is service-owned in production, with monolith fallback still available.

**Dev 1 - Backend/Infrastructure:**
- Move AI Generator canary from 33% to 66%, then 100%, with rollback checks after each step.
- Add production metrics in `services/ai-generator/src/metrics.ts` for generation count, failures, latency, Gemini key id, and fallback usage.
- Remove unnecessary temporary bridges listed as safe in `docs/extraction/temporary-bridges.md`.
- Add `services/ai-generator/README.md` with run, test, env, deploy, canary, and rollback instructions.
- Done when: AI generation has run at 100% service traffic for 48 hours with monolith fallback available and p95 generation latency no worse than the Week 8 baseline by more than 15%.

**Dev 2 - Frontend/Testing:**
- Update frontend telemetry events for generation start, generation success, generation fallback, and generation failure in existing analytics helpers.
- Add regression coverage for prompt drafts, generated node preview, save workflow, and retry in `tests/e2e/ai-generator-production.spec.ts`.
- Run `cd ctrl_checks && npm run build && npm run test:vitest` after every canary step.
- Done when: AI workflow creation works at 100% service traffic on desktop and mobile test viewports.

**Possible Issues This Week:**
- Canary rollback needs manual config edits -> add a single env toggle and document exact restart command in service README.
- Long-running generations time out through nginx -> increase service timeout only for AI routes and keep normal API routes unchanged.

## WEEK 12 - Phase 3 Buffer: Extraction Error Burn-Down and On-Call Drill
Target: 2,500 concurrent users | Cost: $550/month
Expected output: AI Generator extraction is hardened and the team practices incident response before extracting execution.

**Dev 1 - Backend/Infrastructure:**
- Close remaining AI extraction debt in `docs/extraction/week-09-ai-generator-errors.md` and `docs/extraction/temporary-bridges.md`.
- Run an on-call drill using `docs/ops/incident-template.md`: simulate AI Generator outage, disable `AI_GENERATOR_ENABLED`, verify monolith fallback, and write `docs/ops/drills/week-12-ai-generator-outage.md`.
- Add alerts for AI generation error rate and p95 latency in `infra/monitoring/alerts-ai-generator.yml` or the repo's existing monitoring path.
- Done when: AI Generator outage drill completes in under 10 minutes and no critical extraction errors remain undocumented.

**Dev 2 - Frontend/Testing:**
- Re-run the full extraction regression matrix and mark AI Generator scenarios as service-owned in `docs/qa/extraction-regression-matrix.md`.
- Add a canary visual smoke checklist under `docs/qa/week-12-canary-visual-checks.md`.
- Update e2e tests to assert users see recoverable AI failure states instead of blank screens.
- Done when: QA evidence shows monolith fallback and service path both produce usable workflow drafts.

**Possible Issues This Week:**
- Drill reveals fallback state is stale -> keep fallback request stateless and clear old generation ids before retry.
- Monitoring config is not deployed yet -> store alert definitions in repo now and manually monitor the same metrics until automated deployment exists.

## WEEK 13 - Phase 3: Extract Execution Engine Scaffold and Import Fixes
Target: 3,500 concurrent users | Cost: $600/month
Expected output: Execution Engine service runs on port 3003 with the registry package and a large TypeScript error budget explicitly burned down.

**Dev 1 - Backend/Infrastructure:**
- Scaffold `services/execution-engine/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/routes/execute-workflow.ts`, `src/workers/execution-request-consumer.ts`, `src/health.ts`, and `.env.example`.
- Extract execution-related code from `worker/src/api/execute-workflow.ts`, `worker/src/core/execution/dynamic-node-executor.ts`, `worker/src/core/orchestration/unified-graph-orchestrator.ts`, and `worker/src/services/database/database-node-handler.ts`.
- Fix broken internal import paths in `services/execution-engine/src/**`; allocate two to three days for 50-100 TypeScript errors.
- Add `EXECUTION_ENGINE_ENABLED=false` and `EXECUTION_ENGINE_URL=http://localhost:3003` docs in `worker/.env.example`.
- Done when: execution service builds locally with zero TypeScript errors or all remaining errors are listed with owners in `docs/extraction/week-13-execution-errors.md`.

**Dev 2 - Frontend/Testing:**
- Create `tests/contracts/execution-engine/execute-workflow.contract.test.ts` comparing monolith and service execution responses.
- Add `tests/e2e/execution-engine-canary.spec.ts` for manual run, scheduled run, and failure state.
- Update frontend execution helpers in `ctrl_checks/src/lib/api/executions.ts` to tolerate service-owned status ids and monolith-owned status ids.
- Done when: contract tests expose response differences and frontend still passes against monolith execution.

**Possible Issues This Week:**
- `execute-workflow.ts` extraction drags unrelated node-specific handlers -> keep handlers registry-driven and move shared helpers instead of adding `if node.type` logic.
- Database driver imports return through the service startup path -> preserve Week 1 lazy loading inside extracted execution handlers.

## WEEK 14 - Phase 3: Execution Engine Canary and Load Test
Target: 5,000 concurrent users | Cost: $700/month
Expected output: execution is service-owned at 100% canary with Kafka status tracking and monolith rollback.

**Dev 1 - Backend/Infrastructure:**
- Add `worker/src/api/execution-engine-proxy.ts` to route execution traffic to port 3003 by canary percentage.
- Run 33%, 66%, and 100% canary for Execution Engine with documented rollback at each step.
- Add metrics in `services/execution-engine/src/metrics.ts` for workflow starts, node executions, node failures, DB-node lazy loads, Kafka lag, and p95 execution duration.
- Update `services/execution-engine/README.md` with run, test, env, deploy, canary, and rollback steps.
- Done when: Execution Engine runs 100% production execution traffic for 48 hours, `EXECUTION_ENGINE_ENABLED=false` rolls back within 10 minutes, and `k6 run tests/load/execute-workflow-async.js` passes at 5,000 target concurrency in the scaled environment.

**Dev 2 - Frontend/Testing:**
- Run `tests/e2e/execution-engine-canary.spec.ts` at 33%, 66%, and 100% traffic and save evidence under `docs/qa/evidence/week-14/`.
- Add frontend tests for execution timeout, retry, cancel, and failure details if the UI exposes those states.
- Update `docs/qa/extraction-regression-matrix.md` to mark execution scenarios service-owned.
- Done when: users can generate, save, execute, and inspect workflow status without knowing whether execution was handled by monolith or service.

**Possible Issues This Week:**
- Kafka consumer duplicates execution jobs -> add idempotency key checks in the execution service before increasing partitions.
- Some OAuth-backed nodes fail only in the extracted service -> verify credential-vault env and service IAM/secret access before changing node logic.

## WEEK 15 - Phase 4: Extract Credential Service Scaffold
Target: 6,000 concurrent users | Cost: $800/month
Expected output: Credential Service on port 3004 owns OAuth route execution behind a canary proxy.

**Dev 1 - Backend/Infrastructure:**
- Scaffold `services/credential-service/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/routes/oauth.ts`, `src/routes/credentials.ts`, `src/health.ts`, and `.env.example`.
- Extract handlers from `worker/src/credentials-system/` and shared secret access from `worker/src/core/credentials/credential-vault.ts` without changing provider behavior.
- Add `worker/src/api/credential-service-proxy.ts` and canary env vars `CREDENTIAL_SERVICE_ENABLED=false`, `CREDENTIAL_SERVICE_URL=http://localhost:3004`.
- Fix TypeScript import errors across all 57 OAuth handlers and document provider-specific risks in `docs/extraction/week-15-credential-errors.md`.
- Done when: Credential Service type-checks/builds, all 57 OAuth routes are listed in a generated route inventory, and 33% local canary works for at least Google, Slack, GitHub, Notion, and Twitter.

**Dev 2 - Frontend/Testing:**
- Create `tests/contracts/credential-service/oauth-callback.contract.test.ts` and `tests/e2e/credential-service-canary.spec.ts`.
- Update `ctrl_checks/src/pages/ConnectionsPage.tsx` and related API helpers to handle service redirect URLs and fallback errors.
- Create `docs/qa/oauth-provider-test-matrix.md` with all 57 providers, dev console owner, current redirect URI, new redirect URI, sandbox account, and test status.
- Done when: top 10 providers by usage have documented test accounts and frontend connection flows pass against monolith fallback.

**Possible Issues This Week:**
- Some providers hardcode callback domains -> keep monolith callback active while adding the new service callback domain in provider consoles.
- Secret access differs by service -> centralize access through `credential-vault.ts` or a shared package, not provider-specific workarounds.

## WEEK 16 - Phase 4 Buffer: OAuth Redirect Updates Across 57 Providers
Target: 6,000 concurrent users | Cost: $850/month
Expected output: manual provider-console redirect work is tracked, verified, and ready for production canary.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/oauth-provider-redirect-updates.md` with provider console links, exact old/new redirect URIs, owner, timestamp, screenshot/evidence field, and rollback URI.
- Update service env docs in `services/credential-service/.env.example`, `worker/.env.example`, and deployment notes so callback bases are explicit.
- Run Credential Service 33% -> 66% canary only for providers whose redirect URIs are verified; keep all other providers on monolith.
- Add callback route logging in `services/credential-service/src/routes/oauth.ts` for provider, callback path, user id, and failure reason.
- Done when: all 57 providers have either verified new redirect URIs or documented blockers, and no provider is switched to service traffic without a verified rollback URI.

**Dev 2 - Frontend/Testing:**
- Execute OAuth tests from `docs/qa/oauth-provider-test-matrix.md`; prioritize Google, Slack, GitHub, Notion, Airtable, Twitter/X, Meta, WhatsApp, Pipedrive, and ClickUp.
- Add user-facing handling for provider callback failures in `ctrl_checks/src/pages/ConnectionsPage.tsx`.
- Save provider-console proof under `docs/qa/evidence/week-16/oauth/`.
- Done when: top 20 providers connect successfully through Credential Service in staging/local equivalent, and the remaining providers have scheduled owners.

**Possible Issues This Week:**
- Provider console access is missing -> assign account owner and keep that provider on monolith until access is restored.
- Redirect update causes production auth failures -> revert that provider's redirect to monolith and disable service canary for that provider only.

## WEEK 17 - Phase 4: Extract Notification Service
Target: 7,000 concurrent users | Cost: $900/month
Expected output: Notification Service on port 3005 owns WebSocket connections and Redis fanout.

**Dev 1 - Backend/Infrastructure:**
- Scaffold `services/notification-service/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/ws-server.ts`, `src/redis-bridge.ts`, `src/health.ts`, and `.env.example`.
- Move WebSocket logic and Redis bridge behavior from `worker/src/ws-redis-bridge.ts` into the service while keeping worker publishing compatible.
- Add `worker/src/services/notifications/notification-client.ts` for publishing events to Redis or service HTTP without direct WebSocket ownership.
- Canary WebSocket traffic at 33%, 66%, and 100% using sticky routing or connection-aware load balancer config.
- Done when: Notification Service handles 100% realtime connections for 24 hours, worker no longer accepts new WebSocket connections in canary mode, and Redis fanout works across multiple instances.

**Dev 2 - Frontend/Testing:**
- Update frontend WebSocket URL selection in `ctrl_checks/src/lib/realtime/workflowEvents.ts` using `VITE_NOTIFICATION_WS_URL` with monolith fallback.
- Add reconnect, duplicate-event, and service-cutover tests in `tests/e2e/notification-service.spec.ts`.
- Validate mobile and desktop workflow execution progress UI during service WebSocket reconnects.
- Done when: UI receives execution and AI generation events through Notification Service with no duplicate visible updates.

**Possible Issues This Week:**
- Existing clients stay connected to monolith during canary -> allow draining and measure new-connection ownership instead of force-kicking users.
- Load balancer lacks WebSocket stickiness -> use Redis pub/sub for fanout and avoid relying on local process memory.

## WEEK 18 - Phase 4: Extract Trigger Service
Target: 8,000 concurrent users | Cost: $950/month
Expected output: Trigger Service on port 3006 owns webhooks, forms, schedules, and chat trigger intake behind canary.

**Dev 1 - Backend/Infrastructure:**
- Scaffold `services/trigger-service/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/routes/webhooks.ts`, `src/routes/forms.ts`, `src/routes/schedules.ts`, `src/routes/chat.ts`, `src/health.ts`, and `.env.example`.
- Extract trigger-related routes from `worker/src/index.ts` and current `worker/src/api/**` route files into service routes, preserving request validation.
- Add Kafka producer integration to send execution requests to Execution Engine through existing queue topics.
- Add canary proxy in `worker/src/api/trigger-service-proxy.ts` with `TRIGGER_SERVICE_ENABLED=false`, `TRIGGER_SERVICE_URL=http://localhost:3006`.
- Done when: Trigger Service type-checks/builds and 33% -> 66% -> 100% canary works for webhook, form, schedule, and chat triggers.

**Dev 2 - Frontend/Testing:**
- Add contract tests in `tests/contracts/trigger-service/` for webhook creation, form submit, schedule save, and chat trigger start.
- Update trigger setup UI helpers in `ctrl_checks/src/lib/api/triggers.ts` or the existing API layer to support service responses.
- Run e2e tests in `tests/e2e/trigger-service.spec.ts` covering creation, update, disable, and fired-trigger status.
- Done when: all trigger entry points create execution jobs through Trigger Service and frontend shows the same status as monolith.

**Possible Issues This Week:**
- Webhook URLs change and break external integrations -> keep old monolith URLs forwarding to Trigger Service until customers migrate.
- Schedule duplication fires workflows twice -> add idempotency keys and disable monolith scheduler before 100% trigger canary.

## WEEK 19 - Phase 4: Extract Workflow CRUD Service
Target: 9,000 concurrent users | Cost: $1,000/month
Expected output: Workflow CRUD Service on port 3007 owns save/load/templates/payments-facing workflow metadata APIs.

**Dev 1 - Backend/Infrastructure:**
- Scaffold `services/workflow-crud-service/` with `package.json`, `tsconfig.json`, `src/index.ts`, `src/routes/workflows.ts`, `src/routes/templates.ts`, `src/routes/payments.ts`, `src/health.ts`, and `.env.example`.
- Extract workflow save/load/template routes from `worker/src/index.ts` and relevant `worker/src/api/**` files.
- Keep Razorpay integration behavior compatible while documenting payment-owned boundaries in `docs/architecture/workflow-crud-service.md`.
- Add `worker/src/api/workflow-crud-service-proxy.ts` and env vars `WORKFLOW_CRUD_SERVICE_ENABLED=false`, `WORKFLOW_CRUD_SERVICE_URL=http://localhost:3007`.
- Done when: Workflow CRUD Service type-checks/builds and completes 33%, 66%, and 100% canary for workflow save/load/template routes.

**Dev 2 - Frontend/Testing:**
- Update `ctrl_checks/src/lib/api/workflows.ts`, template API helpers, and payment-related workflow calls to tolerate service-owned responses.
- Add `tests/contracts/workflow-crud-service/` for save, load, list, template clone, and payment entitlement checks.
- Add e2e coverage in `tests/e2e/workflow-crud-service.spec.ts` for create, edit, save, reload, clone template, and payment-gated action.
- Done when: workflow CRUD user journeys pass at 100% service traffic and no frontend component mutates `workflow.nodes` or `workflow.edges` directly.

**Possible Issues This Week:**
- Payment logic is too coupled to workflow metadata -> keep payment verification read-only in CRUD service and document future Billing Service extraction separately.
- Save/load response fields drift -> enforce contract fixtures before switching each endpoint to 100%.

## WEEK 20 - Phase 4 Buffer: Cross-Service Contract Hardening
Target: 9,000 concurrent users | Cost: $1,100/month
Expected output: all six services have stable contracts, health checks, metrics, and rollback paths before monolith retirement work.

**Dev 1 - Backend/Infrastructure:**
- Review and standardize `services/*/src/health.ts`, `services/*/src/metrics.ts`, `.env.example`, and README files.
- Add cross-service smoke script `scripts/smoke-services.mjs` that checks ports 3002-3007, health, readiness, and one happy-path request per service.
- Update `infra/docker-compose.yml` with service containers for ai-generator, execution-engine, credential-service, notification-service, trigger-service, and workflow-crud-service.
- Fix remaining TypeScript errors across `services/*` and add a tracking file `docs/extraction/week-20-service-debt.md`.
- Done when: `scripts/smoke-services.mjs` passes locally and all services build with zero TypeScript errors.

**Dev 2 - Frontend/Testing:**
- Run the full `docs/qa/extraction-regression-matrix.md` against 100% service traffic in local/staging equivalent.
- Add `tests/e2e/full-service-mode.spec.ts` covering prompt -> generated workflow -> save -> connect credentials -> execute -> receive realtime status.
- Create `docs/qa/week-20-service-parity-report.md` comparing monolith mode and service mode behavior.
- Done when: service mode and monolith mode are functionally equivalent for critical paths and all known differences have owners.

**Possible Issues This Week:**
- Docker compose resource use becomes too high locally -> document minimal service subsets and keep CI using targeted compose profiles.
- Contract tests conflict with implementation reality -> update the contract only when product behavior is intentionally changed and approved.

## WEEK 21 - Phase 4: GDPR Deletion Coordination Across Services
Target: 10,000 concurrent users | Cost: $1,150/month
Expected output: account deletion is coordinated across six services before the monolith is retired.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/architecture/gdpr-deletion-coordination.md` defining deletion ownership for AI Generator, Execution Engine, Credential Service, Notification Service, Trigger Service, Workflow CRUD Service, and any monolith-held tables.
- Add `services/workflow-crud-service/src/routes/account-deletion.ts` as the coordinator endpoint or create `services/account-lifecycle-service/` if the team decides deletion should be separate.
- Add service deletion handlers: `services/credential-service/src/deletion.ts`, `services/execution-engine/src/deletion.ts`, `services/trigger-service/src/deletion.ts`, `services/notification-service/src/deletion.ts`, and `services/ai-generator/src/deletion.ts`.
- Add audit logging and retry state for partial deletion failures in the coordinator storage table migration under `worker/src/migrations/` or `services/workflow-crud-service/src/migrations/`.
- Done when: a test user can be deleted across all services in staging/local equivalent, partial failures are retryable, and deletion audit output proves no credential or workflow data remains.

**Dev 2 - Frontend/Testing:**
- Add account deletion UI/API coverage in the existing settings/account page and helper files under `ctrl_checks/src/lib/api/account.ts`.
- Create `tests/e2e/gdpr-account-deletion.spec.ts` for request deletion, confirmation, logout, and blocked re-access.
- Add QA checklist `docs/qa/week-21-gdpr-deletion-checklist.md` with data locations and verification queries supplied by Dev 1.
- Done when: the UI can initiate deletion, displays clear completion/failure states, and e2e verifies the deleted account cannot access prior data.

**Possible Issues This Week:**
- Services disagree on user id format -> standardize on Cognito subject and add adapter mapping only at service boundaries.
- Deletion cannot be atomic across services -> implement saga-style retries and human-visible audit status instead of pretending one DB transaction spans all services.

## WEEK 22 - Phase 4: Retire Monolith From Production Traffic
Target: 10,000 concurrent users | Cost: $1,200/month
Expected output: `worker/` remains available for emergency rollback but no longer owns production traffic for extracted domains.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/monolith-retirement-runbook.md` with service readiness gates, rollback commands, DNS/proxy changes, and exact success criteria.
- Remove production traffic from monolith routes by setting all service flags to 100% and configuring nginx/API gateway routes to services.
- Keep `worker/` running for health, compatibility shims, and emergency fallback only; do not delete the folder.
- Run `scripts/smoke-services.mjs`, service builds, and worker type-check/build to confirm compatibility.
- Done when: production traffic for AI generation, execution, credentials, notifications, triggers, and workflow CRUD is service-owned for 72 hours with no monolith rollback.

**Dev 2 - Frontend/Testing:**
- Run `tests/e2e/full-service-mode.spec.ts`, GDPR deletion, OAuth top-provider tests, and load smoke tests against production service routing.
- Update user-facing support docs or in-app links affected by new callback URLs.
- Create `docs/qa/week-22-monolith-retirement-signoff.md` with evidence for all critical journeys.
- Done when: QA signs off 72-hour service ownership and all rollback drills have evidence.

**Possible Issues This Week:**
- A low-volume route was missed in `worker/src/index.ts` -> route it explicitly to the owning service and add it to the contract inventory.
- Emergency rollback becomes tempting for minor bugs -> use rollback only for P0/P1 incidents; fix minor service bugs in place.

## WEEK 23 - Pre-Phase 5 Gate: Staging Environment Setup
Target: 12,000 concurrent users | Cost: $1,600/month
Expected output: AWS migrations have a safe staging environment before managed-service production cutovers begin.

**Dev 1 - Backend/Infrastructure:**
- Create `infra/aws/terraform/staging/` with VPC, subnets, security groups, ECS cluster skeleton, staging RDS/Aurora candidate, ElastiCache candidate, MSK candidate, S3 backup bucket, and secrets placeholders.
- Add `docs/ops/staging-environment.md` with environment naming, deploy order, data refresh policy, access controls, and teardown rules.
- Add staging env templates for all services under `services/*/.env.staging.example` and `ctrl_checks/.env.staging.example`.
- Deploy the six services to staging or a minimal ECS equivalent and wire staging DNS/API base URLs.
- Done when: staging can run prompt -> generate -> save -> connect test credential -> execute -> realtime update without touching production data.

**Dev 2 - Frontend/Testing:**
- Add staging configuration support to frontend build scripts and `.env.staging.example`.
- Run full e2e and contract suites against staging and save results under `docs/qa/evidence/week-23/staging/`.
- Create `docs/qa/staging-smoke-checklist.md` for every future AWS migration window.
- Done when: staging frontend talks only to staging APIs and the smoke checklist passes end-to-end.

**Possible Issues This Week:**
- First-time AWS setup takes longer than expected -> deploy minimal staging first, then add managed service parity in the next weeks.
- Staging data risks exposing production PII -> use sanitized seed data and limited test accounts only.

## WEEK 24 - Phase 5: Aurora Rollback Runbook and Rehearsal Before Migration
Target: 15,000 concurrent users | Cost: $1,800/month
Expected output: Aurora migration has a tested rollback decision tree before real data cutover.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/aurora-migration-runbook.md` with backup commands, S3 snapshot location, cutover steps, rollback trigger thresholds, decision owner, rollback commands, expected rollback time, and validation queries.
- Add `infra/aws/terraform/aurora/` for Aurora PostgreSQL Serverless v2 staging resources with 0.5-16 ACU settings.
- Run a staging backup to S3, restore rehearsal, and rollback rehearsal using sanitized data.
- Update `worker/src/core/database/aws-db-client.ts` or shared DB config package to support Aurora endpoints through env only.
- Done when: rollback rehearsal is completed in staging, measured rollback time is documented, and migration cannot start without S3 backup verification.

**Dev 2 - Frontend/Testing:**
- Build migration validation tests in `tests/e2e/data-integrity-after-db-cutover.spec.ts` for login, workflow list, workflow detail, credentials list, trigger list, execution history, and billing entitlement.
- Add QA validation queries and screenshots to `docs/qa/aurora-migration-validation.md`.
- Run frontend and contract suites against staging Aurora endpoint.
- Done when: staging Aurora behaves identically to the current DB for all critical user-visible flows.

**Possible Issues This Week:**
- Restore rehearsal is slower than acceptable -> define partial rollback and read-only maintenance fallback before production migration.
- Aurora connection behavior differs from RDS -> test PgBouncer compatibility and tune connection pool sizes in staging.

## WEEK 25 - Phase 5: ElastiCache and MSK Migration in Staging Then Production
Target: 20,000 concurrent users | Cost: $2,200/month
Expected output: Redis and Kafka move from Docker containers to managed AWS services with rollback.

**Dev 1 - Backend/Infrastructure:**
- Add `infra/aws/terraform/elasticache/` for Redis 7.2, three nodes, subnet group, security groups, parameter group, and alarms.
- Add `infra/aws/terraform/msk/` for three Kafka brokers, Kafka 3.6-compatible settings, topics, security groups, and monitoring.
- Update service env examples and deployment config to use `REDIS_URL` and `KAFKA_BROKERS` from AWS Secrets Manager or Parameter Store.
- Cut over staging first, then production during a weekend-night window with docker Redis/Kafka rollback retained.
- Done when: managed Redis/MSK handle service traffic for 48 hours, Kafka lag and Redis memory are within thresholds, and rollback to docker endpoints is documented and tested in staging.

**Dev 2 - Frontend/Testing:**
- Run realtime, async execution, trigger, and notification e2e tests during staging and production cutovers.
- Add `tests/load/managed-queue-cache.js` focused on async execution status, websocket fanout, and trigger bursts.
- Create `docs/qa/week-25-managed-redis-msk-report.md`.
- Done when: no user-visible realtime or async execution regression appears during managed Redis/MSK production cutover.

**Possible Issues This Week:**
- MSK networking blocks service connections -> verify security group ingress from ECS/service subnets and broker DNS resolution.
- Redis TLS/auth settings break clients -> test each service client in staging and add env-controlled TLS support where needed.

## WEEK 26 - Phase 5: ECS Fargate, CloudFront, WAF, and API Gateway
Target: 30,000 concurrent users | Cost: $3,000/month
Expected output: service containers run on ECS Fargate with CDN, WAF, and gateway controls in front.

**Dev 1 - Backend/Infrastructure:**
- Add `infra/aws/terraform/ecs/` for Fargate task definitions, services, autoscaling policies, ALB target groups, CloudWatch logs, and IAM roles for six services.
- Add `infra/aws/terraform/edge/` for CloudFront, AWS WAF rules, and API gateway/Kong deployment path.
- Create Dockerfiles for missing services under `services/*/Dockerfile` and ensure `worker/Dockerfile` remains usable for rollback.
- Deploy staging ECS first, then production service-by-service with traffic weights and rollback to previous task definitions.
- Done when: all six services run on ECS Fargate in production, autoscaling policies exist, and CloudFront/WAF/gateway health checks pass.

**Dev 2 - Frontend/Testing:**
- Update frontend deployment config for CloudFront origin and API base URL in `ctrl_checks/.env.production.example`.
- Run browser cache, auth redirect, CORS, WAF false-positive, and API gateway route tests.
- Add `tests/e2e/edge-routing.spec.ts` for core app routes and API calls through the production edge path.
- Done when: the frontend works through CloudFront and all critical API calls pass through gateway routing without CORS or auth regressions.

**Possible Issues This Week:**
- WAF blocks legitimate workflow payloads -> start with count mode, inspect matches, then enable blocking rules gradually.
- ECS task memory is underestimated -> scale task memory based on measured service RSS, especially AI and execution services.

## WEEK 27 - Phase 5: Aurora Production Migration
Target: 40,000 concurrent users | Cost: $3,800/month
Expected output: production database runs on Aurora PostgreSQL Serverless v2 with tested rollback and S3 backup.

**Dev 1 - Backend/Infrastructure:**
- Take full production S3 backup before starting; record backup id in `docs/ops/aurora-migration-runbook.md`.
- Execute Aurora production migration during the approved weekend-night low-traffic window.
- Switch service DB env vars to Aurora endpoint through secrets/config only; avoid code changes during cutover.
- Monitor DB errors, connection count, slow queries, CPU/ACU scaling, replication/cutover lag, and user-visible error rate.
- Done when: Aurora serves production for 72 hours, rollback trigger thresholds are not crossed, and validation queries match pre-migration counts.

**Dev 2 - Frontend/Testing:**
- Run `tests/e2e/data-integrity-after-db-cutover.spec.ts` immediately after cutover, after one hour, and next business morning.
- Validate workflow list/detail, credential status, trigger status, execution history, and billing entitlement for test accounts.
- Add `docs/qa/week-27-aurora-production-validation.md` with screenshots, query evidence, and any anomalies.
- Done when: all critical user-visible data checks pass and support has no unresolved DB migration P0/P1 tickets.

**Possible Issues This Week:**
- Error rate crosses rollback threshold -> decision owner triggers rollback exactly as written in the runbook.
- Aurora ACU scaling lags under spikes -> temporarily raise minimum ACU and tune after the incident window.

## WEEK 28 - Phase 5 Buffer: Managed AWS Hardening and Cost Controls
Target: 50,000 concurrent users | Cost: $4,200/month
Expected output: managed AWS stack is stable, observable, and not quietly overspending.

**Dev 1 - Backend/Infrastructure:**
- Add cost alarms and budgets in `infra/aws/terraform/budgets/` for Aurora, MSK, ElastiCache, ECS, CloudFront, and logs.
- Tune autoscaling in `infra/aws/terraform/ecs/` based on Week 26-27 production metrics.
- Add CloudWatch alarms for Aurora ACU saturation, MSK lag, Redis evictions, ECS restarts, 5xx rate, and p95 latency.
- Update `docs/ops/aws-managed-services-runbook.md` with normal ranges, scaling controls, and rollback reminders.
- Done when: all managed services have alarms, budgets, dashboards, and scaling policies reviewed.

**Dev 2 - Frontend/Testing:**
- Run `k6 run tests/load/baseline.js` and `tests/load/managed-queue-cache.js` at 50,000-concurrency target environment scale or equivalent staged ramp.
- Add `docs/qa/week-28-aws-hardening-report.md` with user-visible latency by workflow stage.
- Verify CloudFront cache invalidation and frontend release rollback.
- Done when: 50,000 target readiness is signed off and frontend rollback through CloudFront is rehearsed.

**Possible Issues This Week:**
- AWS bill is higher than expected -> lower nonproduction min capacity, add log retention limits, and reserve high-cost scale only for planned tests.
- Load test cannot safely hit production target -> use staging scale simulation and production off-peak smoke with strict abort thresholds.

## WEEK 29 - Phase 6: Database Index Tuning and Query Profiling
Target: 60,000 concurrent users | Cost: $5,000/month
Expected output: slow dashboard, workflow, credential, trigger, and execution-history queries are indexed and measured.

**Dev 1 - Backend/Infrastructure:**
- Capture slow queries from Aurora Performance Insights and service logs; create `docs/performance/week-29-slow-query-inventory.md`.
- Add migrations under `services/workflow-crud-service/src/migrations/` or the existing migration path for indexes on workflow ownership, execution status, trigger schedule, credential owner/provider, and account deletion audit tables.
- Add query timing instrumentation in DB client helpers used by `services/*`.
- Run index changes first in staging, then production in low-traffic windows.
- Done when: top 10 slow queries improve by at least 50% or have documented reasons they cannot be improved this week.

**Dev 2 - Frontend/Testing:**
- Add frontend timing marks around dashboard load, workflow list, execution history, and connection page in existing telemetry helpers.
- Create `tests/e2e/dashboard-performance.spec.ts` with seeded heavy accounts.
- Compare before/after user-visible timings in `docs/qa/week-29-dashboard-performance.md`.
- Done when: heavy-account dashboard and workflow list load within agreed p95 UX thresholds.

**Possible Issues This Week:**
- Index creation locks hot tables -> use concurrent index creation where supported and schedule during low traffic.
- Frontend still feels slow after DB improvements -> identify overfetching and defer frontend data-shaping work to Week 30.

## WEEK 30 - Phase 6: Redis Caching for Dashboard and Workflow Reads
Target: 70,000 concurrent users | Cost: $5,500/month
Expected output: expensive read paths are cached with safe invalidation.

**Dev 1 - Backend/Infrastructure:**
- Add cache helpers in `services/workflow-crud-service/src/cache/dashboard-cache.ts` and `services/workflow-crud-service/src/cache/workflow-cache.ts`.
- Cache dashboard counts, workflow list summaries, template lists, and execution-history summaries with TTLs and invalidation on save/delete/execute.
- Add Redis metrics for hit rate, miss rate, stale invalidation, payload size, and errors.
- Document cache keys and invalidation in `docs/architecture/redis-cache-strategy.md`.
- Done when: dashboard read DB load drops by at least 40% in staging/load test without stale data surviving beyond documented TTLs.

**Dev 2 - Frontend/Testing:**
- Update TanStack Query cache settings in frontend query hooks for dashboard, workflow list, and templates to align with backend cache TTLs.
- Add tests in `ctrl_checks/src/lib/api/__tests__/dashboard-cache-behavior.test.ts` or nearest existing hook tests.
- Run stale-data QA scenarios after workflow save, delete, execution finish, and account deletion.
- Done when: frontend shows updated data after mutations and benefits from faster repeat reads.

**Possible Issues This Week:**
- Cache invalidation misses edge cases -> add mutation-triggered invalidation events and keep TTL short until confidence improves.
- Cached payloads become too large -> cache summaries, not full workflow graphs, unless a specific full-graph read is proven hot.

## WEEK 31 - Phase 6: Gemini 10-Key Expansion and Ollama Quality Validation
Target: 80,000 concurrent users | Cost: $6,000/month
Expected output: Gemini capacity expands and Ollama fallback is quality-gated before any free-tier rollout.

**Dev 1 - Backend/Infrastructure:**
- Extend `worker/src/services/ai/gemini-key-pool.ts` and AI Generator config to support `GEMINI_API_KEY_1` through `GEMINI_API_KEY_10` with per-key metrics.
- Add `services/ai-generator/src/providers/ollama-provider.ts` behind `OLLAMA_ENABLED=false` and `OLLAMA_MODEL=llama3.1:8b`.
- Create `tests/ai-quality/ollama-workflow-json-eval.ts` with prompts covering Gmail->Slack, webhook->database, schedule->email, form->CRM, and multi-step branching workflows.
- Add `docs/ai/ollama-quality-gate.md` with pass thresholds: valid JSON, registry-valid nodes, valid edges, credential mapping, and execution dry-run compatibility.
- Done when: Gemini key rotation works across 10 keys and Ollama remains disabled unless quality eval passes agreed thresholds.

**Dev 2 - Frontend/Testing:**
- Build QA prompt corpus in `tests/ai-quality/prompts/*.json` from realistic user requests and edge cases.
- Add frontend-visible fallback labeling only if product approves it; otherwise keep fallback behavior invisible and measured.
- Run generated workflows through frontend preview and save flows, saving results in `docs/qa/week-31-ollama-quality-report.md`.
- Done when: Ollama quality report clearly recommends enable, limited beta, or reject; no silent free-tier degradation is allowed.

**Possible Issues This Week:**
- Ollama produces syntactically valid but semantically invalid workflows -> require execution dry-run validation before accepting output.
- Ten Gemini keys create quota/account management overhead -> track per-key error rates and ownership in secrets documentation.

## WEEK 32 - Phase 6 Buffer: AI Fallback Decision and Performance Stabilization
Target: 80,000 concurrent users | Cost: $6,500/month
Expected output: AI fallback and cache/index work are stabilized before adding vector search and broader observability.

**Dev 1 - Backend/Infrastructure:**
- Decide Ollama rollout status in `docs/ai/ollama-quality-gate.md`: disabled, internal-only, limited free-tier beta, or production fallback.
- If enabled, add hard validation in `services/ai-generator/src/validation/workflow-json-validator.ts` using registry schemas before saving or execution.
- Tune Gemini concurrency and AI Generator autoscaling based on Week 31 metrics.
- Close performance debt from Weeks 29-31 in `docs/performance/week-32-stabilization.md`.
- Done when: AI fallback cannot produce unvalidated workflows and performance regressions from Weeks 29-31 are resolved or explicitly deferred.

**Dev 2 - Frontend/Testing:**
- Re-run AI prompt corpus through frontend preview after any validator changes.
- Add regression tests that invalid AI output produces recoverable UI states and does not save broken workflows.
- Update `docs/qa/extraction-regression-matrix.md` with AI fallback scenarios.
- Done when: frontend handles AI validation failures cleanly and no invalid workflow reaches the canvas/save path.

**Possible Issues This Week:**
- Validator rejects valid advanced workflows -> add schema fixtures from the registry package and tune validation, not UI bypasses.
- Free-tier fallback quality is not good enough -> keep Ollama disabled and use cost controls on Gemini instead.

## WEEK 33 - Phase 6: Qdrant Vector Search and OpenTelemetry Foundation
Target: 90,000 concurrent users | Cost: $7,000/month
Expected output: workflow/template search improves and traces connect frontend-visible slowness to service internals.

**Dev 1 - Backend/Infrastructure:**
- Add Qdrant infrastructure under `infra/aws/terraform/qdrant/` or managed vector DB config if chosen.
- Create `services/ai-generator/src/vector/qdrant-client.ts` and `services/workflow-crud-service/src/search/template-vector-search.ts`.
- Add OpenTelemetry instrumentation in `services/*/src/telemetry.ts` and shared service startup code.
- Export traces to the chosen collector and document setup in `docs/observability/opentelemetry.md`.
- Done when: vector search works in staging and traces show request flow across gateway, AI Generator, Workflow CRUD, Execution Engine, Redis, Kafka, and Aurora.

**Dev 2 - Frontend/Testing:**
- Update template/search UI API calls to consume vector-search results without changing established layout patterns.
- Add frontend trace ids or correlation ids to API requests through the existing API client layer.
- Add `tests/e2e/template-vector-search.spec.ts` and trace-verification QA notes in `docs/qa/week-33-tracing-search.md`.
- Done when: users can search templates semantically and support can correlate a frontend action to backend traces.

**Possible Issues This Week:**
- Vector search results are irrelevant -> keep keyword fallback and tune embeddings/corpus before replacing existing search.
- Trace volume is expensive -> sample normal traffic and keep full traces for errors and canaries.

## WEEK 34 - Phase 6: Grafana Dashboards, 1,000 VU Test, and Game Day
Target: 100,000 concurrent users | Cost: $8,000/month
Expected output: the platform has actionable dashboards and survives a controlled failure exercise.

**Dev 1 - Backend/Infrastructure:**
- Add Grafana dashboards under `infra/monitoring/grafana/` for service health, AI latency, execution latency, Kafka lag, Redis, Aurora, ECS, edge errors, and cost.
- Create `docs/ops/game-day-week-34.md` with scenarios: AI Generator down, Redis failover, Kafka broker issue, Aurora failover, ECS task crash, WAF false positive.
- Run 1,000 VU sustained load test using `tests/load/baseline.js`, `tests/load/managed-queue-cache.js`, and service-specific scripts.
- Execute game day in staging first, then one production-safe drill if approved.
- Done when: dashboards show every drill, alerts fire to on-call, and recovery time for each scenario is documented.

**Dev 2 - Frontend/Testing:**
- Monitor user-visible behavior during load and game-day scenarios; record UI failures in `docs/qa/week-34-game-day-user-impact.md`.
- Add e2e cases for degraded AI, delayed execution, realtime reconnect, and temporary read-only messaging if implemented.
- Validate no loading/error text overlaps on mobile and desktop during degraded states.
- Done when: users see clear recoverable states during simulated failures and all critical frontend tests pass after recovery.

**Possible Issues This Week:**
- Load test causes real customer impact -> use staging for high VU and production only with strict abort thresholds.
- Alerts fire but are not actionable -> rewrite alert descriptions to include dashboard link, runbook link, and rollback command.

## WEEK 35 - Phase 7: Multi-Region Architecture and Aurora Global Database
Target: 150,000 concurrent users | Cost: $12,000/month
Expected output: India primary and US East secondary architecture is deployed in staging with clear failover rules.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/architecture/multi-region.md` defining primary/secondary regions, data replication, DNS failover, service deployment, secrets, queues, cache strategy, and user-routing limits.
- Add `infra/aws/terraform/global/` for Aurora Global Database, secondary-region ECS, networking, secrets replication, and Route 53 health checks.
- Deploy multi-region staging with India primary and US East secondary.
- Document what is active-active, active-passive, and explicitly not multi-region yet.
- Done when: staging secondary region can serve read-only or failover traffic according to the architecture document and Aurora replication health is visible.

**Dev 2 - Frontend/Testing:**
- Add region-awareness tests in `tests/e2e/multi-region-routing.spec.ts` for API base URL, auth callback, workflow reads, and graceful failover messaging if exposed.
- Validate CloudFront/Route 53 behavior from multiple geographic test locations if tooling is available.
- Create `docs/qa/week-35-multi-region-validation.md`.
- Done when: frontend remains usable during planned staging failover and auth redirects do not strand users in the wrong region.

**Possible Issues This Week:**
- Kafka/MSK cross-region story is unclear -> keep execution queues regional and document failover limitations instead of claiming active-active.
- OAuth callbacks break in secondary region -> add secondary callback URIs only after provider-console ownership is confirmed.

## WEEK 36 - Phase 7 Buffer: OWASP Security Audit and Remediation Window
Target: 200,000 concurrent users | Cost: $15,000/month
Expected output: high-risk security findings are found and fixed before 1M proof work.

**Dev 1 - Backend/Infrastructure:**
- Run OWASP-focused audit covering auth, JWT verification, OAuth callbacks, credential vault, API gateway, WAF, SSRF risk in workflow nodes, webhook validation, and account deletion.
- Add findings to `docs/security/owasp-audit-week-36.md` with severity, owner, fix PR, and retest evidence.
- Fix backend/security issues in service route validation, auth middleware, secret handling, and infrastructure policies.
- Rotate any exposed or overprivileged secrets found during audit.
- Done when: all critical and high findings are fixed or production-mitigated, with retest evidence.

**Dev 2 - Frontend/Testing:**
- Test frontend auth/session handling, logout, CSRF-adjacent flows, OAuth callback error displays, unsafe link rendering, and stored content rendering.
- Add regression tests for fixed security issues in frontend and e2e suites.
- Validate WAF/security errors display user-safe messages without leaking internals.
- Done when: frontend has no critical/high audit findings open and security regressions are covered by tests.

**Possible Issues This Week:**
- Audit finds architectural credential risk -> mitigate access immediately, then schedule larger redesign after 1M proof if not exploitable.
- Security fixes break integrations -> canary provider-specific changes and use contract tests before broad rollout.

## WEEK 37 - Phase 7: Backup Restoration, DR, and Regional Failover Test
Target: 300,000 concurrent users | Cost: $20,000/month
Expected output: disaster recovery is proven with measured RTO/RPO, not only documented.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/disaster-recovery-runbook.md` with RTO/RPO targets, backup locations, restore steps, failover decision owner, communications, and rollback.
- Run Aurora restore test from S3/snapshots, credentials backup verification, service config restore, and secondary-region failover in staging.
- Add scheduled backup verification jobs under `infra/aws/terraform/backup/` or the chosen AWS backup configuration.
- Record results in `docs/ops/drills/week-37-dr-restore.md`.
- Done when: restore and failover tests meet documented RTO/RPO or gaps are assigned with dates.

**Dev 2 - Frontend/Testing:**
- Run full regression after restore and after regional failover using `tests/e2e/full-service-mode.spec.ts`, GDPR deletion, OAuth top-provider tests, and dashboard performance tests.
- Validate user-facing status and support messaging during maintenance/failover if exposed.
- Add `docs/qa/week-37-dr-user-validation.md`.
- Done when: restored environment passes critical user journeys and no data integrity failures are found.

**Possible Issues This Week:**
- Restore succeeds but derived caches/search indexes are stale -> rebuild Redis/Qdrant derived data after DB restore and document order.
- RTO/RPO misses target -> publish honest limits and improve the slowest restore step before 1M proof.

## WEEK 38 - Phase 7: 2,000 VU Sustained Load Test and 1M Scale Playbook
Target: 600,000 concurrent users | Cost: $35,000/month
Expected output: scale bottlenecks are known and the 1M playbook is executable through a small set of commands.

**Dev 1 - Backend/Infrastructure:**
- Create `docs/ops/scale-to-1m-playbook.md` with five scaling commands or runbook actions for ECS desired counts, Aurora ACU, MSK capacity, ElastiCache capacity, and edge/gateway limits.
- Run 2,000 VU sustained load test in staging or approved production-like environment using `tests/load/scale-2k-vu.js`.
- Tune ECS autoscaling, Aurora min/max ACU, MSK partitions/brokers, Redis memory policy, and gateway limits based on test findings.
- Add final bottleneck report in `docs/performance/week-38-2k-vu-report.md`.
- Done when: 2,000 VU sustained test completes with agreed latency/error thresholds and every scale action has rollback instructions.

**Dev 2 - Frontend/Testing:**
- Monitor browser performance under high-latency backend responses and add e2e coverage for delayed AI/execution states.
- Validate no UI layout breaks under long queue times, failed retries, or delayed realtime events.
- Add `docs/qa/week-38-load-user-impact.md` with screenshots and timing evidence.
- Done when: the frontend remains usable during load-test delay scenarios and support-facing evidence is complete.

**Possible Issues This Week:**
- 2,000 VU test exposes a hard service limit -> document it, scale the bottleneck, and rerun only the failing scenario.
- 1M cost projection becomes too high -> separate always-on baseline cost from emergency scale cost in the playbook.

## WEEK 39 - Phase 7: 1M Proof, Final Runbooks, and Handoff
Target: 1,000,000+ concurrent users with scale commands | Cost: $8,000-$80,000/month depending on active scale
Expected output: CtrlChecks has a verified operating model for 1M+ concurrent-user readiness, with honest limits and runbooks.

**Dev 1 - Backend/Infrastructure:**
- Execute the `docs/ops/scale-to-1m-playbook.md` in staging/production-like environment and record command outputs, timings, cost impact, and rollback proof.
- Finalize runbooks: `docs/ops/on-call-rotation.md`, `docs/ops/aws-managed-services-runbook.md`, `docs/ops/aurora-migration-runbook.md`, `docs/ops/disaster-recovery-runbook.md`, and `docs/ops/monolith-retirement-runbook.md`.
- Produce `docs/performance/final-1m-readiness-report.md` with architecture diagram, service limits, autoscaling settings, database limits, queue limits, cache limits, known risks, and next-quarter recommendations.
- Keep `worker/` available only as documented compatibility/rollback code until a separate deletion plan is approved.
- Done when: the final readiness report is reviewed, rollback proof exists for each major scale action, and no undocumented P0/P1 operational gap remains.

**Dev 2 - Frontend/Testing:**
- Run final e2e suites, AI quality suite, OAuth top-provider suite, GDPR deletion suite, dashboard performance suite, and degraded-state UI checks.
- Produce `docs/qa/final-39-week-signoff.md` with passed suites, known limitations, screenshots/evidence links, and support notes.
- Verify production build, CloudFront rollback, staging parity, and mobile/desktop critical workflows.
- Done when: QA signoff confirms all critical user journeys work under normal, degraded, and scaled conditions.

**Possible Issues This Week:**
- 1M proof is achievable only at high temporary cost -> report both baseline operating cost and burst-to-1M cost honestly.
- Final review finds deferred risks -> classify them by severity and make only P0/P1 items release-blocking.

## 39-Week Summary Table

| Week | Phase | Theme | Target Users | Cost/Month |
|---:|---|---|---:|---:|
| 1 | Phase 1 | Async execution and lazy SDK loading | 150 | $50 |
| 2 | Phase 1 | PgBouncer and Gemini key pool | 300 | $80 |
| 3 | Phase 1 | WebSocket Redis bridge and launch readiness | 500 | $100 |
| 4 | Phase 1 Buffer | Launch hardening and production cutover | 500 | $120 |
| 5 | Phase 2 | Real-user stabilization | 750 | $150 |
| 6 | Phase 2 | Git branching and extraction guardrails | 1,000 | $200 |
| 7 | Phase 2 | Permanent shared registry design | 1,200 | $250 |
| 8 | Phase 2 Buffer | Stabilization gate and on-call setup | 1,200 | $300 |
| 9 | Phase 3 | AI Generator scaffold and registry package | 1,500 | $400 |
| 10 | Phase 3 | AI Generator TypeScript fixes and 33% canary | 2,000 | $450 |
| 11 | Phase 3 | AI Generator 66% to 100% canary | 2,500 | $500 |
| 12 | Phase 3 Buffer | Extraction burn-down and on-call drill | 2,500 | $550 |
| 13 | Phase 3 | Execution Engine scaffold and import fixes | 3,500 | $600 |
| 14 | Phase 3 | Execution Engine canary and load test | 5,000 | $700 |
| 15 | Phase 4 | Credential Service scaffold | 6,000 | $800 |
| 16 | Phase 4 Buffer | OAuth redirects across 57 providers | 6,000 | $850 |
| 17 | Phase 4 | Notification Service extraction | 7,000 | $900 |
| 18 | Phase 4 | Trigger Service extraction | 8,000 | $950 |
| 19 | Phase 4 | Workflow CRUD Service extraction | 9,000 | $1,000 |
| 20 | Phase 4 Buffer | Cross-service contract hardening | 9,000 | $1,100 |
| 21 | Phase 4 | GDPR deletion coordination | 10,000 | $1,150 |
| 22 | Phase 4 | Retire monolith from production traffic | 10,000 | $1,200 |
| 23 | Pre-Phase 5 Gate | Staging environment setup | 12,000 | $1,600 |
| 24 | Phase 5 | Aurora rollback runbook and rehearsal | 15,000 | $1,800 |
| 25 | Phase 5 | ElastiCache and MSK migration | 20,000 | $2,200 |
| 26 | Phase 5 | ECS Fargate, CloudFront, WAF, gateway | 30,000 | $3,000 |
| 27 | Phase 5 | Aurora production migration | 40,000 | $3,800 |
| 28 | Phase 5 Buffer | AWS hardening and cost controls | 50,000 | $4,200 |
| 29 | Phase 6 | Database index tuning | 60,000 | $5,000 |
| 30 | Phase 6 | Redis caching for reads | 70,000 | $5,500 |
| 31 | Phase 6 | Gemini expansion and Ollama validation | 80,000 | $6,000 |
| 32 | Phase 6 Buffer | AI fallback and performance stabilization | 80,000 | $6,500 |
| 33 | Phase 6 | Qdrant and OpenTelemetry | 90,000 | $7,000 |
| 34 | Phase 6 | Grafana, 1,000 VU test, game day | 100,000 | $8,000 |
| 35 | Phase 7 | Multi-region and Aurora Global | 150,000 | $12,000 |
| 36 | Phase 7 Buffer | OWASP audit and remediation | 200,000 | $15,000 |
| 37 | Phase 7 | Backup restoration and DR | 300,000 | $20,000 |
| 38 | Phase 7 | 2,000 VU test and 1M playbook | 600,000 | $35,000 |
| 39 | Phase 7 | 1M proof and handoff | 1,000,000+ | $8,000-$80,000 |
