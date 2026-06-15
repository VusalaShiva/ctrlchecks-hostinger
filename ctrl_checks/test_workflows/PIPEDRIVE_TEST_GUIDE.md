# Pipedrive Test Workflows Guide

## 📋 Available Test Workflows

I've created three test workflows for you to test the Pipedrive node:

### 1. **pipedrive_simple_test.json** (Recommended First)
- **Purpose**: Simple connection test
- **Operations**: List pipelines
- **Best for**: Verifying your API token works
- **Expected Result**: List of all pipelines in your Pipedrive account

### 2. **pipedrive_test_workflow.json**
- **Purpose**: Comprehensive test
- **Operations**: List pipelines → List deals
- **Best for**: Testing multiple operations in sequence
- **Expected Result**: List of pipelines, then list of open deals

### 3. **pipedrive_create_deal_test.json**
- **Purpose**: Create operation test
- **Operations**: Create a new deal
- **Best for**: Testing write operations
- **Expected Result**: A new deal created in Pipedrive

## 🚀 How to Use

### Step 1: Get Your Pipedrive API Token

1. Log in to [Pipedrive](https://www.pipedrive.com)
2. Click your profile icon (top right) → **"Personal preferences"**
3. Click **"API"** in the left sidebar
4. Copy your **"Personal API token"**

### Step 2: Update the Workflow

1. Open the test workflow JSON file
2. Find all instances of `"YOUR_PIPEDRIVE_API_TOKEN_HERE"`
3. Replace with your actual API token
4. Save the file

### Step 3: Import and Run

1. Import the workflow into your ctrlchecks platform
2. Run the workflow
3. Check the log output to see the results

## 📝 Test Workflow Details

### Simple Test (pipedrive_simple_test.json)

**What it does:**
- Lists all pipelines in your Pipedrive account

**Configuration:**
```json
{
  "apiToken": "your-token-here",
  "resource": "pipeline",
  "operation": "list"
}
```

**Expected Output:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Sales Pipeline",
      ...
    }
  ],
  "success": true
}
```

### Comprehensive Test (pipedrive_test_workflow.json)

**What it does:**
1. Lists all pipelines
2. Lists open deals (limited to 10)

**Configuration:**
- Node 2: List pipelines
- Node 3: List deals with filters

**Expected Output:**
- First node: Array of pipelines
- Second node: Array of deals (up to 10)

### Create Deal Test (pipedrive_create_deal_test.json)

**What it does:**
- Creates a new deal with:
  - Title: "Test Deal from ctrlchecks"
  - Value: $5,000
  - Currency: USD
  - Status: open

**Configuration:**
```json
{
  "apiToken": "your-token-here",
  "resource": "deal",
  "operation": "create",
  "dealTitle": "Test Deal from ctrlchecks",
  "dealValue": 5000,
  "dealCurrency": "USD",
  "status": "open"
}
```

**Expected Output:**
```json
{
  "data": {
    "id": 123,
    "title": "Test Deal from ctrlchecks",
    "value": 5000,
    "currency": "USD",
    ...
  },
  "success": true
}
```

## ✅ Verification Steps

### Test 1: Simple Connection (Start Here)

1. Use: `pipedrive_simple_test.json`
2. Replace `YOUR_PIPEDRIVE_API_TOKEN_HERE` with your token
3. Run the workflow
4. **Expected**: You should see a list of pipelines in the log output

**If successful**: ✅ Your API token is working!

**If failed**: 
- Check that your token is correct
- Verify the token hasn't been revoked
- Check Pipedrive API status

### Test 2: List Deals

1. Use: `pipedrive_test_workflow.json`
2. Replace `YOUR_PIPEDRIVE_API_TOKEN_HERE` in both nodes
3. Run the workflow
4. **Expected**: List of pipelines, then list of deals

**If successful**: ✅ You can read data from Pipedrive!

### Test 3: Create Deal

1. Use: `pipedrive_create_deal_test.json`
2. Replace `YOUR_PIPEDRIVE_API_TOKEN_HERE`
3. Run the workflow
4. **Expected**: A new deal appears in your Pipedrive account

**If successful**: ✅ You can write data to Pipedrive!

## 🔧 Troubleshooting

### "Invalid API token" Error

- **Check**: Token is correctly pasted (no extra spaces)
- **Verify**: Token is still active in Pipedrive settings
- **Solution**: Regenerate token if needed

### "Unauthorized" Error

- **Check**: Your account has proper permissions
- **Verify**: Token hasn't expired (for OAuth tokens)
- **Solution**: Use a fresh API token

### "No data returned"

- **Check**: You have pipelines/deals in your Pipedrive account
- **Verify**: Filters aren't too restrictive
- **Solution**: Try listing pipelines first (simplest operation)

### "Rate limit exceeded"

- **Check**: You're not making too many requests
- **Solution**: Wait a few seconds and try again

## 📚 Additional Test Operations

Once basic tests pass, you can test other operations:

### List Persons
```json
{
  "resource": "person",
  "operation": "list",
  "limit": 10
}
```

### List Organizations
```json
{
  "resource": "organization",
  "operation": "list",
  "limit": 10
}
```

### List Activities
```json
{
  "resource": "activity",
  "operation": "list",
  "limit": 10
}
```

### Search Deals
```json
{
  "resource": "deal",
  "operation": "search",
  "searchTerm": "test",
  "exactMatch": false
}
```

## 🎯 Next Steps

After successful tests:

1. ✅ Your Pipedrive node is working correctly
2. ✅ You can integrate Pipedrive into your workflows
3. ✅ You can build more complex automation workflows

## 📖 Related Documentation

- [Pipedrive Credentials Guide](./PIPEDRIVE_CREDENTIALS_GUIDE.md)
- [Pipedrive Node Implementation](../worker/docs/PIPEDRIVE_NODE_IMPLEMENTATION.md)

Happy testing! 🚀
