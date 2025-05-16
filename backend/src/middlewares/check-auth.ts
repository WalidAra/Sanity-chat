import { config } from "@/config";
import { TryCatchBlock } from "@/core/app/base/block";
import { User } from "@/core/app/dto/api.dto";
import { verifyAuthorization } from "@/helpers";
import { NextFunction, Request, Response } from "express";

export type RequestWithAuth = Request & {
  auth: User;
};

export const checkAuth = TryCatchBlock(
  async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.headers[config.authKeyHideout.toLowerCase()] as
      | string
      | undefined;
    const authObj = await verifyAuthorization({ authHeader: accessToken });
    if (authObj) {
      (req as RequestWithAuth).auth = authObj.user;
      next();
    }
  }
);
