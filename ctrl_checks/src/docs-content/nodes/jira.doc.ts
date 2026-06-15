import type { NodeDoc } from '../types';

export const jiraDoc: NodeDoc = {
  "slug": "jira",
  "displayName": "Jira",
  "category": "Data",
  "logoUrl": "/icons/nodes/jira.svg",
  "description": "Jira issue tracking operations",
  "credentialType": "Atlassian API Key",
  "credentialSetupSteps": [
    "What this is: The Jira connection lets CtrlChecks access your Jira account safely without putting secrets in workflow fields.",
    "Where to start: Jira account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Jira, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Jira.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Jira step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/",
  "resources": [
    {
      "name": "Operations",
      "description": "Jira exposes operation choices directly.",
      "operations": [
        {
          "name": "Create issue",
          "value": "create_issue",
          "description": "Create a new Jira issue.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: Your Jira project's short code — 2 to 10 capital letters.\nWhere to find it: In Jira, go to your project — the key is shown in brackets next to the project name, or in the URL.\nExample: If the project URL is jira.yourcompany.com/projects/PROJ/..., the key is PROJ.\nOther examples: DEV, MOBILE, BACKEND, SUPPORT",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "id": "10001",
            "key": "PROJ-42",
            "self": "https://yourcompany.atlassian.net/rest/api/3/issue/10001"
          },
          "outputDescription": "id: Jira internal issue ID. key: Human-readable issue key (e.g. PROJ-42). self: API URL to the issue.",
          "usageExample": {
            "scenario": "Create a Jira bug ticket when a Sentry error is detected",
            "inputValues": {
              "project": "PROJ",
              "summary": "{{$json.errorTitle}}",
              "description": "{{$json.errorDetails}}",
              "issuetype": "Bug",
              "priority": "High"
            },
            "expectedOutput": "`{{$json.key}}` is the Jira issue key (e.g. PROJ-42)."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Get issue",
          "value": "get_issue",
          "description": "Get details of a Jira issue by its key.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            }
          ],
          "outputExample": {
            "id": "10001",
            "key": "PROJ-42",
            "fields": {
              "summary": "Login fails for SSO users",
              "status": {
                "name": "In Progress"
              },
              "assignee": {
                "displayName": "Alice Smith"
              },
              "priority": {
                "name": "High"
              }
            }
          },
          "outputDescription": "key: Issue key. fields.summary: Issue title. fields.status.name: Current status. fields.assignee.displayName: Assignee name.",
          "usageExample": {
            "scenario": "Read a Jira issue to check its status before sending a reminder",
            "inputValues": {
              "issueKey": "{{$json.jiraKey}}"
            },
            "expectedOutput": "Full issue details in `{{$json.fields}}`."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Update issue",
          "value": "update_issue",
          "description": "Update issue using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with update issue after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured update issue data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Delete issue",
          "value": "delete_issue",
          "description": "Delete issue using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with delete issue after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured delete issue data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Search issues",
          "value": "search_issues",
          "description": "Search issues using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with search issues after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured search issues data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Add comment",
          "value": "add_comment",
          "description": "Add comment using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with add comment after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured add comment data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Transition issue",
          "value": "transition_issue",
          "description": "Transition issue using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with transition issue after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured transition issue data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        },
        {
          "name": "Get projects",
          "value": "get_projects",
          "description": "Get projects using the Jira node.",
          "fields": [
            {
              "name": "Domain",
              "internalKey": "domain",
              "type": "string",
              "required": false,
              "description": "Atlassian domain (without https://)",
              "helpText": "What this field is: The Atlassian domain that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: yourcompany.atlassian.net.\nTip: Use {{$json.domain}} when an earlier Jira step provides this value.",
              "placeholder": "yourcompany.atlassian.net",
              "example": "yourcompany.atlassian.net"
            },
            {
              "name": "Project Key",
              "internalKey": "projectKey",
              "type": "string",
              "required": false,
              "description": "Project key — required for create_issue",
              "helpText": "What this field is: The Project key — required for create_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: PROJ.\nTip: Use {{$json.projectKey}} when an earlier Jira step provides this value.",
              "placeholder": "PROJ",
              "example": "PROJ"
            },
            {
              "name": "Issue Key",
              "internalKey": "issueKey",
              "type": "string",
              "required": false,
              "description": "Issue key — required for get/update/delete/comment/transition",
              "helpText": "What this field is: The unique Jira issue identifier — project key + number.\nFormat: PROJECTKEY-NUMBER\nExample: DEV-456 or PROJ-1234 or MOBILE-89\nWhere to find it: Open the issue in Jira — the key is shown at the top left of the issue page.",
              "placeholder": "PROJ-123",
              "example": "PROJ-123"
            },
            {
              "name": "Summary",
              "internalKey": "summary",
              "type": "string",
              "required": false,
              "description": "Issue title/summary — required for create_issue",
              "helpText": "What this field is: Issue title/summary — required for create_issue.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Summary value.\nTip: Use {{$json.summary}} when this value comes from an earlier step.",
              "placeholder": "Enter Summary"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Issue description (plain text, converted to ADF automatically)",
              "helpText": "What this field is: Issue description.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Description value.\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Enter Description"
            },
            {
              "name": "Issue Type",
              "internalKey": "issueType",
              "type": "string",
              "required": false,
              "description": "Issue type — default: Task",
              "helpText": "What this field is: Issue type — default: Task.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Task.\nTip: Use {{$json.issueType}} when this value comes from an earlier step.",
              "placeholder": "Task",
              "example": "Task",
              "defaultValue": "Task"
            },
            {
              "name": "Priority",
              "internalKey": "priority",
              "type": "string",
              "required": false,
              "description": "Issue priority",
              "helpText": "What this field is: Issue priority.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Highest.\nTip: Use {{$json.priority}} when this value comes from an earlier step.",
              "placeholder": "Highest",
              "example": "Highest"
            },
            {
              "name": "Assignee",
              "internalKey": "assignee",
              "type": "string",
              "required": false,
              "description": "Assignee account ID (get from Jira user search)",
              "helpText": "What this field is: Assignee account ID.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Assignee value.\nTip: Use {{$json.assignee}} when this value comes from an earlier step.",
              "placeholder": "Enter Assignee"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Labels to attach to the issue",
              "helpText": "What this field is: Structured data for Labels to attach to the issue.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: [\"bug\",\"urgent\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"bug\",\"urgent\"]",
              "example": "[\"bug\",\"urgent\"]"
            },
            {
              "name": "Jql",
              "internalKey": "jql",
              "type": "string",
              "required": false,
              "description": "JQL query — required for search_issues",
              "helpText": "What this field is: JQL query — required for search_issues.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: project = PROJ AND status = \"In Progress\".\nTip: Use {{$json.jql}} when this value comes from an earlier step.",
              "placeholder": "project = PROJ AND status = \"In Progress\"",
              "example": "project = PROJ AND status = \"In Progress\""
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Max results for search_issues (default: 50)",
              "helpText": "What this field is: The number used for Max results for search_issues.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 50.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "50",
              "example": "50",
              "defaultValue": "50"
            },
            {
              "name": "Comment Body",
              "internalKey": "commentBody",
              "type": "textarea",
              "required": false,
              "description": "Comment text — required for add_comment",
              "helpText": "What this field is: Structured data for Comment text — required for add_comment.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Jira.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.commentBody}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Transition Id",
              "internalKey": "transitionId",
              "type": "string",
              "required": false,
              "description": "Transition ID — required for transition_issue",
              "helpText": "What this field is: The Transition ID — required for transition_issue that tells Jira which item to use.\nWhere to find it: Open the item in Jira and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.transitionId}} when an earlier Jira step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
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
            "scenario": "Process incoming Jira data with get projects after a related upstream event is received",
            "inputValues": {
              "Domain": "yourcompany.atlassian.net",
              "Project Key": "PROJ",
              "Issue Key": "PROJ-123",
              "Summary": "",
              "Description": ""
            },
            "expectedOutput": "Jira returns structured get projects data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Jira node."
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
