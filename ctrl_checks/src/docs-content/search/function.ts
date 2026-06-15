import type { DocsSearchIndexItem } from '../search-index';

export const functionSearchIndex = [
  {
    "type": "node",
    "title": "Function",
    "slug": "function",
    "category": "Logic",
    "href": "/docs/nodes/function",
    "text": "Function Execute a custom function with input parameters Use this node when a workflow needs function behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Function: Configure",
    "slug": "function",
    "category": "Logic",
    "href": "/docs/nodes/function#operation-configure",
    "text": "Function Configuration Configure Configure with the Function node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Function: Description",
    "slug": "function",
    "category": "Logic",
    "href": "/docs/nodes/function#operation-configure",
    "text": "Function Configuration Configure Description description Description of what this function should do"
  },
  {
    "type": "field",
    "title": "Function: Code",
    "slug": "function",
    "category": "Logic",
    "href": "/docs/nodes/function#operation-configure",
    "text": "Function Configuration Configure Code code Optional JavaScript code for the function"
  },
  {
    "type": "field",
    "title": "Function: Timeout",
    "slug": "function",
    "category": "Logic",
    "href": "/docs/nodes/function#operation-configure",
    "text": "Function Configuration Configure Timeout timeout Execution timeout in milliseconds (max 30000)"
  }
] satisfies DocsSearchIndexItem[];
