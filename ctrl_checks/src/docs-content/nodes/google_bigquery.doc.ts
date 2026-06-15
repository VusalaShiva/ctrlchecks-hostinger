import type { NodeDoc } from '../types';

export const googleBigqueryDoc: NodeDoc = {
  "slug": "google_bigquery",
  "displayName": "Google BigQuery",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_bigquery.svg",
  "description": "Query Google BigQuery data warehouse",
  "credentialType": "Google OAuth",
  "credentialSetupSteps": [
    "What this is: The Google BigQuery connection lets CtrlChecks access your Google BigQuery account safely without putting secrets in workflow fields.",
    "Where to start: Google BigQuery account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google BigQuery, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google BigQuery.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google BigQuery step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Configuration",
      "description": "Google BigQuery is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Google BigQuery node.",
          "fields": [
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google BigQuery.\nExample: SELECT * FROM dataset.table LIMIT 10.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "SELECT * FROM dataset.table LIMIT 10",
              "example": "SELECT * FROM dataset.table LIMIT 10"
            },
            {
              "name": "Project Id",
              "internalKey": "projectId",
              "type": "string",
              "required": false,
              "description": "Project ID",
              "helpText": "What this field is: The Project ID that tells Google BigQuery which item to use.\nWhere to find it: Open the item in Google BigQuery and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: my-project.\nTip: Use {{$json.projectId}} when an earlier Google BigQuery step provides this value.",
              "placeholder": "my-project",
              "example": "my-project"
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
            "scenario": "Process incoming Google BigQuery data with execute after a related upstream event is received",
            "inputValues": {
              "Query": "SELECT * FROM dataset.table LIMIT 10",
              "Project Id": "my-project"
            },
            "expectedOutput": "Google BigQuery returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://cloud.google.com/bigquery/docs/reference/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google BigQuery node."
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
