import type { DocsSearchIndexItem } from '../search-index';

export const xmlSearchIndex = [
  {
    "type": "node",
    "title": "XML",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml",
    "text": "XML Parse and manipulate XML content Use this node when a workflow needs xml behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "XML: Parse",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-parse",
    "text": "XML Operations Parse Parse with the XML node using the configured input fields. parse"
  },
  {
    "type": "field",
    "title": "XML: Xml",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-parse",
    "text": "XML Operations Parse Xml xml XML content"
  },
  {
    "type": "field",
    "title": "XML: Path",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-parse",
    "text": "XML Operations Parse Path path Dot path used by extract after XML is parsed, e.g. root.item.0.name."
  },
  {
    "type": "operation",
    "title": "XML: Extract",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-extract",
    "text": "XML Operations Extract Extract with the XML node using the configured input fields. extract"
  },
  {
    "type": "field",
    "title": "XML: Xml",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-extract",
    "text": "XML Operations Extract Xml xml XML content"
  },
  {
    "type": "field",
    "title": "XML: Path",
    "slug": "xml",
    "category": "Data",
    "href": "/docs/nodes/xml#operation-extract",
    "text": "XML Operations Extract Path path Dot path used by extract after XML is parsed, e.g. root.item.0.name."
  }
] satisfies DocsSearchIndexItem[];
