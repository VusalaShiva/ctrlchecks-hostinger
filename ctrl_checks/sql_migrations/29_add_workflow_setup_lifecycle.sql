-- Hidden pending AI workflow setup lifecycle for AWS RDS PostgreSQL.
-- Existing workflows remain visible because setup_completed defaults to true.

ALTER TABLE public.workflows
  ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS setup_stage TEXT NOT NULL DEFAULT 'complete',
  ADD COLUMN IF NOT EXISTS setup_completed_at TIMESTAMPTZ;

UPDATE public.workflows
SET setup_completed = true,
    setup_stage = COALESCE(NULLIF(setup_stage, ''), 'complete'),
    setup_completed_at = COALESCE(setup_completed_at, updated_at, created_at, NOW())
WHERE setup_completed IS DISTINCT FROM false;

CREATE INDEX IF NOT EXISTS idx_workflows_setup_visibility
  ON public.workflows(user_id, setup_completed, updated_at DESC);
