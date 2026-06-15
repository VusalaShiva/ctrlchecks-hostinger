import type { NodeDoc } from '../types';

export const odooDoc: NodeDoc = {
  "slug": "odoo",
  "displayName": "Odoo",
  "category": "Data",
  "logoUrl": "/icons/nodes/odoo.svg",
  "description": "Interact with Odoo ERP system (customers, invoices, products, and more)",
  "credentialType": "Odoo Credential",
  "credentialSetupSteps": [
    "What this is: The Odoo connection lets CtrlChecks access your Odoo account safely without putting secrets in workflow fields.",
    "Where to start: Odoo account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Odoo, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Odoo.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Odoo step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.odoo.com/documentation/16.0/developer/reference/external_api.html",
  "resources": [
    {
      "name": "Operations",
      "description": "Odoo exposes operation choices directly.",
      "operations": [
        {
          "name": "GetRecords",
          "value": "getRecords",
          "description": "GetRecords using the Odoo node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Odoo model name",
              "helpText": "What this field is: Odoo model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: res.partner.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "res.partner",
              "example": "res.partner"
            },
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "json",
              "required": false,
              "description": "Odoo domain filter (for getRecords)",
              "helpText": "What this field is: The Odoo domain filter that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [[\"active\",\"=\",true]].\nTip: Use {{$json.domain}} when an earlier Odoo step provides this value.",
              "placeholder": "[[\"active\",\"=\",true]]",
              "example": "[[\"active\",\"=\",true]]"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Fields to return (empty = all fields)",
              "helpText": "What this field is: Structured data for Fields to return.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [\"id\",\"name\",\"email\"].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[\"id\",\"name\",\"email\"]",
              "example": "[\"id\",\"name\",\"email\"]"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of records to return",
              "helpText": "What this field is: The number used for Maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Pagination offset",
              "helpText": "What this field is: The number used for Pagination offset.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Field values for create/update operations",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}.\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "number",
              "required": false,
              "description": "Record ID for update/delete operations",
              "helpText": "What this field is: The Record ID that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 42.\nTip: Use {{$json.recordId}} when an earlier Odoo step provides this value.",
              "placeholder": "42",
              "example": "42"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "Custom method name for executeMethod operation",
              "helpText": "What this field is: Custom method name for executeMethod operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: action_confirm.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "action_confirm",
              "example": "action_confirm"
            },
            {
              "name": "Method Args",
              "internalKey": "methodArgs",
              "type": "json",
              "required": false,
              "description": "Positional arguments for executeMethod",
              "helpText": "What this field is: Structured data for Positional arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [].\nTip: Use {{$json.methodArgs}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]"
            },
            {
              "name": "Method Kwargs",
              "internalKey": "methodKwargs",
              "type": "json",
              "required": false,
              "description": "Keyword arguments for executeMethod",
              "helpText": "What this field is: Structured data for Keyword arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {}.\nTip: Use {{$json.methodKwargs}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}"
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
            "scenario": "Process incoming Odoo data with get records after a related upstream event is received",
            "inputValues": {
              "Model": "res.partner",
              "Domain": "[[\"active\",\"=\",true]]",
              "Fields": "[\"id\",\"name\",\"email\"]",
              "Limit": "100",
              "Offset": "0"
            },
            "expectedOutput": "Odoo returns structured get records data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.odoo.com/documentation/17.0/developer/reference/external_api.html"
        },
        {
          "name": "CreateRecord",
          "value": "createRecord",
          "description": "CreateRecord using the Odoo node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Odoo model name",
              "helpText": "What this field is: Odoo model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: res.partner.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "res.partner",
              "example": "res.partner"
            },
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "json",
              "required": false,
              "description": "Odoo domain filter (for getRecords)",
              "helpText": "What this field is: The Odoo domain filter that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [[\"active\",\"=\",true]].\nTip: Use {{$json.domain}} when an earlier Odoo step provides this value.",
              "placeholder": "[[\"active\",\"=\",true]]",
              "example": "[[\"active\",\"=\",true]]"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Fields to return (empty = all fields)",
              "helpText": "What this field is: Structured data for Fields to return.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [\"id\",\"name\",\"email\"].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[\"id\",\"name\",\"email\"]",
              "example": "[\"id\",\"name\",\"email\"]"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of records to return",
              "helpText": "What this field is: The number used for Maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Pagination offset",
              "helpText": "What this field is: The number used for Pagination offset.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Field values for create/update operations",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}.\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "number",
              "required": false,
              "description": "Record ID for update/delete operations",
              "helpText": "What this field is: The Record ID that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 42.\nTip: Use {{$json.recordId}} when an earlier Odoo step provides this value.",
              "placeholder": "42",
              "example": "42"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "Custom method name for executeMethod operation",
              "helpText": "What this field is: Custom method name for executeMethod operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: action_confirm.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "action_confirm",
              "example": "action_confirm"
            },
            {
              "name": "Method Args",
              "internalKey": "methodArgs",
              "type": "json",
              "required": false,
              "description": "Positional arguments for executeMethod",
              "helpText": "What this field is: Structured data for Positional arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [].\nTip: Use {{$json.methodArgs}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]"
            },
            {
              "name": "Method Kwargs",
              "internalKey": "methodKwargs",
              "type": "json",
              "required": false,
              "description": "Keyword arguments for executeMethod",
              "helpText": "What this field is: Structured data for Keyword arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {}.\nTip: Use {{$json.methodKwargs}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}"
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
            "scenario": "Process incoming Odoo data with create record after a related upstream event is received",
            "inputValues": {
              "Model": "res.partner",
              "Domain": "[[\"active\",\"=\",true]]",
              "Fields": "[\"id\",\"name\",\"email\"]",
              "Limit": "100",
              "Offset": "0"
            },
            "expectedOutput": "Odoo returns structured create record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.odoo.com/documentation/17.0/developer/reference/external_api.html"
        },
        {
          "name": "UpdateRecord",
          "value": "updateRecord",
          "description": "UpdateRecord using the Odoo node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Odoo model name",
              "helpText": "What this field is: Odoo model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: res.partner.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "res.partner",
              "example": "res.partner"
            },
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "json",
              "required": false,
              "description": "Odoo domain filter (for getRecords)",
              "helpText": "What this field is: The Odoo domain filter that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [[\"active\",\"=\",true]].\nTip: Use {{$json.domain}} when an earlier Odoo step provides this value.",
              "placeholder": "[[\"active\",\"=\",true]]",
              "example": "[[\"active\",\"=\",true]]"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Fields to return (empty = all fields)",
              "helpText": "What this field is: Structured data for Fields to return.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [\"id\",\"name\",\"email\"].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[\"id\",\"name\",\"email\"]",
              "example": "[\"id\",\"name\",\"email\"]"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of records to return",
              "helpText": "What this field is: The number used for Maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Pagination offset",
              "helpText": "What this field is: The number used for Pagination offset.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Field values for create/update operations",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}.\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "number",
              "required": false,
              "description": "Record ID for update/delete operations",
              "helpText": "What this field is: The Record ID that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 42.\nTip: Use {{$json.recordId}} when an earlier Odoo step provides this value.",
              "placeholder": "42",
              "example": "42"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "Custom method name for executeMethod operation",
              "helpText": "What this field is: Custom method name for executeMethod operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: action_confirm.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "action_confirm",
              "example": "action_confirm"
            },
            {
              "name": "Method Args",
              "internalKey": "methodArgs",
              "type": "json",
              "required": false,
              "description": "Positional arguments for executeMethod",
              "helpText": "What this field is: Structured data for Positional arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [].\nTip: Use {{$json.methodArgs}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]"
            },
            {
              "name": "Method Kwargs",
              "internalKey": "methodKwargs",
              "type": "json",
              "required": false,
              "description": "Keyword arguments for executeMethod",
              "helpText": "What this field is: Structured data for Keyword arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {}.\nTip: Use {{$json.methodKwargs}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}"
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
            "scenario": "Process incoming Odoo data with update record after a related upstream event is received",
            "inputValues": {
              "Model": "res.partner",
              "Domain": "[[\"active\",\"=\",true]]",
              "Fields": "[\"id\",\"name\",\"email\"]",
              "Limit": "100",
              "Offset": "0"
            },
            "expectedOutput": "Odoo returns structured update record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.odoo.com/documentation/17.0/developer/reference/external_api.html"
        },
        {
          "name": "DeleteRecord",
          "value": "deleteRecord",
          "description": "DeleteRecord using the Odoo node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Odoo model name",
              "helpText": "What this field is: Odoo model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: res.partner.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "res.partner",
              "example": "res.partner"
            },
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "json",
              "required": false,
              "description": "Odoo domain filter (for getRecords)",
              "helpText": "What this field is: The Odoo domain filter that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [[\"active\",\"=\",true]].\nTip: Use {{$json.domain}} when an earlier Odoo step provides this value.",
              "placeholder": "[[\"active\",\"=\",true]]",
              "example": "[[\"active\",\"=\",true]]"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Fields to return (empty = all fields)",
              "helpText": "What this field is: Structured data for Fields to return.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [\"id\",\"name\",\"email\"].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[\"id\",\"name\",\"email\"]",
              "example": "[\"id\",\"name\",\"email\"]"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of records to return",
              "helpText": "What this field is: The number used for Maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Pagination offset",
              "helpText": "What this field is: The number used for Pagination offset.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Field values for create/update operations",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}.\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "number",
              "required": false,
              "description": "Record ID for update/delete operations",
              "helpText": "What this field is: The Record ID that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 42.\nTip: Use {{$json.recordId}} when an earlier Odoo step provides this value.",
              "placeholder": "42",
              "example": "42"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "Custom method name for executeMethod operation",
              "helpText": "What this field is: Custom method name for executeMethod operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: action_confirm.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "action_confirm",
              "example": "action_confirm"
            },
            {
              "name": "Method Args",
              "internalKey": "methodArgs",
              "type": "json",
              "required": false,
              "description": "Positional arguments for executeMethod",
              "helpText": "What this field is: Structured data for Positional arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [].\nTip: Use {{$json.methodArgs}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]"
            },
            {
              "name": "Method Kwargs",
              "internalKey": "methodKwargs",
              "type": "json",
              "required": false,
              "description": "Keyword arguments for executeMethod",
              "helpText": "What this field is: Structured data for Keyword arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {}.\nTip: Use {{$json.methodKwargs}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}"
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
            "scenario": "Process incoming Odoo data with delete record after a related upstream event is received",
            "inputValues": {
              "Model": "res.partner",
              "Domain": "[[\"active\",\"=\",true]]",
              "Fields": "[\"id\",\"name\",\"email\"]",
              "Limit": "100",
              "Offset": "0"
            },
            "expectedOutput": "Odoo returns structured delete record data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.odoo.com/documentation/17.0/developer/reference/external_api.html"
        },
        {
          "name": "ExecuteMethod",
          "value": "executeMethod",
          "description": "ExecuteMethod using the Odoo node.",
          "fields": [
            {
              "name": "Model",
              "internalKey": "model",
              "type": "string",
              "required": true,
              "description": "Odoo model name",
              "helpText": "What this field is: Odoo model name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: res.partner.\nTip: Use {{$json.model}} when this value comes from an earlier step.",
              "placeholder": "res.partner",
              "example": "res.partner"
            },
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "json",
              "required": false,
              "description": "Odoo domain filter (for getRecords)",
              "helpText": "What this field is: The Odoo domain filter that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [[\"active\",\"=\",true]].\nTip: Use {{$json.domain}} when an earlier Odoo step provides this value.",
              "placeholder": "[[\"active\",\"=\",true]]",
              "example": "[[\"active\",\"=\",true]]"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Fields to return (empty = all fields)",
              "helpText": "What this field is: Structured data for Fields to return.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [\"id\",\"name\",\"email\"].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[\"id\",\"name\",\"email\"]",
              "example": "[\"id\",\"name\",\"email\"]"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of records to return",
              "helpText": "What this field is: The number used for Maximum number of records to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            },
            {
              "name": "Offset",
              "internalKey": "offset",
              "type": "number",
              "required": false,
              "description": "Pagination offset",
              "helpText": "What this field is: The number used for Pagination offset.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.offset}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Field values for create/update operations",
              "helpText": "What this field is: Structured data for Field values.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}.\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"info@acme.com\"}"
            },
            {
              "name": "Record Id",
              "internalKey": "recordId",
              "type": "number",
              "required": false,
              "description": "Record ID for update/delete operations",
              "helpText": "What this field is: The Record ID that tells Odoo which item to use.\nWhere to find it: Open the item in Odoo and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 42.\nTip: Use {{$json.recordId}} when an earlier Odoo step provides this value.",
              "placeholder": "42",
              "example": "42"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "Custom method name for executeMethod operation",
              "helpText": "What this field is: Custom method name for executeMethod operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: action_confirm.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "action_confirm",
              "example": "action_confirm"
            },
            {
              "name": "Method Args",
              "internalKey": "methodArgs",
              "type": "json",
              "required": false,
              "description": "Positional arguments for executeMethod",
              "helpText": "What this field is: Structured data for Positional arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: [].\nTip: Use {{$json.methodArgs}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]"
            },
            {
              "name": "Method Kwargs",
              "internalKey": "methodKwargs",
              "type": "json",
              "required": false,
              "description": "Keyword arguments for executeMethod",
              "helpText": "What this field is: Structured data for Keyword arguments for executeMethod.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Odoo.\nExample: {}.\nTip: Use {{$json.methodKwargs}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}"
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
            "scenario": "Process incoming Odoo data with execute method after a related upstream event is received",
            "inputValues": {
              "Model": "res.partner",
              "Domain": "[[\"active\",\"=\",true]]",
              "Fields": "[\"id\",\"name\",\"email\"]",
              "Limit": "100",
              "Offset": "0"
            },
            "expectedOutput": "Odoo returns structured execute method data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.odoo.com/documentation/17.0/developer/reference/external_api.html"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Odoo node."
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
