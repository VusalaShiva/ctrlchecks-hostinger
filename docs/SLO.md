# CtrlChecks Service Level Objectives (SLOs)

**Service:** `worker.ctrlchecks.com` (Hostinger KVM4, `187.127.185.105`)
**Effective date:** 2026-06-26
**Status:** Aspirational — not yet enforced by alerting. See Phase 6 of the upgrade roadmap.

---

## SLO Definitions

| SLO | Target | Window | Measurement |
|-----|--------|--------|-------------|
| API response latency | p99 < 500 ms | 30-day rolling | `ctrlchecks_http_request_duration_seconds` histogram (Prometheus `/metrics`) |
| Workflow execution latency | p95 < 30 s | 30-day rolling | Execution job duration from `POST /api/execute-workflow` to final status |
| Error rate | < 1 % of all requests | 7-day rolling | HTTP 5xx responses / total requests (`ctrlchecks_http_requests_total`) |
| Availability | 99.5 % | 30-day rolling | `/health/live` reachable from external probe |

---

## Critical Paths

These paths are latency-sensitive and must not regress:

| Path | p99 budget | Notes |
|------|-----------|-------|
| `POST /api/generate-workflow` | 15 s | Gemini LLM call — budget dominated by model latency |
| `POST /api/execute-workflow` | 500 ms | Queues job; does not wait for completion |
| `GET /api/workflows` | 200 ms | DB read — indexed by `user_id` |
| `GET /health/live` | 50 ms | Should never hit DB or Redis |
| `GET /health/ready` | 200 ms | Checks DB + Redis reachability |

---

## Error Budget

At 99.5 % availability over a 30-day window:

- **Total minutes in window:** 43,200
- **Allowed downtime:** 216 minutes (~3.6 hours)
- **Burn rate alert:** Page if error budget burns at > 5× rate (> 1 % error rate sustained for > 5 min)

---

## Metrics Sources

| Metric | Source |
|--------|--------|
| HTTP latency + error rate | `GET /metrics` — `ctrlchecks_http_request_duration_seconds`, `ctrlchecks_http_requests_total` |
| Node execution latency | Sentry performance spans — `op: node.execute`, `name: node.<nodeType>` |
| DB pool saturation | `ctrlchecks_db_pool_utilization_percent`, `ctrlchecks_db_pool_waiting_connections` |
| Queue depth | `ctrlchecks_execution_queue_depth` |
| Microservice delegation | `ctrlchecks_execution_engine_delegation_total{result="error"}` |

---

## Enforcement Roadmap

- **Now:** Metrics exported at `/metrics` (Prometheus); Sentry spans on node execution.
- **Phase 6 (next):** Scrape `/metrics` with CloudWatch or Datadog; set alert thresholds above.
- **Phase 7 (future):** SLO compliance dashboard; automatic PagerDuty/OpsGenie escalation on breach.

---

## Incident Response

See [docs/runbooks/incident-response.md](runbooks/incident-response.md) for the triage checklist when an SLO is breached.
