import { PrismaClient } from "@prisma/client";
// import { Redis } from "ioredis"
import { Request, Response } from "express";

export type PrismaContext = {
  prisma: PrismaClient;
  req: Request & { session: any };
  res: Response;
  //   redisClient: Redis
};
