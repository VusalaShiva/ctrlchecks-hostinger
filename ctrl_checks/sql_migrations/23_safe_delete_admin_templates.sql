-- ============================================
-- SAFE DELETION OF ADMIN-CREATED TEMPLATES
-- ============================================
-- This script safely removes ONLY admin-created templates
-- while preserving user-created workflows
-- 
-- IMPORTANT: Review all SELECT queries before running DELETE statements
-- Run this in a transaction and verify results before committing
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: IDENTIFY ADMIN USERS
-- ============================================
-- First, let's see which users have admin role

SELECT 
  u.id as admin_user_id,
  u.email as admin_email,
  ur.role,
  ur.created_at as role_created_at
FROM auth.users u
JOIN public.user_roles ur ON ur.user_id = u.id
WHERE ur.role = 'admin'
ORDER BY ur.created_at;

-- ============================================
-- STEP 2: BACKUP QUERIES - Review Before Deletion
-- ============================================
-- These queries show what will be deleted. REVIEW CAREFULLY!

-- 2.1: Count admin-created templates
SELECT 
  COUNT(*) as total_admin_templates,
  COUNT(DISTINCT created_by) as unique_admin_creators
FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
);

-- 2.2: List all admin-created templates with details
SELECT 
  t.id,
  t.name,
  t.category,
  t.difficulty,
  t.is_active,
  t.use_count,
  t.created_by,
  u.email as created_by_email,
  t.created_at,
  t.updated_at
FROM public.templates t
LEFT JOIN auth.users u ON u.id = t.created_by
WHERE t.created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
)
ORDER BY t.created_at DESC;

-- 2.3: Count workflows that reference these templates
SELECT 
  COUNT(*) as workflows_from_admin_templates,
  COUNT(DISTINCT w.user_id) as unique_users_affected
FROM public.workflows w
WHERE w.template_id IN (
  SELECT id FROM public.templates
  WHERE created_by IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

-- 2.4: List workflows that reference admin templates (these will NOT be deleted)
SELECT 
  w.id as workflow_id,
  w.name as workflow_name,
  w.user_id as workflow_owner_id,
  u.email as workflow_owner_email,
  w.template_id,
  t.name as template_name,
  w.source,
  w.created_at as workflow_created_at
FROM public.workflows w
LEFT JOIN auth.users u ON u.id = w.user_id
LEFT JOIN public.templates t ON t.id = w.template_id
WHERE w.template_id IN (
  SELECT id FROM public.templates
  WHERE created_by IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
)
ORDER BY w.created_at DESC;

-- 2.5: Count execution logs for workflows from admin templates
SELECT 
  COUNT(*) as execution_logs_count
FROM public.executions e
WHERE e.workflow_id IN (
  SELECT id FROM public.workflows
  WHERE template_id IN (
    SELECT id FROM public.templates
    WHERE created_by IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  )
);

-- 2.6: Count workflow versions for workflows from admin templates
SELECT 
  COUNT(*) as workflow_versions_count
FROM public.workflow_versions wv
WHERE wv.workflow_id IN (
  SELECT id FROM public.workflows
  WHERE template_id IN (
    SELECT id FROM public.templates
    WHERE created_by IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  )
);

-- ============================================
-- STEP 3: VERIFY USER-CREATED WORKFLOWS ARE SAFE
-- ============================================
-- These workflows should NOT be deleted (they are user-created)

SELECT 
  COUNT(*) as user_created_workflows_count
FROM public.workflows
WHERE source = 'custom' 
  OR template_id IS NULL
  OR template_id NOT IN (
    SELECT id FROM public.templates
    WHERE created_by IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- List user-created workflows (should remain untouched)
SELECT 
  w.id,
  w.name,
  w.user_id,
  u.email as owner_email,
  w.source,
  w.template_id,
  w.status,
  w.created_at
FROM public.workflows w
LEFT JOIN auth.users u ON u.id = w.user_id
WHERE w.source = 'custom' 
  OR w.template_id IS NULL
  OR w.template_id NOT IN (
    SELECT id FROM public.templates
    WHERE created_by IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  )
ORDER BY w.created_at DESC
LIMIT 50;  -- Show first 50 for verification

-- ============================================
-- STEP 4: SAFE DELETION (Run only after reviewing above)
-- ============================================
-- WARNING: This will permanently delete admin-created templates
-- User workflows that were created from these templates will remain,
-- but the template reference will be set to NULL

-- 4.1: Update workflows to remove template references (safe operation)
-- This preserves user workflows but removes the link to deleted templates
UPDATE public.workflows
SET 
  template_id = NULL,
  source = 'custom',
  template_version = NULL
WHERE template_id IN (
  SELECT id FROM public.templates
  WHERE created_by IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

-- 4.2: Delete admin-created templates
-- This will cascade delete any related data if foreign keys are set up
DELETE FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
);

-- ============================================
-- STEP 5: VERIFICATION AFTER DELETION
-- ============================================
-- Run these to verify deletion was successful

-- 5.1: Verify no admin templates remain
SELECT 
  COUNT(*) as remaining_admin_templates
FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
);

-- 5.2: Verify user workflows are intact
SELECT 
  COUNT(*) as total_user_workflows,
  COUNT(CASE WHEN source = 'custom' THEN 1 END) as custom_workflows,
  COUNT(CASE WHEN template_id IS NULL THEN 1 END) as workflows_without_template
FROM public.workflows;

-- ============================================
-- ROLLBACK INSTRUCTIONS
-- ============================================
-- If something goes wrong, run: ROLLBACK;
-- If everything looks good, run: COMMIT;
-- 
-- To review what will be deleted without committing:
-- 1. Run all SELECT queries in STEP 2
-- 2. Review the results carefully
-- 3. If satisfied, run the DELETE statements
-- 4. Run verification queries in STEP 5
-- 5. If everything looks good, COMMIT; otherwise ROLLBACK;

-- ============================================
-- COMMIT OR ROLLBACK
-- ============================================
-- Uncomment one of the following:

-- COMMIT;  -- Makes changes permanent
-- ROLLBACK;  -- Reverts all changes
