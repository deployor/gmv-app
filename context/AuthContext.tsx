import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { prisma } from '../lib/prisma';
import { useToast } from './ToastContext';

// Register web redirect
if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

// Constants
const SECURE_STORE_AUTH_KEY = 'gmv_auth_tokens';
const SECURE_STORE_USER_KEY = 'gmv_user_profile';
const SUPER_USER_PASSWORD = process.env.EXPO_PUBLIC_SUPER_USER_PASSWORD || 'admin_password_very_long_and_secure_123456789!@#$%^&*()';
const AUTH_STORAGE_KEY = 'gmv_auth_state';

// Microsoft OAuth configuration
const MS_CLIENT_ID = process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_ID || '';
const MS_TENANT_ID = process.env.EXPO_PUBLIC_MICROSOFT_TENANT_ID || 'common';
const MS_SCOPES = ['openid', 'profile', 'email', 'User.Read'];
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'gmv-app',
  path: 'oauth-callback'
});

// Define User type to match our Prisma schema
export type UserProfile = {
  id: string;
  providerId: string | null;
  email: string | null;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  createdAt: Date;
  updatedAt: Date;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresAt: number; // timestamp
};

export type AuthContextProps = {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  isSignedIn: boolean;
  signInWithMicrosoft: () => Promise<void>;
  signInSuperUser: (password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Function to fetch user profile from database
async function fetchUserProfile(providerId: string): Promise<UserProfile | null> {
  try {
    console.log('Fetching user profile for provider ID:', providerId);
    
    // Now try to fetch the user
    try {
      const user = await prisma.user.findUnique({
        where: { providerId }
      });
      
      console.log('User profile fetch result:', user);
      return user as UserProfile | null;
    } catch (queryError) {
      console.error('Error querying user from database:', queryError);
      throw new Error(`User query failed: ${queryError instanceof Error ? queryError.message : String(queryError)}`);
    }
  } catch (error) {
    console.error('Error fetching user profile from database:', error);
    if (error instanceof Error) {
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

// Function to create a new user profile in database
async function createUserProfile(
  providerId: string, 
  email: string | null, 
  username: string | null,
  fullName: string | null,
  avatarUrl: string | null,
  role: 'student' | 'teacher' | 'admin' | 'parent' = 'student'
): Promise<UserProfile | null> {
  try {
    console.log('Creating new user profile:', { 
      providerId, 
      email, 
      username,
      fullName,
      avatarUrl,
      role 
    });

    // Make sure we have a unique username by adding a timestamp suffix if needed
    const timestamp = Date.now();
    const uniqueSuffix = Math.random().toString(36).substring(2, 8);
    const finalUsername = username || `user_${timestamp}_${uniqueSuffix}`;
    
    // Check if user already exists before attempting to create
    console.log(`Checking if user with providerId ${providerId} already exists...`);
    const existingUser = await prisma.user.findUnique({
      where: { providerId }
    });
    
    if (existingUser) {
      console.log('User already exists, returning existing user:', existingUser);
      return existingUser as UserProfile;
    }
    
    console.log('No existing user found, proceeding with creation...');
    console.log('User data for creation:', {
      providerId,
      email: email || undefined,
      username: finalUsername,
      fullName: fullName || undefined,
      avatarUrl: avatarUrl || undefined,
      role,
    });
    
    // Create user 
    try {
      const newUser = await prisma.user.create({
        data: {
          providerId,
          email: email || undefined,
          username: finalUsername,
          fullName: fullName || undefined,
          avatarUrl: avatarUrl || undefined,
          role,
        }
      });
      
      console.log('Successfully created user profile:', newUser);
      return newUser as UserProfile;
    } catch (createError) {
      console.error('User creation failed:', createError);
      
      // Log detailed error information
      if (createError instanceof Error) {
        console.error('Error message:', createError.message);
        console.error('Error name:', createError.name);
        
        // Check for Prisma-specific errors
        const prismaError = createError as any;
        if (prismaError.code) {
          console.error('Prisma error code:', prismaError.code);
          
          if (prismaError.meta) {
            console.error('Error metadata:', prismaError.meta);
          }
          
          // Handle specific error codes
          if (prismaError.code === 'P2002') {
            console.error('Unique constraint violation. Field:', prismaError.meta?.target);
            
            // If username constraint violation, try with a different username
            if (prismaError.meta?.target?.includes('username')) {
              console.log('Username constraint violation, trying with alternative username');
              const altUsername = `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
              
              const fallbackUser = await prisma.user.create({
                data: {
                  providerId,
                  email: email || undefined,
                  username: altUsername,
                  fullName: fullName || undefined,
                  avatarUrl: avatarUrl || undefined,
                  role,
                }
              });
              
              console.log('Created user with alternative username:', fallbackUser);
              return fallbackUser as UserProfile;
            }
          }
        }
      }
      
      throw createError; // Re-throw if we couldn't handle the error
    }
  } catch (error) {
    console.error('Error creating user profile with prisma:', error);
    // Try to get more detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      console.error('Error stack:', error.stack);
      
      // Last resort fallback approach for critical errors
      try {
        console.log('Attempting last-resort minimal user creation');
        // Try a simpler create with just the essential fields
        const emergencyUsername = `emergency_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        console.log('Emergency username:', emergencyUsername);
        
        const fallbackUser = await prisma.user.create({
          data: {
            providerId,
            username: emergencyUsername,
            role,
          }
        });
        console.log('Successfully created user with emergency fallback approach:', fallbackUser);
        return fallbackUser as UserProfile;
      } catch (fallbackError) {
        console.error('Emergency user creation also failed:', fallbackError);
        if (fallbackError instanceof Error) {
          console.error('Fallback error message:', fallbackError.message);
        }
      }
    }
    return null;
  }
}

// Token storage and retrieval
async function storeAuthTokens(tokens: AuthTokens): Promise<void> {
  const tokenString = JSON.stringify(tokens);
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(SECURE_STORE_AUTH_KEY, tokenString);
    } else {
      localStorage.setItem(SECURE_STORE_AUTH_KEY, tokenString);
    }
  } catch (error) {
    console.error('Failed to store auth tokens:', error);
    // Fallback to AsyncStorage
    await AsyncStorage.setItem(SECURE_STORE_AUTH_KEY, tokenString);
  }
}

async function getAuthTokens(): Promise<AuthTokens | null> {
  try {
    let tokenString: string | null = null;
    
    if (Platform.OS !== 'web') {
      tokenString = await SecureStore.getItemAsync(SECURE_STORE_AUTH_KEY);
    } else {
      tokenString = localStorage.getItem(SECURE_STORE_AUTH_KEY);
    }
    
    if (!tokenString) {
      // Try fallback
      tokenString = await AsyncStorage.getItem(SECURE_STORE_AUTH_KEY);
    }
    
    return tokenString ? JSON.parse(tokenString) : null;
  } catch (error) {
    console.error('Failed to retrieve auth tokens:', error);
    return null;
  }
}

async function removeAuthTokens(): Promise<void> {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync(SECURE_STORE_AUTH_KEY);
    } else {
      localStorage.removeItem(SECURE_STORE_AUTH_KEY);
    }
    
    // Also remove from AsyncStorage as fallback
    await AsyncStorage.removeItem(SECURE_STORE_AUTH_KEY);
  } catch (error) {
    console.error('Failed to remove auth tokens:', error);
  }
}

// For storing user profile
async function storeUserProfile(user: UserProfile): Promise<void> {
  const userString = JSON.stringify(user);
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(SECURE_STORE_USER_KEY, userString);
    } else {
      localStorage.setItem(SECURE_STORE_USER_KEY, userString);
    }
    
    // Also save to AsyncStorage as fallback
    await AsyncStorage.setItem(SECURE_STORE_USER_KEY, userString);
  } catch (error) {
    console.error('Failed to store user profile:', error);
  }
}

async function getUserProfile(): Promise<UserProfile | null> {
  try {
    let userString: string | null = null;
    
    if (Platform.OS !== 'web') {
      userString = await SecureStore.getItemAsync(SECURE_STORE_USER_KEY);
    } else {
      userString = localStorage.getItem(SECURE_STORE_USER_KEY);
    }
    
    if (!userString) {
      // Try fallback
      userString = await AsyncStorage.getItem(SECURE_STORE_USER_KEY);
    }
    
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Failed to retrieve user profile:', error);
    return null;
  }
}

async function removeUserProfile(): Promise<void> {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync(SECURE_STORE_USER_KEY);
    } else {
      localStorage.removeItem(SECURE_STORE_USER_KEY);
    }
    
    // Also remove from AsyncStorage as fallback
    await AsyncStorage.removeItem(SECURE_STORE_USER_KEY);
  } catch (error) {
    console.error('Failed to remove user profile:', error);
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  const toast = useToast();

  // Microsoft OAuth discovery document
  const discovery = AuthSession.useAutoDiscovery(`https://login.microsoftonline.com/${MS_TENANT_ID}/v2.0`);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: MS_CLIENT_ID,
      scopes: MS_SCOPES,
      redirectUri: REDIRECT_URI,
      usePKCE: true,
      responseType: AuthSession.ResponseType.Code,
    },
    discovery
  );

  useEffect(() => {
    async function checkExistingAuth() {
      setLoading(true);
      try {
        // Check for existing tokens
        const tokens = await getAuthTokens();
        if (tokens && tokens.expiresAt > Date.now()) {
          console.log('Found valid auth tokens');
          
          // Get cached user profile or fetch from DB
          let storedUser = await getUserProfile();
          
          if (storedUser) {
            console.log('Found user profile in storage');
            setUserProfile(storedUser);
            setIsSignedIn(true);
          } else {
            // Get user info from token
            try {
              // For Microsoft, we get user info from ID token or access token
              const decodedToken: any = tokens.idToken 
                ? jwtDecode(tokens.idToken) 
                : jwtDecode(tokens.accessToken);
              
              const providerId = decodedToken.oid || decodedToken.sub;
              
              if (providerId) {
                storedUser = await fetchUserProfile(providerId);
                
                if (!storedUser) {
                  // Extract user info from token
                  const email = decodedToken.email || decodedToken.preferred_username;
                  const name = decodedToken.name;
                  const username = email ? email.split('@')[0] : null;
                  
                  // Create user profile
                  storedUser = await createUserProfile(
                    providerId,
                    email,
                    username,
                    name,
                    null,
                    'student' // Default role for new users
                  );
                }
                
                if (storedUser) {
                  await storeUserProfile(storedUser);
                  setUserProfile(storedUser);
                  setIsSignedIn(true);
                }
              }
            } catch (tokenError) {
              console.error('Error decoding token or fetching user:', tokenError);
              // Clear invalid tokens
              await removeAuthTokens();
              await removeUserProfile();
            }
          }
        } else if (tokens) {
          console.log('Found expired tokens, cleaning up');
          await removeAuthTokens();
          await removeUserProfile();
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
      } finally {
        setLoading(false);
      }
    }

    checkExistingAuth();
  }, []);

  // Handle Microsoft auth response
  useEffect(() => {
    async function handleAuthResponse() {
      if (response?.type === 'success') {
        setLoading(true);
        try {
          const { code } = response.params;
          
          // Exchange code for tokens
          if (!discovery) {
            console.error('OAuth discovery document is not available');
            toast.showToast('Authentication failed: OAuth configuration issue', 'error');
            setLoading(false);
            return;
          }
          
          const tokenResponse = await AuthSession.exchangeCodeAsync(
            {
              code,
              clientId: MS_CLIENT_ID,
              redirectUri: REDIRECT_URI,
              extraParams: {
                code_verifier: request?.codeVerifier || '',
              },
            },
            discovery
          );
          
          console.log('Received token response:', tokenResponse);
          
          // Calculate expiration time
          const expiresIn = tokenResponse.expiresIn || 3600; // Default to 1 hour if not provided
          const expiresAt = Date.now() + (expiresIn * 1000);
          
          // Store tokens
          const tokens: AuthTokens = {
            accessToken: tokenResponse.accessToken,
            refreshToken: tokenResponse.refreshToken,
            idToken: tokenResponse.idToken,
            expiresAt,
          };
          
          await storeAuthTokens(tokens);
          
          // Get user info from token
          const decodedToken: any = tokenResponse.idToken 
            ? jwtDecode(tokenResponse.idToken) 
            : jwtDecode(tokenResponse.accessToken);
          
          const providerId = decodedToken.oid || decodedToken.sub;
          const email = decodedToken.email || decodedToken.preferred_username;
          const name = decodedToken.name;
          const username = email ? email.split('@')[0] : null;
          
          // Find or create user
          let user = await fetchUserProfile(providerId);
          
          if (!user) {
            // User doesn't exist, create new profile
            user = await createUserProfile(
              providerId,
              email,
              username,
              name,
              null,
              'student' // Default role for new Microsoft users
            );
          }
          
          if (user) {
            await storeUserProfile(user);
            setUserProfile(user);
            setIsSignedIn(true);
            toast.showToast('Signed in successfully!', 'success');
          } else {
            toast.showToast('Failed to retrieve or create user profile', 'error');
          }
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          toast.showToast('Authentication failed', 'error');
        } finally {
          setLoading(false);
        }
      } else if (response?.type === 'error') {
        console.error('Authentication error:', response.error);
        toast.showToast(`Authentication error: ${response.error?.message || 'Unknown error'}`, 'error');
      }
    }

    if (response) {
      handleAuthResponse();
    }
  }, [response, discovery, request?.codeVerifier, toast]);

  const signInWithMicrosoft = async () => {
    if (!request || !promptAsync) {
      console.error('Auth request not ready');
      toast.showToast('Authentication system not ready, please try again', 'error');
      return;
    }
    
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error starting Microsoft auth flow:', error);
      toast.showToast('Failed to start authentication', 'error');
    }
  };

  const signInSuperUser = async (password: string): Promise<boolean> => {
    if (password !== SUPER_USER_PASSWORD) {
      toast.showToast('Invalid super user password', 'error');
      return false;
    }
    
    setLoading(true);
    try {
      // Using a fixed ID for super user with a prefix to identify it
      const superUserId = 'superuser_' + Crypto.randomUUID();
      
      // Check for existing super admin user
      const existingAdmin = await prisma.user.findFirst({
        where: {
          role: 'admin',
          providerId: {
            startsWith: 'superuser_'
          }
        }
      });
      
      let superUser: UserProfile | null = null;
      
      if (existingAdmin) {
        superUser = existingAdmin as UserProfile;
      } else {
        // Create a super admin user if none exists
        superUser = await createUserProfile(
          superUserId,
          'admin@gmv-app.local',
          'superadmin',
          'Super Administrator',
          null,
          'admin'
        );
      }
      
      if (!superUser) {
        toast.showToast('Failed to create or retrieve super user', 'error');
        return false;
      }
      
      // Create tokens for the super user (even though we don't actually have them)
      const tokens: AuthTokens = {
        accessToken: `superuser_${Crypto.randomUUID()}`,
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days expiry
      };
      
      await storeAuthTokens(tokens);
      await storeUserProfile(superUser);
      
      setUserProfile(superUser);
      setIsSignedIn(true);
      
      toast.showToast('Signed in as super administrator', 'success');
      return true;
    } catch (error) {
      console.error('Error signing in as super user:', error);
      toast.showToast('Failed to sign in as super user', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    if (!userProfile?.providerId) {
      console.log('No user providerId available for profile refresh');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Refreshing user profile for providerId:', userProfile.providerId);
      
      // Fetch the user
      let updatedUser = await fetchUserProfile(userProfile.providerId);
      
      if (updatedUser) {
        console.log('User profile refreshed:', updatedUser);
        setUserProfile(updatedUser);
        await storeUserProfile(updatedUser);
        toast.showToast('Profile refreshed!', 'success');
      } else {
        toast.showToast('Could not find your profile.', 'warning');
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      toast.showToast('Failed to refresh your profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Clear tokens and user data
      await removeAuthTokens();
      await removeUserProfile();
      
      // Reset state
      setUserProfile(null);
      setIsSignedIn(false);
      
      toast.showToast('You have been signed out.', 'info');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.showToast('Failed to sign out completely.', 'error');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  const contextValue: AuthContextProps = {
    user: userProfile,
    loading,
    signOut,
    refreshUserProfile,
    isSignedIn,
    signInWithMicrosoft,
    signInSuperUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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

export { AuthContext, AuthProvider };
