import type { NodeDoc } from '../types';

export const mathDoc: NodeDoc = {
  "slug": "math",
  "displayName": "Math",
  "category": "Data",
  "logoUrl": "/icons/nodes/math.svg",
  "description": "Mathematical operations and calculations",
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
      "description": "Math exposes operation choices directly.",
      "operations": [
        {
          "name": "Add",
          "value": "add",
          "description": "Perform mathematical calculations on numbers.",
          "fields": [
            {
              "name": "A",
              "internalKey": "a",
              "type": "number",
              "required": false,
              "description": "First number",
              "helpText": "What this field is: The number used for First number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.a}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "B",
              "internalKey": "b",
              "type": "number",
              "required": false,
              "description": "Second number",
              "helpText": "What this field is: The number used for Second number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.b}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5"
            }
          ],
          "outputExample": {
            "result": 127.5,
            "expression": "(100 + 50) * 0.85",
            "inputs": {
              "a": 150,
              "b": 0.85
            }
          },
          "outputDescription": "result: The computed result. expression: The math expression that was evaluated.",
          "usageExample": {
            "scenario": "Calculate the discounted price of a product",
            "inputValues": {
              "expression": "{{$json.price}} * (1 - {{$json.discountRate}})"
            },
            "expectedOutput": "Discounted price in `{{$json.result}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Subtract",
          "value": "subtract",
          "description": "Perform mathematical calculations on numbers.",
          "fields": [
            {
              "name": "A",
              "internalKey": "a",
              "type": "number",
              "required": false,
              "description": "First number",
              "helpText": "What this field is: The number used for First number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.a}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "B",
              "internalKey": "b",
              "type": "number",
              "required": false,
              "description": "Second number",
              "helpText": "What this field is: The number used for Second number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.b}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5"
            }
          ],
          "outputExample": {
            "result": 127.5,
            "expression": "(100 + 50) * 0.85",
            "inputs": {
              "a": 150,
              "b": 0.85
            }
          },
          "outputDescription": "result: The computed result. expression: The math expression that was evaluated.",
          "usageExample": {
            "scenario": "Calculate the discounted price of a product",
            "inputValues": {
              "expression": "{{$json.price}} * (1 - {{$json.discountRate}})"
            },
            "expectedOutput": "Discounted price in `{{$json.result}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Multiply",
          "value": "multiply",
          "description": "Perform mathematical calculations on numbers.",
          "fields": [
            {
              "name": "A",
              "internalKey": "a",
              "type": "number",
              "required": false,
              "description": "First number",
              "helpText": "What this field is: The number used for First number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.a}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "B",
              "internalKey": "b",
              "type": "number",
              "required": false,
              "description": "Second number",
              "helpText": "What this field is: The number used for Second number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.b}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5"
            }
          ],
          "outputExample": {
            "result": 127.5,
            "expression": "(100 + 50) * 0.85",
            "inputs": {
              "a": 150,
              "b": 0.85
            }
          },
          "outputDescription": "result: The computed result. expression: The math expression that was evaluated.",
          "usageExample": {
            "scenario": "Calculate the discounted price of a product",
            "inputValues": {
              "expression": "{{$json.price}} * (1 - {{$json.discountRate}})"
            },
            "expectedOutput": "Discounted price in `{{$json.result}}`."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Divide",
          "value": "divide",
          "description": "Perform mathematical calculations on numbers.",
          "fields": [
            {
              "name": "A",
              "internalKey": "a",
              "type": "number",
              "required": false,
              "description": "First number",
              "helpText": "What this field is: The number used for First number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 10.\nTip: Use {{$json.a}} when the number comes from an earlier step.",
              "placeholder": "10",
              "example": "10"
            },
            {
              "name": "B",
              "internalKey": "b",
              "type": "number",
              "required": false,
              "description": "Second number",
              "helpText": "What this field is: The number used for Second number.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 5.\nTip: Use {{$json.b}} when the number comes from an earlier step.",
              "placeholder": "5",
              "example": "5"
            }
          ],
          "outputExample": {
            "result": 127.5,
            "expression": "(100 + 50) * 0.85",
            "inputs": {
              "a": 150,
              "b": 0.85
            }
          },
          "outputDescription": "result: The computed result. expression: The math expression that was evaluated.",
          "usageExample": {
            "scenario": "Calculate the discounted price of a product",
            "inputValues": {
              "expression": "{{$json.price}} * (1 - {{$json.discountRate}})"
            },
            "expectedOutput": "Discounted price in `{{$json.result}}`."
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
