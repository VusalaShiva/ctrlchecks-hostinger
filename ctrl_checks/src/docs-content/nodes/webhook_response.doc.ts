import type { NodeDoc } from '../types';

export const webhookResponseDoc: NodeDoc = {
  "slug": "webhook_response",
  "displayName": "Webhook Response",
  "category": "Utility",
  "logoUrl": "/icons/nodes/webhook_response.svg",
  "description": "Send response to webhook request",
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
      "description": "Webhook Response is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Send a final HTTP response back to the app or service that called the webhook.",
          "fields": [
            {
              "name": "Response Code",
              "internalKey": "responseCode",
              "type": "number",
              "required": true,
              "description": "HTTP response code",
              "helpText": "What this field is: The number used for HTTP response code.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 200.\nTip: Use {{$json.responseCode}} when the number comes from an earlier step.",
              "placeholder": "200",
              "example": "200",
              "defaultValue": "200"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Response body",
              "helpText": "What this field is: Structured data for Response body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Webhook Response.\nExample: {{$json.result}}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.result}}",
              "example": "{{$json.result}}"
            }
          ],
          "outputExample": {
            "responseCode": 200,
            "body": {
              "ok": true,
              "orderId": "ord_123"
            },
            "sent": true
          },
          "outputDescription": "responseCode: HTTP status returned to the caller. body: The response payload sent back. sent: True when CtrlChecks sent the response.",
          "usageExample": {
            "scenario": "Return a success message to a checkout form after creating an order",
            "inputValues": {
              "responseCode": "200",
              "body": "{\"ok\":true,\"orderId\":\"{{$json.orderId}}\"}"
            },
            "expectedOutput": "The caller receives HTTP 200 with the order ID in the response body."
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
