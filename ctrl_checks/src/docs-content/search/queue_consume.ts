import type { DocsSearchIndexItem } from '../search-index';

export const queueConsumeSearchIndex = [
  {
    "type": "node",
    "title": "Queue Consume",
    "slug": "queue_consume",
    "category": "Utility",
    "href": "/docs/nodes/queue_consume",
    "text": "Queue Consume Consume a message from a queue (waits for next message) Use this node when a workflow needs queue consume behavior with schema-driven inputs from the CtrlChecks node registry. Utility"
  },
  {
    "type": "operation",
    "title": "Queue Consume: Configure",
    "slug": "queue_consume",
    "category": "Utility",
    "href": "/docs/nodes/queue_consume#operation-configure",
    "text": "Queue Consume Configuration Configure Configure with the Queue Consume node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Queue Consume: Queue Name",
    "slug": "queue_consume",
    "category": "Utility",
    "href": "/docs/nodes/queue_consume#operation-configure",
    "text": "Queue Consume Configuration Configure Queue Name queueName Name of the queue"
  },
  {
    "type": "field",
    "title": "Queue Consume: Timeout",
    "slug": "queue_consume",
    "category": "Utility",
    "href": "/docs/nodes/queue_consume#operation-configure",
    "text": "Queue Consume Configuration Configure Timeout timeout Maximum wait time in milliseconds (0 = infinite)"
  },
  {
    "type": "field",
    "title": "Queue Consume: Auto Ack",
    "slug": "queue_consume",
    "category": "Utility",
    "href": "/docs/nodes/queue_consume#operation-configure",
    "text": "Queue Consume Configuration Configure Auto Ack autoAck Automatically acknowledge message after processing"
  }
] satisfies DocsSearchIndexItem[];
