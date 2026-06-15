-- ============================================
-- SAMPLE WORKFLOW DATA INSERTION
-- ============================================
-- This script inserts exactly:
-- - 20 medium difficulty workflows
-- - 15 intermediate difficulty workflows
-- - 15 hard difficulty workflows
-- 
-- Run this AFTER creating the new schema (24_new_workflow_schema.sql)
-- Replace 'YOUR_USER_ID' with an actual user UUID or use a subquery
-- ============================================

BEGIN;

-- ============================================
-- HELPER: Get a user ID (use first admin or first user)
-- ============================================
-- You can replace this with a specific user ID
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Try to get an admin user first, otherwise get any user
  SELECT COALESCE(
    (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1),
    (SELECT id FROM auth.users ORDER BY created_at LIMIT 1)
  ) INTO v_user_id;
  
  -- If no user exists, you'll need to create one first
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found. Please create a user first.';
  END IF;
  
  -- Store in a temporary variable (we'll use it in the inserts)
  -- For this script, we'll use a placeholder that you should replace
  RAISE NOTICE 'Using user_id: %', v_user_id;
END $$;

-- ============================================
-- MEDIUM DIFFICULTY WORKFLOWS (20 workflows)
-- ============================================

-- Medium Workflow 1: Email Newsletter Automation
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Email Newsletter Automation',
  'Automatically send weekly newsletter emails to subscribers with personalized content',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 2: Social Media Post Scheduler
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Social Media Post Scheduler',
  'Schedule and publish posts across multiple social media platforms',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 3: Form Submission Handler
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Form Submission Handler',
  'Process form submissions, validate data, and send confirmation emails',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 4: Data Backup Automation
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Data Backup Automation',
  'Automatically backup database and files to cloud storage on schedule',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 5: Customer Onboarding Sequence
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Customer Onboarding Sequence',
  'Send welcome emails, setup instructions, and follow-up messages to new customers',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 6: Invoice Generation
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Invoice Generation',
  'Generate and send invoices based on order data',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 7: Content Approval Workflow
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Content Approval Workflow',
  'Route content for review and approval before publication',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 8: Lead Scoring System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Lead Scoring System',
  'Score leads based on engagement and assign to sales team',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 9: Order Processing
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Order Processing',
  'Process orders, update inventory, and send shipping notifications',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 10: Survey Response Collector
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Survey Response Collector',
  'Collect survey responses and generate summary reports',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 11: Document Conversion Pipeline
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Document Conversion Pipeline',
  'Convert documents between formats (PDF, DOCX, etc.)',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 12: Event Registration Handler
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Event Registration Handler',
  'Handle event registrations and send confirmation tickets',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 13: Password Reset Flow
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Password Reset Flow',
  'Handle password reset requests with secure token generation',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 14: Support Ticket Router
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Support Ticket Router',
  'Route support tickets to appropriate team based on category',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 15: Product Catalog Sync
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Product Catalog Sync',
  'Synchronize product data across multiple platforms',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 16: Appointment Reminder System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Appointment Reminder System',
  'Send automated reminders for upcoming appointments',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 17: Expense Report Processor
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Expense Report Processor',
  'Process expense reports and route for approval',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 18: Newsletter Subscription Manager
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Newsletter Subscription Manager',
  'Manage newsletter subscriptions and preferences',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 19: File Upload Processor
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'File Upload Processor',
  'Process uploaded files, validate, and store securely',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Medium Workflow 20: User Activity Logger
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'User Activity Logger',
  'Log user activities and generate activity reports',
  'medium',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- ============================================
-- INTERMEDIATE DIFFICULTY WORKFLOWS (15 workflows)
-- ============================================

-- Intermediate Workflow 1: Multi-Channel Marketing Campaign
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Multi-Channel Marketing Campaign',
  'Execute coordinated marketing campaigns across email, social media, and SMS',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 2: Dynamic Pricing Engine
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Dynamic Pricing Engine',
  'Calculate and update product prices based on demand, inventory, and competitor data',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 3: AI Content Generator
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'AI Content Generator',
  'Generate blog posts, social media content, and marketing copy using AI',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 4: Customer Churn Prediction
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Customer Churn Prediction',
  'Analyze customer behavior to predict churn and trigger retention campaigns',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 5: E-commerce Recommendation Engine
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'E-commerce Recommendation Engine',
  'Generate personalized product recommendations based on user behavior',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 6: Financial Report Generator
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Financial Report Generator',
  'Aggregate financial data from multiple sources and generate comprehensive reports',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 7: API Integration Hub
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'API Integration Hub',
  'Integrate multiple third-party APIs with error handling and retry logic',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 8: Real-time Analytics Dashboard
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Real-time Analytics Dashboard',
  'Process streaming data and update analytics dashboards in real-time',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 9: Automated Testing Pipeline
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Automated Testing Pipeline',
  'Run automated tests, generate reports, and notify team of results',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 10: Compliance Monitoring System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Compliance Monitoring System',
  'Monitor compliance metrics and generate alerts for violations',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 11: Multi-Step Approval Process
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Multi-Step Approval Process',
  'Route documents through multiple approval stages with conditional logic',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 12: Data Migration Pipeline
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Data Migration Pipeline',
  'Migrate data between systems with validation and rollback capabilities',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 13: Customer Segmentation Engine
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Customer Segmentation Engine',
  'Segment customers based on behavior, demographics, and purchase history',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 14: Inventory Optimization System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Inventory Optimization System',
  'Optimize inventory levels based on sales forecasts and supplier data',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Intermediate Workflow 15: Automated Code Deployment
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Automated Code Deployment',
  'Deploy code to staging and production with automated testing and rollback',
  'intermediate',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- ============================================
-- HARD DIFFICULTY WORKFLOWS (15 workflows)
-- ============================================

-- Hard Workflow 1: Enterprise Data Warehouse ETL
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Enterprise Data Warehouse ETL',
  'Extract, transform, and load data from multiple sources into data warehouse with complex transformations',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 2: Machine Learning Model Training Pipeline
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Machine Learning Model Training Pipeline',
  'Train, validate, and deploy ML models with A/B testing and versioning',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 3: Real-time Fraud Detection System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Real-time Fraud Detection System',
  'Detect fraudulent transactions in real-time using ML models and rule engines',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 4: Distributed Workflow Orchestrator
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Distributed Workflow Orchestrator',
  'Orchestrate complex workflows across distributed systems with fault tolerance',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 5: Blockchain Transaction Processor
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Blockchain Transaction Processor',
  'Process blockchain transactions with validation, consensus, and smart contract execution',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 6: Multi-Tenant SaaS Provisioning
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Multi-Tenant SaaS Provisioning',
  'Provision and manage resources for multiple tenants with isolation and scaling',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 7: Advanced Analytics Pipeline
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Advanced Analytics Pipeline',
  'Process large-scale data for advanced analytics with streaming and batch processing',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 8: Microservices Communication Orchestrator
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Microservices Communication Orchestrator',
  'Orchestrate communication between microservices with saga pattern and compensation',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 9: Real-time Recommendation System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Real-time Recommendation System',
  'Generate real-time recommendations using collaborative filtering and deep learning',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 10: Complex Event Processing Engine
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Complex Event Processing Engine',
  'Process complex event patterns from multiple streams with temporal logic',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 11: Distributed Cache Synchronization
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Distributed Cache Synchronization',
  'Synchronize distributed caches across multiple regions with consistency guarantees',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 12: Advanced Security Monitoring System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Advanced Security Monitoring System',
  'Monitor security events, detect threats, and trigger automated responses',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 13: High-Frequency Trading System
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'High-Frequency Trading System',
  'Execute trades based on real-time market data with sub-millisecond latency',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 14: Quantum Computing Job Scheduler
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Quantum Computing Job Scheduler',
  'Schedule and execute quantum computing jobs with resource optimization',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- Hard Workflow 15: Autonomous System Controller
INSERT INTO public.workflows_new (name, description, difficulty_level, status, created_by)
VALUES (
  'Autonomous System Controller',
  'Control autonomous systems with real-time decision making and safety constraints',
  'hard',
  'active',
  (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
);

-- ============================================
-- ADD SAMPLE INPUTS FOR FIRST WORKFLOW (Example)
-- ============================================
-- This shows how to add structured inputs to workflows

-- Example: Add inputs to "Email Newsletter Automation" (first medium workflow)
INSERT INTO public.workflow_inputs (
  workflow_id,
  field_name,
  label,
  type,
  required,
  default_value,
  validation_rules,
  placeholder,
  description,
  display_order
)
SELECT 
  w.id,
  'newsletter_subject',
  'Newsletter Subject',
  'text',
  true,
  'Weekly Newsletter',
  '{"minLength": 5, "maxLength": 200}'::jsonb,
  'Enter newsletter subject line',
  'The subject line for the newsletter email',
  1
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_inputs wi 
    WHERE wi.workflow_id = w.id AND wi.field_name = 'newsletter_subject'
  )
LIMIT 1;

INSERT INTO public.workflow_inputs (
  workflow_id,
  field_name,
  label,
  type,
  required,
  validation_rules,
  placeholder,
  description,
  display_order
)
SELECT 
  w.id,
  'recipient_count',
  'Number of Recipients',
  'number',
  true,
  '{"min": 1, "max": 10000}'::jsonb,
  'Enter number of recipients',
  'Total number of newsletter recipients',
  2
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_inputs wi 
    WHERE wi.workflow_id = w.id AND wi.field_name = 'recipient_count'
  )
LIMIT 1;

INSERT INTO public.workflow_inputs (
  workflow_id,
  field_name,
  label,
  type,
  required,
  default_value,
  validation_rules,
  description,
  display_order
)
SELECT 
  w.id,
  'send_immediately',
  'Send Immediately',
  'boolean',
  false,
  'false',
  '{}'::jsonb,
  'If checked, send newsletter immediately instead of scheduling',
  3
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_inputs wi 
    WHERE wi.workflow_id = w.id AND wi.field_name = 'send_immediately'
  )
LIMIT 1;

-- ============================================
-- ADD SAMPLE NODES AND EDGES (Example)
-- ============================================
-- This shows how to add nodes and edges to workflows

-- Example: Add nodes to "Email Newsletter Automation"
INSERT INTO public.workflow_nodes (
  workflow_id,
  node_id,
  node_type,
  label,
  position_x,
  position_y,
  configuration
)
SELECT 
  w.id,
  'trigger-1',
  'trigger',
  'Schedule Trigger',
  100,
  100,
  '{"schedule": "weekly", "day": "monday", "time": "09:00"}'::jsonb
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_nodes wn 
    WHERE wn.workflow_id = w.id AND wn.node_id = 'trigger-1'
  )
LIMIT 1;

INSERT INTO public.workflow_nodes (
  workflow_id,
  node_id,
  node_type,
  label,
  position_x,
  position_y,
  configuration
)
SELECT 
  w.id,
  'action-1',
  'action',
  'Fetch Subscribers',
  300,
  100,
  '{"source": "database", "query": "SELECT * FROM subscribers WHERE active = true"}'::jsonb
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_nodes wn 
    WHERE wn.workflow_id = w.id AND wn.node_id = 'action-1'
  )
LIMIT 1;

INSERT INTO public.workflow_nodes (
  workflow_id,
  node_id,
  node_type,
  label,
  position_x,
  position_y,
  configuration
)
SELECT 
  w.id,
  'action-2',
  'action',
  'Send Email',
  500,
  100,
  '{"provider": "sendgrid", "template": "newsletter-template"}'::jsonb
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_nodes wn 
    WHERE wn.workflow_id = w.id AND wn.node_id = 'action-2'
  )
LIMIT 1;

-- Add edges connecting the nodes
INSERT INTO public.workflow_edges (
  workflow_id,
  source_node_id,
  target_node_id,
  source_handle,
  target_handle
)
SELECT 
  w.id,
  'trigger-1',
  'action-1',
  'output',
  'input'
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_edges we 
    WHERE we.workflow_id = w.id 
      AND we.source_node_id = 'trigger-1' 
      AND we.target_node_id = 'action-1'
      AND we.source_handle = 'output'
      AND we.target_handle = 'input'
  )
LIMIT 1;

INSERT INTO public.workflow_edges (
  workflow_id,
  source_node_id,
  target_node_id,
  source_handle,
  target_handle
)
SELECT 
  w.id,
  'action-1',
  'action-2',
  'output',
  'input'
FROM public.workflows_new w
WHERE w.name = 'Email Newsletter Automation'
  AND NOT EXISTS (
    SELECT 1 FROM public.workflow_edges we 
    WHERE we.workflow_id = w.id 
      AND we.source_node_id = 'action-1' 
      AND we.target_node_id = 'action-2'
      AND we.source_handle = 'output'
      AND we.target_handle = 'input'
  )
LIMIT 1;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count workflows by difficulty level
SELECT 
  difficulty_level,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
FROM public.workflows_new
GROUP BY difficulty_level
ORDER BY 
  CASE difficulty_level
    WHEN 'medium' THEN 1
    WHEN 'intermediate' THEN 2
    WHEN 'hard' THEN 3
  END;

-- List all workflows
SELECT 
  id,
  name,
  difficulty_level,
  status,
  created_at
FROM public.workflows_new
ORDER BY 
  CASE difficulty_level
    WHEN 'medium' THEN 1
    WHEN 'intermediate' THEN 2
    WHEN 'hard' THEN 3
  END,
  name;

-- ============================================
-- COMMIT
-- ============================================

COMMIT;
