import type { NodeDoc } from '../types';

export const sapDoc: NodeDoc = {
  "slug": "sap",
  "displayName": "SAP",
  "category": "Data",
  "logoUrl": "/icons/nodes/sap.svg",
  "description": "Interact with SAP systems via OData/REST APIs — read and write business objects such as sales orders, purchase orders, materials, customers, and more.",
  "credentialType": "SAP Credential",
  "credentialSetupSteps": [
    "What this is: The SAP connection lets CtrlChecks access your SAP account safely without putting secrets in workflow fields.",
    "Where to start: SAP account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> SAP, then sign in or paste the secret value requested there.",
    "Example: the token format shown by SAP.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple SAP step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://help.sap.com/docs/",
  "resources": [
    {
      "name": "Operations",
      "description": "SAP exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the SAP node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "SAP system base URL (e.g. https://your-sap-host:44300)",
              "helpText": "What this field is: The web address for SAP system base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://sap.example.com:44300.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://sap.example.com:44300",
              "example": "https://sap.example.com:44300"
            },
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "OData or REST endpoint path (relative to base URL)",
              "helpText": "What this field is: The web address for OData or REST endpoint path.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "example": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for POST/PUT/PATCH operations",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: {\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "example": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}"
            },
            {
              "name": "Query Params",
              "internalKey": "queryParams",
              "type": "string",
              "required": false,
              "description": "OData query string parameters (e.g. $top=10&$filter=...)",
              "helpText": "What this field is: Structured data for OData query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: $top=10&$select=SalesOrder,SoldToParty.\nTip: Use {{$json.queryParams}} when an earlier step already prepared this data.",
              "placeholder": "$top=10&$select=SalesOrder,SoldToParty",
              "example": "$top=10&$select=SalesOrder,SoldToParty"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 / SAML bearer token for SAP authentication (stored as credential)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "SAP Basic Auth username (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP Basic Auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "SAP Basic Auth password (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Csrf Token",
              "internalKey": "csrfToken",
              "type": "string",
              "required": false,
              "description": "X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)",
              "helpText": "What this field is: X-CSRF-Token value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: This field is used for POST/PUT/PATCH/DELETE on OData v2 services. Leave it blank when this operation does not need it.",
              "placeholder": "token_..."
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Response format preference",
              "helpText": "Options: Choose the response format this SAP step should use.\nHow to choose it: Pick json for structured data in { } brackets, or xml when the SAP endpoint expects XML text.\nExample: json.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json",
              "options": [
                "JSON",
                "XML"
              ]
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
            "scenario": "Process incoming SAP data with get after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://sap.example.com:44300",
              "Endpoint": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "Payload": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "Query Params": "$top=10&$select=SalesOrder,SoldToParty",
              "Access Token": ""
            },
            "expectedOutput": "SAP returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Post",
          "value": "post",
          "description": "Post using the SAP node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "SAP system base URL (e.g. https://your-sap-host:44300)",
              "helpText": "What this field is: The web address for SAP system base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://sap.example.com:44300.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://sap.example.com:44300",
              "example": "https://sap.example.com:44300"
            },
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "OData or REST endpoint path (relative to base URL)",
              "helpText": "What this field is: The web address for OData or REST endpoint path.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "example": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for POST/PUT/PATCH operations",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: {\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "example": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}"
            },
            {
              "name": "Query Params",
              "internalKey": "queryParams",
              "type": "string",
              "required": false,
              "description": "OData query string parameters (e.g. $top=10&$filter=...)",
              "helpText": "What this field is: Structured data for OData query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: $top=10&$select=SalesOrder,SoldToParty.\nTip: Use {{$json.queryParams}} when an earlier step already prepared this data.",
              "placeholder": "$top=10&$select=SalesOrder,SoldToParty",
              "example": "$top=10&$select=SalesOrder,SoldToParty"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 / SAML bearer token for SAP authentication (stored as credential)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "SAP Basic Auth username (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP Basic Auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "SAP Basic Auth password (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Csrf Token",
              "internalKey": "csrfToken",
              "type": "string",
              "required": false,
              "description": "X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)",
              "helpText": "What this field is: X-CSRF-Token value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: This field is used for POST/PUT/PATCH/DELETE on OData v2 services. Leave it blank when this operation does not need it.",
              "placeholder": "token_..."
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Response format preference",
              "helpText": "Options: Choose the response format this SAP step should use.\nHow to choose it: Pick json for structured data in { } brackets, or xml when the SAP endpoint expects XML text.\nExample: json.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json",
              "options": [
                "JSON",
                "XML"
              ]
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
            "scenario": "Process incoming SAP data with post after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://sap.example.com:44300",
              "Endpoint": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "Payload": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "Query Params": "$top=10&$select=SalesOrder,SoldToParty",
              "Access Token": ""
            },
            "expectedOutput": "SAP returns structured post data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Put",
          "value": "put",
          "description": "Put using the SAP node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "SAP system base URL (e.g. https://your-sap-host:44300)",
              "helpText": "What this field is: The web address for SAP system base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://sap.example.com:44300.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://sap.example.com:44300",
              "example": "https://sap.example.com:44300"
            },
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "OData or REST endpoint path (relative to base URL)",
              "helpText": "What this field is: The web address for OData or REST endpoint path.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "example": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for POST/PUT/PATCH operations",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: {\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "example": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}"
            },
            {
              "name": "Query Params",
              "internalKey": "queryParams",
              "type": "string",
              "required": false,
              "description": "OData query string parameters (e.g. $top=10&$filter=...)",
              "helpText": "What this field is: Structured data for OData query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: $top=10&$select=SalesOrder,SoldToParty.\nTip: Use {{$json.queryParams}} when an earlier step already prepared this data.",
              "placeholder": "$top=10&$select=SalesOrder,SoldToParty",
              "example": "$top=10&$select=SalesOrder,SoldToParty"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 / SAML bearer token for SAP authentication (stored as credential)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "SAP Basic Auth username (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP Basic Auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "SAP Basic Auth password (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Csrf Token",
              "internalKey": "csrfToken",
              "type": "string",
              "required": false,
              "description": "X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)",
              "helpText": "What this field is: X-CSRF-Token value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: This field is used for POST/PUT/PATCH/DELETE on OData v2 services. Leave it blank when this operation does not need it.",
              "placeholder": "token_..."
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Response format preference",
              "helpText": "Options: Choose the response format this SAP step should use.\nHow to choose it: Pick json for structured data in { } brackets, or xml when the SAP endpoint expects XML text.\nExample: json.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json",
              "options": [
                "JSON",
                "XML"
              ]
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
            "scenario": "Process incoming SAP data with put after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://sap.example.com:44300",
              "Endpoint": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "Payload": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "Query Params": "$top=10&$select=SalesOrder,SoldToParty",
              "Access Token": ""
            },
            "expectedOutput": "SAP returns structured put data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Patch",
          "value": "patch",
          "description": "Patch using the SAP node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "SAP system base URL (e.g. https://your-sap-host:44300)",
              "helpText": "What this field is: The web address for SAP system base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://sap.example.com:44300.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://sap.example.com:44300",
              "example": "https://sap.example.com:44300"
            },
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "OData or REST endpoint path (relative to base URL)",
              "helpText": "What this field is: The web address for OData or REST endpoint path.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "example": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for POST/PUT/PATCH operations",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: {\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "example": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}"
            },
            {
              "name": "Query Params",
              "internalKey": "queryParams",
              "type": "string",
              "required": false,
              "description": "OData query string parameters (e.g. $top=10&$filter=...)",
              "helpText": "What this field is: Structured data for OData query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: $top=10&$select=SalesOrder,SoldToParty.\nTip: Use {{$json.queryParams}} when an earlier step already prepared this data.",
              "placeholder": "$top=10&$select=SalesOrder,SoldToParty",
              "example": "$top=10&$select=SalesOrder,SoldToParty"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 / SAML bearer token for SAP authentication (stored as credential)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "SAP Basic Auth username (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP Basic Auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "SAP Basic Auth password (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Csrf Token",
              "internalKey": "csrfToken",
              "type": "string",
              "required": false,
              "description": "X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)",
              "helpText": "What this field is: X-CSRF-Token value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: This field is used for POST/PUT/PATCH/DELETE on OData v2 services. Leave it blank when this operation does not need it.",
              "placeholder": "token_..."
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Response format preference",
              "helpText": "Options: Choose the response format this SAP step should use.\nHow to choose it: Pick json for structured data in { } brackets, or xml when the SAP endpoint expects XML text.\nExample: json.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json",
              "options": [
                "JSON",
                "XML"
              ]
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
            "scenario": "Process incoming SAP data with patch after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://sap.example.com:44300",
              "Endpoint": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "Payload": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "Query Params": "$top=10&$select=SalesOrder,SoldToParty",
              "Access Token": ""
            },
            "expectedOutput": "SAP returns structured patch data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the SAP node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "SAP system base URL (e.g. https://your-sap-host:44300)",
              "helpText": "What this field is: The web address for SAP system base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://sap.example.com:44300.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://sap.example.com:44300",
              "example": "https://sap.example.com:44300"
            },
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "OData or REST endpoint path (relative to base URL)",
              "helpText": "What this field is: The web address for OData or REST endpoint path.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: /sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "example": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "json",
              "required": false,
              "description": "Request body for POST/PUT/PATCH operations",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: {\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "example": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}"
            },
            {
              "name": "Query Params",
              "internalKey": "queryParams",
              "type": "string",
              "required": false,
              "description": "OData query string parameters (e.g. $top=10&$filter=...)",
              "helpText": "What this field is: Structured data for OData query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by SAP.\nExample: $top=10&$select=SalesOrder,SoldToParty.\nTip: Use {{$json.queryParams}} when an earlier step already prepared this data.",
              "placeholder": "$top=10&$select=SalesOrder,SoldToParty",
              "example": "$top=10&$select=SalesOrder,SoldToParty"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 / SAML bearer token for SAP authentication (stored as credential)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "SAP Basic Auth username (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP Basic Auth username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": false,
              "description": "SAP Basic Auth password (used when no OAuth token is provided)",
              "helpText": "What this field is: SAP token, a secret password that lets CtrlChecks talk to SAP safely.\nWhere to find it: SAP account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by SAP.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Csrf Token",
              "internalKey": "csrfToken",
              "type": "string",
              "required": false,
              "description": "X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)",
              "helpText": "What this field is: X-CSRF-Token value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: This field is used for POST/PUT/PATCH/DELETE on OData v2 services. Leave it blank when this operation does not need it.",
              "placeholder": "token_..."
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Response format preference",
              "helpText": "Options: Choose the response format this SAP step should use.\nHow to choose it: Pick json for structured data in { } brackets, or xml when the SAP endpoint expects XML text.\nExample: json.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json",
              "options": [
                "JSON",
                "XML"
              ]
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
            "scenario": "Process incoming SAP data with delete after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://sap.example.com:44300",
              "Endpoint": "/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder",
              "Payload": "{\"SalesOrderType\":\"OR\",\"SoldToParty\":\"{{$json.customerId}}\"}",
              "Query Params": "$top=10&$select=SalesOrder,SoldToParty",
              "Access Token": ""
            },
            "expectedOutput": "SAP returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the SAP node."
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
