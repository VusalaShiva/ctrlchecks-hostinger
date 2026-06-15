# Template Editing Guide for Admins

## Overview

When admins edit templates, the changes automatically affect **all users** who have workflows based on that template. This guide explains how the system works.

## How Template Editing Works

### 1. **Template Versioning**
- Each template has a `version` field that auto-increments when nodes/edges are updated
- When a user copies a template, their workflow stores:
  - `template_id`: Reference to the template
  - `template_version`: The version number at the time of copying

### 2. **Editing Templates**

#### **Edit Metadata** (Name, Description, Category, etc.)
- Location: Admin Templates Manager (`/admin/templates`)
- Click the **Edit** button (pencil icon) on any template
- Update fields like name, description, category, difficulty, tags
- **Warning**: You'll see a confirmation dialog explaining that changes affect all users
- Version: Only increments if nodes/edges change (metadata updates don't increment version)

#### **Edit Workflow** (Nodes and Edges)
- Location: Template Editor (`/admin/template/{id}/edit`)
- Click the **Edit Workflow** button (GitBranch icon) on any template
- Use the visual workflow builder to add/modify nodes and edges
- Click **Save Template** to save changes
- **Warning**: Confirmation dialog warns that changes affect all users
- Version: **Automatically increments** when nodes/edges are saved

### 3. **Automatic Version Incrementing**

The database trigger `increment_template_version()` automatically:
- Detects when `nodes` or `edges` JSONB fields change
- Increments the `version` field
- Updates `updated_at` timestamp
- Sets `updated_by` to the admin user who made the change

```sql
-- Trigger fires automatically on UPDATE
CREATE TRIGGER template_version_trigger
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_template_version();
```

### 4. **Impact on Users**

When an admin updates a template:

1. **New Users**: Will see the latest version when they copy the template
2. **Existing Users**: 
   - Their workflows still reference the old `template_version`
   - They can continue using their workflows normally
   - They can optionally update their workflow to the new template version (future feature)

### 5. **Best Practices**

✅ **DO:**
- Test template changes in a test environment first
- Update templates during low-usage periods
- Communicate major template changes to users
- Use descriptive version notes (future feature)

❌ **DON'T:**
- Make breaking changes without warning users
- Delete templates that are actively used
- Update templates without testing first

## Template Editor Features

### Visual Indicators
- **Version Badge**: Shows current template version (e.g., "v2")
- **Usage Count**: Shows how many times template has been copied
- **Warning Badge**: "⚠️ Changes affect all users" reminder

### Save Process
1. Admin makes changes to nodes/edges
2. Clicks "Save Template"
3. Confirmation dialog appears with warning
4. Admin confirms
5. Template is saved
6. Version auto-increments
7. Success message shows new version number

## Future Enhancements

### Planned Features:
1. **Template Update Notifications**: Notify users when templates they use are updated
2. **Sync Workflow with Template**: Allow users to update their workflow to latest template version
3. **Version History**: View and restore previous template versions
4. **Change Log**: Track what changed between versions
5. **Rollback**: Revert to previous template version

## Database Schema

```sql
-- Templates table
CREATE TABLE public.templates (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  nodes JSONB NOT NULL,        -- Workflow nodes
  edges JSONB NOT NULL,        -- Workflow edges
  version INTEGER NOT NULL DEFAULT 1,  -- Auto-increments on node/edge changes
  use_count INTEGER DEFAULT 0,  -- How many times copied
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Workflows table (user copies)
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  template_id UUID,            -- Reference to template
  template_version INTEGER,    -- Version when copied
  nodes JSONB,
  edges JSONB,
  ...
);
```

## API Endpoints

### Admin Template Management
- `GET /admin-templates` - List all templates
- `GET /admin-templates/:id` - Get single template
- `POST /admin-templates` - Create template
- `PUT /admin-templates/:id` - Update template metadata
- `PATCH /admin-templates/:id` - Update template (supports partial updates)
- `DELETE /admin-templates/:id` - Delete template

### Template Editor
- Uses same endpoints but updates `nodes` and `edges` fields
- Version increments automatically via database trigger

## Troubleshooting

### Template version not incrementing?
- Check if `nodes` or `edges` actually changed (metadata updates don't increment)
- Verify trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'template_version_trigger';`
- Check trigger function: `SELECT * FROM pg_proc WHERE proname = 'increment_template_version';`

### Users not seeing updates?
- New template versions only affect new copies
- Existing workflows keep their original template version
- Users need to manually update their workflows (future feature)

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0
