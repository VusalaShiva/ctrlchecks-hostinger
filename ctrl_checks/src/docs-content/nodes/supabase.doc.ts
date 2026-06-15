import type { NodeDoc } from '../types';

export const supabaseDoc: NodeDoc = {
  "slug": "supabase",
  "displayName": "Supabase",
  "category": "Data",
  "logoUrl": "/icons/nodes/supabase.svg",
  "description": "Interact with Supabase (PostgreSQL + realtime + storage) Use this node when a workflow needs supabase behavior with schema-driven inputs from the CtrlChecks node registry.",
  "credentialType": "Supabase Credential",
  "credentialSetupSteps": [
    "What this is: The Supabase connection lets CtrlChecks access your Supabase account safely without putting secrets in workflow fields.",
    "Where to start: Supabase project -> Settings -> API.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Supabase, then sign in or paste the secret value requested there.",
    "Example: anon public key for browser-safe reads, or service role key for trusted server workflows.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Supabase step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://supabase.com/docs/guides/getting-started/quickstarts",
  "resources": [
    {
      "name": "Configuration",
      "description": "Supabase is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Supabase node.",
          "fields": [],
          "outputExample": {
            "success": true,
            "operation": "default",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Supabase data with execute after a related upstream event is received",
            "inputValues": {},
            "expectedOutput": "Supabase returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://supabase.com/docs/reference/javascript/introduction"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Supabase node."
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
