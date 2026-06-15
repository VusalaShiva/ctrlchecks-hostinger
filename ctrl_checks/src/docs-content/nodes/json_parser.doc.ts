import type { NodeDoc } from '../types';

export const jsonParserDoc: NodeDoc = {
  "slug": "json_parser",
  "displayName": "JSON Parser",
  "category": "Data",
  "logoUrl": "/icons/nodes/json_parser.svg",
  "description": "Parse JSON strings into objects and extract specific fields",
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
      "description": "JSON Parser is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the JSON Parser node.",
          "fields": [
            {
              "name": "Json",
              "internalKey": "json",
              "type": "string",
              "required": true,
              "description": "JSON string to parse",
              "helpText": "What this field is: Text that contains structured data in { } or [ ] brackets.\nHow to fill it: Paste the structured data text, or use a value from an earlier step.\nExample: {{$json.data}}.\nTip: Use {{$json.json}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            },
            {
              "name": "Extract Fields",
              "internalKey": "extractFields",
              "type": "json",
              "required": false,
              "description": "Fields to extract from parsed JSON",
              "helpText": "What this field is: The field names you want to pull out after parsing the structured data.\nHow to fill it: Enter a list in [ ] brackets with each field name in quotes.\nExample: [\"name\",\"age\",\"email\"].\nTip: Leave blank if you want to keep the full parsed result.",
              "placeholder": "[\"name\",\"age\",\"email\"]",
              "example": "[\"name\",\"age\",\"email\"]"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "default",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming JSON Parser data with execute after a related upstream event is received",
            "inputValues": {
              "Json": "{{$json.data}}",
              "Extract Fields": "[\"name\",\"age\",\"email\"]"
            },
            "expectedOutput": "JSON Parser returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
