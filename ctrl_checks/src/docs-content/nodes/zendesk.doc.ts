import type { NodeDoc } from '../types';

export const zendeskDoc: NodeDoc = {
  "slug": "zendesk",
  "displayName": "Zendesk",
  "category": "Data",
  "logoUrl": "/icons/nodes/zendesk.svg",
  "description": "Create, read, update, and delete Zendesk support tickets and manage users.",
  "credentialType": "Zendesk API Key",
  "credentialSetupSteps": [
    "What this is: The Zendesk connection lets CtrlChecks access your Zendesk account safely without putting secrets in workflow fields.",
    "Where to start: Zendesk Admin Center -> Apps and integrations -> APIs -> Zendesk API.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Zendesk, then sign in or paste the secret value requested there.",
    "Example: the token Zendesk shows when you create it.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Zendesk step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.zendesk.com/documentation/ticketing/getting-started/hands-on-with-the-zendesk-api/",
  "resources": [
    {
      "name": "Operations",
      "description": "Zendesk exposes operation choices directly.",
      "operations": [
        {
          "name": "Get tickets",
          "value": "get_tickets",
          "description": "Get tickets using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_tickets",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with get tickets after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured get tickets data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        },
        {
          "name": "Get ticket",
          "value": "get_ticket",
          "description": "Get ticket using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_ticket",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with get ticket after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured get ticket data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        },
        {
          "name": "Create ticket",
          "value": "create_ticket",
          "description": "Create ticket using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "create_ticket",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with create ticket after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured create ticket data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        },
        {
          "name": "Update ticket",
          "value": "update_ticket",
          "description": "Update ticket using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "update_ticket",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with update ticket after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured update ticket data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        },
        {
          "name": "Delete ticket",
          "value": "delete_ticket",
          "description": "Delete ticket using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "delete_ticket",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with delete ticket after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured delete ticket data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        },
        {
          "name": "Get users",
          "value": "get_users",
          "description": "Get users using the Zendesk node.",
          "fields": [
            {
              "name": "Subdomain",
              "internalKey": "subdomain",
              "type": "string",
              "required": true,
              "description": "Zendesk subdomain",
              "helpText": "What this field is: The Zendesk subdomain that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subdomain}} when an earlier Zendesk step provides this value.",
              "placeholder": "Enter Subdomain"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": true,
              "description": "Agent email",
              "helpText": "What this field is: The email address for Agent email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Api Token",
              "internalKey": "apiToken",
              "type": "string",
              "required": true,
              "description": "Zendesk API token",
              "helpText": "What this field is: Zendesk API token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.apiToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Ticket Id",
              "internalKey": "ticketId",
              "type": "string",
              "required": false,
              "description": "Ticket ID",
              "helpText": "What this field is: The Ticket ID that tells Zendesk which item to use.\nWhere to find it: Open the item in Zendesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.ticketId}} when an earlier Zendesk step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Ticket body",
              "helpText": "What this field is: Ticket body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Ticket status",
              "helpText": "What this field is: Ticket status.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: open.\nTip: Use {{$json.status}} when this value comes from an earlier step.",
              "placeholder": "open",
              "example": "open",
              "defaultValue": "open"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Ticket priority",
              "helpText": "What this field is: Ticket priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: normal.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "normal",
              "example": "normal",
              "defaultValue": "normal"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Records per page",
              "helpText": "What this field is: The number used for Records per page.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_users",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Zendesk data with get users after a related upstream event is received",
            "inputValues": {
              "Subdomain": "",
              "Email": "user@example.com",
              "Api Token": "",
              "Ticket Id": "abc123",
              "Subject": ""
            },
            "expectedOutput": "Zendesk returns structured get users data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.zendesk.com/api-reference/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Zendesk node."
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
