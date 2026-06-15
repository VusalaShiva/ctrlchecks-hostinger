import type { DocsSearchIndexItem } from '../search-index';

export const chatModelSearchIndex = [
  {
    "type": "node",
    "title": "Chat Model",
    "slug": "chat_model",
    "category": "AI",
    "href": "/docs/nodes/chat_model",
    "text": "Chat Model Chat model connector for AI Agent node (uses Gemini 3.5 Flash by default) Use this node when a workflow needs chat model behavior with schema-driven inputs from the CtrlChecks node registry. AI"
  },
  {
    "type": "operation",
    "title": "Chat Model: Configure",
    "slug": "chat_model",
    "category": "AI",
    "href": "/docs/nodes/chat_model#operation-configure",
    "text": "Chat Model Configuration Configure Configure with the Chat Model node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Chat Model: Temperature",
    "slug": "chat_model",
    "category": "AI",
    "href": "/docs/nodes/chat_model#operation-configure",
    "text": "Chat Model Configuration Configure Temperature temperature Creativity/temperature (0.0 - 1.0)"
  }
] satisfies DocsSearchIndexItem[];
