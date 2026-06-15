import type { NodeDoc } from '../types';

export const microsoftDynamicsDoc: NodeDoc = {
  "slug": "microsoft_dynamics",
  "displayName": "Microsoft Dynamics",
  "category": "Data",
  "logoUrl": "/icons/nodes/microsoft_dynamics.svg",
  "description": "Manage CRM data in Microsoft Dynamics 365 (contacts, leads, accounts, opportunities, and more) via the Web API",
  "credentialType": "Microsoft Credential",
  "credentialSetupSteps": [
    "What this is: The Microsoft Dynamics connection lets CtrlChecks access your Microsoft Dynamics account safely without putting secrets in workflow fields.",
    "Where to start: Microsoft Dynamics account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Microsoft Dynamics, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Microsoft Dynamics.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Microsoft Dynamics step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.microsoft.com/en-us/graph/api/resources/mail-api-overview",
  "resources": [
    {
      "name": "Operations",
      "description": "Microsoft Dynamics exposes operation choices directly.",
      "operations": [
        {
          "name": "GetRecords",
          "value": "getRecords",
          "description": "GetRecords using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with get records after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured get records data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        },
        {
          "name": "GetRecord",
          "value": "getRecord",
          "description": "GetRecord using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with get record after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured get record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        },
        {
          "name": "CreateRecord",
          "value": "createRecord",
          "description": "CreateRecord using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with create record after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured create record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        },
        {
          "name": "UpdateRecord",
          "value": "updateRecord",
          "description": "UpdateRecord using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with update record after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured update record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        },
        {
          "name": "DeleteRecord",
          "value": "deleteRecord",
          "description": "DeleteRecord using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with delete record after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured delete record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        },
        {
          "name": "FetchXml",
          "value": "fetchXml",
          "description": "FetchXml using the Microsoft Dynamics node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Microsoft Dynamics 365 instance URL (e.g. https://yourorg.crm.dynamics.com)",
              "helpText": "What this field is: The web address for Microsoft Dynamics 365 instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://yourorg.crm.dynamics.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://yourorg.crm.dynamics.com",
              "example": "https://yourorg.crm.dynamics.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Azure AD OAuth2 access token (stored as credential)",
              "helpText": "What this field is: Microsoft Dynamics token, a secret password that lets CtrlChecks talk to Microsoft Dynamics safely.\nWhere to find it: Microsoft Dynamics account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Microsoft Dynamics.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Dynamics 365 entity logical name (e.g. contacts, leads, accounts)",
              "helpText": "What this field is: The Dynamics 365 entity type to work with.\nOptions: contacts, leads, accounts, opportunities, cases, tasks, or custom (then fill in Custom Entity).\nExample: contacts\nTip: Use {{$json.resource}} to set dynamically.",
              "placeholder": "contacts",
              "example": "contacts",
              "defaultValue": "contacts"
            },
            {
              "name": "Custom Entity",
              "internalKey": "customEntity",
              "type": "string",
              "required": false,
              "description": "Custom entity logical name when resource is \"custom\" (e.g. new_customentity)",
              "helpText": "What this field is: Custom entity logical name when resource is \"custom\".\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: new_customentity.\nTip: Use {{$json.customEntity}} when this value comes from an earlier step.",
              "placeholder": "new_customentity",
              "example": "new_customentity"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record GUID (required for getRecord, updateRecord, deleteRecord)",
              "helpText": "What this field is: The Record unique ID that tells Microsoft Dynamics which item to use.\nWhere to find it: Open the item in Microsoft Dynamics and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 00000000-0000-0000-0000-000000000000.\nTip: Use {{$json.id}} when an earlier Microsoft Dynamics step provides this value.",
              "placeholder": "00000000-0000-0000-0000-000000000000",
              "example": "00000000-0000-0000-0000-000000000000"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for createRecord/updateRecord operations (use Dynamics 365 logical field names)",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: {\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}",
              "example": "{\"firstname\":\"John\",\"lastname\":\"Doe\",\"emailaddress1\":\"john@example.com\"}"
            },
            {
              "name": "Fetch Xml",
              "internalKey": "fetchXml",
              "type": "string",
              "required": false,
              "description": "FetchXML query string (required for fetchXml operation)",
              "helpText": "What this field is: FetchXML query string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: <fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>.\nTip: This field is used for fetchXml. Leave it blank when this operation does not need it.",
              "placeholder": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>",
              "example": "<fetch><entity name=\"contact\"><attribute name=\"fullname\"/></entity></fetch>"
            },
            {
              "name": "Select",
              "internalKey": "select",
              "type": "string",
              "required": false,
              "description": "OData $select — comma-separated field names to return",
              "helpText": "What this field is: OData $select — comma-separated field names to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: fullname,emailaddress1,telephone1.\nTip: Use {{$json.select}} when this value comes from an earlier step.",
              "placeholder": "fullname,emailaddress1,telephone1",
              "example": "fullname,emailaddress1,telephone1"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "OData $filter expression to filter records",
              "helpText": "What this field is: Structured data for OData $filter expression to filter records.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Microsoft Dynamics.\nExample: emailaddress1 eq 'john@example.com'.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "emailaddress1 eq 'john@example.com'",
              "example": "emailaddress1 eq 'john@example.com'"
            },
            {
              "name": "Top",
              "internalKey": "top",
              "type": "number",
              "required": false,
              "description": "OData $top — maximum number of records to return (max 5000)",
              "helpText": "What this field is: The number used for OData $top — maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.top}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming Microsoft Dynamics data with fetch xml after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://yourorg.crm.dynamics.com",
              "Access Token": "",
              "Resource": "contacts",
              "Custom Entity": "new_customentity",
              "Id": "00000000-0000-0000-0000-000000000000"
            },
            "expectedOutput": "Microsoft Dynamics returns structured fetch xml data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Microsoft Dynamics node."
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
