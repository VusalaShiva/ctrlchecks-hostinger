/**
 * B6-1 — webhook vs HTTP-fetch misclassification regression tests
 *
 * TC1 "get data from http request, summarize" → manual_trigger (NOT webhook)
 * TC2 "receive a webhook with customer data" → webhook (correct)
 * TC3 "http request" with fetch verbs → manual_trigger
 * TC4 regression: existing webhook-only prompts still produce webhook
 */

jest.mock('../../../../core/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));
jest.mock('../../gemini-orchestrator', () => ({
  geminiOrchestrator: { processRequest: jest.fn() },
}));
jest.mock('../intent-stage-client', () => ({
  runIntentStageRemote: jest.fn().mockResolvedValue(null),
}));
jest.mock('../../system-prompt-builder', () => ({
  systemPromptBuilder: {
    build: jest.fn(() => ({ systemPrompt: 'INTENT_SYSTEM_PROMPT' })),
  },
}));
jest.mock('../../node-catalog-builder', () => ({
  buildNodeCatalogText: jest.fn(() => '[{"type":"manual_trigger"}]'),
}));

import { geminiOrchestrator } from '../../gemini-orchestrator';
import { runIntentStage } from '../intent-stage';
import type { IntentStageOutput } from '../intent-stage';

const mockGemini = geminiOrchestrator.processRequest as jest.Mock;

function geminiReturns(triggerType: string, actions: string[]): void {
  mockGemini.mockResolvedValue(
    JSON.stringify({ intent: 'test', triggerType, actions, dataFlows: [], constraints: [] })
  );
}

function assertOk(result: IntentStageOutput): asserts result is Extract<IntentStageOutput, { ok: true }> {
  if (!result.ok) throw new Error(`Stage returned error: ${JSON.stringify(result)}`);
}

describe('B6-1: webhook vs http-fetch trigger classification', () => {
  beforeEach(() => jest.clearAllMocks());

  test('TC1 — LLM returns webhook for fetch prompt → correction overrides to manual_trigger', async () => {
    geminiReturns('webhook', ['get data from http request', 'summarize it', 'log the summary']);
    const result = await runIntentStage('Get data from an HTTP request, summarize it, and log the result', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('manual_trigger');
  });

  test('TC1b — deterministic fallback: "get the data from httprequest" → manual_trigger', async () => {
    mockGemini.mockRejectedValue(new Error('LLM unavailable'));
    const result = await runIntentStage('get the data from httprequest and summaries and log the summary', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('manual_trigger');
  });

  test('TC1c — "fetch data from an API URL and summarize" → manual_trigger', async () => {
    geminiReturns('webhook', ['fetch data from an API URL', 'summarize the result']);
    const result = await runIntentStage('Fetch data from an API URL and summarize the result', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('manual_trigger');
  });

  test('TC2 — "when I receive a webhook" → stays webhook (correct inbound)', async () => {
    geminiReturns('webhook', ['receive incoming webhook with customer data', 'summarize', 'log']);
    const result = await runIntentStage('When I receive a webhook with customer data, summarize and log it', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('webhook');
  });

  test('TC3 — "make an http request to fetch" (deterministic path) → manual_trigger', async () => {
    mockGemini.mockRejectedValue(new Error('LLM unavailable'));
    const result = await runIntentStage('make an http request to fetch user data and send an email', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('manual_trigger');
  });

  test('TC4 regression — "incoming webhook trigger for order events" → stays webhook', async () => {
    geminiReturns('webhook', ['incoming webhook for order events', 'notify via slack']);
    const result = await runIntentStage('Trigger my workflow via an incoming webhook when a new order arrives', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('webhook');
  });

  test('TC4b regression — bare "webhook trigger" without fetch language → stays webhook', async () => {
    mockGemini.mockRejectedValue(new Error('LLM unavailable'));
    const result = await runIntentStage('webhook trigger for new signups', '');
    assertOk(result);
    expect(result.intent.triggerType).toBe('webhook');
  });
});
