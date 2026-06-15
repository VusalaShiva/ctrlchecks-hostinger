import type { NodeDoc } from '../types';

export const hubspotDoc: NodeDoc = {
  "slug": "hubspot",
  "displayName": "HubSpot",
  "category": "Data",
  "logoUrl": "/icons/nodes/hubspot.svg",
  "description": "HubSpot CRM operations - create, update, retrieve, or search contacts, companies, deals, tickets, and other objects",
  "credentialType": "HubSpot API Key",
  "credentialSetupSteps": [
    "What this is: The HubSpot connection lets CtrlChecks access your HubSpot account safely without putting secrets in workflow fields.",
    "Where to start: HubSpot -> Settings -> Integrations -> Private Apps -> your app -> Auth.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> HubSpot, then sign in or paste the secret value requested there.",
    "Example: pat-na1-... or the token HubSpot shows.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple HubSpot step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.hubspot.com/docs/api/private-apps",
  "resources": [
    {
      "name": "Operations",
      "description": "HubSpot exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get a HubSpot CRM object (contact, company, or deal) by its ID.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Object ID (required for get, update, delete)",
              "helpText": "What this field is: The HubSpot record ID for the contact, company, deal, ticket, or other object.\nWhere to find it: Open the record in HubSpot and copy the numeric ID from the URL, or use the id returned by a previous HubSpot step.\nExample: 123456789.\nTip: Use {{$json.id}} from a previous search or create step.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Object Id",
              "internalKey": "objectId",
              "type": "string",
              "required": false,
              "description": "Alias for id (legacy field name)",
              "helpText": "What this field is: The HubSpot record ID — a unique number for each record.\nWhere to find it: Open the record in HubSpot — the ID is in the browser URL after /contact/ or /deal/ or /company/.\nExample: app.hubspot.com/contacts/[portalId]/contact/12345678 → ID is 12345678\nTip: Use {{$json.hs_object_id}} from a previous HubSpot search step.",
              "placeholder": "123456789",
              "example": "123456789"
            }
          ],
          "outputExample": {
            "id": "12345",
            "properties": {
              "firstname": "Alice",
              "lastname": "Smith",
              "email": "alice@example.com",
              "hubspot_owner_id": "6789"
            },
            "createdAt": "2024-01-01T00:00:00Z"
          },
          "outputDescription": "id: HubSpot object ID. properties: All CRM properties. createdAt: When the record was created.",
          "usageExample": {
            "scenario": "Look up a HubSpot contact before updating their properties",
            "inputValues": {
              "objectType": "contacts",
              "objectId": "{{$json.contactId}}"
            },
            "expectedOutput": "Returns the full contact record."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        },
        {
          "name": "GetMany",
          "value": "getMany",
          "description": "GetMany using the HubSpot node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Number of records to return",
              "helpText": "What this field is: The number used for Number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            },
            {
              "name": "After",
              "internalKey": "after",
              "type": "string",
              "required": false,
              "description": "Pagination token for next page",
              "helpText": "What this field is: The date or time value for Pagination token for next page.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: paging_token.\nTip: Use {{$json.after}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "paging_token",
              "example": "paging_token"
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
            "scenario": "Process incoming HubSpot data with get many after a related upstream event is received",
            "inputValues": {
              "Resource": "contact",
              "Limit": "10",
              "After": "paging_token"
            },
            "expectedOutput": "HubSpot returns structured get many data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new contact, company, or deal in HubSpot.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "json",
              "required": false,
              "description": "Object properties for create/update operations",
              "helpText": "What this field is: The HubSpot field values to create or update on a record.\nWhere to find it: In HubSpot, open Settings -> Properties and copy the internal property name, such as email, firstname, lastname, amount, or dealstage.\nHow to fill it: Enter structured data in { } brackets where each key is a HubSpot internal property name.\nExample: {\"email\":\"alice@example.com\",\"firstname\":\"Alice\",\"lastname\":\"Kumar\"}.\nTip: Use internal names, not only the labels you see on screen.",
              "placeholder": "{\"email\":\"test@example.com\",\"firstname\":\"John\",\"lastname\":\"Doe\"}",
              "example": "{\"email\":\"test@example.com\",\"firstname\":\"John\",\"lastname\":\"Doe\"}"
            }
          ],
          "outputExample": {
            "id": "new_12345",
            "properties": {
              "firstname": "Bob",
              "email": "bob@example.com",
              "hs_object_id": "new_12345"
            }
          },
          "outputDescription": "id: The new HubSpot record ID. properties: The properties set for the new record.",
          "usageExample": {
            "scenario": "Create a HubSpot contact when a new user signs up via a website form",
            "inputValues": {
              "objectType": "contacts",
              "properties": "{\"firstname\": \"{{$json.firstName}}\", \"lastname\": \"{{$json.lastName}}\", \"email\": \"{{$json.email}}\", \"source\": \"website_form\"}"
            },
            "expectedOutput": "Contact is created. `{{$json.id}}` is the HubSpot contact ID."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update properties on an existing HubSpot contact, company, or deal.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Object ID (required for get, update, delete)",
              "helpText": "What this field is: The HubSpot record ID for the contact, company, deal, ticket, or other object.\nWhere to find it: Open the record in HubSpot and copy the numeric ID from the URL, or use the id returned by a previous HubSpot step.\nExample: 123456789.\nTip: Use {{$json.id}} from a previous search or create step.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Object Id",
              "internalKey": "objectId",
              "type": "string",
              "required": false,
              "description": "Alias for id (legacy field name)",
              "helpText": "What this field is: The HubSpot record ID — a unique number for each record.\nWhere to find it: Open the record in HubSpot — the ID is in the browser URL after /contact/ or /deal/ or /company/.\nExample: app.hubspot.com/contacts/[portalId]/contact/12345678 → ID is 12345678\nTip: Use {{$json.hs_object_id}} from a previous HubSpot search step.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "json",
              "required": false,
              "description": "Object properties for create/update operations",
              "helpText": "What this field is: The HubSpot field values to create or update on a record.\nWhere to find it: In HubSpot, open Settings -> Properties and copy the internal property name, such as email, firstname, lastname, amount, or dealstage.\nHow to fill it: Enter structured data in { } brackets where each key is a HubSpot internal property name.\nExample: {\"email\":\"alice@example.com\",\"firstname\":\"Alice\",\"lastname\":\"Kumar\"}.\nTip: Use internal names, not only the labels you see on screen.",
              "placeholder": "{\"email\":\"test@example.com\",\"firstname\":\"John\",\"lastname\":\"Doe\"}",
              "example": "{\"email\":\"test@example.com\",\"firstname\":\"John\",\"lastname\":\"Doe\"}"
            }
          ],
          "outputExample": {
            "id": "12345",
            "properties": {
              "lifecyclestage": "customer",
              "dealstage": "closedwon"
            }
          },
          "outputDescription": "id: The updated record ID. properties: The properties as they stand after the update.",
          "usageExample": {
            "scenario": "Move a HubSpot deal to \"Closed Won\" when a Stripe payment succeeds",
            "inputValues": {
              "objectType": "deals",
              "objectId": "{{$json.dealId}}",
              "properties": "{\"dealstage\": \"closedwon\", \"closedate\": \"{{$now}}\"}"
            },
            "expectedOutput": "Deal stage is updated in HubSpot."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the HubSpot node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Object ID (required for get, update, delete)",
              "helpText": "What this field is: The HubSpot record ID for the contact, company, deal, ticket, or other object.\nWhere to find it: Open the record in HubSpot and copy the numeric ID from the URL, or use the id returned by a previous HubSpot step.\nExample: 123456789.\nTip: Use {{$json.id}} from a previous search or create step.",
              "placeholder": "123456789",
              "example": "123456789"
            },
            {
              "name": "Object Id",
              "internalKey": "objectId",
              "type": "string",
              "required": false,
              "description": "Alias for id (legacy field name)",
              "helpText": "What this field is: The HubSpot record ID — a unique number for each record.\nWhere to find it: Open the record in HubSpot — the ID is in the browser URL after /contact/ or /deal/ or /company/.\nExample: app.hubspot.com/contacts/[portalId]/contact/12345678 → ID is 12345678\nTip: Use {{$json.hs_object_id}} from a previous HubSpot search step.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming HubSpot data with delete after a related upstream event is received",
            "inputValues": {
              "Resource": "contact",
              "Id": "123456789",
              "Object Id": "123456789"
            },
            "expectedOutput": "HubSpot returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the HubSpot node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline",
              "helpText": "What this field is: HubSpot object type: contact, company, deal, ticket, product, line_item, quote, call, email, meeting, note, task, owner, pipeline.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: contact.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "contact",
              "example": "contact",
              "defaultValue": "contact"
            },
            {
              "name": "Search Query",
              "internalKey": "searchQuery",
              "type": "string",
              "required": false,
              "description": "Search query (required for search operation)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HubSpot.\nExample: email:test@example.com.\nTip: Use {{$json.searchQuery}} when an earlier step already prepared this data.",
              "placeholder": "email:test@example.com",
              "example": "email:test@example.com"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Number of records to return",
              "helpText": "What this field is: The number used for Number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            },
            {
              "name": "After",
              "internalKey": "after",
              "type": "string",
              "required": false,
              "description": "Pagination token for next page",
              "helpText": "What this field is: The date or time value for Pagination token for next page.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: paging_token.\nTip: Use {{$json.after}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "paging_token",
              "example": "paging_token"
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
            "scenario": "Process incoming HubSpot data with search after a related upstream event is received",
            "inputValues": {
              "Resource": "contact",
              "Search Query": "email:test@example.com",
              "Limit": "10",
              "After": "paging_token"
            },
            "expectedOutput": "HubSpot returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.hubspot.com/docs/api/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the HubSpot node."
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
