import * as jwt from "jsonwebtoken";
import type {
  JWTInput,
  JWTPayload,
  TokenExpiresIn,
} from "../../definitons/jwt";

const secret = process.env.JWT_SECRET;

export default class JWTService {
  private secret: string;

  constructor() {
    if (!secret) {
      throw new Error("JWT_SECRET env variable not set");
    }

    this.secret = secret;
  }

  generateAccessToken(payload: JWTInput) {
    return this.generateToken(
      {
        ...payload,
        purpose: "ACCESS",
      },
      "1h",
    );
  }

  generateRefreshToken(payload: JWTInput) {
    return this.generateToken(
      {
        ...payload,
        purpose: "REFRESH",
      },
      "30d",
    );
  }

  generateEmailToken(payload: JWTInput) {
    return this.generateToken(
      {
        ...payload,
        purpose: "EMAIL",
      },
      "10m",
    );
  }

  generateSecurityToken(payload: JWTInput) {
    return this.generateToken({ ...payload, purpose: "SECURITY" }, "10m");
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

  // TODO: find out how to implement this
  // Also find out if it is logical to have an endpoint
  // that checks if an access token is valid in a nextjs
  // middleware function call
  shouldRegerateRefresh(token: string): boolean {
    return false;
  }
}
