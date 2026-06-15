-- Harden per-user credential connection lifecycle for AWS/RDS PostgreSQL.
-- One non-revoked connection is allowed per user + credential type.

ALTER TABLE public.connections
  ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS replaced_by_connection_id UUID,
  ADD COLUMN IF NOT EXISTS external_account_id TEXT,
  ADD COLUMN IF NOT EXISTS external_account_email TEXT;

-- Pick one canonical row per user + credential type and soft-archive the rest.
-- Priority: active usable token, active row, error row, expired row, then newest row.
WITH ranked_connections AS (
  SELECT
    id,
    FIRST_VALUE(id) OVER (
      PARTITION BY user_id, credential_type_id
      ORDER BY
        CASE
          WHEN status = 'active' AND (expires_at IS NULL OR expires_at > NOW()) THEN 0
          WHEN status = 'active' THEN 1
          WHEN status = 'error' THEN 2
          WHEN status = 'expired' THEN 3
          ELSE 4
        END,
        last_used_at DESC NULLS LAST,
        updated_at DESC NULLS LAST,
        created_at DESC NULLS LAST,
        id
    ) AS canonical_id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id, credential_type_id
      ORDER BY
        CASE
          WHEN status = 'active' AND (expires_at IS NULL OR expires_at > NOW()) THEN 0
          WHEN status = 'active' THEN 1
          WHEN status = 'error' THEN 2
          WHEN status = 'expired' THEN 3
          ELSE 4
        END,
        last_used_at DESC NULLS LAST,
        updated_at DESC NULLS LAST,
        created_at DESC NULLS LAST,
        id
    ) AS rank
  FROM public.connections
  WHERE status <> 'revoked'
)
UPDATE public.connections c
SET status = 'revoked',
    revoked_at = COALESCE(c.revoked_at, NOW()),
    replaced_by_connection_id = r.canonical_id,
    metadata = jsonb_set(
      COALESCE(c.metadata, '{}'::jsonb),
      '{archivedBy}',
      '"connection_lifecycle_migration"'::jsonb,
      true
    ),
    updated_at = NOW()
FROM ranked_connections r
WHERE c.id = r.id
  AND r.rank > 1;

-- Keep OAuth states safe before adding the FK.
UPDATE public.oauth_states os
SET connection_id = NULL
WHERE os.connection_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.connections c WHERE c.id = os.connection_id
  );

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'connections_replaced_by_connection_id_fkey'
      AND conrelid = 'public.connections'::regclass
  ) THEN
    ALTER TABLE public.connections
      ADD CONSTRAINT connections_replaced_by_connection_id_fkey
      FOREIGN KEY (replaced_by_connection_id)
      REFERENCES public.connections(id)
      ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'oauth_states_connection_id_fkey'
      AND conrelid = 'public.oauth_states'::regclass
  ) THEN
    ALTER TABLE public.oauth_states
      ADD CONSTRAINT oauth_states_connection_id_fkey
      FOREIGN KEY (connection_id)
      REFERENCES public.connections(id)
      ON DELETE SET NULL;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_connections_one_live_per_user_type
  ON public.connections(user_id, credential_type_id)
  WHERE status <> 'revoked';

CREATE INDEX IF NOT EXISTS idx_connections_user_live_type_updated
  ON public.connections(user_id, credential_type_id, updated_at DESC)
  WHERE status <> 'revoked';
