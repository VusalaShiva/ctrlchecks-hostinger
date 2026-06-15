import type { DocsSearchIndexItem } from '../search-index';

export const setVariableSearchIndex = [
  {
    "type": "node",
    "title": "Set Variable",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable",
    "text": "Set Variable Set a variable with a name and value Use this node when a workflow needs set variable behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Set Variable: Configure",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable#operation-configure",
    "text": "Set Variable Configuration Configure Configure with the Set Variable node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Set Variable: Name",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable#operation-configure",
    "text": "Set Variable Configuration Configure Name name Variable name (must be a valid identifier)"
  },
  {
    "type": "field",
    "title": "Set Variable: Value",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable#operation-configure",
    "text": "Set Variable Configuration Configure Value value Variable value (supports template expressions like {{input.field}})"
  },
  {
    "type": "field",
    "title": "Set Variable: Values",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable#operation-configure",
    "text": "Set Variable Configuration Configure Values values Array of field assignments (legacy format)"
  },
  {
    "type": "field",
    "title": "Set Variable: Keep Source",
    "slug": "set_variable",
    "category": "Data",
    "href": "/docs/nodes/set_variable#operation-configure",
    "text": "Set Variable Configuration Configure Keep Source keepSource Keep original fields"
  }
] satisfies DocsSearchIndexItem[];
