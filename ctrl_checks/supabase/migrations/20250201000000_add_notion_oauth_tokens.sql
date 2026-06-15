-- Create table for storing Notion OAuth tokens
CREATE TABLE IF NOT EXISTS public.notion_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  scope TEXT,
  bot_id TEXT,
  workspace_id TEXT,
  workspace_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.notion_oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own Notion tokens" ON public.notion_oauth_tokens;
DROP POLICY IF EXISTS "Users can insert own Notion tokens" ON public.notion_oauth_tokens;
DROP POLICY IF EXISTS "Users can update own Notion tokens" ON public.notion_oauth_tokens;
DROP POLICY IF EXISTS "Users can delete own Notion tokens" ON public.notion_oauth_tokens;

-- Policies: Users can only access their own tokens
CREATE POLICY "Users can view own Notion tokens" ON public.notion_oauth_tokens
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Notion tokens" ON public.notion_oauth_tokens
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Notion tokens" ON public.notion_oauth_tokens
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own Notion tokens" ON public.notion_oauth_tokens
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_notion_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (for idempotency)
DROP TRIGGER IF EXISTS update_notion_oauth_tokens_updated_at ON public.notion_oauth_tokens;

-- Create trigger
CREATE TRIGGER update_notion_oauth_tokens_updated_at
  BEFORE UPDATE ON public.notion_oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_notion_tokens_updated_at();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_notion_oauth_tokens_user_id ON public.notion_oauth_tokens(user_id);
