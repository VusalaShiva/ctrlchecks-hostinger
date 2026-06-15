import type { DocsSearchIndexItem } from '../search-index';

export const databaseReadSearchIndex = [
  {
    "type": "node",
    "title": "Database Read",
    "slug": "database_read",
    "category": "Data",
    "href": "/docs/nodes/database_read",
    "text": "Database Read Read data from database using SQL queries Use this node when a workflow needs database read behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Database Read: Configure",
    "slug": "database_read",
    "category": "Data",
    "href": "/docs/nodes/database_read#operation-configure",
    "text": "Database Read Configuration Configure Configure with the Database Read node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Database Read: Query",
    "slug": "database_read",
    "category": "Data",
    "href": "/docs/nodes/database_read#operation-configure",
    "text": "Database Read Configuration Configure Query query SELECT query"
  },
  {
    "type": "field",
    "title": "Database Read: Connection String",
    "slug": "database_read",
    "category": "Data",
    "href": "/docs/nodes/database_read#operation-configure",
    "text": "Database Read Configuration Configure Connection String connectionString Database connection string (PostgreSQL). If omitted, uses DATABASE_URL from environment."
  },
  {
    "type": "field",
    "title": "Database Read: Parameters",
    "slug": "database_read",
    "category": "Data",
    "href": "/docs/nodes/database_read#operation-configure",
    "text": "Database Read Configuration Configure Parameters parameters Query parameters"
  }
] satisfies DocsSearchIndexItem[];
