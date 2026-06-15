import type { NodeDoc } from '../types';

export const instagramTriggerDoc: NodeDoc = {
  "slug": "instagram_trigger",
  "displayName": "Instagram Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/instagram_trigger.svg",
  "description": "Trigger workflows on Instagram events: new DM, comment, mention, postback",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The Instagram Trigger connection lets CtrlChecks access your Instagram Trigger account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> Instagram API setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Instagram Trigger, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Instagram Trigger step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Configuration",
      "description": "Instagram Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Instagram Trigger node.",
          "fields": [
            {
              "name": "Event",
              "internalKey": "event",
              "type": "string",
              "required": true,
              "description": "Instagram event type",
              "helpText": "What this field is: Instagram event type.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.received.\nTip: Use {{$json.event}} when this value comes from an earlier step.",
              "placeholder": "message.received",
              "example": "message.received",
              "defaultValue": "message.received"
            },
            {
              "name": "Instagram Business Account Id",
              "internalKey": "instagramBusinessAccountId",
              "type": "string",
              "required": false,
              "description": "Instagram Business Account ID to listen on",
              "helpText": "What this field is: The Instagram Business Account ID to listen on that tells Instagram Trigger which item to use.\nWhere to find it: Open the item in Instagram Trigger and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.instagramBusinessAccountId}} when an earlier Instagram Trigger step provides this value.",
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
            "scenario": "Process incoming Instagram Trigger data with execute after a related upstream event is received",
            "inputValues": {
              "Event": "message.received",
              "Instagram Business Account Id": "abc123"
            },
            "expectedOutput": "Instagram Trigger returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Instagram Trigger node."
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
