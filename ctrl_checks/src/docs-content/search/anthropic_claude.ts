import type { DocsSearchIndexItem } from '../search-index';

export const anthropicClaudeSearchIndex = [
  {
    "type": "node",
    "title": "Claude",
    "slug": "anthropic_claude",
    "category": "AI",
    "href": "/docs/nodes/anthropic_claude",
    "text": "Claude Anthropic Claude chat completion Use this node when a workflow needs claude behavior with schema-driven inputs from the CtrlChecks node registry. AI"
  },
  {
    "type": "operation",
    "title": "Claude: Configure",
    "slug": "anthropic_claude",
    "category": "AI",
    "href": "/docs/nodes/anthropic_claude#operation-configure",
    "text": "Claude Configuration Configure Configure with the Claude node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Claude: Model",
    "slug": "anthropic_claude",
    "category": "AI",
    "href": "/docs/nodes/anthropic_claude#operation-configure",
    "text": "Claude Configuration Configure Model model Model name"
  },
  {
    "type": "field",
    "title": "Claude: Messages",
    "slug": "anthropic_claude",
    "category": "AI",
    "href": "/docs/nodes/anthropic_claude#operation-configure",
    "text": "Claude Configuration Configure Messages messages Chat messages"
  },
  {
    "type": "field",
    "title": "Claude: Api Key",
    "slug": "anthropic_claude",
    "category": "AI",
    "href": "/docs/nodes/anthropic_claude#operation-configure",
    "text": "Claude Configuration Configure Api Key apiKey Anthropic API key (node-level, required for this node to run)"
  }
] satisfies DocsSearchIndexItem[];
