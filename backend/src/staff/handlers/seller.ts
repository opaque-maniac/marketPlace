import prisma from "../../utils/db";

// Fetch sellers
export const fetchSellers = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const sellers = await prisma.seller.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        image: true,
      },
    });

    const hasNextPage = sellers.length > itemsPerPage;

    if (hasNextPage) {
      sellers.pop();
    }

    return res.status(200).json({
      message: "Sellers retrieved successfully",
      sellers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch individual seller
export const fetchIndividualSeller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Seller retrieved successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

// Fetch seller products
export const fetchSellerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        sellerId: id,
      },
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
      message: "Seller products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Update seller profile
export const updateSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const seller = await prisma.seller.update({
      where: {
        id,
      },
      data: {
        active,
      },
    });

    return res.status(201).json({
      message: "Seller updated successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete seller profile
export const deleteSeller = async (req, res, next) => {
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

// Search for seller
export const searchSeller = async (req, res, next) => {
  try {
    const { query } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const sellers = await prisma.seller.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
            },
          },
          {
            storeName: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = sellers.length > itemsPerPage;

    if (hasNextPage) {
      sellers.pop();
    }

    return res.status(200).json({
      message: "Sellers retrieved successfully",
      sellers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};
