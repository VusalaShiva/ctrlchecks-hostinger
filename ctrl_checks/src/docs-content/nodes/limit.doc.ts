import type { NodeDoc } from '../types';

export const limitDoc: NodeDoc = {
  "slug": "limit",
  "displayName": "Limit",
  "category": "Data",
  "logoUrl": "/icons/nodes/limit.svg",
  "description": "Limit array size",
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
      "description": "Limit is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Take only the first N items from an array.",
          "fields": [
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": true,
              "description": "Maximum items",
              "helpText": "What this field is: The number used for Maximum items.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Array",
              "internalKey": "array",
              "type": "json",
              "required": false,
              "description": "Array to limit",
              "helpText": "What this field is: Structured data for Array to limit.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Limit.\nExample: {{$json.items}}.\nTip: Use {{$json.array}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.items}}",
              "example": "{{$json.items}}"
            }
          ],
          "outputExample": {
            "items": [
              {
                "id": 1
              },
              {
                "id": 2
              },
              {
                "id": 3
              }
            ],
            "total": 10,
            "returned": 3
          },
          "outputDescription": "items: The truncated array. total: Original array length. returned: Number of items after limiting.",
          "usageExample": {
            "scenario": "Take only the top 5 results from a large dataset",
            "inputValues": {
              "items": "{{$json.results}}",
              "limit": "5"
            },
            "expectedOutput": "First 5 items in `{{$json.items}}`."
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
