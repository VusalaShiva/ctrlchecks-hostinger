import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initChatWidget, type ChatEmbedConfig } from '../chat-embed';

describe('initChatWidget', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an object with a destroy function', () => {
    const result = initChatWidget({ workflowId: 'wf-1' });
    expect(result).toHaveProperty('destroy');
    expect(typeof result.destroy).toBe('function');
  });

  it('calls console.log with the config on init', () => {
    const config: ChatEmbedConfig = { workflowId: 'wf-1' };
    initChatWidget(config);
    expect(console.log).toHaveBeenCalledWith('Initializing chat widget with config:', config);
  });

  it('passes full config object through to the log', () => {
    const config: ChatEmbedConfig = {
      workflowId: 'wf-abc',
      apiKey: 'key-123',
      theme: 'dark',
      position: 'bottom-left',
      title: 'Help',
    };
    initChatWidget(config);
    expect(console.log).toHaveBeenCalledWith('Initializing chat widget with config:', config);
  });

  it('destroy() logs destruction message', () => {
    const { destroy } = initChatWidget({ workflowId: 'wf-1' });
    destroy();
    expect(console.log).toHaveBeenCalledWith('Destroying chat widget');
  });

  it('each call returns an independent handle', () => {
    const handle1 = initChatWidget({ workflowId: 'wf-1' });
    const handle2 = initChatWidget({ workflowId: 'wf-2' });
    expect(handle1).not.toBe(handle2);
  });

  it('accepts minimal config with workflowId only', () => {
    expect(() => initChatWidget({ workflowId: 'wf-x' })).not.toThrow();
  });

  it('init log and destroy log are separate calls', () => {
    const { destroy } = initChatWidget({ workflowId: 'wf-seq' });
    destroy();
    expect(console.log).toHaveBeenCalledTimes(2);
  });
});

describe('window.CtrlChecksChat global', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exposes .init on window.CtrlChecksChat after module load', () => {
    expect((window as any).CtrlChecksChat).toBeDefined();
    expect(typeof (window as any).CtrlChecksChat.init).toBe('function');
  });

  it('.init is the same reference as initChatWidget', () => {
    expect((window as any).CtrlChecksChat.init).toBe(initChatWidget);
  });

  it('.init called via global returns { destroy }', () => {
    const result = (window as any).CtrlChecksChat.init({ workflowId: 'wf-global' });
    expect(result).toHaveProperty('destroy');
    expect(typeof result.destroy).toBe('function');
  });

  it('.init called via global logs config', () => {
    const config: ChatEmbedConfig = { workflowId: 'wf-global', theme: 'light' };
    (window as any).CtrlChecksChat.init(config);
    expect(console.log).toHaveBeenCalledWith('Initializing chat widget with config:', config);
  });
});
