import type { DocsSearchIndexItem } from '../search-index';

export const noopSearchIndex = [
  {
    "type": "node",
    "title": "NoOp",
    "slug": "noop",
    "category": "Logic",
    "href": "/docs/nodes/noop",
    "text": "NoOp Pass through node - no operation Use this node when a workflow needs noop behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "NoOp: Configure",
    "slug": "noop",
    "category": "Logic",
    "href": "/docs/nodes/noop#operation-configure",
    "text": "NoOp Configuration Configure Configure with the NoOp node using the configured input fields. configure"
  }
] satisfies DocsSearchIndexItem[];
