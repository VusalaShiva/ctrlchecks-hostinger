# Task 9 — Infrastructure Audit Results

**Audited**: 2026-06-10 via SSH to `ubuntu@3.7.115.58`

---

## Port Audit

| Service | Port | Status | Notes |
|---|---|---|---|
| Redis | 6379 | ✅ RUNNING | `127.0.0.1:6379` + `[::1]:6379` — local only, no external exposure |
| PostgreSQL | 5432 | ❌ NOT LOCAL | Hosted on AWS RDS — connection via `DATABASE_URL` |
| PgBouncer | 6432 | ❌ NOT INSTALLED | `systemctl is-active pgbouncer` → inactive/not installed |
| Kafka | 9092 | ❌ NOT RUNNING | Code supports it; not deployed on this server |

---

## PgBouncer Decision: DEFER

**Finding**: PgBouncer is not installed on the EC2 server.

**Decision**: Do not install at current scale. Reasons:
- Worker pool max = 10 connections (RDS `max_connections` default is 100 for db.t3.micro)
- Single EC2 instance — no need for connection multiplexing yet
- Installing PgBouncer adds ops complexity (two connection strings, session vs transaction mode choice)

**Threshold to revisit**: When deploying a second EC2 instance OR when RDS `pg_stat_activity` regularly shows > 80 connections.

**Code change made**: `db-pool.ts` now reads `PGBOUNCER_URL || DATABASE_URL` so enabling PgBouncer in future requires only setting `PGBOUNCER_URL=postgresql://localhost:6432/db` in `.env` — no code change needed.

**IMPORTANT if PgBouncer is added in future**:
- Use **session mode** (not transaction mode) because `queryAsUser()` issues `SET LOCAL` commands
- Remove `statement_timeout` from pool config if using transaction mode
- Use `DIRECT_DATABASE_URL` for Prisma migrations (bypasses PgBouncer always)

---

## Database Connection

**Current URL pattern**: `postgresql://<user>:<pass>@ctrlchecks-db.cxm8gymyysvy.ap-south-1.rds.amazonaws.com:5432/ctrlchecks`

**DIRECT_DATABASE_URL**: Not set on server (same as DATABASE_URL since no PgBouncer). Prisma `migrate:deploy` falls back to `DATABASE_URL` automatically via `package.json` script.

**RDS instance**: `ctrlchecks-db` in `ap-south-1`

---

## Redis

**Status**: Running locally on `127.0.0.1:6379`. Not exposed externally.

**Client**: `ioredis` in `shared/redis-client.ts`

**Reconnect behaviour** (existing):
- `retryStrategy: (times) => Math.min(times * 50, 2000)` — exponential backoff up to 2s
- `maxRetriesPerRequest: 3`

**Improvement made**: Added `reconnectOnError` to handle TCP socket resets (ECONNRESET).

**Persistence**: Redis is running with default config — data is in-memory only. Not a concern for the current use case (caching, rate limiting, pub/sub) — nothing critical requires Redis persistence.

---

## Kafka

**Status**: NOT running. Port 9092 not listening.

**Code**: Worker has Kafka consumer/producer code but uses Redis as primary queue via `execution-queue.ts`. Kafka is future infrastructure — no action needed for Task 9.

---

## Migrations

**Prisma `migrate deploy` script**: Already exists in `worker/package.json`:
```json
"prisma:migrate:deploy": "DATABASE_URL=${DIRECT_DATABASE_URL:-$DATABASE_URL} prisma migrate deploy"
```

**Added to `deploy-worker.yml`**: Migration step runs before `systemctl restart` in deploy workflow.

**Migration files**: 5 migrations exist in `worker/prisma/migrations/`

---

## Action Items Summary

| Item | Status | File changed |
|---|---|---|
| db-pool.ts PGBOUNCER_URL fallback | ✅ Done | `worker/src/core/database/db-pool.ts` |
| Unit test for PGBOUNCER_URL fallback | ✅ Done | `worker/src/core/database/__tests__/db-pool-pgbouncer.test.ts` |
| /health/ready: real SELECT 1 DB check | ✅ Done | `worker/src/index.ts` |
| /health/ready: Redis uses shared client | ✅ Done | `worker/src/index.ts` |
| prisma migrate deploy in deploy-worker.yml | ✅ Done | `.github/workflows/deploy-worker.yml` |
| dlq-replay.md runbook | ✅ Done | `docs/runbooks/dlq-replay.md` |
| verify-rds-backup.sh script | ✅ Done | `scripts/verify-rds-backup.sh` |
| database-restore.md runbook | ✅ Done | `docs/runbooks/database-restore.md` |
| Redis reconnectOnError improvement | ✅ Done | `worker/src/shared/redis-client.ts` |
| PgBouncer install | ⏭ DEFERRED | Current scale does not require it |
