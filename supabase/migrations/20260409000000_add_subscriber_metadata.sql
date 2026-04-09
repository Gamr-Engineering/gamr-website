-- Add source and tags columns to gamr_subscribers
ALTER TABLE gamr_subscribers 
ADD COLUMN IF NOT EXISTS source TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Index source for potential future analytics performance
CREATE INDEX IF NOT EXISTS idx_gamr_subscribers_source ON gamr_subscribers(source);
