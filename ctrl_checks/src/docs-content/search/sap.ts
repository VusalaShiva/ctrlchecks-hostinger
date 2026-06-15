import type { DocsSearchIndexItem } from '../search-index';

export const sapSearchIndex = [
  {
    "type": "node",
    "title": "SAP",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap",
    "text": "SAP Interact with SAP systems via OData/REST APIs — read and write business objects such as sales orders, purchase orders, materials, customers, and more. Use this node when a workflow needs sap behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "SAP: GET (Read)",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) GET (Read) with the SAP node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "SAP: Endpoint",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Endpoint endpoint OData or REST endpoint path (relative to base URL)"
  },
  {
    "type": "field",
    "title": "SAP: Base Url",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Base Url baseUrl SAP system base URL (e.g. https://your-sap-host:44300)"
  },
  {
    "type": "field",
    "title": "SAP: Payload",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Payload payload Request body for POST/PUT/PATCH operations"
  },
  {
    "type": "field",
    "title": "SAP: Query Params",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Query Params queryParams OData query string parameters (e.g. $top=10&$filter=...)"
  },
  {
    "type": "field",
    "title": "SAP: Access Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Access Token accessToken OAuth2 / SAML bearer token for SAP authentication (stored as credential)"
  },
  {
    "type": "field",
    "title": "SAP: Username",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Username username SAP Basic Auth username (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Password",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Password password SAP Basic Auth password (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Csrf Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Csrf Token csrfToken X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)"
  },
  {
    "type": "field",
    "title": "SAP: Format",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-get",
    "text": "SAP Operations GET (Read) Format format Response format preference"
  },
  {
    "type": "operation",
    "title": "SAP: POST (Create)",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) POST (Create) with the SAP node using the configured input fields. post"
  },
  {
    "type": "field",
    "title": "SAP: Endpoint",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Endpoint endpoint OData or REST endpoint path (relative to base URL)"
  },
  {
    "type": "field",
    "title": "SAP: Base Url",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Base Url baseUrl SAP system base URL (e.g. https://your-sap-host:44300)"
  },
  {
    "type": "field",
    "title": "SAP: Payload",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Payload payload Request body for POST/PUT/PATCH operations"
  },
  {
    "type": "field",
    "title": "SAP: Query Params",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Query Params queryParams OData query string parameters (e.g. $top=10&$filter=...)"
  },
  {
    "type": "field",
    "title": "SAP: Access Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Access Token accessToken OAuth2 / SAML bearer token for SAP authentication (stored as credential)"
  },
  {
    "type": "field",
    "title": "SAP: Username",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Username username SAP Basic Auth username (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Password",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Password password SAP Basic Auth password (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Csrf Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Csrf Token csrfToken X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)"
  },
  {
    "type": "field",
    "title": "SAP: Format",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-post",
    "text": "SAP Operations POST (Create) Format format Response format preference"
  },
  {
    "type": "operation",
    "title": "SAP: PUT (Replace)",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) PUT (Replace) with the SAP node using the configured input fields. put"
  },
  {
    "type": "field",
    "title": "SAP: Endpoint",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Endpoint endpoint OData or REST endpoint path (relative to base URL)"
  },
  {
    "type": "field",
    "title": "SAP: Base Url",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Base Url baseUrl SAP system base URL (e.g. https://your-sap-host:44300)"
  },
  {
    "type": "field",
    "title": "SAP: Payload",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Payload payload Request body for POST/PUT/PATCH operations"
  },
  {
    "type": "field",
    "title": "SAP: Query Params",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Query Params queryParams OData query string parameters (e.g. $top=10&$filter=...)"
  },
  {
    "type": "field",
    "title": "SAP: Access Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Access Token accessToken OAuth2 / SAML bearer token for SAP authentication (stored as credential)"
  },
  {
    "type": "field",
    "title": "SAP: Username",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Username username SAP Basic Auth username (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Password",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Password password SAP Basic Auth password (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Csrf Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Csrf Token csrfToken X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)"
  },
  {
    "type": "field",
    "title": "SAP: Format",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-put",
    "text": "SAP Operations PUT (Replace) Format format Response format preference"
  },
  {
    "type": "operation",
    "title": "SAP: PATCH (Update)",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) PATCH (Update) with the SAP node using the configured input fields. patch"
  },
  {
    "type": "field",
    "title": "SAP: Endpoint",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Endpoint endpoint OData or REST endpoint path (relative to base URL)"
  },
  {
    "type": "field",
    "title": "SAP: Base Url",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Base Url baseUrl SAP system base URL (e.g. https://your-sap-host:44300)"
  },
  {
    "type": "field",
    "title": "SAP: Payload",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Payload payload Request body for POST/PUT/PATCH operations"
  },
  {
    "type": "field",
    "title": "SAP: Query Params",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Query Params queryParams OData query string parameters (e.g. $top=10&$filter=...)"
  },
  {
    "type": "field",
    "title": "SAP: Access Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Access Token accessToken OAuth2 / SAML bearer token for SAP authentication (stored as credential)"
  },
  {
    "type": "field",
    "title": "SAP: Username",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Username username SAP Basic Auth username (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Password",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Password password SAP Basic Auth password (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Csrf Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Csrf Token csrfToken X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)"
  },
  {
    "type": "field",
    "title": "SAP: Format",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-patch",
    "text": "SAP Operations PATCH (Update) Format format Response format preference"
  },
  {
    "type": "operation",
    "title": "SAP: DELETE (Remove)",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) DELETE (Remove) with the SAP node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "SAP: Endpoint",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Endpoint endpoint OData or REST endpoint path (relative to base URL)"
  },
  {
    "type": "field",
    "title": "SAP: Base Url",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Base Url baseUrl SAP system base URL (e.g. https://your-sap-host:44300)"
  },
  {
    "type": "field",
    "title": "SAP: Payload",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Payload payload Request body for POST/PUT/PATCH operations"
  },
  {
    "type": "field",
    "title": "SAP: Query Params",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Query Params queryParams OData query string parameters (e.g. $top=10&$filter=...)"
  },
  {
    "type": "field",
    "title": "SAP: Access Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Access Token accessToken OAuth2 / SAML bearer token for SAP authentication (stored as credential)"
  },
  {
    "type": "field",
    "title": "SAP: Username",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Username username SAP Basic Auth username (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Password",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Password password SAP Basic Auth password (used when no OAuth token is provided)"
  },
  {
    "type": "field",
    "title": "SAP: Csrf Token",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Csrf Token csrfToken X-CSRF-Token value (required for POST/PUT/PATCH/DELETE on OData v2 services)"
  },
  {
    "type": "field",
    "title": "SAP: Format",
    "slug": "sap",
    "category": "Data",
    "href": "/docs/nodes/sap#operation-delete",
    "text": "SAP Operations DELETE (Remove) Format format Response format preference"
  }
] satisfies DocsSearchIndexItem[];
