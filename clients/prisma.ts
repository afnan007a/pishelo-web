import { PrismaClient } from "@prisma/client";
import type pristype from "@prisma/client";

let prisma: pristype.PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export const prismaClient = prisma;
