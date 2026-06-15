import type { NodeDoc } from '../types';

export const timeoutDoc: NodeDoc = {
  "slug": "timeout",
  "displayName": "Timeout",
  "category": "Logic",
  "logoUrl": "/icons/nodes/timeout.svg",
  "description": "Fails the workflow if execution takes longer than specified time",
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
      "description": "Timeout is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Timeout node.",
          "fields": [
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": true,
              "description": "Maximum allowed time (in milliseconds)",
              "helpText": "What this field is: The number used for Maximum allowed time.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5000.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "5000",
              "example": "5000"
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
            "scenario": "Process incoming Timeout data with execute after a related upstream event is received",
            "inputValues": {
              "Limit": "5000"
            },
            "expectedOutput": "Timeout returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
