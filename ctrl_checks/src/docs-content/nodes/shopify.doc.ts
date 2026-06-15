import type { NodeDoc } from '../types';

export const shopifyDoc: NodeDoc = {
  "slug": "shopify",
  "displayName": "Shopify",
  "category": "Data",
  "logoUrl": "/icons/nodes/shopify.svg",
  "description": "Shopify store operations",
  "credentialType": "Shopify API Key",
  "credentialSetupSteps": [
    "What this is: The Shopify connection lets CtrlChecks access your Shopify account safely without putting secrets in workflow fields.",
    "Where to start: Shopify Admin -> Apps -> Develop apps -> your app -> API credentials.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Shopify, then sign in or paste the secret value requested there.",
    "Example: shpat_... for custom apps, or the access token Shopify gives your app.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Shopify step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://shopify.dev/docs/apps/auth/admin-app-access-tokens",
  "resources": [
    {
      "name": "Operations",
      "description": "Shopify exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Shopify node.",
          "fields": [
            {
              "name": "Shop Domain",
              "internalKey": "shopDomain",
              "type": "string",
              "required": false,
              "description": "Shopify shop domain (e.g., your-store.myshopify.com)",
              "helpText": "What this field is: The Shopify shop domain that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: my-store.myshopify.com.\nTip: Use {{$json.shopDomain}} when an earlier Shopify step provides this value.",
              "placeholder": "my-store.myshopify.com",
              "example": "my-store.myshopify.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Shopify Admin API access token (optional if stored in vault under key \"shopify\")",
              "helpText": "What this field is: Shopify Admin API access token, a secret password that lets CtrlChecks talk to Shopify safely.\nWhere to find it: Shopify Admin -> Apps -> Develop apps -> your app -> API credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: shpat_... for custom apps, or the access token Shopify gives your app.\nImportant: Treat this like a bank password. The token must have scopes for the resources this workflow reads or writes.",
              "placeholder": "shpat_...",
              "example": "shpat_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The Shopify entity type to work with.\nOptions: product, order, customer.\nExample: product to manage your catalog, order to track/update orders, customer to look up buyers.\nTip: The resource determines which Shopify API endpoint is called.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete). Alias for productId/orderId/customerId.",
              "helpText": "What this field is: The Resource ID . Alias that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.id}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Product Id",
              "internalKey": "productId",
              "type": "string",
              "required": false,
              "description": "Product ID",
              "helpText": "What this field is: The Product ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.productId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Order Id",
              "internalKey": "orderId",
              "type": "string",
              "required": false,
              "description": "Order ID",
              "helpText": "What this field is: The Shopify order number.\nWhere to find it: Shopify Admin → Orders — the # column shows order IDs.\nExample: 1234 or gid://shopify/Order/1234",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.customerId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update (resource wrapper is added automatically)",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Shopify.\nExample: {\"title\":\"New product\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"New product\"}",
              "example": "{\"title\":\"New product\"}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "List limit (for list operation)",
              "helpText": "What this field is: The number used for List limit.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
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
            "scenario": "Process incoming Shopify data with get after a related upstream event is received",
            "inputValues": {
              "Shop Domain": "my-store.myshopify.com",
              "Api Key": "shpat_...",
              "Resource": "product",
              "Id": "1234567890",
              "Product Id": "1234567890"
            },
            "expectedOutput": "Shopify returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://shopify.dev/docs/api/admin-rest"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Shopify node.",
          "fields": [
            {
              "name": "Shop Domain",
              "internalKey": "shopDomain",
              "type": "string",
              "required": false,
              "description": "Shopify shop domain (e.g., your-store.myshopify.com)",
              "helpText": "What this field is: The Shopify shop domain that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: my-store.myshopify.com.\nTip: Use {{$json.shopDomain}} when an earlier Shopify step provides this value.",
              "placeholder": "my-store.myshopify.com",
              "example": "my-store.myshopify.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Shopify Admin API access token (optional if stored in vault under key \"shopify\")",
              "helpText": "What this field is: Shopify Admin API access token, a secret password that lets CtrlChecks talk to Shopify safely.\nWhere to find it: Shopify Admin -> Apps -> Develop apps -> your app -> API credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: shpat_... for custom apps, or the access token Shopify gives your app.\nImportant: Treat this like a bank password. The token must have scopes for the resources this workflow reads or writes.",
              "placeholder": "shpat_...",
              "example": "shpat_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The Shopify entity type to work with.\nOptions: product, order, customer.\nExample: product to manage your catalog, order to track/update orders, customer to look up buyers.\nTip: The resource determines which Shopify API endpoint is called.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete). Alias for productId/orderId/customerId.",
              "helpText": "What this field is: The Resource ID . Alias that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.id}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Product Id",
              "internalKey": "productId",
              "type": "string",
              "required": false,
              "description": "Product ID",
              "helpText": "What this field is: The Product ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.productId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Order Id",
              "internalKey": "orderId",
              "type": "string",
              "required": false,
              "description": "Order ID",
              "helpText": "What this field is: The Order ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.orderId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.customerId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update (resource wrapper is added automatically)",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Shopify.\nExample: {\"title\":\"New product\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"New product\"}",
              "example": "{\"title\":\"New product\"}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "List limit (for list operation)",
              "helpText": "What this field is: The number used for List limit.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
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
            "scenario": "Process incoming Shopify data with create after a related upstream event is received",
            "inputValues": {
              "Shop Domain": "my-store.myshopify.com",
              "Api Key": "shpat_...",
              "Resource": "product",
              "Id": "1234567890",
              "Product Id": "1234567890"
            },
            "expectedOutput": "Shopify returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://shopify.dev/docs/api/admin-rest"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Shopify node.",
          "fields": [
            {
              "name": "Shop Domain",
              "internalKey": "shopDomain",
              "type": "string",
              "required": false,
              "description": "Shopify shop domain (e.g., your-store.myshopify.com)",
              "helpText": "What this field is: The Shopify shop domain that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: my-store.myshopify.com.\nTip: Use {{$json.shopDomain}} when an earlier Shopify step provides this value.",
              "placeholder": "my-store.myshopify.com",
              "example": "my-store.myshopify.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Shopify Admin API access token (optional if stored in vault under key \"shopify\")",
              "helpText": "What this field is: Shopify Admin API access token, a secret password that lets CtrlChecks talk to Shopify safely.\nWhere to find it: Shopify Admin -> Apps -> Develop apps -> your app -> API credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: shpat_... for custom apps, or the access token Shopify gives your app.\nImportant: Treat this like a bank password. The token must have scopes for the resources this workflow reads or writes.",
              "placeholder": "shpat_...",
              "example": "shpat_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The Shopify entity type to work with.\nOptions: product, order, customer.\nExample: product to manage your catalog, order to track/update orders, customer to look up buyers.\nTip: The resource determines which Shopify API endpoint is called.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete). Alias for productId/orderId/customerId.",
              "helpText": "What this field is: The Resource ID . Alias that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.id}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Product Id",
              "internalKey": "productId",
              "type": "string",
              "required": false,
              "description": "Product ID",
              "helpText": "What this field is: The Product ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.productId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Order Id",
              "internalKey": "orderId",
              "type": "string",
              "required": false,
              "description": "Order ID",
              "helpText": "What this field is: The Order ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.orderId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.customerId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update (resource wrapper is added automatically)",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Shopify.\nExample: {\"title\":\"New product\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"New product\"}",
              "example": "{\"title\":\"New product\"}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "List limit (for list operation)",
              "helpText": "What this field is: The number used for List limit.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
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
            "scenario": "Process incoming Shopify data with update after a related upstream event is received",
            "inputValues": {
              "Shop Domain": "my-store.myshopify.com",
              "Api Key": "shpat_...",
              "Resource": "product",
              "Id": "1234567890",
              "Product Id": "1234567890"
            },
            "expectedOutput": "Shopify returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://shopify.dev/docs/api/admin-rest"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Shopify node.",
          "fields": [
            {
              "name": "Shop Domain",
              "internalKey": "shopDomain",
              "type": "string",
              "required": false,
              "description": "Shopify shop domain (e.g., your-store.myshopify.com)",
              "helpText": "What this field is: The Shopify shop domain that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: my-store.myshopify.com.\nTip: Use {{$json.shopDomain}} when an earlier Shopify step provides this value.",
              "placeholder": "my-store.myshopify.com",
              "example": "my-store.myshopify.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Shopify Admin API access token (optional if stored in vault under key \"shopify\")",
              "helpText": "What this field is: Shopify Admin API access token, a secret password that lets CtrlChecks talk to Shopify safely.\nWhere to find it: Shopify Admin -> Apps -> Develop apps -> your app -> API credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: shpat_... for custom apps, or the access token Shopify gives your app.\nImportant: Treat this like a bank password. The token must have scopes for the resources this workflow reads or writes.",
              "placeholder": "shpat_...",
              "example": "shpat_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource: product, order, customer",
              "helpText": "What this field is: The Shopify entity type to work with.\nOptions: product, order, customer.\nExample: product to manage your catalog, order to track/update orders, customer to look up buyers.\nTip: The resource determines which Shopify API endpoint is called.",
              "placeholder": "product",
              "example": "product",
              "defaultValue": "product"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Resource ID (for get/update/delete). Alias for productId/orderId/customerId.",
              "helpText": "What this field is: The Resource ID . Alias that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.id}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Product Id",
              "internalKey": "productId",
              "type": "string",
              "required": false,
              "description": "Product ID",
              "helpText": "What this field is: The Product ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.productId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Order Id",
              "internalKey": "orderId",
              "type": "string",
              "required": false,
              "description": "Order ID",
              "helpText": "What this field is: The Order ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.orderId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Shopify which item to use.\nWhere to find it: Open the item in Shopify and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1234567890.\nTip: Use {{$json.customerId}} when an earlier Shopify step provides this value.",
              "placeholder": "1234567890",
              "example": "1234567890"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Payload for create/update (resource wrapper is added automatically)",
              "helpText": "What this field is: Structured data for Payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Shopify.\nExample: {\"title\":\"New product\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"title\":\"New product\"}",
              "example": "{\"title\":\"New product\"}"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "List limit (for list operation)",
              "helpText": "What this field is: The number used for List limit.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
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
            "scenario": "Process incoming Shopify data with delete after a related upstream event is received",
            "inputValues": {
              "Shop Domain": "my-store.myshopify.com",
              "Api Key": "shpat_...",
              "Resource": "product",
              "Id": "1234567890",
              "Product Id": "1234567890"
            },
            "expectedOutput": "Shopify returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://shopify.dev/docs/api/admin-rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Shopify node."
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
