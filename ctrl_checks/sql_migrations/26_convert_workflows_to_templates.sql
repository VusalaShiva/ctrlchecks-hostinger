-- ============================================
-- CONVERT NEW WORKFLOWS TO TEMPLATES
-- ============================================
-- This script converts workflows from workflows_new table
-- into templates that the UI can display
-- 
-- Run this AFTER:
-- 1. 24_new_workflow_schema.sql (creates new schema)
-- 2. 25_workflow_sample_data.sql (inserts sample workflows)
-- ============================================

BEGIN;

-- ============================================
-- STEP 1: Map difficulty levels
-- ============================================
-- Old templates use: Beginner, Intermediate, Advanced
-- New workflows use: medium, intermediate, hard
-- Mapping: medium -> Beginner, intermediate -> Intermediate, hard -> Advanced

-- ============================================
-- STEP 2: Insert workflows as templates
-- ============================================
-- Convert each workflow to a template with appropriate category and tags

INSERT INTO public.templates (
  name,
  description,
  category,
  nodes,
  edges,
  difficulty,
  estimated_setup_time,
  tags,
  is_active,
  is_featured,
  created_by
)
SELECT 
  w.name,
  w.description,
  -- Map workflow names to categories
  CASE 
    -- AI & Machine Learning
    WHEN w.name ILIKE '%AI%' OR w.name ILIKE '%Machine Learning%' OR w.name ILIKE '%ML%' 
         OR w.name ILIKE '%LLM%' OR w.name ILIKE '%GPT%' OR w.name ILIKE '%Agent%'
         OR w.name ILIKE '%Recommendation%' OR w.name ILIKE '%Sentiment%'
         OR w.name ILIKE '%Text Analysis%' OR w.name ILIKE '%Embedding%'
      THEN 'AI & Machine Learning'
    
    -- Sales & Marketing
    WHEN w.name ILIKE '%Sales%' OR w.name ILIKE '%Lead%' OR w.name ILIKE '%Marketing%'
         OR w.name ILIKE '%Campaign%' OR w.name ILIKE '%CRM%'
      THEN 'Sales & Marketing'
    
    -- Customer Support
    WHEN w.name ILIKE '%Customer%' OR w.name ILIKE '%Support%' OR w.name ILIKE '%Ticket%'
      THEN 'Customer Support'
    
    -- Finance & Accounting
    WHEN w.name ILIKE '%Finance%' OR w.name ILIKE '%Invoice%' OR w.name ILIKE '%Expense%'
         OR w.name ILIKE '%Compliance%' OR w.name ILIKE '%Financial%'
      THEN 'Finance & Accounting'
    
    -- Human Resources
    WHEN w.name ILIKE '%HR%' OR w.name ILIKE '%Hiring%' OR w.name ILIKE '%Resume%'
         OR w.name ILIKE '%Employee%' OR w.name ILIKE '%Onboarding%'
      THEN 'Human Resources'
    
    -- Internal Operations
    WHEN w.name ILIKE '%Internal%' OR w.name ILIKE '%Knowledge%' OR w.name ILIKE '%Ops%'
         OR w.name ILIKE '%Documentation%'
      THEN 'Internal Operations'
    
    -- Data Processing
    WHEN w.name ILIKE '%Data%' OR w.name ILIKE '%ETL%' OR w.name ILIKE '%Processing%'
         OR w.name ILIKE '%Migration%' OR w.name ILIKE '%Analytics%'
         OR w.name ILIKE '%Warehouse%' OR w.name ILIKE '%Backup%'
      THEN 'Data Processing'
    
    -- Communication
    WHEN w.name ILIKE '%Email%' OR w.name ILIKE '%Newsletter%' OR w.name ILIKE '%Notification%'
         OR w.name ILIKE '%Social Media%' OR w.name ILIKE '%Post%'
      THEN 'Communication'
    
    -- Database Operations
    WHEN w.name ILIKE '%Database%' OR w.name ILIKE '%PostgreSQL%' OR w.name ILIKE '%MySQL%'
         OR w.name ILIKE '%MongoDB%' OR w.name ILIKE '%Redis%'
      THEN 'Database Operations'
    
    -- API Integration
    WHEN w.name ILIKE '%API%' OR w.name ILIKE '%Integration%' OR w.name ILIKE '%Webhook%'
         OR w.name ILIKE '%HTTP%' OR w.name ILIKE '%GraphQL%'
      THEN 'API Integration'
    
    -- Google Integration
    WHEN w.name ILIKE '%Google%' OR w.name ILIKE '%Sheets%' OR w.name ILIKE '%Calendar%'
         OR w.name ILIKE '%Drive%' OR w.name ILIKE '%BigQuery%'
      THEN 'Google Integration'
    
    -- Logic & Control Flow
    WHEN w.name ILIKE '%If-Else%' OR w.name ILIKE '%Conditional%' OR w.name ILIKE '%Switch%'
         OR w.name ILIKE '%Wait%' OR w.name ILIKE '%Delay%' OR w.name ILIKE '%Loop%'
      THEN 'Logic & Control Flow'
    
    -- Error Handling
    WHEN w.name ILIKE '%Error%' OR w.name ILIKE '%Exception%'
      THEN 'Error Handling'
    
    -- Workflow Orchestration
    WHEN w.name ILIKE '%Orchestrat%' OR w.name ILIKE '%Workflow%' OR w.name ILIKE '%Trigger%'
         OR w.name ILIKE '%Chain%' OR w.name ILIKE '%Distributed%'
      THEN 'Workflow Orchestration'
    
    -- Form Automation
    WHEN w.name ILIKE '%Form%' OR w.name ILIKE '%Submission%'
      THEN 'Form Automation'
    
    -- Webhook Automation
    WHEN w.name ILIKE '%Webhook%'
      THEN 'Webhook Automation'
    
    -- AI Chatbots
    WHEN w.name ILIKE '%Chat%' OR w.name ILIKE '%Chatbot%'
      THEN 'AI Chatbots'
    
    -- Getting Started
    WHEN w.name ILIKE '%Basics%' OR w.name ILIKE '%Manual%'
      THEN 'Getting Started'
    
    -- Advanced Integrations
    WHEN w.name ILIKE '%Platform%' OR w.name ILIKE '%Showcase%' OR w.name ILIKE '%Multi%'
      THEN 'Advanced Integrations'
    
    -- Default category
    ELSE 'Internal Operations'
  END as category,
  
  -- Build nodes JSONB from workflow_nodes
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', wn.node_id,
          'type', wn.node_type,
          'label', wn.label,
          'position', jsonb_build_object('x', wn.position_x, 'y', wn.position_y),
          'data', wn.configuration
        )
        ORDER BY wn.created_at
      )
      FROM public.workflow_nodes wn
      WHERE wn.workflow_id = w.id
    ),
    '[]'::jsonb
  ) as nodes,
  
  -- Build edges JSONB from workflow_edges
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', we.id::text,
          'source', we.source_node_id,
          'target', we.target_node_id,
          'sourceHandle', we.source_handle,
          'targetHandle', we.target_handle,
          'condition', we.condition
        )
        ORDER BY we.created_at
      )
      FROM public.workflow_edges we
      WHERE we.workflow_id = w.id
    ),
    '[]'::jsonb
  ) as edges,
  
  -- Map difficulty levels
  CASE 
    WHEN w.difficulty_level = 'medium' THEN 'Beginner'
    WHEN w.difficulty_level = 'intermediate' THEN 'Intermediate'
    WHEN w.difficulty_level = 'hard' THEN 'Advanced'
    ELSE 'Intermediate'
  END as difficulty,
  
  -- Estimate setup time based on difficulty
  CASE 
    WHEN w.difficulty_level = 'medium' THEN 10
    WHEN w.difficulty_level = 'intermediate' THEN 15
    WHEN w.difficulty_level = 'hard' THEN 20
    ELSE 15
  END as estimated_setup_time,
  
  -- Generate tags from workflow name and description
  ARRAY(
    SELECT DISTINCT LOWER(unnest(string_to_array(
      w.name || ' ' || COALESCE(w.description, ''),
      ' '
    )))
    WHERE length(unnest(string_to_array(
      w.name || ' ' || COALESCE(w.description, ''),
      ' '
    ))) > 3
    LIMIT 5
  ) || 
  ARRAY[
    CASE 
      WHEN w.difficulty_level = 'medium' THEN 'beginner'
      WHEN w.difficulty_level = 'intermediate' THEN 'intermediate'
      WHEN w.difficulty_level = 'hard' THEN 'advanced'
    END
  ] as tags,
  
  true as is_active,  -- All new templates are active
  false as is_featured,  -- Can be set to true for important templates
  w.created_by

FROM public.workflows_new w
WHERE w.deleted_at IS NULL  -- Only include non-deleted workflows
  AND NOT EXISTS (
    -- Avoid duplicates if template already exists with same name
    SELECT 1 FROM public.templates t 
    WHERE t.name = w.name
  )
ORDER BY 
  CASE w.difficulty_level
    WHEN 'medium' THEN 1
    WHEN 'intermediate' THEN 2
    WHEN 'hard' THEN 3
  END,
  w.name;

-- ============================================
-- STEP 3: Update featured templates
-- ============================================
-- Mark some important templates as featured

UPDATE public.templates
SET is_featured = true
WHERE name IN (
  'Email Newsletter Automation',
  'Customer Support Agent',
  'AI Agent with Memory',
  'Multi-Channel Marketing Campaign',
  'Machine Learning Model Training Pipeline',
  'Complete Platform Showcase'
)
AND created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1
);

-- ============================================
-- STEP 4: Verification
-- ============================================

-- Count templates by difficulty
SELECT 
  difficulty,
  COUNT(*) as count,
  COUNT(CASE WHEN is_featured THEN 1 END) as featured_count
FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1
)
GROUP BY difficulty
ORDER BY 
  CASE difficulty
    WHEN 'Beginner' THEN 1
    WHEN 'Intermediate' THEN 2
    WHEN 'Advanced' THEN 3
  END;

-- Count templates by category
SELECT 
  category,
  COUNT(*) as count
FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1
)
GROUP BY category
ORDER BY count DESC, category;

-- List all new templates
SELECT 
  id,
  name,
  category,
  difficulty,
  estimated_setup_time,
  array_length(tags, 1) as tag_count,
  is_featured,
  is_active,
  created_at
FROM public.templates
WHERE created_by IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1
)
ORDER BY is_featured DESC, created_at DESC;

COMMIT;
