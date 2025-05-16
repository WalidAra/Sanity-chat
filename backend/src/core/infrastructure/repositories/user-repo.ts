import { prisma } from "@/config";
import { User } from "@/core/domain";
import { Provider, User as UserType } from "generated/prisma";

export const userRepo = {
  create: async (
    obj: {
      email: string;
      password: string;
      name: string;
      image?: string | null;
    },
    provider: Provider = "MAIL"
  ) => {
    const data = await prisma.user.create({
      data: {
        ...obj,
        provider,
      },
    });

    return new User(data);
  },

  findByEmail: async (where: { email: string }) => {
    const data = await prisma.user.findUnique({
      where,
    });
    return data ? new User(data) : null;
  },

  findById: async (where: { id: string }) => {
    const data = await prisma.user.findUnique({
      where,
    });
    return data ? new User(data) : null;
  },

  update: async (
    id: string,
    updateData: Partial<Omit<UserType, "id" | "createdAt" | "updatedAt">>
  ) => {
    const data = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    return new User(data);
  },

  delete: async (where: { id: string }) => {
    const data = await prisma.user.delete({
      where,
    });
    return new User(data);
  },

  findByName: async (where: { name: string }) => {
    const data = await prisma.user.findMany({
      where: {
        name: {
          contains: where.name,
          mode: "insensitive",
        },
      },
      select:{
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      }
    });
    return data;
  },
};
