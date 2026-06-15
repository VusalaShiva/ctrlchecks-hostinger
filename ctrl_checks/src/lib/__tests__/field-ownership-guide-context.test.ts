import { describe, expect, it } from 'vitest';
import { buildFieldOwnershipGuideContext } from '../field-ownership-guide-context';

describe('buildFieldOwnershipGuideContext', () => {
  it('maps ownership rows and effective modes', () => {
    const result = buildFieldOwnershipGuideContext({
      prompt: 'sync google sheets',
      workflowId: 'wf_123',
      nodes: [
        {
          id: 'n1',
          type: 'google_sheets',
          data: {
            label: 'Google Sheets',
            config: { operation: 'append' },
            inputSchema: {
              spreadsheetId: {
                description: 'Google Sheets spreadsheet ID',
                required: true,
              },
            },
          },
        },
      ],
      edges: [],
      ownershipQuestions: [
        {
          id: 'q1',
          nodeId: 'n1',
          fieldName: 'spreadsheetId',
          text: 'Spreadsheet ID',
          supportsRuntimeAI: false,
          fillModeDefault: 'manual_static',
        },
      ],
      fillModeValues: { mode_n1_spreadsheetId: 'manual_static' },
      effectiveModes: { mode_n1_spreadsheetId: 'manual_static' },
      credentialStatuses: [],
      credentialWizardRows: [],
      selectedField: { nodeId: 'n1', fieldName: 'spreadsheetId' },
    });

    expect(result.workflowId).toBe('wf_123');
    expect(result.ownershipRows).toHaveLength(1);
    expect(result.ownershipRows[0].effectiveMode).toBe('manual_static');
    expect(result.selectedField).toEqual({ nodeId: 'n1', fieldName: 'spreadsheetId' });
    expect(result.selectedRow?.fieldName).toBe('spreadsheetId');
    expect(result.selectedNode?.type).toBe('google_sheets');
    expect(result.selectedNode?.operation).toBe('append');
    expect(result.selectedFieldSchema?.description).toBe('Google Sheets spreadsheet ID');
  });
});
