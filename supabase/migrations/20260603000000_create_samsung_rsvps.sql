-- =============================================
-- Create samsung_rsvps table
-- =============================================

CREATE TABLE samsung_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_competitor BOOLEAN DEFAULT false NOT NULL,
  game TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE samsung_rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (needed for the RSVP registration flow)
CREATE POLICY "Allow anonymous insert for samsung_rsvps" ON samsung_rsvps
  FOR INSERT WITH CHECK (true);

-- Index for query performance
CREATE INDEX idx_samsung_rsvps_email ON samsung_rsvps (email);
