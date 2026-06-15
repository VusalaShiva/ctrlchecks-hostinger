import type { DocsSearchIndexItem } from '../search-index';

export const ollamaSearchIndex = [
  {
    "type": "node",
    "title": "AI Chat (Gemini)",
    "slug": "ollama",
    "category": "AI",
    "href": "/docs/nodes/ollama",
    "text": "AI Chat (Gemini) AI chat completion using Gemini 3.5 Flash (default LLM) Use this node when a workflow needs ai chat (gemini) behavior with schema-driven inputs from the CtrlChecks node registry. AI"
  },
  {
    "type": "operation",
    "title": "AI Chat (Gemini): Configure",
    "slug": "ollama",
    "category": "AI",
    "href": "/docs/nodes/ollama#operation-configure",
    "text": "AI Chat (Gemini) Configuration Configure Configure with the AI Chat (Gemini) node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "AI Chat (Gemini): Prompt",
    "slug": "ollama",
    "category": "AI",
    "href": "/docs/nodes/ollama#operation-configure",
    "text": "AI Chat (Gemini) Configuration Configure Prompt prompt Prompt text"
  },
  {
    "type": "field",
    "title": "AI Chat (Gemini): Temperature",
    "slug": "ollama",
    "category": "AI",
    "href": "/docs/nodes/ollama#operation-configure",
    "text": "AI Chat (Gemini) Configuration Configure Temperature temperature Creativity (0.0 - 1.0)"
  }
] satisfies DocsSearchIndexItem[];
