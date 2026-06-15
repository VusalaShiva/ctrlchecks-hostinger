import type { DocsSearchIndexItem } from '../search-index';

export const switchSearchIndex = [
  {
    "type": "node",
    "title": "Switch",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch",
    "text": "Switch Multi-path conditional logic based on value matching Use this node when a workflow needs switch behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Switch: Configure",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch#operation-configure",
    "text": "Switch Configuration Configure Configure with the Switch node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Switch: Expression",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch#operation-configure",
    "text": "Switch Configuration Configure Expression expression Expression or template evaluated to a scalar (e.g. {{$json.status}}). Must match one of cases[].value."
  },
  {
    "type": "field",
    "title": "Switch: Cases",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch#operation-configure",
    "text": "Switch Configuration Configure Cases cases Case definitions; each value becomes an outgoing port name. Example: [{ value: \"active\", label: \"Active\" }]"
  },
  {
    "type": "field",
    "title": "Switch: Routing Type",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch#operation-configure",
    "text": "Switch Configuration Configure Routing Type routingType Optional hint: how expression is interpreted (e.g. expression, string, number)"
  },
  {
    "type": "field",
    "title": "Switch: Rules",
    "slug": "switch",
    "category": "Logic",
    "href": "/docs/nodes/switch#operation-configure",
    "text": "Switch Configuration Configure Rules rules Deprecated alias for cases; migrated automatically to cases"
  }
] satisfies DocsSearchIndexItem[];
