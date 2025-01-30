import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { fetchWishlistCount } from "../handlers/wishlist";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);

// fetch wishlist count
router.get("/count", fetchWishlistCount);

export default router;
