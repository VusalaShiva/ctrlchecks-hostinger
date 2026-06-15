# Pipedrive Node - All Operations Test Workflows

## 📋 Overview

I've created comprehensive test workflows that demonstrate **ALL** operations available in the Pipedrive node. These workflows showcase every resource and operation type.

## 🗂️ Available Test Workflows

### 1. **pipedrive_comprehensive_test.json** - List All Resources
**Purpose**: Tests all LIST operations across all resources

**Operations Demonstrated:**
1. ✅ List Pipelines
2. ✅ List Deals (with filters: status, limit)
3. ✅ List Persons (with limit)
4. ✅ List Organizations (with limit)
5. ✅ List Activities (with limit)
6. ✅ List Notes (with limit)
7. ✅ List Products (with limit)
8. ✅ List Stages
9. ✅ Search Deals (search operation)
10. ✅ List Webhooks

**Use Case**: Perfect for exploring your Pipedrive data and understanding what's available.

### 2. **pipedrive_crud_operations_test.json** - CRUD Operations
**Purpose**: Tests Create, Read, Update, Delete operations

**Operations Demonstrated:**
1. ✅ **Create Deal** - Creates a new deal
2. ✅ **Get Deal** - Retrieves a deal by ID (using created deal's ID)
3. ✅ **Update Deal** - Updates the deal (using template variable from previous node)
4. ✅ **Create Person** - Creates a new person
5. ✅ **Create Organization** - Creates a new organization
6. ✅ **Create Activity** - Creates a new activity
7. ✅ **Create Note** - Creates a new note

**Use Case**: Perfect for testing write operations and data flow between nodes.

## 🔍 Complete Operations Reference

### Resource: **Deal**
- ✅ `list` - List deals with filters (status, stageId, filterId, sort, limit)
- ✅ `get` - Get single deal by ID
- ✅ `create` - Create new deal
- ✅ `update` - Update existing deal
- ✅ `delete` - Delete deal
- ✅ `duplicate` - Duplicate a deal
- ✅ `search` - Search deals by term
- ✅ `getActivities` - Get activities for a deal
- ✅ `getProducts` - Get products attached to a deal
- ✅ `addProduct` - Add product to a deal

### Resource: **Person**
- ✅ `list` - List persons with filters
- ✅ `get` - Get single person by ID
- ✅ `create` - Create new person
- ✅ `update` - Update existing person
- ✅ `delete` - Delete person
- ✅ `search` - Search persons by term
- ✅ `getDeals` - Get deals associated with person
- ✅ `getActivities` - Get activities for a person

### Resource: **Organization**
- ✅ `list` - List organizations with filters
- ✅ `get` - Get single organization by ID
- ✅ `create` - Create new organization
- ✅ `update` - Update existing organization
- ✅ `delete` - Delete organization
- ✅ `search` - Search organizations by term
- ✅ `getDeals` - Get deals associated with organization
- ✅ `getPersons` - Get persons in organization
- ✅ `getActivities` - Get activities for organization

### Resource: **Activity**
- ✅ `list` - List activities with filters (userId, dealId, personId, orgId, type, dates)
- ✅ `get` - Get single activity by ID
- ✅ `create` - Create new activity
- ✅ `update` - Update existing activity
- ✅ `delete` - Delete activity

### Resource: **Note**
- ✅ `list` - List notes with filters (dealId, personId, orgId)
- ✅ `get` - Get single note by ID
- ✅ `create` - Create new note
- ✅ `update` - Update existing note
- ✅ `delete` - Delete note

### Resource: **Pipeline**
- ✅ `list` - List all pipelines
- ✅ `get` - Get single pipeline by ID
- ✅ `getStages` - Get stages in a pipeline

### Resource: **Stage**
- ✅ `list` - List all stages (optionally filtered by pipelineId)
- ✅ `get` - Get single stage by ID
- ✅ `update` - Update stage (name, dealProbability)

### Resource: **Product**
- ✅ `list` - List products with filters
- ✅ `get` - Get single product by ID
- ✅ `create` - Create new product
- ✅ `update` - Update existing product
- ✅ `delete` - Delete product
- ✅ `search` - Search products by term

### Resource: **Lead**
- ✅ `list` - List leads with filters (personId, organizationId, status)
- ✅ `get` - Get single lead by ID
- ✅ `create` - Create new lead
- ✅ `update` - Update existing lead
- ✅ `delete` - Delete lead

### Resource: **File**
- ✅ `list` - List files with filters (dealId, personId, orgId, activityId)
- ✅ `upload` - Upload file (from URL or base64)
- ✅ `download` - Download file by ID
- ✅ `delete` - Delete file by ID

### Resource: **Webhook**
- ✅ `list` - List all webhooks
- ✅ `create` - Create new webhook
- ✅ `delete` - Delete webhook by ID

## 🚀 How to Use

### Step 1: Import Workflow
1. Open your ctrlchecks workflow editor
2. Import the JSON file you want to test
3. The API token is already configured (using your token)

### Step 2: Run the Workflow
1. Click "Run" or use the manual trigger
2. Watch the execution logs
3. Expand each node to see inputs and outputs

### Step 3: Review Results
- Check **Execution Logs (Node-by-Node)** section
- Expand each node to see:
  - 📥 **INPUT** - What the node received
  - 📤 **OUTPUT** - What the node produced
  - **Data Changes** - Fields added/modified

## 📊 Expected Results

### Comprehensive Test (List Operations)
- **Node 1-11**: Each should return arrays of data
- **Node 12**: Summary message
- **All nodes**: Should show `"success": true`

### CRUD Test (Write Operations)
- **Node 2**: Creates deal, returns deal object with `id`
- **Node 3**: Gets the created deal using `{{data.id}}`
- **Node 4**: Updates the deal
- **Node 5-8**: Creates person, organization, activity, note
- **All nodes**: Should show `"success": true`

## ⚠️ Important Notes

### For CRUD Operations:
1. **Create operations** will create real records in your Pipedrive account
2. You may want to **delete test records** after testing
3. The workflow uses **template variables** (e.g., `{{data.id}}`) to pass data between nodes

### For List Operations:
1. All operations use **limit: 5** to keep results manageable
2. You can increase limits or remove them to get all records
3. Filters are applied where relevant (e.g., `status: "open"` for deals)

## 🔧 Customization

### Change Limits
```json
"limit": 10  // Change from 5 to 10, or remove for all records
```

### Add Filters
```json
"status": "open",        // For deals
"filterId": 123,         // Use a specific filter
"sort": "add_time DESC"  // Sort results
```

### Use Template Variables
```json
"dealId": "{{data.id}}"           // Use output from previous node
"personId": "{{data.person_id}}"  // Access nested properties
```

## 📝 Additional Test Scenarios

### Test Search Operations
```json
{
  "resource": "deal",
  "operation": "search",
  "searchTerm": "your search term",
  "exactMatch": false
}
```

### Test Get Operations
```json
{
  "resource": "deal",
  "operation": "get",
  "dealId": "123"  // Replace with actual ID
}
```

### Test Update Operations
```json
{
  "resource": "deal",
  "operation": "update",
  "dealId": "123",
  "dealTitle": "Updated Title",
  "dealValue": 25000
}
```

### Test Delete Operations
```json
{
  "resource": "deal",
  "operation": "delete",
  "dealId": "123"  // Be careful - this deletes permanently!
}
```

## 🎯 Next Steps

1. ✅ Run the **comprehensive test** to see all list operations
2. ✅ Run the **CRUD test** to see create/update operations
3. ✅ Modify workflows to test specific operations you need
4. ✅ Build your own workflows using these as templates

## 📚 Related Documentation

- [Pipedrive Credentials Guide](../worker/docs/PIPEDRIVE_CREDENTIALS_GUIDE.md)
- [Pipedrive Node Implementation](../worker/docs/PIPEDRIVE_NODE_IMPLEMENTATION.md)
- [Pipedrive Test Guide](./PIPEDRIVE_TEST_GUIDE.md)
- [View Outputs Guide](./PIPEDRIVE_VIEW_OUTPUTS_GUIDE.md)

Happy testing! 🚀
