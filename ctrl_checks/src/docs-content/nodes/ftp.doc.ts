import type { NodeDoc } from '../types';

export const ftpDoc: NodeDoc = {
  "slug": "ftp",
  "displayName": "FTP",
  "category": "Data",
  "logoUrl": "/icons/nodes/ftp.svg",
  "description": "FTP file operations",
  "credentialType": "FTP Credential",
  "credentialSetupSteps": [
    "What this is: The FTP connection lets CtrlChecks access your FTP account safely without putting secrets in workflow fields.",
    "Where to start: FTP account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> FTP, then sign in or paste the secret value requested there.",
    "Example: the token format shown by FTP.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple FTP step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://en.wikipedia.org/wiki/File_Transfer_Protocol",
  "resources": [
    {
      "name": "Operations",
      "description": "FTP exposes operation choices directly.",
      "operations": [
        {
          "name": "Upload",
          "value": "upload",
          "description": "Upload using the FTP node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "FTP host",
              "helpText": "What this field is: FTP host.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: ftp.example.com.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "ftp.example.com",
              "example": "ftp.example.com"
            },
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
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
            "scenario": "Process incoming FTP data with upload after a related upstream event is received",
            "inputValues": {
              "Host": "ftp.example.com",
              "Path": "/path/to/file.pdf"
            },
            "expectedOutput": "FTP returns structured upload data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://en.wikipedia.org/wiki/File_Transfer_Protocol"
        },
        {
          "name": "Download",
          "value": "download",
          "description": "Download using the FTP node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "FTP host",
              "helpText": "What this field is: FTP host.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: ftp.example.com.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "ftp.example.com",
              "example": "ftp.example.com"
            },
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
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
            "scenario": "Process incoming FTP data with download after a related upstream event is received",
            "inputValues": {
              "Host": "ftp.example.com",
              "Path": "/path/to/file.pdf"
            },
            "expectedOutput": "FTP returns structured download data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://en.wikipedia.org/wiki/File_Transfer_Protocol"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the FTP node.",
          "fields": [
            {
              "name": "Host",
              "internalKey": "host",
              "type": "string",
              "required": true,
              "description": "FTP host",
              "helpText": "What this field is: FTP host.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: ftp.example.com.\nTip: Use {{$json.host}} when this value comes from an earlier step.",
              "placeholder": "ftp.example.com",
              "example": "ftp.example.com"
            },
            {
              "name": "Path",
              "internalKey": "path",
              "type": "string",
              "required": false,
              "description": "File path",
              "helpText": "What this field is: File path.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: /path/to/file.pdf.\nTip: Use {{$json.path}} when this value comes from an earlier step.",
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
            "scenario": "Process incoming FTP data with list after a related upstream event is received",
            "inputValues": {
              "Host": "ftp.example.com",
              "Path": "/path/to/file.pdf"
            },
            "expectedOutput": "FTP returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://en.wikipedia.org/wiki/File_Transfer_Protocol"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the FTP node."
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
