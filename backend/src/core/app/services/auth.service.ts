import { userRepo } from "@/core/infrastructure/repositories";
import { ConstraintError } from "../base";
import bcrypt from "bcrypt";
import { JwtService } from "@/helpers";

export const authService = {
  createUser: async ({
    email,
    name,
    password,
    recall = false,
  }: {
    email: string;
    password: string;
    name: string;
    recall?: boolean;
  }) => {
    if (!email || !password || !name) {
      throw new ConstraintError("All credentials are required", 400);
    }

    const isUser = await userRepo.findByEmail({ email });

    if (isUser) {
      throw new ConstraintError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepo.create(
      {
        email,
        password: hashedPassword,
        name,
      },
      "MAIL"
    );

    const { accessToken } = JwtService.generateToken({
      payload: { id: newUser.user.id, recall },
    }) as { accessToken: string };

    return { accessToken };
  },

  authUser: async ({
    email,
    password,
    recall = false,
  }: {
    email: string;
    password: string;
    recall?: boolean;
  }) => {
    if (!email || !password) {
      throw new ConstraintError("All credentials are required", 400);
    }

    const isUser = await userRepo.findByEmail({ email });

    if (!isUser) {
      throw new ConstraintError("User not found", 404);
    }

    const isPasswordValid = await isUser.verifyPassword(password);

    if (!isPasswordValid) {
      throw new ConstraintError("Invalid password", 401);
    }

    const { accessToken } = JwtService.generateToken({
      payload: { id: isUser.user.id, recall },
    }) as { accessToken: string };

    return { accessToken };
  },

  googleAuth: async (profile: any) => {
    const { displayName, emails, photos } = profile;
    const email = emails[0].value;
    const image = photos[0].value;

    const isUser = await userRepo.findByEmail({ email });

    if (!isUser) {
      const newUser = await userRepo.create(
        { email, name: displayName, password: "", image },
        "GOOGLE"
      );

      const { accessToken } = JwtService.generateToken({
        payload: { id: newUser.user.id, recall: false },
      }) as { accessToken: string };

      return { accessToken };
    }

    const { accessToken } = JwtService.generateToken({
      payload: { id: isUser.user.id, recall: false },
    }) as { accessToken: string };
    return { accessToken };
  },
};
