import { MiddlewareFn } from "type-graphql";
import { PrismaContext } from "../types/PrismaContext";

export const requireUser: MiddlewareFn<PrismaContext> = ({ context }, next) => {
  const user = context.res.locals.user;

  if (!user) {
    throw new Error("Not authenticated");
  }

  return next();
};
