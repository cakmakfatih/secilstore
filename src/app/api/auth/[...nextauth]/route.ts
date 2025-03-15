import { jwtDecode } from 'jwt-decode';
import NextAuth, { AuthValidity, NextAuthOptions, Tokens, User, UserObject } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface LoginResponse {
  data: {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const response = await fetch('https://maestro-api-dev.secil.biz/Auth/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const result: LoginResponse = await response.json();
        const { accessToken, refreshToken, expiresIn, refreshExpiresIn } = result.data;
        const user: UserObject = jwtDecode(accessToken);

        const validity: AuthValidity = {
          valid_until: Date.now() + expiresIn * 1000,
          refresh_until: Date.now() + refreshExpiresIn * 1000,
        };
        const tokens: Tokens = {
          access: accessToken,
          refresh: refreshToken,
        };

        return {
          id: refreshToken,
          user,
          tokens,
          validity,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, data: user };
      }

      if (Date.now() < token.data.validity.valid_until) {
        return token;
      }

      if (Date.now() < token.data.validity.refresh_until) {
        console.debug('Access token is being refreshed');
        return await refreshAccessToken(token);
      }

      return { ...token, error: 'RefreshTokenExpired' };
    },
  },
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  throw new Error('unimplemented');
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
