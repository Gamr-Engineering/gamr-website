-- =============================================
-- GAMR Gaming Profiles Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create the gaming_profiles table
CREATE TABLE gaming_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Identity
  gamr_tag TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,

  -- Location
  city TEXT,
  country TEXT NOT NULL,

  -- Gaming
  favorite_games TEXT[] DEFAULT '{}',
  platform TEXT NOT NULL,
  gaming_region TEXT NOT NULL,

  -- Personality Identifiers
  gamer_archetype TEXT NOT NULL,          -- Competitor, Explorer, Socializer, Achiever
  play_style TEXT NOT NULL,               -- Casual, Hardcore, Speedrunner, Streamer, Content Creator
  personality_traits TEXT[] DEFAULT '{}', -- Team Player, Solo Wolf, Strategist, Aggressor, etc.

  -- Meta
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gaming_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the registration flow)
CREATE POLICY "Allow anonymous insert" ON gaming_profiles
  FOR INSERT WITH CHECK (true);

-- Create secure RPC function for checking gamr_tag availability
CREATE OR REPLACE FUNCTION check_gamr_tag_available(tag_to_check text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM gaming_profiles WHERE gamr_tag = tag_to_check
  );
END;
$$;

-- Create secure RPC function for checking email availability
CREATE OR REPLACE FUNCTION check_email_available(email_to_check text, exclude_id uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF exclude_id IS NOT NULL THEN
    RETURN NOT EXISTS (
      SELECT 1 FROM gaming_profiles WHERE email ILIKE email_to_check AND id != exclude_id
    );
  ELSE
    RETURN NOT EXISTS (
      SELECT 1 FROM gaming_profiles WHERE email ILIKE email_to_check
    );
  END IF;
END;
$$;
-- Indexes
CREATE INDEX idx_gaming_profiles_gamr_tag ON gaming_profiles (gamr_tag);
CREATE INDEX idx_gaming_profiles_email ON gaming_profiles (email);
CREATE INDEX idx_gaming_profiles_country ON gaming_profiles (country);

-- =============================================
-- GAMR Content Submissions Schema
-- =============================================

CREATE TABLE article_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  featured BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE article_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public submission form)
CREATE POLICY "Allow anonymous insert for submissions" ON article_submissions
  FOR INSERT WITH CHECK (true);

-- Allow authenticated read (for the admin dashboard)
CREATE POLICY "Allow authenticated read for admin dashboard" ON article_submissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Allow public read for approved articles
CREATE POLICY "Allow public read for approved articles" ON article_submissions
  FOR SELECT USING (status = 'approved');

-- Allow authenticated update (for approving/rejecting in the admin dashboard)
CREATE POLICY "Allow authenticated update for admin dashboard" ON article_submissions
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Allow authenticated delete (for removing submissions in the admin dashboard)
CREATE POLICY "Allow authenticated delete for admin dashboard" ON article_submissions
  FOR DELETE USING (auth.uid() IS NOT NULL);
