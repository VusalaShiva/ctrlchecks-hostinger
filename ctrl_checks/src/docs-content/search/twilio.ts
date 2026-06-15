import type { DocsSearchIndexItem } from '../search-index';

export const twilioSearchIndex = [
  {
    "type": "node",
    "title": "Twilio",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio",
    "text": "Twilio Send SMS/Voice via Twilio Use this node when a workflow needs twilio behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Twilio: Configure",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure Configure with the Twilio node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Twilio: To",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure To to Recipient phone number"
  },
  {
    "type": "field",
    "title": "Twilio: Message",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure Message message SMS message text"
  },
  {
    "type": "field",
    "title": "Twilio: From",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure From from Sender phone number"
  },
  {
    "type": "field",
    "title": "Twilio: Account Sid",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure Account Sid accountSid Twilio Account SID (optional if stored in Twilio vault credential JSON)"
  },
  {
    "type": "field",
    "title": "Twilio: Auth Token",
    "slug": "twilio",
    "category": "Communication",
    "href": "/docs/nodes/twilio#operation-configure",
    "text": "Twilio Configuration Configure Auth Token authToken Twilio Auth Token (optional if provided via vault)"
  }
] satisfies DocsSearchIndexItem[];
