import type { NodeDoc } from '../types';

export const tallyDoc: NodeDoc = {
  "slug": "tally",
  "displayName": "Tally Solutions",
  "category": "Data",
  "logoUrl": "/icons/nodes/tally.svg",
  "description": "Interact with Tally ERP / TallyPrime via XML API to fetch or push accounting data",
  "credentialType": "Tally API Key",
  "credentialSetupSteps": [
    "What this is: The Tally Solutions connection lets CtrlChecks access your Tally Solutions account safely without putting secrets in workflow fields.",
    "Where to start: Tally Solutions account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Tally Solutions, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Tally Solutions.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Tally Solutions step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://tallyforms.notion.site/Tally-API-Documentation",
  "resources": [
    {
      "name": "Operations",
      "description": "Tally Solutions exposes operation choices directly.",
      "operations": [
        {
          "name": "Get ledger",
          "value": "get_ledger",
          "description": "Get ledger using the Tally Solutions node.",
          "fields": [
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "Tally XML API server URL",
              "helpText": "What this field is: The web address for Tally XML API server URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: http://localhost:9000.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "http://localhost:9000",
              "example": "http://localhost:9000",
              "defaultValue": "http://localhost:9000"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "string",
              "required": false,
              "description": "Custom XML request body (overrides the default template for the selected operation)",
              "helpText": "What this field is: Structured data for Custom XML request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Tally Solutions.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "Enter Payload"
            },
            {
              "name": "Company Name",
              "internalKey": "companyName",
              "type": "string",
              "required": false,
              "description": "Tally company name to scope requests",
              "helpText": "What this field is: Tally company name to scope requests.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Company Ltd.\nTip: Use {{$json.companyName}} when this value comes from an earlier step.",
              "placeholder": "My Company Ltd",
              "example": "My Company Ltd"
            },
            {
              "name": "Ledger Name",
              "internalKey": "ledgerName",
              "type": "string",
              "required": false,
              "description": "Ledger name (required for get_ledger operation)",
              "helpText": "What this field is: Ledger name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Cash.\nTip: This field is used for get_ledger. Leave it blank when this operation does not need it.",
              "placeholder": "Cash",
              "example": "Cash"
            },
            {
              "name": "Voucher Id",
              "internalKey": "voucherId",
              "type": "string",
              "required": false,
              "description": "Voucher ID or number (required for get_voucher operation)",
              "helpText": "What this field is: The Voucher ID or number that tells Tally Solutions which item to use.\nWhere to find it: Open the item in Tally Solutions and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: VCH-001.\nTip: Use {{$json.voucherId}} when an earlier Tally Solutions step provides this value.",
              "placeholder": "VCH-001",
              "example": "VCH-001"
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
            "scenario": "Process incoming Tally Solutions data with get ledger after a related upstream event is received",
            "inputValues": {
              "Endpoint": "http://localhost:9000",
              "Payload": "",
              "Company Name": "My Company Ltd",
              "Ledger Name": "Cash",
              "Voucher Id": "VCH-001"
            },
            "expectedOutput": "Tally Solutions returns structured get ledger data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Get voucher",
          "value": "get_voucher",
          "description": "Get voucher using the Tally Solutions node.",
          "fields": [
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "Tally XML API server URL",
              "helpText": "What this field is: The web address for Tally XML API server URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: http://localhost:9000.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "http://localhost:9000",
              "example": "http://localhost:9000",
              "defaultValue": "http://localhost:9000"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "string",
              "required": false,
              "description": "Custom XML request body (overrides the default template for the selected operation)",
              "helpText": "What this field is: Structured data for Custom XML request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Tally Solutions.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "Enter Payload"
            },
            {
              "name": "Company Name",
              "internalKey": "companyName",
              "type": "string",
              "required": false,
              "description": "Tally company name to scope requests",
              "helpText": "What this field is: Tally company name to scope requests.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Company Ltd.\nTip: Use {{$json.companyName}} when this value comes from an earlier step.",
              "placeholder": "My Company Ltd",
              "example": "My Company Ltd"
            },
            {
              "name": "Ledger Name",
              "internalKey": "ledgerName",
              "type": "string",
              "required": false,
              "description": "Ledger name (required for get_ledger operation)",
              "helpText": "What this field is: Ledger name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Cash.\nTip: This field is used for get_ledger. Leave it blank when this operation does not need it.",
              "placeholder": "Cash",
              "example": "Cash"
            },
            {
              "name": "Voucher Id",
              "internalKey": "voucherId",
              "type": "string",
              "required": false,
              "description": "Voucher ID or number (required for get_voucher operation)",
              "helpText": "What this field is: The Voucher ID or number that tells Tally Solutions which item to use.\nWhere to find it: Open the item in Tally Solutions and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: VCH-001.\nTip: Use {{$json.voucherId}} when an earlier Tally Solutions step provides this value.",
              "placeholder": "VCH-001",
              "example": "VCH-001"
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
            "scenario": "Process incoming Tally Solutions data with get voucher after a related upstream event is received",
            "inputValues": {
              "Endpoint": "http://localhost:9000",
              "Payload": "",
              "Company Name": "My Company Ltd",
              "Ledger Name": "Cash",
              "Voucher Id": "VCH-001"
            },
            "expectedOutput": "Tally Solutions returns structured get voucher data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Create voucher",
          "value": "create_voucher",
          "description": "Create voucher using the Tally Solutions node.",
          "fields": [
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "Tally XML API server URL",
              "helpText": "What this field is: The web address for Tally XML API server URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: http://localhost:9000.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "http://localhost:9000",
              "example": "http://localhost:9000",
              "defaultValue": "http://localhost:9000"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "string",
              "required": false,
              "description": "Custom XML request body (overrides the default template for the selected operation)",
              "helpText": "What this field is: Structured data for Custom XML request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Tally Solutions.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "Enter Payload"
            },
            {
              "name": "Company Name",
              "internalKey": "companyName",
              "type": "string",
              "required": false,
              "description": "Tally company name to scope requests",
              "helpText": "What this field is: Tally company name to scope requests.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Company Ltd.\nTip: Use {{$json.companyName}} when this value comes from an earlier step.",
              "placeholder": "My Company Ltd",
              "example": "My Company Ltd"
            },
            {
              "name": "Ledger Name",
              "internalKey": "ledgerName",
              "type": "string",
              "required": false,
              "description": "Ledger name (required for get_ledger operation)",
              "helpText": "What this field is: Ledger name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Cash.\nTip: This field is used for get_ledger. Leave it blank when this operation does not need it.",
              "placeholder": "Cash",
              "example": "Cash"
            },
            {
              "name": "Voucher Id",
              "internalKey": "voucherId",
              "type": "string",
              "required": false,
              "description": "Voucher ID or number (required for get_voucher operation)",
              "helpText": "What this field is: The Voucher ID or number that tells Tally Solutions which item to use.\nWhere to find it: Open the item in Tally Solutions and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: VCH-001.\nTip: Use {{$json.voucherId}} when an earlier Tally Solutions step provides this value.",
              "placeholder": "VCH-001",
              "example": "VCH-001"
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
            "scenario": "Process incoming Tally Solutions data with create voucher after a related upstream event is received",
            "inputValues": {
              "Endpoint": "http://localhost:9000",
              "Payload": "",
              "Company Name": "My Company Ltd",
              "Ledger Name": "Cash",
              "Voucher Id": "VCH-001"
            },
            "expectedOutput": "Tally Solutions returns structured create voucher data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Get stock items",
          "value": "get_stock_items",
          "description": "Get stock items using the Tally Solutions node.",
          "fields": [
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "Tally XML API server URL",
              "helpText": "What this field is: The web address for Tally XML API server URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: http://localhost:9000.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "http://localhost:9000",
              "example": "http://localhost:9000",
              "defaultValue": "http://localhost:9000"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "string",
              "required": false,
              "description": "Custom XML request body (overrides the default template for the selected operation)",
              "helpText": "What this field is: Structured data for Custom XML request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Tally Solutions.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "Enter Payload"
            },
            {
              "name": "Company Name",
              "internalKey": "companyName",
              "type": "string",
              "required": false,
              "description": "Tally company name to scope requests",
              "helpText": "What this field is: Tally company name to scope requests.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Company Ltd.\nTip: Use {{$json.companyName}} when this value comes from an earlier step.",
              "placeholder": "My Company Ltd",
              "example": "My Company Ltd"
            },
            {
              "name": "Ledger Name",
              "internalKey": "ledgerName",
              "type": "string",
              "required": false,
              "description": "Ledger name (required for get_ledger operation)",
              "helpText": "What this field is: Ledger name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Cash.\nTip: This field is used for get_ledger. Leave it blank when this operation does not need it.",
              "placeholder": "Cash",
              "example": "Cash"
            },
            {
              "name": "Voucher Id",
              "internalKey": "voucherId",
              "type": "string",
              "required": false,
              "description": "Voucher ID or number (required for get_voucher operation)",
              "helpText": "What this field is: The Voucher ID or number that tells Tally Solutions which item to use.\nWhere to find it: Open the item in Tally Solutions and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: VCH-001.\nTip: Use {{$json.voucherId}} when an earlier Tally Solutions step provides this value.",
              "placeholder": "VCH-001",
              "example": "VCH-001"
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
            "scenario": "Process incoming Tally Solutions data with get stock items after a related upstream event is received",
            "inputValues": {
              "Endpoint": "http://localhost:9000",
              "Payload": "",
              "Company Name": "My Company Ltd",
              "Ledger Name": "Cash",
              "Voucher Id": "VCH-001"
            },
            "expectedOutput": "Tally Solutions returns structured get stock items data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://docs.ctrlchecks.com"
        },
        {
          "name": "Get company info",
          "value": "get_company_info",
          "description": "Get company info using the Tally Solutions node.",
          "fields": [
            {
              "name": "Endpoint",
              "internalKey": "endpoint",
              "type": "url",
              "required": true,
              "description": "Tally XML API server URL",
              "helpText": "What this field is: The web address for Tally XML API server URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: http://localhost:9000.\nTip: Use {{$json.endpoint}} when the URL comes from an earlier step.",
              "placeholder": "http://localhost:9000",
              "example": "http://localhost:9000",
              "defaultValue": "http://localhost:9000"
            },
            {
              "name": "Payload",
              "internalKey": "payload",
              "type": "string",
              "required": false,
              "description": "Custom XML request body (overrides the default template for the selected operation)",
              "helpText": "What this field is: Structured data for Custom XML request body.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Tally Solutions.\nExample: {\"name\":\"Alice\",\"email\":\"alice@example.com\"}.\nTip: Use {{$json.payload}} when an earlier step already prepared this data.",
              "placeholder": "Enter Payload"
            },
            {
              "name": "Company Name",
              "internalKey": "companyName",
              "type": "string",
              "required": false,
              "description": "Tally company name to scope requests",
              "helpText": "What this field is: Tally company name to scope requests.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Company Ltd.\nTip: Use {{$json.companyName}} when this value comes from an earlier step.",
              "placeholder": "My Company Ltd",
              "example": "My Company Ltd"
            },
            {
              "name": "Ledger Name",
              "internalKey": "ledgerName",
              "type": "string",
              "required": false,
              "description": "Ledger name (required for get_ledger operation)",
              "helpText": "What this field is: Ledger name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Cash.\nTip: This field is used for get_ledger. Leave it blank when this operation does not need it.",
              "placeholder": "Cash",
              "example": "Cash"
            },
            {
              "name": "Voucher Id",
              "internalKey": "voucherId",
              "type": "string",
              "required": false,
              "description": "Voucher ID or number (required for get_voucher operation)",
              "helpText": "What this field is: The Voucher ID or number that tells Tally Solutions which item to use.\nWhere to find it: Open the item in Tally Solutions and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: VCH-001.\nTip: Use {{$json.voucherId}} when an earlier Tally Solutions step provides this value.",
              "placeholder": "VCH-001",
              "example": "VCH-001"
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
            "scenario": "Process incoming Tally Solutions data with get company info after a related upstream event is received",
            "inputValues": {
              "Endpoint": "http://localhost:9000",
              "Payload": "",
              "Company Name": "My Company Ltd",
              "Ledger Name": "Cash",
              "Voucher Id": "VCH-001"
            },
            "expectedOutput": "Tally Solutions returns structured get company info data that downstream nodes can reference with {{$json.fieldName}}."
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
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Tally Solutions node."
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
