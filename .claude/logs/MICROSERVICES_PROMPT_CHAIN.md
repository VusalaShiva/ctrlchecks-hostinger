# Microservices Implementation — Prompt Chain

This file holds the **copy-paste prompts** for each task. After completing a task, paste the **Handoff Card** (from `PRODUCTION_READY_MICROSERVICES_PLAN.md`) back to the prompt generator to receive the next prompt.

**Plan file**: `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md`

---

## How the loop works

```
YOU  →  paste Task N prompt  →  IMPLEMENTER (Codex/Claude/agent)
IMPLEMENTER  →  completes work + Handoff Card  →  YOU
YOU  →  paste Handoff Card + "generate Task N+1 prompt"  →  PROMPT GENERATOR (this chat)
PROMPT GENERATOR  →  gives Task N+1 prompt  →  repeat
```

---

## TASK 1 PROMPT — Foundation Audit & Execution Baseline

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 1: Foundation Audit & Execution Baseline**

You are a senior platform engineer implementing Task 1 of the CtrlChecks production microservices plan. This is NOT feature work — it is a disciplined audit that establishes ground truth before any production changes.

### Read first (mandatory, in order)
1. `c:\Users\user\Desktop\ctrlchecks-ai-workflow-os\.claude\logs\PRODUCTION_READY_MICROSERVICES_PLAN.md` — full task plan
2. `c:\Users\user\Desktop\ctrlchecks-ai-workflow-os\.claude\logs\ANALASISI.txt` — AWS deploy evidence
3. `c:\Users\user\Desktop\ctrlchecks-ai-workflow-os\.claude\logs\PLAN_GAPS_AND_MISSING_ANALYSIS.md` — code vs plan gaps
4. Skim Phase 1–2 of `c:\Users\user\Desktop\ctrlchecks-ai-workflow-os\.claude\logs\CTRLCHECKS_DAY_WISE_IMPLEMENTATION_ROADMAP.md` for items already implemented (async execution, Gemini key pool, WS Redis bridge, ai-generator stage extraction)

### Scope — three repos always
| Repo | Path | Port |
|---|---|---|
| Worker | `worker/` | 3001 |
| AI Generator | `services/ai-generator/` | 3002 |
| Frontend | `ctrl_checks/` | 5173 |

### Architectural rules (non-negotiable)
- `worker/src/core/registry/unified-node-registry.ts` is the single source of node truth
- Never add `if (node.type === '...')` outside the registry
- All workflow edge mutations go through `unified-graph-orchestrator.ts` — never mutate `workflow.edges` directly
- Microservices are extracted incrementally with feature flags — do not rewrite the monolith in Task 1

### International / production standards to apply in your audit
- **Fail-fast**: document whether startup env validation exists (expected: missing → Task 2)
- **Health probes**: document current `/health` behavior vs target `/health/live` + `/health/ready`
- **Twelve-Factor**: config via env, no secrets in repo, `.env.example` completeness
- **SaaS readiness**: note Cognito auth, subscription tiers, rate limits as-is
- **Observability**: note `/metrics`, tracing, Sentry (expected missing)

### Your deliverables

#### A. Local verification (run commands, capture output)
```bash
cd worker && npm run type-check
cd services/ai-generator && npm run type-check
cd ctrl_checks && npm run build
```
Record: pass/fail, error summaries, branch names for each repo.

#### B. Production server audit (SSH if available)
Server: `ubuntu@3.7.115.58`  
PEM: `Guide/Worker/ctrlchecks-backend.pem`

Run and document:
```bash
curl -fsS https://worker.ctrlchecks.ai/health
git -C /opt/ctrlchecks-worker branch -v
git -C /opt/ctrlchecks-worker log --oneline -3
sudo systemctl status ctrlchecks-worker --no-pager
ss -tlnp | grep -E '3001|3002|80|443'
```
Confirm expected gaps: ai-generator on 3002 likely absent, frontend nginx likely absent.

#### C. Create audit artifact
Write `.claude/logs/TASK01_BASELINE_AUDIT.md` containing:
1. **Executive summary** — 5–10 bullets: what works, what is broken, what is already done vs plan
2. **Three-repo matrix** — each repo: branch, builds, tests, deploy status
3. **Production inventory** — systemd units, ports, domains, missing services
4. **Gap analysis** — map each gap to Task 2–12 in the plan
5. **PLAN_GAPS cross-check** — confirm lazy-import issue in `execute-workflow.ts` still present
6. **Day-wise roadmap cross-check** — list Phase 1 items confirmed done (async execution, key pool, etc.)
7. **Task 2 ready list** — prioritized subtasks with estimated risk (no dates)

#### D. Update plan file
In `PRODUCTION_READY_MICROSERVICES_PLAN.md`:
- Check all Task 1 sub-boxes `[x]` that you completed
- Update Progress Tracker: Task 1 → done (or partial with reason)
- Fill **Known Broken Routes** if any found
- Add Session Log entry

### Do NOT do in Task 1
- Do not deploy frontend
- Do not deploy ai-generator
- Do not refactor execute-workflow imports (that is Task 3)
- Do not add env-validator yet (Task 2)
- Do not skip writing the audit file

### Required response format (Handoff Card)

End your session with this exact structure so the next prompt can be generated:

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 1 — Foundation Audit & Execution Baseline
**Branch / commit**: [each repo branch @ hash]
**Repos touched**: docs only | worker | ai-generator | ctrl_checks

### What was implemented
- Created TASK01_BASELINE_AUDIT.md
- Updated PRODUCTION_READY_MICROSERVICES_PLAN.md checkboxes
- [other actions]

### Files created or modified
- `.claude/logs/TASK01_BASELINE_AUDIT.md` — baseline truth document
- `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — progress update

### Verification evidence
- [ ] worker type-check: PASS/FAIL — [summary]
- [ ] ai-generator type-check: PASS/FAIL — [summary]
- [ ] ctrl_checks build: PASS/FAIL — [summary]
- [ ] production health curl: [status summary]
- [ ] SSH audit: [what was checked]

### Environment / secrets changed
- none (audit only)

### Known issues / deferred
- [list]

### Blockers for next task
- [none | list]

### Recommended next task
Task 2 — Critical Production Blockers

### Context the next agent must read
- `.claude/logs/TASK01_BASELINE_AUDIT.md`
- `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` Task 2 section
```

---

## TASK 2 PROMPT — Critical Production Blockers

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 2: Critical Production Blockers**

You are implementing Task 2. Task 1 audit is complete — read the baseline before writing any code.

### Read first (mandatory)
1. `.claude/logs/TASK01_BASELINE_AUDIT.md` — ground truth from Task 1
2. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 2 section (2.1–2.5)
3. `worker/src/index.ts` — env-validator goes **immediately after** `import './core/env-loader'` (line 14), **before** node registry imports
4. `worker/.env.example` — completeness baseline
5. `worker/src/core/env-loader.ts` — understand load order

### Task 1 findings that shape this task
- ✅ Lazy SDK imports already done — **skip Task 3** (marked complete in plan)
- ❌ `env-validator.ts` **missing** — primary deliverable
- ⚠️ `worker/.env.example` incomplete — needs full audit
- ⚠️ Production server rebooted 2026-06-07 — **SSH re-verify first** before any server changes
- ⚠️ Health curl evidence is stale (pre-reboot) — re-run before Task 2.5
- ⚠️ `PGBOUNCER_URL` in db-pool.ts — **defer to Task 9** (do not change db-pool in Task 2)
- Local workspace may not be a git repo — document branch/commit from server if local git unavailable

### Scope
**Primary repo**: `worker/` only  
**Read-only**: `services/ai-generator/`, `ctrl_checks/` (no changes unless `.env.example` patterns needed)  
**Server**: SSH only for 2.4 systemd + 2.5 smoke audit

### Architectural rules
- Validator must run after `env-loader`, before heavy registry init
- Fail fast with a **human-readable list** of missing vars (Twelve-Factor)
- Do not add node-specific logic
- Do not commit secrets; `.env` stays gitignored

---

### Deliverable 2.2 — Startup environment validation (code)

Create `worker/src/core/config/env-validator.ts`:

**Required vars (exit code 1 if any missing or empty):**
- `DATABASE_URL`, `REDIS_URL`, `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `COGNITO_ISSUER`, `AWS_REGION`, `GEMINI_API_KEY`

**Optional vars (warn only, do not exit):**
- `AI_GENERATOR_URL`, `SENTRY_DSN`, `SES_FROM_EMAIL`, `PGBOUNCER_URL`

**Behavior:**
- Export `validateRequiredEnv(): void` — throws or `process.exit(1)` with numbered list of missing keys
- Export `validateRequiredEnvForTest()` returning `{ valid: boolean; missing: string[] }` for unit tests

Wire in `worker/src/index.ts`:
```typescript
import './core/env-loader';
import { validateRequiredEnv } from './core/config/env-validator';
validateRequiredEnv();
// ... existing registry imports
```

Add test: `worker/src/core/config/__tests__/env-validator.test.ts`
- Missing var → lists it
- All required present → passes

Run: `cd worker && npx jest src/core/config/__tests__/env-validator.test.ts --runInBand --silent && npm run type-check`

---

### Deliverable 2.3 — Complete `worker/.env.example`

Audit env usage across `worker/src/` (grep `process.env.`). Add every key with a one-line comment. Must include at minimum:

```
AI_GENERATOR_URL=
AI_GENERATOR_SERVICE_KEY=
SENTRY_DSN=
SES_FROM_EMAIL=
SES_REGION=
PGBOUNCER_URL=
DIRECT_DATABASE_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NODE_ENV=
PORT=
PUBLIC_BASE_URL=
FRONTEND_URL=
# all OAuth client IDs/secrets already partially present — complete the set
```

Group sections: Server, Database, Redis, AWS, Cognito, AI, OAuth, Payments, Monitoring.

---

### Deliverable 2.1 — Git branch hygiene

If local git available:
```bash
cd worker && git fetch origin && git log origin/main --oneline -3
```
Verify deploy scripts in `infrastructure/scripts/` reference `main` not stale branch names.

On server (SSH):
```bash
git -C /opt/ctrlchecks-worker branch -v
git -C /opt/ctrlchecks-worker log --oneline -3
```
Document result in handoff — do not force-push unless broken.

---

### Deliverable 2.4 — Systemd hardening (server SSH)

**First re-verify post-reboot:**
```bash
curl -fsS https://worker.ctrlchecks.ai/health | python3 -m json.tool
sudo systemctl status ctrlchecks-worker --no-pager
sudo systemctl status ctrlchecks-execution-worker --no-pager
```

Then inspect/edit `/etc/systemd/system/ctrlchecks-worker.service`:
- `Restart=always`
- `RestartSec=10`
- `MemoryMax=3G`
- `LimitNOFILE=65536`
- `WatchdogSec=30` (if compatible)

```bash
sudo systemctl daemon-reload
sudo systemctl enable ctrlchecks-worker
sudo systemctl restart ctrlchecks-worker
sleep 10 && curl -fsS http://localhost:3001/health
```

Document final unit file contents (redact secrets) in handoff card.

---

### Deliverable 2.5 — Health / route smoke audit (server)

Test key routes from server localhost (auth may return 401 — that is OK, not 500):

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/metrics
# Add 5–10 critical /api routes from health endpoint list
```

Update `PRODUCTION_READY_MICROSERVICES_PLAN.md` → **Known Broken Routes** table. Fix any P0 route returning 500 if fix is small and safe.

---

### Update plan file when done
- Check Task 2 boxes `[x]` in `PRODUCTION_READY_MICROSERVICES_PLAN.md`
- Progress Tracker: Task 2 → complete
- Session Log entry

### Do NOT do in Task 2
- Do not deploy frontend (Task 4)
- Do not deploy ai-generator (Task 5)
- Do not change `db-pool.ts` for PGBOUNCER_URL (Task 9)
- Do not add Sentry yet (Task 7)
- Do not skip unit test for env-validator

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 2 — Critical Production Blockers
**Branch / commit**: [branch @ hash or "server-only changes"]
**Repos touched**: worker | server systemd | docs

### What was implemented
- env-validator.ts + wired in index.ts
- env-validator unit test
- worker/.env.example completed
- [systemd changes / smoke audit results]

### Files created or modified
- `worker/src/core/config/env-validator.ts`
- `worker/src/core/config/__tests__/env-validator.test.ts`
- `worker/src/index.ts`
- `worker/.env.example`
- `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md`

### Verification evidence
- [ ] env-validator test: PASS
- [ ] worker type-check: PASS
- [ ] post-reboot health curl: [status]
- [ ] systemd hardened: [yes/no + summary]
- [ ] route smoke: [N routes tested, any 500s]

### Environment / secrets changed
- [server systemd only | none]

### Known issues / deferred
- PGBOUNCER_URL → Task 9

### Blockers for next task
- [none | list]

### Recommended next task
Task 4 — Frontend Production Deploy (Task 3 skipped — lazy loading already done)

### Context the next agent must read
- `.claude/logs/TASK01_BASELINE_AUDIT.md` §6 bundle sizes
- Task 4 section in plan
- `ctrl_checks/.env.production.example` (to create)
```

---

## TASK 3 PROMPT — (Skipped — lazy loading verified complete in Task 1)

Proceed to **Task 4** after Task 2 Handoff Card.

## TASK 4 PROMPT — Frontend Production Deploy

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 4: Frontend Production Deploy**

Deploy the React SPA so real users can access it at a production URL with HTTPS.

### Read first (mandatory)
1. `.claude/logs/TASK01_BASELINE_AUDIT.md` — §5 server state, §6 bundle sizes
2. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 4 section (4.1–4.4)
3. `ctrl_checks/env.example` — existing dev env template (note: still has legacy Supabase refs — production template must use **Cognito**)
4. `CLAUDE.md` — frontend env vars and auth (AWS Cognito via `aws-amplify`)
5. `ctrl_checks/src/__tests__/lazyWizard.test.tsx` — wizard lazy-load already done

### Context from prior tasks
- **Worker API**: `https://worker.ctrlchecks.ai` (healthy, commit `ac20aee` on server)
- **Target frontend domain**: `https://app.ctrlchecks.ai` (confirm DNS A-record → `3.7.115.58` before Certbot)
- **Nginx**: already running on ports 80/443 — **no frontend site configured yet**
- **Wizard lazy-load**: ✅ already done — **skip 4.4 lazy-load work**; only verify build
- **Large chunks** (PropertiesPanel, fillMode, attach-inputs > 200KB gzip): defer to **Task 10**
- **env-validator** (Task 2): local only — optional: deploy worker on same session if convenient, but **not required for Task 4**

### Scope
**Primary repo**: `ctrl_checks/`  
**Server SSH**: nginx config, static files, Certbot  
**Scripts**: create `scripts/deploy-frontend.sh` at repo root

### Architectural rules
- Never commit `.env.production` with real secrets — only `.env.production.example`
- OAuth callbacks go to worker first, then redirect to `VITE_PUBLIC_BASE_URL` — both URLs must match production domains
- `VITE_API_URL` must point to `https://worker.ctrlchecks.ai` (not localhost)
- CORS on worker uses `FRONTEND_URL` — ensure server worker `.env` has `FRONTEND_URL=https://app.ctrlchecks.ai` after frontend goes live

---

### Deliverable 4.1 — Production build config

Create `ctrl_checks/.env.production.example` (committed):

```env
VITE_API_URL=https://worker.ctrlchecks.ai
VITE_AWS_REGION=
VITE_COGNITO_USER_POOL_ID=
VITE_COGNITO_CLIENT_ID=
VITE_COGNITO_DOMAIN=
VITE_PUBLIC_BASE_URL=https://app.ctrlchecks.ai
VITE_USE_DIRECT_BACKEND=false
```

Create local `ctrl_checks/.env.production` (gitignored) with real Cognito values from existing `.env.local` / `.env`.

Verify build:
```bash
cd ctrl_checks && npm ci && npm run build
```
Record chunk sizes; confirm `AutonomousAgentWizard` chunk stays under 200KB gzip.

---

### Deliverable 4.2 — Nginx + HTTPS on AWS server

**SSH**: `ubuntu@3.7.115.58`  
**PEM**: `Guide/Worker/ctrlchecks-backend.pem`

**Pre-check DNS:**
```bash
dig +short app.ctrlchecks.ai
# Must resolve to 3.7.115.58 — if not, stop and document DNS blocker in handoff
```

**Deploy static files:**
```bash
sudo mkdir -p /var/www/ctrlchecks-frontend
# rsync dist/ from local (see 4.3)
```

**Create** `/etc/nginx/sites-available/ctrlchecks-frontend`:
```nginx
server {
    listen 80;
    server_name app.ctrlchecks.ai;
    root /var/www/ctrlchecks-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: proxy API through same domain (only if frontend expects it)
    # location /api {
    #     proxy_pass https://worker.ctrlchecks.ai;
    #     proxy_set_header Host worker.ctrlchecks.ai;
    # }
}
```

```bash
sudo ln -sf /etc/nginx/sites-available/ctrlchecks-frontend /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d app.ctrlchecks.ai --non-interactive --agree-tos -m admin@ctrlchecks.ai
# Use interactive certbot if email/agreement flags differ on server
```

**Post-deploy worker CORS** (on server, in `/opt/ctrlchecks-worker/.env`):
- Set `FRONTEND_URL=https://app.ctrlchecks.ai`
- Restart worker if changed: `sudo systemctl restart ctrlchecks-worker`

---

### Deliverable 4.3 — Deploy script

Create `scripts/deploy-frontend.sh` at repo root:

```bash
#!/bin/bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PEM="${DEPLOY_PEM:-$REPO_ROOT/Guide/Worker/ctrlchecks-backend.pem}"
HOST="${DEPLOY_HOST:-ubuntu@3.7.115.58}"
REMOTE_DIR="/var/www/ctrlchecks-frontend"

cd "$REPO_ROOT/ctrl_checks"
npm ci
npm run build

rsync -avz --delete -e "ssh -i \"$PEM\"" dist/ "$HOST:$REMOTE_DIR/"
echo "Frontend deployed to $HOST:$REMOTE_DIR"
```

Make executable; test from local machine.

---

### Deliverable 4.4 — Bundle optimization (verify only)

- **Do not** re-lazy-load wizard — already done in `AIWorkflowBuilder.tsx`
- Run build and confirm wizard chunk < 200KB gzip
- Document oversized chunks for Task 10 in handoff

---

### End-to-end verification (required)

From browser or curl:
1. `https://app.ctrlchecks.ai` loads SPA (200, not 404)
2. Login page renders (Cognito)
3. API call from browser to `https://worker.ctrlchecks.ai` succeeds (no CORS error)
4. One core flow: login → dashboard loads

Document any OAuth redirect URI mismatches — Cognito console may need `https://app.ctrlchecks.ai` callback URLs added.

---

### Update plan when done
- Check Task 4 boxes in `PRODUCTION_READY_MICROSERVICES_PLAN.md`
- Progress Tracker: Task 4 → complete
- Session Log entry

### Do NOT do in Task 4
- Do not deploy ai-generator (Task 5)
- Do not refactor large chunks (Task 10)
- Do not set up CI/CD (Task 8)
- Do not change `unified-node-registry.ts`

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 4 — Frontend Production Deploy
**Branch / commit**: [hash or server-only]
**Repos touched**: ctrl_checks | scripts | nginx/server

### What was implemented
- .env.production.example created
- deploy-frontend.sh created and tested
- nginx site + HTTPS for app.ctrlchecks.ai
- FRONTEND_URL updated on worker (if done)

### Files created or modified
- [list]

### Verification evidence
- [ ] ctrl_checks build: PASS
- [ ] https://app.ctrlchecks.ai loads: PASS/FAIL
- [ ] Cognito login: PASS/FAIL
- [ ] API/CORS from browser: PASS/FAIL
- [ ] certbot HTTPS: PASS/FAIL

### Environment / secrets changed
- [FRONTEND_URL on server, Cognito callback URIs, DNS]

### Known issues / deferred
- [oversized chunks → Task 10]

### Blockers for next task
- [none | DNS not configured | Cognito callbacks]

### Recommended next task
Task 5 — AI Generator Service Deploy & Wire-Up

### Context the next agent must read
- Task 5 section in plan
- services/ai-generator/.env.example
- worker stage clients (AI_GENERATOR_URL)
```

---

## TASK 5 PROMPT — AI Generator Service Deploy & Wire-Up

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 5: AI Generator Service Deploy & Wire-Up**

Deploy `services/ai-generator/` as a separate process on AWS port **3002**. Wire the worker to delegate AI pipeline stages via existing remote-first clients.

### Read first (mandatory)
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 5 (5.1–5.3)
2. `services/ai-generator/src/index.ts` — `/health` public, `/generate/*` protected
3. `services/ai-generator/src/middleware/auth.ts` — worker calls use **`x-service-key`** header (must match `AI_GENERATOR_SERVICE_KEY` on both services)
4. `worker/src/services/ai/stages/intent-stage-client.ts` — remote-first pattern (`AI_GENERATOR_URL` → fetch → null fallback)
5. `services/ai-generator/src/routes/generate.ts` — stage endpoints (`/generate/intent`, `/generate/validation`, etc.)
6. `scripts/deploy-frontend.sh` — mirror this deploy pattern (tar+scp)
7. `services/ai-generator/.env.example`

### Context from prior tasks
- **Server**: `ubuntu@3.7.115.58` · PEM: `Guide/Worker/ctrlchecks-backend.pem`
- **Worker dir**: `/opt/ctrlchecks-worker` · commit `ac20aee` on server
- **Port 3002**: not in use yet (confirmed Task 1)
- **Worker pending local-only changes** (recommended deploy together this task):
  - `env-validator.ts` (Task 2)
  - `cors.ts` app.ctrlchecks.ai origin (Task 4)
- **Frontend DNS/HTTPS**: still pending — does **not** block Task 5
- **Stage clients**: 7 files in `worker/src/services/ai/stages/*-client.ts` — all use `AI_GENERATOR_URL` + optional `x-service-key`

### Scope
**Primary**: `services/ai-generator/` + server systemd + `scripts/deploy-ai-generator.sh`  
**Secondary**: worker server `.env` updates + optional worker code deploy  
**Do not touch**: frontend deploy, registry, execution engine extraction

### Architectural rules
- Worker **always** keeps local fallback when ai-generator unreachable (return `null` from stage clients)
- `AI_GENERATOR_SERVICE_KEY` must be **identical** on worker and ai-generator `.env`
- `WORKER_URL=http://localhost:3001` on ai-generator (catalog fetch from worker)
- Never commit real secrets — copy keys from server worker `.env` to server ai-generator `.env` only
- Do not add node-specific logic outside registry

---

### Deliverable 5.1 — Build & deploy ai-generator to AWS

**Local build verify first:**
```bash
cd services/ai-generator && npm ci && npm run type-check && npm run build
npx jest src/routes/__tests__/generate.test.ts --runInBand --silent
```

**Create** `scripts/deploy-ai-generator.sh` (mirror `deploy-frontend.sh`):
- Build locally
- tar+scp (or rsync) to `/opt/ctrlchecks-ai-generator/` on server
- Exclude `node_modules`, `.git`, `src` (deploy `dist/` + `package.json` + lockfile)
- SSH: `npm ci --omit=dev` on server
- Restart systemd service
- Smoke: `curl -fsS http://localhost:3002/health`

**On server — create app directory & env** `/opt/ctrlchecks-ai-generator/.env`:
```env
PORT=3002
NODE_ENV=production
AWS_REGION=ap-south-1
COGNITO_USER_POOL_ID=<same as worker>
COGNITO_ISSUER=<same as worker>
GEMINI_API_KEY=<same as worker>
GEMINI_API_KEYS=<optional, same as worker if used>
WORKER_URL=http://localhost:3001
AI_GENERATOR_SERVICE_KEY=<generate or copy from worker — MUST MATCH>
REDIS_URL=redis://127.0.0.1:6379
```
Copy values from `/opt/ctrlchecks-worker/.env` — do not invent new keys.

**Create** `/etc/systemd/system/ctrlchecks-ai-generator.service`:
```ini
[Unit]
Description=CtrlChecks AI Generator
After=network.target ctrlchecks-worker.service
Requires=ctrlchecks-worker.service

[Service]
User=ubuntu
WorkingDirectory=/opt/ctrlchecks-ai-generator
EnvironmentFile=/opt/ctrlchecks-ai-generator/.env
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
MemoryMax=2G
LimitNOFILE=65536
StandardOutput=journal
StandardError=journal
SyslogIdentifier=ctrlchecks-ai-generator

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ctrlchecks-ai-generator
sleep 5
curl -fsS http://localhost:3002/health
sudo journalctl -u ctrlchecks-ai-generator -n 30 --no-pager
```

---

### Deliverable 5.2 — Wire worker to ai-generator

**On server** `/opt/ctrlchecks-worker/.env` — add or update:
```env
AI_GENERATOR_URL=http://localhost:3002
AI_GENERATOR_SERVICE_KEY=<same value as ai-generator .env>
```

**Optional but strongly recommended** — deploy pending worker code (env-validator + cors):
- Push/sync worker code including Task 2 + Task 4 changes to server
- Standard worker deploy (same as ANALASISI.txt commands)
- Restart: `sudo systemctl restart ctrlchecks-worker`

**Verify stage delegation (from server localhost):**
```bash
# Health (no auth)
curl -fsS http://localhost:3002/health

# Stage route (service key — should NOT be 401)
curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://localhost:3002/generate/intent \
  -H "Content-Type: application/json" \
  -H "x-service-key: YOUR_SERVICE_KEY" \
  -d '{}'
# Expect 400 (empty prompt) — NOT 401/502
```

**Verify fallback:**
```bash
sudo systemctl stop ctrlchecks-ai-generator
# Trigger AI generation path (curl worker /api/generate-workflow or check logs for "falling back to local")
sudo systemctl start ctrlchecks-ai-generator
```

**End-to-end** (if frontend DNS not ready, test via worker API with auth token):
- Worker logs should show ai-generator calls when `AI_GENERATOR_URL` is set
- Generation completes without error

---

### Deliverable 5.3 — Complete ai-generator `.env.example`

Ensure committed template documents all keys:
- `PORT`, `NODE_ENV`, `GEMINI_API_KEY`, `GEMINI_API_KEYS` (optional)
- `AWS_REGION`, `COGNITO_USER_POOL_ID`, `COGNITO_ISSUER`
- `WORKER_URL`, `AI_GENERATOR_SERVICE_KEY`, `REDIS_URL`

Add one-line comments per key.

---

### Update plan when done
- Check Task 5 boxes in `PRODUCTION_READY_MICROSERVICES_PLAN.md`
- Progress Tracker: Task 5 → complete
- Session Log entry

### Do NOT do in Task 5
- Do not extract execution-engine (Task 11)
- Do not remove worker local AI fallback logic
- Do not expose port 3002 publicly (localhost only — worker proxies internally)
- Do not commit `services/ai-generator/.env` with real keys

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 5 — AI Generator Service Deploy & Wire-Up
**Branch / commit**: [hash or server-only]
**Repos touched**: services/ai-generator | worker | scripts | server systemd

### What was implemented
- deploy-ai-generator.sh created and tested
- ctrlchecks-ai-generator systemd unit on port 3002
- worker AI_GENERATOR_URL + matching service key configured
- [worker code deploy yes/no]

### Files created or modified
- [list]

### Verification evidence
- [ ] ai-generator type-check + build: PASS
- [ ] curl localhost:3002/health: PASS
- [ ] stage route with x-service-key returns 400 not 401: PASS
- [ ] fallback when service stopped: PASS
- [ ] end-to-end generation: PASS/FAIL/DNS-blocked

### Environment / secrets changed
- /opt/ctrlchecks-ai-generator/.env (no values in card)
- worker .env AI_GENERATOR_URL + AI_GENERATOR_SERVICE_KEY

### Known issues / deferred
- [frontend DNS → still Task 4 follow-up]

### Blockers for next task
- [none]

### Recommended next task
Task 6 — Registry & Cross-Repo Contract Parity

### Context the next agent must read
- Task 6 section in plan
- worker registry contract tests
- TASK01_BASELINE_AUDIT.md §8 (23 NODE_TYPES gaps)
```

---

## TASK 6 PROMPT — Registry & Cross-Repo Contract Parity

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 6: Registry & Cross-Repo Contract Parity**

Ensure worker registry, frontend `nodeTypes.ts`, and ai-generator catalog stay aligned. Close known Day 33 gaps.

### Read first (mandatory)
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 6
2. `.claude/logs/TASK01_BASELINE_AUDIT.md` — §8 gaps
3. `ctrl_checks/src/__tests__/registry-metadata-contract.test.ts` — **23 KNOWN_NODE_TYPES_GAPS** list
4. `worker/src/core/registry/__tests__/registry-frontend-parity.test.ts` — allowlist ↔ registry parity
5. `worker/src/core/registry/unified-node-registry.ts` — **single source of truth** (read only unless registry fix needed)
6. `ctrl_checks/src/components/workflow/backendSupportedNodeTypes.ts` — frontend allowlist
7. `ctrl_checks/src/components/workflow/nodeTypes.ts` — copy existing node patterns for new entries
8. `services/ai-generator/src/lib/__tests__/catalog-registry-contract.test.ts`

### Parallel checklist — Task 5 server deploy (if not done yet)
Task 6 is local/test work and can run in parallel. If ai-generator is not live on server yet, finish these first or in parallel:
```bash
# On server: pull worker main-repair, enable systemd unit, create /opt/ctrlchecks-ai-generator/.env
# From local: bash scripts/deploy-ai-generator.sh
# Add AI_GENERATOR_URL + AI_GENERATOR_SERVICE_KEY to worker .env, restart worker
```
Do not block Task 6 on server deploy unless contract tests need live ai-generator (they do not — fixtures only).

### Scope — three repos
| Repo | Work |
|---|---|
| `worker/` | Run contract tests; fix registry if tests fail |
| `ctrl_checks/` | Add NODE_TYPES metadata; update allowlist |
| `services/ai-generator/` | Run catalog contract tests |

### Architectural rules (non-negotiable)
- **Never** add node execution logic in frontend — metadata only (label, icon, config fields, category)
- **Never** add `if (node.type === '...')` outside `unified-node-registry.ts`
- Frontend metadata must match registry **type strings** exactly
- When adding NODE_TYPES entries: copy structure from a similar existing node; keep minimal viable config fields
- Remove types from `KNOWN_NODE_TYPES_GAPS` only **after** NODE_TYPES entry exists

---

### Deliverable 6.1 — Run contract test baseline

Run and capture pass/fail counts:

```bash
# Worker (may take several minutes — runInBand)
cd worker && npm run test:contracts

# Worker parity only (faster)
cd worker && npx jest src/core/registry/__tests__/registry-frontend-parity.test.ts --runInBand --silent

# Worker full registry contract (3367 tests — run only if needed)
cd worker && npx jest src/core/registry/__tests__/unified-node-registry-contract.test.ts --runInBand --silent

# Frontend
cd ctrl_checks && npx vitest run src/__tests__/registry-metadata-contract.test.ts

# AI Generator
cd services/ai-generator && npx jest src/lib/__tests__/catalog-registry-contract.test.ts --runInBand --silent
```

Document in `.claude/logs/TASK06_REGISTRY_BASELINE.md`:
- Pass/fail per suite
- Any **new** failures not in Day 33 notes
- Pre-existing worker `src/core/contracts/` failures — list but do not fix unless blocking

---

### Deliverable 6.2 — Fix 6 registry-only nodes (required)

These exist in `unifiedNodeRegistry` but **not** in `backendSupportedNodeTypes.ts`:
`qdrant`, `cohere`, `huggingface`, `mistral`, `linear`, `trello`

For each:
1. Add to `BACKEND_SUPPORTED_NODE_TYPES` in `backendSupportedNodeTypes.ts`
2. Add NODE_TYPES entry in `nodeTypes.ts` (copy pattern from similar AI/integration nodes)
3. Add plain-English description in `nodeLaymanDescriptions.ts` if that file is used for the type

Re-run:
```bash
cd worker && npx jest src/core/registry/__tests__/registry-frontend-parity.test.ts --runInBand --silent
cd ctrl_checks && npx vitest run src/__tests__/registry-metadata-contract.test.ts
```

---

### Deliverable 6.3 — Reduce the 23 KNOWN_NODE_TYPES_GAPS (batch close)

Current gaps in `registry-metadata-contract.test.ts`:
`api_key_auth`, `cache_get`, `cache_set`, `db`, `delay`, `email`, `execute_workflow`, `instagram_trigger`, `lightricks`, `oauth2_auth`, `outlook`, `parallel`, `queue_consume`, `queue_push`, `retry`, `return`, `sql_server`, `timeout`, `tool`, `try_catch`, `webhook_response`, `whatsapp`, `whatsapp_trigger`

**Priority order** (close these first — highest user impact):
1. `delay`, `email`, `execute_workflow`, `whatsapp`, `whatsapp_trigger`
2. Control flow: `parallel`, `retry`, `return`, `timeout`, `try_catch`
3. Auth/utility: `api_key_auth`, `oauth2_auth`, `cache_get`, `cache_set`, `db`, `queue_*`, `webhook_response`, `tool`, `sql_server`, `outlook`, `instagram_trigger`, `lightricks`

For each closed gap:
- Add NODE_TYPES metadata (minimal fields from registry `inputSchema` / `defaultConfig`)
- Remove from `KNOWN_NODE_TYPES_GAPS` Set in the test file
- Re-run frontend contract test after each batch of 5

**Target**: close **at least 10** of the 23 gaps this task. Document any remaining in handoff.

If a type should stay hidden from UI, document why in `.claude/logs/TASK06_REGISTRY_GAPS.md` and keep in KNOWN_NODE_TYPES_GAPS with updated comment — do not silently skip.

---

### Deliverable 6.4 — Final verification

```bash
cd worker && npm run type-check
cd ctrl_checks && npm run build
cd services/ai-generator && npm run type-check
```

All contract tests listed in 6.1 must pass (except pre-documented worker contracts failures).

Update `PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 6 checkboxes + Progress Tracker.

### Do NOT do in Task 6
- Do not change node `execute()` behavior in registry unless a contract test proves registry is wrong
- Do not refactor entire `nodeTypes.ts`
- Do not remove KNOWN_NODE_TYPES_GAPS entries without adding NODE_TYPES
- Do not run full Jest suite across all repos (RAM risk)

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 6 — Registry & Cross-Repo Contract Parity
**Branch / commit**: [hashes for worker + ctrl_checks + ai-generator]

### What was implemented
- Contract test baseline documented
- 6 registry-only nodes added to allowlist + NODE_TYPES
- [N]/23 KNOWN_NODE_TYPES_GAPS closed

### Files created or modified
- [list]

### Verification evidence
- [ ] worker test:contracts: PASS/FAIL — [summary]
- [ ] registry-frontend-parity: PASS
- [ ] registry-metadata-contract: PASS
- [ ] catalog-registry-contract: PASS
- [ ] type-check + ctrl_checks build: PASS

### Known issues / deferred
- [remaining KNOWN_NODE_TYPES_GAPS count and types]

### Blockers for next task
- [none]

### Recommended next task
Task 7 — Production Hardening (SES, Sentry, tier rate limits, CORS deploy)

### Context the next agent must read
- Task 7 section in plan
- worker/.env.example SES/SENTRY vars
- Task 5 server deploy status (if still pending)
```

---

## TASK 7 PROMPT — Production Hardening

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 7: Production Hardening**

Add email notifications, Sentry error tracking, tier-aware rate limits, tightened CORS, and Kubernetes-style health probes.

### Read first (mandatory)
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 7 (7.1–7.5)
2. `worker/src/services/execution-job-runner.ts` — **primary hook point** for async execution complete/fail (lines ~90–121)
3. `worker/src/api/execute-workflow.ts` — `RUN_FINISHED` / `RUN_FAILED` events (sync path fallback)
4. `worker/src/core/middleware/distributed-rate-limit.ts` — already sets `X-RateLimit-Remaining-*`; extend for tier limits
5. `worker/src/services/subscription-service.ts` — plan names (`Free`, paid tiers)
6. `worker/src/core/middleware/cors.ts` — production allowlist (already has `app.ctrlchecks.ai`)
7. `worker/src/core/middleware/security.ts` — existing `securityHeaders` middleware
8. `worker/src/index.ts` — `/health` handler (~line 333), rate limit configs (`execute-workflow` 40/min, `generate-workflow` ~20/min)
9. `ctrl_checks/src/main.tsx` or `App.tsx` — Sentry init location

### Context from prior tasks
- **Task 6 done**: ctrl_checks `65a24cd` — 11 NODE_TYPES gaps remain (not Task 7 scope)
- **Task 5 server deploy** may still be pending — not blocking Task 7 code
- **Task 4 DNS/HTTPS** may still be pending — Sentry frontend DSN works without DNS
- **Worker deploy backlog**: env-validator, cors, Task 7 changes need deploy (Task 8 or manual)
- `@aws-sdk/client-ses` already in worker dependencies (used by `amazon_ses` node executor)

### Scope
| Repo | Work |
|---|---|
| `worker/` | Email service, Sentry, tier rate limits, CORS tighten, `/health/ready` + `/health/live` |
| `ctrl_checks/` | `@sentry/react` init + error boundary |
| `services/ai-generator/` | Read-only unless adding Sentry there too (optional, not required) |

### Architectural rules
- Email notifications are **platform ops** (SES from env), not per-workflow `amazon_ses` node credentials
- Hook notifications in **one shared place** — prefer `execution-job-runner.ts` + optional thin wrapper called from sync terminal path
- Rate limits: query subscription plan via existing `subscriptionService` — no hardcoded `if (plan === 'Pro')` strings scattered; use plan metadata or a small limits map
- CORS: production must **not** use `*`; remove or gate `https://*.vercel.app` behind `NODE_ENV !== 'production'`
- Sentry: never send secrets; scrub auth headers in `beforeSend`

---

### Deliverable 7.1 — Email notifications (AWS SES)

Create `worker/src/services/notifications/email-service.ts`:

```typescript
// Functions (minimum):
sendExecutionCompleted(params: { userEmail, userName?, workflowName, executionId, durationMs? })
sendExecutionFailed(params: { userEmail, userName?, workflowName, executionId, errorSummary })
sendWelcomeEmail(params: { email, name? })  // optional stub if no trigger yet
```

- Use `@aws-sdk/client-ses` with `SES_REGION` + `SES_FROM_EMAIL` env vars
- Graceful no-op if env vars missing (log warn, do not crash)
- Add unit test with mocked SES client

**Hook points:**
1. `execution-job-runner.ts` — after terminal status persisted, fetch user email from DB (users table or Cognito-linked profile) and send
2. Guard with env flag: `EXECUTION_EMAIL_NOTIFICATIONS=true` (default false in dev)

Add to `worker/.env.example`: `SES_FROM_EMAIL`, `SES_REGION`, `EXECUTION_EMAIL_NOTIFICATIONS`

---

### Deliverable 7.2 — Sentry (worker + frontend)

**Worker:**
```bash
cd worker && npm install @sentry/node
```
- Init in `worker/src/index.ts` **immediately after** `validateRequiredEnv()` / env-loader, before routes
- `Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV, tracesSampleRate: 0.1 })`
- Express error handler integration if not already present
- Add test route `GET /api/debug/sentry-test` — **admin-only or disabled in production** — or use unit test that mocks Sentry.captureException

**Frontend:**
```bash
cd ctrl_checks && npm install @sentry/react
```
- Init in app entry with `VITE_SENTRY_DSN` (add to `.env.production.example`, not committed values)
- Wrap app in `Sentry.ErrorBoundary` or existing error boundary

Update both `.env.example` files with `SENTRY_DSN` / `VITE_SENTRY_DSN`.

---

### Deliverable 7.3 — Tier-aware rate limits

Current limits in `index.ts`:
- `execute-workflow`: 40/min per user
- `generate-workflow`: check actual value (~20/min)

Create `worker/src/core/middleware/tier-rate-limit.ts`:
- Wrap or extend `distributedRateLimit` usage
- Lookup user plan via `subscriptionService.getCurrentSubscription(userId)` (or existing helper on `req.user`)
- Suggested limits map:
  | Plan | execute/min | generate/min |
  |---|---|---|
  | Free | 40 | 20 |
  | Pro / paid | 100 | 50 |
  | Enterprise / admin | 200 | 100 |

Add standard headers on **all** rate-limited responses:
- `X-RateLimit-Limit` (the tier limit applied)
- `X-RateLimit-Remaining` (alias or complement existing `X-RateLimit-Remaining-User`)
- `X-RateLimit-Reset` (optional, seconds)

Add unit test for tier resolution (mock subscription service).

---

### Deliverable 7.4 — CORS & security headers

In `cors.ts` production block:
- Ensure `FRONTEND_URL` from env is primary allowlist source
- Move `https://*.vercel.app` and localhost origins to **development only**
- Keep `https://app.ctrlchecks.ai`, `https://ctrlchecks.ai`, `https://www.ctrlchecks.ai`

Verify `securityHeaders` from `security.ts` is applied in `index.ts`. Add if missing:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- Basic API CSP (no overly restrictive policy that breaks API clients)

Add test or manual verify: request with `Origin: https://evil.example` → no `Access-Control-Allow-Origin`.

---

### Deliverable 7.5 — Health probes

Add to `worker/src/index.ts`:

**`GET /health/live`** — always 200 if process running:
```json
{ "status": "alive", "timestamp": "..." }
```

**`GET /health/ready`** — 200 only if deps OK, else 503:
- DB pool reachable (`getPoolStats()` or simple query)
- Redis ping (if `REDIS_URL` set)
- Gemini key configured (optional warn, not fail)

Keep existing `/health` as comprehensive diagnostics (do not break ANALASISI consumers).

Add tests for ready/live response shapes.

---

### Verification (required)

```bash
cd worker && npx jest src/services/notifications/__tests__/ --runInBand --silent
cd worker && npx jest src/core/middleware/__tests__/tier-rate-limit.test.ts --runInBand --silent  # if created
cd worker && npm run type-check
cd ctrl_checks && npm run build
```

Manual (document in handoff):
- [ ] SES send test (or mocked + documented AWS console setup)
- [ ] Sentry test event received in dashboard
- [ ] CORS blocks wrong origin
- [ ] `/health/ready` returns 503 when Redis down (optional simulation)

Update `PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 7 checkboxes + Session Log.

### Do NOT do in Task 7
- Do not build full notification microservice (Task 11C)
- Do not change node registry
- Do not close remaining 11 NODE_TYPES gaps (optional side task only)
- Do not set up CI/CD (Task 8)

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 7 — Production Hardening
**Branch / commit**: [worker + ctrl_checks hashes]

### What was implemented
- email-service.ts + execution hooks
- Sentry worker + frontend
- tier-rate-limit middleware
- CORS production tighten
- /health/live + /health/ready

### Files created or modified
- [list]

### Verification evidence
- [ ] worker tests: PASS
- [ ] worker type-check: PASS
- [ ] ctrl_checks build: PASS
- [ ] Sentry test event: received yes/no
- [ ] SES test email: sent yes/no/mocked
- [ ] CORS evil origin blocked: yes/no

### Environment / secrets changed
- SES_FROM_EMAIL, SES_REGION, SENTRY_DSN, VITE_SENTRY_DSN, EXECUTION_EMAIL_NOTIFICATIONS (document keys only)

### Known issues / deferred
- [Task 5 server deploy still pending?]
- [Task 4 DNS still pending?]

### Blockers for next task
- [none]

### Recommended next task
Task 8 — CI/CD Pipeline (deploys all pending worker/frontend/ai-generator changes)

### Context the next agent must read
- Task 8 section in plan
- scripts/deploy-*.sh files
- worker on main-repair branch deploy note
```

---

## TASK 8 PROMPT — CI/CD Pipeline

Copy everything below this line into your implementer session:

---

**CtrlChecks Microservices SaaS — Task 8: CI/CD Pipeline**

Automate deploys to AWS EC2 on push to `main`. Replace manual `bash scripts/deploy-*.sh` for routine releases.

### Read first (mandatory)
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 8 (8.1–8.4)
2. `.github/workflows/ci.yml` — existing type-check/build jobs (extend, do not duplicate blindly)
3. `scripts/deploy-frontend.sh` — tar+scp pattern, smoke test
4. `scripts/deploy-ai-generator.sh` — build, tar, remote npm ci, systemd restart
5. `infrastructure/scripts/deploy-worker.sh` — server-side worker deploy reference
6. `.claude/logs/ANALASISI.txt` — canonical worker deploy commands (clickup copy, NODE_OPTIONS)
7. `worker/scripts/ctrlchecks-ai-generator.service` — systemd unit on server

### Context from Task 7 handoff
- **Worker pushed**: `144851f` — includes env-validator, CORS, Sentry, tier limits, health probes, email service
- **Frontend pushed**: `94e4a13` — includes Sentry init
- **Server**: `ubuntu@3.7.115.58` · PEM: `Guide/Worker/ctrlchecks-backend.pem`
- **Server paths**:
  - Worker: `/opt/ctrlchecks-worker` (git repo — confirm branch: `main` or `main-repair`)
  - AI Generator: `/opt/ctrlchecks-ai-generator`
  - Frontend static: `/var/www/ctrlchecks-frontend`
- **Task 5**: ai-generator deployed on :3002 ✅
- **Manual env still on server** (CI does NOT manage `.env` files):
  - `SES_FROM_EMAIL`, `EXECUTION_EMAIL_NOTIFICATIONS`, `SENTRY_DSN`
  - `VITE_SENTRY_DSN` → bake into frontend CI build via GitHub Secret
  - `AI_GENERATOR_URL`, `AI_GENERATOR_SERVICE_KEY`

### Scope
Create/update workflows in **repo root** `.github/workflows/`:
| Workflow | Trigger paths | Deploy target |
|---|---|---|
| `deploy-worker.yml` | `worker/**` | `/opt/ctrlchecks-worker` |
| `deploy-ai-generator.yml` | `services/ai-generator/**` | `/opt/ctrlchecks-ai-generator` |
| `deploy-frontend.yml` | `ctrl_checks/**` | `/var/www/ctrlchecks-frontend` |
| Update `ci.yml` | PR + push | quality gates only (no deploy) |

---

### GitHub Secrets required (document in handoff — do not commit values)

| Secret | Used by |
|---|---|
| `EC2_SSH_KEY` | All deploy workflows (PEM file contents) |
| `EC2_HOST` | Optional override (default `3.7.115.58`) |
| `EC2_USER` | Optional (default `ubuntu`) |
| `VITE_AWS_REGION` | Frontend build |
| `VITE_COGNITO_USER_POOL_ID` | Frontend build |
| `VITE_COGNITO_CLIENT_ID` | Frontend build |
| `VITE_COGNITO_DOMAIN` | Frontend build |
| `VITE_API_URL` | Frontend build (`https://worker.ctrlchecks.ai`) |
| `VITE_PUBLIC_BASE_URL` | Frontend build (`https://app.ctrlchecks.ai`) |
| `VITE_SENTRY_DSN` | Frontend build (Task 7) |

---

### Deliverable 8.1 — deploy-worker.yml

```yaml
on:
  push:
    branches: [main, main-repair]   # match actual deploy branch
    paths: ['worker/**', '.github/workflows/deploy-worker.yml']
  workflow_dispatch: {}
```

**Job steps:**
1. Checkout
2. `cd worker && npm ci && npm run type-check` — **fail deploy if type-check fails**
3. Optional: `npx jest src/core/config/__tests__/env-validator.test.ts --runInBand --silent` (fast smoke)
4. SSH deploy via `appleboy/ssh-action@v1.0.3` or native ssh:

```bash
cd /opt/ctrlchecks-worker
git fetch origin
git checkout main-repair   # OR main — document which branch server tracks
git reset --hard origin/main-repair
git clean -fd
git pull --ff-only origin main-repair
npm ci
NODE_OPTIONS="--max-old-space-size=4096" npm run build
mkdir -p dist/services/clickup && cp src/services/clickup/clickupNode.js dist/services/clickup/clickupNode.js
npx prisma migrate deploy || true   # log but don't block if no migrations
sudo systemctl restart ctrlchecks-worker
sleep 15
curl -fsS http://localhost:3001/health/live
curl -fsS http://localhost:3001/health/ready
curl -fsS https://worker.ctrlchecks.ai/health
```

5. On failure: print `journalctl -u ctrlchecks-worker -n 30`

**Important**: If monorepo root ≠ server git repo, document alternative (rsync `worker/dist` like ai-generator script).

---

### Deliverable 8.2 — deploy-ai-generator.yml

Path filter: `services/ai-generator/**`

Mirror `scripts/deploy-ai-generator.sh` logic in CI:
1. `npm ci && npm run type-check && npm run build`
2. tar dist + package.json + package-lock.json
3. scp to server `/opt/ctrlchecks-ai-generator`
4. remote: `npm ci --omit=dev && sudo systemctl restart ctrlchecks-ai-generator`
5. Verify: `curl -fsS http://localhost:3002/health`

---

### Deliverable 8.3 — deploy-frontend.yml

Path filter: `ctrl_checks/**`

1. `npm ci && npm run lint` — **remove continue-on-error; fail on lint**
2. `npm run build` with all `VITE_*` from secrets (include `VITE_SENTRY_DSN`)
3. rsync or tar+scp `dist/` → `/var/www/ctrlchecks-frontend/`
4. Smoke: `curl -H 'Host: app.ctrlchecks.ai' http://localhost/` → 200

---

### Deliverable 8.4 — PR quality gates (update ci.yml)

Fix existing issues:
- Remove `continue-on-error: true` on frontend lint and type-check
- Add `services/ai-generator` job: `npm ci && npm run type-check && npm test -- --passWithNoTests` (or catalog contract test only)
- PRs to `main` run ci.yml only — **no deploy**
- Deploy workflows run **only on push to main** (not on PR)

Optional: add `concurrency` group per service to cancel in-progress deploys.

---

### Deliverable 8.5 — Documentation

Create `.claude/logs/TASK08_CICD_SETUP.md`:
- List of GitHub Secrets to add (with descriptions)
- Which branch server tracks for worker
- How to trigger manual deploy (`workflow_dispatch`)
- Rollback procedure: `git reset --hard <prev-commit>` on server + restart systemd
- First-time verification checklist after enabling CI

Update `PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 8 checkboxes + Session Log.

### Verification (required)

- [ ] All 3 workflow YAML files valid (no syntax errors)
- [ ] `ci.yml` passes locally equivalent: worker type-check, ctrl_checks build, ai-generator type-check
- [ ] Document dry-run: what happens on push to `worker/**` only
- [ ] **Live test** (if secrets available): `workflow_dispatch` deploy-worker → health curls pass

### Do NOT do in Task 8
- Do not commit PEM key or `.env` files
- Do not overwrite server `.env` from CI
- Do not set up Task 9 PgBouncer (separate task)
- Do not merge worker `main-repair` → `main` unless verified safe

### Required Handoff Card

```markdown
## TASK HANDOFF CARD

**Completed task**: Task 8 — CI/CD Pipeline

### What was implemented
- deploy-worker.yml / deploy-ai-generator.yml / deploy-frontend.yml
- ci.yml quality gate fixes
- TASK08_CICD_SETUP.md

### GitHub Secrets documented
- [list secret names — no values]

### Verification evidence
- [ ] YAML valid
- [ ] ci.yml green on PR test
- [ ] workflow_dispatch deploy-worker: PASS/FAIL/SKIPPED (no secrets)
- [ ] post-deploy health: live + ready + public URL

### Known issues / deferred
- [branch mismatch worker main vs main-repair]
- [Task 7 SES/Sentry env still manual on server]

### Recommended next task
Task 9 — Database & Infrastructure Reliability

### Context the next agent must read
- Task 9 section in plan
- worker/prisma migrations
- PGBOUNCER_URL gap from Task 1
```

---

## TASK 9 PROMPT — Database & Infrastructure Reliability

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 9: Database & Infrastructure Reliability**

See full prompt in plan sections 9.1–9.4. Key work below.

### Read first
- `TASK01_BASELINE_AUDIT.md` — db-pool ignores PGBOUNCER_URL
- `worker/src/core/database/db-pool.ts` · `worker/src/index.ts` `/health/ready`
- `infra/docker-compose.yml` · `deploy-worker.yml` · `worker/.env.example`

### Do

**9.1 PgBouncer** — Update `db-pool.ts` to prefer `PGBOUNCER_URL` else `DATABASE_URL`. SSH audit: is :6432 running on EC2? Document in `TASK09_INFRA_AUDIT.md`. Improve `/health/ready` DB check to real `SELECT 1`.

**9.2 Migrations** — Add `prisma migrate deploy` (via `DIRECT_DATABASE_URL`) to `deploy-worker.yml` + `infrastructure/scripts/deploy-worker.sh` before systemd restart.

**9.3 Redis/Kafka** — Verify Redis reconnect; optional Kafka in `/health/ready`. Create `docs/runbooks/dlq-replay.md`.

**9.4 RDS backups** — Create `scripts/verify-rds-backup.sh` + `docs/runbooks/database-restore.md`. Run or document AWS console verification.

**Verify:** type-check · `/health/ready` · update plan checkboxes · Handoff Card

**Do NOT:** read replicas (Task 12) · registry changes · force PgBouncer if audit says defer

**Next:** Task 10 — Frontend bundle optimization

---

## TASK 10 PROMPT — Frontend Bundle & UX Performance

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 10: Frontend Bundle & UX Performance**

Reduce oversized lazy chunks and verify async execution UX. Primary repo: `ctrl_checks/`.

### Read first
1. `.claude/logs/TASK01_BASELINE_AUDIT.md` — §6 bundle sizes (targets)
2. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 10
3. `ctrl_checks/vite.config.ts` — existing `manualChunks`
4. `ctrl_checks/src/pages/WorkflowBuilder.tsx` — PropertiesPanel already `React.lazy`
5. `ctrl_checks/src/pages/admin/TemplateEditor.tsx` — **sync** PropertiesPanel import (fix)
6. `ctrl_checks/src/components/workflow/debug/DebugPanel.tsx` — **sync** import (fix)
7. `ctrl_checks/src/components/workflow/PropertiesPanel.tsx` — imports `fillMode`, `attach-inputs-payload`
8. `ctrl_checks/src/hooks/useExecutionWebSocket.ts` · `ExecutionConsole.tsx` · `ExecutionStatusBanner.tsx`

### Baseline targets (gzip, from Task 1 audit)

| Chunk | Current gzip | Target |
|---|---|---|
| AutonomousAgentWizard | 71 KB | ✅ already OK |
| PropertiesPanel | 105 KB | ≤ 200 KB (split further if possible) |
| fillMode | 108 KB | ≤ 200 KB or lazy sub-import |
| attach-inputs-payload | 125 KB | ≤ 200 KB or lazy sub-import |
| **Initial route** (entry + vendors) | measure | no regression |

Note: 200 KB gzip is the plan threshold. Goal is **smaller** PropertiesPanel sub-chunks and **no sync pull** of heavy panel into canvas entry.

---

### Deliverable 10.1 — Bundle audit + before/after

```bash
cd ctrl_checks && npm run build 2>&1 | tee /tmp/build.log
# List chunks > 100KB gzip — document in .claude/logs/TASK10_BUNDLE_REPORT.md
```

Record: entry chunk size, react-vendor, workflow-vendor, lazy chunk sizes.

---

### Deliverable 10.2 — Code splitting fixes

**A. Eliminate sync PropertiesPanel imports**
- `TemplateEditor.tsx` → `React.lazy` + `Suspense` (match WorkflowBuilder pattern)
- `DebugPanel.tsx` → lazy load PropertiesPanel or split debug-only panel

**B. Split PropertiesPanel internals**
- Dynamic `import()` for heavy subcomponents only used when panel opens (e.g. ConditionBuilder, FieldOwnershipToggle, attach-inputs helpers)
- Consider `manualChunks` in `vite.config.ts`:
  ```js
  'fillMode-vendor': ['@/lib/fillMode'],
  'attach-inputs': ['@/lib/attach-inputs-payload'],
  ```
  Only if it reduces PropertiesPanel chunk without bloating initial bundle.

**C. Do NOT** lazy-load `nodeTypes.ts` in this task (separate risk) — focus on the three named chunks.

Re-run build; update `TASK10_BUNDLE_REPORT.md` with delta table.

---

### Deliverable 10.3 — Bundle size CI gate

Add `ctrl_checks/scripts/check-bundle-size.mjs` (or shell):
- Parse `dist/assets/*.js` gzip sizes (use `gzip-size` npm devDep or Node zlib)
- Fail if **entry** chunk or **initial preload** chunks exceed thresholds
- Lazy chunks (PropertiesPanel, wizard): warn if > 200 KB gzip, fail if > 300 KB

Wire into `.github/workflows/ci.yml` frontend-build job (after `npm run build`).

---

### Deliverable 10.4 — Realtime / async execution UX

Verify (fix if gaps found):
- `useExecutionWebSocket` — reconnect with backoff, duplicate event dedup
- `ExecutionStatusBanner` — queued/running/success/failed clear; reconnecting state visible
- `ExecutionConsole` — status polling fallback when WS drops

Run existing tests:
```bash
cd ctrl_checks && npx vitest run src/__tests__/executionProgress.test.tsx src/lib/__tests__/executionNotifications.test.ts
```

Document UX checklist in `TASK10_BUNDLE_REPORT.md` § UX.

---

### Verification (required)

```bash
cd ctrl_checks && npm run build && node scripts/check-bundle-size.mjs
cd ctrl_checks && npx vitest run src/__tests__/lazyWizard.test.tsx src/__tests__/executionProgress.test.tsx
```

Update plan Task 10 checkboxes + Session Log.

### Do NOT
- Refactor entire `nodeTypes.ts` (642KB raw — out of scope)
- Change worker/backend
- Break PropertiesPanel integration tests — run `PropertiesPanel.integration.test.tsx` if touched

### Required Handoff Card

```markdown
## TASK HANDOFF CARD — Task 10

### What was implemented
- [bundle splits, CI gate, UX fixes]

### Before/after gzip sizes
| Chunk | Before | After |

### Verification
- [ ] build PASS
- [ ] bundle size gate PASS
- [ ] execution UX tests PASS

### Recommended next task
Task 11 — Incremental Microservice Extraction (execution-engine scaffold)
```

---

## TASK 11 PROMPT — Execution Engine Scaffold (11A Phase 1)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A: Execution Engine Microservice Scaffold**

Create `services/execution-engine/` on port **3003**. Shell only — **do not move** `workflow-executor/` code yet (Phase 2 follows after scaffold is deployed and healthy).

### Read first
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 §11A
2. `services/ai-generator/` — mirror structure (package.json, index.ts, auth, env-loader, deploy pattern)
3. `scripts/deploy-ai-generator.sh` · `worker/scripts/ctrlchecks-ai-generator.service`
4. `worker/src/api/execute-workflow.ts` — contract reference (request/response shape)
5. `worker/src/services/execution-job-runner.ts` — lifecycle to extract later
6. `CTRLCHECKS_DAY_WISE_IMPLEMENTATION_ROADMAP.md` — Day 56–58 pattern (scaffold → move code)

### Context
- ai-generator live on :3002 with remote-first worker clients ✅
- execution-engine **does not exist** yet
- Worker still owns all execution; frontend unchanged
- Monorepo: `https://github.com/servicepathtotechnologies-ops/ctrlchecks-monorepo`
- **Manual from Task 10:** SSH remove `*.vercel.app` from server `ALLOWED_ORIGINS`, restart worker (optional same session)

### Architectural rules
- `EXECUTION_ENGINE_ENABLED=false` by default — worker keeps monolith path
- Registry stays in worker for Phase 1; execution-engine calls worker or shared package later
- No node-specific `if (type === ...)` outside registry
- Feature flag + canary pattern: 0% → 33% → 66% → 100% (Phase 2+)
- Auth: `x-service-key` for worker→service (same pattern as ai-generator)

---

### Deliverable 11A.1 — Service scaffold

Create `services/execution-engine/`:

```
services/execution-engine/
  package.json
  tsconfig.json
  jest.config.js
  .env.example
  src/
    index.ts          # Express, PORT 3003
    env-loader.ts
    middleware/
      request-id.ts
      auth.ts         # x-service-key + Cognito (copy ai-generator pattern)
    routes/
      execute.ts      # POST /execute — stub returns 501 or mock contract shape
    __tests__/
      health.test.ts
```

**Endpoints (Phase 1):**
- `GET /health` → `{ status: 'ok', service: 'execution-engine', port: 3003 }`
- `GET /health/live` · `GET /health/ready` (DB + Redis checks — can stub ready as `{ db: 'skipped', redis: 'skipped' }` until wired)
- `POST /execute` — accept `{ workflowId, executionId, input? }`, return `{ status: 'not_implemented', message: 'Phase 2' }` with **400** on empty body

Verify locally:
```bash
cd services/execution-engine && npm ci && npm run type-check && npm run build && npm test
curl http://localhost:3003/health
```

---

### Deliverable 11A.2 — Worker feature-flag stub

In `worker/` (minimal, no routing yet):
- Add to `worker/.env.example`:
  ```
  EXECUTION_ENGINE_ENABLED=false
  EXECUTION_ENGINE_URL=http://localhost:3003
  EXECUTION_ENGINE_SERVICE_KEY=
  ```
- Create `worker/src/services/execution/execution-engine-client.ts`:
  - `isExecutionEngineEnabled(): boolean`
  - `executeViaEngine(payload): Promise<null>` — returns `null` when disabled or on failure (monolith fallback pattern, same as ai-generator stage clients)
- Add unit test for disabled flag → returns null

**Do not** wire into `execute-workflow.ts` yet — stub only.

---

### Deliverable 11A.3 — Deploy infrastructure

- `scripts/deploy-execution-engine.sh` (mirror ai-generator)
- `worker/scripts/ctrlchecks-execution-engine.service` systemd template (port 3003, After=worker)
- `.github/workflows/deploy-execution-engine.yml`:
  - trigger: `services/execution-engine/**` push to `main` + `workflow_dispatch`
  - type-check → build → tar+scp → systemd restart → `curl localhost:3003/health`

---

### Deliverable 11A.4 — Contract doc

Create `docs/engineering/execution-engine-contract.md`:
- Request/response shape for `POST /execute` (match worker async 202 + status id pattern)
- Status polling endpoint ownership (worker vs engine — document decision)
- Rollback: set `EXECUTION_ENGINE_ENABLED=false`
- Canary steps: 33% / 66% / 100%

---

### Verification
```bash
cd services/execution-engine && npm run type-check && npm test
cd worker && npm run type-check
npx jest worker/src/services/execution/__tests__/execution-engine-client.test.ts --runInBand
```

Update plan — check 11A scaffold boxes (not full code move).

### Do NOT (Phase 1)
- Move `workflow-executor/` or `execute-workflow.ts` logic
- Route production traffic to :3003
- Extract credential/trigger/CRUD services (11B–11E)
- Change frontend

### Required Handoff Card → recommends **Task 11A Phase 2** (code movement) or **Task 11B** if scaffold-only is enough for one session

```markdown
## TASK HANDOFF CARD — Task 11A

**Completed:** execution-engine scaffold, deploy script, worker flag stub, contract doc
**Commit:** [hash]
**Verify:** :3003 health local [ ] server [ ]
**Next:** Task 11A Phase 2 — move execution-job-runner + dynamic executor OR deploy scaffold to EC2 first
```

---

## TASK 11A PHASE 2 PROMPT — Code Movement + 33% Canary

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A Phase 2: Execution Engine Code Movement**

Turn the :3003 scaffold into a real async executor. Keep monolith fallback. **33% canary on staging only** — not 100%.

### Read first
1. `docs/engineering/execution-engine-contract.md` — Phase 2–3 canary spec
2. `worker/src/services/execution-engine-client.ts` — `delegateExecution()`
3. `worker/src/services/execution-job-runner.ts` — lifecycle to move
4. `worker/src/core/execution/dynamic-node-executor.ts` — registry-based execution
5. `worker/src/api/execute-workflow.ts` — async 202 path (grep `getExecutionQueue`, `202`)
6. `services/execution-engine/src/routes/execute.ts` — replace 501 stub
7. `worker/src/api/__tests__/async-execution.test.ts` — contract tests to extend

### Prerequisite — server first deploy (do first if not done)
```bash
./scripts/deploy-execution-engine.sh
# Verify on server:
curl -fsS http://localhost:3003/health/ready
```
Set matching `EXECUTION_ENGINE_SERVICE_KEY` on worker + engine `.env`. Keep `EXECUTION_ENGINE_ENABLED=false` until Phase 2 wiring is tested locally.

---

### Phase 2 scope (this session)

**Goal:** `POST /execute` returns **202 Accepted** and runs (or enqueues) real execution. Worker delegates when flag + canary hash match.

**Strategy (pragmatic monorepo — do not rewrite 21k-line execute-workflow in one PR):**

1. **Move runner, not entire execute-workflow.ts yet**
   - Copy/adapt `execution-job-runner.ts` → `services/execution-engine/src/runner/execution-job-runner.ts`
   - Engine runner calls worker internally via `WORKER_URL` + service key:
     `POST http://localhost:3001/api/internal/execution/run` (create thin internal route on worker if missing)
   - OR share Redis queue: engine enqueues same job shape `ExecutionQueue` consumes (preferred if queue is already decoupled)

2. **Implement POST /execute (202)**
   - Validate `workflowId`, `executionId`, `userId`
   - Start async job (setImmediate / queue enqueue)
   - Return:
     ```json
     { "queued": true, "executionId": "...", "statusUrl": "/api/executions/{id}/status" }
     ```
   - Update `/health/ready` to ping `REDIS_URL` + `DATABASE_URL` if set

3. **Wire worker delegation + 33% canary**
   In async execution path of `execute-workflow.ts` (before monolith enqueue):
   ```typescript
   import { delegateExecution } from '../services/execution-engine-client';

   function shouldUseEngine(executionId: string): boolean {
     if (process.env.EXECUTION_ENGINE_ENABLED !== 'true') return false;
     // 33% canary: stable hash
     let h = 0;
     for (let i = 0; i < executionId.length; i++) h = (h + executionId.charCodeAt(i)) % 3;
     return h === 0;
   }
   ```
   - If `shouldUseEngine` && `delegateExecution()` returns 202 shape → respond **202** to client, skip monolith enqueue
   - Else → existing monolith path (unchanged)

4. **Tests**
   - `execution-engine`: execute route returns 202 with valid body, 400 without
   - `worker`: mock fetch — when enabled + hash match, returns 202 without calling queue
   - `worker`: when disabled or delegate returns null, monolith path unchanged
   - Extend `async-execution.test.ts` or add `execution-engine-delegation.test.ts`

5. **Update contract doc** — mark Phase 2 complete, document internal route or queue choice

6. **Deploy** — push to monorepo; run `deploy-execution-engine.yml` + `deploy-worker.yml`

### Staging canary activation (after tests pass)
```bash
# worker .env on server ONLY after soak test:
EXECUTION_ENGINE_ENABLED=true
# watch logs 24h:
sudo journalctl -u ctrlchecks-execution-engine -f
sudo journalctl -u ctrlchecks-worker -f | grep execution-engine
```
Rollback: `EXECUTION_ENGINE_ENABLED=false` + restart worker (no redeploy).

---

### Do NOT (Phase 2)
- Move full `execute-workflow.ts` into engine (Phase 3+)
- 100% traffic cutover or remove monolith fallback
- Extract credential/trigger/CRUD services (11B–11E)
- Change frontend API URLs

### Verification
```bash
cd services/execution-engine && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/api/__tests__/async-execution.test.ts src/services/__tests__/execution-engine-client.test.ts --runInBand
```

### Handoff Card → next: **11A Phase 3** (66% canary) or **11B** credential service scaffold

---

## TASK 11A PHASE 3 PROMPT — Executor Code Movement

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A Phase 3: Move Job Runner Into Execution Engine**

Phase 2 enqueues to shared Redis; **worker's** `ExecutionQueue` still runs the job. Phase 3 makes the **engine consume and execute** its own jobs. Keep **33% canary** — 66% is Phase 4.

### Read first
1. `docs/engineering/execution-engine-contract.md` — Phase 3 vs Phase 4
2. `services/execution-engine/src/routes/execute.ts` — current enqueue logic
3. `services/execution-engine/src/lib/redis.ts` · `db.ts`
4. `worker/src/services/execution-job-runner.ts` — full lifecycle to move
5. `worker/src/core/execution/dynamic-node-executor.ts` — registry execution
6. `worker/src/services/execution-queue.ts` — queue key schema (`workflow:execution:queue`)
7. `worker/src/workers/executionQueueWorker.ts` — avoid double-processing

### Prerequisite
- Phase 2 deployed on staging with `EXECUTION_ENGINE_ENABLED=true`
- 24h soak: compare success rate for canary vs monolith (document in `.claude/logs/TASK11A_PHASE3_SOAK.md`)
- Rollback ready: `EXECUTION_ENGINE_ENABLED=false`

---

### Deliverable 3.1 — Job ownership flag

Add job metadata when engine enqueues:
```json
{ "source": "execution-engine", "executionId", "workflowId", "userId", ... }
```

Update worker queue consumer to **skip** jobs where `source === 'execution-engine'` (engine owns them).

---

### Deliverable 3.2 — Move runner into engine

Create in `services/execution-engine/src/`:
- `runner/execution-job-runner.ts` — adapt from worker (import paths fixed)
- `runner/queue-consumer.ts` — poll same Redis keys, process only `source=execution-engine` jobs
- Wire `dynamic-node-executor` via worker import path OR copy minimal executor wrapper

**Monorepo approach (preferred):**
- Add `execution-engine` dependency on worker internals via TypeScript path alias **only if** build stays clean — otherwise copy runner + call worker HTTP internal route as interim:
  `POST localhost:3001/api/internal/run-execution` (thin, auth via service key)

Document chosen approach in contract doc.

Start consumer on engine boot (`index.ts`) when `EXECUTION_ENGINE_CONSUMER_ENABLED=true`.

---

### Deliverable 3.3 — Propagate userId

Fix canary path in `execute-workflow.ts` to pass authenticated `userId` to `delegateExecution()` (was optional in Phase 2).

Add test: delegation payload includes userId from JWT.

---

### Deliverable 3.4 — Observability

Structured logs on engine:
- `[execution-engine] job accepted executionId=... jobId=...`
- `[execution-engine] job completed|failed durationMs=...`

Optional: Prometheus counter `/metrics` on engine (simple request count — defer full Task 12).

---

### Deliverable 3.5 — Tests

```bash
cd services/execution-engine && npm test
cd worker && npx jest src/services/__tests__/execution-engine-client.test.ts src/api/__tests__/async-execution.test.ts --runInBand
```

New tests:
- Worker skips engine-sourced queue jobs
- Engine consumer processes mock job end-to-end (mock executor)
- userId present in delegate payload

Update contract doc — Phase 3 ✅, Phase 4 = 66% canary next.

---

### Deploy
```bash
./scripts/deploy-execution-engine.sh
# deploy-worker.yml if worker consumer skip logic changed
```

### Do NOT
- Change canary % yet (still 33% — Phase 4)
- 100% cutover or remove monolith fallback
- Start 11B credential service in same PR (separate session)

### Handoff Card → **Phase 4: 66% canary** or **11B: Credential Service scaffold**

---

## TASK 11A PHASE 4 PROMPT — 66% Canary + Soak

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A Phase 4: 66% Canary Rollout**

Increase engine traffic from **33% → 66%**. No architecture changes — canary logic + monitoring + soak doc only.

### Read first
1. `docs/engineering/execution-engine-contract.md` — Phase 4–5
2. `worker/src/services/execution-engine-client.ts` — `isCanaryTarget()`, `fnv1a()`
3. `worker/src/services/__tests__/execution-engine-client.test.ts` — update ratio tests
4. `.claude/logs/TASK11A_PHASE3_SOAK.md` — create if missing (33% baseline metrics)

### Prerequisite (server)
Phase 3 activation complete:
```bash
# Both .env files:
WORKER_INTERNAL_KEY=<same value>
EXECUTION_ENGINE_SERVICE_KEY=<same value>
# Worker:
EXECUTION_ENGINE_ENABLED=true
# Engine:
EXECUTION_ENGINE_CONSUMER_ENABLED=true
REDIS_URL=redis://127.0.0.1:6379
DATABASE_URL=<same as worker>
```
Verify: `curl localhost:3003/health/ready` · `journalctl -u ctrlchecks-execution-engine -f`

---

### Deliverable 4.1 — Change canary ratio to 66%

Update `isCanaryTarget()` in `execution-engine-client.ts`:

**Option A (contract doc):** route **2-in-3** to engine:
```typescript
return fnv1a(executionId) % 3 !== 0;  // ~66% to engine
```

**Option B (env-driven, recommended):** add `EXECUTION_ENGINE_CANARY_PERCENT=33|66|100`:
```typescript
const pct = Number(process.env.EXECUTION_ENGINE_CANARY_PERCENT ?? '33');
const bucket = fnv1a(executionId) % 100;
return bucket < pct;
```

Document in `.env.example` and contract doc. Default stays `33` until server env updated.

---

### Deliverable 4.2 — Update tests

- Fix distribution test: over 10k IDs, expect **55–75%** true when set to 66
- Keep deterministic tests for known executionIds
- Add test: `CANARY_PERCENT=100` → all IDs true (prep for Phase 5)

---

### Deliverable 4.3 — Soak monitoring doc

Create `.claude/logs/TASK11A_PHASE4_SOAK.md`:
- Metrics to watch 48h: execution success rate, P95 latency, engine error rate, WS event delivery, DLQ depth
- Log grep commands:
  ```bash
  journalctl -u ctrlchecks-worker | grep "Canary:"
  journalctl -u ctrlchecks-execution-engine | grep "job completed\|job failed"
  ```
- Rollback procedure (instant): `EXECUTION_ENGINE_ENABLED=false` OR `CANARY_PERCENT=33`

---

### Deliverable 4.4 — Deploy

1. Push code (canary percent env-driven)
2. `deploy-worker.yml` + `deploy-execution-engine.yml`
3. On server after deploy:
   ```bash
   # worker .env:
   EXECUTION_ENGINE_CANARY_PERCENT=66
   sudo systemctl restart ctrlchecks-worker
   ```
4. Do **not** change engine consumer flag

---

### Verification
```bash
cd worker && npm run type-check
cd worker && npx jest src/services/__tests__/execution-engine-client.test.ts --runInBand
cd services/execution-engine && npm run type-check && npm test
```

Manual: trigger 10 executions, confirm ~6–7 hit engine logs (`Canary: delegated`).

### Do NOT
- Remove monolith fallback (Phase 5)
- 100% cutover yet
- Start 11B in same PR

### Handoff Card → **Phase 5: 100% cutover** or **11B Credential Service**

---

## TASK 11A PHASE 5 PROMPT — 100% Cutover + Remove Monolith Fallback

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A Phase 5: 100% Cutover**

Two steps: **(A) ops activation** after 66% soak passes, then **(B) code simplification** removing canary hash + monolith async fallback.

### Read first
1. `docs/engineering/execution-engine-contract.md` — Phase 5–6
2. `.claude/logs/TASK11A_PHASE4_SOAK.md` — gate: ≤0.1% failed/accepted
3. `worker/src/api/execute-workflow.ts` — canary block ~18475–18520
4. `worker/src/services/execution-engine-client.ts` — `delegateExecution`, `isCanaryTarget`
5. `worker/src/api/__tests__/async-execution.test.ts`

### Prerequisite — 66% soak gate
Do **not** start Phase 5 until `TASK11A_PHASE4_SOAK.md` gate is PASS (48h, ≤0.1% engine failures).

---

### Step A — Ops: 100% traffic (no code deploy)

```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=100/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

Monitor 1 week. Create `.claude/logs/TASK11A_PHASE5_SOAK.md` (same metrics as Phase 4).

Rollback: `EXECUTION_ENGINE_CANARY_PERCENT=66` or `EXECUTION_ENGINE_ENABLED=false`

---

### Step B — Code: engine-first async path (after 1-week soak PASS)

**Replace canary block** in `execute-workflow.ts` with:

```typescript
if (shouldUseQueue && process.env.EXECUTION_ENGINE_ENABLED === 'true') {
  const engineResult = await delegateExecution({ workflowId, executionId, input, userId, metadata });
  if (engineResult) {
    return res.status(202).json({ status: 'queued', ... });
  }
  // Phase 5: NO monolith fallback — return 503
  return res.status(503).json({
    error: 'Execution engine unavailable',
    code: 'EXECUTION_ENGINE_UNAVAILABLE',
    executionId,
  });
}
```

**Remove or deprecate:**
- `isCanaryTarget()` — keep function for tests but unused in production path, OR remove + migrate tests
- `EXECUTION_ENGINE_CANARY_PERCENT` — document as deprecated; rollback uses `EXECUTION_ENGINE_ENABLED=false` only
- Duplicate JWT userId extraction — single helper `extractUserIdFromRequest(req)`

**Keep for rollback (do not delete):**
- `EXECUTION_ENGINE_ENABLED=false` → existing monolith queue path unchanged
- `internal-engine-execute.ts` route (engine still calls worker)

**Tests:**
- When `ENABLED=true` + delegate succeeds → 202, queue NOT called
- When `ENABLED=true` + delegate null → 503, queue NOT called
- When `ENABLED=false` → existing async-execution tests unchanged
- Remove/update canary-percent distribution tests → move to deprecated section or delete

Update contract doc v0.5 — Phase 5 ✅, Phase 6 = move executor into engine (remove internal HTTP route).

---

### Deploy
```bash
# After code merge:
deploy-worker.yml + deploy-execution-engine.yml
# Server already at CANARY_PERCENT=100; after code deploy, CANARY_PERCENT env is ignored
```

### Verification
```bash
cd worker && npm run type-check
cd worker && npx jest src/api/__tests__/async-execution.test.ts src/services/__tests__/execution-engine-client.test.ts --runInBand
```

Manual: 10 executions with `ENABLED=true` → all show engine logs, zero monolith queue enqueue.

### Do NOT (Phase 5)
- Remove `POST /api/internal/engine-execute` (Phase 6)
- Start 11C–11E
- Delete rollback flag `EXECUTION_ENGINE_ENABLED`

### Handoff Card → **Phase 6** (executor in engine) · **11B** (credential service) · **Task 12**

---

## TASK 11A PHASE 6 PROMPT — Executor In Engine (Remove Internal Route)

> After Phase 5 soak, ask: *"Generate Phase 6 prompt."*

Move `dynamic-node-executor` execution into engine; delete internal HTTP hop.

---

## TASK 11B PROMPT — Credential Service Scaffold (:3004)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11B: Credential Service Scaffold (Phase 1)**

Create `services/credential-service/` on port **3004**. Shell + contract only — **do not move OAuth handlers or vault yet**. Safe to run **in parallel** with Phase 5 7-day soak.

### Read first
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 §11B
2. `services/execution-engine/` + `services/ai-generator/` — scaffold pattern
3. `worker/src/services/credential-vault.ts` — vault to extract in Phase 2
4. `worker/src/api/credential-connections.ts` — CRUD routes to mirror later
5. `worker/src/index.ts` — OAuth route inventory (google, github, notion, etc.)
6. `scripts/deploy-execution-engine.sh` · `.github/workflows/deploy-execution-engine.yml`

### Context
- Execution engine Phase 5: **Step B code waits for 7-day soak** before merge/deploy
- Server now: `EXECUTION_ENGINE_CANARY_PERCENT=100` (Step A ops)
- Credential service is **independent** — no impact on execution canary

### Architectural rules
- `CREDENTIAL_SERVICE_ENABLED=false` default on worker
- Vault encryption keys stay server-side only — never commit
- OAuth callbacks remain on worker until Phase 11B-2 migration
- Auth: Cognito JWT for user routes + `x-service-key` for worker internal calls

---

### Deliverable 11B.1 — Service scaffold

Create `services/credential-service/`:

```
src/
  index.ts              # Express :3004, bind 127.0.0.1
  env-loader.ts
  middleware/auth.ts    # Cognito + service key (copy execution-engine pattern)
  middleware/request-id.ts
  routes/
    health.ts           # /health/live, /health/ready, /health
    connections.ts      # stub CRUD — 501 with contract shape
  __tests__/health.test.ts, auth.test.ts, connections.test.ts
```

**Stub routes (protected):**
- `GET /connections` → 501 `CREDENTIAL_SERVICE_STUB`
- `POST /connections` → 501
- `GET /health/ready` → 200 (scaffold; DB check Phase 2)

---

### Deliverable 11B.2 — Worker client stub

Create `worker/src/services/credential-service-client.ts`:
- `isCredentialServiceEnabled(): boolean`
- `listConnectionsRemote(userId): Promise<null>` — returns null when disabled
- Same fallback pattern as `execution-engine-client.ts`

Add to `worker/.env.example`:
```bash
CREDENTIAL_SERVICE_ENABLED=false
CREDENTIAL_SERVICE_URL=http://localhost:3004
CREDENTIAL_SERVICE_KEY=
```

Unit tests: disabled → null, no fetch.

**Do not wire** into `credential-connections.ts` yet.

---

### Deliverable 11B.3 — Deploy artifacts

- `scripts/deploy-credential-service.sh`
- `scripts/ctrlchecks-credential-service.service` (systemd, port 3004, MemoryMax=1G)
- `.github/workflows/deploy-credential-service.yml` — paths: `services/credential-service/**`

---

### Deliverable 11B.4 — Contract doc

Create `docs/engineering/credential-service-contract.md`:
- Endpoints (connections CRUD, OAuth start/callback — future)
- Feature flags + rollback
- Migration phases: 11B-1 scaffold → 11B-2 vault move → 11B-3 OAuth providers (top 10 first)
- Redirect URI inventory pointer (57 providers from day-wise roadmap)

---

### Verification
```bash
cd services/credential-service && npm ci && npm run type-check && npm test
cd worker && npm run type-check
curl http://localhost:3004/health/live
```

Update plan — 11B scaffold checkboxes.

### Do NOT
- Move `credential-vault.ts` or OAuth handlers
- Change OAuth redirect URIs in provider consoles
- Deploy to production with `CREDENTIAL_SERVICE_ENABLED=true`
- Merge Phase 5 Step B code (separate gate)

### Handoff Card → **11B Phase 2** (vault migration) · **Phase 6** (executor in engine) · **Task 12**

---

## PHASE 5 DEPLOY REMINDER (ops — not 11B scope)

After **7-day soak PASS** from `TASK11A_PHASE5_SOAK.md`:
1. Merge Step B code (engine-first, 503 on failure)
2. `deploy-worker.yml`
3. Remove need for `EXECUTION_ENGINE_CANARY_PERCENT` (deprecated)
4. Rollback remains: `EXECUTION_ENGINE_ENABLED=false`

---

## TASK 11B PHASE 2 PROMPT — Vault Move + Real Connections API

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11B Phase 2: Move Credential Vault Into Service**

Implement real `GET/POST/DELETE /connections` on :3004. Worker delegates when `CREDENTIAL_SERVICE_ENABLED=true` with **50% canary** (optional env). OAuth stays on worker (Phase 3).

### Read first
1. `docs/engineering/credential-service-contract.md` — Phase 2 section
2. `worker/src/services/credential-vault.ts` — AES-256-GCM vault (move/adapt)
3. `worker/src/credentials-system/connection-service.ts` — list/create used by `credential-connections.ts`
4. `worker/src/api/credential-connections.ts` — handlers to proxy/delegate
5. `worker/src/services/credential-service-client.ts` — uncomment Phase 2 fetch
6. `services/credential-service/src/routes/connections.ts` — replace 501 stubs

### Parallel gates (do not block 11B-2)
- **11A Phase 5 Step B deploy** — separate; can proceed after 7-day soak independently
- **Task 12** — can run in parallel if team split

---

### Deliverable 11B-2.1 — Vault in credential-service

Copy/adapt into `services/credential-service/src/`:
- `vault/credential-vault.ts` (from worker, fix import paths)
- `lib/db.ts` — reuse pattern from execution-engine (pg Pool)
- Env (`.env.example`):
  ```
  DATABASE_URL=
  CREDENTIAL_ENCRYPTION_KEY=   # same as worker — must match for existing rows
  COGNITO_USER_POOL_ID=
  COGNITO_CLIENT_ID=
  COGNITO_ISSUER=
  COGNITO_AUTH_ENABLED=false   # true when JWT verify ready
  CREDENTIAL_SERVICE_KEY=
  ```

`/health/ready` — add DB `SELECT 1` check.

**Critical:** Use **same encryption key** as worker or existing credentials decrypt as garbage.

---

### Deliverable 11B-2.2 — Real connection routes

Implement in `connections.ts`:
- `GET /connections` — list for user (`x-user-id` header from worker OR JWT `sub`)
- `POST /connections` — store credential (metadata only in response, never secrets)
- `GET /connections/:provider` — single connection
- `DELETE /connections/:provider` — remove

Enable Cognito JWT verify when `COGNITO_AUTH_ENABLED=true` (copy execution-engine/ai-generator auth pattern).

Unit tests with mocked vault — no real secrets in test output.

---

### Deliverable 11B-2.3 — Worker delegation + 50% canary

Update `credential-service-client.ts`:
- Implement `listConnectionsRemote(userId)` — real fetch
- Add `CREDENTIAL_SERVICE_CANARY_PERCENT` (default 0) — same FNV pattern as execution engine
- Add `shouldUseCredentialService(userId): boolean`

Update `listConnectionsHandler` in `credential-connections.ts`:
```typescript
if (shouldUseCredentialService(userId)) {
  const remote = await listConnectionsRemote(userId);
  if (remote) return res.json({ connections: remote, source: 'credential-service' });
}
// existing connectionService.listConnections fallback
```

Add tests: disabled → local path; enabled + canary hit → remote; enabled + miss → local.

Deploy with **`CREDENTIAL_SERVICE_ENABLED=true`** + **`CANARY_PERCENT=50`** on staging only after vault tests pass.

---

### Deliverable 11B-2.4 — Deploy + contract

- `./scripts/deploy-credential-service.sh`
- Server `.env`: `DATABASE_URL`, `CREDENTIAL_ENCRYPTION_KEY`, `CREDENTIAL_SERVICE_KEY`
- Update contract doc v0.2 — Phase 2 ✅, Phase 3 OAuth next

### Verification
```bash
cd services/credential-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/__tests__/credential-service-client.test.ts --runInBand
```

Manual: create connection via UI → list shows same data whether local or remote path.

### Do NOT
- Move OAuth authorize/callback routes (11B-3)
- Change provider redirect URIs
- 100% cutover without 50% soak
- Rotate encryption key without migration plan

### Handoff Card → **11B Phase 3 (OAuth top 10)** · **Phase 6** · **Task 12**

---

## TASK 11B PHASE 3 PROMPT — OAuth Migration (Top 10)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11B Phase 3: OAuth Top 10 via Worker Proxy**

Move OAuth **start + callback** logic for the top 10 providers into credential-service (`:3004`). **Keep external redirect URIs on worker** — service is `127.0.0.1` only; worker proxies unchanged public URLs.

### Prerequisite gate (ops)
- Phase 2 at **`CREDENTIAL_SERVICE_CANARY_PERCENT=100`** for **1 week** with zero decrypt/list regressions
- Rollback tested: `CREDENTIAL_SERVICE_ENABLED=false` restores worker vault list

### Read first
1. `docs/engineering/credential-service-contract.md` — Phase 3 section (clean duplicate Phase 3 bullets → v0.3)
2. `worker/src/credentials-system/oauth-service.ts` — generic OAuth engine (PKCE, state table)
3. `worker/src/services/oauth-callback-handler.ts` — token exchange + connection persist
4. `worker/src/credentials-system/credential-type-registry.ts` — `getRedirectUri()`, provider defs
5. `worker/src/api/credential-connections.ts` — `oauthStartHandler`, `oauthCallbackHandler`, relay HTML
6. Dedicated handlers: `oauth-google.ts`, `oauth-github.ts`, `oauth-linkedin.ts`, `oauth-notion.ts`, `oauth-twitter.ts`, `oauth-facebook.ts`, `oauth-salesforce.ts`
7. `worker/src/index.ts` — route inventory (grep `oauth`)
8. `services/credential-service/src/routes/connections.ts` — Phase 2 patterns
9. `worker/src/services/credential-service-client.ts` — extend with OAuth proxy helpers

### Architectural rules
- **No redirect URI changes** in provider consoles for Phase 3 — worker URLs stay `https://worker.ctrlchecks.ai/api/oauth/...` and `/api/credential-connections/oauth/callback`
- Set `PUBLIC_WORKER_URL` on credential-service so `getRedirectUri()` builds identical callback URLs
- **GitHub `start-login`** (Cognito sign-in) **stays on worker** — credentials-only migration
- **Stripe** is API-key only (`stripe_api_key`) — no OAuth routes; document as N/A
- OAuth state + token storage uses same RDS tables (`oauth_states`, `connections`)
- Rollback: `CREDENTIAL_SERVICE_OAUTH_ENABLED=false` in worker → all OAuth handled locally again

### Top 10 scope

| Provider | Worker public routes | Migration path |
|----------|---------------------|----------------|
| Google | `/api/oauth/google/start`, `/callback` | Move handlers → service; worker proxies |
| GitHub | `/api/oauth/github/start`, `/callback` | Move connect flow only; keep `start-login` on worker |
| LinkedIn | `/api/oauth/linkedin/start`, `/callback` | Move + proxy |
| Notion | `/api/oauth/notion/authorize`, `/callback` | Move + proxy (POST callback) |
| Twitter/X | `/api/oauth/twitter/authorize`, `/callback` | Move + proxy (POST callback) |
| Facebook | `/api/oauth/facebook/start`, `/callback` | Move + proxy |
| Slack | generic `/api/credential-connections/oauth/*` | Route via `oauthService` when `credentialTypeId=slack_oauth2` |
| HubSpot | generic `/api/credential-connections/oauth/*` | Route when `credentialTypeId=hubspot_oauth2` |
| Salesforce | `/api/oauth/salesforce/authorize`, `/callback` | Move + proxy (POST callback) |
| Stripe | N/A (API key) | Skip OAuth; connections POST already works |

---

### Deliverable 11B-3.1 — OAuth engine in credential-service

Copy/adapt into `services/credential-service/src/`:
- `oauth/oauth-service.ts` (from worker `credentials-system/oauth-service.ts`)
- `oauth/oauth-callback-handler.ts`
- `oauth/credential-type-registry.ts` — **copy subset** for top-10 + shared helpers (`getCredentialType`, `getRedirectUri`, `logOAuthRedirectUris`)
- `oauth/connection-service.ts` — OAuth write paths only (or import shared DB layer from connections route)
- `lib/oauth-relay.ts` — `oauthCallbackHtml()` popup relay (from `credential-connections.ts`)

Env additions (`.env.example` + deploy script):
```
PUBLIC_WORKER_URL=https://worker.ctrlchecks.ai
# Per-provider secrets — same values as worker today:
GOOGLE_OAUTH_CLIENT_ID=  GOOGLE_OAUTH_CLIENT_SECRET=  GOOGLE_OAUTH_REDIRECT_URI=
GITHUB_CLIENT_ID=  GITHUB_CLIENT_SECRET=
# ... all env vars referenced by top-10 oauth2.clientIdEnv / clientSecretEnv / redirectUriEnv
REDIS_URL=               # optional — cache invalidation after OAuth success
FRONTEND_URL=
```

Startup: call `logOAuthRedirectUris()` — must print **worker** URLs, not `:3004`.

---

### Deliverable 11B-3.2 — Service OAuth routes

Add `services/credential-service/src/routes/oauth.ts`:

**Dedicated providers** (mirror worker paths internally):
- `GET /oauth/google/start` + `GET /oauth/google/callback`
- `GET /oauth/github/start` + `GET /oauth/github/callback`
- `GET /oauth/linkedin/start` + `GET /oauth/linkedin/callback`
- `GET /oauth/notion/authorize` + `POST /oauth/notion/callback`
- `GET /oauth/twitter/authorize` + `POST /oauth/twitter/callback`
- `GET /oauth/facebook/start` + `GET /oauth/facebook/callback`
- `GET /oauth/salesforce/authorize` + `POST /oauth/salesforce/callback`

**Generic** (registry-driven):
- `GET|POST /oauth/generic/start` — body/query: `credentialTypeId`, `userId` via `x-user-id` or JWT
- `GET|POST /oauth/generic/callback` — shared callback for Slack, HubSpot, etc.

Mount in `index.ts` **before** `requireAuth` for callbacks (providers redirect browser without JWT); protect `/start` routes with Cognito or `x-user-id` from worker proxy.

---

### Deliverable 11B-3.3 — Worker transparent proxy

Add `worker/src/middleware/credential-oauth-proxy.ts`:
- `CREDENTIAL_SERVICE_OAUTH_ENABLED=true` activates proxy
- `CREDENTIAL_SERVICE_OAUTH_PROVIDERS=google,github,linkedin,notion,twitter,facebook,slack,hubspot,salesforce` (comma list)
- For migrated provider: forward request to `CREDENTIAL_SERVICE_URL` + same path, pass `x-service-key`, `x-user-id`, preserve query/body
- On service error/timeout → fall back to local handler (feature-flag rollback)

Wire in `worker/src/index.ts` — **before** existing OAuth handlers:
```typescript
if (isOAuthProviderMigrated('google')) {
  app.get('/api/oauth/google/start', proxyToCredentialService);
  app.get('/api/oauth/google/callback', proxyToCredentialService);
}
// ... repeat per provider
```

Generic credential-connections OAuth:
- In `oauthStartHandler` / `oauthCallbackHandler`: if `credentialTypeId` maps to migrated provider → proxy; else local `oauthService`

Add tests: proxy forwards headers; disabled → local handler; provider not in list → local.

---

### Deliverable 11B-3.4 — Contract + redirect URI runbook

Update `docs/engineering/credential-service-contract.md` → **v0.3**:
- Phase 3 ✅ table with all routes
- Document proxy architecture (why no console changes)
- Stripe N/A note
- Phase 4 = remaining 47 providers

Create `docs/engineering/oauth-redirect-uri-inventory.md`:
- Table: provider → env var → effective URL → migrated Y/N
- Operator checklist: run `logOAuthRedirectUris()` on worker AND credential-service — URLs must match

---

### Deliverable 11B-3.5 — Deploy + activation

```bash
# credential-service: copy OAuth env vars from worker .env
./scripts/deploy-credential-service.sh

# worker: enable OAuth proxy (after Phase 2 at 100% for 1 week)
CREDENTIAL_SERVICE_OAUTH_ENABLED=true
CREDENTIAL_SERVICE_OAUTH_PROVIDERS=google,github,linkedin,notion,twitter,facebook,slack,hubspot,salesforce
sudo systemctl restart ctrlchecks-worker
```

**Canary option:** `CREDENTIAL_SERVICE_OAUTH_CANARY_PERCENT=10` — route OAuth starts only (callbacks always hit same path; use provider-level flag instead if simpler).

Manual smoke per provider:
1. Connections UI → Connect Google → popup → success relay
2. Repeat GitHub connect (not login), Slack, HubSpot
3. `journalctl -u ctrlchecks-credential-service` shows token exchange, no secret leakage

### Verification
```bash
cd services/credential-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/middleware/__tests__/credential-oauth-proxy.test.ts --runInBand  # create if missing
cd worker && npx jest src/services/__tests__/credential-service-client.test.ts --runInBand
```

### Do NOT
- Change provider redirect URIs in consoles (Phase 3)
- Move GitHub `start-login` / `exchange-session` (auth flow stays worker)
- Expose credential-service on `0.0.0.0`
- Delete worker OAuth handlers until Phase 4 soak passes (keep as fallback)
- Migrate Stripe OAuth (doesn't exist)

### Handoff Card → **11B Phase 4 (remaining 47 OAuth)** · **11A Phase 6** · **Task 12**

---

## TASK 11B PHASE 4 PROMPT — Remaining OAuth + Full CRUD Delegation

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11B Phase 4: Complete Credential Migration**

Finish credential-service ownership: **all remaining OAuth providers** + **full connections CRUD delegation** (not just list). Retire worker vault writes after soak.

### Prerequisite gates (ops)
- Phase 2: `CREDENTIAL_SERVICE_CANARY_PERCENT=100` for **1 week**
- Phase 3: `CREDENTIAL_SERVICE_OAUTH_ENABLED=true` for top-9 for **1 week** — zero OAuth regressions
- Rollback tested for both flags independently

### Read first
1. `docs/engineering/credential-service-contract.md` — Phase 4 section → update to v0.4
2. `docs/engineering/oauth-redirect-uri-inventory.md` — Phase 4 rows (Instagram, WhatsApp, Zoho, remaining 42)
3. `worker/src/credentials-system/credential-type-registry.ts` — **full** registry (57 OAuth types)
4. `services/credential-service/src/oauth/credential-type-registry.ts` — top-9 subset to extend
5. `services/credential-service/src/routes/oauth.ts` + `worker/src/middleware/credential-oauth-proxy.ts`
6. `worker/src/api/oauth-meta.ts` — Instagram + WhatsApp handlers
7. `worker/src/services/credential-service-client.ts` — extend beyond `listConnectionsRemote`
8. `worker/src/api/credential-connections.ts` — create/update/delete/test/reconnect handlers
9. `worker/src/credentials-system/connection-service.ts` — behavior to mirror remotely

### Architectural rules
- **Same proxy pattern** — no provider console redirect URI changes
- Generic OAuth callback currently on worker — **proxy to service** when provider is migrated (consistency)
- Canary applies to **all CRUD ops** for a userId (same `shouldUseCredentialService`)
- Worker `connection-service` becomes **read-only fallback** after Phase 4 soak — do not delete until 2-week soak passes
- GitHub `start-login` / `exchange-session` **permanently** on worker
- Execution-time credential injection (`execution-auth`) stays on worker for now (11B-5 or stays worker)

---

### Deliverable 11B-4.1 — Full OAuth registry + dedicated routes

Replace top-9 subset with full registry copy (or import shared module if you extract `packages/credential-types/` — prefer copy to minimize scope):

**Dedicated routes to add** (mirror worker paths):
- Instagram: `GET /oauth/instagram/authorize` + `POST /oauth/instagram/callback`
- WhatsApp: `GET /oauth/whatsapp/authorize` + `POST /oauth/whatsapp/callback`
- Zoho: if worker has dedicated routes, mirror; else generic only

**Generic path** handles all remaining registry OAuth types (Microsoft, Zoom, Dropbox, etc.) — no per-file handlers needed.

Update `CREDENTIAL_SERVICE_OAUTH_PROVIDERS` default to `*` or auto-detect all registry `provider` values.

Worker `index.ts`: add proxy blocks for Instagram/WhatsApp/Zoho (same pattern as Google).

Proxy generic **callback** routes when OAuth enabled:
```typescript
app.get('/api/credential-connections/oauth/callback', proxyToCredentialService, genericOAuthCallbackHandler);
app.post('/api/credential-connections/oauth/callback', proxyToCredentialService, genericOAuthCallbackHandler);
```

---

### Deliverable 11B-4.2 — Full CRUD client + handler delegation

Extend `credential-service-client.ts`:
- `createConnectionRemote(userId, body)` → `POST /connections`
- `getConnectionByProviderRemote(userId, provider)` → `GET /connections/:provider`
- `deleteConnectionByProviderRemote(userId, provider)` → `DELETE /connections/:provider`
- `updateConnectionRemote(userId, connectionId, body)` — add `PATCH /connections/:id` on service if missing
- `testConnectionRemote(userId, connectionId)` — add `POST /connections/:id/test` on service if missing

Wire in `credential-connections.ts` (same canary + null fallback pattern as list):
- `createConnectionHandler`
- `updateConnectionHandler`
- `deleteConnectionHandler`
- `testConnectionHandler`
- `oauthReconnectHandler` (OAuth start can stay proxied; reconnect uses connection lookup)

Add service routes if not present:
- `PATCH /connections/:id`
- `POST /connections/:id/test`
- `DELETE /connections/:id` (by UUID — worker uses `:id`, service has `:provider`; align contract)

Add **20+ worker client tests** covering all CRUD paths + canary + fallback.

---

### Deliverable 11B-4.3 — Contract + inventory completion

- `credential-service-contract.md` → **v0.4** — Phase 4 ✅, 11B complete criteria
- `oauth-redirect-uri-inventory.md` — mark all 57 providers migrated; Stripe N/A
- `TASK11B_COMPLETE.md` in `.claude/logs/` — activation checklist, soak gates, rollback runbook

**11B complete criteria:**
- `CREDENTIAL_SERVICE_ENABLED=true` + `CANARY_PERCENT=100`
- `CREDENTIAL_SERVICE_OAUTH_ENABLED=true` + all providers migrated
- Worker vault writes disabled behind `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=true` (new flag, default false until soak)
- 2-week production soak with zero credential decrypt/OAuth failures

---

### Deliverable 11B-4.4 — Deploy + activation

```bash
# 1. Deploy credential-service with full OAuth env vars
./scripts/deploy-credential-service.sh

# 2. Expand OAuth providers (or set to all)
CREDENTIAL_SERVICE_OAUTH_PROVIDERS=*   # or explicit comma list of all providers

# 3. Full CRUD canary already at 100% from Phase 2
CREDENTIAL_SERVICE_ENABLED=true
CREDENTIAL_SERVICE_CANARY_PERCENT=100

# 4. After 2-week soak — disable worker vault writes
CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED=true
sudo systemctl restart ctrlchecks-worker
```

Smoke: API-key connection (Stripe), OAuth (Instagram), update, delete, workflow execution still resolves credentials.

### Verification
```bash
cd services/credential-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/middleware/tests/credential-oauth-proxy.test.ts --runInBand
cd worker && npx jest src/services/__tests__/credential-service-client.test.ts --runInBand
```

### Do NOT
- Remove worker OAuth handlers until vault-write disable soak passes
- Change redirect URIs in provider consoles
- Move `execution-auth` / runtime credential injection yet
- Move GitHub login flow

### Handoff Card → **11C Notification Service** · **11A Phase 6** · **Task 12**

---

## TASK 11C PROMPT — Notification Service Scaffold (:3005)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11C Phase 1: Notification Service Scaffold**

Create `services/notification-service/` on port **3005**. Shell + contract only — **do not move SES email or WebSocket bridge yet**. Safe to run **in parallel** with 11B ops soaks and 11A Phase 5/6.

### Read first
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 §11C
2. `.claude/logs/TASK11B_COMPLETE.md` — migration pattern reference
3. `services/credential-service/` — scaffold pattern (auth, health, deploy)
4. `worker/src/services/notifications/email-service.ts` — SES logic to move in Phase 2
5. `worker/src/services/execution-job-runner.ts` — calls `sendExecutionCompleted/Failed`
6. `worker/src/services/ws-redis-bridge.ts` — in-app realtime (Phase 3+; worker keeps WS server)
7. `scripts/deploy-credential-service.sh` · `.github/workflows/deploy-credential-service.yml`

### Context
- **11B ops gates still pending** (not blocking 11C code): `OAUTH_PROVIDERS=*`, `VAULT_WRITES_DISABLED=true` after soaks
- **11A Phase 6** independent — executor move does not block 11C
- Notification service binds **`127.0.0.1:3005`** — worker delegates via HTTP + `x-service-key`

### Architectural rules
- `NOTIFICATION_SERVICE_ENABLED=false` default on worker — no behavior change until Phase 2
- Email is **non-blocking** today — preserve fire-and-forget semantics
- In-app WebSocket **stays on worker** in Phase 1–2 (frontend connects to `ws://worker/ws/executions`)
- Auth: `x-service-key` (worker→service) + optional Cognito JWT stub (Phase 2)

---

### Deliverable 11C-1.1 — Service scaffold

Create `services/notification-service/`:

```
src/
  index.ts              # Express :3005, bind 127.0.0.1
  env-loader.ts
  middleware/auth.ts    # x-service-key + Bearer stub (copy credential-service)
  middleware/request-id.ts
  routes/
    notifications.ts    # stub routes — 501 NOTIFICATION_SERVICE_STUB
  __tests__/health.test.ts, auth.test.ts, notifications.test.ts
```

**Public probes:**
- `GET /health/live`, `/health/ready`, `/health`

**Protected stub routes (501 with contract shape):**
- `POST /notifications/email` — `{ to, subject, html, templateId? }`
- `POST /notifications/execution-completed` — `{ userId, workflowName, executionId }`
- `POST /notifications/execution-failed` — `{ userId, workflowName, error }`
- `POST /notifications/webhook` — `{ url, payload, headers? }` (future outbound delivery)

`/health/ready` → 200 scaffold (SES check in Phase 2).

---

### Deliverable 11C-1.2 — Worker client stub

Create `worker/src/services/notification-service-client.ts`:
- `isNotificationServiceEnabled(): boolean`
- `sendExecutionCompletedRemote(...)` → returns `false` when disabled (caller uses local)
- `sendExecutionFailedRemote(...)` → same pattern
- `sendEmailRemote(...)` → same pattern
- Mirror `credential-service-client.ts` / `execution-engine-client.ts` fallback semantics

Add to `worker/.env.example`:
```bash
NOTIFICATION_SERVICE_ENABLED=false
NOTIFICATION_SERVICE_URL=http://localhost:3005
NOTIFICATION_SERVICE_KEY=
```

Unit tests: disabled → no fetch; enabled stub → fetch called with `x-service-key`.

**Do not wire** into `execution-job-runner.ts` yet.

---

### Deliverable 11C-1.3 — Deploy artifacts

- `scripts/deploy-notification-service.sh` (type-check → test → build → scp → systemd restart → health probe)
- `scripts/ctrlchecks-notification-service.service` (systemd, port 3005, MemoryMax=512M)
- `.github/workflows/deploy-notification-service.yml` — paths: `services/notification-service/**`

---

### Deliverable 11C-1.4 — Contract doc

Create `docs/engineering/notification-service-contract.md` v0.1:
- Endpoints table (email, execution events, webhook)
- Feature flags + rollback (`NOTIFICATION_SERVICE_ENABLED=false`)
- Migration phases:
  - **Phase 1** — scaffold (this task)
  - **Phase 2** — move `email-service.ts` + SES env vars
  - **Phase 3** — outbound webhook delivery queue
  - **Phase 4** — Redis pub/sub bridge for in-app (worker WS unchanged)
- Related: Task 7 SES env (`SES_FROM_EMAIL`, `SES_REGION`, `EXECUTION_EMAIL_NOTIFICATIONS`)

---

### Verification
```bash
cd services/notification-service && npm ci && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/__tests__/notification-service-client.test.ts --runInBand
curl http://localhost:3005/health/live
```

### Do NOT
- Move `email-service.ts` or wire execution-job-runner (Phase 2)
- Move WebSocket server or change frontend WS URL
- Block on 11B ops soaks
- Send real emails from stub routes

### Handoff Card → **11C Phase 2 (SES email move)** · **11A Phase 6** · **Task 12**

---

## TASK 11C PHASE 2 PROMPT — SES Email Move

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11C Phase 2: Move SES Email Into Notification Service**

Implement real `POST /notifications/email` and `POST /notifications/send` on `:3005`. Wire worker `email-service.ts` to delegate via `sendEmailRemote()` when canary hits — **fire-and-forget**, local fallback on null.

### Read first
1. `docs/engineering/notification-service-contract.md` — Phase 2 section → update to v0.2
2. `worker/src/services/notifications/email-service.ts` — source to extract (SES client, 3 templates)
3. `worker/src/services/notifications/__tests__/email-service.test.ts` — behavior to preserve
4. `worker/src/services/notification-service-client.ts` — already has `sendEmailRemote`, canary helpers
5. `worker/src/services/execution-job-runner.ts` — calls `sendExecutionCompleted/Failed` (no direct wiring needed if email-service delegates internally)
6. `services/notification-service/src/routes/notifications.ts` — replace 501 stubs
7. `services/credential-service/src/lib/db.ts` — DB pattern if adding `notifications` table

### Parallel gates (do not block 11C-2)
- **11B ops soaks** — independent
- **11A Phase 6** — independent
- **Task 12** — independent

---

### Deliverable 11C-2.1 — SES engine in notification-service

Copy/adapt into `services/notification-service/src/`:
- `email/ses-client.ts` — lazy `SESClient` (from worker email-service)
- `email/templates.ts` — `execution_completed`, `execution_failed`, `welcome` HTML + subjects (identical copy)
- `email/send-email.ts` — `sendRaw(to, subject, html)` with guards:
  - `SES_FROM_EMAIL` required or skip with warn
  - `EXECUTION_EMAIL_NOTIFICATIONS=true` required for execution templates only

Env (`.env.example`):
```
SES_FROM_EMAIL=
SES_REGION=                    # fallback AWS_REGION
EXECUTION_EMAIL_NOTIFICATIONS=false
AWS_REGION=
AWS_ACCESS_KEY_ID=             # same as worker SES creds
AWS_SECRET_ACCESS_KEY=
DATABASE_URL=                  # optional Phase 2 — for notification audit log
NOTIFICATION_SERVICE_KEY=
```

`/health/ready` — add check: `SES_FROM_EMAIL` set → `ses=ok`, else `ses=skip`.

Add `@aws-sdk/client-ses` to `package.json`.

---

### Deliverable 11C-2.2 — Real notification routes

Implement in `notifications.ts`:

**`POST /notifications/email`** (protected — `x-service-key` + `x-user-id`):
```json
{ "templateId": "execution_completed|execution_failed|welcome", "data": { ... }, "to?": "override@email.com" }
```
- Resolve `to`: explicit `to` OR lookup user email by `x-user-id` via DB (`getUserById` pattern from worker)
- Return `202 { notificationId, status: 'sent'|'skipped', channel: 'email' }`
- Never log secrets or full email bodies in production logs

**`POST /notifications/send`** — generic dispatcher:
```json
{ "type": "execution_completed", "channel": "email", "userId": "...", "data": { ... } }
```
Routes to email handler when `channel=email`.

Optional (contract lists these — implement if straightforward):
- `GET /notifications` — list recent for user (requires `notifications` table migration)
- `PATCH /notifications/:id/read` — mark read

If skipping DB in Phase 2, document as Phase 2.5 — email send is the critical path.

Unit tests with mocked SES — no real sends in CI.

---

### Deliverable 11C-2.3 — Worker delegation + 50% canary

Update `email-service.ts` (keep public API unchanged):
```typescript
export async function sendExecutionCompleted(userId, workflowName, executionId) {
  const { shouldUseNotificationService, sendEmailRemote } = await import('../notification-service-client');
  if (shouldUseNotificationService(userId)) {
    const remote = await sendEmailRemote(userId, {
      templateId: 'execution_completed',
      data: { workflowName, executionId, userId },
    });
    if (remote) return; // service handled it
  }
  // existing local SES path (unchanged)
}
```
Same pattern for `sendExecutionFailed` and `sendWelcomeEmail`:
- Welcome: use `userId` = email address OR pass `to` in payload when no userId (welcome has no userId today — use `sendEmailRemote(email, { templateId: 'welcome', data: { name }, to: email })` and treat first arg as routing key for canary OR use `CANARY=100` only for welcome)

Add `NOTIFICATION_SERVICE_CANARY_PERCENT` to worker `.env.example` (default 0).

Add worker tests (`notification-service-client.test.ts` if missing + extend `email-service.test.ts`):
- disabled → local SES path
- enabled + canary hit → remote called
- enabled + remote null → local fallback

**Do not change** `execution-job-runner.ts` — delegation lives inside email-service.

---

### Deliverable 11C-2.4 — Deploy + contract

- `./scripts/deploy-notification-service.sh` — ensure SES env vars copied from worker
- Update contract → **v0.2** (Phase 2 ✅, Phase 3 in-app next)
- Server activation (staging):
  ```bash
  NOTIFICATION_SERVICE_ENABLED=true
  NOTIFICATION_SERVICE_CANARY_PERCENT=50
  EXECUTION_EMAIL_NOTIFICATIONS=true   # on both worker and notification-service
  ```

### Verification
```bash
cd services/notification-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/notifications/__tests__/email-service.test.ts --runInBand
cd worker && npx jest src/services/__tests__/notification-service-client.test.ts --runInBand
```

Manual: trigger workflow execution → completion email arrives; check `source` in logs if added.

### Do NOT
- Move WebSocket server or `ws-redis-bridge.ts` (Phase 3)
- Block execution on notification failure
- Remove worker email-service local path (keep as fallback)
- Send email when `EXECUTION_EMAIL_NOTIFICATIONS=false`

### Handoff Card → **11C Phase 3 (in-app Redis)** · **11A Phase 6** · **Task 12**

---

## TASK 11C PHASE 3 PROMPT — In-App Notifications (DB + Redis)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11C Phase 3: In-App Notifications**

Implement real `POST /notifications/in-app`, `GET /notifications`, `PATCH /notifications/:id/read`. Persist to shared `notifications` table; publish Redis event for optional real-time delivery. Wire execution lifecycle to create in-app rows via `sendInAppRemote()` when canary hits.

### Prerequisite gate (ops)
- Phase 2 at `NOTIFICATION_SERVICE_CANARY_PERCENT=100` for **1 week** with zero SES regressions

### Read first
1. `docs/engineering/notification-service-contract.md` — Phase 3 → update to v0.3
2. `ctrl_checks/sql_migrations/01_database_setup.sql` — `notifications` table schema
3. `ctrl_checks/src/pages/settings/Notifications.tsx` — frontend reads `notifications` via awsClient (no change required if service writes same table)
4. `services/notification-service/src/routes/notifications.ts` — replace 501 stubs for in-app/GET/PATCH
5. `services/credential-service/src/lib/db.ts` — pg Pool pattern
6. `worker/src/services/ws-redis-bridge.ts` — Redis pub/sub pattern (do **not** move WS server)
7. `worker/src/services/execution-job-runner.ts` — hook point after execution terminal state
8. `worker/src/services/notification-service-client.ts` — `sendInAppRemote()` already exists

### Architectural rules
- **WebSocket server stays on worker** (`/ws/executions`, `/ws/chat`) — permanent
- In-app delivery is **fire-and-forget** — never block execution
- Same canary as Phase 2: `shouldUseNotificationService(userId)` + null → local no-op fallback
- Service uses **service-role DB access** (same `DATABASE_URL` as worker) — not user JWT for writes
- Frontend can keep direct DB reads until a future API migration — Phase 3 only requires service **writes**

---

### Deliverable 11C-3.1 — DB layer in notification-service

Add `services/notification-service/src/lib/db.ts`:
- `pg.Pool` + `queryDb()` (copy credential-service pattern)
- `/health/ready` — add `db: ok|skip|fail` (SELECT 1)

Add `services/notification-service/src/repositories/notifications-repo.ts`:
```typescript
insertNotification({ userId, title, message, type, link? }) → { id, ... }
listNotifications(userId, { limit?, unreadOnly? }) → NotificationRow[]
markRead(userId, notificationId) → boolean
```

Table columns (must match existing schema):
`id, user_id, title, message, type, read, link, created_at`

---

### Deliverable 11C-3.2 — Real in-app routes

**`POST /notifications/in-app`** (protected — `x-service-key` + `x-user-id`):
```json
{ "title": "...", "message": "...", "type": "success|error|info|warning", "link?": "/workflow/..." }
```
- Insert row → return `201 { notificationId, status: 'created', channel: 'in-app' }`
- Publish Redis event (Deliverable 11C-3.3)

**`GET /notifications`** — list for `x-user-id` (or JWT sub when Cognito enabled):
- Query params: `limit` (default 50), `unreadOnly`
- Return `{ notifications: [...] }`

**`PATCH /notifications/:id/read`** — mark read for owning user
- Return `204` or `404`

Update **`POST /notifications/send`** — when `channel=in-app`, route to in-app handler (remove 501).

Unit tests with mocked DB + mocked Redis — 15+ new tests in `notifications.test.ts`.

---

### Deliverable 11C-3.3 — Redis pub/sub (real-time hint)

Add `services/notification-service/src/lib/redis-pub.ts`:
- Channel: `NOTIFICATION_REDIS_CHANNEL_PREFIX` default `notifications:user:`
- Publish on in-app insert: `{ userId, notificationId, type, title, ts }`

Optional worker subscriber (`worker/src/services/notification-redis-subscriber.ts`):
- Subscribe to `notifications:user:*` or single channel with userId in payload
- **Do not** require WS changes in Phase 3 — log + future hook only, OR emit `BroadcastChannel`-compatible event if trivial
- If skipping worker subscriber, document in contract as Phase 3.5 — DB writes alone unblock frontend settings page

Env:
```
REDIS_URL=
NOTIFICATION_REDIS_CHANNEL_PREFIX=notifications:events
DATABASE_URL=
```

---

### Deliverable 11C-3.4 — Worker wiring (execution → in-app)

Add `worker/src/services/notifications/in-app-service.ts`:
```typescript
export async function notifyExecutionCompleted(userId, workflowName, executionId, workflowId?) {
  const { shouldUseNotificationService, sendInAppRemote } = await import('../notification-service-client');
  if (!shouldUseNotificationService(userId)) return;
  await sendInAppRemote(userId, {
    title: `Workflow "${workflowName}" completed`,
    message: `Execution ${executionId} finished successfully.`,
    type: 'success',
    metadata: { executionId, workflowId, link: `/workflow/${workflowId}` },
  }).catch(() => {});
}
```
Mirror `notifyExecutionFailed`.

Wire in `execution-job-runner.ts` **after** email block (both fire-and-forget via `setImmediate`):
```typescript
if (succeeded) notifyExecutionCompleted(...);
else notifyExecutionFailed(...);
```

Map `metadata.link` → DB `link` column in service route handler.

Add worker tests: canary hit → remote called; disabled → no fetch.

**Do not remove** email-service delegation from Phase 2.

---

### Deliverable 11C-3.5 — Contract + deploy

- `notification-service-contract.md` → **v0.3** (Phase 3 ✅, Phase 4 webhook next)
- Deploy script: ensure `DATABASE_URL` + `REDIS_URL` on notification-service `.env`
- Activation: same flags as Phase 2 (`NOTIFICATION_SERVICE_ENABLED=true`, canary 50→100)

### Verification
```bash
cd services/notification-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/notifications --runInBand
cd worker && npx jest src/services/__tests__/notification-service-client.test.ts --runInBand
```

Manual: run workflow → row appears in Settings → Notifications; mark-read via UI still works.

### Do NOT
- Move WebSocket server or change frontend WS URLs
- Block execution on in-app insert failure
- Break Phase 2 email delegation
- Require frontend changes (DB write path is sufficient)

### Handoff Card → **11C Phase 4 (webhooks)** · **11A Phase 6** · **Task 12**

---

## TASK 11C PHASE 4 PROMPT — Outbound Webhook Delivery + 11C Complete

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11C Phase 4: Webhook Delivery (Final Notification Migration)**

Implement real `POST /notifications/webhook` with retry + dead-letter logging. Wire worker `sendWebhookRemote()` / `sendNotificationRemote()` with same canary. Mark **11C code-complete** with `TASK11C_COMPLETE.md`.

### Prerequisite gate (ops)
- Phase 3 at `NOTIFICATION_SERVICE_CANARY_PERCENT=100` for **1 week** — in-app rows visible in Settings UI

### Read first
1. `docs/engineering/notification-service-contract.md` — Phase 4 → update to v0.4
2. `.claude/logs/TASK11B_COMPLETE.md` — completion doc pattern
3. `services/notification-service/src/routes/notifications.ts` — webhook 501 stub + `/send` dispatcher
4. `services/notification-service/src/lib/ses.ts` — non-fatal error pattern to mirror
5. `worker/src/services/notification-service-client.ts` — add `sendWebhookRemote()`
6. `worker/src/services/in-app-service.ts` — delegation pattern reference
7. `worker/src/services/execution-job-runner.ts` — optional hook for execution webhooks (if product wants it)
8. `worker/src/api/execute-workflow.ts` — Discord/Slack node webhooks stay in executor (do **not** move)

### Architectural rules
- **Workflow node webhooks** (Slack/Discord nodes in DAG) **stay in execute-workflow** — Phase 4 is **notification-service outbound delivery**, not node execution
- Fire-and-forget — never block caller on webhook delivery
- Same canary: `shouldUseNotificationService(userId)` + null → local no-op (worker may log skip)
- Validate URLs: HTTPS only in production; block private IP ranges (SSRF guard)
- Max payload size 256KB; timeout 10s per attempt

---

### Deliverable 11C-4.1 — Webhook delivery engine

Add `services/notification-service/src/lib/webhook-deliver.ts`:
```typescript
deliverWebhook({ url, method, headers, payload, maxRetries? })
  → { deliveryId, status: 'delivered'|'failed', attempts, lastStatus? }
```
- Retry: exponential backoff (1s, 2s, 4s) — default 3 attempts
- SSRF guard: reject `localhost`, `127.0.0.1`, `10.*`, `172.16-31.*`, `192.168.*`, link-local
- Log delivery outcome — **never** log full payload if it may contain secrets

Optional DLQ persistence (`notification_webhook_dlq` table migration `0008_*`):
- `id, user_id, url, payload_json, error, attempts, created_at`
- Skip table if over scope — structured error logs acceptable for v1

---

### Deliverable 11C-4.2 — Real webhook route

**`POST /notifications/webhook`** (protected):
```json
{
  "url": "https://hooks.example.com/...",
  "method": "POST",
  "headers": { "X-Custom": "value" },
  "payload": { "event": "execution_completed", "executionId": "..." }
}
```
- Return `202 { deliveryId, status, attempts }`
- On permanent failure after retries: `502 { deliveryId, status: 'failed', attempts }` (worker treats non-null as attempted; optional local retry policy)

Update **`POST /notifications/send`** — when `channel=webhook`, dispatch inline (remove 501).

Add `sendWebhookRemote()` to worker client:
```typescript
sendWebhookRemote(userId, { url, payload, headers?, method? })
```

Add `worker/src/services/webhook-notification-service.ts`:
- `notifyExecutionWebhook(userId, url, eventPayload)` — canary + remote + no-op fallback
- Wire **only if** product stores user webhook URL (env `EXECUTION_WEBHOOK_URL` for testing OR skip worker wiring and expose route for future callers)

Tests: 12+ service tests (SSRF blocked, retry succeeds on 2nd attempt, DLQ/log on fail); 6+ worker client tests.

---

### Deliverable 11C-4.3 — Contract v0.4 + TASK11C_COMPLETE.md

Update `notification-service-contract.md` → **v0.4**:
- Phase 4 ✅ — all channels live (email, in-app, webhook)
- 11C code-complete criteria + ops activation checklist (same pattern as 11B)

Create `.claude/logs/TASK11C_COMPLETE.md`:
- Phase 1–4 summary
- Activation sequence:
  ```bash
  NOTIFICATION_SERVICE_ENABLED=true
  NOTIFICATION_SERVICE_CANARY_PERCENT=50 → 100
  # run migration 0007 (Phase 3) if not applied
  EXECUTION_EMAIL_NOTIFICATIONS=true
  SES_FROM_EMAIL + AWS creds on notification-service
  DATABASE_URL + REDIS_URL on notification-service
  ```
- Rollback: `NOTIFICATION_SERVICE_ENABLED=false`
- **Permanent constraints:** WS server on worker; workflow node webhooks in executor

---

### Deliverable 11C-4.4 — Deploy verification

```bash
cd services/notification-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/notifications --runInBand
cd worker && npx jest src/services/__tests__/notification-service-client.test.ts --runInBand
```

Manual smoke:
```bash
curl -X POST http://localhost:3005/notifications/webhook \
  -H 'x-service-key: <KEY>' -H 'x-user-id: test-user' \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://webhook.site/...","payload":{"test":true}}'
```

### Do NOT
- Move Slack/Discord **workflow nodes** to notification-service
- Move WebSocket server
- Block execution on webhook failure
- Allow SSRF to internal networks

### Handoff Card → **11D Trigger Service** · **11A Phase 6** · **Task 12**

---

## TASK 11D PROMPT — Trigger Service Scaffold (:3006)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11D Phase 1: Trigger Service Scaffold**

Create `services/trigger-service/` on port **3006**. Shell + contract only — **do not move webhook/form/chat/schedule handlers yet**. Public trigger URLs stay on worker (proxy pattern, like credential OAuth).

### Read first
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 §11D
2. `.claude/logs/TASK11C_COMPLETE.md` — scaffold pattern reference
3. `services/notification-service/` — auth, health, deploy template
4. `worker/src/api/webhook-trigger.ts` — webhook ingress to mirror in Phase 2
5. `worker/src/api/form-trigger.ts` · `worker/src/api/chat-trigger.ts`
6. `worker/src/services/scheduler/index.ts` — schedule cron (Phase 3)
7. `worker/src/index.ts` — route inventory (grep `trigger`)

### Context
- **11B/11C ops soaks** — independent, do not block 11D-1
- **11A Phase 6** — independent
- Trigger service binds **`127.0.0.1:3006`** — worker keeps public URLs

### Architectural rules
- `TRIGGER_SERVICE_ENABLED=false` default — zero behavior change
- Public paths unchanged:
  - `POST/GET /api/webhook-trigger/:workflowId`
  - `GET/POST /api/form-trigger/:workflowId/:nodeId/*`
  - `GET/POST /api/chat-trigger/:workflowId/:nodeId/*`
- Scheduler cron stays on worker until Phase 3
- Kafka mentioned in plan — **Phase 2+**; Phase 1 uses HTTP stubs only

---

### Deliverable 11D-1.1 — Service scaffold

```
services/trigger-service/src/
  index.ts              # Express :3006, bind 127.0.0.1
  env-loader.ts
  middleware/auth.ts    # x-service-key + Bearer stub
  middleware/request-id.ts
  routes/triggers.ts    # stub routes → 501 TRIGGER_SERVICE_STUB
  __tests__/health.test.ts, auth.test.ts, triggers.test.ts
```

**Protected stub routes (501):**
- `POST /triggers/webhook/:workflowId` — accept webhook payload
- `POST /triggers/form/:workflowId/:nodeId/submit`
- `POST /triggers/chat/:workflowId/:nodeId/message`
- `POST /triggers/schedule/:workflowId` — enqueue scheduled run (Phase 3)

**Public probes:** `/health/live`, `/health/ready`, `/health`

---

### Deliverable 11D-1.2 — Worker client stub

Create `worker/src/services/trigger-service-client.ts`:
- `isTriggerServiceEnabled(): boolean`
- `dispatchWebhookRemote(workflowId, payload)` → null when disabled
- `dispatchFormRemote(...)` · `dispatchChatRemote(...)` → null
- FNV canary helpers (same pattern as notification-service) — wire in Phase 2

Add to `worker/.env.example`:
```bash
TRIGGER_SERVICE_ENABLED=false
TRIGGER_SERVICE_URL=http://localhost:3006
TRIGGER_SERVICE_KEY=
TRIGGER_SERVICE_CANARY_PERCENT=0
```

Tests: disabled → null, no fetch. **Do not wire** trigger routes yet.

---

### Deliverable 11D-1.3 — Deploy artifacts

- `scripts/deploy-trigger-service.sh`
- `scripts/ctrlchecks-trigger-service.service` (MemoryMax=512M)
- `.github/workflows/deploy-trigger-service.yml`

---

### Deliverable 11D-1.4 — Contract doc

Create `docs/engineering/trigger-service-contract.md` v0.1:
- Endpoints + auth model
- Feature flags + rollback
- Migration phases:
  - **Phase 1** — scaffold (this task)
  - **Phase 2** — webhook + form + chat dispatch (worker proxy)
  - **Phase 3** — schedule cron move + Redis/Kafka queue
  - **Phase 4** — worker trigger routes become thin proxies only

### Verification
```bash
cd services/trigger-service && npm ci && npm run type-check && npm test
cd worker && npm run type-check
curl http://localhost:3006/health/live
```

### Do NOT
- Move scheduler or trigger route handlers
- Change public webhook URLs
- Introduce Kafka in Phase 1

### Handoff Card → **11D Phase 2 (webhook/form/chat)** · **11A Phase 6** · **Task 12**

---

## TASK 11A PHASE 6 PROMPT — Executor In Engine (Remove Internal Route)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11A Phase 6: Move Executor Into Engine**

Remove the HTTP hop `engine → POST /api/internal/engine-execute → worker`. Engine runs workflow jobs **in-process** using the same execution path as `execution-job-runner.ts`.

### Prerequisite gates (ops — hard blockers)
1. **Phase 5 Step B deployed** on production (`EXECUTION_ENGINE_ENABLED=true`, engine-first 202/503)
2. **7-day soak PASS** per `.claude/logs/TASK11A_PHASE5_SOAK.md`
3. Rollback tested: `EXECUTION_ENGINE_ENABLED=false` restores monolith path

### Read first
1. `docs/engineering/execution-engine-contract.md` — Phase 6 section → update to v0.6
2. `.claude/logs/TASK11A_PHASE5_SOAK.md`
3. `services/execution-engine/src/runner/engine-runner.ts` — replace fetch with in-process run
4. `services/execution-engine/src/runner/engine-consumer.ts`
5. `worker/src/api/internal-engine-execute.ts` — **delete target**
6. `worker/src/services/execution-job-runner.ts` — lifecycle to move/adapt
7. `worker/src/api/execute-workflow.ts` — handler invoked today (large; import carefully)
8. `worker/src/core/execution/dynamic-node-executor.ts` — registry-driven execution
9. `worker/src/index.ts` — remove internal route registration

### Architectural rules
- **UnifiedNodeRegistry** remains single source of node truth — no node-specific if/switch outside registry
- Engine needs same env as worker for execution: `DATABASE_URL`, `REDIS_URL`, credential resolution paths
- WS events: engine already has `ws-publish.ts` — keep publishing to `ws:exec:events`
- Notifications/email/in-app: still fire from worker job runner **until** engine owns full runner — move notification hooks with runner
- Clean cut after soak: remove `WORKER_INTERNAL_KEY` hop; optional deprecation cleanup of `isCanaryTarget()`

---

### Deliverable 11A-6.1 — Shared execution runner in engine

Add `services/execution-engine/src/runner/workflow-executor.ts`:
- Port `runExecutionJob()` logic from `execution-job-runner.ts`
- Invoke `executeWorkflowHandler` via **programmatic import** from worker (monorepo relative path) OR extract to `packages/workflow-runtime/` if imports too tangled — prefer minimal extract:
  ```
  packages/workflow-runtime/
    run-execution-job.ts   # shared by worker queue + engine
  ```
- Must support: DB status transitions, WS publish, notification hooks (email + in-app), `useQueue: false`

Update `engine-runner.ts`:
- **Remove** fetch to `/api/internal/engine-execute`
- Call `runExecutionJob()` in-process
- Preserve structured logs: `accepted/completed/failed + durationMs`

---

### Deliverable 11A-6.2 — Remove internal HTTP route

- Delete `worker/src/api/internal-engine-execute.ts` + tests
- Remove route from `worker/src/index.ts`
- Remove `WORKER_INTERNAL_URL` / `WORKER_INTERNAL_KEY` from engine `.env.example` (keep documented as removed in contract)
- Worker queue consumer: if still enqueueing to engine queue, engine executes locally — no worker callback

---

### Deliverable 11A-6.3 — Tests + contract

- Update engine-runner tests (no fetch mock — mock execute handler)
- Integration test: enqueue job → engine consumer → execution completes → DB status `success`
- Remove/update `internal-engine-execute` test suite
- Contract v0.6 — Phase 6 ✅; document no monolith execution when `EXECUTION_ENGINE_ENABLED=true`

### Verification
```bash
cd services/execution-engine && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npm run test:integration   # if available
```

Deploy sequence:
1. Deploy engine with Phase 6 code
2. Restart engine consumer
3. Restart worker (route removed)
4. Smoke: POST `/api/execute-workflow` → 202 → execution completes

### Do NOT
- Deploy before Phase 5 soak PASS
- Duplicate node execution logic outside registry path
- Break `EXECUTION_ENGINE_ENABLED=false` rollback (worker must still execute when engine off)

### Handoff Card → **11E Workflow CRUD** · **Task 12** · **11D Phase 2**

---

## TASK 12 PROMPT — Scale & Observability

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 12: Scale, Observability & Multi-Region Readiness**

Production observability for the **6-service stack** (worker, ai-generator, execution-engine, credential-service, notification-service, trigger-service). Docs + code where missing; no ALB/ASG deploy unless traffic warrants.

### Read first
1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 12
2. `docs/launch-plan/15_MONITORING_AND_OBSERVABILITY.md` — gap analysis
3. `worker/src/index.ts` — existing `/metrics` handler
4. `worker/src/services/execution-queue.ts` — queue depth metrics source
5. `worker/src/services/ai/metrics-tracker.ts` — AI metrics
6. `.claude/logs/TASK08_CICD_SETUP.md` — deploy/SSH context
7. Sentry setup from Task 7 (worker + frontend)

### Scope

| Deliverable | Output |
|---|---|
| 12.1 Unified metrics | Prometheus-format `/metrics` on all 5 services |
| 12.2 Grafana dashboards | `infra/grafana/dashboards/*.json` + import guide |
| 12.3 Structured logging | JSON log middleware on all services |
| 12.4 Log aggregation doc | CloudWatch agent OR Loki/Promtail runbook |
| 12.5 Multi-region plan | `docs/engineering/multi-region-readiness.md` |
| 12.6 On-call runbook | `.claude/logs/TASK12_OBSERVABILITY.md` |

---

### Deliverable 12.1 — Prometheus metrics (all services)

Add `src/lib/metrics.ts` to each service exposing `GET /metrics` (public, no auth):
```
# HELP http_requests_total ...
# HELP execution_queue_depth ...
# HELP notification_delivery_total ...
# HELP credential_service_requests_total ...
# HELP ai_generator_requests_total ...
```

Worker (extend existing):
- `execution_queue_depth`, `execution_jobs_total{status}`, `ws_redis_bridge_active`
- `credential_service_delegation_total{result}`, `notification_service_delegation_total{result}`
- `execution_engine_delegation_total{result}`

Microservices: `http_requests_total`, `process_uptime_seconds`, service-specific counters.

Add `infra/prometheus/prometheus.yml` scrape config for localhost ports 3001–3006.

Tests: snapshot test for metrics handler returns 200 + contains `HELP`.

---

### Deliverable 12.2 — Grafana dashboards

Create JSON dashboards (importable):
- `ctrlchecks-overview.json` — request rate, 5xx rate, p95 latency per service
- `ctrlchecks-executions.json` — queue depth, job success/fail, engine delegation
- `ctrlchecks-ai.json` — Gemini key pool health from existing metrics

Add `docs/engineering/grafana-setup.md`:
- EC2 install Grafana OSS OR Grafana Cloud free tier
- Import dashboards + datasource Prometheus
- Alert rules: queue depth > 100, 5xx rate > 1%, engine unhealthy

---

### Deliverable 12.3 — Structured JSON logging

Add request logging middleware to services missing it (match execution-engine JSON pattern):
```json
{"level":"info","service":"notification-service","method":"POST","path":"/notifications/email","status":202,"durationMs":45,"requestId":"..."}
```

Worker: ensure hot paths (execute-workflow accept, queue enqueue) emit JSON — extend existing structured logs in engine-runner pattern.

---

### Deliverable 12.4 — Centralized logging runbook

Create `docs/engineering/centralized-logging.md`:
- **Option A (AWS-native):** CloudWatch agent on EC2 → log groups per systemd unit
- **Option B (self-hosted):** Loki + Promtail docker-compose on same host
- Include `journalctl` → ship config for all 5 systemd units
- **Do not** commit AWS keys; document IAM role attachment

---

### Deliverable 12.5 — Multi-region readiness doc

Create `docs/engineering/multi-region-readiness.md`:
- Threshold: when to split (10k+ users, p99 latency, RDS CPU)
- Stateless services first (ai-generator, execution-engine)
- RDS read replica + sticky sessions for WS
- DNS/ALB cutover checklist (reference only — no Terraform required in Task 12)

---

### Deliverable 12.6 — On-call runbook

Create `.claude/logs/TASK12_OBSERVABILITY.md`:
- Dashboard links + alert meanings
- Rollback procedures cross-linking TASK11B_COMPLETE, TASK11C_COMPLETE, execution engine rollback
- Smoke commands per service health probe
- Incident triage flowchart (queue backlog vs DB vs Redis vs SES)

### Verification
```bash
# Metrics smoke (each service running locally)
curl -s http://localhost:3001/metrics | head
curl -s http://localhost:3002/metrics | head   # add if missing
curl -s http://localhost:3003/metrics | head
curl -s http://localhost:3004/metrics | head
curl -s http://localhost:3005/metrics | head
curl -s http://localhost:3006/metrics | head

cd worker && npm run type-check && npm test
# Each microservice: npm run type-check && npm test
```

Update plan Task 12 checkboxes.

### Do NOT
- Force ALB/ASG deploy in this task (document only)
- Break existing Sentry integration
- Expose metrics with secrets or PII labels

### Handoff Card → **11D Phase 1** · **11E Workflow CRUD** · **Post-Task-12 production hardening**

---

## TASK 11D PHASE 2 PROMPT — Webhook / Form / Chat Dispatch

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11D Phase 2: Trigger Dispatch (Webhook + Form + Chat)**

Implement real trigger handlers on `:3006`. Worker delegates when `shouldUseTriggerService(workflowId)` — same FNV canary as Phase 1 client. Public URLs unchanged on worker.

---

### GOAL

Move **dispatch logic** (workflow lookup → execution create → enqueue) into trigger-service for webhook, form, and chat. Worker routes stay public; fall back to local handler when remote returns null.

---

### READ FIRST

1. `docs/engineering/trigger-service-contract.md` — Phase 2 section → update to v0.2
2. `worker/src/api/webhook-trigger.ts` — full handler to mirror
3. `worker/src/api/form-trigger.ts` — submit path
4. `worker/src/api/chat-trigger.ts` — message path
5. `worker/src/services/trigger-service-client.ts` — already has dispatch methods
6. `worker/src/services/execution-queue.ts` — enqueue pattern
7. `services/credential-service/src/lib/db.ts` — DB pool pattern
8. `services/notification-service/src/lib/redis-pub.ts` — optional; enqueue via HTTP to worker is OK for Phase 2

---

### RULES

- Public URLs **never change** — `/api/webhook-trigger`, `/api/form-trigger`, `/api/chat-trigger`
- Canary key: `fnv1a(workflowId) % 100 < pct` (already in client)
- Remote hit → return service response to caller; null → fall through to existing worker logic
- **No Kafka** in Phase 2 — enqueue via shared Redis queue OR internal HTTP to worker execute endpoint (match webhook-trigger pattern)
- Fire-and-forget enqueue — return `{ executionId, status: 'queued' }` immediately
- Webhook signature verification must run in service (copy `verifyWebhookSignature` logic or shared module)

---

### DELIVERABLE 1 — DB + dispatch engine in trigger-service

Add:
- `services/trigger-service/src/lib/db.ts` — pg Pool, `checkDb()` for `/health/ready`
- `services/trigger-service/src/lib/workflow-lookup.ts` — load workflow by id; check `active`, `webhook_url`, setup pending
- `services/trigger-service/src/lib/execution-enqueue.ts` — create execution row + enqueue job:
  - Option A (preferred Phase 2): HTTP POST to `http://127.0.0.1:3001/api/execute-workflow` with internal headers (`x-internal-webhook-execution`, etc.) — same as webhook-trigger today
  - Option B: direct Redis LPUSH to `workflow:execution:queue` if queue format is documented

Env (`.env.example`):
```
DATABASE_URL=
TRIGGER_SERVICE_KEY=
WORKER_INTERNAL_URL=http://127.0.0.1:3001
REDIS_URL=                    # if using direct queue
```

---

### DELIVERABLE 2 — Real route handlers

Replace 501 stubs in `routes/triggers.ts`:

**`POST /triggers/webhook/:workflowId`**
- Body: `{ headers, body, method, rawBodyBase64? }` — worker passes signature verification inputs
- Validate workflow + webhook secret + signature
- Create execution (`trigger: 'webhook'`) + enqueue
- Return `200 { executionId, status: 'queued', workflowId }`

**`POST /triggers/form/:workflowId/:nodeId/submit`**
- Body: `{ fields, clientMeta? }`
- Validate workflow active + form node exists
- Create execution + enqueue (`trigger: 'form'`)
- Return same shape

**`POST /triggers/chat/:workflowId/:nodeId/message`**
- Body: `{ message, sessionId?, metadata? }`
- Create execution + enqueue (`trigger: 'chat'`)
- Return same shape

Add 20+ tests (mocked DB + enqueue).

---

### DELIVERABLE 3 — Worker canary wiring

Update each handler **at the top** (after workflowId extracted):

**webhook-trigger.ts:**
```typescript
const { shouldUseTriggerService, dispatchWebhookRemote } = await import('../services/trigger-service-client');
if (shouldUseTriggerService(workflowId)) {
  const remote = await dispatchWebhookRemote(workflowId, {
    headers: req.headers as Record<string, string>,
    body: req.body,
    method: req.method,
    // include rawBody if needed for signature
  });
  if (remote) return res.json({ success: true, executionId: remote.executionId, status: remote.status, source: 'trigger-service' });
}
// existing local path unchanged
```

Same pattern for **form-trigger.ts** (submit handler) and **chat-trigger.ts** (message handler).

Extend `trigger-service-client.test.ts` + add handler tests (canary hit → remote; miss → local).

---

### DELIVERABLE 4 — Contract + deploy

- `trigger-service-contract.md` → **v0.2** (Phase 2 ✅, Phase 3 schedule next)
- Deploy: copy `DATABASE_URL`, `TRIGGER_SERVICE_KEY`, `WORKER_INTERNAL_URL` to trigger-service `.env`

**Activation (staging):**
```bash
TRIGGER_SERVICE_ENABLED=true
TRIGGER_SERVICE_CANARY_PERCENT=50   # → 100 after 1 week
```

**Rollback:** `TRIGGER_SERVICE_ENABLED=false` + restart worker

---

### VERIFY

```bash
cd services/trigger-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/tests/trigger-service-client.test.ts --runInBand
```

Manual: POST to `/api/webhook-trigger/:id` for a canary workflow → response includes `source: 'trigger-service'`; execution runs.

---

### DO NOT

- Change public trigger URLs
- Move scheduler (Phase 3)
- Add Kafka (Phase 4)
- Remove local handler fallback paths

---

### WHEN DONE — return Handoff Card with:

- Completed task: Task 11D Phase 2
- Files created/modified
- Test counts
- Recommended next: **11D Phase 3 (schedule)** · **Task 12** · **11A Phase 6**

---

## TASK 11D PHASE 3 PROMPT — Schedule Dispatch

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11D Phase 3: Schedule Trigger Dispatch**

Implement real `POST /triggers/schedule/:workflowId`. Worker **scheduler cron stays on worker** — only the **fire** of a scheduled run delegates to trigger-service when canary hits.

### Prerequisite gate (ops)
- Phase 2 at `TRIGGER_SERVICE_CANARY_PERCENT=100` for **1 week** — webhook/form/chat stable

---

### GOAL

When a cron job fires in `worker/src/services/scheduler/index.ts`, call `dispatchScheduleRemote()` for canary workflows instead of direct `fetch(/api/execute-workflow)`. Service reuses Phase 2 `execution-enqueue.ts`.

---

### READ FIRST

1. `docs/engineering/trigger-service-contract.md` — Phase 3 → update to v0.3
2. `worker/src/services/scheduler/index.ts` — `executeScheduledWorkflow()` (line ~247)
3. `services/trigger-service/src/lib/execution-enqueue.ts` — reuse for schedule path
4. `services/trigger-service/src/routes/triggers.ts` — schedule stub → real handler
5. `worker/src/services/trigger-service-client.ts` — `dispatchScheduleRemote()` already exists
6. `.claude/logs/TASK11C_COMPLETE.md` — completion doc pattern (optional TASK11D at Phase 4)

---

### RULES

- **Do NOT move** `SchedulerService` cron loop to trigger-service (Phase 4)
- **Do NOT add Kafka** (Phase 4)
- Canary: same `shouldUseTriggerService(workflowId)` + null fallback
- Schedule input payload: `{ trigger: 'schedule', scheduled_at: ISO string }`
- Fire-and-forget — scheduler must not block on execution result

---

### DELIVERABLE 1 — Real schedule route

**`POST /triggers/schedule/:workflowId`**

Request body:
```json
{ "scheduledAt": "2026-06-11T12:00:00.000Z", "cron": "0 * * * *" }
```

Handler:
1. `lookupWorkflow(workflowId)` — must be `active` + setup complete
2. Call shared `enqueueExecution(workflowId, { trigger: 'schedule', scheduled_at, cron? })`
3. Return `{ executionId, status: 'queued', workflowId }`

Add 10+ tests in `dispatch.test.ts` (replace schedule 501 tests).

---

### DELIVERABLE 2 — Worker scheduler wiring

In `executeScheduledWorkflow(workflowId)`:

```typescript
const { shouldUseTriggerService, dispatchScheduleRemote } = await import('../trigger-service-client');
if (shouldUseTriggerService(workflowId)) {
  const remote = await dispatchScheduleRemote(workflowId, {
    scheduledAt: new Date().toISOString(),
    cron: undefined, // optional: pass from scheduleMap if available
  });
  if (remote) {
    console.log(`✅ Scheduled workflow ${workflowId} delegated to trigger-service: ${remote.executionId}`);
    return;
  }
}
// existing fetch(/api/execute-workflow) fallback unchanged
```

Add tests: mock client — canary hit calls remote; miss calls fetch.

---

### DELIVERABLE 3 — Contract v0.3

- Mark Phase 3 ✅ in `trigger-service-contract.md`
- Document: cron manager stays worker-side until Phase 4
- Phase 4 = Kafka + full scheduler move

---

### VERIFY

```bash
cd services/trigger-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/tests/trigger-service-client.test.ts --runInBand
```

Manual: set workflow cron → wait for tick OR unit-test `executeScheduledWorkflow` with canary env.

---

### DO NOT

- Move scheduler `loadScheduledWorkflows()` / node-cron jobs to trigger-service
- Change public trigger URLs
- Add Kafka

---

### WHEN DONE — return Handoff Card:

- Task 11D Phase 3 complete
- Test counts
- Recommended next: **11D Phase 4** · **Task 12** · **11A Phase 6**

---

## TASK 11D PHASE 4 PROMPT — Kafka + Full Scheduler Move

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11D Phase 4: Complete Trigger Migration (Kafka + Scheduler)**

**Hard gate:** Phase 3 at `TRIGGER_SERVICE_CANARY_PERCENT=100` for **1 week** with zero trigger regressions.

Move `SchedulerService` (node-cron) off worker into trigger-service. Replace direct HTTP enqueue with **Kafka/MSK** (or Redis Streams fallback if MSK not ready — document choice in contract).

---

### GOAL

- Trigger-service owns **all inbound triggers** + **schedule cron loop**
- Worker trigger routes become **thin proxies only** (like credential OAuth)
- Reliable execution handoff via message bus → execution-engine queue

---

### READ FIRST

1. `docs/engineering/trigger-service-contract.md` — Phase 4 → v0.4 + `TASK11D_COMPLETE.md`
2. `worker/src/services/scheduler/index.ts` — full file to move
3. `services/trigger-service/src/lib/execution-enqueue.ts` — replace HTTP with producer
4. `worker/src/services/execution-queue.ts` — consumer topic format
5. `.claude/logs/TASK11B_COMPLETE.md` — completion doc pattern

---

### DELIVERABLE 1 — Message bus producer

Add `services/trigger-service/src/lib/trigger-producer.ts`:
- Topic: `TRIGGER_EXECUTION_TOPIC` (default `ctrlchecks.trigger.executions`)
- Payload: `{ workflowId, executionId, input, userId, trigger, ts }`
- **MSK/Kafka** if `KAFKA_BROKERS` set; else **Redis Streams** fallback (`XADD trigger:executions`)

Env:
```
KAFKA_BROKERS=              # optional MSK
TRIGGER_EXECUTION_TOPIC=
REDIS_URL=                  # fallback
```

---

### DELIVERABLE 2 — Move SchedulerService

Copy/adapt `worker/src/services/scheduler/index.ts` → `services/trigger-service/src/scheduler/scheduler-service.ts`:
- `loadScheduledWorkflows()` + node-cron registration runs in trigger-service process
- On tick: publish to bus (not HTTP to worker)
- Remove scheduler startup from `worker/src/index.ts` when `TRIGGER_SERVICE_SCHEDULER_ENABLED=true` on worker (disable flag)

Worker: `schedulerService.start()` skipped when trigger-service owns schedules.

---

### DELIVERABLE 3 — Worker thin proxy (all triggers)

Add `worker/src/middleware/trigger-proxy.ts`:
- When `TRIGGER_SERVICE_ENABLED=true` + workflow in canary/all: forward entire request to trigger-service
- Fallback to local handlers on error (keep until 2-week soak)

Eventually: `TRIGGER_SERVICE_PROXY_ALL=true` — delete local handler bodies after soak.

---

### DELIVERABLE 4 — Consumer bridge (worker or engine)

Add consumer that reads trigger topic → enqueues to existing `workflow:execution:queue` (minimal change):
- Location: `worker/src/services/trigger-kafka-consumer.ts` OR execution-engine
- Idempotent on `executionId`

---

### DELIVERABLE 5 — Docs

- Contract v0.4 + `.claude/logs/TASK11D_COMPLETE.md`
- Rollback: disable scheduler on trigger-service + re-enable worker scheduler

---

### VERIFY

Integration test: schedule tick → message → execution queued → status `success`

### DO NOT

- Deploy without Phase 3 soak
- Break rollback to local handlers until TASK11D_COMPLETE soak passes

### Handoff Card → **11E Workflow CRUD** · **Task 12** (if not done)

---

## TASK 11E PROMPT — Workflow CRUD Service Scaffold (:3007)

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11E Phase 1: Workflow CRUD Service Scaffold**

Create `services/workflow-crud-service/` on port **3007**. Shell + contract only — **do not move save/load/version logic yet**. Public URLs stay on worker (`/api/save-workflow`, `/api/workflows/*`).

### Parallel work (no blockers)

- **Ops soaks** run on server in parallel (11B, 11C, 11D trigger canary)
- **11D Phase 4** waits on trigger Phase 3 soak
- **11A Phase 6** waits on execution Phase 5 soak

---

### GOAL

Scaffold internal workflow CRUD service with stub routes, worker client, deploy artifacts, and contract v0.1. Zero behavior change until Phase 2.

---

### READ FIRST

1. `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 §11E
2. `.claude/logs/TASK12_OBSERVABILITY.md` — metrics/logging pattern (reuse in scaffold)
3. `services/trigger-service/` — latest scaffold template (:3006)
4. `worker/src/api/save-workflow.ts` — Phase 2 migration target
5. `worker/src/api/workflow-versioning.ts` — Phase 3 target
6. `worker/src/index.ts` — grep `/api/workflows` and `/api/save-workflow`
7. `worker/src/core/validation/workflow-save-validator.ts` — validation to move in Phase 2
8. `docs/engineering/trigger-service-contract.md` — contract doc pattern

---

### RULES

- `WORKFLOW_CRUD_SERVICE_ENABLED=false` default on worker
- Bind **`127.0.0.1:3007`** only — never public
- Auth: `x-service-key` (worker→service) + Cognito JWT stub for user routes (Phase 2)
- **Edges/nodes validation** must still go through orchestrator rules in Phase 2+ — no manual edge mutation in CRUD service
- Include Task 12 artifacts in scaffold: JSON logging + `GET /metrics` (copy trigger-service pattern)

---

### DELIVERABLE 11E-1.1 — Service scaffold

```
services/workflow-crud-service/
  package.json, tsconfig.json, jest.config.js, .env.example
  src/
    index.ts              # Express :3007, health + metrics + auth
    env-loader.ts
    middleware/auth.ts
    middleware/request-id.ts
    lib/metrics.ts        # copy zero-dep pattern from trigger-service
    routes/workflows.ts   # stub CRUD → 501 WORKFLOW_CRUD_SERVICE_STUB
    tests/health.test.ts, auth.test.ts, workflows.test.ts
```

**Public probes:** `/health/live`, `/health/ready`, `/health`, `/metrics`

**Protected stub routes (501):**
- `POST /workflows` — create/save (maps to `POST /api/save-workflow`)
- `GET /workflows/:id` — load single workflow
- `GET /workflows` — list for user (query: limit, offset)
- `DELETE /workflows/:id`
- `GET /workflows/:id/versions` — list versions (Phase 3)
- `POST /workflows/:id/versions/:version/rollback` — stub only

`/health/ready` → 200 scaffold (`db: skip` until Phase 2)

---

### DELIVERABLE 11E-1.2 — Worker client stub

Create `worker/src/services/workflow-crud-service-client.ts`:
- `isWorkflowCrudServiceEnabled(): boolean`
- `getWorkflowCrudCanaryPercent()` / `shouldUseWorkflowCrudService(userId: string): boolean` — FNV-1a on **userId** (CRUD is per-user)
- `saveWorkflowRemote(userId, payload)` → null when disabled
- `getWorkflowRemote(userId, workflowId)` → null
- `listWorkflowsRemote(userId)` → null
- `deleteWorkflowRemote(userId, workflowId)` → null
- Wire **delegation metric**: call `incWorkflowCrudDelegation(result)` from worker metrics (add helper if missing)

Add to `worker/.env.example`:
```bash
WORKFLOW_CRUD_SERVICE_ENABLED=false
WORKFLOW_CRUD_SERVICE_URL=http://localhost:3007
WORKFLOW_CRUD_SERVICE_KEY=
WORKFLOW_CRUD_SERVICE_CANARY_PERCENT=0
```

Tests: `worker/src/services/tests/workflow-crud-service-client.test.ts` — disabled → null; canary 0/50/100; no fetch when disabled.

**Do NOT wire** into `save-workflow.ts` yet.

---

### DELIVERABLE 11E-1.3 — Deploy artifacts

- `scripts/deploy-workflow-crud-service.sh`
- `scripts/ctrlchecks-workflow-crud-service.service` (MemoryMax=512M, port 3007)
- `.github/workflows/deploy-workflow-crud-service.yml` — paths: `services/workflow-crud-service/**`
- Add port **3007** to `infra/prometheus/prometheus.yml` scrape config

---

### DELIVERABLE 11E-1.4 — Contract doc

Create `docs/engineering/workflow-crud-service-contract.md` v0.1:

| Phase | Scope |
|-------|--------|
| 1 | Scaffold (this task) |
| 2 | Save + load + delete + list with `workflow-save-validator` |
| 3 | Versioning routes (`workflow-versioning.ts`) |
| 4 | Templates + 100% canary; worker routes thin proxy |

**Public URLs (permanent on worker):**
- `POST /api/save-workflow`
- `DELETE /api/workflows/:id`
- `GET /api/workflows/:workflowId/versions/*`

Feature flags + rollback: `WORKFLOW_CRUD_SERVICE_ENABLED=false`

---

### VERIFY

```bash
cd services/workflow-crud-service && npm ci && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/tests/workflow-crud-service-client.test.ts --runInBand
curl http://localhost:3007/health/live
curl http://localhost:3007/metrics | head
```

---

### DO NOT

- Move `save-workflow.ts` or validation logic (Phase 2)
- Mutate `workflow.edges` directly in service code
- Wire client into save handler (Phase 2)
- Block on any ops soak

---

### WHEN DONE — return Handoff Card:

- Task 11E Phase 1 complete
- Test counts + files list
- Recommended next: **11E Phase 2 (save/load move)** · ops soaks · **11D Phase 4** (after trigger soak)

---

## TASK 11E PHASE 2 PROMPT — Save / Load / Delete Move

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11E Phase 2: Move Workflow Save / Load / Delete**

Implement real `POST/GET/DELETE /workflows` on `:3007`. Wire worker `save-workflow.ts` + delete handler with `shouldUseWorkflowCrudService(userId)` canary. Public URLs unchanged.

---

### GOAL

Port core CRUD from worker into workflow-crud-service:
- **Save** — `POST /workflows` (maps from `POST /api/save-workflow`)
- **Load** — `GET /workflows/:id`
- **List** — `GET /workflows`
- **Delete** — `DELETE /workflows/:id`

Worker delegates when canary hits; null → existing local path.

---

### READ FIRST

1. `docs/engineering/workflow-crud-service-contract.md` → update to v0.2
2. `worker/src/api/save-workflow.ts` — full save logic (~370 lines)
3. `worker/src/core/validation/workflow-save-validator.ts` — must run in service
4. `worker/src/api/workflow-graph-state.ts` — `buildSyncedGraphPayload`
5. `worker/src/index.ts` — `DELETE /api/workflows/:id` (lines ~1427)
6. `worker/src/services/workflow-crud-service-client.ts` — already wired types
7. `services/trigger-service/src/lib/db.ts` — DB pool pattern
8. `.cursor/rules/unified-graph-orchestrator-edge-ownership.mdc` — validate via validator only; never hand-wire edges in service

---

### RULES

- **Validation before write** — `normalizeWorkflowForSave` + `validateWorkflowForSave` (copy or import from worker)
- **No manual edge mutation** — validator/orchestrator rules only
- Canary on **userId**; fallback preserves today's behavior exactly
- **Version snapshot** after save — call `getWorkflowVersionManager().createVersion()` from service (same as worker) OR invoke worker internal hook — prefer porting version call into service save path
- **Subscription limits** on create — port `subscriptionService.canCreateWorkflow` / `geminiWalletService.isActive` checks
- Version **list/rollback** routes stay **501** (Phase 3)
- Fix route order: `GET /` before `GET /:id` before `GET /:id/versions`

---

### DELIVERABLE 11E-2.1 — DB + save engine in service

Add:
- `services/workflow-crud-service/src/lib/db.ts` — pg Pool, `checkDb()` for `/health/ready`
- `services/workflow-crud-service/src/lib/save-workflow.ts` — port save logic from worker handler (extract core function)
- `services/workflow-crud-service/src/lib/workflow-repo.ts` — getById, listByUser, deleteById (user-scoped)

Copy/adapt validation imports:
- Option A: `packages/workflow-validation/` shared module (minimal)
- Option B: copy `workflow-save-validator.ts` + deps into service `src/validation/` (acceptable for Phase 2)

Env:
```
DATABASE_URL=
WORKFLOW_CRUD_SERVICE_KEY=
```

---

### DELIVERABLE 11E-2.2 — Real routes

**`POST /workflows`** — body matches save-workflow payload:
```json
{ "id?", "name", "nodes", "edges", "metadata?", "settings?" }
```
- Run validation; return same shape as worker: `{ success, workflowId, workflow, validation }`
- `x-user-id` header required (from worker client)

**`GET /workflows/:id`** — user must own workflow (403 otherwise)

**`GET /workflows`** — list for `x-user-id`; query `?limit=&offset=`

**`DELETE /workflows/:id`** — delete + decrement subscription count (port from index.ts)

Add 25+ tests (mocked DB): validation failure 400, create 200, update 200, delete 404, list scoped to user.

---

### DELIVERABLE 11E-2.3 — Worker canary wiring

**save-workflow.ts** — after `authenticatedUserId` resolved:
```typescript
const { shouldUseWorkflowCrudService, saveWorkflowRemote } = await import('../services/workflow-crud-service-client');
if (shouldUseWorkflowCrudService(authenticatedUserId)) {
  const remote = await saveWorkflowRemote(authenticatedUserId, {
    id: workflowId, name, nodes, edges, config: req.body,
  });
  if (remote) {
    return res.json({ success: true, workflowId: remote.id, source: 'workflow-crud-service', ... });
  }
  console.warn('[SaveWorkflow] workflow-crud-service fallback');
}
// existing local path unchanged
```

**index.ts DELETE handler** — extract to `delete-workflow.ts` if needed; add same canary + `deleteWorkflowRemote`.

**Optional:** add `GET /api/workflows/:id` and `GET /api/workflows` worker routes that delegate via `getWorkflowRemote` / `listWorkflowsRemote` if frontend needs them (check `ctrl_checks` API usage first).

Extend client tests + add `save-workflow-canary.test.ts` (6+ tests).

---

### DELIVERABLE 11E-2.4 — Contract + deploy

- Contract **v0.2** — Phase 2 ✅
- Deploy with `DATABASE_URL` on service `.env`

**Activation (staging):**
```bash
WORKFLOW_CRUD_SERVICE_ENABLED=true
WORKFLOW_CRUD_SERVICE_CANARY_PERCENT=50
# monitor: curl localhost:3001/metrics | grep workflow_crud_delegation
# after 1 week → CANARY_PERCENT=100
```

**Rollback:** `WORKFLOW_CRUD_SERVICE_ENABLED=false` + restart worker

---

### VERIFY

```bash
cd services/workflow-crud-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/tests/workflow-crud-service-client.test.ts --runInBand
cd worker && npx jest src/api/__tests__/save-workflow --runInBand  # add if created
```

Manual: save workflow in UI for canary user → response includes `source: 'workflow-crud-service'`.

---

### DO NOT

- Implement version list/rollback (Phase 3)
- Change public URL paths
- Skip validation in service path
- Remove local save fallback

---

### WHEN DONE — return Handoff Card → **11E Phase 3 (versioning)** · ops soaks · **11D Phase 4**

---

## TASK 11E PHASE 3 PROMPT — Version History + Rollback

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11E Phase 3: Version History Move**

Implement `GET /workflows/:id/versions` and `POST /workflows/:id/versions/:version/rollback` on `:3007`. Wire worker versioning routes with same `shouldUseWorkflowCrudService(userId)` canary.

### Prerequisite

- Phase 2 canary ramp in progress (5→25→50→100) — **do not block Phase 3 code**

---

### GOAL

Port version history from `worker/src/services/workflow-versioning.ts` into workflow-crud-service. Public URLs stay on worker (`/api/workflows/:id/versions/*`).

---

### READ FIRST

1. `docs/engineering/workflow-crud-service-contract.md` → v0.3
2. `worker/src/services/workflow-versioning.ts` — `getVersionHistory`, `getVersion`, `rollbackToVersion`
3. `worker/migrations/009_workflow_versions.sql` — table schema
4. `services/workflow-crud-service/src/lib/workflow-repo.ts` — `insertVersionSnapshot` (align columns)
5. `worker/src/index.ts` — versioning routes (~1513–1580)
6. `worker/src/services/workflow-crud-service-client.ts` — `listWorkflowVersionsRemote`, `rollbackWorkflowRemote`

---

### RULES

- User must own workflow for list/rollback (join `workflows.user_id = x-user-id`)
- Rollback restores `workflows.nodes/edges/graph/metadata` from snapshot — run through existing save validation if needed
- After rollback, insert **new** version row documenting rollback (match worker behavior)
- Keep local worker handlers as fallback when remote returns null
- Fix route ordering in `workflows.ts`: static paths before param routes

---

### DELIVERABLE 11E-3.1 — Version repo

Add `services/workflow-crud-service/src/lib/version-repo.ts`:
- `listVersions(workflowId, userId, limit?)` → `{ version, createdAt, createdBy?, description? }[]`
- `getVersion(workflowId, userId, versionNumber)` → full snapshot or null
- `rollbackToVersion(workflowId, userId, versionNumber)` → updates `workflows` row + new version entry

Align INSERT with existing columns used by `insertVersionSnapshot` (`definition_snapshot`, optional legacy columns).

Add migration if missing: `worker/prisma/migrations/0008_workflow_versions_align.sql` (only if prod schema differs from 009).

---

### DELIVERABLE 11E-3.2 — Real routes

Replace 501 stubs:

**`GET /workflows/:id/versions`** — query `?limit=50`
**`POST /workflows/:id/versions/:version/rollback`** — body optional `{ description? }`

Return shapes matching worker JSON today so frontend unchanged.

15+ tests in `src/tests/versions.test.ts`.

---

### DELIVERABLE 11E-3.3 — Worker canary wiring

In `worker/src/index.ts` for each route:
- `GET .../versions` → `listWorkflowVersionsRemote`
- `POST .../rollback` → `rollbackWorkflowRemote`

Pattern:
```typescript
if (shouldUseWorkflowCrudService(userId)) {
  const remote = await listWorkflowVersionsRemote(userId, workflowId);
  if (remote) return res.json({ workflowId, versions: remote, source: 'workflow-crud-service' });
}
```

Add `worker/src/api/__tests__/workflow-versioning-canary.test.ts` (8+ tests).

---

### DELIVERABLE 11E-3.4 — Contract v0.3

Mark Phase 3 ✅. Phase 4 = `TASK11E_COMPLETE.md` + optional `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` gate.

---

### VERIFY

```bash
cd services/workflow-crud-service && npm run type-check && npm test
cd worker && npm run type-check
```

Manual: save workflow → list versions → rollback → verify graph restored.

---

### DO NOT

- Remove worker save/delete fallbacks (Phase 4)
- Change public URL paths

---

### WHEN DONE → **11E Phase 4 (completion)** · **11D Phase 4** · **11A Phase 6**

---

## TASK 11E PHASE 4 PROMPT — CRUD Completion + TASK11E_COMPLETE

Copy everything below this line into your implementer session:

---

**CtrlChecks — Task 11E Phase 4: Templates + Full CRUD Delegation + Retirement Gate**

Complete workflow-crud-service migration: move public **templates** read API, wire remaining worker **load/list** canary paths, add **`WORKFLOW_CRUD_LOCAL_WRITES_DISABLED`** gate (mirror credential-service pattern), and ship **`TASK11E_COMPLETE.md`**.

### Prerequisite gates (ops — code can proceed in parallel)

- Phase 2+3: `WORKFLOW_CRUD_SERVICE_ENABLED=true` + `WORKFLOW_CRUD_SERVICE_CANARY_PERCENT=100` for **7 days**
- Zero save/load/delete/version regressions in Grafana `ctrlchecks_workflow_crud_delegation_total`
- Rollback tested: `WORKFLOW_CRUD_SERVICE_ENABLED=false` + worker restart

---

### GOAL

11E **code-complete**: all CRUD + versioning + templates reads delegated to `:3007`; worker routes stay **thin proxies** with null fallback until local-write gate is enabled after soak.

---

### READ FIRST

1. `docs/engineering/workflow-crud-service-contract.md` → update to **v0.4**
2. `worker/src/api/templates.ts` — Phase 4 migration target (read-only `templates` table)
3. `worker/src/services/workflow-crud-service-client.ts` — extend with template + load/list helpers if missing
4. `worker/src/api/save-workflow.ts` — save canary already wired; add local-write gate
5. `worker/src/index.ts` — DELETE + versioning canary; add GET load/list routes if absent
6. `docs/engineering/credential-service-contract.md` — `CREDENTIAL_SERVICE_VAULT_WRITES_DISABLED` pattern
7. `.claude/logs/TASK12_OBSERVABILITY.md` — add workflow-crud :3007 to smoke section

---

### RULES

- Public URLs **unchanged** — worker always fronts requests
- Templates are **read-only** in this phase — admin CRUD (`/api/admin-templates`) stays on worker
- `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=false` default until 2-week post-100% soak
- When gate=true: canary users **must not** double-write to RDS via worker fallback — return 503 if service unreachable
- Do **not** delete worker CRUD code — gate disables paths, keeps emergency fallback when gate=false
- No manual `workflow.edges` mutation in service

---

### DELIVERABLE 11E-4.1 — Templates in workflow-crud-service

Add `services/workflow-crud-service/src/lib/templates-repo.ts`:
- `listTemplates({ category?, search?, limit? })` — mirror `worker/src/api/templates.ts` filters on `templates` where `is_active=true`
- `getTemplateById(id)` — single row or null

Add routes (no user auth — public catalog):
- `GET /templates` — query `category`, `search`
- `GET /templates/:id`

Add worker client:
- `listTemplatesRemote(query?)` → null on failure
- `getTemplateRemote(id)` → null on failure

Wire worker `index.ts`:
```typescript
// Before local templatesHandler — try remote (no canary; global read path)
const remote = await listTemplatesRemote({ category, search });
if (remote) return res.json({ templates: remote, source: 'workflow-crud-service' });
```

12+ tests in `services/workflow-crud-service/src/tests/templates.test.ts`.

---

### DELIVERABLE 11E-4.2 — Wire load/list canary (worker)

Service already exposes `GET /workflows` and `GET /workflows/:id` (Phase 2).

Add thin worker routes if missing (check frontend — may use direct DB today):
- `GET /api/workflows` → `listWorkflowsRemote(userId)` when `shouldUseWorkflowCrudService`
- `GET /api/workflows/:id` → `getWorkflowRemote(userId, id)` when canary

Match response shapes from existing save-workflow load logic. 10+ canary tests.

Optional stretch (only if UI uses them): canary for `GET .../versions/current` and `GET .../versions/:version` via new service endpoints + client methods.

---

### DELIVERABLE 11E-4.3 — Local-write retirement gate

Add to `worker/.env.example`:
```bash
WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=false  # After 2-week soak at CANARY=100, set true to retire worker DB writes for canary users
```

In `save-workflow.ts`, DELETE handler, and versioning rollback handler:
```typescript
if (process.env.WORKFLOW_CRUD_LOCAL_WRITES_DISABLED === 'true' && shouldUseWorkflowCrudService(userId)) {
  // remote already attempted above — if null here, fail closed:
  return res.status(503).json({ error: 'Workflow CRUD service unavailable', code: 'CRUD_SERVICE_UNAVAILABLE' });
}
```

When gate=false (default): existing null → local fallback unchanged.

8+ tests covering gate on/off + 503 when gate=true and remote null.

---

### DELIVERABLE 11E-4.4 — Contract v0.4 + completion doc

Update `workflow-crud-service-contract.md`:
- Phase 4 ✅ current
- Document templates endpoints, load/list canary, local-write gate
- 11E complete criteria checklist

Create `.claude/logs/TASK11E_COMPLETE.md`:
- Activation checklist (ENABLED, CANARY=100, LOCAL_WRITES_DISABLED ramp)
- 7-day + 2-week soak gates
- Rollback runbook (instant: ENABLED=false; partial: lower CANARY)
- Metrics to watch: `ctrlchecks_workflow_crud_delegation_total`, `workflow_crud_operations_total`
- Port 3007 smoke commands

Update `TASK12_OBSERVABILITY.md` — add :3007 to all-services smoke block.

---

### VERIFY

```bash
cd services/workflow-crud-service && npm run type-check && npm test
cd worker && npm run type-check
cd worker && npx jest src/services/tests/workflow-crud-service-client.test.ts --runInBand
```

Manual:
1. `curl http://localhost:3007/templates | jq .`
2. Save → list → load → rollback for canary user
3. Set `LOCAL_WRITES_DISABLED=true` in test env → kill :3007 → expect 503 (not silent double-write)

---

### DO NOT

- Move admin-templates CRUD (admin-only — stays worker)
- Remove worker fallback code
- Enable `LOCAL_WRITES_DISABLED=true` in production `.env` (ops step after soak)

---

### WHEN DONE — return Handoff Card → **Production cutover prompt** · **11D Phase 4** · **11A Phase 6**

---

## MICROSERVICES PRODUCTION CUTOVER PROMPT

> After 11E-4 + all service soaks at 100%, ask: *"Generate production cutover prompt."*

Scope preview:
- Consolidated activation matrix (all 6 services at CANARY=100)
- Final fallback retirement flags (`*_LOCAL_WRITES_DISABLED`, `VAULT_WRITES_DISABLED`, execution engine Step B merge)
- `MICROSERVICES_CUTOVER_COMPLETE.md` runbook
- Post-cutover: 11D Phase 4 (Kafka) + 11A Phase 6 (executor in engine) as remaining code tracks

---

## Prompt generator instructions (for parent chat)

When the user returns a Handoff Card:

1. Read the handoff card and `TASK0N_BASELINE_AUDIT.md` (if exists)
2. Verify claimed checkboxes match evidence
3. Generate the next task prompt using the same structure as Task 1:
   - Read-first files
   - Scope (three repos)
   - Architectural rules
   - Deliverables with commands
   - Do NOT list
   - Required Handoff Card format
4. Update `MICROSERVICES_PROMPT_CHAIN.md` with the new prompt text
5. Mark completed task in plan Progress Tracker
