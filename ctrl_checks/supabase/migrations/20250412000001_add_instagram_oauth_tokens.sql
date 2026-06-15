-- Migration: Add Instagram OAuth tokens table
-- Stores Instagram Graph API tokens per platform user

CREATE TABLE IF NOT EXISTS public.instagram_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  scope TEXT,
  ig_user_id TEXT,
  username TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.instagram_oauth_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_instagram_oauth_tokens_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER update_instagram_oauth_tokens_updated_at
  BEFORE UPDATE ON public.instagram_oauth_tokens
  FOR EACH ROW EXECUTE FUNCTION update_instagram_oauth_tokens_updated_at();

CREATE INDEX IF NOT EXISTS idx_instagram_oauth_tokens_user_id ON public.instagram_oauth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_instagram_oauth_tokens_ig_user_id ON public.instagram_oauth_tokens(ig_user_id);
