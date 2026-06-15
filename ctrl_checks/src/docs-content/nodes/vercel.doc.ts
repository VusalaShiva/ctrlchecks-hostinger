import type { NodeDoc } from '../types';

export const vercelDoc: NodeDoc = {
  "slug": "vercel",
  "displayName": "Vercel",
  "category": "Data",
  "logoUrl": "/icons/nodes/vercel.svg",
  "description": "Deploy projects and manage deployments on Vercel",
  "credentialType": "Vercel API Key",
  "credentialSetupSteps": [
    "What this is: The Vercel connection lets CtrlChecks access your Vercel account safely without putting secrets in workflow fields.",
    "Where to start: Vercel -> Account Settings -> Tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Vercel, then sign in or paste the secret value requested there.",
    "Example: the token Vercel shows when you create it.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Vercel step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://vercel.com/docs/rest-api",
  "resources": [
    {
      "name": "Operations",
      "description": "Vercel exposes operation choices directly.",
      "operations": [
        {
          "name": "Deploy",
          "value": "deploy",
          "description": "Deploy using the Vercel node.",
          "fields": [
            {
              "name": "Project Name",
              "internalKey": "projectName",
              "type": "string",
              "required": true,
              "description": "Vercel project name (required for deploy operation). Can use template syntax like {{$json.projectName}}",
              "helpText": "What this field is: Vercel project name . Can use template syntax like {{$json.projectName}}.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-app.\nTip: This field is used for deploy. Leave it blank when this operation does not need it.",
              "placeholder": "my-app",
              "example": "my-app"
            },
            {
              "name": "Token",
              "internalKey": "token",
              "type": "password",
              "required": true,
              "description": "Vercel API token (Bearer token). Use credential selection or template syntax like {{$credentials.vercel.token}}",
              "helpText": "What this field is: Vercel access token, a secret password that lets CtrlChecks talk to Vercel safely.\nWhere to find it: Vercel -> Account Settings -> Tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token Vercel shows when you create it.\nImportant: Treat this like a bank password. Use a token from an account with access to the project.",
              "placeholder": "vercel_***",
              "example": "vercel_***",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming Vercel data with deploy after a related upstream event is received",
            "inputValues": {
              "Project Name": "my-app",
              "Token": "vercel_***"
            },
            "expectedOutput": "Vercel returns structured deploy data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://vercel.com/docs/rest-api"
        },
        {
          "name": "List deployments",
          "value": "list_deployments",
          "description": "List deployments using the Vercel node.",
          "fields": [
            {
              "name": "Token",
              "internalKey": "token",
              "type": "password",
              "required": true,
              "description": "Vercel API token (Bearer token). Use credential selection or template syntax like {{$credentials.vercel.token}}",
              "helpText": "What this field is: Vercel access token, a secret password that lets CtrlChecks talk to Vercel safely.\nWhere to find it: Vercel -> Account Settings -> Tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token Vercel shows when you create it.\nImportant: Treat this like a bank password. Use a token from an account with access to the project.",
              "placeholder": "vercel_***",
              "example": "vercel_***",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming Vercel data with list deployments after a related upstream event is received",
            "inputValues": {
              "Token": "vercel_***"
            },
            "expectedOutput": "Vercel returns structured list deployments data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://vercel.com/docs/rest-api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Vercel node."
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
