# ClickUp Workflow Test Guide

This guide explains how to test the ClickUp node with the provided test workflows.

## Prerequisites

1. **ClickUp Account**: You need an active ClickUp account
2. **API Token**: Get your ClickUp API token from:
   - Go to https://app.clickup.com/settings/apps
   - Click "Apps" → "API"
   - Copy your API token (starts with `pk_`)

## Test Workflows

### 1. Simple Test (`clickup_simple_test.json`)
**Purpose**: Quick test to create a single task

**Steps**:
1. Replace `YOUR_CLICKUP_API_TOKEN_HERE` with your API token
2. Replace `YOUR_LIST_ID_HERE` with a valid list ID
3. Run the workflow
4. Check your ClickUp list to see the created task

**How to get List ID**:
- Open your list in ClickUp
- Look at the URL: `app.clickup.com/.../v/li/LIST_ID`
- Or use the "Get Lists" operation first

### 2. Get Tasks Test (`clickup_get_tasks_test.json`)
**Purpose**: Test retrieving tasks from a list

**Steps**:
1. Replace `YOUR_CLICKUP_API_TOKEN_HERE` with your API token
2. Replace `YOUR_LIST_ID_HERE` with a valid list ID
3. Run the workflow
4. Check the log output to see the retrieved tasks

### 3. Comprehensive Test (`clickup_comprehensive_test.json`)
**Purpose**: Test multiple ClickUp operations in sequence

**Operations tested**:
1. Get Teams - Discover your workspace ID
2. Get Spaces - Discover your space ID
3. Get Lists - Discover your list ID
4. Create Task - Create a new task
5. Get Task - Retrieve the created task
6. Update Task - Update task status and priority
7. Add Comment - Add a comment to the task
8. Get Comments - Retrieve all comments

**Steps**:
1. Replace all `YOUR_CLICKUP_API_TOKEN_HERE` with your API token
2. For the first run, you can:
   - Start with "Get Teams" to find your workspace ID
   - Use that workspace ID in "Get Spaces" to find your space ID
   - Use that space ID in "Get Lists" to find your list ID
   - Use that list ID in "Create Task"
3. After creating a task, copy the task ID from the output
4. Use that task ID in subsequent nodes (Get Task, Update Task, Add Comment, Get Comments)
5. Run the workflow and check each step

## Finding IDs

### Workspace ID (Team ID)
1. Run the "Get Teams" operation
2. Look for the `id` field in the response
3. Or check your ClickUp URL: `app.clickup.com/WORKSPACE_ID`

### Space ID
1. Run the "Get Spaces" operation with your workspace ID
2. Look for the `id` field in the response
3. Or check your ClickUp URL when viewing a space

### List ID
1. Run the "Get Lists" operation with your space ID
2. Look for the `id` field in the response
3. Or check your ClickUp URL: `app.clickup.com/.../v/li/LIST_ID`

### Task ID
1. After creating a task, the response includes the task `id`
2. Or check your ClickUp URL when viewing a task: `app.clickup.com/.../t/TASK_ID`

## Available Operations

### Basic Operations
- `get_teams` - List all teams/workspaces
- `get_spaces` - List spaces in a workspace (requires `workspaceId`)
- `get_folders` - List folders in a space (requires `spaceId`)
- `get_lists` - List lists in a folder or space (requires `folderId` or `spaceId`)

### Task Operations
- `create_task` - Create a new task (requires `listId`, `name`)
- `get_task` - Get a single task (requires `taskId`)
- `get_tasks_list` - Get tasks from a list (requires `listId`)
- `get_tasks_space` - Get tasks from a space (requires `spaceId`)
- `update_task` - Update a task (requires `taskId`)
- `delete_task` - Delete a task (requires `taskId`)

### Comment Operations
- `add_comment` - Add a comment to a task or list (requires `taskId` or `listId`, `commentText`)
- `get_comments` - Get comments from a task or list (requires `taskId` or `listId`)

### List Operations
- `create_list` - Create a new list (requires `folderId` or `spaceId`, `name`)

### Time Entry Operations (Business Plan Required)
- `get_time_entries` - Get time entries (requires `teamId`)
- `create_time_entry` - Create a time entry (requires `teamId`)

## Task Configuration Options

When creating or updating a task, you can use:

```json
{
  "name": "Task Name",
  "description": "Task description",
  "status": "to do",           // Status name
  "priority": 1,               // 1 = Urgent, 2 = High, 3 = Normal, 4 = Low
  "assignees": [123, 456],      // Array of user IDs
  "dueDate": 1234567890000,     // Timestamp in milliseconds
  "startDate": 1234567890000,   // Timestamp in milliseconds
  "timeEstimate": 3600000       // Duration in milliseconds
}
```

## Testing Tips

1. **Start Simple**: Begin with the simple test workflow to verify your API token works
2. **Check Logs**: Use the log_output node to see the results of each operation
3. **Use Previous Outputs**: In a real workflow, you can use outputs from previous nodes (e.g., use the task ID from create_task in update_task)
4. **Error Handling**: If an operation fails, check:
   - API token is correct
   - IDs are valid
   - Required parameters are provided
   - You have permissions for the operation

## Troubleshooting

### "Missing ClickUp API Key" Error
- Make sure you've replaced `YOUR_CLICKUP_API_TOKEN_HERE` with your actual token
- Check that the token hasn't expired

### "listId is required" Error
- Make sure you've provided a valid list ID
- Use the "Get Lists" operation first to find valid list IDs

### "Invalid list id" Error
- The list ID might be incorrect
- The list might have been deleted
- You might not have access to that list

### "Unauthorized" Error
- Your API token might be invalid
- Check that you're using the correct token
- Make sure the token has the necessary permissions

## Next Steps

After testing the basic operations:
1. Try creating workflows that combine ClickUp with other nodes
2. Use conditional logic (if/else) based on task status
3. Set up automated workflows that trigger on schedules or webhooks
4. Integrate with other services (email, Slack, etc.)

## Example: Automated Task Creation

Create a workflow that:
1. Receives a webhook
2. Extracts task details from the webhook payload
3. Creates a ClickUp task
4. Sends a notification

This demonstrates how ClickUp can be integrated into larger automation workflows.
