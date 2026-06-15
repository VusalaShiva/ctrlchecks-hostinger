-- Migration: Add Twitter OAuth tokens table
-- Description: Stores Twitter OAuth 2.0 access tokens and user information
-- Created: 2025-02-02

-- Create Twitter OAuth tokens table
CREATE TABLE IF NOT EXISTS public.twitter_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  scope TEXT,
  user_id_twitter TEXT,
  username TEXT,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.twitter_oauth_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own tokens
CREATE POLICY "Users can view their own Twitter tokens"
  ON public.twitter_oauth_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Twitter tokens"
  ON public.twitter_oauth_tokens
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Twitter tokens"
  ON public.twitter_oauth_tokens
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Twitter tokens"
  ON public.twitter_oauth_tokens
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_twitter_oauth_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_twitter_oauth_tokens_updated_at
  BEFORE UPDATE ON public.twitter_oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_twitter_oauth_tokens_updated_at();

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_twitter_oauth_tokens_user_id 
  ON public.twitter_oauth_tokens(user_id);

-- Create index on username for lookups
CREATE INDEX IF NOT EXISTS idx_twitter_oauth_tokens_username 
  ON public.twitter_oauth_tokens(username);
