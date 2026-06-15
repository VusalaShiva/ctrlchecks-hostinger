import type { NodeDoc } from '../types';

export const salesforceDoc: NodeDoc = {
  "slug": "salesforce",
  "displayName": "Salesforce",
  "category": "Data",
  "logoUrl": "/icons/nodes/salesforce.svg",
  "description": "Work with Salesforce objects (Account, Contact, Lead, Opportunity, etc.) using REST/SOQL/SOSL",
  "credentialType": "Salesforce Credential",
  "credentialSetupSteps": [
    "What this is: The Salesforce connection lets CtrlChecks access your Salesforce account safely without putting secrets in workflow fields.",
    "Where to start: Salesforce connected app or CtrlChecks Connections.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Salesforce, then sign in or paste the secret value requested there.",
    "Example: the access token returned after Salesforce sign-in.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Salesforce step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_oauth_and_connected_apps.htm",
  "resources": [
    {
      "name": "Operations",
      "description": "Salesforce exposes operation choices directly.",
      "operations": [
        {
          "name": "Query",
          "value": "query",
          "description": "Run a SOQL query to retrieve Salesforce records.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
            }
          ],
          "outputExample": {
            "totalSize": 2,
            "done": true,
            "records": [
              {
                "Id": "001Xx...",
                "Name": "Acme Corp",
                "AnnualRevenue": 5000000
              }
            ]
          },
          "outputDescription": "totalSize: Number of records returned. records: Array of Salesforce sObject records with all selected fields.",
          "usageExample": {
            "scenario": "Fetch all high-value Salesforce accounts",
            "inputValues": {
              "query": "SELECT Id, Name, AnnualRevenue FROM Account WHERE AnnualRevenue > 1000000 ORDER BY AnnualRevenue DESC LIMIT 100"
            },
            "expectedOutput": "Returns matching records. Map field values to downstream nodes."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Search",
          "value": "search",
          "description": "Search using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with search after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured search data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Get",
          "value": "get",
          "description": "Get using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with get after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured get data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create a new Salesforce record (Account, Contact, Lead, Opportunity, etc.).",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
            }
          ],
          "outputExample": {
            "id": "001Xx...",
            "success": true,
            "errors": []
          },
          "outputDescription": "id: The Salesforce record ID of the created object. success: true if creation succeeded. errors: Any validation errors.",
          "usageExample": {
            "scenario": "Create a Salesforce Lead when someone fills in a website enquiry form",
            "inputValues": {
              "sObject": "Lead",
              "fields": "{\"FirstName\": \"{{$json.firstName}}\", \"LastName\": \"{{$json.lastName}}\", \"Email\": \"{{$json.email}}\", \"Company\": \"{{$json.company}}\", \"LeadSource\": \"Website\"}"
            },
            "expectedOutput": "Lead is created. `{{$json.id}}` is the Salesforce Lead ID."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update fields on an existing Salesforce record.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
            }
          ],
          "outputExample": {
            "success": true
          },
          "outputDescription": "success: true if the update succeeded without errors.",
          "usageExample": {
            "scenario": "Update Salesforce Opportunity stage when a deal progresses",
            "inputValues": {
              "sObject": "Opportunity",
              "recordId": "{{$json.opportunityId}}",
              "fields": "{\"StageName\": \"Closed Won\", \"CloseDate\": \"{{$now}}\"}"
            },
            "expectedOutput": "`success: true` confirms the update."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with delete after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "Upsert",
          "value": "upsert",
          "description": "Upsert using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with upsert after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured upsert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "BulkCreate",
          "value": "bulkCreate",
          "description": "BulkCreate using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with bulk create after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured bulk create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "BulkUpdate",
          "value": "bulkUpdate",
          "description": "BulkUpdate using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with bulk update after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured bulk update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "BulkDelete",
          "value": "bulkDelete",
          "description": "BulkDelete using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with bulk delete after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured bulk delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        },
        {
          "name": "BulkUpsert",
          "value": "bulkUpsert",
          "description": "BulkUpsert using the Salesforce node.",
          "fields": [
            {
              "name": "Instance Url",
              "internalKey": "instanceUrl",
              "type": "url",
              "required": false,
              "description": "Salesforce instance URL (e.g., https://yourinstance.my.salesforce.com)",
              "helpText": "What this field is: The web address for Salesforce instance URL.\nHow to fill it: Paste the full URL, including https:// when it is an external service.\nExample: https://api.example.com.\nTip: Use {{$json.instanceUrl}} when the URL comes from an earlier step.",
              "placeholder": "https://api.example.com",
              "example": "https://api.example.com"
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "OAuth2 access token for Salesforce (stored as credential)",
              "helpText": "What this field is: Salesforce access token, a secret password that lets CtrlChecks talk to Salesforce safely.\nWhere to find it: Salesforce connected app or CtrlChecks Connections.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: the access token returned after Salesforce sign-in.\nImportant: Treat this like a bank password. Use Connections for Salesforce sign-in whenever possible.",
              "placeholder": "token_..."
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Salesforce object type (sObject), e.g. Account, Contact, Lead",
              "helpText": "What this field is: Salesforce object type , e.g. Account, Contact, Lead.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: Account.\nTip: Use {{$json.resource}} when this value comes from an earlier step.",
              "placeholder": "Account",
              "example": "Account"
            },
            {
              "name": "Custom Object",
              "internalKey": "customObject",
              "type": "string",
              "required": false,
              "description": "Custom object API name (ends with __c) when resource is custom",
              "helpText": "What this field is: Structured data for Custom object API name when resource is custom.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: CustomObject__c.\nTip: Use {{$json.customObject}} when an earlier step already prepared this data.",
              "placeholder": "CustomObject__c",
              "example": "CustomObject__c"
            },
            {
              "name": "Soql",
              "internalKey": "soql",
              "type": "string",
              "required": false,
              "description": "SOQL query (required for query operation)",
              "helpText": "What this field is: SOQL query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: SELECT Id, Name, Email FROM Contact LIMIT 10.\nTip: This field is used for query. Leave it blank when this operation does not need it.",
              "placeholder": "SELECT Id, Name, Email FROM Contact LIMIT 10",
              "example": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            {
              "name": "Sosl",
              "internalKey": "sosl",
              "type": "string",
              "required": false,
              "description": "SOSL search query (required for search operation)",
              "helpText": "What this field is: SOSL search query.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name).\nTip: This field is used for search. Leave it blank when this operation does not need it.",
              "placeholder": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)",
              "example": "FIND {test@example.com} IN EMAIL FIELDS RETURNING Contact(Id, Name)"
            },
            {
              "name": "Id",
              "internalKey": "id",
              "type": "string",
              "required": false,
              "description": "Record Id (required for get, update, delete operations)",
              "helpText": "What this field is: The Record Id that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: 003xx000004TmiQAAS.\nTip: Use {{$json.id}} when an earlier Salesforce step provides this value.",
              "placeholder": "003xx000004TmiQAAS",
              "example": "003xx000004TmiQAAS"
            },
            {
              "name": "External Id Field",
              "internalKey": "externalIdField",
              "type": "string",
              "required": false,
              "description": "External ID field API name (required for upsert operation)",
              "helpText": "What this field is: External ID field API name.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: CustomId__c.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "CustomId__c",
              "example": "CustomId__c"
            },
            {
              "name": "External Id Value",
              "internalKey": "externalIdValue",
              "type": "string",
              "required": false,
              "description": "External ID value (required for upsert operation)",
              "helpText": "What this field is: External ID value.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: EXT-12345.\nTip: This field is used for upsert. Leave it blank when this operation does not need it.",
              "placeholder": "EXT-12345",
              "example": "EXT-12345"
            },
            {
              "name": "Fields",
              "internalKey": "fields",
              "type": "json",
              "required": false,
              "description": "Field map for create/update operations",
              "helpText": "What this field is: Structured data for Field map.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Salesforce.\nExample: {\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}.\nTip: Use {{$json.fields}} when an earlier step already prepared this data.",
              "placeholder": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}",
              "example": "{\"LastName\":\"Doe\",\"Email\":\"test@example.com\"}"
            },
            {
              "name": "Records",
              "internalKey": "records",
              "type": "json",
              "required": false,
              "description": "Array of records for bulk operations",
              "helpText": "What this field is: The Array of records for bulk operations that tells Salesforce which item to use.\nWhere to find it: Open the item in Salesforce and copy the ID, name, or URL part shown by that service. You can also use the value returned by a previous step.\nExample: [{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}].\nTip: Use {{$json.records}} when an earlier Salesforce step provides this value.",
              "placeholder": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]",
              "example": "[{\"LastName\":\"Doe\",\"Email\":\"test1@example.com\"},{\"LastName\":\"Smith\",\"Email\":\"test2@example.com\"}]"
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
            "scenario": "Process incoming Salesforce data with bulk upsert after a related upstream event is received",
            "inputValues": {
              "Instance Url": "https://api.example.com",
              "Access Token": "",
              "Resource": "Account",
              "Custom Object": "CustomObject__c",
              "Soql": "SELECT Id, Name, Email FROM Contact LIMIT 10"
            },
            "expectedOutput": "Salesforce returns structured bulk upsert data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Salesforce node."
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
