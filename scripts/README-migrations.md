# Supabase Database Migrations

This directory contains scripts for managing the Supabase database schema.

## Running Migrations

The migration script applies the SQL schema in `supabase-schema.sql` to your Supabase database.

### Prerequisites

1. Make sure you have the following environment variables set:
   - `SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key (not the anon key)

   You can set these in a `.env` file in the project root.

2. Install dependencies:
   ```
   npm install
   ```

### First-Time Setup

Before running the migration script for the first time:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `setup-migration.sql` into the editor
4. Run the SQL to create the helper function needed for migrations

### Running the Migration

```
npm run migrate-db
```

This will:
1. Connect to your Supabase database
2. Parse and execute each statement in the schema file
3. Report on successful and failed statements

The schema file uses the following patterns:
- `DROP POLICY IF EXISTS` followed by `CREATE POLICY` to ensure policies are updated
- Role checks using the profiles table instead of JWT claims to avoid auth-related syntax errors
- RLS policies that avoid direct references to `auth.jwt()` which can cause compatibility issues

### Troubleshooting

If you encounter errors:

- **"pgexec function not found"**: Run the setup-migration.sql in the Supabase SQL Editor first
- **RLS policy errors**: Make sure you're using the service role key, not the anon key
- **Infinite recursion errors**: Check for circular references in your RLS policies
- **Auth-related errors**: The schema avoids direct access to JWT claims, but if you still see auth errors, you may need to modify the policy to use a different approach to role checking
- **Other errors**: Check the console output for specific error messages

## Modifying the Schema

When making changes to the database schema:

1. Update the `supabase-schema.sql` file with your changes
2. Run the migration script to apply changes
3. If adding new tables or major changes, consider creating a new migration file and updating the script

## Security Notes

- Never commit your service role key to version control
- The migration script uses the service role key to bypass RLS policies
- In production environments, consider using Supabase's migration tools or a CI/CD pipeline 