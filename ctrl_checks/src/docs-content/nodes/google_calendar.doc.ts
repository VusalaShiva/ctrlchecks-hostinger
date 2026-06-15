import type { NodeDoc } from '../types';

export const googleCalendarDoc: NodeDoc = {
  "slug": "google_calendar",
  "displayName": "Google Calendar",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_calendar.svg",
  "description": "Create, read, update calendar events",
  "credentialType": "Google Calendar OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Calendar connection lets CtrlChecks access your Google Calendar account safely without putting secrets in workflow fields.",
    "Where to start: Google Calendar account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Calendar, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Calendar.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Calendar step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Calendar exposes operation choices directly.",
      "operations": [
        {
          "name": "List",
          "value": "list",
          "description": "List events from a Google Calendar within a time range.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "items": [
              {
                "id": "event1",
                "summary": "Team Standup",
                "start": {
                  "dateTime": "2025-01-15T09:00:00Z"
                },
                "end": {
                  "dateTime": "2025-01-15T09:30:00Z"
                },
                "attendees": [
                  {
                    "email": "alice@example.com"
                  }
                ]
              }
            ],
            "nextPageToken": null
          },
          "outputDescription": "items: Array of calendar event objects. Each has id, summary, start, end, and attendees. nextPageToken: For paginating more events.",
          "usageExample": {
            "scenario": "Get today's meetings and post them as a morning summary to Slack",
            "inputValues": {
              "calendarId": "primary",
              "timeMin": "{{$now}}T00:00:00Z",
              "timeMax": "{{$now}}T23:59:59Z",
              "maxResults": "20"
            },
            "expectedOutput": "Returns all events today. Format `{{$json.items}}` into a Slack message with event summaries and times."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        },
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Google Calendar node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "eventId": "abc123",
            "success": true
          },
          "outputDescription": "eventId: Unique identifier returned by the service.\nsuccess: Whether the service accepted the request.",
          "usageExample": {
            "scenario": "Process incoming Google Calendar data with get after a related upstream event is received",
            "inputValues": {
              "Resource": "event",
              "Calendar Id": "primary",
              "Event Id": "event-id",
              "Summary": "",
              "Start": "{\"key\":\"value\"}"
            },
            "expectedOutput": "Google Calendar returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new event on a Google Calendar.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "id": "newEvent789",
            "summary": "Product Demo",
            "start": {
              "dateTime": "2025-01-20T14:00:00Z"
            },
            "end": {
              "dateTime": "2025-01-20T15:00:00Z"
            },
            "htmlLink": "https://calendar.google.com/event?eid=..."
          },
          "outputDescription": "id: The new calendar event ID. summary: Event title. start/end: Event timestamps. htmlLink: URL to view the event in Google Calendar.",
          "usageExample": {
            "scenario": "Create a Google Calendar event when a Calendly booking is confirmed",
            "inputValues": {
              "calendarId": "primary",
              "summary": "{{$json.eventType}} with {{$json.inviteeName}}",
              "startDateTime": "{{$json.startTime}}",
              "endDateTime": "{{$json.endTime}}",
              "description": "Booked via Calendly"
            },
            "expectedOutput": "Event is created. Share `{{$json.htmlLink}}` as a calendar invite link."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update an existing Google Calendar event.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "id": "event1",
            "summary": "Rescheduled: Team Standup",
            "start": {
              "dateTime": "2025-01-16T10:00:00Z"
            },
            "updated": "2025-01-15T12:00:00Z"
          },
          "outputDescription": "id: The updated event ID. summary: Updated event title. updated: ISO timestamp of the last update.",
          "usageExample": {
            "scenario": "Reschedule an event when a Typeform rescheduling request comes in",
            "inputValues": {
              "calendarId": "primary",
              "eventId": "{{$json.eventId}}",
              "summary": "{{$json.newTitle}}",
              "startDateTime": "{{$json.newStartTime}}"
            },
            "expectedOutput": "Event is updated. `{{$json.updated}}` confirms the time of the change."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Google Calendar node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "eventId": "abc123",
            "success": true
          },
          "outputDescription": "eventId: Unique identifier returned by the service.\nsuccess: Whether the service accepted the request.",
          "usageExample": {
            "scenario": "Process incoming Google Calendar data with delete after a related upstream event is received",
            "inputValues": {
              "Resource": "event",
              "Calendar Id": "primary",
              "Event Id": "event-id",
              "Summary": "",
              "Start": "{\"key\":\"value\"}"
            },
            "expectedOutput": "Google Calendar returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the Google Calendar node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Resource type (event, calendar, etc.)",
              "helpText": "What this field is: The Google Calendar resource type.\nOptions: event (calendar events), calendar (manage calendars).\nExample: event to create, read, or update calendar events.",
              "placeholder": "event",
              "example": "event",
              "defaultValue": "event"
            },
            {
              "name": "Calendar Id",
              "internalKey": "calendarId",
              "type": "string",
              "required": false,
              "description": "Calendar ID",
              "helpText": "What this field is: The date or time value for Calendar ID.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: primary.\nTip: Use {{$json.calendarId}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "primary",
              "example": "primary"
            },
            {
              "name": "Event Id",
              "internalKey": "eventId",
              "type": "string",
              "required": false,
              "description": "Event ID (for update/delete)",
              "helpText": "What this field is: The Event ID that tells Google Calendar which item to use.\nWhere to find it: Open the item in Google Calendar and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: event-id.\nTip: Use {{$json.eventId}} when an earlier Google Calendar step provides this value.",
              "placeholder": "event-id",
              "example": "event-id"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Event summary/title",
              "helpText": "What this field is: Event summary/title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Start",
              "internalKey": "start",
              "type": "json",
              "required": false,
              "description": "Start datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for Start datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.start}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "End",
              "internalKey": "end",
              "type": "json",
              "required": false,
              "description": "End datetime object (Google Calendar format)",
              "helpText": "What this field is: The date or time value for End datetime object.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.end}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Event Data",
              "internalKey": "eventData",
              "type": "json",
              "required": false,
              "description": "Full event payload for create/update (optional)",
              "helpText": "What this field is: Structured data for Full event payload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Calendar.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.eventData}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Event description",
              "helpText": "What this field is: Event description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Time Min",
              "internalKey": "timeMin",
              "type": "string",
              "required": false,
              "description": "Lower bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Lower bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMin}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Min"
            },
            {
              "name": "Time Max",
              "internalKey": "timeMax",
              "type": "string",
              "required": false,
              "description": "Upper bound for list/search (RFC3339 timestamp)",
              "helpText": "What this field is: The date or time value for Upper bound.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2026-06-01T09:00:00+05:30.\nTip: Use {{$json.timeMax}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "Enter Time Max"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for list/search",
              "helpText": "What this field is: The number used for Max results.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 250.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "250",
              "example": "250",
              "defaultValue": "250"
            },
            {
              "name": "Q",
              "internalKey": "q",
              "type": "string",
              "required": false,
              "description": "Free text search query (for events.list)",
              "helpText": "What this field is: Free text search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Q value.\nTip: This field is used for events.list. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Q"
            }
          ],
          "outputExample": {
            "eventId": "abc123",
            "success": true
          },
          "outputDescription": "eventId: Unique identifier returned by the service.\nsuccess: Whether the service accepted the request.",
          "usageExample": {
            "scenario": "Process incoming Google Calendar data with search after a related upstream event is received",
            "inputValues": {
              "Resource": "event",
              "Calendar Id": "primary",
              "Event Id": "event-id",
              "Summary": "",
              "Start": "{\"key\":\"value\"}"
            },
            "expectedOutput": "Google Calendar returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/calendar/api/v3/reference"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Calendar node."
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
