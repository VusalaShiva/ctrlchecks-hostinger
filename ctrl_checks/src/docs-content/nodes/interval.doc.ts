import type { NodeDoc } from '../types';

export const intervalDoc: NodeDoc = {
  "slug": "interval",
  "displayName": "Interval Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/interval.svg",
  "description": "Trigger workflow at fixed intervals",
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
      "description": "Interval Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow at a fixed time interval (e.g. every 5 minutes).",
          "fields": [
            {
              "name": "Interval",
              "internalKey": "interval",
              "type": "number",
              "required": true,
              "description": "Interval value",
              "helpText": "What this field is: How often this workflow repeats.\nHow to fill it: Type a number. Combined with the \"Unit\" field, this sets the full frequency.\nExample: 15 (then set unit to \"minutes\") runs every 15 minutes.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Unit",
              "internalKey": "unit",
              "type": "string",
              "required": true,
              "description": "Interval unit",
              "helpText": "What this field is: The time unit for the interval.\nOptions: seconds, minutes, hours.\nExample: minutes",
              "placeholder": "seconds",
              "example": "seconds"
            }
          ],
          "outputExample": {
            "firedAt": "2025-01-15T10:05:00.000Z",
            "intervalMs": 300000,
            "iteration": 42
          },
          "outputDescription": "firedAt: ISO timestamp when this iteration fired. intervalMs: The configured interval in milliseconds. iteration: How many times this trigger has fired.",
          "usageExample": {
            "scenario": "Poll an external API every 5 minutes for new records",
            "inputValues": {
              "interval": "300000",
              "unit": "milliseconds"
            },
            "expectedOutput": "The workflow fires every 5 minutes. Connect an HTTP Request node to fetch the API data on each run."
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
