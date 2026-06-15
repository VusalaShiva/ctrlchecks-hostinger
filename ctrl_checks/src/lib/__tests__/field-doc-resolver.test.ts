import { describe, expect, it } from 'vitest';
import { findFieldDocField, getFieldHelpTextFromDoc } from '../field-doc-resolver';

describe('field-doc-resolver', () => {
  it('finds Notion pageId help by node, field, and operation', () => {
    const help = getFieldHelpTextFromDoc({
      nodeType: 'notion',
      fieldKey: 'pageId',
      operation: 'read',
    });

    expect(help).toContain('unique ID of the Notion page');
    expect(help).toContain('32-character code');
  });

  it('prefers the field doc for the requested operation when keys repeat', () => {
    const createPostField = findFieldDocField({
      nodeType: 'linkedin',
      fieldKey: 'personUrn',
      operation: 'create_post',
    });
    const mediaPostField = findFieldDocField({
      nodeType: 'linkedin',
      fieldKey: 'personUrn',
      operation: 'create_post_media',
    });

    expect(createPostField?.helpText).toContain('code that identifies your personal LinkedIn account');
    expect(mediaPostField?.helpText).toContain('Your LinkedIn member ID');
  });

  it('returns null for missing docs without throwing', () => {
    expect(findFieldDocField({
      nodeType: 'linkedin',
      fieldKey: 'doesNotExist',
      operation: 'create_post',
    })).toBeNull();
  });
});
