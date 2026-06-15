/**
 * Registry-driven field guide selection (helpCategory / docsUrl from unified node registry).
 */
import { describe, it, expect } from 'vitest';
import { generateFieldGuide } from '../guideGenerator';

describe('generateFieldGuide registry metadata', () => {
  it('prefers helpCategory spreadsheet_id over ambiguous field labels', () => {
    const guide = generateFieldGuide(
      'custom_node',
      'id',
      'Resource ID',
      'text',
      undefined,
      { helpCategory: 'spreadsheet_id' }
    );
    expect(guide.title).toContain('Spreadsheet');
    expect(guide.url).toMatch(/spreadsheets/i);
  });

  it('merges docsUrl from registry for api_key guides', () => {
    const customUrl = 'https://example.com/docs/api-keys';
    const guide = generateFieldGuide(
      'my_service',
      'apiKey',
      'API Key',
      'password',
      undefined,
      { helpCategory: 'api_key', docsUrl: customUrl }
    );
    expect(guide.url).toBe(customUrl);
    expect(guide.title.length).toBeGreaterThan(0);
  });

  it('uses exampleValue when provided for spreadsheet_id', () => {
    const ex = 'abc123example';
    const guide = generateFieldGuide(
      'google_sheets',
      'spreadsheetId',
      'Spreadsheet',
      'text',
      undefined,
      { helpCategory: 'spreadsheet_id', exampleValue: ex }
    );
    expect(guide.example).toBe(ex);
  });

  it('does not treat webhook_url as api_key when helpCategory is webhook_url', () => {
    const guide = generateFieldGuide(
      'slack_incoming',
      'url',
      'Webhook URL',
      'text',
      undefined,
      { helpCategory: 'webhook_url' }
    );
    expect(guide.title.toLowerCase()).toMatch(/webhook/);
    expect(guide.title.toLowerCase()).not.toMatch(/api key/);
  });

  it('uses Google Sheets tab guide for sheet_name on google_sheets', () => {
    const guide = generateFieldGuide(
      'google_sheets',
      'sheetName',
      'Sheet Name',
      'text',
      undefined,
      { helpCategory: 'sheet_name' }
    );
    expect(guide.title.toLowerCase()).toMatch(/tab|sheet/);
    expect(guide.steps.some((s) => s.toLowerCase().includes('bottom'))).toBe(true);
  });

  it('provides OAuth redirect steps for callback_url', () => {
    const guide = generateFieldGuide(
      'oauth_node',
      'callbackUrl',
      'Callback URL',
      'text',
      undefined,
      { helpCategory: 'callback_url' }
    );
    expect(guide.title.toLowerCase()).toContain('set');
    expect(guide.steps.join(' ').toLowerCase()).toMatch(/oauth|redirect/);
  });

  it('provides operation_select guide', () => {
    const guide = generateFieldGuide(
      'http_request',
      'operation',
      'Operation',
      'select',
      undefined,
      { helpCategory: 'operation_select' }
    );
    expect(guide.steps.length).toBeGreaterThanOrEqual(3);
    expect(guide.title.toLowerCase()).toMatch(/choose|operation/);
  });

  it('provides JSON object guidance for HTTP headers', () => {
    const guide = generateFieldGuide(
      'http_request',
      'headers',
      'Headers',
      'json',
      undefined,
      { helpCategory: 'http_headers' }
    );
    expect(guide.title.toLowerCase()).toMatch(/headers/);
    expect(guide.example).toMatch(/Authorization/);
  });

  it('provides database connection string guidance', () => {
    const guide = generateFieldGuide(
      'postgresql',
      'connectionString',
      'Connection String',
      'text',
      undefined,
      { helpCategory: 'connection_string' }
    );
    expect(guide.title.toLowerCase()).toMatch(/connection string/);
    expect(guide.example).toMatch(/^postgresql:\/\//);
    expect(guide.securityWarning).toBe(true);
  });

  it('provides structured switch cases guidance', () => {
    const guide = generateFieldGuide(
      'switch',
      'cases',
      'Cases',
      'json',
      undefined,
      { helpCategory: 'case_list' }
    );
    expect(guide.steps.join(' ').toLowerCase()).toMatch(/array/);
    expect(guide.example).toMatch(/value/);
  });
});
