-- Fix Zoho OAuth tokens table - Add region column if missing
-- This handles the case where the table exists but was created without the region column

-- First, ensure the table exists with all required columns
DO $$
BEGIN
  -- Add region column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'zoho_oauth_tokens' 
    AND column_name = 'region'
  ) THEN
    ALTER TABLE public.zoho_oauth_tokens 
    ADD COLUMN region TEXT DEFAULT 'US' CHECK (region IN ('US', 'EU', 'IN', 'AU', 'CN', 'JP'));
  END IF;

  -- Update existing rows to have default region if NULL
  UPDATE public.zoho_oauth_tokens 
  SET region = 'US' 
  WHERE region IS NULL;
END $$;

-- Drop and recreate unique constraint to include region
ALTER TABLE public.zoho_oauth_tokens 
DROP CONSTRAINT IF EXISTS zoho_oauth_tokens_user_id_key;

ALTER TABLE public.zoho_oauth_tokens 
DROP CONSTRAINT IF EXISTS zoho_oauth_tokens_user_id_region_key;

ALTER TABLE public.zoho_oauth_tokens 
ADD CONSTRAINT zoho_oauth_tokens_user_id_region_key UNIQUE (user_id, region);

-- Create index for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_zoho_oauth_tokens_user_id ON public.zoho_oauth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_zoho_oauth_tokens_user_region ON public.zoho_oauth_tokens(user_id, region);
