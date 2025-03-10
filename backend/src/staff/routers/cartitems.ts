import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import { deleteCartItem, fetchCartItem } from "../handlers/cart";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// fetch cart item
router.get("/:id", fetchCartItem);

// delete cart item
router.delete("/:id", deleteCartItem);

export default router;
