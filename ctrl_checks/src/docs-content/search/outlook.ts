import type { DocsSearchIndexItem } from '../search-index';

export const outlookSearchIndex = [
  {
    "type": "node",
    "title": "Outlook",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook",
    "text": "Outlook Send/receive emails via Microsoft Outlook API (OAuth) Use this node when a workflow needs outlook behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Outlook: Send",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Send with the Outlook node using the configured input fields. send"
  },
  {
    "type": "field",
    "title": "Outlook: To",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send To to Recipient email address (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Subject",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Body",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: From",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Outlook: Access Token",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Access Token accessToken OAuth2 Access Token for Outlook (if using OAuth authentication)"
  },
  {
    "type": "field",
    "title": "Outlook: Credential Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Credential Id credentialId ID of the stored credential to use"
  },
  {
    "type": "field",
    "title": "Outlook: Message Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Message Id messageId Outlook message ID (required for get operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Query",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Query query Outlook search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Outlook: Max Results",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-send",
    "text": "Outlook Operations Send Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Outlook: List",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List List with the Outlook node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Outlook: To",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List To to Recipient email address (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Subject",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Body",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: From",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Outlook: Access Token",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Access Token accessToken OAuth2 Access Token for Outlook (if using OAuth authentication)"
  },
  {
    "type": "field",
    "title": "Outlook: Credential Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Credential Id credentialId ID of the stored credential to use"
  },
  {
    "type": "field",
    "title": "Outlook: Message Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Message Id messageId Outlook message ID (required for get operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Query",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Query query Outlook search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Outlook: Max Results",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-list",
    "text": "Outlook Operations List Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Outlook: Get",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Get with the Outlook node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Outlook: To",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get To to Recipient email address (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Subject",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Body",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: From",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Outlook: Access Token",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Access Token accessToken OAuth2 Access Token for Outlook (if using OAuth authentication)"
  },
  {
    "type": "field",
    "title": "Outlook: Credential Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Credential Id credentialId ID of the stored credential to use"
  },
  {
    "type": "field",
    "title": "Outlook: Message Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Message Id messageId Outlook message ID (required for get operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Query",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Query query Outlook search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Outlook: Max Results",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-get",
    "text": "Outlook Operations Get Max Results maxResults Maximum number of results (for list/search)"
  },
  {
    "type": "operation",
    "title": "Outlook: Search",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Search with the Outlook node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Outlook: To",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search To to Recipient email address (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Subject",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Subject subject Email subject (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Body",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Body body Email body content (required for send operation)"
  },
  {
    "type": "field",
    "title": "Outlook: From",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search From from Sender email address (optional - uses OAuth account if not provided)"
  },
  {
    "type": "field",
    "title": "Outlook: Access Token",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Access Token accessToken OAuth2 Access Token for Outlook (if using OAuth authentication)"
  },
  {
    "type": "field",
    "title": "Outlook: Credential Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Credential Id credentialId ID of the stored credential to use"
  },
  {
    "type": "field",
    "title": "Outlook: Message Id",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Message Id messageId Outlook message ID (required for get operation)"
  },
  {
    "type": "field",
    "title": "Outlook: Query",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Query query Outlook search query (for list/search operations)"
  },
  {
    "type": "field",
    "title": "Outlook: Max Results",
    "slug": "outlook",
    "category": "Communication",
    "href": "/docs/nodes/outlook#operation-search",
    "text": "Outlook Operations Search Max Results maxResults Maximum number of results (for list/search)"
  }
] satisfies DocsSearchIndexItem[];
