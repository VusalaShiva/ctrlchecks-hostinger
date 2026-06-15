import type { NodeDoc } from '../types';

export const databaseWriteDoc: NodeDoc = {
  "slug": "database_write",
  "displayName": "Database Write",
  "category": "Data",
  "logoUrl": "/icons/nodes/database_write.svg",
  "description": "Execute SQL queries on database (INSERT, UPDATE, DELETE)",
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
      "description": "Database Write is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute an INSERT, UPDATE, or DELETE query on the configured database.",
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
              "description": "SQL query to execute",
              "helpText": "What this field is: Structured data for SQL query to execute.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Database Write.\nExample: INSERT INTO users (name, email) VALUES ($1, $2).\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "INSERT INTO users (name, email) VALUES ($1, $2)",
              "example": "INSERT INTO users (name, email) VALUES ($1, $2)"
            },
            {
              "name": "Parameters",
              "internalKey": "parameters",
              "type": "json",
              "required": false,
              "description": "Query parameters",
              "helpText": "What this field is: Structured data for Query parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Database Write.\nExample: [\"item\"].\nTip: Use {{$json.parameters}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "rowCount": 1
          },
          "outputDescription": "rowCount: Number of rows affected by the query.",
          "usageExample": {
            "scenario": "Insert a new record into any SQL database",
            "inputValues": {
              "query": "INSERT INTO logs (message, created_at) VALUES ($1, NOW())",
              "parameters": "[\"{{$json.message}}\"]"
            },
            "expectedOutput": "`rowCount: 1` confirms the row was inserted."
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
