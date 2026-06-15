import type { NodeDoc } from '../types';

export const renameKeysDoc: NodeDoc = {
  "slug": "rename_keys",
  "displayName": "Rename Keys",
  "category": "Data",
  "logoUrl": "/icons/nodes/rename_keys.svg",
  "description": "Rename object keys",
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
      "description": "Rename Keys is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Rename Keys node.",
          "fields": [
            {
              "name": "Mappings",
              "internalKey": "mappings",
              "type": "json",
              "required": true,
              "description": "Key mappings: { oldKey: \"newKey\" }",
              "helpText": "What this field is: Structured data for Key mappings: { oldKey: \"newKey\" }.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Rename Keys.\nExample: {\"oldName\":\"newName\",\"oldEmail\":\"newEmail\"}.\nTip: Use {{$json.mappings}} when an earlier step already prepared this data.",
              "placeholder": "{\"oldName\":\"newName\",\"oldEmail\":\"newEmail\"}",
              "example": "{\"oldName\":\"newName\",\"oldEmail\":\"newEmail\"}"
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
            "scenario": "Process incoming Rename Keys data with execute after a related upstream event is received",
            "inputValues": {
              "Mappings": "{\"oldName\":\"newName\",\"oldEmail\":\"newEmail\"}"
            },
            "expectedOutput": "Rename Keys returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
