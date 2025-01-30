import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { fetchCartCount } from "../handlers/cart";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);

// fetch cart count
router.get("/count", fetchCartCount);

export default router;
