import type { DocsSearchIndexItem } from '../search-index';

export const postgresqlSearchIndex = [
  {
    "type": "node",
    "title": "PostgreSQL",
    "slug": "postgresql",
    "category": "Data",
    "href": "/docs/nodes/postgresql",
    "text": "PostgreSQL Execute SQL queries on PostgreSQL database Use this node when a workflow needs postgresql behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "PostgreSQL: Configure",
    "slug": "postgresql",
    "category": "Data",
    "href": "/docs/nodes/postgresql#operation-configure",
    "text": "PostgreSQL Configuration Configure Configure with the PostgreSQL node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "PostgreSQL: Query",
    "slug": "postgresql",
    "category": "Data",
    "href": "/docs/nodes/postgresql#operation-configure",
    "text": "PostgreSQL Configuration Configure Query query SQL query to execute"
  },
  {
    "type": "field",
    "title": "PostgreSQL: Connection String",
    "slug": "postgresql",
    "category": "Data",
    "href": "/docs/nodes/postgresql#operation-configure",
    "text": "PostgreSQL Configuration Configure Connection String connectionString Database connection string (PostgreSQL). If omitted, uses DATABASE_URL from environment."
  },
  {
    "type": "field",
    "title": "PostgreSQL: Parameters",
    "slug": "postgresql",
    "category": "Data",
    "href": "/docs/nodes/postgresql#operation-configure",
    "text": "PostgreSQL Configuration Configure Parameters parameters Query parameters"
  }
] satisfies DocsSearchIndexItem[];
