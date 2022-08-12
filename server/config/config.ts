import dotenv from "dotenv";

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV! === "production",

  serverPort: process.env.SERVER_PORT,
  serverDomain: process.env.SERVER_DOMAIN,
  clientURL: process.env.CLIENT_URL,
  serverURL: process.env.SERVER_URL,

  databaseURL: process.env.DATABASE_URL!,

  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,

  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL
};
