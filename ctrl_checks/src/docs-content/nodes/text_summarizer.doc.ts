import type { NodeDoc } from '../types';

export const textSummarizerDoc: NodeDoc = {
  "slug": "text_summarizer",
  "displayName": "Text Summarizer",
  "category": "AI",
  "logoUrl": "/icons/nodes/text_summarizer.svg",
  "description": "Summarize long text into shorter versions",
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
      "description": "Text Summarizer is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Summarise long text using an AI language model.",
          "fields": [
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Text to summarize",
              "helpText": "What this field is: Text to summarize.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.text}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.text}}",
              "example": "{{$json.text}}"
            },
            {
              "name": "Max Length",
              "internalKey": "maxLength",
              "type": "number",
              "required": false,
              "description": "Maximum summary length",
              "helpText": "What this field is: The number used for Maximum summary length.\nHow to fill it: Type digits only. Do not add words unless this field says they are allowed.\nExample: 100.\nTip: Use {{$json.maxLength}} when the number comes from an earlier step.",
              "placeholder": "100",
              "example": "100"
            }
          ],
          "outputExample": {
            "summary": "The document outlines three main points: cost reduction, team expansion, and new product launch in Q2.",
            "wordCount": 28,
            "originalLength": 1250
          },
          "outputDescription": "summary: The condensed summary text. wordCount: Words in the summary. originalLength: Character count of the input text.",
          "usageExample": {
            "scenario": "Summarise customer feedback before inserting into a CRM note",
            "inputValues": {
              "text": "{{$json.feedback}}",
              "maxLength": "100"
            },
            "expectedOutput": "Short summary in `{{$json.summary}}`."
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
