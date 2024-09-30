// Socket router
import prisma from "../utils/db";
import { SocketWithUser } from "../types";

export const onConnectSocket = (socket: SocketWithUser) => {
  console.log("Socket connected");

  socket.on("cart:get", async () => {
    try {
      const userId = socket.user?.id;

      if (!userId) {
        throw new Error("User not found");
      }

      const cartSize = await prisma.cartItem.count({
        where: {
          cart: {
            customerID: userId,
          },
        },
      });

      socket.emit("cart:get", { data: cartSize });
    } catch (e) {
      if (e instanceof Error) {
        socket.emit("cart:get", { error: e.message });
      }
    }
  });

  socket.on("wishlist:get", async () => {
    try {
      const userId = socket.user?.id;

      if (!userId) {
        throw new Error("User not found");
      }

      const wishlistSize = await prisma.wishListItem.count({
        where: {
          wishlist: {
            customerID: userId,
          },
        },
      });

      socket.emit("wishlist:get", { data: wishlistSize });
    } catch (e) {
      if (e instanceof Error) {
        socket.emit("wishlist:get", { error: e.message });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};
