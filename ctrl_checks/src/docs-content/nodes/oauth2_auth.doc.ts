import type { NodeDoc } from '../types';

export const oauth2AuthDoc: NodeDoc = {
  "slug": "oauth2_auth",
  "displayName": "OAuth2 Auth",
  "category": "Utility",
  "logoUrl": "/icons/nodes/oauth2_auth.svg",
  "description": "Handles OAuth2 authentication and provides access tokens",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Configuration",
      "description": "OAuth2 Auth is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the OAuth2 Auth node.",
          "fields": [
            {
              "name": "Provider",
              "internalKey": "provider",
              "type": "select",
              "required": true,
              "description": "OAuth2 provider (google, github, etc.)",
              "helpText": "Options: Choose the provider value this OAuth2 Auth step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Google.\nTip: Use {{$json.provider}} only when an earlier step already provides a valid option value.",
              "placeholder": "google",
              "example": "google",
              "options": [
                "Google",
                "GitHub",
                "Custom"
              ]
            },
            {
              "name": "Auth Url",
              "internalKey": "authUrl",
              "type": "url",
              "required": false,
              "description": "Authorization URL (for custom provider)",
              "helpText": "What this field is: The web address for Authorization URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.authUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Token Url",
              "internalKey": "tokenUrl",
              "type": "url",
              "required": false,
              "description": "Token URL (for custom provider)",
              "helpText": "What this field is: The web address for Token URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.tokenUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Client Id",
              "internalKey": "clientId",
              "type": "string",
              "required": false,
              "description": "Client ID",
              "helpText": "What this field is: The Client ID that tells OAuth2 Auth which item to use.\nWhere to find it: Open the item in OAuth2 Auth and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.clientId}} when an earlier OAuth2 Auth step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Client Secret",
              "internalKey": "clientSecret",
              "type": "password",
              "required": false,
              "description": "Client Secret",
              "helpText": "What this field is: OAuth2 Auth token, a secret password that lets CtrlChecks talk to OAuth2 Auth safely.\nWhere to find it: OAuth2 Auth account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by OAuth2 Auth.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Client Secret",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Scope",
              "internalKey": "scope",
              "type": "string",
              "required": false,
              "description": "OAuth scopes",
              "helpText": "What this field is: account sign-in scopes.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Scope value.\nTip: Use {{$json.scope}} when this value comes from an earlier step.",
              "placeholder": "Enter Scope"
            },
            {
              "name": "Action",
              "internalKey": "action",
              "type": "select",
              "required": false,
              "description": "Action: getToken, refresh, or startFlow",
              "helpText": "Options: Choose the action value this OAuth2 Auth step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Get Token.\nTip: Use {{$json.action}} only when an earlier step already provides a valid option value.",
              "placeholder": "getToken",
              "example": "getToken",
              "defaultValue": "getToken",
              "options": [
                "Get Token",
                "Refresh Token",
                "Start OAuth Flow"
              ]
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
            "scenario": "Process incoming OAuth2 Auth data with execute after a related upstream event is received",
            "inputValues": {
              "Provider": "google",
              "Auth Url": "https://api.example.com",
              "Token Url": "https://api.example.com",
              "Client Id": "abc123",
              "Client Secret": ""
            },
            "expectedOutput": "OAuth2 Auth returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
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
