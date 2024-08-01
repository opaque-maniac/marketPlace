import prisma from "../../utils/db";

// Function to fetch favorites
export const fetchFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorites.findFirst({
      where: {
        customerId: req.user.id,
      },
      include: {
        favoriteItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!favorites) {
      return res.status(404).json({
        message: "Favorites not found",
      });
    }

    return res.status(200).json({
      message: "Fetched favorites",
      favorites,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to add product to favorites
export const addToFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const favorite = await prisma.favorites.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    const _favorite = await prisma.favoriteItems.findFirst({
      where: {
        favoriteId: favorite.id,
        productId: id,
      },
    });

    if (_favorite) {
      return res.status(200).json({
        message: "Product already in favorites",
      });
    }

    const favoriteItem = await prisma.favoriteItems.create({
      data: {
        productId: product.id,
        favoriteId: favorite.id,
      },
    });

    return res.status(201).json({
      message: "Added to favorites",
      favoriteItem,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to remove product from favorites
export const removeFromFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;

    const favoriteItem = await prisma.favoriteItems.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Removed from favorites",
      favoriteItem,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to empty favorites
export const emptyFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorites.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    if (!favorites) {
      return res.status(404).json({
        message: "Favorites not found",
      });
    }

    const favoriteItems = await prisma.favoriteItems.deleteMany({
      where: {
        favoriteId: favorites.id,
      },
    });

    return res.status(204).json({
      message: "Favorites emptied",
      favoriteItems,
    });
  } catch (e) {
    return next(e);
  }
};

// Function to order all favorites
export const orderAllFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorites.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    if (!favorites) {
      return res.status(404).json({
        message: "Favorites not found",
      });
    }

    const favoriteItems = await prisma.favoriteItems.findMany({
      where: {
        favoriteId: favorites.id,
      },
      include: {
        product: true,
      },
    });

    const order = await prisma.$transaction(async (txl) => {
      const order = await txl.order.create({
        data: {
          customerId: req.user.id,
          total: 0,
        },
      });

      let total = 0;

      for (let i = 0; i < favoriteItems.length; i++) {
        const item = favoriteItems[i];

        await txl.orderProducts.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: 1,
            price: item.product.price,
          },
        });

        total += item.product.price;
      }

      const updatedOrder = await txl.order.update({
        where: {
          id: order.id,
        },
        data: {
          total,
        },
      });

      return updatedOrder;
    });

    return res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    return next(e);
  }
};
