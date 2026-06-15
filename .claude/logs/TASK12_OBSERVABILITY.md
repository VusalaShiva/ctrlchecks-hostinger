# Task 12 — Observability On-Call Runbook

**Completed:** 2026-06-12  
**Task:** Scale, Observability & Multi-Region Readiness  
**Stack:** 7 services (worker :3001, ai-generator :3002, execution-engine :3003, credential-service :3004, notification-service :3005, trigger-service :3006, workflow-crud-service :3007)

*(Updated 2026-06-15 — added workflow-crud-service :3007 smoke, systemd, rollback)*

---

## Dashboard links

| Dashboard | URL | Purpose |
|---|---|---|
| Service Overview | `http://localhost:3000/d/ctrlchecks-overview` | Request rate, 5xx, p95 latency per service |
| Executions & Queue | `http://localhost:3000/d/ctrlchecks-executions` | Queue depth, job success/fail, engine delegation |
| AI & Gemini | `http://localhost:3000/d/ctrlchecks-ai` | AI generation rate, active requests, DB pool |

*(Replace `localhost:3000` with your Grafana instance URL after deployment.)*

---

## Alert meanings

| Alert | Meaning | First action |
|---|---|---|
| `queue_depth > 100` for 5m | Workers are slower than producers; backpressure building | Check worker CPU/memory; check DB latency |
| `queue_depth > 200` for 2m | Critical backpressure; users may see delayed executions | Restart stalled worker processes; check Redis connectivity |
| `5xx_rate > 1%` for 5m | Handler errors increasing | Check logs: `journalctl -u ctrlchecks-worker -p err -n 100` |
| `execution_engine down` 1m | Engine process crashed or unreachable | `sudo systemctl status ctrlchecks-execution-engine`; restart if crashed |
| `trigger_service down` 1m | Trigger delegation failing; worker fallback active | `sudo systemctl status ctrlchecks-trigger-service`; rollback if unrecoverable |
| `ai_generator down` 2m | AI generation falling back to worker monolith | Not user-impacting (fallback active); restart service |
| `db_pool > 80%` sustained | Connection saturation; requests may queue | Check PgBouncer; check for slow/stuck queries |
| `process_uptime == 0` any service | Service just restarted | Check for OOM or crash loop; inspect logs |

---

## Smoke commands — per service health probe

```bash
# Quick all-services smoke (run from EC2 host)
curl -fsS http://localhost:3001/health | jq .
curl -fsS http://localhost:3002/health | jq .
curl -fsS http://localhost:3003/health/ready | jq .
curl -fsS http://localhost:3004/health/ready | jq .
curl -fsS http://localhost:3005/health/ready | jq .
curl -fsS http://localhost:3006/health/ready | jq .
curl -fsS http://localhost:3007/health/ready | jq .

# Metrics smoke — each returns Prometheus text
curl -s http://localhost:3001/metrics | head -5
curl -s http://localhost:3002/metrics | head -5
curl -s http://localhost:3003/metrics | head -5
curl -s http://localhost:3004/metrics | head -5
curl -s http://localhost:3005/metrics | head -5
curl -s http://localhost:3006/metrics | head -5
curl -s http://localhost:3007/metrics | head -5

# Systemd status — all 7 services
sudo systemctl status ctrlchecks-worker ctrlchecks-ai-generator \
  ctrlchecks-execution-engine ctrlchecks-credential-service \
  ctrlchecks-notification-service ctrlchecks-trigger-service \
  ctrlchecks-workflow-crud-service --no-pager
```

---

## Rollback procedures

### Worker (fast rollback — no deploy needed)
```bash
# Disable any canary delegation to microservices
sed -i 's/^TRIGGER_SERVICE_ENABLED=.*/TRIGGER_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sed -i 's/^NOTIFICATION_SERVICE_ENABLED=.*/NOTIFICATION_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sed -i 's/^CREDENTIAL_SERVICE_ENABLED=.*/CREDENTIAL_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sed -i 's/^EXECUTION_ENGINE_ENABLED=.*/EXECUTION_ENGINE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sed -i 's/^WORKFLOW_CRUD_SERVICE_ENABLED=.*/WORKFLOW_CRUD_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
sleep 5 && curl -fsS http://localhost:3001/health
```

### Per-service rollback (see contract docs for canary rollback)

- **Credential service** — see `TASK11B_COMPLETE.md` → "Rollback" section
- **Notification service** — see `TASK11C_COMPLETE.md` → "Rollback" section
- **Execution engine** — set `EXECUTION_ENGINE_ENABLED=false` in worker `.env` + restart worker
- **Trigger service** — set `TRIGGER_SERVICE_ENABLED=false` in worker `.env` + restart worker
- **Workflow CRUD service** — set `WORKFLOW_CRUD_SERVICE_ENABLED=false` in worker `.env` + restart worker (see `TASK11E_COMPLETE.md` → "Rollback" section)

### Code rollback (bad deploy)
```bash
cd /opt/ctrlchecks-worker
git log --oneline -5           # find last good commit
git reset --hard <good-sha>    # !! destructive — only for emergencies
npm ci && NODE_OPTIONS="--max-old-space-size=4096" npm run build
sudo systemctl restart ctrlchecks-worker
```

---

## Incident triage flowchart

```
User reports: execution not completing / UI spinning
  │
  ├─► Check queue depth: curl http://localhost:3001/metrics | grep queue_depth
  │     > 200 ──► Queue backlog (see Queue backlog procedure)
  │     < 50  ──► Not a queue issue
  │
  ├─► Check worker 5xx: curl http://localhost:3001/metrics | grep 'status="5'
  │     Rising ──► Worker errors (check logs below)
  │
  ├─► Check DB: curl http://localhost:3001/health | jq .checks.db
  │     error ──► DB connectivity issue (see DB procedure)
  │     ok    ──► DB fine
  │
  ├─► Check Redis: curl http://localhost:3001/health | jq .checks.redis
  │     error ──► Redis down (executions won't queue, WS bridge broken)
  │
  └─► Check execution-engine: curl http://localhost:3003/health/ready
        degraded ──► Engine unhealthy → set EXECUTION_ENGINE_ENABLED=false + restart worker

---

User reports: email notifications not received
  │
  ├─► Check notification-service ready: curl http://localhost:3005/health/ready | jq .checks.ses
  │     skip ──► SES_FROM_EMAIL not configured (env issue)
  │     error ──► SES unreachable or over quota (check AWS SES dashboard)
  │
  └─► Check delivery counter: curl http://localhost:3005/metrics | grep notification_delivery_total
        all 0 ──► Delegation not reaching service; check NOTIFICATION_SERVICE_ENABLED

---

User reports: webhook/form/chat trigger not firing
  │
  ├─► Check trigger-service: curl http://localhost:3006/health/ready | jq .checks.db
  │     error ──► DB unavailable → trigger-service in degraded state
  │
  ├─► Check worker delegation: curl http://localhost:3001/metrics | grep trigger_service_delegation
  │     all 'error' ──► trigger-service unreachable → check systemd status
  │
  └─► Instant rollback: set TRIGGER_SERVICE_ENABLED=false in worker .env + restart
```

---

## Reading JSON logs

```bash
# All errors across all services (last 1 hour)
sudo journalctl --since "1 hour ago" | grep '"level":"error"' | \
  python3 -c "import sys,json; [print(json.dumps(json.loads(l), indent=2)) for l in sys.stdin if l.strip()]" | head -100

# Errors for a specific service
sudo journalctl -u ctrlchecks-worker --since "1 hour ago" | grep '"level":"error"'

# Trace a specific request by requestId
REQUEST_ID="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
sudo journalctl --since "1 hour ago" | grep "$REQUEST_ID"

# Slow requests (durationMs > 5000) in notification-service
sudo journalctl -u ctrlchecks-notification-service --since "1 hour ago" | \
  python3 -c "
import sys, json
for line in sys.stdin:
    try:
        obj = json.loads(line.strip())
        if obj.get('durationMs', 0) > 5000:
            print(json.dumps(obj))
    except: pass
"

# Count requests by status code per service
sudo journalctl --since "1 hour ago" | \
  python3 -c "
import sys, json, collections
counts = collections.defaultdict(int)
for line in sys.stdin:
    try:
        obj = json.loads(line.strip())
        if 'status' in obj:
            counts[f\"{obj.get('service','?')} {obj['status']}\"] += 1
    except: pass
for k,v in sorted(counts.items()): print(f'{v:6d}  {k}')
"
```

---

## Queue backlog procedure

```bash
# 1. Check current depth
curl -s http://localhost:3001/metrics | grep execution_queue_depth

# 2. Check for stuck executions (running > 10 min)
# Connect to DB via psql or Prisma Studio
# SELECT id, workflow_id, started_at, EXTRACT(EPOCH FROM (now()-started_at))/60 as minutes
# FROM executions WHERE status='running' AND started_at < now() - INTERVAL '10 minutes';

# 3. If stuck execution is blocking — force-fail it:
# UPDATE executions SET status='failed', error='force-failed by ops' WHERE id='<stuck-id>';

# 4. If queue is healthy but deep — temporarily scale up workers:
# Edit worker .env: MAX_CONCURRENT_JOBS=10 (default is typically 3-5)
sudo systemctl restart ctrlchecks-worker
```

---

## What was implemented in Task 12

### Code changes
- `src/lib/metrics.ts` — added to all 5 microservices (zero-dep Prometheus text format)
- JSON structured logging — upgraded in all 5 microservice `index.ts` files
- `GET /metrics` public endpoint — added to all 5 microservices
- `worker/src/middleware/highScaleMetrics.ts` — added 7 new metrics + helpers:
  - `ctrlchecks_execution_queue_depth` (gauge)
  - `ctrlchecks_execution_jobs_total{status}` (counter)
  - `ctrlchecks_ws_redis_bridge_active` (gauge)
  - `ctrlchecks_credential_service_delegation_total{result}` (counter)
  - `ctrlchecks_notification_service_delegation_total{result}` (counter)
  - `ctrlchecks_execution_engine_delegation_total{result}` (counter)
  - `ctrlchecks_trigger_service_delegation_total{result}` (counter)
- Worker service clients wired: `execution-engine-client.ts`, `credential-service-client.ts`, `notification-service-client.ts`, `trigger-service-client.ts`
- Metrics tests: 4 tests per service × 5 services = 20 new tests; new `health.test.ts` for ai-generator

### Infrastructure files
- `infra/prometheus/prometheus.yml` — scrape config for all 6 services
- `infra/grafana/dashboards/ctrlchecks-overview.json`
- `infra/grafana/dashboards/ctrlchecks-executions.json`
- `infra/grafana/dashboards/ctrlchecks-ai.json`

### Documentation
- `docs/engineering/grafana-setup.md`
- `docs/engineering/centralized-logging.md`
- `docs/engineering/multi-region-readiness.md`
- `.claude/logs/TASK12_OBSERVABILITY.md` (this file)

---

## Related runbooks

- `docs/runbooks/database-restore.md` — RDS restore procedure
- `docs/runbooks/dlq-replay.md` — Dead-letter queue replay
- `.claude/logs/TASK11B_COMPLETE.md` — Credential service rollback
- `.claude/logs/TASK11C_COMPLETE.md` — Notification service rollback
- `.claude/logs/TASK11A_PHASE4_SOAK.md` — Execution engine canary soak
- `docs/engineering/execution-engine-contract.md` — Engine phases + rollback
- `docs/engineering/trigger-service-contract.md` — Trigger service phases + rollback
