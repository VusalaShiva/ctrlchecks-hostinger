import type { NodeDoc } from '../types';

export const httpPostDoc: NodeDoc = {
  "slug": "http_post",
  "displayName": "HTTP POST",
  "category": "Utility",
  "logoUrl": "/icons/nodes/http_post.svg",
  "description": "Send POST requests with JSON data",
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
      "description": "HTTP POST is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Make an HTTP POST request to send data to an external endpoint.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "URL to POST to",
              "helpText": "What this field is: The web address for URL to POST to.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "POST body data",
              "helpText": "What this field is: Structured data for POST body data.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP POST.\nExample: {{$json.data}}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers",
              "helpText": "What this field is: Structured data for HTTP headers.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP POST.\nExample: {\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Content-Type\":\"application/json\"}",
              "example": "{\"Content-Type\":\"application/json\"}"
            }
          ],
          "outputExample": {
            "status": 201,
            "body": {
              "id": "new_item_123",
              "created": true
            },
            "headers": {
              "location": "/api/items/new_item_123"
            }
          },
          "outputDescription": "status: HTTP response code. body: Response body. headers: Response headers including Location for created resources.",
          "usageExample": {
            "scenario": "Submit form data to an external API",
            "inputValues": {
              "url": "https://api.example.com/submissions",
              "body": "{\"name\": \"{{$json.name}}\", \"email\": \"{{$json.email}}\"}",
              "headers": "{\"Content-Type\": \"application/json\", \"Authorization\": \"Bearer {{$env.TOKEN}}\"}"
            },
            "expectedOutput": "Created resource in `{{$json.body}}`. Use `{{$json.body.id}}` to reference it."
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
