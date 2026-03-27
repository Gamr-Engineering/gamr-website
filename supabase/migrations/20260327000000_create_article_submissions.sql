-- Create the article_submissions table
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
