-- ============================================
-- INSERT 50 WORKFLOWS AS TEMPLATES
-- ============================================
-- This script directly inserts 50 workflows into the templates table
-- with proper structure for the UI to display them
-- 
-- Run this to populate templates that will show in the UI
-- ============================================

BEGIN;

-- ============================================
-- CHECK: Verify admin user exists
-- ============================================
DO $$
DECLARE
  v_admin_user_id UUID;
BEGIN
  -- Try to get an admin user
  SELECT user_id INTO v_admin_user_id
  FROM public.user_roles 
  WHERE role = 'admin' 
  LIMIT 1;
  
  -- If no admin, try to get any user
  IF v_admin_user_id IS NULL THEN
    SELECT id INTO v_admin_user_id
    FROM auth.users 
    ORDER BY created_at 
    LIMIT 1;
  END IF;
  
  IF v_admin_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found. Please create a user first.';
  END IF;
  
  RAISE NOTICE 'Using user_id for templates: %', v_admin_user_id;
END $$;

-- ============================================
-- MEDIUM DIFFICULTY TEMPLATES (20 templates)
-- ============================================

-- Delete existing templates with these names to allow re-insertion
DELETE FROM public.templates 
WHERE name IN (
  'Email Newsletter Automation', 'Social Media Post Scheduler', 'Form Submission Handler',
  'Data Backup Automation', 'Customer Onboarding Sequence', 'Invoice Generation',
  'Content Approval Workflow', 'Lead Scoring System', 'Order Processing',
  'Survey Response Collector', 'Document Conversion Pipeline', 'Event Registration Handler',
  'Password Reset Flow', 'Support Ticket Router', 'Product Catalog Sync',
  'Appointment Reminder System', 'Expense Report Processor', 'Newsletter Subscription Manager',
  'File Upload Processor', 'User Activity Logger'
);

-- Medium Template 1: Email Newsletter Automation
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Email Newsletter Automation',
  'Automatically send weekly newsletter emails to subscribers with personalized content',
  'Communication',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Weekly Schedule", "time": "09:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Fetch Subscribers", "operation": "read", "query": "SELECT email, name FROM subscribers WHERE active = true"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "text_formatter", "label": "Format Email", "template": "Hello {{name}}, here is your weekly newsletter!"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "google_gmail", "label": "Send Newsletter", "to": "{{input.email}}", "subject": "Weekly Newsletter", "body": "{{input.formatted_text}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  10,
  ARRAY['email', 'newsletter', 'automation', 'communication', 'beginner'],
  true,
  true,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 2: Social Media Post Scheduler
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Social Media Post Scheduler',
  'Schedule and publish posts across multiple social media platforms',
  'Communication',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Schedule", "time": "10:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "set_variable", "label": "Prepare Post", "variable": "post_content", "value": "Check out our latest update!"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 150}, "data": {"type": "twitter", "label": "Post to Twitter", "message": "{{post_content}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "linkedin", "label": "Post to LinkedIn", "message": "{{post_content}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['social-media', 'scheduler', 'automation', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 3: Form Submission Handler
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Form Submission Handler',
  'Process form submissions, validate data, and send confirmation emails',
  'Form Automation',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Form Trigger", "formTitle": "Contact Form", "fields": []}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "if_else", "label": "Validate Email", "condition": "{{input.email}} && {{input.email}}.includes(\"@\")"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 150}, "data": {"type": "postgresql", "label": "Save to Database", "operation": "write", "table": "form_submissions"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "google_gmail", "label": "Send Confirmation", "to": "{{input.email}}", "subject": "Thank you for your submission"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Merge Results"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  6,
  ARRAY['form', 'submission', 'automation', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 4: Data Backup Automation
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Data Backup Automation',
  'Automatically backup database and files to cloud storage on schedule',
  'Database Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Backup", "time": "02:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Export Database", "operation": "read", "query": "SELECT * FROM important_table"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "json_parser", "label": "Format Backup", "operation": "stringify"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "http_request", "label": "Upload to Cloud", "method": "POST", "url": "https://storage.example.com/backup", "body": "{{input.json_string}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['backup', 'database', 'automation', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 5: Customer Onboarding Sequence
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Customer Onboarding Sequence',
  'Send welcome emails, setup instructions, and follow-up messages to new customers',
  'Customer Support',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "New Customer", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "text_formatter", "label": "Format Welcome", "template": "Welcome {{input.name}}! Get started with our platform."}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "google_gmail", "label": "Welcome Email", "to": "{{input.email}}", "subject": "Welcome!", "body": "{{input.formatted_text}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "wait", "label": "Wait 2 Days", "duration": "2d"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Follow-up Email", "to": "{{input.email}}", "subject": "How are you finding us?", "body": "We hope you are enjoying our platform!"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  10,
  ARRAY['onboarding', 'customer', 'email', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 6: Invoice Generation
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Invoice Generation',
  'Generate and send invoices based on order data',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "New Order", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Fetch Order Details", "operation": "read", "query": "SELECT * FROM orders WHERE id = {{input.order_id}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "text_formatter", "label": "Generate Invoice", "template": "Invoice #{{input.order_id}}\nTotal: ${{input.total}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "google_gmail", "label": "Send Invoice", "to": "{{input.customer_email}}", "subject": "Your Invoice", "body": "{{input.formatted_text}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['invoice', 'finance', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 7: Content Approval Workflow
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Content Approval Workflow',
  'Route content for review and approval before publication',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Content Submission", "formTitle": "Submit Content"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Save Draft", "operation": "write", "table": "content_drafts"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "google_gmail", "label": "Notify Reviewer", "to": "reviewer@example.com", "subject": "Content Pending Review", "body": "New content submitted for review"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "if_else", "label": "Check Approval", "condition": "{{input.approved}} === true"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 100}, "data": {"type": "postgresql", "label": "Publish Content", "operation": "write", "table": "published_content"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Request Changes", "to": "{{input.author_email}}", "subject": "Content Revision Needed"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  10,
  ARRAY['approval', 'content', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 8: Lead Scoring System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Lead Scoring System',
  'Score leads based on engagement and assign to sales team',
  'Sales & Marketing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "New Lead", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Fetch Lead Data", "operation": "read", "query": "SELECT * FROM leads WHERE id = {{input.lead_id}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Calculate Score", "code": "const score = (input.page_views || 0) * 2 + (input.email_opens || 0) * 5 + (input.form_submissions || 0) * 10; return { score };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "if_else", "label": "High Score?", "condition": "{{input.score}} >= 50"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 100}, "data": {"type": "slack_message", "label": "Notify Sales Team", "channel": "#sales", "message": "High-value lead: {{input.lead_id}} (Score: {{input.score}})"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Save Score", "operation": "write", "table": "lead_scores"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  12,
  ARRAY['lead', 'scoring', 'sales', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 9: Order Processing
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Order Processing',
  'Process orders, update inventory, and send shipping notifications',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "New Order", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Check Inventory", "operation": "read", "query": "SELECT stock FROM products WHERE id = {{input.product_id}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "In Stock?", "condition": "{{input.stock}} >= {{input.quantity}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "postgresql", "label": "Update Inventory", "operation": "write", "table": "products", "query": "UPDATE products SET stock = stock - {{input.quantity}} WHERE id = {{input.product_id}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Notify Out of Stock", "to": "{{input.customer_email}}", "subject": "Order Delayed", "body": "Item out of stock"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "google_gmail", "label": "Send Shipping Confirmation", "to": "{{input.customer_email}}", "subject": "Order Shipped", "body": "Your order has been shipped!"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  10,
  ARRAY['order', 'processing', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 10: Survey Response Collector
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Survey Response Collector',
  'Collect survey responses and generate summary reports',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Survey Form", "formTitle": "Customer Survey"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Save Response", "operation": "write", "table": "survey_responses"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "postgresql", "label": "Get All Responses", "operation": "read", "query": "SELECT * FROM survey_responses"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Generate Summary", "code": "const responses = input.responses || []; const avg = responses.reduce((sum, r) => sum + (r.rating || 0), 0) / responses.length; return { average_rating: avg, total_responses: responses.length };"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Send Report", "to": "admin@example.com", "subject": "Survey Summary", "body": "Average rating: {{input.average_rating}}, Total: {{input.total_responses}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['survey', 'data', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 11: Document Conversion Pipeline
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Document Conversion Pipeline',
  'Convert documents between formats (PDF, DOCX, etc.)',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Document Upload", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "http_request", "label": "Download Document", "method": "GET", "url": "{{input.document_url}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Convert Format", "code": "const converted = convertDocument(input.document, input.target_format); return { converted_document: converted };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "http_request", "label": "Upload Converted", "method": "POST", "url": "https://storage.example.com/upload", "body": "{{input.converted_document}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Notify User", "to": "{{input.user_email}}", "subject": "Document Converted", "body": "Your document has been converted successfully"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  9,
  ARRAY['document', 'conversion', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 12: Event Registration Handler
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Event Registration Handler',
  'Handle event registrations and send confirmation tickets',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Event Registration", "formTitle": "Register for Event"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Check Availability", "operation": "read", "query": "SELECT available_seats FROM events WHERE id = {{input.event_id}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Seats Available?", "condition": "{{input.available_seats}} > 0"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "postgresql", "label": "Create Registration", "operation": "write", "table": "event_registrations"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Notify Full", "to": "{{input.email}}", "subject": "Event Full", "body": "Sorry, the event is full"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "text_formatter", "label": "Generate Ticket", "template": "Event Ticket\nName: {{input.name}}\nEvent: {{input.event_name}}\nDate: {{input.event_date}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "google_gmail", "label": "Send Ticket", "to": "{{input.email}}", "subject": "Your Event Ticket", "body": "{{input.formatted_text}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['event', 'registration', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 13: Password Reset Flow
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Password Reset Flow',
  'Handle password reset requests with secure token generation',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Reset Request", "formTitle": "Reset Password"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Verify User", "operation": "read", "query": "SELECT id, email FROM users WHERE email = {{input.email}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "User Exists?", "condition": "{{input.user_id}} !== null"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "javascript", "label": "Generate Token", "code": "const token = generateSecureToken(); return { reset_token: token, expires_at: Date.now() + 3600000 };"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "postgresql", "label": "Save Token", "operation": "write", "table": "password_reset_tokens"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "text_formatter", "label": "Format Reset Link", "template": "https://example.com/reset?token={{input.reset_token}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1600, "y": 150}, "data": {"type": "google_gmail", "label": "Send Reset Email", "to": "{{input.email}}", "subject": "Password Reset", "body": "Click here to reset: {{input.reset_link}}"}},
    {"id": "n8", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Error Message", "to": "{{input.email}}", "subject": "Account Not Found", "body": "No account found with this email"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n8", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  6,
  ARRAY['password', 'security', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 14: Support Ticket Router
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Support Ticket Router',
  'Route support tickets to appropriate team based on category',
  'Customer Support',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Create Ticket", "formTitle": "Support Request"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Save Ticket", "operation": "write", "table": "support_tickets"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "switch", "label": "Route by Category", "cases": [{"value": "technical", "label": "Technical"}, {"value": "billing", "label": "Billing"}, {"value": "general", "label": "General"}]}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 100}, "data": {"type": "slack_message", "label": "Notify Tech Team", "channel": "#tech-support", "message": "New technical ticket: {{input.ticket_id}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "slack_message", "label": "Notify Billing Team", "channel": "#billing-support", "message": "New billing ticket: {{input.ticket_id}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 300}, "data": {"type": "slack_message", "label": "Notify General Team", "channel": "#general-support", "message": "New general ticket: {{input.ticket_id}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Confirm to User", "to": "{{input.user_email}}", "subject": "Ticket Created", "body": "Your support ticket #{{input.ticket_id}} has been created"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "technical", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "billing", "targetHandle": "input"},
    {"id": "e5", "source": "n3", "target": "n6", "sourceHandle": "general", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  9,
  ARRAY['support', 'ticket', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 15: Product Catalog Sync
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Product Catalog Sync',
  'Synchronize product data across multiple platforms',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Sync", "time": "03:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Fetch Products", "operation": "read", "query": "SELECT * FROM products WHERE updated_at > NOW() - INTERVAL ''1 day''"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "json_parser", "label": "Format Data", "operation": "stringify"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "http_request", "label": "Sync to Platform A", "method": "POST", "url": "https://platform-a.com/api/products", "body": "{{input.json_string}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "http_request", "label": "Sync to Platform B", "method": "POST", "url": "https://platform-b.com/api/products", "body": "{{input.json_string}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "merge", "label": "Merge Results"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  10,
  ARRAY['product', 'sync', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 16: Appointment Reminder System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Appointment Reminder System',
  'Send automated reminders for upcoming appointments',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Check", "time": "08:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Tomorrow Appointments", "operation": "read", "query": "SELECT * FROM appointments WHERE date = CURRENT_DATE + INTERVAL ''1 day''"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "filter", "label": "Filter Unnotified", "array": "{{input.appointments}}", "condition": "item.reminder_sent === false"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "text_formatter", "label": "Format Reminder", "template": "Reminder: You have an appointment tomorrow at {{item.time}} with {{item.provider_name}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Send Reminder", "to": "{{item.patient_email}}", "subject": "Appointment Reminder", "body": "{{input.formatted_text}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Mark as Notified", "operation": "write", "table": "appointments", "query": "UPDATE appointments SET reminder_sent = true WHERE id = {{item.id}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['appointment', 'reminder', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 17: Expense Report Processor
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Expense Report Processor',
  'Process expense reports and route for approval',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Submit Expense", "formTitle": "Expense Report"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Save Expense", "operation": "write", "table": "expense_reports"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Check Amount", "condition": "{{input.amount}} > 1000"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "google_gmail", "label": "Notify Manager", "to": "manager@example.com", "subject": "Expense Approval Needed", "body": "Expense report #{{input.report_id}} requires approval"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "postgresql", "label": "Auto Approve", "operation": "write", "table": "expense_approvals", "query": "INSERT INTO expense_approvals (report_id, status) VALUES ({{input.report_id}}, ''approved'')"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Confirm Submission", "to": "{{input.employee_email}}", "subject": "Expense Submitted", "body": "Your expense report has been submitted"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  9,
  ARRAY['expense', 'finance', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 18: Newsletter Subscription Manager
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Newsletter Subscription Manager',
  'Manage newsletter subscriptions and preferences',
  'Communication',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Subscribe Form", "formTitle": "Newsletter Subscription"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Check Existing", "operation": "read", "query": "SELECT * FROM newsletter_subscribers WHERE email = {{input.email}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Already Subscribed?", "condition": "{{input.subscriber}} === null"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "postgresql", "label": "Create Subscription", "operation": "write", "table": "newsletter_subscribers"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "postgresql", "label": "Update Preferences", "operation": "write", "table": "newsletter_subscribers", "query": "UPDATE newsletter_subscribers SET preferences = {{input.preferences}} WHERE email = {{input.email}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "google_gmail", "label": "Send Confirmation", "to": "{{input.email}}", "subject": "Subscription Confirmed", "body": "Thank you for subscribing!"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  7,
  ARRAY['newsletter', 'subscription', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 19: File Upload Processor
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'File Upload Processor',
  'Process uploaded files, validate, and store securely',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "File Upload", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "javascript", "label": "Validate File", "code": "const allowedTypes = [\"image/jpeg\", \"image/png\", \"application/pdf\"]; const maxSize = 5 * 1024 * 1024; const isValid = allowedTypes.includes(input.file_type) && input.file_size <= maxSize; return { is_valid: isValid, error: isValid ? null : \"Invalid file type or size\" };"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Valid File?", "condition": "{{input.is_valid}} === true"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "http_request", "label": "Upload to Storage", "method": "POST", "url": "https://storage.example.com/upload", "body": "{{input.file_data}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "postgresql", "label": "Save File Record", "operation": "write", "table": "uploaded_files"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "google_gmail", "label": "Notify Success", "to": "{{input.user_email}}", "subject": "File Uploaded", "body": "Your file has been uploaded successfully"}},
    {"id": "n7", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Notify Error", "to": "{{input.user_email}}", "subject": "Upload Failed", "body": "{{input.error}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n7", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  8,
  ARRAY['file', 'upload', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Medium Template 20: User Activity Logger
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'User Activity Logger',
  'Log user activities and generate activity reports',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Activity Event", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "set_variable", "label": "Add Timestamp", "variable": "timestamp", "value": "{{Date.now()}}"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "postgresql", "label": "Log Activity", "operation": "write", "table": "user_activities"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "schedule", "label": "Daily Report", "time": "23:00", "timezone": "Asia/Kolkata"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Get Today Activities", "operation": "read", "query": "SELECT * FROM user_activities WHERE DATE(created_at) = CURRENT_DATE"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "javascript", "label": "Generate Report", "code": "const activities = input.activities || []; const summary = { total: activities.length, by_type: {} }; activities.forEach(a => { summary.by_type[a.type] = (summary.by_type[a.type] || 0) + 1; }); return summary;"}},
    {"id": "n7", "type": "custom", "position": {"x": 1600, "y": 200}, "data": {"type": "google_gmail", "label": "Send Report", "to": "admin@example.com", "subject": "Daily Activity Report", "body": "{{JSON.stringify(input.summary)}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Beginner',
  7,
  ARRAY['activity', 'logging', 'beginner'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- ============================================
-- INTERMEDIATE DIFFICULTY TEMPLATES (15 templates)
-- ============================================

-- Delete existing intermediate templates
DELETE FROM public.templates 
WHERE name IN (
  'Multi-Channel Marketing Campaign', 'Dynamic Pricing Engine', 'AI Content Generator',
  'Customer Churn Prediction', 'E-commerce Recommendation Engine', 'Financial Report Generator',
  'API Integration Hub', 'Real-time Analytics Dashboard', 'Automated Testing Pipeline',
  'Compliance Monitoring System', 'Multi-Step Approval Process', 'Data Migration Pipeline',
  'Customer Segmentation Engine', 'Inventory Optimization System', 'Automated Code Deployment'
);

-- Intermediate Template 1: Multi-Channel Marketing Campaign
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Multi-Channel Marketing Campaign',
  'Execute coordinated marketing campaigns across email, social media, and SMS',
  'Sales & Marketing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Campaign Trigger", "time": "10:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Campaign Data", "operation": "read", "query": "SELECT * FROM campaigns WHERE status = ''active'' AND scheduled_date = CURRENT_DATE"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "text_formatter", "label": "Format Content", "template": "{{input.campaign_message}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 100}, "data": {"type": "google_gmail", "label": "Send Email", "to": "{{input.recipient_list}}", "subject": "{{input.campaign_subject}}", "body": "{{input.formatted_text}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "twitter", "label": "Post to Twitter", "message": "{{input.formatted_text}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 300}, "data": {"type": "linkedin", "label": "Post to LinkedIn", "message": "{{input.formatted_text}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "merge", "label": "Merge Results"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Log Campaign", "operation": "write", "table": "campaign_logs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n3", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e9", "source": "n7", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  15,
  ARRAY['marketing', 'campaign', 'intermediate'],
  true,
  true,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 2: Dynamic Pricing Engine
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Dynamic Pricing Engine',
  'Calculate and update product prices based on demand, inventory, and competitor data',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Price Update", "time": "06:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Products", "operation": "read", "query": "SELECT * FROM products WHERE dynamic_pricing = true"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "http_request", "label": "Get Competitor Prices", "method": "GET", "url": "https://api.competitor.com/prices"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "postgresql", "label": "Get Sales Data", "operation": "read", "query": "SELECT product_id, SUM(quantity) as total_sales FROM orders WHERE created_at > NOW() - INTERVAL ''7 days'' GROUP BY product_id"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "javascript", "label": "Calculate Price", "code": "const basePrice = input.current_price; const demandFactor = input.sales_data > 100 ? 1.1 : 0.95; const competitorFactor = input.competitor_price < basePrice ? 0.98 : 1.02; const newPrice = basePrice * demandFactor * competitorFactor; return { new_price: Math.round(newPrice * 100) / 100 };"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "if_else", "label": "Price Changed?", "condition": "Math.abs({{input.new_price}} - {{input.current_price}}) > 0.01"}},
    {"id": "n7", "type": "custom", "position": {"x": 1600, "y": 150}, "data": {"type": "postgresql", "label": "Update Price", "operation": "write", "table": "products", "query": "UPDATE products SET price = {{input.new_price}}, price_updated_at = NOW() WHERE id = {{input.product_id}}"}},
    {"id": "n8", "type": "custom", "position": {"x": 1600, "y": 250}, "data": {"type": "slack_message", "label": "Log No Change", "channel": "#pricing", "message": "Price unchanged for product {{input.product_id}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n8", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['pricing', 'dynamic', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 3: AI Content Generator
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'AI Content Generator',
  'Generate blog posts, social media content, and marketing copy using AI',
  'AI & Machine Learning',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Content", "time": "09:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Topics", "operation": "read", "query": "SELECT topic, content_type FROM content_schedule WHERE scheduled_date = CURRENT_DATE"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "openai_gpt", "label": "Generate Content", "model": "gpt-4", "prompt": "Write a {{input.content_type}} about {{input.topic}}"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "text_formatter", "label": "Format Output", "template": "{{input.generated_content}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "postgresql", "label": "Save Blog Post", "operation": "write", "table": "blog_posts"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "twitter", "label": "Post to Social", "message": "{{input.formatted_text}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "google_gmail", "label": "Notify Team", "to": "content-team@example.com", "subject": "New Content Generated", "body": "{{input.formatted_text}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  15,
  ARRAY['ai', 'content', 'generation', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 4: Customer Churn Prediction
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Customer Churn Prediction',
  'Analyze customer behavior to predict churn and trigger retention campaigns',
  'Sales & Marketing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Weekly Analysis", "time": "08:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Customer Data", "operation": "read", "query": "SELECT * FROM customers WHERE last_activity < NOW() - INTERVAL ''30 days''"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Calculate Churn Score", "code": "const daysSinceActivity = (Date.now() - new Date(input.last_activity)) / (1000 * 60 * 60 * 24); const score = daysSinceActivity * 0.5 + (input.subscription_months || 0) * -0.1; return { churn_score: score, risk_level: score > 20 ? \"high\" : score > 10 ? \"medium\" : \"low\" };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "High Risk?", "condition": "{{input.risk_level}} === \"high\""}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "google_gmail", "label": "Send Retention Offer", "to": "{{input.email}}", "subject": "We Miss You!", "body": "Special offer: 20% off your next purchase"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "postgresql", "label": "Log Low Risk", "operation": "write", "table": "churn_analysis"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "slack_message", "label": "Notify Sales", "channel": "#sales", "message": "High churn risk customer: {{input.email}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  20,
  ARRAY['churn', 'prediction', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 5: E-commerce Recommendation Engine
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'E-commerce Recommendation Engine',
  'Generate personalized product recommendations based on user behavior',
  'Sales & Marketing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "User Visit", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get User History", "operation": "read", "query": "SELECT * FROM user_purchases WHERE user_id = {{input.user_id}} ORDER BY created_at DESC LIMIT 10"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "postgresql", "label": "Get Similar Products", "operation": "read", "query": "SELECT * FROM products WHERE category IN (SELECT category FROM user_purchases WHERE user_id = {{input.user_id}}) LIMIT 20"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Calculate Recommendations", "code": "const history = input.purchase_history || []; const products = input.similar_products || []; const scores = products.map(p => ({ product: p, score: history.filter(h => h.category === p.category).length * 2 + Math.random() })); return { recommendations: scores.sort((a, b) => b.score - a.score).slice(0, 5).map(r => r.product) };"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "http_request", "label": "Update Recommendations", "method": "POST", "url": "https://api.example.com/recommendations", "body": "{{JSON.stringify(input.recommendations)}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Cache Results", "operation": "write", "table": "recommendation_cache"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['recommendation', 'ecommerce', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 6: Financial Report Generator
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Financial Report Generator',
  'Aggregate financial data from multiple sources and generate comprehensive reports',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Monthly Report", "time": "01:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 150}, "data": {"type": "postgresql", "label": "Get Revenue", "operation": "read", "query": "SELECT SUM(amount) as revenue FROM transactions WHERE type = ''revenue'' AND DATE_TRUNC(''month'', created_at) = DATE_TRUNC(''month'', CURRENT_DATE - INTERVAL ''1 month'')"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 250}, "data": {"type": "postgresql", "label": "Get Expenses", "operation": "read", "query": "SELECT SUM(amount) as expenses FROM transactions WHERE type = ''expense'' AND DATE_TRUNC(''month'', created_at) = DATE_TRUNC(''month'', CURRENT_DATE - INTERVAL ''1 month'')"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "merge", "label": "Combine Data"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Calculate Metrics", "code": "const revenue = input.revenue || 0; const expenses = input.expenses || 0; const profit = revenue - expenses; const margin = revenue > 0 ? (profit / revenue) * 100 : 0; return { revenue, expenses, profit, margin: margin.toFixed(2) };"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "text_formatter", "label": "Format Report", "template": "Monthly Financial Report\nRevenue: ${{input.revenue}}\nExpenses: ${{input.expenses}}\nProfit: ${{input.profit}}\nMargin: {{input.margin}}%"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "google_gmail", "label": "Send Report", "to": "finance@example.com", "subject": "Monthly Financial Report", "body": "{{input.formatted_text}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  15,
  ARRAY['financial', 'report', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 7: API Integration Hub
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'API Integration Hub',
  'Integrate multiple third-party APIs with error handling and retry logic',
  'API Integration',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Integration Trigger", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "error_handler", "label": "Error Handler", "retries": 3, "retryDelay": 2000}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 150}, "data": {"type": "http_request", "label": "Call API A", "method": "POST", "url": "https://api-a.example.com/data"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "http_request", "label": "Call API B", "method": "POST", "url": "https://api-b.example.com/data"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Merge Responses"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Save Results", "operation": "write", "table": "api_integration_logs"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "slack_message", "label": "Notify Success", "channel": "#integrations", "message": "API integration completed successfully"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  20,
  ARRAY['api', 'integration', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 8: Real-time Analytics Dashboard
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Real-time Analytics Dashboard',
  'Process streaming data and update analytics dashboards in real-time',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Event Stream", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Event", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Aggregate Metrics", "code": "const event = input.parsed_data || {}; const metrics = { timestamp: Date.now(), event_type: event.type, value: event.value || 0 }; return metrics;"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "postgresql", "label": "Update Dashboard", "operation": "write", "table": "analytics_metrics"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "http_request", "label": "Push to Dashboard", "method": "POST", "url": "https://dashboard.example.com/api/metrics", "body": "{{JSON.stringify(input.metrics)}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['analytics', 'real-time', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 9: Automated Testing Pipeline
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Automated Testing Pipeline',
  'Run automated tests, generate reports, and notify team of results',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Code Push", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "http_request", "label": "Run Tests", "method": "POST", "url": "https://ci.example.com/api/tests/run"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Parse Results", "code": "const results = input.test_results || {}; const passed = results.passed || 0; const failed = results.failed || 0; const total = passed + failed; return { passed, failed, total, success_rate: total > 0 ? (passed / total * 100).toFixed(2) : 0 };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "All Tests Pass?", "condition": "{{input.failed}} === 0"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "slack_message", "label": "Notify Success", "channel": "#dev", "message": "All tests passed! ✅"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "slack_message", "label": "Notify Failure", "channel": "#dev", "message": "Tests failed: {{input.failed}} failed out of {{input.total}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Save Report", "operation": "write", "table": "test_reports"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  15,
  ARRAY['testing', 'automation', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 10: Compliance Monitoring System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Compliance Monitoring System',
  'Monitor compliance metrics and generate alerts for violations',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Check", "time": "09:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Transactions", "operation": "read", "query": "SELECT * FROM transactions WHERE created_at > NOW() - INTERVAL ''1 day''"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Check Compliance", "code": "const transactions = input.transactions || []; const violations = transactions.filter(t => t.amount > 10000 && !t.verified); return { violations, violation_count: violations.length };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "Violations Found?", "condition": "{{input.violation_count}} > 0"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "google_gmail", "label": "Alert Compliance Team", "to": "compliance@example.com", "subject": "Compliance Violations Detected", "body": "{{input.violation_count}} violations found"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "postgresql", "label": "Log Clean", "operation": "write", "table": "compliance_logs", "query": "INSERT INTO compliance_logs (status, checked_at) VALUES (''clean'', NOW())"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "slack_message", "label": "Notify Team", "channel": "#compliance", "message": "Compliance check completed: {{input.violation_count}} violations"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['compliance', 'monitoring', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 11: Multi-Step Approval Process
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Multi-Step Approval Process',
  'Route documents through multiple approval stages with conditional logic',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "form", "label": "Submit Document", "formTitle": "Document Submission"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Save Document", "operation": "write", "table": "documents"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Amount > 5000?", "condition": "{{input.amount}} > 5000"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "google_gmail", "label": "Notify Manager", "to": "manager@example.com", "subject": "Approval Required", "body": "Document #{{input.document_id}} requires your approval"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Notify Supervisor", "to": "supervisor@example.com", "subject": "Approval Required", "body": "Document #{{input.document_id}} requires your approval"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "wait", "label": "Wait for Approval", "duration": "2d"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Check Approval Status", "operation": "read", "query": "SELECT approved FROM document_approvals WHERE document_id = {{input.document_id}}"}},
    {"id": "n8", "type": "custom", "position": {"x": 1600, "y": 200}, "data": {"type": "google_gmail", "label": "Notify Result", "to": "{{input.submitter_email}}", "subject": "Document {{input.approved ? \"Approved\" : \"Rejected\"}}", "body": "Your document has been {{input.approved ? \"approved\" : \"rejected\"}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n7", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  15,
  ARRAY['approval', 'multi-step', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 12: Data Migration Pipeline
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Data Migration Pipeline',
  'Migrate data between systems with validation and rollback capabilities',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "manual_trigger", "label": "Start Migration"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Export Source Data", "operation": "read", "query": "SELECT * FROM source_table"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Validate Data", "code": "const data = input.source_data || []; const valid = data.filter(d => d.id && d.name); const invalid = data.filter(d => !d.id || !d.name); return { valid_data: valid, invalid_count: invalid.length };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "All Valid?", "condition": "{{input.invalid_count}} === 0"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "postgresql", "label": "Import to Target", "operation": "write", "table": "target_table"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "slack_message", "label": "Notify Success", "channel": "#migration", "message": "Migration completed successfully"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "google_gmail", "label": "Alert Errors", "to": "admin@example.com", "subject": "Migration Validation Failed", "body": "{{input.invalid_count}} records failed validation"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n7", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  20,
  ARRAY['migration', 'data', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 13: Customer Segmentation Engine
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Customer Segmentation Engine',
  'Segment customers based on behavior, demographics, and purchase history',
  'Sales & Marketing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Weekly Segmentation", "time": "02:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Customers", "operation": "read", "query": "SELECT * FROM customers"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Calculate Segments", "code": "const customers = input.customers || []; const segments = customers.map(c => { const totalSpent = c.total_purchases || 0; const segment = totalSpent > 1000 ? \"VIP\" : totalSpent > 500 ? \"Premium\" : \"Standard\"; return { ...c, segment }; }); return { segmented_customers: segments };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "postgresql", "label": "Update Segments", "operation": "write", "table": "customer_segments"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "javascript", "label": "Generate Report", "code": "const segments = input.segmented_customers || []; const counts = { VIP: 0, Premium: 0, Standard: 0 }; segments.forEach(s => counts[s.segment]++); return counts;"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "google_gmail", "label": "Send Report", "to": "marketing@example.com", "subject": "Customer Segmentation Report", "body": "VIP: {{input.VIP}}, Premium: {{input.Premium}}, Standard: {{input.Standard}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['segmentation', 'customer', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 14: Inventory Optimization System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Inventory Optimization System',
  'Optimize inventory levels based on sales forecasts and supplier data',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily Optimization", "time": "05:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 150}, "data": {"type": "postgresql", "label": "Get Sales Data", "operation": "read", "query": "SELECT product_id, SUM(quantity) as sales FROM orders WHERE created_at > NOW() - INTERVAL ''30 days'' GROUP BY product_id"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 250}, "data": {"type": "postgresql", "label": "Get Current Stock", "operation": "read", "query": "SELECT id, stock_level FROM products"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "merge", "label": "Combine Data"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Calculate Reorder", "code": "const avgDailySales = (input.sales || 0) / 30; const daysOfStock = input.stock_level / avgDailySales; const reorderNeeded = daysOfStock < 7; return { reorder_needed: reorderNeeded, recommended_order: reorderNeeded ? avgDailySales * 14 : 0 };"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "if_else", "label": "Need Reorder?", "condition": "{{input.reorder_needed}} === true"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "google_gmail", "label": "Notify Procurement", "to": "procurement@example.com", "subject": "Reorder Needed", "body": "Product {{input.product_id}} needs reorder: {{input.recommended_order}} units"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 250}, "data": {"type": "postgresql", "label": "Log Status", "operation": "write", "table": "inventory_optimization_logs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n8", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  20,
  ARRAY['inventory', 'optimization', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Intermediate Template 15: Automated Code Deployment
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Automated Code Deployment',
  'Deploy code to staging and production with automated testing and rollback',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Code Push", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "http_request", "label": "Deploy to Staging", "method": "POST", "url": "https://ci.example.com/api/deploy/staging"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "http_request", "label": "Run Tests", "method": "POST", "url": "https://ci.example.com/api/tests"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "Tests Pass?", "condition": "{{input.tests_passed}} === true"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "http_request", "label": "Deploy to Production", "method": "POST", "url": "https://ci.example.com/api/deploy/production"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "slack_message", "label": "Notify Failure", "channel": "#dev", "message": "Deployment failed: tests did not pass"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "slack_message", "label": "Notify Success", "channel": "#dev", "message": "Deployment to production successful! 🚀"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Intermediate',
  18,
  ARRAY['deployment', 'code', 'intermediate'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- ============================================
-- HARD DIFFICULTY TEMPLATES (15 templates)
-- ============================================

-- Delete existing advanced templates
DELETE FROM public.templates 
WHERE name IN (
  'Enterprise Data Warehouse ETL', 'Machine Learning Model Training Pipeline',
  'Real-time Fraud Detection System', 'Distributed Workflow Orchestrator',
  'Blockchain Transaction Processor', 'Multi-Tenant SaaS Provisioning',
  'Advanced Analytics Pipeline', 'Microservices Communication Orchestrator',
  'Real-time Recommendation System', 'Complex Event Processing Engine',
  'Distributed Cache Synchronization', 'Advanced Security Monitoring System',
  'High-Frequency Trading System', 'Quantum Computing Job Scheduler',
  'Autonomous System Controller'
);

-- Hard Template 1: Enterprise Data Warehouse ETL
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Enterprise Data Warehouse ETL',
  'Extract, transform, and load data from multiple sources into data warehouse with complex transformations',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Daily ETL", "time": "02:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 100}, "data": {"type": "postgresql", "label": "Extract Source A", "operation": "read", "query": "SELECT * FROM source_system_a"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "http_request", "label": "Extract Source B", "method": "GET", "url": "https://api.source-b.com/data"}},
    {"id": "n4", "type": "custom", "position": {"x": 350, "y": 300}, "data": {"type": "postgresql", "label": "Extract Source C", "operation": "read", "query": "SELECT * FROM source_system_c"}},
    {"id": "n5", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "merge", "label": "Merge Sources"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Transform Data", "code": "const data = input.merged_data || []; const transformed = data.map(d => ({ id: d.id, name: d.name.toUpperCase(), amount: parseFloat(d.amount || 0), timestamp: new Date().toISOString() })); return { transformed_data: transformed };"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Load to Warehouse", "operation": "write", "table": "data_warehouse"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "slack_message", "label": "Notify Completion", "channel": "#data-warehouse", "message": "ETL process completed successfully"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n1", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n2", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e9", "source": "n7", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  30,
  ARRAY['etl', 'warehouse', 'advanced'],
  true,
  true,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 2: Machine Learning Model Training Pipeline
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Machine Learning Model Training Pipeline',
  'Train, validate, and deploy ML models with A/B testing and versioning',
  'AI & Machine Learning',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Weekly Training", "time": "03:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Training Data", "operation": "read", "query": "SELECT * FROM training_dataset"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Preprocess Data", "code": "const data = input.training_data || []; const processed = data.map(d => ({ features: d.features, label: d.label })); return { processed_data: processed };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "http_request", "label": "Train Model", "method": "POST", "url": "https://ml-api.example.com/train", "body": "{{JSON.stringify(input.processed_data)}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "javascript", "label": "Validate Model", "code": "const accuracy = input.model_accuracy || 0; const isValid = accuracy > 0.85; return { is_valid: isValid, accuracy };"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "if_else", "label": "Model Valid?", "condition": "{{input.is_valid}} === true"}},
    {"id": "n7", "type": "custom", "position": {"x": 1600, "y": 150}, "data": {"type": "http_request", "label": "Deploy Model", "method": "POST", "url": "https://ml-api.example.com/deploy"}},
    {"id": "n8", "type": "custom", "position": {"x": 1600, "y": 250}, "data": {"type": "google_gmail", "label": "Alert Low Accuracy", "to": "ml-team@example.com", "subject": "Model Validation Failed", "body": "Model accuracy: {{input.accuracy}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n6", "target": "n7", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n8", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  25,
  ARRAY['ml', 'training', 'advanced'],
  true,
  true,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 3: Real-time Fraud Detection System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Real-time Fraud Detection System',
  'Detect fraudulent transactions in real-time using ML models and rule engines',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Transaction Event", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Transaction", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 150}, "data": {"type": "javascript", "label": "Rule Engine Check", "code": "const tx = input.parsed_data || {}; const suspicious = tx.amount > 10000 || tx.location !== tx.user_location; return { is_suspicious: suspicious, risk_score: suspicious ? 0.8 : 0.2 };"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "http_request", "label": "ML Model Check", "method": "POST", "url": "https://fraud-api.example.com/predict", "body": "{{JSON.stringify(input.parsed_data)}}"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Combine Scores"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "javascript", "label": "Calculate Final Risk", "code": "const ruleScore = input.risk_score || 0; const mlScore = input.ml_risk_score || 0; const finalScore = (ruleScore * 0.4 + mlScore * 0.6); return { final_risk_score: finalScore, is_fraud: finalScore > 0.7 };"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "if_else", "label": "Fraud Detected?", "condition": "{{input.is_fraud}} === true"}},
    {"id": "n8", "type": "custom", "position": {"x": 1600, "y": 150}, "data": {"type": "postgresql", "label": "Block Transaction", "operation": "write", "table": "blocked_transactions"}},
    {"id": "n9", "type": "custom", "position": {"x": 1600, "y": 250}, "data": {"type": "postgresql", "label": "Approve Transaction", "operation": "write", "table": "approved_transactions"}},
    {"id": "n10", "type": "custom", "position": {"x": 1850, "y": 150}, "data": {"type": "slack_message", "label": "Alert Security", "channel": "#security", "message": "Fraud detected: Transaction #{{input.transaction_id}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n7", "target": "n8", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e9", "source": "n7", "target": "n9", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e10", "source": "n8", "target": "n10", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  30,
  ARRAY['fraud', 'detection', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 4: Distributed Workflow Orchestrator
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Distributed Workflow Orchestrator',
  'Orchestrate complex workflows across distributed systems with fault tolerance',
  'Workflow Orchestration',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Workflow Trigger", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "error_handler", "label": "Fault Handler", "retries": 5, "retryDelay": 3000}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 100}, "data": {"type": "http_request", "label": "Service A", "method": "POST", "url": "https://service-a.example.com/execute"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "http_request", "label": "Service B", "method": "POST", "url": "https://service-b.example.com/execute"}},
    {"id": "n5", "type": "custom", "position": {"x": 600, "y": 300}, "data": {"type": "http_request", "label": "Service C", "method": "POST", "url": "https://service-c.example.com/execute"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Aggregate Results"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Log Execution", "operation": "write", "table": "workflow_executions"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "slack_message", "label": "Notify Completion", "channel": "#workflows", "message": "Distributed workflow completed"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n2", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n3", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e9", "source": "n7", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  35,
  ARRAY['orchestration', 'distributed', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 5: Blockchain Transaction Processor
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Blockchain Transaction Processor',
  'Process blockchain transactions with validation, consensus, and smart contract execution',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Transaction Request", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "javascript", "label": "Validate Transaction", "code": "const tx = input.transaction || {}; const isValid = tx.from && tx.to && tx.amount > 0 && tx.signature; return { is_valid: isValid, transaction: tx };"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "Valid?", "condition": "{{input.is_valid}} === true"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "http_request", "label": "Broadcast to Network", "method": "POST", "url": "https://blockchain-api.example.com/broadcast"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "wait", "label": "Wait for Consensus", "duration": "30s"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "http_request", "label": "Execute Smart Contract", "method": "POST", "url": "https://blockchain-api.example.com/execute"}},
    {"id": "n7", "type": "custom", "position": {"x": 1600, "y": 150}, "data": {"type": "postgresql", "label": "Record Transaction", "operation": "write", "table": "blockchain_transactions"}},
    {"id": "n8", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "google_gmail", "label": "Reject Transaction", "to": "{{input.user_email}}", "subject": "Transaction Rejected", "body": "Transaction validation failed"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n8", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  40,
  ARRAY['blockchain', 'transaction', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 6: Multi-Tenant SaaS Provisioning
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Multi-Tenant SaaS Provisioning',
  'Provision and manage resources for multiple tenants with isolation and scaling',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "New Tenant", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "javascript", "label": "Generate Tenant ID", "code": "const tenantId = \"tenant_\" + Date.now() + \"_\" + Math.random().toString(36).substr(2, 9); return { tenant_id: tenantId };"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 150}, "data": {"type": "postgresql", "label": "Create Database", "operation": "write", "table": "tenant_databases"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "http_request", "label": "Provision Resources", "method": "POST", "url": "https://infra-api.example.com/provision"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Combine Results"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Activate Tenant", "operation": "write", "table": "tenants"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "google_gmail", "label": "Welcome Email", "to": "{{input.admin_email}}", "subject": "Your account is ready", "body": "Tenant ID: {{input.tenant_id}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  35,
  ARRAY['saas', 'multi-tenant', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 7: Advanced Analytics Pipeline
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Advanced Analytics Pipeline',
  'Process large-scale data for advanced analytics with streaming and batch processing',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "schedule", "label": "Hourly Processing", "time": "00:00", "timezone": "Asia/Kolkata"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "postgresql", "label": "Get Raw Data", "operation": "read", "query": "SELECT * FROM raw_events WHERE processed = false LIMIT 10000"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Process Events", "code": "const events = input.raw_data || []; const processed = events.map(e => ({ ...e, processed_at: new Date().toISOString(), processed: true })); return { processed_events: processed };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "javascript", "label": "Calculate Metrics", "code": "const events = input.processed_events || []; const metrics = { total: events.length, by_type: {}, avg_value: 0 }; events.forEach(e => { metrics.by_type[e.type] = (metrics.by_type[e.type] || 0) + 1; }); return metrics;"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Store Analytics", "operation": "write", "table": "analytics_results"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "http_request", "label": "Update Dashboard", "method": "POST", "url": "https://dashboard.example.com/api/update", "body": "{{JSON.stringify(input.metrics)}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  30,
  ARRAY['analytics', 'pipeline', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 8: Microservices Communication Orchestrator
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Microservices Communication Orchestrator',
  'Orchestrate communication between microservices with saga pattern and compensation',
  'Workflow Orchestration',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Saga Start", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 150}, "data": {"type": "http_request", "label": "Service 1", "method": "POST", "url": "https://service1.example.com/execute"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 250}, "data": {"type": "http_request", "label": "Service 2", "method": "POST", "url": "https://service2.example.com/execute"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "if_else", "label": "All Success?", "condition": "{{input.service1_success}} === true && {{input.service2_success}} === true"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 150}, "data": {"type": "http_request", "label": "Commit All", "method": "POST", "url": "https://orchestrator.example.com/commit"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "http_request", "label": "Compensate", "method": "POST", "url": "https://orchestrator.example.com/compensate"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Log Saga", "operation": "write", "table": "saga_executions"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  35,
  ARRAY['microservices', 'orchestration', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 9: Real-time Recommendation System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Real-time Recommendation System',
  'Generate real-time recommendations using collaborative filtering and deep learning',
  'AI & Machine Learning',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "User Action", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 150}, "data": {"type": "postgresql", "label": "Get User History", "operation": "read", "query": "SELECT * FROM user_interactions WHERE user_id = {{input.user_id}} ORDER BY created_at DESC LIMIT 50"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 250}, "data": {"type": "postgresql", "label": "Get Similar Users", "operation": "read", "query": "SELECT user_id FROM user_similarity WHERE similar_to = {{input.user_id}} LIMIT 20"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "merge", "label": "Combine Data"}},
    {"id": "n5", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "http_request", "label": "ML Model Predict", "method": "POST", "url": "https://ml-api.example.com/recommend", "body": "{{JSON.stringify(input.combined_data)}}"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "javascript", "label": "Rank Recommendations", "code": "const recommendations = input.ml_recommendations || []; const ranked = recommendations.sort((a, b) => b.score - a.score).slice(0, 10); return { top_recommendations: ranked };"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "http_request", "label": "Update UI", "method": "POST", "url": "https://api.example.com/recommendations", "body": "{{JSON.stringify(input.top_recommendations)}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  30,
  ARRAY['recommendation', 'real-time', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 10: Complex Event Processing Engine
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Complex Event Processing Engine',
  'Process complex event patterns from multiple streams with temporal logic',
  'Data Processing',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Event Stream A", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 100, "y": 300}, "data": {"type": "webhook", "label": "Event Stream B", "method": "POST"}},
    {"id": "n3", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Event A", "operation": "parse"}},
    {"id": "n4", "type": "custom", "position": {"x": 350, "y": 300}, "data": {"type": "json_parser", "label": "Parse Event B", "operation": "parse"}},
    {"id": "n5", "type": "custom", "position": {"x": 600, "y": 250}, "data": {"type": "merge", "label": "Combine Events"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 250}, "data": {"type": "javascript", "label": "Detect Pattern", "code": "const events = input.combined_events || []; const pattern = events.filter(e => e.type === \"purchase\" && e.amount > 100).length >= 3; return { pattern_detected: pattern, event_count: events.length };"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "if_else", "label": "Pattern Match?", "condition": "{{input.pattern_detected}} === true"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "slack_message", "label": "Alert Pattern", "channel": "#alerts", "message": "Complex pattern detected: {{input.event_count}} events"}},
    {"id": "n9", "type": "custom", "position": {"x": 1350, "y": 300}, "data": {"type": "postgresql", "label": "Log Events", "operation": "write", "table": "event_logs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n7", "target": "n8", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e8", "source": "n7", "target": "n9", "sourceHandle": "false", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  35,
  ARRAY['event-processing', 'complex', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 11: Distributed Cache Synchronization
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Distributed Cache Synchronization',
  'Synchronize distributed caches across multiple regions with consistency guarantees',
  'Database Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Cache Update", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Update", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 100}, "data": {"type": "http_request", "label": "Sync Region 1", "method": "PUT", "url": "https://cache-region1.example.com/update"}},
    {"id": "n4", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "http_request", "label": "Sync Region 2", "method": "PUT", "url": "https://cache-region2.example.com/update"}},
    {"id": "n5", "type": "custom", "position": {"x": 600, "y": 300}, "data": {"type": "http_request", "label": "Sync Region 3", "method": "PUT", "url": "https://cache-region3.example.com/update"}},
    {"id": "n6", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "merge", "label": "Aggregate Syncs"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "postgresql", "label": "Log Sync", "operation": "write", "table": "cache_sync_logs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n2", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n2", "target": "n5", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e5", "source": "n3", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  30,
  ARRAY['cache', 'distributed', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 12: Advanced Security Monitoring System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Advanced Security Monitoring System',
  'Monitor security events, detect threats, and trigger automated responses',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Security Event", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Event", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Analyze Threat", "code": "const event = input.parsed_data || {}; const threatLevel = event.failed_logins > 5 ? \"high\" : event.failed_logins > 2 ? \"medium\" : \"low\"; return { threat_level: threatLevel, event: event };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "switch", "label": "Route by Threat", "cases": [{"value": "high", "label": "High"}, {"value": "medium", "label": "Medium"}, {"value": "low", "label": "Low"}]}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 100}, "data": {"type": "postgresql", "label": "Block IP", "operation": "write", "table": "blocked_ips"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 200}, "data": {"type": "slack_message", "label": "Alert Security", "channel": "#security", "message": "Medium threat detected"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 300}, "data": {"type": "postgresql", "label": "Log Event", "operation": "write", "table": "security_logs"}},
    {"id": "n8", "type": "custom", "position": {"x": 1350, "y": 100}, "data": {"type": "google_gmail", "label": "Notify Admin", "to": "security@example.com", "subject": "High Threat Alert", "body": "IP blocked: {{input.event.ip_address}}"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "high", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "medium", "targetHandle": "input"},
    {"id": "e6", "source": "n4", "target": "n7", "sourceHandle": "low", "targetHandle": "input"},
    {"id": "e7", "source": "n5", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  35,
  ARRAY['security', 'monitoring', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 13: High-Frequency Trading System
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'High-Frequency Trading System',
  'Execute trades based on real-time market data with sub-millisecond latency',
  'Finance & Accounting',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Market Data", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Market Data", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Calculate Signal", "code": "const data = input.parsed_data || {}; const priceChange = data.current_price - data.previous_price; const signal = priceChange > data.threshold ? \"buy\" : priceChange < -data.threshold ? \"sell\" : \"hold\"; return { signal, price_change: priceChange };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "switch", "label": "Route Signal", "cases": [{"value": "buy", "label": "Buy"}, {"value": "sell", "label": "Sell"}, {"value": "hold", "label": "Hold"}]}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "http_request", "label": "Execute Buy", "method": "POST", "url": "https://trading-api.example.com/buy"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "http_request", "label": "Execute Sell", "method": "POST", "url": "https://trading-api.example.com/sell"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 200}, "data": {"type": "postgresql", "label": "Log Trade", "operation": "write", "table": "trade_executions"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "buy", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "sell", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  40,
  ARRAY['trading', 'high-frequency', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 14: Quantum Computing Job Scheduler
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Quantum Computing Job Scheduler',
  'Schedule and execute quantum computing jobs with resource optimization',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Job Request", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "javascript", "label": "Optimize Resources", "code": "const job = input.job || {}; const priority = job.priority || 0; const estimatedTime = job.complexity * 1000; return { priority, estimated_time: estimatedTime, resource_allocation: \"optimal\" };"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "postgresql", "label": "Check Queue", "operation": "read", "query": "SELECT COUNT(*) as queue_length FROM quantum_jobs WHERE status = ''pending''"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "Queue Available?", "condition": "{{input.queue_length}} < 10"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "http_request", "label": "Submit Job", "method": "POST", "url": "https://quantum-api.example.com/submit"}},
    {"id": "n6", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "google_gmail", "label": "Notify Queue Full", "to": "{{input.user_email}}", "subject": "Job Queued", "body": "Your job has been queued due to high demand"}},
    {"id": "n7", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "postgresql", "label": "Log Job", "operation": "write", "table": "quantum_jobs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n6", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n7", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  45,
  ARRAY['quantum', 'computing', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- Hard Template 15: Autonomous System Controller
INSERT INTO public.templates (name, description, category, nodes, edges, difficulty, estimated_setup_time, tags, is_active, is_featured, created_by)
VALUES (
  'Autonomous System Controller',
  'Control autonomous systems with real-time decision making and safety constraints',
  'Internal Operations',
  '[
    {"id": "n1", "type": "custom", "position": {"x": 100, "y": 200}, "data": {"type": "webhook", "label": "Sensor Data", "method": "POST"}},
    {"id": "n2", "type": "custom", "position": {"x": 350, "y": 200}, "data": {"type": "json_parser", "label": "Parse Sensors", "operation": "parse"}},
    {"id": "n3", "type": "custom", "position": {"x": 600, "y": 200}, "data": {"type": "javascript", "label": "Safety Check", "code": "const sensors = input.parsed_data || {}; const isSafe = sensors.temperature < 80 && sensors.pressure < 100 && sensors.speed < 50; return { is_safe: isSafe, sensor_data: sensors };"}},
    {"id": "n4", "type": "custom", "position": {"x": 850, "y": 200}, "data": {"type": "if_else", "label": "Safe to Proceed?", "condition": "{{input.is_safe}} === true"}},
    {"id": "n5", "type": "custom", "position": {"x": 1100, "y": 150}, "data": {"type": "javascript", "label": "Calculate Action", "code": "const sensors = input.sensor_data || {}; const action = { direction: sensors.direction || 0, speed: sensors.target_speed || 0, timestamp: Date.now() }; return action;"}},
    {"id": "n6", "type": "custom", "position": {"x": 1350, "y": 150}, "data": {"type": "http_request", "label": "Execute Command", "method": "POST", "url": "https://control-api.example.com/execute", "body": "{{JSON.stringify(input.action)}}"}},
    {"id": "n7", "type": "custom", "position": {"x": 1100, "y": 250}, "data": {"type": "http_request", "label": "Emergency Stop", "method": "POST", "url": "https://control-api.example.com/emergency-stop"}},
    {"id": "n8", "type": "custom", "position": {"x": 1600, "y": 200}, "data": {"type": "postgresql", "label": "Log Action", "operation": "write", "table": "autonomous_logs"}}
  ]'::jsonb,
  '[
    {"id": "e1", "source": "n1", "target": "n2", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e2", "source": "n2", "target": "n3", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e3", "source": "n3", "target": "n4", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e4", "source": "n4", "target": "n5", "sourceHandle": "true", "targetHandle": "input"},
    {"id": "e5", "source": "n4", "target": "n7", "sourceHandle": "false", "targetHandle": "input"},
    {"id": "e6", "source": "n5", "target": "n6", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e7", "source": "n6", "target": "n8", "sourceHandle": "output", "targetHandle": "input"},
    {"id": "e8", "source": "n7", "target": "n8", "sourceHandle": "output", "targetHandle": "input"}
  ]'::jsonb,
  'Advanced',
  40,
  ARRAY['autonomous', 'control', 'advanced'],
  true,
  false,
  COALESCE((SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1), (SELECT id FROM auth.users ORDER BY created_at LIMIT 1))
);

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  difficulty,
  COUNT(*) as count,
  COUNT(CASE WHEN is_featured THEN 1 END) as featured_count
FROM public.templates
WHERE created_by IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
GROUP BY difficulty
ORDER BY 
  CASE difficulty
    WHEN 'Beginner' THEN 1
    WHEN 'Intermediate' THEN 2
    WHEN 'Advanced' THEN 3
  END;

COMMIT;
