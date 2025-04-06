import dotenv from "dotenv";

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV! === "production",

  serverEnv: process.env.SERVER_ENV,
  serverPort: process.env.PORT,
  serverDomain: process.env.SERVER_DOMAIN,
  clientURL: process.env.CLIENT_URL,
  serverURL: process.env.SERVER_URL,

  databaseURL: process.env.DATABASE_URL,

  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  accessTokenCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME,
  refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME,

  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL,
};
