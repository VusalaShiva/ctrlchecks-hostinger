# Runbook: Deploy & Rollback

**Service:** ctrlchecks-worker on `187.127.185.105` (`worker.ctrlchecks.com`)
**Last updated:** 2026-06-26

---

## Standard Deploy (CI — automatic)

Every push to `master` that changes `worker/**` triggers `.github/workflows/deploy-worker.yml`:

1. Quality gate: `tsc --noEmit` + `eslint`
2. `npm run build` in worker/ (produces `dist/`)
3. Packages `dist/ package.json package-lock.json prisma/ public/` into a tar
4. SCP tar to server via SSH key (`DEPLOY_SSH_KEY` GitHub secret)
5. Server-side: backup `dist/` → `dist.bak/`, extract, `npm ci --omit=dev`, `prisma migrate deploy`, `systemctl restart ctrlchecks-worker`
6. Health-check retry loop: 5 × 10 s waits for HTTP 200 on `/health/live`
7. On failure: auto-rollback restores `dist.bak/` and restarts

Monitor the run at: `https://github.com/VusalaShiva/ctrlchecks-hostinger/actions`

---

## Manual Deploy (local)

```bash
# From repo root — uses SSH key, no password needed
bash scripts/deploy-worker.sh
```

Or with a custom key path:
```bash
DEPLOY_KEY=/path/to/key bash scripts/deploy-worker.sh
```

---

## Manual Rollback to Previous Version

If the auto-rollback in CI did not trigger (e.g., deploy was manual):

```bash
ssh -i ~/.ssh/id_ed25519 root@187.127.185.105
```

```bash
TARGET=/opt/ctrlchecks-worker
if [ -d "$TARGET/dist.bak" ]; then
  rm -rf "$TARGET/dist"
  cp -a "$TARGET/dist.bak" "$TARGET/dist"
  systemctl restart ctrlchecks-worker
  sleep 8
  curl -si http://localhost:3001/health/live
fi
```

---

## Rollback a DB Migration

If a Prisma migration ran and must be reversed:

1. **Identify the migration name:**
   ```bash
   ls /opt/ctrlchecks-worker/prisma/migrations/
   ```

2. **Manually revert the SQL** (connect via `psql $DATABASE_URL`):
   - DROP the column, table, or index that was added
   - Or restore the old column type

3. **Mark the migration as rolled-back:**
   ```bash
   cd /opt/ctrlchecks-worker
   DIRECT_DATABASE_URL="$DATABASE_URL" bash scripts/rollback-migration.sh <migration_name>
   ```

4. **Verify:**
   ```bash
   npx prisma migrate status
   ```

See [db-migration-crisis.md](db-migration-crisis.md) if the migration is partially applied or the DB is in an inconsistent state.

---

## Health Checks

| Endpoint | Expected | Meaning |
|----------|----------|---------|
| `GET /health/live` | `{"status":"live"}` 200 | Process is up |
| `GET /health/ready` | `{"status":"ready"}` 200 | DB + Redis reachable |
| `GET /metrics` | Prometheus text | Metrics for scraping |

---

## Useful Commands on Server

```bash
# Service status
systemctl status ctrlchecks-worker

# Live logs (last 50 lines)
journalctl -u ctrlchecks-worker -n 50 --no-pager

# Follow logs
journalctl -u ctrlchecks-worker -f

# Restart
systemctl restart ctrlchecks-worker

# Check Node version
node --version

# Check dist build date
ls -la /opt/ctrlchecks-worker/dist/index.js
```
