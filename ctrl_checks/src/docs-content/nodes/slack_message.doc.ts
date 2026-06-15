import type { NodeDoc } from '../types';

export const slackMessageDoc: NodeDoc = {
  "slug": "slack_message",
  "displayName": "Slack",
  "category": "Communication",
  "logoUrl": "/icons/nodes/slack_message.svg",
  "description": "Send messages to Slack channels or users",
  "credentialType": "Slack OAuth",
  "credentialSetupSteps": [
    "What this is: The Slack connection lets CtrlChecks access your Slack account safely without putting secrets in workflow fields.",
    "Where to start: api.slack.com/apps -> your app -> OAuth & Permissions -> Bot User OAuth Token.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Slack, then sign in or paste the secret value requested there.",
    "Example: xoxb-....",
    "Important: In Slack, invite the bot to each private channel with /invite @YourBotName before sending messages.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Slack step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://api.slack.com/authentication/basics",
  "resources": [
    {
      "name": "Configuration",
      "description": "Slack is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send a message to a Slack channel or direct message.",
          "fields": [
            {
              "name": "Channel",
              "internalKey": "channel",
              "type": "string",
              "required": true,
              "description": "Slack channel or user ID",
              "helpText": "What this field is: The Slack channel where the message will be posted.\nWhere to find it: In Slack, open the channel, choose View channel details, and copy the channel ID from the About section.\nHow to fill it: Use a channel name like #general, or a channel ID like C1234567890.\nExample: #notifications or C1234567890.\nTip: Use the ID when the channel might be renamed.",
              "placeholder": "#general",
              "example": "#general"
            },
            {
              "name": "Blocks",
              "internalKey": "blocks",
              "type": "string",
              "required": false,
              "description": "Slack blocks JSON (optional)",
              "helpText": "What this field is: Slack Block Kit content for rich message layouts with sections, buttons, images, or dividers.\nHow to fill it: Enter a structured data array in [ ] brackets using Slack Block Kit format.\nExample: [{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"*New lead:* {{$json.name}}\"}}].\nTip: Use app.slack.com/block-kit-builder to design the layout, then paste the result here.",
              "placeholder": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Hello\"}}]",
              "example": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Hello\"}}]"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Message text (alias for message)",
              "helpText": "What this field is: The Slack message text.\nHow to fill it: Type the message. Slack supports simple formatting such as *bold*, _italic_, and line breaks.\nExample: New lead from {{$json.name}} ({{$json.email}}).\nTip: Use this field even when using Blocks so Slack has fallback text for notifications.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": false,
              "description": "Bot username",
              "helpText": "What this field is: The sender name Slack shows for this message.\nHow to fill it: Type a short display name, or leave blank to use the bot default name.\nExample: CtrlChecks Bot or Deployment Alert.\nTip: Some Slack apps do not allow overriding the bot name.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Icon Emoji",
              "internalKey": "iconEmoji",
              "type": "string",
              "required": false,
              "description": "Icon emoji",
              "helpText": "What this field is: The emoji Slack shows as the bot icon for this message.\nHow to fill it: Type a Slack emoji code with colons on both sides.\nExample: :rocket: or :warning:.\nTip: Leave blank to use the bot default icon.",
              "placeholder": "Enter Icon Emoji"
            }
          ],
          "outputExample": {
            "ok": true,
            "ts": "1704067200.123456",
            "channel": "C01234ABCDE",
            "message": {
              "text": "Deployment complete ✅",
              "user": "U01234"
            }
          },
          "outputDescription": "ok: true if the message was sent successfully. ts: Message timestamp (Slack message ID). channel: The channel ID where the message was sent. message.text: The message text that was posted.",
          "usageExample": {
            "scenario": "Alert the #deployments channel when a workflow completes or fails",
            "inputValues": {
              "channel": "#deployments",
              "text": "✅ Deploy complete for `{{$json.version}}` at {{$now}}"
            },
            "expectedOutput": "The message appears in the specified channel. Use `{{$json.ts}}` to reference or thread the message later."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Slack node."
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
