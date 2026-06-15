import type { DocsSearchIndexItem } from '../search-index';

export const slackWebhookSearchIndex = [
  {
    "type": "node",
    "title": "Slack Webhook",
    "slug": "slack_webhook",
    "category": "Communication",
    "href": "/docs/nodes/slack_webhook",
    "text": "Slack Webhook Send messages via Slack webhook Use this node when a workflow needs slack webhook behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Slack Webhook: Configure",
    "slug": "slack_webhook",
    "category": "Communication",
    "href": "/docs/nodes/slack_webhook#operation-configure",
    "text": "Slack Webhook Configuration Configure Configure with the Slack Webhook node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Slack Webhook: Webhook Url",
    "slug": "slack_webhook",
    "category": "Communication",
    "href": "/docs/nodes/slack_webhook#operation-configure",
    "text": "Slack Webhook Configuration Configure Webhook Url webhookUrl Slack webhook URL"
  },
  {
    "type": "field",
    "title": "Slack Webhook: Message",
    "slug": "slack_webhook",
    "category": "Communication",
    "href": "/docs/nodes/slack_webhook#operation-configure",
    "text": "Slack Webhook Configuration Configure Message message Message text"
  }
] satisfies DocsSearchIndexItem[];
