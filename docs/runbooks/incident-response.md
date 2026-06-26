# Runbook: Incident Response

**Service:** `worker.ctrlchecks.com` | `187.127.185.105`
**Last updated:** 2026-06-26

---

## Severity Levels

| Level | Definition | Response time |
|-------|-----------|---------------|
| P1 | Service down / all users affected | Immediate |
| P2 | Degraded — partial outage or elevated error rate | < 30 min |
| P3 | Single feature broken, workaround exists | < 4 hours |

---

## Triage Checklist

### Step 1 — Confirm the incident

```bash
# From your machine:
curl -si https://worker.ctrlchecks.com/health/live
curl -si https://worker.ctrlchecks.com/health/ready
```

- `200 live` but not `200 ready` → DB or Redis issue (go to Step 3)
- `000` or `502` → process is down (go to Step 2)
- Both healthy but users report errors → application-level bug (go to Step 4)

### Step 2 — Process is down

```bash
ssh -i ~/.ssh/id_ed25519 root@187.127.185.105

systemctl status ctrlchecks-worker
journalctl -u ctrlchecks-worker -n 100 --no-pager
```

**If crashed:** look for OOM, uncaught exception, or missing env var in logs.

```bash
# Restart
systemctl restart ctrlchecks-worker
sleep 8
curl -si http://localhost:3001/health/live
```

**If restart fails repeatedly:** the new build may be broken — rollback:
```bash
TARGET=/opt/ctrlchecks-worker
rm -rf "$TARGET/dist" && cp -a "$TARGET/dist.bak" "$TARGET/dist"
systemctl restart ctrlchecks-worker
```

### Step 3 — DB or Redis unreachable

```bash
# From server:
psql "$DATABASE_URL" -c "SELECT 1"
redis-cli -u "$REDIS_URL" ping
```

- **DB down:** Check AWS RDS console. If it's a connection limit issue: `SELECT count(*) FROM pg_stat_activity;`
- **Redis down:** Restart Redis or check the Redis host. Worker degrades gracefully (rate limiting disabled).
- **Connection pool exhausted:** `curl http://localhost:3001/metrics | grep db_pool`

### Step 4 — Application-level errors

```bash
# Tail structured logs
journalctl -u ctrlchecks-worker -f --output=json | jq '{time: .SYSLOG_TIMESTAMP, msg: .MESSAGE}'
```

- Look for `"level":"error"` or `"level":"warn"` lines with a `requestId` field
- Cross-reference with Sentry: errors are tagged with `nodeType`, `nodeId`, `workflowId`
- Check `/metrics` for elevated `ctrlchecks_http_requests_total{status="5xx"}` count

---

## Common Failure Modes

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `/health/ready` returns 503 | DB or Redis down | Check RDS/Redis, see Step 3 |
| Workflow generation times out | Gemini API rate limit or latency | Check Gemini quota in GCP console |
| `429` responses from worker | Per-user rate limit hit | Normal — no action unless sustained |
| Credential errors in execution | OAuth token expired | User must reconnect in `/connections` |
| `502 Bad Gateway` from nginx | Worker process down | Restart worker, see Step 2 |
| Circuit breaker OPEN logs | Microservice down | Check relevant service, set canary `=0` env var |

---

## Escalation

If the incident is not resolved within 30 minutes:

1. Check GitHub Actions for a recent bad deploy — revert if necessary
2. Check AWS RDS instance health in the AWS console
3. If all else fails: SSH to the server, copy logs, restore `dist.bak/`, and file a post-mortem

---

## Post-Mortem Template

After every P1/P2 incident, document:

- **Timeline:** When was it detected, when resolved?
- **Root cause:** What actually failed?
- **Impact:** How many users/workflows affected?
- **Detection:** How was it found (alert, user report, monitoring)?
- **Fix:** What resolved it?
- **Prevention:** What change would prevent recurrence?
