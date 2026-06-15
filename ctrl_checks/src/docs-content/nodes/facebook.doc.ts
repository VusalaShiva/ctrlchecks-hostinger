import type { NodeDoc } from '../types';

export const facebookDoc: NodeDoc = {
  "slug": "facebook",
  "displayName": "Facebook",
  "category": "Communication",
  "logoUrl": "/icons/nodes/facebook.svg",
  "description": "Post content to Facebook pages",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The Facebook connection lets CtrlChecks access your Facebook account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> Tools or API Setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Facebook, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Facebook step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Configuration",
      "description": "Facebook is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Facebook node.",
          "fields": [
            {
              "name": "Message",
              "internalKey": "message",
              "type": "textarea",
              "required": true,
              "description": "Post message",
              "helpText": "What this field is: Post message.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.message}}.\nTip: Use {{$json.message}} when this value comes from an earlier step.",
              "placeholder": "{{$json.message}}",
              "example": "{{$json.message}}"
            },
            {
              "name": "Page Id",
              "internalKey": "pageId",
              "type": "string",
              "required": false,
              "description": "Facebook page ID",
              "helpText": "What this field is: The Facebook page ID that tells Facebook which item to use.\nWhere to find it: Open the item in Facebook and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.pageId}} when an earlier Facebook step provides this value.",
              "placeholder": "page-id",
              "example": "page-id"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Facebook (if using OAuth authentication)",
              "helpText": "What this field is: Meta access token, a secret password that lets CtrlChecks talk to Facebook safely.\nWhere to find it: Meta for Developers -> your app -> Tools or API Setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Use the least permissions needed for this workflow.",
              "placeholder": "your-facebook-oauth-token",
              "example": "your-facebook-oauth-token"
            }
          ],
          "outputExample": {
            "text": "Post published to the selected Facebook page.",
            "length": 45
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Facebook data with execute after a related upstream event is received",
            "inputValues": {
              "Message": "{{$json.message}}",
              "Page Id": "page-id",
              "Access Token": "your-facebook-oauth-token"
            },
            "expectedOutput": "Facebook returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/graph-api/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Facebook node."
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
