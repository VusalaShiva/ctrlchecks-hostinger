import type { NodeDoc } from '../types';

export const firebaseDoc: NodeDoc = {
  "slug": "firebase",
  "displayName": "Firebase",
  "category": "Data",
  "logoUrl": "/icons/nodes/firebase.svg",
  "description": "Interact with Firebase Firestore and Realtime Database",
  "credentialType": "Firebase Credential",
  "credentialSetupSteps": [
    "What this is: The Firebase connection lets CtrlChecks access your Firebase account safely without putting secrets in workflow fields.",
    "Where to start: Firebase account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Firebase, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Firebase.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Firebase step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://firebase.google.com/docs/admin/setup",
  "resources": [
    {
      "name": "Configuration",
      "description": "Firebase is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Firebase node.",
          "fields": [
            {
              "name": "Collection",
              "internalKey": "collection",
              "type": "string",
              "required": false,
              "description": "Firestore collection name",
              "helpText": "What this field is: Firestore collection name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Collection value.\nTip: Use {{$json.collection}} when this value comes from an earlier step.",
              "placeholder": "Enter Collection"
            },
            {
              "name": "Document Id",
              "internalKey": "documentId",
              "type": "string",
              "required": false,
              "description": "Document ID for get/update/delete",
              "helpText": "What this field is: The unique ID of a specific document in the collection.\nWhere to find it: Firebase Console → Firestore Database → click your collection → click a document — the ID is shown at the top.\nExample: abc123xyz or user_12345 or order_2025_001",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Data for add/update/realtime_set",
              "helpText": "What this field is: Structured data for Data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Firebase.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "json",
              "required": false,
              "description": "Query filter conditions",
              "helpText": "What this field is: Structured data for Query filter conditions.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Firebase.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max documents to return for query",
              "helpText": "What this field is: The number used for Max documents to return for query.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Database Url",
              "internalKey": "databaseUrl",
              "type": "url",
              "required": false,
              "description": "Realtime Database URL",
              "helpText": "What this field is: The web address for Realtime Database URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.databaseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
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
            "scenario": "Process incoming Firebase data with execute after a related upstream event is received",
            "inputValues": {
              "Collection": "",
              "Document Id": "abc123",
              "Data": "{\"key\":\"value\"}",
              "Filter": "{\"key\":\"value\"}",
              "Limit": "10"
            },
            "expectedOutput": "Firebase returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://firebase.google.com/docs/reference"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Firebase node."
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
