import prisma from "../../utils/db";

// Fetch all products
export const fetchProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
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
      message: "Products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch individual product
export const fetchIndividualProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
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

    return res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

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

// Search for product
export const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
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
      message: "Products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};
