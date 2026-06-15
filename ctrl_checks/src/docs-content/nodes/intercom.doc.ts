import type { NodeDoc } from '../types';

export const intercomDoc: NodeDoc = {
  "slug": "intercom",
  "displayName": "Intercom",
  "category": "Data",
  "logoUrl": "/icons/nodes/intercom.svg",
  "description": "Intercom messaging operations",
  "credentialType": "Intercom API Key",
  "credentialSetupSteps": [
    "What this is: The Intercom connection lets CtrlChecks access your Intercom account safely without putting secrets in workflow fields.",
    "Where to start: Intercom account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Intercom, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Intercom.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Intercom step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.intercom.com/building-apps/docs/authorization",
  "resources": [
    {
      "name": "Operations",
      "description": "Intercom exposes operation choices directly.",
      "operations": [
        {
          "name": "Send",
          "value": "send",
          "description": "Send using the Intercom node.",
          "fields": [
            {
              "name": "Conversation Id",
              "internalKey": "conversationId",
              "type": "string",
              "required": false,
              "description": "Conversation ID",
              "helpText": "What this field is: The Conversation ID that tells Intercom which item to use.\nWhere to find it: Open the item in Intercom and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: conv-id.\nTip: Use {{$json.conversationId}} when an earlier Intercom step provides this value.",
              "placeholder": "conv-id",
              "example": "conv-id"
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
            "scenario": "Process incoming Intercom data with send after a related upstream event is received",
            "inputValues": {
              "Conversation Id": "conv-id"
            },
            "expectedOutput": "Intercom returns structured send data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.intercom.com/docs/references/rest-api/api.intercom.io/"
        },
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Intercom node.",
          "fields": [
            {
              "name": "Conversation Id",
              "internalKey": "conversationId",
              "type": "string",
              "required": false,
              "description": "Conversation ID",
              "helpText": "What this field is: The Conversation ID that tells Intercom which item to use.\nWhere to find it: Open the item in Intercom and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: conv-id.\nTip: Use {{$json.conversationId}} when an earlier Intercom step provides this value.",
              "placeholder": "conv-id",
              "example": "conv-id"
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
            "scenario": "Process incoming Intercom data with get after a related upstream event is received",
            "inputValues": {
              "Conversation Id": "conv-id"
            },
            "expectedOutput": "Intercom returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.intercom.com/docs/references/rest-api/api.intercom.io/"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the Intercom node.",
          "fields": [
            {
              "name": "Conversation Id",
              "internalKey": "conversationId",
              "type": "string",
              "required": false,
              "description": "Conversation ID",
              "helpText": "What this field is: The Conversation ID that tells Intercom which item to use.\nWhere to find it: Open the item in Intercom and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: conv-id.\nTip: Use {{$json.conversationId}} when an earlier Intercom step provides this value.",
              "placeholder": "conv-id",
              "example": "conv-id"
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
            "scenario": "Process incoming Intercom data with list after a related upstream event is received",
            "inputValues": {
              "Conversation Id": "conv-id"
            },
            "expectedOutput": "Intercom returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.intercom.com/docs/references/rest-api/api.intercom.io/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Intercom node."
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
