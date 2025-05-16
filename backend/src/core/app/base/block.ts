import { TokenExpiredError } from "jsonwebtoken";
import { Request, RequestHandler, Response, NextFunction } from "express";
import { config } from "@/config";
import { ConstraintError } from "./error";
import { historyLogger } from "@/scripts";

export const TryCatchBlock = (fn: RequestHandler): RequestHandler => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      const logData: Record<string, unknown> = {
        path: req.path,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      };

      if (error instanceof Error) {
        logData.message = error.message;
        logData.stack = error.stack;
        logData.name = error.name;

        if (error instanceof ConstraintError) {
          logData.statusCode = error.status;
        }
      } else {
        logData.rawError = error;
      }

      historyLogger.error("Request failed", logData);

      if (error instanceof ConstraintError) {
        return res.status(error.status).json({ message: error.message });
      } else if (error instanceof TokenExpiredError) {
        res.clearCookie(config.refreshHideout, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res.status(403).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }) as RequestHandler;
};
