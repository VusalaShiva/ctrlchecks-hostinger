import type { DocsSearchIndexItem } from '../search-index';

export const cacheSetSearchIndex = [
  {
    "type": "node",
    "title": "Cache Set",
    "slug": "cache_set",
    "category": "Utility",
    "href": "/docs/nodes/cache_set",
    "text": "Cache Set Store a value in cache with optional TTL Use this node when a workflow needs cache set behavior with schema-driven inputs from the CtrlChecks node registry. Utility"
  },
  {
    "type": "operation",
    "title": "Cache Set: Configure",
    "slug": "cache_set",
    "category": "Utility",
    "href": "/docs/nodes/cache_set#operation-configure",
    "text": "Cache Set Configuration Configure Configure with the Cache Set node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Cache Set: Key",
    "slug": "cache_set",
    "category": "Utility",
    "href": "/docs/nodes/cache_set#operation-configure",
    "text": "Cache Set Configuration Configure Key key Cache key"
  },
  {
    "type": "field",
    "title": "Cache Set: Value",
    "slug": "cache_set",
    "category": "Utility",
    "href": "/docs/nodes/cache_set#operation-configure",
    "text": "Cache Set Configuration Configure Value value Value to store (will be JSON stringified)"
  },
  {
    "type": "field",
    "title": "Cache Set: Ttl",
    "slug": "cache_set",
    "category": "Utility",
    "href": "/docs/nodes/cache_set#operation-configure",
    "text": "Cache Set Configuration Configure Ttl ttl Time-to-live in seconds (0 = no expiration)"
  }
] satisfies DocsSearchIndexItem[];
