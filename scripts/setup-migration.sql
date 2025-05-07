-- Run this in the Supabase SQL Editor before running the migration script
-- This creates the helper function needed for the migration script to work

-- Create the pgexec function for running SQL
CREATE OR REPLACE FUNCTION pgexec(sql text) 
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION pgexec TO service_role;

-- Optional: Verify the function exists
SELECT proname, proowner::regrole::text 
FROM pg_proc
WHERE proname = 'pgexec';

-- If you have issues with infinite recursion in RLS policies, this SQL can help diagnose:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles'; 