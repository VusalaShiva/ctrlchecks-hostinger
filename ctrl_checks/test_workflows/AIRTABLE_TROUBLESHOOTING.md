# Airtable 403 NOT_AUTHORIZED Error - Troubleshooting Guide

## Error: 403 NOT_AUTHORIZED

This error means your API key doesn't have permission to access the base or perform the operation.

## Common Causes & Solutions

### 1. ✅ Verify API Key Format

Your API key should look like: `pat...` (starts with "pat")

**Check:**
- No extra spaces before/after the key
- Key is complete (not truncated)
- Key starts with "pat"

### 2. ✅ Check API Key Scopes/Permissions

Airtable Personal Access Tokens need specific scopes. When you created the token, you should have selected:
- ✅ **Read** access (for list/get operations)
- ✅ **Write** access (for create/update/delete operations)
- ✅ Access to the specific base

**To fix:**
1. Go to https://airtable.com/create/tokens
2. Find your token or create a new one
3. Make sure it has:
   - ✅ **Read** scope
   - ✅ **Write** scope (for create/update/delete)
   - ✅ Access to base: `appLkNDICXNqxSDhG`

### 3. ✅ Verify Base ID

Your Base ID: `appLkNDICXNqxSDhG`

**To verify:**
1. Open your Airtable base in browser
2. Look at the URL: `https://airtable.com/appLkNDICXNqxSDhG/...`
3. The part after `/app` is your Base ID
4. Make sure it matches exactly (case-sensitive)

### 4. ✅ Check Table Name

The table name must match exactly (case-sensitive).

**Common issues:**
- Using "Table1" instead of "Table 1" (space matters)
- Wrong capitalization
- Table doesn't exist

**To find your table name:**
1. Open your Airtable base
2. Look at the tabs at the top
3. Copy the exact name (including spaces and capitalization)

### 5. ✅ Verify API Key Has Access to This Base

When creating the token, you must grant access to the specific base.

**To check/fix:**
1. Go to https://airtable.com/create/tokens
2. Click on your token
3. Under "Access", make sure your base `appLkNDICXNqxSDhG` is listed
4. If not, edit the token and add the base

## Step-by-Step Fix

### Step 1: Create a New Token with Correct Permissions

1. Go to: https://airtable.com/create/tokens
2. Click **"Create new token"**
3. Name it: "ctrlchecks-workflow"
4. Set **Scopes**:
   - ✅ `data.records:read` (for list/get)
   - ✅ `data.records:write` (for create/update/delete)
5. Under **Access**, select:
   - ✅ Your base: `appLkNDICXNqxSDhG`
6. Click **"Create token"**
7. **Copy the token immediately** (you won't see it again!)

### Step 2: Update Your Workflow

Replace the old API key with the new one in your workflow config:

```json
{
  "apiKey": "patYOUR_NEW_TOKEN_HERE",
  "baseId": "appLkNDICXNqxSDhG",
  "table": "Table 1"
}
```

### Step 3: Test with List Operation First

Start with a simple "list" operation to verify read access:

```json
{
  "operation": "list",
  "maxRecords": 5
}
```

If this works, then try create/update operations.

## Quick Test: Verify Your Credentials

Try this minimal test workflow:

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
      "id": "airtable",
      "type": "airtable",
      "data": {
        "type": "airtable",
        "config": {
          "apiKey": "YOUR_NEW_TOKEN",
          "baseId": "appLkNDICXNqxSDhG",
          "table": "Table 1",
          "resource": "Record",
          "operation": "list",
          "maxRecords": 1
        }
      }
    }
  ],
  "edges": [
    {
      "source": "trigger",
      "target": "airtable"
    }
  ]
}
```

## Common Mistakes

### ❌ Wrong: Token without base access
- Token created but base not selected in token settings

### ❌ Wrong: Token with read-only scope
- Token only has `read` scope, trying to `create` operation

### ❌ Wrong: Wrong table name
- Using "Table1" instead of "Table 1"
- Using wrong capitalization

### ❌ Wrong: Base ID typo
- Extra characters or missing characters in Base ID

## Still Not Working?

If you've tried all the above:

1. **Double-check token creation:**
   - Go to https://airtable.com/create/tokens
   - Verify token exists and has correct scopes
   - Delete and recreate if needed

2. **Test in Airtable API directly:**
   - Use curl or Postman to test:
   ```bash
   curl "https://api.airtable.com/v0/appLkNDICXNqxSDhG/Table%201" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Check Airtable account:**
   - Make sure your Airtable account is active
   - Check if there are any workspace/base restrictions

4. **Verify base exists:**
   - Open: https://airtable.com/appLkNDICXNqxSDhG
   - Make sure the base loads correctly

## Need More Help?

If the issue persists:
1. Share the exact error message
2. Confirm you've created a new token with write permissions
3. Verify the base ID matches your URL
4. Check that the table name is correct
