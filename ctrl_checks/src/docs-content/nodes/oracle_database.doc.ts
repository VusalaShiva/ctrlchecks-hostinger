import type { NodeDoc } from '../types';

export const oracleDatabaseDoc: NodeDoc = {
  "slug": "oracle_database",
  "displayName": "Oracle Database",
  "category": "Data",
  "logoUrl": "/icons/nodes/oracle_database.svg",
  "description": "Execute SQL and perform select, insert, update, upsert, and delete operations on Oracle Database.",
  "credentialType": "Oracle Credential",
  "credentialSetupSteps": [
    "What this is: The Oracle Database connection lets CtrlChecks access your Oracle Database account safely without putting secrets in workflow fields.",
    "Where to start: Oracle Database account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Oracle Database, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Oracle Database.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Oracle Database step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.oracle.com/en/database/oracle/oracle-database/19/netag/index.html",
  "resources": [
    {
      "name": "Operations",
      "description": "Oracle Database exposes operation choices directly.",
      "operations": [
        {
          "name": "Select",
          "value": "select",
          "description": "Select using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "select",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with select after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured select data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        },
        {
          "name": "Insert",
          "value": "insert",
          "description": "Insert using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "insert",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with insert after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured insert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "update",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with update after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        },
        {
          "name": "Insert or update",
          "value": "insert_or_update",
          "description": "Insert or update using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "insert_or_update",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with insert or update after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured insert or update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "delete",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with delete after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        },
        {
          "name": "Execute sql",
          "value": "execute_sql",
          "description": "Execute sql using the Oracle Database node.",
          "fields": [
            {
              "name": "User",
              "internalKey": "user",
              "type": "string",
              "required": true,
              "description": "Oracle username",
              "helpText": "What this field is: Oracle username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: User value.\nTip: Use {{$json.user}} when this value comes from an earlier step.",
              "placeholder": "Enter User"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "Oracle password",
              "helpText": "What this field is: Oracle Database token, a secret password that lets CtrlChecks talk to Oracle Database safely.\nWhere to find it: Oracle Database account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Oracle Database.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Connection String",
              "internalKey": "connectionString",
              "type": "string",
              "required": true,
              "description": "Oracle connection string",
              "helpText": "What this field is: Oracle connection string.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Connection String value.\nTip: Use {{$json.connectionString}} when this value comes from an earlier step.",
              "placeholder": "Enter Connection String"
            },
            {
              "name": "Schema",
              "internalKey": "schema",
              "type": "string",
              "required": false,
              "description": "Oracle schema",
              "helpText": "What this field is: Oracle schema.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Schema value.\nTip: Use {{$json.schema}} when this value comes from an earlier step.",
              "placeholder": "Enter Schema"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells Oracle Database which item to use.\nWhere to find it: Open the item in Oracle Database and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier Oracle Database step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Statement",
              "internalKey": "statement",
              "type": "string",
              "required": false,
              "description": "SQL statement for execute_sql",
              "helpText": "What this field is: SQL statement for execute_sql.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Statement value.\nTip: Use {{$json.statement}} when this value comes from an earlier step.",
              "placeholder": "Enter Statement"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max rows to return",
              "helpText": "What this field is: The number used for Max rows to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "execute_sql",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Oracle Database data with execute sql after a related upstream event is received",
            "inputValues": {
              "User": "",
              "Password": "",
              "Connection String": "",
              "Schema": "",
              "Table": ""
            },
            "expectedOutput": "Oracle Database returns structured execute sql data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://node-oracledb.readthedocs.io/en/latest/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Oracle Database node."
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
