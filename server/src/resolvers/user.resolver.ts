import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { PrismaContext } from "../types/PrismaContext";
import { User } from "../entities/user.entity";
import { requireUser } from "../middleware/requireUser";
import deserializeUser from "../middleware/deserializeUser";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async getCurrentUser(@Ctx() ctx: PrismaContext) {
    const userId = ctx.res.locals.user.id;

    if (!ctx.res.locals.user) {
      return null;
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
        session: true,
      },
    });

    return user;
  }
}
