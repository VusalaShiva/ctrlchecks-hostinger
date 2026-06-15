import type { DocsSearchIndexItem } from '../search-index';

export const scheduleSearchIndex = [
  {
    "type": "node",
    "title": "Schedule Trigger",
    "slug": "schedule",
    "category": "Triggers",
    "href": "/docs/nodes/schedule",
    "text": "Schedule Trigger Executes workflow on a time-based schedule using cron expressions Use this node when a workflow needs schedule trigger behavior with schema-driven inputs from the CtrlChecks node registry. Triggers"
  },
  {
    "type": "operation",
    "title": "Schedule Trigger: Configure",
    "slug": "schedule",
    "category": "Triggers",
    "href": "/docs/nodes/schedule#operation-configure",
    "text": "Schedule Trigger Configuration Configure Configure with the Schedule Trigger node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Schedule Trigger: Cron",
    "slug": "schedule",
    "category": "Triggers",
    "href": "/docs/nodes/schedule#operation-configure",
    "text": "Schedule Trigger Configuration Configure Cron cron Cron expression (e.g., \"0 9 * * *\" for daily at 9 AM)"
  },
  {
    "type": "field",
    "title": "Schedule Trigger: Timezone",
    "slug": "schedule",
    "category": "Triggers",
    "href": "/docs/nodes/schedule#operation-configure",
    "text": "Schedule Trigger Configuration Configure Timezone timezone Timezone for schedule"
  }
] satisfies DocsSearchIndexItem[];
