import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import { emptyCart } from "../handlers/cart";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// cart
router.delete("/:id", emptyCart);

export default router;
