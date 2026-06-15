import type { NodeDoc } from '../types';

export const airtableDoc: NodeDoc = {
  "slug": "airtable",
  "displayName": "Airtable",
  "category": "Data",
  "logoUrl": "/icons/nodes/airtable.svg",
  "description": "Read, write, update, or delete records in Airtable bases and tables",
  "credentialType": "Airtable API Key",
  "credentialSetupSteps": [
    "What this is: The Airtable connection lets CtrlChecks access your Airtable account safely without putting secrets in workflow fields.",
    "Where to start: Airtable -> Developer hub -> Personal access tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Airtable, then sign in or paste the secret value requested there.",
    "Example: pat....",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Airtable step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://airtable.com/developers/web/api/introduction",
  "resources": [
    {
      "name": "Operations",
      "description": "Airtable exposes operation choices directly.",
      "operations": [
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the Airtable node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Airtable API key (required for authentication)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "patXXXXXXXXXXXXXX",
              "example": "patXXXXXXXXXXXXXX",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Airtable OAuth access token (alternative to API key)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Base Id",
              "internalKey": "baseId",
              "type": "string",
              "required": true,
              "description": "Airtable base ID",
              "helpText": "What this field is: The unique ID of your Airtable Base (your Airtable workspace/database).\nWhere to find it: Open your base in Airtable → click the Help (?) menu → API documentation. The Base ID is shown at the top of the page and in the URL. It always starts with \"app\".\nExample: appXXXXXXXXXXXXXX",
              "placeholder": "appXXXXXXXXXXXXXX",
              "example": "appXXXXXXXXXXXXXX"
            },
            {
              "name": "Table Id",
              "internalKey": "tableId",
              "type": "string",
              "required": true,
              "description": "Airtable table ID or name",
              "helpText": "What this field is: The Airtable table ID or name that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: tblXXXXXXXXXXXXXX.\nTip: Use {{$json.tableId}} when an earlier Airtable step provides this value.",
              "placeholder": "tblXXXXXXXXXXXXXX",
              "example": "tblXXXXXXXXXXXXXX"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for update/delete)",
              "helpText": "What this field is: The Record ID that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: recXXXXXXXXXXXXXX.\nTip: Use {{$json.recordId}} when an earlier Airtable step provides this value.",
              "placeholder": "recXXXXXXXXXXXXXX",
              "example": "recXXXXXXXXXXXXXX"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field values for create/update",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Airtable.\nExample: {\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Airtable data with read after a related upstream event is received",
            "inputValues": {
              "Api Key": "patXXXXXXXXXXXXXX",
              "Access Token": "your-oauth-access-token",
              "Base Id": "appXXXXXXXXXXXXXX",
              "Table Id": "tblXXXXXXXXXXXXXX",
              "Record Id": "recXXXXXXXXXXXXXX"
            },
            "expectedOutput": "Airtable returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://airtable.com/developers/web/api/introduction"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new record in an Airtable table.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Airtable API key (required for authentication)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "patXXXXXXXXXXXXXX",
              "example": "patXXXXXXXXXXXXXX",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Airtable OAuth access token (alternative to API key)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Base Id",
              "internalKey": "baseId",
              "type": "string",
              "required": true,
              "description": "Airtable base ID",
              "helpText": "What this field is: The unique ID of your Airtable Base (your Airtable workspace/database).\nWhere to find it: Open your base in Airtable → click the Help (?) menu → API documentation. The Base ID is shown at the top of the page and in the URL. It always starts with \"app\".\nExample: appXXXXXXXXXXXXXX",
              "placeholder": "appXXXXXXXXXXXXXX",
              "example": "appXXXXXXXXXXXXXX"
            },
            {
              "name": "Table Id",
              "internalKey": "tableId",
              "type": "string",
              "required": true,
              "description": "Airtable table ID or name",
              "helpText": "What this field is: The Airtable table ID or name that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: tblXXXXXXXXXXXXXX.\nTip: Use {{$json.tableId}} when an earlier Airtable step provides this value.",
              "placeholder": "tblXXXXXXXXXXXXXX",
              "example": "tblXXXXXXXXXXXXXX"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for update/delete)",
              "helpText": "What this field is: The Record ID that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: recXXXXXXXXXXXXXX.\nTip: Use {{$json.recordId}} when an earlier Airtable step provides this value.",
              "placeholder": "recXXXXXXXXXXXXXX",
              "example": "recXXXXXXXXXXXXXX"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field values for create/update",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Airtable.\nExample: {\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}"
            }
          ],
          "outputExample": {
            "id": "recNewXyz456",
            "fields": {
              "Name": "Bob",
              "Email": "bob@example.com",
              "Status": "New"
            },
            "createdTime": "2025-01-15T10:00:00Z"
          },
          "outputDescription": "id: The new Airtable record ID. fields: The data saved for this record. createdTime: When the record was created.",
          "usageExample": {
            "scenario": "Add a new lead to Airtable when a website form is submitted",
            "inputValues": {
              "baseId": "{{$env.AIRTABLE_BASE_ID}}",
              "tableId": "Leads",
              "fields": "{\"Name\": \"{{$json.name}}\", \"Email\": \"{{$json.email}}\", \"Source\": \"Website Form\", \"Date\": \"{{$now}}\"}"
            },
            "expectedOutput": "Record is created. `{{$json.id}}` is the Airtable record ID for future updates."
          },
          "externalDocsUrl": "https://airtable.com/developers/web/api/introduction"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update an existing Airtable record by its record ID.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Airtable API key (required for authentication)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "patXXXXXXXXXXXXXX",
              "example": "patXXXXXXXXXXXXXX",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Airtable OAuth access token (alternative to API key)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Base Id",
              "internalKey": "baseId",
              "type": "string",
              "required": true,
              "description": "Airtable base ID",
              "helpText": "What this field is: The unique ID of your Airtable Base (your Airtable workspace/database).\nWhere to find it: Open your base in Airtable → click the Help (?) menu → API documentation. The Base ID is shown at the top of the page and in the URL. It always starts with \"app\".\nExample: appXXXXXXXXXXXXXX",
              "placeholder": "appXXXXXXXXXXXXXX",
              "example": "appXXXXXXXXXXXXXX"
            },
            {
              "name": "Table Id",
              "internalKey": "tableId",
              "type": "string",
              "required": true,
              "description": "Airtable table ID or name",
              "helpText": "What this field is: The Airtable table ID or name that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: tblXXXXXXXXXXXXXX.\nTip: Use {{$json.tableId}} when an earlier Airtable step provides this value.",
              "placeholder": "tblXXXXXXXXXXXXXX",
              "example": "tblXXXXXXXXXXXXXX"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for update/delete)",
              "helpText": "What this field is: The Record ID that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: recXXXXXXXXXXXXXX.\nTip: Use {{$json.recordId}} when an earlier Airtable step provides this value.",
              "placeholder": "recXXXXXXXXXXXXXX",
              "example": "recXXXXXXXXXXXXXX"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field values for create/update",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Airtable.\nExample: {\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}"
            }
          ],
          "outputExample": {
            "id": "recAbc123",
            "fields": {
              "Name": "Alice",
              "Status": "Converted",
              "Close Date": "2025-01-15"
            }
          },
          "outputDescription": "id: The updated record ID. fields: All field values after the update.",
          "usageExample": {
            "scenario": "Mark an Airtable lead as Converted when a CRM deal is closed",
            "inputValues": {
              "baseId": "{{$env.AIRTABLE_BASE_ID}}",
              "tableId": "Leads",
              "recordId": "{{$json.recordId}}",
              "fields": "{\"Status\": \"Converted\", \"Close Date\": \"{{$now}}\"}"
            },
            "expectedOutput": "Record is updated with new field values."
          },
          "externalDocsUrl": "https://airtable.com/developers/web/api/introduction"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete a record from an Airtable table by its record ID.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Airtable API key (required for authentication)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "patXXXXXXXXXXXXXX",
              "example": "patXXXXXXXXXXXXXX",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Airtable OAuth access token (alternative to API key)",
              "helpText": "What this field is: Airtable personal access token, a secret password that lets CtrlChecks talk to Airtable safely.\nWhere to find it: Airtable -> Developer hub -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: pat....\nImportant: Treat this like a bank password. Grant access only to the bases this workflow needs.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Base Id",
              "internalKey": "baseId",
              "type": "string",
              "required": true,
              "description": "Airtable base ID",
              "helpText": "What this field is: The unique ID of your Airtable Base (your Airtable workspace/database).\nWhere to find it: Open your base in Airtable → click the Help (?) menu → API documentation. The Base ID is shown at the top of the page and in the URL. It always starts with \"app\".\nExample: appXXXXXXXXXXXXXX",
              "placeholder": "appXXXXXXXXXXXXXX",
              "example": "appXXXXXXXXXXXXXX"
            },
            {
              "name": "Table Id",
              "internalKey": "tableId",
              "type": "string",
              "required": true,
              "description": "Airtable table ID or name",
              "helpText": "What this field is: The Airtable table ID or name that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: tblXXXXXXXXXXXXXX.\nTip: Use {{$json.tableId}} when an earlier Airtable step provides this value.",
              "placeholder": "tblXXXXXXXXXXXXXX",
              "example": "tblXXXXXXXXXXXXXX"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for update/delete)",
              "helpText": "What this field is: The Record ID that tells Airtable which item to use.\nWhere to find it: Open the item in Airtable and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: recXXXXXXXXXXXXXX.\nTip: Use {{$json.recordId}} when an earlier Airtable step provides this value.",
              "placeholder": "recXXXXXXXXXXXXXX",
              "example": "recXXXXXXXXXXXXXX"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field values for create/update",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Airtable.\nExample: {\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"Name\":\"John Doe\",\"Email\":\"test@example.com\"}"
            }
          ],
          "outputExample": {
            "deleted": true,
            "id": "recAbc123"
          },
          "outputDescription": "deleted: true if the record was successfully removed. id: The ID of the deleted record.",
          "usageExample": {
            "scenario": "Remove a cancelled subscription record from Airtable",
            "inputValues": {
              "baseId": "{{$env.AIRTABLE_BASE_ID}}",
              "tableId": "Subscriptions",
              "recordId": "{{$json.recordId}}"
            },
            "expectedOutput": "`deleted: true` confirms the record was removed."
          },
          "externalDocsUrl": "https://airtable.com/developers/web/api/introduction"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Airtable node."
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
