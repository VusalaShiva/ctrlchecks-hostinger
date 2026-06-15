import type { NodeDoc } from '../types';

export const scheduleDoc: NodeDoc = {
  "slug": "schedule",
  "displayName": "Schedule Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/schedule.svg",
  "description": "Executes workflow on a time-based schedule using cron expressions",
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
      "description": "Schedule Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow automatically on a defined cron schedule.",
          "fields": [
            {
              "name": "Cron",
              "internalKey": "cron",
              "type": "string",
              "required": true,
              "description": "Cron expression (e.g., \"0 9 * * *\" for daily at 9 AM)",
              "helpText": "What this field is: Cron expression.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: 0 9 * * *.\nTip: Use {{$json.cron}} when this value comes from an earlier step.",
              "placeholder": "0 9 * * *",
              "example": "0 9 * * *"
            },
            {
              "name": "Timezone",
              "internalKey": "timezone",
              "type": "string",
              "required": false,
              "description": "Timezone for schedule",
              "helpText": "What this field is: The date or time value for Timezone for schedule.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: UTC.\nTip: Use {{$json.timezone}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "UTC",
              "example": "UTC",
              "defaultValue": "UTC"
            }
          ],
          "outputExample": {
            "scheduledTime": "2025-01-15T09:00:00.000Z",
            "timezone": "UTC",
            "cronExpression": "0 9 * * 1-5"
          },
          "outputDescription": "scheduledTime: ISO timestamp when the trigger fired. timezone: The schedule timezone. cronExpression: The cron expression that matched.",
          "usageExample": {
            "scenario": "Send a daily summary email every weekday at 9 AM",
            "inputValues": {
              "cronExpression": "0 9 * * 1-5",
              "timezone": "America/New_York"
            },
            "expectedOutput": "The workflow fires at 9 AM Mon–Fri. Connect a Gmail Send node downstream to send the email."
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
