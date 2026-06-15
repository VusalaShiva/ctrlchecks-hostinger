import type { NodeDoc } from '../types';

export const jenkinsDoc: NodeDoc = {
  "slug": "jenkins",
  "displayName": "Jenkins",
  "category": "Data",
  "logoUrl": "/icons/nodes/jenkins.svg",
  "description": "Jenkins CI/CD operations",
  "credentialType": "Jenkins API Key",
  "credentialSetupSteps": [
    "What this is: The Jenkins connection lets CtrlChecks access your Jenkins account safely without putting secrets in workflow fields.",
    "Where to start: Jenkins account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Jenkins, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Jenkins.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Jenkins step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://www.jenkins.io/doc/book/using/remote-access-api/",
  "resources": [
    {
      "name": "Operations",
      "description": "Jenkins exposes operation choices directly.",
      "operations": [
        {
          "name": "Build",
          "value": "build",
          "description": "Build using the Jenkins node.",
          "fields": [
            {
              "name": "Job Name",
              "internalKey": "jobName",
              "type": "string",
              "required": false,
              "description": "Jenkins job name",
              "helpText": "What this field is: Jenkins job name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-job.\nTip: Use {{$json.jobName}} when this value comes from an earlier step.",
              "placeholder": "my-job",
              "example": "my-job"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Jenkins data with build after a related upstream event is received",
            "inputValues": {
              "Job Name": "my-job"
            },
            "expectedOutput": "Jenkins returns structured build data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Status",
          "value": "status",
          "description": "Status using the Jenkins node.",
          "fields": [
            {
              "name": "Job Name",
              "internalKey": "jobName",
              "type": "string",
              "required": false,
              "description": "Jenkins job name",
              "helpText": "What this field is: Jenkins job name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-job.\nTip: Use {{$json.jobName}} when this value comes from an earlier step.",
              "placeholder": "my-job",
              "example": "my-job"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Jenkins data with status after a related upstream event is received",
            "inputValues": {
              "Job Name": "my-job"
            },
            "expectedOutput": "Jenkins returns structured status data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Cancel",
          "value": "cancel",
          "description": "Cancel using the Jenkins node.",
          "fields": [
            {
              "name": "Job Name",
              "internalKey": "jobName",
              "type": "string",
              "required": false,
              "description": "Jenkins job name",
              "helpText": "What this field is: Jenkins job name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-job.\nTip: Use {{$json.jobName}} when this value comes from an earlier step.",
              "placeholder": "my-job",
              "example": "my-job"
            }
          ],
          "outputExample": {
            "success": true,
            "operation": "",
            "id": "abc123",
            "message": "",
            "data": {},
            "result": {},
            "output": {},
            "error": {}
          },
          "outputDescription": "success: Whether the service accepted the request.\noperation: Value returned by this operation.\nid: Unique identifier returned by the service.\nmessage: Value returned by this operation.\ndata: Returned records from the service.\nresult: Value returned by this operation.\noutput: Value returned by this operation.\nerror: Value returned by this operation.",
          "usageExample": {
            "scenario": "Process incoming Jenkins data with cancel after a related upstream event is received",
            "inputValues": {
              "Job Name": "my-job"
            },
            "expectedOutput": "Jenkins returns structured cancel data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Jenkins node."
    },
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
