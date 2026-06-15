import type { DocsSearchIndexItem } from '../search-index';

export const chatTriggerSearchIndex = [
  {
    "type": "node",
    "title": "Chat Trigger",
    "slug": "chat_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/chat_trigger",
    "text": "Chat Trigger Trigger workflow from chat/AI interactions Use this node when a workflow needs chat trigger behavior with schema-driven inputs from the CtrlChecks node registry. Triggers"
  },
  {
    "type": "operation",
    "title": "Chat Trigger: Configure",
    "slug": "chat_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/chat_trigger#operation-configure",
    "text": "Chat Trigger Configuration Configure Configure with the Chat Trigger node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Chat Trigger: Channel",
    "slug": "chat_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/chat_trigger#operation-configure",
    "text": "Chat Trigger Configuration Configure Channel channel Optional channel/context to filter incoming chat events"
  },
  {
    "type": "field",
    "title": "Chat Trigger: Allowed Senders",
    "slug": "chat_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/chat_trigger#operation-configure",
    "text": "Chat Trigger Configuration Configure Allowed Senders allowedSenders Optional allowlist of senders/usernames/IDs"
  },
  {
    "type": "field",
    "title": "Chat Trigger: Message",
    "slug": "chat_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/chat_trigger#operation-configure",
    "text": "Chat Trigger Configuration Configure Message message Incoming chat message"
  }
] satisfies DocsSearchIndexItem[];
