import type { NodeDoc } from '../types';

export const cacheSetDoc: NodeDoc = {
  "slug": "cache_set",
  "displayName": "Cache Set",
  "category": "Utility",
  "logoUrl": "/icons/nodes/cache_set.svg",
  "description": "Store a value in cache with optional TTL",
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
      "description": "Cache Set is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Store a value in the Redis cache with an optional expiry (TTL).",
          "fields": [
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": true,
              "description": "Cache key",
              "helpText": "What this field is: The Cache key that tells Cache Set which item to use.\nWhere to find it: Open the item in Cache Set and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: user:123.\nTip: Use {{$json.key}} when an earlier Cache Set step provides this value.",
              "placeholder": "user:123",
              "example": "user:123"
            },
            {
              "name": "Value",
              "internalKey": "value",
              "type": "json",
              "required": true,
              "description": "Value to store (will be JSON stringified)",
              "helpText": "What this field is: Structured data for Value to store.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Cache Set.\nExample: {{$json}}.\nTip: Use {{$json.value}} when an earlier step already prepared this data.",
              "placeholder": "{{$json}}",
              "example": "{{$json}}"
            },
            {
              "name": "Ttl",
              "internalKey": "ttl",
              "type": "number",
              "required": false,
              "description": "Time-to-live in seconds (0 = no expiration)",
              "helpText": "What this field is: The number used for Time-to-live in seconds.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.ttl}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
            }
          ],
          "outputExample": {
            "key": "user:u_123:profile",
            "set": true,
            "ttl": 3600
          },
          "outputDescription": "key: The cache key. set: true if stored successfully. ttl: The TTL set in seconds.",
          "usageExample": {
            "scenario": "Cache a user profile for 1 hour after fetching from the database",
            "inputValues": {
              "key": "user:{{$json.userId}}:profile",
              "value": "{{$json.profile}}",
              "ttl": "3600"
            },
            "expectedOutput": "`set: true` confirms the value is cached."
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
