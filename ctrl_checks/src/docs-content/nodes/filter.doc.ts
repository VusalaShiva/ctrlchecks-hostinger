import type { NodeDoc } from '../types';

export const filterDoc: NodeDoc = {
  "slug": "filter",
  "displayName": "Filter",
  "category": "Logic",
  "logoUrl": "/icons/nodes/filter.svg",
  "description": "Filter array items by condition",
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
      "description": "Filter is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Filter an array of items, keeping only those that match a condition.",
          "fields": [
            {
              "name": "Condition",
              "internalKey": "condition",
              "type": "string",
              "required": true,
              "description": "Filter condition",
              "helpText": "What this field is: Filter condition.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.age}} >= 18.\nTip: Use {{$json.condition}} when this value comes from an earlier step.",
              "placeholder": "{{$json.age}} >= 18",
              "example": "{{$json.age}} >= 18"
            }
          ],
          "outputExample": {
            "filtered": [
              {
                "id": 2,
                "status": "active",
                "name": "Bob"
              }
            ],
            "totalIn": 5,
            "totalOut": 1
          },
          "outputDescription": "filtered: Array of items that passed the filter condition. totalIn: Input item count. totalOut: Filtered item count.",
          "usageExample": {
            "scenario": "Keep only active users from a database query result",
            "inputValues": {
              "condition": "{{$item.status === \"active\"}}"
            },
            "expectedOutput": "Only items where status is \"active\" are passed to the next node."
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
