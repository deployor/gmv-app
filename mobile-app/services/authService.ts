import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Microsoft Azure AD configuration
const MICROSOFT_CONFIG = {
  clientId: 'your-microsoft-client-id', // This should come from environment
  tenantId: 'your-tenant-id',
  redirectUri: AuthSession.makeRedirectUri(),
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

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async initializeAuth(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      const userData = await SecureStore.getItemAsync('user_data');

      if (token && userData) {
        this.token = token;
        this.user = JSON.parse(userData);
        
        // Verify token is still valid
        const isValid = await this.verifyToken();
        if (isValid) {
          return true;
        } else {
          await this.logout();
        }
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth:', error);
      return false;
    }
  }

  async loginWithMicrosoft(): Promise<AuthResponse> {
    try {
      // Create code verifier and challenge for PKCE
      const codeVerifier = Crypto.randomUUID();
      const codeChallenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
      );

      const request = new AuthSession.AuthRequest({
        clientId: MICROSOFT_CONFIG.clientId,
        scopes: MICROSOFT_CONFIG.scopes,
        redirectUri: MICROSOFT_CONFIG.redirectUri,
        responseType: AuthSession.ResponseType.Code,
        codeChallenge,
        codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
        extraParams: {
          tenant: MICROSOFT_CONFIG.tenantId,
        },
      });

      const authUrl = `https://login.microsoftonline.com/${MICROSOFT_CONFIG.tenantId}/oauth2/v2.0/authorize`;
      
      const result = await request.promptAsync({
        authorizationEndpoint: authUrl,
      });

      if (result.type === 'success' && result.params.code) {
        // Exchange code for token
        const tokenResponse = await this.exchangeCodeForToken(
          result.params.code,
          codeVerifier
        );

        // Send token to our backend for verification and user creation
        const authResponse = await this.authenticateWithBackend(tokenResponse.access_token);
        
        // Store auth data
        await this.storeAuthData(authResponse);
        
        return authResponse;
      } else {
        throw new Error('Authentication cancelled or failed');
      }
    } catch (error) {
      console.error('Microsoft login error:', error);
      throw error;
    }
  }

  private async exchangeCodeForToken(code: string, codeVerifier: string) {
    const tokenUrl = `https://login.microsoftonline.com/${MICROSOFT_CONFIG.tenantId}/oauth2/v2.0/token`;
    
    const params = new URLSearchParams({
      client_id: MICROSOFT_CONFIG.clientId,
      scope: MICROSOFT_CONFIG.scopes.join(' '),
      code,
      redirect_uri: MICROSOFT_CONFIG.redirectUri,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return await response.json();
  }

  private async authenticateWithBackend(accessToken: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/microsoft-login`, {
        accessToken,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Backend authentication error:', error);
      throw error;
    }
  }

  private async storeAuthData(authResponse: AuthResponse): Promise<void> {
    try {
      await SecureStore.setItemAsync('auth_token', authResponse.token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(authResponse.user));
      
      this.token = authResponse.token;
      this.user = authResponse.user;
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  }

  private async verifyToken(): Promise<boolean> {
    try {
      if (!this.token) return false;

      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data.success;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('user_data');
      
      this.token = null;
      this.user = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.user !== null;
  }
}

export default AuthService.getInstance(); 