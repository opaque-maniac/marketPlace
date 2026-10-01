import type { Request, Response } from "express";
import { Errors } from "../../../errors/definitions";
import db from "../../../db/db";
import { JWTPayload } from "../../../definitons/jwt";
import { OrderProductBody } from "../../../definitons/payloads";

export async function CustomerFetchIndividualProduct(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: {
      id,
      verified: true,
      seller: {
        verified: true,
      },
    },
    include: {
      images: {
        select: {
          filename: true,
        },
      },
      seller: {
        select: {
          name: true,
          image: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const ratings = await db.ratings.findMany({
    where: { productID: product.id },
  });

  const ratingValue =
    ratings.length > 0
      ? ratings.reduce((acc, val) => acc + val.value, 0) / ratings.length
      : 0;

  res.status(200).json({
    success: true,
    message: "Fetched product",
    product,
    rating: ratingValue,
  });
}

export async function AddToCart(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const user = (req as any).user as JWTPayload;

  const cart = await db.cart.findFirst({
    where: {
      customerID: user.id,
    },
  });

  if (!cart) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const itemExists = await db.cartItem.findFirst({
    where: {
      cartID: cart.id,
      productID: product.id,
    },
  });

  if (!itemExists) {
    await db.cartItem.create({
      data: {
        cartID: cart.id,
        productID: product.id,
        quantity: 0,
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Added product to cart",
  });
}

export async function AddToWishlist(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const user = (req as any).user as JWTPayload;

  const wishlist = await db.wishList.findFirst({
    where: { customerID: user.id },
  });

  if (!wishlist) {
    throw Errors.Unauthorized("Unauthorized");
  }

  const itemExists = await db.wishListItem.findFirst({
    where: {
      wishlistID: wishlist.id,
      productID: product.id,
    },
  });

  if (!itemExists) {
    await db.wishListItem.create({
      data: {
        wishlistID: wishlist.id,
        productID: product.id,
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Added product to wishlist",
  });
}

export async function OrderProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const product = await db.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw Errors.NotFound("Product not found", "Product");
  }

  const user = (req as any).user as JWTPayload;
  const { quantity } = req.body as OrderProductBody;

  const order = await db.order.create({
    data: {
      productID: product.id,
      customerID: user.id,
      quantity,
      sellerID: product.sellerID,
      totalAmount: product.sellingPrice * quantity,
    },
  });

  res.status(200).json({
    success: true,
    message: "Ordered product",
    orderID: order.id,
  });
}
