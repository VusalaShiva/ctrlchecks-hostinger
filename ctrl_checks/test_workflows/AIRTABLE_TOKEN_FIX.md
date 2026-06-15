# 🔐 Airtable 403 Error - API Token Permissions Fix

## Problem: 403 NOT_AUTHORIZED

You're still getting 403 even with Resource = "Record". This means your **API token doesn't have the right permissions**.

## ✅ Step-by-Step Fix

### Step 1: Verify Token Has Base Access

1. **Go to**: https://airtable.com/create/tokens
2. **Find your token**: `AIRTABLE_PAT_REPLACE_ME`
3. **Click on the token** to edit it
4. **Check "Access" section**:
   - ✅ Base `appr2FSFmDcmV1qzO` (Testbase) **MUST be listed**
   - ❌ If it's NOT listed → Add it!

### Step 2: Verify Token Scopes

In the token settings, check **Scopes**:
- ✅ `data.records:read` (for list/get operations)
- ✅ `data.records:write` (for create/update/delete operations)

**Both scopes are required!**

### Step 3: Create New Token (If Needed)

If the token doesn't have access, **create a new one**:

1. **Go to**: https://airtable.com/create/tokens
2. **Click**: "Create new token"
3. **Name**: "ctrlchecks-workflow"
4. **Set Scopes**:
   - ✅ Check `data.records:read`
   - ✅ Check `data.records:write`
5. **Set Access**:
   - ✅ Select base: `appr2FSFmDcmV1qzO` (Testbase)
6. **Click**: "Create token"
7. **Copy the new token** immediately (you won't see it again!)

### Step 4: Update Your Workflow

Replace the old API key with the new one:

```json
{
  "apiKey": "AIRTABLE_PAT_REPLACE_ME",
  "baseId": "appr2FSFmDcmV1qzO",
  "table": "Table 1",
  "resource": "Record",
  "operation": "list"
}
```

## 🔍 How to Check Token Permissions

### Visual Check:
1. Open: https://airtable.com/create/tokens
2. Click on your token
3. You should see:
   ```
   Scopes:
   ✅ data.records:read
   ✅ data.records:write
   
   Access:
   ✅ appr2FSFmDcmV1qzO (Testbase)
   ```

### If You See:
- ❌ No scopes → Add them
- ❌ No base access → Add the base
- ❌ Wrong base → Select the correct base

## ⚠️ Common Mistakes

1. **Token created but base not selected** → Most common issue!
2. **Token has read-only scope** → Need write scope for create/update
3. **Token created before base existed** → Create new token
4. **Wrong base selected** → Make sure it's `appr2FSFmDcmV1qzO`

## ✅ Quick Test

After fixing the token:

1. **Test with "list" operation first** (read-only, easier to debug)
2. **If list works**, then try "create"
3. **If still 403**, the token definitely doesn't have access

## 🎯 Most Likely Issue

**Your token was created but the base wasn't added to the "Access" list.**

This is the #1 cause of 403 errors. The token exists, but Airtable doesn't know which base it can access.

## 📝 Checklist

Before testing again:
- [ ] Token has `data.records:read` scope
- [ ] Token has `data.records:write` scope
- [ ] Token has access to base `appr2FSFmDcmV1qzO`
- [ ] Resource is set to "Record" (not "Table")
- [ ] Operation is set correctly
- [ ] Base ID is correct: `appr2FSFmDcmV1qzO`
- [ ] Table name is correct: `Table 1`

## 🚀 Next Steps

1. **Go to token settings**: https://airtable.com/create/tokens
2. **Edit your token** or **create a new one**
3. **Add base access**: Select `appr2FSFmDcmV1qzO`
4. **Add scopes**: `read` + `write`
5. **Update workflow** with new token (if created new one)
6. **Test again**

The issue is 99% likely that your token doesn't have access to the base. Fix that and it should work! 🎉
