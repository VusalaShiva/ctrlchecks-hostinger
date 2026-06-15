import { queryDb } from './db';
import { publishNotification } from './redis-pub';

export interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface InsertPayload {
  userId: string;
  title: string;
  message: string;
  type?: string;
  link?: string | null;
}

/** Insert a notification row and publish to Redis. Returns the created row. */
export async function insert(payload: InsertPayload): Promise<NotificationRow> {
  const { userId, title, message, type = 'info', link = null } = payload;
  const rows = await queryDb(
    `INSERT INTO notifications (user_id, title, message, type, link)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, title, message, type, read, link, created_at`,
    [userId, title, message, type, link],
  );
  const row: NotificationRow = rows[0];
  // Publish to Redis for optional worker WebSocket subscriber — fire-and-forget
  publishNotification(userId, row).catch(() => { /* non-fatal */ });
  return row;
}

/** List notifications for a user, newest first. */
export async function listByUser(userId: string, unreadOnly = false): Promise<NotificationRow[]> {
  const sql = unreadOnly
    ? `SELECT id, user_id, title, message, type, read, link, created_at
       FROM notifications WHERE user_id = $1 AND read = FALSE ORDER BY created_at DESC LIMIT 100`
    : `SELECT id, user_id, title, message, type, read, link, created_at
       FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`;
  return queryDb(sql, [userId]);
}

/**
 * Mark a notification as read. Scoped to userId to prevent cross-user access.
 * Returns true if a row was updated, false if not found.
 */
export async function markRead(id: string, userId: string): Promise<boolean> {
  const rows = await queryDb(
    `UPDATE notifications SET read = TRUE
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [id, userId],
  );
  return rows.length > 0;
}
