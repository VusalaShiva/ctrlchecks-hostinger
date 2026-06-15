import type { DocsSearchIndexItem } from '../search-index';

export const webhookSearchIndex = [
  {
    "type": "node",
    "title": "Webhook Trigger",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook",
    "text": "Webhook Trigger Executes workflow when HTTP request is received Use this node when a workflow needs webhook trigger behavior with schema-driven inputs from the CtrlChecks node registry. Triggers"
  },
  {
    "type": "operation",
    "title": "Webhook Trigger: Configure",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Configure with the Webhook Trigger node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Webhook Trigger: Path",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Path path URL path for webhook"
  },
  {
    "type": "field",
    "title": "Webhook Trigger: Http Method",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Http Method httpMethod HTTP method to accept"
  },
  {
    "type": "field",
    "title": "Webhook Trigger: Response Mode",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Response Mode responseMode How to respond to webhook caller"
  },
  {
    "type": "field",
    "title": "Webhook Trigger: Verify Signature",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Verify Signature verifySignature Whether to verify webhook signatures (if supported by the sender)"
  },
  {
    "type": "field",
    "title": "Webhook Trigger: Secret Token",
    "slug": "webhook",
    "category": "Triggers",
    "href": "/docs/nodes/webhook#operation-configure",
    "text": "Webhook Trigger Configuration Configure Secret Token secretToken Secret token used for signature verification (if verifySignature is enabled)"
  }
] satisfies DocsSearchIndexItem[];
