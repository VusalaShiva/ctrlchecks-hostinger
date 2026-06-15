import type { NodeDoc } from '../types';

export const xeroDoc: NodeDoc = {
  "slug": "xero",
  "displayName": "Xero",
  "category": "Utility",
  "logoUrl": "/icons/nodes/xero.svg",
  "description": "Create, fetch, update, and search Xero accounting records (contacts, invoices, items, payments, accounts).",
  "credentialType": "Xero Credential",
  "credentialSetupSteps": [
    "What this is: The Xero connection lets CtrlChecks access your Xero account safely without putting secrets in workflow fields.",
    "Where to start: Xero developer app connection or CtrlChecks Connections.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Xero, then sign in or paste the secret value requested there.",
    "Example: the access token returned after Xero sign-in.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Xero step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.xero.com/documentation/getting-started-guide",
  "resources": [
    {
      "name": "Operations",
      "description": "Xero exposes operation choices directly.",
      "operations": [
        {
          "name": "Get many",
          "value": "get_many",
          "description": "Get many using the Xero node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Xero OAuth 2.0 access token",
              "helpText": "What this field is: Xero access token, a secret password that lets CtrlChecks talk to Xero safely.\nWhere to find it: Xero developer app connection or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Xero sign-in.\nImportant: Treat this like a bank password. Xero tokens expire; reconnect the Connection when needed.",
              "placeholder": "token_..."
            },
            {
              "name": "Tenant Id",
              "internalKey": "tenantId",
              "type": "string",
              "required": true,
              "description": "Xero tenant ID",
              "helpText": "What this field is: The Xero tenant ID that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenantId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Xero resource",
              "helpText": "What this field is: The Xero accounting entity type to query or manage.\nOptions: Contacts (customers/suppliers), Invoices (bills/sales), Items (products), Payments, Accounts (chart of accounts).\nExample: invoices to fetch unpaid invoices, contacts to look up a customer.\nTip: The resource determines which Xero API endpoint is called.",
              "placeholder": "invoices",
              "example": "invoices",
              "defaultValue": "invoices",
              "options": [
                "Contacts",
                "Invoices",
                "Items",
                "Payments",
                "Accounts"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID for get_by_id or update",
              "helpText": "What this field is: The Record ID for get_by_id or update that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Xero.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "string",
              "required": false,
              "description": "Xero WHERE filter",
              "helpText": "What this field is: Xero WHERE filter.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Where value.\nTip: Use {{$json.where}} when this value comes from an earlier step.",
              "placeholder": "Enter Where"
            },
            {
              "name": "Order",
              "internalKey": "order",
              "type": "string",
              "required": false,
              "description": "Sort order",
              "helpText": "What this field is: Sort order.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Order value.\nTip: Use {{$json.order}} when this value comes from an earlier step.",
              "placeholder": "Enter Order"
            },
            {
              "name": "Page",
              "internalKey": "page",
              "type": "number",
              "required": false,
              "description": "Page number",
              "helpText": "What this field is: The Page number that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.page}} when an earlier Xero step provides this value.",
              "placeholder": "1",
              "example": "1",
              "defaultValue": "1"
            },
            {
              "name": "Modified After",
              "internalKey": "modifiedAfter",
              "type": "string",
              "required": false,
              "description": "ISO date — only records modified after",
              "helpText": "What this field is: The date or time value for ISO date — only records modified after.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.modifiedAfter}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Modified After"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_many",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Xero data with get many after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Tenant Id": "abc123",
              "Resource": "invoices",
              "Record Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Xero returns structured get many data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.xero.com/documentation/api/accounting/overview"
        },
        {
          "name": "Get by id",
          "value": "get_by_id",
          "description": "Get by id using the Xero node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Xero OAuth 2.0 access token",
              "helpText": "What this field is: Xero access token, a secret password that lets CtrlChecks talk to Xero safely.\nWhere to find it: Xero developer app connection or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Xero sign-in.\nImportant: Treat this like a bank password. Xero tokens expire; reconnect the Connection when needed.",
              "placeholder": "token_..."
            },
            {
              "name": "Tenant Id",
              "internalKey": "tenantId",
              "type": "string",
              "required": true,
              "description": "Xero tenant ID",
              "helpText": "What this field is: The Xero tenant ID that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenantId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Xero resource",
              "helpText": "What this field is: The Xero accounting entity type to query or manage.\nOptions: Contacts (customers/suppliers), Invoices (bills/sales), Items (products), Payments, Accounts (chart of accounts).\nExample: invoices to fetch unpaid invoices, contacts to look up a customer.\nTip: The resource determines which Xero API endpoint is called.",
              "placeholder": "invoices",
              "example": "invoices",
              "defaultValue": "invoices",
              "options": [
                "Contacts",
                "Invoices",
                "Items",
                "Payments",
                "Accounts"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID for get_by_id or update",
              "helpText": "What this field is: The Record ID for get_by_id or update that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Xero.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "string",
              "required": false,
              "description": "Xero WHERE filter",
              "helpText": "What this field is: Xero WHERE filter.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Where value.\nTip: Use {{$json.where}} when this value comes from an earlier step.",
              "placeholder": "Enter Where"
            },
            {
              "name": "Order",
              "internalKey": "order",
              "type": "string",
              "required": false,
              "description": "Sort order",
              "helpText": "What this field is: Sort order.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Order value.\nTip: Use {{$json.order}} when this value comes from an earlier step.",
              "placeholder": "Enter Order"
            },
            {
              "name": "Page",
              "internalKey": "page",
              "type": "number",
              "required": false,
              "description": "Page number",
              "helpText": "What this field is: The Page number that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.page}} when an earlier Xero step provides this value.",
              "placeholder": "1",
              "example": "1",
              "defaultValue": "1"
            },
            {
              "name": "Modified After",
              "internalKey": "modifiedAfter",
              "type": "string",
              "required": false,
              "description": "ISO date — only records modified after",
              "helpText": "What this field is: The date or time value for ISO date — only records modified after.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.modifiedAfter}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Modified After"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_by_id",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Xero data with get by id after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Tenant Id": "abc123",
              "Resource": "invoices",
              "Record Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Xero returns structured get by id data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.xero.com/documentation/api/accounting/overview"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Xero node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Xero OAuth 2.0 access token",
              "helpText": "What this field is: Xero access token, a secret password that lets CtrlChecks talk to Xero safely.\nWhere to find it: Xero developer app connection or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Xero sign-in.\nImportant: Treat this like a bank password. Xero tokens expire; reconnect the Connection when needed.",
              "placeholder": "token_..."
            },
            {
              "name": "Tenant Id",
              "internalKey": "tenantId",
              "type": "string",
              "required": true,
              "description": "Xero tenant ID",
              "helpText": "What this field is: The Xero tenant ID that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenantId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Xero resource",
              "helpText": "What this field is: The Xero accounting entity type to query or manage.\nOptions: Contacts (customers/suppliers), Invoices (bills/sales), Items (products), Payments, Accounts (chart of accounts).\nExample: invoices to fetch unpaid invoices, contacts to look up a customer.\nTip: The resource determines which Xero API endpoint is called.",
              "placeholder": "invoices",
              "example": "invoices",
              "defaultValue": "invoices",
              "options": [
                "Contacts",
                "Invoices",
                "Items",
                "Payments",
                "Accounts"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID for get_by_id or update",
              "helpText": "What this field is: The Record ID for get_by_id or update that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Xero.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "string",
              "required": false,
              "description": "Xero WHERE filter",
              "helpText": "What this field is: Xero WHERE filter.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Where value.\nTip: Use {{$json.where}} when this value comes from an earlier step.",
              "placeholder": "Enter Where"
            },
            {
              "name": "Order",
              "internalKey": "order",
              "type": "string",
              "required": false,
              "description": "Sort order",
              "helpText": "What this field is: Sort order.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Order value.\nTip: Use {{$json.order}} when this value comes from an earlier step.",
              "placeholder": "Enter Order"
            },
            {
              "name": "Page",
              "internalKey": "page",
              "type": "number",
              "required": false,
              "description": "Page number",
              "helpText": "What this field is: The Page number that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.page}} when an earlier Xero step provides this value.",
              "placeholder": "1",
              "example": "1",
              "defaultValue": "1"
            },
            {
              "name": "Modified After",
              "internalKey": "modifiedAfter",
              "type": "string",
              "required": false,
              "description": "ISO date — only records modified after",
              "helpText": "What this field is: The date or time value for ISO date — only records modified after.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.modifiedAfter}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Modified After"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "create",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Xero data with create after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Tenant Id": "abc123",
              "Resource": "invoices",
              "Record Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Xero returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.xero.com/documentation/api/accounting/overview"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Xero node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Xero OAuth 2.0 access token",
              "helpText": "What this field is: Xero access token, a secret password that lets CtrlChecks talk to Xero safely.\nWhere to find it: Xero developer app connection or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Xero sign-in.\nImportant: Treat this like a bank password. Xero tokens expire; reconnect the Connection when needed.",
              "placeholder": "token_..."
            },
            {
              "name": "Tenant Id",
              "internalKey": "tenantId",
              "type": "string",
              "required": true,
              "description": "Xero tenant ID",
              "helpText": "What this field is: The Xero tenant ID that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenantId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Xero resource",
              "helpText": "What this field is: The Xero accounting entity type to query or manage.\nOptions: Contacts (customers/suppliers), Invoices (bills/sales), Items (products), Payments, Accounts (chart of accounts).\nExample: invoices to fetch unpaid invoices, contacts to look up a customer.\nTip: The resource determines which Xero API endpoint is called.",
              "placeholder": "invoices",
              "example": "invoices",
              "defaultValue": "invoices",
              "options": [
                "Contacts",
                "Invoices",
                "Items",
                "Payments",
                "Accounts"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID for get_by_id or update",
              "helpText": "What this field is: The Record ID for get_by_id or update that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Xero step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Xero.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "string",
              "required": false,
              "description": "Xero WHERE filter",
              "helpText": "What this field is: Xero WHERE filter.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Where value.\nTip: Use {{$json.where}} when this value comes from an earlier step.",
              "placeholder": "Enter Where"
            },
            {
              "name": "Order",
              "internalKey": "order",
              "type": "string",
              "required": false,
              "description": "Sort order",
              "helpText": "What this field is: Sort order.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Order value.\nTip: Use {{$json.order}} when this value comes from an earlier step.",
              "placeholder": "Enter Order"
            },
            {
              "name": "Page",
              "internalKey": "page",
              "type": "number",
              "required": false,
              "description": "Page number",
              "helpText": "What this field is: The Page number that tells Xero which item to use.\nWhere to find it: Open the item in Xero and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.page}} when an earlier Xero step provides this value.",
              "placeholder": "1",
              "example": "1",
              "defaultValue": "1"
            },
            {
              "name": "Modified After",
              "internalKey": "modifiedAfter",
              "type": "string",
              "required": false,
              "description": "ISO date — only records modified after",
              "helpText": "What this field is: The date or time value for ISO date — only records modified after.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.modifiedAfter}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Modified After"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "update",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Xero data with update after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Tenant Id": "abc123",
              "Resource": "invoices",
              "Record Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Xero returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.xero.com/documentation/api/accounting/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Xero node."
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
