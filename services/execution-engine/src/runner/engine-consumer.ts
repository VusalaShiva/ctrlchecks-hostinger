/**
 * engine-consumer.ts
 *
 * Polls workflow:execution:engine-queue (Redis sorted set) and runs
 * engine-owned jobs via engine-runner.ts.
 *
 * Lifecycle:
 *   startEngineConsumer() — begin polling (call on boot when EXECUTION_ENGINE_CONSUMER_ENABLED=true)
 *   stopEngineConsumer()  — signal graceful shutdown
 */

import { getRedis } from '../lib/redis';
import type { EngineJob } from './engine-runner';

const ENGINE_QUEUE_KEY = 'workflow:execution:engine-queue';
const JOB_KEY_PREFIX = 'workflow:execution:job:';
const PROCESSING_KEY = 'workflow:execution:engine-processing';
const POLL_INTERVAL_MS = 500;
const MAX_CONCURRENT = 3;

let activeJobs = 0;
let stopped = false;
let pollTimer: ReturnType<typeof setTimeout> | null = null;

export function startEngineConsumer(): void {
  if (process.env.EXECUTION_ENGINE_CONSUMER_ENABLED !== 'true') {
    console.log('[engine-consumer] Consumer disabled (EXECUTION_ENGINE_CONSUMER_ENABLED != true)');
    return;
  }
  console.log(`[engine-consumer] Started — polling ${ENGINE_QUEUE_KEY} every ${POLL_INTERVAL_MS}ms (max ${MAX_CONCURRENT} concurrent)`);
  stopped = false;
  schedulePoll();
}

export function stopEngineConsumer(): void {
  stopped = true;
  if (pollTimer) {
    clearTimeout(pollTimer);
    pollTimer = null;
  }
  console.log('[engine-consumer] Stopped');
}

/** Exposed for unit testing only — not part of the public API. */
export async function dequeueAndRunForTest(): Promise<void> {
  return dequeueAndRun();
}

function schedulePoll(): void {
  if (stopped) return;
  pollTimer = setTimeout(async () => {
    try {
      if (!stopped && activeJobs < MAX_CONCURRENT) {
        await dequeueAndRun();
      }
    } catch (err) {
      console.error('[engine-consumer] Poll error:', err);
    }
    if (!stopped) schedulePoll();
  }, POLL_INTERVAL_MS);
}

async function dequeueAndRun(): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  // Pop highest-priority item from sorted set (score 0 = FIFO)
  const members = await redis.zrange(ENGINE_QUEUE_KEY, 0, 0);
  if (!members || members.length === 0) return;

  const jobId = members[0];
  const jobData = await redis.get(`${JOB_KEY_PREFIX}${jobId}`);

  if (!jobData) {
    await redis.zrem(ENGINE_QUEUE_KEY, jobId);
    return;
  }

  // Atomically move from queue → processing set
  await redis.zrem(ENGINE_QUEUE_KEY, jobId);
  await redis.zadd(PROCESSING_KEY, Date.now(), jobId);

  const job: EngineJob = JSON.parse(jobData);
  activeJobs++;

  const { runEngineJob } = await import('./engine-runner');
  runEngineJob(job)
    .catch(err => console.error(`[engine-consumer] Unhandled error for job ${jobId}:`, err))
    .finally(async () => {
      activeJobs--;
      const r = await getRedis();
      if (r) await r.zrem(PROCESSING_KEY, jobId).catch(() => {});
    });
}
