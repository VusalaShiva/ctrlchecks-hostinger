# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Monorepo Layout

Two independently runnable services:

| Directory | Role | Port |
|---|---|---|
| `ctrl_checks/` | React + Vite SPA (frontend) | 5173 (dev) |
| `worker/` | Node + Express backend (AI engine, execution) | 3001 |

Both must run simultaneously during development. The frontend talks to the worker via `VITE_API_URL`. Auth is handled by **AWS Cognito** (frontend: `aws-amplify`, worker: `aws-jwt-verify`). The database is **AWS RDS PostgreSQL** accessed via `pg.Pool` in the worker.

---

## Commands

### Frontend (`ctrl_checks/`)
```bash
npm run dev          # Vite dev server on :5173
npm run build        # Production build
npm run lint         # ESLint
npm run test:vitest  # Run all Vitest tests
npx vitest run src/path/to/file.test.ts  # Run a single test file
```

### Worker (`worker/`)
```bash
npm run dev          # nodemon + ts-node (runs type-check first; 8GB heap)
npm run build        # tsc + export schemas + copy data files
npm run type-check   # tsc --noEmit (run before committing)
npm test             # Jest with coverage
npm run test:watch   # Jest in watch mode
npx jest src/path/to/file.test.ts        # Run a single test file
npm run test:contracts      # Core contract tests only
npm run test:integration    # End-to-end workflow integration tests
npm run prisma:migrate      # Run DB migrations (dev)
npm run prisma:studio       # Open Prisma Studio
npm run export:schemas      # Regenerate node schema JSON files
```

---

## Environment Setup

**Worker** (`worker/.env`):
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `DATABASE_URL` — AWS RDS PostgreSQL connection string
- `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `COGNITO_DOMAIN`, `COGNITO_ISSUER`
- `COGNITO_ADMIN_CLIENT_ID`, `COGNITO_CLIENT_SECRET`
- `GEMINI_API_KEY` — primary LLM (Google Gemini)
- `REDIS_URL` — caching and rate limiting
- OAuth redirect URIs for each provider (Google, GitHub, LinkedIn, Facebook, Notion, Twitter, etc.)

**Frontend** (`ctrl_checks/.env.local`):
- `VITE_AWS_REGION`, `VITE_COGNITO_USER_POOL_ID`, `VITE_COGNITO_CLIENT_ID`, `VITE_COGNITO_DOMAIN`
- `VITE_API_URL=http://localhost:3001`
- `VITE_PUBLIC_BASE_URL=http://localhost:8080`

---

## Core Architectural Constraint — Single Source of Truth

**The most important rule in this codebase:**

All node behavior (input schema, output schema, credentials, execution logic, default config) is defined **once** in `worker/src/core/registry/unified-node-registry.ts`. This is enforced by `.cursor/rules/permanent-core-architecture.mdc`.

**Never:**
- Add `if (node.type === '...')` or `switch (node.type)` anywhere outside the registry
- Define node output fields or credential requirements inside workflow JSON or in `workflow-builder.ts`
- Add node-specific logic to the execution engine

**Always:**
- Fix node behavior at the registry level so it applies to all existing and future workflows automatically
- Look up node definitions via `unifiedNodeRegistry.get(nodeType)` at runtime
- Add new nodes by registering them in `unified-node-registry.ts`

---

## AI Pipeline (Worker)

The workflow generation flow, triggered by `POST /api/generate-workflow`:

```
User prompt
  → Intent analysis (Gemini)
  → Capability grouper → CapabilityContainer[] (what the wizard shows)
  → User selects nodes in wizard (CapabilityStage UI)
  → Structural prompt generation
  → WorkflowLifecycleManager → WorkflowGenerationPipeline
  → UnifiedGraphOrchestrator (validates DAG, reconciles edges)
  → Workflow JSON (nodes + edges)
```

Key files:
- `worker/src/services/ai/stages/` — individual pipeline stages
- `worker/src/services/ai/workflow-lifecycle-manager.ts` — coordinates generation
- `worker/src/core/orchestration/unified-graph-orchestrator.ts` — single point of all graph mutations (inject/remove nodes, reconcile edges)
- `worker/src/core/execution/dynamic-node-executor.ts` — runtime execution engine
- `worker/src/services/ai/gemini-orchestrator.ts` — central LLM facade

**DAG rules** (enforced by `.cursor/rules/deterministic-workflow-dag-compiler.mdc`):
- Default topology is strictly linear: `Trigger → Action → … → Terminal`
- Branching only when user explicitly requests conditions or multi-path logic
- No orphan nodes, no cycles, no duplicate edges, no uncontrolled fan-out

---

## Workflow Execution

`POST /api/execute-workflow` → `worker/src/api/execute-workflow.ts`:

1. Topological sort of workflow DAG
2. For each node in order: `unifiedNodeRegistry.get(node.type)` → validate inputs → `nodeDef.execute(context)`
3. Outputs of each node are forwarded to downstream nodes via template resolution (`{{$json.field}}`)
4. Branching (if_else, switch) evaluates condition then activates only the matching downstream path

All graph mutations go through `UnifiedGraphOrchestrator` — never mutate `workflow.nodes` or `workflow.edges` directly.

---

## Frontend Architecture

- **State:** Zustand stores in `ctrl_checks/src/stores/` (main: `workflowStore.ts`)
- **Data fetching:** TanStack Query, API helpers in `ctrl_checks/src/lib/api/`
- **Visual editor:** `@xyflow/react` — nodes rendered in `ctrl_checks/src/components/workflow/WorkflowCanvas.tsx`
- **Wizard flow:** `AutonomousAgentWizard.tsx` (8000+ lines) orchestrates the multi-step generate → capability-selection → credentials → configure → build flow. Business logic is split across `ctrl_checks/src/lib/wizard-*.ts` helpers (`wizard-field-utils.ts`, `wizard-credential-view.ts`, `wizard-config-snapshot.ts`, etc.) — keep logic in those files, not inline in the component.
- **Auth client:** `ctrl_checks/src/integrations/aws/client.ts` — exports `awsClient` (AWS Cognito auth + DB proxy); import as `import { awsClient } from '@/integrations/aws/client'`
- **Node catalog (frontend):** `ctrl_checks/src/components/workflow/nodeTypes.ts` — frontend-only metadata (label, icon, config fields); companion files: `nodeUsageGuides.ts`, `nodeLaymanDescriptions.ts`
- **Node catalog (backend):** `unified-node-registry.ts` — authoritative for execution; the two catalogs are separate and must be kept consistent when adding nodes

---

## Credentials & Connections

The `/connections` page (`ctrl_checks/src/pages/ConnectionsPage.tsx`) is where users manage their service credentials. The system supports 57 credential types across OAuth and API-key providers.

- **Frontend components:** `ctrl_checks/src/components/connections/` — `ServicePickerGrid`, `NewConnectionModal`, `OAuthConnectButton`, `CredentialFormRenderer`
- **Backend vault:** `worker/src/core/credentials/credential-vault.ts` — stores and retrieves secrets keyed by `userId + provider`
- **Credential discovery:** During workflow generation, `comprehensive-credential-scanner.ts` scans the generated workflow and identifies which credentials each node requires
- **Injection at runtime:** The execution engine calls `credential-resolver.ts` to inject secrets into node inputs just before `nodeDef.execute()` — credentials are never stored in the workflow JSON itself
- **OAuth flows:** Each provider has a route pair in `worker/src/index.ts` (`/api/oauth/<provider>/authorize` + `/callback`) and a matching callback page under `ctrl_checks/src/pages/auth/<provider>/`

---

## Adding a New Node

1. Register in `worker/src/core/registry/unified-node-registry.ts` with full `inputSchema`, `outputSchema`, `credentialSchema`, `defaultConfig`, and `execute()`
2. Add the node executor in `worker/src/nodes/` (or inline in registry for simple nodes)
3. Add frontend metadata to `ctrl_checks/src/components/workflow/nodeTypes.ts` (`NodeTypeDefinition`)
4. Add a plain-English description to `ctrl_checks/src/components/workflow/nodeLaymanDescriptions.ts`
5. If the node needs OAuth, add the provider route in `worker/src/index.ts` and a callback page under `ctrl_checks/src/pages/auth/`

See `NODE_ADDITION_CHECKLIST.md` and `ADDING_NEW_NODES_GUIDE.md` at the repo root for the full checklist.

---

## Key Real-Time Surfaces

- `GET /ws/chat` — WebSocket for chat-triggered workflows
- `GET /ws/executions` — WebSocket for live execution status streaming to the UI

---

## Database

- **Primary:** AWS RDS PostgreSQL. DB client: `worker/src/core/database/aws-db-client.ts` (canonical entry via `db-client.ts`). Migrations live in `worker/prisma/migrations/`.
- **Cache / rate-limit / queues:** Redis (`REDIS_URL`)
- Run `npm run prisma:migrate` inside `worker/` after pulling new migrations.
- The worker uses `getDbClient()` from `db-client.ts` — backed by `pg.Pool` connecting to AWS RDS. Never expose `DATABASE_URL` or AWS credentials to the frontend.
