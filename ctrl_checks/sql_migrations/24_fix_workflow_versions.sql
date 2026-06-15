-- ============================================
-- QUICK FIX: Update workflow_versions table structure
-- ============================================
-- This script fixes the workflow_versions table if it has the old structure
-- Run this if you get: "column nodes_snapshot does not exist"
-- ============================================

BEGIN;

-- Check if old workflow_versions table exists with old structure
DO $$
BEGIN
  -- If table exists and has 'nodes' column (old structure)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'workflow_versions' 
    AND column_name = 'nodes'
  ) THEN
    RAISE NOTICE 'Old workflow_versions table detected. Dropping and recreating with new structure...';
    
    -- Drop the old table (this will also drop any foreign key constraints)
    DROP TABLE IF EXISTS public.workflow_versions CASCADE;
    
    RAISE NOTICE 'Old table dropped. Please run 24_new_workflow_schema.sql to recreate with new structure.';
  ELSIF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'workflow_versions'
  ) THEN
    -- Table exists but might be missing columns
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'workflow_versions' 
      AND column_name = 'nodes_snapshot'
    ) THEN
      RAISE NOTICE 'workflow_versions table exists but missing nodes_snapshot column. Dropping and recreating...';
      DROP TABLE IF EXISTS public.workflow_versions CASCADE;
    END IF;
  END IF;
END $$;

-- Now recreate the table with correct structure
-- (This will only create if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.workflow_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows_new(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL,
  name TEXT,  -- Version name/tag (e.g., 'v1.0', 'Production')
  description TEXT,  -- Version description/changelog
  nodes_snapshot JSONB NOT NULL,  -- Snapshot of all nodes at this version
  edges_snapshot JSONB NOT NULL,  -- Snapshot of all edges at this version
  inputs_snapshot JSONB,  -- Snapshot of all inputs at this version
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT workflow_versions_unique_version UNIQUE (workflow_id, version),
  CONSTRAINT workflow_versions_version_positive CHECK (version > 0)
);

-- Add comments
COMMENT ON TABLE public.workflow_versions IS 'Version history for workflows with full snapshots';
COMMENT ON COLUMN public.workflow_versions.nodes_snapshot IS 'JSONB array of all nodes at this version';
COMMENT ON COLUMN public.workflow_versions.edges_snapshot IS 'JSONB array of all edges at this version';

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow_id ON public.workflow_versions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow_version ON public.workflow_versions(workflow_id, version DESC);

-- Re-enable RLS
ALTER TABLE public.workflow_versions ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policy
DROP POLICY IF EXISTS "Users can manage versions of own workflows" ON public.workflow_versions;
CREATE POLICY "Users can manage versions of own workflows" ON public.workflow_versions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.workflows_new w
      WHERE w.id = workflow_id AND w.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workflows_new w
      WHERE w.id = workflow_id AND w.created_by = auth.uid()
    )
  );

COMMIT;
