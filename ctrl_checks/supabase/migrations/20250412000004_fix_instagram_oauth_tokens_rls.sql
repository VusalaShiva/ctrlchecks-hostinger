-- Fix: ensure instagram_oauth_tokens has all columns and correct RLS policies

-- Add missing columns if not present
ALTER TABLE public.instagram_oauth_tokens
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Drop and recreate RLS policies to ensure they're correct
DROP POLICY IF EXISTS "Users can view their own Instagram tokens" ON public.instagram_oauth_tokens;
DROP POLICY IF EXISTS "Users can insert their own Instagram tokens" ON public.instagram_oauth_tokens;
DROP POLICY IF EXISTS "Users can update their own Instagram tokens" ON public.instagram_oauth_tokens;
DROP POLICY IF EXISTS "Users can delete their own Instagram tokens" ON public.instagram_oauth_tokens;

CREATE POLICY "Users can view their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Instagram tokens"
  ON public.instagram_oauth_tokens FOR DELETE USING (auth.uid() = user_id);

-- Verify table structure
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'instagram_oauth_tokens'
ORDER BY ordinal_position;
