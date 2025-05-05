import "reflect-metadata";
import { CookieOptions } from "express";
import { Resolver, Mutation, Arg, Ctx, Field, ObjectType } from "type-graphql";
import { config } from "../config/config";
import { createSession } from "../services/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../services/user.service";
import { PrismaContext } from "../types/PrismaContext";
import { signJwt } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../constants/cookieOptions";

@ObjectType()
class SessionFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class TokenResponse {
  @Field()
  access_token!: string;

  @Field()
  id_token!: string;
}

@ObjectType()
class SessionResponse {
  @Field(() => [SessionFieldError], { nullable: true })
  errors?: SessionFieldError[];

  @Field(() => TokenResponse, { nullable: true })
  data?: TokenResponse;
}

@Resolver()
export class SessionResolver {
  @Mutation(() => SessionResponse)
  async googleOauthHandler(
    @Ctx() ctx: PrismaContext,
    @Arg("code") code: string
  ) {
    // first change the escaped characters back to normal characters
    const formattedCode = code.replace("%2F", "/");

    try {
      const { id_token, access_token } = await getGoogleOAuthTokens(
        formattedCode
      );

      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });
      // const googleUser = jwt.decode(id_token);

      if (!googleUser.verified_email) {
        return {
          errors: [
            {
              field: "error",
              message:
                "Google account is not verified. Please verify your Google account.",
            },
          ],
        };
      }

      // upsert the user
      const user = await findAndUpdateUser(googleUser.email, {
        email: googleUser.email,
        // We could split the name we get from googleUser on the first space
        // The word before the first space is = First Name
        // The word(s) after the first space = Second Name
        username: googleUser.name,
        picture: googleUser.picture,
      });

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
        data: { id_token, access_token },
      };
    } catch (error) {
      return {
        errors: [
          {
            field: "error",
            message: error,
          },
        ],
      };
    }
  }
}
