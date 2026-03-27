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

-- Allow public reads (for tag uniqueness checks)
CREATE POLICY "Allow public read for tag check" ON gaming_profiles
  FOR SELECT USING (true);

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
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE article_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public submission form)
CREATE POLICY "Allow anonymous insert for submissions" ON article_submissions
  FOR INSERT WITH CHECK (true);
