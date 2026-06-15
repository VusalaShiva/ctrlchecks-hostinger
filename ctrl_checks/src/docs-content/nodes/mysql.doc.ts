import type { NodeDoc } from '../types';

export const mysqlDoc: NodeDoc = {
  "slug": "mysql",
  "displayName": "MySQL",
  "category": "Data",
  "logoUrl": "/icons/nodes/mysql.svg",
  "description": "MySQL database operations",
  "credentialType": "MySQL Credential",
  "credentialSetupSteps": [
    "What this is: The MySQL connection lets CtrlChecks access your MySQL account safely without putting secrets in workflow fields.",
    "Where to start: MySQL account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> MySQL, then sign in or paste the secret value requested there.",
    "Example: the token format shown by MySQL.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple MySQL step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://dev.mysql.com/doc/refman/8.0/en/",
  "resources": [
    {
      "name": "Configuration",
      "description": "MySQL is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the MySQL node.",
          "fields": [
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MySQL.\nExample: SELECT * FROM users WHERE id = ?.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "SELECT * FROM users WHERE id = ?",
              "example": "SELECT * FROM users WHERE id = ?"
            },
            {
              "name": "Parameters",
              "internalKey": "parameters",
              "type": "json",
              "required": false,
              "description": "Query parameters",
              "helpText": "What this field is: Structured data for Query parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by MySQL.\nExample: [1,\"value\"].\nTip: Use {{$json.parameters}} when an earlier step already prepared this data.",
              "placeholder": "[1,\"value\"]",
              "example": "[1,\"value\"]"
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
            "scenario": "Process incoming MySQL data with execute after a related upstream event is received",
            "inputValues": {
              "Query": "SELECT * FROM users WHERE id = ?",
              "Parameters": "[1,\"value\"]"
            },
            "expectedOutput": "MySQL returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://dev.mysql.com/doc/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the MySQL node."
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
