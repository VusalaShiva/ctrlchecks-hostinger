import type { NodeDoc } from '../types';

export const githubDoc: NodeDoc = {
  "slug": "github",
  "displayName": "GitHub",
  "category": "Data",
  "logoUrl": "/icons/nodes/github.svg",
  "description": "GitHub repository operations",
  "credentialType": "GitHub API Key",
  "credentialSetupSteps": [
    "What this is: The GitHub connection lets CtrlChecks access your GitHub account safely without putting secrets in workflow fields.",
    "Where to start: GitHub -> Settings -> Developer settings -> Personal access tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> GitHub, then sign in or paste the secret value requested there.",
    "Example: github_pat_... for fine-grained tokens or ghp_... for classic tokens.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple GitHub step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token",
  "resources": [
    {
      "name": "Operations",
      "description": "GitHub exposes operation choices directly.",
      "operations": [
        {
          "name": "Create issue",
          "value": "create_issue",
          "description": "Create a new issue in a GitHub repository.",
          "fields": [
            {
              "name": "Owner",
              "internalKey": "owner",
              "type": "string",
              "required": false,
              "description": "Repository owner (user/org)",
              "helpText": "What this field is: The GitHub username or organization that owns the repository.\nExample: alice (personal) or mycompany (organization)\nWhere to find it: It is the first part of your repository URL: github.com/OWNER/repo-name.",
              "placeholder": "octocat",
              "example": "octocat"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The repository name (just the name, not the full URL).\nExample: my-project or backend-api\nWhere to find it: It is the second part of your repository URL: github.com/owner/REPO-NAME.",
              "placeholder": "hello-world",
              "example": "hello-world"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue/PR title",
              "helpText": "What this field is: Issue/PR title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Issue/PR body or comment text",
              "helpText": "What this field is: Structured data for Issue/PR body or comment text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Issue Number",
              "internalKey": "issueNumber",
              "type": "number",
              "required": false,
              "description": "Issue number (for comments/updates)",
              "helpText": "What this field is: The GitHub issue or pull request number.\nWhere to find it: Open the issue or pull request. The number appears after # and at the end of the URL.\nExample: 42 from github.com/octocat/hello-world/issues/42.\nTip: Use {{$json.number}} from a previous GitHub Create Issue step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Comment",
              "internalKey": "comment",
              "type": "string",
              "required": false,
              "description": "Issue comment text (for add_issue_comment)",
              "helpText": "What this field is: Issue comment text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Comment value.\nTip: This field is used for add_issue_comment. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Comment"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Issue labels (array of strings)",
              "helpText": "What this field is: Structured data for Issue labels.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: [\"item\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            },
            {
              "name": "Ref",
              "internalKey": "ref",
              "type": "string",
              "required": false,
              "description": "Base branch/ref (for PR/workflow)",
              "helpText": "What this field is: The branch or tag GitHub should use.\nHow to fill it: Use a branch name for most workflows, or a full ref when GitHub requires it.\nExample: main, develop, or refs/heads/main.\nTip: Use {{$json.ref}} from a webhook when the branch should match an incoming event.",
              "placeholder": "main",
              "example": "main"
            },
            {
              "name": "Branch Name",
              "internalKey": "branchName",
              "type": "string",
              "required": false,
              "description": "Head branch name (for PR)",
              "helpText": "What this field is: The source branch for a pull request.\nHow to fill it: Type the branch that contains the changes you want to merge.\nExample: feature/add-login-page or fix/issue-42.\nTip: The branch must already exist in the repository.",
              "placeholder": "Enter Branch Name"
            },
            {
              "name": "Workflow Id",
              "internalKey": "workflowId",
              "type": "string",
              "required": false,
              "description": "Workflow ID or filename (for trigger_workflow)",
              "helpText": "What this field is: The GitHub Actions workflow to run.\nWhere to find it: In your repository, open .github/workflows and copy the workflow file name.\nExample: deploy.yml or release.yml.\nTip: The workflow must exist on the branch set in Ref.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for GitHub (if using OAuth authentication)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "your-github-oauth-token",
              "example": "your-github-oauth-token"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "GitHub Personal Access Token (alternative to OAuth)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "example": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            }
          ],
          "outputExample": {
            "number": 42,
            "title": "Bug: Login fails for SSO users",
            "state": "open",
            "html_url": "https://github.com/org/repo/issues/42",
            "created_at": "2025-01-15T10:00:00Z"
          },
          "outputDescription": "number: The issue number. html_url: Direct link to the issue. state: \"open\" means it was created.",
          "usageExample": {
            "scenario": "Create a GitHub issue when a critical error is logged",
            "inputValues": {
              "owner": "{{$env.GH_OWNER}}",
              "repo": "{{$env.GH_REPO}}",
              "title": "[ERROR] {{$json.errorMessage}}",
              "body": "**Workflow:** {{$json.workflowId}}\n**Time:** {{$now}}\n\n```\n{{$json.stack}}\n```"
            },
            "expectedOutput": "Issue is created. Share `{{$json.html_url}}` in a Slack alert."
          },
          "externalDocsUrl": "https://docs.github.com/en/rest"
        },
        {
          "name": "Add issue comment",
          "value": "add_issue_comment",
          "description": "Add issue comment using the GitHub node.",
          "fields": [
            {
              "name": "Owner",
              "internalKey": "owner",
              "type": "string",
              "required": false,
              "description": "Repository owner (user/org)",
              "helpText": "What this field is: The GitHub username or organization that owns the repository.\nExample: alice (personal) or mycompany (organization)\nWhere to find it: It is the first part of your repository URL: github.com/OWNER/repo-name.",
              "placeholder": "octocat",
              "example": "octocat"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The repository name (just the name, not the full URL).\nExample: my-project or backend-api\nWhere to find it: It is the second part of your repository URL: github.com/owner/REPO-NAME.",
              "placeholder": "hello-world",
              "example": "hello-world"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue/PR title",
              "helpText": "What this field is: Issue/PR title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Issue/PR body or comment text",
              "helpText": "What this field is: Structured data for Issue/PR body or comment text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Issue Number",
              "internalKey": "issueNumber",
              "type": "number",
              "required": false,
              "description": "Issue number (for comments/updates)",
              "helpText": "What this field is: The GitHub issue or pull request number.\nWhere to find it: Open the issue or pull request. The number appears after # and at the end of the URL.\nExample: 42 from github.com/octocat/hello-world/issues/42.\nTip: Use {{$json.number}} from a previous GitHub Create Issue step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Comment",
              "internalKey": "comment",
              "type": "string",
              "required": false,
              "description": "Issue comment text (for add_issue_comment)",
              "helpText": "What this field is: Issue comment text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Comment value.\nTip: This field is used for add_issue_comment. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Comment"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Issue labels (array of strings)",
              "helpText": "What this field is: Structured data for Issue labels.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: [\"item\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            },
            {
              "name": "Ref",
              "internalKey": "ref",
              "type": "string",
              "required": false,
              "description": "Base branch/ref (for PR/workflow)",
              "helpText": "What this field is: The branch or tag GitHub should use.\nHow to fill it: Use a branch name for most workflows, or a full ref when GitHub requires it.\nExample: main, develop, or refs/heads/main.\nTip: Use {{$json.ref}} from a webhook when the branch should match an incoming event.",
              "placeholder": "main",
              "example": "main"
            },
            {
              "name": "Branch Name",
              "internalKey": "branchName",
              "type": "string",
              "required": false,
              "description": "Head branch name (for PR)",
              "helpText": "What this field is: The source branch for a pull request.\nHow to fill it: Type the branch that contains the changes you want to merge.\nExample: feature/add-login-page or fix/issue-42.\nTip: The branch must already exist in the repository.",
              "placeholder": "Enter Branch Name"
            },
            {
              "name": "Workflow Id",
              "internalKey": "workflowId",
              "type": "string",
              "required": false,
              "description": "Workflow ID or filename (for trigger_workflow)",
              "helpText": "What this field is: The GitHub Actions workflow to run.\nWhere to find it: In your repository, open .github/workflows and copy the workflow file name.\nExample: deploy.yml or release.yml.\nTip: The workflow must exist on the branch set in Ref.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for GitHub (if using OAuth authentication)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "your-github-oauth-token",
              "example": "your-github-oauth-token"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "GitHub Personal Access Token (alternative to OAuth)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "example": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming GitHub data with add issue comment after a related upstream event is received",
            "inputValues": {
              "Owner": "octocat",
              "Repo": "hello-world",
              "Title": "",
              "Body": "",
              "Issue Number": "10"
            },
            "expectedOutput": "GitHub returns structured add issue comment data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.github.com/en/rest"
        },
        {
          "name": "Create pr",
          "value": "create_pr",
          "description": "Create pr using the GitHub node.",
          "fields": [
            {
              "name": "Owner",
              "internalKey": "owner",
              "type": "string",
              "required": false,
              "description": "Repository owner (user/org)",
              "helpText": "What this field is: The GitHub username or organization that owns the repository.\nExample: alice (personal) or mycompany (organization)\nWhere to find it: It is the first part of your repository URL: github.com/OWNER/repo-name.",
              "placeholder": "octocat",
              "example": "octocat"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The repository name (just the name, not the full URL).\nExample: my-project or backend-api\nWhere to find it: It is the second part of your repository URL: github.com/owner/REPO-NAME.",
              "placeholder": "hello-world",
              "example": "hello-world"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue/PR title",
              "helpText": "What this field is: Issue/PR title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Issue/PR body or comment text",
              "helpText": "What this field is: Structured data for Issue/PR body or comment text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Issue Number",
              "internalKey": "issueNumber",
              "type": "number",
              "required": false,
              "description": "Issue number (for comments/updates)",
              "helpText": "What this field is: The GitHub issue or pull request number.\nWhere to find it: Open the issue or pull request. The number appears after # and at the end of the URL.\nExample: 42 from github.com/octocat/hello-world/issues/42.\nTip: Use {{$json.number}} from a previous GitHub Create Issue step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Comment",
              "internalKey": "comment",
              "type": "string",
              "required": false,
              "description": "Issue comment text (for add_issue_comment)",
              "helpText": "What this field is: Issue comment text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Comment value.\nTip: This field is used for add_issue_comment. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Comment"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Issue labels (array of strings)",
              "helpText": "What this field is: Structured data for Issue labels.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: [\"item\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            },
            {
              "name": "Ref",
              "internalKey": "ref",
              "type": "string",
              "required": false,
              "description": "Base branch/ref (for PR/workflow)",
              "helpText": "What this field is: The branch or tag GitHub should use.\nHow to fill it: Use a branch name for most workflows, or a full ref when GitHub requires it.\nExample: main, develop, or refs/heads/main.\nTip: Use {{$json.ref}} from a webhook when the branch should match an incoming event.",
              "placeholder": "main",
              "example": "main"
            },
            {
              "name": "Branch Name",
              "internalKey": "branchName",
              "type": "string",
              "required": false,
              "description": "Head branch name (for PR)",
              "helpText": "What this field is: The source branch for a pull request.\nHow to fill it: Type the branch that contains the changes you want to merge.\nExample: feature/add-login-page or fix/issue-42.\nTip: The branch must already exist in the repository.",
              "placeholder": "Enter Branch Name"
            },
            {
              "name": "Workflow Id",
              "internalKey": "workflowId",
              "type": "string",
              "required": false,
              "description": "Workflow ID or filename (for trigger_workflow)",
              "helpText": "What this field is: The GitHub Actions workflow to run.\nWhere to find it: In your repository, open .github/workflows and copy the workflow file name.\nExample: deploy.yml or release.yml.\nTip: The workflow must exist on the branch set in Ref.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for GitHub (if using OAuth authentication)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "your-github-oauth-token",
              "example": "your-github-oauth-token"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "GitHub Personal Access Token (alternative to OAuth)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "example": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming GitHub data with create pr after a related upstream event is received",
            "inputValues": {
              "Owner": "octocat",
              "Repo": "hello-world",
              "Title": "",
              "Body": "",
              "Issue Number": "10"
            },
            "expectedOutput": "GitHub returns structured create pr data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.github.com/en/rest"
        },
        {
          "name": "Trigger workflow",
          "value": "trigger_workflow",
          "description": "Trigger workflow using the GitHub node.",
          "fields": [
            {
              "name": "Owner",
              "internalKey": "owner",
              "type": "string",
              "required": false,
              "description": "Repository owner (user/org)",
              "helpText": "What this field is: The GitHub username or organization that owns the repository.\nExample: alice (personal) or mycompany (organization)\nWhere to find it: It is the first part of your repository URL: github.com/OWNER/repo-name.",
              "placeholder": "octocat",
              "example": "octocat"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The repository name (just the name, not the full URL).\nExample: my-project or backend-api\nWhere to find it: It is the second part of your repository URL: github.com/owner/REPO-NAME.",
              "placeholder": "hello-world",
              "example": "hello-world"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue/PR title",
              "helpText": "What this field is: Issue/PR title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Issue/PR body or comment text",
              "helpText": "What this field is: Structured data for Issue/PR body or comment text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Issue Number",
              "internalKey": "issueNumber",
              "type": "number",
              "required": false,
              "description": "Issue number (for comments/updates)",
              "helpText": "What this field is: The GitHub issue or pull request number.\nWhere to find it: Open the issue or pull request. The number appears after # and at the end of the URL.\nExample: 42 from github.com/octocat/hello-world/issues/42.\nTip: Use {{$json.number}} from a previous GitHub Create Issue step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Comment",
              "internalKey": "comment",
              "type": "string",
              "required": false,
              "description": "Issue comment text (for add_issue_comment)",
              "helpText": "What this field is: Issue comment text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Comment value.\nTip: This field is used for add_issue_comment. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Comment"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Issue labels (array of strings)",
              "helpText": "What this field is: Structured data for Issue labels.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: [\"item\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            },
            {
              "name": "Ref",
              "internalKey": "ref",
              "type": "string",
              "required": false,
              "description": "Base branch/ref (for PR/workflow)",
              "helpText": "What this field is: The branch or tag GitHub should use.\nHow to fill it: Use a branch name for most workflows, or a full ref when GitHub requires it.\nExample: main, develop, or refs/heads/main.\nTip: Use {{$json.ref}} from a webhook when the branch should match an incoming event.",
              "placeholder": "main",
              "example": "main"
            },
            {
              "name": "Branch Name",
              "internalKey": "branchName",
              "type": "string",
              "required": false,
              "description": "Head branch name (for PR)",
              "helpText": "What this field is: The source branch for a pull request.\nHow to fill it: Type the branch that contains the changes you want to merge.\nExample: feature/add-login-page or fix/issue-42.\nTip: The branch must already exist in the repository.",
              "placeholder": "Enter Branch Name"
            },
            {
              "name": "Workflow Id",
              "internalKey": "workflowId",
              "type": "string",
              "required": false,
              "description": "Workflow ID or filename (for trigger_workflow)",
              "helpText": "What this field is: The GitHub Actions workflow to run.\nWhere to find it: In your repository, open .github/workflows and copy the workflow file name.\nExample: deploy.yml or release.yml.\nTip: The workflow must exist on the branch set in Ref.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for GitHub (if using OAuth authentication)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "your-github-oauth-token",
              "example": "your-github-oauth-token"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "GitHub Personal Access Token (alternative to OAuth)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "example": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming GitHub data with trigger workflow after a related upstream event is received",
            "inputValues": {
              "Owner": "octocat",
              "Repo": "hello-world",
              "Title": "",
              "Body": "",
              "Issue Number": "10"
            },
            "expectedOutput": "GitHub returns structured trigger workflow data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.github.com/en/rest"
        },
        {
          "name": "List repos",
          "value": "list_repos",
          "description": "List repos using the GitHub node.",
          "fields": [
            {
              "name": "Owner",
              "internalKey": "owner",
              "type": "string",
              "required": false,
              "description": "Repository owner (user/org)",
              "helpText": "What this field is: The GitHub username or organization that owns the repository.\nExample: alice (personal) or mycompany (organization)\nWhere to find it: It is the first part of your repository URL: github.com/OWNER/repo-name.",
              "placeholder": "octocat",
              "example": "octocat"
            },
            {
              "name": "Repo",
              "internalKey": "repo",
              "type": "string",
              "required": false,
              "description": "Repository name",
              "helpText": "What this field is: The repository name (just the name, not the full URL).\nExample: my-project or backend-api\nWhere to find it: It is the second part of your repository URL: github.com/owner/REPO-NAME.",
              "placeholder": "hello-world",
              "example": "hello-world"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Issue/PR title",
              "helpText": "What this field is: Issue/PR title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Issue/PR body or comment text",
              "helpText": "What this field is: Structured data for Issue/PR body or comment text.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: {\"name\":\"{{$json.name}}\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"name\":\"{{$json.name}}\"}"
            },
            {
              "name": "Issue Number",
              "internalKey": "issueNumber",
              "type": "number",
              "required": false,
              "description": "Issue number (for comments/updates)",
              "helpText": "What this field is: The GitHub issue or pull request number.\nWhere to find it: Open the issue or pull request. The number appears after # and at the end of the URL.\nExample: 42 from github.com/octocat/hello-world/issues/42.\nTip: Use {{$json.number}} from a previous GitHub Create Issue step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Comment",
              "internalKey": "comment",
              "type": "string",
              "required": false,
              "description": "Issue comment text (for add_issue_comment)",
              "helpText": "What this field is: Issue comment text.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Comment value.\nTip: This field is used for add_issue_comment. Leave it blank when this operation does not need it.",
              "placeholder": "Enter Comment"
            },
            {
              "name": "Labels",
              "internalKey": "labels",
              "type": "json",
              "required": false,
              "description": "Issue labels (array of strings)",
              "helpText": "What this field is: Structured data for Issue labels.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GitHub.\nExample: [\"item\"].\nTip: Use {{$json.labels}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            },
            {
              "name": "Ref",
              "internalKey": "ref",
              "type": "string",
              "required": false,
              "description": "Base branch/ref (for PR/workflow)",
              "helpText": "What this field is: The branch or tag GitHub should use.\nHow to fill it: Use a branch name for most workflows, or a full ref when GitHub requires it.\nExample: main, develop, or refs/heads/main.\nTip: Use {{$json.ref}} from a webhook when the branch should match an incoming event.",
              "placeholder": "main",
              "example": "main"
            },
            {
              "name": "Branch Name",
              "internalKey": "branchName",
              "type": "string",
              "required": false,
              "description": "Head branch name (for PR)",
              "helpText": "What this field is: The source branch for a pull request.\nHow to fill it: Type the branch that contains the changes you want to merge.\nExample: feature/add-login-page or fix/issue-42.\nTip: The branch must already exist in the repository.",
              "placeholder": "Enter Branch Name"
            },
            {
              "name": "Workflow Id",
              "internalKey": "workflowId",
              "type": "string",
              "required": false,
              "description": "Workflow ID or filename (for trigger_workflow)",
              "helpText": "What this field is: The GitHub Actions workflow to run.\nWhere to find it: In your repository, open .github/workflows and copy the workflow file name.\nExample: deploy.yml or release.yml.\nTip: The workflow must exist on the branch set in Ref.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for GitHub (if using OAuth authentication)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "your-github-oauth-token",
              "example": "your-github-oauth-token"
            },
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "GitHub Personal Access Token (alternative to OAuth)",
              "helpText": "What this field is: GitHub personal access token, a secret password that lets CtrlChecks talk to GitHub safely.\nWhere to find it: GitHub -> Settings -> Developer settings -> Personal access tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: github_pat_... for fine-grained tokens or ghp_... for classic tokens.\nImportant: Treat this like a bank password. Give the token only the repository permissions this workflow needs.",
              "placeholder": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "example": "ghp_xxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
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
            "scenario": "Process incoming GitHub data with list repos after a related upstream event is received",
            "inputValues": {
              "Owner": "octocat",
              "Repo": "hello-world",
              "Title": "",
              "Body": "",
              "Issue Number": "10"
            },
            "expectedOutput": "GitHub returns structured list repos data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.github.com/en/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the GitHub node."
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
