// Socket auth middleware
import { SocketWithUser, User } from "../types";
import jwt from "jsonwebtoken";

type NextFunction = (err?: any) => void;

const verify = (token: string, secret: string) => {
  return jwt.verify(token, secret) as User;
};

export const socketAuthMiddleware = (
  socket: SocketWithUser,
  next: NextFunction
) => {
  try {
    const token = socket.handshake.query.token as string | undefined;

    if (!token) {
      throw new Error("No token provided");
    }

    // Verify token
    const user = verify(
      token,
      process.env.JWT_SECRET || "somethingintheorange"
    );

    socket.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
