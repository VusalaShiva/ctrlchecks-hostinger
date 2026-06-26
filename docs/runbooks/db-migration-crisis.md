# Runbook: DB Migration Crisis

**Use this when:** a Prisma migration has been applied in production and something went wrong — the schema is wrong, the app is erroring, or the migration is partially applied.

**Last updated:** 2026-06-26

---

## Scenario 1 — Migration ran cleanly but the app is broken

The migration completed with exit 0 but the new schema is causing errors (wrong column type, missing default, etc.).

### Steps

1. **Stop traffic** (optional but safer for data integrity):
   ```bash
   systemctl stop ctrlchecks-worker
   ```

2. **Connect to the database:**
   ```bash
   psql "$DATABASE_URL"
   ```

3. **Identify the change and revert it manually.** Examples:

   ```sql
   -- Undo adding a column
   ALTER TABLE "Workflow" DROP COLUMN IF EXISTS "new_field";

   -- Undo changing a column type
   ALTER TABLE "Execution" ALTER COLUMN "status" TYPE text;

   -- Undo creating a table
   DROP TABLE IF EXISTS "NewTable";

   -- Undo creating an index
   DROP INDEX IF EXISTS "idx_new_field";
   ```

4. **Mark the migration as rolled back in Prisma:**
   ```bash
   cd /opt/ctrlchecks-worker
   DIRECT_DATABASE_URL="$DATABASE_URL" bash scripts/rollback-migration.sh <migration_name>
   ```

   The migration name is the folder name under `prisma/migrations/`, e.g. `20240601120000_add_user_preferences`.

5. **Rollback to the previous code build:**
   ```bash
   TARGET=/opt/ctrlchecks-worker
   rm -rf "$TARGET/dist" && cp -a "$TARGET/dist.bak" "$TARGET/dist"
   ```

6. **Restart and verify:**
   ```bash
   systemctl restart ctrlchecks-worker
   sleep 8
   curl -si http://localhost:3001/health/live
   curl -si http://localhost:3001/health/ready
   ```

---

## Scenario 2 — Migration is stuck / partially applied

Prisma shows the migration as "failed" or the process was killed mid-migration.

### Steps

1. **Check migration status:**
   ```bash
   cd /opt/ctrlchecks-worker
   DATABASE_URL="$DATABASE_URL" npx prisma migrate status
   ```

2. **If the migration is listed as "failed":**
   - Manually check what SQL ran: look at `prisma/migrations/<name>/migration.sql`
   - Connect to DB and see what was applied: `\d <table_name>`
   - Revert any partial changes (see Scenario 1, Step 3)
   - Then mark as rolled back:
     ```bash
     DIRECT_DATABASE_URL="$DATABASE_URL" bash scripts/rollback-migration.sh <migration_name>
     ```

3. **If Prisma is blocked because the migration lock is held:**
   ```sql
   -- Find and kill the lock holder
   SELECT pid, query, state FROM pg_stat_activity WHERE wait_event_type = 'Lock';
   SELECT pg_terminate_backend(<pid>);
   ```

---

## Scenario 3 — Data was corrupted by the migration

The migration ran a destructive SQL operation (DROP COLUMN, UPDATE without WHERE, etc.) and data was lost.

### Steps

1. **Assess the damage:** how many rows affected? Which tables?

2. **Check for an RDS automated backup:** In the AWS RDS console, select the instance → Maintenance & backups → Automated backups. Restore to a point-in-time before the migration.

3. **If restoring the full DB is too destructive**, export only the affected table from the backup and merge:
   ```bash
   pg_dump --table="<affected_table>" --data-only "$BACKUP_DATABASE_URL" > affected_table.sql
   psql "$DATABASE_URL" < affected_table.sql
   ```

4. After data is restored, re-run `prisma migrate status` and resolve any inconsistency.

---

## Prevention Checklist (for future migrations)

Before merging any PR that includes a migration:

- [ ] Migration is additive (new columns/tables with defaults), not destructive
- [ ] If removing a column: deploy the code change first, then the migration (two-step)
- [ ] Rollback procedure documented in the PR description
- [ ] Migration tested against a copy of production data locally
- [ ] `prisma migrate status` checked post-deploy in staging before production

See [deploy.md](deploy.md) for the full deploy procedure including migration rollback script usage.
