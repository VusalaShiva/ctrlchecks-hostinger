import type { DocsSearchIndexItem } from '../search-index';

export const paypalSearchIndex = [
  {
    "type": "node",
    "title": "PayPal",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal",
    "text": "PayPal PayPal payment processing Use this node when a workflow needs paypal behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "PayPal: Charge",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Charge with the PayPal node using the configured input fields. charge"
  },
  {
    "type": "field",
    "title": "PayPal: Access Token",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Access Token accessToken PayPal access token (optional if stored in vault under key \"paypal\")"
  },
  {
    "type": "field",
    "title": "PayPal: Environment",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Environment environment PayPal environment"
  },
  {
    "type": "field",
    "title": "PayPal: Amount",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Amount amount Payment amount"
  },
  {
    "type": "field",
    "title": "PayPal: Currency",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Currency currency Currency (default: USD)"
  },
  {
    "type": "field",
    "title": "PayPal: Description",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Description description Description for the payment/order"
  },
  {
    "type": "field",
    "title": "PayPal: Payment Id",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Payment Id paymentId PayPal capture ID (for refund)"
  },
  {
    "type": "field",
    "title": "PayPal: Auto Capture",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-charge",
    "text": "PayPal Operations Charge Auto Capture autoCapture If true, capture immediately after creating order"
  },
  {
    "type": "operation",
    "title": "PayPal: Refund",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Refund with the PayPal node using the configured input fields. refund"
  },
  {
    "type": "field",
    "title": "PayPal: Access Token",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Access Token accessToken PayPal access token (optional if stored in vault under key \"paypal\")"
  },
  {
    "type": "field",
    "title": "PayPal: Environment",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Environment environment PayPal environment"
  },
  {
    "type": "field",
    "title": "PayPal: Amount",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Amount amount Payment amount"
  },
  {
    "type": "field",
    "title": "PayPal: Currency",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Currency currency Currency (default: USD)"
  },
  {
    "type": "field",
    "title": "PayPal: Description",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Description description Description for the payment/order"
  },
  {
    "type": "field",
    "title": "PayPal: Payment Id",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Payment Id paymentId PayPal capture ID (for refund)"
  },
  {
    "type": "field",
    "title": "PayPal: Auto Capture",
    "slug": "paypal",
    "category": "Data",
    "href": "/docs/nodes/paypal#operation-refund",
    "text": "PayPal Operations Refund Auto Capture autoCapture If true, capture immediately after creating order"
  }
] satisfies DocsSearchIndexItem[];
