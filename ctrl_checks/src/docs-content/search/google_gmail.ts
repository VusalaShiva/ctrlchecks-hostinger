import type { DocsSearchIndexItem } from '../search-index';

export const googleGmailSearchIndex = [
  {
    "type": "node",
    "title": "Gmail",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail",
    "text": "Gmail Send/receive emails via Gmail API (OAuth) Use this node when a workflow needs gmail behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Gmail: Send",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Send with the Gmail node using the configured input fields. send"
  },
  {
    "type": "field",
    "title": "Gmail: Credential Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Credential Id credentialId Stored credential reference (optional; OAuth handled via Connections)"
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Source",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Recipient Source recipientSource How recipients are chosen when sending. Manual: type addresses in Recipient emails. Extract from sheet: runtime uses upstream row data first (typically from a Google Sheets node before Gmail). If upstream has no usable emails, optional inline spreadsheet ID + sheet/range on this node fetches via Google Sheets API (same Google account as Gmail). Precedence: upstream wins; inline fetch is only a fallback."
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Emails",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Recipient Emails recipientEmails Recipient email address(es), comma- or newline-separated (e.g. a@x.com, b@y.com). Active when Recipient source is Manual entry. If Extract from sheet is selected, this field is optional — the workflow supplies emails from upstream nodes."
  },
  {
    "type": "field",
    "title": "Gmail: Spreadsheet Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Spreadsheet Id spreadsheetId Optional fallback Spreadsheet ID — active when Recipient source is Extract from sheet and upstream data has no usable recipient rows. Leave empty if a Google Sheets node upstream already supplies rows."
  },
  {
    "type": "field",
    "title": "Gmail: Sheet Name",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Sheet Name sheetName Sheet tab name for optional inline fallback read (default Sheet1). Ignored unless Spreadsheet ID is set."
  },
  {
    "type": "field",
    "title": "Gmail: Range",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Range range Optional A1 range within the sheet for inline fallback (e.g. A2:D500). Empty reads the whole tab. Same format as the Google Sheets node."
  },
  {
    "type": "field",
    "title": "Gmail: Use Ai Recipient Mapping",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Use Ai Recipient Mapping useAiRecipientMapping When enabled, scan every cell in row objects for email addresses (not only columns named like \"email\"). Use when column headers are messy; still applies after upstream data or inline sheet fetch."
  },
  {
    "type": "field",
    "title": "Gmail: Subject",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: Body",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: From",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Gmail: Message Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Message Id messageId Gmail message ID (required ONLY for get operation, not for send)"
  },
  {
    "type": "field",
    "title": "Gmail: Query",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Query query Gmail search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Gmail: Max Results",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-send",
    "text": "Gmail Operations Send Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Gmail: List",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List List with the Gmail node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Gmail: Credential Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Credential Id credentialId Stored credential reference (optional; OAuth handled via Connections)"
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Source",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Recipient Source recipientSource How recipients are chosen when sending. Manual: type addresses in Recipient emails. Extract from sheet: runtime uses upstream row data first (typically from a Google Sheets node before Gmail). If upstream has no usable emails, optional inline spreadsheet ID + sheet/range on this node fetches via Google Sheets API (same Google account as Gmail). Precedence: upstream wins; inline fetch is only a fallback."
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Emails",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Recipient Emails recipientEmails Recipient email address(es), comma- or newline-separated (e.g. a@x.com, b@y.com). Active when Recipient source is Manual entry. If Extract from sheet is selected, this field is optional — the workflow supplies emails from upstream nodes."
  },
  {
    "type": "field",
    "title": "Gmail: Spreadsheet Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Spreadsheet Id spreadsheetId Optional fallback Spreadsheet ID — active when Recipient source is Extract from sheet and upstream data has no usable recipient rows. Leave empty if a Google Sheets node upstream already supplies rows."
  },
  {
    "type": "field",
    "title": "Gmail: Sheet Name",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Sheet Name sheetName Sheet tab name for optional inline fallback read (default Sheet1). Ignored unless Spreadsheet ID is set."
  },
  {
    "type": "field",
    "title": "Gmail: Range",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Range range Optional A1 range within the sheet for inline fallback (e.g. A2:D500). Empty reads the whole tab. Same format as the Google Sheets node."
  },
  {
    "type": "field",
    "title": "Gmail: Use Ai Recipient Mapping",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Use Ai Recipient Mapping useAiRecipientMapping When enabled, scan every cell in row objects for email addresses (not only columns named like \"email\"). Use when column headers are messy; still applies after upstream data or inline sheet fetch."
  },
  {
    "type": "field",
    "title": "Gmail: Subject",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: Body",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: From",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Gmail: Message Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Message Id messageId Gmail message ID (required ONLY for get operation, not for send)"
  },
  {
    "type": "field",
    "title": "Gmail: Query",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Query query Gmail search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Gmail: Max Results",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-list",
    "text": "Gmail Operations List Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Gmail: Get",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Get with the Gmail node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Gmail: Credential Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Credential Id credentialId Stored credential reference (optional; OAuth handled via Connections)"
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Source",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Recipient Source recipientSource How recipients are chosen when sending. Manual: type addresses in Recipient emails. Extract from sheet: runtime uses upstream row data first (typically from a Google Sheets node before Gmail). If upstream has no usable emails, optional inline spreadsheet ID + sheet/range on this node fetches via Google Sheets API (same Google account as Gmail). Precedence: upstream wins; inline fetch is only a fallback."
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Emails",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Recipient Emails recipientEmails Recipient email address(es), comma- or newline-separated (e.g. a@x.com, b@y.com). Active when Recipient source is Manual entry. If Extract from sheet is selected, this field is optional — the workflow supplies emails from upstream nodes."
  },
  {
    "type": "field",
    "title": "Gmail: Spreadsheet Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Spreadsheet Id spreadsheetId Optional fallback Spreadsheet ID — active when Recipient source is Extract from sheet and upstream data has no usable recipient rows. Leave empty if a Google Sheets node upstream already supplies rows."
  },
  {
    "type": "field",
    "title": "Gmail: Sheet Name",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Sheet Name sheetName Sheet tab name for optional inline fallback read (default Sheet1). Ignored unless Spreadsheet ID is set."
  },
  {
    "type": "field",
    "title": "Gmail: Range",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Range range Optional A1 range within the sheet for inline fallback (e.g. A2:D500). Empty reads the whole tab. Same format as the Google Sheets node."
  },
  {
    "type": "field",
    "title": "Gmail: Use Ai Recipient Mapping",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Use Ai Recipient Mapping useAiRecipientMapping When enabled, scan every cell in row objects for email addresses (not only columns named like \"email\"). Use when column headers are messy; still applies after upstream data or inline sheet fetch."
  },
  {
    "type": "field",
    "title": "Gmail: Subject",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: Body",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: From",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Gmail: Message Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Message Id messageId Gmail message ID (required ONLY for get operation, not for send)"
  },
  {
    "type": "field",
    "title": "Gmail: Query",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Query query Gmail search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Gmail: Max Results",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-get",
    "text": "Gmail Operations Get Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Gmail: Search",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Search with the Gmail node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Gmail: Credential Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Credential Id credentialId Stored credential reference (optional; OAuth handled via Connections)"
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Source",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Recipient Source recipientSource How recipients are chosen when sending. Manual: type addresses in Recipient emails. Extract from sheet: runtime uses upstream row data first (typically from a Google Sheets node before Gmail). If upstream has no usable emails, optional inline spreadsheet ID + sheet/range on this node fetches via Google Sheets API (same Google account as Gmail). Precedence: upstream wins; inline fetch is only a fallback."
  },
  {
    "type": "field",
    "title": "Gmail: Recipient Emails",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Recipient Emails recipientEmails Recipient email address(es), comma- or newline-separated (e.g. a@x.com, b@y.com). Active when Recipient source is Manual entry. If Extract from sheet is selected, this field is optional — the workflow supplies emails from upstream nodes."
  },
  {
    "type": "field",
    "title": "Gmail: Spreadsheet Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Spreadsheet Id spreadsheetId Optional fallback Spreadsheet ID — active when Recipient source is Extract from sheet and upstream data has no usable recipient rows. Leave empty if a Google Sheets node upstream already supplies rows."
  },
  {
    "type": "field",
    "title": "Gmail: Sheet Name",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Sheet Name sheetName Sheet tab name for optional inline fallback read (default Sheet1). Ignored unless Spreadsheet ID is set."
  },
  {
    "type": "field",
    "title": "Gmail: Range",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Range range Optional A1 range within the sheet for inline fallback (e.g. A2:D500). Empty reads the whole tab. Same format as the Google Sheets node."
  },
  {
    "type": "field",
    "title": "Gmail: Use Ai Recipient Mapping",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Use Ai Recipient Mapping useAiRecipientMapping When enabled, scan every cell in row objects for email addresses (not only columns named like \"email\"). Use when column headers are messy; still applies after upstream data or inline sheet fetch."
  },
  {
    "type": "field",
    "title": "Gmail: Subject",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: Body",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Gmail: From",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Gmail: Message Id",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Message Id messageId Gmail message ID (required ONLY for get operation, not for send)"
  },
  {
    "type": "field",
    "title": "Gmail: Query",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Query query Gmail search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Gmail: Max Results",
    "slug": "google_gmail",
    "category": "Communication",
    "href": "/docs/nodes/google_gmail#operation-search",
    "text": "Gmail Operations Search Max Results maxResults Maximum number of results (for list/search)"
  }
] satisfies DocsSearchIndexItem[];
