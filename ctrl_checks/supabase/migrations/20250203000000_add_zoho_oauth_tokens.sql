-- Create table for storing Zoho OAuth tokens
-- Supports multiple regions (US, EU, IN, AU, CN, JP)

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.zoho_oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  scope TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add region column if it doesn't exist (for existing tables)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'zoho_oauth_tokens' 
    AND column_name = 'region'
  ) THEN
    ALTER TABLE public.zoho_oauth_tokens 
    ADD COLUMN region TEXT DEFAULT 'US' CHECK (region IN ('US', 'EU', 'IN', 'AU', 'CN', 'JP'));
    
    -- Update existing rows to have default region
    UPDATE public.zoho_oauth_tokens 
    SET region = 'US' 
    WHERE region IS NULL;
  END IF;
END $$;

-- Drop old unique constraint if it exists (user_id only)
ALTER TABLE public.zoho_oauth_tokens 
DROP CONSTRAINT IF EXISTS zoho_oauth_tokens_user_id_key;

-- Add new unique constraint with region
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'zoho_oauth_tokens_user_id_region_key'
  ) THEN
    ALTER TABLE public.zoho_oauth_tokens 
    ADD CONSTRAINT zoho_oauth_tokens_user_id_region_key UNIQUE (user_id, region);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE public.zoho_oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own Zoho tokens" ON public.zoho_oauth_tokens;
DROP POLICY IF EXISTS "Users can insert own Zoho tokens" ON public.zoho_oauth_tokens;
DROP POLICY IF EXISTS "Users can update own Zoho tokens" ON public.zoho_oauth_tokens;
DROP POLICY IF EXISTS "Users can delete own Zoho tokens" ON public.zoho_oauth_tokens;

-- Policies: Users can only access their own tokens
CREATE POLICY "Users can view own Zoho tokens" ON public.zoho_oauth_tokens
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Zoho tokens" ON public.zoho_oauth_tokens
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Zoho tokens" ON public.zoho_oauth_tokens
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own Zoho tokens" ON public.zoho_oauth_tokens
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_zoho_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (for idempotency)
DROP TRIGGER IF EXISTS update_zoho_oauth_tokens_updated_at ON public.zoho_oauth_tokens;

-- Create trigger
CREATE TRIGGER update_zoho_oauth_tokens_updated_at
  BEFORE UPDATE ON public.zoho_oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_zoho_tokens_updated_at();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_zoho_oauth_tokens_user_id ON public.zoho_oauth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_zoho_oauth_tokens_user_region ON public.zoho_oauth_tokens(user_id, region);
