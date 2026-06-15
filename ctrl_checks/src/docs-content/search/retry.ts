import type { DocsSearchIndexItem } from '../search-index';

export const retrySearchIndex = [
  {
    "type": "node",
    "title": "Retry",
    "slug": "retry",
    "category": "Logic",
    "href": "/docs/nodes/retry",
    "text": "Retry Retries a branch on failure up to a maximum number of attempts Use this node when a workflow needs retry behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Retry: Configure",
    "slug": "retry",
    "category": "Logic",
    "href": "/docs/nodes/retry#operation-configure",
    "text": "Retry Configuration Configure Configure with the Retry node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Retry: Max Attempts",
    "slug": "retry",
    "category": "Logic",
    "href": "/docs/nodes/retry#operation-configure",
    "text": "Retry Configuration Configure Max Attempts maxAttempts Maximum number of retry attempts"
  },
  {
    "type": "field",
    "title": "Retry: Delay Between",
    "slug": "retry",
    "category": "Logic",
    "href": "/docs/nodes/retry#operation-configure",
    "text": "Retry Configuration Configure Delay Between delayBetween Delay between retries (in milliseconds)"
  },
  {
    "type": "field",
    "title": "Retry: Backoff",
    "slug": "retry",
    "category": "Logic",
    "href": "/docs/nodes/retry#operation-configure",
    "text": "Retry Configuration Configure Backoff backoff Backoff strategy (none, linear, exponential)"
  }
] satisfies DocsSearchIndexItem[];
