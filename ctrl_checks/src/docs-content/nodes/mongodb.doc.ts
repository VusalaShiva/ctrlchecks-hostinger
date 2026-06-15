import type { NodeDoc } from '../types';

export const mongodbDoc: NodeDoc = {
  "slug": "mongodb",
  "displayName": "MongoDB",
  "category": "Data",
  "logoUrl": "/icons/nodes/mongodb.svg",
  "description": "MongoDB database operations",
  "credentialType": "MongoDB Credential",
  "credentialSetupSteps": [
    "What this is: The MongoDB connection lets CtrlChecks access your MongoDB account safely without putting secrets in workflow fields.",
    "Where to start: MongoDB account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> MongoDB, then sign in or paste the secret value requested there.",
    "Example: the token format shown by MongoDB.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple MongoDB step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/",
  "resources": [
    {
      "name": "Operations",
      "description": "MongoDB exposes operation choices directly.",
      "operations": [
        {
          "name": "Find",
          "value": "find",
          "description": "Find using the MongoDB node.",
          "fields": [
            {
              "name": "Collection",
              "internalKey": "collection",
              "type": "string",
              "required": true,
              "description": "Collection name",
              "helpText": "What this field is: Collection name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: users.\nTip: Use {{$json.collection}} when this value comes from an earlier step.",
              "placeholder": "users",
              "example": "users"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "MongoDB query",
              "helpText": "What this field is: Structured data for MongoDB query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MongoDB.\nExample: {\"name\":\"John\"}.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"John\"}",
              "example": "{\"name\":\"John\"}"
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
            "scenario": "Process incoming MongoDB data with find after a related upstream event is received",
            "inputValues": {
              "Collection": "users",
              "Query": "{\"name\":\"John\"}"
            },
            "expectedOutput": "MongoDB returns structured find data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.mongodb.com/docs/drivers/node/current/"
        },
        {
          "name": "Insert",
          "value": "insert",
          "description": "Insert using the MongoDB node.",
          "fields": [
            {
              "name": "Collection",
              "internalKey": "collection",
              "type": "string",
              "required": true,
              "description": "Collection name",
              "helpText": "What this field is: Collection name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: users.\nTip: Use {{$json.collection}} when this value comes from an earlier step.",
              "placeholder": "users",
              "example": "users"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "MongoDB query",
              "helpText": "What this field is: Structured data for MongoDB query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MongoDB.\nExample: {\"name\":\"John\"}.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"John\"}",
              "example": "{\"name\":\"John\"}"
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
            "scenario": "Process incoming MongoDB data with insert after a related upstream event is received",
            "inputValues": {
              "Collection": "users",
              "Query": "{\"name\":\"John\"}"
            },
            "expectedOutput": "MongoDB returns structured insert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.mongodb.com/docs/drivers/node/current/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the MongoDB node.",
          "fields": [
            {
              "name": "Collection",
              "internalKey": "collection",
              "type": "string",
              "required": true,
              "description": "Collection name",
              "helpText": "What this field is: Collection name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: users.\nTip: Use {{$json.collection}} when this value comes from an earlier step.",
              "placeholder": "users",
              "example": "users"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "MongoDB query",
              "helpText": "What this field is: Structured data for MongoDB query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MongoDB.\nExample: {\"name\":\"John\"}.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"John\"}",
              "example": "{\"name\":\"John\"}"
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
            "scenario": "Process incoming MongoDB data with update after a related upstream event is received",
            "inputValues": {
              "Collection": "users",
              "Query": "{\"name\":\"John\"}"
            },
            "expectedOutput": "MongoDB returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.mongodb.com/docs/drivers/node/current/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the MongoDB node.",
          "fields": [
            {
              "name": "Collection",
              "internalKey": "collection",
              "type": "string",
              "required": true,
              "description": "Collection name",
              "helpText": "What this field is: Collection name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: users.\nTip: Use {{$json.collection}} when this value comes from an earlier step.",
              "placeholder": "users",
              "example": "users"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "MongoDB query",
              "helpText": "What this field is: Structured data for MongoDB query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MongoDB.\nExample: {\"name\":\"John\"}.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"John\"}",
              "example": "{\"name\":\"John\"}"
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
            "scenario": "Process incoming MongoDB data with delete after a related upstream event is received",
            "inputValues": {
              "Collection": "users",
              "Query": "{\"name\":\"John\"}"
            },
            "expectedOutput": "MongoDB returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.mongodb.com/docs/drivers/node/current/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the MongoDB node."
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
