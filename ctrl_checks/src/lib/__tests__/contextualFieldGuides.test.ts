import { describe, it, expect } from 'vitest';
import {
  buildOperationHelpFromOptions,
  buildResourceHelpFromOptions,
  buildContextualFieldHelp,
  shouldShowFieldForContext,
  type FieldGuideInput,
} from '../contextualFieldGuides';

// ── helpers ───────────────────────────────────────────────────────────────────

function base(overrides: Partial<FieldGuideInput> = {}): FieldGuideInput {
  return {
    nodeType: 'some_node',
    nodeLabel: 'SomeNode',
    fieldKey: 'someField',
    fieldLabel: 'Some Field',
    ...overrides,
  };
}

// ── buildOperationHelpFromOptions ─────────────────────────────────────────────

describe('buildOperationHelpFromOptions', () => {
  it('returns null when options is empty', () => {
    expect(buildOperationHelpFromOptions(base({ options: [] }))).toBeNull();
  });

  it('returns null when options is absent', () => {
    expect(buildOperationHelpFromOptions(base({ options: undefined }))).toBeNull();
  });

  it('contains "What this field is:" line with node label', () => {
    const result = buildOperationHelpFromOptions(
      base({
        nodeLabel: 'Slack',
        options: [{ label: 'Post Message', value: 'postMessage' }],
      }),
    );
    expect(result).toContain('What this field is: The Slack action');
  });

  it('contains "How to choose it:" line', () => {
    const result = buildOperationHelpFromOptions(
      base({
        options: [{ label: 'Create', value: 'create' }],
      }),
    );
    expect(result).toContain('How to choose it:');
  });

  it('lists all options in "Options:" line', () => {
    const result = buildOperationHelpFromOptions(
      base({
        options: [
          { label: 'Create', value: 'create' },
          { label: 'Update', value: 'update' },
        ],
      }),
    );
    expect(result).toContain('Create =');
    expect(result).toContain('Update =');
  });

  it('adds "Current selection:" line when config.operation matches an option', () => {
    const result = buildOperationHelpFromOptions(
      base({
        options: [{ label: 'Create', value: 'create' }],
        config: { operation: 'create' },
      }),
    );
    expect(result).toContain('Current selection: Create');
  });

  it('adds "Tip:" line when a current option is matched', () => {
    const result = buildOperationHelpFromOptions(
      base({
        options: [{ label: 'Create', value: 'create' }],
        config: { operation: 'create' },
      }),
    );
    expect(result).toContain('Tip:');
  });

  it('includes resource name in How-to-choose when resource field is present', () => {
    const result = buildOperationHelpFromOptions(
      base({
        nodeLabel: 'HubSpot',
        options: [{ label: 'Get', value: 'get' }],
        config: { resource: 'contact', operation: 'get' },
      }),
    );
    expect(result).toContain('Contact');
    expect(result).toContain('you chose');
  });

  it('prefers create/send option for the example when no current match', () => {
    const result = buildOperationHelpFromOptions(
      base({
        options: [
          { label: 'Get', value: 'get' },
          { label: 'Create', value: 'create' },
        ],
      }),
    );
    expect(result).toContain('Choose Create to');
  });
});

// ── buildResourceHelpFromOptions ──────────────────────────────────────────────

describe('buildResourceHelpFromOptions', () => {
  it('returns null when options is empty', () => {
    expect(buildResourceHelpFromOptions(base({ options: [] }))).toBeNull();
  });

  it('returns null when options is absent', () => {
    expect(buildResourceHelpFromOptions(base({ options: undefined }))).toBeNull();
  });

  it('starts with "What this field is: Resource chooses"', () => {
    const result = buildResourceHelpFromOptions(
      base({
        nodeLabel: 'HubSpot',
        options: [{ label: 'Contact', value: 'contact' }],
      }),
    );
    expect(result).toContain('What this field is: Resource chooses');
  });

  it('contains "How to choose it:" line', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Contact', value: 'contact' }],
      }),
    );
    expect(result).toContain('How to choose it:');
  });

  it('lists option descriptions in "Options:" line', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Contact', value: 'contact' }],
      }),
    );
    expect(result).toContain('Contact =');
  });

  it('adds "Current selection:" when config.resource matches', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Deal', value: 'deal' }],
        config: { resource: 'deal' },
      }),
    );
    expect(result).toContain('Current selection: Deal');
  });

  it('shows "Tip: Pick a resource first" when no current match', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Deal', value: 'deal' }],
      }),
    );
    expect(result).toContain('Pick a resource first');
  });

  it('describes contact as "people or customers"', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Contact', value: 'contact' }],
      }),
    );
    expect(result).toContain('people or customers');
  });

  it('describes deal as "sales opportunities"', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Deal', value: 'deal' }],
      }),
    );
    expect(result).toContain('sales opportunities');
  });

  it('describes ticket as "support requests"', () => {
    const result = buildResourceHelpFromOptions(
      base({
        options: [{ label: 'Ticket', value: 'ticket' }],
      }),
    );
    expect(result).toContain('support requests');
  });
});

// ── buildContextualFieldHelp — fallback ───────────────────────────────────────

describe('buildContextualFieldHelp — fallback help text', () => {
  it('returns non-generic fallbackHelpText as-is', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'email',
        fallbackHelpText: 'The email address of the recipient.',
      }),
    );
    expect(result).toBe('The email address of the recipient.');
  });
});

// ── buildContextualFieldHelp — resource / operation delegation ────────────────

describe('buildContextualFieldHelp — resource / operation keys', () => {
  it('delegates "resource" key to buildResourceHelpFromOptions', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'resource',
        options: [{ label: 'Contact', value: 'contact' }],
      }),
    );
    expect(result).toContain('Resource chooses the item type');
  });

  it('delegates "operation" key to buildOperationHelpFromOptions', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'operation',
        options: [{ label: 'Create', value: 'create' }],
      }),
    );
    expect(result).toContain('What this field is: The');
    expect(result).toContain('action this step will run');
  });

  it('returns null from "operation" delegation when no options', () => {
    const result = buildContextualFieldHelp(
      base({ fieldKey: 'operation', options: [] }),
    );
    expect(result).toBeNull();
  });
});

// ── buildContextualFieldHelp — HubSpot ───────────────────────────────────────

describe('buildContextualFieldHelp — hubspot', () => {
  it('returns hubspot properties guide for contact resource', () => {
    const result = buildContextualFieldHelp(
      base({
        nodeType: 'hubspot',
        fieldKey: 'properties',
        config: { resource: 'contact', operation: 'create' },
      }),
    );
    expect(result).toContain('HubSpot fields');
    expect(result).toContain('email');
  });

  it('returns deal example when resource is deal', () => {
    const result = buildContextualFieldHelp(
      base({
        nodeType: 'hubspot',
        fieldKey: 'properties',
        config: { resource: 'deal', operation: 'create' },
      }),
    );
    expect(result).toContain('dealname');
  });

  it('falls back to contact example when resource is unknown', () => {
    const result = buildContextualFieldHelp(
      base({
        nodeType: 'hubspot',
        fieldKey: 'properties',
        config: { operation: 'create' },
      }),
    );
    expect(result).toContain('email');
  });

  it('includes common-mistake advice', () => {
    const result = buildContextualFieldHelp(
      base({
        nodeType: 'hubspot',
        fieldKey: 'properties',
        config: { resource: 'contact' },
      }),
    );
    expect(result).toContain('Common mistake');
  });
});

// ── buildContextualFieldHelp — WhatsApp ──────────────────────────────────────

describe('buildContextualFieldHelp — whatsapp', () => {
  it('returns phone guide for "to" field on whatsapp', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'whatsapp', fieldKey: 'to' }),
    );
    expect(result).toContain('WhatsApp recipient');
    expect(result).toContain('country code');
  });

  it('returns phone guide for "to" field on whatsapp_cloud', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'whatsapp_cloud', fieldKey: 'to' }),
    );
    expect(result).toContain('WhatsApp recipient');
  });

  it('returns phone guide for a field containing "phone" in key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'whatsapp', fieldKey: 'phoneNumber' }),
    );
    expect(result).toContain('WhatsApp recipient');
  });

  it('returns contact-card guide for "contacts" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'whatsapp', fieldKey: 'contacts' }),
    );
    expect(result).toContain('contact card');
    expect(result).toContain('formatted_name');
  });
});

// ── buildContextualFieldHelp — Telegram ──────────────────────────────────────

describe('buildContextualFieldHelp — telegram', () => {
  it('returns chatId guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'chatId' }),
    );
    expect(result).toContain('ID of the Telegram chat');
    expect(result).toContain('@userinfobot');
  });

  it('returns message guide for "message" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'message' }),
    );
    expect(result).toContain('message text');
    expect(result).toContain('<b>bold</b>');
  });

  it('returns message guide for "text" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'text' }),
    );
    expect(result).toContain('message text');
  });

  it('returns messageType guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'messageType' }),
    );
    expect(result).toContain('type of Telegram message');
    expect(result).toContain('photo');
  });

  it('returns parseMode guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'parseMode' }),
    );
    expect(result).toContain('formatting tags');
    expect(result).toContain('HTML (recommended)');
  });

  it('returns mediaUrl guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'mediaUrl' }),
    );
    expect(result).toContain('public HTTPS URL');
    expect(result).toContain('localhost or private URLs will not work');
  });

  it('returns replyToMessageId guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'replyToMessageId' }),
    );
    expect(result).toContain('message ID of an existing message');
  });

  it('returns protectContent guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'protectContent' }),
    );
    expect(result).toContain('prevents recipients from forwarding');
  });

  it('returns caption guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'telegram', fieldKey: 'caption' }),
    );
    expect(result).toContain('caption text');
    expect(result).toContain('1,024 characters');
  });
});

// ── buildContextualFieldHelp — Discord ───────────────────────────────────────

describe('buildContextualFieldHelp — discord', () => {
  it('returns channelId guide for "channelId"', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'discord', fieldKey: 'channelId' }),
    );
    expect(result).toContain('unique ID of the Discord channel');
    expect(result).toContain('Developer Mode');
  });

  it('returns channelId guide for "channel_id"', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'discord_webhook', fieldKey: 'channel_id' }),
    );
    expect(result).toContain('unique ID of the Discord channel');
  });

  it('returns message guide for "content" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'discord', fieldKey: 'content' }),
    );
    expect(result).toContain('text content of the Discord message');
    expect(result).toContain('2,000 characters');
  });

  it('returns webhookUrl guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'discord_webhook', fieldKey: 'webhookUrl' }),
    );
    expect(result).toContain('webhook URL');
    expect(result).toContain('discord.com/api/webhooks');
  });
});

// ── buildContextualFieldHelp — HTTP ──────────────────────────────────────────

describe('buildContextualFieldHelp — http_request / http_post', () => {
  it('returns URL guide for http_request', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_request', fieldKey: 'url' }),
    );
    expect(result).toContain('full URL of the API endpoint');
    expect(result).toContain('https://');
  });

  it('returns URL guide for http_post', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_post', fieldKey: 'url' }),
    );
    expect(result).toContain('full URL of the API endpoint');
  });

  it('returns method guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_request', fieldKey: 'method' }),
    );
    expect(result).toContain('HTTP method');
    expect(result).toContain('GET');
    expect(result).toContain('POST');
    expect(result).toContain('DELETE');
  });

  it('returns query-params guide for "qs" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_request', fieldKey: 'qs' }),
    );
    expect(result).toContain('Query string parameters');
    expect(result).toContain('?key=value');
  });

  it('returns body guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_request', fieldKey: 'body' }),
    );
    expect(result).toContain('JSON data sent as the request body');
    expect(result).toContain('POST, PUT, or PATCH');
  });
});

// ── buildContextualFieldHelp — Notion ────────────────────────────────────────

describe('buildContextualFieldHelp — notion', () => {
  it('returns title guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'title' }),
    );
    expect(result).toContain('title of the Notion page');
    expect(result).toContain('plain text');
  });

  it('returns content guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'content' }),
    );
    expect(result).toContain('body text of the Notion page');
  });

  it('returns properties guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'properties' }),
    );
    expect(result).toContain('database column values');
    expect(result).toContain('case-sensitive');
  });

  it('returns filter guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'filter' }),
    );
    expect(result).toContain('narrow which Notion database pages');
  });

  it('returns pageId guide for "pageId" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'pageId' }),
    );
    expect(result).toContain('unique ID of a specific Notion page');
  });

  it('returns pageId guide for "page_id" field', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'notion', fieldKey: 'page_id' }),
    );
    expect(result).toContain('unique ID of a specific Notion page');
  });
});

// ── buildContextualFieldHelp — GitHub / GitLab / Bitbucket ───────────────────

describe('buildContextualFieldHelp — github / gitlab / bitbucket', () => {
  it('returns owner guide for github', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'owner' }),
    );
    expect(result).toContain('username or organization slug');
  });

  it('returns owner guide for gitlab', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'gitlab', fieldKey: 'owner' }),
    );
    expect(result).toContain('username or organization slug');
  });

  it('returns repo guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'repo' }),
    );
    expect(result).toContain('repository name only');
  });

  it('returns repo guide for "repository" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'repository' }),
    );
    expect(result).toContain('repository name only');
  });

  it('returns branch guide for github', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'branch' }),
    );
    expect(result).toContain('branch name to read from');
  });

  it('returns filepath guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'file_path' }),
    );
    expect(result).toContain('file path within the repository');
  });

  it('returns commitMessage guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'github', fieldKey: 'commitMessage' }),
    );
    expect(result).toContain('message that describes what changed');
  });
});

// ── buildContextualFieldHelp — Stripe ────────────────────────────────────────

describe('buildContextualFieldHelp — stripe', () => {
  it('returns amount guide with cents warning', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'stripe', fieldKey: 'amount' }),
    );
    expect(result).toContain('smallest currency unit');
    expect(result).toContain('cents');
  });

  it('returns currency guide with ISO 4217 note', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'stripe', fieldKey: 'currency' }),
    );
    expect(result).toContain('three-letter ISO 4217');
    expect(result).toContain('lowercase');
  });
});

// ── buildContextualFieldHelp — Airtable ──────────────────────────────────────

describe('buildContextualFieldHelp — airtable', () => {
  it('returns baseId guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'airtable', fieldKey: 'baseId' }),
    );
    expect(result).toContain('unique identifier of your Airtable Base');
    expect(result).toContain('"app"');
  });

  it('returns tableId guide for "table_name" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'airtable', fieldKey: 'table_name' }),
    );
    expect(result).toContain('specific Airtable table');
  });

  it('returns fields guide for "record" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'airtable', fieldKey: 'record' }),
    );
    expect(result).toContain('Airtable field values');
    expect(result).toContain('case-sensitive');
  });
});

// ── buildContextualFieldHelp — generic cross-node patterns ───────────────────

describe('buildContextualFieldHelp — generic patterns', () => {
  it('returns subject guide for "subject" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'gmail', fieldKey: 'subject' }),
    );
    expect(result).toContain('subject line');
    expect(result).toContain('60 characters');
  });

  it('returns amount guide for "price" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'paypal', fieldKey: 'price' }),
    );
    expect(result).toContain('Format: A number');
  });

  it('returns amount guide for "total" key', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'paypal', fieldKey: 'total' }),
    );
    expect(result).toContain('Format: A number');
  });

  it('returns generic currency guide for non-stripe node', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'paypal', fieldKey: 'currency' }),
    );
    expect(result).toContain('three-letter ISO 4217');
    expect(result).not.toContain('lowercase for Stripe');
  });

  it('returns branch guide for non-git node', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'deploy_node', fieldKey: 'branch' }),
    );
    expect(result).toContain('version control branch name');
  });

  it('returns timeout guide', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'http_request', fieldKey: 'timeout' }),
    );
    expect(result).toContain('milliseconds');
    expect(result).toContain('10000');
  });

  it('returns template guide for field key containing "template"', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'mailchimp', fieldKey: 'templateName' }),
    );
    expect(result).toContain('approved template');
  });

  it('returns id guide for field key containing "id"', () => {
    const result = buildContextualFieldHelp(
      base({ nodeType: 'salesforce', fieldKey: 'recordId' }),
    );
    expect(result).toContain('Where to find it:');
  });

  it('returns select guide when fieldType is "select" with options', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'status',
        fieldLabel: 'Status',
        fieldType: 'select',
        options: [{ label: 'Active', value: 'active' }],
      }),
    );
    expect(result).toContain('How to choose it:');
    expect(result).toContain('Available choices: Active (active)');
  });

  it('returns json guide when fieldType is "json"', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'payload',
        fieldLabel: 'Payload',
        fieldType: 'json',
      }),
    );
    expect(result).toContain('key-value pairs or valid JSON');
  });

  it('returns json guide when fieldType is "keyValue"', () => {
    const result = buildContextualFieldHelp(
      base({
        fieldKey: 'headers',
        fieldLabel: 'Headers',
        fieldType: 'keyValue',
      }),
    );
    expect(result).toContain('key-value pairs or valid JSON');
  });

  it('returns null for unknown field with no matching pattern', () => {
    const result = buildContextualFieldHelp(
      base({
        nodeType: 'unknown_node',
        fieldKey: 'somethingObscure',
        fieldLabel: 'Something Obscure',
      }),
    );
    expect(result).toBeNull();
  });
});

// ── shouldShowFieldForContext ─────────────────────────────────────────────────

describe('shouldShowFieldForContext', () => {
  it('returns true for any field on a non-hubspot non-whatsapp node', () => {
    expect(shouldShowFieldForContext('slack', 'message', {})).toBe(true);
    expect(shouldShowFieldForContext('gmail', 'to', {})).toBe(true);
  });

  it('hubspot create operation — shows properties field', () => {
    expect(shouldShowFieldForContext('hubspot', 'properties', { operation: 'create' })).toBe(true);
  });

  it('hubspot get operation — shows id field', () => {
    expect(shouldShowFieldForContext('hubspot', 'id', { operation: 'get' })).toBe(true);
  });

  it('hubspot get operation — hides properties field', () => {
    expect(shouldShowFieldForContext('hubspot', 'properties', { operation: 'get' })).toBe(false);
  });

  it('hubspot delete operation — hides properties field', () => {
    expect(shouldShowFieldForContext('hubspot', 'properties', { operation: 'delete' })).toBe(false);
  });

  it('hubspot unknown operation — falls back to create field list (shows properties)', () => {
    expect(shouldShowFieldForContext('hubspot', 'properties', { operation: 'unknownOp' })).toBe(true);
  });

  it('hubspot unknown operation — falls back to create field list (hides id)', () => {
    expect(shouldShowFieldForContext('hubspot', 'id', { operation: 'unknownOp' })).toBe(false);
  });

  it('whatsapp sendText — shows text field', () => {
    expect(shouldShowFieldForContext('whatsapp', 'text', { operation: 'sendText' })).toBe(true);
  });

  it('whatsapp sendText — hides mediaUrl field', () => {
    expect(shouldShowFieldForContext('whatsapp', 'mediaUrl', { operation: 'sendText' })).toBe(false);
  });

  it('whatsapp sendMedia — shows mediaUrl field', () => {
    expect(shouldShowFieldForContext('whatsapp', 'mediaUrl', { operation: 'sendMedia' })).toBe(true);
  });

  it('whatsapp markAsRead — hides to field', () => {
    expect(shouldShowFieldForContext('whatsapp', 'to', { operation: 'markAsRead' })).toBe(false);
  });

  it('whatsapp_cloud sendMedia — shows mediaUrl field', () => {
    expect(shouldShowFieldForContext('whatsapp_cloud', 'mediaUrl', { operation: 'sendMedia' })).toBe(true);
  });

  it('whatsapp unknown operation — falls back to sendText (shows text)', () => {
    expect(shouldShowFieldForContext('whatsapp', 'text', { operation: 'unknownOp' })).toBe(true);
  });

  it('whatsapp unknown operation — falls back to sendText (hides mediaUrl)', () => {
    expect(shouldShowFieldForContext('whatsapp', 'mediaUrl', { operation: 'unknownOp' })).toBe(false);
  });

  it('returns true when config is not provided', () => {
    expect(shouldShowFieldForContext('unknown_node', 'anyField')).toBe(true);
  });
});
