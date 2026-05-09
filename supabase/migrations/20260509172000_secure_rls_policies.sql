-- 1. Secure gaming_profiles table

-- Drop the dangerous public read policy
DROP POLICY IF EXISTS "Allow public read for tag check" ON gaming_profiles;

-- Create secure RPC function for checking gamr_tag availability
CREATE OR REPLACE FUNCTION check_gamr_tag_available(tag_to_check text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Runs as the creator (postgres) to bypass RLS
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


-- 2. Secure article_submissions table

-- Drop the dangerous public dashboard policies
DROP POLICY IF EXISTS "Allow public select for admin dashboard" ON article_submissions;
DROP POLICY IF EXISTS "Allow public update for admin dashboard" ON article_submissions;
DROP POLICY IF EXISTS "Allow public delete for admin dashboard" ON article_submissions;

-- Create secure policies that require an authenticated user
CREATE POLICY "Allow authenticated read for admin dashboard" ON article_submissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update for admin dashboard" ON article_submissions
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete for admin dashboard" ON article_submissions
  FOR DELETE USING (auth.uid() IS NOT NULL);
