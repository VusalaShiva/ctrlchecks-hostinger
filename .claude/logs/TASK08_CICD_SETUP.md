# Task 8 — CI/CD Pipeline Setup Guide

## Overview

4 workflow files created in `.github/workflows/`:

| File | Trigger | Target |
|---|---|---|
| `ci.yml` | push/PR to any branch | Quality gates only — type-check + lint + build |
| `deploy-worker.yml` | push to `main-repair` with `worker/**` changes | `/opt/ctrlchecks-worker` on EC2 |
| `deploy-ai-generator.yml` | push to `main` with `services/ai-generator/**` changes | `/opt/ctrlchecks-ai-generator` on EC2 |
| `deploy-frontend.yml` | push to `main` with `ctrl_checks/**` changes | `/var/www/ctrlchecks-frontend` on EC2 |

**Rule**: CI never deploys. Deploy workflows never run on PRs.

---

## Step 1 — Push Workflows to GitHub

The `.github/workflows/` files are at the monorepo root, which is **not currently a git repo**.

### Option A: Init a monorepo GitHub repo (recommended)

```bash
# At the monorepo root
cd c:\Users\user\Desktop\ctrlchecks-ai-workflow-os
git init
git add .github/
git commit -m "feat: CI/CD workflows for worker, ai-generator, frontend"
git remote add origin https://github.com/servicepathtotechnologies-ops/ctrlchecks-monorepo.git
git push -u origin main
```

Then the 3 sub-repo directories (worker/, ctrl_checks/, services/ai-generator/) become plain directories in the monorepo. The path filters (`worker/**`, `ctrl_checks/**`) in the workflows match correctly.

### Option B: Distribute workflows to each sub-repo

Copy the relevant workflow into each sub-repo:

```bash
# Worker (branch: main-repair)
cp .github/workflows/deploy-worker.yml worker/.github/workflows/deploy.yml
# Remove the `paths: ['worker/**']` filter — in the worker repo, all pushes are relevant
# Change trigger branch from main-repair to main (when worker's main branch is fixed)

# ctrl_checks (branch: main)
cp .github/workflows/deploy-frontend.yml ctrl_checks/.github/workflows/deploy.yml
# Remove the `paths: ['ctrl_checks/**']` filter

# ai-generator (needs its own GitHub repo first)
mkdir -p services/ai-generator/.github/workflows/
cp .github/workflows/deploy-ai-generator.yml services/ai-generator/.github/workflows/deploy.yml
```

---

## Step 2 — Add GitHub Secrets

Go to: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets

| Secret | Value | Used By |
|---|---|---|
| `EC2_SSH_KEY` | Full content of `Guide/Worker/ctrlchecks-backend.pem` (including `-----BEGIN RSA PRIVATE KEY-----` lines) | All 3 deploy workflows |
| `EC2_HOST` | `3.7.115.58` | All 3 deploy workflows |
| `EC2_USER` | `ubuntu` | All 3 deploy workflows |

### Frontend Build Secrets (baked into JS bundle at build time)

| Secret | Value |
|---|---|
| `VITE_AWS_REGION` | `ap-south-1` |
| `VITE_COGNITO_USER_POOL_ID` | `ap-south-1_aTYvSYflq` |
| `VITE_COGNITO_CLIENT_ID` | *(from Cognito console)* |
| `VITE_COGNITO_DOMAIN` | *(from Cognito console, e.g. `ctrlchecks.auth.ap-south-1.amazoncognito.com`)* |
| `VITE_API_URL` | `https://worker.ctrlchecks.ai` |
| `VITE_PUBLIC_BASE_URL` | `https://app.ctrlchecks.ai` |
| `VITE_SENTRY_DSN` | *(from Sentry project — Task 7; optional)* |
| `VITE_META_FACEBOOK_CONFIG_ID` | *(from Meta developer console; optional)* |

> **Note**: These are build-time values baked into the static JS bundle. They are not runtime server secrets. The values that appear in `.env.production` on the local machine are the same values to use here.

### How to add EC2_SSH_KEY

```bash
# On Windows PowerShell, copy PEM contents to clipboard:
Get-Content "c:\Users\user\Desktop\ctrlchecks-ai-workflow-os\Guide\Worker\ctrlchecks-backend.pem" | Set-Clipboard
# Then paste into the GitHub secret value field
```

---

## Step 3 — Branch Notes

| Service | Local branch | GitHub remote branch | Deploy workflow branch |
|---|---|---|---|
| worker | `main-repair` | `origin/main-repair` | `main-repair` (in deploy-worker.yml trigger) |
| ctrl_checks | `main` | `origin/main` | `main` |
| services/ai-generator | `main` | *(no remote yet)* | `main` |

**Worker branch fix (when ready)**:
```bash
cd worker
git branch -f main main-repair   # point main at current HEAD
git push origin main              # push to GitHub
# Then update deploy-worker.yml trigger from main-repair → main
```

---

## Step 4 — Manual Trigger (workflow_dispatch)

All 3 deploy workflows support manual dispatch from the GitHub UI:
1. Go to **Actions** tab in the GitHub repo
2. Select the workflow (e.g. "Deploy Worker")
3. Click **Run workflow** → select branch → click **Run workflow**

Use cases:
- First-time activation after adding secrets
- Force redeploy after rotating a secret (e.g. VITE_SENTRY_DSN)
- Emergency hotfix with `skip_tests=true` input

---

## Rollback Steps

### Worker rollback
```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58

# Find the last good commit
cd /opt/ctrlchecks-worker && git log --oneline -10

# Roll back to it
git reset --hard <commit-sha>
npm ci
NODE_OPTIONS="--max-old-space-size=4096" npm run build
mkdir -p dist/services/clickup && cp src/services/clickup/clickupNode.js dist/services/clickup/clickupNode.js
sudo systemctl restart ctrlchecks-worker
sleep 10 && curl -fsS http://localhost:3001/health/live
```

### AI Generator rollback
```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58

# Re-deploy previous artifact by re-running deploy-ai-generator.yml workflow_dispatch
# with an older commit checked out, OR manually:
cd /opt/ctrlchecks-ai-generator
# (restore previous dist/ from backup if available)
sudo systemctl restart ctrlchecks-ai-generator
```

### Frontend rollback
The CI artifact (retention 3 days) can be re-deployed:
1. Go to **Actions** → find last successful deploy-frontend run
2. Download `frontend-dist` artifact
3. SCP it manually to the server and re-extract

Or force-push older commit to main and let the workflow re-run.

---

## Concurrency Safety

All deploy workflows use:
```yaml
concurrency:
  group: deploy-<service>
  cancel-in-progress: false
```

`cancel-in-progress: false` means a second push while a deploy is running **queues** (does not cancel). This prevents partial deploys from two simultaneous pushes racing on the server.

---

## Verifying a Workflow Run

After pushing secrets and a trigger commit:

1. Go to **Actions** tab → click the workflow run
2. Expand **Deploy ... to EC2** step — look for `✅` lines
3. Confirm health:
   - Worker: `curl https://worker.ctrlchecks.ai/health/live`
   - AI Gen: SSH in → `curl http://localhost:3002/health`
   - Frontend: `curl -H "Host: app.ctrlchecks.ai" http://3.7.115.58/`

---

## What CI Does vs What Deploy Does

| Check | ci.yml (PR gate) | deploy-*.yml |
|---|---|---|
| Type-check | ✅ | ✅ (worker + ai-generator) |
| Lint | ✅ (hard fail) | ✅ (frontend only) |
| Build verification | ✅ | ✅ |
| Deploys to server | ❌ Never | ✅ Only on push to deploy branch |
| Runs on PRs | ✅ | ❌ Never |
