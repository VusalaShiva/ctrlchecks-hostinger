import type { NodeDoc } from '../types';

export const zoomVideoDoc: NodeDoc = {
  "slug": "zoom_video",
  "displayName": "Zoom Video",
  "category": "Communication",
  "logoUrl": "/icons/nodes/zoom_video.svg",
  "description": "Create and manage Zoom meetings via the Zoom API",
  "credentialType": "Zoom Credential",
  "credentialSetupSteps": [
    "What this is: The Zoom Video connection lets CtrlChecks access your Zoom Video account safely without putting secrets in workflow fields.",
    "Where to start: Zoom Video account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Zoom Video, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Zoom Video.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Zoom Video step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.zoom.us/docs/internal-apps/s2s-oauth/",
  "resources": [
    {
      "name": "Operations",
      "description": "Zoom Video exposes operation choices directly.",
      "operations": [
        {
          "name": "CreateMeeting",
          "value": "createMeeting",
          "description": "CreateMeeting using the Zoom Video node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Zoom OAuth 2.0 access token",
              "helpText": "What this field is: Zoom Video token, a secret password that lets CtrlChecks talk to Zoom Video safely.\nWhere to find it: Zoom Video account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Zoom Video.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Topic",
              "internalKey": "topic",
              "type": "string",
              "required": false,
              "description": "Meeting topic/title",
              "helpText": "What this field is: Meeting topic/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Team Sync.\nTip: Use {{$json.topic}} when this value comes from an earlier step.",
              "placeholder": "Team Sync",
              "example": "Team Sync"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Meeting duration in minutes",
              "helpText": "What this field is: The number used for Meeting duration in minutes.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 30.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "30",
              "example": "30",
              "defaultValue": "60"
            },
            {
              "name": "Start Time",
              "internalKey": "startTime",
              "type": "string",
              "required": false,
              "description": "Scheduled start time in ISO 8601 format (leave blank for instant meeting)",
              "helpText": "What this field is: The date or time value for Scheduled start time in ISO 8601 format.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-05-01T10:00:00Z.\nTip: Use {{$json.startTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2026-05-01T10:00:00Z",
              "example": "2026-05-01T10:00:00Z"
            },
            {
              "name": "Meeting Id",
              "internalKey": "meetingId",
              "type": "string",
              "required": false,
              "description": "Zoom meeting ID (required for get, delete, update operations)",
              "helpText": "What this field is: The Zoom meeting ID that tells Zoom Video which item to use.\nWhere to find it: Open the item in Zoom Video and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.meetingId}} when an earlier Zoom Video step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming Zoom Video data with create meeting after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Topic": "Team Sync",
              "Duration": "30",
              "Start Time": "2026-05-01T10:00:00Z",
              "Meeting Id": "123456789"
            },
            "expectedOutput": "Zoom Video returns structured create meeting data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "ListMeetings",
          "value": "listMeetings",
          "description": "ListMeetings using the Zoom Video node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Zoom OAuth 2.0 access token",
              "helpText": "What this field is: Zoom Video token, a secret password that lets CtrlChecks talk to Zoom Video safely.\nWhere to find it: Zoom Video account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Zoom Video.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Topic",
              "internalKey": "topic",
              "type": "string",
              "required": false,
              "description": "Meeting topic/title",
              "helpText": "What this field is: Meeting topic/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Team Sync.\nTip: Use {{$json.topic}} when this value comes from an earlier step.",
              "placeholder": "Team Sync",
              "example": "Team Sync"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Meeting duration in minutes",
              "helpText": "What this field is: The number used for Meeting duration in minutes.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 30.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "30",
              "example": "30",
              "defaultValue": "60"
            },
            {
              "name": "Start Time",
              "internalKey": "startTime",
              "type": "string",
              "required": false,
              "description": "Scheduled start time in ISO 8601 format (leave blank for instant meeting)",
              "helpText": "What this field is: The date or time value for Scheduled start time in ISO 8601 format.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-05-01T10:00:00Z.\nTip: Use {{$json.startTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2026-05-01T10:00:00Z",
              "example": "2026-05-01T10:00:00Z"
            },
            {
              "name": "Meeting Id",
              "internalKey": "meetingId",
              "type": "string",
              "required": false,
              "description": "Zoom meeting ID (required for get, delete, update operations)",
              "helpText": "What this field is: The Zoom meeting ID that tells Zoom Video which item to use.\nWhere to find it: Open the item in Zoom Video and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.meetingId}} when an earlier Zoom Video step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming Zoom Video data with list meetings after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Topic": "Team Sync",
              "Duration": "30",
              "Start Time": "2026-05-01T10:00:00Z",
              "Meeting Id": "123456789"
            },
            "expectedOutput": "Zoom Video returns structured list meetings data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "GetMeeting",
          "value": "getMeeting",
          "description": "GetMeeting using the Zoom Video node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Zoom OAuth 2.0 access token",
              "helpText": "What this field is: Zoom Video token, a secret password that lets CtrlChecks talk to Zoom Video safely.\nWhere to find it: Zoom Video account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Zoom Video.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Topic",
              "internalKey": "topic",
              "type": "string",
              "required": false,
              "description": "Meeting topic/title",
              "helpText": "What this field is: Meeting topic/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Team Sync.\nTip: Use {{$json.topic}} when this value comes from an earlier step.",
              "placeholder": "Team Sync",
              "example": "Team Sync"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Meeting duration in minutes",
              "helpText": "What this field is: The number used for Meeting duration in minutes.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 30.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "30",
              "example": "30",
              "defaultValue": "60"
            },
            {
              "name": "Start Time",
              "internalKey": "startTime",
              "type": "string",
              "required": false,
              "description": "Scheduled start time in ISO 8601 format (leave blank for instant meeting)",
              "helpText": "What this field is: The date or time value for Scheduled start time in ISO 8601 format.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-05-01T10:00:00Z.\nTip: Use {{$json.startTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2026-05-01T10:00:00Z",
              "example": "2026-05-01T10:00:00Z"
            },
            {
              "name": "Meeting Id",
              "internalKey": "meetingId",
              "type": "string",
              "required": false,
              "description": "Zoom meeting ID (required for get, delete, update operations)",
              "helpText": "What this field is: The Zoom meeting ID that tells Zoom Video which item to use.\nWhere to find it: Open the item in Zoom Video and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.meetingId}} when an earlier Zoom Video step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming Zoom Video data with get meeting after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Topic": "Team Sync",
              "Duration": "30",
              "Start Time": "2026-05-01T10:00:00Z",
              "Meeting Id": "123456789"
            },
            "expectedOutput": "Zoom Video returns structured get meeting data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "DeleteMeeting",
          "value": "deleteMeeting",
          "description": "DeleteMeeting using the Zoom Video node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Zoom OAuth 2.0 access token",
              "helpText": "What this field is: Zoom Video token, a secret password that lets CtrlChecks talk to Zoom Video safely.\nWhere to find it: Zoom Video account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Zoom Video.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Topic",
              "internalKey": "topic",
              "type": "string",
              "required": false,
              "description": "Meeting topic/title",
              "helpText": "What this field is: Meeting topic/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Team Sync.\nTip: Use {{$json.topic}} when this value comes from an earlier step.",
              "placeholder": "Team Sync",
              "example": "Team Sync"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Meeting duration in minutes",
              "helpText": "What this field is: The number used for Meeting duration in minutes.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 30.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "30",
              "example": "30",
              "defaultValue": "60"
            },
            {
              "name": "Start Time",
              "internalKey": "startTime",
              "type": "string",
              "required": false,
              "description": "Scheduled start time in ISO 8601 format (leave blank for instant meeting)",
              "helpText": "What this field is: The date or time value for Scheduled start time in ISO 8601 format.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-05-01T10:00:00Z.\nTip: Use {{$json.startTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2026-05-01T10:00:00Z",
              "example": "2026-05-01T10:00:00Z"
            },
            {
              "name": "Meeting Id",
              "internalKey": "meetingId",
              "type": "string",
              "required": false,
              "description": "Zoom meeting ID (required for get, delete, update operations)",
              "helpText": "What this field is: The Zoom meeting ID that tells Zoom Video which item to use.\nWhere to find it: Open the item in Zoom Video and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.meetingId}} when an earlier Zoom Video step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming Zoom Video data with delete meeting after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Topic": "Team Sync",
              "Duration": "30",
              "Start Time": "2026-05-01T10:00:00Z",
              "Meeting Id": "123456789"
            },
            "expectedOutput": "Zoom Video returns structured delete meeting data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "UpdateMeeting",
          "value": "updateMeeting",
          "description": "UpdateMeeting using the Zoom Video node.",
          "fields": [
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": true,
              "description": "Zoom OAuth 2.0 access token",
              "helpText": "What this field is: Zoom Video token, a secret password that lets CtrlChecks talk to Zoom Video safely.\nWhere to find it: Zoom Video account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by Zoom Video.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Topic",
              "internalKey": "topic",
              "type": "string",
              "required": false,
              "description": "Meeting topic/title",
              "helpText": "What this field is: Meeting topic/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Team Sync.\nTip: Use {{$json.topic}} when this value comes from an earlier step.",
              "placeholder": "Team Sync",
              "example": "Team Sync"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Meeting duration in minutes",
              "helpText": "What this field is: The number used for Meeting duration in minutes.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 30.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "30",
              "example": "30",
              "defaultValue": "60"
            },
            {
              "name": "Start Time",
              "internalKey": "startTime",
              "type": "string",
              "required": false,
              "description": "Scheduled start time in ISO 8601 format (leave blank for instant meeting)",
              "helpText": "What this field is: The date or time value for Scheduled start time in ISO 8601 format.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-05-01T10:00:00Z.\nTip: Use {{$json.startTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2026-05-01T10:00:00Z",
              "example": "2026-05-01T10:00:00Z"
            },
            {
              "name": "Meeting Id",
              "internalKey": "meetingId",
              "type": "string",
              "required": false,
              "description": "Zoom meeting ID (required for get, delete, update operations)",
              "helpText": "What this field is: The Zoom meeting ID that tells Zoom Video which item to use.\nWhere to find it: Open the item in Zoom Video and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.meetingId}} when an earlier Zoom Video step provides this value.",
              "placeholder": "123456789",
              "example": "123456789"
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
            "scenario": "Process incoming Zoom Video data with update meeting after a related upstream event is received",
            "inputValues": {
              "Access Token": "",
              "Topic": "Team Sync",
              "Duration": "30",
              "Start Time": "2026-05-01T10:00:00Z",
              "Meeting Id": "123456789"
            },
            "expectedOutput": "Zoom Video returns structured update meeting data that downstream nodes can reference with {{$json.fieldName}}."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Zoom Video node."
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
