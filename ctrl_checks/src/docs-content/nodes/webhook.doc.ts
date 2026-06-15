import type { NodeDoc } from '../types';

export const webhookDoc: NodeDoc = {
  "slug": "webhook",
  "displayName": "Webhook Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/webhook.svg",
  "description": "Executes workflow when HTTP request is received",
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
      "description": "Webhook Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow when an HTTP request hits the generated webhook URL.",
          "fields": [
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": true,
              "description": "URL path for webhook",
              "helpText": "What this field is: The web address path where external services send data to start this workflow.\nHow to fill it: Type a short path starting with /. Keep it descriptive.\nExample: /new-order or /form-submit or /stripe-payment\nAfter saving, CtrlChecks shows you the full URL (e.g. https://yourapp.com/webhook/new-order). Copy that and paste it into the external service's webhook settings.",
              "placeholder": "/webhook",
              "example": "/webhook"
            },
            {
              "name": "Http Method",
              "internalKey": "httpMethod",
              "type": "string",
              "required": false,
              "description": "HTTP method to accept",
              "helpText": "What this field is: HTTP method to accept.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.httpMethod}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "POST"
            },
            {
              "name": "Response Mode",
              "internalKey": "responseMode",
              "type": "string",
              "required": false,
              "description": "How to respond to webhook caller",
              "helpText": "What this field is: How to respond to webhook caller.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: responseNode.\nTip: Use {{$json.responseMode}} when this value comes from an earlier step.",
              "placeholder": "responseNode",
              "example": "responseNode",
              "defaultValue": "responseNode"
            },
            {
              "name": "Verify Signature",
              "internalKey": "verifySignature",
              "type": "boolean",
              "required": false,
              "description": "Whether to verify webhook signatures (if supported by the sender)",
              "helpText": "What this field is: An on/off switch for Whether to verify webhook signatures.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use verify signature; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "false"
            },
            {
              "name": "Secret Token",
              "internalKey": "secretToken",
              "type": "password",
              "required": false,
              "description": "Secret token used for signature verification (if verifySignature is enabled)",
              "helpText": "What this field is: Webhook Trigger token, a secret password that lets CtrlChecks talk to Webhook Trigger safely.\nWhere to find it: Webhook Trigger account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Webhook Trigger.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "{{ENV.WEBHOOK_SECRET}}",
              "example": "{{ENV.WEBHOOK_SECRET}}",
              "notes": "Stored and displayed as a masked credential value."
            }
          ],
          "outputExample": {
            "body": {
              "event": "user.created",
              "userId": "u_123",
              "email": "alice@example.com"
            },
            "headers": {
              "content-type": "application/json"
            },
            "method": "POST",
            "query": {}
          },
          "outputDescription": "body: The parsed request body sent by the caller. headers: HTTP headers from the request. method: HTTP method used (POST, GET, etc.). query: URL query parameters.",
          "usageExample": {
            "scenario": "Receive a Stripe payment webhook and store the order in a database",
            "inputValues": {
              "method": "POST",
              "path": "/webhooks/stripe-payment"
            },
            "expectedOutput": "The workflow receives `{{$json.body.type}}` (e.g. payment_intent.succeeded) and `{{$json.body.data.object.amount}}` from Stripe."
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
