import prisma from "../../utils/db";

// Fetch seller profile
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

// Fetch seller product
export const fetchSellerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 20;
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
