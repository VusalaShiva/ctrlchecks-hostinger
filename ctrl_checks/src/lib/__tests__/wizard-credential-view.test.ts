import { describe, expect, it } from 'vitest';
import {
  buildCredentialWizardView,
  matchCredentialStatusForQuestion,
  sanitizeCredentialStatusesForWizardView,
  type CredentialStatusRow,
  type WizardCredentialQuestionLike,
} from '@/lib/wizard-credential-view';

const baseQ = (overrides: Partial<WizardCredentialQuestionLike>): WizardCredentialQuestionLike => ({
  id: 'cred_1',
  text: 'API Key',
  nodeId: 'n1',
  nodeType: 'openai_gpt',
  nodeLabel: 'GPT',
  fieldName: 'apiKey',
  category: 'credential',
  ...overrides,
});

describe('wizard-credential-view (frontend)', () => {
  it('matchCredentialStatusForQuestion: authType + row without displayName does not throw', () => {
    const q = baseQ({
      id: 'q_auth',
      fieldName: 'authType',
      text: 'Authentication',
      nodeId: 'n_fb',
      nodeType: 'facebook',
      nodeLabel: 'Facebook',
    });
    const statuses: CredentialStatusRow[] = [
      { nodeId: 'n_fb', credentialId: 'facebook', status: 'required_missing' },
    ];
    expect(() => matchCredentialStatusForQuestion(q, statuses)).not.toThrow();
    expect(matchCredentialStatusForQuestion(q, statuses)).toBe('required_missing');
  });

  it('sanitizeCredentialStatusesForWizardView fills displayName from credentialId', () => {
    const raw = [{ nodeId: 'a', credentialId: 'linkedin', status: 'resolved_connected' }];
    const out = sanitizeCredentialStatusesForWizardView(raw);
    expect(out).toHaveLength(1);
    expect(out[0].displayName).toBe('linkedin');
  });

  it('buildCredentialWizardView runs after sanitize on partial API rows', () => {
    const questions: WizardCredentialQuestionLike[] = [
      baseQ({
        id: 'q1',
        nodeId: 'n_fb',
        fieldName: 'authType',
        text: 'Auth',
        nodeLabel: 'Facebook',
        nodeType: 'facebook',
      }),
    ];
    const st = sanitizeCredentialStatusesForWizardView([
      { nodeId: 'n_fb', credentialId: 'facebook', status: 'required_missing' },
    ]);
    expect(() => buildCredentialWizardView(questions, st)).not.toThrow();
    const { rows } = buildCredentialWizardView(questions, st);
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it('matches status by credential key granularity (not provider collision)', () => {
    const question = baseQ({
      id: 'q_drive_token',
      nodeId: 'n_google',
      nodeType: 'google_drive',
      nodeLabel: 'Google Drive',
      fieldName: 'google_drive_token',
      text: 'Google Drive Access Token',
    });

    const statuses: CredentialStatusRow[] = [
      {
        nodeId: 'n_google',
        credentialId: 'google_sheets_token',
        displayName: 'Google Sheets Token',
        status: 'resolved_connected',
      },
      {
        nodeId: 'n_google',
        credentialId: 'google_drive_token',
        displayName: 'Google Drive Token',
        status: 'required_missing',
      },
    ];

    expect(matchCredentialStatusForQuestion(question, statuses)).toBe('required_missing');
  });
});
