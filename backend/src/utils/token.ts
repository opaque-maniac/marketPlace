import jwt from "jsonwebtoken";

const generateToken = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token as string;
};

export default generateToken;
