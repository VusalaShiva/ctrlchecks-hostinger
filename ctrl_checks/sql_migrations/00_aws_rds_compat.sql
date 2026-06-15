-- ============================================================
-- AWS RDS COMPATIBILITY LAYER — v2
-- RUN THIS FILE FIRST before all other migration files.
-- ============================================================

-- Step 1: Create the auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Step 2: Create PostgreSQL roles that Supabase creates automatically
DO $$ BEGIN CREATE ROLE authenticated; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE anon; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE service_role; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Grant auth schema to these roles
GRANT USAGE ON SCHEMA auth TO authenticated, anon, service_role;

-- Step 3: Create auth.users table (Supabase has this built-in)
-- This is the master users table. All other tables FK into this.
-- When a user logs in via Cognito, the backend inserts a row here.
CREATE TABLE IF NOT EXISTS auth.users (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                text UNIQUE,
  phone                text,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now(),
  last_sign_in_at      timestamptz,
  raw_user_meta_data   jsonb DEFAULT '{}'::jsonb,
  raw_app_meta_data    jsonb DEFAULT '{}'::jsonb,
  is_super_admin       boolean DEFAULT false,
  role                 text DEFAULT 'authenticated',
  encrypted_password   text,
  confirmation_token   text,
  email_confirmed_at   timestamptz,
  banned_until         timestamptz,
  deleted_at           timestamptz
);

-- Step 4: auth.uid() — returns current user's UUID from session variable
CREATE OR REPLACE FUNCTION auth.uid()
RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT NULLIF(current_setting('app.current_user_id', true), '')::uuid;
$$;

-- Step 5: auth.role() — returns current role from session variable
CREATE OR REPLACE FUNCTION auth.role()
RETURNS text LANGUAGE sql STABLE AS $$
  SELECT COALESCE(NULLIF(current_setting('app.current_role', true), ''), 'anon');
$$;

-- Step 6: auth.jwt() — returns JWT claims from session variable
CREATE OR REPLACE FUNCTION auth.jwt()
RETURNS jsonb LANGUAGE sql STABLE AS $$
  SELECT COALESCE(NULLIF(current_setting('app.current_jwt', true), ''), '{}')::jsonb;
$$;

-- Step 7: Grant execute on auth functions to roles
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION auth.jwt() TO authenticated, anon, service_role;
GRANT ALL ON auth.users TO authenticated, service_role;
