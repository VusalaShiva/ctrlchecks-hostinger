import type { NodeDoc } from '../types';

export const whatsappDoc: NodeDoc = {
  "slug": "whatsapp",
  "displayName": "WhatsApp",
  "category": "Communication",
  "logoUrl": "/icons/nodes/whatsapp.svg",
  "description": "Send messages, manage contacts and conversations via WhatsApp Business API",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The WhatsApp connection lets CtrlChecks access your WhatsApp account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> WhatsApp -> API Setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> WhatsApp, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple WhatsApp step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Operations",
      "description": "WhatsApp exposes operation choices directly.",
      "operations": [
        {
          "name": "SendText",
          "value": "sendText",
          "description": "SendText using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Message text",
              "helpText": "What this field is: The message the recipient will receive on WhatsApp.\nHow to fill it: Type your message. Keep it clear and conversational.\nExample: Hello {{$json.name}}, your delivery is arriving today between 2-4 PM. Track it here: {{$json.trackingUrl}}\nTip: Use {{$json.field}} to personalize the message with data from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Preview Url",
              "internalKey": "previewUrl",
              "type": "url",
              "required": false,
              "description": "Enable URL preview",
              "helpText": "What this field is: The web address for Enable URL preview.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: false.\nTip: Use {{$json.previewUrl}} when the URL comes from an earlier step.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send text after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Text": ""
            },
            "expectedOutput": "WhatsApp returns structured send text data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendMedia",
          "value": "sendMedia",
          "description": "SendMedia using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Media Type",
              "internalKey": "mediaType",
              "type": "string",
              "required": false,
              "description": "Media type",
              "helpText": "What this field is: The type of media file to send.\nOptions: image, video, audio, document, sticker.\nExample: image for a JPEG or PNG; document for a PDF; video for an MP4.",
              "placeholder": "image",
              "example": "image"
            },
            {
              "name": "Media Url",
              "internalKey": "mediaUrl",
              "type": "url",
              "required": false,
              "description": "Media URL",
              "helpText": "What this field is: The web address for Media URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.mediaUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Media Id",
              "internalKey": "mediaId",
              "type": "string",
              "required": false,
              "description": "Media ID",
              "helpText": "What this field is: The Media ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.mediaId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Media caption",
              "helpText": "What this field is: Media caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Caption value.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "Enter Caption"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send media after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Media Type": "image"
            },
            "expectedOutput": "WhatsApp returns structured send media data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendLocation",
          "value": "sendLocation",
          "description": "SendLocation using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Latitude",
              "internalKey": "latitude",
              "type": "number",
              "required": false,
              "description": "Location latitude",
              "helpText": "What this field is: The number used for Location latitude.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.latitude}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Longitude",
              "internalKey": "longitude",
              "type": "number",
              "required": false,
              "description": "Location longitude",
              "helpText": "What this field is: The number used for Location longitude.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.longitude}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Location Name",
              "internalKey": "locationName",
              "type": "string",
              "required": false,
              "description": "Location name",
              "helpText": "What this field is: Location name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Location Name value.\nTip: Use {{$json.locationName}} when this value comes from an earlier step.",
              "placeholder": "Enter Location Name"
            },
            {
              "name": "Address",
              "internalKey": "address",
              "type": "string",
              "required": false,
              "description": "Location address",
              "helpText": "What this field is: Location address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Address value.\nTip: Use {{$json.address}} when this value comes from an earlier step.",
              "placeholder": "Enter Address"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send location after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Latitude": "10"
            },
            "expectedOutput": "WhatsApp returns structured send location data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendContact",
          "value": "sendContact",
          "description": "SendContact using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Contacts",
              "internalKey": "contacts",
              "type": "json",
              "required": false,
              "description": "Contact objects",
              "helpText": "What this field is: Structured data for Contact objects.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: [{\"name\":{\"formatted_name\":\"Alice Kumar\",\"first_name\":\"Alice\"},\"phones\":[{\"phone\":\"+919876543210\",\"type\":\"MOBILE\"}]}].\nTip: Use {{$json.contacts}} when an earlier step already prepared this data.",
              "placeholder": "[{\"name\":{\"formatted_name\":\"Alice Kumar\",\"first_name\":\"Alice\"},\"phones\":[{\"phone\":\"+919876543210\",\"type\":\"MOBILE\"}]}]",
              "example": "[{\"name\":{\"formatted_name\":\"Alice Kumar\",\"first_name\":\"Alice\"},\"phones\":[{\"phone\":\"+919876543210\",\"type\":\"MOBILE\"}]}]"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send contact after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Contacts": "[{\"name\":{\"formatted_name\":\"Alice Kumar\",\"first_name\":\"Alice\"},\"phones\":[{\"phone\":\"+919876543210\",\"type\":\"MOBILE\"}]}]"
            },
            "expectedOutput": "WhatsApp returns structured send contact data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendTemplate",
          "value": "sendTemplate",
          "description": "SendTemplate using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Template Name",
              "internalKey": "templateName",
              "type": "textarea",
              "required": false,
              "description": "Template name",
              "helpText": "What this field is: Template name.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Template Name value.\nTip: Use {{$json.templateName}} when this value comes from an earlier step.",
              "placeholder": "Enter Template Name"
            },
            {
              "name": "Language",
              "internalKey": "language",
              "type": "string",
              "required": false,
              "description": "Template language code",
              "helpText": "What this field is: The language code of the WhatsApp template you are sending.\nExample: en_US for US English, pt_BR for Brazilian Portuguese, ar for Arabic.\nWhere to find it: Meta Business Suite → WhatsApp → Message Templates — the Language column shows the code.",
              "placeholder": "Enter Language"
            },
            {
              "name": "Template Components",
              "internalKey": "templateComponents",
              "type": "textarea",
              "required": false,
              "description": "Template components",
              "helpText": "What this field is: Template components.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: [\"item\"].\nTip: Use {{$json.templateComponents}} when this value comes from an earlier step.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send template after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Template Name": ""
            },
            "expectedOutput": "WhatsApp returns structured send template data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendInteractiveButtons",
          "value": "sendInteractiveButtons",
          "description": "SendInteractiveButtons using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Body Text",
              "internalKey": "bodyText",
              "type": "textarea",
              "required": false,
              "description": "Interactive message body text",
              "helpText": "What this field is: Structured data for Interactive message body text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.bodyText}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Header Text",
              "internalKey": "headerText",
              "type": "string",
              "required": false,
              "description": "Interactive message header text",
              "helpText": "What this field is: Interactive message header text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.headerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Footer Text",
              "internalKey": "footerText",
              "type": "string",
              "required": false,
              "description": "Interactive message footer text",
              "helpText": "What this field is: Interactive message footer text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.footerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Buttons",
              "internalKey": "buttons",
              "type": "json",
              "required": false,
              "description": "Interactive buttons",
              "helpText": "What this field is: Structured data for Interactive buttons.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: [\"item\"].\nTip: Use {{$json.buttons}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send interactive buttons after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Body Text": ""
            },
            "expectedOutput": "WhatsApp returns structured send interactive buttons data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendInteractiveList",
          "value": "sendInteractiveList",
          "description": "SendInteractiveList using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Body Text",
              "internalKey": "bodyText",
              "type": "textarea",
              "required": false,
              "description": "Interactive message body text",
              "helpText": "What this field is: Structured data for Interactive message body text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.bodyText}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Header Text",
              "internalKey": "headerText",
              "type": "string",
              "required": false,
              "description": "Interactive message header text",
              "helpText": "What this field is: Interactive message header text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.headerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Footer Text",
              "internalKey": "footerText",
              "type": "string",
              "required": false,
              "description": "Interactive message footer text",
              "helpText": "What this field is: Interactive message footer text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.footerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Button Text",
              "internalKey": "buttonText",
              "type": "string",
              "required": false,
              "description": "List button text",
              "helpText": "What this field is: List button text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.buttonText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Sections",
              "internalKey": "sections",
              "type": "json",
              "required": false,
              "description": "List sections",
              "helpText": "What this field is: Structured data for List sections.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: [\"item\"].\nTip: Use {{$json.sections}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send interactive list after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Body Text": ""
            },
            "expectedOutput": "WhatsApp returns structured send interactive list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "SendInteractiveCTA",
          "value": "sendInteractiveCTA",
          "description": "SendInteractiveCTA using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Business Account Id",
              "internalKey": "businessAccountId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Business Account ID",
              "helpText": "What this field is: The WhatsApp Business Account ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.businessAccountId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient phone number",
              "helpText": "What this field is: Recipient phone number.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: alice@example.com.\nTip: Use {{$json.to}} when this value comes from an earlier step.",
              "placeholder": "alice@example.com"
            },
            {
              "name": "Body Text",
              "internalKey": "bodyText",
              "type": "textarea",
              "required": false,
              "description": "Interactive message body text",
              "helpText": "What this field is: Structured data for Interactive message body text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by WhatsApp.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.bodyText}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Header Text",
              "internalKey": "headerText",
              "type": "string",
              "required": false,
              "description": "Interactive message header text",
              "helpText": "What this field is: Interactive message header text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.headerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Footer Text",
              "internalKey": "footerText",
              "type": "string",
              "required": false,
              "description": "Interactive message footer text",
              "helpText": "What this field is: Interactive message footer text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.footerText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
            },
            {
              "name": "Cta Url",
              "internalKey": "ctaUrl",
              "type": "url",
              "required": false,
              "description": "CTA URL object",
              "helpText": "What this field is: The web address for CTA URL object.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.ctaUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with send interactive cta after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Business Account Id": "abc123",
              "To": "",
              "Body Text": ""
            },
            "expectedOutput": "WhatsApp returns structured send interactive cta data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/whatsapp/cloud-api/reference"
        },
        {
          "name": "MarkAsRead",
          "value": "markAsRead",
          "description": "MarkAsRead using the WhatsApp node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "WhatsApp resource",
              "helpText": "What this field is: WhatsApp resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: message.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "message",
              "example": "message",
              "defaultValue": "message"
            },
            {
              "name": "Phone Number Id",
              "internalKey": "phoneNumberId",
              "type": "string",
              "required": false,
              "description": "WhatsApp Phone Number ID",
              "helpText": "What this field is: Your WhatsApp Business Phone Number ID — a long number Meta assigns to your business phone number.\nWhere to find it: Log in to Meta Business Suite (business.facebook.com) → WhatsApp → Settings → Phone Numbers. Copy the \"Phone Number ID\" shown there — it is a long number like 123456789012345. This is NOT your actual phone number — it is a Meta-assigned ID.\nExample: 123456789012345",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Message Id",
              "internalKey": "messageId",
              "type": "string",
              "required": false,
              "description": "Message ID",
              "helpText": "What this field is: The Message ID that tells WhatsApp which item to use.\nWhere to find it: Open the item in WhatsApp and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.messageId}} when an earlier WhatsApp step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming WhatsApp data with mark as read after a related upstream event is received",
            "inputValues": {
              "Resource": "message",
              "Phone Number Id": "abc123",
              "Message Id": "abc123"
            },
            "expectedOutput": "WhatsApp returns structured mark as read data that downstream nodes can reference with {{$json.fieldName}}."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the WhatsApp node."
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
