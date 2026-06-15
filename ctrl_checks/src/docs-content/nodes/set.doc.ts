import type { NodeDoc } from '../types';

export const setDoc: NodeDoc = {
  "slug": "set",
  "displayName": "Set",
  "category": "Data",
  "logoUrl": "/icons/nodes/set.svg",
  "description": "Set/override multiple fields on the current item",
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
      "description": "Set is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Set node.",
          "fields": [
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "string",
              "required": true,
              "description": "JSON object of fields to set (supports template strings)",
              "helpText": "What this field is: Structured data for structured data in { } brackets object of fields to set.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Set.\nExample: {\"status\":\"new\",\"email\":\"{{$json.email}}\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"status\":\"new\",\"email\":\"{{$json.email}}\"}",
              "example": "{\"status\":\"new\",\"email\":\"{{$json.email}}\"}"
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
            "scenario": "Process incoming Set data with execute after a related upstream event is received",
            "inputValues": {
              "Fields": "{\"status\":\"new\",\"email\":\"{{$json.email}}\"}"
            },
            "expectedOutput": "Set returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
