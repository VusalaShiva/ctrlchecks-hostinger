import type { NodeDoc } from '../types';

export const redisDoc: NodeDoc = {
  "slug": "redis",
  "displayName": "Redis",
  "category": "Data",
  "logoUrl": "/icons/nodes/redis.svg",
  "description": "Redis cache operations",
  "credentialType": "Redis Credential",
  "credentialSetupSteps": [
    "What this is: The Redis connection lets CtrlChecks access your Redis account safely without putting secrets in workflow fields.",
    "Where to start: Redis account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Redis, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Redis.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Redis step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://redis.io/docs/connect/clients/nodejs/",
  "resources": [
    {
      "name": "Operations",
      "description": "Redis exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Redis node.",
          "fields": [
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": true,
              "description": "Redis key",
              "helpText": "What this field is: The Redis key that tells Redis which item to use.\nWhere to find it: Open the item in Redis and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: user:123.\nTip: Use {{$json.key}} when an earlier Redis step provides this value.",
              "placeholder": "user:123",
              "example": "user:123"
            },
            {
              "name": "Value",
              "internalKey": "value",
              "type": "string",
              "required": false,
              "description": "Value (for set)",
              "helpText": "What this field is: Value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.value}}.\nTip: This field is used for set. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.value}}",
              "example": "{{$json.value}}"
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
            "scenario": "Process incoming Redis data with get after a related upstream event is received",
            "inputValues": {
              "Key": "user:123",
              "Value": "{{$json.value}}"
            },
            "expectedOutput": "Redis returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://redis.io/docs/latest/commands/"
        },
        {
          "name": "Set",
          "value": "set",
          "description": "Set using the Redis node.",
          "fields": [
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": true,
              "description": "Redis key",
              "helpText": "What this field is: The Redis key that tells Redis which item to use.\nWhere to find it: Open the item in Redis and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: user:123.\nTip: Use {{$json.key}} when an earlier Redis step provides this value.",
              "placeholder": "user:123",
              "example": "user:123"
            },
            {
              "name": "Value",
              "internalKey": "value",
              "type": "string",
              "required": false,
              "description": "Value (for set)",
              "helpText": "What this field is: Value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.value}}.\nTip: This field is used for set. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.value}}",
              "example": "{{$json.value}}"
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
            "scenario": "Process incoming Redis data with set after a related upstream event is received",
            "inputValues": {
              "Key": "user:123",
              "Value": "{{$json.value}}"
            },
            "expectedOutput": "Redis returns structured set data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://redis.io/docs/latest/commands/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Redis node.",
          "fields": [
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": true,
              "description": "Redis key",
              "helpText": "What this field is: The Redis key that tells Redis which item to use.\nWhere to find it: Open the item in Redis and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: user:123.\nTip: Use {{$json.key}} when an earlier Redis step provides this value.",
              "placeholder": "user:123",
              "example": "user:123"
            },
            {
              "name": "Value",
              "internalKey": "value",
              "type": "string",
              "required": false,
              "description": "Value (for set)",
              "helpText": "What this field is: Value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.value}}.\nTip: This field is used for set. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.value}}",
              "example": "{{$json.value}}"
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
            "scenario": "Process incoming Redis data with delete after a related upstream event is received",
            "inputValues": {
              "Key": "user:123",
              "Value": "{{$json.value}}"
            },
            "expectedOutput": "Redis returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://redis.io/docs/latest/commands/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Redis node."
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
