import type { NodeDoc } from '../types';

export const errorTriggerDoc: NodeDoc = {
  "slug": "error_trigger",
  "displayName": "Error Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/error_trigger.svg",
  "description": "Trigger workflow when errors occur",
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
      "description": "Error Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow when another workflow encounters an unhandled error.",
          "fields": [],
          "outputExample": {
            "error": {
              "message": "Request timeout after 10000ms",
              "code": "TIMEOUT",
              "stack": "..."
            },
            "failedWorkflowId": "wf_abc",
            "failedNodeId": "node_3",
            "timestamp": "2025-01-15T12:00:00.000Z"
          },
          "outputDescription": "error.message: The error message from the failed node. error.code: The error code if available. failedWorkflowId: The ID of the workflow that failed. failedNodeId: The specific node that threw the error.",
          "usageExample": {
            "scenario": "Send a Slack alert whenever any workflow fails",
            "inputValues": {},
            "expectedOutput": "Use `{{$json.error.message}}` and `{{$json.failedWorkflowId}}` in a Slack Message node to alert your team."
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
