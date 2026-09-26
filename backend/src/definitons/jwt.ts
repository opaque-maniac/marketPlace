import { UserType } from "./users";

type JWTPurpose = "ACCESS" | "REFRESH" | "EMAIL" | "SECURITY";

export interface JWTInput {
  id: string;
  email: string;
  role: UserType;
}

export interface JWTPayload extends JWTInput {
  purpose: JWTPurpose;
}

export type TokenExpiresIn = "1h" | "30d" | "10m";
