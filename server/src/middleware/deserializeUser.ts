import { MiddlewareFn } from "type-graphql";
import { PrismaContext } from "../types/PrismaContext";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/session.service";
import { config } from "../config/config";

const deserializeUser: MiddlewareFn<PrismaContext> = async (
  { context },
  next
) => {
  // Extract access and refresh token from the requests cookies
  const { accessToken, refreshToken } = context.req.cookies;

  if (!accessToken) {
    if (refreshToken) {
      // Generate a new access token using the user's refresh token
      const newAccessToken = await reIssueAccessToken(refreshToken);

      if (newAccessToken) {
        // Set header & cookie with the new access token in response
        context.res.setHeader("x-access-token", newAccessToken);

        context.res.cookie("accessToken", newAccessToken, {
          maxAge: 900000, // 15 mins
          httpOnly: true,
          domain: config.serverDomain,
          path: "/",
          sameSite: config.serverEnv === "production" ? "none" : "lax",
          secure: config.serverEnv === "production" ? true : false,
        });
      }

      // Verify the new access token
      const result = verifyJwt(newAccessToken as string);

      // Attach the decoded user to the response for later use
      context.res.locals.user = result.decoded;
    }
    return next();
  }

  // There is an access token
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    // If there is an access token just attach the decoded user to the response for later use
    context.res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      context.res.setHeader("x-access-token", newAccessToken);

      context.res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: config.serverDomain,
        path: "/",
        sameSite: config.serverEnv === "production" ? "none" : "lax",
        secure: config.serverEnv === "production" ? true : false,
      });
    }

    const result = verifyJwt(newAccessToken as string);

    context.res.locals.user = result.decoded;
    return next();
  }
};

export default deserializeUser;
