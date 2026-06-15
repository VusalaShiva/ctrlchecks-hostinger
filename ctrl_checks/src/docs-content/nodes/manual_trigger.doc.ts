import type { NodeDoc } from '../types';

export const manualTriggerDoc: NodeDoc = {
  "slug": "manual_trigger",
  "displayName": "Manual Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/manual_trigger.svg",
  "description": "Workflow executes when user manually triggers it",
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
      "description": "Manual Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow when you click the \"Run\" button in CtrlChecks.",
          "fields": [
            {
              "name": "Input Data",
              "internalKey": "inputData",
              "type": "json",
              "required": false,
              "description": "Optional input data when triggered manually",
              "helpText": "What this field is: Structured data for input data when triggered manually.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Manual Trigger.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.inputData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "executedAt": "2025-01-15T14:30:00.000Z",
            "triggeredBy": "manual",
            "workflowId": "wf_abc123"
          },
          "outputDescription": "executedAt: ISO timestamp of the manual run. triggeredBy: Always \"manual\" for this trigger. workflowId: The current workflow ID.",
          "usageExample": {
            "scenario": "Manually run a data migration workflow on demand",
            "inputValues": {},
            "expectedOutput": "The workflow starts immediately. Use this trigger when testing or running one-off automation tasks."
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
