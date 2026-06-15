import { describe, it, expect } from 'vitest';
import {
  PROCESSORS_REGISTRY,
  getProcessorById,
  getProcessorByType,
  getAllProcessors,
  getToolByTask,
  isProcessorAvailable,
} from '../tools-registry';

describe('PROCESSORS_REGISTRY shape contract', () => {
  it('has exactly 3 processors', () => {
    expect(PROCESSORS_REGISTRY).toHaveLength(3);
  });

  it('has processors with ids text_processor, image_processor, audio_processor', () => {
    const ids = PROCESSORS_REGISTRY.map(p => p.id);
    expect(ids).toEqual(['text_processor', 'image_processor', 'audio_processor']);
  });

  it('text_processor has type text and backendProcessor text_processor', () => {
    const proc = PROCESSORS_REGISTRY[0];
    expect(proc.type).toBe('text');
    expect(proc.backendProcessor).toBe('text_processor');
  });

  it('image_processor has type image and backendProcessor image_processor', () => {
    const proc = PROCESSORS_REGISTRY[1];
    expect(proc.type).toBe('image');
    expect(proc.backendProcessor).toBe('image_processor');
  });

  it('audio_processor has type audio and backendProcessor audio_processor', () => {
    const proc = PROCESSORS_REGISTRY[2];
    expect(proc.type).toBe('audio');
    expect(proc.backendProcessor).toBe('audio_processor');
  });

  it('text_processor has 7 tools', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'text_processor')!;
    expect(proc.tools).toHaveLength(7);
  });

  it('image_processor has 4 tools', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'image_processor')!;
    expect(proc.tools).toHaveLength(4);
  });

  it('audio_processor has 2 tools', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'audio_processor')!;
    expect(proc.tools).toHaveLength(2);
  });

  it('each tool has id, name, description, and task fields', () => {
    for (const proc of PROCESSORS_REGISTRY) {
      for (const tool of proc.tools) {
        expect(tool.id).toBeTruthy();
        expect(tool.name).toBeTruthy();
        expect(tool.description).toBeTruthy();
        expect(tool.task).toBeTruthy();
      }
    }
  });

  it('text_processor tool task names are correct', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'text_processor')!;
    const tasks = proc.tools.map(t => t.task);
    expect(tasks).toEqual(['chat', 'summarize', 'translate', 'extract', 'sentiment', 'generate', 'qa']);
  });

  it('image_processor tool task names are correct', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'image_processor')!;
    const tasks = proc.tools.map(t => t.task);
    expect(tasks).toEqual(['image_caption', 'story', 'image_prompt', 'text_to_image']);
  });

  it('audio_processor tool task names are correct', () => {
    const proc = PROCESSORS_REGISTRY.find(p => p.id === 'audio_processor')!;
    const tasks = proc.tools.map(t => t.task);
    expect(tasks).toEqual(['transcribe', 'text_to_speech']);
  });
});

describe('getProcessorById', () => {
  it('returns text_processor for id text_processor', () => {
    const result = getProcessorById('text_processor');
    expect(result).toBeDefined();
    expect(result!.id).toBe('text_processor');
    expect(result!.type).toBe('text');
  });

  it('returns image_processor for id image_processor', () => {
    const result = getProcessorById('image_processor');
    expect(result).toBeDefined();
    expect(result!.id).toBe('image_processor');
    expect(result!.type).toBe('image');
  });

  it('returns audio_processor for id audio_processor', () => {
    const result = getProcessorById('audio_processor');
    expect(result).toBeDefined();
    expect(result!.id).toBe('audio_processor');
    expect(result!.type).toBe('audio');
  });

  it('returns undefined for unknown id', () => {
    expect(getProcessorById('video_processor')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getProcessorById('')).toBeUndefined();
  });
});

describe('getProcessorByType', () => {
  it('returns the text processor for type text', () => {
    const result = getProcessorByType('text');
    expect(result).toBeDefined();
    expect(result!.type).toBe('text');
    expect(result!.id).toBe('text_processor');
  });

  it('returns the image processor for type image', () => {
    const result = getProcessorByType('image');
    expect(result).toBeDefined();
    expect(result!.type).toBe('image');
    expect(result!.id).toBe('image_processor');
  });

  it('returns the audio processor for type audio', () => {
    const result = getProcessorByType('audio');
    expect(result).toBeDefined();
    expect(result!.type).toBe('audio');
    expect(result!.id).toBe('audio_processor');
  });
});

describe('getAllProcessors', () => {
  it('returns an array of length 3', () => {
    expect(getAllProcessors()).toHaveLength(3);
  });

  it('returns the same reference as PROCESSORS_REGISTRY', () => {
    expect(getAllProcessors()).toBe(PROCESSORS_REGISTRY);
  });

  it('contains processors with all three types', () => {
    const types = getAllProcessors().map(p => p.type);
    expect(types).toContain('text');
    expect(types).toContain('image');
    expect(types).toContain('audio');
  });
});

describe('getToolByTask', () => {
  it('returns processor and tool for task chat', () => {
    const result = getToolByTask('chat');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('text_processor');
    expect(result!.tool.task).toBe('chat');
    expect(result!.tool.id).toBe('chat');
  });

  it('returns processor and tool for task summarize', () => {
    const result = getToolByTask('summarize');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('text_processor');
    expect(result!.tool.task).toBe('summarize');
  });

  it('returns processor and tool for task image_caption', () => {
    const result = getToolByTask('image_caption');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('image_processor');
    expect(result!.tool.task).toBe('image_caption');
  });

  it('returns processor and tool for task transcribe', () => {
    const result = getToolByTask('transcribe');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('audio_processor');
    expect(result!.tool.task).toBe('transcribe');
  });

  it('returns processor and tool for task text_to_speech', () => {
    const result = getToolByTask('text_to_speech');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('audio_processor');
    expect(result!.tool.task).toBe('text_to_speech');
  });

  it('returns processor and tool for task text_to_image', () => {
    const result = getToolByTask('text_to_image');
    expect(result).toBeDefined();
    expect(result!.processor.id).toBe('image_processor');
    expect(result!.tool.task).toBe('text_to_image');
  });

  it('returns undefined for unknown task', () => {
    expect(getToolByTask('unknown_task')).toBeUndefined();
  });

  it('returns undefined for empty string task', () => {
    expect(getToolByTask('')).toBeUndefined();
  });

  it('returned tool.task matches the searched task string', () => {
    const tasks = ['chat', 'translate', 'qa', 'story', 'image_prompt', 'text_to_speech'];
    for (const task of tasks) {
      const result = getToolByTask(task);
      expect(result!.tool.task).toBe(task);
    }
  });
});

describe('isProcessorAvailable', () => {
  it('returns true for text_processor', () => {
    expect(isProcessorAvailable('text_processor')).toBe(true);
  });

  it('returns true for image_processor', () => {
    expect(isProcessorAvailable('image_processor')).toBe(true);
  });

  it('returns true for audio_processor', () => {
    expect(isProcessorAvailable('audio_processor')).toBe(true);
  });

  it('returns false for unknown processor id', () => {
    expect(isProcessorAvailable('video_processor')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isProcessorAvailable('')).toBe(false);
  });

  it('returns false for partial id match', () => {
    expect(isProcessorAvailable('text')).toBe(false);
  });
});
