import type { DocsSearchIndexItem } from '../search-index';

export const workflowTriggerSearchIndex = [
  {
    "type": "node",
    "title": "Workflow Trigger",
    "slug": "workflow_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/workflow_trigger",
    "text": "Workflow Trigger Trigger workflow from another workflow Use this node when a workflow needs workflow trigger behavior with schema-driven inputs from the CtrlChecks node registry. Triggers"
  },
  {
    "type": "operation",
    "title": "Workflow Trigger: Configure",
    "slug": "workflow_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/workflow_trigger#operation-configure",
    "text": "Workflow Trigger Configuration Configure Configure with the Workflow Trigger node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Workflow Trigger: Source Workflow Id",
    "slug": "workflow_trigger",
    "category": "Triggers",
    "href": "/docs/nodes/workflow_trigger#operation-configure",
    "text": "Workflow Trigger Configuration Configure Source Workflow Id source_workflow_id ID of the workflow that is allowed to trigger this workflow"
  }
] satisfies DocsSearchIndexItem[];
