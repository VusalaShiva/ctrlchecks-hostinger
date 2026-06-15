import type { NodeDoc } from '../types';

export const gitlabDoc: NodeDoc = {
  "slug": "gitlab",
  "displayName": "GitLab",
  "category": "Data",
  "logoUrl": "/icons/nodes/gitlab.svg",
  "description": "GitLab repository operations",
  "credentialType": "GitLab API Key",
  "credentialSetupSteps": [
    "What this is: The GitLab connection lets CtrlChecks access your GitLab account safely without putting secrets in workflow fields.",
    "Where to start: GitLab account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> GitLab, then sign in or paste the secret value requested there.",
    "Example: the token format shown by GitLab.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple GitLab step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html",
  "resources": [
    {
      "name": "Operations",
      "description": "GitLab exposes operation choices directly.",
      "operations": [
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the GitLab node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "GitLab API base URL (default: https://gitlab.com/api/v4)",
              "helpText": "What this field is: The web address for GitLab API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://gitlab.com/api/v4.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://gitlab.com/api/v4",
              "example": "https://gitlab.com/api/v4",
              "defaultValue": "https://gitlab.com/api/v4"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier GitLab step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
            },
            {
              "name": "Project Id",
              "internalKey": "projectId",
              "type": "string",
              "required": false,
              "description": "Project ID or URL-encoded path (e.g., group%2Fproject)",
              "helpText": "What this field is: The Project ID or URL-encoded path that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.projectId}} when an earlier GitLab step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Issue Iid",
              "internalKey": "issueIid",
              "type": "string",
              "required": false,
              "description": "Issue IID (project-scoped issue number)",
              "helpText": "What this field is: The Issue IID that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.issueIid}} when an earlier GitLab step provides this value.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue title (create)",
              "helpText": "What this field is: Issue title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Issue description (create)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
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
            "scenario": "Process incoming GitLab data with create after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://gitlab.com/api/v4",
              "Repo": "owner/repo",
              "Project Id": "123",
              "Issue Iid": "1",
              "Title": ""
            },
            "expectedOutput": "GitLab returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.gitlab.com/api/"
        },
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the GitLab node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "GitLab API base URL (default: https://gitlab.com/api/v4)",
              "helpText": "What this field is: The web address for GitLab API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://gitlab.com/api/v4.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://gitlab.com/api/v4",
              "example": "https://gitlab.com/api/v4",
              "defaultValue": "https://gitlab.com/api/v4"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier GitLab step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
            },
            {
              "name": "Project Id",
              "internalKey": "projectId",
              "type": "string",
              "required": false,
              "description": "Project ID or URL-encoded path (e.g., group%2Fproject)",
              "helpText": "What this field is: The Project ID or URL-encoded path that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.projectId}} when an earlier GitLab step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Issue Iid",
              "internalKey": "issueIid",
              "type": "string",
              "required": false,
              "description": "Issue IID (project-scoped issue number)",
              "helpText": "What this field is: The Issue IID that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.issueIid}} when an earlier GitLab step provides this value.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue title (create)",
              "helpText": "What this field is: Issue title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Issue description (create)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
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
            "scenario": "Process incoming GitLab data with read after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://gitlab.com/api/v4",
              "Repo": "owner/repo",
              "Project Id": "123",
              "Issue Iid": "1",
              "Title": ""
            },
            "expectedOutput": "GitLab returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.gitlab.com/api/"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the GitLab node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "GitLab API base URL (default: https://gitlab.com/api/v4)",
              "helpText": "What this field is: The web address for GitLab API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://gitlab.com/api/v4.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://gitlab.com/api/v4",
              "example": "https://gitlab.com/api/v4",
              "defaultValue": "https://gitlab.com/api/v4"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier GitLab step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
            },
            {
              "name": "Project Id",
              "internalKey": "projectId",
              "type": "string",
              "required": false,
              "description": "Project ID or URL-encoded path (e.g., group%2Fproject)",
              "helpText": "What this field is: The Project ID or URL-encoded path that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.projectId}} when an earlier GitLab step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Issue Iid",
              "internalKey": "issueIid",
              "type": "string",
              "required": false,
              "description": "Issue IID (project-scoped issue number)",
              "helpText": "What this field is: The Issue IID that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.issueIid}} when an earlier GitLab step provides this value.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue title (create)",
              "helpText": "What this field is: Issue title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Issue description (create)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
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
            "scenario": "Process incoming GitLab data with update after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://gitlab.com/api/v4",
              "Repo": "owner/repo",
              "Project Id": "123",
              "Issue Iid": "1",
              "Title": ""
            },
            "expectedOutput": "GitLab returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.gitlab.com/api/"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the GitLab node.",
          "fields": [
            {
              "name": "Base Url",
              "internalKey": "baseUrl",
              "type": "url",
              "required": false,
              "description": "GitLab API base URL (default: https://gitlab.com/api/v4)",
              "helpText": "What this field is: The web address for GitLab API base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://gitlab.com/api/v4.\nTip: Use {{$json.baseUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://gitlab.com/api/v4",
              "example": "https://gitlab.com/api/v4",
              "defaultValue": "https://gitlab.com/api/v4"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The Repository name that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: owner/repo.\nTip: Use {{$json.repo}} when an earlier GitLab step provides this value.",
              "placeholder": "owner/repo",
              "example": "owner/repo"
            },
            {
              "name": "Project Id",
              "internalKey": "projectId",
              "type": "string",
              "required": false,
              "description": "Project ID or URL-encoded path (e.g., group%2Fproject)",
              "helpText": "What this field is: The Project ID or URL-encoded path that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123.\nTip: Use {{$json.projectId}} when an earlier GitLab step provides this value.",
              "placeholder": "123",
              "example": "123"
            },
            {
              "name": "Issue Iid",
              "internalKey": "issueIid",
              "type": "string",
              "required": false,
              "description": "Issue IID (project-scoped issue number)",
              "helpText": "What this field is: The Issue IID that tells GitLab which item to use.\nWhere to find it: Open the item in GitLab and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 1.\nTip: Use {{$json.issueIid}} when an earlier GitLab step provides this value.",
              "placeholder": "1",
              "example": "1"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue title (create)",
              "helpText": "What this field is: Issue title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Description Text",
              "internalKey": "descriptionText",
              "type": "string",
              "required": false,
              "description": "Issue description (create)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello {{$json.name}}.\nTip: Use {{$json.descriptionText}} when this value comes from an earlier step.",
              "placeholder": "Hello {{$json.name}}"
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
            "scenario": "Process incoming GitLab data with delete after a related upstream event is received",
            "inputValues": {
              "Base Url": "https://gitlab.com/api/v4",
              "Repo": "owner/repo",
              "Project Id": "123",
              "Issue Iid": "1",
              "Title": ""
            },
            "expectedOutput": "GitLab returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.gitlab.com/api/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the GitLab node."
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
