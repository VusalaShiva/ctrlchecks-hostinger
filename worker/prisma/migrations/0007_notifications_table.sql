-- Migration 0007: Notifications Table
-- Creates the notifications table for in-app notifications.
-- The notification-service writes rows; the worker reads them for the frontend.
-- All statements use IF NOT EXISTS so this migration is safe to re-run.

CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'info',
  read        BOOLEAN NOT NULL DEFAULT FALSE,
  link        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id
  ON notifications(user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON notifications(user_id, read)
  WHERE read = FALSE;

CREATE INDEX IF NOT EXISTS idx_notifications_created_at
  ON notifications(created_at DESC);

-- ROLLBACK (run manually if needed)
-- DROP TABLE IF EXISTS notifications;
