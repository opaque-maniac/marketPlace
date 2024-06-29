import { Prisma } from "@prisma/client";
import createJWT from "../utils/createToken";
import prisma from "../utils/db";
import bcrypt from "bcrypt";

// Register customer
export const registerCustomer = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await prisma.$transaction(
      async (txl) => {
        const customer = await txl.customer.create({
          data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        await txl.cart.create({
          data: {
            customerId: customer.id,
          },
        });

        await txl.favorites.create({
          data: {
            customerId: customer.id,
          },
        });

        return customer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    res.status(201).json({
      message: "Customer created",
      customer,
    });
  } catch (e) {
    e.type = "validation";
    return next(e);
  }
};

// Login customer
export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findFirst({
      where: {
        email,
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
        favorites: {
          include: {
            favoriteItems: true,
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    if (customer.active === false) {
      return res.status(401).json({
        message: "Account is deactivated, contact admin",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createJWT(customer);

    res.status(200).json({
      message: "Login successful",
      customer,
      token,
    });
  } catch (e) {
    e.type = "validation";
    return next(e);
  }
};

// Fetch customer profile
export const fetchCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Fetched customer",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Update customer profile
export const updateCustomerProfile = async (req, res, next) => {
  try {
    const { email, firstName, lastName, address, city, country, phone } =
      req.body;
    const fileName = req.files[0].filename;

    const oldCustomer = await prisma.customer.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        image: true,
      },
    });

    if (!oldCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const customer = await prisma.$transaction(
      async (txl) => {
        const customer = await txl.customer.update({
          where: {
            id: req.params.id,
          },
          data: {
            email,
            firstName,
            lastName,
            address,
            city,
            country,
            phone,
          },
        });

        if (fileName) {
          if (oldCustomer.image) {
            await txl.customerImage.update({
              where: {
                id: oldCustomer.image.id,
              },
              data: {
                imageUrl: `http://localhost:5173/customerImages/${fileName}`,
              },
            });
          } else {
            await txl.customerImage.create({
              data: {
                customerId: customer.id,
                imageUrl: `http://localhost:5173/customerImages/${fileName}`,
              },
            });
          }
        }

        return customer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Updated customer",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete customer profile
export const deleteCustomerPofile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Customer deleted",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch customer cart
export const fetchCustomerCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
      include: {
        cartItems: {
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

    return res.status(200).json({
      message: "Fetched customer cart",
      cart,
    });
  } catch (e) {
    return next(e);
  }
};

// Add product to cart
export const addToCart = async (req, res, next) => {
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

    const cart = await prisma.$transaction(
      async (txl) => {
        const cart = await txl.cart.findFirst({
          where: {
            customerId: req.user.id,
          },
        });

        await txl.cartItems.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            quantity: 1,
          },
        });

        return cart;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Added to cart",
      cart,
    });
  } catch (e) {
    return next(e);
  }
};

// Update cart item
export const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await prisma.cartItems.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    return res.status(200).json({
      message: "Updated cart item",
      item,
    });
  } catch (e) {
    return next(e);
  }
};

// Remove item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await prisma.cartItems.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Removed from cart",
      item,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete all cart items
export const emptyCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    await prisma.cartItems.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return res.status(204).json({
      message: "Cart emptied",
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch products with pagination
export const fetchProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;
    const category = req.query.category || "";
    let query;

    if (category) {
      query = {
        category,
        seller: {
          active: true,
        },
      };
    } else {
      query = {
        seller: {
          active: true,
        },
      };
    }

    const products = await prisma.product.findMany({
      where: query,
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Fetched products",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch indivial product
export const fetchInvidualProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        seller: {
          active: true,
        },
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Fetched product",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Fetched seller",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        sellerId: id,
        seller: {
          active: true,
        },
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Fetched seller products",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.body;

    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        seller: {
          active: true,
        },
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Fetched products",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch customer orders
export const fetchOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: req.user.id,
      },
      include: {
        orderProducts: {
          where: {
            OR: [
              {
                status: "PENDING",
              },
              {
                status: "SHIPPED",
              },
              {
                status: "PROCESSING",
              },
            ],
          },
          include: {
            product: {
              include: {
                images: true,
                seller: {
                  include: {
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Fetched orders",
      orders,
    });
  } catch (e) {
    return next(e);
  }
};

// Order all items in cart
export const orderCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        customerId: req.user.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    if (cart.cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const order = await prisma.$transaction(
      async (txl) => {
        const newOrder = await txl.order.create({
          data: {
            customerId: req.user.id,
            total: 0,
          },
        });

        const orderItemsData = cart.cartItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        }));

        await txl.orderProducts.createMany({ data: orderItemsData });

        const total = orderItemsData.reduce((sum, item) => sum + item.price, 0);

        const updatedOrder = await txl.order.update({
          where: { id: newOrder.id },
          data: { total },
        });

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete order
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        customerId: req.user.id,
      },
      include: {
        orderProducts: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    let len = order.orderProducts.length;
    for (let i = 0; i < len; i++) {
      if (order.orderProducts[i].status !== "PENDING") {
        return res.status(400).json({
          message: "Cannot delete order",
        });
      }
    }

    const deletedOrder = await prisma.order.delete({
      where: {
        id,
        customerId: req.user.id,
      },
    });

    return res.status(204).json({
      message: "Deleted order successfully",
      order: deletedOrder,
    });
  } catch (e) {
    return next(e);
  }
};

// Update order item
export const updateOrderItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;
    const { quantity } = req.body;

    const item = await prisma.orderProducts.findFirst({
      where: {
        orderId: id,
        id: itemId,
      },
      include: {
        product: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (item.status !== "PENDING") {
      return res.status(400).json({
        message: "Cannot update order item",
      });
    }

    const updatedItem = await prisma.orderProducts.update({
      where: {
        id: itemId,
        orderId: id,
      },
      data: {
        quantity,
        price: quantity * item.product.price,
      },
    });

    return res.status(200).json({
      message: "Updated order item",
      item: updatedItem,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete order item
export const deleteOrderItem = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;

    const item = await prisma.orderProducts.findFirst({
      where: {
        orderId: id,
        id: itemId,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (item.status !== "PENDING") {
      return res.status(400).json({
        message: "Cannot update order item",
      });
    }

    const deletedItem = await prisma.orderProducts.delete({
      where: {
        id: itemId,
        orderId: id,
      },
    });

    return res.status(204).json({
      message: "Deleted order item",
      item: deletedItem,
    });
  } catch (e) {
    return next(e);
  }
};

export const createComplaint = async (req, res, next) => {
  try {
    const { email, name, phone, message } = req.body;

    const complaint = await prisma.complaints.create({
      data: {
        name,
        phone: phone ?? null,
        email,
        message,
      },
    });

    return res.status(201).json({
      message: "Complaint created",
      complaint,
    });
  } catch (e) {
    return next(e);
  }
};

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
