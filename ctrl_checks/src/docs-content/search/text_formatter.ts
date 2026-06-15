import type { DocsSearchIndexItem } from '../search-index';

export const textFormatterSearchIndex = [
  {
    "type": "node",
    "title": "Text Formatter",
    "slug": "text_formatter",
    "category": "Data",
    "href": "/docs/nodes/text_formatter",
    "text": "Text Formatter Format text strings with templates and placeholders Use this node when a workflow needs text formatter behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Text Formatter: Configure",
    "slug": "text_formatter",
    "category": "Data",
    "href": "/docs/nodes/text_formatter#operation-configure",
    "text": "Text Formatter Configuration Configure Configure with the Text Formatter node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Text Formatter: Template",
    "slug": "text_formatter",
    "category": "Data",
    "href": "/docs/nodes/text_formatter#operation-configure",
    "text": "Text Formatter Configuration Configure Template template Text template with placeholders (e.g., \"Hello {{name}}\")"
  },
  {
    "type": "field",
    "title": "Text Formatter: Values",
    "slug": "text_formatter",
    "category": "Data",
    "href": "/docs/nodes/text_formatter#operation-configure",
    "text": "Text Formatter Configuration Configure Values values Values to substitute in template (optional if using $json syntax)"
  }
] satisfies DocsSearchIndexItem[];
