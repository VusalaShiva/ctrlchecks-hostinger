import type { NodeDoc } from '../types';

export const splitInBatchesDoc: NodeDoc = {
  "slug": "split_in_batches",
  "displayName": "Split In Batches",
  "category": "Logic",
  "logoUrl": "/icons/nodes/split_in_batches.svg",
  "description": "Split array into batches for processing",
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
      "description": "Split In Batches is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Split a large array into smaller batches and process each batch separately.",
          "fields": [
            {
              "name": "Batch Size",
              "internalKey": "batchSize",
              "type": "number",
              "required": true,
              "description": "Batch size",
              "helpText": "What this field is: The number used for Batch size.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.batchSize}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "batch": [
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
            "batchIndex": 0,
            "totalBatches": 4,
            "totalItems": 12,
            "isLastBatch": false
          },
          "outputDescription": "batch: The items in this batch. batchIndex: Zero-based batch number. totalBatches: Total number of batches. isLastBatch: true on the final batch.",
          "usageExample": {
            "scenario": "Process 1000 API records in batches of 100 to avoid rate limits",
            "inputValues": {
              "items": "{{$json.records}}",
              "batchSize": "100"
            },
            "expectedOutput": "Each batch runs through the connected branch. Use `{{$json.isLastBatch}}` to trigger a completion action."
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
