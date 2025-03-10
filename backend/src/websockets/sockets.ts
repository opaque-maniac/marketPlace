import { Server } from "socket.io";
import prisma from "../utils/db";
import { verifyToken } from "../utils/token";

let io: Server;

export const initializeSocketServer = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("join", (userID: string) => {
      socket.join(userID);
      console.log(`User ${userID} joined a notification room`);
    });

    socket.on("close", () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });

  // Middleware to authenticate user
  io.use((socket, next) => {
    const token = socket.handshake.auth.token as string | undefined;

    if (!token) {
      io.emit("authError", { message: "No token provided" });
      return;
    }

    if (verifyToken(token)) {
      return next();
    }
    io.emit("authError", { message: "Invalid token" });
    return;
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket server not initilized");

  return io;
};

export const newCartItemSocket = async (userID: string) => {
  try {
    const count = await prisma.cartItem.count({
      where: {
        cart: {
          customerID: userID,
        },
      },
    });

    getIO().to(userID).emit("cartCount", { count });
  } catch (e) {
    console.log("Error sending cart count", e);
    getIO().to(userID).emit("error", { message: "Error happened" });
  }
};

export const newWishlistItemSocket = async (userID: string) => {
  try {
    const count = await prisma.wishListItem.count({
      where: {
        wishlist: {
          customerID: userID,
        },
      },
    });

    getIO().to(userID).emit("wishlistCount", { count });
  } catch (e) {
    getIO().to(userID).emit("error", { message: "Error happened" });
  }
};
