import type { NodeDoc } from '../types';

export const googleCloudStorageDoc: NodeDoc = {
  "slug": "google_cloud_storage",
  "displayName": "Google Cloud Storage",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_cloud_storage.svg",
  "description": "Interact with Google Cloud Storage buckets (upload, download, delete, list)",
  "credentialType": "Google Cloud Storage Credential",
  "credentialSetupSteps": [
    "What this is: The Google Cloud Storage connection lets CtrlChecks access your Google Cloud Storage account safely without putting secrets in workflow fields.",
    "Where to start: Google Cloud Storage account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Cloud Storage, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Cloud Storage.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Cloud Storage step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://cloud.google.com/storage/docs/authentication",
  "resources": [
    {
      "name": "Configuration",
      "description": "Google Cloud Storage is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Google Cloud Storage node.",
          "fields": [
            {
              "name": "File Name",
              "internalKey": "fileName",
              "type": "string",
              "required": false,
              "description": "File name/path in bucket",
              "helpText": "What this field is: The File name/path in bucket that tells Google Cloud Storage which item to use.\nWhere to find it: Open the item in Google Cloud Storage and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.fileName}} when an earlier Google Cloud Storage step provides this value.",
              "placeholder": "Enter File Name"
            },
            {
              "name": "File Content",
              "internalKey": "fileContent",
              "type": "textarea",
              "required": false,
              "description": "File content for upload",
              "helpText": "What this field is: The File content for upload that tells Google Cloud Storage which item to use.\nWhere to find it: Open the item in Google Cloud Storage and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.fileContent}} when an earlier Google Cloud Storage step provides this value.",
              "placeholder": "Enter File Content"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "string",
              "required": false,
              "description": "Prefix filter for list operations",
              "helpText": "What this field is: Structured data for Prefix filter for list operations.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Cloud Storage.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.filter}} when an earlier step already prepared this data.",
              "placeholder": "Enter Filter"
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
            "scenario": "Process incoming Google Cloud Storage data with execute after a related upstream event is received",
            "inputValues": {
              "File Name": "",
              "File Content": "",
              "Filter": ""
            },
            "expectedOutput": "Google Cloud Storage returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://cloud.google.com/storage/docs/json_api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Cloud Storage node."
    },
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
