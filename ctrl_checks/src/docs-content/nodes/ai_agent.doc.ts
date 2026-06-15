import type { NodeDoc } from '../types';

export const aiAgentDoc: NodeDoc = {
  "slug": "ai_agent",
  "displayName": "AI Agent",
  "category": "AI",
  "logoUrl": "/icons/nodes/ai_agent.svg",
  "description": "AI service node for prompt-based text generation and reasoning",
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
      "description": "AI Agent is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the AI Agent node.",
          "fields": [
            {
              "name": "User Input",
              "internalKey": "userInput",
              "type": "string",
              "required": false,
              "description": "User input or prompt for the AI node",
              "helpText": "What this field is: User input or prompt for the AI node.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Process this data.\nTip: Use {{$json.userInput}} when this value comes from an earlier step.",
              "placeholder": "Process this data",
              "example": "Process this data"
            },
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": false,
              "description": "LLM model selection",
              "helpText": "What this field is: LLM model selection.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: gemini-3.5-flash.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "gemini-3.5-flash",
              "example": "gemini-3.5-flash",
              "defaultValue": "gemini-3.5-flash"
            },
            {
              "name": "Memory",
              "internalKey": "memory",
              "type": "json",
              "required": false,
              "description": "Optional memory configuration (disabled by default)",
              "helpText": "What this field is: Structured data for memory configuration.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by AI Agent.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.memory}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Tool",
              "internalKey": "tool",
              "type": "json",
              "required": false,
              "description": "Optional tool configuration (disabled by default)",
              "helpText": "What this field is: Structured data for tool configuration.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by AI Agent.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.tool}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "text": "The order is ready to ship and the customer has been notified.",
            "length": 62
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming AI Agent data with execute after a related upstream event is received",
            "inputValues": {
              "User Input": "Process this data",
              "Model": "gemini-3.5-flash",
              "Memory": "{\"key\":\"value\"}",
              "Tool": "{\"key\":\"value\"}"
            },
            "expectedOutput": "AI Agent returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
