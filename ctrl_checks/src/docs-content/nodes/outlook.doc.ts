import type { NodeDoc } from '../types';

export const outlookDoc: NodeDoc = {
  "slug": "outlook",
  "displayName": "Outlook",
  "category": "Communication",
  "logoUrl": "/icons/nodes/outlook.svg",
  "description": "Send/receive emails via Microsoft Outlook API (OAuth)",
  "credentialType": "Microsoft Credential",
  "credentialSetupSteps": [
    "What this is: The Outlook connection lets CtrlChecks access your Outlook account safely without putting secrets in workflow fields.",
    "Where to start: Outlook account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Outlook, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Outlook.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Outlook step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.microsoft.com/en-us/graph/api/resources/mail-api-overview",
  "resources": [
    {
      "name": "Operations",
      "description": "Outlook exposes operation choices directly.",
      "operations": [
        {
          "name": "Send",
          "value": "send",
          "description": "Send an email via Microsoft Outlook.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient email address (required for send operation)",
              "helpText": "What this field is: Who receives this email.\nHow to fill it: One email address, or multiple separated by semicolons.\nExample: client@company.com\nMultiple: alice@x.com; bob@y.com; carol@z.com\nTip: Use {{$json.email}} to pull from an earlier step.",
              "placeholder": "recipient@example.com",
              "example": "recipient@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject (required for send operation)",
              "helpText": "What this field is: Email subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello.\nTip: This field is used for send. Leave it blank when this operation does not need it.",
              "placeholder": "Hello",
              "example": "Hello"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Email body content (required for send operation)",
              "helpText": "What this field is: Structured data for Email body content.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: Email content.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "Email content",
              "example": "Email content"
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": false,
              "description": "Sender email address (optional - uses OAuth account if not provided)",
              "helpText": "What this field is: Sender email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-email@outlook.com.\nTip: Use {{$json.from}} when this value comes from an earlier step.",
              "placeholder": "your-email@outlook.com",
              "example": "your-email@outlook.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Outlook (if using OAuth authentication)",
              "helpText": "What this field is: Outlook token, a secret password that lets CtrlChecks talk to Outlook safely.\nWhere to find it: Outlook account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Outlook.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-outlook-oauth-token",
              "example": "your-outlook-oauth-token"
            },
            {
              "name": "Message Id",
              "internalKey": "messageId",
              "type": "string",
              "required": false,
              "description": "Outlook message ID (required for get operation)",
              "helpText": "What this field is: The Outlook message ID that tells Outlook which item to use.\nWhere to find it: Open the item in Outlook and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: abc123def456.\nTip: Use {{$json.messageId}} when an earlier Outlook step provides this value.",
              "placeholder": "abc123def456",
              "example": "abc123def456"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Outlook search query (for list/search operations)",
              "helpText": "What this field is: Structured data for Outlook search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: from:example@outlook.com.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "from:example@outlook.com",
              "example": "from:example@outlook.com"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of results (for list/search)",
              "helpText": "What this field is: A number used for max results in Outlook / Send.\nHow to fill it: Maximum number of emails to return for List and Search operations. Default 10.\nExample: 20 to return the 20 most recent matching emails.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "id": "AAMkAGI...",
            "subject": "Meeting Tomorrow",
            "sentDateTime": "2025-01-15T09:00:00Z"
          },
          "outputDescription": "id: Outlook message ID. subject: Subject of the sent email. sentDateTime: ISO timestamp when it was sent.",
          "usageExample": {
            "scenario": "Send a daily digest email to your team via Outlook",
            "inputValues": {
              "toRecipients": "team@company.com",
              "subject": "Daily Digest — {{$now}}",
              "body": "{{$json.digestContent}}"
            },
            "expectedOutput": "The email is sent. `{{$json.id}}` can be used to track the message."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/graph/api/resources/message"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List emails from an Outlook mailbox folder.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient email address (required for send operation)",
              "helpText": "What this field is: The email address that Outlook should use for to.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "recipient@example.com",
              "example": "recipient@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject (required for send operation)",
              "helpText": "What this field is: Email subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello.\nTip: This field is used for send. Leave it blank when this operation does not need it.",
              "placeholder": "Hello",
              "example": "Hello"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Email body content (required for send operation)",
              "helpText": "What this field is: Structured data for Email body content.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: Email content.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "Email content",
              "example": "Email content"
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": false,
              "description": "Sender email address (optional - uses OAuth account if not provided)",
              "helpText": "What this field is: Sender email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-email@outlook.com.\nTip: Use {{$json.from}} when this value comes from an earlier step.",
              "placeholder": "your-email@outlook.com",
              "example": "your-email@outlook.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Outlook (if using OAuth authentication)",
              "helpText": "What this field is: Outlook token, a secret password that lets CtrlChecks talk to Outlook safely.\nWhere to find it: Outlook account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Outlook.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-outlook-oauth-token",
              "example": "your-outlook-oauth-token"
            },
            {
              "name": "Message Id",
              "internalKey": "messageId",
              "type": "string",
              "required": false,
              "description": "Outlook message ID (required for get operation)",
              "helpText": "What this field is: The Outlook message ID that tells Outlook which item to use.\nWhere to find it: Open the item in Outlook and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: abc123def456.\nTip: Use {{$json.messageId}} when an earlier Outlook step provides this value.",
              "placeholder": "abc123def456",
              "example": "abc123def456"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Outlook search query (for list/search operations)",
              "helpText": "What this field is: Structured data for Outlook search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: from:example@outlook.com.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "from:example@outlook.com",
              "example": "from:example@outlook.com"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of results (for list/search)",
              "helpText": "What this field is: A number used for max results in Outlook / List.\nHow to fill it: Maximum number of emails to return for List and Search operations. Default 10.\nExample: 20 to return the 20 most recent matching emails.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "value": [
              {
                "id": "AAMkAGI...",
                "subject": "Re: Project Update",
                "from": {
                  "emailAddress": {
                    "address": "colleague@company.com"
                  }
                }
              }
            ]
          },
          "outputDescription": "value: Array of email objects. Each has id, subject, from (with address), and more.",
          "usageExample": {
            "scenario": "Retrieve unread emails from a specific Outlook folder",
            "inputValues": {
              "folder": "Inbox",
              "filter": "isRead eq false",
              "top": "20"
            },
            "expectedOutput": "Returns up to 20 unread emails. Process each with the Get operation to read the full body."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/graph/api/resources/message"
        },
        {
          "name": "Get",
          "value": "get",
          "description": "Fetch a specific Outlook email by its message ID.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient email address (required for send operation)",
              "helpText": "What this field is: The email address that Outlook should use for to.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "recipient@example.com",
              "example": "recipient@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject (required for send operation)",
              "helpText": "What this field is: Email subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello.\nTip: This field is used for send. Leave it blank when this operation does not need it.",
              "placeholder": "Hello",
              "example": "Hello"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Email body content (required for send operation)",
              "helpText": "What this field is: Structured data for Email body content.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: Email content.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "Email content",
              "example": "Email content"
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": false,
              "description": "Sender email address (optional - uses OAuth account if not provided)",
              "helpText": "What this field is: Sender email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-email@outlook.com.\nTip: Use {{$json.from}} when this value comes from an earlier step.",
              "placeholder": "your-email@outlook.com",
              "example": "your-email@outlook.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Outlook (if using OAuth authentication)",
              "helpText": "What this field is: Outlook token, a secret password that lets CtrlChecks talk to Outlook safely.\nWhere to find it: Outlook account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Outlook.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-outlook-oauth-token",
              "example": "your-outlook-oauth-token"
            },
            {
              "name": "Message Id",
              "internalKey": "messageId",
              "type": "string",
              "required": false,
              "description": "Outlook message ID (required for get operation)",
              "helpText": "What this field is: The Outlook message ID that tells Outlook which item to use.\nWhere to find it: Open the item in Outlook and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: abc123def456.\nTip: Use {{$json.messageId}} when an earlier Outlook step provides this value.",
              "placeholder": "abc123def456",
              "example": "abc123def456"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Outlook search query (for list/search operations)",
              "helpText": "What this field is: Structured data for Outlook search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: from:example@outlook.com.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "from:example@outlook.com",
              "example": "from:example@outlook.com"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of results (for list/search)",
              "helpText": "What this field is: A number used for max results in Outlook / Get.\nHow to fill it: Maximum number of emails to return for List and Search operations. Default 10.\nExample: 20 to return the 20 most recent matching emails.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "id": "AAMkAGI...",
            "subject": "Contract Terms",
            "body": {
              "content": "Please review the attached contract."
            },
            "receivedDateTime": "2025-01-14T15:00:00Z"
          },
          "outputDescription": "id: Outlook message ID. subject: Email subject. body.content: Full email body HTML or text. receivedDateTime: When the email was received.",
          "usageExample": {
            "scenario": "Read each email returned from an Outlook List operation",
            "inputValues": {
              "messageId": "{{$json.id}}"
            },
            "expectedOutput": "Full message with body content. Use `{{$json.body.content}}` downstream."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/graph/api/resources/message"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the Outlook node.",
          "fields": [
            {
              "name": "To",
              "internalKey": "to",
              "type": "string",
              "required": false,
              "description": "Recipient email address (required for send operation)",
              "helpText": "What this field is: The email address that Outlook should use for to.\nHow to fill it: Type one email address, or multiple addresses separated by commas if the field supports several recipients.\nExample: alice@example.com\nDynamic example: {{$json.email}} uses the email value from an earlier node.",
              "placeholder": "recipient@example.com",
              "example": "recipient@example.com"
            },
            {
              "name": "Subject",
              "internalKey": "subject",
              "type": "string",
              "required": true,
              "description": "Email subject (required for send operation)",
              "helpText": "What this field is: Email subject.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello.\nTip: This field is used for send. Leave it blank when this operation does not need it.",
              "placeholder": "Hello",
              "example": "Hello"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Email body content (required for send operation)",
              "helpText": "What this field is: Structured data for Email body content.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: Email content.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "Email content",
              "example": "Email content"
            },
            {
              "name": "From",
              "internalKey": "from",
              "type": "string",
              "required": false,
              "description": "Sender email address (optional - uses OAuth account if not provided)",
              "helpText": "What this field is: Sender email address.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: your-email@outlook.com.\nTip: Use {{$json.from}} when this value comes from an earlier step.",
              "placeholder": "your-email@outlook.com",
              "example": "your-email@outlook.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Outlook (if using OAuth authentication)",
              "helpText": "What this field is: Outlook token, a secret password that lets CtrlChecks talk to Outlook safely.\nWhere to find it: Outlook account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Outlook.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "your-outlook-oauth-token",
              "example": "your-outlook-oauth-token"
            },
            {
              "name": "Message Id",
              "internalKey": "messageId",
              "type": "string",
              "required": false,
              "description": "Outlook message ID (required for get operation)",
              "helpText": "What this field is: The Outlook message ID that tells Outlook which item to use.\nWhere to find it: Open the item in Outlook and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: abc123def456.\nTip: Use {{$json.messageId}} when an earlier Outlook step provides this value.",
              "placeholder": "abc123def456",
              "example": "abc123def456"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Outlook search query (for list/search operations)",
              "helpText": "What this field is: Structured data for Outlook search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Outlook.\nExample: from:example@outlook.com.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "from:example@outlook.com",
              "example": "from:example@outlook.com"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of results (for list/search)",
              "helpText": "What this field is: A number used for max results in Outlook / Search.\nHow to fill it: Maximum number of emails to return for List and Search operations. Default 10.\nExample: 20 to return the 20 most recent matching emails.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
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
            "scenario": "Process incoming Outlook data with search after a related upstream event is received",
            "inputValues": {
              "To": "recipient@example.com",
              "Subject": "Hello",
              "Body": "Email content",
              "From": "your-email@outlook.com",
              "Access Token": "your-outlook-oauth-token"
            },
            "expectedOutput": "Outlook returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/graph/api/resources/message"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Outlook node."
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
