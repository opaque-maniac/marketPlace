import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import { fetchCartItem, updateCartItem } from "../handlers/cart";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// fetch cart item
router.get("/:id", fetchCartItem);

// update cart item
router.put("/:id", updateCartItem);

export default router;
