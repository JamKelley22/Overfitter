import { PrismaClient } from "@prisma/client";
declare global {
  var __prisma: PrismaClient;
}

export async function getClient(request: Request): Promise<PrismaClient> {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
  global.__prisma.$connect();
  return global.__prisma;
}
