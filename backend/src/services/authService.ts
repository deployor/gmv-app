import jwt from 'jsonwebtoken';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import { eq } from 'drizzle-orm';
import { db } from '../database/connection';
import { users } from '../database/schema';
import { config } from '../config';
import { User, NewUser, AuthUser, MicrosoftUser } from '../types';

export class AuthService {
  private static graphClient: Client | null = null;

  private static getGraphClient(): Client {
    if (!this.graphClient) {
      const credential = new ClientSecretCredential(
        config.microsoft.tenantId,
        config.microsoft.clientId,
        config.microsoft.clientSecret
      );

      this.graphClient = Client.initWithMiddleware({
        authProvider: {
          getAccessToken: async () => {
            const response = await credential.getToken('https://graph.microsoft.com/.default');
            return response.token;
          }
        }
      });
    }
    return this.graphClient;
  }

  public static async verifyMicrosoftToken(accessToken: string): Promise<MicrosoftUser> {
    try {
      const graphClient = Client.init({
        authProvider: (done: any) => {
          done(null, accessToken);
        }
      });

      const user = await graphClient.api('/me').get();
      return user as MicrosoftUser;
    } catch (error) {
      throw new Error('Invalid Microsoft access token');
    }
  }

  public static async findOrCreateUser(microsoftUser: MicrosoftUser): Promise<User> {
    try {
      // check user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.microsoftId, microsoftUser.id))
        .limit(1);

      if (existingUser.length > 0) {
        return existingUser[0];
      }

      // Create new user
      const newUser: NewUser = {
        microsoftId: microsoftUser.id,
        email: microsoftUser.mail || microsoftUser.userPrincipalName,
        firstName: microsoftUser.givenName || '',
        lastName: microsoftUser.surname || '',
        displayName: microsoftUser.displayName,
        role: 'student', // def role
        isActive: true,
      };

      const createdUsers = await db.insert(users).values(newUser).returning();
      return createdUsers[0];
    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw new Error('Failed to create or find user');
    }
  }

  public static generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);
  }

  public static async getUserById(id: string): Promise<User | null> {
    try {
      const userList = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return userList.length > 0 ? userList[0] : null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  public static async updateLastLogin(userId: string): Promise<void> {
    try {
      await db
        .update(users)
        .set({ updatedAt: new Date() })
        .where(eq(users.id, userId));
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }
} 