import type { DocsSearchIndexItem } from '../search-index';

export const csvSearchIndex = [
  {
    "type": "node",
    "title": "CSV",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv",
    "text": "CSV Parse and generate CSV data Use this node when a workflow needs csv behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "CSV: Parse",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-parse",
    "text": "CSV Operations Parse Parse with the CSV node using the configured input fields. parse"
  },
  {
    "type": "field",
    "title": "CSV: Csv",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-parse",
    "text": "CSV Operations Parse Csv csv CSV content (for parse)"
  },
  {
    "type": "field",
    "title": "CSV: Data",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-parse",
    "text": "CSV Operations Parse Data data Data array (for generate)"
  },
  {
    "type": "operation",
    "title": "CSV: Generate",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-generate",
    "text": "CSV Operations Generate Generate with the CSV node using the configured input fields. generate"
  },
  {
    "type": "field",
    "title": "CSV: Csv",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-generate",
    "text": "CSV Operations Generate Csv csv CSV content (for parse)"
  },
  {
    "type": "field",
    "title": "CSV: Data",
    "slug": "csv",
    "category": "Data",
    "href": "/docs/nodes/csv#operation-generate",
    "text": "CSV Operations Generate Data data Data array (for generate)"
  }
] satisfies DocsSearchIndexItem[];
