# Task 11E Complete — Workflow CRUD Service Migration

**Date completed:** 2026-06-15  
**Service:** `services/workflow-crud-service/` on port 3007 (127.0.0.1 only)  
**Contract:** `docs/engineering/workflow-crud-service-contract.md` v0.4

---

## What was built (all 4 phases)

### Phase 1 — Scaffold
- `services/workflow-crud-service/` — Express service on `:3007`
- All workflow routes return `501 WORKFLOW_CRUD_SERVICE_STUB`
- `worker/src/services/workflow-crud-service-client.ts` — FNV-1a canary, all remote methods return null
- Deploy: `scripts/deploy-workflow-crud-service.sh`, systemd unit, GitHub Actions workflow

### Phase 2 — Save / load / delete
- `src/lib/save-workflow.ts` — upsert into `workflows` table
- `src/lib/workflow-repo.ts` — owner-scoped SELECT/INSERT/UPDATE/DELETE
- Real routes: `POST /workflows`, `GET /workflows`, `GET /workflows/:id`, `DELETE /workflows/:id`
- Worker canary: `save-workflow.ts` (POST) + `DELETE /api/workflows/:id` in `index.ts`

### Phase 3 — Version history + rollback
- `src/lib/version-repo.ts` — `listVersions`, `getVersion`, `rollbackToVersion` (ownership-guarded)
- Real routes: `GET /workflows/:id/versions`, `POST /workflows/:id/versions/:version/rollback`
- Worker canary: `GET /api/workflows/:workflowId/versions` + rollback route

### Phase 4 — Templates + load/list canary + retirement gate
- `src/lib/templates-repo.ts` — `listTemplates`, `getTemplateById`
- New routes: `GET /templates` + `GET /templates/:id` (no auth scope — global read)
- Worker: `GET /api/workflows` + `GET /api/workflows/:id` added with canary
- Worker `templates.ts` proxy: tries service before Supabase fallback
- `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=false` gate in client + wired into save/delete/rollback

---

## Test counts

| Suite | Tests |
|-------|-------|
| `workflow-crud-service/src/tests/health.test.ts` | 4 |
| `workflow-crud-service/src/tests/auth.test.ts` | 4 |
| `workflow-crud-service/src/tests/workflows.test.ts` | 25 |
| `workflow-crud-service/src/tests/versions.test.ts` | 19 |
| `workflow-crud-service/src/tests/templates.test.ts` | 14 |
| `worker/src/services/tests/workflow-crud-service-client.test.ts` | 50+ |

---

## Env vars (worker)

| Var | Default | Purpose |
|-----|---------|---------|
| `WORKFLOW_CRUD_SERVICE_ENABLED` | `false` | Master switch |
| `WORKFLOW_CRUD_SERVICE_URL` | `http://localhost:3007` | Service base URL |
| `WORKFLOW_CRUD_SERVICE_KEY` | `` | Shared secret |
| `WORKFLOW_CRUD_SERVICE_CANARY_PERCENT` | `0` | % of userIds routed to service |
| `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED` | `false` | Phase 4 retirement gate |

---

## What waits on ops before retirement

| Gate | Condition |
|------|-----------|
| Phase 2 soak | `CANARY=100`, 7 days, zero regressions |
| Phase 3 soak | `CANARY=100`, 7 days, zero regressions |
| Phase 4 soak | `CANARY=100`, 14 days, zero regressions |
| Flip gate | Set `WORKFLOW_CRUD_LOCAL_WRITES_DISABLED=true` |
| Remove worker fallbacks | After gate has been true for ≥1 week |

---

## Rollback (any phase)

```bash
sed -i 's/^WORKFLOW_CRUD_SERVICE_ENABLED=.*/WORKFLOW_CRUD_SERVICE_ENABLED=false/' /opt/ctrlchecks-worker/.env
sudo systemctl restart ctrlchecks-worker
sleep 5 && curl -fsS http://localhost:3001/health
```

---

## Observability

```bash
# Service health
curl http://localhost:3007/health/live
curl http://localhost:3007/health/ready

# Delegation metrics (worker)
curl -s http://localhost:3001/metrics | grep workflow_crud_delegation

# Service metrics
curl -s http://localhost:3007/metrics | grep workflow_crud

# Logs
sudo journalctl -u ctrlchecks-workflow-crud-service -f
```

---

## Remaining work after ops soaks

1. **11D Phase 4** — Kafka + scheduler move (blocked on trigger canary soak)
2. **11A Phase 6** — Executor in engine (blocked on execution Phase 5 soak)
3. Say **"Generate production cutover prompt"** when all soaks pass
