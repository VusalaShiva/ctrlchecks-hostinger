import type { NodeDoc } from '../types';

export const pineconeDoc: NodeDoc = {
  "slug": "pinecone",
  "displayName": "Pinecone",
  "category": "Data",
  "logoUrl": "/icons/nodes/pinecone.svg",
  "description": "Upsert, query, and delete vectors in a Pinecone vector database index.",
  "credentialType": "Pinecone API Key",
  "credentialSetupSteps": [
    "What this is: The Pinecone connection lets CtrlChecks access your Pinecone account safely without putting secrets in workflow fields.",
    "Where to start: Pinecone console -> API keys.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Pinecone, then sign in or paste the secret value requested there.",
    "Example: the key shown by Pinecone.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Pinecone step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.pinecone.io/guides/getting-started/quickstart",
  "resources": [
    {
      "name": "Operations",
      "description": "Pinecone exposes operation choices directly.",
      "operations": [
        {
          "name": "Upsert",
          "value": "upsert",
          "description": "Upsert using the Pinecone node.",
          "fields": [
            {
              "name": "Index",
              "internalKey": "index",
              "type": "string",
              "required": true,
              "description": "Pinecone index name or host URL",
              "helpText": "What this field is: Pinecone index name or host URL.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Index value.\nTip: Use {{$json.index}} when this value comes from an earlier step.",
              "placeholder": "Enter Index"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Pinecone API key",
              "helpText": "What this field is: Pinecone API key, a secret password that lets CtrlChecks talk to Pinecone safely.\nWhere to find it: Pinecone console -> API keys.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the key shown by Pinecone.\nImportant: Treat this like a bank password. Use an API key that can access the target index.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Vector",
              "internalKey": "vector",
              "type": "json",
              "required": false,
              "description": "Embedding array of floats",
              "helpText": "What this field is: Structured data for Embedding array of floats.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: [].\nTip: Use {{$json.vector}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Top K",
              "internalKey": "topK",
              "type": "number",
              "required": false,
              "description": "Nearest-neighbor results count",
              "helpText": "What this field is: The number used for Nearest-neighbor results count.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.topK}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5",
              "defaultValue": "5"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Vector ID",
              "helpText": "What this field is: The Vector ID that tells Pinecone which item to use.\nWhere to find it: Open the item in Pinecone and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.id}} when an earlier Pinecone step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Metadata",
              "internalKey": "metadata",
              "type": "json",
              "required": false,
              "description": "Key-value metadata for upsert",
              "helpText": "What this field is: Structured data for Key-value metadata for upsert.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: {}.\nTip: Use {{$json.metadata}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Namespace",
              "internalKey": "namespace",
              "type": "string",
              "required": false,
              "description": "Pinecone namespace",
              "helpText": "What this field is: Pinecone namespace.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Namespace value.\nTip: Use {{$json.namespace}} when this value comes from an earlier step.",
              "placeholder": "Enter Namespace"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "upsert",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Pinecone data with upsert after a related upstream event is received",
            "inputValues": {
              "Index": "",
              "Api Key": "",
              "Vector": "[]",
              "Top K": "5",
              "Id": "abc123"
            },
            "expectedOutput": "Pinecone returns structured upsert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.pinecone.io/reference/api/introduction"
        },
        {
          "name": "Query",
          "value": "query",
          "description": "Query using the Pinecone node.",
          "fields": [
            {
              "name": "Index",
              "internalKey": "index",
              "type": "string",
              "required": true,
              "description": "Pinecone index name or host URL",
              "helpText": "What this field is: Pinecone index name or host URL.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Index value.\nTip: Use {{$json.index}} when this value comes from an earlier step.",
              "placeholder": "Enter Index"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Pinecone API key",
              "helpText": "What this field is: Pinecone API key, a secret password that lets CtrlChecks talk to Pinecone safely.\nWhere to find it: Pinecone console -> API keys.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the key shown by Pinecone.\nImportant: Treat this like a bank password. Use an API key that can access the target index.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Vector",
              "internalKey": "vector",
              "type": "json",
              "required": false,
              "description": "Embedding array of floats",
              "helpText": "What this field is: Structured data for Embedding array of floats.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: [].\nTip: Use {{$json.vector}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Top K",
              "internalKey": "topK",
              "type": "number",
              "required": false,
              "description": "Nearest-neighbor results count",
              "helpText": "What this field is: The number used for Nearest-neighbor results count.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.topK}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5",
              "defaultValue": "5"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Vector ID",
              "helpText": "What this field is: The Vector ID that tells Pinecone which item to use.\nWhere to find it: Open the item in Pinecone and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.id}} when an earlier Pinecone step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Metadata",
              "internalKey": "metadata",
              "type": "json",
              "required": false,
              "description": "Key-value metadata for upsert",
              "helpText": "What this field is: Structured data for Key-value metadata for upsert.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: {}.\nTip: Use {{$json.metadata}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Namespace",
              "internalKey": "namespace",
              "type": "string",
              "required": false,
              "description": "Pinecone namespace",
              "helpText": "What this field is: Pinecone namespace.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Namespace value.\nTip: Use {{$json.namespace}} when this value comes from an earlier step.",
              "placeholder": "Enter Namespace"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "query",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Pinecone data with query after a related upstream event is received",
            "inputValues": {
              "Index": "",
              "Api Key": "",
              "Vector": "[]",
              "Top K": "5",
              "Id": "abc123"
            },
            "expectedOutput": "Pinecone returns structured query data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.pinecone.io/reference/api/introduction"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Pinecone node.",
          "fields": [
            {
              "name": "Index",
              "internalKey": "index",
              "type": "string",
              "required": true,
              "description": "Pinecone index name or host URL",
              "helpText": "What this field is: Pinecone index name or host URL.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Index value.\nTip: Use {{$json.index}} when this value comes from an earlier step.",
              "placeholder": "Enter Index"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Pinecone API key",
              "helpText": "What this field is: Pinecone API key, a secret password that lets CtrlChecks talk to Pinecone safely.\nWhere to find it: Pinecone console -> API keys.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the key shown by Pinecone.\nImportant: Treat this like a bank password. Use an API key that can access the target index.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Vector",
              "internalKey": "vector",
              "type": "json",
              "required": false,
              "description": "Embedding array of floats",
              "helpText": "What this field is: Structured data for Embedding array of floats.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: [].\nTip: Use {{$json.vector}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Top K",
              "internalKey": "topK",
              "type": "number",
              "required": false,
              "description": "Nearest-neighbor results count",
              "helpText": "What this field is: The number used for Nearest-neighbor results count.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.topK}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5",
              "defaultValue": "5"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Vector ID",
              "helpText": "What this field is: The Vector ID that tells Pinecone which item to use.\nWhere to find it: Open the item in Pinecone and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.id}} when an earlier Pinecone step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Metadata",
              "internalKey": "metadata",
              "type": "json",
              "required": false,
              "description": "Key-value metadata for upsert",
              "helpText": "What this field is: Structured data for Key-value metadata for upsert.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Pinecone.\nExample: {}.\nTip: Use {{$json.metadata}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            },
            {
              "name": "Namespace",
              "internalKey": "namespace",
              "type": "string",
              "required": false,
              "description": "Pinecone namespace",
              "helpText": "What this field is: Pinecone namespace.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Namespace value.\nTip: Use {{$json.namespace}} when this value comes from an earlier step.",
              "placeholder": "Enter Namespace"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "delete",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Pinecone data with delete after a related upstream event is received",
            "inputValues": {
              "Index": "",
              "Api Key": "",
              "Vector": "[]",
              "Top K": "5",
              "Id": "abc123"
            },
            "expectedOutput": "Pinecone returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.pinecone.io/reference/api/introduction"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Pinecone node."
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
