import type { DocsSearchIndexItem } from '../search-index';

export const errorHandlerSearchIndex = [
  {
    "type": "node",
    "title": "Error Handler",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler",
    "text": "Error Handler Handle errors with retry logic and fallback values Use this node when a workflow needs error handler behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Error Handler: Configure",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler#operation-configure",
    "text": "Error Handler Configuration Configure Configure with the Error Handler node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Error Handler: Continue On Fail",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler#operation-configure",
    "text": "Error Handler Configuration Configure Continue On Fail continueOnFail Continue workflow after error"
  },
  {
    "type": "field",
    "title": "Error Handler: Retry On Fail",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler#operation-configure",
    "text": "Error Handler Configuration Configure Retry On Fail retryOnFail Retry failed node"
  },
  {
    "type": "field",
    "title": "Error Handler: Max Retries",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler#operation-configure",
    "text": "Error Handler Configuration Configure Max Retries maxRetries Maximum retry attempts"
  },
  {
    "type": "field",
    "title": "Error Handler: Retry Delay",
    "slug": "error_handler",
    "category": "Logic",
    "href": "/docs/nodes/error_handler#operation-configure",
    "text": "Error Handler Configuration Configure Retry Delay retryDelay Delay between retries (ms)"
  }
] satisfies DocsSearchIndexItem[];
