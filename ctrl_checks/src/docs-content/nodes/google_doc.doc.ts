import type { NodeDoc } from '../types';

export const googleDocDoc: NodeDoc = {
  "slug": "google_doc",
  "displayName": "Google Docs",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_doc.svg",
  "description": "Read, write, create, or append content in Google Docs documents",
  "credentialType": "Google Docs OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Docs connection lets CtrlChecks access your Google Docs account safely without putting secrets in workflow fields.",
    "Where to start: Google Docs account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Docs, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Docs.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Docs step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Docs exposes operation choices directly.",
      "operations": [
        {
          "name": "Read",
          "value": "read",
          "description": "Read the full content and structure of a Google Doc.",
          "fields": [
            {
              "name": "Document Id",
              "internalKey": "documentId",
              "type": "string",
              "required": true,
              "description": "Google Docs document ID (extract from URL: /d/DOCUMENT_ID/edit)",
              "helpText": "What this field is: The Google Docs document ID that tells Google Docs which item to use.\nWhere to find it: Open the item in Google Docs and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1a2b3c4d5e6f7g8h9i0j.\nTip: Use {{$json.documentId}} when an earlier Google Docs step provides this value.",
              "placeholder": "1a2b3c4d5e6f7g8h9i0j",
              "example": "1a2b3c4d5e6f7g8h9i0j"
            },
            {
              "name": "Document Url",
              "internalKey": "documentUrl",
              "type": "url",
              "required": true,
              "description": "Full Google Docs URL — paste the URL from your browser (alternative to Document ID)",
              "helpText": "What this field is: The web address for Full Google Docs URL — paste the URL from your browser.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://docs.google.com/document/d/DOCUMENT_ID/edit.\nTip: Use {{$json.documentUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://docs.google.com/document/d/DOCUMENT_ID/edit",
              "example": "https://docs.google.com/document/d/DOCUMENT_ID/edit"
            },
            {
              "name": "Format",
              "internalKey": "format",
              "type": "select",
              "required": false,
              "description": "Output format for read operations",
              "helpText": "Options: Choose the format value this Google Docs step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Plain text.\nTip: Use {{$json.format}} only when an earlier step already provides a valid option value.",
              "placeholder": "text",
              "example": "text",
              "defaultValue": "text",
              "options": [
                "Plain text",
                "Markdown"
              ]
            }
          ],
          "outputExample": {
            "documentId": "abc123",
            "title": "Q4 Report",
            "body": {
              "content": [
                {
                  "paragraph": {
                    "elements": [
                      {
                        "textRun": {
                          "content": "Executive Summary\n"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          "outputDescription": "documentId: The Google Doc ID. title: Document title. body.content: Array of structural content elements.",
          "usageExample": {
            "scenario": "Read a Google Doc template to use as an email body",
            "inputValues": {
              "documentId": "{{$json.docId}}"
            },
            "expectedOutput": "Returns the full document structure. Extract text from `body.content` to use in downstream nodes."
          },
          "externalDocsUrl": "https://developers.google.com/docs/api/reference/rest"
        },
        {
          "name": "Write",
          "value": "write",
          "description": "Write using the Google Docs node.",
          "fields": [
            {
              "name": "Document Url",
              "internalKey": "documentUrl",
              "type": "url",
              "required": true,
              "description": "Full Google Docs URL — paste the URL from your browser (alternative to Document ID)",
              "helpText": "What this field is: The web address for Full Google Docs URL — paste the URL from your browser.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://docs.google.com/document/d/DOCUMENT_ID/edit.\nTip: Use {{$json.documentUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://docs.google.com/document/d/DOCUMENT_ID/edit",
              "example": "https://docs.google.com/document/d/DOCUMENT_ID/edit"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": true,
              "description": "Content to write into the document (for write, create, append)",
              "helpText": "What this field is: Content to write into the document.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.content}}.\nTip: This field is used for write, create, append. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.content}}",
              "example": "{{$json.content}}"
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
            "scenario": "Process incoming Google Docs data with write after a related upstream event is received",
            "inputValues": {
              "Document Url": "https://docs.google.com/document/d/DOCUMENT_ID/edit",
              "Content": "{{$json.content}}"
            },
            "expectedOutput": "Google Docs returns structured write data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/docs/api/reference/rest"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new Google Doc with a title and optional body content.",
          "fields": [
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Document title for the new document",
              "helpText": "What this field is: Document title for the new document.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Document.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "My Document",
              "example": "My Document"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": true,
              "description": "Content to write into the document (for write, create, append)",
              "helpText": "What this field is: Content to write into the document.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.content}}.\nTip: This field is used for write, create, append. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.content}}",
              "example": "{{$json.content}}"
            }
          ],
          "outputExample": {
            "documentId": "newDoc123",
            "title": "Meeting Notes — 2025-01-15",
            "revisionId": "ABC123"
          },
          "outputDescription": "documentId: The ID of the newly created document. title: The document title. revisionId: The initial revision ID.",
          "usageExample": {
            "scenario": "Auto-create a meeting notes document for each calendar event",
            "inputValues": {
              "title": "Meeting Notes — {{$json.eventTitle}} — {{$json.date}}",
              "content": "Attendees: {{$json.attendees}}\nAgenda: {{$json.agenda}}"
            },
            "expectedOutput": "New doc is created in Google Drive. Use `{{$json.documentId}}` to share a link: https://docs.google.com/document/d/{{$json.documentId}}"
          },
          "externalDocsUrl": "https://developers.google.com/docs/api/reference/rest"
        },
        {
          "name": "Append",
          "value": "append",
          "description": "Append using the Google Docs node.",
          "fields": [
            {
              "name": "Document Url",
              "internalKey": "documentUrl",
              "type": "url",
              "required": true,
              "description": "Full Google Docs URL — paste the URL from your browser (alternative to Document ID)",
              "helpText": "What this field is: The web address for Full Google Docs URL — paste the URL from your browser.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://docs.google.com/document/d/DOCUMENT_ID/edit.\nTip: Use {{$json.documentUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://docs.google.com/document/d/DOCUMENT_ID/edit",
              "example": "https://docs.google.com/document/d/DOCUMENT_ID/edit"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": true,
              "description": "Content to write into the document (for write, create, append)",
              "helpText": "What this field is: Content to write into the document.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.content}}.\nTip: This field is used for write, create, append. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.content}}",
              "example": "{{$json.content}}"
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
            "scenario": "Process incoming Google Docs data with append after a related upstream event is received",
            "inputValues": {
              "Document Url": "https://docs.google.com/document/d/DOCUMENT_ID/edit",
              "Content": "{{$json.content}}"
            },
            "expectedOutput": "Google Docs returns structured append data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/docs/api/reference/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Docs node."
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
