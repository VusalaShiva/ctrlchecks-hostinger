import type { NodeDoc } from '../types';

export const workdayDoc: NodeDoc = {
  "slug": "workday",
  "displayName": "Workday",
  "category": "Utility",
  "logoUrl": "/icons/nodes/workday.svg",
  "description": "Read and manage Workday HR, staffing, and organizational data through the Workday REST APIs.",
  "credentialType": "Workday Credential",
  "credentialSetupSteps": [
    "What this is: The Workday connection lets CtrlChecks access your Workday account safely without putting secrets in workflow fields.",
    "Where to start: Workday account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Workday, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Workday.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Workday step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://community.workday.com/articles/1084547",
  "resources": [
    {
      "name": "Operations",
      "description": "Workday exposes operation choices directly.",
      "operations": [
        {
          "name": "Get many",
          "value": "get_many",
          "description": "Get many using the Workday node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "Workday REST API base URL",
              "helpText": "What this field is: The web address for Workday REST API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Tenant",
              "internalKey": "tenant",
              "type": "string",
              "required": false,
              "description": "Workday tenant identifier",
              "helpText": "What this field is: The Workday tenant identifier that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenant}} when an earlier Workday step provides this value.",
              "placeholder": "Enter Tenant"
            },
            {
              "name": "Auth Type",
              "internalKey": "authType",
              "type": "select",
              "required": false,
              "description": "Auth method: oauth2 or basic",
              "helpText": "Options: Choose how this Workday step signs in.\nHow to choose it: Pick oauth2 to sign in with Workday and click Allow, or basic when your Workday admin gave you a username and password.\nExample: oauth2.\nTip: Use {{$json.authType}} only when an earlier step already provides a valid option value.",
              "placeholder": "oauth2",
              "example": "oauth2",
              "defaultValue": "oauth2",
              "options": [
                "OAuth 2.0",
                "Basic Auth"
              ]
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth 2.0 Bearer token",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "Basic auth username",
              "helpText": "What this field is: Basic auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "Basic auth password",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Workday resource",
              "helpText": "What this field is: The Workday entity type to query or manage.\nOptions: Workers, Jobs, Organizations, Supervisory Organizations, Positions.\nExample: workers to list employees, positions to view open roles.\nThis selection determines the API path used in the Workday request.",
              "placeholder": "workers",
              "example": "workers",
              "defaultValue": "workers",
              "options": [
                "Workers",
                "Jobs",
                "Organizations",
                "Supervisory Organizations",
                "Positions"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID",
              "helpText": "What this field is: The Record ID that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Workday step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Workday.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records",
              "helpText": "What this field is: The number used for Max records.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Records to skip",
              "helpText": "What this field is: The number used for Records to skip.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
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
            "scenario": "Process incoming Workday data with get many after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://api.example.com",
              "Tenant": "",
              "Auth Type": "oauth2",
              "Access Token": "",
              "Username": ""
            },
            "expectedOutput": "Workday returns structured get many data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://community.workday.com/sites/default/files/file-hosting/restapi/index.html"
        },
        {
          "name": "Get by id",
          "value": "get_by_id",
          "description": "Get by id using the Workday node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "Workday REST API base URL",
              "helpText": "What this field is: The web address for Workday REST API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Tenant",
              "internalKey": "tenant",
              "type": "string",
              "required": false,
              "description": "Workday tenant identifier",
              "helpText": "What this field is: The Workday tenant identifier that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenant}} when an earlier Workday step provides this value.",
              "placeholder": "Enter Tenant"
            },
            {
              "name": "Auth Type",
              "internalKey": "authType",
              "type": "select",
              "required": false,
              "description": "Auth method: oauth2 or basic",
              "helpText": "Options: Choose how this Workday step signs in.\nHow to choose it: Pick oauth2 to sign in with Workday and click Allow, or basic when your Workday admin gave you a username and password.\nExample: oauth2.\nTip: Use {{$json.authType}} only when an earlier step already provides a valid option value.",
              "placeholder": "oauth2",
              "example": "oauth2",
              "defaultValue": "oauth2",
              "options": [
                "OAuth 2.0",
                "Basic Auth"
              ]
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth 2.0 Bearer token",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "Basic auth username",
              "helpText": "What this field is: Basic auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "Basic auth password",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Workday resource",
              "helpText": "What this field is: The Workday entity type to query or manage.\nOptions: Workers, Jobs, Organizations, Supervisory Organizations, Positions.\nExample: workers to list employees, positions to view open roles.\nThis selection determines the API path used in the Workday request.",
              "placeholder": "workers",
              "example": "workers",
              "defaultValue": "workers",
              "options": [
                "Workers",
                "Jobs",
                "Organizations",
                "Supervisory Organizations",
                "Positions"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID",
              "helpText": "What this field is: The Record ID that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Workday step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Workday.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records",
              "helpText": "What this field is: The number used for Max records.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Records to skip",
              "helpText": "What this field is: The number used for Records to skip.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
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
            "scenario": "Process incoming Workday data with get by id after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://api.example.com",
              "Tenant": "",
              "Auth Type": "oauth2",
              "Access Token": "",
              "Username": ""
            },
            "expectedOutput": "Workday returns structured get by id data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://community.workday.com/sites/default/files/file-hosting/restapi/index.html"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Workday node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "Workday REST API base URL",
              "helpText": "What this field is: The web address for Workday REST API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Tenant",
              "internalKey": "tenant",
              "type": "string",
              "required": false,
              "description": "Workday tenant identifier",
              "helpText": "What this field is: The Workday tenant identifier that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenant}} when an earlier Workday step provides this value.",
              "placeholder": "Enter Tenant"
            },
            {
              "name": "Auth Type",
              "internalKey": "authType",
              "type": "select",
              "required": false,
              "description": "Auth method: oauth2 or basic",
              "helpText": "Options: Choose how this Workday step signs in.\nHow to choose it: Pick oauth2 to sign in with Workday and click Allow, or basic when your Workday admin gave you a username and password.\nExample: oauth2.\nTip: Use {{$json.authType}} only when an earlier step already provides a valid option value.",
              "placeholder": "oauth2",
              "example": "oauth2",
              "defaultValue": "oauth2",
              "options": [
                "OAuth 2.0",
                "Basic Auth"
              ]
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth 2.0 Bearer token",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "Basic auth username",
              "helpText": "What this field is: Basic auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "Basic auth password",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Workday resource",
              "helpText": "What this field is: The Workday entity type to query or manage.\nOptions: Workers, Jobs, Organizations, Supervisory Organizations, Positions.\nExample: workers to list employees, positions to view open roles.\nThis selection determines the API path used in the Workday request.",
              "placeholder": "workers",
              "example": "workers",
              "defaultValue": "workers",
              "options": [
                "Workers",
                "Jobs",
                "Organizations",
                "Supervisory Organizations",
                "Positions"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID",
              "helpText": "What this field is: The Record ID that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Workday step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Workday.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records",
              "helpText": "What this field is: The number used for Max records.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Records to skip",
              "helpText": "What this field is: The number used for Records to skip.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
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
            "scenario": "Process incoming Workday data with create after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://api.example.com",
              "Tenant": "",
              "Auth Type": "oauth2",
              "Access Token": "",
              "Username": ""
            },
            "expectedOutput": "Workday returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://community.workday.com/sites/default/files/file-hosting/restapi/index.html"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Workday node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "Workday REST API base URL",
              "helpText": "What this field is: The web address for Workday REST API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Tenant",
              "internalKey": "tenant",
              "type": "string",
              "required": false,
              "description": "Workday tenant identifier",
              "helpText": "What this field is: The Workday tenant identifier that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tenant}} when an earlier Workday step provides this value.",
              "placeholder": "Enter Tenant"
            },
            {
              "name": "Auth Type",
              "internalKey": "authType",
              "type": "select",
              "required": false,
              "description": "Auth method: oauth2 or basic",
              "helpText": "Options: Choose how this Workday step signs in.\nHow to choose it: Pick oauth2 to sign in with Workday and click Allow, or basic when your Workday admin gave you a username and password.\nExample: oauth2.\nTip: Use {{$json.authType}} only when an earlier step already provides a valid option value.",
              "placeholder": "oauth2",
              "example": "oauth2",
              "defaultValue": "oauth2",
              "options": [
                "OAuth 2.0",
                "Basic Auth"
              ]
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth 2.0 Bearer token",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "Basic auth username",
              "helpText": "What this field is: Basic auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "Basic auth password",
              "helpText": "What this field is: Workday token, a secret password that lets CtrlChecks talk to Workday safely.\nWhere to find it: Workday account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Workday.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Workday resource",
              "helpText": "What this field is: The Workday entity type to query or manage.\nOptions: Workers, Jobs, Organizations, Supervisory Organizations, Positions.\nExample: workers to list employees, positions to view open roles.\nThis selection determines the API path used in the Workday request.",
              "placeholder": "workers",
              "example": "workers",
              "defaultValue": "workers",
              "options": [
                "Workers",
                "Jobs",
                "Organizations",
                "Supervisory Organizations",
                "Positions"
              ]
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "string",
              "required": false,
              "description": "Record ID",
              "helpText": "What this field is: The Record ID that tells Workday which item to use.\nWhere to find it: Open the item in Workday and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.recordId}} when an earlier Workday step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create/update",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Workday.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records",
              "helpText": "What this field is: The number used for Max records.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Records to skip",
              "helpText": "What this field is: The number used for Records to skip.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
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
            "scenario": "Process incoming Workday data with update after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://api.example.com",
              "Tenant": "",
              "Auth Type": "oauth2",
              "Access Token": "",
              "Username": ""
            },
            "expectedOutput": "Workday returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://community.workday.com/sites/default/files/file-hosting/restapi/index.html"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Workday node."
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
