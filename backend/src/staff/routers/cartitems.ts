import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import {
  deleteCartItem,
  fetchCartItem,
  updateCartItem,
} from "../handlers/cart";
import { body } from "express-validator";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// fetch cart item
router.get("/:id", fetchCartItem);

// update cart item
router.put(
  "/:id",
  body("increment").isNumeric(),
  body("decrement").isNumeric(),
  updateCartItem,
);

// delete cart item
router.delete("/:id", deleteCartItem);

export default router;
