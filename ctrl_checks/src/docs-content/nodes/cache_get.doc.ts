import type { NodeDoc } from '../types';

export const cacheGetDoc: NodeDoc = {
  "slug": "cache_get",
  "displayName": "Cache Get",
  "category": "Utility",
  "logoUrl": "/icons/nodes/cache_get.svg",
  "description": "Retrieve a value from cache by key",
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
      "description": "Cache Get is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Get a value from the Redis cache by key.",
          "fields": [
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": true,
              "description": "Cache key",
              "helpText": "What this field is: The Cache key that tells Cache Get which item to use.\nWhere to find it: Open the item in Cache Get and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: user:123.\nTip: Use {{$json.key}} when an earlier Cache Get step provides this value.",
              "placeholder": "user:123",
              "example": "user:123"
            },
            {
              "name": "Default Value",
              "internalKey": "defaultValue",
              "type": "json",
              "required": false,
              "description": "Value to return if key not found",
              "helpText": "What this field is: Structured data for Value to return if key not found.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Cache Get.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.defaultValue}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "key": "user:u_123:profile",
            "value": {
              "name": "Alice",
              "plan": "pro"
            },
            "hit": true,
            "ttl": 3542
          },
          "outputDescription": "key: The cache key. value: The cached value (null if not found). hit: true if the key existed. ttl: Remaining TTL in seconds.",
          "usageExample": {
            "scenario": "Check the cache for a user's profile before making a database query",
            "inputValues": {
              "key": "user:{{$json.userId}}:profile"
            },
            "expectedOutput": "If `{{$json.hit}}` is true, use `{{$json.value}}` and skip the DB call."
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
