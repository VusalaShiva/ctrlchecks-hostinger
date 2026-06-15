import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzePrompt } from '../prompt-analyzer';

// Make fetch always reject so analyzePrompt falls through to fallbackAnalysis.
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')));
});

// ── image_processor — text-to-image branch ───────────────────────────────────

describe('fallbackAnalysis — text-to-image branch', () => {
  it('"text to image" selects image_processor with text_to_image', async () => {
    const result = await analyzePrompt('text to image of a sunset');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('text_to_image');
  });

  it('"generate image" selects image_processor with text_to_image', async () => {
    const result = await analyzePrompt('generate image of a cat');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('text_to_image');
  });

  it('"create image" selects image_processor with text_to_image', async () => {
    const result = await analyzePrompt('create image from this description');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('text_to_image');
  });

  it('prompt with "image" and "generate" (non-adjacent) selects image_processor with text_to_image', async () => {
    const result = await analyzePrompt('I want to generate a high-res image of mountains');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('text_to_image');
  });
});

// ── image_processor — analysis branch ────────────────────────────────────────

describe('fallbackAnalysis — image analysis branch', () => {
  it('"analyze image" selects image_processor with image_caption', async () => {
    const result = await analyzePrompt('analyze image for quality issues');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });

  it('"image analyzer" selects image_processor with image_caption', async () => {
    const result = await analyzePrompt('image analyzer for screenshots');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });

  it('"caption" selects image_processor with image_caption', async () => {
    const result = await analyzePrompt('caption this photo for me');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });

  it('"detect" selects image_processor with image_caption', async () => {
    const result = await analyzePrompt('detect objects in the scene');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });
});

// ── image_processor — general image branch ───────────────────────────────────

describe('fallbackAnalysis — general image branch (no generation verbs)', () => {
  it('"photo" without generation verbs → image_processor + image_caption', async () => {
    const result = await analyzePrompt('describe this photo');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });

  it('"picture" without generation verbs → image_processor + image_caption', async () => {
    const result = await analyzePrompt('what is in this picture');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });

  it('"image" without generation verbs → image_processor + image_caption', async () => {
    const result = await analyzePrompt('extract text from image');
    expect(result.selectedProcessor).toBe('image_processor');
    expect(result.selectedTools).toContain('image_caption');
  });
});

// ── audio_processor — transcribe branch ──────────────────────────────────────

describe('fallbackAnalysis — audio transcribe branch', () => {
  it('"transcribe" selects audio_processor with transcribe', async () => {
    const result = await analyzePrompt('transcribe this audio file');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('transcribe');
  });

  it('"voice" selects audio_processor with transcribe', async () => {
    const result = await analyzePrompt('convert voice recording to notes');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('transcribe');
  });

  it('"speech" (not text-to-speech) selects audio_processor with transcribe', async () => {
    const result = await analyzePrompt('speech recognition task');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('transcribe');
  });

  it('"audio" selects audio_processor with transcribe', async () => {
    const result = await analyzePrompt('process audio from podcast');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('transcribe');
  });
});

// ── audio_processor — text-to-speech branch ──────────────────────────────────

describe('fallbackAnalysis — text-to-speech branch', () => {
  it('"text to speech" selects audio_processor with text_to_speech', async () => {
    const result = await analyzePrompt('text to speech conversion');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('text_to_speech');
  });

  it('"speak" within an audio-triggered prompt selects text_to_speech tool', async () => {
    // "voice" triggers the audio branch; "speak" then selects text_to_speech over transcribe
    const result = await analyzePrompt('use voice to speak this text aloud');
    expect(result.selectedProcessor).toBe('audio_processor');
    expect(result.selectedTools).toContain('text_to_speech');
  });
});

// ── text_processor — individual keyword tools ─────────────────────────────────

describe('fallbackAnalysis — text_processor keyword tools', () => {
  it('"summarize" → text_processor with summarize', async () => {
    const result = await analyzePrompt('summarize this long article');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('summarize');
  });

  it('"translate" → text_processor with translate', async () => {
    const result = await analyzePrompt('translate this text to French');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('translate');
  });

  it('"chat" → text_processor with chat', async () => {
    const result = await analyzePrompt('I want to chat with an assistant');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('chat');
  });

  it('"conversation" → text_processor with chat', async () => {
    const result = await analyzePrompt('start a conversation with me');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('chat');
  });

  it('"question" → text_processor with qa', async () => {
    const result = await analyzePrompt('answer my question about history');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('qa');
  });

  it('"qa" → text_processor with qa', async () => {
    const result = await analyzePrompt('run qa on this document');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('qa');
  });

  it('"sentiment" → text_processor with sentiment', async () => {
    const result = await analyzePrompt('sentiment analysis of reviews');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('sentiment');
  });
});

// ── text_processor — multiple tools ──────────────────────────────────────────

describe('fallbackAnalysis — text_processor with multiple keywords', () => {
  it('summarize + translate → both tools present in push order', async () => {
    const result = await analyzePrompt('summarize and translate this article');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toEqual(['summarize', 'translate']);
  });

  it('sentiment + summarize → both tools present', async () => {
    const result = await analyzePrompt('summarize the document and check sentiment');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toContain('summarize');
    expect(result.selectedTools).toContain('sentiment');
  });
});

// ── text_processor — default fallback ────────────────────────────────────────

describe('fallbackAnalysis — default (no keywords)', () => {
  it('unrecognised prompt defaults to text_processor + chat', async () => {
    const result = await analyzePrompt('do something useful');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toEqual(['chat']);
  });

  it('empty-ish prompt defaults to text_processor + chat', async () => {
    const result = await analyzePrompt('hello');
    expect(result.selectedProcessor).toBe('text_processor');
    expect(result.selectedTools).toEqual(['chat']);
  });
});

// ── goal field ────────────────────────────────────────────────────────────────

describe('fallbackAnalysis — goal field', () => {
  it('goal is the first 100 characters of the prompt', async () => {
    const prompt = 'A'.repeat(150);
    const result = await analyzePrompt(prompt);
    expect(result.goal).toBe('A'.repeat(100));
  });

  it('goal equals full prompt when prompt is shorter than 100 characters', async () => {
    const prompt = 'short prompt';
    const result = await analyzePrompt(prompt);
    expect(result.goal).toBe('short prompt');
  });
});
