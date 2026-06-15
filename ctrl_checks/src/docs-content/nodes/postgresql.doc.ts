import type { NodeDoc } from '../types';

export const postgresqlDoc: NodeDoc = {
  "slug": "postgresql",
  "displayName": "PostgreSQL",
  "category": "Data",
  "logoUrl": "/icons/nodes/postgresql.svg",
  "description": "Execute SQL queries on PostgreSQL database",
  "credentialType": "PostgreSQL Credential",
  "credentialSetupSteps": [
    "What this is: The PostgreSQL connection lets CtrlChecks access your PostgreSQL account safely without putting secrets in workflow fields.",
    "Where to start: PostgreSQL account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> PostgreSQL, then sign in or paste the secret value requested there.",
    "Example: the token format shown by PostgreSQL.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple PostgreSQL step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.postgresql.org/docs/current/tutorial-accessdb.html",
  "resources": [
    {
      "name": "Operations",
      "description": "PostgreSQL exposes operation choices directly.",
      "operations": [
        {
          "name": "Query",
          "value": "query",
          "description": "Execute a SQL SELECT query against a PostgreSQL database.",
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
              "helpText": "What this field is: Structured data for SQL query to execute.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: INSERT INTO users (name, email) VALUES ($1, $2).\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "INSERT INTO users (name, email) VALUES ($1, $2)",
              "example": "INSERT INTO users (name, email) VALUES ($1, $2)"
            },
            {
              "name": "Parameters",
              "internalKey": "parameters",
              "type": "json",
              "required": false,
              "description": "Query parameters",
              "helpText": "What this field is: Structured data for Query parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: [\"item\"].\nTip: Use {{$json.parameters}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "id": 1,
                "name": "Alice",
                "email": "alice@example.com",
                "created_at": "2024-01-01T00:00:00Z"
              }
            ],
            "rowCount": 1
          },
          "outputDescription": "rows: Array of result row objects. rowCount: Number of rows returned.",
          "usageExample": {
            "scenario": "Fetch all users who signed up in the last 7 days",
            "inputValues": {
              "query": "SELECT id, name, email, created_at FROM users WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC",
              "parameters": "[]"
            },
            "expectedOutput": "Returns matching rows as objects. Iterate with a Loop node to process each user."
          },
          "externalDocsUrl": "https://www.postgresql.org/docs/current/"
        },
        {
          "name": "Insert",
          "value": "insert",
          "description": "Insert a new row into a PostgreSQL table.",
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
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Database table name",
              "helpText": "What this field is: The Database table name that tells PostgreSQL which item to use.\nWhere to find it: Open the item in PostgreSQL and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier PostgreSQL step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Row data to write as JSON",
              "helpText": "What this field is: Structured data for Row data to write as structured data in { } brackets.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "id": 42,
                "name": "Bob",
                "email": "bob@example.com",
                "created_at": "2025-01-15T10:00:00Z"
              }
            ],
            "rowCount": 1
          },
          "outputDescription": "rows: The inserted row(s) with all columns including auto-generated fields like id and created_at. rowCount: Number of rows inserted.",
          "usageExample": {
            "scenario": "Save a webhook event payload to a PostgreSQL events table",
            "inputValues": {
              "query": "INSERT INTO events (type, payload, created_at) VALUES ($1, $2, NOW()) RETURNING *",
              "parameters": "[\"{{$json.event_type}}\", \"{{$json.payload}}\"]"
            },
            "expectedOutput": "Row is inserted. `{{$json.rows[0].id}}` is the new record's primary key."
          },
          "externalDocsUrl": "https://www.postgresql.org/docs/current/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update rows in a PostgreSQL table.",
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
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Database table name",
              "helpText": "What this field is: The Database table name that tells PostgreSQL which item to use.\nWhere to find it: Open the item in PostgreSQL and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier PostgreSQL step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Row data to write as JSON",
              "helpText": "What this field is: Structured data for Row data to write as structured data in { } brackets.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "json",
              "required": false,
              "description": "Filter condition for update/delete",
              "helpText": "What this field is: Structured data for Filter condition.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.where}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "id": 42,
                "status": "fulfilled",
                "updated_at": "2025-01-15T11:00:00Z"
              }
            ],
            "rowCount": 1
          },
          "outputDescription": "rows: The updated row(s). rowCount: Number of rows affected.",
          "usageExample": {
            "scenario": "Mark an order as fulfilled when a payment webhook is received",
            "inputValues": {
              "query": "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
              "parameters": "[\"fulfilled\", \"{{$json.orderId}}\"]"
            },
            "expectedOutput": "Row is updated. `{{$json.rows[0].status}}` confirms the new value."
          },
          "externalDocsUrl": "https://www.postgresql.org/docs/current/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete rows from a PostgreSQL table.",
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
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Database table name",
              "helpText": "What this field is: The Database table name that tells PostgreSQL which item to use.\nWhere to find it: Open the item in PostgreSQL and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier PostgreSQL step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Where",
              "internalKey": "where",
              "type": "json",
              "required": false,
              "description": "Filter condition for update/delete",
              "helpText": "What this field is: Structured data for Filter condition.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by PostgreSQL.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.where}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}"
            }
          ],
          "outputExample": {
            "rowCount": 1
          },
          "outputDescription": "rowCount: Number of rows deleted. 0 means no matching rows were found.",
          "usageExample": {
            "scenario": "Delete expired session tokens from the database",
            "inputValues": {
              "query": "DELETE FROM sessions WHERE expires_at < NOW()",
              "parameters": "[]"
            },
            "expectedOutput": "`{{$json.rowCount}}` rows were deleted. Log this for audit purposes."
          },
          "externalDocsUrl": "https://www.postgresql.org/docs/current/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the PostgreSQL node."
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
