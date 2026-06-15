-- ============================================
-- NEW PRODUCTION-READY WORKFLOW SYSTEM SCHEMA
-- ============================================
-- This script creates a clean, structured workflow system with:
-- - Difficulty level categorization (medium, intermediate, hard)
-- - Structured input fields
-- - Node and edge management
-- - Version control
-- - Execution logging
-- 
-- Run this AFTER safely deleting old admin templates
-- 
-- WARNING: This script will DROP the old workflow_versions table
-- if it exists (from the old schema). The old table references the
-- old workflows table, so it needs to be recreated for the new schema.
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: CREATE ENUM TYPES
-- ============================================

-- Workflow difficulty levels
DO $$ BEGIN
  CREATE TYPE public.workflow_difficulty AS ENUM ('medium', 'intermediate', 'hard');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Workflow status (reuse existing if available, otherwise create)
DO $$ BEGIN
  CREATE TYPE public.workflow_status_new AS ENUM ('draft', 'active', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Input field types
DO $$ BEGIN
  CREATE TYPE public.input_field_type AS ENUM ('text', 'number', 'boolean', 'select', 'file');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- STEP 2: CREATE WORKFLOWS TABLE
-- ============================================
-- Main workflows table with difficulty level support

CREATE TABLE IF NOT EXISTS public.workflows_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  difficulty_level public.workflow_difficulty NOT NULL,
  status public.workflow_status_new NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,  -- Soft delete support
  
  -- Constraints
  CONSTRAINT workflows_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT workflows_difficulty_valid CHECK (difficulty_level IN ('medium', 'intermediate', 'hard'))
);

-- Add comment
COMMENT ON TABLE public.workflows_new IS 'Main workflows table with difficulty level categorization';
COMMENT ON COLUMN public.workflows_new.difficulty_level IS 'Difficulty level: medium (20 workflows), intermediate (15 workflows), hard (15 workflows)';
COMMENT ON COLUMN public.workflows_new.deleted_at IS 'Soft delete timestamp. NULL means not deleted.';

-- ============================================
-- STEP 3: CREATE WORKFLOW_NODES TABLE
-- ============================================
-- Stores individual nodes in a workflow with JSONB configuration

CREATE TABLE IF NOT EXISTS public.workflow_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows_new(id) ON DELETE CASCADE NOT NULL,
  node_id TEXT NOT NULL,  -- Unique identifier within workflow (e.g., 'node-1', 'trigger-1')
  node_type TEXT NOT NULL,  -- Type of node (e.g., 'trigger', 'action', 'condition')
  label TEXT NOT NULL,  -- Display label
  position_x INTEGER DEFAULT 0,  -- X coordinate on canvas
  position_y INTEGER DEFAULT 0,  -- Y coordinate on canvas
  configuration JSONB DEFAULT '{}'::jsonb,  -- Node-specific configuration
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT workflow_nodes_unique_per_workflow UNIQUE (workflow_id, node_id),
  CONSTRAINT workflow_nodes_node_id_not_empty CHECK (char_length(trim(node_id)) > 0)
);

-- Add comments
COMMENT ON TABLE public.workflow_nodes IS 'Individual nodes within workflows with JSONB configuration';
COMMENT ON COLUMN public.workflow_nodes.configuration IS 'JSONB object storing node-specific settings, parameters, and metadata';
COMMENT ON COLUMN public.workflow_nodes.node_id IS 'Unique identifier for the node within the workflow (e.g., node-1, trigger-1)';

-- ============================================
-- STEP 4: CREATE WORKFLOW_EDGES TABLE
-- ============================================
-- Stores connections between nodes

CREATE TABLE IF NOT EXISTS public.workflow_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows_new(id) ON DELETE CASCADE NOT NULL,
  source_node_id TEXT NOT NULL,  -- References workflow_nodes.node_id
  target_node_id TEXT NOT NULL,  -- References workflow_nodes.node_id
  source_handle TEXT,  -- Output handle on source node
  target_handle TEXT,  -- Input handle on target node
  condition JSONB,  -- Optional condition for edge (e.g., if-else logic)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT workflow_edges_no_self_loop CHECK (source_node_id != target_node_id),
  CONSTRAINT workflow_edges_unique_connection UNIQUE (workflow_id, source_node_id, target_node_id, source_handle, target_handle)
);

-- Add comments
COMMENT ON TABLE public.workflow_edges IS 'Connections between workflow nodes';
COMMENT ON COLUMN public.workflow_edges.condition IS 'JSONB object storing conditional logic for edge execution (e.g., if-else conditions)';

-- ============================================
-- STEP 5: CREATE WORKFLOW_INPUTS TABLE
-- ============================================
-- Structured input field definitions for workflows

CREATE TABLE IF NOT EXISTS public.workflow_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows_new(id) ON DELETE CASCADE NOT NULL,
  field_name TEXT NOT NULL,  -- Internal field identifier (e.g., 'email', 'amount')
  label TEXT NOT NULL,  -- Display label for the field
  type public.input_field_type NOT NULL,
  required BOOLEAN NOT NULL DEFAULT false,
  default_value TEXT,  -- Default value as text (will be parsed based on type)
  validation_rules JSONB DEFAULT '{}'::jsonb,  -- Validation rules (min, max, pattern, etc.)
  placeholder TEXT,  -- Placeholder text for input fields
  description TEXT,  -- Help text/description for the field
  display_order INTEGER NOT NULL DEFAULT 0,  -- Order in which fields should be displayed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT workflow_inputs_unique_field_name UNIQUE (workflow_id, field_name),
  CONSTRAINT workflow_inputs_field_name_not_empty CHECK (char_length(trim(field_name)) > 0),
  CONSTRAINT workflow_inputs_label_not_empty CHECK (char_length(trim(label)) > 0)
);

-- Add comments
COMMENT ON TABLE public.workflow_inputs IS 'Structured input field definitions for workflows';
COMMENT ON COLUMN public.workflow_inputs.validation_rules IS 'JSONB object with validation rules: {"min": 0, "max": 100, "pattern": "^[a-z]+$", "options": ["opt1", "opt2"]}';
COMMENT ON COLUMN public.workflow_inputs.default_value IS 'Default value stored as text. Parse based on type field.';

-- ============================================
-- STEP 6: CREATE WORKFLOW_VERSIONS TABLE
-- ============================================
-- Version control for workflows

-- Drop old workflow_versions table if it exists (from old schema)
-- This table references old workflows table, so we need to recreate it
-- WARNING: This will delete any existing version history from the old schema
DROP TABLE IF EXISTS public.workflow_versions CASCADE;

CREATE TABLE public.workflow_versions (
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

-- ============================================
-- STEP 7: CREATE EXECUTION_LOGS TABLE
-- ============================================
-- Comprehensive execution logging

CREATE TABLE IF NOT EXISTS public.execution_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows_new(id) ON DELETE CASCADE NOT NULL,
  execution_id UUID,  -- Optional: link to external execution system
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, running, success, failed, cancelled
  input_data JSONB,  -- Input data used for execution
  output_data JSONB,  -- Final output from execution
  error_message TEXT,  -- Error message if execution failed
  error_stack TEXT,  -- Stack trace if available
  node_execution_logs JSONB DEFAULT '[]'::jsonb,  -- Per-node execution logs
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  duration_ms INTEGER,  -- Execution duration in milliseconds
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Constraints
  CONSTRAINT execution_logs_status_valid CHECK (status IN ('pending', 'running', 'success', 'failed', 'cancelled')),
  CONSTRAINT execution_logs_duration_positive CHECK (duration_ms IS NULL OR duration_ms >= 0)
);

-- Add comments
COMMENT ON TABLE public.execution_logs IS 'Comprehensive execution logging for workflows';
COMMENT ON COLUMN public.execution_logs.node_execution_logs IS 'JSONB array of per-node execution details: [{"node_id": "node-1", "status": "success", "duration_ms": 150, "output": {...}}]';

-- ============================================
-- STEP 8: CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Workflows indexes
CREATE INDEX IF NOT EXISTS idx_workflows_new_difficulty ON public.workflows_new(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_workflows_new_status ON public.workflows_new(status);
CREATE INDEX IF NOT EXISTS idx_workflows_new_created_by ON public.workflows_new(created_by);
CREATE INDEX IF NOT EXISTS idx_workflows_new_created_at ON public.workflows_new(created_at);
CREATE INDEX IF NOT EXISTS idx_workflows_new_deleted_at ON public.workflows_new(deleted_at) WHERE deleted_at IS NULL;  -- Partial index for active workflows
CREATE INDEX IF NOT EXISTS idx_workflows_new_difficulty_status ON public.workflows_new(difficulty_level, status) WHERE deleted_at IS NULL;

-- Workflow nodes indexes
CREATE INDEX IF NOT EXISTS idx_workflow_nodes_workflow_id ON public.workflow_nodes(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_nodes_node_type ON public.workflow_nodes(node_type);
CREATE INDEX IF NOT EXISTS idx_workflow_nodes_workflow_node_id ON public.workflow_nodes(workflow_id, node_id);

-- Workflow edges indexes
CREATE INDEX IF NOT EXISTS idx_workflow_edges_workflow_id ON public.workflow_edges(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_edges_source ON public.workflow_edges(workflow_id, source_node_id);
CREATE INDEX IF NOT EXISTS idx_workflow_edges_target ON public.workflow_edges(workflow_id, target_node_id);

-- Workflow inputs indexes
CREATE INDEX IF NOT EXISTS idx_workflow_inputs_workflow_id ON public.workflow_inputs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_inputs_workflow_order ON public.workflow_inputs(workflow_id, display_order);

-- Workflow versions indexes
CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow_id ON public.workflow_versions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow_version ON public.workflow_versions(workflow_id, version DESC);

-- Execution logs indexes
CREATE INDEX IF NOT EXISTS idx_execution_logs_workflow_id ON public.execution_logs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_status ON public.execution_logs(status);
CREATE INDEX IF NOT EXISTS idx_execution_logs_started_at ON public.execution_logs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_execution_logs_workflow_status ON public.execution_logs(workflow_id, status);
CREATE INDEX IF NOT EXISTS idx_execution_logs_created_by ON public.execution_logs(created_by);

-- ============================================
-- STEP 9: CREATE TRIGGERS
-- ============================================

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_workflow_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for workflows_new
DROP TRIGGER IF EXISTS trigger_workflows_new_updated_at ON public.workflows_new;
CREATE TRIGGER trigger_workflows_new_updated_at
  BEFORE UPDATE ON public.workflows_new
  FOR EACH ROW
  EXECUTE FUNCTION public.update_workflow_updated_at();

-- Trigger for workflow_nodes
DROP TRIGGER IF EXISTS trigger_workflow_nodes_updated_at ON public.workflow_nodes;
CREATE TRIGGER trigger_workflow_nodes_updated_at
  BEFORE UPDATE ON public.workflow_nodes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_workflow_updated_at();

-- Trigger for workflow_inputs
DROP TRIGGER IF EXISTS trigger_workflow_inputs_updated_at ON public.workflow_inputs;
CREATE TRIGGER trigger_workflow_inputs_updated_at
  BEFORE UPDATE ON public.workflow_inputs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_workflow_updated_at();

-- ============================================
-- STEP 10: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.workflows_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 11: CREATE RLS POLICIES
-- ============================================

-- Workflows policies
DROP POLICY IF EXISTS "Users can view own workflows" ON public.workflows_new;
CREATE POLICY "Users can view own workflows" ON public.workflows_new
  FOR SELECT TO authenticated
  USING (created_by = auth.uid() OR deleted_at IS NULL);

DROP POLICY IF EXISTS "Users can create workflows" ON public.workflows_new;
CREATE POLICY "Users can create workflows" ON public.workflows_new
  FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can update own workflows" ON public.workflows_new;
CREATE POLICY "Users can update own workflows" ON public.workflows_new
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS "Users can delete own workflows" ON public.workflows_new;
CREATE POLICY "Users can delete own workflows" ON public.workflows_new
  FOR DELETE TO authenticated
  USING (created_by = auth.uid());

-- Workflow nodes policies (inherit from workflow ownership)
DROP POLICY IF EXISTS "Users can manage nodes of own workflows" ON public.workflow_nodes;
CREATE POLICY "Users can manage nodes of own workflows" ON public.workflow_nodes
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

-- Workflow edges policies
DROP POLICY IF EXISTS "Users can manage edges of own workflows" ON public.workflow_edges;
CREATE POLICY "Users can manage edges of own workflows" ON public.workflow_edges
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

-- Workflow inputs policies
DROP POLICY IF EXISTS "Users can manage inputs of own workflows" ON public.workflow_inputs;
CREATE POLICY "Users can manage inputs of own workflows" ON public.workflow_inputs
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

-- Workflow versions policies
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

-- Execution logs policies
DROP POLICY IF EXISTS "Users can view logs of own workflows" ON public.execution_logs;
CREATE POLICY "Users can view logs of own workflows" ON public.execution_logs
  FOR SELECT TO authenticated
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.workflows_new w
      WHERE w.id = workflow_id AND w.created_by = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create logs for own workflows" ON public.execution_logs;
CREATE POLICY "Users can create logs for own workflows" ON public.execution_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.workflows_new w
      WHERE w.id = workflow_id AND w.created_by = auth.uid()
    )
  );

-- ============================================
-- SCHEMA CREATION COMPLETE
-- ============================================
-- Next steps:
-- 1. Review the schema
-- 2. Run sample data insertion script (25_workflow_sample_data.sql)
-- 3. Test the schema with your application
-- ============================================

COMMIT;
