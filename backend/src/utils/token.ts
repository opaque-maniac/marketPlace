import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET || "somethingintheorange";

const generateToken = (id: string, email: string, userType: string) => {
  const token = jwt.sign({ id, email, userType }, tokenSecret, {
    expiresIn: "7d",
  });

  return token as string;
};

export const generateRefreshToken = (
  id: string,
  email: string,
  userType: string,
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

export default generateToken;
