import type { DocsSearchIndexItem } from '../search-index';

export const emailSearchIndex = [
  {
    "type": "node",
    "title": "Email",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email",
    "text": "Email Send emails via SMTP Use this node when a workflow needs email behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Email: Configure",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email#operation-configure",
    "text": "Email Configuration Configure Configure with the Email node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Email: To",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email#operation-configure",
    "text": "Email Configuration Configure To to Recipient email address"
  },
  {
    "type": "field",
    "title": "Email: Subject",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email#operation-configure",
    "text": "Email Configuration Configure Subject subject Email subject"
  },
  {
    "type": "field",
    "title": "Email: Text",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email#operation-configure",
    "text": "Email Configuration Configure Text text Email body (text)"
  },
  {
    "type": "field",
    "title": "Email: Html",
    "slug": "email",
    "category": "Communication",
    "href": "/docs/nodes/email#operation-configure",
    "text": "Email Configuration Configure Html html Email body (HTML)"
  }
] satisfies DocsSearchIndexItem[];
