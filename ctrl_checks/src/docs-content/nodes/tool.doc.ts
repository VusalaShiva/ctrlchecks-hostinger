import type { NodeDoc } from '../types';

export const toolDoc: NodeDoc = {
  "slug": "tool",
  "displayName": "Tool",
  "category": "AI",
  "logoUrl": "/icons/nodes/tool.svg",
  "description": "Tool connector for AI Agent to use external functions",
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
      "description": "Tool is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Tool node.",
          "fields": [
            {
              "name": "Tool Name",
              "internalKey": "toolName",
              "type": "string",
              "required": true,
              "description": "Tool name",
              "helpText": "What this field is: Tool name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: http_request.\nTip: Use {{$json.toolName}} when this value comes from an earlier step.",
              "placeholder": "http_request",
              "example": "http_request"
            }
          ],
          "outputExample": {
            "name": "",
            "description": "",
            "parameters": {}
          },
          "outputDescription": "name: Value returned by this operation.\ndescription: Value returned by this operation.\nparameters: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Tool data with execute after a related upstream event is received",
            "inputValues": {
              "Tool Name": "http_request"
            },
            "expectedOutput": "Tool returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
