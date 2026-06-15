import type { NodeDoc } from '../types';

export const xmlDoc: NodeDoc = {
  "slug": "xml",
  "displayName": "XML",
  "category": "Data",
  "logoUrl": "/icons/nodes/xml.svg",
  "description": "Parse and manipulate XML content",
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
      "description": "XML exposes operation choices directly.",
      "operations": [
        {
          "name": "Parse",
          "value": "parse",
          "description": "Parse an XML string into a JavaScript object.",
          "fields": [
            {
              "name": "Xml",
              "internalKey": "xml",
              "type": "textarea",
              "required": true,
              "description": "XML content",
              "helpText": "What this field is: XML content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.xml}}.\nTip: Use {{$json.xml}} when this value comes from an earlier step.",
              "placeholder": "{{$json.xml}}",
              "example": "{{$json.xml}}"
            }
          ],
          "outputExample": {
            "root": {
              "order": {
                "id": "123",
                "customer": "Alice",
                "items": [
                  {
                    "sku": "PROD001",
                    "qty": "2"
                  }
                ]
              }
            }
          },
          "outputDescription": "Parsed JavaScript object. Attributes and text nodes are available as nested properties.",
          "usageExample": {
            "scenario": "Parse an XML response from a legacy SOAP API",
            "inputValues": {
              "xml": "{{$json.responseBody}}"
            },
            "expectedOutput": "Access parsed fields via `{{$json.root.order.id}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Extract",
          "value": "extract",
          "description": "Extract using the XML node.",
          "fields": [
            {
              "name": "Xml",
              "internalKey": "xml",
              "type": "textarea",
              "required": true,
              "description": "XML content",
              "helpText": "What this field is: XML content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.xml}}.\nTip: Use {{$json.xml}} when this value comes from an earlier step.",
              "placeholder": "{{$json.xml}}",
              "example": "{{$json.xml}}"
            }
          ],
          "outputExample": {
            "text": "Extracted value from the selected XML path.",
            "length": 43
          },
          "outputDescription": "text: Value returned by this operation.\nlength: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming XML data with extract after a related upstream event is received",
            "inputValues": {
              "Xml": "{{$json.xml}}"
            },
            "expectedOutput": "XML returns structured extract data that downstream nodes can reference with {{$json.fieldName}}."
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
