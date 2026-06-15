import type { NodeDoc } from '../types';

export const parallelDoc: NodeDoc = {
  "slug": "parallel",
  "displayName": "Parallel",
  "category": "Logic",
  "logoUrl": "/icons/nodes/parallel.svg",
  "description": "Runs multiple branches concurrently and waits for all to complete",
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
      "description": "Parallel is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Parallel node.",
          "fields": [
            {
              "name": "Mode",
              "internalKey": "mode",
              "type": "select",
              "required": false,
              "description": "Execution mode (all, race)",
              "helpText": "Options: Choose the mode value this Parallel step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Wait for all.\nTip: Use {{$json.mode}} only when an earlier step already provides a valid option value.",
              "placeholder": "all",
              "example": "all",
              "defaultValue": "all",
              "options": [
                "Wait for all",
                "Race (first completes)"
              ]
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Parallel data with execute after a related upstream event is received",
            "inputValues": {
              "Mode": "all"
            },
            "expectedOutput": "Parallel returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
