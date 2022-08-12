import express, { Application } from "express";
import { createServer } from "http";
import { config } from "../config/config";
import prisma from "./lib/prisma";

const app: Application = express();
const server = createServer(app);

async function main() {
  server.listen(config.serverPort, () =>
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
