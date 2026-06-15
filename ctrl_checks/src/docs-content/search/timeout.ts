import type { DocsSearchIndexItem } from '../search-index';

export const timeoutSearchIndex = [
  {
    "type": "node",
    "title": "Timeout",
    "slug": "timeout",
    "category": "Logic",
    "href": "/docs/nodes/timeout",
    "text": "Timeout Fails the workflow if execution takes longer than specified time Use this node when a workflow needs timeout behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Timeout: Configure",
    "slug": "timeout",
    "category": "Logic",
    "href": "/docs/nodes/timeout#operation-configure",
    "text": "Timeout Configuration Configure Configure with the Timeout node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Timeout: Limit",
    "slug": "timeout",
    "category": "Logic",
    "href": "/docs/nodes/timeout#operation-configure",
    "text": "Timeout Configuration Configure Limit limit Maximum allowed time (in milliseconds)"
  }
] satisfies DocsSearchIndexItem[];
