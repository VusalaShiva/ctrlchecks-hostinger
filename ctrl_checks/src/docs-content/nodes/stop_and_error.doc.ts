import type { NodeDoc } from '../types';

export const stopAndErrorDoc: NodeDoc = {
  "slug": "stop_and_error",
  "displayName": "Stop And Error",
  "category": "Logic",
  "logoUrl": "/icons/nodes/stop_and_error.svg",
  "description": "Stop workflow execution with error message",
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
      "description": "Stop And Error is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Stop the workflow intentionally and return a clear error message.",
          "fields": [
            {
              "name": "Error Message",
              "internalKey": "errorMessage",
              "type": "string",
              "required": true,
              "description": "Error message",
              "helpText": "What this field is: Error message.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Validation failed.\nTip: Use {{$json.errorMessage}} when this value comes from an earlier step.",
              "placeholder": "Validation failed",
              "example": "Validation failed"
            }
          ],
          "outputExample": {
            "stopped": true,
            "errorMessage": "Validation failed",
            "stoppedAt": "2025-01-15T10:00:00.000Z"
          },
          "outputDescription": "stopped: Always true when this node stops execution. errorMessage: The message shown in the workflow run logs. stoppedAt: When execution was stopped.",
          "usageExample": {
            "scenario": "Stop an order workflow when the required customer email is missing",
            "inputValues": {
              "errorMessage": "Customer email is missing. Cannot send confirmation."
            },
            "expectedOutput": "The workflow stops before later nodes run, and the run log shows the exact error message."
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
