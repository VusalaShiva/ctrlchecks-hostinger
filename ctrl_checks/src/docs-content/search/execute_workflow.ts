import type { DocsSearchIndexItem } from '../search-index';

export const executeWorkflowSearchIndex = [
  {
    "type": "node",
    "title": "Execute Workflow",
    "slug": "execute_workflow",
    "category": "Logic",
    "href": "/docs/nodes/execute_workflow",
    "text": "Execute Workflow Executes another workflow and returns its result Use this node when a workflow needs execute workflow behavior with schema-driven inputs from the CtrlChecks node registry. Logic"
  },
  {
    "type": "operation",
    "title": "Execute Workflow: Configure",
    "slug": "execute_workflow",
    "category": "Logic",
    "href": "/docs/nodes/execute_workflow#operation-configure",
    "text": "Execute Workflow Configuration Configure Configure with the Execute Workflow node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Execute Workflow: Workflow Id",
    "slug": "execute_workflow",
    "category": "Logic",
    "href": "/docs/nodes/execute_workflow#operation-configure",
    "text": "Execute Workflow Configuration Configure Workflow Id workflowId ID of the workflow to execute"
  },
  {
    "type": "field",
    "title": "Execute Workflow: Input",
    "slug": "execute_workflow",
    "category": "Logic",
    "href": "/docs/nodes/execute_workflow#operation-configure",
    "text": "Execute Workflow Configuration Configure Input input Input data to pass to the sub-workflow"
  },
  {
    "type": "field",
    "title": "Execute Workflow: Wait For Completion",
    "slug": "execute_workflow",
    "category": "Logic",
    "href": "/docs/nodes/execute_workflow#operation-configure",
    "text": "Execute Workflow Configuration Configure Wait For Completion waitForCompletion Wait for the sub-workflow to finish"
  }
] satisfies DocsSearchIndexItem[];
