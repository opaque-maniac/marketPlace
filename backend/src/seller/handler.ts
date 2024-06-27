import { Prisma } from "@prisma/client";
import createJWT from "../utils/createToken";
import prisma from "../utils/db";
import bcrypt from "bcrypt";

// Register seller
export const registerSeller = async (req, res, next) => {
  try {
    const { email, storeName, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const seller = await prisma.seller.create({
      data: {
        email,
        storeName,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Registration successful",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

// Login seller
export const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const seller = await prisma.seller.findFirst({
      where: {
        email,
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    if (seller.active == false) {
      return res.status(401).json({
        message: "Account not activated",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createJWT(seller);

    return res.status(200).json({
      message: "Login successful",
      seller,
      token,
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
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      message: "Seller fetched successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      firstName,
      lastName,
      storeName,
      address,
      phone,
      city,
      country,
    } = req.body;

    let fileNames = [];

    if (req.files.length !== 0) {
      fileNames = req.files.map(
        (file) => `http://localhost:3000/sellerImages/${file.filename}`
      );
    }

    const seller = await prisma.$transaction(
      async (txl) => {
        if (fileNames.length !== 0) {
          const imageObj = fileNames.map((image) => {
            return {
              imageUrl: image,
              sellerId: id,
            };
          });

          try {
            await txl.sellerImage.deleteMany({
              where: {
                sellerId: id,
              },
            });
          } catch (e) {
            console.log("No files found");
          }

          await txl.sellerImage.createMany({
            data: imageObj,
          });
        }

        const updatedSeller = await txl.seller.update({
          where: {
            id,
          },
          data: {
            email,
            storeName,
            firstName: firstName ?? null,
            lastName: lastName ?? null,
            address: address ?? null,
            phone: phone ?? null,
            city: city ?? null,
            country: country ?? null,
          },
        });

        return updatedSeller;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Seller updated successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Seller deleted successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 10;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        sellerId: req.user.id,
      },
      include: {
        images: true,
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const createSellerProduct = async (req, res, next) => {
  try {
    let { name, description, price, stock, category } = req.body;
    const images = req.files.map(
      (file) => `http://localhost:3000/productImages/${file.filename}`
    );
    price = parseFloat(price);
    stock = parseInt(stock);

    const product = await prisma.$transaction(
      async (txl) => {
        const newProduct = await txl.product.create({
          data: {
            name,
            description,
            price,
            stock,
            category,
            sellerId: req.user.id,
          },
        });

        const imageObj = images.map((image) => {
          return {
            imageUrl: image,
            productId: newProduct.id,
          };
        });

        await txl.productImages.createMany({
          data: imageObj,
        });

        return newProduct;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchIndividualSellerProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        sellerId: req.user.id,
      },
      include: {
        images: true,
        seller: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateIndividualSellerProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let fileNames = [];

    if (req.files.length > 0) {
      fileNames = req.files.map(
        (file) => `http://localhost:3000/productImages/${file.filename}`
      );
    }

    const { name, description, price, stock, category } = req.body;

    const product = await prisma.$transaction(
      async (txl) => {
        if (fileNames.length !== 0) {
          const imageObj = fileNames.map((image) => {
            return {
              imageUrl: image,
              productId: id,
            };
          });

          try {
            await txl.productImages.deleteMany({
              where: {
                productId: id,
              },
            });
          } catch (e) {
            console.log("No files found");
          }

          await txl.productImages.createMany({
            data: imageObj,
          });
        }

        const updatedProduct = await txl.product.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            price,
            stock,
            category,
          },
        });

        return updatedProduct;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteIndividualSellerProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id,
        sellerId: req.user.id,
      },
    });

    return res.status(204).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerOrders = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const orders = await prisma.orderProducts.findMany({
      where: {
        product: {
          sellerId: req.user.id,
        },
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = orders.length > itemsPerPage;

    if (hasNextPage) {
      orders.pop();
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchIndividualSellerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.orderProducts.findFirst({
      where: {
        id,
        product: {
          sellerId: req.user.id,
        },
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateIndividualSellerOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.$transaction(
      async (txl) => {
        const updatedOrder = await txl.orderProducts.update({
          where: {
            id,
            product: {
              sellerId: req.user.id,
            },
          },
          data: {
            status,
          },
        });

        if (status === "DELIVERED") {
          await txl.product.update({
            where: {
              id: updatedOrder.productId,
            },
            data: {
              stock: {
                decrement: updatedOrder.quantity,
              },
            },
          });
        }

        return updatedOrder;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    if (status === "DELIVERED") {
      // Send delivery email
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (e) {
    return next(e);
  }
};

export const searchSellerProducts = async (req, res, next) => {
  try {
    const { search } = req.query;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        sellerId: req.user.id,
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            category: search.toUpperCase(),
          },
        ],
      },
      include: {
        images: true,
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};
