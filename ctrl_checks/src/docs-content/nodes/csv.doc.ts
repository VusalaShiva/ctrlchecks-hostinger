import type { NodeDoc } from '../types';

export const csvDoc: NodeDoc = {
  "slug": "csv",
  "displayName": "CSV",
  "category": "Data",
  "logoUrl": "/icons/nodes/csv.svg",
  "description": "Parse and generate CSV data",
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
      "description": "CSV exposes operation choices directly.",
      "operations": [
        {
          "name": "Parse",
          "value": "parse",
          "description": "Parse a CSV string into an array of objects.",
          "fields": [
            {
              "name": "Csv",
              "internalKey": "csv",
              "type": "string",
              "required": false,
              "description": "CSV content (for parse)",
              "helpText": "What this field is: CSV content.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.csv}}.\nTip: This field is used for parse. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.csv}}",
              "example": "{{$json.csv}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Data array (for generate)",
              "helpText": "What this field is: Structured data for Data array.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by CSV.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "Name": "Alice",
                "Email": "alice@example.com",
                "Plan": "Pro"
              },
              {
                "Name": "Bob",
                "Email": "bob@example.com",
                "Plan": "Free"
              }
            ],
            "headers": [
              "Name",
              "Email",
              "Plan"
            ],
            "rowCount": 2
          },
          "outputDescription": "rows: Array of objects where keys are column headers. headers: Column names. rowCount: Number of data rows.",
          "usageExample": {
            "scenario": "Parse a CSV file downloaded from Google Drive into structured data",
            "inputValues": {
              "csv": "{{$json.content}}",
              "hasHeaders": "true"
            },
            "expectedOutput": "Each row becomes an object. Loop over `{{$json.rows}}` to process each."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Generate",
          "value": "generate",
          "description": "Convert an array of objects into a CSV string.",
          "fields": [
            {
              "name": "Csv",
              "internalKey": "csv",
              "type": "string",
              "required": false,
              "description": "CSV content (for parse)",
              "helpText": "What this field is: CSV content.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.csv}}.\nTip: This field is used for parse. Leave it blank when this operation does not need it.",
              "placeholder": "{{$json.csv}}",
              "example": "{{$json.csv}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "json",
              "required": true,
              "description": "Data array (for generate)",
              "helpText": "What this field is: Structured data for Data array.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by CSV.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
            }
          ],
          "outputExample": {
            "csv": "Name,Email,Status\nAlice,alice@example.com,Active\nBob,bob@example.com,Inactive\n",
            "rowCount": 2
          },
          "outputDescription": "csv: The generated CSV string. rowCount: Number of data rows in the output.",
          "usageExample": {
            "scenario": "Export a list of users as a CSV to upload to Google Drive",
            "inputValues": {
              "data": "{{$json.users}}",
              "headers": "[\"Name\", \"Email\", \"Status\"]"
            },
            "expectedOutput": "CSV string in `{{$json.csv}}`. Pass to a Google Drive upload node."
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
