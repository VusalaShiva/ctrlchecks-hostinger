# Airtable Quick Start Guide

## Your Credentials
- **Base ID**: `appLkNDICXNqxSDhG`
- **API Key**: `AIRTABLE_PAT_REPLACE_ME`

## Step 1: Find Your Table Name

When you create a new Airtable base, it usually has a default table called **"Table 1"**. 

To find your table name:
1. Open your Airtable base in the browser
2. Look at the tabs at the top - each tab is a table name
3. Common default names: "Table 1", "Table 2", etc.

## Step 2: Test Your Connection

### Option A: List Records (Read Test)
Use the workflow: `airtable_test_workflow.json`

This will:
- Connect to your Airtable base
- List the first 10 records from "Table 1"
- Show you what data exists

**Important**: Update the `table` field in the config if your table has a different name!

### Option B: Create Record (Write Test)
Use the workflow: `airtable_create_test.json`

This will:
- Create a test record in your Airtable table
- Verify write permissions work
- Show the created record ID

**Important**: 
- Update the `table` field if needed
- Update the `fields` in the records to match your table's actual field names

## Step 3: Understanding Your Table Structure

Before creating records, you need to know:
1. **Table Name**: The name of the table (e.g., "Table 1", "Customers", "Tasks")
2. **Field Names**: The exact names of fields in your table

### How to Find Field Names:
1. Open your Airtable base
2. Look at the column headers - those are your field names
3. Common default fields: "Name", "Notes", etc.

## Step 4: Common Use Cases

### Use Case 1: Form Submission → Airtable
When someone submits a form, save it to Airtable:

```json
{
  "operation": "create",
  "records": "[{\"fields\": {\"Name\": \"{{input.name}}\", \"Email\": \"{{input.email}}\"}}]"
}
```

### Use Case 2: Daily Report from Airtable
Schedule a daily workflow to fetch records:

```json
{
  "operation": "list",
  "filterByFormula": "{Status} = 'Active'",
  "maxRecords": 50
}
```

### Use Case 3: Update Records
Update existing records based on conditions:

```json
{
  "operation": "update",
  "records": "[{\"id\": \"rec123\", \"fields\": {\"Status\": \"Completed\"}}]"
}
```

## Troubleshooting

### Error: "Table not found"
- Check that the table name matches exactly (case-sensitive)
- Default table is usually "Table 1"

### Error: "Field not found"
- Check that field names match exactly (case-sensitive)
- Airtable field names are case-sensitive

### Error: "Invalid API key"
- Verify your API key is correct
- Make sure there are no extra spaces

### Error: "Base not found"
- Verify your Base ID is correct
- Base ID format: `app...` (starts with "app")

## Next Steps

1. **Test the connection** with the list workflow
2. **Create a test record** to verify write access
3. **Explore your data** by listing records
4. **Build your automation** based on your needs

## Example: Complete Workflow

Here's a complete example workflow that:
1. Lists records from Airtable
2. Filters them
3. Updates a field

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
      "id": "list",
      "type": "airtable",
      "data": {
        "type": "airtable",
        "config": {
          "apiKey": "AIRTABLE_PAT_REPLACE_ME",
          "baseId": "appLkNDICXNqxSDhG",
          "table": "Table 1",
          "operation": "list",
          "filterByFormula": "{Status} = 'Pending'"
        }
      }
    },
    {
      "id": "update",
      "type": "airtable",
      "data": {
        "type": "airtable",
        "config": {
          "apiKey": "AIRTABLE_PAT_REPLACE_ME",
          "baseId": "appLkNDICXNqxSDhG",
          "table": "Table 1",
          "operation": "update",
          "records": "[{\"id\": \"{{list.records[0].id}}\", \"fields\": {\"Status\": \"Processed\"}}]"
        }
      }
    }
  ]
}
```

## Need Help?

If you encounter issues:
1. Check the error message in the workflow output
2. Verify your table and field names match exactly
3. Test with a simple "list" operation first
4. Make sure your API key has the right permissions
