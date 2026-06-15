import type { NodeDoc } from '../types';

export const calendlyDoc: NodeDoc = {
  "slug": "calendly",
  "displayName": "Calendly",
  "category": "Data",
  "logoUrl": "/icons/nodes/calendly.svg",
  "description": "Fetch events, event types, scheduled meetings, and user info from Calendly.",
  "credentialType": "Calendly API Key",
  "credentialSetupSteps": [
    "What this is: The Calendly connection lets CtrlChecks access your Calendly account safely without putting secrets in workflow fields.",
    "Where to start: Calendly account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Calendly, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Calendly.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Calendly step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.calendly.com/api-docs/ZG9jOjExMjM0NzU2-calendly-developer-portal",
  "resources": [
    {
      "name": "Operations",
      "description": "Calendly exposes operation choices directly.",
      "operations": [
        {
          "name": "Get events",
          "value": "get_events",
          "description": "Get events using the Calendly node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Calendly personal access token",
              "helpText": "What this field is: Calendly token, a secret password that lets CtrlChecks talk to Calendly safely.\nWhere to find it: Calendly account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Calendly.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "User Uri",
              "internalKey": "userUri",
              "type": "string",
              "required": false,
              "description": "Calendly user URI",
              "helpText": "What this field is: The web address for Calendly user URI.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/resource.\nTip: Use {{$json.userUri}} when the URL comes from an earlier step.",
              "placeholder": "Enter User Uri"
            },
            {
              "name": "Event Type Uri",
              "internalKey": "eventTypeUri",
              "type": "string",
              "required": false,
              "description": "Calendly event type URI",
              "helpText": "What this field is: The unique URI of the Calendly event type.\nWhere to find it: Calendly API response or the event type URL in your Calendly dashboard.\nExample: https://api.calendly.com/event_types/ABCDEFGH",
              "placeholder": "Enter Event Type Uri"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_events",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Calendly data with get events after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "User Uri": "",
              "Event Type Uri": ""
            },
            "expectedOutput": "Calendly returns structured get events data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.calendly.com/api-docs"
        },
        {
          "name": "Get event types",
          "value": "get_event_types",
          "description": "Get event types using the Calendly node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Calendly personal access token",
              "helpText": "What this field is: Calendly token, a secret password that lets CtrlChecks talk to Calendly safely.\nWhere to find it: Calendly account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Calendly.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "User Uri",
              "internalKey": "userUri",
              "type": "string",
              "required": false,
              "description": "Calendly user URI",
              "helpText": "What this field is: The web address for Calendly user URI.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/resource.\nTip: Use {{$json.userUri}} when the URL comes from an earlier step.",
              "placeholder": "Enter User Uri"
            },
            {
              "name": "Event Type Uri",
              "internalKey": "eventTypeUri",
              "type": "string",
              "required": false,
              "description": "Calendly event type URI",
              "helpText": "What this field is: The unique URI of the Calendly event type.\nWhere to find it: Calendly API response or the event type URL in your Calendly dashboard.\nExample: https://api.calendly.com/event_types/ABCDEFGH",
              "placeholder": "Enter Event Type Uri"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_event_types",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Calendly data with get event types after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "User Uri": "",
              "Event Type Uri": ""
            },
            "expectedOutput": "Calendly returns structured get event types data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.calendly.com/api-docs"
        },
        {
          "name": "Get scheduled events",
          "value": "get_scheduled_events",
          "description": "Get scheduled events using the Calendly node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Calendly personal access token",
              "helpText": "What this field is: Calendly token, a secret password that lets CtrlChecks talk to Calendly safely.\nWhere to find it: Calendly account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Calendly.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "User Uri",
              "internalKey": "userUri",
              "type": "string",
              "required": false,
              "description": "Calendly user URI",
              "helpText": "What this field is: The web address for Calendly user URI.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/resource.\nTip: Use {{$json.userUri}} when the URL comes from an earlier step.",
              "placeholder": "Enter User Uri"
            },
            {
              "name": "Event Type Uri",
              "internalKey": "eventTypeUri",
              "type": "string",
              "required": false,
              "description": "Calendly event type URI",
              "helpText": "What this field is: The unique URI of the Calendly event type.\nWhere to find it: Calendly API response or the event type URL in your Calendly dashboard.\nExample: https://api.calendly.com/event_types/ABCDEFGH",
              "placeholder": "Enter Event Type Uri"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_scheduled_events",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Calendly data with get scheduled events after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "User Uri": "",
              "Event Type Uri": ""
            },
            "expectedOutput": "Calendly returns structured get scheduled events data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.calendly.com/api-docs"
        },
        {
          "name": "Get user",
          "value": "get_user",
          "description": "Get user using the Calendly node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Calendly personal access token",
              "helpText": "What this field is: Calendly token, a secret password that lets CtrlChecks talk to Calendly safely.\nWhere to find it: Calendly account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Calendly.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "User Uri",
              "internalKey": "userUri",
              "type": "string",
              "required": false,
              "description": "Calendly user URI",
              "helpText": "What this field is: The web address for Calendly user URI.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/resource.\nTip: Use {{$json.userUri}} when the URL comes from an earlier step.",
              "placeholder": "Enter User Uri"
            },
            {
              "name": "Event Type Uri",
              "internalKey": "eventTypeUri",
              "type": "string",
              "required": false,
              "description": "Calendly event type URI",
              "helpText": "What this field is: The unique URI of the Calendly event type.\nWhere to find it: Calendly API response or the event type URL in your Calendly dashboard.\nExample: https://api.calendly.com/event_types/ABCDEFGH",
              "placeholder": "Enter Event Type Uri"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_user",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Calendly data with get user after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "User Uri": "",
              "Event Type Uri": ""
            },
            "expectedOutput": "Calendly returns structured get user data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.calendly.com/api-docs"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Calendly node."
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
