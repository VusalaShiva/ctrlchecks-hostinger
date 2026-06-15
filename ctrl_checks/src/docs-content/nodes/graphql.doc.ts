import type { NodeDoc } from '../types';

export const graphqlDoc: NodeDoc = {
  "slug": "graphql",
  "displayName": "GraphQL",
  "category": "Utility",
  "logoUrl": "/icons/nodes/graphql.svg",
  "description": "Make GraphQL requests",
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
      "description": "GraphQL is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Execute using the GraphQL node.",
          "fields": [
            {
              "name": "Url",
              "internalKey": "url",
              "type": "url",
              "required": true,
              "description": "GraphQL endpoint URL",
              "helpText": "What this field is: The web address for GraphQL endpoint URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com/graphql.\nTip: Use {{$json.url}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com/graphql",
              "example": "https://api.example.com/graphql"
            },
            {
              "name": "Query",
              "internalKey": "query",
              "type": "textarea",
              "required": true,
              "description": "GraphQL query",
              "helpText": "What this field is: Structured data for GraphQL query.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GraphQL.\nExample: { user(id: 1) { name email } }.\nTip: Use {{$json.query}} when an earlier step already prepared this data.",
              "placeholder": "{ user(id: 1) { name email } }",
              "example": "{ user(id: 1) { name email } }"
            },
            {
              "name": "Variables",
              "internalKey": "variables",
              "type": "json",
              "required": false,
              "description": "GraphQL variables",
              "helpText": "What this field is: Structured data for GraphQL variables.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by GraphQL.\nExample: {\"id\":1}.\nTip: Use {{$json.variables}} when an earlier step already prepared this data.",
              "placeholder": "{\"id\":1}",
              "example": "{\"id\":1}"
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
            "scenario": "Process incoming GraphQL data with execute after a related upstream event is received",
            "inputValues": {
              "Url": "https://api.example.com/graphql",
              "Query": "{ user(id: 1) { name email } }",
              "Variables": "{\"id\":1}"
            },
            "expectedOutput": "GraphQL returns structured execute data that downstream nodes can reference with {{$json.fieldName}}."
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
