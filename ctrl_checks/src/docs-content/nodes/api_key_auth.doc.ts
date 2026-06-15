import type { NodeDoc } from '../types';

export const apiKeyAuthDoc: NodeDoc = {
  "slug": "api_key_auth",
  "displayName": "API Key Auth",
  "category": "Utility",
  "logoUrl": "/icons/nodes/api_key_auth.svg",
  "description": "Provides an API key for authentication",
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
      "description": "API Key Auth is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the API Key Auth node.",
          "fields": [
            {
              "name": "Api Key Name",
              "internalKey": "apiKeyName",
              "type": "string",
              "required": true,
              "description": "Name of the stored API key",
              "helpText": "What this field is: The saved connection name for the secret key you already stored in CtrlChecks.\nWhere to find it: Open CtrlChecks Connections and copy the name of the saved key you want this workflow to use.\nHow to fill it: Type the connection name only. Do not paste the secret key value here.\nExample: openai or billing_api.\nImportant: Store the real secret in Connections, not in this workflow field.",
              "placeholder": "openai",
              "example": "openai"
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
            "scenario": "Process incoming API Key Auth data with execute after a related upstream event is received",
            "inputValues": {
              "Api Key Name": "openai"
            },
            "expectedOutput": "API Key Auth returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
