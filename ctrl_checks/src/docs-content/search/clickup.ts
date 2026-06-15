import type { DocsSearchIndexItem } from '../search-index';

export const clickupSearchIndex = [
  {
    "type": "node",
    "title": "ClickUp",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup",
    "text": "ClickUp Create, read, and manage ClickUp tasks, lists, spaces, and workspaces. Use this node when a workflow needs clickup behavior with schema-driven inputs from the CtrlChecks node registry. Utility"
  },
  {
    "type": "operation",
    "title": "ClickUp: Create task",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Create task with the ClickUp node using the configured input fields. create_task"
  },
  {
    "type": "field",
    "title": "ClickUp: Api Key",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Api Key apiKey ClickUp API key (required for authentication)"
  },
  {
    "type": "field",
    "title": "ClickUp: Credential Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Credential Id credentialId Credential ID reference to stored ClickUp credentials"
  },
  {
    "type": "field",
    "title": "ClickUp: Workspace Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Workspace Id workspaceId ClickUp workspace (team) ID. Required for some workspace-scoped operations such as listing tasks across a space or team."
  },
  {
    "type": "field",
    "title": "ClickUp: Space Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Space Id spaceId ClickUp space ID. Used when operating on tasks scoped to a space (for example, get_tasks_space)."
  },
  {
    "type": "field",
    "title": "ClickUp: List Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task List Id listId ClickUp list ID. Required for list-scoped operations such as create_task or get_tasks_list."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Task Id taskId ClickUp task ID. Used when updating, deleting, or fetching a single task (or related entities like comments or time tracking)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Name",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Task Name taskName Name/title for a task when creating it (maps to ClickUp task name)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Description",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-create_task",
    "text": "ClickUp Operations Create task Task Description taskDescription Optional detailed markdown description for a task when creating or updating it."
  },
  {
    "type": "operation",
    "title": "ClickUp: Get tasks list",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Get tasks list with the ClickUp node using the configured input fields. get_tasks_list"
  },
  {
    "type": "field",
    "title": "ClickUp: Api Key",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Api Key apiKey ClickUp API key (required for authentication)"
  },
  {
    "type": "field",
    "title": "ClickUp: Credential Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Credential Id credentialId Credential ID reference to stored ClickUp credentials"
  },
  {
    "type": "field",
    "title": "ClickUp: Workspace Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Workspace Id workspaceId ClickUp workspace (team) ID. Required for some workspace-scoped operations such as listing tasks across a space or team."
  },
  {
    "type": "field",
    "title": "ClickUp: Space Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Space Id spaceId ClickUp space ID. Used when operating on tasks scoped to a space (for example, get_tasks_space)."
  },
  {
    "type": "field",
    "title": "ClickUp: List Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list List Id listId ClickUp list ID. Required for list-scoped operations such as create_task or get_tasks_list."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Task Id taskId ClickUp task ID. Used when updating, deleting, or fetching a single task (or related entities like comments or time tracking)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Name",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Task Name taskName Name/title for a task when creating it (maps to ClickUp task name)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Description",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_list",
    "text": "ClickUp Operations Get tasks list Task Description taskDescription Optional detailed markdown description for a task when creating or updating it."
  },
  {
    "type": "operation",
    "title": "ClickUp: Get tasks space",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Get tasks space with the ClickUp node using the configured input fields. get_tasks_space"
  },
  {
    "type": "field",
    "title": "ClickUp: Api Key",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Api Key apiKey ClickUp API key (required for authentication)"
  },
  {
    "type": "field",
    "title": "ClickUp: Credential Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Credential Id credentialId Credential ID reference to stored ClickUp credentials"
  },
  {
    "type": "field",
    "title": "ClickUp: Workspace Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Workspace Id workspaceId ClickUp workspace (team) ID. Required for some workspace-scoped operations such as listing tasks across a space or team."
  },
  {
    "type": "field",
    "title": "ClickUp: Space Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Space Id spaceId ClickUp space ID. Used when operating on tasks scoped to a space (for example, get_tasks_space)."
  },
  {
    "type": "field",
    "title": "ClickUp: List Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space List Id listId ClickUp list ID. Required for list-scoped operations such as create_task or get_tasks_list."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Id",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Task Id taskId ClickUp task ID. Used when updating, deleting, or fetching a single task (or related entities like comments or time tracking)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Name",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Task Name taskName Name/title for a task when creating it (maps to ClickUp task name)."
  },
  {
    "type": "field",
    "title": "ClickUp: Task Description",
    "slug": "clickup",
    "category": "Utility",
    "href": "/docs/nodes/clickup#operation-get_tasks_space",
    "text": "ClickUp Operations Get tasks space Task Description taskDescription Optional detailed markdown description for a task when creating or updating it."
  }
] satisfies DocsSearchIndexItem[];
