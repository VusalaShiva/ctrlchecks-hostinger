import type { NodeDoc } from '../types';

export const activecampaignDoc: NodeDoc = {
  "slug": "activecampaign",
  "displayName": "ActiveCampaign",
  "category": "Data",
  "logoUrl": "/icons/nodes/activecampaign.svg",
  "description": "ActiveCampaign marketing automation",
  "credentialType": "ActiveCampaign API Key",
  "credentialSetupSteps": [
    "What this is: The ActiveCampaign connection lets CtrlChecks access your ActiveCampaign account safely without putting secrets in workflow fields.",
    "Where to start: ActiveCampaign account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> ActiveCampaign, then sign in or paste the secret value requested there.",
    "Example: the token format shown by ActiveCampaign.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple ActiveCampaign step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.activecampaign.com/reference/url",
  "resources": [
    {
      "name": "Operations",
      "description": "ActiveCampaign exposes operation choices directly.",
      "operations": [
        {
          "name": "Add",
          "value": "add",
          "description": "Add using the ActiveCampaign node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID",
              "helpText": "What this field is: The Contact ID that tells ActiveCampaign which item to use.\nWhere to find it: Open the item in ActiveCampaign and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier ActiveCampaign step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming ActiveCampaign data with add after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "ActiveCampaign returns structured add data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.activecampaign.com/reference/overview"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the ActiveCampaign node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID",
              "helpText": "What this field is: The Contact ID that tells ActiveCampaign which item to use.\nWhere to find it: Open the item in ActiveCampaign and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier ActiveCampaign step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming ActiveCampaign data with update after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "ActiveCampaign returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.activecampaign.com/reference/overview"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the ActiveCampaign node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID",
              "helpText": "What this field is: The Contact ID that tells ActiveCampaign which item to use.\nWhere to find it: Open the item in ActiveCampaign and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier ActiveCampaign step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming ActiveCampaign data with delete after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "ActiveCampaign returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.activecampaign.com/reference/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the ActiveCampaign node."
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
