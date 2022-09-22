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
import {
  SessionResolver,
  UserResolver,
  WorkoutResolver,
} from "./resolvers/index";
import cors from "cors";
import deserializeUser from "./middleware/deserializeUser";
import cookieParser from "cookie-parser";
import { GoalsResolver } from "./resolvers/goals.resolver";

const app: Application = express();
const httpServer = createServer(app);

async function main() {
  app.use(express.static("public"));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN as string,
      credentials: true,
    })
  );
  app.use(cookieParser());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SessionResolver, UserResolver, WorkoutResolver, GoalsResolver],
      // @TODO: For some reason this is running multiple times
      // globalMiddlewares: [deserializeUser],
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
