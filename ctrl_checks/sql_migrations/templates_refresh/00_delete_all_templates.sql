-- =============================================================================
-- TEMPLATE REFRESH — STEP 0: REMOVE EXISTING TEMPLATES (SAFE FOR USER WORKFLOWS)
-- =============================================================================
-- public.workflows.template_id references public.templates(id) ON DELETE SET NULL
-- in schema (01_database_setup.sql). We still explicitly null out links and set
-- source = 'custom' so UI/analytics stay consistent after template rows are gone.
--
-- ORDER:
--   1) Run this file (review in a transaction first if you prefer).
--   2) Run seed batches 01–10 (or regenerate via scripts/generate-workflow-templates-sql.ts).
--
-- To preview only: comment out DELETE and COMMIT; run SELECT count(*) after UPDATE.
-- =============================================================================

BEGIN;

-- Break parent link from any workflow copies (preserves workflow rows).
UPDATE public.workflows
SET
  template_id = NULL,
  source = 'custom',
  template_version = NULL
WHERE template_id IS NOT NULL;

-- Remove all catalog templates (single-table delete; no dependent child table).
DELETE FROM public.templates;

COMMIT;

-- Verification (run after commit):
-- SELECT COUNT(*) AS templates_remaining FROM public.templates;
-- SELECT COUNT(*) AS workflows_still_linked FROM public.workflows WHERE template_id IS NOT NULL;
