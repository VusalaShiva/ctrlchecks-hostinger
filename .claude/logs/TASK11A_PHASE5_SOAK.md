# Task 11A Phase 5 — 100% Cutover Soak Runbook

**Scope**: Step A (ops only) — set CANARY_PERCENT=100, watch for 1 week, then proceed to Step B (code).  
**Step A start**: Set `EXECUTION_ENGINE_CANARY_PERCENT=100` in worker env + restart worker.  
**Step B gate**: ≤0.1% error rate on engine path over 7 days.

---

## Step A — Ops only (no code, no redeploy)

### Pre-flight checklist (before setting 100%)

- [ ] Phase 4 (66%) soak PASS: `TASK11A_PHASE4_SOAK.md` 48h table shows ≤0.1% failures
- [ ] Engine consumer running: `systemctl is-active ctrlchecks-execution-engine`
- [ ] Last 6h clean: `journalctl -u ctrlchecks-execution-engine --since "6 hours ago" | grep '"event":"failed"' | wc -l` → 0 or near 0
- [ ] Both services healthy: `curl -fsS http://localhost:3001/health && curl -fsS http://localhost:3003/health/ready`

### Activation (server commands)

```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58

# 1. Confirm current state
grep 'EXECUTION_ENGINE' /opt/ctrlchecks-worker/.env

# 2. Bump to 100%
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=100/' /opt/ctrlchecks-worker/.env

# 3. Verify
grep 'EXECUTION_ENGINE_CANARY_PERCENT' /opt/ctrlchecks-worker/.env
# Expected: EXECUTION_ENGINE_CANARY_PERCENT=100

# 4. Restart worker only
sudo systemctl restart ctrlchecks-worker
sleep 5 && sudo systemctl status ctrlchecks-worker | head -5

# 5. Confirm every execution hits engine
journalctl -u ctrlchecks-execution-engine -f &
# Trigger 3 test executions → should see 3 "accepted" lines
```

---

## Monitoring (run daily during 7-day soak)

```bash
# Daily summary: accepted / completed / failed counts
journalctl -u ctrlchecks-execution-engine --since "yesterday" \
  | grep -oP '"event":"\K[^"]+' | sort | uniq -c

# Error rate check (should be 0 or near 0)
journalctl -u ctrlchecks-execution-engine --since "yesterday" \
  | grep '"event":"failed"' | wc -l

# Average execution duration
journalctl -u ctrlchecks-execution-engine --since "yesterday" \
  | grep '"event":"completed"' \
  | grep -oP '"durationMs":\K[0-9]+' \
  | awk '{s+=$1; n++} END {if(n>0) print "avg:", s/n, "ms,", "n =", n}'

# Worker: confirm monolith path no longer used
journalctl -u ctrlchecks-worker | grep 'Canary\|Job queued' | tail -20
# 'Job queued' lines should be 0 (100% going to engine now)

# Engine queue depth (should drain quickly)
redis-cli ZCARD workflow:execution:engine-queue
redis-cli ZCARD workflow:execution:engine-processing
```

---

## 7-day soak log

Fill in daily:

| Day | Accepted | Completed | Failed | Error% | Avg ms | Notes |
|-----|----------|-----------|--------|--------|--------|-------|
| 1   |          |           |        |        |        | Activated 100% |
| 2   |          |           |        |        |        | |
| 3   |          |           |        |        |        | |
| 4   |          |           |        |        |        | |
| 5   |          |           |        |        |        | |
| 6   |          |           |        |        |        | |
| 7   |          |           |        |        |        | Gate check |

**Gate (Day 7)**: If ≤0.1% error rate across all 7 days → proceed to Step B (code changes).

---

## Step A rollback procedures

### Rollback to 66%
```bash
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=66/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

### Emergency pause (0%, flag stays on)
```bash
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=0/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

### Full rollback (disable flag)
```bash
sed -i 's/^EXECUTION_ENGINE_ENABLED=.*/EXECUTION_ENGINE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

---

## Step B — Code changes (after 7-day soak PASS)

Deploy `worker` after code changes below are merged:

| Change | File | Description |
|--------|------|-------------|
| Replace canary block | `execute-workflow.ts` | `ENABLED=true` → always delegate, no `isCanaryTarget()`; fail → 503 not monolith |
| Deprecate helpers | `execution-engine-client.ts` | `isCanaryTarget` / `CANARY_PERCENT` marked deprecated; still exported for tests |
| Tests | `execute-workflow-phase5.test.ts` | 202 on success, 503 on null, ENABLED=false → no delegation |

**Step B rollback**: `EXECUTION_ENGINE_ENABLED=false` + restart worker (no redeploy needed).  
**`EXECUTION_ENGINE_CANARY_PERCENT` is ignored once Step B is deployed** — the routing is unconditional when ENABLED=true.

### Step B server deploy

```bash
# On dev machine: push + merge PR
# Then on server:
cd /opt/ctrlchecks-worker
git pull --ff-only origin main
npm ci
NODE_OPTIONS="--max-old-space-size=4096" npm run build
mkdir -p dist/services/clickup && cp src/services/clickup/clickupNode.js dist/services/clickup/clickupNode.js
sudo systemctl restart ctrlchecks-worker
sleep 10 && curl -fsS http://localhost:3001/health
# Verify first execution after deploy hits engine
journalctl -u ctrlchecks-execution-engine -n 5
```

---

## Phase 6 — Executor code movement (after Step B stable)

- Move `dynamic-node-executor.ts` + `execution-job-runner.ts` into execution engine
- Remove `POST /api/internal/engine-execute` from worker
- Remove monolith fallback code entirely

See `docs/engineering/execution-engine-contract.md` Phase 6 section.
