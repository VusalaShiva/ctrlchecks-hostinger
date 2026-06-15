# ✅ Your Airtable Workflows Are Ready!

## Your Base Information

- **Base ID**: `appr2FSFmDcmV1qzO`
- **Base Name**: Testbase
- **Table Name**: Table 1
- **Fields**: Segment, Country
- **URL**: https://airtable.com/appr2FSFmDcmV1qzO

## ✅ What I've Updated

I've updated all your test workflow files with the correct Base ID:

1. ✅ `airtable_test_workflow.json` - List records workflow
2. ✅ `airtable_create_test.json` - Create record workflow (uses Segment & Country fields)
3. ✅ `airtable_simple_test.json` - Simple test workflow (uses Segment & Country fields)

## ⚠️ Important: Update Your API Token

Before testing, make sure your API token has access to this base:

1. **Go to**: https://airtable.com/create/tokens
2. **Edit your token** (or create a new one)
3. **Under "Access"**, make sure `appr2FSFmDcmV1qzO` (Testbase) is selected
4. **Scopes needed**:
   - ✅ `data.records:read` (for list/get operations)
   - ✅ `data.records:write` (for create/update/delete operations)
5. **Save the token**

## 🧪 Test Your Workflows

### Test 1: List Records (Recommended First)

Use: `airtable_test_workflow.json` or `airtable_simple_test.json`

This should:
- ✅ Connect to your base
- ✅ List your existing 10 records (Segment & Country data)
- ✅ Return data like: `{"records": [...], "count": 10}`

**Expected Result**: You should see your 10 existing records with Segment and Country values.

### Test 2: Create a New Record

Use: `airtable_create_test.json`

This will:
- ✅ Create a new record with:
  - Segment: "Test Segment"
  - Country: "Test Country"
- ✅ Return the created record with an ID

**Expected Result**: A new record appears in your Airtable base!

## 📋 Your Table Structure

Your table has these fields:
- **Segment** (text field)
- **Country** (text field)

When creating records, use this format:
```json
{
  "fields": {
    "Segment": "Your Segment Value",
    "Country": "Your Country Value"
  }
}
```

## 🚀 Quick Test Commands

### List Records
```json
{
  "operation": "list",
  "maxRecords": 10
}
```

### Create Record
```json
{
  "operation": "create",
  "records": "[{\"fields\": {\"Segment\": \"New Segment\", \"Country\": \"New Country\"}}]"
}
```

### Get a Specific Record
```json
{
  "operation": "get",
  "recordId": "recXXXXXXXXXXXXX"
}
```

## ✅ Checklist Before Testing

- [ ] API token has access to base `appr2FSFmDcmV1qzO`
- [ ] API token has read + write scopes
- [ ] Workflow files updated with new Base ID
- [ ] Ready to test!

## 🎯 Next Steps

1. **Update your API token** (if not done already)
2. **Import a workflow** into ctrlchecks
3. **Run the "list" operation first** to verify connection
4. **Then test "create" operation** to add a new record
5. **Check your Airtable base** to see the new record!

## 📝 Example: Complete Workflow Config

Here's what your Airtable node config should look like:

```json
{
  "apiKey": "AIRTABLE_PAT_REPLACE_ME",
  "baseId": "appr2FSFmDcmV1qzO",
  "table": "Table 1",
  "resource": "Record",
  "operation": "list",
  "maxRecords": 10
}
```

## 🎉 You're All Set!

Your workflows are configured and ready to test. Start with the "list" operation to verify everything works, then try creating a record!

Good luck! 🚀
