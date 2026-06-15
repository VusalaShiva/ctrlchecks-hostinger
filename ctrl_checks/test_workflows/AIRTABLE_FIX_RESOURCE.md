# ⚠️ Airtable 403 Error - Resource Issue

## Problem Identified

You're getting **403 NOT_AUTHORIZED** because:

1. **Resource is set to "Table"** - but the backend only supports "Record" operations
2. The API token might not have access to the base

## ✅ Quick Fix

### Step 1: Change Resource to "Record"

In your Airtable node configuration:
- **Resource**: Change from `Table` to `Record` ✅
- **Operation**: Keep as `list` (or choose any operation)
- **Table**: Keep as `Table 1`

### Step 2: Verify API Token Access

1. **Go to**: https://airtable.com/create/tokens
2. **Find your token**: `AIRTABLE_PAT_REPLACE_ME`
3. **Check**:
   - ✅ Base `appr2FSFmDcmV1qzO` is listed under "Access"
   - ✅ Scopes include: `data.records:read` and `data.records:write`
4. **If not**, edit the token and add the base

## Correct Configuration

```json
{
  "apiKey": "AIRTABLE_PAT_REPLACE_ME",
  "baseId": "appr2FSFmDcmV1qzO",
  "table": "Table 1",
  "resource": "Record",  ← MUST be "Record"
  "operation": "list"
}
```

## Why "Table" Resource Doesn't Work

The current implementation only supports **Record** operations:
- ✅ List Records
- ✅ Get Record
- ✅ Create Record
- ✅ Update Record
- ✅ Upsert Record
- ✅ Delete Record

**Table** resource operations (like listing tables) are not yet implemented.

## Test After Fix

1. **Change Resource to "Record"**
2. **Run the workflow again**
3. **Should work now!**

## Still Getting 403?

If you still get 403 after changing to "Record":

1. **Verify token has base access**:
   - Go to: https://airtable.com/create/tokens
   - Edit your token
   - Make sure base `appr2FSFmDcmV1qzO` is selected

2. **Check token scopes**:
   - Must have: `data.records:read` (for list/get)
   - Must have: `data.records:write` (for create/update/delete)

3. **Create a new token** if needed:
   - Delete old token
   - Create new one with correct permissions
   - Update workflow with new token

## Summary

**The main issue**: Resource = "Table" ❌  
**The fix**: Resource = "Record" ✅

Change it in your node configuration and try again!
