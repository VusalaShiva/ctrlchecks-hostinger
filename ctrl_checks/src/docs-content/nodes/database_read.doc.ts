import type { NodeDoc } from '../types';

export const databaseReadDoc: NodeDoc = {
  "slug": "database_read",
  "displayName": "Database Read",
  "category": "Data",
  "logoUrl": "/icons/nodes/database_read.svg",
  "description": "Read data from database using SQL queries",
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
      "description": "Database Read is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Run a SELECT query on the configured database.",
          "fields": [
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": false,
              "description": "Database connection string (PostgreSQL). If omitted, uses DATABASE_URL from environment.",
              "helpText": "What this field is: Database connection string . If omitted, uses DATABASE_URL from environment..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: postgresql://user:pass@host:5432/dbname.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "postgresql://user:pass@host:5432/dbname",
              "example": "postgresql://user:pass@host:5432/dbname"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SELECT query",
              "helpText": "What this field is: Structured data for SELECT query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Database Read.\nExample: SELECT * FROM users WHERE status = $1.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "SELECT * FROM users WHERE status = $1",
              "example": "SELECT * FROM users WHERE status = $1"
            },
            {
              "name": "Parameters",
              "internalKey": "parameters",
              "type": "json",
              "required": false,
              "description": "Query parameters",
              "helpText": "What this field is: Structured data for Query parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Database Read.\nExample: [\"item\"].\nTip: Use {{$json.parameters}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "id": 1,
                "name": "Alice",
                "value": 100
              }
            ],
            "rowCount": 1
          },
          "outputDescription": "rows: Array of result objects with column names as keys. rowCount: Total rows returned.",
          "usageExample": {
            "scenario": "Read records from any SQL database",
            "inputValues": {
              "query": "SELECT * FROM orders WHERE status = $1",
              "parameters": "[\"pending\"]"
            },
            "expectedOutput": "Returns matching rows as JavaScript objects."
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
