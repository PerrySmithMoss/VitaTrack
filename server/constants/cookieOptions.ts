import { CookieOptions } from "express";
import { config } from "../config/config";

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: config.serverDomain,
  path: "/",
  sameSite: "lax",
  secure: false,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
