-- Add the new phone_number column
ALTER TABLE gaming_profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Optional: NOTIFY pgrst to reload the schema cache immediately 
NOTIFY pgrst, 'reload schema';
