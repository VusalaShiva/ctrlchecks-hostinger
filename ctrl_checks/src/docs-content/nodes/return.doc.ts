import type { NodeDoc } from '../types';

export const returnDoc: NodeDoc = {
  "slug": "return",
  "displayName": "Return",
  "category": "Logic",
  "logoUrl": "/icons/nodes/return.svg",
  "description": "Stops workflow execution and returns the specified data",
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
      "description": "Return is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Stop the current workflow and return a specified value to the caller.",
          "fields": [
            {
              "name": "Value",
              "internalKey": "value",
              "type": "string",
              "required": false,
              "description": "Value to return (can be a template or static value)",
              "helpText": "What this field is: Value to return.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json}}.\nTip: Use {{$json.value}} when this value comes from an earlier step.",
              "placeholder": "{{$json}}",
              "example": "{{$json}}"
            },
            {
              "name": "Include Input",
              "internalKey": "includeInput",
              "type": "boolean",
              "required": false,
              "description": "Include the input data in the return value",
              "helpText": "What this field is: An on/off switch for Include the input data in the return value.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use include input; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            }
          ],
          "outputExample": {
            "returned": true,
            "value": {
              "success": true,
              "orderId": "ord_123"
            }
          },
          "outputDescription": "returned: true if the return was executed. value: The data returned to the caller.",
          "usageExample": {
            "scenario": "Return a success response from a sub-workflow to the parent workflow",
            "inputValues": {
              "value": "{\"success\": true, \"recordId\": \"{{$json.id}}\"}"
            },
            "expectedOutput": "The parent workflow receives `{{$json.value}}` from the Execute Workflow node."
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
