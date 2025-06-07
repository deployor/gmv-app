'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Microsoft Azure AD MAYBE adding more soon?
const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || 'your-client-id',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'localStorage' as const,
    storeAuthStateInCookie: false,
  },
};

const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

let msalInstance: PublicClientApplication | null = null;

// init MSAL instance
const initializeMsal = () => {
  if (typeof window !== 'undefined' && !msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      const msal = initializeMsal();
      if (!msal) return;

      await msal.initialize();

      // check user is already logged in
      const accounts = msal.getAllAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        await handleAccountLogin(account);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountLogin = async (account: AccountInfo) => {
    try {
      const msal = initializeMsal();
      if (!msal) return;

      // Get access token
      const tokenResponse = await msal.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      // Authenticate with backend
      const backendResponse = await axios.post(`${API_BASE_URL}/auth/microsoft-login`, {
        accessToken: tokenResponse.accessToken,
      });

      if (backendResponse.data.success) {
        setUser(backendResponse.data.data.user);
        setToken(backendResponse.data.data.token);
        
        // Set axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${backendResponse.data.data.token}`;
      }
    } catch (error) {
      console.error('Account login error:', error);
      await logout();
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const msal = initializeMsal();
      if (!msal) throw new Error('MSAL not initialized');

      const loginResponse: AuthenticationResult = await msal.loginPopup(loginRequest);
      
      if (loginResponse.account) {
        await handleAccountLogin(loginResponse.account);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const msal = initializeMsal();
      if (!msal) return;

      setUser(null);
      setToken(null);
      delete axios.defaults.headers.common['Authorization'];

      const accounts = msal.getAllAccounts();
      if (accounts.length > 0) {
        await msal.logoutPopup({
          account: accounts[0],
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getToken = () => token;

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 

// TY STACKOVERFLOW!!!!!