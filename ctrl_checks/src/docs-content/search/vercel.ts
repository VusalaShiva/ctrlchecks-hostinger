import type { DocsSearchIndexItem } from '../search-index';

export const vercelSearchIndex = [
  {
    "type": "node",
    "title": "Vercel",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel",
    "text": "Vercel Deploy projects and manage deployments on Vercel Use this node when a workflow needs vercel behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Vercel: Deploy Project",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-deploy",
    "text": "Vercel Operations Deploy Project Deploy Project with the Vercel node using the configured input fields. deploy"
  },
  {
    "type": "field",
    "title": "Vercel: Token",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-deploy",
    "text": "Vercel Operations Deploy Project Token token Vercel API token (Bearer token). Use credential selection or template syntax like {{$credentials.vercel.token}}"
  },
  {
    "type": "field",
    "title": "Vercel: Project Name",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-deploy",
    "text": "Vercel Operations Deploy Project Project Name projectName Vercel project name (required for deploy operation). Can use template syntax like {{$json.projectName}}"
  },
  {
    "type": "operation",
    "title": "Vercel: List Deployments",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-list_deployments",
    "text": "Vercel Operations List Deployments List Deployments with the Vercel node using the configured input fields. list_deployments"
  },
  {
    "type": "field",
    "title": "Vercel: Token",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-list_deployments",
    "text": "Vercel Operations List Deployments Token token Vercel API token (Bearer token). Use credential selection or template syntax like {{$credentials.vercel.token}}"
  },
  {
    "type": "field",
    "title": "Vercel: Project Name",
    "slug": "vercel",
    "category": "Data",
    "href": "/docs/nodes/vercel#operation-list_deployments",
    "text": "Vercel Operations List Deployments Project Name projectName Vercel project name (required for deploy operation). Can use template syntax like {{$json.projectName}}"
  }
] satisfies DocsSearchIndexItem[];
