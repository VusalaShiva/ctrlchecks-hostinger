-- Migration: Add name and profile_picture_url columns to instagram_oauth_tokens
-- These are returned by the Instagram Login API (not available in Facebook Graph API flow)

ALTER TABLE public.instagram_oauth_tokens
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;
