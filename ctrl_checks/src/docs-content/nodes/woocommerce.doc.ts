import type { NodeDoc } from '../types';

export const woocommerceDoc: NodeDoc = {
  "slug": "woocommerce",
  "displayName": "WooCommerce",
  "category": "Data",
  "logoUrl": "/icons/nodes/woocommerce.svg",
  "description": "WooCommerce store operations",
  "credentialType": "WooCommerce API Key",
  "credentialSetupSteps": [
    "What this is: The WooCommerce connection lets CtrlChecks access your WooCommerce account safely without putting secrets in workflow fields.",
    "Where to start: WooCommerce account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> WooCommerce, then sign in or paste the secret value requested there.",
    "Example: the token format shown by WooCommerce.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple WooCommerce step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication",
  "resources": [
    {
      "name": "Operations",
      "description": "WooCommerce exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the WooCommerce node.",
          "fields": [
            {
              "name": "Store Url",
              "internalKey": "storeUrl",
              "type": "url",
              "required": false,
              "description": "WooCommerce store base URL (e.g., https://example.com)",
              "helpText": "What this field is: The web address for WooCommerce store base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com.\nTip: Use {{$json.storeUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com",
              "example": "https://example.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer key (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "ck_...",
              "example": "ck_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Api Secret",
              "internalKey": "apiSecret",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer secret (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "cs_...",
              "example": "cs_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The WooCommerce entity type to work with.\nOptions: product, order, customer.\nExample: order to manage store orders, product for catalog items, customer for buyer accounts.\nTip: Use the resource that matches the store entity you want to manage.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier WooCommerce step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WooCommerce.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Per Page",
              "internalKey": "perPage",
              "type": "number",
              "required": false,
              "description": "List page size",
              "helpText": "What this field is: The List page size that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 50.\nTip: Use {{$json.perPage}} when an earlier WooCommerce step provides this value.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming WooCommerce data with get after a related upstream event is received",
            "inputValues": {
              "Store Url": "https://example.com",
              "Api Key": "ck_...",
              "Api Secret": "cs_...",
              "Resource": "product",
              "Id": "123"
            },
            "expectedOutput": "WooCommerce returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://woocommerce.github.io/woocommerce-rest-api-docs/"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the WooCommerce node.",
          "fields": [
            {
              "name": "Store Url",
              "internalKey": "storeUrl",
              "type": "url",
              "required": false,
              "description": "WooCommerce store base URL (e.g., https://example.com)",
              "helpText": "What this field is: The web address for WooCommerce store base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com.\nTip: Use {{$json.storeUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com",
              "example": "https://example.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer key (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "ck_...",
              "example": "ck_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Api Secret",
              "internalKey": "apiSecret",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer secret (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "cs_...",
              "example": "cs_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The WooCommerce entity type to work with.\nOptions: product, order, customer.\nExample: order to manage store orders, product for catalog items, customer for buyer accounts.\nTip: Use the resource that matches the store entity you want to manage.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier WooCommerce step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WooCommerce.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Per Page",
              "internalKey": "perPage",
              "type": "number",
              "required": false,
              "description": "List page size",
              "helpText": "What this field is: The List page size that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 50.\nTip: Use {{$json.perPage}} when an earlier WooCommerce step provides this value.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming WooCommerce data with create after a related upstream event is received",
            "inputValues": {
              "Store Url": "https://example.com",
              "Api Key": "ck_...",
              "Api Secret": "cs_...",
              "Resource": "product",
              "Id": "123"
            },
            "expectedOutput": "WooCommerce returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://woocommerce.github.io/woocommerce-rest-api-docs/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the WooCommerce node.",
          "fields": [
            {
              "name": "Store Url",
              "internalKey": "storeUrl",
              "type": "url",
              "required": false,
              "description": "WooCommerce store base URL (e.g., https://example.com)",
              "helpText": "What this field is: The web address for WooCommerce store base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com.\nTip: Use {{$json.storeUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com",
              "example": "https://example.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer key (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "ck_...",
              "example": "ck_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Api Secret",
              "internalKey": "apiSecret",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer secret (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "cs_...",
              "example": "cs_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The WooCommerce entity type to work with.\nOptions: product, order, customer.\nExample: order to manage store orders, product for catalog items, customer for buyer accounts.\nTip: Use the resource that matches the store entity you want to manage.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier WooCommerce step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WooCommerce.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Per Page",
              "internalKey": "perPage",
              "type": "number",
              "required": false,
              "description": "List page size",
              "helpText": "What this field is: The List page size that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 50.\nTip: Use {{$json.perPage}} when an earlier WooCommerce step provides this value.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming WooCommerce data with update after a related upstream event is received",
            "inputValues": {
              "Store Url": "https://example.com",
              "Api Key": "ck_...",
              "Api Secret": "cs_...",
              "Resource": "product",
              "Id": "123"
            },
            "expectedOutput": "WooCommerce returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://woocommerce.github.io/woocommerce-rest-api-docs/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the WooCommerce node.",
          "fields": [
            {
              "name": "Store Url",
              "internalKey": "storeUrl",
              "type": "url",
              "required": false,
              "description": "WooCommerce store base URL (e.g., https://example.com)",
              "helpText": "What this field is: The web address for WooCommerce store base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com.\nTip: Use {{$json.storeUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com",
              "example": "https://example.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer key (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "ck_...",
              "example": "ck_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Api Secret",
              "internalKey": "apiSecret",
              "type": "password",
              "required": false,
              "description": "WooCommerce consumer secret (optional if stored in vault under key \"woocommerce\")",
              "helpText": "What this field is: WooCommerce token, a secret password that lets CtrlChecks talk to WooCommerce safely.\nWhere to find it: WooCommerce account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WooCommerce.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "cs_...",
              "example": "cs_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The WooCommerce entity type to work with.\nOptions: product, order, customer.\nExample: order to manage store orders, product for catalog items, customer for buyer accounts.\nTip: Use the resource that matches the store entity you want to manage.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete)",
              "helpText": "What this field is: The Resource ID that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.id}} when an earlier WooCommerce step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WooCommerce.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Per Page",
              "internalKey": "perPage",
              "type": "number",
              "required": false,
              "description": "List page size",
              "helpText": "What this field is: The List page size that tells WooCommerce which item to use.\nWhere to find it: Open the item in WooCommerce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 50.\nTip: Use {{$json.perPage}} when an earlier WooCommerce step provides this value.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
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
            "scenario": "Process incoming WooCommerce data with delete after a related upstream event is received",
            "inputValues": {
              "Store Url": "https://example.com",
              "Api Key": "ck_...",
              "Api Secret": "cs_...",
              "Resource": "product",
              "Id": "123"
            },
            "expectedOutput": "WooCommerce returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://woocommerce.github.io/woocommerce-rest-api-docs/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the WooCommerce node."
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
