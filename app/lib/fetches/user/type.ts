export type LoginInfo = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    userId: string;
    providerName: string;
  };
};
