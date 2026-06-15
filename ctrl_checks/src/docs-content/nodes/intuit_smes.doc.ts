import type { NodeDoc } from '../types';

export const intuitSmesDoc: NodeDoc = {
  "slug": "intuit_smes",
  "displayName": "Intuit - SME'S",
  "category": "Data",
  "logoUrl": "/icons/nodes/intuit_smes.svg",
  "description": "Intuit SME integration for managing customer data and financial operations via Intuit APIs",
  "credentialType": "Intuit Credential",
  "credentialSetupSteps": [
    "What this is: The Intuit - SME'S connection lets CtrlChecks access your Intuit - SME'S account safely without putting secrets in workflow fields.",
    "Where to start: Intuit - SME'S account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Intuit - SME'S, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Intuit - SME'S.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Intuit - SME'S step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/get-started",
  "resources": [
    {
      "name": "Operations",
      "description": "Intuit - SME'S exposes operation choices directly.",
      "operations": [
        {
          "name": "GetCustomers",
          "value": "getCustomers",
          "description": "GetCustomers using the Intuit - SME'S node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Intuit API Key or Access Token (required for authentication)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-intuit-api-key",
              "example": "your-intuit-api-key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Intuit OAuth2 Access Token (alternative to API key)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID (required for customer-specific operations)",
              "helpText": "What this field is: The Customer ID that tells Intuit - SME'S which item to use.\nWhere to find it: Open the item in Intuit - SME'S and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: CUST-123.\nTip: Use {{$json.customerId}} when an earlier Intuit - SME'S step provides this value.",
              "placeholder": "CUST-123",
              "example": "CUST-123"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer operation)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Acme Corp.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Acme Corp",
              "example": "Acme Corp"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer operation)",
              "helpText": "What this field is: The email address that Intuit - SME'S should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "contact@acme.com",
              "example": "contact@acme.com"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Invoice amount (for createInvoice operation)",
              "helpText": "What this field is: The number used for Invoice amount.\nHow to fill it: Enter digits only, using the unit expected by Intuit - SME'S. Check whether the service expects cents or a normal decimal amount.\nExample: 1000.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Additional data for create/update operations",
              "helpText": "What this field is: Structured data for Additional data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Intuit - SME'S.\nExample: {\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}"
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
            "scenario": "Process incoming Intuit - SME'S data with get customers after a related upstream event is received",
            "inputValues": {
              "Api Key": "your-intuit-api-key",
              "Access Token": "your-oauth-access-token",
              "Customer Id": "CUST-123",
              "Name": "Acme Corp",
              "Email": "contact@acme.com"
            },
            "expectedOutput": "Intuit - SME'S returns structured get customers data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account"
        },
        {
          "name": "CreateInvoice",
          "value": "createInvoice",
          "description": "CreateInvoice using the Intuit - SME'S node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Intuit API Key or Access Token (required for authentication)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-intuit-api-key",
              "example": "your-intuit-api-key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Intuit OAuth2 Access Token (alternative to API key)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID (required for customer-specific operations)",
              "helpText": "What this field is: The Customer ID that tells Intuit - SME'S which item to use.\nWhere to find it: Open the item in Intuit - SME'S and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: CUST-123.\nTip: Use {{$json.customerId}} when an earlier Intuit - SME'S step provides this value.",
              "placeholder": "CUST-123",
              "example": "CUST-123"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer operation)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Acme Corp.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Acme Corp",
              "example": "Acme Corp"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer operation)",
              "helpText": "What this field is: The email address that Intuit - SME'S should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "contact@acme.com",
              "example": "contact@acme.com"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Invoice amount (for createInvoice operation)",
              "helpText": "What this field is: The number used for Invoice amount.\nHow to fill it: Enter digits only, using the unit expected by Intuit - SME'S. Check whether the service expects cents or a normal decimal amount.\nExample: 1000.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Additional data for create/update operations",
              "helpText": "What this field is: Structured data for Additional data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Intuit - SME'S.\nExample: {\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}"
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
            "scenario": "Process incoming Intuit - SME'S data with create invoice after a related upstream event is received",
            "inputValues": {
              "Api Key": "your-intuit-api-key",
              "Access Token": "your-oauth-access-token",
              "Customer Id": "CUST-123",
              "Name": "Acme Corp",
              "Email": "contact@acme.com"
            },
            "expectedOutput": "Intuit - SME'S returns structured create invoice data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account"
        },
        {
          "name": "GetInvoices",
          "value": "getInvoices",
          "description": "GetInvoices using the Intuit - SME'S node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Intuit API Key or Access Token (required for authentication)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-intuit-api-key",
              "example": "your-intuit-api-key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Intuit OAuth2 Access Token (alternative to API key)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID (required for customer-specific operations)",
              "helpText": "What this field is: The Customer ID that tells Intuit - SME'S which item to use.\nWhere to find it: Open the item in Intuit - SME'S and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: CUST-123.\nTip: Use {{$json.customerId}} when an earlier Intuit - SME'S step provides this value.",
              "placeholder": "CUST-123",
              "example": "CUST-123"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer operation)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Acme Corp.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Acme Corp",
              "example": "Acme Corp"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer operation)",
              "helpText": "What this field is: The email address that Intuit - SME'S should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "contact@acme.com",
              "example": "contact@acme.com"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Invoice amount (for createInvoice operation)",
              "helpText": "What this field is: The number used for Invoice amount.\nHow to fill it: Enter digits only, using the unit expected by Intuit - SME'S. Check whether the service expects cents or a normal decimal amount.\nExample: 1000.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Additional data for create/update operations",
              "helpText": "What this field is: Structured data for Additional data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Intuit - SME'S.\nExample: {\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}"
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
            "scenario": "Process incoming Intuit - SME'S data with get invoices after a related upstream event is received",
            "inputValues": {
              "Api Key": "your-intuit-api-key",
              "Access Token": "your-oauth-access-token",
              "Customer Id": "CUST-123",
              "Name": "Acme Corp",
              "Email": "contact@acme.com"
            },
            "expectedOutput": "Intuit - SME'S returns structured get invoices data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account"
        },
        {
          "name": "CreateCustomer",
          "value": "createCustomer",
          "description": "CreateCustomer using the Intuit - SME'S node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Intuit API Key or Access Token (required for authentication)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-intuit-api-key",
              "example": "your-intuit-api-key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Intuit OAuth2 Access Token (alternative to API key)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID (required for customer-specific operations)",
              "helpText": "What this field is: The Customer ID that tells Intuit - SME'S which item to use.\nWhere to find it: Open the item in Intuit - SME'S and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: CUST-123.\nTip: Use {{$json.customerId}} when an earlier Intuit - SME'S step provides this value.",
              "placeholder": "CUST-123",
              "example": "CUST-123"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer operation)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Acme Corp.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Acme Corp",
              "example": "Acme Corp"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer operation)",
              "helpText": "What this field is: The email address that Intuit - SME'S should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "contact@acme.com",
              "example": "contact@acme.com"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Invoice amount (for createInvoice operation)",
              "helpText": "What this field is: The number used for Invoice amount.\nHow to fill it: Enter digits only, using the unit expected by Intuit - SME'S. Check whether the service expects cents or a normal decimal amount.\nExample: 1000.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Additional data for create/update operations",
              "helpText": "What this field is: Structured data for Additional data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Intuit - SME'S.\nExample: {\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}"
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
            "scenario": "Process incoming Intuit - SME'S data with create customer after a related upstream event is received",
            "inputValues": {
              "Api Key": "your-intuit-api-key",
              "Access Token": "your-oauth-access-token",
              "Customer Id": "CUST-123",
              "Name": "Acme Corp",
              "Email": "contact@acme.com"
            },
            "expectedOutput": "Intuit - SME'S returns structured create customer data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account"
        },
        {
          "name": "UpdateCustomer",
          "value": "updateCustomer",
          "description": "UpdateCustomer using the Intuit - SME'S node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Intuit API Key or Access Token (required for authentication)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-intuit-api-key",
              "example": "your-intuit-api-key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Intuit OAuth2 Access Token (alternative to API key)",
              "helpText": "What this field is: Intuit - SME'S token, a secret password that lets CtrlChecks talk to Intuit - SME'S safely.\nWhere to find it: Intuit - SME'S account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Intuit - SME'S.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID (required for customer-specific operations)",
              "helpText": "What this field is: The Customer ID that tells Intuit - SME'S which item to use.\nWhere to find it: Open the item in Intuit - SME'S and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: CUST-123.\nTip: Use {{$json.customerId}} when an earlier Intuit - SME'S step provides this value.",
              "placeholder": "CUST-123",
              "example": "CUST-123"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer operation)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Acme Corp.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Acme Corp",
              "example": "Acme Corp"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer operation)",
              "helpText": "What this field is: The email address that Intuit - SME'S should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "contact@acme.com",
              "example": "contact@acme.com"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Invoice amount (for createInvoice operation)",
              "helpText": "What this field is: The number used for Invoice amount.\nHow to fill it: Enter digits only, using the unit expected by Intuit - SME'S. Check whether the service expects cents or a normal decimal amount.\nExample: 1000.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Additional data for create/update operations",
              "helpText": "What this field is: Structured data for Additional data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Intuit - SME'S.\nExample: {\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}",
              "example": "{\"name\":\"Acme Corp\",\"email\":\"contact@acme.com\"}"
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
            "scenario": "Process incoming Intuit - SME'S data with update customer after a related upstream event is received",
            "inputValues": {
              "Api Key": "your-intuit-api-key",
              "Access Token": "your-oauth-access-token",
              "Customer Id": "CUST-123",
              "Name": "Acme Corp",
              "Email": "contact@acme.com"
            },
            "expectedOutput": "Intuit - SME'S returns structured update customer data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Intuit - SME'S node."
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
