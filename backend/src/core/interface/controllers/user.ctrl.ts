import { TryCatchBlock } from "@/core/app/base/block";
import { userService } from "@/core/app/services";
import { RequestWithAuth } from "@/middlewares";
import { Request, Response } from "express";

export const userController = {
  getProfile: TryCatchBlock(async (req: Request, res: Response) => {
    const user = (req as RequestWithAuth).auth;
    res.status(200).json({
      data: user,
      message: "User profile retrieved successfully",
    });
  }),
  searchProfiles: TryCatchBlock(async (req: Request, res: Response) => {
    const { query } = req;
    const { search } = query;

    const users = await userService.searchUsersByName({
      name: search as string,
    });

    res.status(200).json({
      data: users,
      message: "User profiles retrieved successfully",
    });
  }),
};
