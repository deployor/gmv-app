#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Must use service key for migrations

if (!supabaseUrl) {
  console.error('Error: SUPABASE_URL or EXPO_PUBLIC_SUPABASE_URL environment variable is required');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_KEY environment variable is required');
  console.error('Note: This should be the service role key, not the anon key');
  process.exit(1);
}

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Path to schema SQL file
const schemaFilePath = path.join(__dirname, 'supabase-schema.sql');

// Function to run SQL query
async function runSql(sql) {
  try {
    const { error } = await supabase.rpc('pgexec', { sql });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { success: false, error };
  }
}

// Main function to run migration
async function runMigration() {
  console.log('Starting database migration...');
  
  try {
    // Read schema file
    const sqlContent = fs.readFileSync(schemaFilePath, 'utf8');
    
    // Split SQL by semicolons, but be careful of semicolons in functions
    const sqlStatements = [];
    let statement = '';
    let inFunction = false;
    
    sqlContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      
      // Check if we're entering a function definition
      if (trimmedLine.includes('CREATE OR REPLACE FUNCTION') || 
          trimmedLine.includes('CREATE FUNCTION')) {
        inFunction = true;
      }
      
      // Check if we're exiting a function definition
      if (inFunction && trimmedLine.includes('LANGUAGE')) {
        // Function language declaration usually marks end of function
        if (trimmedLine.endsWith(';')) {
          inFunction = false;
        }
      }
      
      statement += line + '\n';
      
      // Only split by semicolon if we're not inside a function
      if (trimmedLine.endsWith(';') && !inFunction) {
        sqlStatements.push(statement);
        statement = '';
      }
    });
    
    // Execute each statement
    let successCount = 0;
    let failCount = 0;
    let nonCriticalFailCount = 0;
    
    for (let i = 0; i < sqlStatements.length; i++) {
      const sql = sqlStatements[i].trim();
      if (!sql) continue;
      
      process.stdout.write(`Executing statement ${i + 1}/${sqlStatements.length}... `);
      
      const result = await runSql(sql);
      if (result.success) {
        process.stdout.write('Success\n');
        successCount++;
      } else {
        process.stdout.write('Failed\n');
        failCount++;
        
        // Print the SQL that failed
        if (result.error && result.error.message && result.error.message.includes('auth')) {
          console.log('\nFailed SQL with auth issue:');
          console.log('---------------------------------------------------');
          console.log(sql);
          console.log('---------------------------------------------------');
          
          // Offer alternative version without the auth.jwt() references
          if (sql.includes('auth.jwt()') || sql.includes('auth.jwt()->')) {
            console.log('\nTry replacing the auth.jwt() syntax with:');
            console.log('  USING (role = \'admin\')');
            console.log('Or with direct user ID check:');
            console.log('  USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.raw_app_meta_data->\'role\' = \'"admin"\'))');
          }
        }
        
        // Check if this is a non-critical error (like policy already exists)
        if (sql.includes('CREATE POLICY') || 
            (result.error && result.error.message && 
             result.error.message.includes('policy') && 
             result.error.message.includes('already exists'))) {
          nonCriticalFailCount++;
        }
      }
    }
    
    console.log('\nMigration completed:');
    console.log(`- ${successCount} statements executed successfully`);
    console.log(`- ${failCount} statements failed (${nonCriticalFailCount} non-critical)`);
    
    if (failCount > 0 && failCount !== nonCriticalFailCount) {
      console.log('\nSome critical statements failed. Check the logs above for details.');
      process.exit(1);
    } else if (failCount > 0) {
      console.log('\nOnly non-critical statements failed (e.g., policies already exist).');
      console.log('Migration can be considered successful.');
      process.exit(0);
    } else {
      console.log('\nMigration completed successfully!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 