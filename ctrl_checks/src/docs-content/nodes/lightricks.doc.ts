import type { NodeDoc } from '../types';

export const lightricksDoc: NodeDoc = {
  "slug": "lightricks",
  "displayName": "Lightricks LTX-2",
  "category": "AI",
  "logoUrl": "/icons/nodes/lightricks.svg",
  "description": "Generate videos using Lightricks LTX-2 open-source AI model (text-to-video, image-to-video, and more).",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Configuration",
      "description": "Lightricks LTX-2 is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the Lightricks LTX-2 node.",
          "fields": [
            {
              "name": "Prompt",
              "internalKey": "prompt",
              "type": "textarea",
              "required": true,
              "description": "Text prompt for video generation",
              "helpText": "What this field is: Text prompt for video generation.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: Summarize {{$json.text}}.\nTip: Use {{$json.prompt}} when this value comes from an earlier step.",
              "placeholder": "Summarize {{$json.text}}"
            },
            {
              "name": "Mode",
              "internalKey": "mode",
              "type": "select",
              "required": false,
              "description": "Generation mode",
              "helpText": "Options: Choose the mode value this Lightricks LTX-2 step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: Text to Video.\nTip: Use {{$json.mode}} only when an earlier step already provides a valid option value.",
              "placeholder": "text-to-video",
              "example": "text-to-video",
              "defaultValue": "text-to-video",
              "options": [
                "Text to Video",
                "Image to Video",
                "Audio to Video",
                "Video to Video",
                "Image+Text to Video",
                "Text to Audio",
                "Audio to Audio"
              ]
            },
            {
              "name": "Image Url",
              "internalKey": "image_url",
              "type": "url",
              "required": false,
              "description": "Input image URL (for image-to-video mode)",
              "helpText": "What this field is: The web address for Input image URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.image_url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Audio Url",
              "internalKey": "audio_url",
              "type": "url",
              "required": false,
              "description": "Input audio URL (for audio modes)",
              "helpText": "What this field is: The web address for Input audio URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.audio_url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Video Url",
              "internalKey": "video_url",
              "type": "url",
              "required": false,
              "description": "Input video URL (for video-to-video mode)",
              "helpText": "What this field is: The web address for Input video URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.video_url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Duration",
              "internalKey": "duration",
              "type": "number",
              "required": false,
              "description": "Video duration in seconds",
              "helpText": "What this field is: The number used for Video duration in seconds.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.duration}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5",
              "defaultValue": "5"
            },
            {
              "name": "Fps",
              "internalKey": "fps",
              "type": "number",
              "required": false,
              "description": "Frames per second",
              "helpText": "What this field is: The number used for Frames per second.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 25.\nTip: Use {{$json.fps}} when the number comes from an earlier step.",
              "placeholder": "25",
              "example": "25",
              "defaultValue": "25"
            },
            {
              "name": "Resolution",
              "internalKey": "resolution",
              "type": "select",
              "required": false,
              "description": "Video resolution",
              "helpText": "Options: Choose the resolution value this Lightricks LTX-2 step should use.\nHow to choose it: Pick the option that matches what you want this step to do.\nExample: 720p.\nTip: Use {{$json.resolution}} only when an earlier step already provides a valid option value.",
              "placeholder": "1080p",
              "example": "1080p",
              "defaultValue": "1080p",
              "options": [
                "720p",
                "1080p",
                "4K"
              ]
            },
            {
              "name": "Options",
              "internalKey": "options",
              "type": "json",
              "required": false,
              "description": "Additional generation options",
              "helpText": "What this field is: Structured data for Additional generation options.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Lightricks LTX-2.\nExample: {}.\nTip: Use {{$json.options}} when an earlier step already prepared this data.",
              "placeholder": "{}",
              "example": "{}",
              "defaultValue": "{}"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "default",
            "data": {
              "id": "item_123",
              "status": "completed"
            }
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\ndata: Returned records from the service.",
          "usageExample": {
            "scenario": "Process incoming Lightricks LTX-2 data with execute after a related upstream event is received",
            "inputValues": {
              "Prompt": "",
              "Mode": "text-to-video",
              "Image Url": "https://api.example.com",
              "Audio Url": "https://api.example.com",
              "Video Url": "https://api.example.com"
            },
            "expectedOutput": "Lightricks LTX-2 returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
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
