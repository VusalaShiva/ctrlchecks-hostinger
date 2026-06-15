# Task 11A Phase 4 — 66% Canary Soak Runbook

**Target duration**: 48 hours  
**Start**: Set `EXECUTION_ENGINE_CANARY_PERCENT=66` in worker env + restart worker  
**End gate**: ≤0.1% error rate on engine path over 48h window  

---

## Pre-flight checklist (before setting 66%)

- [ ] Phase 3 soak complete: `EXECUTION_ENGINE_ENABLED=true` has been running at 33% for ≥24h
- [ ] Engine consumer confirmed running: `systemctl is-active ctrlchecks-execution-engine`
- [ ] Recent logs show "completed" events: `journalctl -u ctrlchecks-execution-engine -n 50 | grep completed`
- [ ] No "failed" events in last hour: `journalctl -u ctrlchecks-execution-engine --since "1 hour ago" | grep '"event":"failed"'`
- [ ] Worker fallback confirmed working: 66% still goes to monolith if engine errors

---

## Activation (server commands)

```bash
ssh -i Guide/Worker/ctrlchecks-backend.pem ubuntu@3.7.115.58

# 1. Confirm current state
grep EXECUTION_ENGINE /opt/ctrlchecks-worker/.env

# 2. Bump canary to 66%
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=66/' /opt/ctrlchecks-worker/.env

# 3. Verify change
grep EXECUTION_ENGINE_CANARY_PERCENT /opt/ctrlchecks-worker/.env
# Expected: EXECUTION_ENGINE_CANARY_PERCENT=66

# 4. Restart worker only (engine unchanged)
sudo systemctl restart ctrlchecks-worker
sleep 5
sudo systemctl status ctrlchecks-worker | head -5

# 5. Spot-check: ~6–7 of 10 sequential executions should hit engine
journalctl -u ctrlchecks-execution-engine -f &
# Trigger 10 test executions via API, count "accepted" log lines
```

---

## Monitoring (run every few hours during 48h soak)

```bash
# Engine: accepted / completed / failed counts since activation
journalctl -u ctrlchecks-execution-engine --since "2026-06-XX 00:00" \
  | grep -oP '"event":"\K[^"]+' | sort | uniq -c

# Engine: any failed executions with error details
journalctl -u ctrlchecks-execution-engine \
  | grep '"event":"failed"' | tail -20

# Engine: average durationMs (last 100 completed)
journalctl -u ctrlchecks-execution-engine \
  | grep '"event":"completed"' | tail -100 \
  | grep -oP '"durationMs":\K[0-9]+' | awk '{s+=$1;n++} END {print "avg:", s/n, "ms over", n, "completions"}'

# Worker: canary fallback warnings (engine returned null)
journalctl -u ctrlchecks-worker | grep 'Canary' | tail -20

# Worker: engine error rate (canary fell back to monolith)
journalctl -u ctrlchecks-worker | grep 'Canary error\|engine returned null' | wc -l

# Redis: engine queue depth (should stay near 0 for healthy consumer)
redis-cli ZCARD workflow:execution:engine-queue
```

---

## Pass / Fail criteria

| Metric | Pass | Fail → action |
|--------|------|---------------|
| Engine `failed` events | ≤0.1% of `accepted` | Rollback to 33% (see below) |
| Engine `completed` events | ≥99.9% of `accepted` within 5 min | Investigate consumer; restart engine |
| Worker canary fallback rate | <5% of canary-routed requests | Check engine health endpoint |
| `workflow:execution:engine-queue` depth | <10 sustained | Consumer stuck; restart engine |
| Worker P95 response time | No regression vs baseline | Rollback to 33% if >20% increase |

---

## 48h soak log

Fill this in as the soak progresses:

| Time (UTC) | accepted | completed | failed | notes |
|------------|----------|-----------|--------|-------|
| T+0h       | —        | —         | —      | Activated 66% |
| T+6h       |          |           |        | |
| T+12h      |          |           |        | |
| T+24h      |          |           |        | |
| T+36h      |          |           |        | |
| T+48h      |          |           |        | Gate check |

**T+48h gate**: If pass → proceed to Phase 5 (`EXECUTION_ENGINE_CANARY_PERCENT=100`).  
If fail at any point → execute rollback below.

---

## Rollback procedures

### Rollback to 33% (keep engine running, reduce exposure)
```bash
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=33/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

### Emergency pause canary (0%, flag stays on, engine stays up)
```bash
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=0/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
```

### Full rollback (disable flag, 100% monolith)
```bash
sed -i 's/^EXECUTION_ENGINE_ENABLED=.*/EXECUTION_ENGINE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
# No engine redeploy needed — monolith handles everything
```

---

## After 48h pass → Phase 5

```bash
# Phase 5 activation
sed -i 's/^EXECUTION_ENGINE_CANARY_PERCENT=.*/EXECUTION_ENGINE_CANARY_PERCENT=100/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker

# Verify: all executions go to engine
journalctl -u ctrlchecks-execution-engine -f
# Should see "accepted" for every workflow execution
```

Phase 5 soak target: 1 week at 100% before removing the monolith fallback code.

---

## Related files

- `docs/engineering/execution-engine-contract.md` — architecture and phase plan
- `worker/src/services/execution-engine-client.ts` — `isCanaryTarget()` + `getCanaryPercent()`
- `worker/src/api/execute-workflow.ts` — canary block (lines ~18475–18510)
- `.claude/logs/PRODUCTION_READY_MICROSERVICES_PLAN.md` — Task 11 progress tracker
