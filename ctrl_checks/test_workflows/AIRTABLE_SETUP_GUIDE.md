# Airtable Base Setup Guide

## Your Base is Empty - That's OK!

Since you just created your Airtable account, your base is likely empty. You need to set up at least one table with some fields before you can test the workflow.

## Quick Setup (5 minutes)

### Step 1: Open Your Airtable Base

1. Go to: https://airtable.com/appLkNDICXNqxSDhG
2. You should see an empty base or a default "Table 1"

### Step 2: Create Fields (Columns)

Your table needs at least one field to store data. Here's a simple setup:

**Option A: Simple Test Table**
1. Click on the first column header (usually "Name" or "Field 1")
2. Rename it to "Name" (or keep it as "Name" if it already exists)
3. Add another field:
   - Click the "+" button to add a new column
   - Name it: "Notes"
   - Type: "Long text" (or "Single line text")

**Option B: Use Default Fields**
- Most Airtable bases come with a "Name" field by default
- You can use just that for testing

### Step 3: Verify Your Table Name

1. Look at the tab at the top of your base
2. The default is usually **"Table 1"**
3. Note the exact name (case-sensitive, including spaces)

### Step 4: Test Your Setup

Now you can test with these workflows:

#### Test 1: List Records (Should work even if empty)
```json
{
  "operation": "list",
  "maxRecords": 10
}
```
This should return an empty array `[]` if your table has no records - that's OK!

#### Test 2: Create a Record
```json
{
  "operation": "create",
  "records": "[{\"fields\": {\"Name\": \"Test Record\"}}]"
}
```

## Recommended Table Structure for Testing

Here's a simple table structure you can create:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Name | Single line text | Required field (usually exists by default) |
| Notes | Long text | Optional field for testing |
| Status | Single select | Optional: "Active", "Inactive" |

### How to Create This:

1. **Name field**: Usually exists by default
2. **Notes field**: 
   - Click "+" to add column
   - Name: "Notes"
   - Type: "Long text"
3. **Status field** (optional):
   - Click "+" to add column
   - Name: "Status"
   - Type: "Single select"
   - Options: "Active", "Inactive"

## Quick Test Workflow

Once you have at least the "Name" field, try this:

```json
{
  "nodes": [
    {
      "id": "trigger",
      "type": "manual_trigger",
      "data": {
        "type": "manual_trigger",
        "config": {}
      }
    },
    {
      "id": "create",
      "type": "airtable",
      "data": {
        "type": "airtable",
        "config": {
          "apiKey": "AIRTABLE_PAT_REPLACE_ME",
          "baseId": "appLkNDICXNqxSDhG",
          "table": "Table 1",
          "resource": "Record",
          "operation": "create",
          "records": "[{\"fields\": {\"Name\": \"My First Record\"}}]"
        }
      }
    }
  ],
  "edges": [
    {
      "source": "trigger",
      "target": "create"
    }
  ]
}
```

## Common Issues with Empty Bases

### Issue 1: "Field not found" Error

**Problem**: You're trying to create a record with a field that doesn't exist.

**Solution**: 
- Only use fields that actually exist in your table
- Check your table columns to see available fields
- Start with just the "Name" field

### Issue 2: Table Name Mismatch

**Problem**: Using wrong table name in workflow.

**Solution**:
- Check the exact tab name in your Airtable base
- Default is usually "Table 1" (with a space)
- Copy the name exactly as it appears

### Issue 3: No Fields Defined

**Problem**: Table exists but has no fields.

**Solution**:
- Airtable tables need at least one field
- Add a "Name" field (usually exists by default)
- Or create a custom field

## Step-by-Step: First Time Setup

### 1. Open Your Base
- URL: https://airtable.com/appLkNDICXNqxSDhG
- You should see at least one table tab

### 2. Check Default Fields
- Most bases come with a "Name" field automatically
- If you see a column header, that's a field

### 3. Add Test Data (Optional)
- You can manually add a test record in Airtable
- Or use the workflow to create one

### 4. Test the Workflow
- Start with "list" operation (works even if empty)
- Then try "create" operation

## What Fields Do You Have?

To find out what fields exist in your table:

1. **Visual Check**: Look at column headers in Airtable
2. **Test with List**: Run a list operation - it will show field names in the response
3. **Check Airtable UI**: Click on a column header to see field name and type

## Minimal Test Setup

**Absolute minimum needed:**
- ✅ At least 1 table (usually "Table 1" by default)
- ✅ At least 1 field (usually "Name" by default)

**That's it!** You can test with just these.

## Next Steps

1. ✅ Verify your table has at least one field (check column headers)
2. ✅ Note the exact table name (check the tab)
3. ✅ Test with "list" operation first (works even if empty)
4. ✅ Then test "create" with just the "Name" field

## Still Having Issues?

If you're still getting errors:

1. **Share a screenshot** of your Airtable base (showing table name and columns)
2. **Check the exact error message** - it will tell you what's wrong
3. **Verify table name** matches exactly (case-sensitive)

## Example: What Your Base Should Look Like

```
┌─────────────────────────────────┐
│  Table 1                         │  ← This is your table name
├──────────┬───────────────────────┤
│ Name     │ Notes                 │  ← These are your fields
├──────────┼───────────────────────┤
│          │                       │  ← Empty rows are OK!
└──────────┴───────────────────────┘
```

Even with empty rows, you can test the workflow!
