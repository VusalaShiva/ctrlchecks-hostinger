import type { NodeDoc } from '../types';

export const stripeDoc: NodeDoc = {
  "slug": "stripe",
  "displayName": "Stripe",
  "category": "Data",
  "logoUrl": "/icons/nodes/stripe.svg",
  "description": "Stripe payment processing",
  "credentialType": "Stripe API Key",
  "credentialSetupSteps": [
    "What this is: The Stripe connection lets CtrlChecks access your Stripe account safely without putting secrets in workflow fields.",
    "Where to start: Stripe Dashboard -> Developers -> API keys -> Secret key.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Stripe, then sign in or paste the secret value requested there.",
    "Example: sk_test_... for testing or sk_live_... for real payments.",
    "Tip: Use sk_test_ keys while building and testing. Switch to sk_live_ only when you are ready for real payments.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Stripe step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://stripe.com/docs/keys",
  "resources": [
    {
      "name": "Operations",
      "description": "Stripe exposes operation choices directly.",
      "operations": [
        {
          "name": "Charge",
          "value": "charge",
          "description": "Charge using the Stripe node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Stripe secret key (optional if stored in vault under key \"stripe\")",
              "helpText": "What this field is: Stripe secret key, a secret password that lets CtrlChecks talk to Stripe safely.\nWhere to find it: Stripe Dashboard -> Developers -> API keys -> Secret key.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: sk_test_... for testing or sk_live_... for real payments.\nImportant: Treat this like a bank password. Use test keys while building so no real money moves.",
              "placeholder": "sk_live_...",
              "example": "sk_live_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Payment amount (in cents)",
              "helpText": "What this field is: The payment amount in the smallest unit of the currency, not dollars or euros directly.\nHow to fill it: For USD, EUR, GBP, INR, and most currencies, multiply the main amount by 100. For JPY, enter the yen amount as-is.\nExample: 4999 charges $49.99 USD. 2000 refunds $20.00 USD.\nTip: Use {{$json.amount}} from an order, form, or Stripe event after converting it to the smallest currency unit.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Currency",
              "internalKey": "currency",
              "type": "string",
              "required": false,
              "description": "Currency (default: usd)",
              "helpText": "What this field is: The three-letter currency code for the Stripe payment.\nHow to fill it: Use lowercase letters and a currency your Stripe account supports.\nExample: usd, eur, gbp, inr, aud, cad, jpy.\nTip: The refund currency must match the original payment currency.",
              "placeholder": "usd",
              "example": "usd",
              "defaultValue": "usd"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Description for the charge/payment",
              "helpText": "What this field is: Description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Source",
              "internalKey": "source",
              "type": "string",
              "required": false,
              "description": "Legacy charge source token (for /v1/charges)",
              "helpText": "What this field is: A legacy Stripe source token for older charge flows.\nHow to fill it: Use a token that starts with tok_ only when your workflow still uses Stripe Charges.\nExample: tok_visa for Stripe test mode.\nTip: For new payment flows, prefer Payment Method ID or PaymentIntent-based workflows.",
              "placeholder": "tok_visa",
              "example": "tok_visa"
            },
            {
              "name": "Payment Method Id",
              "internalKey": "paymentMethodId",
              "type": "string",
              "required": false,
              "description": "Payment method ID (for PaymentIntents)",
              "helpText": "What this field is: The Stripe Payment Method ID for the card or payment method.\nWhere to find it: It is returned by Stripe Checkout, Payment Element, or a previous Stripe step. It starts with pm_.\nExample: pm_1NabcDEF234567890.\nTip: Use {{$json.paymentMethodId}} from a Stripe webhook or checkout-session output.",
              "placeholder": "pm_...",
              "example": "pm_..."
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Stripe customer ID",
              "helpText": "What this field is: The Stripe customer ID — starts with cus_.\nWhere to find it: Stripe Dashboard → Customers → click a customer — the ID is shown at the top.\nExample: cus_XXXXXXXXXXXXXXXXXX\nTip: Use {{$json.customerId}} from a Create Customer step.",
              "placeholder": "cus_...",
              "example": "cus_..."
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer)",
              "helpText": "What this field is: The email address that Stripe should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Name value.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Name"
            },
            {
              "name": "Charge Id",
              "internalKey": "chargeId",
              "type": "string",
              "required": false,
              "description": "Charge ID (for refund)",
              "helpText": "What this field is: The Stripe charge ID to refund or look up.\nWhere to find it: Open Stripe Dashboard -> Payments -> choose a payment. The charge ID starts with ch_.\nExample: ch_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.id}} from a previous Charge step when it returns a charge ID.",
              "placeholder": "ch_...",
              "example": "ch_..."
            },
            {
              "name": "Payment Intent Id",
              "internalKey": "paymentIntentId",
              "type": "string",
              "required": false,
              "description": "PaymentIntent ID (for refund)",
              "helpText": "What this field is: The Stripe PaymentIntent ID to refund or look up.\nWhere to find it: Open the payment in Stripe Dashboard or use the payment_intent value from a Stripe webhook. It starts with pi_.\nExample: pi_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.payment_intent}} from a checkout or payment webhook.",
              "placeholder": "pi_...",
              "example": "pi_..."
            }
          ],
          "outputExample": {
            "id": "ch_1abc",
            "amount": 2000,
            "currency": "usd",
            "status": "succeeded"
          },
          "outputDescription": "id: Unique identifier returned by the service.\namount: Value returned by this operation.\ncurrency: Value returned by this operation.\nstatus: Current state of the requested action.",
          "usageExample": {
            "scenario": "Process incoming Stripe data with charge after a related upstream event is received",
            "inputValues": {
              "Api Key": "sk_live_...",
              "Amount": "1000",
              "Currency": "usd",
              "Description": "",
              "Source": "tok_visa"
            },
            "expectedOutput": "Stripe returns structured charge data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.stripe.com/api"
        },
        {
          "name": "Refund",
          "value": "refund",
          "description": "Refund using the Stripe node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Stripe secret key (optional if stored in vault under key \"stripe\")",
              "helpText": "What this field is: Stripe secret key, a secret password that lets CtrlChecks talk to Stripe safely.\nWhere to find it: Stripe Dashboard -> Developers -> API keys -> Secret key.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: sk_test_... for testing or sk_live_... for real payments.\nImportant: Treat this like a bank password. Use test keys while building so no real money moves.",
              "placeholder": "sk_live_...",
              "example": "sk_live_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Payment amount (in cents)",
              "helpText": "What this field is: The refund amount in the smallest unit of the currency, not dollars or euros directly.\nHow to fill it: For USD, EUR, GBP, INR, and most currencies, multiply the main amount by 100. For JPY, enter the yen amount as-is.\nExample: 4999 charges $49.99 USD. 2000 refunds $20.00 USD.\nTip: Use {{$json.amount}} from an order, form, or Stripe event after converting it to the smallest currency unit.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Currency",
              "internalKey": "currency",
              "type": "string",
              "required": false,
              "description": "Currency (default: usd)",
              "helpText": "What this field is: The three-letter currency code for the Stripe payment.\nHow to fill it: Use lowercase letters and a currency your Stripe account supports.\nExample: usd, eur, gbp, inr, aud, cad, jpy.\nTip: The refund currency must match the original payment currency.",
              "placeholder": "usd",
              "example": "usd",
              "defaultValue": "usd"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Description for the charge/payment",
              "helpText": "What this field is: Description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Source",
              "internalKey": "source",
              "type": "string",
              "required": false,
              "description": "Legacy charge source token (for /v1/charges)",
              "helpText": "What this field is: A legacy Stripe source token for older charge flows.\nHow to fill it: Use a token that starts with tok_ only when your workflow still uses Stripe Charges.\nExample: tok_visa for Stripe test mode.\nTip: For new payment flows, prefer Payment Method ID or PaymentIntent-based workflows.",
              "placeholder": "tok_visa",
              "example": "tok_visa"
            },
            {
              "name": "Payment Method Id",
              "internalKey": "paymentMethodId",
              "type": "string",
              "required": false,
              "description": "Payment method ID (for PaymentIntents)",
              "helpText": "What this field is: The Stripe Payment Method ID for the card or payment method.\nWhere to find it: It is returned by Stripe Checkout, Payment Element, or a previous Stripe step. It starts with pm_.\nExample: pm_1NabcDEF234567890.\nTip: Use {{$json.paymentMethodId}} from a Stripe webhook or checkout-session output.",
              "placeholder": "pm_...",
              "example": "pm_..."
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Stripe customer ID",
              "helpText": "What this field is: The Stripe customer ID — starts with cus_.\nWhere to find it: Stripe Dashboard → Customers → click a customer — the ID is shown at the top.\nExample: cus_XXXXXXXXXXXXXXXXXX\nTip: Use {{$json.customerId}} from a Create Customer step.",
              "placeholder": "cus_...",
              "example": "cus_..."
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer)",
              "helpText": "What this field is: The email address that Stripe should use for email.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Name value.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Name"
            },
            {
              "name": "Charge Id",
              "internalKey": "chargeId",
              "type": "string",
              "required": false,
              "description": "Charge ID (for refund)",
              "helpText": "What this field is: The Stripe charge ID to refund or look up.\nWhere to find it: Open Stripe Dashboard -> Payments -> choose a payment. The charge ID starts with ch_.\nExample: ch_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.id}} from a previous Charge step when it returns a charge ID.",
              "placeholder": "ch_...",
              "example": "ch_..."
            },
            {
              "name": "Payment Intent Id",
              "internalKey": "paymentIntentId",
              "type": "string",
              "required": false,
              "description": "PaymentIntent ID (for refund)",
              "helpText": "What this field is: The Stripe PaymentIntent ID to refund or look up.\nWhere to find it: Open the payment in Stripe Dashboard or use the payment_intent value from a Stripe webhook. It starts with pi_.\nExample: pi_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.payment_intent}} from a checkout or payment webhook.",
              "placeholder": "pi_...",
              "example": "pi_..."
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
            "scenario": "Process incoming Stripe data with refund after a related upstream event is received",
            "inputValues": {
              "Api Key": "sk_live_...",
              "Amount": "1000",
              "Currency": "usd",
              "Description": "",
              "Source": "tok_visa"
            },
            "expectedOutput": "Stripe returns structured refund data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.stripe.com/api"
        },
        {
          "name": "CreateCustomer",
          "value": "createCustomer",
          "description": "CreateCustomer using the Stripe node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Stripe secret key (optional if stored in vault under key \"stripe\")",
              "helpText": "What this field is: Stripe secret key, a secret password that lets CtrlChecks talk to Stripe safely.\nWhere to find it: Stripe Dashboard -> Developers -> API keys -> Secret key.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: sk_test_... for testing or sk_live_... for real payments.\nImportant: Treat this like a bank password. Use test keys while building so no real money moves.",
              "placeholder": "sk_live_...",
              "example": "sk_live_...",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Amount",
              "internalKey": "amount",
              "type": "number",
              "required": false,
              "description": "Payment amount (in cents)",
              "helpText": "What this field is: The payment amount in the smallest unit of the currency, not dollars or euros directly.\nHow to fill it: For USD, EUR, GBP, INR, and most currencies, multiply the main amount by 100. For JPY, enter the yen amount as-is.\nExample: 4999 charges $49.99 USD. 2000 refunds $20.00 USD.\nTip: Use {{$json.amount}} from an order, form, or Stripe event after converting it to the smallest currency unit.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Currency",
              "internalKey": "currency",
              "type": "string",
              "required": false,
              "description": "Currency (default: usd)",
              "helpText": "What this field is: The three-letter currency code for the Stripe payment.\nHow to fill it: Use lowercase letters and a currency your Stripe account supports.\nExample: usd, eur, gbp, inr, aud, cad, jpy.\nTip: The refund currency must match the original payment currency.",
              "placeholder": "usd",
              "example": "usd",
              "defaultValue": "usd"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Description for the charge/payment",
              "helpText": "What this field is: Description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Source",
              "internalKey": "source",
              "type": "string",
              "required": false,
              "description": "Legacy charge source token (for /v1/charges)",
              "helpText": "What this field is: A legacy Stripe source token for older charge flows.\nHow to fill it: Use a token that starts with tok_ only when your workflow still uses Stripe Charges.\nExample: tok_visa for Stripe test mode.\nTip: For new payment flows, prefer Payment Method ID or PaymentIntent-based workflows.",
              "placeholder": "tok_visa",
              "example": "tok_visa"
            },
            {
              "name": "Payment Method Id",
              "internalKey": "paymentMethodId",
              "type": "string",
              "required": false,
              "description": "Payment method ID (for PaymentIntents)",
              "helpText": "What this field is: The Stripe Payment Method ID for the card or payment method.\nWhere to find it: It is returned by Stripe Checkout, Payment Element, or a previous Stripe step. It starts with pm_.\nExample: pm_1NabcDEF234567890.\nTip: Use {{$json.paymentMethodId}} from a Stripe webhook or checkout-session output.",
              "placeholder": "pm_...",
              "example": "pm_..."
            },
            {
              "name": "Customer Id",
              "internalKey": "customerId",
              "type": "string",
              "required": false,
              "description": "Stripe customer ID",
              "helpText": "What this field is: The Stripe customer ID — starts with cus_.\nWhere to find it: Stripe Dashboard → Customers → click a customer — the ID is shown at the top.\nExample: cus_XXXXXXXXXXXXXXXXXX\nTip: Use {{$json.customerId}} from a Create Customer step.",
              "placeholder": "cus_...",
              "example": "cus_..."
            },
            {
              "name": "Email",
              "internalKey": "email",
              "type": "email",
              "required": false,
              "description": "Customer email (for createCustomer)",
              "helpText": "What this field is: The email address for Customer email.\nHow to fill it: Type one valid email address unless the field says it accepts several.\nExample: alice@example.com.\nTip: Use {{$json.email}} when an earlier form, sheet, or database row provides the email address.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": false,
              "description": "Customer name (for createCustomer)",
              "helpText": "What this field is: Customer name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Name value.\nTip: This field is used for createCustomer. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Name"
            },
            {
              "name": "Charge Id",
              "internalKey": "chargeId",
              "type": "string",
              "required": false,
              "description": "Charge ID (for refund)",
              "helpText": "What this field is: The Stripe charge ID to refund or look up.\nWhere to find it: Open Stripe Dashboard -> Payments -> choose a payment. The charge ID starts with ch_.\nExample: ch_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.id}} from a previous Charge step when it returns a charge ID.",
              "placeholder": "ch_...",
              "example": "ch_..."
            },
            {
              "name": "Payment Intent Id",
              "internalKey": "paymentIntentId",
              "type": "string",
              "required": false,
              "description": "PaymentIntent ID (for refund)",
              "helpText": "What this field is: The Stripe PaymentIntent ID to refund or look up.\nWhere to find it: Open the payment in Stripe Dashboard or use the payment_intent value from a Stripe webhook. It starts with pi_.\nExample: pi_3Nf9mX2eZvKYlo2C0abc1234.\nTip: Use {{$json.payment_intent}} from a checkout or payment webhook.",
              "placeholder": "pi_...",
              "example": "pi_..."
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
            "scenario": "Process incoming Stripe data with create customer after a related upstream event is received",
            "inputValues": {
              "Api Key": "sk_live_...",
              "Amount": "1000",
              "Currency": "usd",
              "Description": "",
              "Source": "tok_visa"
            },
            "expectedOutput": "Stripe returns structured create customer data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.stripe.com/api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Stripe node."
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
