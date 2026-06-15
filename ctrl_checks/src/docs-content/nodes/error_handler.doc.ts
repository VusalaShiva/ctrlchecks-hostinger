import type { NodeDoc } from '../types';

export const errorHandlerDoc: NodeDoc = {
  "slug": "error_handler",
  "displayName": "Error Handler",
  "category": "Logic",
  "logoUrl": "/icons/nodes/error_handler.svg",
  "description": "Handle errors with retry logic and fallback values",
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
      "description": "Error Handler is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Handle errors in a workflow branch with retry logic and fallback values.",
          "fields": [
            {
              "name": "Continue On Fail",
              "internalKey": "continueOnFail",
              "type": "boolean",
              "required": false,
              "description": "Continue workflow after error",
              "helpText": "What this field is: An on/off switch for Continue workflow after error.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use continue on fail; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry failed node",
              "helpText": "What this field is: An on/off switch for Retry failed node.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            },
            {
              "name": "Retry Delay",
              "internalKey": "retryDelay",
              "type": "number",
              "required": false,
              "description": "Delay between retries (ms)",
              "helpText": "What this field is: The number used for Delay between retries.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5000.\nTip: Use {{$json.retryDelay}} when the number comes from an earlier step.",
              "placeholder": "5000",
              "example": "5000",
              "defaultValue": "5000"
            }
          ],
          "outputExample": {
            "handled": true,
            "error": {
              "message": "Connection timeout",
              "code": "ECONNRESET"
            },
            "fallback": {
              "status": "error_handled"
            }
          },
          "outputDescription": "handled: true if the error was caught. error: The original error object. fallback: The fallback value configured.",
          "usageExample": {
            "scenario": "Catch HTTP request failures and return a fallback value instead of stopping the workflow",
            "inputValues": {
              "fallbackValue": "{\"status\": \"unavailable\"}",
              "maxRetries": "3"
            },
            "expectedOutput": "On error, `{{$json.fallback}}` is passed to the next node instead of terminating."
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
