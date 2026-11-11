import "dotenv/config"; // Load env vars before anything else

import express, { Application } from "express";
import { createServer } from "http";
import { config } from "./config/config";
import prisma from "./lib/prisma";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { expressMiddleware } from "@as-integrations/express5";
import { buildSchema, GraphQLISODateTime } from "type-graphql";
import { GraphQLScalarType } from "graphql";
import { PrismaContext } from "./types/PrismaContext";
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
import { foodData } from "./routes/foodData";

const dateTimeScalar = new GraphQLScalarType({
  ...GraphQLISODateTime.toConfig(),
  name: "DateTime",
});

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
    // Public process liveness, outside GraphQL and its auth/CSRF middleware.
    // Listen starts only after Apollo initialization; no DB query per health hit.
    app.get("/healthz", (_req, res) => {
      res.status(200).set("Cache-Control", "no-store").json({ status: "ok" });
    });
    app.use(cookieParser());
    app.post("/food-data", express.json({ limit: "2kb" }), foodData);

    const schema = await buildSchema({
      resolvers: [
        SessionResolver,
        UserResolver,
        WorkoutResolver,
        GoalsResolver,
        NutritionResolver,
        FoodResolver,
      ],
      scalarsMap: [{ type: Date, scalar: dateTimeScalar }],
      validate: false,
      // globalMiddlewares: [deserializeUser], // optional for auth
    });

    const apolloServer = new ApolloServer<PrismaContext>({
      schema,
      introspection: config.isProduction,
      csrfPrevention: true,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });

    await apolloServer.start();
    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ prisma, req, res }),
      })
    );

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
