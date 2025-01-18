import { Router } from "express";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import {
  deleteWishlistItem,
  fetchWishlistItem,
  fetchWishlistItems,
} from "../handlers/wishlist";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// wishlist items
router.get("/", fetchWishlistItems);

// fetch individual wishlist item
router.get("/:id", fetchWishlistItem);

// delete wishlist item
router.delete("/:id", deleteWishlistItem);

export default router;
