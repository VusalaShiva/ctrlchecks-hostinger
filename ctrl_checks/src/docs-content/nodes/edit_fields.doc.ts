import type { NodeDoc } from '../types';

export const editFieldsDoc: NodeDoc = {
  "slug": "edit_fields",
  "displayName": "Edit Fields",
  "category": "Data",
  "logoUrl": "/icons/nodes/edit_fields.svg",
  "description": "Edit, rename, or transform field values in data objects",
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
      "description": "Edit Fields is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Rename, add, remove, or transform fields in an object.",
          "fields": [
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field mappings and transformations",
              "helpText": "What this field is: Structured data for Field mappings and transformations.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Edit Fields.\nExample: {\"oldField\":\"{{$json.newField}}\",\"rename\":{\"old\":\"new\"}}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"oldField\":\"{{$json.newField}}\",\"rename\":{\"old\":\"new\"}}",
              "example": "{\"oldField\":\"{{$json.newField}}\",\"rename\":{\"old\":\"new\"}}"
            }
          ],
          "outputExample": {
            "id": 1,
            "fullName": "Alice Smith",
            "emailAddress": "alice@example.com"
          },
          "outputDescription": "The resulting object after field edits, renames, and removals.",
          "usageExample": {
            "scenario": "Rename API response fields to match your database schema",
            "inputValues": {
              "operations": "[{\"action\": \"rename\", \"from\": \"first_name\", \"to\": \"firstName\"}, {\"action\": \"remove\", \"field\": \"internal_id\"}]"
            },
            "expectedOutput": "The object with renamed fields passes to the next node."
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
