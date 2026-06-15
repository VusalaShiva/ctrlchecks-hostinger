import type { NodeDoc } from '../types';

export const tryCatchDoc: NodeDoc = {
  "slug": "try_catch",
  "displayName": "Try/Catch",
  "category": "Logic",
  "logoUrl": "/icons/nodes/try_catch.svg",
  "description": "Executes a branch and catches errors, routing to error handler",
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
      "description": "Try/Catch is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Wrap a branch in a try/catch: if the branch throws an error, the catch path runs.",
          "fields": [],
          "outputExample": {
            "success": true,
            "output": {
              "data": "processed"
            },
            "error": null
          },
          "outputDescription": "success: true if the try branch completed without errors. output: The try branch result. error: null on success, or the error object on failure.",
          "usageExample": {
            "scenario": "Attempt an external API call and gracefully handle failures",
            "inputValues": {},
            "expectedOutput": "On success, `output` has the API response. On failure, `error.message` explains what went wrong."
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
