# Notion Workflow Guide

Complete guide on how to use the Notion node in your workflows.

## 🎯 Quick Start

### Using OAuth (Recommended)

If you've connected Notion via OAuth, use `{{oauth}}` as the API token:

```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "get",
  "pageId": "your-page-id"
}
```

The node will automatically use your OAuth token from Supabase!

### Using Manual Token

You can also provide a manual API token:

```json
{
  "apiToken": "secret_your_internal_integration_token",
  "resource": "page",
  "operation": "get",
  "pageId": "your-page-id"
}
```

## 📋 Sample Workflows

### 1. Simple Search Test

**File:** `notion_simple_test.json`

Searches for all pages in your Notion workspace.

**Configuration:**
- `apiToken`: `{{oauth}}` (uses OAuth)
- `resource`: `search`
- `operation`: `search`
- `searchQuery`: `""` (empty = all pages)
- `pageSize`: `10`

### 2. Create Page in Database

**File:** `notion_create_page_test.json`

Creates a new page in a Notion database.

**Configuration:**
- `apiToken`: `{{oauth}}`
- `resource`: `page`
- `operation`: `create`
- `databaseId`: `"your-database-id"`
- `properties`: JSON object with page properties

**Properties Example:**
```json
{
  "Name": {
    "title": [{"text": {"content": "New Task"}}]
  },
  "Status": {
    "select": {"name": "To Do"}
  },
  "Due Date": {
    "date": {"start": "2024-02-15"}
  }
}
```

### 3. Comprehensive Test

**File:** `notion_comprehensive_test.json`

Tests multiple operations: search, get user info, list databases.

## 🔧 Common Operations

### Page Operations

#### Get Page
```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "get",
  "pageId": "page-id-here"
}
```

#### Create Page in Database
```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "create",
  "databaseId": "database-id-here",
  "properties": "{\"Name\": {\"title\": [{\"text\": {\"content\": \"Task Name\"}}]}}"
}
```

#### Create Child Page
```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "create",
  "parentPageId": "parent-page-id",
  "children": "[{\"object\": \"block\", \"type\": \"heading_1\", \"heading_1\": {\"text\": [{\"type\": \"text\", \"text\": {\"content\": \"New Page\"}}]}}]"
}
```

#### Update Page
```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "update",
  "pageId": "page-id-here",
  "properties": "{\"Status\": {\"select\": {\"name\": \"Done\"}}}"
}
```

### Database Operations

#### Query Database
```json
{
  "apiToken": "{{oauth}}",
  "resource": "database",
  "operation": "query",
  "databaseId": "database-id-here",
  "query": "{\"filter\": {\"property\": \"Status\", \"select\": {\"equals\": \"To Do\"}}}",
  "returnAll": true
}
```

#### Get Database
```json
{
  "apiToken": "{{oauth}}",
  "resource": "database",
  "operation": "get",
  "databaseId": "database-id-here"
}
```

#### List All Databases
```json
{
  "apiToken": "{{oauth}}",
  "resource": "database",
  "operation": "list",
  "returnAll": true
}
```

### Block Operations

#### Append Content to Page
```json
{
  "apiToken": "{{oauth}}",
  "resource": "block",
  "operation": "appendChildren",
  "blockId": "page-id-here",
  "children": "[{\"object\": \"block\", \"type\": \"paragraph\", \"paragraph\": {\"text\": [{\"type\": \"text\", \"text\": {\"content\": \"New content\"}}]}}]"
}
```

#### List Page Blocks
```json
{
  "apiToken": "{{oauth}}",
  "resource": "block",
  "operation": "listChildren",
  "blockId": "page-id-here",
  "returnAll": true
}
```

### User Operations

#### Get Current User
```json
{
  "apiToken": "{{oauth}}",
  "resource": "user",
  "operation": "getMe"
}
```

#### List All Users
```json
{
  "apiToken": "{{oauth}}",
  "resource": "user",
  "operation": "list",
  "returnAll": true
}
```

### Search Operations

#### Search Pages
```json
{
  "apiToken": "{{oauth}}",
  "resource": "search",
  "operation": "search",
  "searchQuery": "my search term",
  "filter": "{\"property\": \"object\", \"value\": \"page\"}",
  "returnAll": false,
  "pageSize": 20
}
```

## 📝 How to Get Notion IDs

### Page ID
1. Open the page in Notion
2. Click "..." menu → "Copy link"
3. The URL looks like: `https://www.notion.so/Page-Name-abc123def456...`
4. The ID is the last part: `abc123def456...` (32 characters)

### Database ID
1. Open the database in Notion
2. Click "..." menu → "Copy link"
3. Extract the ID from the URL (same as page ID)

## 🎨 Property Format Examples

### Title Property
```json
{
  "Name": {
    "title": [{"text": {"content": "My Page Title"}}]
  }
}
```

### Select Property
```json
{
  "Status": {
    "select": {"name": "In Progress"}
  }
}
```

### Multi-Select Property
```json
{
  "Tags": {
    "multi_select": [
      {"name": "Important"},
      {"name": "Urgent"}
    ]
  }
}
```

### Date Property
```json
{
  "Due Date": {
    "date": {
      "start": "2024-02-15",
      "end": "2024-02-20"
    }
  }
}
```

### Number Property
```json
{
  "Priority": {
    "number": 5
  }
}
```

### Checkbox Property
```json
{
  "Completed": {
    "checkbox": true
  }
}
```

### Rich Text Property
```json
{
  "Notes": {
    "rich_text": [
      {
        "type": "text",
        "text": {"content": "This is a note"}
      }
    ]
  }
}
```

## 🔗 Using Template Variables

You can use template variables to pass data between nodes:

```json
{
  "apiToken": "{{oauth}}",
  "resource": "page",
  "operation": "create",
  "databaseId": "{{previous_node.databaseId}}",
  "properties": "{\"Name\": {\"title\": [{\"text\": {\"content\": \"{{input.taskName}}\"}}]}}"
}
```

## ✅ Testing Your Workflow

1. **Import the workflow:**
   - Go to your workflow builder
   - Click "Import" or create new workflow
   - Paste the JSON from the sample files

2. **Update configuration:**
   - Replace `YOUR_DATABASE_ID_HERE` with your actual database ID
   - Make sure `apiToken` is set to `{{oauth}}` if using OAuth

3. **Run the workflow:**
   - Click "Run" button
   - Check the output in the log_output node

## 🐛 Troubleshooting

### "API Token is required" Error
- Make sure you've connected Notion via OAuth, OR
- Provide a manual API token in the node configuration

### "Page not found" Error
- Check that the page ID is correct
- Make sure the page is shared with your integration

### "Database not found" Error
- Verify the database ID
- Ensure the database is shared with your integration

### "Invalid properties" Error
- Check the property format matches your database schema
- Property names must match exactly (case-sensitive)

## 📚 More Examples

See the sample workflow files:
- `notion_simple_test.json` - Basic search
- `notion_create_page_test.json` - Create page
- `notion_comprehensive_test.json` - Multiple operations

## 🎯 Next Steps

1. Try the simple test workflow first
2. Get your database/page IDs
3. Create your own workflows using the examples
4. Use template variables to make workflows dynamic

Happy automating! 🚀
