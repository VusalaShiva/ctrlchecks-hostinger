import type { DocsSearchIndexItem } from '../search-index';

export const stripeSearchIndex = [
  {
    "type": "node",
    "title": "Stripe",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe",
    "text": "Stripe Stripe payment processing Use this node when a workflow needs stripe behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Stripe: Charge",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Charge with the Stripe node using the configured input fields. charge"
  },
  {
    "type": "field",
    "title": "Stripe: Api Key",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Api Key apiKey Stripe secret key (optional if stored in vault under key \"stripe\")"
  },
  {
    "type": "field",
    "title": "Stripe: Amount",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Amount amount Payment amount (in cents)"
  },
  {
    "type": "field",
    "title": "Stripe: Currency",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Currency currency Currency (default: usd)"
  },
  {
    "type": "field",
    "title": "Stripe: Description",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Description description Description for the charge/payment"
  },
  {
    "type": "field",
    "title": "Stripe: Source",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Source source Legacy charge source token (for /v1/charges)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Method Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Payment Method Id paymentMethodId Payment method ID (for PaymentIntents)"
  },
  {
    "type": "field",
    "title": "Stripe: Customer Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Customer Id customerId Stripe customer ID"
  },
  {
    "type": "field",
    "title": "Stripe: Email",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Email email Customer email (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Name",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Name name Customer name (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Charge Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Charge Id chargeId Charge ID (for refund)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Intent Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-charge",
    "text": "Stripe Operations Charge Payment Intent Id paymentIntentId PaymentIntent ID (for refund)"
  },
  {
    "type": "operation",
    "title": "Stripe: Refund",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Refund with the Stripe node using the configured input fields. refund"
  },
  {
    "type": "field",
    "title": "Stripe: Api Key",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Api Key apiKey Stripe secret key (optional if stored in vault under key \"stripe\")"
  },
  {
    "type": "field",
    "title": "Stripe: Amount",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Amount amount Payment amount (in cents)"
  },
  {
    "type": "field",
    "title": "Stripe: Currency",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Currency currency Currency (default: usd)"
  },
  {
    "type": "field",
    "title": "Stripe: Description",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Description description Description for the charge/payment"
  },
  {
    "type": "field",
    "title": "Stripe: Source",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Source source Legacy charge source token (for /v1/charges)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Method Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Payment Method Id paymentMethodId Payment method ID (for PaymentIntents)"
  },
  {
    "type": "field",
    "title": "Stripe: Customer Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Customer Id customerId Stripe customer ID"
  },
  {
    "type": "field",
    "title": "Stripe: Email",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Email email Customer email (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Name",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Name name Customer name (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Charge Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Charge Id chargeId Charge ID (for refund)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Intent Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-refund",
    "text": "Stripe Operations Refund Payment Intent Id paymentIntentId PaymentIntent ID (for refund)"
  },
  {
    "type": "operation",
    "title": "Stripe: Create Customer",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Create Customer with the Stripe node using the configured input fields. createCustomer"
  },
  {
    "type": "field",
    "title": "Stripe: Api Key",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Api Key apiKey Stripe secret key (optional if stored in vault under key \"stripe\")"
  },
  {
    "type": "field",
    "title": "Stripe: Amount",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Amount amount Payment amount (in cents)"
  },
  {
    "type": "field",
    "title": "Stripe: Currency",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Currency currency Currency (default: usd)"
  },
  {
    "type": "field",
    "title": "Stripe: Description",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Description description Description for the charge/payment"
  },
  {
    "type": "field",
    "title": "Stripe: Source",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Source source Legacy charge source token (for /v1/charges)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Method Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Payment Method Id paymentMethodId Payment method ID (for PaymentIntents)"
  },
  {
    "type": "field",
    "title": "Stripe: Customer Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Customer Id customerId Stripe customer ID"
  },
  {
    "type": "field",
    "title": "Stripe: Email",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Email email Customer email (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Name",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Name name Customer name (for createCustomer)"
  },
  {
    "type": "field",
    "title": "Stripe: Charge Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Charge Id chargeId Charge ID (for refund)"
  },
  {
    "type": "field",
    "title": "Stripe: Payment Intent Id",
    "slug": "stripe",
    "category": "Data",
    "href": "/docs/nodes/stripe#operation-createCustomer",
    "text": "Stripe Operations Create Customer Payment Intent Id paymentIntentId PaymentIntent ID (for refund)"
  }
] satisfies DocsSearchIndexItem[];
