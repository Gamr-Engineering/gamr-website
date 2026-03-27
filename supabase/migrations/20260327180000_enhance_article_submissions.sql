ALTER TABLE article_submissions ADD COLUMN featured BOOLEAN DEFAULT false;
ALTER TABLE article_submissions ADD COLUMN slug TEXT;

-- Generate a random slug for any existing rows that don't have one
UPDATE article_submissions SET slug = 'submission-' || substr(md5(random()::text), 1, 8) WHERE slug IS NULL;

-- Enforce uniqueness
ALTER TABLE article_submissions ADD CONSTRAINT unique_slug UNIQUE (slug);

-- Allow the dashboard to delete submissions (powerful admin feature)
CREATE POLICY "Allow public delete for admin dashboard" ON article_submissions
  FOR DELETE USING (true);
