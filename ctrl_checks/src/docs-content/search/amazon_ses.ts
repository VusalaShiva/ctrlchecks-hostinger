import type { DocsSearchIndexItem } from '../search-index';

export const amazonSesSearchIndex = [
  {
    "type": "node",
    "title": "Amazon SES",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses",
    "text": "Amazon SES Send emails through Amazon Simple Email Service (SES) Use this node when a workflow needs amazon ses behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Amazon SES: Configure",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Configure with the Amazon SES node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Amazon SES: Recipients",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Recipients recipients Email recipients (To, Cc, Bcc)"
  },
  {
    "type": "field",
    "title": "Amazon SES: Subject",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Subject subject Email subject line"
  },
  {
    "type": "field",
    "title": "Amazon SES: Body",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Body body Email body content (HTML or plain text)"
  },
  {
    "type": "field",
    "title": "Amazon SES: Use Template",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Use Template useTemplate Use AWS SES template instead of raw email"
  },
  {
    "type": "field",
    "title": "Amazon SES: Template Name",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Template Name templateName AWS SES template name (required if useTemplate is true)"
  },
  {
    "type": "field",
    "title": "Amazon SES: Template Data",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Template Data templateData Template variables as JSON object"
  },
  {
    "type": "field",
    "title": "Amazon SES: From Address",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure From Address fromAddress Sender email address (must be verified in SES)"
  },
  {
    "type": "field",
    "title": "Amazon SES: Reply To Addresses",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Reply To Addresses replyToAddresses Reply-to email addresses"
  },
  {
    "type": "field",
    "title": "Amazon SES: Attachments",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Attachments attachments Email attachments"
  },
  {
    "type": "field",
    "title": "Amazon SES: Aws Region",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Aws Region awsRegion AWS region for SES service"
  },
  {
    "type": "field",
    "title": "Amazon SES: Configuration Set Name",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Configuration Set Name configurationSetName SES configuration set for tracking"
  },
  {
    "type": "field",
    "title": "Amazon SES: Tags",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Tags tags Email tags for tracking and filtering"
  },
  {
    "type": "field",
    "title": "Amazon SES: Return Path",
    "slug": "amazon_ses",
    "category": "Communication",
    "href": "/docs/nodes/amazon_ses#operation-configure",
    "text": "Amazon SES Configuration Configure Return Path returnPath Bounce handling email address"
  }
] satisfies DocsSearchIndexItem[];
