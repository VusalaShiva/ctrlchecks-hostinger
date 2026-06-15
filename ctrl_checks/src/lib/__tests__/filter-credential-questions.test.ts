import { describe, it, expect } from 'vitest';
import {
  filterCredentialQuestionsForStep,
  buildCompositeKey,
  credentialIdCandidatesFromQuestion,
  applyCredentialStepIncludeOverrides,
  credentialPlaneKeyFromQuestion,
  shouldShowCredentialRowOnCredentialsStep,
  credentialRowMustStayVisible,
} from '../filter-credential-questions';

const slackQ = {
  id: 'n1_slack',
  nodeId: 'n1',
  category: 'credential',
  isVaultCredential: true,
  fieldName: 'slack',
  credential: { vaultKey: 'slack', credentialId: 'slack' },
};

const smtpQ = {
  id: 'n1_smtp',
  nodeId: 'n1',
  category: 'credential',
  isVaultCredential: true,
  fieldName: 'smtp',
  credential: { vaultKey: 'smtp', credentialId: 'smtp' },
};

/** Production shape: registry field name webhookUrl + connector vault key slack */
const slackWebhookUrlQ = {
  id: 'n1_cred_webhookUrl',
  nodeId: 'n1',
  category: 'credential',
  isVaultCredential: true,
  fieldName: 'webhookUrl',
  credential: { vaultKey: 'slack', credentialId: 'slack' },
};

describe('filterCredentialQuestionsForStep', () => {
  it('matches required_missing slack to webhookUrl question when credential.vaultKey is slack', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackWebhookUrlQ, smtpQ],
      credentialStatuses: [
        {
          nodeId: 'n1',
          credentialId: 'slack',
          status: 'required_missing',
        },
        {
          nodeId: 'n1',
          credentialId: 'smtp',
          status: 'resolved_connected',
        },
      ],
    });
    expect(out).toHaveLength(1);
    expect((out[0] as any).fieldName).toBe('webhookUrl');
    expect((out[0] as any).credential?.vaultKey).toBe('slack');
  });

  it('with credentialStatuses: keeps only required_missing rows (same node)', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: [
        {
          nodeId: 'n1',
          credentialId: 'slack',
          status: 'required_missing',
        },
        {
          nodeId: 'n1',
          credentialId: 'smtp',
          status: 'resolved_connected',
        },
      ],
    });
    expect(out).toHaveLength(1);
    expect((out[0] as any).fieldName).toBe('slack');
  });

  it('with credentialStatuses: no required_missing returns empty list', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: [
        { nodeId: 'n1', credentialId: 'slack', status: 'resolved_connected' },
        { nodeId: 'n1', credentialId: 'smtp', status: 'resolved_connected' },
      ],
    });
    expect(out).toHaveLength(0);
  });

  it('when statuses look resolved but discovered still flags slack missing, returns slack row', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackWebhookUrlQ, smtpQ],
      credentialStatuses: [
        { nodeId: 'n1', credentialId: 'slack', status: 'resolved_connected' },
        { nodeId: 'n1', credentialId: 'smtp', status: 'resolved_connected' },
      ],
      discoveredCredentials: [
        { nodeIds: ['n1'], vaultKey: 'slack', satisfied: false, status: 'required_missing' },
      ],
    });
    expect(out).toHaveLength(1);
    expect((out[0] as any).fieldName).toBe('webhookUrl');
  });

  it('empty credentialStatuses falls back to all questions', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: [],
    });
    expect(out).toHaveLength(2);
  });

  it('with credentialStatuses: mismatched missing key does not fall back to full list', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: [{ nodeId: 'n1', credentialId: 'gmail', status: 'required_missing' }],
    });
    expect(out).toHaveLength(0);
  });

  it('undefined credentialStatuses uses unifiedCredentialsMissing when present', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: undefined,
      unifiedCredentialsMissing: [{ nodeIds: ['n1'], credentialId: 'slack' }],
    });
    expect(out).toHaveLength(1);
    expect((out[0] as any).fieldName).toBe('slack');
  });

  it('unified missing mismatch returns empty list (no broad fallback)', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: undefined,
      unifiedCredentialsMissing: [{ nodeIds: ['n1'], credentialId: 'gmail' }],
    });
    expect(out).toHaveLength(0);
  });

  it('uses discoveredCredentials when statuses and unified are absent', () => {
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, smtpQ],
      credentialStatuses: undefined,
      unifiedCredentialsMissing: undefined,
      discoveredCredentials: [
        { nodeIds: ['n1'], vaultKey: 'slack', status: 'required_missing' },
      ],
    });
    expect(out).toHaveLength(1);
    expect((out[0] as any).fieldName).toBe('slack');
  });

  it('dedupes duplicate keys', () => {
    const dup = { ...slackQ, id: 'dup' };
    const out = filterCredentialQuestionsForStep({
      questions: [slackQ, dup],
      credentialStatuses: [
        { nodeId: 'n1', credentialId: 'slack', status: 'required_missing' },
      ],
    });
    expect(out).toHaveLength(1);
  });
});

describe('applyCredentialStepIncludeOverrides', () => {
  const optQ = {
    id: 'n1_opt',
    nodeId: 'n1',
    fieldName: 'optionalSecret',
    category: 'credential',
    ownershipClass: 'credential',
    isVaultCredential: true,
    required: false,
    credential: { vaultKey: 'opt', credentialId: 'opt' },
  };

  it('hides optional row when override false and row is not required+empty', () => {
    const strict = [optQ];
    const out = applyCredentialStepIncludeOverrides({
      strictFiltered: strict,
      allVaultCredentialQuestions: [optQ],
      overrides: { [credentialPlaneKeyFromQuestion(optQ)]: false },
      isQuestionCredentialEmpty: () => false,
    });
    expect(out).toHaveLength(0);
  });

  it('force-includes optional row when override true', () => {
    const out = applyCredentialStepIncludeOverrides({
      strictFiltered: [],
      allVaultCredentialQuestions: [optQ],
      overrides: { [credentialPlaneKeyFromQuestion(optQ)]: true },
      isQuestionCredentialEmpty: () => true,
    });
    expect(out).toHaveLength(1);
  });

  it('does not force-include vault row when effective mode is runtime_ai and policy getters provided', () => {
    const out = applyCredentialStepIncludeOverrides({
      strictFiltered: [],
      allVaultCredentialQuestions: [optQ],
      overrides: { [credentialPlaneKeyFromQuestion(optQ)]: true },
      isQuestionCredentialEmpty: () => true,
      getEffectiveFillMode: () => 'runtime_ai',
      getFieldPlaneRow: () => ({ isEmpty: true }),
    });
    expect(out).toHaveLength(0);
  });
});

describe('shouldShowCredentialRowOnCredentialsStep', () => {
  const vaultQ = {
    nodeId: 'n1',
    fieldName: 'webhookUrl',
    category: 'credential',
    isVaultCredential: true,
  };

  it('hides vault for runtime_ai', () => {
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: vaultQ,
        effectiveMode: 'runtime_ai',
        fieldPlaneRow: { isEmpty: true },
      })
    ).toBe(false);
  });

  it('hides vault for buildtime_ai_once', () => {
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: vaultQ,
        effectiveMode: 'buildtime_ai_once',
        fieldPlaneRow: { isEmpty: true },
      })
    ).toBe(false);
  });

  it('shows vault for manual_static when empty', () => {
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: vaultQ,
        effectiveMode: 'manual_static',
        fieldPlaneRow: { isEmpty: true },
      })
    ).toBe(true);
  });

  it('hides vault for manual_static when AI prefilled and graph has value', () => {
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: { ...vaultQ, aiFilledAtBuildTime: true },
        effectiveMode: 'manual_static',
        fieldPlaneRow: { isEmpty: false },
      })
    ).toBe(false);
  });

  it('shows non-vault only when not runtime_ai', () => {
    const cfg = { ...vaultQ, category: 'configuration', isVaultCredential: false };
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: cfg,
        effectiveMode: 'runtime_ai',
        fieldPlaneRow: { isEmpty: true },
      })
    ).toBe(false);
    expect(
      shouldShowCredentialRowOnCredentialsStep({
        question: cfg,
        effectiveMode: 'manual_static',
        fieldPlaneRow: { isEmpty: true },
      })
    ).toBe(true);
  });
});

describe('credentialRowMustStayVisible', () => {
  const reqVault = {
    nodeId: 'n1',
    fieldName: 'x',
    category: 'credential',
    isVaultCredential: true,
    required: true,
  };

  it('is false for required empty vault when mode is runtime_ai', () => {
    expect(credentialRowMustStayVisible(reqVault, true, 'runtime_ai')).toBe(false);
  });

  it('is true for required empty vault when mode is manual_static', () => {
    expect(credentialRowMustStayVisible(reqVault, true, 'manual_static')).toBe(true);
  });
});

describe('helpers', () => {
  it('buildCompositeKey normalizes case', () => {
    expect(buildCompositeKey('N1', 'Slack')).toBe('N1::slack');
  });

  it('credentialIdCandidatesFromQuestion collects field and credential ids', () => {
    const c = credentialIdCandidatesFromQuestion({
      fieldName: 'webhook_url',
      credential: { vaultKey: 'slack', credentialId: 'slack' },
    });
    expect(c).toContain('webhook_url');
    expect(c).toContain('slack');
  });
});
