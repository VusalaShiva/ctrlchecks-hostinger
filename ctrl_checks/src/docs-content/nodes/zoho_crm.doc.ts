import type { NodeDoc } from '../types';

export const zohoCrmDoc: NodeDoc = {
  "slug": "zoho_crm",
  "displayName": "Zoho CRM",
  "category": "Data",
  "logoUrl": "/icons/nodes/zoho_crm.svg",
  "description": "Zoho CRM operations - work with modules, records, and related lists",
  "credentialType": "Zoho Credential",
  "credentialSetupSteps": [
    "What this is: The Zoho CRM connection lets CtrlChecks access your Zoho CRM account safely without putting secrets in workflow fields.",
    "Where to start: Zoho API Console or CtrlChecks Connections.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Zoho CRM, then sign in or paste the secret value requested there.",
    "Example: the access token returned after Zoho sign-in.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Zoho CRM step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v3/oauth-overview.html",
  "resources": [
    {
      "name": "Operations",
      "description": "Zoho CRM exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Zoho CRM node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth access token (required for authentication)",
              "helpText": "What this field is: Zoho CRM access token, a secret password that lets CtrlChecks talk to Zoho CRM safely.\nWhere to find it: Zoho API Console or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Zoho sign-in.\nImportant: Treat this like a bank password. Choose the Zoho data center that matches your account.",
              "placeholder": "your-zoho-oauth-access-token",
              "example": "your-zoho-oauth-access-token"
            },
            {
              "name": "Refresh Token",
              "internalKey": "refreshToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth refresh token",
              "helpText": "What this field is: Zoho CRM account sign-in refresh token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-zoho-refresh-token.\nTip: Use {{$json.refreshToken}} when this value comes from an earlier step.",
              "placeholder": "your-zoho-refresh-token",
              "example": "your-zoho-refresh-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Zoho CRM module: Leads, Contacts, Accounts, Deals, etc.",
              "helpText": "What this field is: Zoho CRM module: Leads, Contacts, Accounts, Deals, etc..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Leads.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Leads",
              "example": "Leads",
              "defaultValue": "Contacts"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for get, update, delete)",
              "helpText": "What this field is: The Record ID that tells Zoho CRM which item to use.\nWhere to find it: Open the item in Zoho CRM and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Zoho CRM step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Criteria",
              "internalKey": "criteria",
              "type": "string",
              "required": false,
              "description": "Search criteria (optional, used for search operation)",
              "helpText": "What this field is: Search criteria.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: (Email:equals:test@example.com).\nTip: Use {{$json.criteria}} when this value comes from an earlier step.",
              "placeholder": "(Email:equals:test@example.com)",
              "example": "(Email:equals:test@example.com)"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Record data for create/update",
              "helpText": "What this field is: Structured data for Record data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Zoho CRM.\nExample: {\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Zoho CRM data with get after a related upstream event is received",
            "inputValues": {
              "Access Token": "your-zoho-oauth-access-token",
              "Refresh Token": "your-zoho-refresh-token",
              "Resource": "Leads",
              "Record Id": "123456789",
              "Criteria": "(Email:equals:test@example.com)"
            },
            "expectedOutput": "Zoho CRM returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v6/"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Zoho CRM node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth access token (required for authentication)",
              "helpText": "What this field is: Zoho CRM access token, a secret password that lets CtrlChecks talk to Zoho CRM safely.\nWhere to find it: Zoho API Console or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Zoho sign-in.\nImportant: Treat this like a bank password. Choose the Zoho data center that matches your account.",
              "placeholder": "your-zoho-oauth-access-token",
              "example": "your-zoho-oauth-access-token"
            },
            {
              "name": "Refresh Token",
              "internalKey": "refreshToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth refresh token",
              "helpText": "What this field is: Zoho CRM account sign-in refresh token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-zoho-refresh-token.\nTip: Use {{$json.refreshToken}} when this value comes from an earlier step.",
              "placeholder": "your-zoho-refresh-token",
              "example": "your-zoho-refresh-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Zoho CRM module: Leads, Contacts, Accounts, Deals, etc.",
              "helpText": "What this field is: Zoho CRM module: Leads, Contacts, Accounts, Deals, etc..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Leads.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Leads",
              "example": "Leads",
              "defaultValue": "Contacts"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for get, update, delete)",
              "helpText": "What this field is: The Record ID that tells Zoho CRM which item to use.\nWhere to find it: Open the item in Zoho CRM and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Zoho CRM step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Criteria",
              "internalKey": "criteria",
              "type": "string",
              "required": false,
              "description": "Search criteria (optional, used for search operation)",
              "helpText": "What this field is: Search criteria.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: (Email:equals:test@example.com).\nTip: Use {{$json.criteria}} when this value comes from an earlier step.",
              "placeholder": "(Email:equals:test@example.com)",
              "example": "(Email:equals:test@example.com)"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Record data for create/update",
              "helpText": "What this field is: Structured data for Record data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Zoho CRM.\nExample: {\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Zoho CRM data with create after a related upstream event is received",
            "inputValues": {
              "Access Token": "your-zoho-oauth-access-token",
              "Refresh Token": "your-zoho-refresh-token",
              "Resource": "Leads",
              "Record Id": "123456789",
              "Criteria": "(Email:equals:test@example.com)"
            },
            "expectedOutput": "Zoho CRM returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v6/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Zoho CRM node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth access token (required for authentication)",
              "helpText": "What this field is: Zoho CRM access token, a secret password that lets CtrlChecks talk to Zoho CRM safely.\nWhere to find it: Zoho API Console or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Zoho sign-in.\nImportant: Treat this like a bank password. Choose the Zoho data center that matches your account.",
              "placeholder": "your-zoho-oauth-access-token",
              "example": "your-zoho-oauth-access-token"
            },
            {
              "name": "Refresh Token",
              "internalKey": "refreshToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth refresh token",
              "helpText": "What this field is: Zoho CRM account sign-in refresh token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-zoho-refresh-token.\nTip: Use {{$json.refreshToken}} when this value comes from an earlier step.",
              "placeholder": "your-zoho-refresh-token",
              "example": "your-zoho-refresh-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Zoho CRM module: Leads, Contacts, Accounts, Deals, etc.",
              "helpText": "What this field is: Zoho CRM module: Leads, Contacts, Accounts, Deals, etc..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Leads.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Leads",
              "example": "Leads",
              "defaultValue": "Contacts"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for get, update, delete)",
              "helpText": "What this field is: The Record ID that tells Zoho CRM which item to use.\nWhere to find it: Open the item in Zoho CRM and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Zoho CRM step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Criteria",
              "internalKey": "criteria",
              "type": "string",
              "required": false,
              "description": "Search criteria (optional, used for search operation)",
              "helpText": "What this field is: Search criteria.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: (Email:equals:test@example.com).\nTip: Use {{$json.criteria}} when this value comes from an earlier step.",
              "placeholder": "(Email:equals:test@example.com)",
              "example": "(Email:equals:test@example.com)"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Record data for create/update",
              "helpText": "What this field is: Structured data for Record data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Zoho CRM.\nExample: {\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Zoho CRM data with update after a related upstream event is received",
            "inputValues": {
              "Access Token": "your-zoho-oauth-access-token",
              "Refresh Token": "your-zoho-refresh-token",
              "Resource": "Leads",
              "Record Id": "123456789",
              "Criteria": "(Email:equals:test@example.com)"
            },
            "expectedOutput": "Zoho CRM returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v6/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Zoho CRM node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth access token (required for authentication)",
              "helpText": "What this field is: Zoho CRM access token, a secret password that lets CtrlChecks talk to Zoho CRM safely.\nWhere to find it: Zoho API Console or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Zoho sign-in.\nImportant: Treat this like a bank password. Choose the Zoho data center that matches your account.",
              "placeholder": "your-zoho-oauth-access-token",
              "example": "your-zoho-oauth-access-token"
            },
            {
              "name": "Refresh Token",
              "internalKey": "refreshToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth refresh token",
              "helpText": "What this field is: Zoho CRM account sign-in refresh token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-zoho-refresh-token.\nTip: Use {{$json.refreshToken}} when this value comes from an earlier step.",
              "placeholder": "your-zoho-refresh-token",
              "example": "your-zoho-refresh-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Zoho CRM module: Leads, Contacts, Accounts, Deals, etc.",
              "helpText": "What this field is: Zoho CRM module: Leads, Contacts, Accounts, Deals, etc..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Leads.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Leads",
              "example": "Leads",
              "defaultValue": "Contacts"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for get, update, delete)",
              "helpText": "What this field is: The Record ID that tells Zoho CRM which item to use.\nWhere to find it: Open the item in Zoho CRM and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Zoho CRM step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Criteria",
              "internalKey": "criteria",
              "type": "string",
              "required": false,
              "description": "Search criteria (optional, used for search operation)",
              "helpText": "What this field is: Search criteria.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: (Email:equals:test@example.com).\nTip: Use {{$json.criteria}} when this value comes from an earlier step.",
              "placeholder": "(Email:equals:test@example.com)",
              "example": "(Email:equals:test@example.com)"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Record data for create/update",
              "helpText": "What this field is: Structured data for Record data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Zoho CRM.\nExample: {\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Zoho CRM data with delete after a related upstream event is received",
            "inputValues": {
              "Access Token": "your-zoho-oauth-access-token",
              "Refresh Token": "your-zoho-refresh-token",
              "Resource": "Leads",
              "Record Id": "123456789",
              "Criteria": "(Email:equals:test@example.com)"
            },
            "expectedOutput": "Zoho CRM returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v6/"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the Zoho CRM node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth access token (required for authentication)",
              "helpText": "What this field is: Zoho CRM access token, a secret password that lets CtrlChecks talk to Zoho CRM safely.\nWhere to find it: Zoho API Console or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Zoho sign-in.\nImportant: Treat this like a bank password. Choose the Zoho data center that matches your account.",
              "placeholder": "your-zoho-oauth-access-token",
              "example": "your-zoho-oauth-access-token"
            },
            {
              "name": "Refresh Token",
              "internalKey": "refreshToken",
              "type": "string",
              "required": false,
              "description": "Zoho CRM OAuth refresh token",
              "helpText": "What this field is: Zoho CRM account sign-in refresh token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-zoho-refresh-token.\nTip: Use {{$json.refreshToken}} when this value comes from an earlier step.",
              "placeholder": "your-zoho-refresh-token",
              "example": "your-zoho-refresh-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Zoho CRM module: Leads, Contacts, Accounts, Deals, etc.",
              "helpText": "What this field is: Zoho CRM module: Leads, Contacts, Accounts, Deals, etc..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Leads.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Leads",
              "example": "Leads",
              "defaultValue": "Contacts"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID (required for get, update, delete)",
              "helpText": "What this field is: The Record ID that tells Zoho CRM which item to use.\nWhere to find it: Open the item in Zoho CRM and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Zoho CRM step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Criteria",
              "internalKey": "criteria",
              "type": "string",
              "required": false,
              "description": "Search criteria (optional, used for search operation)",
              "helpText": "What this field is: Search criteria.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: (Email:equals:test@example.com).\nTip: Use {{$json.criteria}} when this value comes from an earlier step.",
              "placeholder": "(Email:equals:test@example.com)",
              "example": "(Email:equals:test@example.com)"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Record data for create/update",
              "helpText": "What this field is: Structured data for Record data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Zoho CRM.\nExample: {\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"First_Name\":\"John\",\"Last_Name\":\"Doe\",\"Email\":\"test@example.com\"}"
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
            "scenario": "Process incoming Zoho CRM data with search after a related upstream event is received",
            "inputValues": {
              "Access Token": "your-zoho-oauth-access-token",
              "Refresh Token": "your-zoho-refresh-token",
              "Resource": "Leads",
              "Record Id": "123456789",
              "Criteria": "(Email:equals:test@example.com)"
            },
            "expectedOutput": "Zoho CRM returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.zoho.com/crm/developer/docs/api/v6/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Zoho CRM node."
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
