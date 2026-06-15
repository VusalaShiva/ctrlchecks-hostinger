import type { NodeDoc } from '../types';

export const googleTasksDoc: NodeDoc = {
  "slug": "google_tasks",
  "displayName": "Google Tasks",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_tasks.svg",
  "description": "Manage Google Tasks",
  "credentialType": "Google OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Tasks connection lets CtrlChecks access your Google Tasks account safely without putting secrets in workflow fields.",
    "Where to start: Google Tasks account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Tasks, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Tasks.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Tasks step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Tasks exposes operation choices directly.",
      "operations": [
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Google Tasks node.",
          "fields": [
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID (for update/delete)",
              "helpText": "What this field is: The Task ID that tells Google Tasks which item to use.\nWhere to find it: Open the item in Google Tasks and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: task-id.\nTip: Use {{$json.taskId}} when an earlier Google Tasks step provides this value.",
              "placeholder": "task-id",
              "example": "task-id"
            }
          ],
          "outputExample": [
            {
              "id": "1",
              "name": "Example item",
              "createdAt": "2025-01-15T09:00:00Z"
            }
          ],
          "outputDescription": "Returns an array of result objects. Access individual fields via {{$json.fieldName}} in downstream nodes.",
          "usageExample": {
            "scenario": "Process incoming Google Tasks data with create after a related upstream event is received",
            "inputValues": {
              "Task Id": "task-id"
            },
            "expectedOutput": "Google Tasks returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/tasks/reference/rest"
        },
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the Google Tasks node.",
          "fields": [
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID (for update/delete)",
              "helpText": "What this field is: The Task ID that tells Google Tasks which item to use.\nWhere to find it: Open the item in Google Tasks and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: task-id.\nTip: Use {{$json.taskId}} when an earlier Google Tasks step provides this value.",
              "placeholder": "task-id",
              "example": "task-id"
            }
          ],
          "outputExample": [
            {
              "id": "1",
              "name": "Example item",
              "createdAt": "2025-01-15T09:00:00Z"
            }
          ],
          "outputDescription": "Returns an array of result objects. Access individual fields via {{$json.fieldName}} in downstream nodes.",
          "usageExample": {
            "scenario": "Process incoming Google Tasks data with read after a related upstream event is received",
            "inputValues": {
              "Task Id": "task-id"
            },
            "expectedOutput": "Google Tasks returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/tasks/reference/rest"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Google Tasks node.",
          "fields": [
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID (for update/delete)",
              "helpText": "What this field is: The Task ID that tells Google Tasks which item to use.\nWhere to find it: Open the item in Google Tasks and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: task-id.\nTip: Use {{$json.taskId}} when an earlier Google Tasks step provides this value.",
              "placeholder": "task-id",
              "example": "task-id"
            }
          ],
          "outputExample": [
            {
              "id": "1",
              "name": "Example item",
              "createdAt": "2025-01-15T09:00:00Z"
            }
          ],
          "outputDescription": "Returns an array of result objects. Access individual fields via {{$json.fieldName}} in downstream nodes.",
          "usageExample": {
            "scenario": "Process incoming Google Tasks data with update after a related upstream event is received",
            "inputValues": {
              "Task Id": "task-id"
            },
            "expectedOutput": "Google Tasks returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/tasks/reference/rest"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Google Tasks node.",
          "fields": [
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID (for update/delete)",
              "helpText": "What this field is: The Task ID that tells Google Tasks which item to use.\nWhere to find it: Open the item in Google Tasks and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: task-id.\nTip: Use {{$json.taskId}} when an earlier Google Tasks step provides this value.",
              "placeholder": "task-id",
              "example": "task-id"
            }
          ],
          "outputExample": [
            {
              "id": "1",
              "name": "Example item",
              "createdAt": "2025-01-15T09:00:00Z"
            }
          ],
          "outputDescription": "Returns an array of result objects. Access individual fields via {{$json.fieldName}} in downstream nodes.",
          "usageExample": {
            "scenario": "Process incoming Google Tasks data with delete after a related upstream event is received",
            "inputValues": {
              "Task Id": "task-id"
            },
            "expectedOutput": "Google Tasks returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/tasks/reference/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Tasks node."
    },
    {
      "error": "Required field missing",
      "cause": "A required input is empty or an upstream expression resolved to an empty value.",
      "fix": "Open the node, fill every required field, and verify the upstream node output before running."
    },
    {
      "error": "Invalid input format",
      "cause": "A field value does not match the format expected by the node or service API.",
      "fix": "Check JSON, date, URL, email, and ID fields against the examples shown in the node documentation."
    }
  ],
  "relatedNodes": []
};
