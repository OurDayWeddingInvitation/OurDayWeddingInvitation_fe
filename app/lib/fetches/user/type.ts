export type LoginInfo = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  issuedTime?: string;
  user: {
    userId: string;
    providerName: string;
  };
};
