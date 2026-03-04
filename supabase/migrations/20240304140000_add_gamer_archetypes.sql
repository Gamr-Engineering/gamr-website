-- Add the new array columns for multi-select
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS gamer_archetypes TEXT[] DEFAULT '{}';
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS play_styles TEXT[] DEFAULT '{}';

-- Optional: NOTIFY pgrst to reload the schema cache immediately 
NOTIFY pgrst, 'reload schema';
