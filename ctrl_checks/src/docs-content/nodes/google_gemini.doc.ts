import type { NodeDoc } from '../types';

export const googleGeminiDoc: NodeDoc = {
  "slug": "google_gemini",
  "displayName": "Gemini",
  "category": "AI",
  "logoUrl": "/icons/nodes/google_gemini.svg",
  "description": "Google Gemini chat completion",
  "credentialType": "Google Gemini API Key",
  "credentialSetupSteps": [
    "What this is: The Gemini connection lets CtrlChecks access your Gemini account safely without putting secrets in workflow fields.",
    "Where to start: Google AI Studio -> Get API key.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Gemini, then sign in or paste the secret value requested there.",
    "Example: the key shown by Google AI Studio.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Gemini step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://ai.google.dev/tutorials/setup",
  "resources": [
    {
      "name": "Configuration",
      "description": "Gemini is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Gemini node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Model name",
              "helpText": "What this field is: Model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: gemini-3.1-pro-preview.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "gemini-3.1-pro-preview",
              "example": "gemini-3.1-pro-preview"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Gemini API key (node-level, required for this node to run)",
              "helpText": "What this field is: Google AI API key, a secret password that lets CtrlChecks talk to Gemini safely.\nWhere to find it: Google AI Studio -> Get API key.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the key shown by Google AI Studio.\nImportant: Treat this like a bank password. Keep this key private and rotate it if it is exposed.",
              "placeholder": "AIza...",
              "example": "AIza...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Prompt text",
              "helpText": "What this field is: Prompt text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.prompt}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "{{$json.prompt}}",
              "example": "{{$json.prompt}}"
            }
          ],
          "outputExample": {
            "text": "Here is a concise summary of the uploaded document.",
            "length": 51
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Gemini data with execute after a related upstream event is received",
            "inputValues": {
              "Model": "gemini-3.1-pro-preview",
              "Api Key": "AIza...",
              "Prompt": "{{$json.prompt}}"
            },
            "expectedOutput": "Gemini returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://ai.google.dev/api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Gemini node."
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
