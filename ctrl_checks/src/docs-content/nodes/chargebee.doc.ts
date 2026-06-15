import type { NodeDoc } from '../types';

export const chargebeeDoc: NodeDoc = {
  "slug": "chargebee",
  "displayName": "Chargebee",
  "category": "Communication",
  "logoUrl": "/icons/nodes/chargebee.svg",
  "description": "Create customers, manage subscriptions, and automate billing with Chargebee.",
  "credentialType": "Chargebee API Key",
  "credentialSetupSteps": [
    "What this is: The Chargebee connection lets CtrlChecks access your Chargebee account safely without putting secrets in workflow fields.",
    "Where to start: Chargebee account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Chargebee, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Chargebee.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Chargebee step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://apidocs.chargebee.com/docs/api",
  "resources": [
    {
      "name": "Operations",
      "description": "Chargebee exposes operation choices directly.",
      "operations": [
        {
          "name": "Create customer",
          "value": "create_customer",
          "description": "Create and manage subscriptions, customers, and invoices in Chargebee.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Chargebee API key",
              "helpText": "What this field is: Chargebee token, a secret password that lets CtrlChecks talk to Chargebee safely.\nWhere to find it: Chargebee account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Chargebee.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Site",
              "internalKey": "site",
              "type": "string",
              "required": true,
              "description": "Chargebee site name (subdomain)",
              "helpText": "What this field is: The Chargebee site name that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.site}} when an earlier Chargebee step provides this value.",
              "placeholder": "Enter Site"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.customerId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email",
              "helpText": "What this field is: The email address that Chargebee should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Plan Id",
              "internalKey": "planId",
              "type": "string",
              "required": false,
              "description": "Plan / item price ID",
              "helpText": "What this field is: The Plan / item price ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.planId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subscription Id",
              "internalKey": "subscriptionId",
              "type": "string",
              "required": false,
              "description": "Subscription ID",
              "helpText": "What this field is: The Subscription ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subscriptionId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "customer": {
              "id": "cust_abc123",
              "email": "alice@example.com",
              "created_at": 1705000000
            }
          },
          "outputDescription": "customer.id: Chargebee customer ID. customer.email: The customer email. customer.created_at: Unix timestamp of creation.",
          "usageExample": {
            "scenario": "Create a Chargebee customer when a new user signs up",
            "inputValues": {
              "firstName": "{{$json.firstName}}",
              "lastName": "{{$json.lastName}}",
              "email": "{{$json.email}}"
            },
            "expectedOutput": "A Chargebee customer record is created. Use `{{$json.customer.id}}` in downstream billing operations."
          },
          "externalDocsUrl": "https://apidocs.chargebee.com/docs/api"
        },
        {
          "name": "Create subscription",
          "value": "create_subscription",
          "description": "Create and manage subscriptions, customers, and invoices in Chargebee.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Chargebee API key",
              "helpText": "What this field is: Chargebee token, a secret password that lets CtrlChecks talk to Chargebee safely.\nWhere to find it: Chargebee account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Chargebee.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Site",
              "internalKey": "site",
              "type": "string",
              "required": true,
              "description": "Chargebee site name (subdomain)",
              "helpText": "What this field is: The Chargebee site name that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.site}} when an earlier Chargebee step provides this value.",
              "placeholder": "Enter Site"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.customerId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email",
              "helpText": "What this field is: The email address that Chargebee should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Plan Id",
              "internalKey": "planId",
              "type": "string",
              "required": false,
              "description": "Plan / item price ID",
              "helpText": "What this field is: The Chargebee plan/item price ID that the customer is subscribing to.\nWhere to find it: Chargebee Dashboard → Product Catalog → Plans or Items → copy the plan ID.\nExample: pro-monthly or startup-annual",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subscription Id",
              "internalKey": "subscriptionId",
              "type": "string",
              "required": false,
              "description": "Subscription ID",
              "helpText": "What this field is: The Subscription ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subscriptionId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "customer": {
              "id": "cust_abc123",
              "email": "alice@example.com",
              "created_at": 1705000000
            }
          },
          "outputDescription": "customer.id: Chargebee customer ID. customer.email: The customer email. customer.created_at: Unix timestamp of creation.",
          "usageExample": {
            "scenario": "Create a Chargebee customer when a new user signs up",
            "inputValues": {
              "firstName": "{{$json.firstName}}",
              "lastName": "{{$json.lastName}}",
              "email": "{{$json.email}}"
            },
            "expectedOutput": "A Chargebee customer record is created. Use `{{$json.customer.id}}` in downstream billing operations."
          },
          "externalDocsUrl": "https://apidocs.chargebee.com/docs/api"
        },
        {
          "name": "Get customer",
          "value": "get_customer",
          "description": "Create and manage subscriptions, customers, and invoices in Chargebee.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Chargebee API key",
              "helpText": "What this field is: Chargebee token, a secret password that lets CtrlChecks talk to Chargebee safely.\nWhere to find it: Chargebee account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Chargebee.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Site",
              "internalKey": "site",
              "type": "string",
              "required": true,
              "description": "Chargebee site name (subdomain)",
              "helpText": "What this field is: The Chargebee site name that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.site}} when an earlier Chargebee step provides this value.",
              "placeholder": "Enter Site"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.customerId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email",
              "helpText": "What this field is: The email address that Chargebee should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Plan Id",
              "internalKey": "planId",
              "type": "string",
              "required": false,
              "description": "Plan / item price ID",
              "helpText": "What this field is: The Plan / item price ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.planId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subscription Id",
              "internalKey": "subscriptionId",
              "type": "string",
              "required": false,
              "description": "Subscription ID",
              "helpText": "What this field is: The Subscription ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subscriptionId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "customer": {
              "id": "cust_abc123",
              "email": "alice@example.com",
              "created_at": 1705000000
            }
          },
          "outputDescription": "customer.id: Chargebee customer ID. customer.email: The customer email. customer.created_at: Unix timestamp of creation.",
          "usageExample": {
            "scenario": "Create a Chargebee customer when a new user signs up",
            "inputValues": {
              "firstName": "{{$json.firstName}}",
              "lastName": "{{$json.lastName}}",
              "email": "{{$json.email}}"
            },
            "expectedOutput": "A Chargebee customer record is created. Use `{{$json.customer.id}}` in downstream billing operations."
          },
          "externalDocsUrl": "https://apidocs.chargebee.com/docs/api"
        },
        {
          "name": "Cancel subscription",
          "value": "cancel_subscription",
          "description": "Create and manage subscriptions, customers, and invoices in Chargebee.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Chargebee API key",
              "helpText": "What this field is: Chargebee token, a secret password that lets CtrlChecks talk to Chargebee safely.\nWhere to find it: Chargebee account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Chargebee.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "sk_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Site",
              "internalKey": "site",
              "type": "string",
              "required": true,
              "description": "Chargebee site name (subdomain)",
              "helpText": "What this field is: The Chargebee site name that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.site}} when an earlier Chargebee step provides this value.",
              "placeholder": "Enter Site"
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Customer ID",
              "helpText": "What this field is: The Customer ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.customerId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email",
              "helpText": "What this field is: The email address that Chargebee should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Plan Id",
              "internalKey": "planId",
              "type": "string",
              "required": false,
              "description": "Plan / item price ID",
              "helpText": "What this field is: The Plan / item price ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.planId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Subscription Id",
              "internalKey": "subscriptionId",
              "type": "string",
              "required": false,
              "description": "Subscription ID",
              "helpText": "What this field is: The Subscription ID that tells Chargebee which item to use.\nWhere to find it: Open the item in Chargebee and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.subscriptionId}} when an earlier Chargebee step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "customer": {
              "id": "cust_abc123",
              "email": "alice@example.com",
              "created_at": 1705000000
            }
          },
          "outputDescription": "customer.id: Chargebee customer ID. customer.email: The customer email. customer.created_at: Unix timestamp of creation.",
          "usageExample": {
            "scenario": "Create a Chargebee customer when a new user signs up",
            "inputValues": {
              "firstName": "{{$json.firstName}}",
              "lastName": "{{$json.lastName}}",
              "email": "{{$json.email}}"
            },
            "expectedOutput": "A Chargebee customer record is created. Use `{{$json.customer.id}}` in downstream billing operations."
          },
          "externalDocsUrl": "https://apidocs.chargebee.com/docs/api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Chargebee node."
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
