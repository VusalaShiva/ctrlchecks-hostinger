import type { NodeDoc } from '../types';

export const queueConsumeDoc: NodeDoc = {
  "slug": "queue_consume",
  "displayName": "Queue Consume",
  "category": "Utility",
  "logoUrl": "/icons/nodes/queue_consume.svg",
  "description": "Consume a message from a queue (waits for next message)",
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
      "description": "Queue Consume is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Consume messages from a Redis queue and process them one by one.",
          "fields": [
            {
              "name": "Queue Name",
              "internalKey": "queueName",
              "type": "string",
              "required": true,
              "description": "Name of the queue",
              "helpText": "What this field is: Name of the queue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: tasks.\nTip: Use {{$json.queueName}} when this value comes from an earlier step.",
              "placeholder": "tasks",
              "example": "tasks"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Maximum wait time in milliseconds (0 = infinite)",
              "helpText": "What this field is: The date or time value for Maximum wait time in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 30000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "30000",
              "example": "30000",
              "defaultValue": "30000"
            },
            {
              "name": "Auto Ack",
              "internalKey": "autoAck",
              "type": "boolean",
              "required": false,
              "description": "Automatically acknowledge message after processing",
              "helpText": "What this field is: An on/off switch for Automatically acknowledge message after processing.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use auto ack; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            }
          ],
          "outputExample": {
            "message": {
              "to": "alice@example.com",
              "subject": "Welcome!"
            },
            "queueName": "email_notifications",
            "processed": true
          },
          "outputDescription": "message: The dequeued message payload. queueName: The queue name. processed: true when the message is acknowledged.",
          "usageExample": {
            "scenario": "Process email notifications from a queue",
            "inputValues": {
              "queue": "email_notifications",
              "timeout": "5000"
            },
            "expectedOutput": "Use `{{$json.message.to}}` and `{{$json.message.subject}}` in a downstream email node."
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
