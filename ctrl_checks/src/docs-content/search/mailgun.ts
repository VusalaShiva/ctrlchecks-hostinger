import type { DocsSearchIndexItem } from '../search-index';

export const mailgunSearchIndex = [
  {
    "type": "node",
    "title": "Mailgun",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun",
    "text": "Mailgun Send transactional emails using the Mailgun API. Use this node when a workflow needs mailgun behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Mailgun: Send Email",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Send Email with the Mailgun node using the configured input fields. send_email"
  },
  {
    "type": "field",
    "title": "Mailgun: Domain",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Domain domain Mailgun sending domain"
  },
  {
    "type": "field",
    "title": "Mailgun: Api Key",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Api Key apiKey Mailgun Private API Key"
  },
  {
    "type": "field",
    "title": "Mailgun: From",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email From from Sender email address (must be from your verified Mailgun domain)"
  },
  {
    "type": "field",
    "title": "Mailgun: To",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email To to Recipient email address(es), comma-separated"
  },
  {
    "type": "field",
    "title": "Mailgun: Subject",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Subject subject Email subject line"
  },
  {
    "type": "field",
    "title": "Mailgun: Text",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Text text Plain text body of the email"
  },
  {
    "type": "field",
    "title": "Mailgun: Html",
    "slug": "mailgun",
    "category": "Communication",
    "href": "/docs/nodes/mailgun#operation-send_email",
    "text": "Mailgun Operations Send Email Html html HTML body of the email (overrides plain text for HTML clients)"
  }
] satisfies DocsSearchIndexItem[];
