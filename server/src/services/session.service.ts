import prisma from "../lib/prisma";

export async function createSession(userId: string, userAgent: string) {
  const session = await prisma.session.create({
    data: {
      userId,
      userAgent,
    },
  });

  return session;
}
