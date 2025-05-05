import dotenv from "dotenv";
import { loadSecret } from "../utils/loadSecret";

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV === "production",

  serverEnv: process.env.SERVER_ENV || "development",
  serverPort: process.env.PORT || 5500,
  serverDomain: process.env.SERVER_DOMAIN,
  serverURL: process.env.SERVER_URL,
  defaultUserAvatarPath: process.env.DEFAULT_USER_AVATAR_PATH,
  clientURL: process.env.CLIENT_URL,

  databaseURL: loadSecret(
    "/run/secrets/vita-track_database_url",
    "DATABASE_URL"
  ),

  jwtSecret: loadSecret("/run/secrets/vita-track_jwt_secret", "JWT_SECRET"),
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || "7d",
  accessTokenCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME || "accessToken",
  refreshTokenCookieName:
    process.env.REFRESH_TOKEN_COOKIE_NAME || "refreshToken",

  googleClientID: loadSecret(
    "/run/secrets/vita-track_google_client_id",
    "GOOGLE_CLIENT_ID"
  ),
  googleClientSecret: loadSecret(
    "/run/secrets/vita-track_google_client_secret",
    "GOOGLE_CLIENT_SECRET"
  ),
};
