import type { NodeDoc } from '../types';

export const emailDoc: NodeDoc = {
  "slug": "email",
  "displayName": "Email",
  "category": "Communication",
  "logoUrl": "/icons/nodes/email.svg",
  "description": "Send emails via SMTP",
  "credentialType": "SMTP Credential",
  "credentialSetupSteps": [
    "What this is: The Email connection lets CtrlChecks access your Email account safely without putting secrets in workflow fields.",
    "Where to start: Email account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Email, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Email.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Email step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol",
  "resources": [
    {
      "name": "Configuration",
      "description": "Email is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send an email via SMTP using custom server credentials.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient email address",
              "helpText": "What this field is: Recipient email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject",
              "helpText": "What this field is: Email subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Welcome, {{$json.name}}.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Welcome, {{$json.name}}"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Email body (text)",
              "helpText": "What this field is: Email body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Html",
              "internalKey": "html",
              "type": "textarea",
              "required": false,
              "description": "Email body (HTML)",
              "helpText": "What this field is: Email body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Html value.\nTip: Use {{$json.html}} when this value comes from an earlier step.",
              "placeholder": "Enter Html"
            }
          ],
          "outputExample": {
            "accepted": [
              "recipient@example.com"
            ],
            "rejected": [],
            "response": "250 Message queued",
            "messageId": "<abc@smtp.example.com>"
          },
          "outputDescription": "accepted: List of email addresses that accepted the message. rejected: Addresses rejected by the server. response: SMTP server response. messageId: The SMTP message ID.",
          "usageExample": {
            "scenario": "Send transactional emails via your own SMTP server (e.g. a company mail relay)",
            "inputValues": {
              "to": "{{$json.email}}",
              "subject": "Password Reset",
              "html": "<p>Click <a href=\"{{$json.resetLink}}\">here</a> to reset your password.</p>"
            },
            "expectedOutput": "Email is delivered. Check `accepted` to confirm delivery was accepted by the server."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Email node."
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
