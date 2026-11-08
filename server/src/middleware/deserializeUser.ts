import { MiddlewareFn } from "type-graphql";
import type { Request, Response } from "express";
import { PrismaContext } from "../types/PrismaContext";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/session.service";
import { accessTokenCookieOptions } from "../constants/cookieOptions";

export async function deserializeSession(req: Request, res: Response) {
  // Extract access and refresh token from the requests cookies
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    if (refreshToken) {
      // Generate a new access token using the user's refresh token
      const newAccessToken = await reIssueAccessToken(refreshToken);

      if (newAccessToken) {
        // Set header & cookie with the new access token in response
        res.setHeader("x-access-token", newAccessToken);

        res.cookie(
          "accessToken",
          newAccessToken,
          accessTokenCookieOptions
        );
      }

      // Verify the new access token
      const result = verifyJwt(newAccessToken, "access");

      // Attach the decoded user to the response for later use
      res.locals.user = result.decoded;
    }
    return;
  }

  // There is an access token
  const { decoded, expired } = verifyJwt(accessToken, "access");

  if (decoded) {
    // If there is an access token just attach the decoded user to the response for later use
    res.locals.user = decoded;
    return;
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie(
        "accessToken",
        newAccessToken,
        accessTokenCookieOptions
      );
    }

    const result = verifyJwt(newAccessToken, "access");

    res.locals.user = result.decoded;
  }
}

const deserializeUser: MiddlewareFn<PrismaContext> = async ({ context }, next) => {
  await deserializeSession(context.req, context.res);
  return next();
};

export default deserializeUser;
