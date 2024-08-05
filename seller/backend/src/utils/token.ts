import jwt from "jsonwebtoken";

export const generateToken = (userId: string, email: string) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token as string;
};
