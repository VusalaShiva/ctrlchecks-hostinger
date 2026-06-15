-- ============================================
-- DIAGNOSTIC QUERIES FOR TEMPLATES
-- ============================================
-- Run this to check why templates aren't showing in admin page
-- ============================================

-- Check if templates table exists
SELECT 
  EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'templates'
  ) as templates_table_exists;

-- Count total templates
SELECT COUNT(*) as total_templates FROM public.templates;

-- Count templates by created_by
SELECT 
  created_by,
  COUNT(*) as count
FROM public.templates
GROUP BY created_by
ORDER BY count DESC;

-- List all templates with details
SELECT 
  id,
  name,
  category,
  difficulty,
  is_active,
  is_featured,
  created_by,
  created_at,
  CASE 
    WHEN created_by IS NULL THEN '⚠️ NULL created_by'
    WHEN NOT EXISTS (
      SELECT 1 FROM auth.users WHERE id = created_by
    ) THEN '⚠️ Invalid user_id'
    ELSE '✅ Valid'
  END as status
FROM public.templates
ORDER BY created_at DESC
LIMIT 20;

-- Check admin users
SELECT 
  u.id,
  u.email,
  ur.role,
  COUNT(t.id) as templates_created
FROM auth.users u
LEFT JOIN public.user_roles ur ON ur.user_id = u.id AND ur.role = 'admin'
LEFT JOIN public.templates t ON t.created_by = u.id
WHERE ur.role = 'admin'
GROUP BY u.id, u.email, ur.role;

-- Check RLS policies on templates
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'templates'
ORDER BY policyname;

-- Check if RLS is enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'templates';

-- Test query that admin API would run
SELECT 
  id,
  name,
  description,
  category,
  difficulty,
  is_active,
  is_featured,
  created_by,
  created_at
FROM public.templates
ORDER BY created_at DESC
LIMIT 10;

-- Check for templates with NULL created_by (might be filtered by RLS)
SELECT 
  COUNT(*) as templates_with_null_created_by
FROM public.templates
WHERE created_by IS NULL;
