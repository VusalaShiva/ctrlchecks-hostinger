import Redis from 'ioredis';

let _client: Redis | null = null;

function getChannelPrefix(): string {
  return process.env.NOTIFICATION_REDIS_CHANNEL_PREFIX ?? 'ntf:';
}

function getRedisClient(): Redis | null {
  if (_client) return _client;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    _client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableReadyCheck: false,
    });
    return _client;
  } catch {
    return null;
  }
}

/** Publish a notification row to the user's Redis channel. Non-fatal — swallows all errors. */
export async function publishNotification(userId: string, row: unknown): Promise<void> {
  const client = getRedisClient();
  if (!client) return;
  const channel = `${getChannelPrefix()}${userId}`;
  try {
    await client.publish(channel, JSON.stringify(row));
  } catch {
    // non-fatal — DB write already succeeded
  }
}

/** Reset client — for test isolation only. */
export function _resetRedisClient(): void {
  _client = null;
}
