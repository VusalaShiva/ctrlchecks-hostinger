import type { NodeDoc } from '../types';

export const googleContactsDoc: NodeDoc = {
  "slug": "google_contacts",
  "displayName": "Google Contacts",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_contacts.svg",
  "description": "Manage Google Contacts",
  "credentialType": "Google OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Contacts connection lets CtrlChecks access your Google Contacts account safely without putting secrets in workflow fields.",
    "Where to start: Google Contacts account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Contacts, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Contacts.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Contacts step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Contacts exposes operation choices directly.",
      "operations": [
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new contact in Google Contacts.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID (for update/delete)",
              "helpText": "What this field is: The Contact ID that tells Google Contacts which item to use.\nWhere to find it: Open the item in Google Contacts and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier Google Contacts step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
            }
          ],
          "outputExample": {
            "resourceName": "people/newContact456",
            "names": [
              {
                "displayName": "Bob Jones"
              }
            ],
            "emailAddresses": [
              {
                "value": "bob@example.com"
              }
            ]
          },
          "outputDescription": "resourceName: The new contact's resource name. names[0].displayName: Full name. emailAddresses[0].value: Primary email.",
          "usageExample": {
            "scenario": "Add form respondents as Google Contacts",
            "inputValues": {
              "givenName": "{{$json.firstName}}",
              "familyName": "{{$json.lastName}}",
              "email": "{{$json.email}}"
            },
            "expectedOutput": "Contact created. Use `{{$json.resourceName}}` to look up later."
          },
          "externalDocsUrl": "https://developers.google.com/people/api/rest"
        },
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the Google Contacts node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID (for update/delete)",
              "helpText": "What this field is: The Contact ID that tells Google Contacts which item to use.\nWhere to find it: Open the item in Google Contacts and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier Google Contacts step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming Google Contacts data with read after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "Google Contacts returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/people/api/rest"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Google Contacts node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID (for update/delete)",
              "helpText": "What this field is: The Contact ID that tells Google Contacts which item to use.\nWhere to find it: Open the item in Google Contacts and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier Google Contacts step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming Google Contacts data with update after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "Google Contacts returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/people/api/rest"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Google Contacts node.",
          "fields": [
            {
              "name": "Contact Id",
              "internalKey": "contactId",
              "type": "string",
              "required": false,
              "description": "Contact ID (for update/delete)",
              "helpText": "What this field is: The Contact ID that tells Google Contacts which item to use.\nWhere to find it: Open the item in Google Contacts and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: contact-id.\nTip: Use {{$json.contactId}} when an earlier Google Contacts step provides this value.",
              "placeholder": "contact-id",
              "example": "contact-id"
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
            "scenario": "Process incoming Google Contacts data with delete after a related upstream event is received",
            "inputValues": {
              "Contact Id": "contact-id"
            },
            "expectedOutput": "Google Contacts returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/people/api/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Contacts node."
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
