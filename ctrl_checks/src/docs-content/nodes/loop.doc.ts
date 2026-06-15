import type { NodeDoc } from '../types';

export const loopDoc: NodeDoc = {
  "slug": "loop",
  "displayName": "Loop",
  "category": "Logic",
  "logoUrl": "/icons/nodes/loop.svg",
  "description": "Iterate over array items with max iterations limit",
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
      "description": "Loop is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Loop over an array of items and run the connected branch for each one.",
          "fields": [
            {
              "name": "Items",
              "internalKey": "items",
              "type": "json",
              "required": true,
              "description": "Array to iterate over",
              "helpText": "What this field is: The list of items to process one at a time.\nHow to fill it: Usually {{$json.customers}} or {{$json.rows}} — the array output from a previous node.\nExample: If a Google Sheets Read returned 50 customer rows, use {{$json.rows}} to process each customer one at a time (e.g. send one email per customer).\nTip: The nodes inside the loop run once for each item. Use {{$json.item}} to access the current item's data.",
              "placeholder": "{{$json.items}}",
              "example": "{{$json.items}}"
            },
            {
              "name": "Max Iterations",
              "internalKey": "maxIterations",
              "type": "number",
              "required": false,
              "description": "Maximum iterations",
              "helpText": "What this field is: The number used for Maximum iterations.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.maxIterations}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100",
              "defaultValue": "100"
            }
          ],
          "outputExample": {
            "processedCount": 3,
            "results": [
              {
                "id": 1,
                "sent": true
              },
              {
                "id": 2,
                "sent": true
              },
              {
                "id": 3,
                "sent": true
              }
            ]
          },
          "outputDescription": "processedCount: How many items were processed. results: Array of outputs from each iteration.",
          "usageExample": {
            "scenario": "Send a personalised email to each user in a list",
            "inputValues": {
              "items": "{{$json.users}}"
            },
            "expectedOutput": "The connected branch runs once per user. Each iteration receives `{{$item}}` as the current user."
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
