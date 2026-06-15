import type { NodeDoc } from '../types';

export const mergeDoc: NodeDoc = {
  "slug": "merge",
  "displayName": "Merge",
  "category": "Logic",
  "logoUrl": "/icons/nodes/merge.svg",
  "description": "Merge multiple branches of data",
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
      "description": "Merge is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Merge data from multiple input branches into a single output.",
          "fields": [
            {
              "name": "Mode",
              "internalKey": "mode",
              "type": "string",
              "required": true,
              "description": "Merge mode",
              "helpText": "What this field is: How the branches are combined.\nOptions: append (add all items into one array), combine (merge objects from branches by index), join (SQL-style join on a shared key field).\nExample: Use append to collect results from parallel API calls into one list.\nExample: Use join with joinBy=id to merge user data from two sources.",
              "placeholder": "append",
              "example": "append"
            },
            {
              "name": "Join By",
              "internalKey": "joinBy",
              "type": "string",
              "required": false,
              "description": "Field to join on (for join mode)",
              "helpText": "What this field is: Field to join on.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Join By value.\nTip: This field is used for join mode. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Join By"
            }
          ],
          "outputExample": {
            "merged": [
              {
                "id": 1,
                "name": "Alice"
              },
              {
                "id": 2,
                "name": "Bob"
              }
            ],
            "inputCount": 2
          },
          "outputDescription": "merged: Combined array of all items from all input branches. inputCount: Number of inputs that were merged.",
          "usageExample": {
            "scenario": "Combine results from two parallel API calls before writing to a database",
            "inputValues": {
              "mode": "combine"
            },
            "expectedOutput": "All items from both branches are available in `{{$json.merged}}`."
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
