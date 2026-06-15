import type { NodeDoc } from '../types';

export const retryDoc: NodeDoc = {
  "slug": "retry",
  "displayName": "Retry",
  "category": "Logic",
  "logoUrl": "/icons/nodes/retry.svg",
  "description": "Retries a branch on failure up to a maximum number of attempts",
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
      "description": "Retry is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Automatically retry a failing branch up to N times with optional back-off.",
          "fields": [
            {
              "name": "Max Attempts",
              "internalKey": "maxAttempts",
              "type": "number",
              "required": true,
              "description": "Maximum number of retry attempts",
              "helpText": "What this field is: The number used for Maximum number of retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxAttempts}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            },
            {
              "name": "Delay Between",
              "internalKey": "delayBetween",
              "type": "number",
              "required": false,
              "description": "Delay between retries (in milliseconds)",
              "helpText": "What this field is: The number used for Delay between retries.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 1000.\nTip: Use {{$json.delayBetween}} when the number comes from an earlier step.",
              "placeholder": "1000",
              "example": "1000",
              "defaultValue": "1000"
            },
            {
              "name": "Backoff",
              "internalKey": "backoff",
              "type": "select",
              "required": false,
              "description": "Backoff strategy (none, linear, exponential)",
              "helpText": "Options: Choose the backoff value this Retry step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: None.\nTip: Use {{$json.backoff}} only when an earlier step already provides a valid option value.",
              "placeholder": "none",
              "example": "none",
              "defaultValue": "none",
              "options": [
                "None",
                "Linear",
                "Exponential"
              ]
            }
          ],
          "outputExample": {
            "success": true,
            "attempts": 2,
            "lastError": null,
            "output": {
              "id": 42
            }
          },
          "outputDescription": "success: true if any attempt succeeded. attempts: How many times the branch ran. lastError: The last error if all attempts failed. output: Result of the successful attempt.",
          "usageExample": {
            "scenario": "Retry a flaky third-party API call up to 3 times before giving up",
            "inputValues": {
              "maxAttempts": "3",
              "delayMs": "1000",
              "backoffMultiplier": "2"
            },
            "expectedOutput": "If the 2nd attempt succeeds, `{{$json.attempts}} = 2` and `success: true`."
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
