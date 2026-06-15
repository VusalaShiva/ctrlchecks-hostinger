-- Migration: Add WhatsApp OAuth tokens table
-- Stores WhatsApp Business API tokens per platform user

CREATE TABLE IF NOT EXISTS public.whatsapp_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  scope TEXT,
  phone_number_id TEXT,
  business_account_id TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.whatsapp_oauth_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own WhatsApp tokens"
  ON public.whatsapp_oauth_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own WhatsApp tokens"
  ON public.whatsapp_oauth_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own WhatsApp tokens"
  ON public.whatsapp_oauth_tokens FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own WhatsApp tokens"
  ON public.whatsapp_oauth_tokens FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_whatsapp_oauth_tokens_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER update_whatsapp_oauth_tokens_updated_at
  BEFORE UPDATE ON public.whatsapp_oauth_tokens
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_oauth_tokens_updated_at();

CREATE INDEX IF NOT EXISTS idx_whatsapp_oauth_tokens_user_id ON public.whatsapp_oauth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_oauth_tokens_phone_number_id ON public.whatsapp_oauth_tokens(phone_number_id);
