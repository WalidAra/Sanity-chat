import { PrismaClient } from "../../generated/prisma";

const PrismaInstance = Object.freeze({
  prisma: new PrismaClient(),
});

export const prisma = PrismaInstance.prisma;
