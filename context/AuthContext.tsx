import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, fetchUserProfile, upsertUserProfile } from '../lib/supabase';
import { router } from 'expo-router';

type AuthContextProps = {
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, role?: string, fullName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithMicrosoft: (role?: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: any;
  userProfile: any;
  refreshProfile: () => Promise<void>;
  fixUserRole: (userId: string, newRole: 'student' | 'teacher' | 'admin' | 'parent') => Promise<boolean>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Debug function to check and fix user roles if needed
  const debugCheckRole = async () => {
    if (!user?.id) return;
    
    try {
      console.log('Debug: Checking user profile for ID:', user.id);
      
      // Fetch profile directly from database
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Debug: Error fetching profile:', error);
        return;
      }
      
      if (!data) {
        console.log('Debug: No profile found, creating one...');
        
        // Try to get role from user metadata
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const role = authUser?.user_metadata?.role || 'student';
        
        // Create profile if missing
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: authUser?.email,
            role: role,
            created_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Debug: Error creating profile:', insertError);
        } else {
          console.log('Debug: Created new profile with role:', role);
        }
      } else {
        console.log('Debug: Found profile with role:', data.role);
        
        // Only log or update if needed
        if (!data.role || data.role === 'student') {
          console.log('Debug: Profile may need role update');
          
          // Check auth metadata
          const { data: { user: authUser } } = await supabase.auth.getUser();
          const metadataRole = authUser?.user_metadata?.role;
          
          if (metadataRole && metadataRole !== data.role) {
            console.log(`Debug: Auth metadata role (${metadataRole}) differs from profile role (${data.role})`);
          }
        }
      }
    } catch (dbgError) {
      console.error('Debug: Error in role check:', dbgError);
    }
  };

  // Function to fetch user profile data from Supabase
  const refreshProfile = async () => {
    if (!user?.id) return;
    
    try {
      console.log('Fetching user profile for ID:', user.id);
      const profileData = await fetchUserProfile(user.id);
      console.log('Profile data received:', profileData);
      setUserProfile(profileData);
      
      // If the user is logged in, redirect based on role
      if (profileData) {
        console.log('User role detected:', profileData.role);
        
        // Route based on user role
        if (profileData.role === 'admin') {
          console.log('Redirecting to admin dashboard');
          router.replace('/(admin)/dashboard');
        } else if (profileData.role === 'parent') {
          console.log('Redirecting to parent dashboard');
          router.replace('/(tabs)');
        } else if (profileData.role === 'teacher') {
          console.log('Redirecting to teacher view');
          router.replace('/(tabs)');
        } else {
          // Default for students or unknown roles
          console.log('Redirecting to student tabs');
          router.replace('/(tabs)');
        }
      } else {
        console.log('No profile data found, using default route');
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If there's an error, at least route to the default tabs
      router.replace('/(tabs)');
    }
  };

  useEffect(() => {
    // Only run auth checks in browser environment
    if (!isBrowser) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        // Run debug check first
        debugCheckRole();
        // Then do normal profile refresh
        refreshProfile();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Run debug check first
        await debugCheckRole();
        // Then do normal profile refresh
        await refreshProfile();
      } else {
        setUserProfile(null);
        router.replace('/(auth)/login');
      }
      
      setLoading(false);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, role: string = 'student', fullName: string = '') => {
    if (!isBrowser) return;
    
    try {
      setLoading(true);
      // First, sign up the user with auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            full_name: fullName
          }
        }
      });
      
      if (error) throw error;
      
      // Ensure the user was created
      if (data.user) {
        try {
          // Use the dedicated function to create/update the profile
          await upsertUserProfile({
            id: data.user.id,
            email: email,
            full_name: fullName,
            role: role as 'student' | 'teacher' | 'admin' | 'parent'
          });
        } catch (profileError) {
          console.error('Error updating profile with role:', profileError);
          // Continue anyway as the user was created successfully
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isBrowser) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async (role: string = 'student') => {
    if (!isBrowser) return;
    
    try {
      setLoading(true);
      // Store the role in a session variable for reference after OAuth callback
      await supabase.auth.setSession({
        access_token: '',
        refresh_token: '',
      });
      
      // Set temporary localStorage to remember the role across the OAuth redirect
      if (typeof window !== 'undefined') {
        localStorage.setItem('signup_role', role);
      }
      
      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'azure' as any,
        options: {
          redirectTo: typeof window !== 'undefined' 
            ? window.location.origin + '/auth/callback'
            : 'gmvschool://auth/callback',
          scopes: 'email profile offline_access',
          skipBrowserRedirect: false,
          queryParams: {
            role: role
          }
        }
      });
      
      // Auth state change listener will handle the session update
    } catch (error) {
      console.error('Error signing in with Microsoft:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!isBrowser) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to manually fix a user's role
  const fixUserRole = async (userId: string, newRole: 'student' | 'teacher' | 'admin' | 'parent') => {
    try {
      console.log(`Fixing role for user ${userId} to ${newRole}`);
      
      // Update the profile
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) {
        console.error('Error updating role:', error);
        throw error;
      }
      
      // If updating the current user, update their metadata too
      if (user?.id === userId) {
        await supabase.auth.updateUser({
          data: { role: newRole }
        });
        
        // Refresh the profile data
        await refreshProfile();
      }
      
      console.log('Role updated successfully');
      return true;
    } catch (error) {
      console.error('Error in fixUserRole:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUp,
        signIn,
        signInWithMicrosoft: handleMicrosoftSignIn,
        signOut,
        user,
        userProfile,
        refreshProfile,
        fixUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 