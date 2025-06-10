import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, accounts, sessions, verificationTokens, userRoles, roles } from "@/lib/db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
        const [userRole] = await db.select({
            role: roles.name
        }).from(userRoles).where(eq(userRoles.userId, user.id)).innerJoin(roles, eq(userRoles.roleId, roles.id));

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: userRole?.role ?? 'user',
        },
      };
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions); 