import type { Request, Response } from "express";
import { Errors } from "../../errors/definitions";
import db from "../../db/db";
import { JWTPayload } from "../../definitons/jwt";
import { UpdateCartItemBody } from "../../definitons/payloads";

export async function CustomerUpdateCartItem(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const item = await db.cartItem.findFirst({
    where: {
      id,
      cart: {
        customerID: user.id,
      },
    },
    include: {
      product: {
        select: {
          inventory: true,
        },
      },
    },
  });
  if (!item) {
    throw Errors.NotFound("Cart item not found", "CartItem");
  }

  // TODO: find a more effecient way to do this because of race conditions
  const { increment } = req.body as UpdateCartItemBody;
  await db.cartItem.update({
    where: { id: item.id },
    data: { quantity: increment ? { increment: 1 } : { decrement: 1 } },
  });

  res.status(200).json({
    success: true,
    message: "Updated cart item",
  });
}

export async function CustomerOrderCartItem(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const item = await db.cartItem.findFirst({
    where: {
      id,
      cart: {
        customerID: user.id,
      },
    },
    include: {
      product: {
        select: {
          inventory: true,
          sellerID: true,
          sellingPrice: true,
        },
      },
    },
  });
  if (!item) {
    throw Errors.NotFound("Cart item not found", "CartItem");
  }

  // TODO: look into race conditions and if it is better to have the lookup in a transaction
  var quantity = item.quantity;
  if (item.quantity > item.product.inventory) {
    quantity = item.product.inventory;
  }

  const order = await db.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        productID: item.productID,
        customerID: user.id,
        quantity,
        sellerID: item.product.sellerID,
        totalAmount: item.product.sellingPrice * quantity,
      },
    });

    await tx.product.update({
      where: { id: item.productID },
      data: {
        inventory: {
          decrement: quantity,
        },
      },
    });

    return newOrder;
  });

  res.status(200).json({
    success: true,
    message: "Ordered cart item",
    orderID: order.id,
  });
}

export async function CustomerDeleteCartItem(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const user = (req as any).user as JWTPayload;

  const item = await db.cartItem.findFirst({
    where: {
      id,
      cart: {
        customerID: user.id,
      },
    },
  });
  if (!item) {
    throw Errors.NotFound("Cart item not found", "CartItem");
  }

  await db.cartItem.delete({
    where: { id: item.id },
  });

  res.status(203).json({
    success: true,
    message: "Deleted cart item",
  });
}
