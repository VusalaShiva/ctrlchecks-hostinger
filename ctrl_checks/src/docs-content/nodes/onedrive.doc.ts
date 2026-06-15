import type { NodeDoc } from '../types';

export const onedriveDoc: NodeDoc = {
  "slug": "onedrive",
  "displayName": "OneDrive",
  "category": "Data",
  "logoUrl": "/icons/nodes/onedrive.svg",
  "description": "OneDrive file operations",
  "credentialType": "Microsoft Credential",
  "credentialSetupSteps": [
    "What this is: The OneDrive connection lets CtrlChecks access your OneDrive account safely without putting secrets in workflow fields.",
    "Where to start: OneDrive account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> OneDrive, then sign in or paste the secret value requested there.",
    "Example: the token format shown by OneDrive.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple OneDrive step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.microsoft.com/en-us/graph/api/resources/mail-api-overview",
  "resources": [
    {
      "name": "Operations",
      "description": "OneDrive exposes operation choices directly.",
      "operations": [
        {
          "name": "Upload",
          "value": "upload",
          "description": "Upload using the OneDrive node.",
          "fields": [
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
              "placeholder": "/path/to/file.pdf",
              "example": "/path/to/file.pdf"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells OneDrive which item to use.\nWhere to find it: Open the item in OneDrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier OneDrive step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by OneDrive.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming OneDrive data with upload after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}"
            },
            "expectedOutput": "OneDrive returns structured upload data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/onedrive/developer/rest-api/"
        },
        {
          "name": "Download",
          "value": "download",
          "description": "Download using the OneDrive node.",
          "fields": [
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
              "placeholder": "/path/to/file.pdf",
              "example": "/path/to/file.pdf"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells OneDrive which item to use.\nWhere to find it: Open the item in OneDrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier OneDrive step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by OneDrive.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming OneDrive data with download after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}"
            },
            "expectedOutput": "OneDrive returns structured download data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/onedrive/developer/rest-api/"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the OneDrive node.",
          "fields": [
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
              "placeholder": "/path/to/file.pdf",
              "example": "/path/to/file.pdf"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells OneDrive which item to use.\nWhere to find it: Open the item in OneDrive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier OneDrive step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by OneDrive.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming OneDrive data with list after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}"
            },
            "expectedOutput": "OneDrive returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://learn.microsoft.com/en-us/onedrive/developer/rest-api/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the OneDrive node."
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
