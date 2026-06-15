import type { NodeDoc } from '../types';

export const notionDoc: NodeDoc = {
  "slug": "notion",
  "displayName": "Notion",
  "category": "Data",
  "logoUrl": "/icons/nodes/notion.svg",
  "description": "Read, write, update, or delete pages, databases, and blocks in Notion",
  "credentialType": "Notion API Key",
  "credentialSetupSteps": [
    "What this is: The Notion connection lets CtrlChecks access your Notion account safely without putting secrets in workflow fields.",
    "Where to start: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Notion, then sign in or paste the secret value requested there.",
    "Example: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.",
    "Important: In Notion, share each page or database with your integration from the page menu before running the node.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Notion step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://developers.notion.com/docs/getting-started",
  "resources": [
    {
      "name": "Operations",
      "description": "Notion exposes operation choices directly.",
      "operations": [
        {
          "name": "Read",
          "value": "read",
          "description": "Read using the Notion node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Notion API key (required for authentication)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Notion OAuth access token (alternative to API key)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Notion resource: page, database, block, user, comment, search",
              "helpText": "What this field is: The Notion resource type to work with.\nOptions: page, database, block, user, comment, search.\nExample: page to read/write Notion pages, database to query a Notion database.\nTip: The resource determines which Notion API endpoint is called.",
              "placeholder": "page",
              "example": "page",
              "defaultValue": "page"
            },
            {
              "name": "Page Id",
              "internalKey": "pageId",
              "type": "string",
              "required": false,
              "description": "Notion Page ID (for get, update, archive, restore)",
              "helpText": "What this field is: The unique ID of the Notion page you want to read, update, archive, or restore.\nWhere to find it: Open the page in Notion and copy the link. The page ID is the 32-character code near the end of the URL, before any ? character.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: Use {{$json.pageId}} if an earlier Notion step returned the page ID.",
              "placeholder": "page-id",
              "example": "page-id"
            },
            {
              "name": "Database Id",
              "internalKey": "databaseId",
              "type": "string",
              "required": false,
              "description": "Notion Database ID (for query, get, or creating a page as a database row)",
              "helpText": "What this field is: The unique ID of the Notion database you want to query or add rows to.\nWhere to find it: Open the database in Notion and copy the link. The database ID is the 32-character code before ?v=.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nImportant: Share the database with your Notion integration from the Notion page menu: ... -> Connections -> add your integration.\nTip: Use {{$json.databaseId}} from a previous step when available.",
              "placeholder": "database-id",
              "example": "database-id"
            },
            {
              "name": "Parent Page Id",
              "internalKey": "parentPageId",
              "type": "string",
              "required": false,
              "description": "Parent Page ID — where the new page will be created (required for page › create and database › create)",
              "helpText": "What this field is: The Notion page or database where the new page will be created.\nWhere to find it: Open the parent page or database in Notion and copy the ID from its URL.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: For database rows, use the database ID as the parent.",
              "placeholder": "parent-page-id",
              "example": "parent-page-id"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Page or database title (plain text)",
              "helpText": "What this field is: The title of the Notion page or database entry (the main heading/name).\nHow to fill it: Type the title text directly, or use data from an earlier step.\nExample: Monthly Report — {{$json.month}} {{$json.year}}\nNote: Notion page titles are plain text — Markdown formatting does not apply in this field.",
              "placeholder": "My Page",
              "example": "My Page"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Page body content (plain text — added as a paragraph block)",
              "helpText": "What this field is: The body text of the Notion page, added as a Paragraph block.\nHow to fill it: Type the page content in plain text. Use {{$json.fieldName}} to insert data from earlier steps.\nExample: This report covers {{$json.startDate}} to {{$json.endDate}}. Total orders: {{$json.orderCount}}.\nNote: For richer formatting like headings or bullet lists, you would need to use the Notion blocks API structure.",
              "placeholder": "This is the page content.",
              "example": "This is the page content."
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "string",
              "required": false,
              "description": "Page properties as simple JSON key:value pairs (for database rows). Example: {\"Status\":\"In Progress\",\"Priority\":\"High\"}",
              "helpText": "What this field is: The Notion database property values for the page or row.\nHow to fill it: Enter structured data in { } brackets. Use exact Notion column names, including capital letters and spaces.\nExample: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Due Date\":\"2026-06-01\"}.\nTip: Copy column names from the Notion database header. \"Status\" and \"status\" are different.",
              "placeholder": "{\"Status\":\"Done\",\"Count\":3}",
              "example": "{\"Status\":\"Done\",\"Count\":3}"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "json",
              "required": false,
              "description": "Optional filter for database queries/search",
              "helpText": "What this field is: A filter that limits which Notion database rows are returned.\nHow to fill it: Enter a Notion filter as structured data in { } brackets. Leave blank to return all rows allowed by the limit.\nExample: {\"property\":\"Status\",\"select\":{\"equals\":\"In Progress\"}}.\nTip: Build the filter around the exact Notion property name.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Notion data with read after a related upstream event is received",
            "inputValues": {
              "Api Key": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "Access Token": "your-oauth-access-token",
              "Resource": "page",
              "Page Id": "page-id",
              "Database Id": "database-id"
            },
            "expectedOutput": "Notion returns structured read data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.notion.com/reference/intro"
        },
        {
          "name": "Create",
          "value": "create",
          "description": "Create using the Notion node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Notion API key (required for authentication)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Notion OAuth access token (alternative to API key)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Notion resource: page, database, block, user, comment, search",
              "helpText": "What this field is: The Notion resource type to work with.\nOptions: page, database, block, user, comment, search.\nExample: page to read/write Notion pages, database to query a Notion database.\nTip: The resource determines which Notion API endpoint is called.",
              "placeholder": "page",
              "example": "page",
              "defaultValue": "page"
            },
            {
              "name": "Page Id",
              "internalKey": "pageId",
              "type": "string",
              "required": false,
              "description": "Notion Page ID (for get, update, archive, restore)",
              "helpText": "What this field is: The unique ID of the Notion page you want to read, update, archive, or restore.\nWhere to find it: Open the page in Notion and copy the link. The page ID is the 32-character code near the end of the URL, before any ? character.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: Use {{$json.pageId}} if an earlier Notion step returned the page ID.",
              "placeholder": "page-id",
              "example": "page-id"
            },
            {
              "name": "Database Id",
              "internalKey": "databaseId",
              "type": "string",
              "required": false,
              "description": "Notion Database ID (for query, get, or creating a page as a database row)",
              "helpText": "What this field is: The unique ID of the Notion database you want to query or add rows to.\nWhere to find it: Open the database in Notion and copy the link. The database ID is the 32-character code before ?v=.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nImportant: Share the database with your Notion integration from the Notion page menu: ... -> Connections -> add your integration.\nTip: Use {{$json.databaseId}} from a previous step when available.",
              "placeholder": "database-id",
              "example": "database-id"
            },
            {
              "name": "Parent Page Id",
              "internalKey": "parentPageId",
              "type": "string",
              "required": false,
              "description": "Parent Page ID — where the new page will be created (required for page › create and database › create)",
              "helpText": "What this field is: The Notion page or database where the new page will be created.\nWhere to find it: Open the parent page or database in Notion and copy the ID from its URL.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: For database rows, use the database ID as the parent.",
              "placeholder": "parent-page-id",
              "example": "parent-page-id"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Page or database title (plain text)",
              "helpText": "What this field is: Page or database title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Page.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "My Page",
              "example": "My Page"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Page body content (plain text — added as a paragraph block)",
              "helpText": "What this field is: Page body content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: This is the page content..\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "This is the page content.",
              "example": "This is the page content."
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "string",
              "required": false,
              "description": "Page properties as simple JSON key:value pairs (for database rows). Example: {\"Status\":\"In Progress\",\"Priority\":\"High\"}",
              "helpText": "What this field is: The Notion database property values for the page or row.\nHow to fill it: Enter structured data in { } brackets. Use exact Notion column names, including capital letters and spaces.\nExample: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Due Date\":\"2026-06-01\"}.\nTip: Copy column names from the Notion database header. \"Status\" and \"status\" are different.",
              "placeholder": "{\"Status\":\"Done\",\"Count\":3}",
              "example": "{\"Status\":\"Done\",\"Count\":3}"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "json",
              "required": false,
              "description": "Optional filter for database queries/search",
              "helpText": "What this field is: A filter that limits which Notion database rows are returned.\nHow to fill it: Enter a Notion filter as structured data in { } brackets. Leave blank to return all rows allowed by the limit.\nExample: {\"property\":\"Status\",\"select\":{\"equals\":\"In Progress\"}}.\nTip: Build the filter around the exact Notion property name.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Notion data with create after a related upstream event is received",
            "inputValues": {
              "Api Key": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "Access Token": "your-oauth-access-token",
              "Resource": "page",
              "Page Id": "page-id",
              "Database Id": "database-id"
            },
            "expectedOutput": "Notion returns structured create data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.notion.com/reference/intro"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update using the Notion node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Notion API key (required for authentication)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Notion OAuth access token (alternative to API key)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Notion resource: page, database, block, user, comment, search",
              "helpText": "What this field is: The Notion resource type to work with.\nOptions: page, database, block, user, comment, search.\nExample: page to read/write Notion pages, database to query a Notion database.\nTip: The resource determines which Notion API endpoint is called.",
              "placeholder": "page",
              "example": "page",
              "defaultValue": "page"
            },
            {
              "name": "Page Id",
              "internalKey": "pageId",
              "type": "string",
              "required": false,
              "description": "Notion Page ID (for get, update, archive, restore)",
              "helpText": "What this field is: The unique ID of the Notion page you want to read, update, archive, or restore.\nWhere to find it: Open the page in Notion and copy the link. The page ID is the 32-character code near the end of the URL, before any ? character.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: Use {{$json.pageId}} if an earlier Notion step returned the page ID.",
              "placeholder": "page-id",
              "example": "page-id"
            },
            {
              "name": "Database Id",
              "internalKey": "databaseId",
              "type": "string",
              "required": false,
              "description": "Notion Database ID (for query, get, or creating a page as a database row)",
              "helpText": "What this field is: The unique ID of the Notion database you want to query or add rows to.\nWhere to find it: Open the database in Notion and copy the link. The database ID is the 32-character code before ?v=.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nImportant: Share the database with your Notion integration from the Notion page menu: ... -> Connections -> add your integration.\nTip: Use {{$json.databaseId}} from a previous step when available.",
              "placeholder": "database-id",
              "example": "database-id"
            },
            {
              "name": "Parent Page Id",
              "internalKey": "parentPageId",
              "type": "string",
              "required": false,
              "description": "Parent Page ID — where the new page will be created (required for page › create and database › create)",
              "helpText": "What this field is: The Notion page or database where the new page will be created.\nWhere to find it: Open the parent page or database in Notion and copy the ID from its URL.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: For database rows, use the database ID as the parent.",
              "placeholder": "parent-page-id",
              "example": "parent-page-id"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Page or database title (plain text)",
              "helpText": "What this field is: Page or database title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Page.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "My Page",
              "example": "My Page"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Page body content (plain text — added as a paragraph block)",
              "helpText": "What this field is: Page body content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: This is the page content..\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "This is the page content.",
              "example": "This is the page content."
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "string",
              "required": false,
              "description": "Page properties as simple JSON key:value pairs (for database rows). Example: {\"Status\":\"In Progress\",\"Priority\":\"High\"}",
              "helpText": "What this field is: The Notion database property values for the page or row.\nHow to fill it: Enter structured data in { } brackets. Use exact Notion column names, including capital letters and spaces.\nExample: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Due Date\":\"2026-06-01\"}.\nTip: Copy column names from the Notion database header. \"Status\" and \"status\" are different.",
              "placeholder": "{\"Status\":\"Done\",\"Count\":3}",
              "example": "{\"Status\":\"Done\",\"Count\":3}"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "json",
              "required": false,
              "description": "Optional filter for database queries/search",
              "helpText": "What this field is: A filter that limits which Notion database rows are returned.\nHow to fill it: Enter a Notion filter as structured data in { } brackets. Leave blank to return all rows allowed by the limit.\nExample: {\"property\":\"Status\",\"select\":{\"equals\":\"In Progress\"}}.\nTip: Build the filter around the exact Notion property name.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Notion data with update after a related upstream event is received",
            "inputValues": {
              "Api Key": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "Access Token": "your-oauth-access-token",
              "Resource": "page",
              "Page Id": "page-id",
              "Database Id": "database-id"
            },
            "expectedOutput": "Notion returns structured update data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.notion.com/reference/intro"
        },
        {
          "name": "Delete",
          "value": "delete",
          "description": "Delete using the Notion node.",
          "fields": [
            {
              "name": "Api Key",
              "internalKey": "apiKey",
              "type": "password",
              "required": false,
              "description": "Notion API key (required for authentication)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "example": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "notes": "Stored and displayed as a masked credential value."
            },
            {
              "name": "Access Token",
              "internalKey": "accessToken",
              "type": "string",
              "required": false,
              "description": "Notion OAuth access token (alternative to API key)",
              "helpText": "What this field is: Notion integration token, a secret password that lets CtrlChecks talk to Notion safely.\nWhere to find it: notion.so/my-integrations -> your integration -> Configuration -> Internal Integration Token.\nHow to fill it: Store this secret in CtrlChecks Connections when possible. Paste it here only when this field is explicitly asking for the token.\nExample: secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.\nImportant: Treat this like a bank password. Share each page or database with the integration before running the node.",
              "placeholder": "your-oauth-access-token",
              "example": "your-oauth-access-token"
            },
            {
              "name": "Resource",
              "internalKey": "resource",
              "type": "string",
              "required": true,
              "description": "Notion resource: page, database, block, user, comment, search",
              "helpText": "What this field is: The Notion resource type to work with.\nOptions: page, database, block, user, comment, search.\nExample: page to read/write Notion pages, database to query a Notion database.\nTip: The resource determines which Notion API endpoint is called.",
              "placeholder": "page",
              "example": "page",
              "defaultValue": "page"
            },
            {
              "name": "Page Id",
              "internalKey": "pageId",
              "type": "string",
              "required": false,
              "description": "Notion Page ID (for get, update, archive, restore)",
              "helpText": "What this field is: The unique ID of the Notion page you want to read, update, archive, or restore.\nWhere to find it: Open the page in Notion and copy the link. The page ID is the 32-character code near the end of the URL, before any ? character.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: Use {{$json.pageId}} if an earlier Notion step returned the page ID.",
              "placeholder": "page-id",
              "example": "page-id"
            },
            {
              "name": "Database Id",
              "internalKey": "databaseId",
              "type": "string",
              "required": false,
              "description": "Notion Database ID (for query, get, or creating a page as a database row)",
              "helpText": "What this field is: The unique ID of the Notion database you want to query or add rows to.\nWhere to find it: Open the database in Notion and copy the link. The database ID is the 32-character code before ?v=.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nImportant: Share the database with your Notion integration from the Notion page menu: ... -> Connections -> add your integration.\nTip: Use {{$json.databaseId}} from a previous step when available.",
              "placeholder": "database-id",
              "example": "database-id"
            },
            {
              "name": "Parent Page Id",
              "internalKey": "parentPageId",
              "type": "string",
              "required": false,
              "description": "Parent Page ID — where the new page will be created (required for page › create and database › create)",
              "helpText": "What this field is: The Notion page or database where the new page will be created.\nWhere to find it: Open the parent page or database in Notion and copy the ID from its URL.\nExample: a1b2c3d4e5f67890abcd1234567890ab.\nTip: For database rows, use the database ID as the parent.",
              "placeholder": "parent-page-id",
              "example": "parent-page-id"
            },
            {
              "name": "Title",
              "internalKey": "title",
              "type": "string",
              "required": false,
              "description": "Page or database title (plain text)",
              "helpText": "What this field is: Page or database title.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: My Page.\nTip: Use {{$json.title}} when this value comes from an earlier step.",
              "placeholder": "My Page",
              "example": "My Page"
            },
            {
              "name": "Content",
              "internalKey": "content",
              "type": "textarea",
              "required": false,
              "description": "Page body content (plain text — added as a paragraph block)",
              "helpText": "What this field is: Page body content.\nHow to fill it: Type the text to send or save. You can include values from earlier workflow steps.\nExample: This is the page content..\nTip: Use {{$json.content}} when this value comes from an earlier step.",
              "placeholder": "This is the page content.",
              "example": "This is the page content."
            },
            {
              "name": "Properties",
              "internalKey": "properties",
              "type": "string",
              "required": false,
              "description": "Page properties as simple JSON key:value pairs (for database rows). Example: {\"Status\":\"In Progress\",\"Priority\":\"High\"}",
              "helpText": "What this field is: The Notion database property values for the page or row.\nHow to fill it: Enter structured data in { } brackets. Use exact Notion column names, including capital letters and spaces.\nExample: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Due Date\":\"2026-06-01\"}.\nTip: Copy column names from the Notion database header. \"Status\" and \"status\" are different.",
              "placeholder": "{\"Status\":\"Done\",\"Count\":3}",
              "example": "{\"Status\":\"Done\",\"Count\":3}"
            },
            {
              "name": "Filter",
              "internalKey": "filter",
              "type": "json",
              "required": false,
              "description": "Optional filter for database queries/search",
              "helpText": "What this field is: A filter that limits which Notion database rows are returned.\nHow to fill it: Enter a Notion filter as structured data in { } brackets. Leave blank to return all rows allowed by the limit.\nExample: {\"property\":\"Status\",\"select\":{\"equals\":\"In Progress\"}}.\nTip: Build the filter around the exact Notion property name.",
              "placeholder": "{\"key\":\"value\"}",
              "example": "{\"key\":\"value\"}"
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
            "scenario": "Process incoming Notion data with delete after a related upstream event is received",
            "inputValues": {
              "Api Key": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "Access Token": "your-oauth-access-token",
              "Resource": "page",
              "Page Id": "page-id",
              "Database Id": "database-id"
            },
            "expectedOutput": "Notion returns structured delete data that downstream nodes can reference with {{$json.fieldName}}."
          },
          "externalDocsUrl": "https://developers.notion.com/reference/intro"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Notion node."
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
