import type { NodeDoc } from '../types';

export const netlifyDoc: NodeDoc = {
  "slug": "netlify",
  "displayName": "Netlify",
  "category": "Data",
  "logoUrl": "/icons/nodes/netlify.svg",
  "description": "Deploy sites, manage builds, and query site/deploy data through the Netlify REST API.",
  "credentialType": "Netlify API Key",
  "credentialSetupSteps": [
    "What this is: The Netlify connection lets CtrlChecks access your Netlify account safely without putting secrets in workflow fields.",
    "Where to start: Netlify -> User settings -> Applications -> Personal access tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Netlify, then sign in or paste the secret value requested there.",
    "Example: nfp_... or the token Netlify shows.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Netlify step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.netlify.com/api/get-started/",
  "resources": [
    {
      "name": "Operations",
      "description": "Netlify exposes operation choices directly.",
      "operations": [
        {
          "name": "List sites",
          "value": "list_sites",
          "description": "List sites using the Netlify node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Netlify Personal Access Token",
              "helpText": "What this field is: Netlify personal access token, a secret password that lets CtrlChecks talk to Netlify safely.\nWhere to find it: Netlify -> User settings -> Applications -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: nfp_... or the token Netlify shows.\nImportant: Treat this like a bank password. Use a token from an account that can access the site.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Netlify resource",
              "helpText": "What this field is: The Netlify entity type to work with.\nOptions: Sites, Deploys, Forms.\nExample: Sites to list or query sites, Deploys to trigger or monitor deployments.\nTip: The resource determines which Netlify API endpoint is called.",
              "placeholder": "sites",
              "example": "sites",
              "defaultValue": "sites",
              "options": [
                "Sites",
                "Deploys",
                "Forms"
              ]
            },
            {
              "name": "Site Id",
              "internalKey": "siteId",
              "type": "string",
              "required": false,
              "description": "Site ID",
              "helpText": "What this field is: The Site ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.siteId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Deploy Id",
              "internalKey": "deployId",
              "type": "string",
              "required": false,
              "description": "Deploy ID",
              "helpText": "What this field is: The Deploy ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.deployId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create_deploy",
              "helpText": "What this field is: Structured data for Request body for create_deploy.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Netlify.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records to return",
              "helpText": "What this field is: The number used for Max records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "list_sites",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Netlify data with list sites after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Resource": "sites",
              "Site Id": "abc123",
              "Deploy Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Netlify returns structured list sites data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.netlify.com/api/get-started/"
        },
        {
          "name": "Get site",
          "value": "get_site",
          "description": "Get site using the Netlify node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Netlify Personal Access Token",
              "helpText": "What this field is: Netlify personal access token, a secret password that lets CtrlChecks talk to Netlify safely.\nWhere to find it: Netlify -> User settings -> Applications -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: nfp_... or the token Netlify shows.\nImportant: Treat this like a bank password. Use a token from an account that can access the site.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Netlify resource",
              "helpText": "What this field is: The Netlify entity type to work with.\nOptions: Sites, Deploys, Forms.\nExample: Sites to list or query sites, Deploys to trigger or monitor deployments.\nTip: The resource determines which Netlify API endpoint is called.",
              "placeholder": "sites",
              "example": "sites",
              "defaultValue": "sites",
              "options": [
                "Sites",
                "Deploys",
                "Forms"
              ]
            },
            {
              "name": "Site Id",
              "internalKey": "siteId",
              "type": "string",
              "required": false,
              "description": "Site ID",
              "helpText": "What this field is: The Site ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.siteId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Deploy Id",
              "internalKey": "deployId",
              "type": "string",
              "required": false,
              "description": "Deploy ID",
              "helpText": "What this field is: The Deploy ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.deployId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create_deploy",
              "helpText": "What this field is: Structured data for Request body for create_deploy.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Netlify.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records to return",
              "helpText": "What this field is: The number used for Max records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_site",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Netlify data with get site after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Resource": "sites",
              "Site Id": "abc123",
              "Deploy Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Netlify returns structured get site data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.netlify.com/api/get-started/"
        },
        {
          "name": "Create deploy",
          "value": "create_deploy",
          "description": "Create deploy using the Netlify node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Netlify Personal Access Token",
              "helpText": "What this field is: Netlify personal access token, a secret password that lets CtrlChecks talk to Netlify safely.\nWhere to find it: Netlify -> User settings -> Applications -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: nfp_... or the token Netlify shows.\nImportant: Treat this like a bank password. Use a token from an account that can access the site.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Netlify resource",
              "helpText": "What this field is: The Netlify entity type to work with.\nOptions: Sites, Deploys, Forms.\nExample: Sites to list or query sites, Deploys to trigger or monitor deployments.\nTip: The resource determines which Netlify API endpoint is called.",
              "placeholder": "sites",
              "example": "sites",
              "defaultValue": "sites",
              "options": [
                "Sites",
                "Deploys",
                "Forms"
              ]
            },
            {
              "name": "Site Id",
              "internalKey": "siteId",
              "type": "string",
              "required": false,
              "description": "Site ID",
              "helpText": "What this field is: The Site ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.siteId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Deploy Id",
              "internalKey": "deployId",
              "type": "string",
              "required": false,
              "description": "Deploy ID",
              "helpText": "What this field is: The Deploy ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.deployId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create_deploy",
              "helpText": "What this field is: Structured data for Request body for create_deploy.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Netlify.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records to return",
              "helpText": "What this field is: The number used for Max records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "create_deploy",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Netlify data with create deploy after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Resource": "sites",
              "Site Id": "abc123",
              "Deploy Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Netlify returns structured create deploy data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.netlify.com/api/get-started/"
        },
        {
          "name": "List deploys",
          "value": "list_deploys",
          "description": "List deploys using the Netlify node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Netlify Personal Access Token",
              "helpText": "What this field is: Netlify personal access token, a secret password that lets CtrlChecks talk to Netlify safely.\nWhere to find it: Netlify -> User settings -> Applications -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: nfp_... or the token Netlify shows.\nImportant: Treat this like a bank password. Use a token from an account that can access the site.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Netlify resource",
              "helpText": "What this field is: The Netlify entity type to work with.\nOptions: Sites, Deploys, Forms.\nExample: Sites to list or query sites, Deploys to trigger or monitor deployments.\nTip: The resource determines which Netlify API endpoint is called.",
              "placeholder": "sites",
              "example": "sites",
              "defaultValue": "sites",
              "options": [
                "Sites",
                "Deploys",
                "Forms"
              ]
            },
            {
              "name": "Site Id",
              "internalKey": "siteId",
              "type": "string",
              "required": false,
              "description": "Site ID",
              "helpText": "What this field is: The Site ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.siteId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Deploy Id",
              "internalKey": "deployId",
              "type": "string",
              "required": false,
              "description": "Deploy ID",
              "helpText": "What this field is: The Deploy ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.deployId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create_deploy",
              "helpText": "What this field is: Structured data for Request body for create_deploy.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Netlify.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records to return",
              "helpText": "What this field is: The number used for Max records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "list_deploys",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Netlify data with list deploys after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Resource": "sites",
              "Site Id": "abc123",
              "Deploy Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Netlify returns structured list deploys data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.netlify.com/api/get-started/"
        },
        {
          "name": "Get deploy",
          "value": "get_deploy",
          "description": "Get deploy using the Netlify node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Netlify Personal Access Token",
              "helpText": "What this field is: Netlify personal access token, a secret password that lets CtrlChecks talk to Netlify safely.\nWhere to find it: Netlify -> User settings -> Applications -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: nfp_... or the token Netlify shows.\nImportant: Treat this like a bank password. Use a token from an account that can access the site.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "select",
              "required": true,
              "description": "Netlify resource",
              "helpText": "What this field is: The Netlify entity type to work with.\nOptions: Sites, Deploys, Forms.\nExample: Sites to list or query sites, Deploys to trigger or monitor deployments.\nTip: The resource determines which Netlify API endpoint is called.",
              "placeholder": "sites",
              "example": "sites",
              "defaultValue": "sites",
              "options": [
                "Sites",
                "Deploys",
                "Forms"
              ]
            },
            {
              "name": "Site Id",
              "internalKey": "siteId",
              "type": "string",
              "required": false,
              "description": "Site ID",
              "helpText": "What this field is: The Site ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.siteId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Deploy Id",
              "internalKey": "deployId",
              "type": "string",
              "required": false,
              "description": "Deploy ID",
              "helpText": "What this field is: The Deploy ID that tells Netlify which item to use.\nWhere to find it: Open the item in Netlify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.deployId}} when an earlier Netlify step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for create_deploy",
              "helpText": "What this field is: Structured data for Request body for create_deploy.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Netlify.\nExample: {}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max records to return",
              "helpText": "What this field is: The number used for Max records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_deploy",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Netlify data with get deploy after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Resource": "sites",
              "Site Id": "abc123",
              "Deploy Id": "abc123",
              "Payload": "{}"
            },
            "expectedOutput": "Netlify returns structured get deploy data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.netlify.com/api/get-started/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Netlify node."
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
