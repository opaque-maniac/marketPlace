import { UserType } from "./users";

export interface JWTPayload {
  id: string;
  email: string;
  role: UserType;
}

export type TokenExpiresIn = "1h" | "30d" | "10m";
