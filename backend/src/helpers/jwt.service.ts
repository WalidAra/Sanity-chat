import { config } from "@/config";
import jwt from "jsonwebtoken";

/**
 * @description JWT Service
 * @class JwtService
 * @static
 * @method generateToken
 * @method verifyToken
 * @method decodeToken
 */

export class JwtService {
  private static jwtSecret = config.jwtSecret;

  static generateToken({ payload }: { payload: object }) {
    if (this.jwtSecret) {
      const accessToken = jwt.sign(payload, this.jwtSecret, {
        expiresIn: "30d", // accessToken
      });

      // if (include === true) {
      //   const refreshToken = jwt.sign(payload, this.jwtSecret, {
      //     expiresIn: recall ? "30d" : "1d", // refreshToken
      //   });
      //   return { accessToken, refreshToken };
      // }

      return { accessToken };
    }
    throw new Error("JWT secret is not defined");
  }

  static verifyToken(token: string): any {
    if (!this.jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    return jwt.verify(token, this.jwtSecret);
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
