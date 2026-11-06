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

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken, "refresh");

  if (!decoded || !decoded.session) return false;

  const session = await prisma.session.findUnique({
    where: {
      userId: decoded.session,
    },
  });

  if (!session || !session.valid) return false;

  const user = await findUserById(session.userId);

  if (!user) return false;

  return signJwt(user.id, "access");
}

export async function invalidateSession(sessionId: string) {
  return await prisma.session.update({
    where: { userId: sessionId },
    data: { valid: false },
  });
}
