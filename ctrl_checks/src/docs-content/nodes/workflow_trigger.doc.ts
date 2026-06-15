import type { NodeDoc } from '../types';

export const workflowTriggerDoc: NodeDoc = {
  "slug": "workflow_trigger",
  "displayName": "Workflow Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/workflow_trigger.svg",
  "description": "Trigger workflow from another workflow",
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
      "description": "Workflow Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow when called by an Execute Workflow node in another workflow.",
          "fields": [
            {
              "name": "Source Workflow Id",
              "internalKey": "source_workflow_id",
              "type": "string",
              "required": true,
              "description": "ID of the workflow that is allowed to trigger this workflow",
              "helpText": "What this field is: The ID of the workflow that is allowed to trigger this workflow that tells Workflow Trigger which item to use.\nWhere to find it: Open the item in Workflow Trigger and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: workflow_123.\nTip: Use {{$json.source_workflow_id}} when an earlier Workflow Trigger step provides this value.",
              "placeholder": "workflow_123",
              "example": "workflow_123"
            }
          ],
          "outputExample": {
            "inputData": {
              "userId": "u_456",
              "action": "send_report"
            },
            "callerWorkflowId": "wf_parent",
            "calledAt": "2025-01-15T13:00:00.000Z"
          },
          "outputDescription": "inputData: The data passed from the Execute Workflow node in the parent workflow. callerWorkflowId: The ID of the parent workflow that triggered this one.",
          "usageExample": {
            "scenario": "Create a reusable \"send notification\" sub-workflow that other workflows call",
            "inputValues": {},
            "expectedOutput": "Access passed data via `{{$json.inputData.userId}}` etc. The parent workflow continues after this sub-workflow completes."
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
