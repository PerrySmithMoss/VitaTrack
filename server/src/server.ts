import "dotenv/config"; // Load env vars before anything else

import express, { Application } from "express";
import { createServer } from "http";
import { config } from "./config/config";
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
  GoalsResolver,
  NutritionResolver,
  FoodResolver,
} from "./resolvers/index";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { deserializeUser } from './middleware/deserializeUser'; // future enhancement

const app: Application = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: config.clientURL,
  credentials: true,
  optionsSuccessStatus: 200,
};

async function startServer() {
  try {
    app.use(cors(corsOptions));
    app.use(cookieParser());

    const schema = await buildSchema({
      resolvers: [
        SessionResolver,
        UserResolver,
        WorkoutResolver,
        GoalsResolver,
        NutritionResolver,
        FoodResolver,
      ],
      validate: false,
      // globalMiddlewares: [deserializeUser], // optional for auth
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ prisma, req, res }),
      introspection: config.isProduction,
      csrfPrevention: true,
      cache: "bounded",
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: corsOptions });

    httpServer.listen(config.serverPort, () => {
      console.log(`🚀 Server ready at ${config.serverURL}`);
    });

    const shutdown = async () => {
      console.log("🛑 Shutting down...");
      await prisma.$disconnect();
      httpServer.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
