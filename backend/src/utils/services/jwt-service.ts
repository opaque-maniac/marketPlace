import * as jwt from "jsonwebtoken";
import type { JWTPayload, TokenExpiresIn } from "../../definitons/jwt";

const secret = process.env.JWT_SECRET;

export default class JWTService {
  private secret: string;

  constructor() {
    if (!secret) {
      throw new Error("JWT_SECRET env variable not set");
    }

    this.secret = secret;
  }

  generateAccessToken(payload: JWTPayload) {
    return this.generateToken(payload, "1h");
  }

  generateRefreshToken(payload: JWTPayload) {
    return this.generateToken(payload, "30d");
  }

  generateEmailToken(payload: JWTPayload) {
    return this.generateToken(payload, "10m");
  }

  generateSecurityToken(payload: JWTPayload) {
    return this.generateToken(payload, "10m");
  }

  parseToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (_) {
      return null;
    }
  }

  private generateToken(
    payload: JWTPayload,
    expiresIn: TokenExpiresIn,
  ): string {
    const token = jwt.sign(payload, this.secret, {
      expiresIn: expiresIn,
    });
    return token;
  }
}
