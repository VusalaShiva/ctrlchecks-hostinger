import type { NodeDoc } from '../types';

export const formDoc: NodeDoc = {
  "slug": "form",
  "displayName": "Form Trigger",
  "category": "Triggers",
  "logoUrl": "/icons/nodes/form.svg",
  "description": "Trigger workflow when user submits a form",
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
      "description": "Form Trigger is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Start the workflow when a user submits a CtrlChecks form.",
          "fields": [
            {
              "name": "Form Title",
              "internalKey": "formTitle",
              "type": "string",
              "required": true,
              "description": "Title of the form",
              "helpText": "What this field is: Title of the form.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Contact Us Form.\nTip: Use {{$json.formTitle}} when this value comes from an earlier step.",
              "placeholder": "Contact Us Form",
              "example": "Contact Us Form",
              "defaultValue": "Form Submission"
            },
            {
              "name": "Form Description",
              "internalKey": "formDescription",
              "type": "string",
              "required": false,
              "description": "Description shown on the form",
              "helpText": "What this field is: Description shown on the form.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Form Description value.\nTip: Use {{$json.formDescription}} when this value comes from an earlier step.",
              "placeholder": "Enter Form Description"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": true,
              "description": "Form fields configuration",
              "helpText": "What this field is: Structured data for Form fields configuration.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Form Trigger.\nExample: [].\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "[]",
              "example": "[]",
              "defaultValue": "[]"
            },
            {
              "name": "Submit Button Text",
              "internalKey": "submitButtonText",
              "type": "string",
              "required": false,
              "description": "Text on submit button",
              "helpText": "What this field is: Text on submit button.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Submit.\nTip: Use {{$json.submitButtonText}} when this value comes from an earlier step.",
              "placeholder": "Submit",
              "example": "Submit",
              "defaultValue": "Submit"
            },
            {
              "name": "Success Message",
              "internalKey": "successMessage",
              "type": "string",
              "required": false,
              "description": "Message shown after successful submission",
              "helpText": "What this field is: Message shown after successful submission.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Thank you for your submission!.\nTip: Use {{$json.successMessage}} when this value comes from an earlier step.",
              "placeholder": "Thank you for your submission!",
              "example": "Thank you for your submission!",
              "defaultValue": "Thank you for your submission!"
            },
            {
              "name": "Allow Multiple Submissions",
              "internalKey": "allowMultipleSubmissions",
              "type": "boolean",
              "required": false,
              "description": "Allow same user to submit multiple times",
              "helpText": "What this field is: An on/off switch for Allow same user to submit multiple times.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use allow multiple submissions; turn OFF for the default behavior.",
              "placeholder": "true",
              "example": "true",
              "defaultValue": "true"
            },
            {
              "name": "Require Authentication",
              "internalKey": "requireAuthentication",
              "type": "boolean",
              "required": false,
              "description": "Require user authentication",
              "helpText": "What this field is: An on/off switch for Require user authentication.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use require authentication; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            },
            {
              "name": "Captcha",
              "internalKey": "captcha",
              "type": "boolean",
              "required": false,
              "description": "Enable CAPTCHA verification",
              "helpText": "What this field is: An on/off switch for Enable CAPTCHA verification.\nHow to fill it: Turn ON to enable this option. Turn OFF to leave it disabled.\nExample: Turn ON when this workflow should use captcha; turn OFF for the default behavior.",
              "placeholder": "false",
              "example": "false",
              "defaultValue": "false"
            }
          ],
          "outputExample": {
            "formData": {
              "name": "Alice",
              "email": "alice@example.com",
              "message": "I need help with billing."
            },
            "submittedAt": "2025-01-15T09:45:00.000Z",
            "formId": "form_xyz"
          },
          "outputDescription": "formData: Key-value pairs of form field names and the submitted values. submittedAt: ISO timestamp of the form submission. formId: The ID of the form that was submitted.",
          "usageExample": {
            "scenario": "Send a welcome email after a contact form submission",
            "inputValues": {},
            "expectedOutput": "Access submitted fields via `{{$json.formData.email}}`, `{{$json.formData.name}}`, etc. Connect a Gmail Send node to respond to the submitter."
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
