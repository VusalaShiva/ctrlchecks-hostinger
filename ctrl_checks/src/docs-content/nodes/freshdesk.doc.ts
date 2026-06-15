import type { NodeDoc } from '../types';

export const freshdeskDoc: NodeDoc = {
  "slug": "freshdesk",
  "displayName": "Freshdesk",
  "category": "Data",
  "logoUrl": "/icons/nodes/freshdesk.svg",
  "description": "Freshdesk support operations",
  "credentialType": "Freshdesk API Key",
  "credentialSetupSteps": [
    "What this is: The Freshdesk connection lets CtrlChecks access your Freshdesk account safely without putting secrets in workflow fields.",
    "Where to start: Freshdesk account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Freshdesk, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Freshdesk.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Freshdesk step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.freshdesk.com/api/",
  "resources": [
    {
      "name": "Operations",
      "description": "Freshdesk exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Freshdesk node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Freshdesk domain (e.g., yourcompany.freshdesk.com)",
              "helpText": "What this field is: The Freshdesk domain that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: mycompany.freshdesk.com.\nTip: Use {{$json.domain}} when an earlier Freshdesk step provides this value.",
              "placeholder": "mycompany.freshdesk.com",
              "example": "mycompany.freshdesk.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Freshdesk API key (optional if stored in vault under key \"freshdesk\")",
              "helpText": "What this field is: Freshdesk token, a secret password that lets CtrlChecks talk to Freshdesk safely.\nWhere to find it: Freshdesk account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Freshdesk.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: ticket, contact, company",
              "helpText": "What this field is: The Freshdesk entity type to work with.\nOptions: ticket, contact, company.\nExample: ticket\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "ticket",
              "example": "ticket",
              "defaultValue": "ticket"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (e.g., ticket ID for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 12345.\nTip: Use {{$json.id}} when an earlier Freshdesk step provides this value.",
              "placeholder": "12345",
              "example": "12345"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject (create)",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Ticket description (create)",
              "helpText": "What this field is: Ticket description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Requester email (create)",
              "helpText": "What this field is: The email address for Requester email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Priority (1=Low,2=Medium,3=High,4=Urgent)",
              "helpText": "What this field is: The number used for Priority.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "number",
              "required": false,
              "description": "Status (2=Open,3=Pending,4=Resolved,5=Closed)",
              "helpText": "What this field is: The number used for Status.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.status}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Freshdesk.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Freshdesk data with get after a related upstream event is received",
            "inputValues": {
              "Domain": "mycompany.freshdesk.com",
              "Api Key": "",
              "Resource": "ticket",
              "Id": "12345",
              "Subject": ""
            },
            "expectedOutput": "Freshdesk returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.freshdesk.com/api/"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Freshdesk node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Freshdesk domain (e.g., yourcompany.freshdesk.com)",
              "helpText": "What this field is: The Freshdesk domain that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: mycompany.freshdesk.com.\nTip: Use {{$json.domain}} when an earlier Freshdesk step provides this value.",
              "placeholder": "mycompany.freshdesk.com",
              "example": "mycompany.freshdesk.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Freshdesk API key (optional if stored in vault under key \"freshdesk\")",
              "helpText": "What this field is: Freshdesk token, a secret password that lets CtrlChecks talk to Freshdesk safely.\nWhere to find it: Freshdesk account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Freshdesk.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: ticket, contact, company",
              "helpText": "What this field is: The Freshdesk entity type to work with.\nOptions: ticket, contact, company.\nExample: ticket\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "ticket",
              "example": "ticket",
              "defaultValue": "ticket"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (e.g., ticket ID for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 12345.\nTip: Use {{$json.id}} when an earlier Freshdesk step provides this value.",
              "placeholder": "12345",
              "example": "12345"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject (create)",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Ticket description (create)",
              "helpText": "What this field is: Ticket description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Requester email (create)",
              "helpText": "What this field is: The email address for Requester email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Priority (1=Low,2=Medium,3=High,4=Urgent)",
              "helpText": "What this field is: The number used for Priority.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "number",
              "required": false,
              "description": "Status (2=Open,3=Pending,4=Resolved,5=Closed)",
              "helpText": "What this field is: The number used for Status.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.status}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Freshdesk.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Freshdesk data with create after a related upstream event is received",
            "inputValues": {
              "Domain": "mycompany.freshdesk.com",
              "Api Key": "",
              "Resource": "ticket",
              "Id": "12345",
              "Subject": ""
            },
            "expectedOutput": "Freshdesk returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.freshdesk.com/api/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Freshdesk node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Freshdesk domain (e.g., yourcompany.freshdesk.com)",
              "helpText": "What this field is: The Freshdesk domain that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: mycompany.freshdesk.com.\nTip: Use {{$json.domain}} when an earlier Freshdesk step provides this value.",
              "placeholder": "mycompany.freshdesk.com",
              "example": "mycompany.freshdesk.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Freshdesk API key (optional if stored in vault under key \"freshdesk\")",
              "helpText": "What this field is: Freshdesk token, a secret password that lets CtrlChecks talk to Freshdesk safely.\nWhere to find it: Freshdesk account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Freshdesk.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: ticket, contact, company",
              "helpText": "What this field is: The Freshdesk entity type to work with.\nOptions: ticket, contact, company.\nExample: ticket\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "ticket",
              "example": "ticket",
              "defaultValue": "ticket"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (e.g., ticket ID for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 12345.\nTip: Use {{$json.id}} when an earlier Freshdesk step provides this value.",
              "placeholder": "12345",
              "example": "12345"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject (create)",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Ticket description (create)",
              "helpText": "What this field is: Ticket description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Requester email (create)",
              "helpText": "What this field is: The email address for Requester email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Priority (1=Low,2=Medium,3=High,4=Urgent)",
              "helpText": "What this field is: The number used for Priority.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "number",
              "required": false,
              "description": "Status (2=Open,3=Pending,4=Resolved,5=Closed)",
              "helpText": "What this field is: The number used for Status.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.status}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Freshdesk.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Freshdesk data with update after a related upstream event is received",
            "inputValues": {
              "Domain": "mycompany.freshdesk.com",
              "Api Key": "",
              "Resource": "ticket",
              "Id": "12345",
              "Subject": ""
            },
            "expectedOutput": "Freshdesk returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.freshdesk.com/api/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Freshdesk node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Freshdesk domain (e.g., yourcompany.freshdesk.com)",
              "helpText": "What this field is: The Freshdesk domain that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: mycompany.freshdesk.com.\nTip: Use {{$json.domain}} when an earlier Freshdesk step provides this value.",
              "placeholder": "mycompany.freshdesk.com",
              "example": "mycompany.freshdesk.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Freshdesk API key (optional if stored in vault under key \"freshdesk\")",
              "helpText": "What this field is: Freshdesk token, a secret password that lets CtrlChecks talk to Freshdesk safely.\nWhere to find it: Freshdesk account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Freshdesk.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: ticket, contact, company",
              "helpText": "What this field is: The Freshdesk entity type to work with.\nOptions: ticket, contact, company.\nExample: ticket\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "ticket",
              "example": "ticket",
              "defaultValue": "ticket"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (e.g., ticket ID for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells Freshdesk which item to use.\nWhere to find it: Open the item in Freshdesk and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 12345.\nTip: Use {{$json.id}} when an earlier Freshdesk step provides this value.",
              "placeholder": "12345",
              "example": "12345"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Ticket subject (create)",
              "helpText": "What this field is: Ticket subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Ticket description (create)",
              "helpText": "What this field is: Ticket description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Requester email (create)",
              "helpText": "What this field is: The email address for Requester email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "number",
              "required": false,
              "description": "Priority (1=Low,2=Medium,3=High,4=Urgent)",
              "helpText": "What this field is: The number used for Priority.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.priority}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "number",
              "required": false,
              "description": "Status (2=Open,3=Pending,4=Resolved,5=Closed)",
              "helpText": "What this field is: The number used for Status.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.status}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Freshdesk.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Freshdesk data with delete after a related upstream event is received",
            "inputValues": {
              "Domain": "mycompany.freshdesk.com",
              "Api Key": "",
              "Resource": "ticket",
              "Id": "12345",
              "Subject": ""
            },
            "expectedOutput": "Freshdesk returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.freshdesk.com/api/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Freshdesk node."
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
