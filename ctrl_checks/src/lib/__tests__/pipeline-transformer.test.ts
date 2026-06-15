import { describe, it, expect, vi } from 'vitest';

vi.mock('../tools-registry', () => ({
  PROCESSORS_REGISTRY: [
    {
      id: 'text_processor',
      name: 'Text Processor',
      type: 'text',
      description: 'Text',
      backendProcessor: 'text_processor',
      tools: [
        { id: 'summarize', name: 'Summarize', description: 'Summarize', task: 'summarize' },
        { id: 'translate', name: 'Translate', description: 'Translate', task: 'translate' },
      ],
    },
  ],
  getToolByTask: vi.fn((task: string) => {
    if (task === 'summarize') {
      return {
        processor: { id: 'text_processor' },
        tool: { id: 'summarize', name: 'Summarize', task: 'summarize' },
      };
    }
    return undefined;
  }),
}));

import { transformPipelineSteps, enhanceIntent } from '../pipeline-transformer';

// ─────────────────────────────────────────────
// transformPipelineSteps
// ─────────────────────────────────────────────

describe('transformPipelineSteps', () => {
  it('returns [] when backendPipeline is null', () => {
    expect(transformPipelineSteps(null, [])).toEqual([]);
  });

  it('returns [] when backendPipeline is undefined', () => {
    expect(transformPipelineSteps(undefined, [])).toEqual([]);
  });

  it('returns [] when backendPipeline.steps is absent', () => {
    expect(transformPipelineSteps({}, [])).toEqual([]);
  });

  it('returns [] for empty steps array', () => {
    expect(transformPipelineSteps({ steps: [] }, [])).toEqual([]);
  });

  it('uses step.id when present', () => {
    const pipeline = { steps: [{ id: 'my-id', type: 'other' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.id).toBe('my-id');
  });

  it('falls back to step_${index} when step.id is missing', () => {
    const pipeline = { steps: [{ type: 'other' }, { type: 'other' }] };
    const steps = transformPipelineSteps(pipeline, []);
    expect(steps[0].id).toBe('step_0');
    expect(steps[1].id).toBe('step_1');
  });

  it('reads status from stepStatuses map', () => {
    const pipeline = { steps: [{ id: 'abc', type: 'other' }] };
    const [step] = transformPipelineSteps(pipeline, [], { abc: 'running' });
    expect(step.status).toBe('running');
  });

  it('defaults status to pending when not in map', () => {
    const pipeline = { steps: [{ id: 'abc', type: 'other' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.status).toBe('pending');
  });

  it('assigns sequential stepNumbers starting at 1', () => {
    const pipeline = {
      steps: [{ type: 'other' }, { type: 'other' }, { type: 'other' }],
    };
    const steps = transformPipelineSteps(pipeline, []);
    expect(steps.map(s => s.stepNumber)).toEqual([1, 2, 3]);
  });

  it('fills toolId/toolName/task for transformation with matching task', () => {
    const pipeline = {
      steps: [{ type: 'transformation', task: 'summarize' }],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.toolId).toBe('summarize');
    expect(step.toolName).toBe('Summarize');
    expect(step.task).toBe('summarize');
  });

  it('reads modelName/modelProvider from backendStep.model when task matches', () => {
    const pipeline = {
      steps: [
        {
          type: 'transformation',
          task: 'summarize',
          model: { name: 'bart', provider: 'huggingface' },
        },
      ],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.modelName).toBe('bart');
    expect(step.modelProvider).toBe('huggingface');
  });

  it('falls back modelProvider to huggingface when model.provider absent', () => {
    const pipeline = {
      steps: [
        {
          type: 'transformation',
          task: 'summarize',
          model: { name: 'bart' },
        },
      ],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.modelProvider).toBe('huggingface');
  });

  it('fills only modelName/modelProvider when transformation task has no tool match', () => {
    const pipeline = {
      steps: [
        {
          type: 'transformation',
          task: 'unknown_task',
          model: { name: 'gpt', provider: 'openai' },
        },
      ],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.toolId).toBeUndefined();
    expect(step.modelName).toBe('gpt');
    expect(step.modelProvider).toBe('openai');
  });

  it('does not call tool lookup for non-transformation type', () => {
    const pipeline = { steps: [{ type: 'ingestion', task: 'summarize' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.toolId).toBeUndefined();
    expect(step.toolName).toBeUndefined();
  });

  it('uses step.description as description', () => {
    const pipeline = { steps: [{ type: 'other', description: 'my desc' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.description).toBe('my desc');
  });

  it('falls back description to modality', () => {
    const pipeline = { steps: [{ type: 'other', modality: 'audio' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.description).toBe('audio');
  });

  it('falls back description to Processing step when both absent', () => {
    const pipeline = { steps: [{ type: 'other' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.description).toBe('Processing step');
  });

  it('falls back type to transformation when absent', () => {
    const pipeline = { steps: [{}] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.type).toBe('transformation');
  });

  it('prefers executionTime over estimated_duration', () => {
    const pipeline = {
      steps: [{ type: 'other', executionTime: 100, estimated_duration: 999 }],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.executionTime).toBe(100);
  });

  it('falls back to estimated_duration when executionTime absent', () => {
    const pipeline = {
      steps: [{ type: 'other', estimated_duration: 42 }],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.executionTime).toBe(42);
  });

  it('carries error and result from backendStep', () => {
    const pipeline = {
      steps: [{ type: 'other', error: 'boom', result: { ok: true } }],
    };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.error).toBe('boom');
    expect(step.result).toEqual({ ok: true });
  });

  it('defaults inputSchema/outputSchema to empty objects', () => {
    const pipeline = { steps: [{ type: 'other' }] };
    const [step] = transformPipelineSteps(pipeline, []);
    expect(step.inputSchema).toEqual({});
    expect(step.outputSchema).toEqual({});
  });
});

// ─────────────────────────────────────────────
// enhanceIntent
// ─────────────────────────────────────────────

describe('enhanceIntent', () => {
  it('returns a new object and does not mutate the original', () => {
    const intent = { name: 'test', processing_steps: [] };
    const result = enhanceIntent(intent, []);
    expect(result).not.toBe(intent);
    expect(intent).not.toHaveProperty('required_tools');
  });

  it('preserves existing intent properties', () => {
    const intent = { name: 'test', goal: 'demo', processing_steps: [] };
    const result = enhanceIntent(intent, []);
    expect(result.name).toBe('test');
    expect(result.goal).toBe('demo');
  });

  it('sets required_tools to undefined when processing_steps is empty', () => {
    const result = enhanceIntent({ processing_steps: [] }, []);
    expect(result.required_tools).toBeUndefined();
  });

  it('sets required_tools to undefined when no steps match any tool', () => {
    const result = enhanceIntent({ processing_steps: ['unknown_task_xyz'] }, []);
    expect(result.required_tools).toBeUndefined();
  });

  it('adds matching tool when processing step contains a tool task', () => {
    const result = enhanceIntent({ processing_steps: ['summarize content'] }, []);
    expect(result.required_tools).toEqual([
      { id: 'summarize', name: 'Summarize', task: 'summarize' },
    ]);
  });

  it('deduplicates tools matched multiple times', () => {
    // Two steps both matching "summarize"
    const result = enhanceIntent(
      { processing_steps: ['summarize content', 'summarize again'] },
      []
    );
    const tools = result.required_tools ?? [];
    const summarizeEntries = tools.filter((t: any) => t.id === 'summarize');
    expect(summarizeEntries).toHaveLength(1);
  });

  it('sets required_tools to undefined when processing_steps is absent', () => {
    const result = enhanceIntent({}, []);
    expect(result.required_tools).toBeUndefined();
  });

  it('maps selectedModels using model.name and model.provider', () => {
    const models = [{ name: 'bart', provider: 'huggingface' }];
    const result = enhanceIntent({}, models);
    expect(result.required_models).toEqual([{ name: 'bart', provider: 'huggingface' }]);
  });

  it('falls back model name to model.model when name absent', () => {
    const models = [{ model: 'gpt-4', provider: 'openai' }];
    const result = enhanceIntent({}, models);
    expect(result.required_models[0].name).toBe('gpt-4');
  });

  it('falls back model name to Unknown when both name and model absent', () => {
    const models = [{ provider: 'anthropic' }];
    const result = enhanceIntent({}, models);
    expect(result.required_models[0].name).toBe('Unknown');
  });

  it('falls back model provider to unknown when absent', () => {
    const models = [{ name: 'some-model' }];
    const result = enhanceIntent({}, models);
    expect(result.required_models[0].provider).toBe('unknown');
  });

  it('produces empty required_models for empty selectedModels', () => {
    const result = enhanceIntent({}, []);
    expect(result.required_models).toEqual([]);
  });
});
