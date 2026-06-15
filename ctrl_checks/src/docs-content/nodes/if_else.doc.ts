import type { NodeDoc } from '../types';

export const ifElseDoc: NodeDoc = {
  "slug": "if_else",
  "displayName": "If/Else",
  "category": "Logic",
  "logoUrl": "/icons/nodes/if_else.svg",
  "description": "Conditional branching based on true/false condition",
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
      "description": "If/Else is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Branch the workflow: if the condition is true, the \"true\" path runs; otherwise the \"false\" path runs.",
          "fields": [
            {
              "name": "Conditions",
              "internalKey": "conditions",
              "type": "json",
              "required": true,
              "description": "Conditions to evaluate. Each condition should have: field (string), operator (equals|not_equals|greater_than|less_than|greater_than_or_equal|less_than_or_equal|contains|not_contains), value (string|number|boolean)",
              "helpText": "What this field is: Structured data for Conditions to evaluate. Each condition should have: field , operator , value.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by If/Else.\nExample: [{\"field\":\"$json.age\",\"operator\":\"greater_than_or_equal\",\"value\":18}].\nTip: Use {{$json.conditions}} when an earlier step already prepared this data.",
              "placeholder": "[{\"field\":\"$json.age\",\"operator\":\"greater_than_or_equal\",\"value\":18}]",
              "example": "[{\"field\":\"$json.age\",\"operator\":\"greater_than_or_equal\",\"value\":18}]"
            },
            {
              "name": "Combine Operation",
              "internalKey": "combineOperation",
              "type": "string",
              "required": false,
              "description": "How to combine conditions",
              "helpText": "What this field is: How to combine conditions.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: AND.\nTip: Use {{$json.combineOperation}} when this value comes from an earlier step.",
              "placeholder": "AND",
              "example": "AND",
              "defaultValue": "AND"
            }
          ],
          "outputExample": {
            "condition": true,
            "branch": "true",
            "value": "premium",
            "expression": "{{$json.plan}} === \"premium\""
          },
          "outputDescription": "condition: The evaluated boolean result. branch: \"true\" or \"false\" indicating which path was taken. value: The value that was evaluated.",
          "usageExample": {
            "scenario": "Route premium users to a VIP welcome email and free users to a trial email",
            "inputValues": {
              "condition": "{{$json.plan === \"premium\"}}"
            },
            "expectedOutput": "If `condition` is true, the \"true\" output path runs (connect a Gmail Send node). Otherwise the \"false\" path runs (connect a different email node)."
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
