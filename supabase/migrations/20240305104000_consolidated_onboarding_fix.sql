-- Consolidated migration for gaming_profiles onboarding fields
-- This script ensures all missing columns for the claim-gamrtag flow exist.

-- 1. Add phone_number column
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- 2. Add plural array columns for multi-select (Gamer DNA)
-- Using TEXT[] to match the frontend array structure
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS gamer_archetypes TEXT[] DEFAULT '{}';
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS play_styles TEXT[] DEFAULT '{}';

-- 3. Refresh the schema cache so PostgREST recognizes the new columns immediately
NOTIFY pgrst, 'reload schema';
