import { PrismaClient } from "../generated/prisma/client";
// import { Redis } from "ioredis"
import { Request, Response } from "express";

export type PrismaContext = {
  prisma: PrismaClient;
  req: Request;
  res: Response;
  //   redisClient: Redis
};
