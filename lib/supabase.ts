import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Database } from '../types/supabase';

// Get the environment variables
const getEnvVars = () => {
  const expoConstants = Constants.expoConfig?.extra;
  
  return {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || expoConstants?.supabaseUrl || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || expoConstants?.supabaseAnonKey || '',
  };
};

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be provided! Check your environment variables.');
}

// Create a custom storage implementation that's SSR-friendly
const createCustomStorage = () => {
  // When in a server environment or SSR, use a memory-based implementation
  if (typeof window === 'undefined' || (Platform.OS === 'web' && typeof document === 'undefined')) {
    // Simple in-memory implementation for SSR
    const memoryStorage: Record<string, string> = {};
    return {
      getItem: (key: string): Promise<string | null> => {
        return Promise.resolve(memoryStorage[key] || null);
      },
      setItem: (key: string, value: string): Promise<void> => {
        memoryStorage[key] = value;
        return Promise.resolve();
      },
      removeItem: (key: string): Promise<void> => {
        delete memoryStorage[key];
        return Promise.resolve();
      },
    };
  }
  // In browser or React Native, use AsyncStorage
  return AsyncStorage;
};

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createCustomStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',  // Only detect in URL for web platform
  },
});

// Microsoft authentication helper
export const signInWithMicrosoft = async () => {
  try {
    const redirectUrl = Platform.OS === 'web'
      ? window.location.origin + '/auth/callback'
      : 'gmvschool://auth/callback';
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure' as any,
      options: {
        redirectTo: redirectUrl,
        scopes: 'email profile offline_access',
        skipBrowserRedirect: Platform.OS !== 'web',
      },
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Microsoft OAuth error:', error);
    throw error;
  }
};

// Helper to get the current user's profile from the database
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Helper to create or update a user profile
export const upsertUserProfile = async (profile: Database['public']['Tables']['profiles']['Insert']) => {
  try {
    console.log('Attempting to upsert profile with ID:', profile.id);
    
    // With RLS disabled, we can simplify this function
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();
      
    if (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }
    
    console.log('Profile updated successfully');
    
    // Check if this is the current user
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.id === profile.id) {
        // Update auth metadata for current user
        await supabase.auth.updateUser({
          data: { 
            role: profile.role,
            full_name: profile.full_name
          }
        });
        console.log('Auth metadata updated for user');
      }
    } catch (authError) {
      console.error('Error updating auth metadata:', authError);
      // Continue anyway as the profile was updated successfully
    }
    
    return data;
  } catch (error) {
    console.error('Error in upsertUserProfile:', error);
    throw error;
  }
}; 