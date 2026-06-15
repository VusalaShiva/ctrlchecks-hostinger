import type { NodeDoc } from '../types';

export const youtubeDoc: NodeDoc = {
  "slug": "youtube",
  "displayName": "YouTube",
  "category": "Communication",
  "logoUrl": "/icons/nodes/youtube.svg",
  "description": "Publish videos or posts to YouTube channels",
  "credentialType": "Google Credential",
  "credentialSetupSteps": [
    "What this is: The YouTube connection lets CtrlChecks access your YouTube account safely without putting secrets in workflow fields.",
    "Where to start: YouTube account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> YouTube, then sign in or paste the secret value requested there.",
    "Example: the token format shown by YouTube.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple YouTube step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.google.com/identity/protocols/oauth2",
  "resources": [
    {
      "name": "Operations",
      "description": "YouTube exposes operation choices directly.",
      "operations": [
        {
          "name": "List my channels",
          "value": "list_my_channels",
          "description": "List my channels using the YouTube node.",
          "fields": [
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Video title for upload_video or update_video_metadata",
              "helpText": "What this field is: Video title for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: New product demo.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "New product demo",
              "example": "New product demo"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Video description for upload_video or update_video_metadata",
              "helpText": "What this field is: Video description for upload_video or update_video_metadata.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Check out our latest feature....\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Check out our latest feature...",
              "example": "Check out our latest feature..."
            },
            {
              "name": "Tags",
              "internalKey": "tags",
              "type": "string",
              "required": false,
              "description": "Comma-separated tags for upload_video or update_video_metadata",
              "helpText": "What this field is: Comma-separated tags for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: automation, demo.\nTip: Use {{$json.tags}} when this value comes from an earlier step.",
              "placeholder": "automation, demo",
              "example": "automation, demo"
            },
            {
              "name": "Video Url",
              "internalKey": "videoUrl",
              "type": "url",
              "required": false,
              "description": "HTTP/HTTPS URL of the video file to upload",
              "helpText": "What this field is: The web address for HTTP/HTTPS URL of the video file to upload.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/video.mp4.\nTip: Use {{$json.videoUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/video.mp4",
              "example": "https://example.com/video.mp4"
            },
            {
              "name": "Video Data Base64",
              "internalKey": "videoDataBase64",
              "type": "string",
              "required": false,
              "description": "Base64-encoded video data for upload_video",
              "helpText": "What this field is: The Base64-encoded video data for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AAAAIGZ0eXBtcDQy....\nTip: Use {{$json.videoDataBase64}} when an earlier YouTube step provides this value.",
              "placeholder": "AAAAIGZ0eXBtcDQy...",
              "example": "AAAAIGZ0eXBtcDQy..."
            },
            {
              "name": "Mime Type",
              "internalKey": "mimeType",
              "type": "string",
              "required": false,
              "description": "Video MIME type for upload_video",
              "helpText": "What this field is: Video MIME type for upload_video.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: video/mp4.\nTip: Use {{$json.mimeType}} when this value comes from an earlier step.",
              "placeholder": "video/mp4",
              "example": "video/mp4",
              "defaultValue": "video/mp4"
            },
            {
              "name": "Privacy Status",
              "internalKey": "privacyStatus",
              "type": "string",
              "required": false,
              "description": "Privacy status for upload_video: private, unlisted, public",
              "helpText": "What this field is: Privacy status for upload_video: private, unlisted, public.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: private.\nTip: Use {{$json.privacyStatus}} when this value comes from an earlier step.",
              "placeholder": "private",
              "example": "private",
              "defaultValue": "private"
            },
            {
              "name": "Made For Kids",
              "internalKey": "madeForKids",
              "type": "boolean",
              "required": false,
              "description": "Whether uploaded video is made for kids",
              "helpText": "What this field is: An on/off switch for Whether uploaded video is made for kids.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use made for kids; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Category Id",
              "internalKey": "categoryId",
              "type": "string",
              "required": false,
              "description": "Optional YouTube category ID for upload_video",
              "helpText": "What this field is: The YouTube category ID for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 22.\nTip: Use {{$json.categoryId}} when an earlier YouTube step provides this value.",
              "placeholder": "22",
              "example": "22",
              "defaultValue": "22"
            },
            {
              "name": "Video Id",
              "internalKey": "videoId",
              "type": "string",
              "required": false,
              "description": "YouTube video ID for get_video_stats, update_video_metadata, or delete_video",
              "helpText": "What this field is: The YouTube video ID for get_video_stats, update_video_metadata, or delete_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: dQw4w9WgXcQ.\nTip: Use {{$json.videoId}} when an earlier YouTube step provides this value.",
              "placeholder": "dQw4w9WgXcQ",
              "example": "dQw4w9WgXcQ"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query for search_videos",
              "helpText": "What this field is: Structured data for Search query for search_videos.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by YouTube.\nExample: workflow automation.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "workflow automation",
              "example": "workflow automation"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of YouTube results to return",
              "helpText": "What this field is: The number used for Maximum number of YouTube results to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Channel Id",
              "internalKey": "channelId",
              "type": "string",
              "required": false,
              "description": "YouTube channel ID for get_channel or optional search filtering",
              "helpText": "What this field is: The channel or conversation where YouTube sends or reads data during List my channels.\nThe YouTube channel ID — starts with UC followed by 22 characters.\nWhere to find it: In YouTube Studio → Settings → Channel → Advanced, or in the channel URL.\nExample: UCxxxxxxxxxxxxxxxxxxxxxx",
              "placeholder": "UCxxxxxxxxxxxx",
              "example": "UCxxxxxxxxxxxx"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "videoId": "abc123",
            "channelId": "abc123",
            "title": "",
            "url": "https://example.com",
            "privacyStatus": "",
            "statistics": {},
            "items": [],
            "video": "abc123",
            "channel": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nvideoId: Unique identifier returned by the service.\nchannelId: Unique identifier returned by the service.\ntitle: Value returned by this operation.\nurl: Value returned by this operation.\nprivacyStatus: Current state of the requested action.\nstatistics: Value returned by this operation.\nitems: Value returned by this operation.\nvideo: Value returned by this operation.\nchannel: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming YouTube data with list my channels after a related upstream event is received",
            "inputValues": {
              "Title": "New product demo",
              "Description": "Check out our latest feature...",
              "Tags": "automation, demo",
              "Video Url": "https://example.com/video.mp4",
              "Video Data Base64": "AAAAIGZ0eXBtcDQy..."
            },
            "expectedOutput": "YouTube returns structured list my channels data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/youtube/v3/docs"
        },
        {
          "name": "Search videos",
          "value": "search_videos",
          "description": "Search videos using the YouTube node.",
          "fields": [
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Video title for upload_video or update_video_metadata",
              "helpText": "What this field is: Video title for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: New product demo.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "New product demo",
              "example": "New product demo"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Video description for upload_video or update_video_metadata",
              "helpText": "What this field is: Video description for upload_video or update_video_metadata.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Check out our latest feature....\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Check out our latest feature...",
              "example": "Check out our latest feature..."
            },
            {
              "name": "Tags",
              "internalKey": "tags",
              "type": "string",
              "required": false,
              "description": "Comma-separated tags for upload_video or update_video_metadata",
              "helpText": "What this field is: Comma-separated tags for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: automation, demo.\nTip: Use {{$json.tags}} when this value comes from an earlier step.",
              "placeholder": "automation, demo",
              "example": "automation, demo"
            },
            {
              "name": "Video Url",
              "internalKey": "videoUrl",
              "type": "url",
              "required": false,
              "description": "HTTP/HTTPS URL of the video file to upload",
              "helpText": "What this field is: The web address for HTTP/HTTPS URL of the video file to upload.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/video.mp4.\nTip: Use {{$json.videoUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/video.mp4",
              "example": "https://example.com/video.mp4"
            },
            {
              "name": "Video Data Base64",
              "internalKey": "videoDataBase64",
              "type": "string",
              "required": false,
              "description": "Base64-encoded video data for upload_video",
              "helpText": "What this field is: The Base64-encoded video data for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AAAAIGZ0eXBtcDQy....\nTip: Use {{$json.videoDataBase64}} when an earlier YouTube step provides this value.",
              "placeholder": "AAAAIGZ0eXBtcDQy...",
              "example": "AAAAIGZ0eXBtcDQy..."
            },
            {
              "name": "Mime Type",
              "internalKey": "mimeType",
              "type": "string",
              "required": false,
              "description": "Video MIME type for upload_video",
              "helpText": "What this field is: Video MIME type for upload_video.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: video/mp4.\nTip: Use {{$json.mimeType}} when this value comes from an earlier step.",
              "placeholder": "video/mp4",
              "example": "video/mp4",
              "defaultValue": "video/mp4"
            },
            {
              "name": "Privacy Status",
              "internalKey": "privacyStatus",
              "type": "string",
              "required": false,
              "description": "Privacy status for upload_video: private, unlisted, public",
              "helpText": "What this field is: Privacy status for upload_video: private, unlisted, public.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: private.\nTip: Use {{$json.privacyStatus}} when this value comes from an earlier step.",
              "placeholder": "private",
              "example": "private",
              "defaultValue": "private"
            },
            {
              "name": "Made For Kids",
              "internalKey": "madeForKids",
              "type": "boolean",
              "required": false,
              "description": "Whether uploaded video is made for kids",
              "helpText": "What this field is: An on/off switch for Whether uploaded video is made for kids.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use made for kids; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Category Id",
              "internalKey": "categoryId",
              "type": "string",
              "required": false,
              "description": "Optional YouTube category ID for upload_video",
              "helpText": "What this field is: The YouTube category ID for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 22.\nTip: Use {{$json.categoryId}} when an earlier YouTube step provides this value.",
              "placeholder": "22",
              "example": "22",
              "defaultValue": "22"
            },
            {
              "name": "Video Id",
              "internalKey": "videoId",
              "type": "string",
              "required": false,
              "description": "YouTube video ID for get_video_stats, update_video_metadata, or delete_video",
              "helpText": "What this field is: The YouTube video ID for get_video_stats, update_video_metadata, or delete_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: dQw4w9WgXcQ.\nTip: Use {{$json.videoId}} when an earlier YouTube step provides this value.",
              "placeholder": "dQw4w9WgXcQ",
              "example": "dQw4w9WgXcQ"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query for search_videos",
              "helpText": "What this field is: Structured data for Search query for search_videos.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by YouTube.\nExample: workflow automation.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "workflow automation",
              "example": "workflow automation"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of YouTube results to return",
              "helpText": "What this field is: The number used for Maximum number of YouTube results to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Channel Id",
              "internalKey": "channelId",
              "type": "string",
              "required": false,
              "description": "YouTube channel ID for get_channel or optional search filtering",
              "helpText": "What this field is: The channel or conversation where YouTube sends or reads data during Search videos.\nThe YouTube channel ID — starts with UC followed by 22 characters.\nWhere to find it: In YouTube Studio → Settings → Channel → Advanced, or in the channel URL.\nExample: UCxxxxxxxxxxxxxxxxxxxxxx",
              "placeholder": "UCxxxxxxxxxxxx",
              "example": "UCxxxxxxxxxxxx"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "videoId": "abc123",
            "channelId": "abc123",
            "title": "",
            "url": "https://example.com",
            "privacyStatus": "",
            "statistics": {},
            "items": [],
            "video": "abc123",
            "channel": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nvideoId: Unique identifier returned by the service.\nchannelId: Unique identifier returned by the service.\ntitle: Value returned by this operation.\nurl: Value returned by this operation.\nprivacyStatus: Current state of the requested action.\nstatistics: Value returned by this operation.\nitems: Value returned by this operation.\nvideo: Value returned by this operation.\nchannel: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming YouTube data with search videos after a related upstream event is received",
            "inputValues": {
              "Title": "New product demo",
              "Description": "Check out our latest feature...",
              "Tags": "automation, demo",
              "Video Url": "https://example.com/video.mp4",
              "Video Data Base64": "AAAAIGZ0eXBtcDQy..."
            },
            "expectedOutput": "YouTube returns structured search videos data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/youtube/v3/docs"
        },
        {
          "name": "Upload video",
          "value": "upload_video",
          "description": "Upload video using the YouTube node.",
          "fields": [
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Video title for upload_video or update_video_metadata",
              "helpText": "What this field is: Video title for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: New product demo.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "New product demo",
              "example": "New product demo"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Video description for upload_video or update_video_metadata",
              "helpText": "What this field is: Video description for upload_video or update_video_metadata.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Check out our latest feature....\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Check out our latest feature...",
              "example": "Check out our latest feature..."
            },
            {
              "name": "Tags",
              "internalKey": "tags",
              "type": "string",
              "required": false,
              "description": "Comma-separated tags for upload_video or update_video_metadata",
              "helpText": "What this field is: Comma-separated tags for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: automation, demo.\nTip: Use {{$json.tags}} when this value comes from an earlier step.",
              "placeholder": "automation, demo",
              "example": "automation, demo"
            },
            {
              "name": "Video Url",
              "internalKey": "videoUrl",
              "type": "url",
              "required": false,
              "description": "HTTP/HTTPS URL of the video file to upload",
              "helpText": "What this field is: The web address for HTTP/HTTPS URL of the video file to upload.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/video.mp4.\nTip: Use {{$json.videoUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/video.mp4",
              "example": "https://example.com/video.mp4"
            },
            {
              "name": "Video Data Base64",
              "internalKey": "videoDataBase64",
              "type": "string",
              "required": false,
              "description": "Base64-encoded video data for upload_video",
              "helpText": "What this field is: The Base64-encoded video data for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AAAAIGZ0eXBtcDQy....\nTip: Use {{$json.videoDataBase64}} when an earlier YouTube step provides this value.",
              "placeholder": "AAAAIGZ0eXBtcDQy...",
              "example": "AAAAIGZ0eXBtcDQy..."
            },
            {
              "name": "Mime Type",
              "internalKey": "mimeType",
              "type": "string",
              "required": false,
              "description": "Video MIME type for upload_video",
              "helpText": "What this field is: Video MIME type for upload_video.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: video/mp4.\nTip: Use {{$json.mimeType}} when this value comes from an earlier step.",
              "placeholder": "video/mp4",
              "example": "video/mp4",
              "defaultValue": "video/mp4"
            },
            {
              "name": "Privacy Status",
              "internalKey": "privacyStatus",
              "type": "string",
              "required": false,
              "description": "Privacy status for upload_video: private, unlisted, public",
              "helpText": "What this field is: Privacy status for upload_video: private, unlisted, public.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: private.\nTip: Use {{$json.privacyStatus}} when this value comes from an earlier step.",
              "placeholder": "private",
              "example": "private",
              "defaultValue": "private"
            },
            {
              "name": "Made For Kids",
              "internalKey": "madeForKids",
              "type": "boolean",
              "required": false,
              "description": "Whether uploaded video is made for kids",
              "helpText": "What this field is: An on/off switch for Whether uploaded video is made for kids.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use made for kids; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Category Id",
              "internalKey": "categoryId",
              "type": "string",
              "required": false,
              "description": "Optional YouTube category ID for upload_video",
              "helpText": "What this field is: The YouTube category ID for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 22.\nTip: Use {{$json.categoryId}} when an earlier YouTube step provides this value.",
              "placeholder": "22",
              "example": "22",
              "defaultValue": "22"
            },
            {
              "name": "Video Id",
              "internalKey": "videoId",
              "type": "string",
              "required": false,
              "description": "YouTube video ID for get_video_stats, update_video_metadata, or delete_video",
              "helpText": "What this field is: The YouTube video ID for get_video_stats, update_video_metadata, or delete_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: dQw4w9WgXcQ.\nTip: Use {{$json.videoId}} when an earlier YouTube step provides this value.",
              "placeholder": "dQw4w9WgXcQ",
              "example": "dQw4w9WgXcQ"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query for search_videos",
              "helpText": "What this field is: Structured data for Search query for search_videos.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by YouTube.\nExample: workflow automation.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "workflow automation",
              "example": "workflow automation"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of YouTube results to return",
              "helpText": "What this field is: The number used for Maximum number of YouTube results to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Channel Id",
              "internalKey": "channelId",
              "type": "string",
              "required": false,
              "description": "YouTube channel ID for get_channel or optional search filtering",
              "helpText": "What this field is: The channel or conversation where YouTube sends or reads data during Upload video.\nThe YouTube channel ID — starts with UC followed by 22 characters.\nWhere to find it: In YouTube Studio → Settings → Channel → Advanced, or in the channel URL.\nExample: UCxxxxxxxxxxxxxxxxxxxxxx",
              "placeholder": "UCxxxxxxxxxxxx",
              "example": "UCxxxxxxxxxxxx"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "videoId": "abc123",
            "channelId": "abc123",
            "title": "",
            "url": "https://example.com",
            "privacyStatus": "",
            "statistics": {},
            "items": [],
            "video": "abc123",
            "channel": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nvideoId: Unique identifier returned by the service.\nchannelId: Unique identifier returned by the service.\ntitle: Value returned by this operation.\nurl: Value returned by this operation.\nprivacyStatus: Current state of the requested action.\nstatistics: Value returned by this operation.\nitems: Value returned by this operation.\nvideo: Value returned by this operation.\nchannel: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming YouTube data with upload video after a related upstream event is received",
            "inputValues": {
              "Title": "New product demo",
              "Description": "Check out our latest feature...",
              "Tags": "automation, demo",
              "Video Url": "https://example.com/video.mp4",
              "Video Data Base64": "AAAAIGZ0eXBtcDQy..."
            },
            "expectedOutput": "YouTube returns structured upload video data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/youtube/v3/docs"
        },
        {
          "name": "Get video stats",
          "value": "get_video_stats",
          "description": "Get video stats using the YouTube node.",
          "fields": [
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Video title for upload_video or update_video_metadata",
              "helpText": "What this field is: Video title for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: New product demo.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "New product demo",
              "example": "New product demo"
            },
            {
              "name": "Description",
              "internalKey": "description",
              "type": "textarea",
              "required": false,
              "description": "Video description for upload_video or update_video_metadata",
              "helpText": "What this field is: Video description for upload_video or update_video_metadata.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Check out our latest feature....\nTip: Use {{$json.description}} when this value comes from an earlier step.",
              "placeholder": "Check out our latest feature...",
              "example": "Check out our latest feature..."
            },
            {
              "name": "Tags",
              "internalKey": "tags",
              "type": "string",
              "required": false,
              "description": "Comma-separated tags for upload_video or update_video_metadata",
              "helpText": "What this field is: Comma-separated tags for upload_video or update_video_metadata.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: automation, demo.\nTip: Use {{$json.tags}} when this value comes from an earlier step.",
              "placeholder": "automation, demo",
              "example": "automation, demo"
            },
            {
              "name": "Video Url",
              "internalKey": "videoUrl",
              "type": "url",
              "required": false,
              "description": "HTTP/HTTPS URL of the video file to upload",
              "helpText": "What this field is: The web address for HTTP/HTTPS URL of the video file to upload.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://example.com/video.mp4.\nTip: Use {{$json.videoUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://example.com/video.mp4",
              "example": "https://example.com/video.mp4"
            },
            {
              "name": "Video Data Base64",
              "internalKey": "videoDataBase64",
              "type": "string",
              "required": false,
              "description": "Base64-encoded video data for upload_video",
              "helpText": "What this field is: The Base64-encoded video data for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AAAAIGZ0eXBtcDQy....\nTip: Use {{$json.videoDataBase64}} when an earlier YouTube step provides this value.",
              "placeholder": "AAAAIGZ0eXBtcDQy...",
              "example": "AAAAIGZ0eXBtcDQy..."
            },
            {
              "name": "Mime Type",
              "internalKey": "mimeType",
              "type": "string",
              "required": false,
              "description": "Video MIME type for upload_video",
              "helpText": "What this field is: Video MIME type for upload_video.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: video/mp4.\nTip: Use {{$json.mimeType}} when this value comes from an earlier step.",
              "placeholder": "video/mp4",
              "example": "video/mp4",
              "defaultValue": "video/mp4"
            },
            {
              "name": "Privacy Status",
              "internalKey": "privacyStatus",
              "type": "string",
              "required": false,
              "description": "Privacy status for upload_video: private, unlisted, public",
              "helpText": "What this field is: Privacy status for upload_video: private, unlisted, public.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: private.\nTip: Use {{$json.privacyStatus}} when this value comes from an earlier step.",
              "placeholder": "private",
              "example": "private",
              "defaultValue": "private"
            },
            {
              "name": "Made For Kids",
              "internalKey": "madeForKids",
              "type": "boolean",
              "required": false,
              "description": "Whether uploaded video is made for kids",
              "helpText": "What this field is: An on/off switch for Whether uploaded video is made for kids.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use made for kids; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Category Id",
              "internalKey": "categoryId",
              "type": "string",
              "required": false,
              "description": "Optional YouTube category ID for upload_video",
              "helpText": "What this field is: The YouTube category ID for upload_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 22.\nTip: Use {{$json.categoryId}} when an earlier YouTube step provides this value.",
              "placeholder": "22",
              "example": "22",
              "defaultValue": "22"
            },
            {
              "name": "Video Id",
              "internalKey": "videoId",
              "type": "string",
              "required": false,
              "description": "YouTube video ID for get_video_stats, update_video_metadata, or delete_video",
              "helpText": "What this field is: The YouTube video ID for get_video_stats, update_video_metadata, or delete_video that tells YouTube which item to use.\nWhere to find it: Open the item in YouTube and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: dQw4w9WgXcQ.\nTip: Use {{$json.videoId}} when an earlier YouTube step provides this value.",
              "placeholder": "dQw4w9WgXcQ",
              "example": "dQw4w9WgXcQ"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "Search query for search_videos",
              "helpText": "What this field is: Structured data for Search query for search_videos.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by YouTube.\nExample: workflow automation.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "workflow automation",
              "example": "workflow automation"
            },
            {
              "name": "Max Results",
              "internalKey": "maxResults",
              "type": "number",
              "required": false,
              "description": "Maximum number of YouTube results to return",
              "helpText": "What this field is: The number used for Maximum number of YouTube results to return.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.maxResults}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "Channel Id",
              "internalKey": "channelId",
              "type": "string",
              "required": false,
              "description": "YouTube channel ID for get_channel or optional search filtering",
              "helpText": "What this field is: The channel or conversation where YouTube sends or reads data during Get video stats.\nThe YouTube channel ID — starts with UC followed by 22 characters.\nWhere to find it: In YouTube Studio → Settings → Channel → Advanced, or in the channel URL.\nExample: UCxxxxxxxxxxxxxxxxxxxxxx",
              "placeholder": "UCxxxxxxxxxxxx",
              "example": "UCxxxxxxxxxxxx"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "videoId": "abc123",
            "channelId": "abc123",
            "title": "",
            "url": "https://example.com",
            "privacyStatus": "",
            "statistics": {},
            "items": [],
            "video": "abc123",
            "channel": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nvideoId: Unique identifier returned by the service.\nchannelId: Unique identifier returned by the service.\ntitle: Value returned by this operation.\nurl: Value returned by this operation.\nprivacyStatus: Current state of the requested action.\nstatistics: Value returned by this operation.\nitems: Value returned by this operation.\nvideo: Value returned by this operation.\nchannel: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming YouTube data with get video stats after a related upstream event is received",
            "inputValues": {
              "Title": "New product demo",
              "Description": "Check out our latest feature...",
              "Tags": "automation, demo",
              "Video Url": "https://example.com/video.mp4",
              "Video Data Base64": "AAAAIGZ0eXBtcDQy..."
            },
            "expectedOutput": "YouTube returns structured get video stats data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.google.com/youtube/v3/docs"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the YouTube node."
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
