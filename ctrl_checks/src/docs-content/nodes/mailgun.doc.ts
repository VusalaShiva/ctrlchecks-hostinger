import type { NodeDoc } from '../types';

export const mailgunDoc: NodeDoc = {
  "slug": "mailgun",
  "displayName": "Mailgun",
  "category": "Communication",
  "logoUrl": "/icons/nodes/mailgun.svg",
  "description": "Send transactional emails using the Mailgun API.",
  "credentialType": "Mailgun API Key",
  "credentialSetupSteps": [
    "What this is: The Mailgun connection lets CtrlChecks access your Mailgun account safely without putting secrets in workflow fields.",
    "Where to start: Mailgun -> Account settings -> API keys.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Mailgun, then sign in or paste the secret value requested there.",
    "Example: key-... or the private API key Mailgun shows.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Mailgun step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://documentation.mailgun.com/en/latest/api_reference.html",
  "resources": [
    {
      "name": "Configuration",
      "description": "Mailgun is configured directly with input fields.",
      "operations": [
        {
          "name": "Send email",
          "value": "send_email",
          "description": "Send a transactional email via Mailgun.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": true,
              "description": "Mailgun sending domain",
              "helpText": "What this field is: Your verified Mailgun sending domain — the domain name you have set up and verified with Mailgun.\nWhere to find it: Log in to mailgun.com → Sending → Domains. Copy the domain name shown there.\nExample: mg.yourcompany.com\nNote: This is NOT your full email address — just the domain part. You must complete DNS verification for this domain before emails will send.",
              "placeholder": "mg.yourdomain.com",
              "example": "mg.yourdomain.com"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": true,
              "description": "Mailgun Private API Key",
              "helpText": "What this field is: Mailgun API key, a secret password that lets CtrlChecks talk to Mailgun safely.\nWhere to find it: Mailgun -> Account settings -> API keys.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: key-... or the private API key Mailgun shows.\nImportant: Treat this like a bank password. Use the sending domain that matches your From address.",
              "placeholder": "key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": true,
              "description": "Sender email address (must be from your verified Mailgun domain)",
              "helpText": "What this field is: Sender email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: noreply@mg.yourdomain.com.\nTip: Use {{$json.from}} when this value comes from an earlier step.",
              "placeholder": "noreply@mg.yourdomain.com",
              "example": "noreply@mg.yourdomain.com"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient email address(es), comma-separated",
              "helpText": "What this field is: Recipient email address , comma-separated.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: user@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "user@example.com",
              "example": "user@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject line",
              "helpText": "What this field is: Email subject line.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello!.\nTip: Use {{$json.subject}} when this value comes from an earlier step.",
              "placeholder": "Hello!",
              "example": "Hello!"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Plain text body of the email",
              "helpText": "What this field is: Plain text body of the email.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Your message here.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "Your message here",
              "example": "Your message here"
            },
            {
              "name": "Html",
              "internalKey": "html",
              "type": "textarea",
              "required": false,
              "description": "HTML body of the email (overrides plain text for HTML clients)",
              "helpText": "What this field is: HTML body of the email.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: <p>Your message</p>.\nTip: Use {{$json.html}} when this value comes from an earlier step.",
              "placeholder": "<p>Your message</p>",
              "example": "<p>Your message</p>"
            }
          ],
          "outputExample": {
            "id": "<20250115.abc123@mg.example.com>",
            "message": "Queued. Thank you."
          },
          "outputDescription": "id: Mailgun message ID for tracking. message: Confirmation from Mailgun.",
          "usageExample": {
            "scenario": "Send a password reset email using Mailgun",
            "inputValues": {
              "from": "noreply@yourapp.com",
              "to": "{{$json.email}}",
              "subject": "Reset your password",
              "html": "<p>Click <a href=\"{{$json.resetUrl}}\">here</a> to reset your password. Link expires in 1 hour.</p>"
            },
            "expectedOutput": "Email is queued by Mailgun. Track delivery in the Mailgun logs using `{{$json.id}}`."
          },
          "externalDocsUrl": "https://documentation.mailgun.com/docs/mailgun/api-reference/overview"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Mailgun node."
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
