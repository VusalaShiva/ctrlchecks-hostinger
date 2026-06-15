import Redis from 'ioredis';

let client: Redis | null = null;

export async function getRedis(): Promise<Redis | null> {
  if (client && client.status === 'ready') return client;

  const url = process.env.REDIS_URL;
  if (!url) return null;

  try {
    const r = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      enableOfflineQueue: false,
    });
    await r.connect();
    client = r;
    return client;
  } catch {
    return null;
  }
}

export function closeRedis(): Promise<string> | void {
  if (client) {
    const c = client;
    client = null;
    return c.quit();
  }
}
