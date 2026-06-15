import type { DocsSearchIndexItem } from '../search-index';

export const queuePushSearchIndex = [
  {
    "type": "node",
    "title": "Queue Push",
    "slug": "queue_push",
    "category": "Utility",
    "href": "/docs/nodes/queue_push",
    "text": "Queue Push Push a message to a queue Use this node when a workflow needs queue push behavior with schema-driven inputs from the CtrlChecks node registry. Utility"
  },
  {
    "type": "operation",
    "title": "Queue Push: Configure",
    "slug": "queue_push",
    "category": "Utility",
    "href": "/docs/nodes/queue_push#operation-configure",
    "text": "Queue Push Configuration Configure Configure with the Queue Push node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Queue Push: Queue Name",
    "slug": "queue_push",
    "category": "Utility",
    "href": "/docs/nodes/queue_push#operation-configure",
    "text": "Queue Push Configuration Configure Queue Name queueName Name of the queue"
  },
  {
    "type": "field",
    "title": "Queue Push: Message",
    "slug": "queue_push",
    "category": "Utility",
    "href": "/docs/nodes/queue_push#operation-configure",
    "text": "Queue Push Configuration Configure Message message Message to push (can be any JSON-serializable value)"
  },
  {
    "type": "field",
    "title": "Queue Push: Options",
    "slug": "queue_push",
    "category": "Utility",
    "href": "/docs/nodes/queue_push#operation-configure",
    "text": "Queue Push Configuration Configure Options options Additional Bull options (delay, priority, etc.)"
  }
] satisfies DocsSearchIndexItem[];
