import { jwtDecode } from 'jwt-decode';
import NextAuth, {
  AuthValidity,
  InvalidCredentialsResponse,
  InvalidFieldsResponse,
  NextAuthOptions,
  SuccessResponse,
  Tokens,
  User,
  UserObject,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
          if (response.status === 400) {
            const result: InvalidFieldsResponse = await response.json();
            throw new Error(JSON.stringify(result));
          } else if (response.status === 406) {
            const result: InvalidCredentialsResponse = await response.json();
            throw new Error(JSON.stringify(result));
          } else {
            throw new Error('Beklenmedik bir hata oluştu.');
          }
        }

        const result: SuccessResponse = await response.json();

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
        } as User;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = {
          user,
          validity: user.validity,
          tokens: user.tokens,
        };
      } else {
        if (Date.now() < token.data.validity.valid_until) {
          return token;
        }

        if (Date.now() < token.data.validity.refresh_until) {
          return await refreshAccessToken(token);
        }

        return { ...token, error: 'RefreshTokenExpired' };
      }

      return token;
    },
  },
};

async function refreshAccessToken(nextAuthJWT: JWT): Promise<JWT> {
  const response = await fetch('https://maestro-api-dev.secil.biz/Auth/RefreshTokenLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: nextAuthJWT.data.tokens.refresh,
    }),
  });

  if (!response.ok) {
    throw new Error('Refresh token not valid');
  }

  const result: SuccessResponse = await response.json();

  const { accessToken, refreshToken, expiresIn, refreshExpiresIn } = result.data;
  const validity: AuthValidity = {
    valid_until: Date.now() + expiresIn * 1000,
    refresh_until: Date.now() + refreshExpiresIn * 1000,
  };

  nextAuthJWT.data.validity = { ...validity };
  nextAuthJWT.data.tokens.access = accessToken;
  nextAuthJWT.data.tokens.refresh = refreshToken;

  return { ...nextAuthJWT };
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
