import type { NodeDoc } from '../types';

export const microsoftTeamsDoc: NodeDoc = {
  "slug": "microsoft_teams",
  "displayName": "Microsoft Teams",
  "category": "Communication",
  "logoUrl": "/icons/nodes/microsoft_teams.svg",
  "description": "Send messages to Microsoft Teams",
  "credentialType": "Microsoft Credential",
  "credentialSetupSteps": [
    "What this is: The Microsoft Teams connection lets CtrlChecks access your Microsoft Teams account safely without putting secrets in workflow fields.",
    "Where to start: Microsoft Teams account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Microsoft Teams, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Microsoft Teams.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Microsoft Teams step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.microsoft.com/en-us/graph/api/resources/mail-api-overview",
  "resources": [
    {
      "name": "Configuration",
      "description": "Microsoft Teams is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send a message to a Microsoft Teams channel or chat.",
          "fields": [
            {
              "name": "Webhook Url",
              "internalKey": "webhookUrl",
              "type": "url",
              "required": true,
              "description": "Teams webhook URL",
              "helpText": "What this field is: The Incoming Webhook URL for the Microsoft Teams channel you want to post to.\nWhere to find it: In Teams → right-click the channel → Connectors → Incoming Webhook → Configure → copy the URL.\nExample: https://outlook.office.com/webhook/xxx.../IncomingWebhook/...",
              "placeholder": "https://outlook.office.com/webhook/...",
              "example": "https://outlook.office.com/webhook/..."
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
            "id": "1705123456789",
            "etag": "1705123456789",
            "type": "message",
            "createdDateTime": "2025-01-15T10:00:00Z",
            "body": {
              "content": "Sprint completed ✅"
            }
          },
          "outputDescription": "id: Teams message ID. createdDateTime: When the message was created. body.content: The message text.",
          "usageExample": {
            "scenario": "Post a sprint completion summary to a Teams channel",
            "inputValues": {
              "teamId": "{{$env.TEAMS_TEAM_ID}}",
              "channelId": "{{$env.TEAMS_CHANNEL_ID}}",
              "message": "🏁 Sprint {{$json.sprintName}} completed!\n\n**Delivered:** {{$json.storiesCompleted}} stories\n**Velocity:** {{$json.velocity}} points"
            },
            "expectedOutput": "The message is posted in Teams. Use `{{$json.id}}` to reply or reference the message."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Microsoft Teams node."
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
