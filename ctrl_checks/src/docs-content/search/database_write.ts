import type { DocsSearchIndexItem } from '../search-index';

export const databaseWriteSearchIndex = [
  {
    "type": "node",
    "title": "Database Write",
    "slug": "database_write",
    "category": "Data",
    "href": "/docs/nodes/database_write",
    "text": "Database Write Execute SQL queries on database (INSERT, UPDATE, DELETE) Use this node when a workflow needs database write behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Database Write: Configure",
    "slug": "database_write",
    "category": "Data",
    "href": "/docs/nodes/database_write#operation-configure",
    "text": "Database Write Configuration Configure Configure with the Database Write node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Database Write: Query",
    "slug": "database_write",
    "category": "Data",
    "href": "/docs/nodes/database_write#operation-configure",
    "text": "Database Write Configuration Configure Query query SQL query to execute"
  },
  {
    "type": "field",
    "title": "Database Write: Connection String",
    "slug": "database_write",
    "category": "Data",
    "href": "/docs/nodes/database_write#operation-configure",
    "text": "Database Write Configuration Configure Connection String connectionString Database connection string (PostgreSQL). If omitted, uses DATABASE_URL from environment."
  },
  {
    "type": "field",
    "title": "Database Write: Parameters",
    "slug": "database_write",
    "category": "Data",
    "href": "/docs/nodes/database_write#operation-configure",
    "text": "Database Write Configuration Configure Parameters parameters Query parameters"
  }
] satisfies DocsSearchIndexItem[];
