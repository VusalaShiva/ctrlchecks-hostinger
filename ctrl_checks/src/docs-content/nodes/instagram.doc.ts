import type { NodeDoc } from '../types';

export const instagramDoc: NodeDoc = {
  "slug": "instagram",
  "displayName": "Instagram",
  "category": "Communication",
  "logoUrl": "/icons/nodes/instagram.svg",
  "description": "Post content to Instagram",
  "credentialType": "Meta App Credentials",
  "credentialSetupSteps": [
    "What this is: The Instagram connection lets CtrlChecks access your Instagram account safely without putting secrets in workflow fields.",
    "Where to start: Meta for Developers -> your app -> Instagram API setup.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Instagram, then sign in or paste the secret value requested there.",
    "Example: the access token shown by Meta.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Instagram step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.facebook.com/docs/facebook-login/web",
  "resources": [
    {
      "name": "Operations",
      "description": "Instagram exposes operation choices directly.",
      "operations": [
        {
          "name": "Get",
          "value": "get",
          "description": "Get details about an Instagram media post.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Instagram resource",
              "helpText": "What this field is: Instagram resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: media.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "media",
              "example": "media",
              "defaultValue": "media"
            },
            {
              "name": "Media Url",
              "internalKey": "media_url",
              "type": "url",
              "required": false,
              "description": "Media URL (image/video) for create operations",
              "helpText": "What this field is: The web address for Media URL for create operations.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/image.jpg.\nTip: Use {{$json.media_url}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/image.jpg",
              "example": "https://example.com/image.jpg"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Post caption",
              "helpText": "What this field is: Post caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.caption}}.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "{{$json.caption}}",
              "example": "{{$json.caption}}"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Instagram (if using OAuth authentication)",
              "helpText": "What this field is: Instagram access token, a secret password that lets CtrlChecks talk to Instagram safely.\nWhere to find it: Meta for Developers -> your app -> Instagram API setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Make sure the connected account has permission for the action.",
              "placeholder": "your-instagram-oauth-token",
              "example": "your-instagram-oauth-token"
            }
          ],
          "outputExample": {
            "id": "17858893269000001",
            "caption": "✨ New arrival...",
            "like_count": 124,
            "comments_count": 7,
            "timestamp": "2025-01-15T12:00:00+0000"
          },
          "outputDescription": "id: Media ID. caption: Post caption. like_count: Number of likes. comments_count: Number of comments. timestamp: When the post was published.",
          "usageExample": {
            "scenario": "Track post engagement metrics after publishing",
            "inputValues": {
              "mediaId": "{{$json.id}}"
            },
            "expectedOutput": "Returns post insights with `{{$json.like_count}}` and `{{$json.comments_count}}`."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/instagram-platform/"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the Instagram node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Instagram resource",
              "helpText": "What this field is: Instagram resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: media.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "media",
              "example": "media",
              "defaultValue": "media"
            },
            {
              "name": "Media Url",
              "internalKey": "media_url",
              "type": "url",
              "required": false,
              "description": "Media URL (image/video) for create operations",
              "helpText": "What this field is: The web address for Media URL for create operations.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/image.jpg.\nTip: Use {{$json.media_url}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/image.jpg",
              "example": "https://example.com/image.jpg"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Post caption",
              "helpText": "What this field is: Post caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.caption}}.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "{{$json.caption}}",
              "example": "{{$json.caption}}"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Instagram (if using OAuth authentication)",
              "helpText": "What this field is: Instagram access token, a secret password that lets CtrlChecks talk to Instagram safely.\nWhere to find it: Meta for Developers -> your app -> Instagram API setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Make sure the connected account has permission for the action.",
              "placeholder": "your-instagram-oauth-token",
              "example": "your-instagram-oauth-token"
            }
          ],
          "outputExample": {
            "success": true,
            "id": "abc123",
            "mediaId": "abc123",
            "data": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\nid: Unique identifier returned by the service.\nmediaId: Unique identifier returned by the service.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Instagram data with list after a related upstream event is received",
            "inputValues": {
              "Resource": "media",
              "Media Url": "https://example.com/image.jpg",
              "Caption": "{{$json.caption}}",
              "Access Token": "your-instagram-oauth-token"
            },
            "expectedOutput": "Instagram returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/instagram-platform/"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Instagram node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Instagram resource",
              "helpText": "What this field is: Instagram resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: media.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "media",
              "example": "media",
              "defaultValue": "media"
            },
            {
              "name": "Media Url",
              "internalKey": "media_url",
              "type": "url",
              "required": false,
              "description": "Media URL (image/video) for create operations",
              "helpText": "What this field is: The web address for Media URL for create operations.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/image.jpg.\nTip: Use {{$json.media_url}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/image.jpg",
              "example": "https://example.com/image.jpg"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Post caption",
              "helpText": "What this field is: Post caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.caption}}.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "{{$json.caption}}",
              "example": "{{$json.caption}}"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Instagram (if using OAuth authentication)",
              "helpText": "What this field is: Instagram access token, a secret password that lets CtrlChecks talk to Instagram safely.\nWhere to find it: Meta for Developers -> your app -> Instagram API setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Make sure the connected account has permission for the action.",
              "placeholder": "your-instagram-oauth-token",
              "example": "your-instagram-oauth-token"
            }
          ],
          "outputExample": {
            "success": true,
            "id": "abc123",
            "mediaId": "abc123",
            "data": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\nid: Unique identifier returned by the service.\nmediaId: Unique identifier returned by the service.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Instagram data with create after a related upstream event is received",
            "inputValues": {
              "Resource": "media",
              "Media Url": "https://example.com/image.jpg",
              "Caption": "{{$json.caption}}",
              "Access Token": "your-instagram-oauth-token"
            },
            "expectedOutput": "Instagram returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/instagram-platform/"
        },
        {
          "name": "Publish",
          "value": "publish",
          "description": "Publish using the Instagram node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Instagram resource",
              "helpText": "What this field is: Instagram resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: media.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "media",
              "example": "media",
              "defaultValue": "media"
            },
            {
              "name": "Media Url",
              "internalKey": "media_url",
              "type": "url",
              "required": false,
              "description": "Media URL (image/video) for create operations",
              "helpText": "What this field is: The web address for Media URL for create operations.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/image.jpg.\nTip: Use {{$json.media_url}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/image.jpg",
              "example": "https://example.com/image.jpg"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Post caption",
              "helpText": "What this field is: Post caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.caption}}.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "{{$json.caption}}",
              "example": "{{$json.caption}}"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Instagram (if using OAuth authentication)",
              "helpText": "What this field is: Instagram access token, a secret password that lets CtrlChecks talk to Instagram safely.\nWhere to find it: Meta for Developers -> your app -> Instagram API setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Make sure the connected account has permission for the action.",
              "placeholder": "your-instagram-oauth-token",
              "example": "your-instagram-oauth-token"
            }
          ],
          "outputExample": {
            "success": true,
            "id": "abc123",
            "mediaId": "abc123",
            "data": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\nid: Unique identifier returned by the service.\nmediaId: Unique identifier returned by the service.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Instagram data with publish after a related upstream event is received",
            "inputValues": {
              "Resource": "media",
              "Media Url": "https://example.com/image.jpg",
              "Caption": "{{$json.caption}}",
              "Access Token": "your-instagram-oauth-token"
            },
            "expectedOutput": "Instagram returns structured publish data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/instagram-platform/"
        },
        {
          "name": "CreateAndPublish",
          "value": "createAndPublish",
          "description": "CreateAndPublish using the Instagram node.",
          "fields": [
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Instagram resource",
              "helpText": "What this field is: Instagram resource.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: media.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "media",
              "example": "media",
              "defaultValue": "media"
            },
            {
              "name": "Media Url",
              "internalKey": "media_url",
              "type": "url",
              "required": false,
              "description": "Media URL (image/video) for create operations",
              "helpText": "What this field is: The web address for Media URL for create operations.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/image.jpg.\nTip: Use {{$json.media_url}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/image.jpg",
              "example": "https://example.com/image.jpg"
            },
            {
              "name": "Caption",
              "internalKey": "caption",
              "type": "string",
              "required": false,
              "description": "Post caption",
              "helpText": "What this field is: Post caption.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.caption}}.\nTip: Use {{$json.caption}} when this value comes from an earlier step.",
              "placeholder": "{{$json.caption}}",
              "example": "{{$json.caption}}"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 Access Token for Instagram (if using OAuth authentication)",
              "helpText": "What this field is: Instagram access token, a secret password that lets CtrlChecks talk to Instagram safely.\nWhere to find it: Meta for Developers -> your app -> Instagram API setup.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token shown by Meta.\nImportant: Treat this like a bank password. Make sure the connected account has permission for the action.",
              "placeholder": "your-instagram-oauth-token",
              "example": "your-instagram-oauth-token"
            }
          ],
          "outputExample": {
            "success": true,
            "id": "abc123",
            "mediaId": "abc123",
            "data": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\nid: Unique identifier returned by the service.\nmediaId: Unique identifier returned by the service.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Instagram data with create and publish after a related upstream event is received",
            "inputValues": {
              "Resource": "media",
              "Media Url": "https://example.com/image.jpg",
              "Caption": "{{$json.caption}}",
              "Access Token": "your-instagram-oauth-token"
            },
            "expectedOutput": "Instagram returns structured create and publish data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.facebook.com/docs/instagram-platform/"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Instagram node."
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
