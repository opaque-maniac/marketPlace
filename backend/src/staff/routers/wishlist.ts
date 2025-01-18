import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import { emptyWishlist } from "../handlers/wishlist";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// wishlist
router.delete("/:id", emptyWishlist);

export default router;
