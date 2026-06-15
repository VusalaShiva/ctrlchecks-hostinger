import { describe, expect, it } from 'vitest';
import { buildContextualFieldHelp } from '../contextualFieldGuides';
import { isGenericHelpText } from '../field-help-utils';
import { resolveFieldHelp } from '../resolve-field-help-content';

const linkedinOptions = [
  { label: 'Get My Profile', value: 'get_profile' },
  { label: 'Create Post (Text)', value: 'create_post' },
  { label: 'Create Post (Article Link)', value: 'create_article' },
  { label: 'Create Post (Media)', value: 'create_post_media' },
  { label: 'Delete Post', value: 'delete_post' },
];

const bannedFragments = [
  ['selected', 'record'].join(' '),
  ['Resource', 'not', 'selected'].join(' '),
  ['provider', "'s result"].join(''),
  ['Pick', 'Create', 'to', 'add', 'a', 'new'].join(' '),
];

describe('resolveFieldHelp', () => {
  it('builds LinkedIn operation help from real dropdown labels', () => {
    const help = resolveFieldHelp({
      nodeType: 'linkedin',
      nodeLabel: 'LinkedIn',
      fieldName: 'operation',
      fieldLabel: 'Operation',
      fieldType: 'select',
      options: linkedinOptions,
      helpText: 'How to get Operation:\n1) Legacy dropdown guide',
      config: { operation: 'create_post' },
    });

    expect(help?.description).toContain('Get My Profile');
    expect(help?.description).toContain('Create Post (Text)');
    expect(help?.description).toContain('Create Post (Media)');
    expect(help?.description).toContain('Delete Post');
    expect(help?.description.toLowerCase()).toContain('publish');
    expect(help?.description.toLowerCase()).toContain('read');
    expect(help?.description.toLowerCase()).toContain('remove');
  });

  it('does not return blocked generic wording for LinkedIn operation help', () => {
    const help = resolveFieldHelp({
      nodeType: 'linkedin',
      nodeLabel: 'LinkedIn',
      fieldName: 'operation',
      fieldLabel: 'Operation',
      fieldType: 'select',
      options: linkedinOptions,
      config: { operation: 'create_post' },
    });

    for (const fragment of bannedFragments) {
      expect(help?.description).not.toContain(fragment);
    }
  });

  it('uses Notion doc help before contextual fallbacks', () => {
    const help = resolveFieldHelp({
      nodeType: 'notion',
      nodeLabel: 'Notion',
      fieldName: 'pageId',
      fieldLabel: 'Page ID',
      fieldType: 'text',
      config: { operation: 'read' },
    });

    expect(help?.source).toBe('doc');
    expect(help?.description).toContain('unique ID of the Notion page');
    expect(help?.description).toContain('32-character code');
  });

  it('builds HubSpot operation help with the chosen resource context', () => {
    const help = resolveFieldHelp({
      nodeType: 'hubspot',
      nodeLabel: 'HubSpot',
      fieldName: 'operation',
      fieldLabel: 'Operation',
      fieldType: 'select',
      options: [
        { label: 'Get', value: 'get' },
        { label: 'Get Many', value: 'getMany' },
        { label: 'Create', value: 'create' },
        { label: 'Update', value: 'update' },
        { label: 'Delete', value: 'delete' },
      ],
      config: { resource: 'contact', operation: 'create' },
    });

    expect(help?.description).toContain('Contact');
    expect(help?.description.toLowerCase()).toContain('create');
  });

  it('honors contextual fallback help when it is specific', () => {
    const help = buildContextualFieldHelp({
      nodeType: 'custom_service',
      nodeLabel: 'Custom Service',
      fieldKey: 'customField',
      fieldLabel: 'Custom Field',
      fieldType: 'text',
      fallbackHelpText: 'What this field is: Custom value.\nHow to fill it: Use the workspace-specific value.',
    });

    expect(help).toContain('Custom value');
  });

  it('uses explicit custom help before generated contextual text', () => {
    const help = resolveFieldHelp({
      nodeType: 'custom_service',
      nodeLabel: 'Custom Service',
      fieldName: 'mode',
      fieldLabel: 'Mode',
      fieldType: 'select',
      helpText: 'What this field is: A custom mode for this workflow.\nHow to choose it: Use the mode agreed with your team.',
      options: [
        { label: 'Fast', value: 'fast' },
        { label: 'Careful', value: 'careful' },
      ],
    });

    expect(help?.source).toBe('explicit');
    expect(help?.description).toContain('custom mode');
  });

  it('flags blocked generic wording without storing the full phrases inline', () => {
    expect(isGenericHelpText(['selected', 'record'].join(' '))).toBe(true);
    expect(isGenericHelpText(['Resource', 'not', 'selected'].join(' '))).toBe(true);
    expect(isGenericHelpText(['provider', "'s result"].join(''))).toBe(true);
  });
});
