import { CookieOptions } from "express";
import { config } from "../config/config";

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  path: "/",

  /* For same parent domain (e.g., api.example.com and app.example.com)-
    use the parent domain with a leading dot (.example.com). 
    In my case, my client and server are currently on separate domains 
    so the domain option is being conditionally added. 
   */
  ...(config.serverEnv === "development" ? { domain: "localhost" } : {}), // No domain property in production

  sameSite: config.serverEnv === "production" ? "none" : "lax",
  secure: config.serverEnv === "production",
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 6.048e8, // 7 days
};
