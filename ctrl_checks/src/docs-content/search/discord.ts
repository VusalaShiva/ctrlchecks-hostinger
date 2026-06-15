import type { DocsSearchIndexItem } from '../search-index';

export const discordSearchIndex = [
  {
    "type": "node",
    "title": "Discord",
    "slug": "discord",
    "category": "Communication",
    "href": "/docs/nodes/discord",
    "text": "Discord Send messages to Discord channels or users via Discord Bot API Use this node when a workflow needs discord behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Discord: Configure",
    "slug": "discord",
    "category": "Communication",
    "href": "/docs/nodes/discord#operation-configure",
    "text": "Discord Configuration Configure Configure with the Discord node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Discord: Channel Id",
    "slug": "discord",
    "category": "Communication",
    "href": "/docs/nodes/discord#operation-configure",
    "text": "Discord Configuration Configure Channel Id channelId Discord channel ID"
  },
  {
    "type": "field",
    "title": "Discord: Message",
    "slug": "discord",
    "category": "Communication",
    "href": "/docs/nodes/discord#operation-configure",
    "text": "Discord Configuration Configure Message message Message text to send"
  },
  {
    "type": "field",
    "title": "Discord: Bot Token",
    "slug": "discord",
    "category": "Communication",
    "href": "/docs/nodes/discord#operation-configure",
    "text": "Discord Configuration Configure Bot Token botToken Discord bot token (stored as credential)"
  }
] satisfies DocsSearchIndexItem[];
