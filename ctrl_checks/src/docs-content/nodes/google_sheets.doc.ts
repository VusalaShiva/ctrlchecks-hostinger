import type { NodeDoc } from '../types';

export const googleSheetsDoc: NodeDoc = {
  "slug": "google_sheets",
  "displayName": "Google Sheets",
  "category": "Data",
  "logoUrl": "/icons/nodes/google_sheets.svg",
  "description": "Read, write, append, or update data in Google Sheets",
  "credentialType": "Google Sheets OAuth",
  "credentialSetupSteps": [
    "What this is: The Google Sheets connection lets CtrlChecks access your Google Sheets account safely without putting secrets in workflow fields.",
    "Where to start: Google Sheets account settings or developer settings.",
    "How to connect: In CtrlChecks, open Connections -> Add Connection -> Google Sheets, then sign in or paste the secret value requested there.",
    "Example: the token format shown by Google Sheets.",
    "Important: Treat tokens, passwords, API keys, and client secrets like bank passwords. Store them in Connections, not in regular workflow fields.",
    "Test it: Save the connection, run a simple Google Sheets step, and confirm CtrlChecks can reach the account."
  ],
  "credentialDocsUrl": "https://console.cloud.google.com/apis/credentials",
  "resources": [
    {
      "name": "Operations",
      "description": "Google Sheets exposes operation choices directly.",
      "operations": [
        {
          "name": "Read",
          "value": "read",
          "description": "Read rows from a Google Sheets spreadsheet.",
          "fields": [
            {
              "name": "Spreadsheet Id",
              "internalKey": "spreadsheetId",
              "type": "string",
              "required": true,
              "description": "Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)",
              "helpText": "What this field is: The unique file ID of your Google Sheet.\nWhere to find it: Open your Google Sheet in a browser. Look at the URL in the address bar:\n  https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit\nCopy the long text between /d/ and /edit.\nExample: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms\nTip: The ID stays the same even if you rename the file.",
              "placeholder": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "example": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            },
            {
              "name": "Sheet Name",
              "internalKey": "sheetName",
              "type": "string",
              "required": false,
              "description": "Sheet name/tab (leave empty for first sheet)",
              "helpText": "What this field is: The name of the tab (sheet) inside your spreadsheet.\nWhere to find it: Open the spreadsheet — look at the tabs at the bottom. Click the one you want and copy its name exactly.\nExample: Sheet1 or Customers or January 2025\nNote: The name is case-sensitive. \"sheet1\" and \"Sheet1\" are treated as different tabs.",
              "placeholder": "Sheet1",
              "example": "Sheet1"
            },
            {
              "name": "Range",
              "internalKey": "range",
              "type": "string",
              "required": false,
              "description": "Cell range (e.g., A1:D100, leave empty for all used cells)",
              "helpText": "What this field is: The cell range to read or write in the sheet.\nHow to fill it: Use A1 notation, which means column letters and row numbers.\nExample: A1:D100 reads columns A to D through row 100.\nTip: Use Sheet1!A:D when you want to include the tab name.",
              "placeholder": "A1:D100",
              "example": "A1:D100"
            },
            {
              "name": "Output Format",
              "internalKey": "outputFormat",
              "type": "string",
              "required": false,
              "description": "Output format for read operations",
              "helpText": "What this field is: Output format for read operations.\nHow to fill it: Type the value exactly as it should be sent to the service.\nExample: json.\nTip: Use {{$json.outputFormat}} when this value comes from an earlier step.",
              "placeholder": "json",
              "example": "json",
              "defaultValue": "json"
            }
          ],
          "outputExample": {
            "rows": [
              {
                "Name": "Alice",
                "Email": "alice@example.com",
                "Status": "Active"
              },
              {
                "Name": "Bob",
                "Email": "bob@example.com",
                "Status": "Inactive"
              }
            ],
            "count": 2
          },
          "outputDescription": "rows: Array of objects where each key is a column header and each value is the cell value. count: Total number of rows returned.",
          "usageExample": {
            "scenario": "Read a list of customers from a Google Sheet and send each a personalised email",
            "inputValues": {
              "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "sheetName": "Customers",
              "range": "A:D"
            },
            "expectedOutput": "Returns all rows as objects. Use a Loop node downstream to iterate over each row and pass `{{$json.Email}}` to Gmail."
          },
          "externalDocsUrl": "https://developers.google.com/sheets/api/reference/rest"
        },
        {
          "name": "Write",
          "value": "write",
          "description": "Write data to specific cells or a range in a Google Sheet.",
          "fields": [
            {
              "name": "Spreadsheet Id",
              "internalKey": "spreadsheetId",
              "type": "string",
              "required": true,
              "description": "Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)",
              "helpText": "What this field is: The unique file ID of your Google Sheet.\nWhere to find it: Open your Google Sheet in a browser. Look at the URL in the address bar:\n  https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit\nCopy the long text between /d/ and /edit.\nExample: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms\nTip: The ID stays the same even if you rename the file.",
              "placeholder": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "example": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            },
            {
              "name": "Sheet Name",
              "internalKey": "sheetName",
              "type": "string",
              "required": false,
              "description": "Sheet name/tab (leave empty for first sheet)",
              "helpText": "What this field is: The name of the tab (sheet) inside your spreadsheet.\nWhere to find it: Open the spreadsheet — look at the tabs at the bottom. Click the one you want and copy its name exactly.\nExample: Sheet1 or Customers or January 2025\nNote: The name is case-sensitive. \"sheet1\" and \"Sheet1\" are treated as different tabs.",
              "placeholder": "Sheet1",
              "example": "Sheet1"
            },
            {
              "name": "Range",
              "internalKey": "range",
              "type": "string",
              "required": true,
              "description": "Cell range (e.g., A1:D100, leave empty for all used cells)",
              "helpText": "What this field is: The cell range to read or write in the sheet.\nHow to fill it: Use A1 notation, which means column letters and row numbers.\nExample: A1:D100 reads columns A to D through row 100.\nTip: Use Sheet1!A:D when you want to include the tab name.",
              "placeholder": "A1:D100",
              "example": "A1:D100"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Data to write/append (for write/append operations)",
              "helpText": "What this field is: Structured data for Data to write/append.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Sheets.\nExample: [\"item\"].\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "updatedRange": "Sheet1!A2:C2",
            "updatedRows": 1,
            "updatedColumns": 3,
            "updatedCells": 3
          },
          "outputDescription": "updatedRange: The A1 notation of the range that was written. updatedRows / Columns / Cells: How many rows, columns, and cells were updated.",
          "usageExample": {
            "scenario": "Write form submission data to a Google Sheet",
            "inputValues": {
              "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "range": "Sheet1!A:C",
              "values": "[[\"{{$json.name}}\", \"{{$json.email}}\", \"{{$now}}\"]]"
            },
            "expectedOutput": "Row is written to the sheet. `{{$json.updatedRange}}` confirms where the data was placed."
          },
          "externalDocsUrl": "https://developers.google.com/sheets/api/reference/rest"
        },
        {
          "name": "Append",
          "value": "append",
          "description": "Append a new row to the end of a Google Sheet.",
          "fields": [
            {
              "name": "Spreadsheet Id",
              "internalKey": "spreadsheetId",
              "type": "string",
              "required": true,
              "description": "Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)",
              "helpText": "What this field is: The unique file ID of your Google Sheet.\nWhere to find it: Open your Google Sheet in a browser. Look at the URL in the address bar:\n  https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit\nCopy the long text between /d/ and /edit.\nExample: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms\nTip: The ID stays the same even if you rename the file.",
              "placeholder": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "example": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            },
            {
              "name": "Sheet Name",
              "internalKey": "sheetName",
              "type": "string",
              "required": false,
              "description": "Sheet name/tab (leave empty for first sheet)",
              "helpText": "What this field is: The name of the tab (sheet) inside your spreadsheet.\nWhere to find it: Open the spreadsheet — look at the tabs at the bottom. Click the one you want and copy its name exactly.\nExample: Sheet1 or Customers or January 2025\nNote: The name is case-sensitive. \"sheet1\" and \"Sheet1\" are treated as different tabs.",
              "placeholder": "Sheet1",
              "example": "Sheet1"
            },
            {
              "name": "Range",
              "internalKey": "range",
              "type": "string",
              "required": true,
              "description": "Cell range (e.g., A1:D100, leave empty for all used cells)",
              "helpText": "What this field is: The cell range to read or write in the sheet.\nHow to fill it: Use A1 notation, which means column letters and row numbers.\nExample: A1:D100 reads columns A to D through row 100.\nTip: Use Sheet1!A:D when you want to include the tab name.",
              "placeholder": "A1:D100",
              "example": "A1:D100"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Data to write/append (for write/append operations)",
              "helpText": "What this field is: Structured data for Data to write/append.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Sheets.\nExample: [\"item\"].\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "tableRange": "Sheet1!A1:C100",
            "updates": {
              "updatedRange": "Sheet1!A101:C101",
              "updatedRows": 1
            }
          },
          "outputDescription": "tableRange: The entire table range including the new row. updates.updatedRange: The specific range of the newly appended row.",
          "usageExample": {
            "scenario": "Append a new order row to a tracking spreadsheet each time a Shopify order is placed",
            "inputValues": {
              "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "sheetName": "Orders",
              "values": "[[\"{{$json.orderId}}\", \"{{$json.customerEmail}}\", \"{{$json.total}}\", \"{{$now}}\"]]"
            },
            "expectedOutput": "A new row is appended. `{{$json.updates.updatedRange}}` shows where it was placed."
          },
          "externalDocsUrl": "https://developers.google.com/sheets/api/reference/rest"
        },
        {
          "name": "Update",
          "value": "update",
          "description": "Update specific cells in an existing Google Sheet row.",
          "fields": [
            {
              "name": "Spreadsheet Id",
              "internalKey": "spreadsheetId",
              "type": "string",
              "required": true,
              "description": "Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)",
              "helpText": "What this field is: The unique file ID of your Google Sheet.\nWhere to find it: Open your Google Sheet in a browser. Look at the URL in the address bar:\n  https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit\nCopy the long text between /d/ and /edit.\nExample: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms\nTip: The ID stays the same even if you rename the file.",
              "placeholder": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "example": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            },
            {
              "name": "Sheet Name",
              "internalKey": "sheetName",
              "type": "string",
              "required": false,
              "description": "Sheet name/tab (leave empty for first sheet)",
              "helpText": "What this field is: The name of the tab (sheet) inside your spreadsheet.\nWhere to find it: Open the spreadsheet — look at the tabs at the bottom. Click the one you want and copy its name exactly.\nExample: Sheet1 or Customers or January 2025\nNote: The name is case-sensitive. \"sheet1\" and \"Sheet1\" are treated as different tabs.",
              "placeholder": "Sheet1",
              "example": "Sheet1"
            },
            {
              "name": "Range",
              "internalKey": "range",
              "type": "string",
              "required": true,
              "description": "Cell range (e.g., A1:D100, leave empty for all used cells)",
              "helpText": "What this field is: The cell range to read or write in the sheet.\nHow to fill it: Use A1 notation, which means column letters and row numbers.\nExample: A1:D100 reads columns A to D through row 100.\nTip: Use Sheet1!A:D when you want to include the tab name.",
              "placeholder": "A1:D100",
              "example": "A1:D100"
            },
            {
              "name": "Values",
              "internalKey": "values",
              "type": "json",
              "required": true,
              "description": "Data to write/append (for write/append operations)",
              "helpText": "What this field is: Structured data for Data to write/append.\nHow to fill it: Enter data in { } brackets for an object or [ ] brackets for a list. Use exact field names expected by Google Sheets.\nExample: [\"item\"].\nTip: Use {{$json.values}} when an earlier step already prepared this data.",
              "placeholder": "[\"item\"]",
              "example": "[\"item\"]"
            }
          ],
          "outputExample": {
            "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
            "updatedRange": "Sheet1!D5",
            "updatedCells": 1
          },
          "outputDescription": "updatedRange: The range that was updated. updatedCells: The number of cells that changed.",
          "usageExample": {
            "scenario": "Update the \"Status\" column of a row when an order is fulfilled",
            "inputValues": {
              "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
              "range": "Sheet1!D{{$json.rowNumber}}",
              "values": "[[\"Fulfilled\"]]"
            },
            "expectedOutput": "The specified cell is updated. Use `{{$json.updatedRange}}` to confirm."
          },
          "externalDocsUrl": "https://developers.google.com/sheets/api/reference/rest"
        }
      ]
    }
  ],
  "commonErrors": [
    {
      "error": "Authentication failed",
      "cause": "The saved credential, token, API key, or OAuth grant is missing, expired, or lacks the required scope.",
      "fix": "Reconnect the service in CtrlChecks → Connections, then re-run the Google Sheets node."
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
