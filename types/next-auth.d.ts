import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Tokens {
    access: string;
    refresh: string;
  }

  interface AuthValidity {
    valid_until: number;
    refresh_until: number;
  }

  interface UserObject {
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
  }

  interface Session {
    user: UserObject;
    validity: AuthValidity;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }

  interface User {
    user: UserObject;
    validity: AuthValidity;
    tokens: Tokens;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    data: User;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }
}
