import type { NodeDoc } from '../types';

export const setVariableDoc: NodeDoc = {
  "slug": "set_variable",
  "displayName": "Set Variable",
  "category": "Data",
  "logoUrl": "/icons/nodes/set_variable.svg",
  "description": "Set a variable with a name and value",
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
      "description": "Set Variable is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Store a value in a named variable that can be referenced later in the workflow.",
          "fields": [
            {
              "name": "Name",
              "internalKey": "name",
              "type": "string",
              "required": true,
              "description": "Variable name (must be a valid identifier)",
              "helpText": "What this field is: Variable name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: myVariable.\nTip: Use {{$json.name}} when this value comes from an earlier step.",
              "placeholder": "myVariable",
              "example": "myVariable"
            },
            {
              "name": "Value",
              "internalKey": "value",
              "type": "string",
              "required": false,
              "description": "Variable value (supports template expressions like {{input.field}})",
              "helpText": "What this field is: Variable value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Hello World.\nTip: Use {{$json.value}} when this value comes from an earlier step.",
              "placeholder": "Hello World",
              "example": "Hello World"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Array of field assignments (legacy format)",
              "helpText": "What this field is: Structured data for Array of field assignments.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Set Variable.\nExample: [{\"name\":\"fullName\",\"value\":\"{{$json.firstName}} {{$json.lastName}}\"}].\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "[{\"name\":\"fullName\",\"value\":\"{{$json.firstName}} {{$json.lastName}}\"}]",
              "example": "[{\"name\":\"fullName\",\"value\":\"{{$json.firstName}} {{$json.lastName}}\"}]"
            },
            {
              "name": "Keep Source",
              "internalKey": "keepSource",
              "type": "boolean",
              "required": false,
              "description": "Keep original fields",
              "helpText": "What this field is: An on/off switch for Keep original fields.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use keep source; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            }
          ],
          "outputExample": {
            "variableName": "userEmail",
            "variableValue": "alice@example.com",
            "set": true
          },
          "outputDescription": "variableName: The name of the variable that was set. variableValue: The value stored. set: true on success.",
          "usageExample": {
            "scenario": "Store the current user's email early in the workflow to use in multiple later nodes",
            "inputValues": {
              "name": "userEmail",
              "value": "{{$json.email}}"
            },
            "expectedOutput": "Reference this variable later as `{{$variables.userEmail}}`."
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
