import type { NodeDoc } from '../types';

export const memoryDoc: NodeDoc = {
  "slug": "memory",
  "displayName": "Memory",
  "category": "AI",
  "logoUrl": "/icons/nodes/memory.svg",
  "description": "Memory storage for AI Agent context",
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
      "description": "Memory is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Memory node.",
          "fields": [
            {
              "name": "Context",
              "internalKey": "context",
              "type": "string",
              "required": false,
              "description": "Memory context",
              "helpText": "What this field is: Memory context.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.context}}.\nTip: Use {{$json.context}} when this value comes from an earlier step.",
              "placeholder": "{{$json.context}}",
              "example": "{{$json.context}}"
            }
          ],
          "outputExample": {
            "messages": [],
            "context": {}
          },
          "outputDescription": "messages: Returned records from the service.\ncontext: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Memory data with execute after a related upstream event is received",
            "inputValues": {
              "Context": "{{$json.context}}"
            },
            "expectedOutput": "Memory returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
