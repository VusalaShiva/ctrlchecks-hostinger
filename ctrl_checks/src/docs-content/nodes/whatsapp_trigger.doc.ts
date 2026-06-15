import type { NodeDoc } from '../types';

export const whatsappTriggerDoc: NodeDoc = {
  "slug": "whatsapp_trigger",
  "displayName": "WhatsApp Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/whatsapp_trigger.svg",
  "description": "Trigger workflows on WhatsApp events: message received, delivered, read, conversation created",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The WhatsApp Trigger connection lets CtrlChecks access your WhatsApp Trigger account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> WhatsApp -> API Setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> WhatsApp Trigger, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple WhatsApp Trigger step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Configuration",
      "description": "WhatsApp Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the WhatsApp Trigger node.",
          "fields": [
            {
              "name": "Event",
              "internalKey": "event",
              "type": "string",
              "required": true,
              "description": "WhatsApp event type",
              "helpText": "What this field is: The type of WhatsApp event that will fire this trigger.\nOptions: message.received (incoming text), message.delivered, message.read, conversation.created.\nExample: message.received — the workflow starts when someone sends your business a WhatsApp message.",
              "placeholder": "message.received",
              "example": "message.received",
              "defaultValue": "message.received"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID to listen on",
              "helpText": "What this field is: The WhatsApp Phone Number ID to listen on that tells WhatsApp Trigger which item to use.\nWhere to find it: Open the item in WhatsApp Trigger and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.phoneNumberId}} when an earlier WhatsApp Trigger step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming WhatsApp Trigger data with execute after a related upstream event is received",
            "inputValues": {
              "Event": "message.received",
              "Phone Number Id": "abc123"
            },
            "expectedOutput": "WhatsApp Trigger returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the WhatsApp Trigger node."
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
