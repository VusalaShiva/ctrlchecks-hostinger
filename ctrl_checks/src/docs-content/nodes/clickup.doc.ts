import type { NodeDoc } from '../types';

export const clickupDoc: NodeDoc = {
  "slug": "clickup",
  "displayName": "ClickUp",
  "category": "Utility",
  "logoUrl": "/icons/nodes/clickup.svg",
  "description": "Create, read, and manage ClickUp tasks, lists, spaces, and workspaces.",
  "credentialType": "ClickUp API Key",
  "credentialSetupSteps": [
    "What this is: The ClickUp connection lets CtrlChecks access your ClickUp account safely without putting secrets in workflow fields.",
    "Where to start: ClickUp account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> ClickUp, then sign in or paste the secret value requested there.",
    "Example: the token format shown by ClickUp.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple ClickUp step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://clickup.com/api",
  "resources": [
    {
      "name": "Operations",
      "description": "ClickUp exposes operation choices directly.",
      "operations": [
        {
          "name": "Create task",
          "value": "create_task",
          "description": "Create task using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with create task after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured create task data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get tasks list",
          "value": "get_tasks_list",
          "description": "Get tasks list using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get tasks list after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get tasks list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get task",
          "value": "get_task",
          "description": "Get task using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get task after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get task data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Update task",
          "value": "update_task",
          "description": "Update task using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with update task after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured update task data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Delete task",
          "value": "delete_task",
          "description": "Delete task using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with delete task after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured delete task data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Add comment",
          "value": "add_comment",
          "description": "Add comment using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with add comment after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured add comment data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Update status",
          "value": "update_status",
          "description": "Update status using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with update status after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured update status data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get teams",
          "value": "get_teams",
          "description": "Get teams using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get teams after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get teams data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get spaces",
          "value": "get_spaces",
          "description": "Get spaces using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get spaces after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get spaces data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get folders",
          "value": "get_folders",
          "description": "Get folders using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get folders after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get folders data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        },
        {
          "name": "Get lists",
          "value": "get_lists",
          "description": "Get lists using the ClickUp node.",
          "fields": [
            {
              "name": "Workspace Id",
              "internalKey": "workspaceId",
              "type": "string",
              "required": false,
              "description": "Workspace (team) ID — find it in the workspace URL or via Get Teams",
              "helpText": "What this field is: The Workspace ID — find it in the workspace URL or via Get Teams that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90161598841.\nTip: Use {{$json.workspaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90161598841",
              "example": "90161598841"
            },
            {
              "name": "Space Id",
              "internalKey": "spaceId",
              "type": "string",
              "required": false,
              "description": "Space ID — required for Get Spaces tasks; find via Get Spaces",
              "helpText": "What this field is: The Space ID — required for Get Spaces tasks; find via Get Spaces that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 90166920916.\nTip: Use {{$json.spaceId}} when an earlier ClickUp step provides this value.",
              "placeholder": "90166920916",
              "example": "90166920916"
            },
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "List ID — required for create_task and get_tasks_list; find via Get Lists",
              "helpText": "What this field is: The List ID — required for create_task and get_tasks_list; find via Get Lists that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 901614760992.\nTip: Use {{$json.listId}} when an earlier ClickUp step provides this value.",
              "placeholder": "901614760992",
              "example": "901614760992"
            },
            {
              "name": "Task Id",
              "internalKey": "taskId",
              "type": "string",
              "required": false,
              "description": "Task ID — required for get_task, update_task, delete_task, add_comment, update_status",
              "helpText": "What this field is: The Task ID — required for get_task, update_task, delete_task, add_comment, update_status that tells ClickUp which item to use.\nWhere to find it: Open the item in ClickUp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 86d31vafd.\nTip: Use {{$json.taskId}} when an earlier ClickUp step provides this value.",
              "placeholder": "86d31vafd",
              "example": "86d31vafd"
            },
            {
              "name": "Task Name",
              "internalKey": "taskName",
              "type": "string",
              "required": false,
              "description": "Task name/title (required for create_task)",
              "helpText": "What this field is: Task name/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Follow up with customer.\nTip: This field is used for create_task. Leave it blank when this operation does not need it.",
              "placeholder": "Follow up with customer",
              "example": "Follow up with customer"
            },
            {
              "name": "Task Description",
              "internalKey": "taskDescription",
              "type": "string",
              "required": false,
              "description": "Task description — markdown supported (optional for create_task / update_task)",
              "helpText": "What this field is: Task description — markdown supported.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Details:\n- Action item 1\n- Action item 2.\nTip: Use {{$json.taskDescription}} when this value comes from an earlier step.",
              "placeholder": "Details:\n- Action item 1\n- Action item 2",
              "example": "Details:\n- Action item 1\n- Action item 2"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Task status (e.g. \"to do\", \"in progress\", \"complete\")",
              "helpText": "What this field is: Task status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: to do.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "to do",
              "example": "to do"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low",
              "helpText": "What this field is: The number used for Task priority: 1 = urgent, 2 = high, 3 = normal, 4 = low.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Comment Text",
              "internalKey": "commentText",
              "type": "string",
              "required": false,
              "description": "Comment text for add_comment operation",
              "helpText": "What this field is: Comment text for add_comment operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: This has been reviewed and approved..\nTip: Use {{$json.commentText}} when this value comes from an earlier step.",
              "placeholder": "This has been reviewed and approved.",
              "example": "This has been reviewed and approved."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming ClickUp data with get lists after a related upstream event is received",
            "inputValues": {
              "Workspace Id": "90161598841",
              "Space Id": "90166920916",
              "List Id": "901614760992",
              "Task Id": "86d31vafd",
              "Task Name": "Follow up with customer"
            },
            "expectedOutput": "ClickUp returns structured get lists data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://clickup.com/api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the ClickUp node."
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
