import type { NodeDoc } from '../types';

export const htmlDoc: NodeDoc = {
  "slug": "html",
  "displayName": "HTML",
  "category": "Data",
  "logoUrl": "/icons/nodes/html.svg",
  "description": "Parse and manipulate HTML content",
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
      "description": "HTML exposes operation choices directly.",
      "operations": [
        {
          "name": "Parse",
          "value": "parse",
          "description": "Parse an HTML document and extract elements or text.",
          "fields": [
            {
              "name": "Html",
              "internalKey": "html",
              "type": "textarea",
              "required": true,
              "description": "HTML content",
              "helpText": "What this field is: HTML content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.html}}.\nTip: Use {{$json.html}} when this value comes from an earlier step.",
              "placeholder": "{{$json.html}}",
              "example": "{{$json.html}}"
            }
          ],
          "outputExample": {
            "title": "Example Domain",
            "headings": [
              "Example Domain"
            ],
            "links": [
              "https://www.iana.org/domains/example"
            ],
            "text": "This domain is for use in illustrative examples."
          },
          "outputDescription": "title: Page title. headings: Array of heading texts. links: Array of href values. text: Main body text.",
          "usageExample": {
            "scenario": "Scrape a product page to extract the title and price",
            "inputValues": {
              "html": "{{$json.pageContent}}",
              "selector": ".price"
            },
            "expectedOutput": "Extracted price in `{{$json.text}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Extract",
          "value": "extract",
          "description": "Extract using the HTML node.",
          "fields": [
            {
              "name": "Html",
              "internalKey": "html",
              "type": "textarea",
              "required": true,
              "description": "HTML content",
              "helpText": "What this field is: HTML content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.html}}.\nTip: Use {{$json.html}} when this value comes from an earlier step.",
              "placeholder": "{{$json.html}}",
              "example": "{{$json.html}}"
            }
          ],
          "outputExample": {
            "text": "Alice Smith",
            "length": 11
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming HTML data with extract after a related upstream event is received",
            "inputValues": {
              "Html": "{{$json.html}}"
            },
            "expectedOutput": "HTML returns structured extract data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Clean",
          "value": "clean",
          "description": "Clean using the HTML node.",
          "fields": [
            {
              "name": "Html",
              "internalKey": "html",
              "type": "textarea",
              "required": true,
              "description": "HTML content",
              "helpText": "What this field is: HTML content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.html}}.\nTip: Use {{$json.html}} when this value comes from an earlier step.",
              "placeholder": "{{$json.html}}",
              "example": "{{$json.html}}"
            }
          ],
          "outputExample": {
            "text": "Clean page text without scripts, styles, or markup.",
            "length": 51
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming HTML data with clean after a related upstream event is received",
            "inputValues": {
              "Html": "{{$json.html}}"
            },
            "expectedOutput": "HTML returns structured clean data that downstream nodes can reference with {{$json.fieldName}}."
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
