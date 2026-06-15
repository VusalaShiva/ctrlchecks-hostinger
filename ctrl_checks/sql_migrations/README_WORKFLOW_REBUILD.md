# Workflow System Rebuild - SQL Scripts Guide

This directory contains SQL scripts to safely rebuild your workflow system with a clean, production-ready schema.

## 📋 Overview

The rebuild process includes:
1. **Safe deletion** of old admin-created templates
2. **New production-ready schema** with difficulty level support
3. **Sample data** with 50 workflows (20 medium, 15 intermediate, 15 hard)

## 🚀 Execution Order

Execute these scripts in the following order:

### Step 1: Safe Deletion of Admin Templates
**File:** `23_safe_delete_admin_templates.sql`

**Purpose:** Safely remove old admin-created templates while preserving user-created workflows.

**Important Notes:**
- ⚠️ **REVIEW ALL SELECT QUERIES FIRST** before running DELETE statements
- The script includes comprehensive backup queries to preview what will be deleted
- User workflows created from templates will remain intact (template reference will be set to NULL)
- Run in a transaction - use `ROLLBACK` if something looks wrong

**How to Execute:**
1. Open the script in Supabase SQL Editor
2. Run all SELECT queries in STEP 2 to review what will be deleted
3. Verify the results match your expectations
4. If satisfied, run the DELETE statements
5. Run verification queries in STEP 5
6. If everything looks good, run `COMMIT;` otherwise `ROLLBACK;`

### Step 2: Create New Schema
**File:** `24_new_workflow_schema.sql`

**Purpose:** Create the new production-ready workflow system schema.

**What It Creates:**
- `workflows_new` - Main workflows table with difficulty levels
- `workflow_nodes` - Individual nodes with JSONB configuration
- `workflow_edges` - Connections between nodes
- `workflow_inputs` - Structured input field definitions
- `workflow_versions` - Version control with snapshots
- `execution_logs` - Comprehensive execution logging

**Features:**
- ✅ Difficulty level support (medium, intermediate, hard)
- ✅ Soft delete support (`deleted_at` column)
- ✅ JSONB for flexible node configuration
- ✅ Comprehensive indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Foreign keys with CASCADE where appropriate

**How to Execute:**
1. Open the script in Supabase SQL Editor
2. Review the schema structure
3. Execute the entire script
4. Verify tables were created: `\dt public.workflows_new`

### Step 3: Insert Sample Data
**File:** `25_workflow_sample_data.sql`

**Purpose:** Insert 50 sample workflows with proper difficulty categorization.

**What It Inserts:**
- 20 **medium** difficulty workflows
- 15 **intermediate** difficulty workflows
- 15 **hard** difficulty workflows

**Includes:**
- Example workflow inputs (for "Email Newsletter Automation")
- Example nodes and edges (for "Email Newsletter Automation")
- Verification queries at the end

**Prerequisites:**
- At least one user must exist in the system (preferably an admin user)
- The script will automatically use the first admin user, or fall back to the first user

**How to Execute:**
1. Ensure you have at least one user in the system
2. Open the script in Supabase SQL Editor
3. Execute the entire script
4. Run the verification queries at the end to confirm data was inserted

**Note:** This script inserts workflows into `workflows_new` table. To make them visible in the UI, proceed to Step 4.

### Step 4: Insert Templates for UI Display
**File:** `27_insert_templates_directly.sql`

**Purpose:** Insert the 50 workflows directly into the `templates` table so they appear in the UI.

**Why This Step is Needed:**
- The UI reads from the `templates` table, not `workflows_new`
- This script converts the workflows into the template format expected by the UI
- Templates include proper categories, difficulty levels (Beginner/Intermediate/Advanced), tags, and basic node/edge structures

**What It Inserts:**
- 20 **Beginner** templates (from medium difficulty workflows)
- 15 **Intermediate** templates
- 15 **Advanced** templates (from hard difficulty workflows)

**Features:**
- ✅ Automatically maps workflows to appropriate categories (AI & Machine Learning, Sales & Marketing, etc.)
- ✅ Converts difficulty levels (medium → Beginner, intermediate → Intermediate, hard → Advanced)
- ✅ Generates relevant tags from workflow names and descriptions
- ✅ Sets estimated setup times based on difficulty
- ✅ Marks important templates as featured
- ✅ Prevents duplicates (won't insert if template name already exists)

**How to Execute:**
1. Open the script in Supabase SQL Editor
2. Execute the entire script
3. Refresh your templates page in the UI
4. You should now see all 50 new templates

**Alternative:** If you prefer to convert existing workflows from `workflows_new`, you can use `26_convert_workflows_to_templates.sql` instead, which dynamically builds nodes/edges from the workflow_nodes and workflow_edges tables.

## 📊 Schema Structure

### workflows_new Table
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- description (TEXT)
- difficulty_level (ENUM: medium, intermediate, hard)
- status (ENUM: draft, active, archived)
- created_by (UUID, Foreign Key to auth.users)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
- deleted_at (TIMESTAMPTZ, NULL = not deleted)
```

### workflow_inputs Table
```sql
- id (UUID, Primary Key)
- workflow_id (UUID, Foreign Key)
- field_name (TEXT, Unique per workflow)
- label (TEXT, Required)
- type (ENUM: text, number, boolean, select, file)
- required (BOOLEAN)
- default_value (TEXT)
- validation_rules (JSONB)
- placeholder (TEXT)
- description (TEXT)
- display_order (INTEGER)
```

### workflow_nodes Table
```sql
- id (UUID, Primary Key)
- workflow_id (UUID, Foreign Key)
- node_id (TEXT, Unique per workflow)
- node_type (TEXT)
- label (TEXT)
- position_x, position_y (INTEGER)
- configuration (JSONB)
```

### workflow_edges Table
```sql
- id (UUID, Primary Key)
- workflow_id (UUID, Foreign Key)
- source_node_id (TEXT)
- target_node_id (TEXT)
- source_handle, target_handle (TEXT)
- condition (JSONB, for if-else logic)
```

## 🔍 Verification Queries

After running all scripts, use these queries to verify:

### Count templates by difficulty (for UI display)
```sql
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
```

### List all templates (for UI display)
```sql
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
WHERE created_by IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
ORDER BY is_featured DESC, created_at DESC;
```

### Count templates by category
```sql
SELECT 
  category,
  COUNT(*) as count
FROM public.templates
WHERE created_by IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
GROUP BY category
ORDER BY count DESC, category;
```

### Verify workflows in new schema

### Count workflows by difficulty
```sql
SELECT 
  difficulty_level,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
FROM public.workflows_new
GROUP BY difficulty_level;
```

### List all workflows
```sql
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
```

### Check workflow inputs
```sql
SELECT 
  w.name as workflow_name,
  wi.field_name,
  wi.label,
  wi.type,
  wi.required
FROM public.workflow_inputs wi
JOIN public.workflows_new w ON w.id = wi.workflow_id
ORDER BY w.name, wi.display_order;
```

### Check nodes and edges
```sql
SELECT 
  w.name as workflow_name,
  wn.node_id,
  wn.node_type,
  wn.label,
  COUNT(we.id) as edge_count
FROM public.workflow_nodes wn
JOIN public.workflows_new w ON w.id = wn.workflow_id
LEFT JOIN public.workflow_edges we ON we.workflow_id = wn.workflow_id 
  AND (we.source_node_id = wn.node_id OR we.target_node_id = wn.node_id)
GROUP BY w.name, wn.node_id, wn.node_type, wn.label;
```

## ⚠️ Important Notes

1. **Backup First:** Always backup your database before running deletion scripts
2. **Test Environment:** Test these scripts in a development/staging environment first
3. **User Requirements:** Ensure at least one user exists before running sample data script
4. **Transaction Safety:** All scripts use transactions - review before committing
5. **RLS Policies:** Row Level Security is enabled - adjust policies as needed for your use case

## 🔄 Migration Path

If you need to migrate data from old tables to new tables:

1. Export data from old `workflows` table
2. Transform data to match new schema
3. Insert into `workflows_new` table
4. Map old nodes/edges JSONB to new `workflow_nodes` and `workflow_edges` tables
5. Create corresponding `workflow_inputs` based on your requirements

## 📝 Next Steps

After completing the rebuild:

1. Update your application code to use the new schema
2. Update API endpoints to work with new table structure
3. Migrate any existing workflows if needed
4. Test thoroughly in development before deploying to production
5. Update documentation for your team

## 🆘 Troubleshooting

### "No users found" error
- Create a user account first through your application
- Or manually insert a user into `auth.users` table

### Foreign key constraint errors
- Ensure parent records exist before inserting child records
- Check that user IDs are valid UUIDs

### RLS policy errors
- Verify you're authenticated
- Check that RLS policies allow your operations
- Temporarily disable RLS for testing: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

## 📚 Related Files

- `01_database_setup.sql` - Original database setup (reference only)
- `05_role_based_templates.sql` - Old template system (reference only)
- `23_safe_delete_admin_templates.sql` - Safe deletion of old admin templates
- `24_new_workflow_schema.sql` - New production-ready schema
- `24_fix_workflow_versions.sql` - Quick fix for workflow_versions table conflicts
- `25_workflow_sample_data.sql` - Sample workflow data insertion
- `26_convert_workflows_to_templates.sql` - Convert workflows_new to templates (alternative)
- `27_insert_templates_directly.sql` - Direct template insertion for UI display

---

**Created:** 2025-01-XX  
**Last Updated:** 2025-01-XX  
**Version:** 1.1

## 🎯 Quick Start Summary

For a complete rebuild, execute in this order:

1. **`23_safe_delete_admin_templates.sql`** - Remove old templates (review first!)
2. **`24_new_workflow_schema.sql`** - Create new schema
3. **`25_workflow_sample_data.sql`** - Insert 50 workflows into workflows_new
4. **`27_insert_templates_directly.sql`** - Insert 50 templates for UI display ⭐

After Step 4, refresh your templates page to see all new workflows!
