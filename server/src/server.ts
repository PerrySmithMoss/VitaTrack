import express, { Application } from "express";
import { createServer } from "http";
import { config } from "../config/config";
import prisma from "./lib/prisma";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { HelloResolver, SessionResolver } from "./resolvers/index";
import { getGoogleOAuthTokens } from "./services/user.service";
import { CookieOptions } from "express";
import { Resolver, Mutation, Arg, Ctx, Field, ObjectType } from "type-graphql";
import { createSession } from "./services/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokensV2,
  getGoogleUser,
} from "./services/user.service";
import { PrismaContext } from "./types/PrismaContext";
import { signJwt } from "./utils/jwt.utils";
import cors from "cors";

const app: Application = express();
const httpServer = createServer(app);

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

async function main() {
  app.use(express.static("public"));
  // Might need cors after we setup front-end
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN as string,
      credentials: true,
    })
  );

  app.get("/api/sessions/oauth/google", async (req, res) => {
    // get the code from qs
    const code = req.query.code as string;
    console.log("code: ", code);

    try {
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });
      console.log({ id_token, access_token });

      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });
      // const googleUser = jwt.decode(id_token);

      console.log({ googleUser });

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
      const session = await createSession(user.id, req.get("user-agent") || "");

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
      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      // redirect back to client
      res.redirect(config.clientURL as string);
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
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, SessionResolver],
    }),
    context: ({ req, res }) => ({ prisma, req, res }),
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    cache: "bounded",
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(config.serverPort, () =>
    console.log(
      `🚀  Server running on ${config.serverURL}:${config.serverPort}`
    )
  );
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
