import type { NodeDoc } from '../types';

export const readBinaryFileDoc: NodeDoc = {
  "slug": "read_binary_file",
  "displayName": "Read Binary File",
  "category": "Data",
  "logoUrl": "/icons/nodes/read_binary_file.svg",
  "description": "Read binary files",
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
      "description": "Read Binary File is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Read Binary File node.",
          "fields": [
            {
              "name": "File Path",
              "internalKey": "filePath",
              "type": "string",
              "required": true,
              "description": "File path",
              "helpText": "What this field is: The File path that tells Read Binary File which item to use.\nWhere to find it: Open the item in Read Binary File and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: /path/to/file.pdf.\nTip: Use {{$json.filePath}} when an earlier Read Binary File step provides this value.",
              "placeholder": "/path/to/file.pdf",
              "example": "/path/to/file.pdf"
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
            "scenario": "Process incoming Read Binary File data with execute after a related upstream event is received",
            "inputValues": {
              "File Path": "/path/to/file.pdf"
            },
            "expectedOutput": "Read Binary File returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
