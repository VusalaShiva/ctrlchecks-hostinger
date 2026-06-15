import type { NodeDoc } from '../types';

export const httpRequestDoc: NodeDoc = {
  "slug": "http_request",
  "displayName": "HTTP Request",
  "category": "Utility",
  "logoUrl": "/icons/nodes/http_request.svg",
  "description": "Makes HTTP requests to external APIs or services",
  "credentialType": "None",
  "credentialSetupSteps": [
    "This node does not need a saved account connection.",
    "Open the node settings and fill the visible input fields.",
    "Run the workflow when the required fields are complete."
  ],
  "credentialDocsUrl": "https://docs.ctrlchecks.com",
  "resources": [
    {
      "name": "Operations",
      "description": "HTTP Request exposes operation choices directly.",
      "operations": [
        {
          "name": "GET",
          "value": "GET",
          "description": "Make an HTTP request (GET, POST, PUT, PATCH, DELETE) to any URL.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "Full URL to request",
              "helpText": "What this field is: The web address for Full URL to request.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "HTTP method",
              "helpText": "What this field is: HTTP method.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "GET"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers to send",
              "helpText": "What this field is: Structured data for HTTP headers to send.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}",
              "example": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}"
            },
            {
              "name": "Qs",
              "internalKey": "qs",
              "type": "json",
              "required": false,
              "description": "Query string parameters",
              "helpText": "What this field is: Structured data for Query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.qs}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Request timeout in milliseconds",
              "helpText": "What this field is: The date or time value for Request timeout in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 10000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "10000",
              "example": "10000",
              "defaultValue": "10000"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry on failure",
              "helpText": "What this field is: An on/off switch for Retry on failure.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            }
          ],
          "outputExample": {
            "status": 200,
            "body": {
              "id": 101,
              "title": "Hello World",
              "completed": false
            },
            "headers": {
              "content-type": "application/json; charset=utf-8"
            }
          },
          "outputDescription": "status: HTTP response code. body: Parsed response body (object if JSON, string otherwise). headers: Response headers.",
          "usageExample": {
            "scenario": "Fetch user details from a REST API to enrich webhook data",
            "inputValues": {
              "url": "https://api.example.com/users/{{$json.userId}}",
              "method": "GET",
              "headers": "{\"Authorization\": \"Bearer {{$env.API_TOKEN}}\", \"Accept\": \"application/json\"}"
            },
            "expectedOutput": "API response in `{{$json.body}}`. Access fields via `{{$json.body.email}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "POST",
          "value": "POST",
          "description": "Make an HTTP request (GET, POST, PUT, PATCH, DELETE) to any URL.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "Full URL to request",
              "helpText": "What this field is: The web address for Full URL to request.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "HTTP method",
              "helpText": "What this field is: HTTP method.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "GET"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers to send",
              "helpText": "What this field is: Structured data for HTTP headers to send.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}",
              "example": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Request body for POST/PUT/PATCH",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Qs",
              "internalKey": "qs",
              "type": "json",
              "required": false,
              "description": "Query string parameters",
              "helpText": "What this field is: Structured data for Query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.qs}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Request timeout in milliseconds",
              "helpText": "What this field is: The date or time value for Request timeout in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 10000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "10000",
              "example": "10000",
              "defaultValue": "10000"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry on failure",
              "helpText": "What this field is: An on/off switch for Retry on failure.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            }
          ],
          "outputExample": {
            "status": 200,
            "body": {
              "id": 101,
              "title": "Hello World",
              "completed": false
            },
            "headers": {
              "content-type": "application/json; charset=utf-8"
            }
          },
          "outputDescription": "status: HTTP response code. body: Parsed response body (object if JSON, string otherwise). headers: Response headers.",
          "usageExample": {
            "scenario": "Fetch user details from a REST API to enrich webhook data",
            "inputValues": {
              "url": "https://api.example.com/users/{{$json.userId}}",
              "method": "GET",
              "headers": "{\"Authorization\": \"Bearer {{$env.API_TOKEN}}\", \"Accept\": \"application/json\"}"
            },
            "expectedOutput": "API response in `{{$json.body}}`. Access fields via `{{$json.body.email}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "PUT",
          "value": "PUT",
          "description": "Make an HTTP request (GET, POST, PUT, PATCH, DELETE) to any URL.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "Full URL to request",
              "helpText": "What this field is: The web address for Full URL to request.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "HTTP method",
              "helpText": "What this field is: HTTP method.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "GET"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers to send",
              "helpText": "What this field is: Structured data for HTTP headers to send.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}",
              "example": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Request body for POST/PUT/PATCH",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Qs",
              "internalKey": "qs",
              "type": "json",
              "required": false,
              "description": "Query string parameters",
              "helpText": "What this field is: Structured data for Query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.qs}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Request timeout in milliseconds",
              "helpText": "What this field is: The date or time value for Request timeout in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 10000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "10000",
              "example": "10000",
              "defaultValue": "10000"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry on failure",
              "helpText": "What this field is: An on/off switch for Retry on failure.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            }
          ],
          "outputExample": {
            "status": 200,
            "body": {
              "id": 101,
              "title": "Hello World",
              "completed": false
            },
            "headers": {
              "content-type": "application/json; charset=utf-8"
            }
          },
          "outputDescription": "status: HTTP response code. body: Parsed response body (object if JSON, string otherwise). headers: Response headers.",
          "usageExample": {
            "scenario": "Fetch user details from a REST API to enrich webhook data",
            "inputValues": {
              "url": "https://api.example.com/users/{{$json.userId}}",
              "method": "GET",
              "headers": "{\"Authorization\": \"Bearer {{$env.API_TOKEN}}\", \"Accept\": \"application/json\"}"
            },
            "expectedOutput": "API response in `{{$json.body}}`. Access fields via `{{$json.body.email}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "PATCH",
          "value": "PATCH",
          "description": "Make an HTTP request (GET, POST, PUT, PATCH, DELETE) to any URL.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "Full URL to request",
              "helpText": "What this field is: The web address for Full URL to request.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "HTTP method",
              "helpText": "What this field is: HTTP method.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "GET"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers to send",
              "helpText": "What this field is: Structured data for HTTP headers to send.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}",
              "example": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}"
            },
            {
              "name": "Body",
              "internalKey": "body",
              "type": "textarea",
              "required": true,
              "description": "Request body for POST/PUT/PATCH",
              "helpText": "What this field is: Structured data for Request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.body}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Qs",
              "internalKey": "qs",
              "type": "json",
              "required": false,
              "description": "Query string parameters",
              "helpText": "What this field is: Structured data for Query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.qs}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Request timeout in milliseconds",
              "helpText": "What this field is: The date or time value for Request timeout in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 10000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "10000",
              "example": "10000",
              "defaultValue": "10000"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry on failure",
              "helpText": "What this field is: An on/off switch for Retry on failure.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            }
          ],
          "outputExample": {
            "status": 200,
            "body": {
              "id": 101,
              "title": "Hello World",
              "completed": false
            },
            "headers": {
              "content-type": "application/json; charset=utf-8"
            }
          },
          "outputDescription": "status: HTTP response code. body: Parsed response body (object if JSON, string otherwise). headers: Response headers.",
          "usageExample": {
            "scenario": "Fetch user details from a REST API to enrich webhook data",
            "inputValues": {
              "url": "https://api.example.com/users/{{$json.userId}}",
              "method": "GET",
              "headers": "{\"Authorization\": \"Bearer {{$env.API_TOKEN}}\", \"Accept\": \"application/json\"}"
            },
            "expectedOutput": "API response in `{{$json.body}}`. Access fields via `{{$json.body.email}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "DELETE",
          "value": "DELETE",
          "description": "Make an HTTP request (GET, POST, PUT, PATCH, DELETE) to any URL.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "Full URL to request",
              "helpText": "What this field is: The web address for Full URL to request.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/data.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/data",
              "example": "https://api.example.com/data"
            },
            {
              "name": "Method",
              "internalKey": "method",
              "type": "string",
              "required": false,
              "description": "HTTP method",
              "helpText": "What this field is: HTTP method.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: GET.\nTip: Use {{$json.method}} when this value comes from an earlier step.",
              "placeholder": "GET",
              "example": "GET",
              "defaultValue": "GET"
            },
            {
              "name": "Headers",
              "internalKey": "headers",
              "type": "json",
              "required": false,
              "description": "HTTP headers to send",
              "helpText": "What this field is: Structured data for HTTP headers to send.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}.\nTip: Use {{$json.headers}} when an earlier step already prepared this data.",
              "placeholder": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}",
              "example": "{\"Authorization\":\"Bearer {{$credentials.apiKey}}\",\"Content-Type\":\"application/json\"}"
            },
            {
              "name": "Qs",
              "internalKey": "qs",
              "type": "json",
              "required": false,
              "description": "Query string parameters",
              "helpText": "What this field is: Structured data for Query string parameters.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by HTTP Request.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.qs}} when an earlier step already prepared this data.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
            },
            {
              "name": "Timeout",
              "internalKey": "timeout",
              "type": "number",
              "required": false,
              "description": "Request timeout in milliseconds",
              "helpText": "What this field is: The date or time value for Request timeout in milliseconds.\nHow to fill it: Use a clear date such as 2026-06-01, or a full date and time with timezone when the service needs exact timing.\nExample: 10000.\nTip: Use {{$json.timeout}} when an earlier calendar, form, or database step provides the date.",
              "placeholder": "10000",
              "example": "10000",
              "defaultValue": "10000"
            },
            {
              "name": "Retry On Fail",
              "internalKey": "retryOnFail",
              "type": "boolean",
              "required": false,
              "description": "Retry on failure",
              "helpText": "What this field is: An on/off switch for Retry on failure.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use retry on fail; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Max Retries",
              "internalKey": "maxRetries",
              "type": "number",
              "required": false,
              "description": "Maximum retry attempts",
              "helpText": "What this field is: The number used for Maximum retry attempts.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 3.\nTip: Use {{$json.maxRetries}} when the number comes from an earlier step.",
              "placeholder": "3",
              "example": "3",
              "defaultValue": "3"
            }
          ],
          "outputExample": {
            "status": 200,
            "body": {
              "id": 101,
              "title": "Hello World",
              "completed": false
            },
            "headers": {
              "content-type": "application/json; charset=utf-8"
            }
          },
          "outputDescription": "status: HTTP response code. body: Parsed response body (object if JSON, string otherwise). headers: Response headers.",
          "usageExample": {
            "scenario": "Fetch user details from a REST API to enrich webhook data",
            "inputValues": {
              "url": "https://api.example.com/users/{{$json.userId}}",
              "method": "GET",
              "headers": "{\"Authorization\": \"Bearer {{$env.API_TOKEN}}\", \"Accept\": \"application/json\"}"
            },
            "expectedOutput": "API response in `{{$json.body}}`. Access fields via `{{$json.body.email}}`."
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
