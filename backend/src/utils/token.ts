import jwt from "jsonwebtoken";

const generateToken = (id: string, email: string, userType: string) => {
  const token = jwt.sign({ id, email, userType }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token as string;
};

export const generateRefreshToken = (
  id: string,
  email: string,
  userType: string
) => {
  const token = jwt.sign({ id, email, userType }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token as string;
};

export default generateToken;
