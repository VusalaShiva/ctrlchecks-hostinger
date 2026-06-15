/**
 * Tests that the worker's ExecutionQueue defensively skips jobs tagged
 * source='execution-engine' — these belong to the engine's own consumer.
 */

jest.mock('../execution-job-runner', () => ({
  runExecutionJob: jest.fn().mockResolvedValue({ status: 'success', result: {} }),
}));

import { ExecutionQueue, ExecutionJob } from '../execution-queue';

function makeJob(overrides: Partial<ExecutionJob> = {}): ExecutionJob {
  return {
    id: 'job_test',
    workflowId: 'wf_123',
    executionId: 'exec_abc',
    input: {},
    userId: undefined,
    priority: 0,
    maxRetries: 3,
    retryDelay: 5000,
    createdAt: Date.now(),
    status: 'queued',
    retryCount: 0,
    ...overrides,
  };
}

describe('ExecutionQueue — engine-tagged job skip', () => {
  let queue: ExecutionQueue;
  let mockBackend: { updateJob: jest.Mock; enqueue: jest.Mock; dequeue: jest.Mock; getJob: jest.Mock; getQueueSize: jest.Mock; clear: jest.Mock };

  beforeEach(() => {
    queue = new ExecutionQueue();
    mockBackend = {
      updateJob: jest.fn().mockResolvedValue(undefined),
      enqueue: jest.fn().mockResolvedValue(undefined),
      dequeue: jest.fn().mockResolvedValue(null),
      getJob: jest.fn().mockResolvedValue(null),
      getQueueSize: jest.fn().mockResolvedValue(0),
      clear: jest.fn().mockResolvedValue(undefined),
    };
    // Inject mock backend via private field access (test only)
    (queue as any).backend = mockBackend;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('marks engine-tagged job as failed and emits job:failed without running it', async () => {
    const { runExecutionJob } = await import('../execution-job-runner');
    const job = makeJob({ metadata: { source: 'execution-engine' } });

    let failedJob: ExecutionJob | null = null;
    queue.on('job:failed', j => { failedJob = j; });

    await (queue as any).executeJob(job);

    expect(runExecutionJob).not.toHaveBeenCalled();
    expect(failedJob).not.toBeNull();
    expect(failedJob!.status).toBe('failed');
    expect(failedJob!.error).toContain('Misrouted');
    expect(mockBackend.updateJob).toHaveBeenCalledWith(expect.objectContaining({ status: 'failed' }));
  });

  it('runs normal jobs without the metadata guard triggering', async () => {
    const { runExecutionJob } = (await import('../execution-job-runner')) as any;
    const job = makeJob(); // no metadata.source

    // executeJob will call runExecutionJob which we mocked to return success
    await (queue as any).executeJob(job);

    expect(runExecutionJob).toHaveBeenCalledWith(job);
  });

  it('runs jobs with unrelated metadata.source without skipping', async () => {
    const { runExecutionJob } = (await import('../execution-job-runner')) as any;
    const job = makeJob({ metadata: { source: 'api' } });

    await (queue as any).executeJob(job);

    expect(runExecutionJob).toHaveBeenCalledWith(job);
  });
});
