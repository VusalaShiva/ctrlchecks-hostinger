import type { NodeDoc } from '../types';

export const functionItemDoc: NodeDoc = {
  "slug": "function_item",
  "displayName": "Function Item",
  "category": "Logic",
  "logoUrl": "/icons/nodes/function_item.svg",
  "description": "Execute a function for each item in an array",
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
      "description": "Function Item is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Function Item node.",
          "fields": [
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": true,
              "description": "Description of what should be done for each item",
              "helpText": "What this field is: Description of what should be done for each item.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Process each contact.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Process each contact",
              "example": "Process each contact"
            },
            {
              "name": "Items",
              "internalKey": "items",
              "type": "json",
              "required": false,
              "description": "Array of items to process",
              "helpText": "What this field is: Structured data for Array of items to process.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Function Item.\nExample: {{$json.items}}.\nTip: Use {{$json.items}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.items}}",
              "example": "{{$json.items}}"
            }
          ],
          "outputExample": [
            {
              "id": "1",
              "name": "Example item",
              "createdAt": "2025-01-15T09:00:00Z"
            }
          ],
          "outputDescription": "Returns an array of result objects. Access individual fields via {{$json.fieldName}} in downstream nodes.",
          "usageExample": {
            "scenario": "Process incoming Function Item data with execute after a related upstream event is received",
            "inputValues": {
              "Description": "Process each contact",
              "Items": "{{$json.items}}"
            },
            "expectedOutput": "Function Item returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
