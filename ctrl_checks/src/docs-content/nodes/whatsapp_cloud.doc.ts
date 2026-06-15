import type { NodeDoc } from '../types';

export const whatsappCloudDoc: NodeDoc = {
  "slug": "whatsapp_cloud",
  "displayName": "WhatsApp Cloud",
  "category": "Communication",
  "logoUrl": "/icons/nodes/whatsapp_cloud.svg",
  "description": "Send messages via WhatsApp Cloud API",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The WhatsApp Cloud connection lets CtrlChecks access your WhatsApp Cloud account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> WhatsApp -> API Setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> WhatsApp Cloud, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple WhatsApp Cloud step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Operations",
      "description": "WhatsApp Cloud exposes operation choices directly.",
      "operations": [
        {
          "name": "SendText",
          "value": "sendText",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
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
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Text content (for sendText)",
              "helpText": "What this field is: Text content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.message}}.\nTip: This field is used for sendText. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.message}}",
              "example": "{{$json.message}}"
            },
            {
              "name": "Message",
              "internalKey": "message",
              "type": "textarea",
              "required": true,
              "description": "Alias for text (legacy)",
              "helpText": "What this field is: Alias for text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.message}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendMedia",
          "value": "sendMedia",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
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
              "name": "Media Url",
              "internalKey": "mediaUrl",
              "type": "url",
              "required": false,
              "description": "Media URL (for sendMedia)",
              "helpText": "What this field is: The web address for Media URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.mediaUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendLocation",
          "value": "sendLocation",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: +1234567890.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendContact",
          "value": "sendContact",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: +1234567890.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendReaction",
          "value": "sendReaction",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: +1234567890.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendTemplate",
          "value": "sendTemplate",
          "description": "Send a WhatsApp message via the Meta WhatsApp Cloud API.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: The type of WhatsApp message to send.\nOptions: send_text (regular text message), send_template (pre-approved template), send_media (image or document).\nExample: send_text for a regular message.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": true,
              "description": "WhatsApp Phone Number ID (required for message operations)",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID from Meta.\nWhere to find it: Meta Business Suite → WhatsApp → Settings → Phone Numbers → copy the Phone Number ID (a long number, NOT the actual phone number itself).\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": true,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: +1234567890.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "+1234567890",
              "example": "+1234567890"
            }
          ],
          "outputExample": {
            "messaging_product": "whatsapp",
            "contacts": [
              {
                "input": "+1234567890",
                "wa_id": "1234567890"
              }
            ],
            "messages": [
              {
                "id": "wamid.abc123"
              }
            ]
          },
          "outputDescription": "contacts: Array of recipient contact objects. messages[0].id: The WhatsApp message ID.",
          "usageExample": {
            "scenario": "Send an order confirmation via WhatsApp after a Shopify purchase",
            "inputValues": {
              "to": "{{$json.customerPhone}}",
              "text": "Hi {{$json.customerName}} 👋 Your order #{{$json.orderId}} has been confirmed! Expected delivery: {{$json.deliveryDate}}."
            },
            "expectedOutput": "WhatsApp message is delivered. Track delivery status using the message ID."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the WhatsApp Cloud node."
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
