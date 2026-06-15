import type { NodeDoc } from '../types';

export const paypalDoc: NodeDoc = {
  "slug": "paypal",
  "displayName": "PayPal",
  "category": "Data",
  "logoUrl": "/icons/nodes/paypal.svg",
  "description": "PayPal payment processing",
  "credentialType": "PayPal Credential",
  "credentialSetupSteps": [
    "What this is: The PayPal connection lets CtrlChecks access your PayPal account safely without putting secrets in workflow fields.",
    "Where to start: PayPal Developer Dashboard -> Apps & Credentials.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> PayPal, then sign in or paste the secret value requested there.",
    "Example: Client ID and secret from PayPal.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple PayPal step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.paypal.com/api/rest/",
  "resources": [
    {
      "name": "Operations",
      "description": "PayPal exposes operation choices directly.",
      "operations": [
        {
          "name": "Charge",
          "value": "charge",
          "description": "Charge using the PayPal node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "PayPal access token (optional if stored in vault under key \"paypal\")",
              "helpText": "What this field is: PayPal API credential, a secret password that lets CtrlChecks talk to PayPal safely.\nWhere to find it: PayPal Developer Dashboard -> Apps & Credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: Client ID and secret from PayPal.\nImportant: Treat this like a bank password. Use Sandbox credentials while testing.",
              "placeholder": "token_..."
            },
            {
              "name": "Environment",
              "internalKey": "environment",
              "type": "string",
              "required": false,
              "description": "PayPal environment",
              "helpText": "What this field is: PayPal environment.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: sandbox.\nTip: Use {{$json.environment}} when this value comes from an earlier step.",
              "placeholder": "sandbox",
              "example": "sandbox",
              "defaultValue": "live"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Payment amount",
              "helpText": "What this field is: The number used for Payment amount.\nHow to fill it: Enter digits only, using the unit expected by PayPal. Check whether the service expects cents or a normal decimal amount.\nExample: 10.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Currency",
              "internalKey": "currency",
              "type": "string",
              "required": false,
              "description": "Currency (default: USD)",
              "helpText": "What this field is: The currency code for this PayPal step.\nHow to fill it: Use a three-letter code supported by the service. Many payment services expect lowercase letters.\nExample: usd, eur, gbp, inr, or jpy.\nTip: Use {{$json.currency}} when the currency comes from an order or invoice.",
              "placeholder": "USD",
              "example": "USD",
              "defaultValue": "USD"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Description for the payment/order",
              "helpText": "What this field is: Description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Payment Id",
              "internalKey": "paymentId",
              "type": "string",
              "required": false,
              "description": "PayPal capture ID (for refund)",
              "helpText": "What this field is: The PayPal capture ID that tells PayPal which item to use.\nWhere to find it: Open the item in PayPal and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 3C12345678901234A.\nTip: Use {{$json.paymentId}} when an earlier PayPal step provides this value.",
              "placeholder": "3C12345678901234A",
              "example": "3C12345678901234A"
            },
            {
              "name": "Auto Capture",
              "internalKey": "autoCapture",
              "type": "boolean",
              "required": false,
              "description": "If true, capture immediately after creating order",
              "helpText": "What this field is: An on/off switch for If true, capture immediately after creating order.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use auto capture; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
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
            "scenario": "Process incoming PayPal data with charge after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Environment": "sandbox",
              "Amount": "10",
              "Currency": "USD",
              "Description": ""
            },
            "expectedOutput": "PayPal returns structured charge data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.paypal.com/api/rest/"
        },
        {
          "name": "Refund",
          "value": "refund",
          "description": "Refund using the PayPal node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "PayPal access token (optional if stored in vault under key \"paypal\")",
              "helpText": "What this field is: PayPal API credential, a secret password that lets CtrlChecks talk to PayPal safely.\nWhere to find it: PayPal Developer Dashboard -> Apps & Credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: Client ID and secret from PayPal.\nImportant: Treat this like a bank password. Use Sandbox credentials while testing.",
              "placeholder": "token_..."
            },
            {
              "name": "Environment",
              "internalKey": "environment",
              "type": "string",
              "required": false,
              "description": "PayPal environment",
              "helpText": "What this field is: PayPal environment.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: sandbox.\nTip: Use {{$json.environment}} when this value comes from an earlier step.",
              "placeholder": "sandbox",
              "example": "sandbox",
              "defaultValue": "live"
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Payment amount",
              "helpText": "What this field is: The number used for Payment amount.\nHow to fill it: Enter digits only, using the unit expected by PayPal. Check whether the service expects cents or a normal decimal amount.\nExample: 10.\nTip: Use {{$json.amount}} when an earlier order, invoice, or form provides the amount.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Currency",
              "internalKey": "currency",
              "type": "string",
              "required": false,
              "description": "Currency (default: USD)",
              "helpText": "What this field is: The currency code for this PayPal step.\nHow to fill it: Use a three-letter code supported by the service. Many payment services expect lowercase letters.\nExample: usd, eur, gbp, inr, or jpy.\nTip: Use {{$json.currency}} when the currency comes from an order or invoice.",
              "placeholder": "USD",
              "example": "USD",
              "defaultValue": "USD"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Description for the payment/order",
              "helpText": "What this field is: Description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Payment Id",
              "internalKey": "paymentId",
              "type": "string",
              "required": false,
              "description": "PayPal capture ID (for refund)",
              "helpText": "What this field is: The PayPal capture ID that tells PayPal which item to use.\nWhere to find it: Open the item in PayPal and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 3C12345678901234A.\nTip: Use {{$json.paymentId}} when an earlier PayPal step provides this value.",
              "placeholder": "3C12345678901234A",
              "example": "3C12345678901234A"
            },
            {
              "name": "Auto Capture",
              "internalKey": "autoCapture",
              "type": "boolean",
              "required": false,
              "description": "If true, capture immediately after creating order",
              "helpText": "What this field is: An on/off switch for If true, capture immediately after creating order.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use auto capture; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
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
            "scenario": "Process incoming PayPal data with refund after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Environment": "sandbox",
              "Amount": "10",
              "Currency": "USD",
              "Description": ""
            },
            "expectedOutput": "PayPal returns structured refund data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.paypal.com/api/rest/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the PayPal node."
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
