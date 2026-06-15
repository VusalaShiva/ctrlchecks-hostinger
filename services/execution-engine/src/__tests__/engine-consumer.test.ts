// Mock Redis — engine-consumer uses getRedis() directly
const mockZrange = jest.fn();
const mockZrem = jest.fn();
const mockZadd = jest.fn();
const mockGet = jest.fn();
const mockRedisInstance = {
  status: 'ready',
  zrange: mockZrange,
  zrem: mockZrem,
  zadd: mockZadd,
  get: mockGet,
};

jest.mock('../lib/redis', () => ({
  getRedis: jest.fn().mockResolvedValue(mockRedisInstance),
}));

// Mock engine-runner so we can observe calls without real HTTP
const mockRunEngineJob = jest.fn().mockResolvedValue(undefined);
jest.mock('../runner/engine-runner', () => ({
  runEngineJob: mockRunEngineJob,
}));

import { startEngineConsumer, stopEngineConsumer } from '../runner/engine-consumer';

const SAMPLE_JOB = {
  id: 'job_e2e_001',
  workflowId: 'wf_test',
  executionId: 'exec_test',
  input: {},
  userId: 'user_e2e',
  metadata: { source: 'execution-engine' },
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.EXECUTION_ENGINE_CONSUMER_ENABLED = 'true';
});

afterEach(() => {
  stopEngineConsumer();
  delete process.env.EXECUTION_ENGINE_CONSUMER_ENABLED;
});

describe('engine-consumer', () => {
  it('does not start when EXECUTION_ENGINE_CONSUMER_ENABLED is not true', () => {
    delete process.env.EXECUTION_ENGINE_CONSUMER_ENABLED;
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    startEngineConsumer();
    // No Redis calls should happen from the start itself
    expect(mockZrange).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('dequeues job from engine queue and passes it to runEngineJob', async () => {
    mockZrange.mockResolvedValueOnce(['job_e2e_001']);
    mockGet.mockResolvedValueOnce(JSON.stringify(SAMPLE_JOB));
    mockZrem.mockResolvedValue(1);
    mockZadd.mockResolvedValue(1);

    const { dequeueAndRunForTest } = await import('../runner/engine-consumer');
    await dequeueAndRunForTest();
    // Give the fire-and-forget runEngineJob a tick to start
    await new Promise(r => setTimeout(r, 10));

    expect(mockRunEngineJob).toHaveBeenCalledWith(SAMPLE_JOB);
  });

  it('handles empty queue without throwing', async () => {
    mockZrange.mockResolvedValueOnce([]);

    const { dequeueAndRunForTest } = await import('../runner/engine-consumer');
    await expect(dequeueAndRunForTest()).resolves.not.toThrow();
    expect(mockRunEngineJob).not.toHaveBeenCalled();
  });

  it('removes stale job reference (no job data) from queue without running', async () => {
    mockZrange.mockResolvedValueOnce(['stale_job_id']);
    mockGet.mockResolvedValueOnce(null); // job data expired
    mockZrem.mockResolvedValue(1);

    const { dequeueAndRunForTest } = await import('../runner/engine-consumer');
    await dequeueAndRunForTest();

    expect(mockRunEngineJob).not.toHaveBeenCalled();
    expect(mockZrem).toHaveBeenCalledWith('workflow:execution:engine-queue', 'stale_job_id');
  });

  it('exports startEngineConsumer and stopEngineConsumer', () => {
    expect(typeof startEngineConsumer).toBe('function');
    expect(typeof stopEngineConsumer).toBe('function');
  });
});
