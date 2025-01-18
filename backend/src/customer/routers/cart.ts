import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import {
  addToCart,
  emptyCart,
  fetchCart,
  fetchCartCount,
  fetchCartItem,
  orderAllCartItems,
  orderCartItem,
  removeFromCart,
} from "../handlers/cart";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);

// fetch cart
router.get("/", fetchCart);

// order cart
router.put("/", orderAllCartItems);

// empty cart
router.delete("/", emptyCart);

// add to cart
router.post("/:id", addToCart);

// fetch cart items
router.get("/:id", fetchCartItem);

// order cart item
router.put("/:id", orderCartItem);

// remove from cart
router.delete("/:id", removeFromCart);

// fetch cart count
router.get("/cartcount", fetchCartCount);

export default router;
