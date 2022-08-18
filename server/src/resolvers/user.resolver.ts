import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { PrismaContext } from "../types/PrismaContext";
import { User } from "../entities/user.entity";
import { requireUser } from "../middleware/requireUser";
import deserializeUser from "../middleware/deserializeUser";
import { createUser } from "../services/user.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import { config } from "../../config/config";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../constants/cookieOptions";

@ObjectType()
class UserFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [UserFieldError], { nullable: true })
  errors?: UserFieldError[];

  @Field(() => User, { nullable: true })
  data?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async getCurrentUser(@Ctx() ctx: PrismaContext) {
    try {
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

      return {
        data: user,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to fetch current user.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Ctx() ctx: PrismaContext,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const userObj = {
        email,
        password,
        username,
      };

      const registeredUser = await createUser(userObj);

      // create a session
      const session = await createSession(
        registeredUser.id,
        ctx.req.get("user-agent") || ""
      );

      // create an access token
      const accessToken = signJwt(
        { ...registeredUser, session: session.userId },
        { expiresIn: config.accessTokenTtl }
      );

      // create a refresh token
      const refreshToken = signJwt(
        { ...registeredUser, session: session.userId },
        { expiresIn: config.refreshTokenTtl }
      );

      // set cookies
      ctx.res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      ctx.res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      return {
        data: registeredUser,
      };
    } catch (err: any) {
      if (err.code === 11000) {
        return {
          errors: [
            {
              field: "error",
              message: "Account already exists",
            },
          ],
        };
      }
      return {
        errors: [
          {
            field: "error",
            message: err,
          },
        ],
      };
    }
  }
}
