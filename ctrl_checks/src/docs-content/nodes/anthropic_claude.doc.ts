import type { NodeDoc } from '../types';

export const anthropicClaudeDoc: NodeDoc = {
  "slug": "anthropic_claude",
  "displayName": "Claude",
  "category": "AI",
  "logoUrl": "/icons/nodes/anthropic_claude.svg",
  "description": "Anthropic Claude chat completion",
  "credentialType": "Anthropic API Key",
  "credentialSetupSteps": [
    "What this is: The Claude connection lets CtrlChecks access your Claude account safely without putting secrets in workflow fields.",
    "Where to start: console.anthropic.com -> Settings -> API Keys.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Claude, then sign in or paste the secret value requested there.",
    "Example: sk-ant-....",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Claude step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.anthropic.com/en/api/getting-started",
  "resources": [
    {
      "name": "Configuration",
      "description": "Claude is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Claude node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Model name",
              "helpText": "What this field is: Model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: claude-3-opus.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "claude-3-opus",
              "example": "claude-3-opus"
            },
            {
              "name": "Messages",
              "internalKey": "messages",
              "type": "json",
              "required": true,
              "description": "Chat messages",
              "helpText": "What this field is: Structured data for Chat messages.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Claude.\nExample: [\"{{$json.messages}}\"].\nTip: Use {{$json.messages}} when an earlier step already prepared this data.",
              "placeholder": "[\"{{$json.messages}}\"]",
              "example": "[\"{{$json.messages}}\"]"
            },
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Prompt to send to Claude",
              "helpText": "What this field is: Prompt to send to Claude.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Summarize {{$json.text}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "Summarize {{$json.text}}"
            }
          ],
          "outputExample": {
            "id": "msg_01ABC",
            "type": "message",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": "Here is the answer."
              }
            ],
            "model": "claude-3-5-sonnet-latest"
          },
          "outputDescription": "id: Unique identifier returned by the service.\ntype: Value returned by this operation.\nrole: Value returned by this operation.\ncontent: Value returned by this operation.\nmodel: Value returned by this operation.",
          "usageExample": {
            "scenario": "Summarize a long support ticket before creating an agent handoff note",
            "inputValues": {
              "Model": "claude-3-opus",
              "Messages": "[\"{{$json.messages}}\"]",
              "Prompt": ""
            },
            "expectedOutput": "Claude returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.anthropic.com/en/api/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Claude node."
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
