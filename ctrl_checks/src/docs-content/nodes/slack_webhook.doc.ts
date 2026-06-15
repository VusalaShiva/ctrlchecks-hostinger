import type { NodeDoc } from '../types';

export const slackWebhookDoc: NodeDoc = {
  "slug": "slack_webhook",
  "displayName": "Slack Webhook",
  "category": "Communication",
  "logoUrl": "/icons/nodes/slack_webhook.svg",
  "description": "Send messages via Slack webhook",
  "credentialType": "Slack Webhook URL",
  "credentialSetupSteps": [
    "What this is: The Slack Webhook connection lets CtrlChecks access your Slack Webhook account safely without putting secrets in workflow fields.",
    "Where to start: Slack app -> Incoming Webhooks -> Add New Webhook to Workspace.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Slack Webhook, then sign in or paste the secret value requested there.",
    "Example: https://hooks.slack.com/services/T000/B000/XXXX.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Slack Webhook step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://api.slack.com/messaging/webhooks",
  "resources": [
    {
      "name": "Configuration",
      "description": "Slack Webhook is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send a message to Slack using an Incoming Webhook URL — no OAuth required.",
          "fields": [
            {
              "name": "Webhook Url",
              "internalKey": "webhookUrl",
              "type": "url",
              "required": true,
              "description": "Slack webhook URL",
              "helpText": "What this field is: The Incoming Webhook URL that posts messages to a specific Slack channel.\nWhere to find it: api.slack.com/apps → your app → Incoming Webhooks → copy the URL.\nExample: https://hooks.slack.com/services/T00000/B00000/xxxx...\nNote: Keep this URL private — anyone with it can post to your channel.",
              "placeholder": "https://hooks.slack.com/services/...",
              "example": "https://hooks.slack.com/services/..."
            },
            {
              "name": "Message",
              "internalKey": "message",
              "type": "textarea",
              "required": true,
              "description": "Message text",
              "helpText": "What this field is: Message text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.message}}.\nTip: Use {{$json.message}} when this value comes from an earlier step.",
              "placeholder": "{{$json.message}}",
              "example": "{{$json.message}}"
            }
          ],
          "outputExample": {
            "success": true,
            "status": 200,
            "response": "ok"
          },
          "outputDescription": "success: true if Slack accepted the message. status: HTTP response code. response: \"ok\" indicates success.",
          "usageExample": {
            "scenario": "Post a quick alert to Slack without setting up a full bot integration",
            "inputValues": {
              "webhookUrl": "{{$env.SLACK_WEBHOOK_URL}}",
              "text": "🔔 New sign-up: {{$json.email}} at {{$now}}"
            },
            "expectedOutput": "Message appears in the configured channel. This is the simplest way to send Slack messages."
          },
          "externalDocsUrl": "https://api.slack.com/messaging/webhooks"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Slack Webhook node."
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
