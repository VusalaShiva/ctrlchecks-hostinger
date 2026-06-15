import type { NodeDoc } from '../types';

export const wordpressDoc: NodeDoc = {
  "slug": "wordpress",
  "displayName": "WordPress",
  "category": "Transformation",
  "logoUrl": "/icons/nodes/wordpress.svg",
  "description": "Create, read, update, and delete posts on a WordPress site via the WordPress REST API.",
  "credentialType": "WordPress Credential",
  "credentialSetupSteps": [
    "What this is: The WordPress connection lets CtrlChecks access your WordPress account safely without putting secrets in workflow fields.",
    "Where to start: WordPress account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> WordPress, then sign in or paste the secret value requested there.",
    "Example: the token format shown by WordPress.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple WordPress step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/",
  "resources": [
    {
      "name": "Operations",
      "description": "WordPress exposes operation choices directly.",
      "operations": [
        {
          "name": "Create post",
          "value": "create_post",
          "description": "Create post using the WordPress node.",
          "fields": [
            {
              "name": "Site Url",
              "internalKey": "siteUrl",
              "type": "url",
              "required": true,
              "description": "WordPress site base URL",
              "helpText": "What this field is: The web address for WordPress site base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.siteUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "WordPress username",
              "helpText": "What this field is: WordPress username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "WordPress Application Password",
              "helpText": "What this field is: WordPress token, a secret password that lets CtrlChecks talk to WordPress safely.\nWhere to find it: WordPress account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WordPress.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Post Id",
              "internalKey": "postId",
              "type": "string",
              "required": false,
              "description": "Post ID for update/delete",
              "helpText": "What this field is: The Post ID that tells WordPress which item to use.\nWhere to find it: Open the item in WordPress and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.postId}} when an earlier WordPress step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Post title",
              "helpText": "What this field is: Post title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Post body",
              "helpText": "What this field is: Post body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Content value.\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "Enter Content"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "select",
              "required": false,
              "description": "Post status",
              "helpText": "What this field is: Whether to publish or save as draft.\nOptions: publish (immediately live), draft (saved but not visible), private (only visible to admins).\nExample: publish",
              "placeholder": "publish",
              "example": "publish",
              "defaultValue": "publish",
              "options": [
                "Publish",
                "Draft",
                "Pending"
              ]
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max posts to return",
              "helpText": "What this field is: The number used for Max posts to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "create_post",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming WordPress data with create post after a related upstream event is received",
            "inputValues": {
              "Site Url": "https://api.example.com",
              "Username": "",
              "Password": "",
              "Post Id": "abc123",
              "Title": ""
            },
            "expectedOutput": "WordPress returns structured create post data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.wordpress.org/rest-api/reference/"
        },
        {
          "name": "Get posts",
          "value": "get_posts",
          "description": "Get posts using the WordPress node.",
          "fields": [
            {
              "name": "Site Url",
              "internalKey": "siteUrl",
              "type": "url",
              "required": true,
              "description": "WordPress site base URL",
              "helpText": "What this field is: The web address for WordPress site base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.siteUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "WordPress username",
              "helpText": "What this field is: WordPress username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "WordPress Application Password",
              "helpText": "What this field is: WordPress token, a secret password that lets CtrlChecks talk to WordPress safely.\nWhere to find it: WordPress account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WordPress.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Post Id",
              "internalKey": "postId",
              "type": "string",
              "required": false,
              "description": "Post ID for update/delete",
              "helpText": "What this field is: The Post ID that tells WordPress which item to use.\nWhere to find it: Open the item in WordPress and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.postId}} when an earlier WordPress step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Post title",
              "helpText": "What this field is: Post title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Post body",
              "helpText": "What this field is: Post body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Content value.\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "Enter Content"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "select",
              "required": false,
              "description": "Post status",
              "helpText": "Options: Choose the status value this WordPress step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Publish.\nTip: Use {{$json.status}} only when an earlier step already provides a valid option value.",
              "placeholder": "publish",
              "example": "publish",
              "defaultValue": "publish",
              "options": [
                "Publish",
                "Draft",
                "Pending"
              ]
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max posts to return",
              "helpText": "What this field is: The number used for Max posts to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "get_posts",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming WordPress data with get posts after a related upstream event is received",
            "inputValues": {
              "Site Url": "https://api.example.com",
              "Username": "",
              "Password": "",
              "Post Id": "abc123",
              "Title": ""
            },
            "expectedOutput": "WordPress returns structured get posts data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.wordpress.org/rest-api/reference/"
        },
        {
          "name": "Update post",
          "value": "update_post",
          "description": "Update post using the WordPress node.",
          "fields": [
            {
              "name": "Site Url",
              "internalKey": "siteUrl",
              "type": "url",
              "required": true,
              "description": "WordPress site base URL",
              "helpText": "What this field is: The web address for WordPress site base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.siteUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "WordPress username",
              "helpText": "What this field is: WordPress username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "WordPress Application Password",
              "helpText": "What this field is: WordPress token, a secret password that lets CtrlChecks talk to WordPress safely.\nWhere to find it: WordPress account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WordPress.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Post Id",
              "internalKey": "postId",
              "type": "string",
              "required": false,
              "description": "Post ID for update/delete",
              "helpText": "What this field is: The Post ID that tells WordPress which item to use.\nWhere to find it: Open the item in WordPress and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.postId}} when an earlier WordPress step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Post title",
              "helpText": "What this field is: Post title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Post body",
              "helpText": "What this field is: Post body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Content value.\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "Enter Content"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "select",
              "required": false,
              "description": "Post status",
              "helpText": "Options: Choose the status value this WordPress step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Publish.\nTip: Use {{$json.status}} only when an earlier step already provides a valid option value.",
              "placeholder": "publish",
              "example": "publish",
              "defaultValue": "publish",
              "options": [
                "Publish",
                "Draft",
                "Pending"
              ]
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max posts to return",
              "helpText": "What this field is: The number used for Max posts to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "update_post",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming WordPress data with update post after a related upstream event is received",
            "inputValues": {
              "Site Url": "https://api.example.com",
              "Username": "",
              "Password": "",
              "Post Id": "abc123",
              "Title": ""
            },
            "expectedOutput": "WordPress returns structured update post data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.wordpress.org/rest-api/reference/"
        },
        {
          "name": "Delete post",
          "value": "delete_post",
          "description": "Delete post using the WordPress node.",
          "fields": [
            {
              "name": "Site Url",
              "internalKey": "siteUrl",
              "type": "url",
              "required": true,
              "description": "WordPress site base URL",
              "helpText": "What this field is: The web address for WordPress site base URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.siteUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Username",
              "internalKey": "username",
              "type": "string",
              "required": true,
              "description": "WordPress username",
              "helpText": "What this field is: WordPress username.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Username value.\nTip: Use {{$json.username}} when this value comes from an earlier step.",
              "placeholder": "Enter Username"
            },
            {
              "name": "Password",
              "internalKey": "password",
              "type": "password",
              "required": true,
              "description": "WordPress Application Password",
              "helpText": "What this field is: WordPress token, a secret password that lets CtrlChecks talk to WordPress safely.\nWhere to find it: WordPress account settings or developer settings.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the token format shown by WordPress.\nImportant: Treat this like a bank password. Use CtrlChecks Connections when possible.",
              "placeholder": "Enter Password",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Post Id",
              "internalKey": "postId",
              "type": "string",
              "required": false,
              "description": "Post ID for update/delete",
              "helpText": "What this field is: The Post ID that tells WordPress which item to use.\nWhere to find it: Open the item in WordPress and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.postId}} when an earlier WordPress step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Post title",
              "helpText": "What this field is: Post title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Title value.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "Enter Title"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Post body",
              "helpText": "What this field is: Post body.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Content value.\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "Enter Content"
            },
            {
              "name": "Status",
              "internalKey": "status",
              "type": "select",
              "required": false,
              "description": "Post status",
              "helpText": "Options: Choose the status value this WordPress step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Publish.\nTip: Use {{$json.status}} only when an earlier step already provides a valid option value.",
              "placeholder": "publish",
              "example": "publish",
              "defaultValue": "publish",
              "options": [
                "Publish",
                "Draft",
                "Pending"
              ]
            },
            {
              "name": "Limit",
              "internalKey": "limit",
              "type": "number",
              "required": false,
              "description": "Max posts to return",
              "helpText": "What this field is: The number used for Max posts to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.limit}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10",
              "defaultValue": "10"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "delete_post",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming WordPress data with delete post after a related upstream event is received",
            "inputValues": {
              "Site Url": "https://api.example.com",
              "Username": "",
              "Password": "",
              "Post Id": "abc123",
              "Title": ""
            },
            "expectedOutput": "WordPress returns structured delete post data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.wordpress.org/rest-api/reference/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the WordPress node."
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
