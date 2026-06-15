import type { NodeDoc } from '../types';

export const mergeDataDoc: NodeDoc = {
  "slug": "merge_data",
  "displayName": "Merge Data",
  "category": "Data",
  "logoUrl": "/icons/nodes/merge_data.svg",
  "description": "Merge data structures from multiple sources",
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
      "description": "Merge Data is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Merge Data node.",
          "fields": [
            {
              "name": "Mode",
              "internalKey": "mode",
              "type": "string",
              "required": true,
              "description": "Merge mode: append, join, overwrite",
              "helpText": "What this field is: How two data sources are combined.\nOptions: append (combine all items into one array), join (match items by a shared key field), overwrite (replace input A fields with input B values).\nDefault: append.\nExample: Use join with joinBy=id when merging user profile data from two API responses.",
              "placeholder": "append",
              "example": "append",
              "defaultValue": "append"
            },
            {
              "name": "Join By",
              "internalKey": "joinBy",
              "type": "string",
              "required": false,
              "description": "Field to join by (for join mode)",
              "helpText": "What this field is: Field to join by.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: id.\nTip: This field is used for join mode. Leave it blank when this operation does not need it.",
              "placeholder": "id",
              "example": "id"
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
            "scenario": "Process incoming Merge Data data with execute after a related upstream event is received",
            "inputValues": {
              "Mode": "append",
              "Join By": "id"
            },
            "expectedOutput": "Merge Data returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
