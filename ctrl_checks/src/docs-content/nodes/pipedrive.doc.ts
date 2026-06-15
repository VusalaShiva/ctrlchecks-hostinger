import type { NodeDoc } from '../types';

export const pipedriveDoc: NodeDoc = {
  "slug": "pipedrive",
  "displayName": "Pipedrive",
  "category": "Data",
  "logoUrl": "/icons/nodes/pipedrive.svg",
  "description": "Pipedrive CRM operations - manage deals, persons, organizations, and activities",
  "credentialType": "Pipedrive API Key",
  "credentialSetupSteps": [
    "What this is: The Pipedrive connection lets CtrlChecks access your Pipedrive account safely without putting secrets in workflow fields.",
    "Where to start: Pipedrive account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Pipedrive, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Pipedrive.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Pipedrive step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.pipedrive.com/docs/api/v1",
  "resources": [
    {
      "name": "Operations",
      "description": "Pipedrive exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Pipedrive node.",
          "fields": [
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": false,
              "description": "Pipedrive API token (required for authentication)",
              "helpText": "What this field is: Pipedrive API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-pipedrive-api-token.\nTip: This field is used for authentication. Leave it blank when this operation does not need it.",
              "placeholder": "your-pipedrive-api-token",
              "example": "your-pipedrive-api-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Pipedrive resource: deals, persons, organizations, activities",
              "helpText": "What this field is: The Pipedrive entity type to work with.\nOptions: deals, persons, organizations, activities, leads, notes, products.\nExample: persons to create a contact, deals to create or update a pipeline deal.",
              "placeholder": "deals",
              "example": "deals",
              "defaultValue": "deals"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (required for get, update, delete)",
              "helpText": "What this field is: The Resource ID that tells Pipedrive which item to use.\nWhere to find it: Open the item in Pipedrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier Pipedrive step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Resource data for create/update",
              "helpText": "What this field is: Structured data for Resource data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pipedrive.\nExample: {\"title\":\"Deal Title\",\"value\":1000}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"Deal Title\",\"value\":1000}",
              "example": "{\"title\":\"Deal Title\",\"value\":1000}"
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
            "scenario": "Process incoming Pipedrive data with get after a related upstream event is received",
            "inputValues": {
              "Api Token": "your-pipedrive-api-token",
              "Resource": "deals",
              "Id": "123",
              "Data": "{\"title\":\"Deal Title\",\"value\":1000}"
            },
            "expectedOutput": "Pipedrive returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.pipedrive.com/docs/api/v1"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Pipedrive node.",
          "fields": [
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": false,
              "description": "Pipedrive API token (required for authentication)",
              "helpText": "What this field is: Pipedrive API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-pipedrive-api-token.\nTip: This field is used for authentication. Leave it blank when this operation does not need it.",
              "placeholder": "your-pipedrive-api-token",
              "example": "your-pipedrive-api-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Pipedrive resource: deals, persons, organizations, activities",
              "helpText": "What this field is: The Pipedrive entity type to work with.\nOptions: deals, persons, organizations, activities, leads, notes, products.\nExample: persons to create a contact, deals to create or update a pipeline deal.",
              "placeholder": "deals",
              "example": "deals",
              "defaultValue": "deals"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (required for get, update, delete)",
              "helpText": "What this field is: The Resource ID that tells Pipedrive which item to use.\nWhere to find it: Open the item in Pipedrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier Pipedrive step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Resource data for create/update",
              "helpText": "What this field is: Structured data for Resource data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pipedrive.\nExample: {\"title\":\"Deal Title\",\"value\":1000}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"Deal Title\",\"value\":1000}",
              "example": "{\"title\":\"Deal Title\",\"value\":1000}"
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
            "scenario": "Process incoming Pipedrive data with create after a related upstream event is received",
            "inputValues": {
              "Api Token": "your-pipedrive-api-token",
              "Resource": "deals",
              "Id": "123",
              "Data": "{\"title\":\"Deal Title\",\"value\":1000}"
            },
            "expectedOutput": "Pipedrive returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.pipedrive.com/docs/api/v1"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Pipedrive node.",
          "fields": [
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": false,
              "description": "Pipedrive API token (required for authentication)",
              "helpText": "What this field is: Pipedrive API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-pipedrive-api-token.\nTip: This field is used for authentication. Leave it blank when this operation does not need it.",
              "placeholder": "your-pipedrive-api-token",
              "example": "your-pipedrive-api-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Pipedrive resource: deals, persons, organizations, activities",
              "helpText": "What this field is: The Pipedrive entity type to work with.\nOptions: deals, persons, organizations, activities, leads, notes, products.\nExample: persons to create a contact, deals to create or update a pipeline deal.",
              "placeholder": "deals",
              "example": "deals",
              "defaultValue": "deals"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (required for get, update, delete)",
              "helpText": "What this field is: The Resource ID that tells Pipedrive which item to use.\nWhere to find it: Open the item in Pipedrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier Pipedrive step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Resource data for create/update",
              "helpText": "What this field is: Structured data for Resource data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pipedrive.\nExample: {\"title\":\"Deal Title\",\"value\":1000}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"Deal Title\",\"value\":1000}",
              "example": "{\"title\":\"Deal Title\",\"value\":1000}"
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
            "scenario": "Process incoming Pipedrive data with update after a related upstream event is received",
            "inputValues": {
              "Api Token": "your-pipedrive-api-token",
              "Resource": "deals",
              "Id": "123",
              "Data": "{\"title\":\"Deal Title\",\"value\":1000}"
            },
            "expectedOutput": "Pipedrive returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.pipedrive.com/docs/api/v1"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Pipedrive node.",
          "fields": [
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": false,
              "description": "Pipedrive API token (required for authentication)",
              "helpText": "What this field is: Pipedrive API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-pipedrive-api-token.\nTip: This field is used for authentication. Leave it blank when this operation does not need it.",
              "placeholder": "your-pipedrive-api-token",
              "example": "your-pipedrive-api-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Pipedrive resource: deals, persons, organizations, activities",
              "helpText": "What this field is: The Pipedrive entity type to work with.\nOptions: deals, persons, organizations, activities, leads, notes, products.\nExample: persons to create a contact, deals to create or update a pipeline deal.",
              "placeholder": "deals",
              "example": "deals",
              "defaultValue": "deals"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (required for get, update, delete)",
              "helpText": "What this field is: The Resource ID that tells Pipedrive which item to use.\nWhere to find it: Open the item in Pipedrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier Pipedrive step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Resource data for create/update",
              "helpText": "What this field is: Structured data for Resource data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pipedrive.\nExample: {\"title\":\"Deal Title\",\"value\":1000}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"Deal Title\",\"value\":1000}",
              "example": "{\"title\":\"Deal Title\",\"value\":1000}"
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
            "scenario": "Process incoming Pipedrive data with delete after a related upstream event is received",
            "inputValues": {
              "Api Token": "your-pipedrive-api-token",
              "Resource": "deals",
              "Id": "123",
              "Data": "{\"title\":\"Deal Title\",\"value\":1000}"
            },
            "expectedOutput": "Pipedrive returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.pipedrive.com/docs/api/v1"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the Pipedrive node.",
          "fields": [
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": false,
              "description": "Pipedrive API token (required for authentication)",
              "helpText": "What this field is: Pipedrive API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-pipedrive-api-token.\nTip: This field is used for authentication. Leave it blank when this operation does not need it.",
              "placeholder": "your-pipedrive-api-token",
              "example": "your-pipedrive-api-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Pipedrive resource: deals, persons, organizations, activities",
              "helpText": "What this field is: The Pipedrive entity type to work with.\nOptions: deals, persons, organizations, activities, leads, notes, products.\nExample: persons to create a contact, deals to create or update a pipeline deal.",
              "placeholder": "deals",
              "example": "deals",
              "defaultValue": "deals"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (required for get, update, delete)",
              "helpText": "What this field is: The Resource ID that tells Pipedrive which item to use.\nWhere to find it: Open the item in Pipedrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier Pipedrive step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Resource data for create/update",
              "helpText": "What this field is: Structured data for Resource data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pipedrive.\nExample: {\"title\":\"Deal Title\",\"value\":1000}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"Deal Title\",\"value\":1000}",
              "example": "{\"title\":\"Deal Title\",\"value\":1000}"
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
            "scenario": "Process incoming Pipedrive data with search after a related upstream event is received",
            "inputValues": {
              "Api Token": "your-pipedrive-api-token",
              "Resource": "deals",
              "Id": "123",
              "Data": "{\"title\":\"Deal Title\",\"value\":1000}"
            },
            "expectedOutput": "Pipedrive returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.pipedrive.com/docs/api/v1"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Pipedrive node."
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
