import type { NodeDoc } from '../types';

export const sqlServerDoc: NodeDoc = {
  "slug": "sql_server",
  "displayName": "SQL Server",
  "category": "Data",
  "logoUrl": "/icons/nodes/sql_server.svg",
  "description": "Connect to and query Microsoft SQL Server databases.",
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
      "description": "SQL Server exposes operation choices directly.",
      "operations": [
        {
          "name": "ExecuteQuery",
          "value": "executeQuery",
          "description": "ExecuteQuery using the SQL Server node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "SQL Server hostname",
              "helpText": "What this field is: SQL Server hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "SQL Server port",
              "helpText": "What this field is: The number used for SQL Server port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1433.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "1433",
              "example": "1433",
              "defaultValue": "1433"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "SQL Server username",
              "helpText": "What this field is: SQL Server username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "SQL Server password",
              "helpText": "What this field is: SQL Server token, a secret password that lets CtrlChecks talk to SQL Server safely.\nWhere to find it: SQL Server account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SQL Server.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier SQL Server step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Encrypt",
              "internalKey": "encrypt",
              "type": "boolean",
              "required": false,
              "description": "Enable encryption",
              "helpText": "What this field is: An on/off switch for Enable encryption.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use encrypt; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Trust Server Certificate",
              "internalKey": "trustServerCertificate",
              "type": "boolean",
              "required": false,
              "description": "Trust server certificate",
              "helpText": "What this field is: An on/off switch for Trust server certificate.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use trust server certificate; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SQL Server.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier SQL Server step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Procedure Name",
              "internalKey": "procedureName",
              "type": "string",
              "required": false,
              "description": "Stored procedure name",
              "helpText": "What this field is: Stored procedure name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Procedure Name value.\nTip: Use {{$json.procedureName}} when this value comes from an earlier step.",
              "placeholder": "Enter Procedure Name"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "executeQuery",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming SQL Server data with execute query after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "1433",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "SQL Server returns structured execute query data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Insert",
          "value": "insert",
          "description": "Insert using the SQL Server node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "SQL Server hostname",
              "helpText": "What this field is: SQL Server hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "SQL Server port",
              "helpText": "What this field is: The number used for SQL Server port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1433.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "1433",
              "example": "1433",
              "defaultValue": "1433"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "SQL Server username",
              "helpText": "What this field is: SQL Server username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "SQL Server password",
              "helpText": "What this field is: SQL Server token, a secret password that lets CtrlChecks talk to SQL Server safely.\nWhere to find it: SQL Server account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SQL Server.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier SQL Server step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Encrypt",
              "internalKey": "encrypt",
              "type": "boolean",
              "required": false,
              "description": "Enable encryption",
              "helpText": "What this field is: An on/off switch for Enable encryption.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use encrypt; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Trust Server Certificate",
              "internalKey": "trustServerCertificate",
              "type": "boolean",
              "required": false,
              "description": "Trust server certificate",
              "helpText": "What this field is: An on/off switch for Trust server certificate.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use trust server certificate; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SQL Server.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier SQL Server step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Procedure Name",
              "internalKey": "procedureName",
              "type": "string",
              "required": false,
              "description": "Stored procedure name",
              "helpText": "What this field is: Stored procedure name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Procedure Name value.\nTip: Use {{$json.procedureName}} when this value comes from an earlier step.",
              "placeholder": "Enter Procedure Name"
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
            "scenario": "Process incoming SQL Server data with insert after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "1433",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "SQL Server returns structured insert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the SQL Server node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "SQL Server hostname",
              "helpText": "What this field is: SQL Server hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "SQL Server port",
              "helpText": "What this field is: The number used for SQL Server port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1433.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "1433",
              "example": "1433",
              "defaultValue": "1433"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "SQL Server username",
              "helpText": "What this field is: SQL Server username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "SQL Server password",
              "helpText": "What this field is: SQL Server token, a secret password that lets CtrlChecks talk to SQL Server safely.\nWhere to find it: SQL Server account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SQL Server.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier SQL Server step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Encrypt",
              "internalKey": "encrypt",
              "type": "boolean",
              "required": false,
              "description": "Enable encryption",
              "helpText": "What this field is: An on/off switch for Enable encryption.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use encrypt; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Trust Server Certificate",
              "internalKey": "trustServerCertificate",
              "type": "boolean",
              "required": false,
              "description": "Trust server certificate",
              "helpText": "What this field is: An on/off switch for Trust server certificate.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use trust server certificate; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SQL Server.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier SQL Server step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Procedure Name",
              "internalKey": "procedureName",
              "type": "string",
              "required": false,
              "description": "Stored procedure name",
              "helpText": "What this field is: Stored procedure name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Procedure Name value.\nTip: Use {{$json.procedureName}} when this value comes from an earlier step.",
              "placeholder": "Enter Procedure Name"
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
            "scenario": "Process incoming SQL Server data with update after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "1433",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "SQL Server returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the SQL Server node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "SQL Server hostname",
              "helpText": "What this field is: SQL Server hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "SQL Server port",
              "helpText": "What this field is: The number used for SQL Server port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1433.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "1433",
              "example": "1433",
              "defaultValue": "1433"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "SQL Server username",
              "helpText": "What this field is: SQL Server username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "SQL Server password",
              "helpText": "What this field is: SQL Server token, a secret password that lets CtrlChecks talk to SQL Server safely.\nWhere to find it: SQL Server account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SQL Server.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier SQL Server step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Encrypt",
              "internalKey": "encrypt",
              "type": "boolean",
              "required": false,
              "description": "Enable encryption",
              "helpText": "What this field is: An on/off switch for Enable encryption.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use encrypt; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Trust Server Certificate",
              "internalKey": "trustServerCertificate",
              "type": "boolean",
              "required": false,
              "description": "Trust server certificate",
              "helpText": "What this field is: An on/off switch for Trust server certificate.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use trust server certificate; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SQL Server.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier SQL Server step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Procedure Name",
              "internalKey": "procedureName",
              "type": "string",
              "required": false,
              "description": "Stored procedure name",
              "helpText": "What this field is: Stored procedure name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Procedure Name value.\nTip: Use {{$json.procedureName}} when this value comes from an earlier step.",
              "placeholder": "Enter Procedure Name"
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
            "scenario": "Process incoming SQL Server data with delete after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "1433",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "SQL Server returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "StoredProcedure",
          "value": "storedProcedure",
          "description": "StoredProcedure using the SQL Server node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "SQL Server hostname",
              "helpText": "What this field is: SQL Server hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "SQL Server port",
              "helpText": "What this field is: The number used for SQL Server port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1433.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "1433",
              "example": "1433",
              "defaultValue": "1433"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "SQL Server username",
              "helpText": "What this field is: SQL Server username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "SQL Server password",
              "helpText": "What this field is: SQL Server token, a secret password that lets CtrlChecks talk to SQL Server safely.\nWhere to find it: SQL Server account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SQL Server.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier SQL Server step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Encrypt",
              "internalKey": "encrypt",
              "type": "boolean",
              "required": false,
              "description": "Enable encryption",
              "helpText": "What this field is: An on/off switch for Enable encryption.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use encrypt; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Trust Server Certificate",
              "internalKey": "trustServerCertificate",
              "type": "boolean",
              "required": false,
              "description": "Trust server certificate",
              "helpText": "What this field is: An on/off switch for Trust server certificate.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use trust server certificate; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "SQL query",
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SQL Server.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells SQL Server which item to use.\nWhere to find it: Open the item in SQL Server and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier SQL Server step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Procedure Name",
              "internalKey": "procedureName",
              "type": "string",
              "required": false,
              "description": "Stored procedure name",
              "helpText": "What this field is: Stored procedure name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Procedure Name value.\nTip: Use {{$json.procedureName}} when this value comes from an earlier step.",
              "placeholder": "Enter Procedure Name"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "storedProcedure",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming SQL Server data with stored procedure after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "1433",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "SQL Server returns structured stored procedure data that downstream nodes can reference with {{$json.fieldName}}."
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
