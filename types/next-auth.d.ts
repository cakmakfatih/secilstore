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
  }

  interface SuccessResponse {
    status: number;
    message: string | null;
    data: {
      accessToken: string;
      expiresIn: number;
      refreshExpiresIn: number;
      refreshToken: string;
    };
  }

  interface InvalidCredentialsResponse extends Error {
    status: number;
    message: string;
    request: string;
    method: string;
  }

  interface InvalidFieldsResponse extends Error {
    status: number;
    message: string;
    data: {
      errors: {
        Username?: string[];
        Password?: string[];
      };
    };
  }
}

declare module 'next-auth/react' {
  interface SignInResponse {
    ok: boolean;
    error: InvalidCredentialsResponse | InvalidFieldsResponse | string | null;
    status: number;
    url: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    data: User;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }
}
