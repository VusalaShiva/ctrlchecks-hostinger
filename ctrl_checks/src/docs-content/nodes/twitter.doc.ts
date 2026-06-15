import type { NodeDoc } from '../types';

export const twitterDoc: NodeDoc = {
  "slug": "twitter",
  "displayName": "Twitter/X",
  "category": "Communication",
  "logoUrl": "/icons/nodes/twitter.svg",
  "description": "Post tweets, manage Twitter account",
  "credentialType": "Twitter API Key",
  "credentialSetupSteps": [
    "What this is: The Twitter/X connection lets CtrlChecks access your Twitter/X account safely without putting secrets in workflow fields.",
    "Where to start: developer.x.com -> Project and App -> Keys and tokens.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Twitter/X, then sign in or paste the secret value requested there.",
    "Example: the account access token shown by X.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Twitter/X step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api",
  "resources": [
    {
      "name": "Operations",
      "description": "Twitter/X exposes operation choices directly.",
      "operations": [
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Twitter/X node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Twitter resource",
              "helpText": "What this field is: The Twitter/X resource type to work with.\nOptions: tweet (post/read tweets), user (profile info), search (search tweets).\nExample: tweet to post a new tweet, user to look up a profile.",
              "placeholder": "tweet",
              "example": "tweet",
              "defaultValue": "tweet"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Tweet text (max 280 characters)",
              "helpText": "What this field is: Tweet text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.tweet}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.tweet}}",
              "example": "{{$json.tweet}}"
            },
            {
              "name": "Tweet Id",
              "internalKey": "tweetId",
              "type": "string",
              "required": false,
              "description": "Tweet ID (for get/delete/like/etc.)",
              "helpText": "What this field is: The Tweet ID that tells Twitter/X which item to use.\nWhere to find it: Open the item in Twitter/X and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tweetId}} when an earlier Twitter/X step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query (for search operations)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Twitter/X.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Twitter (if using OAuth authentication)",
              "helpText": "What this field is: X access token, a secret password that lets CtrlChecks talk to Twitter/X safely.\nWhere to find it: developer.x.com -> Project and App -> Keys and tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the account access token shown by X.\nImportant: Treat this like a bank password. Use account sign-in tokens for user actions.",
              "placeholder": "your-twitter-oauth-token",
              "example": "your-twitter-oauth-token"
            }
          ],
          "outputExample": {
            "text": "Tweet published successfully.",
            "length": 29
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Twitter/X data with create after a related upstream event is received",
            "inputValues": {
              "Resource": "tweet",
              "Text": "{{$json.tweet}}",
              "Tweet Id": "abc123",
              "Query": "",
              "Access Token": "your-twitter-oauth-token"
            },
            "expectedOutput": "Twitter/X returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.x.com/en/docs/x-api"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Twitter/X node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Twitter resource",
              "helpText": "What this field is: The Twitter/X resource type to work with.\nOptions: tweet (post/read tweets), user (profile info), search (search tweets).\nExample: tweet to post a new tweet, user to look up a profile.",
              "placeholder": "tweet",
              "example": "tweet",
              "defaultValue": "tweet"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Tweet text (max 280 characters)",
              "helpText": "What this field is: Tweet text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.tweet}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.tweet}}",
              "example": "{{$json.tweet}}"
            },
            {
              "name": "Tweet Id",
              "internalKey": "tweetId",
              "type": "string",
              "required": false,
              "description": "Tweet ID (for get/delete/like/etc.)",
              "helpText": "What this field is: The Tweet ID that tells Twitter/X which item to use.\nWhere to find it: Open the item in Twitter/X and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tweetId}} when an earlier Twitter/X step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query (for search operations)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Twitter/X.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Twitter (if using OAuth authentication)",
              "helpText": "What this field is: X access token, a secret password that lets CtrlChecks talk to Twitter/X safely.\nWhere to find it: developer.x.com -> Project and App -> Keys and tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the account access token shown by X.\nImportant: Treat this like a bank password. Use account sign-in tokens for user actions.",
              "placeholder": "your-twitter-oauth-token",
              "example": "your-twitter-oauth-token"
            }
          ],
          "outputExample": {
            "text": "Tweet deleted successfully.",
            "length": 27
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Twitter/X data with delete after a related upstream event is received",
            "inputValues": {
              "Resource": "tweet",
              "Text": "{{$json.tweet}}",
              "Tweet Id": "abc123",
              "Query": "",
              "Access Token": "your-twitter-oauth-token"
            },
            "expectedOutput": "Twitter/X returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.x.com/en/docs/x-api"
        },
        {
          "name": "Get",
          "value": "get",
          "description": "Fetch a specific tweet by its ID.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Twitter resource",
              "helpText": "What this field is: The Twitter/X resource type to work with.\nOptions: tweet (post/read tweets), user (profile info), search (search tweets).\nExample: tweet to post a new tweet, user to look up a profile.",
              "placeholder": "tweet",
              "example": "tweet",
              "defaultValue": "tweet"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Tweet text (max 280 characters)",
              "helpText": "What this field is: Tweet text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.tweet}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.tweet}}",
              "example": "{{$json.tweet}}"
            },
            {
              "name": "Tweet Id",
              "internalKey": "tweetId",
              "type": "string",
              "required": false,
              "description": "Tweet ID (for get/delete/like/etc.)",
              "helpText": "What this field is: The Tweet ID that tells Twitter/X which item to use.\nWhere to find it: Open the item in Twitter/X and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tweetId}} when an earlier Twitter/X step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query (for search operations)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Twitter/X.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Twitter (if using OAuth authentication)",
              "helpText": "What this field is: X access token, a secret password that lets CtrlChecks talk to Twitter/X safely.\nWhere to find it: developer.x.com -> Project and App -> Keys and tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the account access token shown by X.\nImportant: Treat this like a bank password. Use account sign-in tokens for user actions.",
              "placeholder": "your-twitter-oauth-token",
              "example": "your-twitter-oauth-token"
            }
          ],
          "outputExample": {
            "data": {
              "id": "1749876543210",
              "text": "Hello world!",
              "public_metrics": {
                "retweet_count": 5,
                "like_count": 42
              }
            }
          },
          "outputDescription": "data.id: The tweet ID. data.text: Tweet text. data.public_metrics: Engagement counts (likes, retweets, replies).",
          "usageExample": {
            "scenario": "Fetch engagement metrics for a specific tweet to track campaign performance",
            "inputValues": {
              "tweetId": "{{$json.tweetId}}"
            },
            "expectedOutput": "Returns the tweet with `{{$json.data.public_metrics.like_count}}` likes and `{{$json.data.public_metrics.retweet_count}}` retweets."
          },
          "externalDocsUrl": "https://developer.x.com/en/docs/x-api"
        },
        {
          "name": "GetMe",
          "value": "getMe",
          "description": "GetMe using the Twitter/X node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Twitter resource",
              "helpText": "What this field is: The Twitter/X resource type to work with.\nOptions: tweet (post/read tweets), user (profile info), search (search tweets).\nExample: tweet to post a new tweet, user to look up a profile.",
              "placeholder": "tweet",
              "example": "tweet",
              "defaultValue": "tweet"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Tweet text (max 280 characters)",
              "helpText": "What this field is: Tweet text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.tweet}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.tweet}}",
              "example": "{{$json.tweet}}"
            },
            {
              "name": "Tweet Id",
              "internalKey": "tweetId",
              "type": "string",
              "required": false,
              "description": "Tweet ID (for get/delete/like/etc.)",
              "helpText": "What this field is: The Tweet ID that tells Twitter/X which item to use.\nWhere to find it: Open the item in Twitter/X and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tweetId}} when an earlier Twitter/X step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query (for search operations)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Twitter/X.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Twitter (if using OAuth authentication)",
              "helpText": "What this field is: X access token, a secret password that lets CtrlChecks talk to Twitter/X safely.\nWhere to find it: developer.x.com -> Project and App -> Keys and tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the account access token shown by X.\nImportant: Treat this like a bank password. Use account sign-in tokens for user actions.",
              "placeholder": "your-twitter-oauth-token",
              "example": "your-twitter-oauth-token"
            }
          ],
          "outputExample": {
            "text": "Authenticated account: @ctrlchecks",
            "length": 34
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Twitter/X data with get me after a related upstream event is received",
            "inputValues": {
              "Resource": "tweet",
              "Text": "{{$json.tweet}}",
              "Tweet Id": "abc123",
              "Query": "",
              "Access Token": "your-twitter-oauth-token"
            },
            "expectedOutput": "Twitter/X returns structured get me data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.x.com/en/docs/x-api"
        },
        {
          "name": "Recent",
          "value": "recent",
          "description": "Recent using the Twitter/X node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Twitter resource",
              "helpText": "What this field is: The Twitter/X resource type to work with.\nOptions: tweet (post/read tweets), user (profile info), search (search tweets).\nExample: tweet to post a new tweet, user to look up a profile.",
              "placeholder": "tweet",
              "example": "tweet",
              "defaultValue": "tweet"
            },
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Tweet text (max 280 characters)",
              "helpText": "What this field is: Tweet text.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.tweet}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.tweet}}",
              "example": "{{$json.tweet}}"
            },
            {
              "name": "Tweet Id",
              "internalKey": "tweetId",
              "type": "string",
              "required": false,
              "description": "Tweet ID (for get/delete/like/etc.)",
              "helpText": "What this field is: The Tweet ID that tells Twitter/X which item to use.\nWhere to find it: Open the item in Twitter/X and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 123456789.\nTip: Use {{$json.tweetId}} when an earlier Twitter/X step provides this value.",
              "placeholder": "abc123",
              "example": "abc123"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query (for search operations)",
              "helpText": "What this field is: Structured data for Search query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Twitter/X.\nExample: status = active.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "status = active"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Twitter (if using OAuth authentication)",
              "helpText": "What this field is: X access token, a secret password that lets CtrlChecks talk to Twitter/X safely.\nWhere to find it: developer.x.com -> Project and App -> Keys and tokens.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the account access token shown by X.\nImportant: Treat this like a bank password. Use account sign-in tokens for user actions.",
              "placeholder": "your-twitter-oauth-token",
              "example": "your-twitter-oauth-token"
            }
          ],
          "outputExample": {
            "text": "Latest tweet: Product update is now live.",
            "length": 41
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Twitter/X data with recent after a related upstream event is received",
            "inputValues": {
              "Resource": "tweet",
              "Text": "{{$json.tweet}}",
              "Tweet Id": "abc123",
              "Query": "",
              "Access Token": "your-twitter-oauth-token"
            },
            "expectedOutput": "Twitter/X returns structured recent data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.x.com/en/docs/x-api"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Twitter/X node."
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
