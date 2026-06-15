import type { NodeDoc } from '../types';

export const delayDoc: NodeDoc = {
  "slug": "delay",
  "displayName": "Delay",
  "category": "Utility",
  "logoUrl": "/icons/nodes/delay.svg",
  "description": "Pause the workflow execution for a specified amount of time",
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
      "description": "Delay is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Pause workflow execution for a fixed number of seconds.",
          "fields": [
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": true,
              "description": "Time to delay (in milliseconds)",
              "helpText": "What this field is: How long to pause the workflow before the next step runs.\nHow to fill it: Type a number, then set the unit below.\nExamples: 30 seconds → pauses briefly. 5 minutes → good for rate limiting. 24 hours → wait until next day.\nUse case: Pause before sending a follow-up email, wait for a process to finish, or space out API calls.",
              "placeholder": "1000",
              "example": "1000"
            },
            {
              "name": "Unit",
              "internalKey": "unit",
              "type": "select",
              "required": false,
              "description": "Unit of time (milliseconds, seconds, minutes)",
              "helpText": "What this field is: The time unit for the delay.\nOptions: ms (milliseconds), s (seconds), m (minutes), h (hours).\nExample: s for seconds. So duration=30, unit=s means pause for 30 seconds.",
              "placeholder": "milliseconds",
              "example": "milliseconds",
              "defaultValue": "milliseconds",
              "options": [
                "Milliseconds",
                "Seconds",
                "Minutes"
              ]
            }
          ],
          "outputExample": {
            "delayed": true,
            "delayMs": 5000,
            "resumedAt": "2025-01-15T10:00:05.000Z"
          },
          "outputDescription": "delayed: true after the delay completes. delayMs: How long the workflow paused in milliseconds. resumedAt: ISO timestamp when execution resumed.",
          "usageExample": {
            "scenario": "Wait 5 seconds after sending a webhook before polling for the result",
            "inputValues": {
              "delay": "5000"
            },
            "expectedOutput": "Workflow pauses for 5 seconds, then continues to the next node."
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
