import type { NodeDoc } from '../types';

export const schedulewiseDoc: NodeDoc = {
  "slug": "schedulewise",
  "displayName": "ScheduleWise",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/schedulewise.svg",
  "description": "ScheduleWise appointment scheduling — retrieve, create, update, and delete appointments via the ScheduleWise REST API",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Configuration",
      "description": "ScheduleWise is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the ScheduleWise node.",
          "fields": [
            {
              "name": "Date From",
              "internalKey": "dateFrom",
              "type": "string",
              "required": false,
              "description": "Start date filter for getSchedules (ISO 8601, e.g. \"2024-01-01\"). Supports {{ }} expressions.",
              "helpText": "What this field is: The date or time value for Start date filter for getSchedules . Supports {{ }} expressions..\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2024-01-01.\nTip: Use {{$json.dateFrom}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2024-01-01",
              "example": "2024-01-01"
            },
            {
              "name": "Date To",
              "internalKey": "dateTo",
              "type": "string",
              "required": false,
              "description": "End date filter for getSchedules (ISO 8601). Supports {{ }} expressions.",
              "helpText": "What this field is: The date or time value for End date filter for getSchedules . Supports {{ }} expressions..\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2024-01-31.\nTip: Use {{$json.dateTo}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2024-01-31",
              "example": "2024-01-31"
            },
            {
              "name": "Patient Id",
              "internalKey": "patientId",
              "type": "string",
              "required": false,
              "description": "Patient identifier. Supports {{ }} expressions.",
              "helpText": "What this field is: The Patient identifier. Supports {{ }} expressions. that tells ScheduleWise which item to use.\nWhere to find it: Open the item in ScheduleWise and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: patient_123.\nTip: Use {{$json.patientId}} when an earlier ScheduleWise step provides this value.",
              "placeholder": "patient_123",
              "example": "patient_123"
            },
            {
              "name": "Staff Id",
              "internalKey": "staffId",
              "type": "string",
              "required": false,
              "description": "Staff member identifier. Supports {{ }} expressions.",
              "helpText": "What this field is: The Staff member identifier. Supports {{ }} expressions. that tells ScheduleWise which item to use.\nWhere to find it: Open the item in ScheduleWise and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: staff_456.\nTip: Use {{$json.staffId}} when an earlier ScheduleWise step provides this value.",
              "placeholder": "staff_456",
              "example": "staff_456"
            },
            {
              "name": "Appointment Id",
              "internalKey": "appointmentId",
              "type": "string",
              "required": false,
              "description": "Appointment identifier (required for updateAppointment and deleteAppointment). Supports {{ }} expressions.",
              "helpText": "What this field is: The Appointment identifier . Supports {{ }} expressions. that tells ScheduleWise which item to use.\nWhere to find it: Open the item in ScheduleWise and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: appt_789.\nTip: Use {{$json.appointmentId}} when an earlier ScheduleWise step provides this value.",
              "placeholder": "appt_789",
              "example": "appt_789"
            },
            {
              "name": "Start Date Time",
              "internalKey": "startDateTime",
              "type": "string",
              "required": false,
              "description": "Appointment start date/time (ISO 8601). Supports {{ }} expressions.",
              "helpText": "What this field is: The date or time value for Appointment start date/time . Supports {{ }} expressions..\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2024-01-15T09:00:00Z.\nTip: Use {{$json.startDateTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2024-01-15T09:00:00Z",
              "example": "2024-01-15T09:00:00Z"
            },
            {
              "name": "End Date Time",
              "internalKey": "endDateTime",
              "type": "string",
              "required": false,
              "description": "Appointment end date/time (ISO 8601). Supports {{ }} expressions.",
              "helpText": "What this field is: The date or time value for Appointment end date/time . Supports {{ }} expressions..\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 2024-01-15T10:00:00Z.\nTip: Use {{$json.endDateTime}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "2024-01-15T10:00:00Z",
              "example": "2024-01-15T10:00:00Z"
            },
            {
              "name": "Service Type",
              "internalKey": "serviceType",
              "type": "string",
              "required": false,
              "description": "Type of service for the appointment. Supports {{ }} expressions.",
              "helpText": "What this field is: Type of service for the appointment. Supports {{ }} expressions..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: consultation.\nTip: Use {{$json.serviceType}} when this value comes from an earlier step.",
              "placeholder": "consultation",
              "example": "consultation"
            },
            {
              "name": "Notes",
              "internalKey": "notes",
              "type": "string",
              "required": false,
              "description": "Additional notes for the appointment. Supports {{ }} expressions.",
              "helpText": "What this field is: Additional notes for the appointment. Supports {{ }} expressions..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Patient requested morning slot.\nTip: Use {{$json.notes}} when this value comes from an earlier step.",
              "placeholder": "Patient requested morning slot",
              "example": "Patient requested morning slot"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "string",
              "required": false,
              "description": "Appointment status (for updateAppointment). Supports {{ }} expressions.",
              "helpText": "What this field is: Appointment status . Supports {{ }} expressions..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: confirmed.\nTip: This field is used for updateAppointment. Leave it blank when this operation does not need it.",
              "placeholder": "confirmed",
              "example": "confirmed"
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Maximum number of results to return for getSchedules.",
              "helpText": "What this field is: The number used for Maximum number of results to return for getSchedules..\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "50"
            },
            {
              "name": "Hard Delete",
              "internalKey": "hardDelete",
              "type": "boolean",
              "required": false,
              "description": "When true, permanently deletes the appointment (appends ?hardDelete=true). Default is soft delete.",
              "helpText": "What this field is: An on/off switch for When true, permanently deletes the appointment . Default is soft delete..\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use hard delete; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Timeout Sec",
              "internalKey": "timeoutSec",
              "type": "number",
              "required": false,
              "description": "HTTP request timeout in seconds. Default: 30.",
              "helpText": "What this field is: The date or time value for HTTP request timeout in seconds. Default: 30..\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 15.\nTip: Use {{$json.timeoutSec}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "15",
              "example": "15",
              "defaultValue": "30"
            },
            {
              "name": "Retries",
              "internalKey": "retries",
              "type": "number",
              "required": false,
              "description": "Number of retry attempts on 5xx or network errors (exponential backoff). Default: 0.",
              "helpText": "What this field is: The number used for Number of retry attempts on 5xx or network errors . Default: 0..\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 0.\nTip: Use {{$json.retries}} when the number comes from an earlier step.",
              "placeholder": "0",
              "example": "0",
              "defaultValue": "0"
            },
            {
              "name": "Output Format",
              "internalKey": "outputFormat",
              "type": "string",
              "required": false,
              "description": "Output format: \"json\" (default) or \"raw\" (unparsed response body).",
              "helpText": "What this field is: Output format: \"json\" or \"raw\" ..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: json.\nTip: Use {{$json.outputFormat}} when this value comes from an earlier step.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json"
            },
            {
              "name": "Mock Mode",
              "internalKey": "mockMode",
              "type": "boolean",
              "required": false,
              "description": "When true, returns synthetic data without calling the ScheduleWise API. Useful for testing.",
              "helpText": "What this field is: An on/off switch for When true, returns synthetic data without calling the ScheduleWise API. Useful for testing..\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use mock mode; turn OFF for the default behavior.",
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
            "scenario": "Process incoming ScheduleWise data with execute after a related upstream event is received",
            "inputValues": {
              "Date From": "2024-01-01",
              "Date To": "2024-01-31",
              "Patient Id": "patient_123",
              "Staff Id": "staff_456",
              "Appointment Id": "appt_789"
            },
            "expectedOutput": "ScheduleWise returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
