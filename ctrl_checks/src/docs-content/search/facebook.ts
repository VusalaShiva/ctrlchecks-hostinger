import type { DocsSearchIndexItem } from '../search-index';

export const facebookSearchIndex = [
  {
    "type": "node",
    "title": "Facebook",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook",
    "text": "Facebook Post content to Facebook pages Use this node when a workflow needs facebook behavior with schema-driven inputs from the CtrlChecks node registry. Communication"
  },
  {
    "type": "operation",
    "title": "Facebook: Configure",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook#operation-configure",
    "text": "Facebook Configuration Configure Configure with the Facebook node using the configured input fields. configure"
  },
  {
    "type": "field",
    "title": "Facebook: Message",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook#operation-configure",
    "text": "Facebook Configuration Configure Message message Post message"
  },
  {
    "type": "field",
    "title": "Facebook: Page Id",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook#operation-configure",
    "text": "Facebook Configuration Configure Page Id pageId Facebook page ID"
  },
  {
    "type": "field",
    "title": "Facebook: Access Token",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook#operation-configure",
    "text": "Facebook Configuration Configure Access Token accessToken OAuth2 Access Token for Facebook (if using OAuth authentication)"
  },
  {
    "type": "field",
    "title": "Facebook: Credential Id",
    "slug": "facebook",
    "category": "Communication",
    "href": "/docs/nodes/facebook#operation-configure",
    "text": "Facebook Configuration Configure Credential Id credentialId ID of the stored credential to use"
  }
] satisfies DocsSearchIndexItem[];
