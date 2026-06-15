import type { NodeDoc } from '../types';

export const timescaledbDoc: NodeDoc = {
  "slug": "timescaledb",
  "displayName": "TimescaleDB",
  "category": "Data",
  "logoUrl": "/icons/nodes/timescaledb.svg",
  "description": "Connect to and query TimescaleDB time-series databases (PostgreSQL extension).",
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
      "description": "TimescaleDB exposes operation choices directly.",
      "operations": [
        {
          "name": "ExecuteQuery",
          "value": "executeQuery",
          "description": "ExecuteQuery using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
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
            "scenario": "Process incoming TimescaleDB data with execute query after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured execute query data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Insert",
          "value": "insert",
          "description": "Insert using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
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
            "scenario": "Process incoming TimescaleDB data with insert after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured insert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
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
            "scenario": "Process incoming TimescaleDB data with update after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
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
            "scenario": "Process incoming TimescaleDB data with delete after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "TimeBucket",
          "value": "timeBucket",
          "description": "TimeBucket using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "timeBucket",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming TimescaleDB data with time bucket after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured time bucket data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "First",
          "value": "first",
          "description": "First using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "first",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming TimescaleDB data with first after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured first data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Last",
          "value": "last",
          "description": "Last using the TimescaleDB node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "TimescaleDB hostname",
              "helpText": "What this field is: TimescaleDB hostname.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Host value.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "Enter Host"
            },
            {
              "name": "Port",
              "internalKey": "port",
              "type": "number",
              "required": false,
              "description": "TimescaleDB port",
              "helpText": "What this field is: The number used for TimescaleDB port.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5432.\nTip: Use {{$json.port}} when the number comes from an earlier step.",
              "placeholder": "5432",
              "example": "5432",
              "defaultValue": "5432"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "TimescaleDB username",
              "helpText": "What this field is: TimescaleDB username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "TimescaleDB password",
              "helpText": "What this field is: TimescaleDB token, a secret password that lets CtrlChecks talk to TimescaleDB safely.\nWhere to find it: TimescaleDB account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by TimescaleDB.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Database",
              "internalKey": "database",
              "type": "string",
              "required": true,
              "description": "Database name",
              "helpText": "What this field is: The Database name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.database}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "Enter Database"
            },
            {
              "name": "Ssl",
              "internalKey": "ssl",
              "type": "boolean",
              "required": false,
              "description": "Enable SSL",
              "helpText": "What this field is: An on/off switch for Enable SSL.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use ssl; turn OFF for the default behavior.",
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
              "helpText": "What this field is: Structured data for SQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by TimescaleDB.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Table",
              "internalKey": "table",
              "type": "string",
              "required": true,
              "description": "Table name",
              "helpText": "What this field is: The Table name that tells TimescaleDB which item to use.\nWhere to find it: Open the item in TimescaleDB and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: customers.\nTip: Use {{$json.table}} when an earlier TimescaleDB step provides this value.",
              "placeholder": "customers"
            },
            {
              "name": "Time Column",
              "internalKey": "timeColumn",
              "type": "string",
              "required": false,
              "description": "Time column for timeBucket/first/last",
              "helpText": "What this field is: The date or time value for Time column.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeColumn}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Column"
            },
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "string",
              "required": false,
              "description": "Time interval",
              "helpText": "What this field is: Time interval.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Interval value.\nTip: Use {{$json.interval}} when this value comes from an earlier step.",
              "placeholder": "Enter Interval"
            },
            {
              "name": "Value Column",
              "internalKey": "valueColumn",
              "type": "string",
              "required": false,
              "description": "Value column for first/last",
              "helpText": "What this field is: Value column.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Value Column value.\nTip: Use {{$json.valueColumn}} when this value comes from an earlier step.",
              "placeholder": "Enter Value Column"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "last",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming TimescaleDB data with last after a related upstream event is received",
            "inputValues": {
              "Host": "",
              "Port": "5432",
              "Username": "",
              "Password": "",
              "Database": ""
            },
            "expectedOutput": "TimescaleDB returns structured last data that downstream nodes can reference with {{$json.fieldName}}."
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
