import type { NodeDoc } from '../types';

export const twilioDoc: NodeDoc = {
  "slug": "twilio",
  "displayName": "Twilio",
  "category": "Communication",
  "logoUrl": "/icons/nodes/twilio.svg",
  "description": "Send SMS/Voice via Twilio",
  "credentialType": "Twilio Credential",
  "credentialSetupSteps": [
    "What this is: The Twilio connection lets CtrlChecks access your Twilio account safely without putting secrets in workflow fields.",
    "Where to start: Twilio Console -> Account -> API keys and tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Twilio, then sign in or paste the secret value requested there.",
    "Example: the auth token Twilio shows.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Twilio step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.twilio.com/docs/usage/api",
  "resources": [
    {
      "name": "Configuration",
      "description": "Twilio is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send an SMS message via Twilio.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: +1234567890.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            },
            {
              "name": "Message",
              "internalKey": "message",
              "type": "textarea",
              "required": true,
              "description": "SMS message text",
              "helpText": "What this field is: SMS message text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.message}}.\nTip: Use {{$json.message}} when this value comes from an earlier step.",
              "placeholder": "{{$json.message}}",
              "example": "{{$json.message}}"
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": false,
              "description": "Sender phone number",
              "helpText": "What this field is: Your Twilio phone number — the number the SMS will be sent FROM.\nWhere to find it: Log in to console.twilio.com → Phone Numbers → Manage → Active Numbers. Copy one of your Twilio numbers.\nExample: +15005550006\nNote: This must be a number you own in Twilio — you cannot use a personal number here.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            },
            {
              "name": "Account Sid",
              "internalKey": "accountSid",
              "type": "string",
              "required": false,
              "description": "Twilio Account SID (optional if stored in Twilio vault credential JSON)",
              "helpText": "What this field is: Your Twilio Account SID — a unique identifier for your Twilio account.\nWhere to find it: Log in to console.twilio.com → the Dashboard shows Account SID right at the top. It starts with AC.\nExample: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nNote: The Account SID is not secret — it is safe to store in config. But the Auth Token is secret.",
              "placeholder": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            },
            {
              "name": "Auth Token",
              "internalKey": "authToken",
              "type": "string",
              "required": false,
              "description": "Twilio Auth Token (optional if provided via vault)",
              "helpText": "What this field is: Your Twilio Auth Token — the password for your Twilio account.\nWhere to find it: console.twilio.com → Dashboard → click \"Show\" next to Auth Token.\nKeep this private — do not share it or commit it to code.\nExample: your32characterauthtokenhere1234",
              "placeholder": "token_..."
            }
          ],
          "outputExample": {
            "sid": "SM1234abcd5678efgh",
            "status": "queued",
            "to": "+15551234567",
            "from": "+15559876543",
            "body": "Your verification code is 4821."
          },
          "outputDescription": "sid: Twilio message SID for tracking. status: Message delivery status (queued, sent, delivered, failed). to / from: Recipient and sender phone numbers.",
          "usageExample": {
            "scenario": "Send a 2FA SMS verification code to a user who is logging in",
            "inputValues": {
              "to": "{{$json.phoneNumber}}",
              "body": "Your CtrlChecks verification code is {{$json.otpCode}}. Expires in 10 minutes."
            },
            "expectedOutput": "SMS is queued. Use `{{$json.sid}}` to check delivery status via the Twilio console."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Twilio node."
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
