import type { NodeDoc } from '../types';

export const ollamaDoc: NodeDoc = {
  "slug": "ollama",
  "displayName": "AI Chat (Gemini)",
  "category": "AI",
  "logoUrl": "/icons/nodes/ollama.svg",
  "description": "AI chat completion using Gemini 3.5 Flash (default LLM)",
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
      "description": "AI Chat (Gemini) is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the AI Chat (Gemini) node.",
          "fields": [
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Prompt text",
              "helpText": "What this field is: Prompt text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.prompt}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "{{$json.prompt}}",
              "example": "{{$json.prompt}}"
            },
            {
              "name": "Temperature",
              "internalKey": "temperature",
              "type": "number",
              "required": false,
              "description": "Creativity (0.0 - 1.0)",
              "helpText": "What this field is: The number used for Creativity.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.2.\nTip: Use {{$json.temperature}} when the number comes from an earlier step.",
              "placeholder": "0.2",
              "example": "0.2",
              "defaultValue": "0.7"
            }
          ],
          "outputExample": {
            "text": "Local model generated a response for the prompt.",
            "length": 48
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming AI Chat (Gemini) data with execute after a related upstream event is received",
            "inputValues": {
              "Prompt": "{{$json.prompt}}",
              "Temperature": "0.2"
            },
            "expectedOutput": "AI Chat (Gemini) returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
