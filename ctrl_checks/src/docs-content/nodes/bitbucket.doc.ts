import type { NodeDoc } from '../types';

export const bitbucketDoc: NodeDoc = {
  "slug": "bitbucket",
  "displayName": "Bitbucket",
  "category": "Data",
  "logoUrl": "/icons/nodes/bitbucket.svg",
  "description": "Bitbucket repository operations",
  "credentialType": "Atlassian API Key",
  "credentialSetupSteps": [
    "What this is: The Bitbucket connection lets CtrlChecks access your Bitbucket account safely without putting secrets in workflow fields.",
    "Where to start: Bitbucket account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Bitbucket, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Bitbucket.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Bitbucket step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/",
  "resources": [
    {
      "name": "Operations",
      "description": "Bitbucket exposes operation choices directly.",
      "operations": [
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Bitbucket node.",
          "fields": [
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells Bitbucket which item to use.\nWhere to find it: Open the item in Bitbucket and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier Bitbucket step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
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
            "scenario": "Process incoming Bitbucket data with create after a related upstream event is received",
            "inputValues": {
              "Repo": "owner/repo"
            },
            "expectedOutput": "Bitbucket returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/bitbucket/rest/intro/"
        },
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the Bitbucket node.",
          "fields": [
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells Bitbucket which item to use.\nWhere to find it: Open the item in Bitbucket and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier Bitbucket step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
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
            "scenario": "Process incoming Bitbucket data with read after a related upstream event is received",
            "inputValues": {
              "Repo": "owner/repo"
            },
            "expectedOutput": "Bitbucket returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/bitbucket/rest/intro/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Bitbucket node.",
          "fields": [
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells Bitbucket which item to use.\nWhere to find it: Open the item in Bitbucket and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier Bitbucket step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
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
            "scenario": "Process incoming Bitbucket data with update after a related upstream event is received",
            "inputValues": {
              "Repo": "owner/repo"
            },
            "expectedOutput": "Bitbucket returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/bitbucket/rest/intro/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Bitbucket node.",
          "fields": [
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells Bitbucket which item to use.\nWhere to find it: Open the item in Bitbucket and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier Bitbucket step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
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
            "scenario": "Process incoming Bitbucket data with delete after a related upstream event is received",
            "inputValues": {
              "Repo": "owner/repo"
            },
            "expectedOutput": "Bitbucket returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/bitbucket/rest/intro/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Bitbucket node."
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
