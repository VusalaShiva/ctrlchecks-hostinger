import type { NodeDoc } from '../types';

export const mailchimpDoc: NodeDoc = {
  "slug": "mailchimp",
  "displayName": "Mailchimp",
  "category": "Data",
  "logoUrl": "/icons/nodes/mailchimp.svg",
  "description": "Mailchimp email marketing operations",
  "credentialType": "Mailchimp API Key",
  "credentialSetupSteps": [
    "What this is: The Mailchimp connection lets CtrlChecks access your Mailchimp account safely without putting secrets in workflow fields.",
    "Where to start: Mailchimp account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Mailchimp, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Mailchimp.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Mailchimp step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://mailchimp.com/developer/marketing/guides/quick-start/",
  "resources": [
    {
      "name": "Operations",
      "description": "Mailchimp exposes operation choices directly.",
      "operations": [
        {
          "name": "Subscribe",
          "value": "subscribe",
          "description": "Subscribe using the Mailchimp node.",
          "fields": [
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "Mailchimp list ID",
              "helpText": "What this field is: The Mailchimp list ID that tells Mailchimp which item to use.\nWhere to find it: Open the item in Mailchimp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: list-id.\nTip: Use {{$json.listId}} when an earlier Mailchimp step provides this value.",
              "placeholder": "list-id",
              "example": "list-id"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Email address",
              "helpText": "What this field is: The email address that Mailchimp should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "{{$json.email}}",
              "example": "{{$json.email}}"
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
            "scenario": "Process incoming Mailchimp data with subscribe after a related upstream event is received",
            "inputValues": {
              "List Id": "list-id",
              "Email": "{{$json.email}}"
            },
            "expectedOutput": "Mailchimp returns structured subscribe data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://mailchimp.com/developer/marketing/api/"
        },
        {
          "name": "Unsubscribe",
          "value": "unsubscribe",
          "description": "Unsubscribe using the Mailchimp node.",
          "fields": [
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "Mailchimp list ID",
              "helpText": "What this field is: The Mailchimp list ID that tells Mailchimp which item to use.\nWhere to find it: Open the item in Mailchimp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: list-id.\nTip: Use {{$json.listId}} when an earlier Mailchimp step provides this value.",
              "placeholder": "list-id",
              "example": "list-id"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Email address",
              "helpText": "What this field is: The email address that Mailchimp should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "{{$json.email}}",
              "example": "{{$json.email}}"
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
            "scenario": "Process incoming Mailchimp data with unsubscribe after a related upstream event is received",
            "inputValues": {
              "List Id": "list-id",
              "Email": "{{$json.email}}"
            },
            "expectedOutput": "Mailchimp returns structured unsubscribe data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://mailchimp.com/developer/marketing/api/"
        },
        {
          "name": "Send",
          "value": "send",
          "description": "Send using the Mailchimp node.",
          "fields": [
            {
              "name": "List Id",
              "internalKey": "listId",
              "type": "string",
              "required": false,
              "description": "Mailchimp list ID",
              "helpText": "What this field is: The Mailchimp list ID that tells Mailchimp which item to use.\nWhere to find it: Open the item in Mailchimp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: list-id.\nTip: Use {{$json.listId}} when an earlier Mailchimp step provides this value.",
              "placeholder": "list-id",
              "example": "list-id"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Email address",
              "helpText": "What this field is: The email address that Mailchimp should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "{{$json.email}}",
              "example": "{{$json.email}}"
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
            "scenario": "Process incoming Mailchimp data with send after a related upstream event is received",
            "inputValues": {
              "List Id": "list-id",
              "Email": "{{$json.email}}"
            },
            "expectedOutput": "Mailchimp returns structured send data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://mailchimp.com/developer/marketing/api/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Mailchimp node."
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
