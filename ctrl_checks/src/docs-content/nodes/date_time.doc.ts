import type { NodeDoc } from '../types';

export const dateTimeDoc: NodeDoc = {
  "slug": "date_time",
  "displayName": "Date/Time",
  "category": "Data",
  "logoUrl": "/icons/nodes/date_time.svg",
  "description": "Parse, format, and manipulate dates and times",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Operations",
      "description": "Date/Time exposes operation choices directly.",
      "operations": [
        {
          "name": "Format",
          "value": "format",
          "description": "Format a date/time value into a specific string format.",
          "fields": [
            {
              "name": "Date Value",
              "internalKey": "dateValue",
              "type": "string",
              "required": false,
              "description": "Input date",
              "helpText": "What this field is: The date or time value for Input date.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: {{$json.timestamp}}.\nTip: Use {{$json.dateValue}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{{$json.timestamp}}",
              "example": "{{$json.timestamp}}"
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "string",
              "required": false,
              "description": "Output format",
              "helpText": "What this field is: Output format.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: YYYY-MM-DD.\nTip: Use {{$json.format}} when this value comes from an earlier step.",
              "placeholder": "YYYY-MM-DD",
              "example": "YYYY-MM-DD"
            }
          ],
          "outputExample": {
            "formatted": "15 Jan 2025",
            "original": "2025-01-15T10:00:00Z",
            "format": "DD MMM YYYY"
          },
          "outputDescription": "formatted: The date as a formatted string. original: The original input value. format: The format string used.",
          "usageExample": {
            "scenario": "Format an ISO date from a database for display in an email",
            "inputValues": {
              "date": "{{$json.createdAt}}",
              "format": "MMMM D, YYYY"
            },
            "expectedOutput": "Formatted date string like \"January 15, 2025\"."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Calculate",
          "value": "calculate",
          "description": "Calculate using the Date/Time node.",
          "fields": [
            {
              "name": "Date Value",
              "internalKey": "dateValue",
              "type": "string",
              "required": false,
              "description": "Input date",
              "helpText": "What this field is: The date or time value for Input date.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: {{$json.timestamp}}.\nTip: Use {{$json.dateValue}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{{$json.timestamp}}",
              "example": "{{$json.timestamp}}"
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "string",
              "required": false,
              "description": "Output format",
              "helpText": "What this field is: Output format.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: YYYY-MM-DD.\nTip: Use {{$json.format}} when this value comes from an earlier step.",
              "placeholder": "YYYY-MM-DD",
              "example": "YYYY-MM-DD"
            }
          ],
          "outputExample": {
            "text": "2025-01-22T09:00:00.000Z",
            "length": 24
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Date/Time data with calculate after a related upstream event is received",
            "inputValues": {
              "Date Value": "{{$json.timestamp}}",
              "Format": "YYYY-MM-DD"
            },
            "expectedOutput": "Date/Time returns structured calculate data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Extract",
          "value": "extract",
          "description": "Extract using the Date/Time node.",
          "fields": [
            {
              "name": "Date Value",
              "internalKey": "dateValue",
              "type": "string",
              "required": false,
              "description": "Input date",
              "helpText": "What this field is: The date or time value for Input date.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: {{$json.timestamp}}.\nTip: Use {{$json.dateValue}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{{$json.timestamp}}",
              "example": "{{$json.timestamp}}"
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "string",
              "required": false,
              "description": "Output format",
              "helpText": "What this field is: Output format.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: YYYY-MM-DD.\nTip: Use {{$json.format}} when this value comes from an earlier step.",
              "placeholder": "YYYY-MM-DD",
              "example": "YYYY-MM-DD"
            }
          ],
          "outputExample": {
            "text": "Wednesday, January 15, 2025 at 09:00 UTC",
            "length": 40
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Date/Time data with extract after a related upstream event is received",
            "inputValues": {
              "Date Value": "{{$json.timestamp}}",
              "Format": "YYYY-MM-DD"
            },
            "expectedOutput": "Date/Time returns structured extract data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Parse",
          "value": "parse",
          "description": "Parse a date string into a structured object with year, month, day, etc.",
          "fields": [
            {
              "name": "Date Value",
              "internalKey": "dateValue",
              "type": "string",
              "required": false,
              "description": "Input date",
              "helpText": "What this field is: The date or time value for Input date.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: {{$json.timestamp}}.\nTip: Use {{$json.dateValue}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "{{$json.timestamp}}",
              "example": "{{$json.timestamp}}"
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "string",
              "required": false,
              "description": "Output format",
              "helpText": "What this field is: Output format.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: YYYY-MM-DD.\nTip: Use {{$json.format}} when this value comes from an earlier step.",
              "placeholder": "YYYY-MM-DD",
              "example": "YYYY-MM-DD"
            }
          ],
          "outputExample": {
            "year": 2025,
            "month": 1,
            "day": 15,
            "hour": 10,
            "minute": 0,
            "timestamp": 1736935200000,
            "iso": "2025-01-15T10:00:00.000Z"
          },
          "outputDescription": "year/month/day/hour/minute: Components of the parsed date. timestamp: Unix milliseconds. iso: ISO 8601 string.",
          "usageExample": {
            "scenario": "Extract the year from a date string for grouping records",
            "inputValues": {
              "date": "{{$json.dateString}}"
            },
            "expectedOutput": "Use `{{$json.year}}` in SQL queries or conditional checks."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
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
