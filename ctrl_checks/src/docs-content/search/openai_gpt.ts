import type { DocsSearchIndexItem } from '../search-index';

export const openaiGptSearchIndex = [
  {
    "type": "node",
    "title": "OpenAI GPT",
    "slug": "openai_gpt",
    "category": "AI",
    "href": "/docs/nodes/openai_gpt",
    "text": "OpenAI GPT OpenAI GPT chat completion (GPT-4, GPT-3.5) Use this node when a workflow needs openai gpt behavior with schema-driven inputs from the CtrlChecks node registry. AI"
  },
  {
    "type": "operation",
    "title": "OpenAI GPT: Configure",
    "slug": "openai_gpt",
    "category": "AI",
    "href": "/docs/nodes/openai_gpt#operation-configure",
    "text": "OpenAI GPT Configuration Configure Configure with the OpenAI GPT node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "OpenAI GPT: Model",
    "slug": "openai_gpt",
    "category": "AI",
    "href": "/docs/nodes/openai_gpt#operation-configure",
    "text": "OpenAI GPT Configuration Configure Model model Model name"
  },
  {
    "type": "field",
    "title": "OpenAI GPT: Messages",
    "slug": "openai_gpt",
    "category": "AI",
    "href": "/docs/nodes/openai_gpt#operation-configure",
    "text": "OpenAI GPT Configuration Configure Messages messages Chat messages"
  },
  {
    "type": "field",
    "title": "OpenAI GPT: Api Key",
    "slug": "openai_gpt",
    "category": "AI",
    "href": "/docs/nodes/openai_gpt#operation-configure",
    "text": "OpenAI GPT Configuration Configure Api Key apiKey OpenAI API key (node-level, required for this node to run)"
  }
] satisfies DocsSearchIndexItem[];
