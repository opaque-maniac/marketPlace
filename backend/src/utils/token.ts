import jwt from "jsonwebtoken";
import { SecurityDecodedToken, UserRole } from "../types";

const tokenSecret = process.env.JWT_SECRET || "somethingintheorange";

const generateToken = (id: string, email: string, userType: UserRole) => {
  const token = jwt.sign({ id, email, userType }, tokenSecret, {
    expiresIn: "7d",
  });

  return token as string;
};

export const generateRefreshToken = (
  id: string,
  email: string,
  userType: UserRole,
) => {
  const token = jwt.sign({ id, email, userType }, tokenSecret, {
    expiresIn: "30d",
  });

  return token as string;
};

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, tokenSecret);
    return true;
  } catch (e) {
    return false;
  }
};

export const getSecurityTokenPayload = (
  token: string,
): SecurityDecodedToken | null => {
  try {
    return jwt.verify(token, tokenSecret) as SecurityDecodedToken;
  } catch (e) {
    return null;
  }
};

export const generateTempToken = (email: string, userType: UserRole) => {
  const token = jwt.sign({ email, userType }, tokenSecret, {
    expiresIn: "10m",
  });

  return token as string;
};

export const generateDataToken = (email: string, userType: UserRole) => {
  const token = jwt.sign({ email, userType }, tokenSecret, {
    expiresIn: "20m",
  });

  return token as string;
};

export default generateToken;
