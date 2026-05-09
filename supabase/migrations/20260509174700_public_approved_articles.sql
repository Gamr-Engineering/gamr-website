-- Allow public users to read APPROVED article submissions
CREATE POLICY "Allow public read for approved articles" ON article_submissions
  FOR SELECT USING (status = 'approved');
