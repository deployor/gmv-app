import { ClerkProvider, useAuth as useClerkNativeAuth, useUser as useClerkNativeUser } from '@clerk/clerk-expo';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { prisma } from '../lib/prisma';
import { ToastProvider, useToast } from './ToastContext';

// Define User type to match our Prisma schema
export type UserProfile = {
  id: string;
  clerkId: string;
  email: string | null;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  createdAt: Date;
  updatedAt: Date;
};

export type AuthContextProps = {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  // Add isSignedIn for convenience from Clerk's useAuth
  isSignedIn: boolean | undefined;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Function to fetch user profile from database
async function fetchUserProfile(clerkId: string): Promise<UserProfile | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });
    return user as UserProfile | null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Function to create a new user profile in database
async function createUserProfile(
  clerkId: string, 
  email: string | null, 
  username: string | null,
  fullName: string | null,
  avatarUrl: string | null,
  role: 'student' | 'teacher' | 'admin' | 'parent' = 'student' // Default role from Prisma schema
): Promise<UserProfile | null> {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId,
        email: email || undefined,
        username: username || undefined,
        fullName: fullName || undefined,
        avatarUrl: avatarUrl || undefined,
        role,
      }
    });
    return user as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
}

function InnerAuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: clerkAuthLoaded, isSignedIn, userId, signOut: clerkSignOut } = useClerkNativeAuth();
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useClerkNativeUser();
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  // Combined loading state: true if Clerk hooks are loading OR if we are fetching/creating profile
  const [profileLoading, setProfileLoading] = useState(true); 
  
  const toast = useToast();

  useEffect(() => {
    async function loadUserProfile() {
      if (!clerkAuthLoaded || !clerkUserLoaded) {
        // If Clerk itself isn't loaded, we are definitely in a loading state for our app's user profile.
        // No need to explicitly setProfileLoading(true) here as it defaults to true.
        return;
      }

      setProfileLoading(true); // Start profile loading process
      
      try {
        if (!isSignedIn || !userId) {
          setUserProfile(null);
        } else if (userId && clerkUser) { // Ensure clerkUser is available for profile creation
          let profile = await fetchUserProfile(userId);
          
          if (!profile) {
            // Attempt to create profile if it doesn't exist, using Clerk user data
            // Ensure role from unsafeMetadata is used if available, otherwise default
            const initialRole = (clerkUser.unsafeMetadata?.role as UserProfile['role']) || 'student';
            const initialFullName = (clerkUser.unsafeMetadata?.fullName as string) || 
                                    `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 
                                    null;

            profile = await createUserProfile(
              userId,
              clerkUser.primaryEmailAddress?.emailAddress || null,
              clerkUser.username,
              initialFullName,
              clerkUser.imageUrl,
              initialRole
            );
            
            if (profile) {
              toast.showToast('Welcome! Your account profile has been set up.', 'success');
            }
          }
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error in auth state change or profile loading:', error);
        toast.showToast('Failed to load your profile details.', 'error');
        setUserProfile(null); // Ensure profile is null on error
      } finally {
        setProfileLoading(false); // Profile loading process finished
      }
    }
    
    loadUserProfile();
  }, [clerkAuthLoaded, clerkUserLoaded, isSignedIn, userId, clerkUser, toast]);

  const refreshUserProfile = async () => {
    if (!userId) return;
    
    setProfileLoading(true);
    try {
      const updatedUser = await fetchUserProfile(userId);
      setUserProfile(updatedUser);
      if(updatedUser) {
        toast.showToast('Profile refreshed!', 'success');
      } else {
        toast.showToast('Could not refresh profile.', 'warning');
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      toast.showToast('Failed to refresh your profile.', 'error');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await clerkSignOut();
      setUserProfile(null); // Clear local profile state
      toast.showToast('You have been signed out.', 'info');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.showToast('Failed to sign out.', 'error');
    }
  };

  // Overall loading: true if Clerk is not fully loaded OR profile is still loading
  const isLoading = !clerkAuthLoaded || !clerkUserLoaded || profileLoading;

  if (!clerkAuthLoaded || !clerkUserLoaded) { // Only show full screen loader if Clerk itself is loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  const contextValue: AuthContextProps = {
    user: userProfile,
    loading: isLoading,
    signOut: handleSignOut,
    refreshUserProfile,
    isSignedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Make sure it's set in your .env file and loaded correctly.");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ToastProvider>
        <InnerAuthProvider>{children}</InnerAuthProvider>
      </ToastProvider>
    </ClerkProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 