import type { DocsSearchIndexItem } from '../search-index';

export const ifElseSearchIndex = [
  {
    "type": "node",
    "title": "If/Else",
    "slug": "if_else",
    "category": "Logic",
    "href": "/docs/nodes/if_else",
    "text": "If/Else Conditional branching based on true/false condition Use this node when a workflow needs if/else behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "If/Else: Configure",
    "slug": "if_else",
    "category": "Logic",
    "href": "/docs/nodes/if_else#operation-configure",
    "text": "If/Else Configuration Configure Configure with the If/Else node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "If/Else: Conditions",
    "slug": "if_else",
    "category": "Logic",
    "href": "/docs/nodes/if_else#operation-configure",
    "text": "If/Else Configuration Configure Conditions conditions Conditions to evaluate. Each condition should have: field (string), operator (equals|not_equals|greater_than|less_than|greater_than_or_equal|less_than_or_equal|contains|not_contains), value (string|number|boolean)"
  },
  {
    "type": "field",
    "title": "If/Else: Combine Operation",
    "slug": "if_else",
    "category": "Logic",
    "href": "/docs/nodes/if_else#operation-configure",
    "text": "If/Else Configuration Configure Combine Operation combineOperation How to combine conditions"
  }
] satisfies DocsSearchIndexItem[];
