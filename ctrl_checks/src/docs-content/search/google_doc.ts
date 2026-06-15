import type { DocsSearchIndexItem } from '../search-index';

export const googleDocSearchIndex = [
  {
    "type": "node",
    "title": "Google Docs",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc",
    "text": "Google Docs Read or write content in Google Docs documents Use this node when a workflow needs google docs behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Google Docs: Read",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-read",
    "text": "Google Docs Operations Read Read with the Google Docs node using the configured input fields. read"
  },
  {
    "type": "field",
    "title": "Google Docs: Document Id",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-read",
    "text": "Google Docs Operations Read Document Id documentId Google Docs document ID (extract from URL: /d/DOCUMENT_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Docs: Document Url",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-read",
    "text": "Google Docs Operations Read Document Url documentUrl Full Google Docs URL (alternative to documentId)"
  },
  {
    "type": "field",
    "title": "Google Docs: Content",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-read",
    "text": "Google Docs Operations Read Content content Content to write (for write operations)"
  },
  {
    "type": "field",
    "title": "Google Docs: Format",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-read",
    "text": "Google Docs Operations Read Format format Output format for read operations"
  },
  {
    "type": "operation",
    "title": "Google Docs: Write",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-write",
    "text": "Google Docs Operations Write Write with the Google Docs node using the configured input fields. write"
  },
  {
    "type": "field",
    "title": "Google Docs: Document Id",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-write",
    "text": "Google Docs Operations Write Document Id documentId Google Docs document ID (extract from URL: /d/DOCUMENT_ID/edit)"
  },
  {
    "type": "field",
    "title": "Google Docs: Document Url",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-write",
    "text": "Google Docs Operations Write Document Url documentUrl Full Google Docs URL (alternative to documentId)"
  },
  {
    "type": "field",
    "title": "Google Docs: Content",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-write",
    "text": "Google Docs Operations Write Content content Content to write (for write operations)"
  },
  {
    "type": "field",
    "title": "Google Docs: Format",
    "slug": "google_doc",
    "category": "Data",
    "href": "/docs/nodes/google_doc#operation-write",
    "text": "Google Docs Operations Write Format format Output format for read operations"
  }
] satisfies DocsSearchIndexItem[];
