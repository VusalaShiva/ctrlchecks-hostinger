import type { DocsSearchIndexItem } from '../search-index';

export const notionSearchIndex = [
  {
    "type": "node",
    "title": "Notion",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion",
    "text": "Notion Read, write, update, or delete pages, databases, and blocks in Notion Use this node when a workflow needs notion behavior with schema-driven inputs from the CtrlChecks node registry. Data"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Page Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Page List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Page Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Page Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Page Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Page Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Page Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Page Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Page List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Page Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Page Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Page Search Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Database Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Database List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Database Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Database Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Database Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Database Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Database Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Database Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Database List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Database Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Database Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Database Search Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Block Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Block List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Block Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Block Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Block Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Block Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Block Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Block Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Block List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Block Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Block Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Block Search Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion User Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion User List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion User Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion User Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion User Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion User Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion User Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion User Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion User List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion User Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion User Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion User Search Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Comment Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Comment List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Comment Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Comment Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Comment Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Comment Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Comment Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Comment Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Comment List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Comment Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Comment Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Comment Search Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Get with the Notion node using the configured input fields. get"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-get",
    "text": "Notion Search Get Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List List with the Notion node using the configured input fields. list"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-list",
    "text": "Notion Search List Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Create",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Create with the Notion node using the configured input fields. create"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-create",
    "text": "Notion Search Create Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Update",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Update with the Notion node using the configured input fields. update"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-update",
    "text": "Notion Search Update Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Archive",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Archive with the Notion node using the configured input fields. archive"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-archive",
    "text": "Notion Search Archive Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Restore",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Restore with the Notion node using the configured input fields. restore"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-restore",
    "text": "Notion Search Restore Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Query with the Notion node using the configured input fields. query"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-query",
    "text": "Notion Search Query Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Append Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Append Children with the Notion node using the configured input fields. appendChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-appendChildren",
    "text": "Notion Search Append Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: List Children",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children List Children with the Notion node using the configured input fields. listChildren"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-listChildren",
    "text": "Notion Search List Children Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Delete",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Delete with the Notion node using the configured input fields. delete"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-delete",
    "text": "Notion Search Delete Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Get Me",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Get Me with the Notion node using the configured input fields. getMe"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-getMe",
    "text": "Notion Search Get Me Page Size pageSize Results per page (1–100)"
  },
  {
    "type": "operation",
    "title": "Notion: Search",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Search with the Notion node using the configured input fields. search"
  },
  {
    "type": "field",
    "title": "Notion: Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Page Id pageId Notion Page ID"
  },
  {
    "type": "field",
    "title": "Notion: Database Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Database Id databaseId Notion Database ID"
  },
  {
    "type": "field",
    "title": "Notion: Parent Page Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Parent Page Id parentPageId Parent Page ID (for creating pages or databases inside a page)"
  },
  {
    "type": "field",
    "title": "Notion: Block Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Block Id blockId Notion Block ID"
  },
  {
    "type": "field",
    "title": "Notion: User Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search User Id userId Notion User ID"
  },
  {
    "type": "field",
    "title": "Notion: Title",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Title title Page title or database title (plain text — no JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Content",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Content content Page body / block text content (plain text)"
  },
  {
    "type": "field",
    "title": "Notion: Block Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Block Type blockType Block type for create/append: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, toggle, divider"
  },
  {
    "type": "field",
    "title": "Notion: Code Language",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Code Language codeLanguage Programming language for code blocks (e.g. javascript, python)"
  },
  {
    "type": "field",
    "title": "Notion: Properties",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Properties properties Page properties as simple JSON. Example: {\"Status\":\"In Progress\",\"Priority\":\"High\",\"Count\":3,\"Done\":false}. Use \"Field__type\" for explicit types: {\"Tags__multi_select\":\"Design,Frontend\"}. No Notion API format required."
  },
  {
    "type": "field",
    "title": "Notion: Filter Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Filter Property filterProperty Database filter: property name (e.g. \"Status\")"
  },
  {
    "type": "field",
    "title": "Notion: Filter Type",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Filter Type filterType Database filter: property type (text, number, checkbox, select, multi_select, date, status)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Condition",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Filter Condition filterCondition Database filter: condition (equals, contains, starts_with, greater_than, etc.)"
  },
  {
    "type": "field",
    "title": "Notion: Filter Value",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Filter Value filterValue Database filter: value to match"
  },
  {
    "type": "field",
    "title": "Notion: Sort Property",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Sort Property sortProperty Sort results by this property name (e.g. \"Created\")"
  },
  {
    "type": "field",
    "title": "Notion: Sort Direction",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Sort Direction sortDirection Sort direction"
  },
  {
    "type": "field",
    "title": "Notion: Comment",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Comment comment Comment text (plain text — no rich text JSON needed)"
  },
  {
    "type": "field",
    "title": "Notion: Parent Discussion Id",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Parent Discussion Id parentDiscussionId Parent Discussion ID (for inline comments on a discussion thread)"
  },
  {
    "type": "field",
    "title": "Notion: Search Query",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Search Query searchQuery Search query text (leave empty to list all)"
  },
  {
    "type": "field",
    "title": "Notion: Search Filter",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Search Filter searchFilter Limit search to: page, database (leave empty for all)"
  },
  {
    "type": "field",
    "title": "Notion: Schema Json",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Schema Json schemaJson Database property schema as JSON. Example: {\"Name\":{\"title\":{}},\"Status\":{\"select\":{\"options\":[{\"name\":\"To Do\"},{\"name\":\"Done\"}]}},\"Count\":{\"number\":{}}}"
  },
  {
    "type": "field",
    "title": "Notion: Is Inline",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Is Inline isInline Create database inline inside a page (vs. full-page database)"
  },
  {
    "type": "field",
    "title": "Notion: Return All",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Return All returnAll Return all results (auto-paginate)"
  },
  {
    "type": "field",
    "title": "Notion: Page Size",
    "slug": "notion",
    "category": "Data",
    "href": "/docs/nodes/notion#operation-search",
    "text": "Notion Search Search Page Size pageSize Results per page (1–100)"
  }
] satisfies DocsSearchIndexItem[];
