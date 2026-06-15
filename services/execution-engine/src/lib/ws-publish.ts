import { getRedis } from './redis';

const CHANNEL_PREFIX = process.env.WEBSOCKET_REDIS_CHANNEL_PREFIX || 'ws:exec:';
const EXECUTION_CHANNEL = `${CHANNEL_PREFIX}events`;
const SOURCE_REPLICA = `engine-${process.pid}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Publish an execution lifecycle event to the same Redis pub/sub channel
 * as the worker's ws-redis-bridge. All connected workers forward it to
 * subscribed WebSocket clients automatically.
 */
export async function publishExecutionEvent(
  executionId: string,
  message: Record<string, unknown>,
): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;
  const event = {
    executionId,
    message,
    sourceReplica: SOURCE_REPLICA,
    ts: Date.now(),
  };
  await redis.publish(EXECUTION_CHANNEL, JSON.stringify(event));
}
