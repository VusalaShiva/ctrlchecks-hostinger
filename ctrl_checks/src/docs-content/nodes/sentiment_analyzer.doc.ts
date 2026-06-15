import type { NodeDoc } from '../types';

export const sentimentAnalyzerDoc: NodeDoc = {
  "slug": "sentiment_analyzer",
  "displayName": "Sentiment Analyzer",
  "category": "AI",
  "logoUrl": "/icons/nodes/sentiment_analyzer.svg",
  "description": "Analyze sentiment and emotions in text",
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
      "description": "Sentiment Analyzer is configured directly with input fields.",
      "operations": [
        {
          "name": "Execute",
          "value": "default",
          "description": "Analyse the sentiment (positive / negative / neutral) of a piece of text.",
          "fields": [
            {
              "name": "Text",
              "internalKey": "text",
              "type": "textarea",
              "required": true,
              "description": "Text to analyze",
              "helpText": "What this field is: Text to analyze.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: {{$json.text}}.\nTip: Use {{$json.text}} when this value comes from an earlier step.",
              "placeholder": "{{$json.text}}",
              "example": "{{$json.text}}"
            }
          ],
          "outputExample": {
            "sentiment": "positive",
            "score": 0.87,
            "label": "Positive",
            "confidence": "high",
            "text": "Great product, very easy to use!"
          },
          "outputDescription": "sentiment: positive, negative, or neutral. score: Confidence score from 0 to 1. label: Human-readable label. confidence: high, medium, or low.",
          "usageExample": {
            "scenario": "Route negative customer feedback to a priority queue",
            "inputValues": {
              "text": "{{$json.reviewText}}"
            },
            "expectedOutput": "Use `{{$json.sentiment}}` in an If/Else node to route negatives to a Slack alert channel."
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
