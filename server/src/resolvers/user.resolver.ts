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
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../services/user.service";
import { createSession, invalidateSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import { config } from "../../config/config";
import argon2, { hash } from "argon2";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../constants/cookieOptions";
import { validateEmail } from "../utils/validateEmail";

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

@ObjectType()
class LogoutUserResponse {
  @Field()
  message!: string;

  @Field()
  success!: boolean;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  @UseMiddleware(deserializeUser)
  // The error which is returned from this middleware
  // is causing issues on front-end
  // @UseMiddleware(requireUser)
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
            field: "Logged in user",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async loginUserWithEmailAndPassword(
    @Ctx() ctx: PrismaContext,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: { email: email },
        include: { profile: true },
      });
      if (!user) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "Incorrect email or password.",
            },
          ],
        };
      }

      const validUser = await argon2.verify(user.password as string, password);

      if (!validUser) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "Incorrect email or password.",
            },
          ],
        };
      }

      // create a session
      const session = await createSession(
        user.id,
        ctx.req.get("user-agent") || ""
      );

      // create an access token
      const accessToken = signJwt(
        { ...user, session: session.userId },
        { expiresIn: config.accessTokenTtl }
      );

      // create a refresh token
      const refreshToken = signJwt(
        { ...user, session: session.userId },
        { expiresIn: config.refreshTokenTtl }
      );

      // set cookies
      ctx.res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      ctx.res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      return {
        data: user,
      };
    } catch (err: any) {
      if (err.code === "P2002") {
        return {
          errors: [
            {
              field: "error",
              message: "Session already exists",
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

      if (validateEmail(email) === false) {
        return {
          errors: [
            {
              field: "email",
              message: "Email provided is not valid.",
            },
          ],
        };
      }

      if (password.length < 8) {
        return {
          errors: [
            {
              field: "password",
              message: "Password must be 8 characters or greater.",
            },
          ],
        };
      }

      const checkIfUserExists = await findUserByEmail(email);

      if (checkIfUserExists) {
        return {
          errors: [
            {
              field: "email",
              message:
                "A user with this username already exists, please choose another one.",
            },
          ],
        };
      }

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

  @Mutation(() => UserResponse)
  @UseMiddleware(deserializeUser)
  async finishUserSetup(
    @Ctx() ctx: PrismaContext,
    @Arg("weightGoal")
    weightGoal: "Lose weight" | "Maintain weight" | "Gain weight",
    @Arg("gender") gender: "Male" | "Female",
    @Arg("currentWeight") currentWeight: number,
    @Arg("goalWeight") goalWeight: number
  ) {
    try {
      const userId = ctx.res.locals.user.id;

      if (!userId) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "You must login to see this resourse.",
            },
          ],
        };
      }

      // Set users calories based on their gender
      // & if they want to lose or gain weight
      let calories;
      if (gender === "Male") {
        if (weightGoal === "Maintain weight") {
          calories = 2500;
        } else if (weightGoal === "Gain weight") {
          calories = 2750;
        } else if (weightGoal === "Lose weight") {
          calories = 2000;
        }
      } else if (gender === "Female") {
        if (weightGoal === "Maintain weight") {
          calories = 2000;
        } else if (weightGoal === "Gain weight") {
          calories = 2250;
        } else if (weightGoal === "Lose weight") {
          calories = 1500;
        }
      }

      await ctx.prisma.goals.create({
        data: {
          calories,
          startingWeight: currentWeight,
          currentWeight: currentWeight,
          goalWeight: goalWeight,
          protein: 35,
          carbohydrate: 40,
          fat: 25,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasGoals: true,
          gender,
        },
      });

      return {
        data: updatedUser,
      };
    } catch (err: any) {
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

  @Mutation(() => UserResponse)
  @UseMiddleware(deserializeUser)
  async updateUser(
    @Ctx() ctx: PrismaContext,
    @Arg("username") username: string,
    @Arg("gender") gender: "Male" | "Female",
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const userId = ctx.res.locals.user.id;

      if (!userId) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "You must login to see this resourse.",
            },
          ],
        };
      }

      let updatedUser;
      if (password === "") {
        updatedUser = await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
            gender,
            email,
          },
        });
      } else {
        if (password.length <= 7 && password.length > 0) {
          return {
            errors: [
              {
                field: "Password",
                message: "Password must be 8 or more characters",
              },
            ],
          };
        } else if (password.length >= 8) {
          const hashedPassword = await hash(password);

          updatedUser = await ctx.prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              username,
              gender,
              email,
              password: hashedPassword,
            },
          });
        }
      }

      return {
        data: updatedUser,
      };
    } catch (err: any) {
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

  @Mutation(() => LogoutUserResponse)
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async logoutUser(@Ctx() ctx: PrismaContext) {
    try {
      const sessionId = ctx.res.locals.user.session;

      await invalidateSession(sessionId);

      if (config.serverEnv === "prod") {
        ctx.res.clearCookie(config.accessTokenCookieName as string, {
          httpOnly: true,
          domain: config.serverDomain,
          path: "/",
          sameSite: config.serverEnv === "prod" ? "none" : "lax",
          secure: config.serverEnv === "prod" ? true : false,
        });
        ctx.res.clearCookie(config.refreshTokenCookieName as string, {
          httpOnly: true,
          domain: config.serverDomain,
          path: "/",
          sameSite: config.serverEnv === "prod" ? "none" : "lax",
          secure: config.serverEnv === "prod" ? true : false,
        });
      } else {
        ctx.res.clearCookie("accessToken");
        ctx.res.clearCookie("refreshToken");
      }

      ctx.res.removeHeader("x-access-token");

      return {
        message: "Logout successful",
        success: true,
      };
    } catch (err) {
      return {
        message: err,
        success: false,
      };
    }
  }
}
