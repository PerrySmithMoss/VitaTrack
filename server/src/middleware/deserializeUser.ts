import { MiddlewareFn } from "type-graphql";
import { PrismaContext } from "../types/PrismaContext";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser: MiddlewareFn<PrismaContext> = async (
  { context },
  next
) => {
  const { accessToken, refreshToken } = context.req.cookies;

  if (accessToken) {
    const { decoded } = verifyJwt(accessToken);

    if (decoded) {
      context.res.locals.user = decoded;

      return next();
    } else if (!decoded || decoded === null) {
      // res.status(401);
      return next();
    }
  } else if (!accessToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      context.res.setHeader("x-access-token", newAccessToken);

      context.res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
    }

    const result = verifyJwt(newAccessToken as string);

    context.res.locals.user = result.decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
