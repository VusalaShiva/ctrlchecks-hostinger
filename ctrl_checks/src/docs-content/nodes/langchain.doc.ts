import type { NodeDoc } from '../types';

export const langchainDoc: NodeDoc = {
  "slug": "langchain",
  "displayName": "LangChain",
  "category": "AI",
  "logoUrl": "/icons/nodes/langchain.svg",
  "description": "Orchestrate AI chains and agents using LangChain with configurable LLM providers and tools.",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Operations",
      "description": "LangChain exposes operation choices directly.",
      "operations": [
        {
          "name": "Run chain",
          "value": "run_chain",
          "description": "Run chain using the LangChain node.",
          "fields": [
            {
              "name": "Provider",
              "internalKey": "provider",
              "type": "select",
              "required": false,
              "description": "LLM provider",
              "helpText": "Options: Choose the provider value this LangChain step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: OpenAI.\nTip: Use {{$json.provider}} only when an earlier step already provides a valid option value.",
              "placeholder": "openai",
              "example": "openai",
              "defaultValue": "openai",
              "options": [
                "OpenAI",
                "Anthropic / Claude"
              ]
            },
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Input prompt or task description",
              "helpText": "What this field is: Input prompt or task description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Summarize {{$json.text}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "Summarize {{$json.text}}"
            },
            {
              "name": "Tools",
              "internalKey": "tools",
              "type": "json",
              "required": false,
              "description": "Tool definitions for agent mode",
              "helpText": "What this field is: Structured data for Tool definitions for agent mode.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by LangChain.\nExample: [].\nTip: Use {{$json.tools}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Memory",
              "internalKey": "memory",
              "type": "boolean",
              "required": false,
              "description": "Enable conversation memory",
              "helpText": "What this field is: An on/off switch for Enable conversation memory.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use memory; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "API key for LLM provider",
              "helpText": "What this field is: LangChain token, a secret password that lets CtrlChecks talk to LangChain safely.\nWhere to find it: LangChain account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by LangChain.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "run_chain",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming LangChain data with run chain after a related upstream event is received",
            "inputValues": {
              "Provider": "openai",
              "Prompt": "",
              "Tools": "[]",
              "Memory": "false",
              "Api Key": ""
            },
            "expectedOutput": "LangChain returns structured run chain data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Run agent",
          "value": "run_agent",
          "description": "Run agent using the LangChain node.",
          "fields": [
            {
              "name": "Provider",
              "internalKey": "provider",
              "type": "select",
              "required": false,
              "description": "LLM provider",
              "helpText": "Options: Choose the provider value this LangChain step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: OpenAI.\nTip: Use {{$json.provider}} only when an earlier step already provides a valid option value.",
              "placeholder": "openai",
              "example": "openai",
              "defaultValue": "openai",
              "options": [
                "OpenAI",
                "Anthropic / Claude"
              ]
            },
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Input prompt or task description",
              "helpText": "What this field is: Input prompt or task description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Summarize {{$json.text}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "Summarize {{$json.text}}"
            },
            {
              "name": "Tools",
              "internalKey": "tools",
              "type": "json",
              "required": false,
              "description": "Tool definitions for agent mode",
              "helpText": "What this field is: Structured data for Tool definitions for agent mode.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by LangChain.\nExample: [].\nTip: Use {{$json.tools}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Memory",
              "internalKey": "memory",
              "type": "boolean",
              "required": false,
              "description": "Enable conversation memory",
              "helpText": "What this field is: An on/off switch for Enable conversation memory.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use memory; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "API key for LLM provider",
              "helpText": "What this field is: LangChain token, a secret password that lets CtrlChecks talk to LangChain safely.\nWhere to find it: LangChain account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by LangChain.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "run_agent",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming LangChain data with run agent after a related upstream event is received",
            "inputValues": {
              "Provider": "openai",
              "Prompt": "",
              "Tools": "[]",
              "Memory": "false",
              "Api Key": ""
            },
            "expectedOutput": "LangChain returns structured run agent data that downstream nodes can reference with {{$json.fieldName}}."
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
