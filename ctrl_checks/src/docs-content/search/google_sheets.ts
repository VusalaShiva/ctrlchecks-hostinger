import type { DocsSearchIndexItem } from '../search-index';

export const googleSheetsSearchIndex = [
  {
    "type": "node",
    "title": "Google Sheets",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets",
    "text": "Google Sheets Read, write, append, or update data in Google Sheets Use this node when a workflow needs google sheets behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Google Sheets: Read",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Read with the Google Sheets node using the configured input fields. read"
  },
  {
    "type": "field",
    "title": "Google Sheets: Spreadsheet Id",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Spreadsheet Id spreadsheetId Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Sheet Name",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Sheet Name sheetName Sheet name/tab (leave empty for first sheet)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Range",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Range range Cell range (e.g., A1:D100, leave empty for all used cells)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Output Format",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Output Format outputFormat Output format for read operations"
  },
  {
    "type": "field",
    "title": "Google Sheets: Values",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Values values Data to write/append (for write/append operations)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Data",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-read",
    "text": "Google Sheets Operations Read Data data Data object to write/append (alternative to values array)"
  },
  {
    "type": "operation",
    "title": "Google Sheets: Write",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Write with the Google Sheets node using the configured input fields. write"
  },
  {
    "type": "field",
    "title": "Google Sheets: Spreadsheet Id",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Spreadsheet Id spreadsheetId Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Sheet Name",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Sheet Name sheetName Sheet name/tab (leave empty for first sheet)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Range",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Range range Cell range (e.g., A1:D100, leave empty for all used cells)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Output Format",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Output Format outputFormat Output format for read operations"
  },
  {
    "type": "field",
    "title": "Google Sheets: Values",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Values values Data to write/append (for write/append operations)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Data",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-write",
    "text": "Google Sheets Operations Write Data data Data object to write/append (alternative to values array)"
  },
  {
    "type": "operation",
    "title": "Google Sheets: Append",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Append with the Google Sheets node using the configured input fields. append"
  },
  {
    "type": "field",
    "title": "Google Sheets: Spreadsheet Id",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Spreadsheet Id spreadsheetId Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Sheet Name",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Sheet Name sheetName Sheet name/tab (leave empty for first sheet)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Range",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Range range Cell range (e.g., A1:D100, leave empty for all used cells)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Output Format",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Output Format outputFormat Output format for read operations"
  },
  {
    "type": "field",
    "title": "Google Sheets: Values",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Values values Data to write/append (for write/append operations)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Data",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-append",
    "text": "Google Sheets Operations Append Data data Data object to write/append (alternative to values array)"
  },
  {
    "type": "operation",
    "title": "Google Sheets: Update",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Update with the Google Sheets node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Google Sheets: Spreadsheet Id",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Spreadsheet Id spreadsheetId Google Sheets spreadsheet ID (from URL: /d/SPREADSHEET_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Sheet Name",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Sheet Name sheetName Sheet name/tab (leave empty for first sheet)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Range",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Range range Cell range (e.g., A1:D100, leave empty for all used cells)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Output Format",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Output Format outputFormat Output format for read operations"
  },
  {
    "type": "field",
    "title": "Google Sheets: Values",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Values values Data to write/append (for write/append operations)"
  },
  {
    "type": "field",
    "title": "Google Sheets: Data",
    "slug": "google_sheets",
    "category": "Data",
    "href": "/docs/nodes/google_sheets#operation-update",
    "text": "Google Sheets Operations Update Data data Data object to write/append (alternative to values array)"
  }
] satisfies DocsSearchIndexItem[];
