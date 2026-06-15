import type { NodeDoc } from '../types';

export const openaiGptDoc: NodeDoc = {
  "slug": "openai_gpt",
  "displayName": "OpenAI GPT",
  "category": "AI",
  "logoUrl": "/icons/nodes/openai_gpt.svg",
  "description": "OpenAI GPT chat completion (GPT-4, GPT-3.5)",
  "credentialType": "OpenAI API Key",
  "credentialSetupSteps": [
    "What this is: The OpenAI GPT connection lets CtrlChecks access your OpenAI GPT account safely without putting secrets in workflow fields.",
    "Where to start: platform.openai.com -> API keys.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> OpenAI GPT, then sign in or paste the secret value requested there.",
    "Example: sk-....",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple OpenAI GPT step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://platform.openai.com/docs/api-reference/authentication",
  "resources": [
    {
      "name": "Configuration",
      "description": "OpenAI GPT is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the OpenAI GPT node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Model name",
              "helpText": "What this field is: Model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: gpt-4o.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "gpt-4o",
              "example": "gpt-4o"
            },
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "User message or prompt to send to OpenAI",
              "helpText": "What this field is: User message or prompt to send to OpenAI.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Summarize {{$json.text}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "Summarize {{$json.text}}",
              "example": "Summarize {{$json.text}}"
            }
          ],
          "outputExample": {
            "text": "Here is the generated response from the selected model.",
            "length": 55
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming OpenAI GPT data with execute after a related upstream event is received",
            "inputValues": {
              "Model": "gpt-4o",
              "Prompt": "Summarize {{$json.text}}"
            },
            "expectedOutput": "OpenAI GPT returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://platform.openai.com/docs/api-reference"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the OpenAI GPT node."
    },
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
