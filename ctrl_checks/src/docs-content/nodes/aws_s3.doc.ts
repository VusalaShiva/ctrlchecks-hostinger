import type { NodeDoc } from '../types';

export const awsS3Doc: NodeDoc = {
  "slug": "aws_s3",
  "displayName": "AWS S3",
  "category": "Data",
  "logoUrl": "/icons/nodes/aws_s3.svg",
  "description": "AWS S3 storage operations",
  "credentialType": "AWS Credential",
  "credentialSetupSteps": [
    "What this is: The AWS S3 connection lets CtrlChecks access your AWS S3 account safely without putting secrets in workflow fields.",
    "Where to start: AWS IAM -> Users or Roles -> Security credentials.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> AWS S3, then sign in or paste the secret value requested there.",
    "Example: Access key ID plus secret access key.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple AWS S3 step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/setting-up-s3.html",
  "resources": [
    {
      "name": "Operations",
      "description": "AWS S3 exposes operation choices directly.",
      "operations": [
        {
          "name": "Upload",
          "value": "upload",
          "description": "Upload using the AWS S3 node.",
          "fields": [
            {
              "name": "Region",
              "internalKey": "region",
              "type": "string",
              "required": false,
              "description": "AWS region (default: us-east-1)",
              "helpText": "What this field is: AWS region.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: us-east-1.\nTip: Use {{$json.region}} when this value comes from an earlier step.",
              "placeholder": "us-east-1",
              "example": "us-east-1",
              "defaultValue": "us-east-1"
            },
            {
              "name": "Access Key Id",
              "internalKey": "accessKeyId",
              "type": "string",
              "required": false,
              "description": "AWS access key id (optional if using env/IAM role)",
              "helpText": "What this field is: The AWS access key id that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AKIA....\nTip: Use {{$json.accessKeyId}} when an earlier AWS S3 step provides this value.",
              "placeholder": "AKIA...",
              "example": "AKIA..."
            },
            {
              "name": "Secret Access Key",
              "internalKey": "secretAccessKey",
              "type": "password",
              "required": false,
              "description": "AWS secret access key (optional if using env/IAM role)",
              "helpText": "What this field is: AWS access key secret, a secret password that lets CtrlChecks talk to AWS S3 safely.\nWhere to find it: AWS IAM -> Users or Roles -> Security credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: Access key ID plus secret access key.\nImportant: Treat this like a bank password. Prefer an IAM role or a user limited to the needed S3 buckets.",
              "placeholder": "Enter Secret Access Key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Session Token",
              "internalKey": "sessionToken",
              "type": "string",
              "required": false,
              "description": "AWS session token (optional)",
              "helpText": "What this field is: AWS session token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.sessionToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Bucket",
              "internalKey": "bucket",
              "type": "string",
              "required": true,
              "description": "S3 bucket name",
              "helpText": "What this field is: The name of your AWS S3 storage bucket — like a top-level folder in the cloud.\nWhere to find it: Log in to AWS Console (aws.amazon.com) → S3 → Buckets. Copy the bucket name.\nExample: my-company-uploads or acme-customer-files-prod\nNote: Bucket names are globally unique and contain only lowercase letters, numbers, and hyphens.",
              "placeholder": "my-bucket",
              "example": "my-bucket"
            },
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": false,
              "description": "Object key",
              "helpText": "What this field is: The Object key that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: path/to/file.pdf.\nTip: Use {{$json.key}} when an earlier AWS S3 step provides this value.",
              "placeholder": "path/to/file.pdf",
              "example": "path/to/file.pdf"
            },
            {
              "name": "Prefix",
              "internalKey": "prefix",
              "type": "string",
              "required": false,
              "description": "Prefix for list operation",
              "helpText": "What this field is: Prefix for list operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: folder/.\nTip: Use {{$json.prefix}} when this value comes from an earlier step.",
              "placeholder": "folder/",
              "example": "folder/"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier AWS S3 step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by AWS S3.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming AWS S3 data with upload after a related upstream event is received",
            "inputValues": {
              "Region": "us-east-1",
              "Access Key Id": "AKIA...",
              "Secret Access Key": "",
              "Session Token": "",
              "Bucket": "my-bucket"
            },
            "expectedOutput": "AWS S3 returns structured upload data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html"
        },
        {
          "name": "Download",
          "value": "download",
          "description": "Download using the AWS S3 node.",
          "fields": [
            {
              "name": "Region",
              "internalKey": "region",
              "type": "string",
              "required": false,
              "description": "AWS region (default: us-east-1)",
              "helpText": "What this field is: AWS region.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: us-east-1.\nTip: Use {{$json.region}} when this value comes from an earlier step.",
              "placeholder": "us-east-1",
              "example": "us-east-1",
              "defaultValue": "us-east-1"
            },
            {
              "name": "Access Key Id",
              "internalKey": "accessKeyId",
              "type": "string",
              "required": false,
              "description": "AWS access key id (optional if using env/IAM role)",
              "helpText": "What this field is: The AWS access key id that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AKIA....\nTip: Use {{$json.accessKeyId}} when an earlier AWS S3 step provides this value.",
              "placeholder": "AKIA...",
              "example": "AKIA..."
            },
            {
              "name": "Secret Access Key",
              "internalKey": "secretAccessKey",
              "type": "password",
              "required": false,
              "description": "AWS secret access key (optional if using env/IAM role)",
              "helpText": "What this field is: AWS access key secret, a secret password that lets CtrlChecks talk to AWS S3 safely.\nWhere to find it: AWS IAM -> Users or Roles -> Security credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: Access key ID plus secret access key.\nImportant: Treat this like a bank password. Prefer an IAM role or a user limited to the needed S3 buckets.",
              "placeholder": "Enter Secret Access Key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Session Token",
              "internalKey": "sessionToken",
              "type": "string",
              "required": false,
              "description": "AWS session token (optional)",
              "helpText": "What this field is: AWS session token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.sessionToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Bucket",
              "internalKey": "bucket",
              "type": "string",
              "required": true,
              "description": "S3 bucket name",
              "helpText": "What this field is: S3 bucket name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-bucket.\nTip: Use {{$json.bucket}} when this value comes from an earlier step.",
              "placeholder": "my-bucket",
              "example": "my-bucket"
            },
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": false,
              "description": "Object key",
              "helpText": "What this field is: The Object key that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: path/to/file.pdf.\nTip: Use {{$json.key}} when an earlier AWS S3 step provides this value.",
              "placeholder": "path/to/file.pdf",
              "example": "path/to/file.pdf"
            },
            {
              "name": "Prefix",
              "internalKey": "prefix",
              "type": "string",
              "required": false,
              "description": "Prefix for list operation",
              "helpText": "What this field is: Prefix for list operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: folder/.\nTip: Use {{$json.prefix}} when this value comes from an earlier step.",
              "placeholder": "folder/",
              "example": "folder/"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier AWS S3 step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by AWS S3.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming AWS S3 data with download after a related upstream event is received",
            "inputValues": {
              "Region": "us-east-1",
              "Access Key Id": "AKIA...",
              "Secret Access Key": "",
              "Session Token": "",
              "Bucket": "my-bucket"
            },
            "expectedOutput": "AWS S3 returns structured download data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html"
        },
        {
          "name": "List",
          "value": "list",
          "description": "List using the AWS S3 node.",
          "fields": [
            {
              "name": "Region",
              "internalKey": "region",
              "type": "string",
              "required": false,
              "description": "AWS region (default: us-east-1)",
              "helpText": "What this field is: AWS region.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: us-east-1.\nTip: Use {{$json.region}} when this value comes from an earlier step.",
              "placeholder": "us-east-1",
              "example": "us-east-1",
              "defaultValue": "us-east-1"
            },
            {
              "name": "Access Key Id",
              "internalKey": "accessKeyId",
              "type": "string",
              "required": false,
              "description": "AWS access key id (optional if using env/IAM role)",
              "helpText": "What this field is: The AWS access key id that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: AKIA....\nTip: Use {{$json.accessKeyId}} when an earlier AWS S3 step provides this value.",
              "placeholder": "AKIA...",
              "example": "AKIA..."
            },
            {
              "name": "Secret Access Key",
              "internalKey": "secretAccessKey",
              "type": "password",
              "required": false,
              "description": "AWS secret access key (optional if using env/IAM role)",
              "helpText": "What this field is: AWS access key secret, a secret password that lets CtrlChecks talk to AWS S3 safely.\nWhere to find it: AWS IAM -> Users or Roles -> Security credentials.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: Access key ID plus secret access key.\nImportant: Treat this like a bank password. Prefer an IAM role or a user limited to the needed S3 buckets.",
              "placeholder": "Enter Secret Access Key",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Session Token",
              "internalKey": "sessionToken",
              "type": "string",
              "required": false,
              "description": "AWS session token (optional)",
              "helpText": "What this field is: AWS session token.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: token_....\nTip: Use {{$json.sessionToken}} when this value comes from an earlier step.",
              "placeholder": "token_..."
            },
            {
              "name": "Bucket",
              "internalKey": "bucket",
              "type": "string",
              "required": true,
              "description": "S3 bucket name",
              "helpText": "What this field is: S3 bucket name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: my-bucket.\nTip: Use {{$json.bucket}} when this value comes from an earlier step.",
              "placeholder": "my-bucket",
              "example": "my-bucket"
            },
            {
              "name": "Key",
              "internalKey": "key",
              "type": "string",
              "required": false,
              "description": "Object key",
              "helpText": "What this field is: The Object key that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: path/to/file.pdf.\nTip: Use {{$json.key}} when an earlier AWS S3 step provides this value.",
              "placeholder": "path/to/file.pdf",
              "example": "path/to/file.pdf"
            },
            {
              "name": "Prefix",
              "internalKey": "prefix",
              "type": "string",
              "required": false,
              "description": "Prefix for list operation",
              "helpText": "What this field is: Prefix for list operation.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: folder/.\nTip: Use {{$json.prefix}} when this value comes from an earlier step.",
              "placeholder": "folder/",
              "example": "folder/"
            },
            {
              "name": "Data Base64",
              "internalKey": "dataBase64",
              "type": "string",
              "required": false,
              "description": "Base64 payload for upload (alternative to data)",
              "helpText": "What this field is: The Base64 payload for upload that tells AWS S3 which item to use.\nWhere to find it: Open the item in AWS S3 and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: {{$json.dataBase64}}.\nTip: Use {{$json.dataBase64}} when an earlier AWS S3 step provides this value.",
              "placeholder": "{{$json.dataBase64}}",
              "example": "{{$json.dataBase64}}"
            },
            {
              "name": "Data",
              "internalKey": "data",
              "type": "string",
              "required": true,
              "description": "Base64 payload for upload",
              "helpText": "What this field is: Structured data for Base64 payload for upload.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by AWS S3.\nExample: {{$json.data}}.\nTip: Use {{$json.data}} when an earlier step already prepared this data.",
              "placeholder": "{{$json.data}}",
              "example": "{{$json.data}}"
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
            "scenario": "Process incoming AWS S3 data with list after a related upstream event is received",
            "inputValues": {
              "Region": "us-east-1",
              "Access Key Id": "AKIA...",
              "Secret Access Key": "",
              "Session Token": "",
              "Bucket": "my-bucket"
            },
            "expectedOutput": "AWS S3 returns structured list data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the AWS S3 node."
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
