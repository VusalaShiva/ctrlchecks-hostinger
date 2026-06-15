import type { NodeDoc } from '../types';

export const switchDoc: NodeDoc = {
  "slug": "switch",
  "displayName": "Switch",
  "category": "Logic",
  "logoUrl": "/icons/nodes/switch.svg",
  "description": "Multi-path conditional logic based on value matching",
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
      "description": "Switch is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Branch the workflow into multiple paths based on a value match.",
          "fields": [
            {
              "name": "Expression",
              "internalKey": "expression",
              "type": "string",
              "required": true,
              "description": "Expression or template evaluated to a scalar (e.g. {{$json.status}}). Must match one of cases[].value.",
              "helpText": "What this field is: Expression or template evaluated to a scalar . Must match one of cases[].value..\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: {{$json.status}}.\nTip: Use {{$json.expression}} when this value comes from an earlier step.",
              "placeholder": "{{$json.status}}",
              "example": "{{$json.status}}"
            },
            {
              "name": "Cases",
              "internalKey": "cases",
              "type": "json",
              "required": true,
              "description": "Case definitions; each value becomes an outgoing port name. Example: [{ value: \"active\", label: \"Active\" }]",
              "helpText": "What this field is: Structured data for Case definitions; each value becomes an outgoing port name. Example: [{ value: \"active\", label: \"Active\" }].\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Switch.\nExample: [{\"value\":\"active\",\"label\":\"Active\"},{\"value\":\"pending\",\"label\":\"Pending\"}].\nTip: Use {{$json.cases}} when an earlier step already prepared this data.",
              "placeholder": "[{\"value\":\"active\",\"label\":\"Active\"},{\"value\":\"pending\",\"label\":\"Pending\"}]",
              "example": "[{\"value\":\"active\",\"label\":\"Active\"},{\"value\":\"pending\",\"label\":\"Pending\"}]"
            },
            {
              "name": "Routing Type",
              "internalKey": "routingType",
              "type": "string",
              "required": false,
              "description": "Optional hint: how expression is interpreted (e.g. expression, string, number)",
              "helpText": "What this field is: hint: how expression is interpreted.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: expression.\nTip: Use {{$json.routingType}} when this value comes from an earlier step.",
              "placeholder": "expression",
              "example": "expression"
            },
            {
              "name": "Rules",
              "internalKey": "rules",
              "type": "json",
              "required": false,
              "description": "Deprecated alias for cases; migrated automatically to cases",
              "helpText": "What this field is: Structured data for Deprecated alias for cases; migrated automatically to cases.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Switch.\nExample: [\"item\"].\nTip: Use {{$json.rules}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "matched": "billing",
            "value": "billing",
            "branch": 1
          },
          "outputDescription": "matched: The case that was matched. value: The actual value evaluated. branch: The index of the matched case (1-based).",
          "usageExample": {
            "scenario": "Route a support ticket to the right team based on the category",
            "inputValues": {
              "value": "{{$json.category}}",
              "cases": "[\"billing\", \"technical\", \"general\"]"
            },
            "expectedOutput": "Connect different downstream nodes to the \"billing\", \"technical\", and \"general\" output ports."
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
