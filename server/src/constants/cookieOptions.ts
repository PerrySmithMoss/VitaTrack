import { CookieOptions } from "express";
import { config } from "../config/config";

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: config.serverDomain,
  path: "/",
  sameSite: config.serverEnv === "prod" ? "none" : "lax",
  secure: config.serverEnv === "prod" ? true : false,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 6.048e8, // 7 days
};
