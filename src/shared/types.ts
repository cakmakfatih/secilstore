export interface LoginResponse {
  status: number;
  message: string | null;
  data: {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    tokenType: string;
  };
}
