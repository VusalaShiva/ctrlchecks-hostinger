import type { NodeDoc } from '../types';

export const googleDriveDoc: NodeDoc = {
  "slug": "google_drive",
  "displayName": "Google Drive",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_drive.svg",
  "description": "Google Drive file operations (upload, download, list)",
  "credentialType": "Google Drive OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Drive connection lets CtrlChecks access your Google Drive account safely without putting secrets in workflow fields.",
    "Where to start: Google Drive account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Drive, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Drive.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Drive step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Drive exposes operation choices directly.",
      "operations": [
        {
          "name": "Upload",
          "value": "upload",
          "description": "Upload a file to Google Drive.",
          "fields": [
            {
              "name": "File Id",
              "internalKey": "fileId",
              "type": "string",
              "required": false,
              "description": "File ID (for download)",
              "helpText": "What this field is: The File ID that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: file-id.\nTip: Use {{$json.fileId}} when an earlier Google Drive step provides this value.",
              "placeholder": "file-id",
              "example": "file-id"
            },
            {
              "name": "File Name",
              "internalKey": "fileName",
              "type": "string",
              "required": false,
              "description": "File name (for upload)",
              "helpText": "What this field is: The File name that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: document.pdf.\nTip: Use {{$json.fileName}} when an earlier Google Drive step provides this value.",
              "placeholder": "document.pdf",
              "example": "document.pdf"
            }
          ],
          "outputExample": {
            "id": "newFile456",
            "name": "report-2025-01.pdf",
            "webViewLink": "https://drive.google.com/file/d/newFile456/view",
            "mimeType": "application/pdf"
          },
          "outputDescription": "id: The new file ID in Drive. name: File name. webViewLink: Browser-accessible URL to the file.",
          "usageExample": {
            "scenario": "Upload a generated PDF report to a shared Drive folder",
            "inputValues": {
              "folderId": "{{$env.REPORTS_FOLDER_ID}}",
              "fileName": "report-{{$now}}.pdf",
              "content": "{{$json.pdfContent}}",
              "mimeType": "application/pdf"
            },
            "expectedOutput": "File is uploaded. Share `{{$json.webViewLink}}` with stakeholders."
          },
          "externalDocsUrl": "https://developers.google.com/drive/api/reference/rest/v3"
        },
        {
          "name": "Download",
          "value": "download",
          "description": "Download the content of a file from Google Drive.",
          "fields": [
            {
              "name": "File Id",
              "internalKey": "fileId",
              "type": "string",
              "required": false,
              "description": "File ID (for download)",
              "helpText": "What this field is: The File ID that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: file-id.\nTip: Use {{$json.fileId}} when an earlier Google Drive step provides this value.",
              "placeholder": "file-id",
              "example": "file-id"
            },
            {
              "name": "File Name",
              "internalKey": "fileName",
              "type": "string",
              "required": false,
              "description": "File name (for upload)",
              "helpText": "What this field is: The File name that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: document.pdf.\nTip: Use {{$json.fileName}} when an earlier Google Drive step provides this value.",
              "placeholder": "document.pdf",
              "example": "document.pdf"
            }
          ],
          "outputExample": {
            "fileId": "file1",
            "fileName": "data.csv",
            "content": "Name,Email\nAlice,alice@example.com\n",
            "mimeType": "text/csv",
            "size": 1024
          },
          "outputDescription": "fileId: The Drive file ID. fileName: The file name. content: The raw file content as a string. mimeType: The file MIME type.",
          "usageExample": {
            "scenario": "Download a CSV export from Drive and process each row",
            "inputValues": {
              "fileId": "{{$json.fileId}}"
            },
            "expectedOutput": "File content is returned in `{{$json.content}}`. Pass to a CSV node to parse rows."
          },
          "externalDocsUrl": "https://developers.google.com/drive/api/reference/rest/v3"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List files and folders in Google Drive.",
          "fields": [
            {
              "name": "File Id",
              "internalKey": "fileId",
              "type": "string",
              "required": false,
              "description": "File ID (for download)",
              "helpText": "What this field is: The File ID that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: file-id.\nTip: Use {{$json.fileId}} when an earlier Google Drive step provides this value.",
              "placeholder": "file-id",
              "example": "file-id"
            },
            {
              "name": "File Name",
              "internalKey": "fileName",
              "type": "string",
              "required": false,
              "description": "File name (for upload)",
              "helpText": "What this field is: The File name that tells Google Drive which item to use.\nWhere to find it: Open the item in Google Drive and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: document.pdf.\nTip: Use {{$json.fileName}} when an earlier Google Drive step provides this value.",
              "placeholder": "document.pdf",
              "example": "document.pdf"
            }
          ],
          "outputExample": {
            "files": [
              {
                "id": "file1",
                "name": "Q4 Report.pdf",
                "mimeType": "application/pdf",
                "modifiedTime": "2025-01-14T10:00:00Z"
              }
            ],
            "nextPageToken": null
          },
          "outputDescription": "files: Array of file/folder objects with id, name, mimeType, and modifiedTime. nextPageToken: Token for paginating results.",
          "usageExample": {
            "scenario": "List all PDF files in a specific Drive folder to process each one",
            "inputValues": {
              "folderId": "{{$env.DRIVE_FOLDER_ID}}",
              "mimeType": "application/pdf",
              "maxResults": "50"
            },
            "expectedOutput": "Returns matching files. Loop over `{{$json.files}}` and use each `{{$json.id}}` in a Download operation."
          },
          "externalDocsUrl": "https://developers.google.com/drive/api/reference/rest/v3"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Drive node."
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
