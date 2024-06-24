import jwt from "jsonwebtoken";

const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return token;
};

export default createJWT;
