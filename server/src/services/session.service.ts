import { config } from "../config/config";
import prisma from "../lib/prisma";
import { signJwt, verifyJwt } from "../utils/jwt";
import { findUserById } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const activeSession = await prisma.session.findUnique({
    where: { userId },
  });

  if (activeSession) {
    await prisma.session.delete({
      where: { userId },
    });
  }

  const session = await prisma.session.create({
    data: {
      userId,
      userAgent,
    },
  });

  return session;
}

interface Decoded {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: null | string;
  username: string;
  session: string;
  iat: number;
  exp: number;
}

interface IJwtPayload {
  valid: boolean;
  expired: boolean;
  decoded: Decoded | null;
}

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken) as IJwtPayload;

  if (!decoded || !decoded.session) return false;

  const session = await prisma.session.findUnique({
    where: {
      userId: decoded.session,
    },
  });

  if (!session || !session.valid) return false;

  const user = await findUserById(session.userId);

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.userId },
    { expiresIn: config.accessTokenTtl }
  );

  return accessToken;
}

export async function invalidateSession(sessionId: string) {
  return await prisma.session.update({
    where: { userId: sessionId },
    data: { valid: false },
  });
}
