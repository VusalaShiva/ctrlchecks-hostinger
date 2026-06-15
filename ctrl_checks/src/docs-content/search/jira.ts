import type { DocsSearchIndexItem } from '../search-index';

export const jiraSearchIndex = [
  {
    "type": "node",
    "title": "Jira",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira",
    "text": "Jira Jira issue tracking operations Use this node when a workflow needs jira behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Jira: Create",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Create with the Jira node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Jira: Base Url",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Base Url baseUrl Jira base URL (e.g., https://your-domain.atlassian.net)"
  },
  {
    "type": "field",
    "title": "Jira: Email",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Email email Jira account email (for basic auth with API token)"
  },
  {
    "type": "field",
    "title": "Jira: Api Token",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Api Token apiToken Jira API token (optional if stored in vault under key \"jira\")"
  },
  {
    "type": "field",
    "title": "Jira: Issue Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Issue Key issueKey Issue key (for read/update/delete)"
  },
  {
    "type": "field",
    "title": "Jira: Project Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Project Key projectKey Project key (create)"
  },
  {
    "type": "field",
    "title": "Jira: Summary",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Summary summary Issue summary/title (create)"
  },
  {
    "type": "field",
    "title": "Jira: Description Text",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Description Text descriptionText Issue description (create/update)"
  },
  {
    "type": "field",
    "title": "Jira: Issue Type",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-create",
    "text": "Jira Operations Create Issue Type issueType Issue type (default: Task)"
  },
  {
    "type": "operation",
    "title": "Jira: Read",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Read with the Jira node using the configured input fields. read"
  },
  {
    "type": "field",
    "title": "Jira: Base Url",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Base Url baseUrl Jira base URL (e.g., https://your-domain.atlassian.net)"
  },
  {
    "type": "field",
    "title": "Jira: Email",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Email email Jira account email (for basic auth with API token)"
  },
  {
    "type": "field",
    "title": "Jira: Api Token",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Api Token apiToken Jira API token (optional if stored in vault under key \"jira\")"
  },
  {
    "type": "field",
    "title": "Jira: Issue Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Issue Key issueKey Issue key (for read/update/delete)"
  },
  {
    "type": "field",
    "title": "Jira: Project Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Project Key projectKey Project key (create)"
  },
  {
    "type": "field",
    "title": "Jira: Summary",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Summary summary Issue summary/title (create)"
  },
  {
    "type": "field",
    "title": "Jira: Description Text",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Description Text descriptionText Issue description (create/update)"
  },
  {
    "type": "field",
    "title": "Jira: Issue Type",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-read",
    "text": "Jira Operations Read Issue Type issueType Issue type (default: Task)"
  },
  {
    "type": "operation",
    "title": "Jira: Update",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Update with the Jira node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Jira: Base Url",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Base Url baseUrl Jira base URL (e.g., https://your-domain.atlassian.net)"
  },
  {
    "type": "field",
    "title": "Jira: Email",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Email email Jira account email (for basic auth with API token)"
  },
  {
    "type": "field",
    "title": "Jira: Api Token",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Api Token apiToken Jira API token (optional if stored in vault under key \"jira\")"
  },
  {
    "type": "field",
    "title": "Jira: Issue Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Issue Key issueKey Issue key (for read/update/delete)"
  },
  {
    "type": "field",
    "title": "Jira: Project Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Project Key projectKey Project key (create)"
  },
  {
    "type": "field",
    "title": "Jira: Summary",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Summary summary Issue summary/title (create)"
  },
  {
    "type": "field",
    "title": "Jira: Description Text",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Description Text descriptionText Issue description (create/update)"
  },
  {
    "type": "field",
    "title": "Jira: Issue Type",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-update",
    "text": "Jira Operations Update Issue Type issueType Issue type (default: Task)"
  },
  {
    "type": "operation",
    "title": "Jira: Delete",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Delete with the Jira node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Jira: Base Url",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Base Url baseUrl Jira base URL (e.g., https://your-domain.atlassian.net)"
  },
  {
    "type": "field",
    "title": "Jira: Email",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Email email Jira account email (for basic auth with API token)"
  },
  {
    "type": "field",
    "title": "Jira: Api Token",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Api Token apiToken Jira API token (optional if stored in vault under key \"jira\")"
  },
  {
    "type": "field",
    "title": "Jira: Issue Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Issue Key issueKey Issue key (for read/update/delete)"
  },
  {
    "type": "field",
    "title": "Jira: Project Key",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Project Key projectKey Project key (create)"
  },
  {
    "type": "field",
    "title": "Jira: Summary",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Summary summary Issue summary/title (create)"
  },
  {
    "type": "field",
    "title": "Jira: Description Text",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Description Text descriptionText Issue description (create/update)"
  },
  {
    "type": "field",
    "title": "Jira: Issue Type",
    "slug": "jira",
    "category": "Data",
    "href": "/docs/nodes/jira#operation-delete",
    "text": "Jira Operations Delete Issue Type issueType Issue type (default: Task)"
  }
] satisfies DocsSearchIndexItem[];
