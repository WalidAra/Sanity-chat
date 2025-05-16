import { config } from "@/config";
import { ConstraintError } from "@/core/app/base";
import { userRepo } from "@/core/infrastructure/repositories";
import { JwtService } from "@/helpers";
import { Socket } from "socket.io";

export type SocketWithAuth = Socket & {
  userId: string;
};

export const checkAuthSocket = async (
  socket: Socket,
  next: (err?: any) => void
) => {
  const socketHeader = socket.handshake.auth.token as string | undefined;

  if (!socketHeader) {
    throw new ConstraintError("Authentication failed: No token provided", 403);
  }

  const [bearer, token] = socketHeader.split(" ");
  if (bearer !== config.authBearer || !token) {
    throw new ConstraintError(
      "Authentication failed: Invalid token format",
      403
    );
  }

  try {
    const decoded = JwtService.verifyToken(token) as {
      id: string;
      recall: boolean;
    };
    const user = await userRepo.findById({ id: decoded.id });

    if (!user) {
      throw new ConstraintError(
        "Authentication failed: Account is inactive",
        403
      );
    }

    (socket as SocketWithAuth).userId = user.user.id;
    next();
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Invalid token" ||
        error.message === "Token has expired")
    ) {
      return next(null);
    } else {
      return next(null);
    }
  }
};
