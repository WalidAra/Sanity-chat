import { TryCatchBlock } from "@/core/app/base/block";
import { authService } from "@/core/app/services";
import { Request, Response } from "express";

export const authController = {
  signIn: TryCatchBlock(async (req: Request, res: Response) => {
    const { accessToken } = await authService.authUser(req.body);

    res.status(200).json({
      data: { accessToken },
      message: "User authenticated successfully",
    });
  }),

  signUp: TryCatchBlock(async (req: Request, res: Response) => {
    const { accessToken } = await authService.createUser(req.body);
    res.status(201).json({
      data: { accessToken },
      message: "User created successfully",
    });
  }),
};
