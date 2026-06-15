import type { NodeDoc } from '../types';

export const dropboxDoc: NodeDoc = {
  "slug": "dropbox",
  "displayName": "Dropbox",
  "category": "Data",
  "logoUrl": "/icons/nodes/dropbox.svg",
  "description": "Dropbox file operations",
  "credentialType": "Dropbox Credential",
  "credentialSetupSteps": [
    "What this is: The Dropbox connection lets CtrlChecks access your Dropbox account safely without putting secrets in workflow fields.",
    "Where to start: Dropbox account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Dropbox, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Dropbox.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Dropbox step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.dropbox.com/oauth-guide",
  "resources": [
    {
      "name": "Operations",
      "description": "Dropbox exposes operation choices directly.",
      "operations": [
        {
          "name": "Upload",
          "value": "upload",
          "description": "Upload using the Dropbox node.",
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
              "helpText": "What this field is: The Base64 payload for upload that tells Dropbox which item to use.\nWhere to find it: Open the item in Dropbox and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier Dropbox step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Dropbox.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            },
            {
              "name": "Recursive",
              "internalKey": "recursive",
              "type": "boolean",
              "required": false,
              "description": "List recursively (list operation)",
              "helpText": "What this field is: An on/off switch for List recursively.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use recursive; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
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
            "scenario": "Process incoming Dropbox data with upload after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}",
              "Recursive": "false"
            },
            "expectedOutput": "Dropbox returns structured upload data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.dropbox.com/developers/documentation/http/documentation"
        },
        {
          "name": "Download",
          "value": "download",
          "description": "Download using the Dropbox node.",
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
              "helpText": "What this field is: The Base64 payload for upload that tells Dropbox which item to use.\nWhere to find it: Open the item in Dropbox and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier Dropbox step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Dropbox.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            },
            {
              "name": "Recursive",
              "internalKey": "recursive",
              "type": "boolean",
              "required": false,
              "description": "List recursively (list operation)",
              "helpText": "What this field is: An on/off switch for List recursively.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use recursive; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
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
            "scenario": "Process incoming Dropbox data with download after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}",
              "Recursive": "false"
            },
            "expectedOutput": "Dropbox returns structured download data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.dropbox.com/developers/documentation/http/documentation"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the Dropbox node.",
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
              "helpText": "What this field is: The Base64 payload for upload that tells Dropbox which item to use.\nWhere to find it: Open the item in Dropbox and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier Dropbox step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Dropbox.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            },
            {
              "name": "Recursive",
              "internalKey": "recursive",
              "type": "boolean",
              "required": false,
              "description": "List recursively (list operation)",
              "helpText": "What this field is: An on/off switch for List recursively.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use recursive; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
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
            "scenario": "Process incoming Dropbox data with list after a related upstream event is received",
            "inputValues": {
              "Path": "/path/to/file.pdf",
              "Data Base64": "{{$json.dataBase64}}",
              "Data": "{{$json.data}}",
              "Recursive": "false"
            },
            "expectedOutput": "Dropbox returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://www.dropbox.com/developers/documentation/http/documentation"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Dropbox node."
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
