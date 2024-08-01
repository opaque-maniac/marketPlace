import { Prisma } from "@prisma/client";
import prisma from "../../utils/db";

// Fetch seller products
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

// Create seller product
export const createSellerProduct = async (req, res, next) => {
  try {
    let { name, description, price, stock, category, discount } = req.body;
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
            price: parseFloat(price),
            stock,
            category,
            discountPercentage: discount ? parseFloat(discount) : 0,
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

// Fetch individual seller product
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

// Update individual seller product
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

// Delete individual seller product
export const deleteIndividualSellerProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const _prod = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (_prod.sellerId !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this product",
      });
    }

    const product = await prisma.product.delete({
      where: {
        id,
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

// Search for specific product
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
