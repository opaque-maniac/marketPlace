import jwt from "jsonwebtoken";
import prisma from "../utils/db";

// Deny access to endpoints when user is authenticated
export const allowIfAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    e.type = "not-auth";
    next(e);
  }
};

// Grant access to endpoints when user is authenticated
export const denyIfAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    return res.status(403).json({
      message: "You are already authenticated",
    });
  }
  next();
};

export const isProfileOwner = (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });
  }
  next();
};

export const isSeller = async (req, res, next) => {
  try {
    const seller = await prisma.seller.findFirst({
      where: {
        id: req.user.id,
        email: req.user.email,
      },
    });

    if (!seller) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (e) {
    return next(e);
  }
};

export const isCustomer = async (req, res, next) => {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id: req.user.id,
        email: req.user.email,
      },
    });

    if (!customer) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (e) {
    return next(e);
  }
};

export const isProductSeller = async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: req.params.id,
        sellerId: req.user.id,
      },
      include: {
        seller: true,
      },
    });

    if (!product) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }

    if (
      product.sellerId !== req.user.id &&
      product.seller.email !== req.user.email
    ) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (e) {
    return next(e);
  }
};

export const isStaff = async (req, res, next) => {
  try {
    const staff = await prisma.staff.findFirst({
      where: {
        id: req.user.id,
        email: req.user.email,
      },
    });

    if (!staff) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (e) {
    return next(e);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const staff = await prisma.staff.findFirst({
      where: {
        id: req.user.id,
        email: req.user.email,
      },
    });

    if (!staff || staff.role !== "ADMIN") {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (e) {
    return next(e);
  }
};
