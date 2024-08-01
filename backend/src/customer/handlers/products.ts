import { Prisma } from "@prisma/client";
import createJWT from "../../utils/createToken";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";

// Fetch products with pagination
export const fetchProducts = async (req, res, next) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 20;
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
        seller: true,
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

// Search product
export const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.body;

    const itemsPerPage = parseInt(req.query.itemsPerPage) || 20;
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
